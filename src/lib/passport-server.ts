import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { isRollingState, type RollingState } from "@/lib/rolling-plan";
import {
  PRIVATE_DEFAULT,
  buildSnapshot,
  emptyPassport,
  filterForShare,
  isPassportEvent,
  isPrivacyFlags,
  type PassportEvent,
  type PassportRecord,
  type PrivacyFlags,
  type SharedPassport,
} from "@/lib/passport";

type PassportRow = {
  user_id: string;
  events: unknown;
  privacy: unknown;
  share_token: string | null;
  updated_at: string;
};

type EnrollmentRow = { objective: string; state: unknown };

function parseJson(raw: unknown): unknown {
  return typeof raw === "string" ? (JSON.parse(raw) as unknown) : raw;
}

function parseRecord(row: PassportRow | undefined): PassportRecord {
  if (!row) return emptyPassport();
  const eventsRaw = parseJson(row.events);
  const privacyRaw = parseJson(row.privacy);
  const events = Array.isArray(eventsRaw) ? eventsRaw.filter(isPassportEvent) : [];
  const privacy = isPrivacyFlags(privacyRaw) ? privacyRaw : { ...PRIVATE_DEFAULT };
  return {
    events,
    privacy,
    shareToken: row.share_token,
  };
}

export const loadPassportRemote = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<PassportRow>`
      select user_id, events, privacy, share_token, updated_at
        from passports
       where user_id = ${context.userId}
    `;
    return parseRecord(rows[0]);
  });

export const savePassportRemote = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      events: z.array(z.unknown()),
      privacy: z.unknown(),
      shareToken: z.string().nullable(),
    }),
  )
  .handler(async ({ context, data }) => {
    const events = data.events.filter(isPassportEvent);
    const privacy: PrivacyFlags = isPrivacyFlags(data.privacy) ? data.privacy : { ...PRIVATE_DEFAULT };
    if (!privacy.publicEnabled) {
      privacy.audience = privacy.audience === "private" ? "private" : privacy.audience;
    }
    const token = privacy.publicEnabled ? data.shareToken : null;
    const sql = await getSql();
    await sql.query(
      `insert into passports (user_id, events, privacy, share_token, updated_at)
       values ($1, $2::jsonb, $3::jsonb, $4, now())
       on conflict (user_id) do update set
         events = excluded.events,
         privacy = excluded.privacy,
         share_token = excluded.share_token,
         updated_at = now()`,
      [context.userId, JSON.stringify(events), JSON.stringify(privacy), token],
    );
    return { ok: true as const, shareToken: token };
  });

export const loadSharedPassport = createServerFn({ method: "GET" })
  .validator(z.object({ token: z.string().min(8).max(64) }))
  .handler(async ({ data }): Promise<SharedPassport | null> => {
    const sql = await getSql();
    const rows = await sql<PassportRow>`
      select user_id, events, privacy, share_token, updated_at
        from passports
       where share_token = ${data.token}
    `;
    const row = rows[0];
    if (!row) return null;
    const record = parseRecord(row);
    if (!record.privacy.publicEnabled) return null;
    const enrollments = await sql<EnrollmentRow>`
      select objective, state from enrollments where user_id = ${row.user_id}
    `;
    const states: RollingState[] = [];
    for (const enr of enrollments) {
      const parsed = parseJson(enr.state);
      if (isRollingState(parsed)) states.push(parsed);
    }
    const snap = buildSnapshot(states, record.events, [], states[0]?.objective);
    return filterForShare(snap, record.events, record.privacy, new Date().toISOString().slice(0, 10));
  });
