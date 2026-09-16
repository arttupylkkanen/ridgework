import { createFileRoute } from "@tanstack/react-router";
import { ExamplePage } from "@/components/example-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { canonical, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/example")({
  head: () => ({
    meta: siteMeta({
      title: copy.examplePage.title,
      description: copy.examplePage.description,
      path: "/example",
      locale: "en",
    }),
    links: canonical("/example"),
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
