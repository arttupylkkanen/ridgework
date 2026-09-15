import { useMemo, useState } from "react";
import type { Copy } from "@/content/types";
import { emptyInputs, type DailyInputs, type ReadinessCall } from "@/lib/daily-readiness";
import { startPlan, todayIso, type RollingState } from "@/lib/rolling-plan";
import { buildWeek, overlayToday, realizeToday } from "@/lib/plan-engine";
import { sampleTesterProfile } from "@/lib/test-account";
import { fillTemplate, cn, reasonText } from "@/lib/utils";
import { ScaleRow } from "./tools/today-desk";
import { SessionHowTo } from "./tools/session-how";
import type { Locale } from "@/lib/locale";

const CALL_TONE: Record<ReadinessCall, string> = {
  ready: "border-ridge bg-paper-warm/70",
  reduce: "border-accent bg-paper-warm/80",
  easy: "border-accent bg-paper-warm/80",
  rest: "border-warn bg-paper-warm/90",
};

function formatDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1).toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

/**
 * A fully local, unauthenticated taste of the real desk: same plan engine,
 * same copy, a sample 50 km ultra profile. State lives only in React state —
 * never localStorage, never a server call — so it can never collide with a
 * real signed-in visitor's own plan (which persists under a fixed
 * localStorage key; see `@/lib/rolling-plan`) and resets on every visit.
 */
export function ExampleDesk({ locale, copy }: { locale: Locale; copy: Copy }) {
  const t = copy.tools.athlete.today;
  const sessions = copy.tools.plan.sessions;
  const dayNames = copy.tools.week.days;
  const today = todayIso();

  const [profile] = useState(() => sampleTesterProfile(today));
  const [state] = useState<RollingState>(() => startPlan(profile.goal, profile.peakOn));
  const [inputs, setInputs] = useState<DailyInputs>(emptyInputs);

  const view = useMemo(
    () => realizeToday(state, profile, inputs, today, [], false),
    [state, profile, inputs, today],
  );

  const week = useMemo(() => {
    if (!view) return null;
    const built = buildWeek(state, view.calendar, profile);
    return built ? overlayToday(built, view) : null;
  }, [state, view, profile]);

  if (!view) return null;

  const call = view.call;
  const shown = view.shown;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-line bg-card p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold text-ink">{t.wakeTitle}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.wakeLead}</p>
        <div className="mt-5 space-y-5">
          {(["sleep", "soreness", "motivation", "fatigue", "stress"] as const).map((key) => (
            <ScaleRow
              key={key}
              id={`example-${key}`}
              label={t[key]}
              low={t.scaleLow[key]}
              high={t.scaleHigh[key]}
              value={inputs[key]}
              onChange={(n) => setInputs((prev) => ({ ...prev, [key]: n }))}
            />
          ))}
        </div>
      </section>

      <section className={cn("rounded-2xl border p-5 sm:p-6", CALL_TONE[call])}>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {t.calls[call].title}
        </p>
        <p className="mt-2 font-display text-xl font-semibold text-ink">{t.calls[call].action}</p>
        <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-ink">
          {(view.readiness.drivers.length
            ? view.readiness.drivers
            : view.readiness.reasons.slice(0, 3)
          ).map((reason, i) => (
            <li key={`${reason.id}-${i}`}>{reasonText(copy, reason.id, reason.values)}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-ink-soft">{t.safety}</p>
      </section>

      <section className="rounded-2xl border border-line bg-card p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {t.sessionToday}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink">
          {sessions[shown.key]}
          {shown.minutes ? (
            <span className="text-ink-muted">
              {" "}
              · {fillTemplate(t.minutes, { n: shown.minutes })}
            </span>
          ) : null}
        </h3>
        <SessionHowTo
          locale={locale}
          sessionKey={shown.key}
          minutes={shown.minutes}
          minutesLabel={shown.minutes ? fillTemplate(t.minutes, { n: shown.minutes }) : undefined}
        />
      </section>

      {week ? (
        <section>
          <h3 className="font-display text-lg font-semibold text-ink">{t.thisWeek}</h3>
          <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
            {week.days.map((day, i) => {
              const date = week.dates[i];
              const isToday = date === today;
              return (
                <li
                  key={`${week.calendar}-${i}`}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3 text-sm",
                    isToday && "bg-paper-warm",
                  )}
                >
                  <span className="w-10 shrink-0 font-medium text-ink-soft">{dayNames[i]}</span>
                  <span className="min-w-0 flex-1 text-ink">
                    {sessions[day.key]}
                    {day.minutes ? (
                      <span className="text-ink-muted">
                        {" "}
                        · {fillTemplate(t.minutes, { n: day.minutes })}
                      </span>
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 rounded-2xl border border-line bg-paper-warm/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              {t.whyWeek}
            </p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink">
              {week.reasons.slice(0, 6).map((reason, i) => (
                <li key={`${reason.id}-${i}`}>{reasonText(copy, reason.id, reason.values)}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <p className="text-xs text-ink-soft">{formatDay(today)}</p>
    </div>
  );
}
