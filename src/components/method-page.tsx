import type { Copy } from "@/content/types";
import { KEY_SOURCES } from "@/content";
import type { Locale } from "@/lib/locale";
import { METHOD_PHOTO } from "@/lib/program-media";
import { HomeLink, SourcesLink } from "./app-link";

export function MethodPage({ locale, copy }: { locale: Locale; copy: Copy }) {
  return (
    <article>
      <div className="mx-auto grid max-w-5xl lg:grid-cols-2">
        <figure className="relative min-h-56 overflow-hidden sm:min-h-80 lg:min-h-full">
          <img
            src={METHOD_PHOTO.src}
            alt=""
            className="h-full w-full object-cover"
            width={METHOD_PHOTO.width}
            height={METHOD_PHOTO.height}
            decoding="async"
          />
        </figure>
        <div className="px-4 py-12 sm:px-8 sm:py-16">
          <HomeLink locale={locale} className="text-sm text-ink-muted hover:text-ink">
            {copy.sourcesPage.back}
          </HomeLink>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-ridge">
            {copy.method.kicker}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {copy.method.h2}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">{copy.method.lead}</p>
          <dl className="mt-8 space-y-6">
            {copy.method.cards.map((card) => (
              <div key={card.title}>
                <dt className="font-display text-lg font-semibold text-ridge-deep">{card.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{card.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-lg font-semibold text-ink">{copy.method.caveatsTitle}</h2>
          <ul className="mt-4 space-y-3">
            {copy.method.caveats.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-ink-muted">
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-lg font-semibold text-ink">
            {copy.method.sourcesTitle}
          </h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 marker:text-ink-soft">
            {KEY_SOURCES.map((src) => (
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
          <SourcesLink
            locale={locale}
            className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-ridge underline-offset-2 hover:underline"
          >
            {copy.method.allSourcesCta} →
          </SourcesLink>
        </div>
      </div>
    </article>
  );
}
