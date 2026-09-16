export const LOCALES = ["en", "fi", "fr", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const PATH_LOCALES = ["fi", "fr", "de"] as const;
export type PathLocale = (typeof PATH_LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function isPathLocale(value: string): value is PathLocale {
  return (PATH_LOCALES as readonly string[]).includes(value);
}

export type PageId =
  | "home"
  | "founding"
  | "terms"
  | "privacy"
  | "mentions-legales"
  | "app"
  | "field"
  | "login"
  | "guides"
  | "example"
  | "sources"
  | "plans";

/**
 * Which page the chrome is rendering, which is not quite the same set as the
 * paths above: a passport is reached by token, so it has no `pagePath`, but the
 * header and footer still need to know they are on one.
 *
 * One type, because the header and the shell each used to keep their own hand
 * written copy of this list — and they had already drifted apart.
 */
export type ShellPage = PageId | "passport";

export function localePrefix(locale: Locale): string {
  return locale === "en" ? "" : `/${locale}`;
}

export function pagePath(locale: Locale, page: PageId): string {
  const prefix = localePrefix(locale);
  if (page === "home") return prefix || "/";
  return `${prefix}/${page}`;
}

export function appProgramPath(locale: Locale, program: string): string {
  return `${pagePath(locale, "app")}?program=${encodeURIComponent(program)}`;
}

export function guidePath(locale: Locale, slug?: string): string {
  const base = `${localePrefix(locale)}/guides`;
  if (!slug) return base || "/guides";
  return `${base}/${slug}`;
}

export function passportPath(locale: Locale, token: string): string {
  return `${localePrefix(locale)}/passport/${encodeURIComponent(token)}`;
}

export function homeHash(locale: Locale, id: string): string {
  const home = pagePath(locale, "home");
  return `${home}#${id}`;
}
