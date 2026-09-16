import { createFileRoute } from "@tanstack/react-router";
import { MentionsPage } from "@/components/mentions-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { isPathLocale } from "@/lib/locale";
import { canonical, siteMeta } from "@/lib/seo";

export const Route = createFileRoute("/$locale/mentions-legales")({
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: siteMeta({
        title: `${copy.legalPage.title} — Ridgework`,
        description: copy.legalPage.lead,
        path: `/${locale}/mentions-legales`,
        locale,
      }),
      links: canonical(`/${locale}/mentions-legales`),
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  const copy = getCopy(locale);
  return (
    <SiteShell locale={locale} copy={copy} page="mentions-legales">
      <MentionsPage copy={copy} />
    </SiteShell>
  );
}
