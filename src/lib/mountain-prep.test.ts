import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { emptyProfile } from "./athlete.ts";
import {
  buildPrep,
  emptyWeather,
  needsAltitude,
  prepPhase,
  typicalDayMinutes,
} from "./mountain-prep.ts";
import { startPlan } from "./rolling-plan.ts";

const FROM = new Date(2026, 0, 5);

describe("mountain-day prep", () => {
  it("does not treat a 20 km trail as an altitude or ice problem", () => {
    const profile = emptyProfile({
      goal: "trail20",
      peakOn: "2026-04-01",
      terrain: "rolling",
      equipment: ["trailShoes"],
      completedAt: "2026-01-01T00:00:00.000Z",
    });
    const ws = buildPrep({ profile, today: "2026-03-01" });
    assert.equal(ws.altitudeRelevant, false);
    assert.ok(ws.items.some((i) => i.id === "altitude.notAnIssue"));
    assert.ok(!ws.items.some((i) => i.id.startsWith("equipment.crampons")));
    assert.ok(ws.items.some((i) => i.id === "nutrition.shortRace"));
  });

  it("flags missing ice kit on an alpine day, and drops the flag when crampons are listed", () => {
    const missing = emptyProfile({
      goal: "alpine",
      peakOn: "2026-03-20",
      terrain: "highAlpine",
      equipment: ["trailShoes", "pack"],
      completedAt: "x",
    });
    const owned = emptyProfile({ ...missing, equipment: ["trailShoes", "pack", "crampons", "iceAxe"] });
    const a = buildPrep({ profile: missing, today: "2026-03-01" });
    const b = buildPrep({ profile: owned, today: "2026-03-01" });
    assert.ok(a.items.some((i) => i.id === "equipment.cramponsMissing"));
    assert.ok(b.items.some((i) => i.id === "equipment.cramponsOwned"));
    assert.ok(!b.items.some((i) => i.id === "equipment.cramponsMissing"));
  });

  it("uses fat-adapted fuel for the engine, not race-gel theatre", () => {
    const profile = emptyProfile({ goal: "engine", peakOn: "2026-06-01", completedAt: "x" });
    const ws = buildPrep({ profile, today: "2026-03-01" });
    assert.ok(ws.items.some((i) => i.id === "nutrition.engineFat"));
    assert.ok(!ws.items.some((i) => i.id === "nutrition.gutTraining"));
  });

  it("adds night kit for a 100 km ultra", () => {
    const profile = emptyProfile({
      goal: "ultra100",
      peakOn: "2026-09-01",
      longest: "m240p",
      completedAt: "x",
    });
    const ws = buildPrep({ profile, today: "2026-06-01" });
    assert.ok(ws.items.some((i) => i.id === "equipment.nightKit"));
    assert.equal(typicalDayMinutes("ultra100") > typicalDayMinutes("fifty"), true);
  });

  it("expedition altitude is about rotations and descent, not a diagnosis", () => {
    const profile = emptyProfile({
      goal: "expedition",
      peakOn: "2026-10-01",
      terrain: "highAlpine",
      completedAt: "x",
    });
    const ws = buildPrep({ profile, today: "2026-04-01" });
    assert.equal(needsAltitude("expedition", "highAlpine"), true);
    assert.ok(ws.items.some((i) => i.id === "altitude.rotations"));
    assert.ok(ws.items.some((i) => i.id === "altitude.notDiagnosis"));
    assert.ok(ws.items.some((i) => i.id === "altitude.descend"));
  });

  it("snow on the forecast without crampons is a kit mismatch, not a hidden default", () => {
    const profile = emptyProfile({
      goal: "alpine",
      peakOn: "2026-03-15",
      terrain: "highAlpine",
      equipment: ["trailShoes"],
      completedAt: "x",
    });
    const weather = { ...emptyWeather(), precip: "snow" as const };
    const ws = buildPrep({ profile, weather, today: "2026-03-01" });
    assert.ok(ws.items.some((i) => i.id === "equipment.snowNoCrampons"));
    assert.ok(ws.items.some((i) => i.id === "clothing.snowKit"));
  });

  it("young kids and work travel add logistics that a generic list would miss", () => {
    const profile = emptyProfile({
      goal: "fifty",
      peakOn: "2026-05-01",
      constraints: ["youngKids", "travelHeavy"],
      completedAt: "x",
    });
    const ws = buildPrep({ profile, today: "2026-04-01" });
    assert.ok(ws.items.some((i) => i.id === "logistics.familyCover"));
    assert.ok(ws.items.some((i) => i.id === "logistics.workTravel"));
  });

  it("after the peak date the workspace still exists and debrief is core", () => {
    const profile = emptyProfile({ goal: "alpine", peakOn: "2026-03-01", completedAt: "x" });
    const ws = buildPrep({ profile, today: "2026-03-04" });
    assert.equal(ws.phase, "after");
    const write = ws.items.find((i) => i.id === "debrief.writeSameDay");
    assert.ok(write?.core);
  });

  it("a short longest-outing band on a 50 km is named, not hidden in a readiness score", () => {
    const profile = emptyProfile({
      goal: "fifty",
      peakOn: "2026-06-01",
      longest: "m60",
      completedAt: "x",
    });
    const state = startPlan("fifty", "2026-06-01", FROM);
    const ws = buildPrep({ profile, state, today: "2026-01-10" });
    assert.ok(ws.items.some((i) => i.id === "fitness.longestGap"));
    assert.equal(ws.items.find((i) => i.id === "fitness.longestGap")?.values.longest, 50);
  });

  it("phase follows days to the peak, not a mysterious score", () => {
    assert.equal(prepPhase("2026-06-01", "2026-01-01"), "build");
    assert.equal(prepPhase("2026-06-01", "2026-05-20"), "approach");
    assert.equal(prepPhase("2026-06-01", "2026-05-28"), "week");
    assert.equal(prepPhase("2026-06-01", "2026-06-01"), "day");
    assert.equal(prepPhase("2026-06-01", "2026-06-03"), "after");
  });
});
