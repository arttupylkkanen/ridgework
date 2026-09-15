import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { HomeLink, AuthLink } from "./app-link";
import { ExampleDesk } from "./example-desk";

export function ExamplePage({ locale, copy }: { locale: Locale; copy: Copy }) {
  const p = copy.examplePage;
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

      <div className="mt-10">
        <ExampleDesk locale={locale} copy={copy} />
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-paper-warm/60 px-6 py-8 sm:px-8">
        <p className="font-display text-lg font-semibold text-ink">{p.noteTitle}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{p.noteBody}</p>
        <AuthLink
          locale={locale}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep"
        >
          {copy.cta.start}
        </AuthLink>
      </div>
    </article>
  );
}
