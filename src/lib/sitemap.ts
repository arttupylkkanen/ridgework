/**
 * The sitemap body, kept out of the route file so it can be unit-tested: a
 * sitemap listing a URL that 404s is worse than no sitemap, and that mistake
 * (a page listed per locale when only the English route exists) is invisible
 * until a crawler finds it.
 */
import { GUIDES } from "../content/guides.ts";
import { PLAN_PAGES } from "../content/plans.ts";
import { LOCALES, localePrefix, type Locale } from "./locale.ts";
import { SITE } from "./seo.ts";

/** One translated page: its path in each locale. */
type Translated = (locale: Locale) => string;

const prefixed =
  (path: string): Translated =>
  (locale) =>
    `${localePrefix(locale)}${path}`;

/**
 * Pages with a `$locale` route as well as an English one. Adding a page here
 * without its `src/routes/$locale/` twin puts three 404s in the sitemap.
 */
export function translatedPages(): Translated[] {
  return [
    (locale) => localePrefix(locale) || "/",
    prefixed("/guides"),
    prefixed("/sources"),
    prefixed("/example"),
    prefixed("/field"),
    prefixed("/founding"),
    prefixed("/privacy"),
    prefixed("/terms"),
    prefixed("/mentions-legales"),
    ...GUIDES.map((guide) => prefixed(`/guides/${guide.slug}`)),
  ];
}

/**
 * Pages that exist in English only — no alternates to declare. The plan pages
 * are written in English and have no `$locale/plans` route.
 */
export function englishOnlyPages(): string[] {
  return ["/plans", ...PLAN_PAGES.map((plan) => `/plans/${plan.slug}`)];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * A `<url>` with its full `xhtml:link` alternate set.
 *
 * Google reads hreflang from the sitemap as readily as from the head, and wants
 * the annotations reciprocal: every locale of a page lists every locale, itself
 * included. Emitting the same set on each entry is what makes it so.
 */
function translatedEntry(pathOf: Translated, locale: Locale): string {
  const alternates = [
    ...LOCALES.map((other) => ({ hreflang: other as string, href: `${SITE}${pathOf(other)}` })),
    { hreflang: "x-default", href: `${SITE}${pathOf("en")}` },
  ]
    .map(
      (alt) =>
        `\n    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeXml(alt.href)}"/>`,
    )
    .join("");
  return `  <url>\n    <loc>${escapeXml(`${SITE}${pathOf(locale)}`)}</loc>${alternates}\n  </url>`;
}

export function sitemapXml(): string {
  const entries: string[] = [];
  for (const pathOf of translatedPages()) {
    for (const locale of LOCALES) {
      entries.push(translatedEntry(pathOf, locale));
    }
  }
  for (const path of englishOnlyPages()) {
    entries.push(`  <url>\n    <loc>${escapeXml(`${SITE}${path}`)}</loc>\n  </url>`);
  }
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    entries.join("\n") +
    "\n</urlset>\n"
  );
}
