import type { ObjectiveId } from "./rolling-plan.ts";

/**
 * How the plan gets harder.
 *
 * It did not, before this. `assignMinutes` never looked at the week number, so
 * a 24-week build for a first 50 km wrote the same 240-minute week twenty-two
 * times, with the long run stuck at 68 minutes through base and 80 through
 * specific. The only thing that ever changed was the phase. Progressive
 * overload is the one principle endurance training does not work without, and
 * it was simply absent.
 *
 * Kept pure and separate, like `adherence.ts`, so the arithmetic can be read
 * and tested without a profile, a plan or a date.
 */

/**
 * The longest single session the plan builds toward.
 *
 * Not the race distance. You do not run 50 km in training for a 50 km — the
 * long run stops well short and the race day makes up the difference on fresh
 * legs and a taper. Three to three and a half hours is the usual ceiling for a
 * first ultra, and going past it costs more in recovery than it returns.
 */
export const LONG_TARGET: Record<ObjectiveId, number> = {
  engine: 120,
  trail20: 150,
  fifty: 210,
  ultra100: 300,
  alpine: 300,
  traverse: 360,
  expedition: 360,
};

/**
 * The most of a week one session may be.
 *
 * A time-poor athlete's long run is limited by the hours they have, not by
 * their legs, and past about half the week a single session starts costing more
 * than the rest of the week is worth. This is the cap that usually binds, which
 * is why the engine says so out loud when it does.
 */
export const LONG_SHARE_MAX = 0.5;

/** Every fourth week comes back down. */
export const DOWN_WEEK_EVERY = 4;

/**
 * A down week is not a rest week — it is the week the training is absorbed.
 * Ramping for twenty-two weeks without one is how a plan produces a tired
 * athlete rather than a fit one, so this arrives with the ramp rather than
 * after it.
 */
export function isDownWeek(weekInBuild: number, buildWeeks: number): boolean {
  // Never the last week before the taper: two easy weeks back to back at the
  // end of a build wastes the sharpest fitness the athlete will have.
  if (weekInBuild >= buildWeeks) return false;
  return weekInBuild % DOWN_WEEK_EVERY === 0;
}

/** 0 on the first week of the build, 1 on the last. */
export function buildProgress(weekInBuild: number, buildWeeks: number): number {
  if (buildWeeks <= 1) return 1;
  const clamped = Math.min(Math.max(weekInBuild, 1), buildWeeks);
  return (clamped - 1) / (buildWeeks - 1);
}

/**
 * What the long run wants to be this week, before the week's budget gets a say.
 *
 * Starts at the longest outing the athlete says they can already do — not at a
 * fraction of it, because that is a week they have already had — and ends at
 * the objective's target.
 */
export function wantedLong(input: {
  /** Minutes the athlete's entry band is worth. */
  start: number;
  /** `LONG_TARGET` for the objective. */
  target: number;
  weekInBuild: number;
  buildWeeks: number;
}): number {
  const { start, target, weekInBuild, buildWeeks } = input;
  // An athlete who already goes longer than the target keeps what they have.
  const top = Math.max(start, target);
  const ramped = start + (top - start) * buildProgress(weekInBuild, buildWeeks);
  const down = isDownWeek(weekInBuild, buildWeeks) ? 0.75 : 1;
  return Math.round(ramped * down);
}

/** The taper's long: half the biggest session the build actually asked for. */
export function taperLong(input: { start: number; target: number; buildWeeks: number }): number {
  const peak = wantedLong({
    ...input,
    weekInBuild: input.buildWeeks,
    buildWeeks: input.buildWeeks,
  });
  return Math.round(peak * 0.5);
}

/**
 * How much of the athlete's stated weekly hours this week uses.
 *
 * The band is a ceiling, never a starting point: it is the time they told us
 * they have, so the plan may not grow past it. What it can do is start under it
 * — week one at the full budget is a jump for somebody whose plan has not
 * started yet — and come back down every fourth week.
 */
export function weekShare(weekInBuild: number, buildWeeks: number): number {
  const ramped = 0.8 + 0.2 * buildProgress(weekInBuild, buildWeeks);
  return isDownWeek(weekInBuild, buildWeeks) ? ramped * 0.8 : ramped;
}
