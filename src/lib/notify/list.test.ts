import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { normalizeEmail } from "./list.ts";

describe("the notify list's address check", () => {
  it("accepts ordinary addresses, lowercased and trimmed", () => {
    assert.equal(normalizeEmail("  Arttu@Ridgework.ORG "), "arttu@ridgework.org");
    assert.equal(normalizeEmail("a.b+trail@sub.example.co.uk"), "a.b+trail@sub.example.co.uk");
  });

  it("refuses anything that could be smuggled into a mail header", () => {
    for (const bad of [
      "a@b.c\nbcc: someone@else.com",
      "a@b.c, d@e.f",
      '"display" <a@b.c>',
      "a b@c.de",
    ]) {
      assert.equal(normalizeEmail(bad), null, `accepted ${JSON.stringify(bad)}`);
    }
  });

  it("refuses what is plainly not an address", () => {
    for (const bad of ["", "arttu", "@ridgework.org", "a@b", "a@@b.com", "a@b..com", "a@.com"]) {
      assert.equal(normalizeEmail(bad), null, `accepted ${JSON.stringify(bad)}`);
    }
  });
});
