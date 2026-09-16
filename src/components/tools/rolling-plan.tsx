import { useEffect, useMemo, useState } from "react";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { cn, fillTemplate, reasonText } from "@/lib/utils";
import { SessionHowTo } from "./session-how";
import { PROGRAM_MEDIA } from "@/lib/program-media";
import { PhotoImage } from "@/components/photo-image";
import type { AthleteProfile } from "@/lib/athlete";
import { overlayToday, realizeToday, visiblePersonalizedWeeks } from "@/lib/plan-engine";
import { recentDaily } from "@/lib/daily-readiness";
import {
  OBJECTIVES,
  adaptWeek,
  applyCheckin,
  fitSpec,
  loadPlan,
  nextSeason,
  PLAN_EVENT,
  qualityFor,
  recommendedWeeks,
  remainingWeeks,
  retargetPeak,
  savePlan,
  startPlan,
  suggestedPeakOn,
  timeline,
  todayIso,
  visibleWeeks,
  weekChanges,
  weeksBetween,
  type CheckResult,
  type ObjectiveId,
  type PlannedWeek,
  type QualityBand,
  type RollingState,
} from "@/lib/rolling-plan";

function fill(template: string, vars: Record<string, string | number>) {
  return fillTemplate(template, vars);
}

function formatDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function WindowCard({
  t,
  weeks,
  id,
  quality,
}: {
  t: Copy["tools"]["plan"];
  weeks: number;
  id: ObjectiveId;
  quality: QualityBand;
}) {
  const fitted = fitSpec(id, Math.max(1, weeks));
  const rec = recommendedWeeks(id);
  const q = t.quality[quality];
  const tone =
    quality === "generous" || quality === "full"
      ? "border-ridge bg-paper-warm/70"
      : quality === "solid"
        ? "border-line bg-card"
        : "border-accent bg-paper-warm/80";
  return (
    <div
      className={cn("rounded-2xl border p-5", tone)}
      data-quality={quality}
      data-weeks={weeks}
      data-base={fitted.base}
      data-specific={fitted.specific}
      data-taper={fitted.taper}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">{q.label}</p>
      <p className="mt-2 font-display text-xl font-semibold text-ink">
        {fill(t.windowLabel, { weeks: Math.max(0, weeks) })}
      </p>
      <p className="mt-1 text-sm text-ink-muted">{fill(t.recommendedLabel, { n: rec })}</p>
      <p className="mt-3 text-sm text-ink">
        {fill(t.phaseSplit, { base: fitted.base, specific: fitted.specific, taper: fitted.taper })}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{q.body}</p>
      <p className="mt-3 text-sm leading-relaxed text-ridge-deep">{t.longerBetter}</p>
    </div>
  );
}

export function RollingPlan({
  locale,
  copy,
  onPersist,
  profile,
}: {
  locale: Locale;
  copy: Copy;
  onPersist?: (state: RollingState | null) => void;
  profile?: AthleteProfile | null;
}) {
  const t = copy.tools.plan;
  const days = copy.tools.week.days;
  const athlete = copy.tools.athlete.today;
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<RollingState | null>(null);
  const [pick, setPick] = useState<ObjectiveId>("fifty");
  const [peakOn, setPeakOn] = useState(() => suggestedPeakOn("fifty"));
  const [result, setResult] = useState<CheckResult>("ok");
  const [flash, setFlash] = useState<string | null>(null);
  const [nextPeak, setNextPeak] = useState(() => suggestedPeakOn("fifty"));
  const [openDay, setOpenDay] = useState<string | null>(null);

  useEffect(() => {
    setState(loadPlan());
    setReady(true);
    const onChange = () => setState(loadPlan());
    window.addEventListener(PLAN_EVENT, onChange);
    return () => window.removeEventListener(PLAN_EVENT, onChange);
  }, []);

  useEffect(() => {
    if (state && remainingWeeks(state) <= 0) {
      setNextPeak(suggestedPeakOn(state.objective));
    }
  }, [state]);

  function persist(next: RollingState | null) {
    savePlan(next);
    setState(next);
    onPersist?.(next);
  }

  const personalized = useMemo(() => {
    if (!state || !profile) return [];
    return visiblePersonalizedWeeks(state, profile);
  }, [state, profile]);

  const weeks = useMemo(() => {
    if (!state) return [];
    if (profile && personalized.length) return personalized;
    return visibleWeeks(state);
  }, [state, profile, personalized]);

  const phaseLabel = (phase: string) =>
    phase === "done" ? t.donePhase : t.phases[phase as "base" | "specific" | "taper"];

  const pickerWeeks = weeksBetween(todayIso(), peakOn);
  const pickerQuality = qualityFor(pick, pickerWeeks);

  if (!ready) {
    return (
      <p className="text-ink-muted" data-plan="loading">
        {t.kicker}
      </p>
    );
  }

  if (!state) {
    return (
      <div className="space-y-8" data-plan="picker">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{t.kicker}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.lead}</p>
        </div>
        <ol className="max-w-2xl space-y-2 text-sm leading-relaxed text-ink">
          {t.method.map((step) => (
            <li key={step} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ridge" />
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="max-w-2xl text-sm leading-relaxed text-ridge-deep">{t.seasonsKey}</p>

        <p className="text-sm font-medium text-ink">{t.pickTitle}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OBJECTIVES.map((id) => {
            const obj = t.objectives[id];
            const selected = pick === id;
            const photo = PROGRAM_MEDIA[id];
            return (
              <button
                key={id}
                id={`plan-pick-${id}`}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setPick(id);
                  setPeakOn(suggestedPeakOn(id));
                }}
                className={cn(
                  "overflow-hidden border text-left",
                  selected
                    ? "border-ridge bg-paper-warm"
                    : "border-line bg-card hover:bg-paper-warm/60",
                )}
              >
                <PhotoImage
                  photo={photo}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-4">
                  <p className="font-display text-lg font-semibold text-ridge-deep">{obj.name}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">
                    {obj.length}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{obj.blurb}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-2xl border border-line bg-card p-5">
            <p className="text-sm font-medium text-ink">{t.peakTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.peakLead}</p>
            <label className="mt-4 block text-sm font-medium text-ink" htmlFor="plan-peak">
              {t.peakLabel}
              <input
                id="plan-peak"
                type="date"
                min={todayIso()}
                value={peakOn}
                onChange={(e) => setPeakOn(e.target.value)}
                className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
              />
            </label>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">{t.peakHint}</p>
          </div>
          <WindowCard t={t} weeks={pickerWeeks} id={pick} quality={pickerQuality} />
        </div>

        <button
          id="plan-start"
          type="button"
          disabled={pickerWeeks < 1}
          onClick={() => persist(startPlan(pick, peakOn))}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pickerWeeks < 1 ? t.startDisabled : t.start}
        </button>
        <p className="text-xs text-ink-soft">{t.disclaimer}</p>
      </div>
    );
  }

  const bar = timeline(state);
  const obj = t.objectives[state.objective];
  const done = weeks.length === 0;
  const written = weeks[0];
  const storedToday = recentDaily().find((row) => row.date === todayIso());
  const todayView =
    profile && written && storedToday
      ? realizeToday(state, profile, storedToday, todayIso(), recentDaily(), storedToday.overridden)
      : null;
  const current =
    profile && personalized[0]
      ? overlayToday(
          personalized[0],
          todayView && todayView.calendar === personalized[0].calendar ? todayView : null,
        )
      : written
        ? adaptWeek(written, result, state.objective)
        : undefined;
  const changes = written && current ? weekChanges(written, current) : [];
  const ahead = weeks.slice(1);
  const history = [...state.checkins].reverse().slice(0, 6);
  const q = t.quality[bar.quality];
  const weekReasons = current && "reasons" in current ? current.reasons : [];

  function WeekCard({ week, featured }: { week: PlannedWeek; featured?: boolean }) {
    const changedDays = featured ? new Set(changes.map((c) => c.day)) : new Set<number>();
    return (
      <article
        data-week={week.calendar}
        data-eased={week.eased ? "1" : "0"}
        className={cn(
          "rounded-2xl border p-5",
          featured ? "border-ridge bg-card" : "border-line bg-paper-warm/40",
        )}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {featured ? t.current : t.ahead}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold text-ridge-deep">
          {fill(t.weekLabel, { n: week.calendar })}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{phaseLabel(week.phase)}</p>
        {week.eased ? (
          <p className="mt-2 text-xs leading-relaxed text-accent">{t.easedNote}</p>
        ) : null}
        <ul className="mt-4 space-y-2">
          {week.days.map((day, di) => {
            const id = `${week.calendar}-${di}`;
            const open = openDay === id;
            return (
              <li
                key={id}
                className={cn(
                  "text-sm",
                  changedDays.has(di) &&
                    "rounded-md bg-paper-warm px-1 font-medium text-ridge-deep",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenDay(open ? null : id)}
                  className="flex w-full items-start gap-2 py-1 text-left"
                >
                  <span className="w-8 shrink-0 font-medium text-ink-soft">{days[di]}</span>
                  <span className="text-ink">
                    {t.sessions[day.key]}
                    {day.minutes ? (
                      <span className="text-ink-soft">
                        {" "}
                        · {fillTemplate(athlete.minutes, { n: day.minutes })}
                      </span>
                    ) : null}
                  </span>
                </button>
                {open ? (
                  <div className="pl-10">
                    <SessionHowTo
                      locale={locale}
                      sessionKey={day.key}
                      minutes={day.minutes}
                      minutesLabel={
                        day.minutes ? fillTemplate(athlete.minutes, { n: day.minutes }) : undefined
                      }
                    />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </article>
    );
  }

  return (
    <div
      className="space-y-8"
      data-plan="active"
      data-calendar={state.calendar}
      data-extra-base={state.extraBase}
      data-peak={state.peakOn}
      data-season={state.season}
      data-quality={bar.quality}
      data-remaining={bar.remaining}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{t.kicker}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{obj.name}</h2>
          <p className="mt-2 text-sm font-medium text-ridge-deep">
            {fill(t.seasonLabel, { n: state.season })}
            {" · "}
            {fill(t.peakStatus, { peak: formatDay(state.peakOn) })}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {fill(t.status, {
              calendar: state.calendar,
              phase: done ? t.donePhase : phaseLabel(current?.phase ?? bar.phase),
              progress: state.progress,
              total: bar.total,
              remaining: Math.max(0, remainingWeeks(state)),
            })}
          </p>
          {state.extraBase > 0 ? (
            <p className="mt-2 text-sm text-accent">{fill(t.extraBase, { n: state.extraBase })}</p>
          ) : null}
        </div>
        <button
          id="plan-reset"
          type="button"
          onClick={() => {
            persist(null);
            setFlash(null);
            setPeakOn(suggestedPeakOn(pick));
          }}
          className="min-h-11 rounded-lg border border-line bg-card px-4 py-2 text-sm text-ink-muted hover:bg-paper-warm"
        >
          {t.reset}
        </button>
      </div>

      <p className="max-w-2xl text-sm leading-relaxed text-ridge-deep">{t.seasonsKey}</p>

      <label className="block max-w-sm text-sm font-medium text-ink" htmlFor="plan-retarget">
        {t.peakLabel}
        <input
          id="plan-retarget"
          type="date"
          min={todayIso()}
          value={state.peakOn}
          onChange={(e) => persist(retargetPeak(state, e.target.value))}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
        />
        <span className="mt-1 block text-xs font-normal text-ink-soft">
          {athlete.peakLocked.replace("{peak}", state.peakOn)}
        </span>
      </label>

      <div
        className={cn(
          "rounded-2xl border p-4",
          bar.quality === "generous" || bar.quality === "full"
            ? "border-ridge bg-paper-warm/60"
            : "border-accent bg-paper-warm/70",
        )}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{q.label}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{q.body}</p>
        <p className="mt-2 text-sm text-ink">
          {fill(t.phaseSplit, { base: bar.base, specific: bar.specific, taper: bar.taper })}
        </p>
      </div>

      <div aria-hidden={false} className="space-y-2">
        <div className="flex h-3 overflow-hidden rounded-full border border-line">
          {bar.base > 0 ? (
            <div className="bg-ridge" style={{ flexGrow: bar.base }} title={t.phases.base} />
          ) : null}
          {bar.specific > 0 ? (
            <div
              className="bg-accent"
              style={{ flexGrow: bar.specific }}
              title={t.phases.specific}
            />
          ) : null}
          {bar.taper > 0 ? (
            <div
              className="bg-accent-soft"
              style={{ flexGrow: bar.taper }}
              title={t.phases.taper}
            />
          ) : null}
        </div>
        <div className="relative h-5 text-xs text-ink-muted">
          <span
            className="absolute font-medium text-ridge-deep"
            style={{
              left: `${Math.min(96, (bar.progress / bar.total) * 100)}%`,
              transform: bar.progress === 0 ? "none" : "translateX(-50%)",
            }}
          >
            {t.nowMark}
          </span>
        </div>
        <div className="flex justify-between text-xs text-ink-soft">
          <span>{t.phases.base}</span>
          <span>{t.phases.specific}</span>
          <span>{t.phases.taper}</span>
        </div>
      </div>

      {done ? (
        <div className="space-y-5 rounded-2xl border border-line bg-paper-warm/60 p-6">
          <h3 className="font-display text-xl font-semibold text-ink">{t.doneTitle}</h3>
          <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">{t.doneBody}</p>
          <p className="max-w-2xl text-sm leading-relaxed text-ridge-deep">{t.nextSeasonBody}</p>
          <label className="block max-w-sm text-sm font-medium text-ink" htmlFor="plan-next-peak">
            {t.nextSeasonPeak}
            <input
              id="plan-next-peak"
              type="date"
              min={todayIso()}
              value={nextPeak}
              onChange={(e) => setNextPeak(e.target.value)}
              className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
            />
          </label>
          <WindowCard
            t={t}
            weeks={weeksBetween(todayIso(), nextPeak)}
            id={state.objective}
            quality={qualityFor(state.objective, weeksBetween(todayIso(), nextPeak))}
          />
          <button
            id="plan-next-season"
            type="button"
            disabled={weeksBetween(todayIso(), nextPeak) < 1}
            onClick={() => {
              persist(nextSeason(state, nextPeak));
              setFlash(null);
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t.nextSeason}
          </button>
        </div>
      ) : (
        <>
          <form
            id="plan-checkin"
            className="rounded-2xl border border-line bg-card p-5 sm:p-6"
            onSubmit={(e) => {
              e.preventDefault();
              const next = applyCheckin(state, result, "");
              persist(next);
              setFlash(
                result === "wrecked"
                  ? t.afterWrecked
                  : result === "problem"
                    ? t.afterProblem
                    : result === "good"
                      ? t.afterGood
                      : t.afterOk,
              );
              setResult("ok");
            }}
          >
            <h3 className="font-display text-xl font-semibold text-ink">{t.checkinTitle}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.checkinLead}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  ["good", t.good],
                  ["ok", t.ok],
                  ["problem", t.problem],
                  ["wrecked", t.wrecked],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  id={`plan-${id}`}
                  type="button"
                  aria-pressed={result === id}
                  onClick={() => {
                    setResult(id);
                    setFlash(null);
                  }}
                  className={cn(
                    "flex min-h-11 items-center rounded-lg border px-3 py-3 text-left text-sm",
                    result === id
                      ? "border-ridge bg-paper-warm font-medium text-ink"
                      : "border-line text-ink-muted hover:bg-paper-warm/60",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            {changes.length > 0 ? (
              <div
                className="mt-4 rounded-xl border border-accent bg-paper-warm/70 p-4"
                data-week-changed="1"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {t.changed}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-ink">
                  {changes.map((c) => (
                    <li key={`${c.day}-${c.from}-${c.to}`}>
                      {days[c.day]}: {t.sessions[c.from]} → {t.sessions[c.to]}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <button
              id="plan-submit"
              type="submit"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep"
            >
              {t.submit}
            </button>
            {flash ? (
              <p id="plan-flash" className="mt-4 max-w-2xl text-sm leading-relaxed text-ridge-deep">
                {flash}
              </p>
            ) : null}
          </form>

          {current ? <WeekCard week={current} featured /> : null}

          {weekReasons && weekReasons.length > 0 ? (
            <div className="rounded-2xl border border-line bg-paper-warm/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {athlete.whyWeek}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink">
                {weekReasons.slice(0, 8).map((reason, i) => (
                  <li key={`${reason.id}-${i}`}>{reasonText(copy, reason.id, reason.values)}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {ahead.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {ahead.map((week) => (
                <WeekCard key={week.calendar} week={week} />
              ))}
            </div>
          ) : null}
        </>
      )}

      {state.adjustments && state.adjustments.length > 0 ? (
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{athlete.whyChanged}</h3>
          <ul className="mt-3 space-y-2">
            {state.adjustments.slice(0, 8).map((adj) => (
              <li
                key={adj.at}
                className="rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink"
              >
                {reasonText(copy, adj.reason.id, adj.reason.values)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h3 className="font-display text-lg font-semibold text-ink">{t.historyTitle}</h3>
        {history.length === 0 ? (
          <p className="mt-2 text-sm text-ink-muted">{t.historyEmpty}</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {history.map((item) => (
              <li
                key={`${item.calendar}-${item.at}`}
                className="rounded-xl border border-line bg-card px-4 py-3 text-sm"
              >
                <span className="font-medium text-ink">
                  {fill(t.weekLabel, { n: item.calendar })}
                </span>
                <span className="text-ink-muted">
                  {" · "}
                  {item.result === "good"
                    ? t.good
                    : item.result === "ok"
                      ? t.ok
                      : item.result === "wrecked"
                        ? t.wrecked
                        : t.problem}
                </span>
                {item.note ? <p className="mt-1 text-ink-muted">{item.note}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-xs text-ink-soft">{t.disclaimer}</p>
    </div>
  );
}
