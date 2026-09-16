import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { isPathLocale } from "@/lib/locale";
import { localeHome, pageLinks, siteMeta } from "@/lib/seo";

export const Route = createFileRoute("/$locale/")({
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: siteMeta({
        title: copy.metaTitle,
        description: copy.metaDescription,
        path: `/${locale}/`,
        locale,
      }),
      links: pageLinks(localeHome, locale),
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  const copy = getCopy(locale);
  return (
    <SiteShell locale={locale} copy={copy} page="home">
      <HomePage locale={locale} copy={copy} />
    </SiteShell>
  );
}
