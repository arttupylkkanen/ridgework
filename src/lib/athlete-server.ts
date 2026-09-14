import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { isAthleteProfile, type AthleteProfile } from "@/lib/athlete";
import { getSql } from "@/lib/db";
import type { ReadinessCall, StoredDaily } from "@/lib/daily-readiness";
import { isDailyInputs } from "@/lib/daily-readiness";

type ProfileRow = { user_id: string; profile: unknown; updated_at: string };
type DailyRow = {
  on_date: string;
  payload: unknown;
  call: string;
  overridden: boolean;
  created_at: string;
};

function parseProfile(raw: unknown): AthleteProfile | null {
  const value = typeof raw === "string" ? (JSON.parse(raw) as unknown) : raw;
  return isAthleteProfile(value) ? value : null;
}

function parseDaily(row: DailyRow): StoredDaily | null {
  const payload = typeof row.payload === "string" ? (JSON.parse(row.payload) as unknown) : row.payload;
  if (!isDailyInputs(payload)) return null;
  return {
    ...payload,
    date: String(row.on_date).slice(0, 10),
    call: row.call as ReadinessCall,
    overridden: Boolean(row.overridden),
    at: String(row.created_at),
  };
}

export const loadAthleteBundle = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const profiles = await sql<ProfileRow>`
      select user_id, profile, updated_at from athlete_profiles where user_id = ${context.userId}
    `;
    const dailies = await sql<DailyRow>`
      select on_date, payload, call, overridden, created_at
        from daily_checkins
       where user_id = ${context.userId}
       order by on_date desc
       limit 28
    `;
    return {
      profile: profiles[0] ? parseProfile(profiles[0].profile) : null,
      daily: dailies.map(parseDaily).filter((row): row is StoredDaily => Boolean(row)),
    };
  });

export const saveAthleteProfileRemote = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ profile: z.unknown() }))
  .handler(async ({ context, data }) => {
    if (!isAthleteProfile(data.profile)) throw new Error("Invalid athlete profile");
    const sql = await getSql();
    const payload = JSON.stringify(data.profile);
    await sql.query(
      `insert into athlete_profiles (user_id, profile, updated_at)
       values ($1, $2::jsonb, now())
       on conflict (user_id) do update set profile = excluded.profile, updated_at = now()`,
      [context.userId, payload],
    );
    return { ok: true as const };
  });

export const saveDailyRemote = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      payload: z.unknown(),
      call: z.enum(["ready", "reduce", "easy", "rest"]),
      overridden: z.boolean(),
    }),
  )
  .handler(async ({ context, data }) => {
    if (!isDailyInputs(data.payload)) throw new Error("Invalid daily check-in");
    const sql = await getSql();
    const payload = JSON.stringify(data.payload);
    await sql.query(
      `insert into daily_checkins (user_id, on_date, payload, call, overridden, created_at)
       values ($1, $2::date, $3::jsonb, $4, $5, now())
       on conflict (user_id, on_date) do update set
         payload = excluded.payload,
         call = excluded.call,
         overridden = excluded.overridden,
         created_at = now()`,
      [context.userId, data.date, payload, data.call, data.overridden],
    );
    return { ok: true as const };
  });
