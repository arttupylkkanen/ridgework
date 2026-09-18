import type { DaySession } from "./rolling-plan.ts";
import { applyCallToDay, type RealizedWeek } from "./plan-engine.ts";

/**
 * The session a stranger should see move. Calendar-today is the wrong target
 * on a public example: if today is an easy Friday, "slept badly" appears to
 * do nothing, which is how this demo used to feel broken.
 */
export function rewriteIndex(days: DaySession[]): number {
  const hard = days.findIndex((d) => d.kind === "hard");
  if (hard >= 0) return hard;
  const long = days.findIndex((d) => d.key === "long" || d.key === "pack" || d.key === "mountain");
  if (long >= 0) return long;
  return days.findIndex((d) => d.key !== "rest");
}

export type NoteDay = { label: string; line: string; was?: string };

export function formatWeekNote(input: {
  headline: string;
  finish: string;
  days: NoteDay[];
  why?: string;
  url?: string;
}): string {
  const parts: string[] = [input.headline, input.finish, ""];
  for (const day of input.days) {
    parts.push(day.was ? `${day.label}  ${day.was} → ${day.line}` : `${day.label}  ${day.line}`);
  }
  if (input.why) parts.push("", input.why);
  if (input.url) parts.push("", input.url);
  return `${parts.join("\n")}\n`;
}

function sessionLine(
  day: DaySession,
  sessions: Record<string, string>,
  minutesLabel: (n: number) => string,
): string {
  const name = sessions[day.key] ?? day.key;
  return day.minutes ? `${name} · ${minutesLabel(day.minutes)}` : name;
}

/** One week, optionally with the load session rewritten to easy. */
export function weekNoteFrom(input: {
  week: RealizedWeek;
  wrecked: boolean;
  headline: string;
  finish: string;
  why: string;
  days: string[];
  sessions: Record<string, string>;
  minutesLabel: (n: number) => string;
  url?: string;
}): { text: string; index: number; written: DaySession | null; shown: DaySession | null } {
  const index = rewriteIndex(input.week.days);
  const written = index >= 0 ? input.week.days[index]! : null;
  const shown =
    written && input.wrecked ? applyCallToDay(written, "easy").shown : written;

  const days: NoteDay[] = input.week.days.map((day, i) => {
    const label = input.days[i] ?? "";
    if (i === index && written && shown && input.wrecked && written.key !== shown.key) {
      return {
        label,
        was: sessionLine(written, input.sessions, input.minutesLabel),
        line: sessionLine(shown, input.sessions, input.minutesLabel),
      };
    }
    return { label, line: sessionLine(day, input.sessions, input.minutesLabel) };
  });

  return {
    text: formatWeekNote({
      headline: input.headline,
      finish: input.finish,
      days,
      why: input.wrecked ? input.why : undefined,
      url: input.url,
    }),
    index,
    written,
    shown,
  };
}
