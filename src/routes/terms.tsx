import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";

const copy = getCopy("en");

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: `${copy.termsPage.title} — Ridgework` }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="terms">
      <LegalPage copy={copy} title={copy.termsPage.title} updated={copy.termsPage.updated} body={copy.termsPage.body} />
    </SiteShell>
  );
}
