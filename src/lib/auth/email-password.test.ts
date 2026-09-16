import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

const KEYS = ["RESEND_API_KEY", "EMAIL_FROM"] as const;
const saved: Record<string, string | undefined> = {};
for (const key of KEYS) saved[key] = process.env[key];

function restore() {
  for (const key of KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
}

/** Imported fresh each time so the env is read at call time, not module load. */
async function required() {
  const mod = await import("./email-password.ts");
  return mod.emailVerificationRequired();
}

describe("email verification gating", () => {
  afterEach(restore);

  it("does not require verification when no mailer is configured", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.EMAIL_FROM;
    assert.equal(await required(), false);
  });

  it("does not require verification when only half the mailer is configured", async () => {
    process.env.RESEND_API_KEY = "re_test";
    delete process.env.EMAIL_FROM;
    assert.equal(await required(), false);

    delete process.env.RESEND_API_KEY;
    process.env.EMAIL_FROM = "Ridgework <hello@ridgework.org>";
    assert.equal(await required(), false);
  });

  it("requires verification once a mailer can actually deliver", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.EMAIL_FROM = "Ridgework <hello@ridgework.org>";
    assert.equal(await required(), true);
  });
});
