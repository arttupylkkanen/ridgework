import { createFileRoute } from "@tanstack/react-router";
import { FieldPage } from "@/components/field-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { canonical, siteMeta } from "@/lib/seo";
import { isPathLocale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/field")({
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: siteMeta({
        title: copy.fieldPage.title,
        description: copy.fieldPage.description,
        path: `/${locale}/field`,
        locale,
      }),
      links: canonical(`/${locale}/field`),
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  const copy = getCopy(locale);
  return (
    <SiteShell locale={locale} copy={copy} page="field">
      <FieldPage locale={locale} copy={copy} />
    </SiteShell>
  );
}
