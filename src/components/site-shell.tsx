import { useEffect } from "react";
import type { Copy } from "@/content/types";
import type { Locale, ShellPage } from "@/lib/locale";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = {
  locale: Locale;
  copy: Copy;
  /**
   * Was a hand-written copy of `PageId`, which meant adding a page updated one
   * list and silently missed the other. It is the same list; say so.
   */
  page: ShellPage;
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
