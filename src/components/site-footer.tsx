import { Link } from "@tanstack/react-router";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { pagePath } from "@/lib/locale";

export function SiteFooter({ locale, copy }: { locale: Locale; copy: Copy }) {
  return (
    <footer className="border-t border-line bg-paper-warm">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <img
              src="/brand/logo-a.png"
              alt="Ridgework"
              className="h-10 w-auto"
              width={180}
              height={40}
              decoding="async"
            />
            <p className="mt-3 max-w-sm text-sm text-ink-muted">{copy.footerTag}</p>
            <p className="mt-4 text-sm text-ink-soft">{copy.legalEntity}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a href={`mailto:${copy.support}`} className="text-ink-muted hover:text-ink">
              {copy.support}
            </a>
            <Link to={pagePath(locale, "field")} className="text-ink-muted hover:text-ink">
              {copy.nav.field}
            </Link>
            <Link to={pagePath(locale, "terms")} className="text-ink-muted hover:text-ink">
              {copy.terms}
            </Link>
            <Link to={pagePath(locale, "privacy")} className="text-ink-muted hover:text-ink">
              {copy.privacy}
            </Link>
            <Link
              to={pagePath(locale, "mentions-legales")}
              className="text-ink-muted hover:text-ink"
            >
              {copy.legalNotice}
            </Link>
            <p className="text-ink-soft">{copy.cancelAnytime}</p>
          </div>
        </div>
        <p className="mt-10 text-xs text-ink-soft">{copy.copyright}</p>
      </div>
    </footer>
  );
}
