import { createFileRoute } from "@tanstack/react-router";
import { MethodPage } from "@/components/method-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { pageLinks, prefixed, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/method")({
  head: () => ({
    meta: siteMeta({
      title: copy.pageMeta.method.title,
      description: copy.pageMeta.method.description,
      path: "/method",
      locale: "en",
    }),
    links: pageLinks(prefixed("/method"), "en"),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="method">
      <MethodPage locale="en" copy={copy} />
    </SiteShell>
  );
}
