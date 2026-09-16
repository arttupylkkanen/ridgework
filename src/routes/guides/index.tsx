import { createFileRoute } from "@tanstack/react-router";
import { GuidesIndex } from "@/components/guides-page";
import { getCopy } from "@/content";
import { canonical, siteMeta } from "@/lib/seo";

const copy = getCopy("en");

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: siteMeta({
      title: `${copy.guidesIndex.h2} — Ridgework`,
      description: copy.guidesIndex.lead,
      path: "/guides",
      locale: "en",
    }),
    links: canonical("/guides"),
  }),
  component: () => <GuidesIndex locale="en" copy={copy} />,
});
