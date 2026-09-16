import type { Copy } from "@/content/types";
import { SOURCES } from "@/content";
import type { Locale } from "@/lib/locale";
import { HomeLink, MethodLink } from "./app-link";

export function SourcesPage({ locale, copy }: { locale: Locale; copy: Copy }) {
  const p = copy.sourcesPage;
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <HomeLink locale={locale} className="text-sm text-ink-muted hover:text-ink">
        {p.back}
      </HomeLink>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-ridge">{p.kicker}</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {p.h1}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{p.lead}</p>

      <ol className="mt-10 list-decimal space-y-4 pl-5 marker:text-ink-soft">
        {SOURCES.map((src) => (
          <li key={src.title} className="text-sm leading-relaxed text-ink">
            <span className="font-medium">{src.authors}</span>
            <span className="text-ink-soft"> ({src.year}). </span>
            <span className="italic">{src.title}</span>
            <span className="text-ink-muted"> {src.journal} </span>
            <a
              href={src.href}
              className="font-medium text-ridge underline decoration-ridge/30 underline-offset-2 hover:decoration-ridge"
              rel="noopener noreferrer"
              target="_blank"
            >
              {"doi" in src && src.doi ? `doi:${src.doi}` : "source"}
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-2xl border border-line bg-paper-warm/60 px-6 py-8 sm:px-8">
        <p className="font-display text-lg font-semibold text-ink">{p.noteTitle}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{p.noteBody}</p>
        <MethodLink
          locale={locale}
          className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-ridge underline-offset-2 hover:underline"
        >
          {copy.method.h2} →
        </MethodLink>
      </div>
    </article>
  );
}
