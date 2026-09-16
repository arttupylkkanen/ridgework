import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { pickOffer } from "./offer.ts";
import { CHECKOUT_OPEN } from "./billing.ts";
import { getCopy } from "../content/index.ts";
import { LOCALES } from "./locale.ts";

/**
 * The bug this guards: the pricing card once showed "Free while registration
 * completes" and "14 days free" side by side, because the trial wording lived
 * in copy that rendered whatever CHECKOUT_OPEN said.
 */
describe("the offer has one state at a time", () => {
  for (const locale of LOCALES) {
    const copy = getCopy(locale);

    it(`picks the free terms when checkout is closed in ${locale}`, () => {
      assert.deepEqual(pickOffer(copy.offer, false), copy.offer.free);
      assert.deepEqual(pickOffer(copy.offer, true), copy.offer.trial);
    });

    it(`never promises a trial length in the free terms in ${locale}`, () => {
      const free = copy.offer.free;
      const text = [
        free.cta,
        free.title,
        free.lead,
        free.badge,
        free.line,
        free.laterTitle,
        free.laterBody,
        ...free.features,
      ].join(" ");
      assert.doesNotMatch(text, /\b14\b/, `free terms mention 14 in ${locale}: ${text}`);
    });

    it(`fills every field of both variants in ${locale}`, () => {
      for (const [name, terms] of [
        ["free", copy.offer.free],
        ["trial", copy.offer.trial],
      ] as const) {
        for (const key of [
          "cta",
          "title",
          "lead",
          "badge",
          "line",
          "laterTitle",
          "laterBody",
        ] as const) {
          assert.ok(terms[key].trim().length > 0, `${locale}.${name}.${key} is empty`);
        }
        assert.equal(terms.features.length, 4, `${locale}.${name}.features should have 4 bullets`);
      }
    });
  }

  it("ships with checkout closed until the company is registered", () => {
    // If this flips, the trial wording goes live everywhere at once — which is
    // the point, but it should be a deliberate edit and not a surprise.
    assert.equal(CHECKOUT_OPEN, false);
  });
});
