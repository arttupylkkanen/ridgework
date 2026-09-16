import { useMemo, useState } from "react";
import type { Copy } from "@/content/types";
import { recommendedWeeks, suggestedPeakOn, todayIso, weeksBetween } from "@/lib/rolling-plan";
import { exampleHorizon } from "@/lib/example-horizon";
import { FIRST_OBJECTIVES, type FirstObjective } from "@/lib/first-person";
import { fillTemplate, cn } from "@/lib/utils";

/**
 * Step two of the commercial sequence: pick the day you need to be ready and
 * see the three weeks the engine actually holds — before signing in, before a
 * card, before anything.
 *
 * Everything here runs through `buildWeek`, the same function the signed-in
 * desk calls, so the weeks a stranger reads are the weeks they would get. The
 * state is React-local and never touches localStorage or the server, so it
 * cannot collide with a signed-in athlete's own plan.
 */
export function ExamplePlanner({ copy }: { copy: Copy }) {
  const t = copy.examplePlanner;
  const sessions = copy.tools.plan.sessions;
  const dayNames = copy.tools.week.days;
  const minutesLabel = copy.tools.athlete.today.minutes;
  const today = todayIso();

  const [goal, setGoal] = useState<FirstObjective>("fifty");
  const [peakOn, setPeakOn] = useState(() => suggestedPeakOn("fifty", today));

  /** Switching objective moves the date to that objective's full build. */
  function pickGoal(next: FirstObjective) {
    setGoal(next);
    setPeakOn(suggestedPeakOn(next, today));
  }

  const horizon = useMemo(() => exampleHorizon(goal, peakOn, today), [goal, peakOn, today]);
  const { weeks } = horizon;

  const available = weeksBetween(today, peakOn);
  const wanted = recommendedWeeks(goal);
  // Said plainly rather than hidden: a short window still writes a plan, it
  // just cuts base first. Pretending otherwise is the thing a PDF does.
  const short = available > 0 && available < wanted;

  return (
    <section className="rounded-2xl border border-line bg-card p-5 sm:p-7">
      <h2 className="font-display text-xl font-semibold text-ink">{t.h2}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.lead}</p>

      <div className="mt-6 flex flex-wrap items-end gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            {t.goalLabel}
          </p>
          <div className="mt-2 flex gap-2">
            {FIRST_OBJECTIVES.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={goal === id}
                onClick={() => pickGoal(id)}
                className={cn(
                  "min-h-11 rounded-lg border px-4 text-sm font-medium",
                  goal === id
                    ? "border-ridge bg-ridge text-paper"
                    : "border-line bg-card text-ink hover:bg-paper-warm",
                )}
              >
                {t.goals[id]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="example-peak"
            className="text-xs font-semibold uppercase tracking-wider text-ink-soft"
          >
            {t.dateLabel}
          </label>
          <input
            id="example-peak"
            type="date"
            value={peakOn}
            min={today}
            onChange={(e) => {
              if (e.target.value) setPeakOn(e.target.value);
            }}
            className="mt-2 block min-h-11 rounded-lg border border-line bg-card px-3 text-sm text-ink"
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        {fillTemplate(short ? t.windowShort : t.windowOk, { n: available, want: wanted })}
      </p>

      {weeks.length === 0 ? (
        <p className="mt-6 text-sm text-accent">{t.tooSoon}</p>
      ) : (
        <ol className="mt-6 grid gap-4 lg:grid-cols-3">
          {weeks.map((week) => (
            <li key={week.calendar} className="rounded-xl border border-line bg-paper-warm/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-ridge">
                {fillTemplate(t.weekN, { n: week.calendar })} · {t.phases[week.phase]}
              </p>
              <ol className="mt-3 divide-y divide-line">
                {week.days.map((day, i) => (
                  <li key={dayNames[i]} className="flex gap-3 py-2 text-sm">
                    <span className="w-10 shrink-0 font-medium uppercase tracking-wider text-ink-soft">
                      {dayNames[i]}
                    </span>
                    <span className={day.key === "rest" ? "text-ink-soft" : "text-ink"}>
                      {sessions[day.key]}
                      {day.minutes ? (
                        <span className="text-ink-soft">
                          {" · "}
                          {fillTemplate(minutesLabel, { n: day.minutes })}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      )}

      {/* Within a phase the engine writes the same week until there is a reason
          to change it. Three identical columns read as a fault, so say what
          they are rather than leaving a stranger to guess. */}
      {horizon.identical && horizon.nextPhaseAt && horizon.nextPhase ? (
        <p className="mt-5 text-sm leading-relaxed text-ink">
          {fillTemplate(t.repeats, {
            phase: t.phases[weeks[0]!.phase],
            next: t.phases[horizon.nextPhase],
            n: horizon.nextPhaseAt,
          })}
        </p>
      ) : null}

      <p className="mt-5 text-sm leading-relaxed text-ink-muted">{t.note}</p>
    </section>
  );
}
