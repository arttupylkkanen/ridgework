import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assessReadiness, emptyInputs, emptyLoad, type DailyInputs, type LoadContext } from "./daily-readiness.ts";

function inputs(over: Partial<DailyInputs> = {}): DailyInputs {
  return { ...emptyInputs(), ...over };
}

describe("transparent readiness", () => {
  it("is ready when sleep, fatigue, and recent load are ordinary", () => {
    const result = assessReadiness(inputs({ sleep: 4, fatigue: 2, soreness: 2, motivation: 4, stress: 2 }), emptyLoad());
    assert.equal(result.call, "ready");
    assert.ok(result.reasons.some((r) => r.id === "sleepOk" && r.values.n === 4));
    assert.ok(result.reasons.some((r) => r.id === "fatigueOk" && r.values.n === 2));
    assert.ok(result.reasons.some((r) => r.id === "normalLoad"));
  });

  it("recommends rest when fatigue is 5, with the actual number in the reason", () => {
    const result = assessReadiness(inputs({ fatigue: 5, sleep: 3 }), emptyLoad());
    assert.equal(result.call, "rest");
    assert.ok(result.drivers.some((r) => r.id === "fatigueHigh" && r.values.n === 5));
  });

  it("recommends rest when sleep is 2 and fatigue is 4", () => {
    const result = assessReadiness(inputs({ sleep: 2, fatigue: 4 }), emptyLoad());
    assert.equal(result.call, "rest");
    assert.ok(result.drivers.some((r) => r.id === "sleepLow" && r.values.n === 2));
  });

  it("drops to easy when sleep is poor even if fatigue is moderate", () => {
    const result = assessReadiness(inputs({ sleep: 2, fatigue: 2 }), emptyLoad());
    assert.equal(result.call, "easy");
  });

  it("reduces load when the last three days already held two hard/long sessions", () => {
    const load: LoadContext = { ...emptyLoad(), hardOrLongLast3Days: 2 };
    const result = assessReadiness(inputs({ sleep: 4, fatigue: 2 }), load);
    assert.equal(result.call, "reduce");
    assert.ok(result.drivers.some((r) => r.id === "loadCluster" && r.values.n === 2));
  });



  it("never invents a hidden score — the call is the strictest firing rule", () => {
    const result = assessReadiness(inputs({ sleep: 2, fatigue: 5, soreness: 4 }), {
      ...emptyLoad(),
      hardOrLongLast3Days: 2,
    });
    assert.equal(result.call, "rest");
    assert.ok(result.drivers.length >= 2);
  });
});
