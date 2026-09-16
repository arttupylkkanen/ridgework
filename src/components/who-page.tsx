import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { AuthLink, AfterLink, HomeLink, MethodLink } from "./app-link";

export function WhoPage({ locale, copy }: { locale: Locale; copy: Copy }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <HomeLink locale={locale} className="text-sm text-ink-muted hover:text-ink">
        {copy.sourcesPage.back}
      </HomeLink>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-ridge">
        {copy.nav.who}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {copy.who.h2}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
        {copy.about.lead}
      </p>

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ridge">
            {copy.who.forTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {copy.who.forItems.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-ink-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
            {copy.who.notTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {copy.who.notItems.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-ink-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {copy.about.cards.map((card) => (
          <div key={card.title}>
            <h2 className="font-display text-lg font-semibold text-ink">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <AuthLink
          locale={locale}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper hover:bg-ridge-deep"
        >
          {copy.cta.start}
        </AuthLink>
        <AfterLink
          locale={locale}
          className="inline-flex min-h-11 items-center text-sm font-medium text-ridge underline-offset-2 hover:underline"
        >
          {copy.firstWeek.h2} →
        </AfterLink>
        <MethodLink
          locale={locale}
          className="inline-flex min-h-11 items-center text-sm font-medium text-ridge underline-offset-2 hover:underline"
        >
          {copy.method.h2} →
        </MethodLink>
      </div>
    </article>
  );
}
