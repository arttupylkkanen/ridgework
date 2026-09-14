import { useEffect } from "react";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = {
  locale: Locale;
  copy: Copy;
  page: "home" | "founding" | "terms" | "privacy" | "app" | "field" | "login" | "guides" | "passport";
  children: React.ReactNode;
};

export function SiteShell({ locale, copy, page, children }: Props) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <SiteHeader locale={locale} copy={copy} page={page} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} copy={copy} />
    </div>
  );
}
