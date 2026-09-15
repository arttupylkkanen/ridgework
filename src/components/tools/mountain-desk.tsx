import { useEffect, useMemo, useState } from "react";
import type { Copy } from "@/content/types";
import type { AthleteProfile } from "@/lib/athlete";
import {
  OBJECTIVES,
  PLAN_EVENT,
  loadPlan,
  type ObjectiveId,
  type RollingState,
} from "@/lib/rolling-plan";
import {
  PRECIP,
  WIND,
  buildPrep,
  loadPrep,
  savePrep,
  sectionProgress,
  type Precip,
  type PrepPersist,
  type PrepSectionId,
  type Wind,
} from "@/lib/mountain-prep";
import { newEventId, loadPassport, savePassport, upsertEvent } from "@/lib/passport";
import { savePassportRemote } from "@/lib/passport-server";
import { fillTemplate, cn } from "@/lib/utils";

const SECTION_ORDER: PrepSectionId[] = [
  "fitness",
  "equipment",
  "clothing",
  "nutrition",
  "logistics",
  "altitude",
  "debrief",
];

export function MountainDesk({
  copy,
  profile,
  enrollments = [],
}: {
  copy: Copy;
  profile: AthleteProfile;
  enrollments?: RollingState[];
}) {
  const t = copy.tools.prep;
  const [objective, setObjective] = useState<ObjectiveId>(profile.goal);
  const [plan, setPlan] = useState<RollingState | null>(null);
  const [persist, setPersist] = useState<PrepPersist>(() => loadPrep(profile.goal));
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadPlan();
    setPlan(loaded);
    const onChange = () => setPlan(loadPlan());
    window.addEventListener(PLAN_EVENT, onChange);
    return () => window.removeEventListener(PLAN_EVENT, onChange);
  }, []);

  useEffect(() => {
    setPersist(loadPrep(objective));
  }, [objective]);

  const state =
    enrollments.find((row) => row.objective === objective) ??
    (plan?.objective === objective ? plan : null) ??
    plan;

  const workspace = useMemo(
    () =>
      buildPrep({
        profile: { ...profile, goal: objective },
        state,
        weather: persist.weather,
      }),
    [profile, objective, state, persist.weather],
  );

  function write(next: PrepPersist) {
    setPersist(next);
    savePrep(next);
  }

  function toggle(id: string) {
    write({ ...persist, objective, checks: { ...persist.checks, [id]: !persist.checks[id] } });
  }

  function setAnswer(id: string, value: string) {
    write({ ...persist, objective, answers: { ...persist.answers, [id]: value } });
  }

  const progress = sectionProgress(workspace, persist.checks);
  const total = workspace.items.length;
  const done = workspace.items.filter((row) => persist.checks[row.id]).length;
  const eventName = workspace.eventName || t.unnamed;
  const dayLabel =
    workspace.phase === "after"
      ? fillTemplate(t.daysAgo, { n: Math.abs(workspace.daysLeft) })
      : workspace.phase === "day"
        ? t.todayIs
        : fillTemplate(t.daysLeft, { n: Math.max(0, workspace.daysLeft) });

  function saveToPassport() {
    const d = persist.debrief;
    const event = {
      id: newEventId(),
      date: workspace.peakOn || new Date().toISOString().slice(0, 10),
      name: eventName,
      objective,
      distanceKm: null,
      elevationM: null,
      durationMin: null,
      result: d.result || "training",
      confidence: (d.confidence || 3) as 1 | 2 | 3 | 4 | 5,
      lesson: "",
      season: state?.season ?? 1,
    };
    const record = upsertEvent(loadPassport(), event);
    savePassport(record);
    void savePassportRemote({
      data: { events: record.events, privacy: record.privacy, shareToken: record.shareToken },
    }).catch(() => undefined);
    write({ ...persist, objective, debrief: { ...d, savedToPassport: true } });
    setFlash(t.savedPassport);
    window.setTimeout(() => setFlash(null), 2500);
  }

  return (
    <div className="space-y-8" data-mountain-prep="1">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{t.kicker}</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{t.title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.lead}</p>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-line bg-card p-5">
        <div>
          <p className="font-display text-xl font-semibold text-ink">{eventName}</p>
          <p className="mt-1 text-sm text-ink-muted">
            {copy.tools.plan.objectives[workspace.objective].name}
            {" · "}
            {dayLabel}
            {workspace.peakOn ? ` · ${workspace.peakOn}` : ""}
          </p>
          <p className="mt-2 text-sm text-ridge-deep">{t.phases[workspace.phase].title}</p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-muted">{t.phases[workspace.phase].body}</p>
        </div>
        <label className="block text-sm text-ink">
          {copy.tools.plan.pickTitle}
          <select
            value={objective}
            onChange={(e) => setObjective(e.target.value as ObjectiveId)}
            className="mt-1 block min-h-11 rounded-lg border border-line bg-paper px-3 text-sm"
          >
            {OBJECTIVES.map((id) => (
              <option key={id} value={id}>
                {copy.tools.plan.objectives[id].name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-sm text-ink-muted">
        {fillTemplate(t.progress, { done, total })}
        {" · "}
        {fillTemplate(t.recWeeks, { n: workspace.recWeeks })}
      </p>

      <section className="rounded-2xl border border-line bg-paper-warm/60 p-5">
        <h3 className="font-display text-lg font-semibold text-ink">{t.weatherTitle}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.weatherLead}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <NumField
            label={t.freezeM}
            value={persist.weather.freezeM}
            onChange={(n) => write({ ...persist, objective, weather: { ...persist.weather, freezeM: n } })}
          />
          <label className="block text-sm text-ink">
            {t.precip}
            <select
              value={persist.weather.precip}
              onChange={(e) =>
                write({ ...persist, objective, weather: { ...persist.weather, precip: e.target.value as Precip } })
              }
              className="mt-1 min-h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm"
            >
              {PRECIP.map((id) => (
                <option key={id} value={id}>
                  {t.precipOpts[id]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-ink">
            {t.wind}
            <select
              value={persist.weather.wind}
              onChange={(e) =>
                write({ ...persist, objective, weather: { ...persist.weather, wind: e.target.value as Wind } })
              }
              className="mt-1 min-h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm"
            >
              {WIND.map((id) => (
                <option key={id} value={id}>
                  {t.windOpts[id]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div className="space-y-6">
        {SECTION_ORDER.map((section) => {
          if (section === "altitude" && !workspace.altitudeRelevant) {
            const only = workspace.items.filter((row) => row.section === "altitude");
            return (
              <section key={section} className="rounded-2xl border border-dashed border-line bg-card p-5">
                <h3 className="font-display text-lg font-semibold text-ink">{t.sections.altitude.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {fillTemplate(t.items[only[0]?.copyKey ?? "altitude.notAnIssue"]?.label ?? t.sections.altitude.lead, only[0]?.values ?? {})}
                </p>
              </section>
            );
          }
          const rows = workspace.items.filter((row) => row.section === section);
          const fields = workspace.prompts.filter((row) => row.section === section);
          const p = progress[section];
          return (
            <section
              key={section}
              data-prep-section={section}
              className={cn(
                "rounded-2xl border bg-card p-5",
                section === "debrief" ? "border-ridge" : "border-line",
              )}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-ridge-deep">{t.sections[section].title}</h3>
                <p className="text-xs text-ink-soft">{fillTemplate(t.progress, { done: p.done, total: p.total })}</p>
              </div>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.sections[section].lead}</p>
              <ul className="mt-4 space-y-3">
                {rows.map((row) => {
                  const copyRow = t.items[row.copyKey];
                  return (
                    <li key={row.id}>
                      <label className="flex cursor-pointer items-start gap-3 rounded-lg py-1">
                        <input
                          type="checkbox"
                          checked={Boolean(persist.checks[row.id])}
                          onChange={() => toggle(row.id)}
                          className="mt-1 size-4 accent-ridge"
                        />
                        <span>
                          <span className="block text-sm leading-relaxed text-ink">
                            {fillTemplate(copyRow?.label ?? row.copyKey, row.values)}
                          </span>
                          {copyRow?.why ? (
                            <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
                              {fillTemplate(copyRow.why, row.values)}
                            </span>
                          ) : null}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {fields.length ? (
                <div className="mt-4 space-y-3 border-t border-line pt-4">
                  {fields.map((field) => (
                    <label key={field.id} className="block text-sm text-ink">
                      {t.prompts[field.copyKey] ?? field.copyKey}
                      <input
                        type={field.kind === "time" ? "time" : "number"}
                        value={persist.answers[field.id] ?? ""}
                        onChange={(e) => setAnswer(field.id, e.target.value)}
                        className="mt-1 w-full max-w-xs rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
                      />
                    </label>
                  ))}
                </div>
              ) : null}
              {section === "debrief" ? (
                <div className="mt-5 space-y-3 border-t border-line pt-4">
                  <label className="block text-sm text-ink">
                    {t.debriefResult}
                    <select
                      value={persist.debrief.result}
                      onChange={(e) =>
                        write({
                          ...persist,
                          objective,
                          debrief: { ...persist.debrief, result: e.target.value as PrepPersist["debrief"]["result"] },
                        })
                      }
                      className="mt-1 min-h-11 w-full max-w-xs rounded-lg border border-line bg-paper px-3 text-sm"
                    >
                      <option value="">—</option>
                      <option value="finished">{copy.tools.passport.results.finished}</option>
                      <option value="dnf">{copy.tools.passport.results.dnf}</option>
                      <option value="dns">{copy.tools.passport.results.dns}</option>
                      <option value="training">{copy.tools.passport.results.training}</option>
                    </select>
                  </label>
                  <fieldset>
                    <legend className="text-sm text-ink">{t.debriefConfidence}</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {([1, 2, 3, 4, 5] as const).map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => write({ ...persist, objective, debrief: { ...persist.debrief, confidence: n } })}
                          className={cn(
                            "min-h-11 min-w-11 rounded-lg border px-3 text-sm",
                            persist.debrief.confidence === n
                              ? "border-ridge bg-paper-warm font-medium text-ink"
                              : "border-line bg-card text-ink-muted",
                          )}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <button
                    type="button"
                    onClick={saveToPassport}
                    className="inline-flex min-h-11 items-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep"
                  >
                    {t.saveDebrief}
                  </button>
                  {flash ? <p className="text-sm text-ridge">{flash}</p> : null}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">{t.safety}</p>
    </div>
  );
}

function NumField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | null;
  onChange: (n: number | null) => void;
}) {
  return (
    <label className="block text-sm text-ink">
      {label}
      <input
        inputMode="decimal"
        value={value ?? ""}
        onChange={(e) => {
          const raw = e.target.value;
          onChange(raw === "" ? null : Number(raw));
        }}
        className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
      />
    </label>
  );
}
