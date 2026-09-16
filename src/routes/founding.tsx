import { createFileRoute } from "@tanstack/react-router";
import { FoundingInvite } from "@/components/founding-invite";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { canonical, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/founding")({
  head: () => ({
    meta: siteMeta({
      title: copy.foundingPage.title,
      description: copy.foundingPage.description,
      path: "/founding",
      locale: "en",
    }),
    links: canonical("/founding"),
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell locale="en" copy={copy} page="founding">
      <FoundingInvite locale="en" copy={copy} />
    </SiteShell>
  );
}
