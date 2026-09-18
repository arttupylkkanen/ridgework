import { createFileRoute } from "@tanstack/react-router";
import { ExamplePage } from "@/components/example-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { pageLinks, prefixed, siteMeta } from "@/lib/seo";
import { parseExampleSearch, sharedWeekMeta } from "@/lib/example-link";

const copy = getCopy("en");

export const Route = createFileRoute("/example")({
  validateSearch: parseExampleSearch,
  // `head` cannot read search on its own, so the selection travels through the
  // loader. This is the whole point of the page being linkable: a week sent to
  // a training partner has to preview as that week.
  loaderDeps: ({ search }) => ({ goal: search.goal, peak: search.peak }),
  loader: ({ deps }) => deps,
  head: ({ loaderData }) => ({
    meta: siteMeta({
      ...sharedWeekMeta(copy, loaderData ?? {}, undefined, "en"),
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
