import { createFileRoute, notFound } from "@tanstack/react-router";
import { GuideArticle } from "@/components/guides-page";
import { getCopy } from "@/content";
import { getGuide } from "@/content/guides";
import { isPathLocale } from "@/lib/locale";
import { pageLinks, prefixed, siteMeta } from "@/lib/seo";

export const Route = createFileRoute("/$locale/guides/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return guide;
  },
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const guide = getGuide(params.slug);
    const copy = getCopy(locale);
    return {
      meta: siteMeta({
        title: `${guide?.title[locale] ?? copy.guidesIndex.h2} — Ridgework`,
        description: guide?.description[locale] ?? copy.guidesIndex.lead,
        path: `/${locale}/guides/${params.slug}`,
        locale,
      }),
      links: pageLinks(prefixed(`/guides/${params.slug}`), locale),
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw, slug } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  return <GuideArticle locale={locale} copy={getCopy(locale)} slug={slug} />;
}
