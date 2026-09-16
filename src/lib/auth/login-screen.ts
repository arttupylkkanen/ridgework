/**
 * Which screen the login page is on, and what an auth failure actually means.
 *
 * Pulled out of the component because the old page kept its state in loose
 * booleans that nothing ever reset: `verifySent` was set once and never
 * cleared, and it rendered *above* a form that stayed live. So the page could
 * truthfully say "we sent you a link", then sign you straight in on the next
 * submit — which is exactly what it did.
 *
 * A screen is one thing at a time. The form and the messages that replace it
 * cannot both be on stage.
 */

export type LoginScreen =
  /** Sign in or sign up. */
  | { kind: "form" }
  /** A verification link is out; the form is gone until they use it. */
  | { kind: "verifySent"; email: string }
  /** A reset link is out. Same wording whether or not the address exists. */
  | { kind: "resetSent"; email: string }
  /** Arrived from a reset link: choose a new password. */
  | { kind: "setPassword"; token: string }
  /** The reset link was used already, or expired. */
  | { kind: "linkExpired" }
  /** Password changed; sign in with it. */
  | { kind: "resetDone" };

/**
 * Better Auth's reset callback bounces the browser back to `redirectTo` with
 * either `?token=…` or `?error=INVALID_TOKEN`, so the arriving URL decides the
 * screen before any state exists.
 */
export function screenFromQuery(token: string | null, error: string | null): LoginScreen {
  if (error === "INVALID_TOKEN") return { kind: "linkExpired" };
  const clean = (token ?? "").trim();
  if (clean) return { kind: "setPassword", token: clean };
  return { kind: "form" };
}

export type SignUpFailure = "alreadyRegistered" | "weakPassword" | "failed";
export type SignInFailure = "unverified" | "badCredentials" | "failed";

function text(error: { code?: string; message?: string } | null | undefined): string {
  return `${error?.code ?? ""} ${error?.message ?? ""}`.toUpperCase();
}

/**
 * Better Auth reports a duplicate address as `USER_ALREADY_EXISTS`. Saying so
 * plainly is a deliberate trade: it confirms the address is registered, which
 * the sign-in form leaks anyway, and the alternative — a cheerful "check your
 * email" for a message nobody sent — is how this page lost an afternoon.
 */
export function readSignUpError(error: { code?: string; message?: string } | null): SignUpFailure {
  const t = text(error);
  if (t.includes("USER_ALREADY_EXISTS") || t.includes("ALREADY EXISTS")) return "alreadyRegistered";
  if (t.includes("PASSWORD") && (t.includes("SHORT") || t.includes("WEAK"))) return "weakPassword";
  return "failed";
}

export function readSignInError(error: { code?: string; message?: string } | null): SignInFailure {
  const t = text(error);
  if (t.includes("EMAIL_NOT_VERIFIED") || t.includes("NOT VERIFIED")) return "unverified";
  if (t.includes("INVALID_EMAIL_OR_PASSWORD") || t.includes("USER_NOT_FOUND")) {
    return "badCredentials";
  }
  return "failed";
}
