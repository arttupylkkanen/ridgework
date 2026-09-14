import { createFileRoute } from "@tanstack/react-router";
import { FieldPage } from "@/components/field-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";

const copy = getCopy("en");

export const Route = createFileRoute("/field")({
  head: () => ({
    meta: [
      { title: copy.fieldPage.title },
      { name: "description", content: copy.fieldPage.description },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="field">
      <FieldPage locale="en" copy={copy} />
    </SiteShell>
  );
}
