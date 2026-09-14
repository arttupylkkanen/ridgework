import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { isPathLocale } from "@/lib/locale";

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!isPathLocale(params.locale)) throw notFound();
  },
  component: () => <Outlet />,
});
