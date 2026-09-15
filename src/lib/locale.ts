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
  "home" | "founding" | "terms" | "privacy" | "app" | "field" | "login" | "guides" | "example";

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
