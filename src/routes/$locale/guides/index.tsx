import { createFileRoute } from "@tanstack/react-router";
import { GuidesIndex } from "@/components/guides-page";
import { getCopy } from "@/content";
import { isPathLocale } from "@/lib/locale";
import { pageLinks, prefixed, siteMeta } from "@/lib/seo";

export const Route = createFileRoute("/$locale/guides/")({
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: siteMeta({
        title: `${copy.guidesIndex.h2} — Ridgework`,
        description: copy.guidesIndex.lead,
        path: `/${locale}/guides`,
        locale,
      }),
      links: pageLinks(prefixed("/guides"), locale),
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  return <GuidesIndex locale={locale} copy={getCopy(locale)} />;
}
