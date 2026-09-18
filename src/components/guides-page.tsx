import { GUIDES, getGuide } from "@/content/guides";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { ExampleLink, GuideLink, HomeLink } from "./app-link";
import { SiteShell } from "./site-shell";

export function GuidesIndex({ locale, copy }: { locale: Locale; copy: Copy }) {
  return (
    <SiteShell locale={locale} copy={copy} page="guides">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-ridge">
          {copy.guidesIndex.kicker}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
          {copy.guidesIndex.h2}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-muted">{copy.guidesIndex.lead}</p>
        <ul className="mt-10 space-y-4">
          {GUIDES.map((guide) => (
            <li key={guide.slug}>
              <GuideLink
                locale={locale}
                slug={guide.slug}
                className="block cursor-pointer border border-line bg-card p-5 hover:border-ridge hover:bg-paper-warm/50"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {guide.kicker[locale]}
                </p>
                <p className="mt-2 font-display text-xl font-semibold text-ink">
                  {guide.title[locale]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {guide.description[locale]}
                </p>
                <p className="mt-4 text-sm font-medium text-ridge">{copy.guidesIndex.read} →</p>
              </GuideLink>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}

export function GuideArticle({ locale, copy, slug }: { locale: Locale; copy: Copy; slug: string }) {
  const guide = getGuide(slug);
  if (!guide) {
    return (
      <SiteShell locale={locale} copy={copy} page="guides">
        <div className="mx-auto max-w-3xl px-4 py-20">
          <p className="text-ink-muted">Not found.</p>
          <GuideLink locale={locale} className="mt-4 inline-block text-ridge">
            {copy.guidesIndex.cta}
          </GuideLink>
        </div>
      </SiteShell>
    );
  }
  return (
    <SiteShell locale={locale} copy={copy} page="guides">
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-ridge">
          {guide.kicker[locale]}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
          {guide.title[locale]}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">{guide.description[locale]}</p>
        <div className="mt-10 space-y-5">
          {guide.body[locale].map((p) => (
            <p key={p.slice(0, 48)} className="text-base leading-relaxed text-ink">
              {p}
            </p>
          ))}
        </div>
        {/* Step one of the sequence ends here and step two begins. Without this
            block the reader's only way onward was back to the index or to the
            homepage, which is to say: out. */}
        <section className="mt-12 rounded-2xl border border-line bg-paper-warm/60 px-6 py-8 sm:px-8">
          <p className="font-display text-lg font-semibold text-ink">
            {copy.guidesIndex.nextTitle}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
            {copy.guidesIndex.nextBody}
          </p>
          <ExampleLink
            locale={locale}
            goal={guide.goal}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep"
          >
            {copy.guidesIndex.nextCta}
          </ExampleLink>
        </section>

        <p className="mt-10 text-sm">
          <GuideLink locale={locale} className="text-ridge underline-offset-2 hover:underline">
            {copy.guidesIndex.cta}
          </GuideLink>
          <span className="text-ink-soft"> · </span>
          <HomeLink locale={locale} className="text-ink-muted underline-offset-2 hover:underline">
            Ridgework
          </HomeLink>
        </p>
      </article>
    </SiteShell>
  );
}
