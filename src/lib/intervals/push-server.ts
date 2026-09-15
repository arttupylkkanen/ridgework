import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { isAthleteProfile, type AthleteProfile } from "@/lib/athlete";
import { isRollingState, type RollingState } from "@/lib/rolling-plan";
import { visiblePersonalizedWeeks } from "@/lib/plan-engine";
import { getCopy } from "@/content";
import { sessionHowEn } from "@/content/session-how";

/**
 * Push planned sessions to the athlete's own intervals.icu calendar.
 *
 * Why this route to the watch: intervals.icu has its own Garmin Connect
 * integration that uploads planned workouts, so the athlete links those two
 * once and our sessions reach the watch without Garmin approving anything on
 * our side. The key is theirs; we only relay.
 */
const INTERVALS_API = "https://intervals.icu/api/v1";

type LinkRow = {
  athlete_id: string;
  api_key: string;
  last_pushed_at: string | null;
  last_error: string | null;
};
type ProfileRow = { profile: unknown };
type EnrollmentRow = { state: unknown };

function parseJson(raw: unknown): unknown {
  return typeof raw === "string" ? (JSON.parse(raw) as unknown) : raw;
}

/** intervals.icu uses HTTP Basic with the literal username "API_KEY". */
function authHeader(apiKey: string): string {
  return "Basic " + Buffer.from(`API_KEY:${apiKey}`).toString("base64");
}

export type IntervalsEvent = {
  start_date_local: string;
  category: "WORKOUT";
  name: string;
  description: string;
  type: string;
  moving_time: number;
};

/** intervals.icu activity types. Anything not clearly one of these is a hike. */
function intervalsType(key: string): string {
  if (key === "climb" || key === "strength" || key === "me") return "WeightTraining";
  if (key === "hike" || key === "pack" || key === "mountain" || key === "vert") return "Hike";
  return "Run";
}

export function eventsFor(profile: AthleteProfile, states: RollingState[]): IntervalsEvent[] {
  const labels = getCopy("en").tools.plan.sessions;
  const out: IntervalsEvent[] = [];
  for (const state of states) {
    for (const week of visiblePersonalizedWeeks(state, profile)) {
      week.days.forEach((day, i) => {
        if (day.key === "rest") return;
        const date = week.dates[i];
        if (!date) return;
        const minutes = day.minutes ?? 45;
        out.push({
          start_date_local: `${date}T00:00:00`,
          category: "WORKOUT",
          name: `${labels[day.key]} · ${minutes} min`,
          description: sessionHowEn[day.key]?.do ?? "",
          type: intervalsType(day.key),
          moving_time: minutes * 60,
        });
      });
    }
  }
  return out;
}

export const getIntervalsLink = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<LinkRow>`
      select athlete_id, api_key, last_pushed_at, last_error
        from intervals_links where user_id = ${context.userId}
    `;
    const row = rows[0];
    // Never return the key itself — only whether one is on file.
    return {
      connected: Boolean(row),
      athleteId: row?.athlete_id ?? "",
      lastPushedAt: row?.last_pushed_at ?? null,
      lastError: row?.last_error ?? null,
    };
  });

export const saveIntervalsLink = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ athleteId: z.string().trim().min(1), apiKey: z.string().trim().min(1) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into intervals_links (user_id, athlete_id, api_key, updated_at)
      values (${context.userId}, ${data.athleteId}, ${data.apiKey}, now())
      on conflict (user_id) do update
        set athlete_id = ${data.athleteId}, api_key = ${data.apiKey}, updated_at = now()
    `;
    return { ok: true };
  });

export const disconnectIntervals = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await sql`delete from intervals_links where user_id = ${context.userId}`;
    return { ok: true };
  });

export const pushToIntervals = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const links = await sql<LinkRow>`
      select athlete_id, api_key, last_pushed_at, last_error
        from intervals_links where user_id = ${context.userId}
    `;
    const link = links[0];
    if (!link) return { ok: false as const, error: "not_connected", pushed: 0 };

    const profiles = await sql<ProfileRow>`
      select profile from athlete_profiles where user_id = ${context.userId}
    `;
    const profile = parseJson(profiles[0]?.profile);
    if (!isAthleteProfile(profile)) return { ok: false as const, error: "no_profile", pushed: 0 };

    const enrollments = await sql<EnrollmentRow>`
      select state from enrollments where user_id = ${context.userId}
    `;
    const states: RollingState[] = [];
    for (const row of enrollments) {
      const parsed = parseJson(row.state);
      if (isRollingState(parsed)) states.push(parsed);
    }

    const events = eventsFor(profile, states);
    if (events.length === 0) return { ok: false as const, error: "no_sessions", pushed: 0 };

    try {
      const res = await fetch(`${INTERVALS_API}/athlete/${link.athlete_id}/events/bulk`, {
        method: "POST",
        headers: {
          authorization: authHeader(link.api_key),
          "content-type": "application/json",
        },
        body: JSON.stringify(events),
      });
      if (!res.ok) {
        const detail = (await res.text().catch(() => "")).slice(0, 200);
        const error = `intervals_${res.status}`;
        console.error("[intervals] push rejected", res.status, detail);
        await sql`
          update intervals_links set last_error = ${error}, updated_at = now()
           where user_id = ${context.userId}
        `;
        return { ok: false as const, error, pushed: 0 };
      }
      await sql`
        update intervals_links
           set last_pushed_at = now(), last_error = null, updated_at = now()
         where user_id = ${context.userId}
      `;
      return { ok: true as const, pushed: events.length };
    } catch (err) {
      const error = err instanceof Error ? err.message : "push failed";
      console.error("[intervals] push failed", error);
      await sql`
        update intervals_links set last_error = ${error.slice(0, 200)}, updated_at = now()
         where user_id = ${context.userId}
      `;
      return { ok: false as const, error, pushed: 0 };
    }
  });
