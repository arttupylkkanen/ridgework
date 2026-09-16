import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { exampleHorizon } from "./example-horizon.ts";
import { addDaysIso, recommendedWeeks } from "./rolling-plan.ts";

const TODAY = "2026-09-16";
const out = (weeks: number, goal: "fifty" | "trail20" = "fifty") =>
  exampleHorizon(goal, addDaysIso(TODAY, weeks * 7), TODAY);

describe("the three weeks a stranger sees", () => {
  it("writes a full horizon for a full build", () => {
    const h = out(recommendedWeeks("fifty"));
    assert.equal(h.weeks.length, 3);
    assert.equal(h.weeks[0]?.phase, "base");
  });

  it("cuts base first when the window is short, and starts specific", () => {
    const h = out(8);
    assert.equal(h.weeks[0]?.phase, "specific");
  });

  it("reports identical weeks as identical rather than hiding it", () => {
    // Deep in base, nothing changes week to week — that is the plan, and the
    // example says so instead of showing three columns that look duplicated.
    const h = out(recommendedWeeks("fifty"));
    assert.equal(h.identical, true);
  });

  it("names the week the phase next changes", () => {
    const h = out(recommendedWeeks("fifty"));
    assert.ok(h.nextPhaseAt !== null, "expected a next phase");
    assert.ok(h.nextPhaseAt! > 3, "the change must be beyond the horizon shown");
    assert.equal(h.nextPhase, "specific");
  });

  it("gives every week real minutes, not a bare template", () => {
    for (const week of out(16).weeks) {
      const working = week.days.filter((d) => d.key !== "rest");
      assert.ok(working.length > 0, "a week with no sessions is not a week");
      for (const day of working) {
        assert.ok((day.minutes ?? 0) > 0, `${day.key} has no minutes`);
      }
    }
  });

  it("honours the first person's five training days", () => {
    // firstPersonProfile marks Friday and Sunday unavailable; a seven-day week
    // is the tell that a plan was written for somebody with nothing else on.
    for (const week of out(20).weeks) {
      assert.equal(week.days[4]?.key, "rest", "Friday should stay clear");
      assert.equal(week.days[6]?.key, "rest", "Sunday should stay clear");
    }
  });

  it("returns no weeks for a date that has passed or is days away", () => {
    // The engine floors a plan at one week, so without a guard a date in the
    // past comes back as a taper week for a race that already happened.
    for (const offset of [-7, 0, 3]) {
      const h = exampleHorizon("fifty", addDaysIso(TODAY, offset), TODAY);
      assert.equal(h.weeks.length, 0, `${offset} days out should write nothing`);
      assert.equal(h.identical, false);
    }
  });

  it("handles the 20 km objective as well as the 50", () => {
    const h = out(recommendedWeeks("trail20"), "trail20");
    assert.equal(h.weeks.length, 3);
  });
});
