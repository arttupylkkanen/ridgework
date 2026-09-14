import { createFileRoute } from "@tanstack/react-router";
import { AppPage } from "@/components/app-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { isPathLocale } from "@/lib/locale";
import { parseAppSearch } from "@/lib/search";

export const Route = createFileRoute("/$locale/app")({
  validateSearch: parseAppSearch,
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return { meta: [{ title: copy.appPage.title }] };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  const copy = getCopy(locale);
  return (
    <SiteShell locale={locale} copy={copy} page="app">
      <AppPage locale={locale} copy={copy} />
    </SiteShell>
  );
}
