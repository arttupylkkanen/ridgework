/**
 * Creates (or repairs) the shared QA login so a bot can sign in unattended.
 *
 *   npm run seed:tester
 *
 * Two steps, because neither alone is enough:
 *
 *  1. POST /api/auth/sign-up/email against the running site. Better Auth hashes
 *     the password itself this way — the alternative, writing the row straight
 *     into Postgres, means reimplementing its scrypt format and getting it
 *     subtly wrong.
 *  2. Flip "emailVerified" in the database. In production a mailer is
 *     configured, so `requireEmailVerification` is on (see
 *     src/lib/auth/email-password.ts) and sign-in returns EMAIL_NOT_VERIFIED
 *     until someone opens a link in tester@ridgework.org. A bot cannot do that,
 *     so this does it directly.
 *
 * Step 2 needs DATABASE_URL (the same Neon string the deployment uses). Without
 * it the script still runs step 1 and says the account is unverified, which is
 * all a local dev server needs — it has no mailer, so it does not require
 * verification in the first place.
 *
 * Re-running is safe: an existing account is left alone and only re-verified.
 * It never rewrites the password of an account that already exists; to change
 * that, use the reset-password flow so Better Auth does its own hashing.
 *
 * TEST_ACCOUNT_PASSWORD is required and has no default. The password this
 * account used to ship with was a literal in src/lib/test-account.ts, which is
 * public — see the note there.
 */
import { Pool } from "pg";
import { TEST_ACCOUNT } from "../src/lib/test-account.ts";

const SITE = (process.env.SITE_URL ?? "https://ridgework.org").replace(/\/+$/, "");
const EMAIL = process.env.TEST_ACCOUNT_EMAIL?.trim() || TEST_ACCOUNT.email;
const PASSWORD = process.env.TEST_ACCOUNT_PASSWORD?.trim();
const NAME = TEST_ACCOUNT.name;

function die(message) {
  console.error(`[seed-tester] ${message}`);
  process.exit(1);
}

// No fallback to a literal in the repo. This repository is public, so any
// default here would be a published password for a working production account.
if (!PASSWORD) {
  die(
    "TEST_ACCOUNT_PASSWORD is not set. It is deliberately absent from the " +
      "repository — export it from wherever you keep the bot's credentials.",
  );
}

async function post(path, body) {
  const res = await fetch(`${SITE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: SITE },
    body: JSON.stringify(body),
  });
  let json = null;
  try {
    json = await res.json();
  } catch {
    // Better Auth answers with JSON on every path this script takes; a body
    // that will not parse means something else served the request.
  }
  return { status: res.status, json };
}

async function signUp() {
  const { status, json } = await post("/api/auth/sign-up/email", {
    name: NAME,
    email: EMAIL,
    password: PASSWORD,
  });
  if (status === 200) return "created";
  if (json?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") return "existed";
  die(`sign-up failed (HTTP ${status}): ${json?.message ?? "no message"}`);
}

/**
 * Better Auth has no API for this — verification is only ever cleared by
 * following a mailed link, which is exactly what a bot cannot do.
 */
async function markVerified(pool) {
  const { rowCount } = await pool.query(
    'update "user" set "emailVerified" = true, "updatedAt" = now() where lower(email) = lower($1)',
    [EMAIL],
  );
  if (rowCount === 0) die(`no user row for ${EMAIL} — did sign-up reach ${SITE}?`);
  return rowCount;
}

async function checkSignIn() {
  const { status, json } = await post("/api/auth/sign-in/email", {
    email: EMAIL,
    password: PASSWORD,
  });
  if (status === 200) return { ok: true, verified: json?.user?.emailVerified === true };
  return { ok: false, reason: json?.code ?? `HTTP ${status}` };
}

const databaseUrl = process.env.DATABASE_URL?.trim();

console.log(`[seed-tester] site     ${SITE}`);
console.log(`[seed-tester] account  ${EMAIL}`);

const state = await signUp();
console.log(`[seed-tester] sign-up  ${state}`);

if (databaseUrl) {
  const pool = new Pool({ connectionString: databaseUrl });
  try {
    await markVerified(pool);
    console.log("[seed-tester] verify   emailVerified = true");
  } finally {
    await pool.end();
  }
} else {
  console.log("[seed-tester] verify   skipped — DATABASE_URL is not set");
}

const result = await checkSignIn();
if (!result.ok) {
  die(
    result.reason === "EMAIL_NOT_VERIFIED"
      ? "sign-in refused: EMAIL_NOT_VERIFIED. Set DATABASE_URL and run this again — " +
          "a bot cannot open the link this site mails instead."
      : `sign-in refused: ${result.reason}`,
  );
}
console.log(`[seed-tester] sign-in  ok (emailVerified: ${result.verified})`);
console.log("[seed-tester] done");
