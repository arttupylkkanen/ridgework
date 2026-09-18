import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  exampleSelection,
  formatPeak,
  parseExampleSearch,
  sharedWeekMeta,
} from "./example-link.ts";
import { getCopy } from "../content/index.ts";
import { LOCALES } from "./locale.ts";
import { suggestedPeakOn } from "./rolling-plan.ts";

describe("the example planner's URL", () => {
  it("keeps a goal and a date it recognises", () => {
    assert.deepEqual(parseExampleSearch({ goal: "trail20", peak: "2027-05-01" }), {
      goal: "trail20",
      peak: "2027-05-01",
    });
  });

  it("drops what it does not recognise instead of throwing", () => {
    // These arrive from other people's links, a truncated paste, or a crawler.
    for (const raw of [
      { goal: "ultra100" }, // a real objective, but not one this planner writes
      { goal: 7 },
      { peak: "next tuesday" },
      { peak: "2027-13-45" },
      { peak: "" },
      {},
    ]) {
      assert.deepEqual(parseExampleSearch(raw), {}, `kept something from ${JSON.stringify(raw)}`);
    }
  });

  it("falls back to that objective's full build when no date is given", () => {
    const today = "2026-01-05";
    assert.deepEqual(exampleSelection({ goal: "trail20" }, today), {
      goal: "trail20",
      peakOn: suggestedPeakOn("trail20", today),
    });
  });

  it("leaves a date that has passed alone", () => {
    // The planner says a past date is too soon. Moving it forward would make a
    // shared link answer a question nobody asked.
    const past = "2020-06-01";
    assert.equal(exampleSelection({ goal: "fifty", peak: past }, "2026-01-05").peakOn, past);
  });

  it("defaults to the first 50k when the link carries nothing", () => {
    assert.equal(exampleSelection({}, "2026-01-05").goal, "fifty");
  });
});

describe("a week that has been sent to somebody", () => {
  const copy = getCopy("en");

  it("previews as that week, not as the product", () => {
    // The state went into the URL so three weeks could be sent to a training
    // partner. A link that previews as the generic homepage card wastes that.
    const meta = sharedWeekMeta(copy, { goal: "fifty", peak: "2027-06-12" }, "2026-01-05");
    assert.match(meta.title, /12 June 2027/, "a preview is read by a person, not a parser");
    assert.match(meta.title, new RegExp(copy.examplePlanner.goals.fifty));
    assert.match(meta.description, /12 June 2027/);
  });

  it("names the objective the link actually carries", () => {
    const meta = sharedWeekMeta(copy, { goal: "trail20", peak: "2027-06-12" }, "2026-01-05");
    assert.match(meta.title, new RegExp(copy.examplePlanner.goals.trail20));
  });

  it("fills in the date the planner would have shown when the link omits one", () => {
    const meta = sharedWeekMeta(copy, { goal: "engine" }, "2026-01-05");
    assert.doesNotMatch(meta.title, /\{date\}/, "left a template hole in a preview");
    assert.match(meta.title, /\b20\d\d\b/, "no year in the preview at all");
  });

  it("leaves the bare page alone", () => {
    const meta = sharedWeekMeta(copy, {}, "2026-01-05");
    assert.equal(meta.title, copy.examplePage.title);
    assert.equal(meta.description, copy.examplePage.description);
  });

  it("never leaves a placeholder unfilled, in any locale", () => {
    for (const locale of LOCALES) {
      const meta = sharedWeekMeta(
        getCopy(locale),
        { goal: "fifty", peak: "2027-06-12" },
        "2026-01-05",
      );
      for (const text of [meta.title, meta.description]) {
        assert.doesNotMatch(text, /\{\w+\}/, `${locale} preview has an unfilled slot: ${text}`);
      }
      assert.ok(meta.description.length <= 200, `${locale} preview description is very long`);
    }
  });
});

describe("the peak date as a person would say it", () => {
  it("uses British order for English, matching the og:locale the site sets", () => {
    assert.equal(formatPeak("2027-06-12", "en"), "12 June 2027");
  });

  it("speaks each locale's own date", () => {
    assert.match(formatPeak("2027-05-08", "fi"), /toukokuuta/);
    assert.match(formatPeak("2027-05-08", "de"), /Mai/);
  });

  it("reads the date as written, not as the reader's timezone", () => {
    // A preview built on a server in one timezone must not show the day before.
    assert.equal(formatPeak("2027-01-01", "en"), "1 January 2027");
    assert.equal(formatPeak("2027-12-31", "en"), "31 December 2027");
  });

  it("falls back to the ISO string rather than throwing inside a route head", () => {
    assert.equal(formatPeak("2027-06-12", "not-a-locale"), "12 June 2027");
  });
});
