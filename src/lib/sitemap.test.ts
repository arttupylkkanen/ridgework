import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { LOCALES } from "./locale.ts";
import { englishOnlyPages, sitemapXml, translatedPages } from "./sitemap.ts";

const xml = sitemapXml();
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const SITE = "https://ridgework.org";

test("every URL is absolute and on the canonical host", () => {
  for (const loc of locs) {
    assert.ok(loc.startsWith(`${SITE}/`), `${loc} is not an absolute ridgework.org URL`);
  }
});

test("no URL is listed twice", () => {
  assert.equal(new Set(locs).size, locs.length);
});

test("each translated page appears once per locale", () => {
  assert.equal(locs.length, translatedPages().length * LOCALES.length + englishOnlyPages().length);
});

test("hreflang annotations are reciprocal", () => {
  // Every locale of a page must list every locale, itself included, or Google
  // ignores the whole cluster. Each <url> for a translated page therefore
  // carries the same alternate set.
  const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const translated = blocks.filter((b) => b.includes("xhtml:link"));
  assert.equal(translated.length, translatedPages().length * LOCALES.length);
  for (const block of translated) {
    const langs = [...block.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(langs, [...LOCALES, "x-default"]);
    const self = block.match(/<loc>([^<]+)<\/loc>/)![1];
    const hrefs = [...block.matchAll(/xhtml:link[^>]*href="([^"]+)"/g)].map((m) => m[1]);
    assert.ok(hrefs.includes(self), `${self} does not list itself as an alternate`);
  }
});

test("x-default points at the English URL", () => {
  for (const block of [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1])) {
    const xDefault = block.match(/hreflang="x-default" href="([^"]+)"/)?.[1];
    if (!xDefault) continue;
    const english = block.match(/hreflang="en" href="([^"]+)"/)![1];
    assert.equal(xDefault, english);
  }
});

test("English-only pages declare no alternates", () => {
  // A `/fi/plans` alternate would be a 404: there is no $locale/plans route.
  for (const path of englishOnlyPages()) {
    assert.ok(locs.includes(`${SITE}${path}`));
    assert.equal(xml.includes(`href="${SITE}/fi${path}"`), false);
  }
});

test("the owner page is never offered to a crawler", () => {
  assert.equal(
    locs.some((loc) => loc.includes("/owner")),
    false,
  );
});

test("the plan and guide pages are all listed", () => {
  assert.ok(locs.includes(`${SITE}/plans/50k-ultra-training-plan`));
  assert.ok(locs.includes(`${SITE}/fi/guides/100km-ultra-training-plan`));
  assert.ok(locs.includes(`${SITE}/de/field`));
  assert.ok(locs.includes(`${SITE}/founding`));
});

const routesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../routes");

/**
 * The failure this catches: a page is added to the sitemap, or given an English
 * route, without the `$locale` twin — so three of its four listed URLs 404.
 * Guide and plan slugs are covered by their own `$slug` routes, so only the
 * fixed paths are checked here.
 */
test("every translated page has both an English and a $locale route file", () => {
  const fixed = translatedPages()
    .map((pathOf) => pathOf("en"))
    .filter((p) => p !== "/" && p.split("/").length === 2);
  assert.ok(fixed.length > 0, "expected some fixed translated paths");
  for (const p of fixed) {
    const slug = p.slice(1);
    assert.ok(
      existsSync(path.join(routesDir, `${slug}.tsx`)),
      `sitemap lists ${p} but src/routes/${slug}.tsx does not exist`,
    );
    assert.ok(
      existsSync(path.join(routesDir, "$locale", `${slug}.tsx`)),
      `sitemap lists ${p} in every locale but src/routes/$locale/${slug}.tsx does not exist`,
    );
  }
});
