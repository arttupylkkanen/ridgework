import { createFileRoute } from "@tanstack/react-router";
import { ExamplePage } from "@/components/example-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { pageLinks, prefixed, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/example")({
  head: () => ({
    meta: siteMeta({
      title: copy.examplePage.title,
      description: copy.examplePage.description,
      path: "/example",
      locale: "en",
    }),
    links: pageLinks(prefixed("/example"), "en"),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="example">
      <ExamplePage locale="en" copy={copy} />
    </SiteShell>
  );
}
