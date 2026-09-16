import { createFileRoute } from "@tanstack/react-router";
import { WhoPage } from "@/components/who-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { pageLinks, prefixed, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/who")({
  head: () => ({
    meta: siteMeta({
      title: `${copy.who.h2} — Ridgework`,
      description: copy.who.forItems[0],
      path: "/who",
      locale: "en",
    }),
    links: pageLinks(prefixed("/who"), "en"),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="who">
      <WhoPage locale="en" copy={copy} />
    </SiteShell>
  );
}
