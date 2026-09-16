import assert from "node:assert/strict";
import { test } from "node:test";
import { BROKER_PROVIDERS, socialProvidersFrom } from "./providers.ts";

test("an unset variable keeps the broker pair, so the sandbox preview is unchanged", () => {
  assert.deepEqual(socialProvidersFrom(undefined), BROKER_PROVIDERS);
});

test('"none" and an empty string leave email/password on its own', () => {
  assert.deepEqual(socialProvidersFrom("none"), []);
  assert.deepEqual(socialProvidersFrom(""), []);
  assert.deepEqual(socialProvidersFrom("   "), []);
});

test("a list selects those providers, in the order given", () => {
  const picked = socialProvidersFrom("github,google");
  assert.deepEqual(
    picked.map((p) => p.providerId),
    ["github", "google"],
  );
  assert.deepEqual(
    picked.map((p) => p.kind),
    ["native", "native"],
  );
});

test("a typo drops one button rather than throwing on every page", () => {
  const picked = socialProvidersFrom("gogle, google");
  assert.deepEqual(
    picked.map((p) => p.providerId),
    ["google"],
  );
});

test("broker and native ids are distinct, so a selection can never mean both", () => {
  const brokerIds = new Set(BROKER_PROVIDERS.map((p) => p.providerId));
  for (const p of socialProvidersFrom("google,github")) {
    assert.equal(brokerIds.has(p.providerId), false);
  }
});
