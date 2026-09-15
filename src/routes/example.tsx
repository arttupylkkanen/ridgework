import { createFileRoute } from "@tanstack/react-router";
import { ExamplePage } from "@/components/example-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";

const copy = getCopy("en");

export const Route = createFileRoute("/example")({
  head: () => ({
    meta: [
      { title: copy.examplePage.title },
      { name: "description", content: copy.examplePage.description },
    ],
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
