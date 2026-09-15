import type { Copy } from "@/content/types";
import { applyCallToDay } from "@/lib/plan-engine";
import { templateDays } from "@/lib/rolling-plan";
import { cn } from "@/lib/utils";

/**
 * A real week from the engine, with the one session a five-hour night would
 * actually change. Both the template and the swap come from the functions the
 * product runs, so this cannot drift into showing a week it would not write.
 */
export function ExampleWeekStrip({ copy }: { copy: Copy }) {
  const dayNames = copy.tools.week.days;
  const sessions = copy.tools.plan.sessions;
  const week = templateDays("specific", "fifty");
  const hardIndex = week.findIndex((d) => d.kind === "hard");

  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-ink">{copy.scenario.weekTitle}</h3>
      <ol className="mt-4 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-7">
        {week.map((day, i) => {
          const changed = i === hardIndex;
          const shown = changed ? applyCallToDay(day, "easy").shown : day;
          return (
            <li
              key={dayNames[i]}
              className={cn("bg-card p-3", changed && "bg-paper-warm ring-1 ring-inset ring-ridge")}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {dayNames[i]}
              </p>
              {changed ? (
                <>
                  <p className="mt-2 text-sm text-ink-soft line-through">{sessions[day.key]}</p>
                  <p className="mt-1 text-sm font-medium text-ridge-deep">{sessions[shown.key]}</p>
                </>
              ) : (
                <p
                  className={cn(
                    "mt-2 text-sm",
                    day.key === "rest" ? "text-ink-soft" : "text-ink",
                  )}
                >
                  {sessions[day.key]}
                </p>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-ink-soft">
        <span className="flex items-center gap-2">
          <span className="h-2 w-4 rounded-sm bg-card ring-1 ring-inset ring-line" />
          {copy.scenario.writtenLabel}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-4 rounded-sm bg-paper-warm ring-1 ring-inset ring-ridge" />
          {copy.scenario.shownLabel}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
        {copy.scenario.changeNote}
      </p>
    </div>
  );
}
