import { buildWeek, type RealizedWeek } from "./plan-engine.ts";
import {
  HORIZON,
  daysBetween,
  phaseOf,
  startPlan,
  todayIso,
  type PhaseId,
} from "./rolling-plan.ts";
import { firstPersonProfile, type FirstObjective } from "./first-person.ts";

export type Horizon = {
  weeks: RealizedWeek[];
  /** True when every week on the horizon is written identically. */
  identical: boolean;
  /** Calendar week the phase next changes, and what it changes to. */
  nextPhaseAt: number | null;
  nextPhase: Exclude<PhaseId, "done"> | null;
};

/** Two weeks are the same week when every day's session and duration match. */
function signature(week: RealizedWeek): string {
  return week.days.map((d) => `${d.key}:${d.minutes ?? 0}`).join("|");
}

/**
 * The three weeks the desk holds written at a time, for the public example.
 *
 * Within a phase the engine writes the same week over and over — that is the
 * plan, not a bug: base repeats until there is a reason to change it. Three
 * identical columns on a page look like a fault though, so this also reports
 * whether they are identical and when the shape next changes, and the example
 * says so in words instead of leaving a stranger to wonder.
 */
export function exampleHorizon(goal: FirstObjective, peakOn: string, today = todayIso()): Horizon {
  // A date that has passed is not a plan. The engine floors a plan at one week,
  // so without this it would answer a request for last month with a taper week.
  // The `min` attribute on the date input is a hint, not enforcement.
  if (daysBetween(today, peakOn) < 7) {
    return { weeks: [], identical: false, nextPhaseAt: null, nextPhase: null };
  }

  const profile = firstPersonProfile(goal, peakOn);
  const state = startPlan(goal, peakOn, new Date(`${today}T00:00:00.000Z`));

  const weeks: RealizedWeek[] = [];
  for (let i = 0; i < HORIZON; i += 1) {
    const week = buildWeek(state, state.calendar + i, profile);
    if (!week) break;
    weeks.push(week);
  }

  const first = weeks[0];
  if (!first) return { weeks, identical: false, nextPhaseAt: null, nextPhase: null };

  const identical = weeks.length > 1 && new Set(weeks.map(signature)).size === 1;

  // Walk forward from the horizon to the first week in a different phase. The
  // plan cannot be longer than its own calendar, so this always terminates.
  let nextPhaseAt: number | null = null;
  let nextPhase: Exclude<PhaseId, "done"> | null = null;
  for (let c = state.calendar + 1; c < state.calendar + 400; c += 1) {
    const phase = phaseOf(state, c);
    if (phase === "done") break;
    if (phase !== first.phase) {
      nextPhaseAt = c;
      nextPhase = phase;
      break;
    }
  }

  return { weeks, identical, nextPhaseAt, nextPhase };
}
