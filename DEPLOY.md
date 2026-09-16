# Deploying Ridgework

Ridgework deploys to **its own Vercel project**, connected straight to this Git
repository. Nothing about the build depends on the Grok Build platform any
more: the app owns every tag in `<head>`, serves its own PWA manifest and icons,
and the deploy is triggered by a push rather than by a publish button.

The build target has always been Vercel — `vite.config.ts` runs
`nitro({ preset: "vercel" })` and emits Build Output API v3 into
`.vercel/output`. What changed is who owns the project and the environment.

---

## 1. Create the project (once)

1. vercel.com → **Add New… → Project** → import `arttupylkkanen/ridgework`.
2. Framework preset: **Other**. `vercel.json` already pins
   `buildCommand: "npm run build"`, and Vercel picks up `.vercel/output`
   automatically — do not set an output directory.
3. Production branch: `main`.
4. **Settings → Functions → Region: Paris (cdg1)**. The database and the
   audience are both in Europe; the default US region adds a transatlantic
   round trip to every server-rendered page.

`npm run build` ends with `node scripts/migrate.mjs`, which applies every
pending file in `migrations/` to `DATABASE_URL` inside one transaction each and
records it in `_migrations`. So **the first production deploy applies
`0008_integrations.sql` by itself** — no manual migration step.

## 2. Environment variables

Set these under **Settings → Environment Variables**, scoped to Production (and
Preview where noted). Nothing here belongs in the repo.

### Required

| Variable                | Value                                         | Why                                                                                                                  |
| ----------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`          | the Neon Postgres connection string           | Without it the app silently falls back to in-process PGLite, which is wiped on every cold start.                     |
| `BETTER_AUTH_SECRET`    | 32+ random bytes, e.g. `openssl rand -hex 32` | Signs session cookies. Changing it signs everyone out.                                                               |
| `BETTER_AUTH_URL`       | `https://ridgework.org`                       | The app's own auth origin; becomes the OAuth `redirect_uri` base.                                                    |
| `VITE_AUTH_ENABLED`     | `true`                                        | Anything but the string `false`; `false` selects the dev user.                                                       |
| `VITE_SOCIAL_PROVIDERS` | `none`                                        | See §3. Leaving it unset offers Google and X through the Grok broker, which will reject the callback on this domain. |

### Email (required before sign-up works)

| Variable         | Value                                  |
| ---------------- | -------------------------------------- |
| `RESEND_API_KEY` | the Resend API key                     |
| `EMAIL_FROM`     | e.g. `Ridgework <hello@ridgework.org>` |

`mailerConfigured()` needs **both**. Until they are set, `emailVerificationRequired()`
returns false and sign-up lets any address through unverified — which is the
behaviour you flagged. Add SPF and DKIM for `ridgework.org` in Resend first, or
the mail lands in spam and nobody completes verification.

### Billing (only once the SIREN exists)

`CHECKOUT_OPEN` in `src/lib/billing.ts` is `false`, so the server refuses to open
a checkout regardless of these. Flip that constant and set:

| Variable               | Value                              |
| ---------------------- | ---------------------------------- |
| `POLAR_ACCESS_TOKEN`   | Polar organization access token    |
| `POLAR_WEBHOOK_SECRET` | Polar webhook signing secret       |
| `POLAR_SERVER`         | `production` (defaults to sandbox) |
| `POLAR_CHECKOUT_URL`   | only to override the hosted link   |

### Not needed on Vercel

`VITE_PUBLIC_HOSTNAME` (only the unwired platform scripts read it — the share
card URL is `https://ridgework.org/og.jpg` from `src/lib/seo.ts`),
`GROK_AUTH_*`, `GROK_PROJECT_ID`, `GROK_GATE_ORIGIN`, `GROK_CONNECTOR*`.
Leave every one of them unset.

## 3. Sign-in after the move

`VITE_SOCIAL_PROVIDERS` decides which social buttons exist, and both the server
(`src/lib/auth/social.ts`) and the browser (`src/lib/auth/client.ts`) read the
same variable, so they cannot disagree.

- **`none`** — email/password only. Correct until you own an OAuth client.
- **unset** — `grok-google` and `grok-x`, federated through the Grok auth
  broker. The broker holds the real Google and X secrets and only accepts
  `*.grok-sandbox.com` callbacks for the shared preview client, so on
  ridgework.org these buttons render fine and then fail at the redirect. Never
  ship this value to production.
- **`google`** and/or **`github`** — this app's own OAuth clients, once you
  register them:

  | Provider | Where                                                                            | Authorized redirect URI                          |
  | -------- | -------------------------------------------------------------------------------- | ------------------------------------------------ |
  | Google   | console.cloud.google.com → APIs & Services → Credentials → OAuth client ID (Web) | `https://ridgework.org/api/auth/callback/google` |
  | GitHub   | github.com/settings/developers → New OAuth App                                   | `https://ridgework.org/api/auth/callback/github` |

  Then set `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` (and/or the `GITHUB_*`
  pair). A provider selected without its credentials is dropped server-side, so
  a half-finished setup shows one fewer button rather than an error page.

Existing accounts are unaffected: sessions, users and the email/password
identities all live in your own Postgres, not in the broker. Accounts that were
created through `grok-google` or `grok-x` keep their rows but lose their way in
— those people sign in again with the same email address and a password, and
account linking attaches the native Google identity to the existing user.

## 4. Domain and cutover

1. Vercel → **Settings → Domains** → add `ridgework.org` and `www.ridgework.org`,
   and set `www` to redirect to the apex.
2. At the registrar, point DNS at Vercel: `A @ → 76.76.21.21` and
   `CNAME www → cname.vercel-dns.com` (use whatever Vercel's panel prints — it
   is authoritative over this line).
3. Deploy to the Vercel URL **first** and check it end to end while DNS still
   points at the old host. Then switch DNS. Propagation is minutes, not days.
4. After the switch, verify:
   - `curl -s https://ridgework.org | grep -ci grok` → `0`
   - `curl -sI https://ridgework.org/__grok/manifest.webmanifest` → 404
   - the share card at `https://ridgework.org/og.jpg`
   - sign up with a real address and confirm the verification mail arrives
   - `https://ridgework.org/sitemap.xml` and `/robots.txt`

## 5. What stayed behind

`scripts/grok-pwa-*`, `server/middleware/grok-pwa.ts`, `public/__grok/` and
`.grok/` are still in the repository — the sandbox contract forbids deleting
them — but **nothing calls them**. `vite.config.ts` no longer mounts
`grokPwaPlugin()` and no longer passes `serverDir` to Nitro, so the deployed
function never scans that middleware. A test in
`scripts/grok-pwa-plugin.test.mjs` asserts both lines stay absent, so re-adding
either one fails `npm test`.

`src/lib/app-data/` (Grok connectors) is imported by no route or component.
`PreviewHostBridge` is now rendered only under `import.meta.env.DEV`, so the
production bundle contains no listener for `grok.com` messages.
