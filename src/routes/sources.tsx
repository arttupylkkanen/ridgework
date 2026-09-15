import { createFileRoute } from "@tanstack/react-router";
import { SourcesPage } from "@/components/sources-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";

const copy = getCopy("en");

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: copy.sourcesPage.title },
      { name: "description", content: copy.sourcesPage.description },
    ],
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
