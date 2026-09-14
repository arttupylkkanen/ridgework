import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Copy } from "@/content/types";
import { SOURCES } from "@/content";
import type { Locale } from "@/lib/locale";
import { pagePath, homeHash } from "@/lib/locale";
import { cn } from "@/lib/utils";

const TABS = ["stories", "science", "terrain"] as const;
type Tab = (typeof TABS)[number];

const TERRAIN_SRC: Record<string, { src: string; width: number; height: number }> = {
  chamonix: { src: "/field/chamonix-trail.jpg", width: 1792, height: 1008 },
  bonhomme: { src: "/field/col-bonhomme.jpg", width: 1728, height: 1152 },
  ferret: { src: "/field/col-ferret.jpg", width: 1728, height: 1152 },
  sierre: { src: "/field/sierre-zinal.jpg", width: 1728, height: 1152 },
  haute: { src: "/field/haute-route.jpg", width: 1728, height: 1152 },
  dolomites: { src: "/field/dolomites.jpg", width: 1728, height: 1152 },
  tds: { src: "/field/courmayeur-tds.jpg", width: 1728, height: 1152 },
  trail: { src: "/field/trail-20.jpg", width: 1792, height: 1008 },
  ultra: { src: "/field/ultra-ridge.jpg", width: 1792, height: 1008 },
  expedition: { src: "/field/expedition.jpg", width: 1792, height: 1008 },
};

const STORY_PHOTOS = ["/field/sierre-zinal.jpg", "/field/col-bonhomme.jpg", "/field/haute-route.jpg"] as const;

function isTab(value: string): value is Tab {
  return (TABS as readonly string[]).includes(value);
}

export function FieldPage({ locale, copy }: { locale: Locale; copy: Copy }) {
  const [tab, setTab] = useState<Tab>("stories");
  const field = copy.fieldPage;

  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.replace("#", "");
      if (isTab(hash)) setTab(hash);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const selectTab = (id: Tab) => {
    setTab(id);
    const url = `${pagePath(locale, "field")}#${id}`;
    window.history.replaceState(null, "", url);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "stories", label: field.tabs.stories },
    { id: "science", label: field.tabs.science },
    { id: "terrain", label: field.tabs.terrain },
  ];

  const hero = field.terrain.items.find((item) => item.id === "chamonix");
  const heroImg = TERRAIN_SRC.chamonix;

  return (
    <article>
      <header className="border-b border-line">
        <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 sm:pt-16">
          <Link
            to={pagePath(locale, "home")}
            className="text-sm text-ink-muted hover:text-ink"
          >
            {field.back}
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-ridge">{field.kicker}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl">
            {field.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{field.lead}</p>
          <p className="mt-6 max-w-2xl rounded-lg border border-line bg-card px-4 py-3 text-sm leading-relaxed text-ink-soft">
            {field.compositeNote}
          </p>
        </div>
        {hero ? (
          <figure className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
            <img
              src={heroImg.src}
              alt={hero.title}
              width={heroImg.width}
              height={heroImg.height}
              className="w-full rounded-2xl border border-line object-cover"
              decoding="async"
            />
            <figcaption className="mt-3 max-w-3xl pb-10 text-sm leading-relaxed text-ink-soft">
              <span className="font-medium text-ink">{hero.title}.</span> {hero.place}. {hero.caption}
            </figcaption>
          </figure>
        ) : null}
      </header>

      <div className="sticky top-16 z-30 border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-2 px-4 py-3 sm:px-6" role="tablist" aria-label={field.kicker}>
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => selectTab(item.id)}
              className={cn(
                "min-h-11 rounded-lg px-4 py-2 text-sm font-medium",
                tab === item.id
                  ? "bg-ridge text-paper"
                  : "border border-line bg-card text-ink-muted hover:bg-paper-warm hover:text-ink",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        {tab === "stories" ? <StoriesPane field={field} /> : null}
        {tab === "science" ? <SciencePane field={field} /> : null}
        {tab === "terrain" ? <TerrainPane field={field} /> : null}

        <div className="mt-16 rounded-2xl border border-line bg-paper-warm/60 px-6 py-8 sm:px-8">
          <p className="font-display text-xl font-semibold text-ink">{copy.checkout.h2}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{copy.hero.trial}</p>
          <a
            href={homeHash(locale, "checkout")}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep"
          >
            {copy.cta.start}
          </a>
        </div>
      </div>
    </article>
  );
}

function StoriesPane({ field }: { field: Copy["fieldPage"] }) {
  return (
    <div className="space-y-16">
      {field.stories.map((story, index) => (
        <article key={story.title} className="border-b border-line pb-16 last:border-b-0 last:pb-0">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">{story.kicker}</p>
          <p className="mt-2 text-sm text-ink-soft">{story.place}</p>
          <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {story.title}
          </h2>
          {STORY_PHOTOS[index] ? (
            <img
              src={STORY_PHOTOS[index]}
              alt=""
              width={1728}
              height={1152}
              className="mt-6 aspect-[16/9] w-full object-cover"
              decoding="async"
              loading="lazy"
            />
          ) : null}
          <blockquote className="mt-6 max-w-2xl border-l-2 border-accent pl-5 font-display text-xl leading-snug text-ridge-deep">
            {story.pull}
          </blockquote>
          <div className="mt-8 max-w-2xl space-y-5">
            {story.body.map((para) => (
              <p key={para.slice(0, 40)} className="text-base leading-relaxed text-ink-muted">
                {para}
              </p>
            ))}
          </div>
          <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ridge">{field.storyNote}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink">{story.lesson}</p>
            </div>
            <div className="rounded-2xl border border-line bg-paper-warm/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">{field.storySource}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{story.science}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function SciencePane({ field }: { field: Copy["fieldPage"] }) {
  const sci = field.science;
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{sci.kicker}</p>
      <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink">{sci.h2}</h2>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{sci.lead}</p>
      <div className="mt-10 rounded-2xl border border-line bg-ridge-deep px-6 py-8 text-paper sm:px-8">
        <h3 className="font-display text-xl font-semibold">{sci.limitTitle}</h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/80">{sci.limitBody}</p>
      </div>
      <div className="mt-12 space-y-12">
        {sci.sections.map((section, i) => (
          <section key={section.title} className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ridge-deep">
              {section.title}
            </h3>
            <div className="mt-5 space-y-4">
              {section.body.map((para) => (
                <p key={para.slice(0, 40)} className="text-base leading-relaxed text-ink-muted">
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <ol className="mt-14 space-y-3 border-t border-line pt-10">
        {SOURCES.map((src, i) => (
          <li key={src.title} className="text-sm leading-relaxed text-ink-muted">
            <span className="mr-2 tabular-nums text-ink-soft">{i + 1}.</span>
            <span className="font-medium text-ink">{src.authors}</span>
            <span> ({src.year}). </span>
            <span className="italic">{src.title}</span>
            <span> {src.journal} </span>
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
    </div>
  );
}

function TerrainPane({ field }: { field: Copy["fieldPage"] }) {
  const terrain = field.terrain;
  const rest = terrain.items.filter((item) => item.id !== "chamonix");
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{terrain.kicker}</p>
      <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink">{terrain.h2}</h2>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{terrain.lead}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">{terrain.photoNote}</p>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {rest.map((item) => {
          const img = TERRAIN_SRC[item.id];
          if (!img) return null;
          return (
            <figure key={item.id} className="flex flex-col">
              <img
                src={img.src}
                alt={item.title}
                width={img.width}
                height={img.height}
                className="w-full rounded-2xl border border-line object-cover"
                decoding="async"
              />
              <figcaption className="mt-4">
                <h3 className="font-display text-lg font-semibold text-ridge-deep">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{item.place}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.caption}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
