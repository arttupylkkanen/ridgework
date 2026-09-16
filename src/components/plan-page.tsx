import type { Copy } from "@/content/types";
import { PLAN_UI, type PlanPage as PlanPageContent } from "@/content/plans";
import type { Locale } from "@/lib/locale";
import { PROGRAM_MEDIA } from "@/lib/program-media";
import { PhotoImage } from "@/components/photo-image";
import { recommendedWeeks, specFor, templateDays } from "@/lib/rolling-plan";
import { AuthLink, ExampleLink, HomeLink } from "./app-link";
import { offerTerms } from "@/lib/offer";

/** FAQPage structured data — the FAQ here is the long-tail search surface. */
function faqJsonLd(plan: PlanPageContent) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: plan.faq.map((row) => ({
      "@type": "Question",
      name: row.q,
      acceptedAnswer: { "@type": "Answer", text: row.a },
    })),
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function WeekTable({
  copy,
  objective,
  phase,
}: {
  copy: Copy;
  objective: PlanPageContent["objective"];
  phase: "base" | "specific" | "taper";
}) {
  const days = copy.tools.week.days;
  const sessions = copy.tools.plan.sessions;
  const template = templateDays(phase, objective);
  return (
    <ol className="mt-4 divide-y divide-line border-y border-line">
      {template.map((day, i) => (
        <li key={days[i]} className="grid grid-cols-[3.5rem_1fr] gap-4 py-2.5 text-sm">
          <span className="font-medium uppercase tracking-wider text-ink-soft">{days[i]}</span>
          <span className={day.key === "rest" ? "text-ink-soft" : "text-ink"}>
            {sessions[day.key]}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function PlanPage({
  locale,
  copy,
  plan,
}: {
  locale: Locale;
  copy: Copy;
  plan: PlanPageContent;
}) {
  const spec = specFor(plan.objective);
  const total = recommendedWeeks(plan.objective);
  const photo = PROGRAM_MEDIA[plan.objective];
  const p = PLAN_UI;

  const phases = [
    { id: "base" as const, weeks: spec.base, note: plan.phaseNotes.base, label: p.phaseBase },
    {
      id: "specific" as const,
      weeks: spec.specific,
      note: plan.phaseNotes.specific,
      label: p.phaseSpecific,
    },
    { id: "taper" as const, weeks: spec.taper, note: plan.phaseNotes.taper, label: p.phaseTaper },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(plan) }} />

      <HomeLink locale={locale} className="text-sm text-ink-muted hover:text-ink">
        {p.back}
      </HomeLink>

      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-ridge">
        {plan.kicker}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {plan.h1}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-muted">{plan.lead}</p>

      <PhotoImage
        photo={photo}
        sizes="(min-width: 768px) 48rem, 100vw"
        className="mt-8 aspect-[16/9] w-full object-cover"
        priority
      />

      <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
        {[
          { k: p.statTotal, v: `${total} ${p.weeksUnit}` },
          { k: p.phaseBase, v: `${spec.base} ${p.weeksUnit}` },
          { k: p.phaseSpecific, v: `${spec.specific} ${p.weeksUnit}` },
          { k: p.phaseTaper, v: `${spec.taper} ${p.weeksUnit}` },
        ].map((row) => (
          <div key={row.k} className="bg-card px-4 py-3">
            <dt className="text-xs uppercase tracking-wider text-ink-soft">{row.k}</dt>
            <dd className="mt-1 font-display text-lg font-semibold text-ink">{row.v}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {p.weekTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.weekLead}</p>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ridge">
              {p.phaseBase}
            </h3>
            <WeekTable copy={copy} objective={plan.objective} phase="base" />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ridge">
              {p.phaseSpecific}
            </h3>
            <WeekTable copy={copy} objective={plan.objective} phase="specific" />
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-soft">{p.weekNote}</p>
      </section>

      <div className="mt-10 space-y-5">
        {plan.body.map((para) => (
          <p key={para.slice(0, 40)} className="text-base leading-relaxed text-ink">
            {para}
          </p>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {p.phasesTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.phasesLead}</p>
        <div className="mt-6 space-y-6">
          {phases.map((phase) => (
            <div key={phase.id} className="border-l-2 border-ridge pl-5">
              <h3 className="font-display text-lg font-semibold text-ridge-deep">
                {phase.label} · {phase.weeks} {p.weeksUnit}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{phase.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ridge">
            {p.forTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {plan.forWhom.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-ink-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
            {p.notForTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {plan.notForWhom.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-ink-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {p.kitTitle}
        </h2>
        <ul className="mt-4 space-y-2">
          {plan.kit.map((item) => (
            <li key={item} className="text-sm leading-relaxed text-ink-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {p.faqTitle}
        </h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {plan.faq.map((row) => (
            <div key={row.q} className="py-5">
              <h3 className="font-medium text-ink">{row.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{row.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 rounded-2xl border border-ridge bg-paper-warm/60 px-6 py-8 sm:px-8">
        <p className="font-display text-xl font-semibold text-ink">{p.ctaTitle}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{p.ctaBody}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <AuthLink
            locale={locale}
            program={plan.objective}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper hover:bg-ridge-deep"
          >
            {offerTerms(copy).cta}
          </AuthLink>
          <ExampleLink
            locale={locale}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line bg-card px-6 py-3.5 text-base font-medium text-ink hover:bg-paper-warm"
          >
            {p.ctaExample}
          </ExampleLink>
        </div>
      </div>

      <p className="mt-10 text-xs leading-relaxed text-ink-soft">{copy.disclaimer.body}</p>
    </article>
  );
}
