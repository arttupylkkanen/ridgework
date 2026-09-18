import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getCopy } from "../content/index.ts";
import { LOCALES } from "./locale.ts";

/**
 * A search result truncates what it cannot fit, and a sentence cut mid-word is
 * the first thing a stranger sees of this product. This repo has already lost
 * two locales to it once.
 *
 * The numbers are where Google's desktop results usually clip, not a standard —
 * a little under is safe, a lot over is always wrong.
 */
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

describe("what a search result can actually show", () => {
  for (const locale of LOCALES) {
    const copy = getCopy(locale);

    it(`keeps the ${locale} title inside a search result`, () => {
      assert.ok(
        copy.metaTitle.length <= TITLE_MAX,
        `${locale} title is ${copy.metaTitle.length} chars: ${copy.metaTitle}`,
      );
      assert.ok(copy.metaTitle.includes("Ridgework"), `${locale} title drops the name`);
    });

    it(`keeps the ${locale} description inside a search result`, () => {
      assert.ok(
        copy.metaDescription.length <= DESCRIPTION_MAX,
        `${locale} description is ${copy.metaDescription.length} chars`,
      );
      // A description that stops mid-sentence reads as a broken page.
      assert.match(copy.metaDescription.trim(), /[.!?]$/, `${locale} description has no full stop`);
    });

    it(`fills every hero field in ${locale}`, () => {
      // The hero is the one screen most visitors ever see; a blank in it is
      // not something a type check catches.
      for (const [key, value] of Object.entries(copy.hero)) {
        assert.ok(value.trim().length > 0, `${locale}.hero.${key} is empty`);
      }
    });
  }
});
