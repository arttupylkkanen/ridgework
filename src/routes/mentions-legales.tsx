import { createFileRoute } from "@tanstack/react-router";
import { MentionsPage } from "@/components/mentions-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { canonical, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: siteMeta({
      title: `${copy.legalPage.title} — Ridgework`,
      description: copy.legalPage.lead,
      path: "/mentions-legales",
      locale: "en",
    }),
    links: canonical("/mentions-legales"),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="mentions-legales">
      <MentionsPage copy={copy} />
    </SiteShell>
  );
}
