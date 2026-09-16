import { createFileRoute } from "@tanstack/react-router";
import { WhoPage } from "@/components/who-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { pageLinks, prefixed, siteMeta } from "@/lib/seo";
import { isPathLocale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/who")({
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: siteMeta({
        title: `${copy.who.h2} — Ridgework`,
        description: copy.who.forItems[0],
        path: `/${locale}/who`,
        locale,
      }),
      links: pageLinks(prefixed("/who"), locale),
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  const copy = getCopy(locale);
  return (
    <SiteShell locale={locale} copy={copy} page="who">
      <WhoPage locale={locale} copy={copy} />
    </SiteShell>
  );
}
