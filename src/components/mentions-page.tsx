import { ENTITY, HOSTS, missingFields } from "@/content/legal-entity";
import type { Copy } from "@/content/types";

/**
 * The publisher and host disclosure, rendered from `@/content/legal-entity`.
 *
 * A field we do not have yet is printed as "not yet published" rather than
 * dropped. A page that silently omits a legally required line looks finished
 * and is not — and the reader cannot tell the difference, which is the whole
 * problem this page exists to solve.
 */
export function MentionsPage({ copy }: { copy: Copy }) {
  const t = copy.legalPage;
  const rows: [string, string | null][] = [
    [t.labels.name, ENTITY.name],
    [t.labels.form, ENTITY.form],
    [t.labels.address, ENTITY.address],
    [t.labels.phone, ENTITY.phone],
    [t.labels.director, ENTITY.publicationDirector],
    [t.labels.siren, ENTITY.siren],
    [t.labels.vat, ENTITY.vat],
    [t.labels.capital, ENTITY.capital],
    [t.labels.email, ENTITY.email],
  ];
  const incomplete = missingFields().length > 0;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {t.title}
      </h1>
      <p className="mt-2 text-sm text-ink-soft">{t.updated}</p>
      <p className="mt-8 leading-relaxed text-ink-muted">{t.lead}</p>

      <h2 className="mt-12 font-display text-xl font-semibold text-ink">{t.publisherTitle}</h2>
      <dl className="mt-4 overflow-hidden rounded-2xl border border-line">
        {rows.map(([label, value], i) => (
          <div
            key={label}
            className={`grid gap-1 px-4 py-3 sm:grid-cols-[14rem_1fr] ${
              i === 0 ? "" : "border-t border-line"
            }`}
          >
            <dt className="text-sm font-medium text-ink">{label}</dt>
            <dd className={value ? "text-sm text-ink-muted" : "text-sm italic text-ink-soft"}>
              {value ?? t.pending}
            </dd>
          </div>
        ))}
      </dl>
      {incomplete ? (
        <p className="mt-4 rounded-2xl border border-accent bg-paper-warm/70 px-4 py-3 text-sm leading-relaxed text-ink">
          {t.pendingNote}
        </p>
      ) : null}

      <h2 className="mt-12 font-display text-xl font-semibold text-ink">{t.hostTitle}</h2>
      <p className="mt-2 leading-relaxed text-ink-muted">{t.hostLead}</p>
      <div className="mt-4 space-y-3">
        {HOSTS.map((host) => (
          <div key={host.name} className="rounded-2xl border border-line bg-card px-4 py-3">
            <p className="font-medium text-ink">{host.name}</p>
            <p className="mt-1 text-sm text-ink-muted">{host.address}</p>
            <dl className="mt-2 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[6rem_1fr]">
              <dt className="text-ink-soft">{t.hostRole}</dt>
              <dd className="text-ink-muted">{t.hostRoles[host.id]}</dd>
              <dt className="text-ink-soft">{t.hostRegion}</dt>
              <dd className="text-ink-muted">{host.region}</dd>
              <dt className="text-ink-soft">{t.hostContact}</dt>
              <dd className="break-all text-ink-muted">
                <a href={host.contact} className="hover:text-ink" rel="noreferrer noopener">
                  {host.contact}
                </a>
              </dd>
            </dl>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold text-ink">{t.contactTitle}</h2>
      <p className="mt-2 leading-relaxed text-ink-muted">{t.contactBody}</p>
    </article>
  );
}
