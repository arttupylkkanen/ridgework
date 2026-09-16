import { createFileRoute } from "@tanstack/react-router";
import { FieldPage } from "@/components/field-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { pageLinks, prefixed, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/field")({
  head: () => ({
    meta: siteMeta({
      title: copy.fieldPage.title,
      description: copy.fieldPage.description,
      path: "/field",
      locale: "en",
    }),
    links: pageLinks(prefixed("/field"), "en"),
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
