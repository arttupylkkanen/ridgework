import { createFileRoute } from "@tanstack/react-router";
import { SourcesPage } from "@/components/sources-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { isPathLocale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/sources")({
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: [
        { title: copy.sourcesPage.title },
        { name: "description", content: copy.sourcesPage.description },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  const copy = getCopy(locale);
  return (
    <SiteShell locale={locale} copy={copy} page="sources">
      <SourcesPage locale={locale} copy={copy} />
    </SiteShell>
  );
}
