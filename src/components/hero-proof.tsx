import type { Copy } from "@/content/types";
import { applyCallToDay, buildWeek } from "@/lib/plan-engine";
import { startPlan } from "@/lib/rolling-plan";
import { firstPersonProfile } from "@/lib/first-person";
import { fillTemplate } from "@/lib/utils";

/**
 * The hero's visual: the one session a five-hour night actually changes, with
 * the minutes the desk would really print.
 *
 * It used to show session names only, because `templateDays` had not been
 * through `assignMinutes` and any number would have been a fallback the product
 * would never write. It goes through the whole engine now — same `buildWeek`
 * the desk calls — so "5×3 min intervals" becoming "50 min easy" is what this
 * athlete would genuinely be handed, not a mock-up of it.
 *
 * Deliberately NOT keyed to today. A hero that reads the clock renders one
 * thing on the server and another in the browser, and a hydration mismatch on
 * the first screen of the site is a worse bug than a fixed example is a
 * limitation. The week below is the same one every visitor sees.
 */
const REFERENCE_START = new Date(Date.UTC(2026, 0, 5));
const REFERENCE_PEAK = "2026-06-22";
/** Deep enough into the build that the week carries a real quality session. */
const REFERENCE_WEEK = 14;

export function HeroProof({ copy }: { copy: Copy }) {
  const profile = firstPersonProfile("fifty", REFERENCE_PEAK);
  const state = startPlan("fifty", REFERENCE_PEAK, REFERENCE_START);
  const week = buildWeek(state, REFERENCE_WEEK, {
    ...profile,
    // The brief's first person is a beginner, and beginners are written no
    // quality dose at all — so there would be no session to change. This is the
    // same athlete one step along, which is who the card is for.
    experience: "intermediate",
  });

  const hardIndex = week?.days.findIndex((d) => d.kind === "hard") ?? -1;
  const written = hardIndex >= 0 ? week?.days[hardIndex] : undefined;
  if (!week || !written) return null;

  const shown = applyCallToDay(written, "easy").shown;
  const sessions = copy.tools.plan.sessions;
  const minutes = copy.tools.athlete.today.minutes;
  const label = (day: typeof written) =>
    day.minutes
      ? `${sessions[day.key]} · ${fillTemplate(minutes, { n: day.minutes })}`
      : sessions[day.key];

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
            <dd className="mt-1 text-sm text-ink-soft line-through">{label(written)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-ridge">
              {copy.scenario.shownLabel}
            </dt>
            <dd className="mt-1 text-base font-medium text-ridge-deep">{label(shown)}</dd>
          </div>
        </dl>

        <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-ink-muted">
          {copy.hero.proofHeld}
        </p>
      </div>
    </div>
  );
}
