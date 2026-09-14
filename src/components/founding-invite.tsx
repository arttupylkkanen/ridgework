import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { AuthLink, HomeLink } from "./app-link";

export function FoundingInvite({ locale, copy }: { locale: Locale; copy: Copy }) {
  const p = copy.foundingPage;
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-medium uppercase tracking-[0.12em] text-accent">{p.kicker}</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{p.h1}</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-muted">{p.lead}</p>
      <p className="mt-6 rounded-lg border border-line bg-card px-4 py-3 text-sm text-ink-muted">{p.trial}</p>
      <div className="mt-8">
        <AuthLink
          locale={locale}
          className="inline-flex items-center justify-center rounded-lg bg-ridge px-6 py-3.5 text-base font-medium text-paper shadow-sm hover:bg-ridge-deep"
        >
          {copy.cta.start}
        </AuthLink>
      </div>
      <p className="mt-8 text-sm leading-relaxed text-ink-soft">{p.note}</p>
      <p className="mt-10 text-sm">
        <HomeLink locale={locale} className="text-ridge underline-offset-2 hover:underline">
          {p.back}
        </HomeLink>
      </p>
    </section>
  );
}