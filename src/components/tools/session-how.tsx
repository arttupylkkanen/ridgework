import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import type { SessionKey } from "@/lib/rolling-plan";
import { howLabels, sessionHowByLocale } from "@/content/session-how";
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
  "rest",
];

export function SessionHowTo({
  locale,
  sessionKey,
  minutes,
  minutesLabel,
}: {
  locale: Locale;
  sessionKey: SessionKey;
  minutes?: number;
  minutesLabel?: string;
}) {
  const how = sessionHowByLocale[locale][sessionKey];
  const labels = howLabels[locale];
  return (
    <div className="mt-4 space-y-4 border-t border-line pt-4 text-sm leading-relaxed text-ink">
      {minutes && minutesLabel ? <p className="font-medium text-ink">{minutesLabel}</p> : null}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{labels.feel}</p>
        <p className="mt-1 text-ink-muted">{how.feel}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{labels.do}</p>
        <p className="mt-1 text-ink-muted">{how.do}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{labels.swap}</p>
        <p className="mt-1 text-ink-muted">{how.swap}</p>
      </div>
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
