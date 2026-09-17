import { FIRST_OBJECTIVES, type FirstObjective } from "./first-person.ts";
import { suggestedPeakOn, todayIso } from "./rolling-plan.ts";

/**
 * The example planner's state, carried in the URL.
 *
 * It used to live in `useState`, which meant the one artefact the public site
 * produces — a stranger's own three weeks — could not be bookmarked, sent to a
 * training partner, or returned to tomorrow. A week that cannot leave the tab
 * is a week nobody else ever sees.
 *
 * Both fields are optional. An empty search is the honest default rather than
 * an error, so `/example` keeps working and a link that lost a parameter
 * degrades to the page instead of to a crash.
 */
export type ExampleSearch = { goal?: FirstObjective; peak?: string };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isFirstObjective(value: unknown): value is FirstObjective {
  return typeof value === "string" && (FIRST_OBJECTIVES as readonly string[]).includes(value);
}

/**
 * Route validator. Anything unrecognised is dropped, never thrown: these values
 * arrive from other people's links and from whatever a browser did to them.
 */
export function parseExampleSearch(raw: Record<string, unknown>): ExampleSearch {
  const out: ExampleSearch = {};
  if (isFirstObjective(raw.goal)) out.goal = raw.goal;
  const peak = raw.peak;
  if (
    typeof peak === "string" &&
    ISO_DATE.test(peak) &&
    !Number.isNaN(Date.parse(`${peak}T00:00:00.000Z`))
  ) {
    out.peak = peak;
  }
  return out;
}

/**
 * What the planner shows for a given search.
 *
 * A date that has already passed is left alone rather than quietly moved
 * forward. A link shared six months ago should say that its race is behind us,
 * which the planner already does — silently rewriting it to a different week
 * would make the link lie about what it was sent for.
 */
export function exampleSelection(
  search: ExampleSearch,
  today = todayIso(),
): { goal: FirstObjective; peakOn: string } {
  const goal = search.goal ?? "fifty";
  return { goal, peakOn: search.peak ?? suggestedPeakOn(goal, today) };
}
