import { useEffect, useMemo, useState } from "react";
import type { Copy } from "@/content/types";
import type { AccessFlag, AthleteProfile } from "@/lib/athlete";
import { ACCESS_FLAGS, windowsOf } from "@/lib/athlete";
import {
  SCALE,
  emptyInputs,
  recentDaily,
  saveDailyEntry,
  type DailyInputs,
  type ReadinessCall,
  type Scale,
  type StoredDaily,
} from "@/lib/daily-readiness";
import { saveDailyRemote } from "@/lib/athlete-server";
import {
  addDaysIso,
  loadPlan,
  packLoadKg,
  PLAN_EVENT,
  savePlan,
  syncCalendarToToday,
  todayIso,
  type RollingState,
} from "@/lib/rolling-plan";
import {
  buildWeek,
  markMoved,
  markToday,
  overlayToday,
  realizeToday,
  visiblePersonalizedWeeks,
} from "@/lib/plan-engine";
import type { Locale } from "@/lib/locale";
import { cn, fillTemplate, reasonText } from "@/lib/utils";
import { SessionHowTo } from "./session-how";

function formatDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1).toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

export function ScaleRow({
  label,
  low,
  high,
  value,
  onChange,
  id,
}: {
  label: string;
  low: string;
  high: string;
  value: Scale;
  onChange: (n: Scale) => void;
  id: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="text-xs text-ink-soft">
          {low} → {high}
        </p>
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1.5">
        {SCALE.map((n) => (
          <button
            key={n}
            id={`${id}-${n}`}
            type="button"
            aria-pressed={value === n}
            onClick={() => onChange(n)}
            className={cn(
              "min-h-11 rounded-lg border text-sm",
              value === n
                ? "border-ridge bg-paper-warm font-medium text-ink"
                : "border-line bg-card text-ink-muted hover:bg-paper-warm/60",
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

const CALL_TONE: Record<ReadinessCall, string> = {
  ready: "border-ridge bg-paper-warm/70",
  reduce: "border-accent bg-paper-warm/80",
  easy: "border-accent bg-paper-warm/80",
  rest: "border-warn bg-paper-warm/90",
};

export function TodayDesk({
  locale,
  copy,
  profile,
  onPersist,
  onEditProfile,
}: {
  locale: Locale;
  copy: Copy;
  profile: AthleteProfile;
  onPersist?: (state: RollingState) => void;
  onEditProfile?: () => void;
}) {
  const t = copy.tools.athlete.today;
  const sessions = copy.tools.plan.sessions;
  const dayNames = copy.tools.week.days;
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<RollingState | null>(null);
  const [inputs, setInputs] = useState<DailyInputs>(emptyInputs);
  const [overridden, setOverridden] = useState(false);
  const [confirmOverride, setConfirmOverride] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [history, setHistory] = useState<StoredDaily[]>([]);
  const today = todayIso();

  useEffect(() => {
    const loaded = loadPlan();
    const synced = loaded ? syncCalendarToToday(loaded) : null;
    if (synced && loaded && synced.calendar !== loaded.calendar) savePlan(synced);
    setState(synced);
    const log = recentDaily();
    setHistory(log);
    const existing = log.find((row) => row.date === today);
    if (existing) {
      setInputs({
        sleep: existing.sleep,
        soreness: existing.soreness,
        motivation: existing.motivation,
        fatigue: existing.fatigue,
        stress: existing.stress,
        rhr: existing.rhr,
        hrv: existing.hrv,
        lastEffort: existing.lastEffort,
      });
      setOverridden(existing.overridden);
    }
    setReady(true);
    const onChange = () => setState(loadPlan());
    window.addEventListener(PLAN_EVENT, onChange);
    return () => window.removeEventListener(PLAN_EVENT, onChange);
  }, [today]);

  function persist(next: RollingState) {
    savePlan(next);
    setState(next);
    onPersist?.(next);
  }

  const view = useMemo(
    () => (state ? realizeToday(state, profile, inputs, today, history, overridden) : null),
    [state, profile, inputs, today, history, overridden],
  );

  const week = useMemo(() => {
    if (!state || !view) return null;
    const built = buildWeek(state, view.calendar, profile);
    return built ? overlayToday(built, view) : null;
  }, [state, view, profile]);

  const ahead = useMemo(
    () => (state ? visiblePersonalizedWeeks(state, profile) : []),
    [state, profile],
  );

  useEffect(() => {
    if (!view) return;
    const entry: StoredDaily = {
      ...inputs,
      date: today,
      call: view.call,
      overridden,
      at: new Date().toISOString(),
    };
    saveDailyEntry(entry);
    void saveDailyRemote({
      data: {
        date: today,
        payload: {
          sleep: inputs.sleep,
          soreness: inputs.soreness,
          motivation: inputs.motivation,
          fatigue: inputs.fatigue,
          stress: inputs.stress,
          rhr: inputs.rhr,
          hrv: inputs.hrv,
          lastEffort: inputs.lastEffort,
        },
        call: view.call,
        overridden,
      },
    }).catch(() => undefined);
  }, [inputs, view?.call, overridden, today]);

  if (!ready) {
    return <p className="text-ink-muted">{t.kicker}</p>;
  }

  if (!state) {
    return (
      <p className="text-sm text-ink-muted" data-today="empty">
        {t.noSession}
      </p>
    );
  }

  const call = view?.call ?? "ready";
  const shown = view?.shown;
  const written = view?.written;
  // The athlete's own start time for this weekday, if they gave one.
  const todayStartAt = windowsOf(profile)[view ? view.dayIndex : 0]?.startAt ?? null;
  const changed = Boolean(view && written && shown && written.key !== shown.key);

  return (
    <div className="space-y-8" data-today="desk" data-call={call}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{t.kicker}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {formatDay(today)}
          </h2>
          <p className="mt-2 text-sm text-ridge-deep">
            {copy.tools.plan.objectives[state.objective].name}
            {profile.eventName ? ` · ${profile.eventName}` : ""}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            {fillTemplate(t.peakLocked, { peak: state.peakOn })}
          </p>
        </div>
        {onEditProfile ? (
          <button
            type="button"
            onClick={onEditProfile}
            className="min-h-11 rounded-lg border border-line bg-card px-4 py-2 text-sm text-ink-muted hover:bg-paper-warm"
          >
            {t.editProfile}
          </button>
        ) : null}
      </div>

      <section className="rounded-2xl border border-line bg-card p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {t.sessionToday}
        </p>
        {shown ? (
          <>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">
              {sessions[shown.key]}
              {shown.minutes ? (
                <span className="text-ink-muted">
                  {" "}
                  · {fillTemplate(t.minutes, { n: shown.minutes })}
                </span>
              ) : null}
              {todayStartAt ? <span className="text-ink-muted"> · {todayStartAt}</span> : null}
            </h3>
            {changed && written ? (
              <p className="mt-1 text-sm text-ink-muted">
                {fillTemplate(t.was, { session: sessions[written.key] })}
              </p>
            ) : null}
            <SessionHowTo
              locale={locale}
              sessionKey={shown.key}
              minutes={shown.minutes}
              minutesLabel={
                shown.minutes ? fillTemplate(t.minutes, { n: shown.minutes }) : undefined
              }
              loadKg={shown.key === "pack" || shown.key === "me" ? packLoadKg(state) : undefined}
            />
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                id="today-done"
                type="button"
                onClick={() => {
                  const next = markToday(state, profile, "done", today, view);
                  persist(next.state);
                  setFlash(t.doneFlash);
                }}
                className="inline-flex min-h-11 items-center rounded-lg bg-ridge px-4 py-2 text-sm font-medium text-paper hover:bg-ridge-deep"
              >
                {t.markDone}
              </button>
              <button
                id="today-missed"
                type="button"
                onClick={() => {
                  const next = markToday(state, profile, "missed", today, view);
                  persist(next.state);
                  setFlash(t.missedFlash);
                }}
                className="inline-flex min-h-11 items-center rounded-lg border border-line bg-paper px-4 py-2 text-sm text-ink hover:bg-paper-warm"
              >
                {t.markMissed}
              </button>
              <button
                id="today-early"
                type="button"
                onClick={() => {
                  const next = markMoved(state, profile, addDaysIso(today, 1), today);
                  persist(next.state);
                  setFlash(t.doneFlash);
                }}
                className="inline-flex min-h-11 items-center rounded-lg border border-line bg-paper px-4 py-2 text-sm text-ink-muted hover:bg-paper-warm"
              >
                {t.didTomorrow}
              </button>
            </div>
            {flash ? <p className="mt-3 text-sm text-ridge-deep">{flash}</p> : null}
            {view?.log ? (
              <p className="mt-3 text-xs uppercase tracking-wider text-accent">{view.log.status}</p>
            ) : null}
          </>
        ) : (
          <p className="mt-2 text-sm text-ink-muted">{t.noSession}</p>
        )}
      </section>

      <section
        className={cn("rounded-2xl border p-5 sm:p-6", CALL_TONE[call])}
        data-readiness-call={call}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {t.calls[call].title}
        </p>
        <p className="mt-2 font-display text-xl font-semibold text-ink">{t.calls[call].action}</p>
        <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-ink">
          {(view?.readiness.drivers.length
            ? view.readiness.drivers
            : (view?.readiness.reasons.slice(0, 3) ?? [])
          ).map((reason, i) => (
            <li key={`${reason.id}-${i}`}>{reasonText(copy, reason.id, reason.values)}</li>
          ))}
        </ul>
        {changed && view ? (
          <div className="mt-4 rounded-xl border border-line bg-card/80 p-4" data-why-changed="1">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              {t.whyChanged}
            </p>
            <p className="mt-2 text-sm text-ink">
              {sessions[view.written.key]} → {sessions[view.shown.key]}
              {view.shown.minutes ? ` · ${fillTemplate(t.minutes, { n: view.shown.minutes })}` : ""}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              {reasonText(
                copy,
                view.call === "rest"
                  ? "todayRest"
                  : view.call === "easy"
                    ? "qualityToEasy"
                    : "reduceMinutes",
                {
                  from: view.written.key,
                  to: view.shown.key,
                },
              )}
            </p>
          </div>
        ) : null}
        <p className="mt-4 text-xs leading-relaxed text-ink-soft">{t.safety}</p>
        {call !== "ready" && !overridden ? (
          <div className="mt-4 space-y-3 border-t border-line/80 pt-4">
            <label className="flex items-start gap-3 text-sm text-ink">
              <input
                id="ready-override"
                type="checkbox"
                checked={confirmOverride}
                onChange={(e) => setConfirmOverride(e.target.checked)}
                className="mt-1 h-4 w-4 accent-ridge"
              />
              <span>{t.overrideLabel}</span>
            </label>
            <button
              id="ready-keep-written"
              type="button"
              disabled={!confirmOverride}
              onClick={() => {
                setOverridden(true);
                setConfirmOverride(false);
              }}
              className="inline-flex min-h-11 items-center rounded-lg border border-line bg-card px-4 py-2 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t.overrideKeep}
            </button>
          </div>
        ) : null}
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

      <section className="rounded-2xl border border-line bg-card p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold text-ink">{t.wakeTitle}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.wakeLead}</p>
        <div className="mt-5 space-y-5">
          {(["sleep", "soreness", "motivation", "fatigue", "stress"] as const).map((key) => (
            <ScaleRow
              key={key}
              id={`ready-${key}`}
              label={t[key]}
              low={t.scaleLow[key]}
              high={t.scaleHigh[key]}
              value={inputs[key]}
              onChange={(n) => {
                setOverridden(false);
                setConfirmOverride(false);
                setInputs((prev) => ({ ...prev, [key]: n }));
              }}
            />
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <label className="text-sm font-medium text-ink">
            {t.rhr}
            <input
              id="ready-rhr"
              type="number"
              min={30}
              max={120}
              value={inputs.rhr ?? ""}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  rhr: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
            />
          </label>
          <label className="text-sm font-medium text-ink">
            {t.hrv}
            <input
              id="ready-hrv"
              type="number"
              min={10}
              max={250}
              value={inputs.hrv ?? ""}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  hrv: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
            />
          </label>
          <div>
            <p className="text-sm font-medium text-ink">{t.lastEffort}</p>
            <div className="mt-2 grid grid-cols-5 gap-1.5">
              {SCALE.map((n) => (
                <button
                  key={n}
                  id={`ready-effort-${n}`}
                  type="button"
                  aria-pressed={inputs.lastEffort === n}
                  onClick={() => setInputs((prev) => ({ ...prev, lastEffort: n }))}
                  className={cn(
                    "min-h-11 rounded-lg border text-sm",
                    inputs.lastEffort === n
                      ? "border-ridge bg-paper-warm font-medium text-ink"
                      : "border-line bg-paper text-ink-muted",
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {state.adjustments && state.adjustments.length > 0 ? (
        <section>
          <h3 className="font-display text-lg font-semibold text-ink">{t.whyChanged}</h3>
          <ul className="mt-3 space-y-2">
            {state.adjustments.slice(0, 6).map((adj) => (
              <li
                key={adj.at}
                className="rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink"
              >
                {reasonText(copy, adj.reason.id, adj.reason.values)}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2">
        <label className="rounded-2xl border border-line bg-card p-4 text-sm font-medium text-ink">
          {t.travellingUntil}
          <input
            id="today-travel"
            type="date"
            min={today}
            value={state.travelUntil ?? ""}
            onChange={(e) => persist({ ...state, travelUntil: e.target.value || null })}
            className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm font-normal"
          />
          {state.travelUntil ? (
            <button
              type="button"
              className="mt-2 text-xs text-ridge underline-offset-2 hover:underline"
              onClick={() => persist({ ...state, travelUntil: null })}
            >
              {t.clearTravel}
            </button>
          ) : null}
        </label>
        <div className="rounded-2xl border border-line bg-card p-4">
          <p className="text-sm font-medium text-ink">{t.accessTitle}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {ACCESS_FLAGS.map((flag) => {
              const blocked = (state.blockedAccess ?? []).includes(flag);
              return (
                <button
                  key={flag}
                  id={`access-${flag}`}
                  type="button"
                  aria-pressed={!blocked}
                  onClick={() => {
                    const current = new Set(state.blockedAccess ?? []);
                    if (blocked) current.delete(flag);
                    else current.add(flag);
                    persist({ ...state, blockedAccess: [...current] as AccessFlag[] });
                  }}
                  className={cn(
                    "min-h-11 rounded-lg border px-3 text-sm",
                    blocked
                      ? "border-line bg-paper text-ink-muted"
                      : "border-ridge bg-paper-warm text-ink",
                  )}
                >
                  {t.access[flag]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {ahead.length > 1 ? (
        <p className="text-xs text-ink-soft">
          {copy.tools.plan.ahead}:{" "}
          {ahead
            .slice(1)
            .map((w) => fillTemplate(copy.tools.plan.weekLabel, { n: w.calendar }))
            .join(" · ")}
        </p>
      ) : null}
    </div>
  );
}
