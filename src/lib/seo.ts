import { LOCALES, localePrefix, type Locale } from "./locale.ts";

export const SITE = "https://ridgework.org";
const OG_IMAGE = `${SITE}/og.jpg`;

/** Build one page's path in every locale from its English path. */
export type PathOf = (locale: Locale) => string;

/** The usual case: the same path under each locale's prefix. */
export function prefixed(path: string): PathOf {
  return (locale) => `${localePrefix(locale)}${path}`;
}

/** The home page, whose English prefix is empty rather than a path. */
export const localeHome: PathOf = (locale) => localePrefix(locale) || "/";

const OG_LOCALE: Record<string, string> = {
  en: "en_GB",
  fi: "fi_FI",
  fr: "fr_FR",
  de: "de_DE",
};

function absolute(path: string): string {
  return `${SITE}${path === "/" ? "/" : path}`;
}

/** Canonical link for a path — pass alongside `meta` in a route's `head`. */
export function canonical(path: string) {
  return [{ rel: "canonical", href: absolute(path) }];
}

/**
 * `hreflang` annotations for one page across all four locales.
 *
 * Without these the four translations of the same page compete as near
 * duplicates: Google picks one, and a Finnish searcher can land on the German
 * copy. Every locale must list every locale INCLUDING itself, and the set must
 * be reciprocal — `/fi/field` pointing at `/field` only counts if `/field`
 * points back — which is why each route passes the whole `PathOf` rather than
 * its own path. `x-default` goes to English, the prefix-less default.
 */
export function alternates(pathOf: PathOf) {
  return [
    ...LOCALES.map((locale) => ({
      rel: "alternate",
      hrefLang: locale,
      href: absolute(pathOf(locale)),
    })),
    { rel: "alternate", hrefLang: "x-default", href: absolute(pathOf("en")) },
  ];
}

/**
 * The `links` for a translated page: its own canonical plus the full alternate
 * set. Routes that exist in one language only want `canonical` on its own.
 */
export function pageLinks(pathOf: PathOf, locale: Locale) {
  return [...canonical(pathOf(locale)), ...alternates(pathOf)];
}

export function siteMeta(opts: {
  title: string;
  description: string;
  path?: string;
  locale?: string;
}) {
  const path = opts.path ?? "/";
  const url = `${SITE}${path === "/" ? "/" : path}`;
  const locale = OG_LOCALE[opts.locale ?? "en"] ?? "en_GB";
  return [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: locale },
    { property: "og:site_name", content: "Ridgework" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}
