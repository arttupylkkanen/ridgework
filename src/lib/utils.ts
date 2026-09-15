import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Copy } from "@/content/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fillTemplate(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}

/** Look up a plan-engine reason id in `copy.tools.athlete.today.reasons` and fill its template. */
export function reasonText(
  copy: Copy,
  id: string,
  values: Record<string, string | number>,
): string {
  const template = copy.tools.athlete.today.reasons[id] ?? id;
  return fillTemplate(template, values);
}
