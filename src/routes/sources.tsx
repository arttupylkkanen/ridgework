import { createFileRoute } from "@tanstack/react-router";
import { SourcesPage } from "@/components/sources-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { canonical, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: siteMeta({
      title: copy.sourcesPage.title,
      description: copy.sourcesPage.description,
      path: "/sources",
      locale: "en",
    }),
    links: canonical("/sources"),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="sources">
      <SourcesPage locale="en" copy={copy} />
    </SiteShell>
  );
}
