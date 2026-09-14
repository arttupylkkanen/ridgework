import { useEffect, useMemo, useState } from "react";
import type { Copy } from "@/content/types";
import type { AthleteProfile } from "@/lib/athlete";
import {
  PLAN_EVENT,
  loadPlan,
  savePlan,
  todayIso,
  type RollingState,
} from "@/lib/rolling-plan";
import {
  SCENARIO_IDS,
  applyScenario,
  defaultParams,
  demoPlan,
  simulate,
  type ScenarioId,
  type ScenarioOption,
  type ScenarioParams,
} from "@/lib/scenario-sim";
import { cn, fillTemplate } from "@/lib/utils";

export function WhatIfDesk({
  copy,
  profile,
  onPersist,
}: {
  copy: Copy;
  profile?: AthleteProfile | null;
  onPersist?: (state: RollingState) => void;
}) {
  const t = copy.tools.whatIf;
  const sessions = copy.tools.plan.sessions;
  const days = copy.tools.week.days;
  const [state, setState] = useState<RollingState | null>(null);
  const [scenario, setScenario] = useState<ScenarioId>("fatigue");
  const [params, setParams] = useState<ScenarioParams>(() => defaultParams(demoPlan()));
  const [applied, setApplied] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadPlan();
    setState(loaded);
    if (loaded) setParams(defaultParams(loaded));
    const onChange = () => setState(loadPlan());
    window.addEventListener(PLAN_EVENT, onChange);
    return () => window.removeEventListener(PLAN_EVENT, onChange);
  }, []);

  const live = state;
  const source = live ?? demoPlan();
  const demo = !live;

  const result = useMemo(
    () => simulate(source, scenario, params, profile ?? null),
    [source, scenario, params, profile],
  );

  function apply(option: ScenarioOption) {
    if (!live) return;
    const next = applyScenario(live, scenario, option);
    savePlan(next);
    setState(next);
    onPersist?.(next);
    setApplied(option.optionId);
  }

  return (
    <div className="space-y-8" data-whatif="1">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{t.kicker}</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{t.title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.lead}</p>
        {demo ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-accent">{t.needPlan}</p> : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {SCENARIO_IDS.map((id) => (
          <button
            key={id}
            type="button"
            data-scenario={id}
            aria-pressed={scenario === id}
            onClick={() => {
              setScenario(id);
              setApplied(null);
            }}
            className={cn(
              "min-h-11 rounded-lg border px-3 py-2 text-left text-sm",
              scenario === id ? "border-ridge bg-paper-warm font-medium text-ink" : "border-line bg-card text-ink-muted hover:bg-paper-warm",
            )}
          >
            {t.scenarios[id].title}
          </button>
        ))}
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">{t.scenarios[scenario].body}</p>

      <ParamsRow scenario={scenario} params={params} t={t} onChange={setParams} />

      <div className="grid gap-4 lg:grid-cols-3">
        {result.options.map((option) => {
          const optCopy = t.options[`${scenario}.${option.optionId}`];
          return (
            <article
              key={option.optionId}
              data-option={option.optionId}
              data-recommended={option.recommended ? "1" : "0"}
              data-load-risk={option.loadRisk}
              data-peak-outlook={option.peakOutlook}
              className={cn(
                "flex flex-col rounded-2xl border p-5",
                option.recommended ? "border-ridge bg-card" : option.loadRisk === "high" ? "border-accent bg-paper-warm/50" : "border-line bg-card",
              )}
            >
              {option.recommended ? (
                <p className="text-xs font-semibold uppercase tracking-wider text-ridge">{t.recommended}</p>
              ) : null}
              <h3 className="mt-1 font-display text-lg font-semibold text-ink">{optCopy?.label ?? option.optionId}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {fillTemplate(optCopy?.change ?? "", option.values)}
              </p>
              {option.improves.length ? (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{t.improves}</p>
                  <ul className="mt-1 space-y-1 text-sm text-ink">
                    {option.improves.map((key) => (
                      <li key={key}>{t.gains[key] ?? key}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {option.sacrifices.length ? (
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{t.sacrifices}</p>
                  <ul className="mt-1 space-y-1 text-sm text-ink-muted">
                    {option.sacrifices.map((key) => (
                      <li key={key}>{t.losses[key] ?? key}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <p className="mt-3 text-sm text-ink">
                <span className="font-medium">{t.loadRisk}:</span> {t.risk[option.loadRisk]}
              </p>
              <p className="mt-2 text-sm text-ink-muted">{t.outlook[option.peakOutlook]}</p>
              {option.weekDiff.length ? (
                <details className="mt-3 text-sm">
                  <summary className="cursor-pointer text-ink">{t.weekChanges}</summary>
                  <ul className="mt-2 space-y-1 text-ink-muted">
                    {option.weekDiff.slice(0, 8).map((diff) => (
                      <li key={`${diff.calendar}-${diff.day}`}>
                        {days[diff.day]}: {sessions[diff.from]} → {sessions[diff.to]}
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}
              <button
                type="button"
                disabled={demo}
                onClick={() => apply(option)}
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-ridge px-4 py-2 text-sm font-medium text-paper hover:bg-ridge-deep disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t.apply}
              </button>
            </article>
          );
        })}
      </div>
      {applied ? <p className="text-sm text-ridge">{t.applied}</p> : null}
      <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">{t.hedge}</p>
    </div>
  );
}

function ParamsRow({
  scenario,
  params,
  t,
  onChange,
}: {
  scenario: ScenarioId;
  params: ScenarioParams;
  t: Copy["tools"]["whatIf"];
  onChange: (next: ScenarioParams) => void;
}) {
  if (scenario === "travel") {
    return (
      <label className="block max-w-xs text-sm font-medium text-ink">
        {t.paramTravel}
        <input
          type="number"
          min={3}
          max={28}
          value={params.travelDays}
          onChange={(e) => onChange({ ...params, travelDays: Number(e.target.value) || 10 })}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
        />
      </label>
    );
  }
  if (scenario === "sixWeeks") {
    return (
      <label className="block max-w-xs text-sm font-medium text-ink">
        {t.paramWeeks}
        <input
          type="number"
          min={3}
          max={16}
          value={params.compressWeeks}
          onChange={(e) => onChange({ ...params, compressWeeks: Number(e.target.value) || 6 })}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
        />
      </label>
    );
  }
  if (scenario === "movePeak") {
    return (
      <label className="block max-w-xs text-sm font-medium text-ink">
        {t.paramPeak}
        <input
          type="date"
          min={todayIso()}
          value={params.newPeakOn}
          onChange={(e) => onChange({ ...params, newPeakOn: e.target.value })}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
        />
      </label>
    );
  }
  if (scenario === "secondEvent") {
    return (
      <label className="block max-w-xs text-sm font-medium text-ink">
        {t.paramSecond}
        <input
          type="date"
          min={todayIso()}
          value={params.secondOn}
          onChange={(e) => onChange({ ...params, secondOn: e.target.value })}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
        />
      </label>
    );
  }
  if (scenario === "returnIllness") {
    return (
      <label className="block max-w-xs text-sm font-medium text-ink">
        {t.paramIllness}
        <input
          type="number"
          min={1}
          max={8}
          value={params.illnessWeeks}
          onChange={(e) => onChange({ ...params, illnessWeeks: Number(e.target.value) || 2 })}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
        />
      </label>
    );
  }
  return null;
}
