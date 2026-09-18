import type { Copy } from "@/content/types";
import { CHECKOUT_OPEN } from "@/lib/billing";
import { planPageFor } from "@/content/plans";
import type { Locale } from "@/lib/locale";
import { PROGRAM_MEDIA } from "@/lib/program-media";
import { HOME_PROGRAMS } from "@/lib/first-person";
import { PhotoImage } from "@/components/photo-image";
import { HeroProof } from "@/components/hero-proof";
import { offerTerms } from "@/lib/offer";
import {
  AfterLink,
  AuthLink,
  DeskLink,
  ExampleLink,
  GuideLink,
  MethodLink,
  PlanLink,
  WhoLink,
} from "./app-link";
import { ExampleWeekStrip } from "./example-week-strip";

export function HomePage({ locale, copy }: { locale: Locale; copy: Copy }) {
  const offer = offerTerms(copy);

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-5xl lg:grid-cols-2">
          <div className="order-2 border-t border-line lg:order-1 lg:min-h-[28rem] lg:border-r lg:border-t-0">
            <HeroProof copy={copy} />
          </div>
          <div className="order-1 flex flex-col justify-center px-4 py-10 sm:px-8 sm:py-16 lg:order-2">
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-accent">
              {copy.hero.kicker}
            </p>
            <h1 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl">
              {copy.hero.h1}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {copy.hero.lead}
            </p>
            {/* One thing to do here. Two buttons of equal weight make a
                stranger choose before they know what the product is, and the
                second one asked for an account they had no reason to want yet.
                Signing up is still one tap away in the header, and it is a text
                link below for the reader the hero already convinced. */}
            <div className="mt-8">
              <ExampleLink
                locale={locale}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper hover:bg-ridge-deep"
              >
                {copy.cta.seeWeek}
              </ExampleLink>
              {/* The objection at the point of action, in four words. The whole
                  registration story lives in the pricing section, where somebody
                  is actually asking about money. */}
              <p className="mt-3 text-sm text-ink-soft">{copy.hero.noCard}</p>
              <AuthLink
                locale={locale}
                className="mt-4 inline-block text-sm font-medium text-ridge underline-offset-4 hover:underline"
              >
                {offer.cta} →
              </AuthLink>
            </div>
          </div>
        </div>
      </section>

      {/* The one claim a competitor in this market cannot copy honestly, put
          where it is seen rather than left on /method for the curious. */}
      <section className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="max-w-3xl text-sm leading-relaxed text-ink-muted">{copy.hero.sourced}</p>
          <MethodLink
            locale={locale}
            className="shrink-0 text-sm font-medium text-ridge underline-offset-4 hover:underline"
          >
            {copy.hero.sourcedCta} →
          </MethodLink>
        </div>
      </section>

      <section id="example" className="scroll-mt-20 border-b border-line bg-paper-warm/40">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-ridge">
            {copy.scenario.kicker}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {copy.scenario.h2}
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <article className="overflow-hidden border border-line bg-card">
              <img
                src="/shots/today-session.png"
                alt="Today's session in the Ridgework desk, with how it should feel and what to do"
                width={1880}
                height={1120}
                className="w-full border-b border-line object-cover object-top"
                decoding="async"
                loading="lazy"
              />
              <div className="p-5 sm:p-6">
                <p className="font-display text-xl font-semibold text-ink">{copy.scenario.setup}</p>
                <dl className="mt-5 divide-y divide-line border-y border-line">
                  {copy.scenario.facts.map((fact) => (
                    <div key={fact.label} className="flex justify-between gap-4 py-3 text-sm">
                      <dt className="text-ink-muted">{fact.label}</dt>
                      <dd className="font-medium text-ink">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
            <article className="border border-ridge bg-card p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-ridge">
                {copy.scenario.says}
              </p>
              <ul className="mt-5 space-y-3">
                {copy.scenario.actions.map((action) => (
                  <li key={action} className="flex gap-3 text-base leading-relaxed text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ridge" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">{copy.scenario.note}</p>
              <GuideLink
                locale={locale}
                slug="six-weeks-to-a-77k-ultra"
                className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-ridge underline-offset-2 hover:underline"
              >
                {copy.guidesIndex.cta}
              </GuideLink>
            </article>
          </div>
          <div className="mt-10">
            <ExampleWeekStrip copy={copy} />
          </div>
          {/* Who it is for, the first two weeks, and the research used to sit on
              this page as three more sections. They are pages now, and this is
              where a reader who wants them goes looking. */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm font-medium text-ridge">
            <WhoLink
              locale={locale}
              className="min-h-11 items-center underline-offset-2 hover:underline"
            >
              {copy.who.h2} →
            </WhoLink>
            <AfterLink
              locale={locale}
              className="min-h-11 items-center underline-offset-2 hover:underline"
            >
              {copy.firstWeek.h2} →
            </AfterLink>
            <MethodLink
              locale={locale}
              className="min-h-11 items-center underline-offset-2 hover:underline"
            >
              {copy.method.h2} →
            </MethodLink>
          </div>
        </div>
      </section>

      {copy.rollingEngine ? (
        <section id="rolling-engine" className="scroll-mt-20 border-b border-line bg-paper-warm/40">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-ridge">
              {copy.rollingEngine.kicker}
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {copy.rollingEngine.h2}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
              {copy.rollingEngine.lead}
            </p>
            <dl className="mt-10 grid gap-8 sm:grid-cols-3">
              {copy.rollingEngine.points.map((point) => (
                <div key={point.title}>
                  <dt className="font-display text-lg font-semibold text-ridge-deep">
                    {point.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{point.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <section id="programs" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-ridge">
            {copy.programs.kicker}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {copy.programs.h2}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {copy.programs.lead}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {copy.programs.rows
              .filter((row) => (HOME_PROGRAMS as readonly string[]).includes(row.id))
              .map((row) => {
                const photo = PROGRAM_MEDIA[row.id];
                const cardClass =
                  "group cursor-pointer overflow-hidden rounded-2xl border border-line bg-card hover:border-ridge";
                const inner = (
                  <>
                    <PhotoImage
                      photo={photo}
                      alt={row.name}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="aspect-[16/9] w-full object-cover"
                    />
                    <div className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-display text-xl font-semibold text-ink group-hover:text-ridge-deep">
                          {row.name}
                        </h3>
                        <span className="shrink-0 rounded-full border border-line bg-paper-warm px-2.5 py-1 text-xs font-medium text-ink-muted">
                          {row.duration}
                        </span>
                      </div>
                      {row.tag ? (
                        <p className="mt-2 text-xs font-medium text-ridge">{row.tag}</p>
                      ) : null}
                      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{row.focus}</p>
                      {row.locked ? (
                        <p className="mt-3 rounded-lg bg-paper-warm px-3 py-2 text-sm leading-relaxed text-ink">
                          {row.locked}
                        </p>
                      ) : null}
                      <p className="mt-4 text-sm font-medium text-ridge">{copy.programs.cta}</p>
                    </div>
                  </>
                );
                // English gets the plan landing page; other locales keep going
                // straight to the desk, since those pages are English-only.
                const planSlug = locale === "en" ? planPageFor(row.id)?.slug : undefined;
                return planSlug ? (
                  <PlanLink key={row.id} slug={planSlug} className={cardClass}>
                    {inner}
                  </PlanLink>
                ) : (
                  <DeskLink key={row.id} locale={locale} program={row.id} className={cardClass}>
                    {inner}
                  </DeskLink>
                );
              })}
          </div>
          <p className="mt-8">
            <PlanLink className="text-sm font-medium text-ridge hover:text-ridge-deep">
              {copy.programs.more} →
            </PlanLink>
          </p>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 border-b border-line bg-ridge-deep text-paper">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-accent-soft">
            {copy.pricing.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            {offer.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-paper/75">{offer.lead}</p>
          <div className="mt-10 border border-paper/15 bg-paper p-6 text-ink sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-ridge/20 bg-ridge/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ridge">
                {offer.badge}
              </span>
            </div>
            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                  {copy.pricing.name}
                </h3>
                {CHECKOUT_OPEN ? (
                  <>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                        {copy.pricing.price}
                      </span>
                      <span className="text-lg text-ink-muted">{copy.pricing.per}</span>
                    </div>
                    <p className="mt-4 max-w-md text-sm text-ink-muted">{offer.line}</p>
                  </>
                ) : (
                  <>
                    <div className="mt-4 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                      {copy.pricing.freeTag}
                    </div>
                    <p className="mt-4 max-w-md text-sm text-ink-muted">{offer.line}</p>
                  </>
                )}
              </div>
              <AuthLink
                locale={locale}
                className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper hover:bg-ridge-deep sm:w-auto"
              >
                {offer.cta}
              </AuthLink>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {copy.firstWeek.days.map((d) => (
                <li key={d.day} className="text-sm text-ink">
                  <span className="font-medium">
                    {d.day}: {d.title}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {offer.features.map((f) => (
                <li key={f} className="text-sm text-ink-muted">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 border border-paper/10 px-6 py-5">
            <h3 className="font-display text-lg font-semibold text-paper">{offer.laterTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-paper/70">{offer.laterBody}</p>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 border-b border-line bg-paper-warm/40">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {copy.faq.h2}
          </h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {copy.faq.items.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span
                    className="mt-0.5 shrink-0 text-ink-soft transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-8 text-sm leading-relaxed text-ink-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="disclaimer" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-xl font-semibold text-warn">{copy.disclaimer.h2}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted">
            {copy.disclaimer.body}
          </p>
        </div>
      </section>
    </>
  );
}
