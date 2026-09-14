import { createFileRoute } from "@tanstack/react-router";
import { FoundingInvite } from "@/components/founding-invite";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";

const copy = getCopy("en");

export const Route = createFileRoute("/founding")({
  head: () => ({
    meta: [
      { title: copy.foundingPage.title },
      { name: "description", content: copy.foundingPage.description },
    ],
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
