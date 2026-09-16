import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { offerTerms } from "@/lib/offer";
import { AuthLink, HomeLink, WhoLink } from "./app-link";

export function AfterPage({ locale, copy }: { locale: Locale; copy: Copy }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <HomeLink locale={locale} className="text-sm text-ink-muted hover:text-ink">
        {copy.sourcesPage.back}
      </HomeLink>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-ridge">
        {copy.firstWeek.kicker}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {copy.firstWeek.h2}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{copy.firstWeek.lead}</p>

      <ol className="mt-10 divide-y divide-line border-y border-line">
        {copy.firstWeek.days.map((step) => (
          <li key={step.day} className="grid gap-1 py-5 sm:grid-cols-[5.5rem_1fr] sm:gap-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-ridge">
              {step.day}
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">{step.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 font-display text-2xl font-semibold tracking-tight text-ink">
        {copy.week.h2}
      </h2>
      <ol className="mt-6 divide-y divide-line border-y border-line">
        {copy.week.steps.map((step) => (
          <li key={step.day} className="grid gap-1 py-5 sm:grid-cols-[5rem_1fr] sm:gap-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              {step.day}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <AuthLink
          locale={locale}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper hover:bg-ridge-deep"
        >
          {offerTerms(copy).cta}
        </AuthLink>
        <WhoLink
          locale={locale}
          className="inline-flex min-h-11 items-center text-sm font-medium text-ridge underline-offset-2 hover:underline"
        >
          {copy.who.h2} →
        </WhoLink>
      </div>
    </article>
  );
}
