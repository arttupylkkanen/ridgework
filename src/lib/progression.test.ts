import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  LONG_TARGET,
  buildProgress,
  isDownWeek,
  taperLong,
  wantedLong,
  weekShare,
} from "./progression.ts";

const build = (weekInBuild: number) =>
  wantedLong({ start: 80, target: LONG_TARGET.fifty, weekInBuild, buildWeeks: 22 });

describe("the long run grows", () => {
  it("starts at what the athlete says they can already do", () => {
    assert.equal(build(1), 80);
  });

  it("reaches the objective's target by the end of the build", () => {
    assert.equal(build(22), LONG_TARGET.fifty);
  });

  it("goes up, week after week, outside the down weeks", () => {
    // The bug this replaces: 22 identical weeks.
    for (let w = 1; w < 22; w += 1) {
      if (isDownWeek(w, 22) || isDownWeek(w + 1, 22)) continue;
      assert.ok(
        build(w + 1) > build(w),
        `week ${w + 1} (${build(w + 1)}) did not beat ${build(w)}`,
      );
    }
  });

  it("keeps what an athlete already has when they start above the target", () => {
    // Somebody entering on a 4½-hour longest outing for a 20 km trail race
    // must not be handed a shorter long run than the one they arrived with.
    const veteran = { start: 270, target: LONG_TARGET.trail20, buildWeeks: 10 };
    assert.equal(wantedLong({ ...veteran, weekInBuild: 1 }), 270);
    assert.ok(wantedLong({ ...veteran, weekInBuild: 10 }) >= 270);
  });

  it("does not ask for the race distance", () => {
    // A first 50 km is 7-9 hours. Training for it is not.
    assert.ok(LONG_TARGET.fifty <= 240, "the long target should stop short of the race");
    assert.ok(LONG_TARGET.ultra100 <= 360);
  });
});

describe("down weeks", () => {
  it("arrive every fourth week", () => {
    assert.deepEqual(
      [1, 2, 3, 4, 5, 8, 12, 16].map((w) => isDownWeek(w, 22)),
      [false, false, false, true, false, true, true, true],
    );
  });

  it("take the week and the long run back down", () => {
    assert.ok(build(4) < build(3));
    assert.ok(weekShare(4, 22) < weekShare(3, 22));
  });

  it("never land on the last week before the taper", () => {
    // Two easy weeks back to back at the end of a build throw away the
    // sharpest fitness the athlete will have.
    assert.equal(isDownWeek(20, 20), false);
    assert.equal(isDownWeek(8, 8), false);
  });
});

describe("the weekly budget", () => {
  it("never exceeds the hours the athlete said they have", () => {
    for (let w = 1; w <= 22; w += 1) {
      assert.ok(weekShare(w, 22) <= 1, `week ${w} asks for more than the stated week`);
    }
  });

  it("starts under the full week and builds to it", () => {
    assert.ok(weekShare(1, 22) < 1);
    assert.equal(Math.round(weekShare(22, 22) * 100), 100);
  });
});

describe("edges", () => {
  it("handles a one-week build without dividing by zero", () => {
    assert.equal(buildProgress(1, 1), 1);
    assert.ok(Number.isFinite(weekShare(1, 1)));
    assert.equal(wantedLong({ start: 80, target: 210, weekInBuild: 1, buildWeeks: 1 }), 210);
  });

  it("clamps a week outside the build instead of extrapolating", () => {
    assert.equal(buildProgress(0, 10), 0);
    assert.equal(buildProgress(99, 10), 1);
  });

  it("tapers to half the biggest session the build asked for", () => {
    assert.equal(taperLong({ start: 80, target: 210, buildWeeks: 22 }), 105);
  });
});
