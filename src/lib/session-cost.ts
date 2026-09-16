/**
 * What a change to the week cost, rather than what the change was.
 *
 * The engine already records *why* a session moved — `dayWindowCap`,
 * `missedNoStack`, `travelEasy`. Every one of those names the edit and stops
 * there, which leaves the athlete to guess whether it mattered. "Long trimmed
 * to fit the window" reads as a constraint being enforced. "Long trimmed 40
 * minutes, the week is now 12% under this phase's time on feet, 25 of it comes
 * back on Sunday" reads as coaching, and it is the same arithmetic — the
 * numbers were being thrown away, not missing.
 *
 * Pure on purpose: both functions take plain session arrays, so the wording
 * lives in `src/content/athlete-copy.ts` and the thresholds are testable
 * without building a plan.
 */
import type { DaySession } from "./rolling-plan.ts";

/** Below this the week is within normal variation and saying so is nagging. */
export const MATERIAL_SHARE = 0.1;

export type TrimCost = {
  /** Days that hit their ceiling. */
  capped: number;
  /** Minutes cut from those days. */
  lost: number;
  /** Minutes of that cut placed on days with room. */
  recovered: number;
  /** Day carrying most of the recovery, or null when none was placed. */
  recoveredOn: number | null;
  /** What the week is actually down, after recovery. */
  net: number;
};

function minutesOf(day: DaySession | undefined): number {
  return day && day.key !== "rest" ? (day.minutes ?? 0) : 0;
}

export function totalMinutes(days: DaySession[]): number {
  return days.reduce((sum, day) => sum + minutesOf(day), 0);
}

/**
 * The cost of fitting a week into its day windows.
 *
 * `before` is the week as the phase wrote it; `after` is the week that fits.
 * Days that lost time and days that gained it are counted separately, because
 * the athlete cares about both halves: what went, and whether it came back.
 */
export function trimCost(before: DaySession[], after: DaySession[]): TrimCost {
  let capped = 0;
  let lost = 0;
  let recovered = 0;
  let bestGain = 0;
  let recoveredOn: number | null = null;

  before.forEach((day, i) => {
    const delta = minutesOf(after[i]) - minutesOf(day);
    if (delta < 0) {
      capped += 1;
      lost += -delta;
    } else if (delta > 0) {
      recovered += delta;
      if (delta > bestGain) {
        bestGain = delta;
        recoveredOn = i;
      }
    }
  });

  return { capped, lost, recovered, recoveredOn, net: Math.max(0, lost - recovered) };
}

export type WeekShortfall = {
  /** Minutes this phase asks for. */
  target: number;
  /** Minutes the week actually carries. */
  planned: number;
  /** How far under, in minutes. */
  short: number;
  /** How far under, as a share of target, rounded to whole percent. */
  share: number;
};

/**
 * How far the finished week falls short of the volume the athlete signed up
 * for — the number that turns a pile of individual edits into one fact.
 *
 * Returns null when the week is at or over target, or when the gap is smaller
 * than `MATERIAL_SHARE`. A plan that reports a 3% shortfall every week trains
 * people to ignore it, and then the 25% week goes unread too.
 */
export function weekShortfall(days: DaySession[], target: number): WeekShortfall | null {
  // A non-finite target means a stored profile carries a band the volume table
  // does not know. That should be impossible past validation, but the failure
  // mode is a reason reading "NaN% under NaN min" in front of an athlete, so
  // it is worth one line to stay quiet instead.
  if (!Number.isFinite(target) || target <= 0) return null;
  const planned = totalMinutes(days);
  if (!Number.isFinite(planned)) return null;
  const short = target - planned;
  if (short <= 0) return null;
  const share = short / target;
  if (share < MATERIAL_SHARE) return null;
  return { target, planned, short, share: Math.round(share * 100) };
}
