import { useEffect, useMemo, useState } from "react";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { passportPath } from "@/lib/locale";
import { getFounding } from "@/lib/founding";
import {
  OBJECTIVES,
  loadPlan,
  type ObjectiveId,
  type RollingState,
} from "@/lib/rolling-plan";
import {
  OUTING_RESULTS,
  SHARE_AUDIENCES,
  buildSnapshot,
  emptyPassport,
  filterForShare,
  loadPassport,
  newEventId,
  newShareToken,
  removeEvent,
  savePassport,
  upsertEvent,
  type OutingResult,
  type PassportEvent,
  type PassportRecord,
  type PrivacyFlags,
  type ShareAudience,
} from "@/lib/passport";
import { loadPassportRemote, savePassportRemote } from "@/lib/passport-server";
import { recentDaily } from "@/lib/daily-readiness";
import { PassportReport } from "@/components/passport-report";
import { cn } from "@/lib/utils";

function pct(value: number | null) {
  if (value == null) return "—";
  return `${Math.round(value * 100)}%`;
}

export function PassportDesk({
  locale,
  copy,
  enrollments,
}: {
  locale: Locale;
  copy: Copy;
  enrollments: RollingState[];
}) {
  const t = copy.tools.passport;
  const [record, setRecord] = useState<PassportRecord>(emptyPassport);
  const [ready, setReady] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [objective, setObjective] = useState<ObjectiveId>("fifty");
  const [distance, setDistance] = useState("");
  const [elevation, setElevation] = useState("");
  const [duration, setDuration] = useState("");
  const [result, setResult] = useState<OutingResult>("finished");
  const [confidence, setConfidence] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [lesson, setLesson] = useState("");

  useEffect(() => {
    const local = loadPassport();
    const founding = getFounding();
    if (!local.privacy.displayName && founding?.name) {
      local.privacy = { ...local.privacy, displayName: founding.name };
    }
    setRecord(local);
    setReady(true);
    void loadPassportRemote()
      .then((remote) => {
        if (remote.events.length || remote.shareToken) {
          const next = {
            ...remote,
            privacy: {
              ...remote.privacy,
              displayName: remote.privacy.displayName || founding?.name || local.privacy.displayName,
            },
          };
          savePassport(next);
          setRecord(next);
        }
      })
      .catch(() => undefined);
  }, []);

  const livePlan = typeof window !== "undefined" ? loadPlan() : null;
  const states = enrollments.length ? enrollments : livePlan ? [livePlan] : [];

  const snap = useMemo(
    () => buildSnapshot(states, record.events, recentDaily(), states[0]?.objective),
    [states, record.events],
  );

  function persist(next: PassportRecord) {
    setRecord(next);
    savePassport(next);
    void savePassportRemote({
      data: { events: next.events, privacy: next.privacy, shareToken: next.shareToken },
    }).catch(() => undefined);
  }

  function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const evt: PassportEvent = {
      id: newEventId(),
      date,
      name: name.trim(),
      objective,
      distanceKm: distance ? Number(distance) : null,
      elevationM: elevation ? Number(elevation) : null,
      durationMin: duration ? Number(duration) : null,
      result,
      confidence,
      lesson: lesson.trim(),
      season: snap.current?.season ?? 1,
    };
    persist(upsertEvent(record, evt));
    setName("");
    setDistance("");
    setElevation("");
    setDuration("");
    setLesson("");
    setFlash(t.saveOuting);
    window.setTimeout(() => setFlash(null), 1600);
  }

  function patchPrivacy(patch: Partial<PrivacyFlags>) {
    const privacy = { ...record.privacy, ...patch };
    let shareToken = record.shareToken;
    if (privacy.publicEnabled && !shareToken) shareToken = newShareToken();
    if (!privacy.publicEnabled) shareToken = shareToken;
    persist({ ...record, privacy, shareToken });
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "https://ridgework.org";
  const shareUrl =
    record.privacy.publicEnabled && record.shareToken ? `${origin}${passportPath(locale, record.shareToken)}` : "";
  const preview = filterForShare(
    snap,
    record.events,
    {
      ...record.privacy,
      publicEnabled: true,
      showEvents: true,
      showVolume: true,
      showConsistency: true,
      showPbs: true,
      showLessons: true,
      showConfidence: true,
    },
    new Date().toISOString().slice(0, 10),
  );

  if (!ready) {
    return <p className="text-ink-muted">{t.kicker}</p>;
  }

  const hasData = record.events.length > 0 || (snap.current?.sessionsDone ?? 0) > 0;

  return (
    <div className="space-y-10" data-passport="1">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{t.kicker}</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{t.title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.lead}</p>
      </div>

      {!hasData ? <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">{t.empty}</p> : null}

      <section>
        <h3 className="font-display text-xl font-semibold text-ink">{t.vsYou}</h3>
        {snap.previous ? (
          <p className="mt-1 text-sm text-ink-muted">
            {copy.tools.plan.objectives[snap.current?.objective ?? "fifty"].name}
          </p>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-ridge-deep">{t.firstSeason}</p>
        )}
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {snap.deltas.map((d) => (
            <li key={d.key} className="rounded-2xl border border-line bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">{t.metrics[d.key]}</p>
              <p className="mt-2 font-display text-2xl font-semibold text-ink">
                {d.key === "completion" || d.key === "consistency" ? pct(d.current) : d.current == null ? "—" : Math.round(d.current)}
              </p>
              <p className="mt-1 text-xs text-ink-muted">{t.delta[d.direction]}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">{t.metricHint[d.key]}</p>
            </li>
          ))}
        </ul>
      </section>

      {snap.pbs.length > 0 ? (
        <section>
          <h3 className="font-display text-xl font-semibold text-ink">{t.pbs}</h3>
          <ul className="mt-4 space-y-2">
            {snap.pbs.map((pb) => (
              <li key={pb.kind} className="text-sm text-ink">
                <span className="font-medium">{t.pbKinds[pb.kind]}</span>
                {": "}
                {pb.value} {t.units[pb.unit]}
                {pb.kind !== "streak" && pb.name ? ` · ${pb.name}` : ""}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h3 className="font-display text-xl font-semibold text-ink">{t.eventsTitle}</h3>
        <form onSubmit={onAdd} className="mt-4 space-y-3 rounded-2xl border border-line bg-card p-5">
          <p className="text-sm font-medium text-ink">{t.addOuting}</p>
          <label className="block text-sm text-ink">
            {t.outingName}
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm text-ink">
              {t.outingDate}
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
              />
            </label>
            <label className="block text-sm text-ink">
              {copy.tools.plan.pickTitle}
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value as ObjectiveId)}
                className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
              >
                {OBJECTIVES.map((id) => (
                  <option key={id} value={id}>
                    {copy.tools.plan.objectives[id].name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <label className="block text-sm text-ink">
              {t.distance}
              <input
                inputMode="decimal"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
              />
            </label>
            <label className="block text-sm text-ink">
              {t.elevation}
              <input
                inputMode="numeric"
                value={elevation}
                onChange={(e) => setElevation(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
              />
            </label>
            <label className="block text-sm text-ink">
              {t.duration}
              <input
                inputMode="numeric"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
              />
            </label>
          </div>
          <label className="block text-sm text-ink">
            {t.result}
            <select
              value={result}
              onChange={(e) => setResult(e.target.value as OutingResult)}
              className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
            >
              {OUTING_RESULTS.map((id) => (
                <option key={id} value={id}>
                  {t.results[id]}
                </option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend className="text-sm text-ink">{t.confidence}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {([1, 2, 3, 4, 5] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setConfidence(n)}
                  className={cn(
                    "min-h-11 min-w-11 rounded-lg border px-3 text-sm",
                    confidence === n ? "border-ridge bg-paper-warm font-medium text-ink" : "border-line bg-card text-ink-muted",
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block text-sm text-ink">
            {t.lesson}
            <textarea
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
            />
          </label>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep"
          >
            {t.saveOuting}
          </button>
          {flash ? <p className="text-sm text-ridge">{flash}</p> : null}
        </form>
        <ul className="mt-4 space-y-3">
          {record.events.map((evt) => (
            <li key={evt.id} className="rounded-2xl border border-line bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{evt.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {evt.date} · {t.results[evt.result]} · {copy.tools.plan.objectives[evt.objective].name}
                  </p>
                  {evt.lesson ? <p className="mt-2 text-sm leading-relaxed text-ink">{evt.lesson}</p> : null}
                </div>
                <button
                  type="button"
                  onClick={() => persist(removeEvent(record, evt.id))}
                  className="min-h-11 rounded-lg border border-line px-3 text-sm text-ink-muted hover:bg-paper-warm"
                >
                  {t.remove}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-line bg-paper-warm/50 p-5">
        <h3 className="font-display text-xl font-semibold text-ink">{t.privacyTitle}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.privacyLead}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => patchPrivacy({ publicEnabled: false, audience: "private" })}
            className={cn(
              "min-h-11 rounded-lg border px-4 text-sm",
              !record.privacy.publicEnabled ? "border-ridge bg-card font-medium text-ink" : "border-line bg-card text-ink-muted",
            )}
          >
            {t.publicOff}
          </button>
          <button
            type="button"
            onClick={() => patchPrivacy({ publicEnabled: true, audience: record.privacy.audience === "private" ? "coach" : record.privacy.audience })}
            className={cn(
              "min-h-11 rounded-lg border px-4 text-sm",
              record.privacy.publicEnabled ? "border-ridge bg-card font-medium text-ink" : "border-line bg-card text-ink-muted",
            )}
          >
            {t.publicOn}
          </button>
        </div>
        <label className="mt-4 block max-w-sm text-sm text-ink">
          {t.displayName}
          <input
            value={record.privacy.displayName}
            onChange={(e) => patchPrivacy({ displayName: e.target.value })}
            className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
          />
        </label>
        <label className="mt-4 block max-w-sm text-sm text-ink">
          {t.audience}
          <select
            value={record.privacy.audience}
            onChange={(e) => patchPrivacy({ audience: e.target.value as ShareAudience })}
            className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
          >
            {SHARE_AUDIENCES.filter((a) => a !== "private").map((id) => (
              <option key={id} value={id}>
                {t.audiences[id]}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="mt-4">
          <legend className="text-sm font-medium text-ink">{t.flags.showEvents}</legend>
          <ul className="mt-3 space-y-2">
            {(
              [
                ["showEvents", t.flags.showEvents],
                ["showVolume", t.flags.showVolume],
                ["showConsistency", t.flags.showConsistency],
                ["showPbs", t.flags.showPbs],
                ["showLessons", t.flags.showLessons],
                ["showConfidence", t.flags.showConfidence],
              ] as const
            ).map(([key, label]) => (
              <li key={key}>
                <label className="flex min-h-11 items-center gap-3 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={record.privacy[key]}
                    onChange={(e) => patchPrivacy({ [key]: e.target.checked })}
                  />
                  {label}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        {record.privacy.publicEnabled && shareUrl ? (
          <div className="mt-5 space-y-3">
            <p className="text-sm font-medium text-ink">{t.shareLink}</p>
            <p className="break-all rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink-muted">{shareUrl}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard?.writeText(shareUrl);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1500);
                }}
                className="min-h-11 rounded-lg border border-line bg-card px-4 text-sm text-ink hover:bg-paper-warm"
              >
                {copied ? t.copied : t.copyLink}
              </button>
              <a
                href={shareUrl}
                className="inline-flex min-h-11 items-center rounded-lg bg-ridge px-4 text-sm font-medium text-paper hover:bg-ridge-deep"
              >
                {t.openReport}
              </a>
            </div>
          </div>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-lg border border-line bg-card px-4 text-sm text-ink hover:bg-paper-warm no-print"
          >
            {t.print}
          </button>
          <button
            type="button"
            onClick={() => {
              const blob = new Blob([JSON.stringify({ events: record.events, snapshot: snap }, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "ridgework-passport.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="min-h-11 rounded-lg border border-line bg-card px-4 text-sm text-ink hover:bg-paper-warm no-print"
          >
            {t.download}
          </button>
        </div>
      </section>

      {preview ? (
        <div className="passport-print-root">
          <PassportReport copy={copy} shared={preview} />
        </div>
      ) : null}
    </div>
  );
}
