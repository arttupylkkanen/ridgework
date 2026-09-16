import type { Copy } from "@/content/types";
import { applyCallToDay } from "@/lib/plan-engine";
import { templateDays } from "@/lib/rolling-plan";

/**
 * The hero's visual. It shows the one session a five-hour night actually
 * changes, taken from the same engine functions the product runs — so the
 * landing page cannot promise a rewrite the desk would not perform.
 *
 * ExampleWeekStrip lower down shows the whole week; this shows only the day
 * that moved, because that is the single idea the fold has room for.
 *
 * Session names only, no durations: templateDays has not been through
 * assignMinutes here, so any minute figure would be a fallback the real desk
 * would never print.
 */
export function HeroProof({ copy }: { copy: Copy }) {
  const week = templateDays("specific", "fifty");
  const hardIndex = week.findIndex((d) => d.kind === "hard");
  const written = week[hardIndex];
  if (!written) return null;

  const shown = applyCallToDay(written, "easy").shown;
  const sessions = copy.tools.plan.sessions;

  return (
    <div className="flex h-full flex-col justify-center bg-paper-warm px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto w-full max-w-sm rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-ridge">
          {copy.hero.proofLabel}
        </p>
        <p className="mt-4 font-display text-lg font-semibold text-ink">
          {copy.tools.week.days[hardIndex]}
        </p>

        <dl className="mt-4 space-y-3">
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-soft">
              {copy.scenario.writtenLabel}
            </dt>
            <dd className="mt-1 text-sm text-ink-soft line-through">{sessions[written.key]}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-ridge">
              {copy.scenario.shownLabel}
            </dt>
            <dd className="mt-1 text-base font-medium text-ridge-deep">{sessions[shown.key]}</dd>
          </div>
        </dl>

        <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-ink-muted">
          {copy.hero.proofHeld}
        </p>
      </div>
    </div>
  );
}
