import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  addDaysIso,
  adaptWeek,
  applyCheckin,
  fitSpec,
  nextSeason,
  OBJECTIVES,
  phaseOf,
  qualityFor,
  recommendedWeeks,
  remainingWeeks,
  specFor,
  startPlan,
  suggestedPeakOn,
  todayIso,
  totalWeeks,
  visibleWeeks,
  weekChanges,
  weeksBetween,
  type CheckResult,
  type ObjectiveId,
  type RollingState,
} from "./rolling-plan.ts";

const FROM = new Date(2026, 0, 5); // 5 Jan 2026 local

function start(id: ObjectiveId, weeks?: number): RollingState {
  const fromIso = todayIso(FROM);
  const w = weeks ?? recommendedWeeks(id);
  return startPlan(id, addDaysIso(fromIso, w * 7), FROM);
}

function roll(state: RollingState, n: number, result: CheckResult = "good"): RollingState {
  let next = state;
  for (let i = 0; i < n; i += 1) next = applyCheckin(next, result, "");
  return next;
}

describe("rolling plan", () => {
  it("publishes seven recommended program lengths", () => {
    assert.deepEqual(
      [...OBJECTIVES],
      ["engine", "trail20", "fifty", "ultra100", "alpine", "traverse", "expedition"],
    );
    assert.equal(recommendedWeeks("engine"), 16);
    assert.equal(recommendedWeeks("trail20"), 10);
    assert.equal(recommendedWeeks("fifty"), 24);
    assert.equal(recommendedWeeks("ultra100"), 36);
    assert.equal(recommendedWeeks("alpine"), 10);
    assert.equal(recommendedWeeks("traverse"), 32);
    assert.equal(recommendedWeeks("expedition"), 40);
    assert.equal(totalWeeks("fifty"), 24);
  });

  it("fits extra weeks into aerobic base — longer is the better path", () => {
    const long = fitSpec("fifty", 32);
    assert.equal(long.base, 18);
    assert.equal(long.specific, 12);
    assert.equal(long.taper, 2);
    assert.equal(qualityFor("fifty", 32), "generous");
    assert.equal(qualityFor("fifty", 24), "full");
    assert.equal(qualityFor("fifty", 18), "solid");
    assert.equal(qualityFor("fifty", 12), "tight");
    assert.equal(qualityFor("fifty", 6), "short");
  });

  it("compresses base first, then specific, keeps a taper week even in a short window", () => {
    const tight = fitSpec("fifty", 12);
    assert.equal(tight.base, 0);
    assert.equal(tight.specific, 10);
    assert.equal(tight.taper, 2);
    const short = fitSpec("fifty", 1);
    assert.equal(short.base, 0);
    assert.equal(short.specific, 0);
    assert.equal(short.taper, 1);
  });

  it("suggested peak is recommended weeks out", () => {
    const from = "2026-01-05";
    assert.equal(suggestedPeakOn("alpine", from), addDaysIso(from, 70));
    assert.equal(weeksBetween(from, suggestedPeakOn("alpine", from)), 10);
  });

  it("writes three base weeks at the start of a recommended fifty", () => {
    const weeks = visibleWeeks(start("fifty"));
    assert.equal(weeks.length, 3);
    assert.equal(weeks[0]?.calendar, 1);
    assert.equal(weeks[2]?.calendar, 3);
    assert.ok(weeks.every((week) => week.phase === "base" && !week.eased));
  });

  it("a good week adds the next week to the horizon and keeps the peak date", () => {
    const started = start("fifty");
    const state = applyCheckin(started, "good", "felt easy");
    assert.equal(state.progress, 1);
    assert.equal(state.calendar, 2);
    assert.equal(state.extraBase, 0);
    assert.equal(state.peakOn, started.peakOn);
    const weeks = visibleWeeks(state);
    assert.equal(weeks[0]?.calendar, 2);
    assert.equal(weeks[2]?.calendar, 4);
    assert.equal(weeks[0]?.eased, false);
  });

  it("ok also advances progress without extra tired weeks", () => {
    const state = applyCheckin(start("traverse"), "ok", "");
    assert.equal(state.progress, 1);
    assert.equal(state.extraBase, 0);
  });

  it("a tired week does not move the peak; next week is written again", () => {
    const started = start("alpine");
    const state = applyCheckin(started, "problem", "sick");
    assert.equal(state.progress, 0);
    assert.equal(state.extraBase, 1);
    assert.equal(state.calendar, 2);
    assert.equal(state.peakOn, started.peakOn);
    assert.equal(remainingWeeks(state), 9);
    const weeks = visibleWeeks(state);
    assert.equal(weeks.length, 3);
    assert.equal(weeks[0]?.eased, false);
    assert.equal(weeks[1]?.eased, false);
  });

  it("good after tired resumes progress, keeps extra tired count, peak stays", () => {
    const started = start("alpine");
    const state = applyCheckin(applyCheckin(started, "problem", ""), "good", "");
    assert.equal(state.extraBase, 1);
    assert.equal(state.progress, 1);
    assert.equal(state.peakOn, started.peakOn);
    assert.equal(visibleWeeks(state)[0]?.eased, false);
  });

  it("peaks alpine into specific then taper then done on a recommended window", () => {
    const intoSpecific = roll(start("alpine"), 6);
    assert.equal(phaseOf(intoSpecific), "specific");
    assert.equal(visibleWeeks(intoSpecific)[0]?.phase, "specific");
    const intoTaper = roll(intoSpecific, 3);
    assert.equal(phaseOf(intoTaper), "taper");
    const done = roll(intoTaper, 1);
    assert.equal(phaseOf(done), "done");
    assert.equal(visibleWeeks(done).length, 0);
    assert.equal(applyCheckin(done, "good", "").progress, done.progress);
  });

  it("a tired week at the start of specific stays in the peak window", () => {
    const started = start("alpine");
    const state = applyCheckin(roll(started, 6), "problem", "niggle");
    assert.equal(state.progress, 6);
    assert.equal(state.extraBase, 1);
    assert.equal(state.peakOn, started.peakOn);
    assert.equal(phaseOf(state), "specific");
    assert.equal(visibleWeeks(state)[0]?.eased, false);
  });

  it("a short 6-week fifty still writes a taper on the peak week", () => {
    const state = start("fifty", 6);
    assert.equal(qualityFor("fifty", 6), "short");
    const spec = fitSpec("fifty", 6);
    assert.equal(spec.taper, 2);
    assert.equal(phaseOf(state), "specific");
    const last = roll(state, 4);
    assert.equal(phaseOf(last), "taper");
    assert.equal(visibleWeeks(last)[0]?.phase, "taper");
  });

  it("a long 40-week fifty parks extra time in base", () => {
    const state = start("fifty", 40);
    assert.equal(qualityFor("fifty", 40), "generous");
    assert.equal(fitSpec("fifty", 40).base, 26);
    assert.equal(phaseOf(state), "base");
    assert.equal(phaseOf(roll(state, 26)), "specific");
  });

  it("engine stays conversational — no quality dose, extra weeks go to base", () => {
    assert.equal(recommendedWeeks("engine"), 16);
    const baseWeek = visibleWeeks(start("engine"))[0];
    assert.equal(baseWeek?.phase, "base");
    assert.ok(baseWeek?.days.some((day) => day.key === "engine"));
    assert.ok(baseWeek?.days.every((day) => day.kind !== "hard"));
    const specific = roll(start("engine"), 12);
    const specWeek = visibleWeeks(specific)[0];
    assert.equal(specWeek?.phase, "specific");
    assert.ok(specWeek?.days.some((day) => day.key === "hike"));
    assert.ok(specWeek?.days.every((day) => day.kind !== "hard"));
    const taper = roll(specific, 3);
    const taperWeek = visibleWeeks(taper)[0];
    assert.equal(taperWeek?.phase, "taper");
    assert.ok(!taperWeek?.days.some((day) => day.key === "sharpness"));
    const long = fitSpec("engine", 28);
    assert.equal(long.base, 24);
    assert.equal(long.specific, 3);
    assert.equal(long.taper, 1);
  });

  it("trail20 specific week keeps one quality dose and a long", () => {
    const state = roll(start("trail20"), 5);
    const week = visibleWeeks(state)[0];
    assert.equal(week?.phase, "specific");
    assert.ok(week?.days.some((day) => day.key === "quality"));
    assert.ok(week?.days.some((day) => day.key === "long"));
  });

  it("tired rewrites this week's quality and long immediately", () => {
    const week = visibleWeeks(roll(start("trail20"), 5))[0];
    assert.ok(week);
    const tired = adaptWeek(week, "problem");
    assert.equal(tired.eased, true);
    assert.ok(tired.days.every((day) => day.kind !== "hard"));
    assert.ok(!tired.days.some((day) => day.key === "quality" || day.key === "long"));
    assert.ok(tired.days.some((day) => day.key === "recovery"));
    const diffs = weekChanges(week, tired);
    assert.ok(diffs.length >= 2);
    const wrecked = adaptWeek(week, "wrecked");
    assert.ok(wrecked.days.filter((day) => day.kind === "rest").length > week.days.filter((day) => day.kind === "rest").length);
    assert.deepEqual(adaptWeek(week, "ok").days, week.days);
  });

  it("engine tired still shortens the long so the week visibly changes", () => {
    const week = visibleWeeks(start("engine"))[0];
    assert.ok(week);
    const tired = adaptWeek(week, "problem");
    assert.ok(week.days.some((day) => day.key === "long"));
    assert.ok(!tired.days.some((day) => day.key === "long"));
    assert.ok(weekChanges(week, tired).some((c) => c.from === "long"));
  });

  it("ultra100 reaches specific after 14 counted weeks", () => {
    const state = roll(start("ultra100"), 14);
    assert.equal(phaseOf(state), "specific");
    assert.equal(visibleWeeks(state)[0]?.days.some((day) => day.key === "long"), true);
  });

  it("expedition specific week uses hike and pack", () => {
    const state = roll(start("expedition"), 22);
    const week = visibleWeeks(state)[0];
    assert.equal(week?.phase, "specific");
    assert.ok(week?.days.some((day) => day.key === "hike"));
    assert.ok(week?.days.some((day) => day.key === "pack"));
  });

  it("alpine specific week includes climbing and strength, not only walking", () => {
    const state = roll(start("alpine"), 6);
    const week = visibleWeeks(state)[0];
    assert.equal(week?.phase, "specific");
    assert.ok(week?.days.some((day) => day.key === "climb"));
    assert.ok(week?.days.some((day) => day.key === "strength"));
    const tired = adaptWeek(week!, "problem");
    assert.ok(!tired.days.some((day) => day.key === "climb" || day.key === "strength"));
  });

  it("next season increments and asks for a new peak", () => {
    const done = roll(start("trail20"), 10);
    assert.equal(phaseOf(done), "done");
    const next = nextSeason(done, addDaysIso(todayIso(FROM), 70), FROM);
    assert.equal(next.season, 2);
    assert.equal(next.objective, "trail20");
    assert.equal(next.calendar, 1);
    assert.equal(next.extraBase, 0);
    assert.equal(phaseOf(next), "base");
  });

  it("specFor still exposes the recommended split", () => {
    assert.deepEqual(specFor("alpine"), { base: 6, specific: 3, taper: 1 });
  });
});
