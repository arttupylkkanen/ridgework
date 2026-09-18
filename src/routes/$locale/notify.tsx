import { createFileRoute } from "@tanstack/react-router";
import { NotifyPage } from "@/components/notify-page";
import { getCopy } from "@/content";
import { isPathLocale } from "@/lib/locale";
import { parseNotifySearch } from "@/lib/notify/link";

export const Route = createFileRoute("/$locale/notify")({
  validateSearch: parseNotifySearch,
  head: ({ params }) => {
    const locale = isPathLocale(params.locale) ? params.locale : "en";
    return {
      meta: [
        { title: getCopy(locale).notify.pageTitle },
        { name: "robots", content: "noindex, nofollow" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { locale: raw } = Route.useParams();
  const locale = isPathLocale(raw) ? raw : "fi";
  const { confirm, leave, stop } = Route.useSearch();
  return <NotifyPage locale={locale} copy={getCopy(locale)} confirm={confirm} leave={leave} stop={stop} />;
}
