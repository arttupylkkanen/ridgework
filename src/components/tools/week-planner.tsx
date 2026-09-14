import { useEffect, useMemo, useState } from "react";
import type { Copy } from "@/content/types";
import { cn } from "@/lib/utils";
import {
  READINESS,
  SESSION_TYPES,
  applyReadiness,
  type DayPlan,
  type Readiness,
  type SessionType,
} from "@/lib/readiness";

type WeekState = {
  load: string;
  constraints: string;
  readiness: Readiness;
  days: DayPlan[];
};

const KEY = "ridgework-week-v1";

function emptyWeek(): WeekState {
  return {
    load: "",
    constraints: "",
    readiness: "ok",
    days: Array.from({ length: 7 }, () => ({ type: "easy" as SessionType, notes: "" })),
  };
}

function loadWeek(): WeekState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyWeek();
    const parsed = JSON.parse(raw) as WeekState;
    if (!parsed.days?.length) return emptyWeek();
    const readiness = READINESS.includes(parsed.readiness as Readiness) ? parsed.readiness : "ok";
    return { ...emptyWeek(), ...parsed, readiness };
  } catch {
    return emptyWeek();
  }
}

export function WeekPlanner({ copy }: { copy: Copy }) {
  const t = copy.tools.week;
  const [week, setWeek] = useState<WeekState>(emptyWeek);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setWeek(loadWeek());
  }, []);

  function save() {
    localStorage.setItem(KEY, JSON.stringify(week));
    setSaved(true);
  }

  const shown = useMemo(() => applyReadiness(week.days, week.readiness), [week.days, week.readiness]);
  const cut = week.readiness === "tired" || week.readiness === "wrecked";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-ink">{t.readiness}</p>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.readinessLead}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {READINESS.map((id) => (
            <button
              key={id}
              id={`week-ready-${id}`}
              type="button"
              onClick={() => {
                setSaved(false);
                setWeek({ ...week, readiness: id });
              }}
              className={cn(
                "min-h-11 rounded-lg border px-3 py-3 text-sm",
                week.readiness === id
                  ? "border-ridge bg-paper-warm font-medium text-ink"
                  : "border-line bg-card text-ink-muted hover:bg-paper-warm/60",
              )}
            >
              {t.levels[id]}
            </button>
          ))}
        </div>
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed",
            cut ? "rounded-lg border border-line bg-paper-warm px-4 py-3 text-ink" : "text-ridge-deep",
          )}
          data-week-cut={cut ? "1" : undefined}
        >
          {t.notes[week.readiness]}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {shown.map((day, i) => {
          const planned = week.days[i];
          const dropped = planned.type !== day.type;
          return (
            <div key={t.days[i]} className="rounded-2xl border border-line bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-ridge">{t.days[i]}</p>
              <label className="mt-3 block text-sm text-ink-muted">
                {t.session}
                <select
                  value={planned.type}
                  onChange={(e) => {
                    const next = week.days.slice();
                    next[i] = { ...planned, type: e.target.value as SessionType };
                    setSaved(false);
                    setWeek({ ...week, days: next });
                  }}
                  className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-ink"
                >
                  {SESSION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {t.types[type]}
                    </option>
                  ))}
                </select>
              </label>
              {dropped ? (
                <p className="mt-2 text-xs text-accent">
                  {t.types[planned.type]} → {t.types[day.type]}
                </p>
              ) : null}
              <textarea
                value={planned.notes}
                onChange={(e) => {
                  const next = week.days.slice();
                  next[i] = { ...planned, notes: e.target.value };
                  setSaved(false);
                  setWeek({ ...week, days: next });
                }}
                rows={2}
                className="mt-3 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={save}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep"
        >
          {t.save}
        </button>
        {saved ? <p className="text-sm text-ink-soft">{t.saved}</p> : null}
      </div>
    </div>
  );
}
