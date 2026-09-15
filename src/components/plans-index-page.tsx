import type { Copy } from "@/content/types";
import { PLAN_PAGES, PLAN_UI } from "@/content/plans";
import type { Locale } from "@/lib/locale";
import { PROGRAM_MEDIA } from "@/lib/program-media";
import { recommendedWeeks } from "@/lib/rolling-plan";
import { HomeLink, PlanLink } from "./app-link";

export function PlansIndexPage({ locale, copy }: { locale: Locale; copy: Copy }) {
  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <HomeLink locale={locale} className="text-sm text-ink-muted hover:text-ink">
        {PLAN_UI.back}
      </HomeLink>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-ridge">
        {PLAN_UI.indexKicker}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {PLAN_UI.indexH1}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{PLAN_UI.indexLead}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {PLAN_PAGES.map((plan, i) => {
          const photo = PROGRAM_MEDIA[plan.objective];
          return (
            <PlanLink
              key={plan.slug}
              slug={plan.slug}
              className="group block overflow-hidden rounded-2xl border border-line bg-card hover:border-ridge"
            >
              <img
                src={photo.src}
                alt=""
                width={photo.width}
                height={photo.height}
                className="aspect-[16/9] w-full object-cover"
                decoding="async"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h2 className="font-display text-xl font-semibold text-ink group-hover:text-ridge-deep">
                    {plan.h1}
                  </h2>
                  <span className="shrink-0 rounded-full border border-line bg-paper-warm px-2.5 py-1 text-xs font-medium text-ink-muted">
                    {recommendedWeeks(plan.objective)} {PLAN_UI.weeksUnit}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{plan.lead}</p>
                <p className="mt-4 text-sm font-medium text-ridge">{copy.programs.cta} →</p>
              </div>
            </PlanLink>
          );
        })}
      </div>
    </article>
  );
}
