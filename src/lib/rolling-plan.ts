export const OBJECTIVES = [
  "engine",
  "trail20",
  "fifty",
  "ultra100",
  "alpine",
  "traverse",
  "expedition",
] as const;
export type ObjectiveId = (typeof OBJECTIVES)[number];
export type PhaseId = "base" | "specific" | "taper" | "done";
export type CheckResult = "good" | "ok" | "problem" | "wrecked";
export type QualityBand = "generous" | "full" | "solid" | "tight" | "short";
export type SessionKind = "easy" | "steady" | "hard" | "rest";
export type SessionKey =
  | "easy"
  | "steady"
  | "long"
  | "quality"
  | "vert"
  | "mountain"
  | "hike"
  | "pack"
  | "sharpness"
  | "recovery"
  | "rest"
  | "engine"
  | "climb"
  | "strength"
  | "me";

export type DaySession = { kind: SessionKind; key: SessionKey; minutes?: number };

export type Reason = { id: string; values: Record<string, string | number> };

export type PlannedWeek = {
  calendar: number;
  phase: Exclude<PhaseId, "done">;
  eased: boolean;
  days: DaySession[];
  reasons?: Reason[];
};

export type Checkin = {
  calendar: number;
  result: CheckResult;
  note: string;
  at: string;
};

export type SessionStatus = "planned" | "done" | "missed" | "moved";

export type SessionLog = {
  date: string;
  weekCalendar: number;
  dayIndex: number;
  plannedKey: SessionKey;
  actualKey: SessionKey;
  status: SessionStatus;
  at: string;
  /**
   * What the day asked for, and what it got. Both optional: every log written
   * before durations existed has neither, and a session marked done without
   * entering a time has only the first. `src/lib/adherence.ts` skips a log
   * that is missing either rather than assuming the session was completed in
   * full — an assumed duration would hide exactly the pattern it looks for.
   */
  plannedMinutes?: number;
  actualMinutes?: number;
};

export type AdjustmentTrigger =
  | "missed"
  | "fatigue"
  | "sleep"
  | "travel"
  | "access"
  | "peak"
  | "timing"
  | "readiness"
  | "doneEarly"
  | "doneLate"
  | "illness"
  | "secondEvent"
  | "substitute"
  | "compress"
  | "makeup";

export type Adjustment = {
  at: string;
  date: string;
  trigger: AdjustmentTrigger;
  from: SessionKey;
  to: SessionKey;
  reason: Reason;
};

export type ArchivedSeason = {
  season: number;
  objective: ObjectiveId;
  startedOn: string;
  peakOn: string;
  checkins: Checkin[];
  logs: SessionLog[];
  extraBase: number;
  archivedAt: string;
};

export type RollingState = {
  objective: ObjectiveId;
  startedOn: string;
  peakOn: string;
  progress: number;
  extraBase: number;
  calendar: number;
  checkins: Checkin[];
  season: number;
  logs?: SessionLog[];
  adjustments?: Adjustment[];
  travelUntil?: string | null;
  blockedAccess?: string[];
  substituteMode?: "hikeCycle" | null;
  secondPeakOn?: string | null;
  easeThrough?: number | null;
  easeMode?: Extract<CheckResult, "problem" | "wrecked"> | null;
  makeupCalendar?: number | null;
  history?: ArchivedSeason[];
};

const KEY = "ridgework-rolling-v2";
export const PLAN_EVENT = "ridgework-rolling";
export const HORIZON = 3;

/** Recommended full build — extra weeks beyond this stay in aerobic base. */
const SPECS: Record<ObjectiveId, { base: number; specific: number; taper: number }> = {
  engine: { base: 12, specific: 3, taper: 1 },
  trail20: { base: 5, specific: 4, taper: 1 },
  fifty: { base: 10, specific: 12, taper: 2 },
  ultra100: { base: 14, specific: 18, taper: 4 },
  alpine: { base: 6, specific: 3, taper: 1 },
  traverse: { base: 20, specific: 10, taper: 2 },
  expedition: { base: 22, specific: 14, taper: 4 },
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function parseIso(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1);
}

export function todayIso(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDaysIso(fromIso: string, days: number): string {
  const [y, m, d] = fromIso.split("-").map(Number);
  const dt = new Date(Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

export function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((parseIso(toIso) - parseIso(fromIso)) / 86_400_000);
}

export function weeksBetween(fromIso: string, toIso: string): number {
  const days = daysBetween(fromIso, toIso);
  if (days < 1) return 0;
  return Math.max(1, Math.round(days / 7));
}

/** Monday of the week that contains iso (ISO week, Monday start). */
export function weekMonday(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1));
  const dow = dt.getUTCDay();
  const offset = dow === 0 ? 6 : dow - 1;
  dt.setUTCDate(dt.getUTCDate() - offset);
  return dt.toISOString().slice(0, 10);
}

export function sessionDate(state: RollingState, calendar: number, dayIndex: number): string {
  return addDaysIso(weekMonday(state.startedOn), (calendar - 1) * 7 + dayIndex);
}

export function pointerForDate(
  state: RollingState,
  dateIso: string,
): { calendar: number; dayIndex: number } | null {
  const start = weekMonday(state.startedOn);
  const diff = daysBetween(start, dateIso);
  if (diff < 0) return { calendar: 1, dayIndex: 0 };
  const calendar = Math.floor(diff / 7) + 1;
  if (calendar > planLength(state)) return null;
  return { calendar, dayIndex: diff % 7 };
}

export function specFor(id: ObjectiveId) {
  return SPECS[id];
}

export function recommendedWeeks(id: ObjectiveId) {
  const s = SPECS[id];
  return s.base + s.specific + s.taper;
}

/** @deprecated use recommendedWeeks — extra tired weeks no longer extend the calendar */
export function totalWeeks(id: ObjectiveId, _extraBase = 0) {
  return recommendedWeeks(id);
}

export function suggestedPeakOn(id: ObjectiveId, fromIso = todayIso()): string {
  return addDaysIso(fromIso, recommendedWeeks(id) * 7);
}

export function fitSpec(id: ObjectiveId, weeks: number) {
  const rec = SPECS[id];
  const W = Math.max(1, Math.floor(weeks));
  const recTotal = rec.base + rec.specific + rec.taper;
  if (W >= recTotal) {
    return { base: rec.base + (W - recTotal), specific: rec.specific, taper: rec.taper };
  }
  let base = rec.base;
  let specific = rec.specific;
  let taper = rec.taper;
  let deficit = recTotal - W;
  const fromBase = Math.min(deficit, base);
  base -= fromBase;
  deficit -= fromBase;
  if (deficit > 0) {
    const fromSpec = Math.min(deficit, specific);
    specific -= fromSpec;
    deficit -= fromSpec;
  }
  if (deficit > 0) {
    taper -= Math.min(deficit, Math.max(0, taper - 1));
  }
  return { base, specific, taper };
}

export function qualityFor(id: ObjectiveId, weeks: number): QualityBand {
  const rec = recommendedWeeks(id);
  if (weeks > rec) return "generous";
  if (weeks >= rec) return "full";
  if (weeks >= Math.ceil(rec * 0.7)) return "solid";
  if (weeks >= Math.ceil(rec * 0.4)) return "tight";
  return "short";
}

export function planLength(state: RollingState) {
  return Math.max(1, weeksBetween(state.startedOn, state.peakOn));
}

export function remainingWeeks(state: RollingState, calendar = state.calendar) {
  return planLength(state) - calendar + 1;
}

export function phaseOf(state: RollingState, calendar = state.calendar): PhaseId {
  const rem = remainingWeeks(state, calendar);
  if (rem <= 0) return "done";
  const spec = fitSpec(state.objective, planLength(state));
  if (rem <= spec.taper) return "taper";
  if (rem <= spec.taper + spec.specific) return "specific";
  return "base";
}

/**
 * Load-carrying progression (kg) for "pack" and "me" sessions: a flat
 * introductory weight through base and taper, ramping from 8 kg to 16 kg
 * across the specific phase so the pack gets heavier as the objective gets
 * closer — never re-derived from `SPECS` directly, since a compressed or
 * stretched plan (see `fitSpec`) can shrink or grow the specific block.
 */
export function packLoadKg(state: RollingState, calendar = state.calendar): number {
  const phase = phaseOf(state, calendar);
  if (phase !== "specific") return 6;
  const spec = fitSpec(state.objective, planLength(state));
  const rem = remainingWeeks(state, calendar);
  const weeksLeftInSpecific = rem - spec.taper;
  const weekInSpecific = spec.specific - weeksLeftInSpecific + 1;
  const span = Math.max(1, spec.specific - 1);
  const kg = 8 + Math.round(((weekInSpecific - 1) / span) * 8);
  return Math.min(16, Math.max(8, kg));
}

export function phaseAt(progress: number, id: ObjectiveId, extraBase: number): PhaseId {
  // Kept for older call sites: count forward through a recommended (or extra-base) build.
  const s = SPECS[id];
  const base = s.base + extraBase;
  if (progress < base) return "base";
  if (progress < base + s.specific) return "specific";
  if (progress < base + s.specific + s.taper) return "taper";
  return "done";
}

export function timeline(state: RollingState) {
  const spec = fitSpec(state.objective, planLength(state));
  return {
    base: spec.base,
    specific: spec.specific,
    taper: spec.taper,
    total: planLength(state),
    progress: Math.min(state.calendar - 1, planLength(state)),
    phase: phaseOf(state),
    remaining: remainingWeeks(state),
    quality: qualityFor(state.objective, planLength(state)),
    peakOn: state.peakOn,
  };
}

const EASY_WEEK: DaySession[] = [
  { kind: "easy", key: "easy" },
  { kind: "easy", key: "easy" },
  { kind: "rest", key: "rest" },
  { kind: "easy", key: "easy" },
  { kind: "rest", key: "rest" },
  { kind: "easy", key: "long" },
  { kind: "easy", key: "easy" },
];

const EASED_WEEK: DaySession[] = [
  { kind: "easy", key: "recovery" },
  { kind: "easy", key: "easy" },
  { kind: "rest", key: "rest" },
  { kind: "easy", key: "easy" },
  { kind: "rest", key: "rest" },
  { kind: "easy", key: "recovery" },
  { kind: "easy", key: "easy" },
];

const TAPER_WEEK: DaySession[] = [
  { kind: "easy", key: "easy" },
  { kind: "hard", key: "sharpness" },
  { kind: "easy", key: "easy" },
  { kind: "rest", key: "rest" },
  { kind: "rest", key: "rest" },
  { kind: "easy", key: "easy" },
  { kind: "rest", key: "rest" },
];

function daysFor(
  phase: Exclude<PhaseId, "done">,
  objective: ObjectiveId,
  eased: boolean,
): DaySession[] {
  if (eased) return EASED_WEEK;
  if (phase === "taper") {
    if (objective === "engine") {
      return [
        { kind: "easy", key: "recovery" },
        { kind: "easy", key: "easy" },
        { kind: "rest", key: "rest" },
        { kind: "easy", key: "easy" },
        { kind: "rest", key: "rest" },
        { kind: "easy", key: "recovery" },
        { kind: "rest", key: "rest" },
      ];
    }
    return TAPER_WEEK;
  }
  if (objective === "engine") {
    if (phase === "base") {
      return [
        { kind: "easy", key: "easy" },
        { kind: "easy", key: "engine" },
        { kind: "rest", key: "rest" },
        { kind: "easy", key: "easy" },
        { kind: "rest", key: "rest" },
        { kind: "easy", key: "long" },
        { kind: "easy", key: "easy" },
      ];
    }
    return [
      { kind: "easy", key: "easy" },
      { kind: "easy", key: "engine" },
      { kind: "rest", key: "rest" },
      { kind: "easy", key: "hike" },
      { kind: "rest", key: "rest" },
      { kind: "easy", key: "long" },
      { kind: "easy", key: "easy" },
    ];
  }
  if (phase === "base") {
    if (objective === "expedition") {
      return [
        { kind: "easy", key: "easy" },
        { kind: "easy", key: "hike" },
        { kind: "rest", key: "rest" },
        { kind: "hard", key: "strength" },
        { kind: "rest", key: "rest" },
        { kind: "easy", key: "long" },
        { kind: "easy", key: "easy" },
      ];
    }
    if (objective === "alpine" || objective === "traverse") {
      return [
        { kind: "easy", key: "easy" },
        { kind: "steady", key: "climb" },
        { kind: "rest", key: "rest" },
        { kind: "hard", key: "strength" },
        { kind: "rest", key: "rest" },
        { kind: "easy", key: "hike" },
        { kind: "easy", key: "easy" },
      ];
    }
    if (objective === "fifty" || objective === "trail20" || objective === "ultra100") {
      return [
        { kind: "easy", key: "easy" },
        { kind: "easy", key: "easy" },
        { kind: "rest", key: "rest" },
        { kind: "hard", key: "strength" },
        { kind: "rest", key: "rest" },
        { kind: "easy", key: "long" },
        { kind: "easy", key: "easy" },
      ];
    }
    return EASY_WEEK;
  }
  if (objective === "expedition") {
    return [
      { kind: "easy", key: "easy" },
      { kind: "hard", key: "me" },
      { kind: "easy", key: "easy" },
      { kind: "rest", key: "rest" },
      { kind: "rest", key: "rest" },
      { kind: "steady", key: "pack" },
      { kind: "easy", key: "hike" },
    ];
  }
  if (objective === "alpine" || objective === "traverse") {
    return [
      { kind: "easy", key: "easy" },
      { kind: "hard", key: "climb" },
      { kind: "easy", key: "easy" },
      { kind: "hard", key: "me" },
      { kind: "rest", key: "rest" },
      { kind: "steady", key: "mountain" },
      { kind: "easy", key: "easy" },
    ];
  }
  if (objective === "ultra100") {
    return [
      { kind: "easy", key: "easy" },
      { kind: "hard", key: "quality" },
      { kind: "rest", key: "rest" },
      { kind: "hard", key: "strength" },
      { kind: "rest", key: "rest" },
      { kind: "easy", key: "long" },
      { kind: "easy", key: "easy" },
    ];
  }
  if (objective === "trail20") {
    return [
      { kind: "easy", key: "easy" },
      { kind: "hard", key: "quality" },
      { kind: "rest", key: "rest" },
      { kind: "hard", key: "strength" },
      { kind: "rest", key: "rest" },
      { kind: "easy", key: "long" },
      { kind: "easy", key: "easy" },
    ];
  }
  return [
    { kind: "easy", key: "easy" },
    { kind: "hard", key: "quality" },
    { kind: "rest", key: "rest" },
    { kind: "hard", key: "strength" },
    { kind: "rest", key: "rest" },
    { kind: "easy", key: "long" },
    { kind: "easy", key: "easy" },
  ];
}

export function templateDays(
  phase: Exclude<PhaseId, "done">,
  objective: ObjectiveId,
  eased = false,
): DaySession[] {
  return daysFor(phase, objective, eased).map((day) => ({ ...day }));
}

export function easeWeek(week: PlannedWeek, objective: ObjectiveId): PlannedWeek {
  return adaptWeek(week, "problem", objective);
}

/**
 * The session an objective is built around. `long` for a race on foot, but the
 * alpine, traverse and expedition blocks carry theirs as `me`, `mountain` or
 * `pack` — which is why anything that must never touch the long run has to ask
 * this rather than compare against the string "long".
 */
export const LONG_KEYS = new Set<SessionKey>(["long", "pack", "mountain", "me"]);

export const HARD_KEYS = new Set<SessionKey>([
  "quality",
  "sharpness",
  "vert",
  "mountain",
  "pack",
  "long",
  "climb",
  "strength",
  "me",
]);

/** Rewrite this week's days from how the body feels — preview before log. */
export function adaptWeek(
  week: PlannedWeek,
  result: CheckResult,
  _objective?: ObjectiveId,
): PlannedWeek {
  if (result === "good" || result === "ok") {
    return { ...week, eased: false, days: week.days };
  }
  if (result === "problem") {
    return {
      ...week,
      eased: true,
      days: week.days.map((day) => {
        if (day.kind === "hard" || day.kind === "steady")
          return { ...day, kind: "easy" as const, key: "easy" };
        if (HARD_KEYS.has(day.key)) return { ...day, kind: "easy" as const, key: "recovery" };
        return day;
      }),
    };
  }
  return {
    ...week,
    eased: true,
    days: week.days.map((day) => {
      if (day.kind === "rest") return day;
      if (day.kind === "easy" && !HARD_KEYS.has(day.key)) return day;
      return { ...day, kind: "rest" as const, key: "rest", minutes: 0 };
    }),
  };
}

export type WeekChange = { day: number; from: SessionKey; to: SessionKey };

export function weekChanges(written: PlannedWeek, shown: PlannedWeek): WeekChange[] {
  const out: WeekChange[] = [];
  for (let i = 0; i < written.days.length; i += 1) {
    const from = written.days[i]?.key;
    const to = shown.days[i]?.key;
    if (from && to && from !== to) out.push({ day: i, from, to });
  }
  return out;
}

const RUN_SUB_KEYS = new Set<SessionKey>([
  "easy",
  "long",
  "quality",
  "engine",
  "sharpness",
  "steady",
  "vert",
  "recovery",
]);

/** Apply travel-substitutes, illness easing, and other flags stored on the plan. */
export function applyStateFlags(week: PlannedWeek, state: RollingState): PlannedWeek {
  let days = week.days.map((day) => ({ ...day }));
  let eased = week.eased;
  const reasons: Reason[] = [...(week.reasons ?? [])];
  let swappedRun = false;
  let swappedMountain = false;
  let swappedClimb = false;

  if (state.substituteMode === "hikeCycle") {
    days = days.map((day) => {
      if (!RUN_SUB_KEYS.has(day.key)) return day;
      swappedRun = true;
      return { kind: "easy" as const, key: "hike" as const, minutes: day.minutes };
    });
    if (swappedRun) reasons.push({ id: "runToHikeCycle", values: {} });
  }

  const blocked = state.blockedAccess ?? [];
  if (blocked.includes("mountain")) {
    days = days.map((day) => {
      if (day.key !== "mountain" && day.key !== "vert" && day.key !== "pack" && day.key !== "me")
        return day;
      swappedMountain = true;
      return { kind: "easy" as const, key: "hike" as const, minutes: day.minutes };
    });
    if (swappedMountain) reasons.push({ id: "hikeInsteadOfMountain", values: {} });
  }
  if (blocked.includes("climbing")) {
    days = days.map((day) => {
      if (day.key !== "climb") return day;
      swappedClimb = true;
      return { kind: "hard" as const, key: "strength" as const, minutes: day.minutes ?? 40 };
    });
    if (swappedClimb) reasons.push({ id: "gymInsteadOfClimb", values: {} });
  }

  if (state.secondPeakOn) {
    const ptr = pointerForDate(state, state.secondPeakOn);
    if (ptr && ptr.calendar === week.calendar) {
      const adapted = adaptWeek({ ...week, days }, "problem");
      days = adapted.days;
      eased = true;
      reasons.push({ id: "secondEventEase", values: { date: state.secondPeakOn } });
    }
  }

  if (state.easeThrough != null && week.calendar <= state.easeThrough) {
    const mode = state.easeMode === "wrecked" ? "wrecked" : "problem";
    const adapted = adaptWeek({ ...week, days }, mode);
    days = adapted.days;
    eased = true;
    reasons.push({ id: "illnessEase", values: { n: state.easeThrough } });
  }

  if (state.makeupCalendar != null && week.calendar === state.makeupCalendar) {
    const idx = days.findIndex(
      (day) => day.key === "easy" || day.key === "recovery" || day.key === "hike",
    );
    if (idx >= 0) {
      const current = days[idx]!;
      days[idx] = { kind: "hard", key: "quality", minutes: current.minutes ?? 45 };
      reasons.push({ id: "makeupStacked", values: {} });
    }
  }

  return { ...week, days, eased, reasons };
}

export function weekAt(state: RollingState, calendar: number): PlannedWeek | null {
  const offset = calendar - state.calendar;
  if (offset < 0) return null;
  const phase = phaseOf(state, calendar);
  if (phase === "done") return null;
  return applyStateFlags(
    {
      calendar,
      phase,
      eased: false,
      days: daysFor(phase, state.objective, false),
    },
    state,
  );
}

export function visibleWeeks(state: RollingState): PlannedWeek[] {
  const out: PlannedWeek[] = [];
  for (let i = 0; i < HORIZON; i += 1) {
    const week = weekAt(state, state.calendar + i);
    if (!week) break;
    out.push(week);
  }
  return out;
}

export function startPlan(
  objective: ObjectiveId,
  peakOn: string,
  now = new Date(),
  season = 1,
): RollingState {
  return {
    objective,
    startedOn: todayIso(now),
    peakOn,
    progress: 0,
    extraBase: 0,
    calendar: 1,
    checkins: [],
    season,
    logs: [],
    adjustments: [],
    travelUntil: null,
    blockedAccess: [],
    substituteMode: null,
    secondPeakOn: null,
    easeThrough: null,
    easeMode: null,
    makeupCalendar: null,
    history: [],
  };
}

export function archiveSeason(state: RollingState, at = new Date().toISOString()): ArchivedSeason {
  return {
    season: state.season,
    objective: state.objective,
    startedOn: state.startedOn,
    peakOn: state.peakOn,
    checkins: [...state.checkins],
    logs: [...(state.logs ?? [])],
    extraBase: state.extraBase,
    archivedAt: at,
  };
}

export function nextSeason(state: RollingState, peakOn: string, now = new Date()): RollingState {
  const next = startPlan(state.objective, peakOn, now, state.season + 1);
  return { ...next, history: [...(state.history ?? []), archiveSeason(state)] };
}

export function applyCheckin(state: RollingState, result: CheckResult, note: string): RollingState {
  if (phaseOf(state) === "done") return state;
  const next: RollingState = {
    ...state,
    checkins: [
      ...state.checkins,
      { calendar: state.calendar, result, note: note.trim(), at: new Date().toISOString() },
    ],
    calendar: state.calendar + 1,
  };
  if (result === "problem" || result === "wrecked") {
    next.extraBase = state.extraBase + 1;
    return next;
  }
  next.progress = state.progress + 1;
  return next;
}

/** Peak date only moves when the athlete sets a new one. Tired weeks do not. */
export function retargetPeak(
  state: RollingState,
  peakOn: string,
  at = new Date().toISOString(),
): RollingState {
  if (peakOn === state.peakOn) return state;
  const extra = Math.max(
    0,
    weeksBetween(state.startedOn, peakOn) - weeksBetween(state.startedOn, state.peakOn),
  );
  const adj: Adjustment = {
    at,
    date: todayIso(),
    trigger: "peak",
    from: "easy",
    to: "easy",
    reason: { id: "peakMoved", values: { from: state.peakOn, to: peakOn, extra } },
  };
  return { ...state, peakOn, adjustments: [adj, ...(state.adjustments ?? [])].slice(0, 40) };
}

/** Slide the written week forward if the athlete skipped logging. No fake check-ins. */
export function syncCalendarToToday(state: RollingState, today = todayIso()): RollingState {
  const ptr = pointerForDate(state, today);
  if (!ptr || ptr.calendar <= state.calendar) return state;
  let next = state;
  while (next.calendar < ptr.calendar && phaseOf(next) !== "done") {
    next = {
      ...next,
      calendar: next.calendar + 1,
      progress: next.progress + 1,
    };
  }
  return next;
}

export function upsertLog(state: RollingState, log: SessionLog): RollingState {
  const logs = [
    ...(state.logs ?? []).filter(
      (row) => !(row.date === log.date && row.dayIndex === log.dayIndex),
    ),
    log,
  ];
  return { ...state, logs };
}

export function pushAdjustment(state: RollingState, adj: Adjustment): RollingState {
  return { ...state, adjustments: [adj, ...(state.adjustments ?? [])].slice(0, 40) };
}

export function logFor(
  state: RollingState,
  date: string,
  dayIndex?: number,
): SessionLog | undefined {
  return (state.logs ?? []).find(
    (row) => row.date === date && (dayIndex === undefined || row.dayIndex === dayIndex),
  );
}

export function isRollingState(value: unknown): value is RollingState {
  if (!value || typeof value !== "object") return false;
  const parsed = value as RollingState;
  return (
    OBJECTIVES.includes(parsed.objective) &&
    typeof parsed.startedOn === "string" &&
    typeof parsed.peakOn === "string" &&
    typeof parsed.progress === "number" &&
    typeof parsed.extraBase === "number" &&
    typeof parsed.calendar === "number" &&
    Array.isArray(parsed.checkins)
  );
}

export function loadPlan(): RollingState | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!isRollingState(parsed)) return null;
    return {
      ...parsed,
      season: parsed.season || 1,
      logs: parsed.logs ?? [],
      adjustments: parsed.adjustments ?? [],
      travelUntil: parsed.travelUntil ?? null,
      blockedAccess: parsed.blockedAccess ?? [],
      substituteMode: parsed.substituteMode === "hikeCycle" ? "hikeCycle" : null,
      secondPeakOn: parsed.secondPeakOn ?? null,
      easeThrough: typeof parsed.easeThrough === "number" ? parsed.easeThrough : null,
      easeMode:
        parsed.easeMode === "wrecked" || parsed.easeMode === "problem" ? parsed.easeMode : null,
      makeupCalendar: typeof parsed.makeupCalendar === "number" ? parsed.makeupCalendar : null,
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return null;
  }
}

export function savePlan(state: RollingState | null) {
  if (!canUseStorage()) return;
  try {
    if (state) localStorage.setItem(KEY, JSON.stringify(state));
    else localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(PLAN_EVENT));
  } catch {
    /* private mode / quota — plan still lives in React state this session */
  }
}
