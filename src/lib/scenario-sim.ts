import type { AthleteProfile } from "./athlete.ts";
import { visiblePersonalizedWeeks } from "./plan-engine.ts";
import {
  addDaysIso,
  daysBetween,
  fitSpec,
  planLength,
  pointerForDate,
  qualityFor,
  recommendedWeeks,
  remainingWeeks,
  sessionDate,
  startPlan,
  suggestedPeakOn,
  todayIso,
  visibleWeeks,
  weeksBetween,
  type AdjustmentTrigger,
  type PlannedWeek,
  type QualityBand,
  type RollingState,
  type SessionKey,
  type SessionLog,
} from "./rolling-plan.ts";

export const SCENARIO_IDS = [
  "missedWeek",
  "sixWeeks",
  "travel",
  "noRun",
  "fatigue",
  "movePeak",
  "lessElevation",
  "secondEvent",
  "returnIllness",
] as const;

export type ScenarioId = (typeof SCENARIO_IDS)[number];
export type PeakOutlook = "holds" | "stretched" | "unrealistic";
export type LoadRisk = "low" | "moderate" | "high";

export type ScenarioParams = {
  travelDays: number;
  compressWeeks: number;
  illnessWeeks: number;
  newPeakOn: string;
  secondOn: string;
};

export type ScenarioPatch = Partial<
  Pick<
    RollingState,
    | "peakOn"
    | "calendar"
    | "extraBase"
    | "progress"
    | "travelUntil"
    | "blockedAccess"
    | "substituteMode"
    | "secondPeakOn"
    | "easeThrough"
    | "easeMode"
    | "makeupCalendar"
    | "logs"
  >
>;

export type ScenarioDiffDay = {
  calendar: number;
  day: number;
  from: SessionKey;
  to: SessionKey;
};

export type ScenarioOption = {
  optionId: string;
  recommended: boolean;
  patch: ScenarioPatch;
  peakOutlook: PeakOutlook;
  loadRisk: LoadRisk;
  remainingAfter: number;
  qualityAfter: QualityBand;
  phaseAfter: { base: number; specific: number; taper: number };
  weekDiff: ScenarioDiffDay[];
  afterWeeks: PlannedWeek[];
  values: Record<string, string | number>;
  improves: string[];
  sacrifices: string[];
};

export type ScenarioResult = {
  scenario: ScenarioId;
  remainingBefore: number;
  qualityBefore: QualityBand;
  phaseBefore: { base: number; specific: number; taper: number };
  beforeWeeks: PlannedWeek[];
  peakOn: string;
  options: ScenarioOption[];
};

const TRIGGER: Record<ScenarioId, AdjustmentTrigger> = {
  missedWeek: "missed",
  sixWeeks: "compress",
  travel: "travel",
  noRun: "substitute",
  fatigue: "fatigue",
  movePeak: "peak",
  lessElevation: "access",
  secondEvent: "secondEvent",
  returnIllness: "illness",
};

export function defaultParams(state: RollingState, today = todayIso()): ScenarioParams {
  const before = addDaysIso(state.peakOn, -21);
  const secondOn = daysBetween(today, before) >= 7 ? before : addDaysIso(state.peakOn, 28);
  return {
    travelDays: 10,
    compressWeeks: 6,
    illnessWeeks: 2,
    newPeakOn: state.peakOn,
    secondOn,
  };
}

export function outlookFor(id: RollingState["objective"], weeks: number): PeakOutlook {
  const band = qualityFor(id, weeks);
  if (band === "generous" || band === "full") return "holds";
  if (band === "solid" || band === "tight") return "stretched";
  return "unrealistic";
}

function weeksOf(state: RollingState, profile?: AthleteProfile | null): PlannedWeek[] {
  if (profile) return visiblePersonalizedWeeks(state, profile);
  return visibleWeeks(state);
}

function cloneState(state: RollingState): RollingState {
  return {
    ...state,
    checkins: [...state.checkins],
    logs: [...(state.logs ?? [])],
    adjustments: [...(state.adjustments ?? [])],
    blockedAccess: [...(state.blockedAccess ?? [])],
  };
}

export function mergePatch(state: RollingState, patch: ScenarioPatch): RollingState {
  return {
    ...state,
    ...patch,
    logs: patch.logs ?? state.logs,
    blockedAccess: patch.blockedAccess ?? state.blockedAccess,
  };
}

function diffWeeks(before: PlannedWeek[], after: PlannedWeek[]): ScenarioDiffDay[] {
  const out: ScenarioDiffDay[] = [];
  const afterByCal = new Map(after.map((week) => [week.calendar, week]));
  for (const week of before) {
    const next = afterByCal.get(week.calendar);
    if (!next) continue;
    for (let i = 0; i < week.days.length; i += 1) {
      const from = week.days[i]?.key;
      const to = next.days[i]?.key;
      if (from && to && from !== to) out.push({ calendar: week.calendar, day: i, from, to });
    }
  }
  return out;
}

function missedLogs(state: RollingState, today: string): SessionLog[] {
  const ptr = pointerForDate(state, today);
  if (!ptr || ptr.calendar !== state.calendar) return [];
  const week = weeksOf(state)[0];
  const logs: SessionLog[] = [];
  for (let i = ptr.dayIndex; i < 7; i += 1) {
    logs.push({
      date: sessionDate(state, ptr.calendar, i),
      weekCalendar: ptr.calendar,
      dayIndex: i,
      plannedKey: week?.days[i]?.key ?? "easy",
      actualKey: "rest",
      status: "missed",
      at: new Date().toISOString(),
    });
  }
  return logs;
}

function buildOption(
  state: RollingState,
  profile: AthleteProfile | null | undefined,
  patch: ScenarioPatch,
  fields: Omit<ScenarioOption, "patch" | "remainingAfter" | "qualityAfter" | "phaseAfter" | "weekDiff" | "afterWeeks" | "peakOutlook">,
): ScenarioOption {
  const next = mergePatch(state, patch);
  const afterWeeks = weeksOf(next, profile);
  const remainingAfter = remainingWeeks(next);
  const qualityAfter = qualityFor(next.objective, planLength(next));
  const spec = fitSpec(next.objective, planLength(next));
  return {
    ...fields,
    patch,
    peakOutlook: outlookFor(next.objective, planLength(next)),
    remainingAfter,
    qualityAfter,
    phaseAfter: { base: spec.base, specific: spec.specific, taper: spec.taper },
    weekDiff: diffWeeks(weeksOf(state, profile), afterWeeks),
    afterWeeks,
  };
}

function optionsFor(
  state: RollingState,
  scenario: ScenarioId,
  params: ScenarioParams,
  profile: AthleteProfile | null | undefined,
  today: string,
): ScenarioOption[] {
  const remaining = remainingWeeks(state);
  const rec = recommendedWeeks(state.objective);
  const peak = state.peakOn;

  if (scenario === "missedWeek") {
    const logs = [...(state.logs ?? []), ...missedLogs(state, today)];
    const nextCal = Math.min(state.calendar + 1, planLength(state));
    const rolled: ScenarioPatch = {
      calendar: nextCal,
      extraBase: state.extraBase + 1,
      logs,
    };
    const windowThin = remaining <= Math.ceil(rec * 0.5);
    return [
      buildOption(state, profile, rolled, {
        optionId: "keepPeak",
        recommended: !windowThin,
        loadRisk: "low",
        values: { peak, weeks: remaining },
        improves: ["recovery", "niggle", "stack", "honesty"],
        sacrifices: ["specific", "sharpness"],
      }),
      buildOption(
        state,
        profile,
        { ...rolled, peakOn: addDaysIso(peak, 7) },
        {
          optionId: "shiftPeak",
          recommended: windowThin,
          loadRisk: "low",
          values: { peak: addDaysIso(peak, 7), weeks: remaining },
          improves: ["recovery", "window", "niggle"],
          sacrifices: ["time"],
        },
      ),
      buildOption(
        state,
        profile,
        { makeupCalendar: state.calendar },
        {
          optionId: "makeup",
          recommended: false,
          loadRisk: "high",
          values: { peak, weeks: remaining },
          improves: ["sharpness"],
          sacrifices: ["recovery", "niggle", "honesty"],
        },
      ),
    ];
  }

  if (scenario === "sixWeeks") {
    const weeks = Math.max(1, Math.floor(params.compressWeeks));
    const compressed = addDaysIso(today, weeks * 7);
    const dateLooksFixed = remaining > weeks;
    return [
      buildOption(
        state,
        profile,
        { peakOn: compressed },
        {
          optionId: "compress",
          recommended: dateLooksFixed,
          loadRisk: "moderate",
          values: { weeks, rec, peak: compressed },
          improves: ["honesty", "time"],
          sacrifices: ["window", "specific"],
        },
      ),
      buildOption(
        state,
        profile,
        {},
        {
          optionId: "keepLonger",
          recommended: !dateLooksFixed,
          loadRisk: "low",
          values: { weeks: remaining, rec, peak },
          improves: ["window", "aerobic"],
          sacrifices: ["honesty"],
        },
      ),
      buildOption(
        state,
        profile,
        { peakOn: compressed, makeupCalendar: state.calendar },
        {
          optionId: "cram",
          recommended: false,
          loadRisk: "high",
          values: { weeks, rec, peak: compressed },
          improves: ["sharpness"],
          sacrifices: ["recovery", "niggle", "window"],
        },
      ),
    ];
  }

  if (scenario === "travel") {
    const days = Math.max(1, Math.min(28, Math.floor(params.travelDays)));
    const until = addDaysIso(today, days);
    const endPtr = pointerForDate(state, until);
    const easeThrough = endPtr?.calendar ?? state.calendar;
    return [
      buildOption(
        state,
        profile,
        { travelUntil: until },
        {
          optionId: "swap",
          recommended: true,
          loadRisk: "low",
          values: { days, until, peak },
          improves: ["honesty", "aerobic"],
          sacrifices: ["elevation", "climbing"],
        },
      ),
      buildOption(
        state,
        profile,
        { travelUntil: until, easeThrough, easeMode: "problem", extraBase: state.extraBase + 1 },
        {
          optionId: "recoveryBlock",
          recommended: false,
          loadRisk: "low",
          values: { days, until, peak },
          improves: ["recovery", "niggle"],
          sacrifices: ["specific", "sharpness"],
        },
      ),
      buildOption(
        state,
        profile,
        { travelUntil: until, makeupCalendar: (endPtr?.calendar ?? state.calendar) + 1 },
        {
          optionId: "stackAfter",
          recommended: false,
          loadRisk: "high",
          values: { days, until, peak },
          improves: ["sharpness"],
          sacrifices: ["recovery", "niggle", "stack"],
        },
      ),
    ];
  }

  if (scenario === "noRun") {
    const shifted = addDaysIso(peak, 14);
    return [
      buildOption(
        state,
        profile,
        { substituteMode: "hikeCycle" },
        {
          optionId: "hikeCycle",
          recommended: true,
          loadRisk: "low",
          values: { peak },
          improves: ["honesty", "aerobic", "niggle"],
          sacrifices: ["specific"],
        },
      ),
      buildOption(
        state,
        profile,
        {
          substituteMode: "hikeCycle",
          extraBase: state.extraBase + 2,
          easeThrough: state.calendar + 1,
          easeMode: "problem",
          peakOn: shifted,
        },
        {
          optionId: "pauseAndShift",
          recommended: remaining < rec * 0.5,
          loadRisk: "low",
          values: { peak: shifted },
          improves: ["recovery", "window", "niggle"],
          sacrifices: ["time", "specific"],
        },
      ),
      buildOption(
        state,
        profile,
        {},
        {
          optionId: "keepRunning",
          recommended: false,
          loadRisk: "high",
          values: { peak },
          improves: [],
          sacrifices: ["honesty", "niggle", "recovery"],
        },
      ),
    ].map((opt) => {
      const short = remaining < rec * 0.5;
      return { ...opt, recommended: short ? opt.optionId === "pauseAndShift" : opt.optionId === "hikeCycle" };
    });
  }

  if (scenario === "fatigue") {
    const inSpecific = remaining <= fitSpec(state.objective, planLength(state)).taper + fitSpec(state.objective, planLength(state)).specific;
    return [
      buildOption(
        state,
        profile,
        { easeThrough: state.calendar, easeMode: "problem", extraBase: state.extraBase + 1 },
        {
          optionId: "easeWeek",
          recommended: true,
          loadRisk: "low",
          values: { peak, week: state.calendar },
          improves: ["recovery", "niggle", "honesty"],
          sacrifices: ["sharpness"],
        },
      ),
      buildOption(
        state,
        profile,
        { easeThrough: state.calendar, easeMode: "wrecked", extraBase: state.extraBase + 1 },
        {
          optionId: "extraRest",
          recommended: false,
          loadRisk: "low",
          values: { peak, week: state.calendar },
          improves: ["recovery", "niggle"],
          sacrifices: ["specific", "aerobic"],
        },
      ),
      buildOption(
        state,
        profile,
        {},
        {
          optionId: "keepLoad",
          recommended: false,
          loadRisk: inSpecific ? "high" : "moderate",
          values: { peak, week: state.calendar },
          improves: ["sharpness"],
          sacrifices: ["recovery", "niggle"],
        },
      ),
    ];
  }

  if (scenario === "movePeak") {
    const nextPeak = params.newPeakOn || peak;
    const movingEarlier = daysBetween(today, nextPeak) < daysBetween(today, peak);
    const same = nextPeak === peak;
    return [
      buildOption(
        state,
        profile,
        same ? {} : { peakOn: nextPeak },
        {
          optionId: "applyMove",
          recommended: !same,
          loadRisk: movingEarlier ? "moderate" : "low",
          values: { from: peak, to: nextPeak, weeks: Math.max(1, weeksBetween(today, nextPeak)) },
          improves: movingEarlier ? ["honesty"] : ["window", "aerobic"],
          sacrifices: movingEarlier ? ["window", "specific"] : ["time"],
        },
      ),
      buildOption(
        state,
        profile,
        {},
        {
          optionId: "keepDate",
          recommended: same,
          loadRisk: "low",
          values: { from: peak, to: peak, weeks: remaining },
          improves: ["honesty"],
          sacrifices: [],
        },
      ),
      buildOption(
        state,
        profile,
        {
          peakOn: nextPeak,
          easeThrough: movingEarlier ? state.calendar : null,
          easeMode: movingEarlier ? "problem" : null,
        },
        {
          optionId: "moveAndEase",
          recommended: false,
          loadRisk: movingEarlier ? "low" : "low",
          values: { from: peak, to: nextPeak, weeks: Math.max(1, weeksBetween(today, nextPeak)) },
          improves: ["recovery", "honesty"],
          sacrifices: ["specific", "window"],
        },
      ),
    ];
  }

  if (scenario === "lessElevation") {
    const mountain = [...new Set([...(state.blockedAccess ?? []), "mountain"])];
    const both = [...new Set([...mountain, "climbing"])];
    return [
      buildOption(
        state,
        profile,
        { blockedAccess: mountain },
        {
          optionId: "swapHike",
          recommended: true,
          loadRisk: "low",
          values: { peak },
          improves: ["honesty", "aerobic"],
          sacrifices: ["elevation"],
        },
      ),
      buildOption(
        state,
        profile,
        { blockedAccess: both },
        {
          optionId: "alsoBlockClimb",
          recommended: false,
          loadRisk: "low",
          values: { peak },
          improves: ["honesty"],
          sacrifices: ["elevation", "climbing"],
        },
      ),
      buildOption(
        state,
        profile,
        {},
        {
          optionId: "ignore",
          recommended: false,
          loadRisk: "moderate",
          values: { peak },
          improves: [],
          sacrifices: ["honesty"],
        },
      ),
    ];
  }

  if (scenario === "secondEvent") {
    const second = params.secondOn || addDaysIso(peak, -21);
    const secondFirst = daysBetween(today, second) < daysBetween(today, peak);
    const nearest = secondFirst ? second : peak;
    const later = secondFirst ? peak : second;
    return [
      buildOption(
        state,
        profile,
        { secondPeakOn: second, easeThrough: secondFirst ? pointerForDate(state, second)?.calendar ?? state.calendar : null, easeMode: secondFirst ? "problem" : null },
        {
          optionId: "bRaceEase",
          recommended: true,
          loadRisk: "moderate",
          values: { second, peak: later, first: nearest },
          improves: ["racePractice", "honesty", "recovery"],
          sacrifices: ["sharpness"],
        },
      ),
      buildOption(
        state,
        profile,
        { peakOn: nearest, secondPeakOn: later },
        {
          optionId: "retargetToNearest",
          recommended: false,
          loadRisk: "low",
          values: { second, peak: nearest, first: nearest },
          improves: ["honesty", "window"],
          sacrifices: ["racePractice"],
        },
      ),
      buildOption(
        state,
        profile,
        { secondPeakOn: second, makeupCalendar: state.calendar },
        {
          optionId: "trainThrough",
          recommended: false,
          loadRisk: "high",
          values: { second, peak, first: nearest },
          improves: ["sharpness"],
          sacrifices: ["recovery", "niggle", "honesty"],
        },
      ),
    ];
  }

  // returnIllness
  const off = Math.max(1, Math.min(8, Math.floor(params.illnessWeeks)));
  const easeThrough = state.calendar + off - 1;
  const shifted = addDaysIso(peak, off * 7);
  const keptLength = planLength(state);
  const keptOutlook = outlookFor(state.objective, keptLength);
  const keepPeakOk = keptOutlook === "holds" || keptOutlook === "stretched";
  return [
    buildOption(
      state,
      profile,
      { easeThrough, easeMode: "problem", extraBase: state.extraBase + off },
      {
        optionId: "easyReturn",
        recommended: keepPeakOk,
        loadRisk: "low",
        values: { weeks: off, peak },
        improves: ["recovery", "niggle", "honesty"],
        sacrifices: ["specific", "sharpness"],
      },
    ),
    buildOption(
      state,
      profile,
      { easeThrough, easeMode: "problem", extraBase: state.extraBase + off, peakOn: shifted },
      {
        optionId: "shiftPeak",
        recommended: !keepPeakOk,
        loadRisk: "low",
        values: { weeks: off, peak: shifted },
        improves: ["recovery", "window", "niggle"],
        sacrifices: ["time"],
      },
    ),
    buildOption(
      state,
      profile,
      {},
      {
        optionId: "resumeNow",
        recommended: false,
        loadRisk: "high",
        values: { weeks: off, peak },
        improves: ["sharpness"],
        sacrifices: ["recovery", "niggle", "honesty"],
      },
    ),
  ];
}

export function simulate(
  state: RollingState,
  scenario: ScenarioId,
  params: ScenarioParams,
  profile?: AthleteProfile | null,
  today = todayIso(),
): ScenarioResult {
  const frozen = cloneState(state);
  const spec = fitSpec(frozen.objective, planLength(frozen));
  const options = optionsFor(frozen, scenario, params, profile, today);
  // Never mark a high-risk option as the only recommended one if a low-risk exists.
  const low = options.find((opt) => opt.recommended && opt.loadRisk !== "high");
  const normalized = options.map((opt) =>
    opt.loadRisk === "high" ? { ...opt, recommended: false } : low && opt.optionId !== low.optionId && opt.recommended ? { ...opt, recommended: false } : opt,
  );
  const hasRecommended = normalized.some((opt) => opt.recommended);
  const firstSafe = normalized.findIndex((opt) => opt.loadRisk !== "high");
  const withFallback = hasRecommended
    ? normalized
    : normalized.map((opt, i) => (i === firstSafe ? { ...opt, recommended: true } : opt));
  return {
    scenario,
    remainingBefore: remainingWeeks(frozen),
    qualityBefore: qualityFor(frozen.objective, planLength(frozen)),
    phaseBefore: { base: spec.base, specific: spec.specific, taper: spec.taper },
    beforeWeeks: weeksOf(frozen, profile),
    peakOn: frozen.peakOn,
    options: withFallback,
  };
}

export function applyScenario(
  state: RollingState,
  scenario: ScenarioId,
  option: ScenarioOption,
  today = todayIso(),
): RollingState {
  const merged = mergePatch(state, option.patch);
  const first = option.weekDiff[0];
  return {
    ...merged,
    adjustments: [
      {
        at: new Date().toISOString(),
        date: today,
        trigger: TRIGGER[scenario],
        from: first?.from ?? "easy",
        to: first?.to ?? "easy",
        reason: {
          id: `whatIf.${scenario}.${option.optionId}`,
          values: { peak: merged.peakOn, ...option.values },
        },
      },
      ...(merged.adjustments ?? []),
    ].slice(0, 40),
  };
}

export function demoPlan(today = todayIso()): RollingState {
  return startPlan("fifty", suggestedPeakOn("fifty", today));
}
