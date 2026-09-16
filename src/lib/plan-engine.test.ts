import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { emptyProfile, type AthleteProfile } from "./athlete.ts";
import { emptyInputs } from "./daily-readiness.ts";
import {
  applyCallToDay,
  buildWeek,
  markMoved,
  markToday,
  realizeToday,
  visiblePersonalizedWeeks,
} from "./plan-engine.ts";
import { addDaysIso, startPlan, todayIso, type RollingState } from "./rolling-plan.ts";

const FROM = new Date(2026, 0, 5); // Monday 5 Jan 2026

function profile(over: Partial<AthleteProfile> = {}): AthleteProfile {
  return emptyProfile({
    sport: "running",
    discipline: "ultra",
    goal: "fifty",
    peakOn: "2026-06-22",
    weeklyHours: "h5_8",
    longest: "m150",
    experience: "intermediate",
    availableDays: [true, true, true, true, true, true, true],
    terrain: "rolling",
    equipment: ["trailShoes", "poles"],
    completedAt: "2026-01-05T00:00:00.000Z",
    ...over,
  });
}

function plan(over: Partial<AthleteProfile> = {}): {
  state: RollingState;
  athlete: AthleteProfile;
} {
  const athlete = profile(over);
  return { athlete, state: startPlan(athlete.goal, athlete.peakOn, FROM) };
}

describe("personalized plan engine", () => {
  it("puts rest on days the athlete marked unavailable", () => {
    const { state, athlete } = plan({
      availableDays: [true, false, true, false, false, true, false],
    });
    const week = buildWeek(state, 1, athlete);
    assert.ok(week);
    const restDays = week.days.map((d, i) => (d.key === "rest" ? i : -1)).filter((i) => i >= 0);
    assert.deepEqual(restDays, [1, 3, 4, 6]);
    assert.ok(week.reasons.some((r) => r.id === "availableDays" && r.values.n === 3));
  });

  it("writes three weeks, not a generic dump of the same template", () => {
    const { state, athlete } = plan();
    const weeks = visiblePersonalizedWeeks(state, athlete);
    assert.equal(weeks.length, 3);
    assert.equal(weeks[0]?.calendar, 1);
    assert.equal(weeks[2]?.calendar, 3);
  });

  it("keeps a beginner base week free of quality doses", () => {
    const { state, athlete } = plan({ experience: "beginner" });
    const week = buildWeek(state, 1, athlete);
    assert.ok(week);
    assert.equal(week.phase, "base");
    assert.ok(week.days.every((d) => d.key !== "quality" && d.kind !== "hard"));
    assert.ok(week.reasons.some((r) => r.id === "beginnerNoQuality"));
  });

  it("caps the long to the athlete's current longest outing", () => {
    const { state, athlete } = plan({ longest: "m90", weeklyHours: "h8_12" });
    const week = buildWeek(state, 1, athlete);
    assert.ok(week);
    const long = week.days.find((d) => d.key === "long");
    assert.ok(long);
    assert.ok((long.minutes ?? 99) <= 80);
    assert.ok(week.reasons.some((r) => r.id === "longFromBand" && r.values.n));
  });

  it("replaces alpine climbing with gym strength when there is no ice kit", () => {
    const athlete = profile({
      goal: "alpine",
      peakOn: "2026-03-16",
      experience: "experienced",
      terrain: "mountain",
      equipment: ["trailShoes", "gym"],
    });
    const state = startPlan("alpine", athlete.peakOn, FROM);
    // week 7 is specific on a 10-week alpine
    const week = buildWeek({ ...state, calendar: 7, progress: 6 }, 7, athlete);
    assert.ok(week);
    assert.equal(week.phase, "specific");
    assert.ok(week.days.some((d) => d.key === "strength"));
    assert.ok(!week.days.some((d) => d.key === "climb"));
    assert.ok(week.reasons.some((r) => r.id === "gymInsteadOfClimb"));
  });

  it("adds an altitude-acclimatization reason in the specific phase for high-alpine terrain", () => {
    const athlete = profile({
      goal: "alpine",
      peakOn: "2026-03-16",
      experience: "experienced",
      terrain: "highAlpine",
      equipment: ["trailShoes", "pack", "crampons"],
    });
    const state = startPlan("alpine", athlete.peakOn, FROM);
    const base = buildWeek({ ...state, calendar: 2, progress: 1 }, 2, athlete);
    const specific = buildWeek({ ...state, calendar: 7, progress: 6 }, 7, athlete);
    assert.ok(base);
    assert.ok(specific);
    assert.equal(base.phase, "base");
    assert.equal(specific.phase, "specific");
    assert.ok(!base.reasons?.some((r) => r.id === "altitudeAcclimatization"));
    assert.ok(specific.reasons?.some((r) => r.id === "altitudeAcclimatization"));
  });

  it("turns mountain days into hotel easy while travelling", () => {
    const athlete = profile({
      goal: "alpine",
      peakOn: "2026-03-16",
      terrain: "mountain",
      equipment: ["trailShoes", "crampons", "iceAxe", "pack"],
      experience: "experienced",
    });
    const state = {
      ...startPlan("alpine", athlete.peakOn, FROM),
      calendar: 7,
      progress: 6,
      travelUntil: "2026-02-28",
    };
    const week = buildWeek(state, 7, athlete);
    assert.ok(week);
    assert.ok(
      !week.days.some((d) => d.key === "mountain" || d.key === "climb" || d.key === "pack"),
    );
    assert.ok(week.reasons.some((r) => r.id === "travelSwap"));
  });

  it("does not stack a second quality after a missed one", () => {
    const { state, athlete } = plan({ experience: "veteran", weeklyHours: "h8_12" });
    const specific = { ...state, calendar: 12, progress: 11 };
    const week = buildWeek(specific, 12, athlete);
    assert.ok(week);
    const qualityIndex = week.days.findIndex((d) => d.key === "quality" || d.kind === "hard");
    assert.ok(qualityIndex >= 0);
    const date = week.dates[qualityIndex]!;
    const missed = markToday(specific, athlete, "missed", date);
    const after = buildWeek(missed.state, 12, athlete);
    assert.ok(after);
    assert.equal(after.days[qualityIndex]?.key, "rest");
    assert.ok(after.reasons.some((r) => r.id === "missedNoStack"));
    const remainingHard = after.days.filter(
      (d, i) => i !== qualityIndex && (d.key === "quality" || d.kind === "hard"),
    );
    assert.equal(remainingHard.length, 0);
  });

  it("keeps the peak date still when a session is missed", () => {
    const { state, athlete } = plan();
    const date = todayIso(FROM);
    const next = markToday(state, athlete, "missed", date);
    assert.equal(next.state.peakOn, state.peakOn);
    assert.equal(next.state.calendar, state.calendar);
  });

  it("does not add a makeup session when the athlete trains a day early", () => {
    const { state, athlete } = plan();
    const week = buildWeek(state, 1, athlete)!;
    const longIndex = week.days.findIndex((d) => d.key === "long");
    const from = week.dates[longIndex]!;
    const to = week.dates[Math.max(0, longIndex - 1)]!;
    const moved = markMoved(state, athlete, from, to);
    assert.equal(moved.state.logs?.length, 2);
    const vacated = moved.state.logs?.find((l) => l.date === from);
    assert.equal(vacated?.actualKey, "rest");
    assert.equal(moved.adjustment?.reason.id, "noMakeup");
    const rebuilt = buildWeek(moved.state, 1, athlete)!;
    const workDays = rebuilt.days.filter((d) => d.key !== "rest").length;
    const originalWork = week.days.filter((d) => d.key !== "rest").length;
    assert.ok(workDays <= originalWork);
  });

  it("replaces today's quality with easy when readiness says reduce, and names the reason", () => {
    const { state, athlete } = plan({ experience: "veteran" });
    const specific = { ...state, calendar: 12, progress: 11 };
    const week = buildWeek(specific, 12, athlete)!;
    const qi = week.days.findIndex((d) => d.key === "quality");
    assert.ok(qi >= 0);
    const date = week.dates[qi]!;
    const view = realizeToday(specific, athlete, { ...emptyInputs(), sleep: 2, fatigue: 3 }, date);
    assert.ok(view);
    assert.equal(view.call, "easy");
    assert.equal(view.written.key, "quality");
    assert.equal(view.shown.key, "recovery");
    assert.ok(view.readiness.drivers.some((r) => r.id === "sleepLow" && r.values.n === 2));
  });

  it("override keeps the written session", () => {
    const { state, athlete } = plan({ experience: "veteran" });
    const specific = { ...state, calendar: 12, progress: 11 };
    const week = buildWeek(specific, 12, athlete)!;
    const qi = week.days.findIndex((d) => d.key === "quality");
    const date = week.dates[qi]!;
    const view = realizeToday(specific, athlete, { ...emptyInputs(), fatigue: 5 }, date, [], true);
    assert.ok(view);
    assert.equal(view.overridden, true);
    assert.equal(view.shown.key, view.written.key);
  });

  it("engine weeks stay conversational even for a veteran", () => {
    const athlete = profile({ goal: "engine", peakOn: "2026-04-27", experience: "veteran" });
    const state = startPlan("engine", athlete.peakOn, FROM);
    const week = buildWeek(state, 1, athlete)!;
    assert.ok(week.days.every((d) => d.kind !== "hard"));
    assert.ok(week.reasons.some((r) => r.id === "engineConversational"));
  });

  it("applyCallToDay rest turns quality into rest, not into a mystery skip", () => {
    const day = { kind: "hard" as const, key: "quality" as const, minutes: 55 };
    const rest = applyCallToDay(day, "rest");
    assert.equal(rest.shown.key, "rest");
    assert.equal(rest.action, "todayRest");
    const reduce = applyCallToDay(day, "reduce");
    assert.equal(reduce.shown.key, "easy");
    assert.equal(reduce.action, "qualityToEasy");
  });

  it("startedOn Monday maps session dates onto the labelled week", () => {
    const { state, athlete } = plan();
    const week = buildWeek(state, 1, athlete)!;
    assert.equal(week.dates[0], "2026-01-05");
    assert.equal(week.dates[6], "2026-01-11");
  });
});

describe("per-day time windows", () => {
  function windowed(minutes: (number | null)[]) {
    return minutes.map((m) => ({ minutes: m, startAt: null })) as AthleteProfile["dayWindows"];
  }

  it("trims a session that does not fit the day's window, and says so", () => {
    const { state, athlete } = plan({
      weeklyHours: "h8_12",
      longest: "m240",
      dayWindows: windowed([45, 45, 45, 45, 45, 45, 45]),
    });
    const week = buildWeek(state, 1, athlete);
    assert.ok(week);
    assert.ok(week.days.every((d) => d.key === "rest" || (d.minutes ?? 0) <= 45));
    assert.ok(week.reasons.some((r) => r.id === "dayWindowCap"));
  });

  it("puts the long on the day with the most time, not on Saturday by habit", () => {
    const { state, athlete } = plan({
      // Wednesday is the only roomy day.
      dayWindows: windowed([40, 40, 240, 40, 40, 40, 40]),
    });
    const week = buildWeek(state, 1, athlete);
    assert.ok(week);
    assert.equal(week.days.findIndex((d) => d.key === "long"), 2);
  });

  it("leaves the week alone when no window is set", () => {
    const withWindows = plan({ dayWindows: windowed([null, null, null, null, null, null, null]) });
    const without = plan();
    const a = buildWeek(withWindows.state, 1, withWindows.athlete);
    const b = buildWeek(without.state, 1, without.athlete);
    assert.deepEqual(
      a?.days.map((d) => [d.key, d.minutes]),
      b?.days.map((d) => [d.key, d.minutes]),
    );
  });

  it("never writes a session shorter than 20 minutes", () => {
    const { state, athlete } = plan({
      dayWindows: windowed([5, 5, 5, 5, 5, 5, 5]),
    });
    const week = buildWeek(state, 1, athlete);
    assert.ok(week);
    assert.ok(week.days.every((d) => d.key === "rest" || (d.minutes ?? 0) >= 20));
  });
});
