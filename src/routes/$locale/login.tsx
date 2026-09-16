import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/login-page";
import { getCopy } from "@/content";
import { isPathLocale } from "@/lib/locale";
import { parseAppSearch } from "@/lib/search";

export const Route = createFileRoute("/$locale/login")({
  validateSearch: parseAppSearch,
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    const copy = getCopy(locale);
    return {
      meta: [
        { title: `${copy.auth.title} — Ridgework` },
        { name: "robots", content: "noindex, nofollow" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  const copy = getCopy(locale);
  return <LoginPage locale={locale} copy={copy} />;
}
