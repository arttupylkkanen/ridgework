import { createServerFn } from "@tanstack/react-start";
import { randomBytes } from "node:crypto";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { isAthleteProfile, windowsOf, type AthleteProfile } from "@/lib/athlete";
import { isRollingState, type RollingState } from "@/lib/rolling-plan";
import { visiblePersonalizedWeeks } from "@/lib/plan-engine";
import { getCopy } from "@/content";
import { sessionHowEn } from "@/content/session-how";
import { buildIcs, type CalendarSession } from "./ics";

type FeedRow = { user_id: string; token: string };
type ProfileRow = { profile: unknown };
type EnrollmentRow = { objective: string; state: unknown };

function parseJson(raw: unknown): unknown {
  return typeof raw === "string" ? (JSON.parse(raw) as unknown) : raw;
}

function newToken(): string {
  return randomBytes(24).toString("base64url");
}

/** Mint on first use so the URL only exists once an athlete asks for it. */
export const getCalendarToken = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const existing = await sql<FeedRow>`
      select user_id, token from calendar_feeds where user_id = ${context.userId}
    `;
    if (existing[0]) return { token: existing[0].token };
    const token = newToken();
    await sql`
      insert into calendar_feeds (user_id, token) values (${context.userId}, ${token})
      on conflict (user_id) do nothing
    `;
    const after = await sql<FeedRow>`
      select user_id, token from calendar_feeds where user_id = ${context.userId}
    `;
    return { token: after[0]?.token ?? token };
  });

/** Revoking is just a new token: the old URL stops resolving immediately. */
export const rotateCalendarToken = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const token = newToken();
    await sql`
      insert into calendar_feeds (user_id, token) values (${context.userId}, ${token})
      on conflict (user_id) do update set token = ${token}, created_at = now()
    `;
    return { token };
  });

/**
 * Everything the athlete has planned, as calendar sessions.
 *
 * Rebuilt from the stored plan rather than stored separately, so the feed
 * cannot drift from what the desk shows.
 */
export function sessionsFor(profile: AthleteProfile, states: RollingState[]): CalendarSession[] {
  const copy = getCopy("en");
  const labels = copy.tools.plan.sessions;
  const windows = windowsOf(profile);
  const out: CalendarSession[] = [];

  for (const state of states) {
    for (const week of visiblePersonalizedWeeks(state, profile)) {
      week.days.forEach((day, i) => {
        if (day.key === "rest") return;
        const date = week.dates[i];
        if (!date) return;
        const how = sessionHowEn[day.key];
        const minutes = day.minutes ?? 0;
        out.push({
          date,
          title: `${labels[day.key]}${minutes ? ` · ${minutes} min` : ""}`,
          minutes: minutes || 45,
          description: how?.do ?? "",
          startAt: windows[i]?.startAt ?? null,
        });
      });
    }
  }
  return out;
}

/** Called by the public route. Returns null when the token is unknown. */
export async function feedForToken(token: string): Promise<string | null> {
  const sql = await getSql();
  const rows = await sql<FeedRow>`
    select user_id, token from calendar_feeds where token = ${token}
  `;
  const row = rows[0];
  if (!row) return null;

  const profiles = await sql<ProfileRow>`
    select profile from athlete_profiles where user_id = ${row.user_id}
  `;
  const profile = parseJson(profiles[0]?.profile);
  if (!isAthleteProfile(profile)) {
    return buildIcs({ sessions: [], calendarName: "Ridgework", feedId: token });
  }

  const enrollments = await sql<EnrollmentRow>`
    select objective, state from enrollments where user_id = ${row.user_id}
  `;
  const states: RollingState[] = [];
  for (const enr of enrollments) {
    const parsed = parseJson(enr.state);
    if (isRollingState(parsed)) states.push(parsed);
  }

  return buildIcs({
    sessions: sessionsFor(profile, states),
    calendarName: "Ridgework training",
    feedId: token,
  });
}
