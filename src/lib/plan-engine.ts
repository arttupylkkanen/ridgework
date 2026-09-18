import { findings, hardestDayToKeep } from "./adherence.ts";
import { trimCost, weekShortfall } from "./session-cost.ts";
import type { AthleteProfile, AccessFlag, Equipment } from "./athlete.ts";
import { longestMinutes, weeklyMinutes, windowsOf } from "./athlete.ts";
import type {
  DailyInputs,
  LoadContext,
  ReadinessCall,
  ReadinessResult,
  StoredDaily,
} from "./daily-readiness.ts";
import { assessReadiness, emptyLoad } from "./daily-readiness.ts";
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

/**
 * How much of the athlete's weekly volume the phase asks for.
 *
 * This used to not exist, and the taper did not taper. `longFactor` cut the
 * long run from 80 min to 44, but the week's budget stayed at the athlete's
 * full weekly hours, so `assignMinutes` handed the 36 freed minutes straight to
 * the easy days. A taper week totalled the same 239 minutes as the specific
 * week before it. The shape changed; the load did not. An athlete following
 * that arrived at the start line unrested, which is the one thing a taper is
 * for.
 *
 * 0.6 sits inside the range the taper literature supports — Bosquet, Montpetit
 * et al. (Med Sci Sports Exerc 2007) find the largest performance gain from
 * cutting volume 41–60% while holding intensity and frequency, over about two
 * weeks. Which is why only the volume moves here: the quality day stays, and no
 * training day is turned into a rest day.
 */
function weekFactor(phase: PlannedWeek["phase"]): number {
  return phase === "taper" ? 0.6 : 1;
}

/**
 * Shortest session worth writing, per day.
 *
 * Lower in the taper, and not for cosmetic reasons. The floor is binding, not
 * advisory — `assignMinutes` hands every easy day at least this much whatever
 * the week's budget says — so with seven training days a 25-minute floor puts
 * 175 minutes of easy work on the board before anything else is counted, and
 * the taper cancels itself. A 15-minute shakeout in race week is an ordinary
 * session, so the floor drops rather than the training days.
 *
 * With this and the shortened quality day, the floor stops binding: every
 * profile tried — three to twelve hours, five days or seven, beginner to
 * veteran — lands on the same 40% cut.
 */
function minSession(phase: PlannedWeek["phase"]): number {
  return phase === "taper" ? 15 : 25;
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
  /**
   * A weekday history says does not happen (see `src/lib/adherence.ts`).
   * Load-bearing work is kept off it; easy work may still land there, because
   * an easy day missed costs the season very little and pretending the day
   * does not exist at all would shrink the week on the strength of a habit.
   */
  avoidDay: number | null = null,
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

  // Placing the long and the quality avoids the dead weekday, but only while
  // two real options remain: a week with one usable day has nowhere better to
  // go, and honouring the hint there would empty it.
  const withoutDead = avoidDay === null ? slots : slots.filter((i) => i !== avoidDay);
  const workSlots = withoutDead.length >= 2 ? withoutDead : slots;
  if (avoidDay !== null && workSlots !== slots) {
    reasons.push({ id: "adherenceDeadDay", values: { day: avoidDay } });
  }

  // The long goes on the day with the most time, not on Saturday by habit.
  // Equal windows (including "no ceiling" on both) fall back to the weekend.
  const windows = windowsOf(profile);
  const roomOf = (i: number) => windows[i]?.minutes ?? Number.POSITIVE_INFINITY;
  const weekendFirst = [...workSlots].sort((a, b) => {
    const ra = roomOf(a);
    const rb = roomOf(b);
    if (ra !== rb) return rb > ra ? 1 : -1;
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
    qualitySlot = workSlots.find((i) => i !== longSlot && Math.abs(i - longSlot) >= 2);
    if (qualitySlot === undefined) qualitySlot = workSlots.find((i) => i !== longSlot);
    if (
      profile.constraints.includes("shiftWork") &&
      qualitySlot !== undefined &&
      qualitySlot <= 1
    ) {
      const later = workSlots.find((i) => i !== longSlot && i >= 2 && Math.abs(i - longSlot) >= 2);
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
  const weekly = Math.round(weeklyMinutes(profile.weeklyHours) * weekFactor(phase));
  const floor = minSession(phase);
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
  // Say it, rather than leaving the athlete to notice their week got smaller
  // and wonder whether something is broken.
  if (phase === "taper") reasons.push({ id: "taperVolume", values: { n: weekly } });

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
      // Volume comes off the quality day too, while the efforts inside it stay
      // what they were. "Hold the intensity" means hold the pace, not the
      // minute count — a taper that keeps a full-length session and shortens
      // only the easy days is cutting the wrong thing.
      const minutes = Math.max(floor, Math.round((qMin || 40) * weekFactor(phase)));
      remaining -= minutes;
      return { ...day, minutes };
    }
    return day;
  });
  const easyIdx = stamped.map((d, i) => (d.minutes === undefined ? i : -1)).filter((i) => i >= 0);
  const each = easyIdx.length ? Math.max(floor, Math.round(remaining / easyIdx.length)) : 0;
  const spread = stamped.map((day, i) => (easyIdx.includes(i) ? { ...day, minutes: each } : day));
  return fitToWindows(spread, profile, reasons);
}

/**
 * Trim each session to the time its day actually has, then hand the cut minutes
 * to days that still have room. A session is never pushed below 20 minutes —
 * below that it is not worth writing, and the day should have been marked
 * unavailable instead.
 */
function fitToWindows(
  days: DaySession[],
  profile: AthleteProfile,
  reasons: Reason[],
): DaySession[] {
  const windows = windowsOf(profile);
  const roomAt = (i: number) => windows[i]?.minutes ?? null;
  if (windows.every((w) => w.minutes === null)) return days;

  let spare = 0;
  let capped = 0;
  const trimmed = days.map((day, i) => {
    const room = roomAt(i);
    if (room === null || day.key === "rest" || day.minutes === undefined) return day;
    if (day.minutes <= room) return day;
    spare += day.minutes - room;
    capped += 1;
    return { ...day, minutes: Math.max(20, room) };
  });
  if (capped > 0) reasons.push({ id: "dayWindowCap", values: { n: capped } });
  if (spare <= 0) {
    if (capped > 0) reportTrim(days, trimmed, reasons);
    return trimmed;
  }

  const headroom = trimmed
    .map((day, i) => {
      const room = roomAt(i);
      if (day.key === "rest" || day.minutes === undefined) return null;
      const space = room === null ? Number.POSITIVE_INFINITY : room - day.minutes;
      return space > 0 ? { i, space } : null;
    })
    .filter((row): row is { i: number; space: number } => row !== null);
  if (headroom.length === 0) return trimmed;

  const share = Math.floor(spare / headroom.length);
  if (share <= 0) {
    reportTrim(days, trimmed, reasons);
    return trimmed;
  }
  const byIndex = new Map(headroom.map((row) => [row.i, row.space]));
  const spread = trimmed.map((day, i) => {
    const space = byIndex.get(i);
    if (space === undefined || day.minutes === undefined) return day;
    return { ...day, minutes: day.minutes + Math.min(share, space) };
  });
  reportTrim(days, spread, reasons);
  return spread;
}

/**
 * Turn the difference between the week as written and the week that fits into
 * a reason the athlete can act on: what went, and where it came back.
 */
function reportTrim(before: DaySession[], after: DaySession[], reasons: Reason[]): void {
  const cost = trimCost(before, after);
  if (cost.lost <= 0) return;
  reasons.push(
    cost.recovered > 0 && cost.recoveredOn !== null
      ? {
          id: "windowCostRecovered",
          values: {
            lost: cost.lost,
            recovered: cost.recovered,
            day: cost.recoveredOn,
            net: cost.net,
          },
        }
      : { id: "windowCostLost", values: { lost: cost.lost } },
  );
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
  const history = findings(state.logs, calendar);
  let days = placeWork(seed, profile, phase, reasons, hardestDayToKeep(history));
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
  // One fact about the finished week, after every edit has landed: the pile of
  // individual reasons above says what changed, this says whether it mattered.
  const shortfall = weekShortfall(flagged.days, weeklyMinutes(profile.weeklyHours));
  if (shortfall) {
    reasons.push({
      id: "weekUnderTarget",
      values: { share: shortfall.share, short: shortfall.short, target: shortfall.target },
    });
  }
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
  _history: StoredDaily[],
): LoadContext {
  const load = emptyLoad();
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
  /**
   * Minutes the athlete actually spent, when they entered them. Left undefined
   * the log still records what happened — it just cannot contribute to the
   * "done, but short" finding, which needs a real number to mean anything.
   */
  actualMinutes?: number,
): { state: RollingState; adjustment?: Adjustment } {
  const ptr = pointerForDate(state, today);
  if (!ptr) return { state };
  const week = buildWeek(state, ptr.calendar, profile);
  const written = week?.days[ptr.dayIndex] ?? restDay();
  const shown = view?.shown ?? written;
  const entered =
    typeof actualMinutes === "number" && actualMinutes > 0 ? actualMinutes : undefined;
  const log: SessionLog = {
    date: today,
    weekCalendar: ptr.calendar,
    dayIndex: ptr.dayIndex,
    plannedKey: written.key,
    actualKey: status === "missed" ? "rest" : shown.key,
    status,
    at: new Date().toISOString(),
    // What the day asked for is the session as shown, not as originally
    // written: the athlete was told to do the eased version, so that is the
    // number their time should be measured against.
    ...(shown.minutes !== undefined ? { plannedMinutes: shown.minutes } : {}),
    ...(status === "done" && entered !== undefined ? { actualMinutes: entered } : {}),
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
