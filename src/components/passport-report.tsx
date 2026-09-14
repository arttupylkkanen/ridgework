import type { Copy } from "@/content/types";
import type { SharedPassport } from "@/lib/passport";
import { fillTemplate } from "@/lib/utils";

function formatDay(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function pct(value: number | null) {
  if (value == null) return "—";
  return `${Math.round(value * 100)}%`;
}

export function PassportReport({
  copy,
  shared,
}: {
  copy: Copy;
  shared: SharedPassport;
}) {
  const t = copy.tools.passport;
  const obj = copy.tools.plan.objectives;

  return (
    <article
      className="passport-report mx-auto max-w-3xl border border-line bg-card px-5 py-8 sm:px-10 sm:py-12"
      data-passport-report="1"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{t.reportKicker}</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {shared.displayName}
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        {t.audiences[shared.audience]} · {formatDay(shared.generatedOn)}
      </p>
      {shared.current ? (
        <p className="mt-4 text-sm text-ink">
          {obj[shared.current.objective].name}
          {" · "}
          {fillTemplate(copy.tools.plan.seasonLabel, { n: shared.current.season })}
          {" · "}
          {formatDay(shared.current.peakOn)}
        </p>
      ) : null}

      {shared.totals ? (
        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label={t.metrics.easy} value={String(shared.totals.easyCount)} />
          <Stat label={t.metrics.quality} value={String(shared.totals.qualityCount)} />
          <Stat label={t.metrics.mountain} value={String(shared.totals.mountainDays)} />
          <Stat
            label={t.metrics.elevation}
            value={shared.totals.elevationM ? `${shared.totals.elevationM} ${t.units.m}` : "—"}
          />
        </dl>
      ) : null}

      {shared.deltas.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">{t.vsYou}</h2>
          <ul className="mt-4 space-y-3">
            {shared.deltas
              .filter((d) => d.current != null)
              .map((d) => (
                <li key={d.key} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2">
                  <span className="text-sm text-ink">{t.metrics[d.key]}</span>
                  <span className="text-sm text-ink-muted">
                    {d.key === "completion" || d.key === "consistency" ? pct(d.current) : String(Math.round(d.current ?? 0))}
                    {d.previous != null
                      ? ` · ${t.delta[d.direction]}`
                      : ` · ${t.delta.new}`}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      ) : null}

      {shared.pbs.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">{t.pbs}</h2>
          <ul className="mt-4 space-y-2">
            {shared.pbs.map((pb) => (
              <li key={pb.kind} className="text-sm text-ink">
                <span className="font-medium">{t.pbKinds[pb.kind]}:</span>{" "}
                {pb.value} {t.units[pb.unit]}
                {pb.name && pb.kind !== "streak" ? ` · ${pb.name}` : ""}
                {pb.date ? ` · ${formatDay(pb.date)}` : ""}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {shared.events.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">{t.eventsTitle}</h2>
          <ul className="mt-4 space-y-4">
            {shared.events.map((evt) => (
              <li key={evt.id} className="border-b border-line pb-3">
                <p className="font-medium text-ink">{evt.name}</p>
                <p className="mt-1 text-sm text-ink-muted">
                  {formatDay(evt.date)} · {t.results[evt.result]}
                  {evt.distanceKm ? ` · ${evt.distanceKm} ${t.units.km}` : ""}
                  {evt.elevationM ? ` · ${evt.elevationM} ${t.units.m}` : ""}
                  {evt.durationMin ? ` · ${evt.durationMin} ${t.units.min}` : ""}
                </p>
                {evt.lesson ? <p className="mt-2 text-sm leading-relaxed text-ink">{evt.lesson}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {shared.lessons.length > 0 && shared.events.every((e) => !e.lesson) ? (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">{t.lessonsTitle}</h2>
          <ul className="mt-4 space-y-3">
            {shared.lessons.map((row) => (
              <li key={`${row.date}-${row.name}`} className="text-sm leading-relaxed text-ink">
                <span className="font-medium">{row.name}</span>
                <span className="text-ink-muted"> · {formatDay(row.date)}</span>
                <p className="mt-1 text-ink-muted">{row.lesson}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {shared.avgConfidence != null ? (
        <p className="mt-8 text-sm text-ink">
          {t.metrics.confidence}: {shared.avgConfidence.toFixed(1)} / 5
        </p>
      ) : null}

      <p className="mt-12 max-w-xl text-sm leading-relaxed text-ink-soft">{t.reportHedge}</p>
      <p className="mt-3 text-xs text-ink-soft">ridgework.org · support@ridgework.org</p>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-ink-soft">{label}</dt>
      <dd className="mt-1 font-display text-2xl font-semibold text-ridge-deep">{value}</dd>
    </div>
  );
}
