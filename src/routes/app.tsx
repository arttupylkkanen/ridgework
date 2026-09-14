import { createFileRoute } from "@tanstack/react-router";
import { AppPage } from "@/components/app-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { parseAppSearch } from "@/lib/search";

const copy = getCopy("en");

export const Route = createFileRoute("/app")({
  validateSearch: parseAppSearch,
  head: () => ({
    meta: [{ title: copy.appPage.title }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="app">
      <AppPage locale="en" copy={copy} />
    </SiteShell>
  );
}