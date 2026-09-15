import { createFileRoute } from "@tanstack/react-router";
import { GUIDES } from "@/content/guides";
import { PLAN_PAGES } from "@/content/plans";
import { LOCALES, localePrefix } from "@/lib/locale";
import { SITE } from "@/lib/seo";

/**
 * Generated rather than checked in, so new plan pages and guides cannot be
 * published without also being listed here.
 */
function urls(): string[] {
  const out: string[] = [];
  for (const locale of LOCALES) {
    const prefix = localePrefix(locale);
    out.push(`${SITE}${prefix || "/"}`);
    out.push(`${SITE}${prefix}/guides`);
    out.push(`${SITE}${prefix}/sources`);
    out.push(`${SITE}${prefix}/example`);
    for (const guide of GUIDES) {
      out.push(`${SITE}${prefix}/guides/${guide.slug}`);
    }
  }
  // Plan pages are English-only.
  out.push(`${SITE}/plans`);
  for (const plan of PLAN_PAGES) {
    out.push(`${SITE}/plans/${plan.slug}`);
  }
  return out;
}

function body(): string {
  const entries = urls()
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(body(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
