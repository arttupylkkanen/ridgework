/**
 * Local email/password sign-in (this app's Better Auth DB — not the broker).
 *
 * This is the file the template intends you to edit for email/password; the
 * Better Auth options below are assembled here and spread into `server.ts` so
 * that frozen file keeps a single line about this feature.
 */
import { mailerConfigured, sendEmail } from "../email/send.server.ts";

export const emailAndPasswordEnabled = true;

/**
 * Verification is only *required* when a mailer is actually configured.
 *
 * Requiring it without one would lock every new account out permanently: no
 * verification mail could ever arrive, and there is no other way to clear the
 * flag. So an unconfigured host keeps today's behaviour, and setting
 * RESEND_API_KEY + EMAIL_FROM is what turns the requirement on.
 */
export function emailVerificationRequired(): boolean {
  return emailAndPasswordEnabled && mailerConfigured();
}

/**
 * Throw when Resend refuses, so the failure reaches the server log.
 *
 * It does **not** reach the athlete: Better Auth runs this through
 * `runInBackgroundOrAwait`, which catches and logs whatever it throws, and
 * that is not configurable. So sign-up still reports success even when no mail
 * left the building — which is why `verifyBody` does not claim one did.
 *
 * The throw is still worth having. Before it, the old code awaited `sendEmail`
 * and dropped its result, so a refused send was silent everywhere: no error,
 * no log, nothing to find. Now `[email] resend rejected <status>` is one search
 * away in the runtime log, which is the difference between diagnosing this in
 * thirty seconds and losing an afternoon to it.
 */
function orThrow(result: { ok: boolean; error?: string }): void {
  if (!result.ok) throw new Error(`email_send_failed:${result.error ?? "unknown"}`);
}

async function deliverVerification(input: {
  user: { email: string; name?: string | null };
  url: string;
}) {
  const name = input.user.name?.trim();
  const greeting = name ? `${name},` : "Hello,";
  orThrow(
    await sendEmail({
      to: input.user.email,
      subject: "Confirm your email for Ridgework",
      text: [
        greeting,
        "",
        "Confirm this address to finish setting up your Ridgework account:",
        input.url,
        "",
        "If you did not create an account, ignore this message and nothing happens.",
        "",
        "Ridgework — support@ridgework.org",
      ].join("\n"),
    }),
  );
}

/**
 * The reset mail. Deliberately says nothing about whether the address has an
 * account — Better Auth answers the request identically either way, so that
 * the endpoint cannot be used to find out who is a customer.
 */
async function deliverReset(input: { user: { email: string; name?: string | null }; url: string }) {
  const name = input.user.name?.trim();
  const greeting = name ? `${name},` : "Hello,";
  orThrow(
    await sendEmail({
      to: input.user.email,
      subject: "Reset your Ridgework password",
      text: [
        greeting,
        "",
        "Open this link to choose a new password:",
        input.url,
        "",
        "The link works once and expires in an hour.",
        "If you did not ask for this, ignore this message — your password does not change.",
        "",
        "Ridgework — support@ridgework.org",
      ].join("\n"),
    }),
  );
}

/** Spread into the Better Auth config in `server.ts`. */
export function emailPasswordOptions() {
  if (!emailAndPasswordEnabled) return {};
  return {
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: emailVerificationRequired(),
      // Reset only exists when a mailer does. Offering it without one would
      // put a dead end behind the only door a locked-out athlete has.
      ...(mailerConfigured() ? { sendResetPassword: deliverReset } : {}),
      resetPasswordTokenExpiresIn: 60 * 60,
    },
    emailVerification: {
      sendOnSignUp: emailVerificationRequired(),
      autoSignInAfterVerification: true,
      sendVerificationEmail: deliverVerification,
    },
  };
}
