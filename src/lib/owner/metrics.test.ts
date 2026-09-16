import assert from "node:assert/strict";
import { test } from "node:test";
import { EMPTY_COUNTS, engagement, funnel, notes, share, type OwnerCounts } from "./metrics.ts";

function counts(over: Partial<OwnerCounts> = {}): OwnerCounts {
  return { ...EMPTY_COUNTS, ...over };
}

test("a share of nothing is nothing, not zero and not NaN", () => {
  assert.equal(share(0, 0), null);
  assert.equal(share(5, 0), null);
  assert.equal(share(1, Number.NaN), null);
});

test("shares are whole percents", () => {
  assert.equal(share(1, 3), 33);
  assert.equal(share(2, 3), 67);
  assert.equal(share(3, 3), 100);
});

test("an empty database reports zeros, not blanks", () => {
  const steps = funnel(EMPTY_COUNTS);
  assert.equal(steps.length, 5);
  assert.deepEqual(
    steps.map((s) => s.count),
    [0, 0, 0, 0, 0],
  );
  assert.equal(steps[0]!.ofPrevious, null);
});

test("each step is measured against the one above it, not only the top", () => {
  const steps = funnel(
    counts({ signups: 100, verified: 50, onboarded: 40, enrolled: 20, returnedAfterWeek1: 10 }),
  );
  const onboarded = steps.find((s) => s.id === "onboarded")!;
  // 40 of 50 is a healthy step; 40 of 100 hides where the loss happened.
  assert.equal(onboarded.ofPrevious, 80);
  assert.equal(onboarded.ofSignups, 40);
});

test("the first step has nothing to compare against", () => {
  const first = funnel(counts({ signups: 10 }))[0]!;
  assert.equal(first.ofPrevious, null);
  assert.equal(first.ofSignups, null);
});

test("engagement counts resolved sessions, both ways", () => {
  const e = engagement(counts({ sessionsDone: 30, sessionsMissed: 10, sessionsWithMinutes: 6 }));
  assert.equal(e.logged, 40);
  assert.equal(e.doneShare, 75);
  assert.equal(e.minuteShare, 20);
});

test("no sessions means no rates to invent", () => {
  const e = engagement(EMPTY_COUNTS);
  assert.equal(e.logged, 0);
  assert.equal(e.doneShare, null);
  assert.equal(e.minuteShare, null);
});

test("an empty product says so and stops", () => {
  assert.deepEqual(notes(EMPTY_COUNTS), [{ id: "noSignups", severity: "info" }]);
});

test("signups with nothing logged is the one that matters", () => {
  const found = notes(counts({ signups: 3, verified: 3, onboarded: 3, enrolled: 3 }));
  assert.ok(found.some((n) => n.id === "noSessionsLogged" && n.severity === "watch"));
});

test("low verification is called out once there is enough to judge", () => {
  const thin = notes(counts({ signups: 4, verified: 1, sessionsDone: 1 }));
  assert.equal(
    thin.some((n) => n.id === "lowVerification"),
    false,
  );
  const enough = notes(counts({ signups: 10, verified: 3, sessionsDone: 1 }));
  assert.ok(enough.some((n) => n.id === "lowVerification"));
});

test("a healthy product is quiet", () => {
  const found = notes(
    counts({
      signups: 20,
      verified: 18,
      onboarded: 16,
      enrolled: 15,
      returnedAfterWeek1: 9,
      sessionsDone: 120,
      sessionsMissed: 20,
      sessionsWithMinutes: 90,
    }),
  );
  assert.deepEqual(found, []);
});
