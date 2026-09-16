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

async function deliverVerification(input: {
  user: { email: string; name?: string | null };
  url: string;
}) {
  const name = input.user.name?.trim();
  const greeting = name ? `${name},` : "Hello,";
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
  });
}

/** Spread into the Better Auth config in `server.ts`. */
export function emailPasswordOptions() {
  if (!emailAndPasswordEnabled) return {};
  return {
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: emailVerificationRequired(),
    },
    emailVerification: {
      sendOnSignUp: emailVerificationRequired(),
      autoSignInAfterVerification: true,
      sendVerificationEmail: deliverVerification,
    },
  };
}
