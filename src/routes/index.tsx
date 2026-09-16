import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { localeHome, pageLinks, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: siteMeta({
      title: copy.metaTitle,
      description: copy.metaDescription,
      path: "/",
      locale: "en",
    }),
    links: pageLinks(localeHome, "en"),
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell locale="en" copy={copy} page="home">
      <HomePage locale="en" copy={copy} />
    </SiteShell>
  );
}
