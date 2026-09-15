import type { AthleteProfile, AccessFlag, Equipment } from "./athlete.ts";
import { longestMinutes, weeklyMinutes } from "./athlete.ts";
import type {
  DailyInputs,
  LoadContext,
  ReadinessCall,
  ReadinessResult,
  StoredDaily,
} from "./daily-readiness.ts";
import { assessReadiness, baselineFrom, emptyLoad } from "./daily-readiness.ts";
import {
  HARD_KEYS,
  HORIZON,
  addDaysIso,
  applyStateFlags,
  daysBetween,
  logFor,
  phaseOf,
  pointerForDate,
  sessionDate,
  templateDays,
  todayIso,
  type Adjustment,
  type DaySession,
  type PlannedWeek,
  type Reason,
  type RollingState,
  type SessionKey,
  type SessionLog,
  type WeekChange,
} from "./rolling-plan.ts";

export type RealizedWeek = PlannedWeek & {
  reasons: Reason[];
  dates: string[];
};

export type TodayView = {
  date: string;
  calendar: number;
  dayIndex: number;
  written: DaySession;
  shown: DaySession;
  call: ReadinessCall;
  readiness: ReadinessResult;
  changes: WeekChange[];
  reasons: Reason[];
  overridden: boolean;
  log?: SessionLog;
};

const QUALITY_KEYS = new Set<SessionKey>(["quality", "sharpness", "climb", "strength", "steady"]);
const LONG_KEYS = new Set<SessionKey>(["long", "pack", "mountain", "me"]);
const LOAD_KEYS = new Set<SessionKey>([...HARD_KEYS]);

function cloneDay(day: DaySession, patch: Partial<DaySession> = {}): DaySession {
  return { ...day, ...patch };
}

function restDay(): DaySession {
  return { kind: "rest", key: "rest", minutes: 0 };
}

function easyDay(minutes: number, key: SessionKey = "easy"): DaySession {
  return { kind: "easy", key, minutes };
}

function availableSlots(profile: AthleteProfile): number[] {
  return profile.availableDays.map((on, i) => (on ? i : -1)).filter((i) => i >= 0);
}

function longFactor(phase: PlannedWeek["phase"]): number {
  if (phase === "taper") return 0.55;
  if (phase === "specific") return 1;
  return 0.85;
}

function qualityMinutes(profile: AthleteProfile, phase: PlannedWeek["phase"]): number {
  if (phase === "base" && profile.experience !== "veteran") return 0;
  if (profile.experience === "beginner") return 30;
  if (profile.experience === "intermediate") return 45;
  if (profile.experience === "experienced") return 55;
  return 65;
}

function hasGear(profile: AthleteProfile, item: Equipment): boolean {
  return profile.equipment.includes(item);
}

function accessBlocked(state: RollingState, flag: AccessFlag): boolean {
  return (state.blockedAccess ?? []).includes(flag);
}

function travellingOn(state: RollingState, date: string): boolean {
  return Boolean(state.travelUntil && date <= state.travelUntil);
}

function kindFor(key: SessionKey): DaySession["kind"] {
  if (key === "rest") return "rest";
  if (QUALITY_KEYS.has(key) && key !== "steady") return "hard";
  if (key === "steady" || key === "climb" || key === "pack" || key === "mountain") return "steady";
  return "easy";
}

function swapAccess(
  day: DaySession,
  profile: AthleteProfile,
  state: RollingState,
  reasons: Reason[],
): DaySession {
  const climbOk =
    (profile.terrain === "mountain" || profile.terrain === "highAlpine") &&
    (hasGear(profile, "crampons") || hasGear(profile, "iceAxe") || hasGear(profile, "gym")) &&
    !accessBlocked(state, "climbing");
  const mountainOk =
    (profile.terrain === "mountain" ||
      profile.terrain === "highAlpine" ||
      profile.terrain === "rolling") &&
    !accessBlocked(state, "mountain");
  const gymOk = hasGear(profile, "gym") && !accessBlocked(state, "gym");
  const packOk = hasGear(profile, "pack") && !accessBlocked(state, "mountain");

  if (day.key === "climb") {
    if (
      climbOk &&
      (hasGear(profile, "crampons") || hasGear(profile, "iceAxe")) &&
      !accessBlocked(state, "climbing")
    ) {
      return day;
    }
    if (gymOk) {
      reasons.push({ id: "gymInsteadOfClimb", values: {} });
      return cloneDay(day, { kind: "hard", key: "strength" });
    }
    reasons.push({ id: "noClimbGear", values: {} });
    return cloneDay(day, { kind: "easy", key: "hike" });
  }
  if (day.key === "strength") {
    if (gymOk) return day;
    reasons.push({ id: "noGym", values: {} });
    return easyDay(day.minutes ?? 40, "easy");
  }
  if (day.key === "mountain" || day.key === "vert") {
    if (profile.terrain === "flat" || !mountainOk) {
      reasons.push({ id: "hikeInsteadOfMountain", values: {} });
      return cloneDay(day, { kind: "easy", key: "hike" });
    }
    return day;
  }
  if (day.key === "pack" || day.key === "me") {
    if (!packOk) {
      reasons.push({ id: "noPack", values: {} });
      return cloneDay(day, { kind: "easy", key: "hike" });
    }
    return day;
  }
  if (day.key === "hike" && profile.terrain === "flat") {
    reasons.push({ id: "flatTerrain", values: {} });
    return easyDay(day.minutes ?? 50, "easy");
  }
  return day;
}

function placeWork(
  seed: DaySession[],
  profile: AthleteProfile,
  phase: PlannedWeek["phase"],
  reasons: Reason[],
): DaySession[] {
  const slots = availableSlots(profile);
  const out: DaySession[] = Array.from({ length: 7 }, () => restDay());
  const n = slots.length;

  reasons.push({ id: "availableDays", values: { n } });

  if (n === 0) return out;

  const seedLong = seed.find((d) => LONG_KEYS.has(d.key)) ?? seed.find((d) => d.key === "long");
  const seedQuality =
    phase === "taper"
      ? seed.find((d) => d.key === "sharpness" || QUALITY_KEYS.has(d.key))
      : seed.find((d) => QUALITY_KEYS.has(d.key) || d.key === "climb" || d.key === "engine");
  const seedEasy = seed.filter(
    (d) =>
      !LONG_KEYS.has(d.key) && !QUALITY_KEYS.has(d.key) && d.key !== "rest" && d.key !== "engine",
  );

  const weekendFirst = [...slots].sort((a, b) => {
    const rank = (i: number) => (i === 5 ? 0 : i === 6 ? 1 : 2 + (6 - i));
    return rank(a) - rank(b);
  });
  const longSlot = weekendFirst[0] ?? slots[slots.length - 1]!;

  const qMin = qualityMinutes(profile, phase);
  const skillKey =
    seedQuality &&
    (seedQuality.key === "climb" ||
      seedQuality.key === "engine" ||
      seedQuality.key === "hike" ||
      seedQuality.key === "strength");
  const allowQuality =
    Boolean(seedQuality) &&
    n >= 3 &&
    (Boolean(skillKey) || (qMin > 0 && !(profile.experience === "beginner" && phase === "base")));

  if (profile.experience === "beginner" && phase === "base") {
    reasons.push({ id: "beginnerNoQuality", values: {} });
  } else if (phase === "base" && !skillKey && qMin === 0) {
    reasons.push({ id: "noQualityBase", values: {} });
  }

  let qualitySlot: number | undefined;
  if (allowQuality && seedQuality) {
    qualitySlot = slots.find((i) => i !== longSlot && Math.abs(i - longSlot) >= 2);
    if (qualitySlot === undefined) qualitySlot = slots.find((i) => i !== longSlot);
    if (
      profile.constraints.includes("shiftWork") &&
      qualitySlot !== undefined &&
      qualitySlot <= 1
    ) {
      const later = slots.find((i) => i !== longSlot && i >= 2 && Math.abs(i - longSlot) >= 2);
      if (later !== undefined) qualitySlot = later;
      reasons.push({ id: "shiftNoEarlyQuality", values: {} });
    }
  }

  out[longSlot] = seedLong ? cloneDay(seedLong) : { kind: "easy", key: "long" };

  if (qualitySlot !== undefined && seedQuality) {
    out[qualitySlot] = cloneDay(seedQuality);
  }

  const remaining = slots.filter((i) => i !== longSlot && i !== qualitySlot);
  const easyPool = seedEasy.length ? seedEasy : [{ kind: "easy" as const, key: "easy" as const }];
  remaining.forEach((slot, idx) => {
    if (profile.constraints.includes("shortSleep") && idx > 0) {
      const prev = remaining[idx - 1];
      if (prev !== undefined && slot === prev + 1 && out[prev]?.key !== "rest") {
        // leave rest to break back-to-backs unless this is the long already placed
        if (slot !== longSlot) {
          reasons.push({ id: "shortSleepSpacing", values: {} });
          out[slot] = restDay();
          return;
        }
      }
    }
    out[slot] = cloneDay(easyPool[idx % easyPool.length]!);
  });

  // Alpine/traverse base still wants a hike on an available non-long day
  if (
    (profile.goal === "alpine" || profile.goal === "traverse" || profile.goal === "expedition") &&
    phase !== "taper"
  ) {
    const hikeSlot = remaining.find((i) => out[i]?.key === "easy");
    if (hikeSlot !== undefined && !remaining.some((i) => out[i]?.key === "hike")) {
      out[hikeSlot] = { kind: "easy", key: "hike" };
    }
  }

  return out;
}

function assignMinutes(
  days: DaySession[],
  profile: AthleteProfile,
  phase: PlannedWeek["phase"],
  reasons: Reason[],
): DaySession[] {
  const weekly = weeklyMinutes(profile.weeklyHours);
  let cap = Math.round(longestMinutes(profile.longest) * longFactor(phase));
  if (profile.constraints.includes("youngKids")) {
    cap = Math.min(cap, phase === "base" ? 90 : 120);
    reasons.push({ id: "kidsCapLong", values: { n: cap } });
  }
  if (profile.limitations.trim()) {
    cap = Math.min(cap, Math.round(cap * 0.85));
    reasons.push({ id: "limitationsConservative", values: {} });
  }
  const qMin = qualityMinutes(profile, phase);
  reasons.push({ id: "longFromBand", values: { n: cap, band: profile.longest } });
  reasons.push({ id: "volumeSplit", values: { n: weekly } });

  let remaining = weekly;
  const stamped = days.map((day) => {
    if (day.key === "rest") return { ...day, minutes: 0 };
    if (LONG_KEYS.has(day.key)) {
      const minutes = Math.min(cap, Math.round(weekly * 0.38));
      remaining -= minutes;
      return { ...day, minutes };
    }
    if (
      QUALITY_KEYS.has(day.key) ||
      day.key === "climb" ||
      day.key === "strength" ||
      day.key === "sharpness"
    ) {
      const minutes = Math.max(25, qMin || 40);
      remaining -= minutes;
      return { ...day, minutes };
    }
    return day;
  });
  const easyIdx = stamped.map((d, i) => (d.minutes === undefined ? i : -1)).filter((i) => i >= 0);
  const each = easyIdx.length ? Math.max(25, Math.round(remaining / easyIdx.length)) : 0;
  return stamped.map((day, i) => (easyIdx.includes(i) ? { ...day, minutes: each } : day));
}

function applyMissedStack(
  days: DaySession[],
  state: RollingState,
  calendar: number,
  reasons: Reason[],
): DaySession[] {
  const missedHard = (state.logs ?? []).filter(
    (log) =>
      log.weekCalendar === calendar && log.status === "missed" && LOAD_KEYS.has(log.plannedKey),
  );
  if (!missedHard.length) return days;
  reasons.push({ id: "missedNoStack", values: { n: missedHard.length } });
  let dropped = 0;
  return days.map((day, i) => {
    const alreadyMissed = missedHard.some((log) => log.dayIndex === i);
    if (alreadyMissed) return restDay();
    if (
      dropped === 0 &&
      (QUALITY_KEYS.has(day.key) || day.key === "climb" || day.key === "strength")
    ) {
      dropped += 1;
      return easyDay(Math.max(30, Math.round((day.minutes ?? 45) * 0.8)), "easy");
    }
    return day;
  });
}

function applyTravel(
  days: DaySession[],
  dates: string[],
  state: RollingState,
  reasons: Reason[],
): DaySession[] {
  let swapped = false;
  const next = days.map((day, i) => {
    if (!travellingOn(state, dates[i] ?? "")) return day;
    if (
      day.key === "mountain" ||
      day.key === "climb" ||
      day.key === "pack" ||
      day.key === "vert" ||
      day.key === "hike"
    ) {
      swapped = true;
      return easyDay(Math.min(day.minutes ?? 50, 60), "easy");
    }
    if (day.key === "long") {
      swapped = true;
      return easyDay(Math.min(day.minutes ?? 80, 70), "long");
    }
    return day;
  });
  if (swapped) reasons.push({ id: "travelSwap", values: { until: state.travelUntil ?? "" } });
  return next;
}

export function buildWeek(
  state: RollingState,
  calendar: number,
  profile: AthleteProfile,
): RealizedWeek | null {
  const phase = phaseOf(state, calendar);
  if (phase === "done") return null;
  const reasons: Reason[] = [];
  const seed = templateDays(phase, state.objective, false);
  let days = placeWork(seed, profile, phase, reasons);
  days = days.map((day) => swapAccess(day, profile, state, reasons));
  days = assignMinutes(days, profile, phase, reasons);
  const dates = days.map((_, i) => sessionDate(state, calendar, i));
  days = applyTravel(days, dates, state, reasons);
  days = applyMissedStack(days, state, calendar, reasons);
  if (state.objective === "engine") {
    days = days.map((day) =>
      day.kind === "hard" ? cloneDay(day, { kind: "easy", key: "engine" }) : day,
    );
    reasons.push({ id: "engineConversational", values: {} });
  }
  if (profile.terrain === "highAlpine" && (phase === "specific" || phase === "taper")) {
    reasons.push({ id: "altitudeAcclimatization", values: {} });
  }
  const flagged = applyStateFlags({ calendar, phase, eased: false, days, reasons }, state);
  reasons.push({ id: "peakUnchanged", values: { peak: state.peakOn } });
  return {
    calendar,
    phase,
    eased: flagged.eased,
    days: flagged.days,
    reasons: dedupeReasons([...(flagged.reasons ?? []), ...reasons]),
    dates,
  };
}

function dedupeReasons(reasons: Reason[]): Reason[] {
  const seen = new Set<string>();
  const out: Reason[] = [];
  for (const reason of reasons) {
    const key = `${reason.id}:${JSON.stringify(reason.values)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(reason);
  }
  return out;
}

export function applyCallToDay(
  day: DaySession,
  call: ReadinessCall,
): { shown: DaySession; action: string } {
  if (call === "ready") return { shown: day, action: "keepWritten" };
  if (call === "rest") {
    if (day.key === "rest") return { shown: day, action: "keepWritten" };
    return { shown: restDay(), action: "todayRest" };
  }
  if (call === "easy") {
    if (day.key === "rest" || (day.kind === "easy" && !LOAD_KEYS.has(day.key))) {
      return { shown: day, action: "keepWritten" };
    }
    return {
      shown: easyDay(Math.max(30, Math.round((day.minutes ?? 45) * 0.7)), "recovery"),
      action: "qualityToEasy",
    };
  }
  // reduce
  if (day.key === "rest") return { shown: day, action: "keepWritten" };
  if (
    QUALITY_KEYS.has(day.key) ||
    day.key === "climb" ||
    day.key === "strength" ||
    day.key === "sharpness"
  ) {
    return {
      shown: easyDay(Math.max(30, Math.round((day.minutes ?? 50) * 0.75)), "easy"),
      action: "qualityToEasy",
    };
  }
  if (LONG_KEYS.has(day.key)) {
    return {
      shown: easyDay(Math.max(40, Math.round((day.minutes ?? 90) * 0.7)), "recovery"),
      action: "longToEasy",
    };
  }
  return {
    shown: cloneDay(day, { minutes: Math.max(25, Math.round((day.minutes ?? 45) * 0.85)) }),
    action: "reduceMinutes",
  };
}

export function visiblePersonalizedWeeks(
  state: RollingState,
  profile: AthleteProfile,
): RealizedWeek[] {
  const out: RealizedWeek[] = [];
  for (let i = 0; i < HORIZON; i += 1) {
    const week = buildWeek(state, state.calendar + i, profile);
    if (!week) break;
    out.push(week);
  }
  return out;
}

export function loadContextFor(
  state: RollingState,
  profile: AthleteProfile | null,
  today: string,
  history: StoredDaily[],
): LoadContext {
  const load = emptyLoad();
  load.rhrBaseline = baselineFrom(history, "rhr");
  load.hrvBaseline = baselineFrom(history, "hrv");
  if (!profile) return load;
  for (let back = 1; back <= 7; back += 1) {
    const date = addDaysIso(today, -back);
    const ptr = pointerForDate(state, date);
    if (!ptr) continue;
    const week = buildWeek(state, ptr.calendar, profile);
    const planned = week?.days[ptr.dayIndex];
    const log = logFor(state, date, ptr.dayIndex);
    const key =
      log?.status === "missed" ? "rest" : log?.status === "done" ? log.actualKey : planned?.key;
    if (!key) continue;
    const hard = LOAD_KEYS.has(key);
    if (back <= 3 && hard) load.hardOrLongLast3Days += 1;
    if (ptr.calendar === state.calendar && hard) load.hardOrLongThisWeek += 1;
    if (back === 1) {
      load.yesterdayHard = hard;
      load.yesterdayKey = key;
    }
  }
  return load;
}

export function realizeToday(
  state: RollingState,
  profile: AthleteProfile,
  inputs: DailyInputs | null,
  today = todayIso(),
  history: StoredDaily[] = [],
  overridden = false,
): TodayView | null {
  const ptr = pointerForDate(state, today);
  if (!ptr || ptr.calendar < state.calendar) return null;
  const week = buildWeek(state, ptr.calendar, profile);
  if (!week) return null;
  const written = week.days[ptr.dayIndex] ?? restDay();
  const load = loadContextFor(state, profile, today, history);
  const readiness = inputs
    ? assessReadiness(inputs, load)
    : { call: "ready" as const, reasons: [], drivers: [] };
  const call = overridden ? "ready" : readiness.call;
  const { shown, action } = applyCallToDay(written, call);
  const reasons: Reason[] = [
    ...week.reasons,
    ...readiness.drivers,
    { id: action, values: { from: written.key, to: shown.key, minutes: shown.minutes ?? 0 } },
  ];
  const changes: WeekChange[] =
    written.key === shown.key ? [] : [{ day: ptr.dayIndex, from: written.key, to: shown.key }];
  return {
    date: today,
    calendar: ptr.calendar,
    dayIndex: ptr.dayIndex,
    written,
    shown,
    call,
    readiness,
    changes,
    reasons: dedupeReasons(reasons),
    overridden,
    log: logFor(state, today, ptr.dayIndex),
  };
}

export function markToday(
  state: RollingState,
  profile: AthleteProfile,
  status: SessionLog["status"],
  today = todayIso(),
  view?: TodayView | null,
): { state: RollingState; adjustment?: Adjustment } {
  const ptr = pointerForDate(state, today);
  if (!ptr) return { state };
  const week = buildWeek(state, ptr.calendar, profile);
  const written = week?.days[ptr.dayIndex] ?? restDay();
  const shown = view?.shown ?? written;
  const log: SessionLog = {
    date: today,
    weekCalendar: ptr.calendar,
    dayIndex: ptr.dayIndex,
    plannedKey: written.key,
    actualKey: status === "missed" ? "rest" : shown.key,
    status,
    at: new Date().toISOString(),
  };
  let next = {
    ...state,
    logs: [
      ...(state.logs ?? []).filter((row) => !(row.date === today && row.dayIndex === ptr.dayIndex)),
      log,
    ],
  };
  if (status !== "missed") return { state: next };

  const adj: Adjustment = {
    at: log.at,
    date: today,
    trigger: "missed",
    from: written.key,
    to: "rest",
    reason: { id: "missedNoStack", values: { n: 1, day: ptr.dayIndex } },
  };
  next = { ...next, adjustments: [adj, ...(next.adjustments ?? [])].slice(0, 40) };
  return { state: next, adjustment: adj };
}

export function markMoved(
  state: RollingState,
  profile: AthleteProfile,
  fromDate: string,
  toDate: string,
): { state: RollingState; adjustment?: Adjustment } {
  const fromPtr = pointerForDate(state, fromDate);
  const toPtr = pointerForDate(state, toDate);
  if (!fromPtr || !toPtr) return { state };
  const week = buildWeek(state, fromPtr.calendar, profile);
  const session = week?.days[fromPtr.dayIndex] ?? restDay();
  const at = new Date().toISOString();
  const done: SessionLog = {
    date: toDate,
    weekCalendar: toPtr.calendar,
    dayIndex: toPtr.dayIndex,
    plannedKey: session.key,
    actualKey: session.key,
    status: "moved",
    at,
  };
  const vacated: SessionLog = {
    date: fromDate,
    weekCalendar: fromPtr.calendar,
    dayIndex: fromPtr.dayIndex,
    plannedKey: session.key,
    actualKey: "rest",
    status: "moved",
    at,
  };
  const adj: Adjustment = {
    at,
    date: toDate,
    trigger: daysBetween(fromDate, toDate) < 0 ? "doneEarly" : "doneLate",
    from: session.key,
    to: session.key,
    reason: { id: "noMakeup", values: { from: fromDate, to: toDate } },
  };
  const logs = (state.logs ?? []).filter(
    (row) =>
      !(row.date === fromDate && row.dayIndex === fromPtr.dayIndex) &&
      !(row.date === toDate && row.dayIndex === toPtr.dayIndex),
  );
  return {
    state: {
      ...state,
      logs: [...logs, vacated, done],
      adjustments: [adj, ...(state.adjustments ?? [])].slice(0, 40),
    },
    adjustment: adj,
  };
}

export function overlayToday(week: RealizedWeek, view: TodayView | null): RealizedWeek {
  if (!view || view.calendar !== week.calendar) return week;
  const days = week.days.map((day, i) => (i === view.dayIndex ? view.shown : day));
  const reasons = view.changes.length
    ? [
        ...week.reasons,
        { id: "whyChangedToday", values: { from: view.written.key, to: view.shown.key } },
      ]
    : week.reasons;
  return { ...week, days, reasons, eased: view.call !== "ready" || week.eased };
}
