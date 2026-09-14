import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { applyReadiness, type DayPlan } from "./readiness.ts";

const week: DayPlan[] = [
  { type: "easy", notes: "" },
  { type: "hard", notes: "" },
  { type: "easy", notes: "" },
  { type: "steady", notes: "" },
  { type: "rest", notes: "" },
  { type: "easy", notes: "" },
  { type: "easy", notes: "" },
];

describe("applyReadiness", () => {
  it("leaves a fresh or ok week unchanged", () => {
    assert.deepEqual(applyReadiness(week, "fresh"), week);
    assert.deepEqual(applyReadiness(week, "ok"), week);
  });

  it("drops hard and steady to easy when tired", () => {
    const next = applyReadiness(week, "tired");
    assert.equal(next[1].type, "easy");
    assert.equal(next[3].type, "easy");
    assert.equal(next[4].type, "rest");
    assert.equal(next[0].type, "easy");
  });

  it("turns hard and steady into rest when wrecked", () => {
    const next = applyReadiness(week, "wrecked");
    assert.equal(next[1].type, "rest");
    assert.equal(next[3].type, "rest");
    assert.equal(next[0].type, "easy");
    assert.equal(next[4].type, "rest");
  });
});
