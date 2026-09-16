import { createFileRoute } from "@tanstack/react-router";
import { PassportPublicPage } from "@/components/passport-public-page";
import { getCopy } from "@/content";
import { isPathLocale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/passport/$token")({
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: [
        { title: `${copy.tools.passport.reportKicker} — Ridgework` },
        { name: "robots", content: "noindex, nofollow" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw, token } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  return <PassportPublicPage locale={locale} copy={getCopy(locale)} token={token} />;
}
