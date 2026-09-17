import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { exampleSelection, parseExampleSearch } from "./example-link.ts";
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
