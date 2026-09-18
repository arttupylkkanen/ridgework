import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { chromeEntries, isPlatformChrome } from "./platform-chrome.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("platform chrome under public/", () => {
  it("matches the double-underscore convention, not one hardcoded name", () => {
    assert.equal(isPlatformChrome("__grok"), true);
    assert.equal(isPlatformChrome("__anything-the-sandbox-adds-later"), true);
  });

  it("leaves Ridgework's own assets alone", () => {
    for (const name of ["field", "brand", "shots", "og.jpg", "robots.txt", "favicon.svg"]) {
      assert.equal(isPlatformChrome(name), false, `would have stripped ${name}`);
    }
  });

  it("knows what is in public/ right now", async () => {
    // A canary, not a rule: if the sandbox adds a second chrome directory this
    // fails and somebody reads the strip script before the logo ships.
    const names = await readdir(join(root, "public"));
    assert.deepEqual(chromeEntries(names), ["__grok"]);
  });
});
