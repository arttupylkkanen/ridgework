import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getCopy } from "../content/index.ts";
import { LOCALES } from "./locale.ts";
import { reasonText } from "./utils.ts";

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

/**
 * A reason carries a session key so the engine can stay locale-free. Rendered
 * without resolving it, "quality" was the one English word in an otherwise
 * translated sentence — and a word the athlete has never seen, because the week
 * itself prints the localized name.
 */
describe("a reason speaks the reader's language throughout", () => {
  for (const locale of LOCALES) {
    it(`resolves the session name in ${locale}`, () => {
      const copy = getCopy(locale);
      const text = reasonText(copy, "keySoftened", { key: "quality" });
      assert.ok(text.includes(copy.tools.plan.sessions.quality), `raw key left in: ${text}`);
      assert.ok(!text.includes("{key}"), `unfilled slot in ${locale}`);
    });

    it(`resolves the weekday in ${locale}`, () => {
      const copy = getCopy(locale);
      const text = reasonText(copy, "adherenceDeadDay", { day: 3 });
      assert.ok(text.includes(copy.tools.week.days[3]!), `raw index left in: ${text}`);
    });
  }
});

describe("every session key in a reason is resolved, not just the first", () => {
  for (const locale of LOCALES) {
    it(`renders both sides of a change in ${locale}`, () => {
      // `whyChangedToday` carries two session keys. Resolving only `key` left
      // "Heute geändert: quality → recovery" — and the test that covered `key`
      // passed straight over it.
      const copy = getCopy(locale);
      const text = reasonText(copy, "whyChangedToday", { from: "quality", to: "recovery" });
      assert.ok(text.includes(copy.tools.plan.sessions.quality), `raw 'from' in: ${text}`);
      assert.ok(text.includes(copy.tools.plan.sessions.recovery), `raw 'to' in: ${text}`);
    });
  }
});
