import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import type { Copy } from "@/content/types";
import { LOCALES, type Locale, type PageId, type ShellPage, homeHash, pagePath } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { AuthLink, DeskLink, FieldLink, GuideLink } from "./app-link";

const LANG_LABEL: Record<Locale, string> = { en: "EN", fi: "FI", fr: "FR", de: "DE" };

const SECTION_KEYS = ["example", "programs", "pricing"] as const;

const MOBILE_SECTION_KEYS = ["example", "programs", "pricing", "faq"] as const;

type Props = {
  locale: Locale;
  copy: Copy;
  page: ShellPage;
};

/**
 * Where the language switcher should land. Plan pages are English-only, so
 * switching language from one goes to that locale's home rather than a URL
 * that does not exist.
 */
function localeEquivalent(page: Props["page"], target: Locale): PageId {
  if (page === "passport") return "app";
  if (page === "plans") return target === "en" ? "plans" : "home";
  return page;
}

function AuthSlot({ locale, copy }: { locale: Locale; copy: Copy }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="hidden h-9 w-24 animate-pulse rounded-lg bg-paper-warm sm:block" />;
  }
  if (user) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <UserButton />
      </div>
    );
  }
  return (
    <AuthLink
      locale={locale}
      className="hidden rounded-lg border border-line px-3 py-2 text-sm text-ink hover:bg-paper-warm sm:inline-flex"
    >
      {copy.nav.login}
    </AuthLink>
  );
}

export function SiteHeader({ locale, copy, page }: Props) {
  const [open, setOpen] = useState(false);
  const { user } = useCurrentUserState();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sectionHref = (
    key: (typeof SECTION_KEYS)[number] | (typeof MOBILE_SECTION_KEYS)[number],
  ) => (key === "example" ? pagePath(locale, "example") : homeHash(locale, key));
  const sections = SECTION_KEYS.map((key) => ({
    key,
    href: sectionHref(key),
    label: copy.nav[key],
  }));
  const mobileSections = MOBILE_SECTION_KEYS.map((key) => ({
    key,
    href: sectionHref(key),
    label: copy.nav[key],
  }));

  const toolsHref = pagePath(locale, "app");
  const primaryHref = user ? toolsHref : pagePath(locale, "login");
  const primaryLabel = user ? copy.cta.openTools : copy.cta.start;

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to={pagePath(locale, "home")}
          className="flex shrink-0 items-center gap-2"
          aria-label="Ridgework home"
        >
          <img
            src="/brand/logo-a.png"
            alt="Ridgework"
            className="h-9 w-auto sm:h-10"
            width={180}
            height={40}
            decoding="async"
          />
        </Link>

        <nav
          className="hidden items-center gap-2.5 text-sm text-ink-muted xl:flex"
          aria-label="Primary"
        >
          <GuideLink
            locale={locale}
            className={cn("hover:text-ink", page === "guides" && "font-medium text-ink")}
          >
            {copy.nav.guides}
          </GuideLink>
          <FieldLink
            locale={locale}
            className={cn("hover:text-ink", page === "field" && "font-medium text-ink")}
          >
            {copy.nav.field}
          </FieldLink>
          {sections.map((item) => (
            <a key={item.key} href={item.href} className="hover:text-ink">
              {item.label}
            </a>
          ))}
          {user ? (
            <Link
              to={toolsHref}
              className={cn("hover:text-ink", page === "app" && "font-medium text-ink")}
            >
              {copy.nav.app}
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="flex items-center gap-1 text-sm" aria-label="Language">
            {LOCALES.map((lang) => (
              <Link
                key={lang}
                to={pagePath(lang, localeEquivalent(page, lang))}
                hrefLang={lang}
                aria-current={lang === locale ? "page" : undefined}
                className={cn(
                  "rounded-md px-2 py-1 transition-colors",
                  lang === locale
                    ? "bg-ridge font-medium text-paper"
                    : "text-ink-muted hover:bg-paper-warm hover:text-ink",
                )}
              >
                {LANG_LABEL[lang]}
              </Link>
            ))}
          </nav>
          <AuthSlot locale={locale} copy={copy} />
          {page !== "login" ? (
            user ? (
              <DeskLink
                locale={locale}
                className="hidden rounded-lg bg-ridge px-4 py-2.5 text-sm font-medium text-paper shadow-sm hover:bg-ridge-deep sm:inline-flex"
              >
                {primaryLabel}
              </DeskLink>
            ) : (
              <AuthLink
                locale={locale}
                className="hidden rounded-lg bg-ridge px-4 py-2.5 text-sm font-medium text-paper shadow-sm hover:bg-ridge-deep sm:inline-flex"
              >
                {primaryLabel}
              </AuthLink>
            )
          ) : null}
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line bg-card text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{copy.nav.menu}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-paper px-4 py-4 xl:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            <GuideLink
              locale={locale}
              className="rounded-lg px-3 py-3 text-ink hover:bg-paper-warm"
              onClick={() => setOpen(false)}
            >
              {copy.nav.guides}
            </GuideLink>
            <FieldLink
              locale={locale}
              className="rounded-lg px-3 py-3 text-ink hover:bg-paper-warm"
              onClick={() => setOpen(false)}
            >
              {copy.nav.field}
            </FieldLink>
            {mobileSections.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="rounded-lg px-3 py-3 text-ink hover:bg-paper-warm"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {user ? (
              <DeskLink
                locale={locale}
                className="rounded-lg px-3 py-3 text-ink hover:bg-paper-warm"
                onClick={() => setOpen(false)}
              >
                {copy.nav.app}
              </DeskLink>
            ) : (
              <AuthLink
                locale={locale}
                className="rounded-lg px-3 py-3 text-ink hover:bg-paper-warm"
                onClick={() => setOpen(false)}
              >
                {copy.nav.login}
              </AuthLink>
            )}
            {user ? (
              <DeskLink
                locale={locale}
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-ridge px-4 py-3 text-sm font-medium text-paper"
                onClick={() => setOpen(false)}
              >
                {primaryLabel}
              </DeskLink>
            ) : (
              <AuthLink
                locale={locale}
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-ridge px-4 py-3 text-sm font-medium text-paper"
                onClick={() => setOpen(false)}
              >
                {primaryLabel}
              </AuthLink>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
