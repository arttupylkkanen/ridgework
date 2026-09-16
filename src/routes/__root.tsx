import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { getCopy } from "@/content";
import { siteMeta } from "@/lib/seo";
import appCss from "../styles.css?url";

const defaultCopy = getCopy("en");

export const Route = createRootRoute({
  head: () => ({
    // Root defaults for every page. A route that calls `siteMeta` itself
    // overrides these by name/property; routes that only set a title and
    // description (the guides) inherit the share card from here. Nothing
    // injects tags at the edge any more, so whatever is missing here is
    // missing from the served HTML.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#2f8a4e" },
      ...siteMeta({
        title: defaultCopy.metaTitle,
        description: defaultCopy.metaDescription,
        path: "/",
        locale: "en",
      }),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/brand/icon-192.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/brand/icon-180.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {import.meta.env.DEV ? <PreviewHostBridge /> : null}
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
