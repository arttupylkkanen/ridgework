import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";

const copy = getCopy("en");

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: `${copy.privacyPage.title} — Ridgework` }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="privacy">
      <LegalPage
        copy={copy}
        title={copy.privacyPage.title}
        updated={copy.privacyPage.updated}
        body={copy.privacyPage.body}
      />
    </SiteShell>
  );
}
