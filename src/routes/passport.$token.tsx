import { createFileRoute } from "@tanstack/react-router";
import { PassportPublicPage } from "@/components/passport-public-page";
import { getCopy } from "@/content";

const copy = getCopy("en");

export const Route = createFileRoute("/passport/$token")({
  head: () => ({
    meta: [
      { title: `${copy.tools.passport.reportKicker} — Ridgework` },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Page,
});

function Page() {
  const { token } = Route.useParams();
  return <PassportPublicPage locale="en" copy={copy} token={token} />;
}
