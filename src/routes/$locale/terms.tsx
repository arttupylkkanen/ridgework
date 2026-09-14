import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { isPathLocale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/terms")({
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return { meta: [{ title: `${copy.termsPage.title} — Ridgework` }] };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  const copy = getCopy(locale);
  return (
    <SiteShell locale={locale} copy={copy} page="terms">
      <LegalPage copy={copy} title={copy.termsPage.title} updated={copy.termsPage.updated} body={copy.termsPage.body} />
    </SiteShell>
  );
}
