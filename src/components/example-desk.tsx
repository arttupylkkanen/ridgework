import { useMemo, useState } from "react";
import type { Copy } from "@/content/types";
import type { RealizedWeek } from "@/lib/plan-engine";
import { weekNoteFrom } from "@/lib/week-note";
import { fillTemplate, cn } from "@/lib/utils";

/**
 * Step three of the public sequence, without the five sliders that used to
 * sit here. One tap ("slept badly") rewrites the load session on the week
 * already on screen. The note is what they send a training partner — a
 * WhatsApp message, not a product card.
 */
export function ExampleFeel({
  copy,
  week,
  headline,
  url,
}: {
  copy: Copy;
  week: RealizedWeek;
  headline: string;
  url?: string;
}) {
  const t = copy.examplePlanner;
  const sessions = copy.tools.plan.sessions;
  const dayNames = copy.tools.week.days;
  const minutesLabel = (n: number) => fillTemplate(copy.tools.athlete.today.minutes, { n });
  const [wrecked, setWrecked] = useState(false);
  const [copied, setCopied] = useState(false);

  const note = useMemo(
    () =>
      weekNoteFrom({
        week,
        wrecked,
        headline,
        finish: t.finish,
        why: "",
        days: dayNames,
        sessions,
        minutesLabel,
        url,
      }),
    [week, wrecked, headline, t.finish, dayNames, sessions, url],
  );

  // `weekNoteFrom` only writes the "was → now" line when the session key
  // actually changed. The screen used to render it on `wrecked` alone, so the
  // page and the note a stranger copies could disagree about whether anything
  // moved. One condition, read by both.
  const changed =
    wrecked &&
    note.index >= 0 &&
    !!note.written &&
    !!note.shown &&
    note.written.key !== note.shown.key;

  const why =
    changed && note.written && note.shown
      ? fillTemplate(t.whyWrecked, {
          day: dayNames[note.index] ?? "",
          from: sessions[note.written.key],
          to: sessions[note.shown.key],
        })
      : "";

  const text = useMemo(
    () =>
      weekNoteFrom({
        week,
        wrecked,
        headline,
        finish: t.finish,
        why,
        days: dayNames,
        sessions,
        minutesLabel,
        url,
      }).text,
    [week, wrecked, headline, t.finish, why, dayNames, sessions, url],
  );

  async function copyNote() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-8 border-t border-line pt-6">
      <p className="text-sm font-medium text-ink">{t.feelTitle}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={!wrecked}
          onClick={() => setWrecked(false)}
          className={cn(
            "min-h-11 rounded-lg border px-4 text-sm font-medium",
            !wrecked
              ? "border-ridge bg-ridge text-paper"
              : "border-line bg-card text-ink hover:bg-paper-warm",
          )}
        >
          {t.feelAsWritten}
        </button>
        <button
          type="button"
          aria-pressed={wrecked}
          onClick={() => setWrecked(true)}
          className={cn(
            "min-h-11 rounded-lg border px-4 text-sm font-medium",
            wrecked
              ? "border-ridge bg-ridge text-paper"
              : "border-line bg-card text-ink hover:bg-paper-warm",
          )}
        >
          {t.feelWrecked}
        </button>
      </div>

      {why ? <p className="mt-4 text-sm leading-relaxed text-ink">{why}</p> : null}

      {changed ? (
        <p className="mt-3 text-sm text-ink-muted">
          <span className="text-ink-soft line-through">
            {dayNames[note.index]} · {note.written ? sessions[note.written.key] : ""}
            {note.written?.minutes ? ` · ${minutesLabel(note.written.minutes)}` : ""}
          </span>
          {" → "}
          <span className="font-medium text-ink">
            {note.shown ? sessions[note.shown.key] : ""}
            {note.shown?.minutes ? ` · ${minutesLabel(note.shown.minutes)}` : ""}
          </span>
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => void copyNote()}
        className="mt-5 inline-flex min-h-11 items-center rounded-lg border border-line bg-card px-4 text-sm font-medium text-ink hover:bg-paper-warm"
      >
        {copied ? t.copied : t.copyWeek}
      </button>
    </div>
  );
}
