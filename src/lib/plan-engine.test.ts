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
import {
  addDaysIso,
  startPlan,
  todayIso,
  type RollingState,
  type SessionLog,
} from "./rolling-plan.ts";
import { LONG_TARGET } from "./progression.ts";

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

  it("keeps beginner base free of running intervals, and writes strength instead", () => {
    const { state, athlete } = plan({
      experience: "beginner",
      goal: "fifty",
      weeklyHours: "h3_5",
      longest: "m90",
      availableDays: [true, true, true, true, false, true, false],
      equipment: ["trailShoes"],
    });
    const week = buildWeek(state, 1, athlete);
    assert.ok(week);
    assert.equal(week.phase, "base");
    assert.ok(week.days.every((d) => d.key !== "quality"));
    assert.ok(week.days.some((d) => d.key === "strength"));
    assert.ok(week.days.some((d) => d.key === "long"));
    const kinds = new Set(week.days.filter((d) => d.key !== "rest").map((d) => d.key));
    assert.ok(kinds.size >= 3, "a 50 km week is not five identical jogs");
  });

  it("starts the long at the athlete's current longest outing, and grows past it", () => {
    // This replaces a test that asserted the opposite. The entry band used to
    // be a ceiling: an athlete who arrived on a 90-minute longest outing could
    // never be written more than 80 minutes, all the way to a 50 km start line.
    // It is the starting point now, and the objective's target is the ceiling.
    const { state, athlete } = plan({ longest: "m90", weeklyHours: "h8_12" });
    const first = buildWeek(state, 1, athlete)!.days.find((d) => d.key === "long");
    const late = buildWeek(state, 20, athlete)!.days.find((d) => d.key === "long");
    assert.equal(first?.minutes, 80, "week one should be the outing they already do");
    assert.ok(
      (late?.minutes ?? 0) > 80,
      `week 20 long is ${late?.minutes} min — still stuck at the entry band`,
    );
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
    assert.equal(
      week.days.findIndex((d) => d.key === "long"),
      2,
    );
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

describe("weeks that history has already answered", () => {
  const HARD = new Set([
    "long",
    "quality",
    "sharpness",
    "climb",
    "strength",
    "pack",
    "mountain",
    "me",
  ]);

  function missedEvery(state: RollingState, dayIndex: number, weeks: number[]): RollingState {
    return {
      ...state,
      logs: weeks.map((weekCalendar) => ({
        date: addDaysIso(state.startedOn, weekCalendar * 7 + dayIndex),
        weekCalendar,
        dayIndex,
        plannedKey: "quality" as const,
        actualKey: "rest" as const,
        status: "missed" as const,
        at: "2026-01-01T00:00:00.000Z",
      })),
    };
  }

  it("keeps load-bearing work off a weekday that never happens", () => {
    const { state, athlete } = plan();
    const dead = 3; // Thursday
    const week = buildWeek(missedEvery(state, dead, [1, 2, 3]), 5, athlete);
    assert.ok(week);
    assert.equal(HARD.has(week.days[dead]!.key), false);
    assert.ok(week.reasons.some((r) => r.id === "adherenceDeadDay" && r.values.day === dead));
  });

  it("still uses the day for easy work rather than writing it off", () => {
    const { state, athlete } = plan();
    const dead = 3;
    const week = buildWeek(missedEvery(state, dead, [1, 2, 3]), 5, athlete);
    assert.ok(week);
    // The athlete said the day is available; only the hard work moves.
    assert.notEqual(week.days[dead]!.key, "rest");
  });

  it("a week with no history is byte-identical to before the feature", () => {
    const { state, athlete } = plan();
    const withHistory = buildWeek({ ...state, logs: [] }, 3, athlete);
    const without = buildWeek(state, 3, athlete);
    assert.deepEqual(withHistory, without);
    assert.ok(!without?.reasons.some((r) => r.id === "adherenceDeadDay"));
  });

  it("two missed Thursdays are a busy fortnight, not a pattern", () => {
    const { state, athlete } = plan();
    const dead = 3;
    const week = buildWeek(missedEvery(state, dead, [1, 2]), 5, athlete);
    const untouched = buildWeek(state, 5, athlete);
    assert.deepEqual(week, untouched);
  });

  it("does not empty a week that has only two usable days", () => {
    const { state, athlete } = plan({
      availableDays: [false, false, false, true, false, true, false],
    });
    const dead = 3;
    const week = buildWeek(missedEvery(state, dead, [1, 2, 3]), 5, athlete);
    const untouched = buildWeek(state, 5, athlete);
    // Honouring the hint here would leave one day to carry the whole week.
    assert.deepEqual(week, untouched);
  });
});

/**
 * The bug: `longFactor` cut the taper's long run, but the week's minute budget
 * stayed at the athlete's full weekly hours, so `assignMinutes` handed the
 * freed minutes to the easy days. A taper week totalled the same 239 minutes as
 * the specific week before it. The shape changed and the load did not, which is
 * the one thing a taper must not do.
 */
describe("the taper takes minutes off the week, not just off the long", () => {
  /** `fifty` is base 10 + specific 12 + taper 2, so week 23 is the first taper. */
  const LAST_SPECIFIC = 22;
  const FIRST_TAPER = 23;

  const total = (week: { days: { minutes?: number }[] }) =>
    week.days.reduce((n, d) => n + (d.minutes ?? 0), 0);

  it("cuts the week by a third or more, at every volume band", () => {
    for (const weeklyHours of ["h3_5", "h5_8", "h8_12"] as const) {
      const { state, athlete } = plan({ weeklyHours });
      const before = total(buildWeek(state, LAST_SPECIFIC, athlete)!);
      const taper = total(buildWeek(state, FIRST_TAPER, athlete)!);
      assert.ok(
        taper <= before * 0.67,
        `${weeklyHours}: taper ${taper} min against ${before} min is not a taper`,
      );
    }
  });

  it("still cuts the week for an athlete with very little time", () => {
    // The per-session floor eats into the reduction here, so the cut is
    // smaller. It must not vanish: this athlete tapers too.
    const { state, athlete } = plan({ weeklyHours: "h0_3" });
    const before = total(buildWeek(state, LAST_SPECIFIC, athlete)!);
    const taper = total(buildWeek(state, FIRST_TAPER, athlete)!);
    assert.ok(taper < before * 0.85, `taper ${taper} min against ${before} min is barely a cut`);
  });

  it("keeps the training days it had", () => {
    // Bosquet 2007: cut volume, hold intensity and frequency. Turning a taper
    // day into a rest day would be the wrong lever, and it is the lever a naive
    // "make the week smaller" would reach for first.
    const { state, athlete } = plan();
    const rests = (c: number) =>
      buildWeek(state, c, athlete)!.days.filter((d) => d.key === "rest").length;
    assert.equal(rests(FIRST_TAPER), rests(LAST_SPECIFIC));
  });

  it("says so, rather than letting the week quietly shrink", () => {
    const { state, athlete } = plan();
    const week = buildWeek(state, FIRST_TAPER, athlete)!;
    assert.ok(
      week.reasons.some((r) => r.id === "taperVolume"),
      "a lighter week with no explanation reads as a broken plan",
    );
  });

  it("leaves base and specific weeks alone", () => {
    // The fix is to the taper. If it moved the rest of the season it would be
    // a different change than the one that was asked for.
    const { state, athlete } = plan();
    for (const c of [1, 10, 11, LAST_SPECIFIC]) {
      const week = buildWeek(state, c, athlete)!;
      assert.ok(
        total(week) > 300,
        `week ${c} totals ${total(week)} min — volume moved outside the taper`,
      );
      assert.ok(
        !week.reasons.some((r) => r.id === "taperVolume"),
        `week ${c} claims to be a taper`,
      );
    }
  });
});

/**
 * The bug: `assignMinutes` never looked at the week number. A 24-week build for
 * a first 50 km wrote the same 240-minute week twenty-two times, with the long
 * run stuck at 68 minutes through base and 80 through specific — so the longest
 * session the plan ever asked for was 80 minutes, for a race that would take
 * that athlete seven to nine hours. Progressive overload was simply absent.
 */
describe("the plan gets harder", () => {
  const BUILD_WEEKS = 22; // fifty: base 10 + specific 12

  const longOf = (state: RollingState, athlete: AthleteProfile, c: number) =>
    buildWeek(state, c, athlete)!.days.find((d) => d.key === "long")?.minutes ?? 0;
  const totalOf = (state: RollingState, athlete: AthleteProfile, c: number) =>
    buildWeek(state, c, athlete)!.days.reduce((n, d) => n + (d.minutes ?? 0), 0);

  it("does not write the same week twenty-two times", () => {
    const { state, athlete } = plan();
    const shapes = new Set<string>();
    for (let c = 1; c <= BUILD_WEEKS; c += 1) {
      shapes.add(
        buildWeek(state, c, athlete)!
          .days.map((d) => `${d.key}:${d.minutes}`)
          .join("|"),
      );
    }
    assert.ok(shapes.size > 4, `only ${shapes.size} distinct weeks across the whole build`);
  });

  it("finishes the build with a longer long run than it started", () => {
    const { state, athlete } = plan();
    assert.ok(
      longOf(state, athlete, BUILD_WEEKS) > longOf(state, athlete, 1) * 1.3,
      `long went ${longOf(state, athlete, 1)} -> ${longOf(state, athlete, BUILD_WEEKS)} min`,
    );
  });

  it("comes back down every fourth week", () => {
    const { state, athlete } = plan();
    // Week 4 is a down week; 3 and 5 are not.
    assert.ok(totalOf(state, athlete, 4) < totalOf(state, athlete, 3));
    assert.ok(totalOf(state, athlete, 4) < totalOf(state, athlete, 5));
    assert.ok(buildWeek(state, 4, athlete)!.reasons.some((r) => r.id === "downWeek"));
    assert.ok(!buildWeek(state, 5, athlete)!.reasons.some((r) => r.id === "downWeek"));
  });

  it("never asks for more than the hours the athlete said they have", () => {
    // The band is a ceiling, not a starting point. The per-session floor can
    // push a very small week a little over; nothing else may.
    const { state, athlete } = plan({ weeklyHours: "h5_8" });
    for (let c = 1; c <= BUILD_WEEKS; c += 1) {
      assert.ok(
        totalOf(state, athlete, c) <= 390,
        `week ${c} asks for ${totalOf(state, athlete, c)} min against a 390 min week`,
      );
    }
  });

  it("never lets one session take more than half the week", () => {
    for (const weeklyHours of ["h0_3", "h3_5", "h5_8", "h8_12"] as const) {
      const { state, athlete } = plan({ weeklyHours, longest: "m240p" });
      for (const c of [1, 8, 16, BUILD_WEEKS]) {
        const long = longOf(state, athlete, c);
        const total = totalOf(state, athlete, c);
        assert.ok(long <= total * 0.55, `${weeklyHours} week ${c}: long ${long} of ${total} min`);
      }
    }
  });

  it("tells the athlete when their week, not their legs, is the limit", () => {
    const { state, athlete } = plan({ weeklyHours: "h0_3", longest: "m240p" });
    const week = buildWeek(state, BUILD_WEEKS, athlete)!;
    const capped = week.reasons.find((r) => r.id === "longCappedByWeek");
    assert.ok(capped, "a long run pinned by the weekly budget must say so");
    assert.ok(Number(capped.values.want) > Number(capped.values.n));
  });

  it("names the long and where it is heading when nothing is in the way", () => {
    const { state, athlete } = plan({ weeklyHours: "h8_12" });
    const said = buildWeek(state, 6, athlete)!.reasons.find((r) => r.id === "longThisWeek");
    assert.ok(said, "the athlete should be told what the long is for");
    assert.equal(said.values.target, LONG_TARGET.fifty);
  });
});

describe("the week costs what the athlete said they had", () => {
  /** Upper edge of each stated band, in minutes. */
  const CEILING = { h0_3: 180, h3_5: 300, h5_8: 480, h8_12: 720 } as const;

  it("never writes a week past the top of the band, on any number of days", () => {
    // An athlete on the lowest band who marked all seven days available was
    // being written 230 minutes against a ceiling of 180: the per-session floor
    // multiplied by seven beats the budget. A plan that quietly costs more than
    // it said is the thing this product exists not to be.
    //
    // Experience is in the loop because it sizes the quality day. A version of
    // this test that ran only `intermediate` passed while a veteran on the
    // lowest band was being written 20 minutes past their stated ceiling.
    for (const experience of ["beginner", "intermediate", "experienced", "veteran"] as const) {
      for (const days of [3, 5, 7]) {
        for (const band of ["h0_3", "h3_5", "h5_8", "h8_12"] as const) {
          const { state, athlete } = plan({
            weeklyHours: band,
            experience,
            availableDays: [0, 1, 2, 3, 4, 5, 6].map(
              (i) => i < days,
            ) as AthleteProfile["availableDays"],
          });
          for (let c = 1; c <= 22; c += 1) {
            const week = buildWeek(state, c, athlete)!;
            const total = week.days.reduce((n, d) => n + (d.minutes ?? 0), 0);
            assert.ok(
              total <= CEILING[band],
              `${experience} ${days}d ${band} week ${c}: ${total} min against ${CEILING[band]}`,
            );
          }
        }
      }
    }
  });

  it("keeps three easy days rather than collapsing the week", () => {
    // Frequency is most of what a beginner is buying. One long run and one jog
    // is not a training week, however tidy the arithmetic.
    const { state, athlete } = plan({ weeklyHours: "h0_3" });
    for (const c of [1, 11, 22]) {
      const working = buildWeek(state, c, athlete)!.days.filter((d) => d.key !== "rest");
      assert.ok(working.length >= 4, `week ${c} left only ${working.length} training days`);
    }
  });

  it("says when it dropped a day, instead of silently resting it", () => {
    const { state, athlete } = plan({ weeklyHours: "h0_3" });
    const week = buildWeek(state, 22, athlete)!;
    assert.ok(week.reasons.some((r) => r.id === "fewerEasyDays"));
  });
});

/**
 * `findings` computed three things and `buildWeek` read one. The shortfall and
 * the skipped-key pattern were calculated every single week and discarded — and
 * the shortfall is the only signal that says a ramp is too steep for the person
 * actually following it.
 */
describe("the week reads what the athlete actually did", () => {
  const logs = (state: RollingState, rows: Partial<SessionLog>[]): RollingState => ({
    ...state,
    logs: rows.map((r, i) => ({
      date: addDaysIso(state.startedOn, (r.weekCalendar ?? i + 1) * 7 + (r.dayIndex ?? 5)),
      weekCalendar: r.weekCalendar ?? i + 1,
      dayIndex: r.dayIndex ?? 5,
      plannedKey: "long" as const,
      actualKey: "long" as const,
      status: "done" as const,
      at: "2026-01-01T00:00:00.000Z",
      ...r,
    })),
  });

  const shortLong = (weekCalendar: number): Partial<SessionLog> => ({
    weekCalendar,
    plannedKey: "long",
    actualKey: "long",
    status: "done",
    plannedMinutes: 100,
    actualMinutes: 70,
  });

  it("climbs from where the athlete is when the long keeps coming up short", () => {
    const { state, athlete } = plan({ weeklyHours: "h8_12" });
    const bare = buildWeek(state, 8, athlete)!;
    const withHistory = buildWeek(
      logs(state, [shortLong(5), shortLong(6), shortLong(7)]),
      8,
      athlete,
    )!;
    const longOf = (w: typeof bare) => w.days.find((d) => d.key === "long")?.minutes ?? 0;
    assert.ok(
      longOf(withHistory) < longOf(bare),
      `${longOf(withHistory)} min was not pulled back from ${longOf(bare)}`,
    );
    assert.ok(withHistory.reasons.some((r) => r.id === "longFollowsYou"));
  });

  it("still climbs — following down is a nudge, not a new ceiling", () => {
    const { state, athlete } = plan({ weeklyHours: "h8_12" });
    const history = logs(state, [shortLong(5), shortLong(6), shortLong(7)]);
    const longOf = (c: number) =>
      buildWeek(history, c, athlete)!.days.find((d) => d.key === "long")?.minutes ?? 0;
    assert.ok(longOf(20) > longOf(8), `long went ${longOf(8)} -> ${longOf(20)} min`);
  });

  it("softens a hard session that has not happened three times running", () => {
    const { state, athlete } = plan();
    const skipped = [9, 10, 11].map((weekCalendar) => ({
      weekCalendar,
      dayIndex: 0,
      plannedKey: "quality" as const,
      actualKey: "rest" as const,
      status: "missed" as const,
    }));
    const week = buildWeek(logs(state, skipped), 12, athlete)!;
    assert.ok(!week.days.some((d) => d.key === "quality"), "the quality day was written again");
    assert.ok(week.reasons.some((r) => r.id === "keySoftened"));
  });

  it("keeps the minutes when it takes the hard part away", () => {
    const { state, athlete } = plan();
    const skipped = [9, 10, 11].map((weekCalendar) => ({
      weekCalendar,
      dayIndex: 0,
      plannedKey: "quality" as const,
      actualKey: "rest" as const,
      status: "missed" as const,
    }));
    const before = buildWeek(state, 12, athlete)!;
    const after = buildWeek(logs(state, skipped), 12, athlete)!;
    const total = (w: typeof before) => w.days.reduce((n, d) => n + (d.minutes ?? 0), 0);
    assert.equal(total(after), total(before));
  });

  it("never swaps the long run out, however often it is missed", () => {
    // It is the spine of every objective here. Replacing it with easy work
    // would turn an ultra build into a jogging schedule without saying so.
    const { state, athlete } = plan();
    const skipped = [9, 10, 11].map((weekCalendar) => ({
      weekCalendar,
      plannedKey: "long" as const,
      actualKey: "rest" as const,
      status: "missed" as const,
    }));
    const week = buildWeek(logs(state, skipped), 12, athlete)!;
    assert.ok(
      week.days.some((d) => d.key === "long"),
      "the long run was written away",
    );
    assert.ok(
      week.reasons.some((r) => r.id === "longBeingMissed"),
      "and nobody was told",
    );
  });

  it("leaves a week alone when the history says nothing", () => {
    const { state, athlete } = plan();
    const full = [5, 6, 7].map((weekCalendar) => ({
      weekCalendar,
      plannedMinutes: 100,
      actualMinutes: 99,
    }));
    assert.deepEqual(buildWeek(logs(state, full), 8, athlete), buildWeek(state, 8, athlete));
  });
});

/**
 * Every number in a reason has to be a number the week actually contains.
 *
 * Both of these shipped wrong for a day. `longThisWeek` was pushed from inside
 * the minute assignment, before `fitToWindows` trimmed sessions into the time
 * the athlete said each day has — so it announced a 148-minute long run on a
 * week whose long run was 70. `fewerEasyDays` counted the easy days it kept
 * plus the long, and forgot the quality day, so a five-session week was
 * reported as four.
 */
describe("a reason never names a number the week does not contain", () => {
  const windows = (minutes: number): AthleteProfile["dayWindows"] =>
    Array.from({ length: 7 }, () => ({ minutes, startAt: null })) as AthleteProfile["dayWindows"];

  it("reports the long run the athlete was actually given", () => {
    const { state, athlete } = plan({ dayWindows: windows(70) });
    const week = buildWeek(state, 20, athlete)!;
    const long = week.days.find((d) => d.key === "long")?.minutes ?? 0;
    const said = week.reasons.find(
      (r) => r.id === "longThisWeek" || r.id === "longCappedByWeek" || r.id === "longCappedByDay",
    );
    assert.ok(said, "no reason named the long run at all");
    assert.equal(said.values.n, long, `reason says ${said.values.n} min, the week says ${long}`);
  });

  it("blames the day's window, not the week, when the window is what cut", () => {
    // A 70-minute window on every day is today's time, not the weekly budget.
    // `longCappedByWeek` says "one session may not take more than half of it.
    // More hours would buy a longer long" — three claims, all false here, next
    // to a `dayWindowCap` that already named the real cause.
    const { state, athlete } = plan({ dayWindows: windows(70) });
    const week = buildWeek(state, 20, athlete)!;
    assert.ok(week.reasons.some((r) => r.id === "longCappedByDay"));
    assert.ok(!week.reasons.some((r) => r.id === "longCappedByWeek"));
    assert.ok(!week.reasons.some((r) => r.id === "longThisWeek"));
  });

  it("blames the week when there is no window in the way", () => {
    const { state, athlete } = plan({ weeklyHours: "h3_5" });
    const week = buildWeek(state, 20, athlete)!;
    assert.ok(week.reasons.some((r) => r.id === "longCappedByWeek"));
    assert.ok(!week.reasons.some((r) => r.id === "longCappedByDay"));
  });

  it("claims no long run in a week that has none", () => {
    // Moving the push past `fitToWindows` was not enough: `applySkippedKey`,
    // `applyTravel`, `applyMissedStack` and `applyStateFlags` all run after it.
    // A wrecked week came out as four easy days with no long at all, and still
    // announced `longThisWeek {n:151}`.
    const { state, athlete } = plan();
    const wrecked = { ...state, easeThrough: 20, easeMode: "wrecked" } as RollingState;
    const week = buildWeek(wrecked, 20, athlete)!;
    const long = week.days.find((d) => d.key === "long");
    assert.ok(!long, "fixture no longer produces a week without a long run");
    for (const id of ["longThisWeek", "longCappedByWeek", "longCappedByDay"]) {
      assert.ok(!week.reasons.some((r) => r.id === id), `${id} on a week with no long run`);
    }
    const few = week.reasons.find((r) => r.id === "fewerEasyDays");
    if (few) {
      const training = week.days.filter((d) => (d.minutes ?? 0) > 0).length;
      assert.equal(few.values.n, training);
    }
  });

  it("counts every training day when it drops one, not just the easy ones", () => {
    const { state, athlete } = plan({
      weeklyHours: "h0_3",
      longest: "m60",
      availableDays: [true, true, true, true, true, true, true],
    });
    // Week 14 is specific, so the week carries a quality day as well as a long.
    for (const c of [1, 14]) {
      const week = buildWeek(state, c, athlete)!;
      const said = week.reasons.find((r) => r.id === "fewerEasyDays");
      if (!said) continue;
      const training = week.days.filter((d) => (d.minutes ?? 0) > 0).length;
      assert.equal(said.values.n, training, `week ${c}: reason ${said.values.n}, week ${training}`);
    }
  });
});

/**
 * Four things the week said that were not true. Each shipped in this branch.
 */
describe("the week does not accuse itself", () => {
  it("measures the week against the budget it was written to", () => {
    // `weekUnderTarget` compared the finished week to the raw weekly band, but
    // a taper week is 60% of that on purpose and a down week 80%. The plan told
    // 16 of 24 weeks they fell short of a target it had lowered itself — both
    // taper weeks included, one line under `taperVolume` saying so was the
    // point. It reached the public example page too.
    const { state, athlete } = plan();
    for (let c = 1; c <= 24; c += 1) {
      const week = buildWeek(state, c, athlete);
      if (!week) continue;
      const accused = week.reasons.find((r) => r.id === "weekUnderTarget");
      assert.ok(!accused, `week ${c} (${week.phase}) accuses itself: ${JSON.stringify(accused)}`);
    }
  });

  it("blames the week only when the week is what cut the long run", () => {
    // A family cap and a declared limitation each say their own piece. Telling
    // a parent of small children, or somebody nursing an achilles, that "your
    // legs are not the limit here, your week is — more hours would buy a longer
    // long" is false, and the second is a bad thing to say to an injured
    // person.
    for (const over of [
      { constraints: ["youngKids"] as const },
      { limitations: "sore achilles" },
    ]) {
      const { state, athlete } = plan(over as Partial<AthleteProfile>);
      const week = buildWeek(state, 20, athlete)!;
      assert.ok(
        !week.reasons.some((r) => r.id === "longCappedByWeek"),
        `${JSON.stringify(over)} was told its week was the limit`,
      );
    }
  });
});
