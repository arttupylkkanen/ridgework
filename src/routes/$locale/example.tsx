import { createFileRoute } from "@tanstack/react-router";
import { ExamplePage } from "@/components/example-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { isPathLocale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/example")({
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: [
        { title: copy.examplePage.title },
        { name: "description", content: copy.examplePage.description },
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
    <SiteShell locale={locale} copy={copy} page="example">
      <ExamplePage locale={locale} copy={copy} />
    </SiteShell>
  );
}
