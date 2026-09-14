import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { emptyProfile } from "./athlete.ts";
import { applyScenario, defaultParams, simulate, type ScenarioId } from "./scenario-sim.ts";
import { addDaysIso, startPlan, todayIso, type RollingState } from "./rolling-plan.ts";

const FROM = new Date(2026, 0, 5);

function fifty(): RollingState {
  return startPlan("fifty", addDaysIso(todayIso(FROM), 24 * 7), FROM);
}

describe("what-if simulator", () => {
  it("offers at least two options for every scenario and never recommends a high-risk stack", () => {
    const state = fifty();
    const params = defaultParams(state, todayIso(FROM));
    const ids: ScenarioId[] = [
      "missedWeek",
      "sixWeeks",
      "travel",
      "noRun",
      "fatigue",
      "movePeak",
      "lessElevation",
      "secondEvent",
      "returnIllness",
    ];
    for (const id of ids) {
      const result = simulate(state, id, params, null, todayIso(FROM));
      assert.ok(result.options.length >= 2, id);
      assert.ok(result.options.some((opt) => opt.recommended), id);
      assert.ok(result.options.every((opt) => !(opt.recommended && opt.loadRisk === "high")), id);
    }
  });

  it("does not mutate the live plan while comparing", () => {
    const state = fifty();
    const before = JSON.stringify(state);
    simulate(state, "missedWeek", defaultParams(state, todayIso(FROM)), null, todayIso(FROM));
    assert.equal(JSON.stringify(state), before);
  });

  it("keeps the peak when a missed week is written off, and flags makeup as high risk", () => {
    const state = fifty();
    const result = simulate(state, "missedWeek", defaultParams(state, todayIso(FROM)), null, todayIso(FROM));
    const keep = result.options.find((o) => o.optionId === "keepPeak");
    const makeup = result.options.find((o) => o.optionId === "makeup");
    assert.ok(keep);
    assert.equal(keep.patch.peakOn ?? state.peakOn, state.peakOn);
    assert.equal(keep.loadRisk, "low");
    assert.equal(makeup?.loadRisk, "high");
    assert.equal(makeup?.recommended, false);
    const applied = applyScenario(state, "missedWeek", keep, todayIso(FROM));
    assert.equal(applied.peakOn, state.peakOn);
    assert.ok((applied.calendar ?? 0) > state.calendar);
    assert.ok((applied.adjustments ?? []).some((a) => a.trigger === "missed"));
  });

  it("compressing a 50 km to six weeks marks the window as unrealistic, not a guarantee", () => {
    const state = fifty();
    const params = { ...defaultParams(state, todayIso(FROM)), compressWeeks: 6 };
    const result = simulate(state, "sixWeeks", params, null, todayIso(FROM));
    const compress = result.options.find((o) => o.optionId === "compress");
    assert.ok(compress);
    assert.equal(compress.peakOutlook, "unrealistic");
    assert.ok(compress.remainingAfter <= 7);
  });

  it("cannot-run swaps running days for hiking on the written week", () => {
    const athlete = emptyProfile({
      goal: "fifty",
      peakOn: fifty().peakOn,
      completedAt: "2026-01-05T00:00:00.000Z",
      availableDays: [true, true, true, true, true, true, true],
    });
    const state = fifty();
    const result = simulate(state, "noRun", defaultParams(state, todayIso(FROM)), athlete, todayIso(FROM));
    const hike = result.options.find((o) => o.optionId === "hikeCycle");
    assert.ok(hike?.recommended);
    assert.ok(hike.weekDiff.some((d) => d.to === "hike") || hike.afterWeeks[0]?.days.some((d) => d.key === "hike"));
  });

  it("travel sets an until-date and does not move the peak", () => {
    const state = fifty();
    const result = simulate(state, "travel", defaultParams(state, todayIso(FROM)), null, todayIso(FROM));
    const swap = result.options.find((o) => o.optionId === "swap");
    assert.ok(swap?.recommended);
    assert.ok(swap.patch.travelUntil);
    assert.equal(swap.patch.peakOn ?? state.peakOn, state.peakOn);
  });
});
