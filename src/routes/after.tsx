import { createFileRoute } from "@tanstack/react-router";
import { AfterPage } from "@/components/after-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { pageLinks, prefixed, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/after")({
  head: () => ({
    meta: siteMeta({
      title: `${copy.firstWeek.h2} — Ridgework`,
      description: copy.firstWeek.lead,
      path: "/after",
      locale: "en",
    }),
    links: pageLinks(prefixed("/after"), "en"),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="after">
      <AfterPage locale="en" copy={copy} />
    </SiteShell>
  );
}
