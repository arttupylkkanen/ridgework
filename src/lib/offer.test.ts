import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { pickOffer, privacyBody, termsBody } from "./offer.ts";
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
        free.privacyPayments,
        ...free.features,
        ...free.legal,
      ].join(" ");
      assert.doesNotMatch(text, /\b14\b/, `free terms mention 14 in ${locale}: ${text}`);
    });

    it(`keeps the price off the fixed half of the legal pages in ${locale}`, () => {
      // The whole point of `OfferTerms.legal`: if a euro sign or a trial length
      // survives in copy that CHECKOUT_OPEN does not reach, the terms page will
      // contradict the rest of the site again the moment the switch flips.
      const fixed = [
        ...copy.termsPage.body,
        ...copy.privacyPage.bodyBefore,
        ...copy.privacyPage.bodyAfter,
      ].join(" ");
      assert.doesNotMatch(
        fixed,
        /€|\b14 (days|päivää|jours|Tage)\b/,
        `price stuck in fixed legal copy in ${locale}`,
      );
    });

    it(`renders both legal pages whole in ${locale}`, () => {
      const terms = termsBody(copy);
      assert.deepEqual(terms.slice(0, copy.offer.free.legal.length), copy.offer.free.legal);
      assert.equal(terms.length, copy.offer.free.legal.length + copy.termsPage.body.length);

      const privacy = privacyBody(copy);
      assert.equal(
        privacy.length,
        copy.privacyPage.bodyBefore.length + 1 + copy.privacyPage.bodyAfter.length,
      );
      assert.equal(privacy[copy.privacyPage.bodyBefore.length], copy.offer.free.privacyPayments);
      for (const paragraph of privacy) assert.ok(paragraph.trim().length > 0);
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
        assert.ok(terms.legal.length > 0, `${locale}.${name}.legal is empty`);
        for (const paragraph of terms.legal) {
          assert.ok(paragraph.trim().length > 0, `${locale}.${name}.legal has a blank paragraph`);
        }
        assert.ok(
          terms.privacyPayments.trim().length > 0,
          `${locale}.${name}.privacyPayments is empty`,
        );
      }
    });
  }

  it("ships with checkout closed until the company is registered", () => {
    // If this flips, the trial wording goes live everywhere at once — which is
    // the point, but it should be a deliberate edit and not a surprise.
    assert.equal(CHECKOUT_OPEN, false);
  });
});
