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

/** Look up a plan-engine reason id in `copy.tools.athlete.today.reasons` and fill its template. */
export function reasonText(
  copy: Copy,
  id: string,
  values: Record<string, string | number>,
): string {
  const template = copy.tools.athlete.today.reasons[id] ?? id;
  return fillTemplate(template, withDayName(copy, values));
}
