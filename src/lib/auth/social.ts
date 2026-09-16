/**
 * Server-side half of `./providers`: which social providers are actually wired,
 * and with whose credentials.
 *
 * Kept out of `server.ts` (which the platform template asks not to be rewritten)
 * so the Better Auth call there changes by two spreads rather than a rewrite.
 *
 * A native provider is only wired when BOTH its id and secret are present. A
 * button whose credentials are missing would redirect straight into an upstream
 * `invalid_client` page, so the resolved list is filtered here and the client
 * is told the same list through `VITE_SOCIAL_PROVIDERS` — server and browser
 * read the same variable, so they cannot disagree about what is on offer.
 */
import { NATIVE_PROVIDERS, socialProvidersFrom, type SocialProvider } from "./providers";

/** Read an env var, treating empty/whitespace as unset. */
function env(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

/** Env var pair backing each native provider. */
const NATIVE_CREDENTIALS: Record<string, { id: string; secret: string }> = {
  google: { id: "GOOGLE_CLIENT_ID", secret: "GOOGLE_CLIENT_SECRET" },
  github: { id: "GITHUB_CLIENT_ID", secret: "GITHUB_CLIENT_SECRET" },
};

/** The providers this deploy offers, per `VITE_SOCIAL_PROVIDERS`. */
export function selectedProviders(): readonly SocialProvider[] {
  return socialProvidersFrom(process.env.VITE_SOCIAL_PROVIDERS);
}

/** The broker-federated subset — one `genericOAuth` config entry each. */
export function brokerProviders(): readonly SocialProvider[] {
  return selectedProviders().filter((p) => p.kind === "broker");
}

/** Native provider ids that are both selected AND have credentials present. */
export function nativeProviderIds(): string[] {
  return selectedProviders()
    .filter((p) => p.kind === "native")
    .filter((p) => {
      const keys = NATIVE_CREDENTIALS[p.providerId];
      return Boolean(keys && env(keys.id) && env(keys.secret));
    })
    .map((p) => p.providerId);
}

/**
 * Better Auth's `socialProviders` option for this deploy — `{}` when none are
 * wired, so spreading it into the options object is a no-op in the sandbox.
 */
export function nativeSocialOptions(): {
  socialProviders?: Record<string, { clientId: string; clientSecret: string }>;
} {
  const entries = nativeProviderIds().map((id) => {
    const keys = NATIVE_CREDENTIALS[id];
    return [
      id,
      { clientId: env(keys.id) as string, clientSecret: env(keys.secret) as string },
    ] as const;
  });
  if (entries.length === 0) return {};
  return { socialProviders: Object.fromEntries(entries) };
}

/**
 * Provider ids to trust for account linking. Every native upstream we support
 * returns a verified email, so linking one to an existing local account is
 * safe — and without it, signing in with Google to an address that already
 * registered by email fails with `account_not_linked`.
 */
export function trustedSocialProviderIds(): string[] {
  return NATIVE_PROVIDERS.map((p) => p.providerId);
}
