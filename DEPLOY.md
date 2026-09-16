# Deploying Ridgework

Ridgework runs on **its own Vercel project**, connected straight to this Git
repository. Nothing about the build depends on the Grok Build platform: the app
owns every tag in `<head>`, serves its own PWA manifest and icons, and a deploy
is triggered by a push to `main` rather than by a publish button.

The build target has always been Vercel — `vite.config.ts` runs
`nitro({ preset: "vercel" })` and emits Build Output API v3 into
`.vercel/output`. What changed is who owns the project and the environment.

This file is written from the migration as it actually went, traps included.
The traps are marked **⚠** and each one cost real time; they are the reason this
document is longer than the happy path would need.

---

## 0. The everyday loop

Once set up, shipping is:

```
push to a branch  →  pull request  →  merge to main  →  Vercel builds  →  live
```

A push to any other branch produces a **Preview** deployment with its own URL
and does not touch ridgework.org. Only `main` is Production.

**Environment variables do not travel with git.** Changing one in Vercel needs
an explicit **Deployments → ⋯ → Redeploy**; a code push will not pick it up
because the code did not change.

To roll back: **Deployments → ⋯ → Promote to Production** on an older row.

---

## 1. Create the project (once)

1. vercel.com → **Add New… → Project** → import `arttupylkkanen/ridgework`.
2. Application Preset: **Other**.
   **⚠** Vercel auto-detects _TanStack Start_ here. `vercel.json` sets
   `"framework": null` and wins either way, but leaving the UI on a different
   preset means the dashboard and the repo disagree about what is in force —
   which is exactly what you do not want when something breaks later.
3. Leave Build Command, Output Directory and Install Command **untouched**.
   They show greyed placeholder text (`npm run build`, `dist`, `yarn install`);
   those are examples, not settings. The real values come from `vercel.json`.
4. Production branch: `main`.
5. **Settings → Functions → Region: Paris (cdg1)**. The database and the
   audience are both in Europe; the default US region adds a transatlantic
   round trip to every server-rendered page.

`npm run build` ends with `node scripts/migrate.mjs`, which applies every
pending file in `migrations/` to `DATABASE_URL`, one transaction each, recorded
in `_migrations`. **The first production deploy applies the whole schema by
itself** — no manual migration step. Confirm it in the build log: look for
`[migrate] applied …` and `[migrate] done — N migration(s)`. If it says
`DATABASE_URL not set — skipping`, the database is not wired and the app is
silently running on a throwaway PGLite.

## 2. Environment variables

### ⚠ The trap that cost an hour

Vercel has **two** places called Environment Variables:

| Team level (wrong)                                        | Project level (right)    |
| --------------------------------------------------------- | ------------------------ |
| Tabs **Projects \| Shared** at the top                    | No such tabs             |
| Reached from the team avatar                              | Reached from the project |
| A variable here reaches **no project** until it is linked | Applies to this project  |

A variable created in the team's **Shared** store is not injected anywhere. The
app sees nothing, `mailerConfigured()` returns false, and sign-up quietly stops
requiring email verification — no error, no warning, just wrong behaviour.

Two ways to fix it, both on the project's page:

- **Add Environment Variable** — define it directly on the project, or
- **Link Shared Variable** — attach an existing shared one. Prefer this when
  the value is a secret you can no longer read (a Resend key is shown once).

A linked shared variable stays under the project page's **Shared** tab. It does
not move to the **Project** tab; that is correct, not a failed link.

### Required

| Variable                | Value                              | Why                                                                                                                                    |
| ----------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`          | Neon connection string (see below) | Without it the app falls back to in-process PGLite, wiped on every cold start.                                                         |
| `BETTER_AUTH_SECRET`    | 64 random characters               | Signs session cookies. Missing → a fresh random secret per process, so users are logged out at random. Changing it signs everyone out. |
| `BETTER_AUTH_URL`       | `https://ridgework.org`            | The app's own auth origin, and the base for OAuth `redirect_uri`. Production only.                                                     |
| `VITE_AUTH_ENABLED`     | `true`                             | Anything but the string `false`; `false` selects the dev user.                                                                         |
| `VITE_SOCIAL_PROVIDERS` | `none`                             | See §3. Unset offers Google and X through the Grok broker, which rejects the callback on this domain.                                  |

**⚠** While `BETTER_AUTH_URL` points at ridgework.org, sign-in does **not** work
on the `*.vercel.app` URL — the origin check rejects it. That is intended, not a
fault. Everything else (pages, plans, robots, sitemap) is testable there.

### Database

Easiest path, and the one taken: **project → Storage → Create Database → Neon**,
region **Europe (Frankfurt)**. Vercel provisions it and writes `DATABASE_URL`
itself, so a long connection string never has to be copied by hand.

Then, on the Neon resource page:

- **Allowed Environments → Production only.** `npm run build` runs the
  migrator, so a preview deploy of any branch would otherwise apply that
  branch's migrations to the production database before anyone approved them.
- **Rotate Secrets** immediately after narrowing it. The credentials were
  created readable; narrowing hides them but does not change them. Rotating on
  a database minutes old costs nothing.
- Then check the project's variable list contains a row named exactly
  `DATABASE_URL`. Neon also writes `DATABASE_URL_UNPOOLED`, `PGHOST`, and
  friends; those are harmless. The app reads only `DATABASE_URL`, and a prefix
  typed into the integration's _Custom Prefix_ field would rename it and break
  everything silently.

Doing it by hand instead: neon.com → Create project → Europe (Frankfurt) →
copy the **Pooled** connection string (the host contains `-pooler`). Serverless
functions open a connection per instance, and the unpooled endpoint runs out.

### Email

Set these **only after** Resend reports the domain **Verified**:

| Variable         | Value                                                  |
| ---------------- | ------------------------------------------------------ |
| `RESEND_API_KEY` | a Resend key with **Sending access** (not Full access) |
| `EMAIL_FROM`     | `Ridgework <support@ridgework.org>`                    |

**⚠** `emailVerificationRequired()` turns on as soon as both exist. Set them
before the domain verifies and every sign-up lands on "check your email" for a
message Resend refuses to send — worse than not requiring verification at all.

Resend setup: **Domains → Add Domain → `ridgework.org`**, region Ireland
(eu-west-1, keeps mail data in the EU). Its **Auto configure** writes the SPF
and DKIM records straight into Cloudflare; the DKIM value is hundreds of
characters, so this is worth the one-time authorization.

`EMAIL_FROM` uses `support@` because that address appears 43 times in the site
copy. Do not invent a second address for outgoing mail: people reply to
verification emails, and a reply to an address nobody reads is lost.

### Billing (only once the SIREN exists)

`CHECKOUT_OPEN` in `src/lib/billing.ts` is `false`, so the server refuses to
open a checkout regardless of these. Flip that constant and set:

| Variable               | Value                              |
| ---------------------- | ---------------------------------- |
| `POLAR_ACCESS_TOKEN`   | Polar organization access token    |
| `POLAR_WEBHOOK_SECRET` | Polar webhook signing secret       |
| `POLAR_SERVER`         | `production` (defaults to sandbox) |
| `POLAR_CHECKOUT_URL`   | only to override the hosted link   |

### Not needed

`VITE_PUBLIC_HOSTNAME` (only the unwired platform scripts read it — the share
card URL is `https://ridgework.org/og.jpg` from `src/lib/seo.ts`),
`GROK_AUTH_*`, `GROK_PROJECT_ID`, `GROK_GATE_ORIGIN`, `GROK_CONNECTOR*`.
Leave every one of them unset.

## 3. Sign-in

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

Sessions, users and email/password identities live in this project's own
Postgres, not in the broker. Accounts created through `grok-google` or
`grok-x` keep their rows but lose their way in — those people sign in again
with the same email address and a password, and account linking attaches a
native Google identity to the existing user.

## 4. Domain and cutover

DNS for ridgework.org is at **Cloudflare**. Two Cloudflare-specific traps below.

### 4.1 Claiming the domain from the old Vercel account

Adding `ridgework.org` under **Settings → Domains → Add Existing** returns
_"This domain is linked to another Vercel account"_. That account is Grok's —
the site was always on Vercel, just not yours.

**⚠ Vercel issues one verification token per domain.** Adding `ridgework.org`
and `www.ridgework.org` needs **two** TXT records, both named `_vercel`:

```
_vercel  TXT  vc-domain-verify=ridgework.org,<token-a>
_vercel  TXT  vc-domain-verify=www.ridgework.org,<token-b>
```

Two records with the same name is normal for TXT. Add the second one alongside
the first; do not edit the first.

**⚠ Do not paste the surrounding quotes** into Cloudflare's Content field.
Cloudflare adds them for display; a literal quote inside the value makes the
check fail with no explanation anywhere.

Both rows then move from red **Verification Required** to red **DNS Change
Required**, which is progress: ownership is settled, the records are not.

### 4.2 Which side serves

Vercel defaults to **www serving and the apex redirecting to it**. That is
backwards for this site: `src/lib/seo.ts` sets `SITE = "https://ridgework.org"`,
so all 60 sitemap URLs and every canonical tag name the apex. Left as Vercel
set it, Google follows a sitemap URL, gets redirected to www, reads a canonical
pointing back at the apex, and goes round again.

Set it explicitly, **apex first** (doing www first makes the pair redirect to
each other):

1. `ridgework.org` → Edit → **Connect to an environment → Production** → Save
2. `www.ridgework.org` → Edit → **Redirect to Another Domain → 308 →
   `ridgework.org`** → Save

### 4.3 The records

| Type  | Name            | Value                  | Proxy        |
| ----- | --------------- | ---------------------- | ------------ |
| A     | `ridgework.org` | `76.76.21.21`          | **DNS only** |
| CNAME | `www`           | `cname.vercel-dns.com` | **DNS only** |

Vercel now recommends a long per-account CNAME target at the apex instead, and
says so in an amber **DNS Change Recommended** banner. The legacy records above
keep working — Vercel states this itself — and they are one short field each
rather than a 30-character random string typed on a phone. The amber banner is
cosmetic; **"Recommended" is not "Required"**, and red is the only colour that
means broken.

**⚠ Proxy off.** Every Vercel record must be grey-cloud **DNS only**. Behind
Cloudflare's proxy, Vercel cannot issue its certificate; the symptom is "Too
many redirects" or a certificate that never completes, and it looks like the
site broke rather than like a toggle.

**⚠ Replace, do not add.** Cloudflare already holds records for the apex and
`www` pointing at the old deployment. Edit those rows. Two live A records send
half the traffic to the old site.

**Do not touch** the rest of the zone: the `MX` rows
(`route1/2/3.mx.cloudflare.net`, Cloudflare Email Routing), `SPF`, both DKIM
records (`cf2024-1._domainkey`, `resend._domainkey`), Resend's `send` and
`rsend` CNAMEs, the OVH mail records (`imap`, `smtp`, `pop3`, `mail`,
`autoconfig`, `autodiscover`) with their SRV rows, and the `NS` records.
Several of those carry the domain's email.

### 4.4 Verify

Use a **private window** — a normal browser holds the old DNS answer and the
old page for hours, and makes a working cutover look like a failure.

- `https://ridgework.org` renders the current hero
- `curl -s https://ridgework.org | grep -ci grok` → `0`
- `https://ridgework.org/__grok/manifest.webmanifest` → 404
- `/robots.txt`, `/sitemap.xml`, `/plans`
- sign up with a `+alias` address and confirm the verification mail arrives

Gmail supports `you+test1@gmail.com`, which is a distinct address to the app and
the same inbox to you — no throwaway account needed.

## 5. Search Console

1. search.google.com/search-console → **Add property → Domain** → `ridgework.org`.
2. It offers to write the TXT record into Cloudflare for you — a one-time
   authorization that grants no further access. Take it; the value is 60
   random characters. The record is `TXT` at the **root** (`@`), not at a
   subdomain like `_vercel`.
3. Verify.
4. **Sitemaps → Add a new sitemap.**
   **⚠** A _Domain_ property spans http, https and every subdomain, so it
   cannot expand a relative path. Enter the **full URL**:
   `https://ridgework.org/sitemap.xml`. The bare `sitemap.xml` that works for a
   _URL prefix_ property is rejected here with "invalid sitemap URL".
5. **URL Inspection** on `https://ridgework.org/` → _Request indexing_, and the
   two or three plan pages you most want ranked. The rest arrives through the
   sitemap; one submission is enough and resubmitting changes nothing.
6. Optionally repeat at bing.com/webmasters, which imports the Search Console
   property directly. Bing feeds DuckDuckGo and ChatGPT search.

Expect nothing for a week or two. Coverage appears under **Pages** before it
appears in results.

### What the sitemap claims

60 URLs: home, guides index, sources, example, field notes and pricing in all
four locales, every guide in all four locales, plus the English plans index and
its seven plan pages. Every translated entry carries the full `hreflang` set
(`en`, `fi`, `fr`, `de`, `x-default`), matching the `<link rel="alternate">`
tags in each page's head — reciprocal both ways, which is what makes Google
honour them rather than ignore the cluster.

`/app`, `/login`, `/calendar/<token>` and `/passport/<token>` are excluded, both
in `robots.txt` and with `noindex` on the responses themselves. The calendar and
passport tokens are capability URLs — the token _is_ the credential — so they
must never be indexed, and `robots.txt` alone only asks politely.

`src/lib/sitemap.test.ts` asserts the URLs are unique, absolute and reciprocal,
and that English-only pages declare no alternates. Add a page to
`translatedPages()` without its `src/routes/$locale/` twin and you put three
404s in the sitemap — that is the mistake the split guards against.

## 6. Receiving mail

Sending is Resend. **Receiving is Cloudflare Email Routing** —
**Email → Email Routing → Routing rules** — which forwards `support@` to a
personal inbox. Check that the rule exists and is enabled; the site promises a
reply within 24–48 hours.

**⚠** Testing this by emailing yourself looks broken. If the routing
destination is your own Gmail and you send _from_ that same Gmail, Gmail
recognises the forwarded copy as your own message and hides it. Cloudflare
knows, and sends a "Missing email from … ?" notice explaining it — receiving
that notice means routing **worked**. Confirm in Gmail's _All Mail_, in
Cloudflare's Email Routing activity log, or by sending from another address.
Real users write from their own addresses and are unaffected.

## 7. What stayed behind

`scripts/grok-pwa-*`, `server/middleware/grok-pwa.ts`, `public/__grok/` and
`.grok/` are still in the repository — the sandbox contract forbids deleting
them — but **nothing calls them**. `vite.config.ts` no longer mounts
`grokPwaPlugin()` and no longer passes `serverDir` to Nitro, so the deployed
function never scans that middleware. A test in
`scripts/grok-pwa-plugin.test.mjs` asserts both lines stay absent, so re-adding
either one fails `npm test`.

`src/lib/app-data/` (Grok connectors) is imported by no route or component.
`PreviewHostBridge` renders only under `import.meta.env.DEV`, so the production
bundle carries no listener for `grok.com` messages.

## 8. Still open

- **SIREN** — unblocks `CHECKOUT_OPEN` in `src/lib/billing.ts` and the Garmin
  Training API application, which is enterprise-only and rejects individuals.
- **DMARC** — the zone has SPF and two DKIM records but no `_dmarc` TXT. Adding
  `v=DMARC1; p=none; rua=mailto:…` improves deliverability and costs nothing.
  DKIM already aligns (`d=ridgework.org`), so this is monitoring, not a fix.
- **Vercel plan** — the Hobby tier is for non-commercial use. Charging money
  means Pro. Same trigger as the SIREN.
