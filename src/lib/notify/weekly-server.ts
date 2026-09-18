/**
 * The weekly sender.
 *
 * Driven by a Sunday-evening cron, so the note lands the night before the week
 * it describes. The week it picks and the key it dedupes on both come from
 * `targetMonday`, not from the day it happens to run, so a retry, a duplicated
 * delivery, or a slot that fires late are all harmless.
 *
 * Named `-server.ts`, not `.server.ts`: the import-protection plugin mocks
 * `.server.ts` modules in the client bundle, and this one must never be
 * reachable from a browser at all.
 */
import { randomBytes } from "node:crypto";
import { getCopy } from "@/content";
import { getSql } from "@/lib/db";
import { sendEmail } from "@/lib/email/send.server";
import { isAthleteProfile, type AthleteProfile } from "@/lib/athlete";
import { visiblePersonalizedWeeks } from "@/lib/plan-engine";
import { isRollingState, todayIso, type RollingState } from "@/lib/rolling-plan";
import type { Locale } from "@/lib/locale";
import { SITE } from "@/lib/seo";
import { shouldSend, targetMonday, weeklyNote } from "./weekly";

export type SendReport = { considered: number; sent: number; failed: number };

type Candidate = {
  user_id: string;
  email: string;
  name: string | null;
  token: string | null;
  enabled: boolean | null;
  last_sent_on: string | null;
  profile: unknown;
};

function parseJson(raw: unknown): unknown {
  return typeof raw === "string" ? (JSON.parse(raw) as unknown) : raw;
}

/**
 * English, like the verification and reset mails. The profile carries no
 * language — the desk reads its locale from the URL — so there is nothing to
 * send in. Sending everyone their week in a language they may not read would
 * be worse than the honest limitation, so the helpers below still take a
 * locale and this is the one value passed today.
 */
const NOTE_LOCALE: Locale = "en";

function stopUrl(token: string, locale: Locale): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${SITE}${prefix}/notify?stop=${encodeURIComponent(token)}`;
}

function deskUrl(locale: Locale): string {
  return locale === "en" ? `${SITE}/app` : `${SITE}/${locale}/app`;
}

/**
 * The written week that starts on `monday`, or nothing.
 *
 * Nothing is the right answer for an athlete whose plan has run out or has not
 * started yet: the note exists to say what is written, so there is no version
 * of it that makes sense when nothing is.
 */
function weekStarting(states: RollingState[], profile: AthleteProfile, monday: string) {
  for (const state of states) {
    for (const week of visiblePersonalizedWeeks(state, profile)) {
      if (week.dates[0] === monday) return week;
    }
  }
  return null;
}

export async function sendWeeklyNotes(today = todayIso()): Promise<SendReport> {
  const sql = await getSql();

  // Enrolled, confirmed addresses only, and never one that has turned the note
  // off. The join is left so somebody who has never been considered before
  // still appears, with a null row to be filled in below.
  const rows = await sql<Candidate>`
    select
      u.id as user_id,
      u.email,
      u.name,
      w.token,
      w.enabled,
      w.last_sent_on::text as last_sent_on,
      p.profile
    from "user" u
    join athlete_profiles p on p.user_id = u.id
    left join weekly_notes w on w.user_id = u.id
    where u."emailVerified"
      and coalesce(w.enabled, true)
      and exists (select 1 from enrollments e where e.user_id = u.id)
  `;

  const report: SendReport = { considered: rows.length, sent: 0, failed: 0 };

  for (const row of rows) {
    if (!shouldSend(row.last_sent_on, today)) continue;

    const profile = parseJson(row.profile);
    if (!isAthleteProfile(profile)) continue;

    const enrollments = await sql<{ state: unknown }>`
      select state from enrollments where user_id = ${row.user_id}
    `;
    const states: RollingState[] = [];
    for (const enr of enrollments) {
      const parsed = parseJson(enr.state);
      if (isRollingState(parsed)) states.push(parsed);
    }

    const monday = targetMonday(today);
    const week = weekStarting(states, profile, monday);
    if (!week) continue;

    const copy = getCopy(NOTE_LOCALE);

    // Mint the token before sending, and claim the week before sending too:
    // a mail that goes out twice is worse than one that goes out late, and a
    // crash between the send and the update would otherwise repeat it.
    const token = row.token ?? randomBytes(24).toString("base64url");
    await sql`
      insert into weekly_notes (user_id, token, last_sent_on, updated_at)
      values (${row.user_id}, ${token}, ${monday}, now())
      on conflict (user_id) do update
        set last_sent_on = excluded.last_sent_on, updated_at = now()
    `;

    const note = weeklyNote({
      name: row.name ?? "",
      week,
      sessions: copy.tools.plan.sessions,
      days: copy.tools.week.days,
      deskUrl: deskUrl(NOTE_LOCALE),
      stopUrl: stopUrl(token, NOTE_LOCALE),
    });

    const sent = await sendEmail({ to: row.email, subject: note.subject, text: note.text });
    if (sent.ok) report.sent += 1;
    else report.failed += 1;
  }

  return report;
}

/** The stop link. No account, because unsubscribing must never need one. */
export async function stopWeeklyNotes(token: string): Promise<boolean> {
  const sql = await getSql();
  const rows = await sql<{ user_id: string }>`
    update weekly_notes set enabled = false, updated_at = now()
     where token = ${token}
    returning user_id
  `;
  return Boolean(rows[0]);
}
