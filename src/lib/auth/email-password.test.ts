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
    process.env.EMAIL_FROM = "Ridgework <support@ridgework.org>";
    assert.equal(await required(), false);
  });

  it("requires verification once a mailer can actually deliver", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.EMAIL_FROM = "Ridgework <support@ridgework.org>";
    assert.equal(await required(), true);
  });
});

describe("the QA login is born verified", () => {
  afterEach(restore);

  /** The hook Better Auth runs before it writes a new user row. */
  async function createBefore() {
    process.env.RESEND_API_KEY = "re_test";
    process.env.EMAIL_FROM = "Ridgework <support@ridgework.org>";
    const mod = await import("./email-password.ts");
    const opts = mod.emailPasswordOptions() as {
      databaseHooks: {
        user: { create: { before: (u: { email: string }) => Promise<{ data: unknown }> } };
      };
    };
    return opts.databaseHooks.user.create.before;
  }

  it("marks the QA address verified so a bot can sign in unattended", async () => {
    const before = await createBefore();
    const { data } = await before({ email: "tester@ridgework.org" });
    assert.equal((data as { emailVerified?: boolean }).emailVerified, true);
  });

  it("matches the QA address whatever case it arrives in", async () => {
    const before = await createBefore();
    const { data } = await before({ email: "  Tester@Ridgework.ORG " });
    assert.equal((data as { emailVerified?: boolean }).emailVerified, true);
  });

  it("leaves every other address alone", async () => {
    const before = await createBefore();
    for (const email of [
      "someone@example.com",
      "arttu.pylkkanen@gmail.com",
      "tester@example.com",
    ]) {
      const { data } = await before({ email });
      assert.equal(
        (data as { emailVerified?: boolean }).emailVerified,
        undefined,
        `${email} must still have to verify`,
      );
    }
  });

  it("keeps the rest of the row untouched", async () => {
    const before = await createBefore();
    const { data } = await before({ email: "someone@example.com", name: "Someone" } as {
      email: string;
    });
    assert.equal((data as { name?: string }).name, "Someone");
  });
});
