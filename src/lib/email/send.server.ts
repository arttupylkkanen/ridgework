/**
 * Transactional email via Resend's REST API.
 *
 * Deliberately no SDK dependency — this is one POST, and the fewer packages in
 * the auth path the better. Server-only: never import from client code.
 *
 * Needs two env vars on the host:
 *   RESEND_API_KEY   — from the Resend dashboard
 *   EMAIL_FROM       — e.g. "Ridgework <support@ridgework.org>", on a domain
 *                      verified in Resend (SPF + DKIM), or delivery will fail.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function env(key: string): string | undefined {
  const value = typeof process !== "undefined" ? process.env[key]?.trim() : undefined;
  return value ? value : undefined;
}

export function mailerFrom(): string | undefined {
  return env("EMAIL_FROM");
}

/**
 * True only when we can actually deliver. Callers use this to decide whether to
 * *require* email verification: turning the requirement on without a working
 * mailer would lock every new account out with no way to verify.
 */
export function mailerConfigured(): boolean {
  return Boolean(env("RESEND_API_KEY") && mailerFrom());
}

export async function sendEmail(input: {
  to: string;
  subject: string;
  text: string;
}): Promise<{ ok: boolean; error?: string }> {
  const key = env("RESEND_API_KEY");
  const from = mailerFrom();
  if (!key || !from) return { ok: false, error: "mailer_not_configured" };

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ from, to: [input.to], subject: input.subject, text: input.text }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[email] resend rejected", res.status, detail.slice(0, 300));
      return { ok: false, error: `resend_${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "send failed";
    console.error("[email] send failed", message);
    return { ok: false, error: message };
  }
}
