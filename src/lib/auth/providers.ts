/**
 * The social sign-in buttons this app offers, and where each one authenticates.
 *
 * Two kinds, because Ridgework deploys to its own Vercel project and no longer
 * gets a per-app client injected by the Grok deployer:
 *
 * - `broker` — federated through the shared auth broker (`GROK_AUTH_ISSUER`),
 *   which holds the real Google/X secrets. The app only knows its own client
 *   id/secret and which upstream to ask for (`idp`). Outside the sandbox the
 *   broker only accepts `*.grok-sandbox.com` callbacks for the preview client,
 *   so a broker button on ridgework.org fails at the redirect — which is why
 *   the list is selectable rather than fixed.
 * - `native` — this app's own OAuth client, registered by Ridgework with the
 *   upstream and configured through `GOOGLE_CLIENT_ID` / `GITHUB_CLIENT_ID`
 *   (and their secrets). Better Auth's own `socialProviders`, no broker.
 *
 * Source of truth for BOTH the server (`server.ts` + `social.ts`) and the
 * client (`client.ts` / sign-in buttons). Dependency-free so the client can
 * import it without pulling the server-only Better Auth instance (and `pg`)
 * into the browser bundle — which is also why the env var is read by the
 * callers, not here: the server reads `process.env`, the client reads
 * `import.meta.env`, and both hand the raw string to `socialProvidersFrom`.
 *
 * `providerId` is this app's local id and the OAuth callback path segment
 * (`/api/auth/oauth2/callback/<providerId>` for broker providers,
 * `/api/auth/callback/<providerId>` for native ones); `idp` is the upstream
 * hint the broker reads (Better Auth's id for X is still `twitter`).
 */
export type SocialProvider = {
  /** This app's local provider id; also the callback path segment. */
  providerId: string;
  /** Upstream hint the broker forwards to (Better Auth social id). */
  idp: string;
  /** Human label for the sign-in button. */
  label: string;
  /** Who completes the OAuth handshake — the shared broker, or this app. */
  kind: "broker" | "native";
};

/** Federated through the Grok auth broker. Only works on sandbox preview hosts. */
export const BROKER_PROVIDERS: readonly SocialProvider[] = [
  { providerId: "grok-google", idp: "google", label: "Google", kind: "broker" },
  { providerId: "grok-x", idp: "twitter", label: "X", kind: "broker" },
];

/** This app's own OAuth clients. Each needs its credentials in the environment. */
export const NATIVE_PROVIDERS: readonly SocialProvider[] = [
  { providerId: "google", idp: "google", label: "Google", kind: "native" },
  { providerId: "github", idp: "github", label: "GitHub", kind: "native" },
];

const ALL_PROVIDERS: readonly SocialProvider[] = [...BROKER_PROVIDERS, ...NATIVE_PROVIDERS];

/**
 * Resolve `VITE_SOCIAL_PROVIDERS` into the buttons to render (and the server
 * options to wire).
 *
 * - unset → the broker pair, exactly as before this file grew a second kind,
 *   so the sandbox live preview keeps working untouched;
 * - `"none"` or empty → no social buttons at all (email/password only), which
 *   is the honest default for a deploy with no OAuth client of its own;
 * - a comma/space list of provider ids → those, in the order given.
 *
 * Unknown ids are dropped rather than thrown: a typo in a deploy env var must
 * degrade to "one fewer button", never to a 500 on every page.
 */
export function socialProvidersFrom(raw: string | undefined): readonly SocialProvider[] {
  if (raw === undefined) return BROKER_PROVIDERS;
  const wanted = raw.split(/[\s,]+/).filter(Boolean);
  if (wanted.length === 0 || (wanted.length === 1 && wanted[0] === "none")) return [];
  return wanted
    .map((id) => ALL_PROVIDERS.find((p) => p.providerId === id))
    .filter((p): p is SocialProvider => Boolean(p));
}
