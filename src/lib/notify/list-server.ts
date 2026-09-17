/**
 * The "tell me when it opens" list.
 *
 * Named `-server.ts`, not `.server.ts`: the import-protection plugin mocks
 * `.server.ts` modules in the client bundle, and a mocked server function
 * returns a truthy object — so the form would say "check your inbox" for a
 * message that was never sent.
 *
 * Nothing here is authenticated, which is the point: the whole reason the list
 * exists is that a stranger who has read one guide should not have to invent a
 * password to say "tell me when this is ready". That makes the two rules below
 * load-bearing — a confirmation mail is the only thing that puts an address on
 * the list, and the form's answer never depends on whether the address was
 * already there.
 */
import { createServerFn } from "@tanstack/react-start";
import { randomBytes } from "node:crypto";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { sendEmail } from "@/lib/email/send.server";
import { SITE } from "@/lib/seo";
import { LOCALES } from "@/lib/locale";
import { FIRST_OBJECTIVES } from "@/lib/first-person";
import { normalizeEmail, type JoinOutcome } from "./list";

/**
 * How long a pending address waits before another confirmation mail can be
 * sent to it. This endpoint is public, so without the wait anyone could post
 * the same address in a loop and use Ridgework to flood an inbox.
 */
const RESEND_AFTER = "15 minutes";

function newToken(): string {
  return randomBytes(24).toString("base64url");
}

function confirmUrl(token: string, locale: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${SITE}${prefix}/notify?confirm=${encodeURIComponent(token)}`;
}

export function leaveUrl(token: string, locale: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${SITE}${prefix}/notify?leave=${encodeURIComponent(token)}`;
}

export const joinNotifyList = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().max(254),
      goal: z.enum(FIRST_OBJECTIVES).optional(),
      peak: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .optional(),
      locale: z.enum(LOCALES).default("en"),
    }),
  )
  .handler(async ({ data }): Promise<JoinOutcome> => {
    const email = normalizeEmail(data.email);
    if (!email) return { ok: false, reason: "badEmail" };

    const sql = await getSql();
    const token = newToken();

    // One row per address. A second request re-arms a pending row with a fresh
    // token and the context the person was looking at this time, but never
    // clears `confirmed_at` — somebody who already said yes should not be able
    // to be quietly un-said-yes by a stranger typing their address in.
    const rows = await sql<{ token: string; confirmed_at: string | null }>`
      insert into notify_list (email, token, goal, peak_on, locale, last_sent_at)
      values (${email}, ${token}, ${data.goal ?? null}, ${data.peak ?? null}, ${data.locale}, now())
      on conflict (email) do update
        set token = case
              when notify_list.confirmed_at is null and coalesce(notify_list.last_sent_at, 'epoch'::timestamptz) < now() - ${RESEND_AFTER}::interval
                then excluded.token
              else notify_list.token
            end,
            goal = coalesce(excluded.goal, notify_list.goal),
            peak_on = coalesce(excluded.peak_on, notify_list.peak_on),
            locale = excluded.locale,
            last_sent_at = case
              when notify_list.confirmed_at is null and coalesce(notify_list.last_sent_at, 'epoch'::timestamptz) < now() - ${RESEND_AFTER}::interval
                then now()
              else notify_list.last_sent_at
            end
      returning token, confirmed_at::text as confirmed_at
    `;
    const row = rows[0];
    if (!row) return { ok: false, reason: "failed" };

    // Already confirmed: say the same thing, send nothing. Re-sending would let
    // the form be used to mail somebody repeatedly.
    if (row.confirmed_at) return { ok: true };

    // The returned token is ours exactly when this call armed the row — on a
    // fresh insert, or on an update that passed the wait above. Anything else
    // means somebody asked again inside the window, so no second mail goes out.
    // The caller is told the same thing either way, because a form that says
    // "we already emailed you" tells a stranger whether an address is listed.
    if (row.token !== token) return { ok: true };

    const sent = await sendEmail({
      to: email,
      subject: "Confirm: tell me when Ridgework opens",
      text: [
        "Somebody — we hope you — asked to be told when Ridgework opens.",
        "",
        "Confirm that this is your address:",
        confirmUrl(row.token, data.locale),
        "",
        "That is the whole list. One message when the checkout opens, and nothing else:",
        "no newsletter, no training tips, no reminders to log your run.",
        "",
        "If this was not you, ignore this message and nothing is ever sent again.",
        "You can also remove the address right now, without an account:",
        leaveUrl(row.token, data.locale),
        "",
        "Ridgework — support@ridgework.org",
      ].join("\n"),
    });
    if (!sent.ok) return { ok: false, reason: "failed" };
    return { ok: true };
  });

/**
 * `left` means the address is gone from the reminder list; `stopped` means the
 * weekly note is off but the account and its plan are untouched. They are
 * different promises, so they are different words.
 */
export type TokenOutcome = "confirmed" | "left" | "stopped" | "unknown";

export const confirmNotify = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(8).max(128) }))
  .handler(async ({ data }): Promise<TokenOutcome> => {
    const sql = await getSql();
    const rows = await sql<{ email: string }>`
      update notify_list
         set confirmed_at = coalesce(confirmed_at, now())
       where token = ${data.token}
      returning email
    `;
    return rows[0] ? "confirmed" : "unknown";
  });

/**
 * Leaving takes the same token and no account, because asking somebody to sign
 * in to stop hearing from you is the oldest bad manners on the internet.
 */
export const leaveNotify = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(8).max(128) }))
  .handler(async ({ data }): Promise<TokenOutcome> => {
    const sql = await getSql();
    const rows = await sql<{ email: string }>`
      delete from notify_list where token = ${data.token} returning email
    `;
    return rows[0] ? "left" : "unknown";
  });

/**
 * The weekly note's stop link, handled here so /notify is the single page an
 * address is ever sent to. It lives beside the reminder list rather than in
 * the sender because this is the client-facing half; the sender never runs in
 * a browser.
 */
export const stopWeekly = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(8).max(128) }))
  .handler(async ({ data }): Promise<TokenOutcome> => {
    const { stopWeeklyNotes } = await import("./weekly-server");
    return (await stopWeeklyNotes(data.token)) ? "stopped" : "unknown";
  });
