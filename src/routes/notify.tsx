import { createFileRoute } from "@tanstack/react-router";
import { NotifyPage } from "@/components/notify-page";
import { getCopy } from "@/content";
import { parseNotifySearch } from "@/lib/notify/link";

const copy = getCopy("en");

export const Route = createFileRoute("/notify")({
  validateSearch: parseNotifySearch,
  head: () => ({
    meta: [
      { title: copy.notify.pageTitle },
      // The token in the URL is the capability. Nothing here should ever be
      // crawled, cached or surfaced in a search result.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Page,
});

function Page() {
  const { confirm, leave, stop } = Route.useSearch();
  return <NotifyPage locale="en" copy={copy} confirm={confirm} leave={leave} stop={stop} />;
}
