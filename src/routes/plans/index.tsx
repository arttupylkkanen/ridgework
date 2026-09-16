import { createFileRoute } from "@tanstack/react-router";
import { PlansIndexPage } from "@/components/plans-index-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { PLAN_UI } from "@/content/plans";
import { canonical, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/plans/")({
  head: () => ({
    meta: siteMeta({
      title: PLAN_UI.indexTitle,
      description: PLAN_UI.indexDescription,
      path: "/plans",
      locale: "en",
    }),
    links: canonical("/plans"),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="plans">
      <PlansIndexPage locale="en" copy={copy} />
    </SiteShell>
  );
}
