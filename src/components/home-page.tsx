import type { Copy } from "@/content/types";
import { KEY_SOURCES } from "@/content";
import { CHECKOUT_OPEN } from "@/lib/billing";
import { GUIDES } from "@/content/guides";
import { planPageFor } from "@/content/plans";
import type { Locale } from "@/lib/locale";
import { HERO_PHOTO, METHOD_PHOTO, PROGRAM_MEDIA } from "@/lib/program-media";
import { AuthLink, DeskLink, GuideLink, HomeLink, PlanLink, SourcesLink } from "./app-link";
import { CheckoutForm } from "./checkout-form";
import { ExampleWeekStrip } from "./example-week-strip";

export function HomePage({ locale, copy }: { locale: Locale; copy: Copy }) {
  const scenarioPhoto = PROGRAM_MEDIA.ultra100;

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-5xl lg:grid-cols-2">
          <figure className="relative min-h-56 overflow-hidden sm:min-h-80 lg:min-h-[28rem]">
            <img
              src={HERO_PHOTO.src}
              alt=""
              className="h-full w-full object-cover"
              width={HERO_PHOTO.width}
              height={HERO_PHOTO.height}
              decoding="async"
            />
          </figure>
          <div className="flex flex-col justify-center px-4 py-10 sm:px-8 sm:py-16">
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-accent">
              {copy.hero.kicker}
            </p>
            <h1 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl">
              {copy.hero.h1}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {copy.hero.lead}
            </p>
            <p className="mt-5 max-w-md border-l-2 border-ridge pl-4 text-sm text-ink-muted">
              {copy.hero.trial}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <AuthLink
                locale={locale}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper hover:bg-ridge-deep"
              >
                {copy.cta.start}
              </AuthLink>
              <HomeLink
                locale={locale}
                hash="example"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line bg-card px-6 py-3.5 text-base font-medium text-ink hover:bg-paper-warm"
              >
                {copy.nav.example}
              </HomeLink>
            </div>
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

      <section id="method-summary" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-ridge">
                {copy.method.kicker}
              </p>
              <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {copy.method.teaserH2}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
                {copy.method.teaserLead}
              </p>
              <HomeLink
                locale={locale}
                hash="method"
                className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-ridge underline-offset-2 hover:underline"
              >
                {copy.method.teaserCta} →
              </HomeLink>
            </div>
            <div className="self-start border-l-2 border-ridge pl-6">
              <h3 className="font-display text-lg font-semibold text-ink">
                {copy.method.caveatsTitle}
              </h3>
              <ul className="mt-4 space-y-3">
                {copy.method.caveats.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-ink-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
                src={scenarioPhoto.src}
                alt=""
                width={scenarioPhoto.width}
                height={scenarioPhoto.height}
                className="aspect-[16/9] w-full object-cover"
                decoding="async"
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
        </div>
      </section>

      <section id="who" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {copy.who.h2}
          </h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ridge">
                {copy.who.forTitle}
              </h3>
              <ul className="mt-4 space-y-3">
                {copy.who.forItems.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-ink-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                {copy.who.notTitle}
              </h3>
              <ul className="mt-4 space-y-3">
                {copy.who.notItems.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-ink-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="what" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {copy.what.h2}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {copy.what.items.map((item) => (
              <div key={item.n}>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {item.n}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="week" className="scroll-mt-20 border-b border-line bg-paper-warm/40">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-ridge">
            {copy.firstWeek.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {copy.firstWeek.h2}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
            {copy.firstWeek.lead}
          </p>
          <ol className="mt-8 divide-y divide-line border-y border-line">
            {copy.firstWeek.days.map((step) => (
              <li key={step.day} className="grid gap-1 py-5 sm:grid-cols-[5.5rem_1fr] sm:gap-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-ridge">
                  {step.day}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <h3 className="mt-12 font-display text-xl font-semibold text-ink">{copy.week.h2}</h3>
          <ol className="mt-4 divide-y divide-line border-y border-line">
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
        </div>
      </section>

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
            {copy.programs.rows.map((row, i) => {
              const photo = PROGRAM_MEDIA[row.id];
              const cardClass =
                "group cursor-pointer overflow-hidden rounded-2xl border border-line bg-card hover:border-ridge";
              const inner = (
                <>
                  <img
                    src={photo.src}
                    alt={row.name}
                    width={photo.width}
                    height={photo.height}
                    className="aspect-[16/9] w-full object-cover"
                    decoding="async"
                    loading={i === 0 ? "eager" : "lazy"}
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
        </div>
      </section>

      <section id="method" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto grid max-w-5xl lg:grid-cols-2">
          <figure className="relative min-h-56 overflow-hidden sm:min-h-80 lg:min-h-full">
            <img
              src={METHOD_PHOTO.src}
              alt=""
              className="h-full w-full object-cover"
              width={METHOD_PHOTO.width}
              height={METHOD_PHOTO.height}
              decoding="async"
              loading="lazy"
            />
          </figure>
          <div className="px-4 py-14 sm:px-8 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-ridge">
              {copy.method.kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {copy.method.h2}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">{copy.method.lead}</p>
            <dl className="mt-8 space-y-6">
              {copy.method.cards.map((card) => (
                <div key={card.title}>
                  <dt className="font-display text-lg font-semibold text-ridge-deep">
                    {card.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{card.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mx-auto max-w-5xl border-t border-line px-4 py-12 sm:px-6">
          <h3 className="font-display text-lg font-semibold text-ink">
            {copy.method.sourcesTitle}
          </h3>
          <ol className="mt-5 list-decimal space-y-3 pl-5 marker:text-ink-soft">
            {KEY_SOURCES.map((src) => (
              <li key={src.title} className="text-sm leading-relaxed text-ink">
                <span className="font-medium">{src.authors}</span>
                <span className="text-ink-soft"> ({src.year}). </span>
                <span className="italic">{src.title}</span>
                <span className="text-ink-muted"> {src.journal} </span>
                <a
                  href={src.href}
                  className="font-medium text-ridge underline decoration-ridge/30 underline-offset-2 hover:decoration-ridge"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {"doi" in src && src.doi ? `doi:${src.doi}` : "source"}
                </a>
              </li>
            ))}
          </ol>
          <SourcesLink
            locale={locale}
            className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-ridge underline-offset-2 hover:underline"
          >
            {copy.method.allSourcesCta} →
          </SourcesLink>
        </div>
      </section>


      <section id="pricing" className="scroll-mt-20 border-b border-line bg-ridge-deep text-paper">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-accent-soft">
            {copy.pricing.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            {copy.pricing.h2}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-paper/75">{copy.pricing.lead}</p>
          <div className="mt-10 border border-paper/15 bg-paper p-6 text-ink sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-ridge/20 bg-ridge/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ridge">
                {copy.pricing.badge}
              </span>
              <span className="bg-paper-warm px-3 py-1 text-xs font-medium text-ink-muted">
                {copy.pricing.trialBadge}
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
                    <p className="mt-4 max-w-md text-sm text-ink-muted">{copy.pricing.blurb}</p>
                  </>
                ) : (
                  <>
                    <div className="mt-4 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                      {copy.pricing.freeTag}
                    </div>
                    <p className="mt-4 max-w-md text-sm text-ink-muted">{copy.pricing.freeNow}</p>
                  </>
                )}
              </div>
              <AuthLink
                locale={locale}
                className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper hover:bg-ridge-deep sm:w-auto"
              >
                {copy.cta.start}
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
              {copy.pricing.features.map((f) => (
                <li key={f} className="text-sm text-ink-muted">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 border border-paper/10 px-6 py-5">
            <h3 className="font-display text-lg font-semibold text-paper">
              {copy.pricing.laterTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-paper/70">{copy.pricing.laterBody}</p>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-ridge">
            {copy.about.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {copy.about.h2}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
            {copy.about.lead}
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {copy.about.cards.map((card) => (
              <div key={card.title}>
                <h3 className="font-display text-lg font-semibold text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="guides" className="scroll-mt-20 border-b border-line bg-paper-warm/40">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-ridge">
            {copy.guidesIndex.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {copy.guidesIndex.h2}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
            {copy.guidesIndex.lead}
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {GUIDES.map((guide) => (
              <li key={guide.slug}>
                <GuideLink
                  locale={locale}
                  slug={guide.slug}
                  className="block cursor-pointer border border-line bg-card p-5 hover:border-ridge hover:bg-paper"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {guide.kicker[locale]}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold text-ink">
                    {guide.title[locale]}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {guide.description[locale]}
                  </p>
                  <p className="mt-4 text-sm font-medium text-ridge">{copy.guidesIndex.read} →</p>
                </GuideLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="checkout" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <CheckoutForm locale={locale} copy={copy} />
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
