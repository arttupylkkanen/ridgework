import { createFileRoute } from "@tanstack/react-router";
import { AfterPage } from "@/components/after-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { pageLinks, prefixed, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/after")({
  head: () => ({
    meta: siteMeta({
      title: copy.pageMeta.after.title,
      description: copy.pageMeta.after.description,
      path: "/after",
      locale: "en",
    }),
    links: pageLinks(prefixed("/after"), "en"),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="after">
      <AfterPage locale="en" copy={copy} />
    </SiteShell>
  );
}
