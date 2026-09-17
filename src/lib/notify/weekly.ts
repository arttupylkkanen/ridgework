import type { RealizedWeek } from "../plan-engine.ts";
import { addDaysIso, weekMonday } from "../rolling-plan.ts";

/**
 * The one message Ridgework sends between visits.
 *
 * The product's whole claim is that the week gets rewritten. Until now nobody
 * was ever told — the only two emails that existed were "confirm your address"
 * and "reset your password", so an athlete's only way of finding out what the
 * plan said was to remember to go and look.
 *
 * One note, on the day the next week starts. Not a daily nudge, not a streak,
 * not "you missed Tuesday": the brief forbids logging guilt, and it is also
 * the fastest way to teach somebody to ignore you. The note says what is
 * written and stops.
 */

/**
 * The Monday of the week the note is about: the next one to begin.
 *
 * Run on a Sunday evening — which is the schedule — that is tomorrow. Run on
 * any other day it is still the next Monday, so the note never describes a week
 * that is already half over. The only day it names today is Monday itself.
 */
export function targetMonday(today: string): string {
  const monday = weekMonday(today);
  return today === monday ? monday : addDaysIso(monday, 7);
}

/**
 * At most one note per athlete per week described, whatever the schedule does.
 *
 * Keyed on the target Monday rather than on the day of sending, so a retried
 * run, a duplicated delivery, and a schedule changed from weekly to daily are
 * all harmless — and a slot that is missed entirely is picked up the next time
 * the sender runs rather than lost.
 */
export function shouldSend(lastSentOn: string | null, today: string): boolean {
  return lastSentOn !== targetMonday(today);
}

export type WeeklyNote = { subject: string; text: string };

export function weeklyNote(input: {
  name: string;
  week: RealizedWeek;
  /** Localised session labels, `copy.tools.plan.sessions`. */
  sessions: Record<string, string>;
  /** Localised weekday abbreviations, `copy.tools.week.days`. */
  days: string[];
  deskUrl: string;
  stopUrl: string;
}): WeeklyNote {
  const name = input.name.trim();
  const lines = input.week.days.map((day, i) => {
    const label = input.sessions[day.key] ?? day.key;
    const minutes = day.minutes ? ` · ${day.minutes} min` : "";
    return `${input.days[i] ?? ""}  ${label}${minutes}`;
  });

  return {
    subject: `Your week: ${input.week.dates[0] ?? ""}`,
    text: [
      name ? `${name},` : "Hello,",
      "",
      "Next week is written:",
      "",
      ...lines,
      "",
      // No instruction to log, no count of what was missed, no streak. What
      // this message is for is telling somebody the week exists.
      "Nothing here is fixed. Say how you slept and it gets rewritten; the peak",
      "date does not move.",
      "",
      input.deskUrl,
      "",
      "One note a week, and that is the whole of it. To stop them:",
      input.stopUrl,
      "",
      "Ridgework — support@ridgework.org",
    ].join("\n"),
  };
}
