import { createFileRoute } from "@tanstack/react-router";
import { ExamplePage } from "@/components/example-page";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { pageLinks, prefixed, siteMeta } from "@/lib/seo";
import { isPathLocale } from "@/lib/locale";
import { parseExampleSearch, sharedWeekMeta } from "@/lib/example-link";

export const Route = createFileRoute("/$locale/example")({
  validateSearch: parseExampleSearch,
  // See the English route: `head` cannot read search, so it rides the loader.
  loaderDeps: ({ search }) => ({ goal: search.goal, peak: search.peak }),
  loader: ({ deps }) => deps,
  head: ({ params, loaderData }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: siteMeta({
        ...sharedWeekMeta(copy, loaderData ?? {}, undefined, locale),
        path: `/${locale}/example`,
        locale,
      }),
      links: pageLinks(prefixed("/example"), locale),
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
