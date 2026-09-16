import { createFileRoute } from "@tanstack/react-router";
import { AfterPage } from "@/components/after-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { pageLinks, prefixed, siteMeta } from "@/lib/seo";
import { isPathLocale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/after")({
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: siteMeta({
        title: copy.pageMeta.after.title,
        description: copy.pageMeta.after.description,
        path: `/${locale}/after`,
        locale,
      }),
      links: pageLinks(prefixed("/after"), locale),
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  const copy = getCopy(locale);
  return (
    <SiteShell locale={locale} copy={copy} page="after">
      <AfterPage locale={locale} copy={copy} />
    </SiteShell>
  );
}
