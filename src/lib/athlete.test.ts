import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  availableCount,
  emptyProfile,
  isAthleteProfile,
  longestMinutes,
  profileReady,
  weeklyMinutes,
} from "./athlete.ts";

describe("athlete profile", () => {
  it("validates a complete profile", () => {
    const profile = emptyProfile({
      peakOn: "2026-06-14",
      completedAt: "2026-01-05T00:00:00.000Z",
    });
    assert.equal(isAthleteProfile(profile), true);
    assert.equal(profileReady(profile), true);
  });

  it("rejects incomplete or junk data", () => {
    assert.equal(isAthleteProfile(null), false);
    assert.equal(isAthleteProfile({ sport: "running" }), false);
    const incomplete = emptyProfile({ peakOn: "", completedAt: "" });
    assert.equal(profileReady(incomplete), false);
  });

  it("maps volume and longest outing to minutes used by the plan", () => {
    assert.equal(weeklyMinutes("h0_3"), 120);
    assert.equal(weeklyMinutes("h5_8"), 390);
    assert.equal(weeklyMinutes("h12p"), 780);
    assert.equal(longestMinutes("m60"), 50);
    assert.equal(longestMinutes("m150"), 120);
    assert.equal(longestMinutes("m240p"), 270);
  });

  it("requires at least two available days before a plan is ready", () => {
    const profile = emptyProfile({
      peakOn: "2026-06-14",
      completedAt: "2026-01-05T00:00:00.000Z",
      availableDays: [true, false, false, false, false, false, false],
    });
    assert.equal(availableCount(profile.availableDays), 1);
    assert.equal(profileReady(profile), false);
  });
});
