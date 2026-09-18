import { FIRST_OBJECTIVES, type FirstObjective } from "./first-person.ts";
import { suggestedPeakOn, todayIso } from "./rolling-plan.ts";
import { fillTemplate } from "./utils.ts";
import type { Copy } from "../content/types.ts";

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

/**
 * Title and description for a week that has been sent to somebody.
 *
 * The planner's state went into the URL so a stranger could bookmark their
 * three weeks or send them to a training partner. A link that previews as the
 * generic homepage card wastes that: the person receiving it sees an advert for
 * a product, not the thing their friend actually meant to show them.
 *
 * Falls back to the page's own copy when the link carries no selection, so
 * `/example` on its own is unchanged.
 */
/**
 * The peak date as a person would say it.
 *
 * A preview in a message thread is read by a human, not a parser, and
 * "2027-06-12" is the one place on the site where the ISO form is wrong. Falls
 * back to the ISO string if the runtime has no ICU data rather than throwing
 * inside a route's `head`.
 */
const DATE_LOCALE: Record<string, string> = {
  // British English, matching the `en_GB` the rest of the site advertises:
  // "12 June 2027", not the American "June 12, 2027".
  en: "en-GB",
  fi: "fi-FI",
  fr: "fr-FR",
  de: "de-DE",
};

export function formatPeak(iso: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(DATE_LOCALE[locale] ?? "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00.000Z`));
  } catch {
    return iso;
  }
}

export function sharedWeekMeta(
  copy: Copy,
  search: ExampleSearch,
  today = todayIso(),
  locale = "en",
): { title: string; description: string } {
  const page = copy.examplePage;
  if (!search.goal && !search.peak) {
    return { title: page.title, description: page.description };
  }
  const { goal, peakOn } = exampleSelection(search, today);
  const objective = copy.examplePlanner.goals[goal];
  const shared = copy.examplePage.shared;
  const date = formatPeak(peakOn, locale);
  return {
    title: fillTemplate(shared.title, { goal: objective, date }),
    description: fillTemplate(shared.description, { goal: objective, date }),
  };
}
