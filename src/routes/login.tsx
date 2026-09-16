import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/login-page";
import { getCopy } from "@/content";
import { parseAppSearch } from "@/lib/search";

const copy = getCopy("en");

export const Route = createFileRoute("/login")({
  validateSearch: parseAppSearch,
  head: () => ({
    meta: [
      { title: `${copy.auth.title} — Ridgework` },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <LoginPage locale="en" copy={copy} />,
});
