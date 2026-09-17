import { useState, type FormEvent } from "react";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { joinNotifyList } from "@/lib/notify/list-server";
import type { FirstObjective } from "@/lib/first-person";

/**
 * The only place on the public site where a stranger can leave an address
 * without inventing a password.
 *
 * It sits under the three weeks they just built, because that is the moment
 * they have something of their own on screen — and it carries those two values
 * along, so the list knows what each person was training for rather than just
 * that somebody once visited.
 *
 * No urgency, no countdown, no second ask. One message on one day, said once.
 */
export function NotifyForm({
  locale,
  copy,
  goal,
  peak,
}: {
  locale: Locale;
  copy: Copy;
  goal?: FirstObjective;
  peak?: string;
}) {
  const t = copy.notify;
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (pending) return;
    setError(null);
    setPending(true);
    try {
      const result = await joinNotifyList({ data: { email, goal, peak, locale } });
      if (result.ok) setSent(true);
      else setError(result.reason === "badEmail" ? t.badEmail : t.failed);
    } catch {
      setError(t.failed);
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <section className="rounded-2xl border border-line bg-paper-warm/60 px-6 py-8 sm:px-8">
        <p className="font-display text-lg font-semibold text-ink">{t.sentTitle}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{t.sentBody}</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-line bg-paper-warm/60 px-6 py-8 sm:px-8">
      <p className="font-display text-lg font-semibold text-ink">{t.title}</p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{t.body}</p>
      <form onSubmit={onSubmit} className="mt-6 flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1">
          <label
            htmlFor="notify-email"
            className="text-xs font-semibold uppercase tracking-wider text-ink-soft"
          >
            {t.label}
          </label>
          <input
            id="notify-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            className="mt-2 block min-h-11 w-full rounded-lg border border-line bg-card px-3 text-sm text-ink"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 shrink-0 rounded-lg bg-ridge px-5 text-sm font-medium text-paper hover:bg-ridge-deep disabled:opacity-60"
        >
          {pending ? t.pending : t.cta}
        </button>
      </form>
      {error ? <p className="mt-3 text-sm text-accent">{error}</p> : null}
    </section>
  );
}
