import { createFileRoute } from "@tanstack/react-router";
import { OwnerPage } from "@/components/owner-page";
import { ownerReport, type OwnerReport } from "@/lib/owner/metrics-server";

export const Route = createFileRoute("/owner")({
  head: () => ({
    meta: [{ title: "Owner — Ridgework" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  loader: async (): Promise<{ report: OwnerReport | null }> => {
    // Signed out, or signed in as anyone else, this throws. A null report
    // renders the polite refusal rather than an error page, so a mistyped URL
    // does not look like a crash.
    try {
      return { report: await ownerReport() };
    } catch {
      return { report: null };
    }
  },
  component: Page,
});

function Page() {
  const { report } = Route.useLoaderData();
  return <OwnerPage report={report} />;
}
