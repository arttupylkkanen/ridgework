/**
 * What the athlete actually did, read back across weeks.
 *
 * `applyMissedStack` in the plan engine already reacts to a missed session, but
 * only inside the week it happened: it refuses to stack work on top. Nothing
 * looks across weeks, so a session that is missed every single Thursday is
 * prescribed again on the fifth Thursday, unchanged. This module is the part
 * that notices.
 *
 * Two deliberate limits:
 *
 * - **It only reads completed weeks.** The current week is still being lived;
 *   a session not yet done is not a session missed.
 * - **It needs repetition before it speaks.** One missed Thursday is a week
 *   with a late meeting. Three is a Thursday that does not exist. Acting on the
 *   first would make the plan thrash, which reads as the plan being unreliable
 *   rather than responsive — the opposite of the point.
 *
 * Findings are descriptive. What the planner does with them is its own
 * decision, so this module stays pure and testable without a profile, a date,
 * or a plan.
 */
import { HARD_KEYS, LONG_KEYS, type SessionKey, type SessionLog } from "./rolling-plan.ts";

/** Weeks of history considered. Older than this says more about last season. */
export const LOOKBACK_WEEKS = 6;

/** Observations needed before a pattern counts as a pattern. */
export const MIN_OBSERVATIONS = 3;

/** How much of a pattern has to be misses. */
const MISS_SHARE = 0.6;

/** Below this share of the planned duration, a session was not the session. */
const SHORT_SHARE = 0.8;

export type AdherenceFinding =
  /** This weekday does not happen. The planner should stop putting work there. */
  | { id: "dayMissed"; dayIndex: number; missed: number; of: number }
  /** This kind of session does not happen, whichever day it lands on. */
  | { id: "keySkipped"; key: SessionKey; missed: number; of: number }
  /** Long sessions happen, but consistently shorter than written. */
  | { id: "longShort"; share: number; of: number };

/** Logs from finished weeks inside the lookback, newest week first. */
function recent(logs: SessionLog[], calendar: number): SessionLog[] {
  return logs.filter(
    (log) => log.weekCalendar < calendar && log.weekCalendar >= calendar - LOOKBACK_WEEKS,
  );
}

/**
 * A log counts as an observation only when the athlete resolved it. "moved" is
 * neither: the session happened, on another day, and punishing the original
 * slot for that would read the athlete's own fix as a failure.
 */
function resolved(log: SessionLog): boolean {
  return log.status === "done" || log.status === "missed";
}

function share(missed: number, of: number): number {
  return of === 0 ? 0 : missed / of;
}

function tally<T>(
  logs: SessionLog[],
  keyOf: (log: SessionLog) => T,
): Map<T, { missed: number; of: number }> {
  const out = new Map<T, { missed: number; of: number }>();
  for (const log of logs) {
    if (!resolved(log)) continue;
    const key = keyOf(log);
    const row = out.get(key) ?? { missed: 0, of: 0 };
    row.of += 1;
    if (log.status === "missed") row.missed += 1;
    out.set(key, row);
  }
  return out;
}

/** Rows that clear both thresholds, worst share first, ties broken by evidence. */
function ranked<T>(
  counts: Map<T, { missed: number; of: number }>,
): { of_: T; missed: number; of: number }[] {
  const rows: { of_: T; missed: number; of: number }[] = [];
  for (const [key, row] of counts) {
    if (row.of < MIN_OBSERVATIONS) continue;
    if (share(row.missed, row.of) < MISS_SHARE) continue;
    rows.push({ of_: key, missed: row.missed, of: row.of });
  }
  return rows.sort((a, b) => {
    const byShare = share(b.missed, b.of) - share(a.missed, a.of);
    return byShare !== 0 ? byShare : b.of - a.of;
  });
}

/** Weekdays whose sessions are repeatedly not done. Worst first. */
export function missedDays(logs: SessionLog[], calendar: number): AdherenceFinding[] {
  const counts = tally(recent(logs, calendar), (log) => log.dayIndex);
  return ranked(counts).map((row) => ({
    id: "dayMissed" as const,
    dayIndex: row.of_,
    missed: row.missed,
    of: row.of,
  }));
}

/** Session kinds that are repeatedly not done, wherever they are placed. */
export function skippedKeys(logs: SessionLog[], calendar: number): AdherenceFinding[] {
  const counts = tally(
    recent(logs, calendar).filter((log) => log.plannedKey !== "rest"),
    (log) => log.plannedKey,
  );
  return ranked(counts).map((row) => ({
    id: "keySkipped" as const,
    key: row.of_,
    missed: row.missed,
    of: row.of,
  }));
}

/**
 * Long days that are done but cut short.
 *
 * This is the finding that needs `actualMinutes`, and the one a plan cannot
 * infer any other way: the session is marked done, so nothing looks wrong,
 * while the time on feet the phase is built around never accumulates. Logs
 * without a recorded duration are skipped rather than assumed complete.
 */
export function shortLongs(logs: SessionLog[], calendar: number): AdherenceFinding | null {
  const rows = recent(logs, calendar).filter(
    (log) =>
      log.status === "done" &&
      log.plannedKey === "long" &&
      typeof log.actualMinutes === "number" &&
      typeof log.plannedMinutes === "number" &&
      (log.plannedMinutes ?? 0) > 0,
  );
  if (rows.length < MIN_OBSERVATIONS) return null;
  const shares = rows
    .map((log) => (log.actualMinutes as number) / (log.plannedMinutes as number))
    .sort((a, b) => a - b);
  const median = shares[Math.floor(shares.length / 2)];
  if (median >= SHORT_SHARE) return null;
  return { id: "longShort", share: Math.round(median * 100) / 100, of: rows.length };
}

/** Everything this history says, in the order a planner should read it. */
export function findings(logs: SessionLog[] | undefined, calendar: number): AdherenceFinding[] {
  const rows = logs ?? [];
  const short = shortLongs(rows, calendar);
  return [...missedDays(rows, calendar), ...skippedKeys(rows, calendar), ...(short ? [short] : [])];
}

/**
 * The weekday the planner should treat as unavailable for hard work, or null.
 *
 * Only the worst one, and only ever one: moving two days in the same week on
 * the strength of history rewrites the week more than the evidence supports.
 */
export function hardestDayToKeep(findings: AdherenceFinding[]): number | null {
  const worst = findings.find((f) => f.id === "dayMissed");
  return worst && worst.id === "dayMissed" ? worst.dayIndex : null;
}

/** Whether a key is load-bearing enough that skipping it changes the season. */
export function isLoadKey(key: SessionKey): boolean {
  return HARD_KEYS.has(key);
}

/**
 * Most the plan will follow the athlete down.
 *
 * Reading the shortfall straight would let one bad month set the ceiling for
 * the season: every week written shorter is a week logged shorter, which writes
 * a shorter week again. Bounded, it is a nudge — and because the lookback is
 * six weeks, it fades on its own once the athlete catches up.
 */
export const MAX_FOLLOW_DOWN = 0.7;

/**
 * How much of the written long run is actually getting done, or null.
 *
 * The finding this comes from is the one a plan cannot infer any other way:
 * the session is marked done, so nothing looks wrong, while the time on feet
 * the phase is built on never accumulates. A ramp that ignores it is writing
 * numbers at somebody rather than for them.
 */
export function longShortfall(findings: AdherenceFinding[]): number | null {
  const found = findings.find((f) => f.id === "longShort");
  if (!found || found.id !== "longShort") return null;
  return Math.max(MAX_FOLLOW_DOWN, found.share);
}

/**
 * The hard session kind the planner should stop writing, or null.
 *
 * Never the objective's long session, whatever the history says and whatever
 * it is called — `long` for a race on foot, `me`, `mountain` or `pack` for the
 * mountain blocks. It is the spine of every objective here, and swapping it for
 * easy work because it keeps being missed would quietly turn an ultra build
 * into a jogging schedule. `longBeingSkipped` is for that case: it is worth
 * saying, and it is not worth acting on alone.
 */
export function keyToSoften(findings: AdherenceFinding[]): SessionKey | null {
  const worst = findings.find(
    (f) => f.id === "keySkipped" && !LONG_KEYS.has(f.key) && isLoadKey(f.key),
  );
  return worst && worst.id === "keySkipped" ? worst.key : null;
}

/**
 * Whether the objective's own long session is the one being missed.
 *
 * `LONG_KEYS`, not `"long"`: an alpine block's long day is `me`, a traverse's
 * is `pack`. Checking the string let a 195-minute mountain-endurance session be
 * quietly swapped for easy running, which is the exact outcome `keyToSoften`
 * exists to prevent, and nothing was said about it either.
 */
export function longBeingSkipped(findings: AdherenceFinding[]): boolean {
  return findings.some((f) => f.id === "keySkipped" && LONG_KEYS.has(f.key));
}
