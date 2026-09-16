import { createFileRoute } from "@tanstack/react-router";
import { sitemapXml } from "@/lib/sitemap";

/**
 * Generated rather than checked in, so new plan pages and guides cannot be
 * published without also being listed. The body lives in `@/lib/sitemap` so it
 * can be unit-tested without a router.
 */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(sitemapXml(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
