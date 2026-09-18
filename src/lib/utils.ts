import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Copy } from "@/content/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fillTemplate(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}

/**
 * A reason carries `day` as a 0–6 index, because the plan engine has no
 * locale and no business holding weekday names. Rendering "3" at the athlete
 * is meaningless, so resolve it to the same label the week planner prints.
 */
function withDayName(copy: Copy, values: Record<string, string | number>) {
  if (typeof values.day !== "number") return values;
  const name = copy.tools.week.days[values.day];
  return name ? { ...values, day: name } : values;
}

/**
 * A reason carries session keys raw, for the same reason it carries `day` as an
 * index: the engine has no locale. Left unresolved they rendered "La séance
 * quality" and "Heute geändert: quality → recovery" — the one English word in
 * an otherwise translated sentence, and a word the athlete has never seen,
 * since the week itself prints the localized name.
 *
 * All three slots, not just `key`: `whyChangedToday` carries two of them, and
 * fixing only the one a test happened to cover is how the second survived.
 */
const SESSION_SLOTS = ["key", "from", "to"] as const;

function withSessionName(copy: Copy, values: Record<string, string | number>) {
  let out = values;
  for (const slot of SESSION_SLOTS) {
    const raw = out[slot];
    if (typeof raw !== "string") continue;
    const name = copy.tools.plan.sessions[raw as keyof Copy["tools"]["plan"]["sessions"]];
    if (name) out = out === values ? { ...values, [slot]: name } : { ...out, [slot]: name };
  }
  return out;
}

/** Look up a plan-engine reason id in `copy.tools.athlete.today.reasons` and fill its template. */
export function reasonText(
  copy: Copy,
  id: string,
  values: Record<string, string | number>,
): string {
  const template = copy.tools.athlete.today.reasons[id] ?? id;
  return fillTemplate(template, withSessionName(copy, withDayName(copy, values)));
}
