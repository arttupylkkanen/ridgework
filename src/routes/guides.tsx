import { createFileRoute } from "@tanstack/react-router";
import { GuidesIndex } from "@/components/guides-page";
import { getCopy } from "@/content";

const copy = getCopy("en");

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: `${copy.guidesIndex.h2} — Ridgework` },
      { name: "description", content: copy.guidesIndex.lead },
    ],
  }),
  component: () => <GuidesIndex locale="en" copy={copy} />,
});
