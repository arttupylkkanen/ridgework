import { useMemo, useState } from "react";
import type { Copy } from "@/content/types";
import {
  CONSTRAINTS,
  DISCIPLINES,
  EQUIPMENT,
  EXPERIENCE,
  LONGEST_BANDS,
  SPORTS,
  TERRAIN,
  UNITS,
  VOLUME_BANDS,
  availableCount,
  emptyProfile,
  toggleList,
  windowsOf,
  type AthleteProfile,
  type AvailableDays,
  type DayWindow,
  type DayWindows,
} from "@/lib/athlete";
import { OBJECTIVES, suggestedPeakOn, todayIso, type ObjectiveId } from "@/lib/rolling-plan";
import { PROGRAM_MEDIA } from "@/lib/program-media";
import { cn, fillTemplate } from "@/lib/utils";

const STEPS = 7;

function ChoiceButton({
  selected,
  onClick,
  title,
  body,
  id,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  body?: string;
  id?: string;
}) {
  return (
    <button
      id={id}
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-xl border px-4 py-3 text-left",
        selected ? "border-ridge bg-paper-warm font-medium text-ink" : "border-line bg-card text-ink-muted hover:bg-paper-warm/60",
      )}
    >
      <span className="block text-sm text-ink">{title}</span>
      {body ? <span className="mt-1 block text-xs leading-relaxed text-ink-muted">{body}</span> : null}
    </button>
  );
}

export function Onboarding({
  copy,
  initial,
  onComplete,
  onCancel,
}: {
  copy: Copy;
  initial?: AthleteProfile | null;
  onComplete: (profile: AthleteProfile) => void;
  onCancel?: () => void;
}) {
  const t = copy.tools.athlete.onboarding;
  const days = copy.tools.week.days;
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<AthleteProfile>(() => {
    if (initial) return { ...initial, availableDays: [...initial.availableDays] as AvailableDays };
    return emptyProfile({ peakOn: suggestedPeakOn("fifty") });
  });

  function patch(partial: Partial<AthleteProfile>) {
    setDraft((prev) => ({ ...prev, ...partial }));
  }

  const windows = windowsOf(draft);

  function patchWindow(index: number, partial: Partial<DayWindow>) {
    const next = windowsOf(draft).map((w, i) =>
      i === index ? { ...w, ...partial } : w,
    ) as DayWindows;
    patch({ dayWindows: next });
  }

  const canNext = useMemo(() => {
    if (step === 2) return Boolean(draft.peakOn) && draft.peakOn >= todayIso();
    if (step === 4) return availableCount(draft.availableDays) >= 2;
    return true;
  }, [step, draft.peakOn, draft.availableDays]);

  function finish() {
    onComplete({
      ...draft,
      completedAt: new Date().toISOString(),
    });
  }

  return (
    <div className="space-y-6" data-onboarding={step}>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{t.kicker}</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{t.h1}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.lead}</p>
      </div>

      <p className="text-xs font-medium uppercase tracking-wider text-accent">
        {fillTemplate(t.step, { n: step + 1, total: STEPS })}
      </p>
      <ol className="flex gap-1" aria-hidden="true">
        {t.steps.map((label, i) => (
          <li
            key={label}
            className={cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-ridge" : "bg-line")}
            title={label}
          />
        ))}
      </ol>

      {step === 0 ? (
        <div className="space-y-5">
          <div className="grid gap-2 sm:grid-cols-3">
            {SPORTS.map((id) => (
              <ChoiceButton
                key={id}
                id={`onboard-sport-${id}`}
                selected={draft.sport === id}
                title={t.sports[id]}
                onClick={() => patch({ sport: id })}
              />
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {DISCIPLINES.map((id) => (
              <ChoiceButton
                key={id}
                id={`onboard-disc-${id}`}
                selected={draft.discipline === id}
                title={t.disciplines[id]}
                onClick={() => patch({ discipline: id })}
              />
            ))}
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {OBJECTIVES.map((id) => {
            const obj = copy.tools.plan.objectives[id];
            const photo = PROGRAM_MEDIA[id];
            const selected = draft.goal === id;
            return (
              <button
                key={id}
                id={`onboard-goal-${id}`}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  const nextPeak = draft.peakOn && draft.goal === id ? draft.peakOn : suggestedPeakOn(id);
                  patch({ goal: id as ObjectiveId, peakOn: nextPeak });
                }}
                className={cn(
                  "overflow-hidden border text-left",
                  selected ? "border-ridge bg-paper-warm" : "border-line bg-card hover:bg-paper-warm/60",
                )}
              >
                <img src={photo.src} alt="" width={photo.width} height={photo.height} className="aspect-[16/9] w-full object-cover" />
                <div className="p-4">
                  <p className="font-display text-lg font-semibold text-ridge-deep">{obj.name}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">{obj.length}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{obj.blurb}</p>
                </div>
              </button>
            );
          })}
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4 rounded-2xl border border-line bg-card p-5">
          <label className="block text-sm font-medium text-ink" htmlFor="onboard-peak">
            {t.peakLabel}
            <input
              id="onboard-peak"
              type="date"
              min={todayIso()}
              value={draft.peakOn}
              onChange={(e) => patch({ peakOn: e.target.value })}
              className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
            />
          </label>
          <p className="text-sm leading-relaxed text-ridge-deep">{copy.tools.plan.longerBetter}</p>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-6">
          <div className="grid gap-2">
            {VOLUME_BANDS.map((id) => (
              <ChoiceButton
                key={id}
                id={`onboard-vol-${id}`}
                selected={draft.weeklyHours === id}
                title={t.volume[id]}
                onClick={() => patch({ weeklyHours: id })}
              />
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {LONGEST_BANDS.map((id) => (
              <ChoiceButton
                key={id}
                id={`onboard-long-${id}`}
                selected={draft.longest === id}
                title={t.longest[id]}
                onClick={() => patch({ longest: id })}
              />
            ))}
          </div>
          <div className="grid gap-2">
            {EXPERIENCE.map((id) => (
              <ChoiceButton
                key={id}
                id={`onboard-exp-${id}`}
                selected={draft.experience === id}
                title={t.experience[id]}
                onClick={() => patch({ experience: id })}
              />
            ))}
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="space-y-4">
          <p className="text-sm font-medium text-ink">{t.availableTitle}</p>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {days.map((label, i) => (
              <button
                key={label}
                id={`onboard-day-${i}`}
                type="button"
                aria-pressed={draft.availableDays[i]}
                onClick={() => {
                  const next = [...draft.availableDays] as AvailableDays;
                  next[i] = !next[i];
                  patch({ availableDays: next });
                }}
                className={cn(
                  "min-h-11 rounded-xl border text-sm",
                  draft.availableDays[i] ? "border-ridge bg-paper-warm font-medium text-ink" : "border-line bg-card text-ink-muted",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          {availableCount(draft.availableDays) < 2 ? <p className="text-sm text-warn">{t.needDays}</p> : null}

          <div className="border-t border-line pt-5">
            <p className="text-sm font-medium text-ink">{t.windowTitle}</p>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-ink-soft">{t.windowHint}</p>
            <div className="mt-4 space-y-2">
              {days.map((label, i) =>
                draft.availableDays[i] ? (
                  <div
                    key={label}
                    className="grid grid-cols-[3.5rem_1fr_1fr] items-center gap-2 sm:max-w-md"
                  >
                    <span className="text-sm font-medium uppercase tracking-wider text-ink-soft">
                      {label}
                    </span>
                    <label className="block">
                      <span className="sr-only">{t.windowMinutes}</span>
                      <input
                        type="number"
                        min={20}
                        step={5}
                        inputMode="numeric"
                        placeholder={t.windowMinutes}
                        value={windows[i]?.minutes ?? ""}
                        onChange={(e) =>
                          patchWindow(i, {
                            minutes: e.target.value === "" ? null : Number(e.target.value),
                          })
                        }
                        className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="block">
                      <span className="sr-only">{t.windowTime}</span>
                      <input
                        type="time"
                        value={windows[i]?.startAt ?? ""}
                        onChange={(e) =>
                          patchWindow(i, { startAt: e.target.value || null })
                        }
                        className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
                      />
                    </label>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </div>
      ) : null}

      {step === 5 ? (
        <div className="space-y-6">
          <div className="grid gap-2 sm:grid-cols-2">
            {TERRAIN.map((id) => (
              <ChoiceButton
                key={id}
                id={`onboard-terrain-${id}`}
                selected={draft.terrain === id}
                title={t.terrain[id]}
                onClick={() => patch({ terrain: id })}
              />
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {EQUIPMENT.filter((id) => id !== "poles").map((id) => (
              <ChoiceButton
                key={id}
                id={`onboard-eq-${id}`}
                selected={draft.equipment.includes(id)}
                title={t.equipment[id]}
                onClick={() => patch({ equipment: toggleList(draft.equipment, id) })}
              />
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {UNITS.map((id) => (
              <ChoiceButton
                key={id}
                id={`onboard-unit-${id}`}
                selected={draft.units === id}
                title={t.units[id]}
                onClick={() => patch({ units: id })}
              />
            ))}
          </div>
        </div>
      ) : null}

      {step === 6 ? (
        <div className="space-y-5">
          <div className="grid gap-2">
            {CONSTRAINTS.map((id) => (
              <ChoiceButton
                key={id}
                id={`onboard-con-${id}`}
                selected={draft.constraints.includes(id)}
                title={t.constraints[id]}
                onClick={() => patch({ constraints: toggleList(draft.constraints, id) })}
              />
            ))}
          </div>
          <div>
            <p className="text-sm font-medium text-ink">{t.limitations}</p>
            <div className="mt-2 grid max-w-xs grid-cols-2 gap-2">
              <ChoiceButton
                id="onboard-limit-no"
                selected={!draft.limitations}
                title={t.limitationsNo}
                onClick={() => patch({ limitations: "" })}
              />
              <ChoiceButton
                id="onboard-limit-yes"
                selected={Boolean(draft.limitations)}
                title={t.limitationsYes}
                onClick={() => patch({ limitations: "yes" })}
              />
            </div>
          </div>
          <p className="text-xs leading-relaxed text-ink-soft">{t.limitationsHint}</p>
          <div className="rounded-2xl border border-ridge bg-paper-warm/70 p-5">
            <p className="font-display text-lg font-semibold text-ink">{t.reviewTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.reviewLead}</p>
            <ul className="mt-3 space-y-1 text-sm text-ink">
              <li>{copy.tools.plan.objectives[draft.goal].name}</li>
              <li>{draft.peakOn}</li>
              <li>{t.volume[draft.weeklyHours]} · {t.longest[draft.longest]}</li>
              <li>{availableCount(draft.availableDays)} {t.availableTitle.toLowerCase()}</li>
            </ul>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {/* Only one "Back" at a time: leaving the wizard, or stepping within it. */}
        {onCancel && step === 0 ? (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-11 items-center rounded-lg border border-line bg-card px-4 py-2 text-sm text-ink-muted hover:bg-paper-warm"
          >
            {t.back}
          </button>
        ) : null}
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex min-h-11 items-center rounded-lg border border-line bg-card px-4 py-2 text-sm text-ink-muted hover:bg-paper-warm"
          >
            {t.back}
          </button>
        ) : null}
        {step < STEPS - 1 ? (
          <button
            id="onboard-next"
            type="button"
            disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}
            className="inline-flex min-h-11 items-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t.next}
          </button>
        ) : (
          <button
            id="onboard-start"
            type="button"
            disabled={!canNext}
            onClick={finish}
            className="inline-flex min-h-11 items-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t.start}
          </button>
        )}
      </div>
    </div>
  );
}
