import { createFileRoute, notFound } from "@tanstack/react-router";
import { PlanPage } from "@/components/plan-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { getPlanPage } from "@/content/plans";
import { canonical, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/plans/$slug")({
  loader: ({ params }) => {
    const plan = getPlanPage(params.slug);
    if (!plan) throw notFound();
    return plan;
  },
  head: ({ params }) => {
    const plan = getPlanPage(params.slug);
    if (!plan) return {};
    return {
      meta: siteMeta({
        title: plan.metaTitle,
        description: plan.metaDescription,
        path: `/plans/${plan.slug}`,
        locale: "en",
      }),
      links: canonical(`/plans/${plan.slug}`),
    };
  },
  component: Page,
});

function Page() {
  const plan = Route.useLoaderData();
  return (
    <SiteShell locale="en" copy={copy} page="plans">
      <PlanPage locale="en" copy={copy} plan={plan} />
    </SiteShell>
  );
}
