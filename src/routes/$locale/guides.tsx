import { createFileRoute } from "@tanstack/react-router";
import { GuidesIndex } from "@/components/guides-page";
import { getCopy } from "@/content";
import { isPathLocale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/guides")({
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: [
        { title: `${copy.guidesIndex.h2} — Ridgework` },
        { name: "description", content: copy.guidesIndex.lead },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  return <GuidesIndex locale={locale} copy={getCopy(locale)} />;
}
