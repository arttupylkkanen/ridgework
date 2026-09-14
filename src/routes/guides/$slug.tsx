import { createFileRoute, notFound } from "@tanstack/react-router";
import { GuideArticle } from "@/components/guides-page";
import { getCopy } from "@/content";
import { getGuide } from "@/content/guides";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return guide;
  },
  head: ({ params }) => {
    const guide = getGuide(params.slug);
    const copy = getCopy("en");
    return {
      meta: [
        { title: `${guide?.title.en ?? copy.guidesIndex.h2} — Ridgework` },
        { name: "description", content: guide?.description.en ?? copy.guidesIndex.lead },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  return <GuideArticle locale="en" copy={getCopy("en")} slug={slug} />;
}
