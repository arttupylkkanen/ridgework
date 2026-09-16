import { createFileRoute } from "@tanstack/react-router";
import { FoundingInvite } from "@/components/founding-invite";
import { SiteShell } from "@/components/site-shell";
import { getCopy } from "@/content";
import { canonical, siteMeta } from "@/lib/seo";
import { isPathLocale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/founding")({
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: siteMeta({
        title: copy.foundingPage.title,
        description: copy.foundingPage.description,
        path: `/${locale}/founding`,
        locale,
      }),
      links: canonical(`/${locale}/founding`),
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  const copy = getCopy(locale);
  return (
    <SiteShell locale={locale} copy={copy} page="founding">
      <FoundingInvite locale={locale} copy={copy} />
    </SiteShell>
  );
}
