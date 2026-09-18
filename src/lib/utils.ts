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
 * A reason carries `key` as a raw `SessionKey` for the same reason it carries
 * `day` as an index: the engine has no locale. Left unresolved it rendered
 * "La séance quality" and "Die quality-Einheit" — the one English word in an
 * otherwise translated sentence, and the word the athlete has never seen,
 * since the week itself prints the localized name.
 */
function withSessionName(copy: Copy, values: Record<string, string | number>) {
  if (typeof values.key !== "string") return values;
  const name = copy.tools.plan.sessions[values.key as keyof Copy["tools"]["plan"]["sessions"]];
  return name ? { ...values, key: name } : values;
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
