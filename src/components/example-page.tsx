import { useSearch } from "@tanstack/react-router";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { HomeLink, AuthLink } from "./app-link";
import { ExamplePlanner } from "./example-planner";
import { NotifyForm } from "./notify-form";
import { exampleSelection, type ExampleSearch } from "@/lib/example-link";
import { offerTerms } from "@/lib/offer";

export function ExamplePage({ locale, copy }: { locale: Locale; copy: Copy }) {
  const p = copy.examplePage;
  // Same search the planner reads, so the address a stranger leaves is filed
  // against the race they were actually looking at.
  const selection = exampleSelection(useSearch({ strict: false }) as ExampleSearch);
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <HomeLink locale={locale} className="text-sm text-ink-muted hover:text-ink">
        {p.back}
      </HomeLink>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-ridge">{p.kicker}</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {p.h1}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{p.lead}</p>

      {/* Step two of the sequence comes first: a stranger picks a date and
          reads three weeks. The desk below is step three, where one log
          rewrites a session without moving that date. */}
      <div className="mt-10">
        <ExamplePlanner copy={copy} locale={locale} />
      </div>

      {/* The address goes here rather than at the top: they have their own
          three weeks on screen by now, which is the first moment there is
          anything to be told about. */}
      <div className="mt-10">
        <NotifyForm locale={locale} copy={copy} goal={selection.goal} peak={selection.peakOn} />
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-paper-warm/60 px-6 py-8 sm:px-8">
        <p className="font-display text-lg font-semibold text-ink">{p.noteTitle}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{p.noteBody}</p>
        <AuthLink
          locale={locale}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep"
        >
          {offerTerms(copy).cta}
        </AuthLink>
      </div>
    </article>
  );
}
