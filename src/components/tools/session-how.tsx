import type { Copy } from "@/content/types";
import { LADDER_LABELS, ladderFor } from "@/content/substitutions";
import type { Locale } from "@/lib/locale";
import type { SessionKey } from "@/lib/rolling-plan";
import { howLabels, sessionHowByLocale } from "@/content/session-how";
import { fillTemplate } from "@/lib/utils";
import { PaceGuide } from "./pace-guide";

const KEYS: SessionKey[] = [
  "easy",
  "engine",
  "recovery",
  "long",
  "steady",
  "quality",
  "sharpness",
  "vert",
  "hike",
  "pack",
  "mountain",
  "climb",
  "strength",
  "me",
  "rest",
];

export function SessionHowTo({
  locale,
  sessionKey,
  minutes,
  minutesLabel,
  loadKg,
}: {
  locale: Locale;
  sessionKey: SessionKey;
  minutes?: number;
  minutesLabel?: string;
  /** Current pack weight (kg) for "pack"/"me" sessions — see `packLoadKg`. */
  loadKg?: number;
}) {
  const how = sessionHowByLocale[locale][sessionKey];
  const labels = howLabels[locale];
  const doText = loadKg != null ? fillTemplate(how.do, { kg: loadKg }) : how.do;
  // English-only for now; other locales keep the one-line swap.
  const ladder = locale === "en" ? ladderFor(sessionKey) : undefined;
  return (
    <div className="mt-4 space-y-4 border-t border-line pt-4 text-sm leading-relaxed text-ink">
      {minutes && minutesLabel ? <p className="font-medium text-ink">{minutesLabel}</p> : null}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{labels.feel}</p>
        <p className="mt-1 text-ink-muted">{how.feel}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{labels.do}</p>
        <p className="mt-1 text-ink-muted">{doText}</p>
      </div>
      {ladder ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {LADDER_LABELS.title}
          </p>
          <p className="mt-1 text-ink-muted">{ladder.purpose}</p>
          <ol className="mt-3 space-y-3">
            {ladder.rungs.map((rung, i) => (
              <li key={rung.do} className="border-l-2 border-line pl-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  {i === 0 ? LADDER_LABELS.best : `${LADDER_LABELS.worse} ${i}`}
                </p>
                <p className="mt-1 text-ink">{rung.do}</p>
                <p className="mt-1 text-xs text-ink-soft">
                  {LADDER_LABELS.costLabel}: {rung.cost}
                </p>
              </li>
            ))}
          </ol>
          {ladder.evidence ? (
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">{ladder.evidence}</p>
          ) : null}
        </div>
      ) : (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">{labels.swap}</p>
          <p className="mt-1 text-ink-muted">{how.swap}</p>
        </div>
      )}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{labels.watch}</p>
        <p className="mt-1 text-ink-muted">{how.watch}</p>
      </div>
    </div>
  );
}

export function SessionsGlossary({ locale, copy }: { locale: Locale; copy: Copy }) {
  const titles = copy.tools.plan.sessions;
  return (
    <div className="space-y-6">
      <PaceGuide copy={copy} />
      <ul className="space-y-4">
        {KEYS.map((key) => (
          <li key={key} className="rounded-2xl border border-line bg-card p-5">
            <h3 className="font-display text-lg font-semibold text-ink">{titles[key]}</h3>
            <SessionHowTo locale={locale} sessionKey={key} />
          </li>
        ))}
      </ul>
    </div>
  );
}
