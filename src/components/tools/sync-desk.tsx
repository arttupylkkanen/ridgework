import { useEffect, useState } from "react";
import type { Copy } from "@/content/types";
import { getCalendarToken, rotateCalendarToken } from "@/lib/calendar/feed-server";
import {
  disconnectIntervals,
  getIntervalsLink,
  pushToIntervals,
  saveIntervalsLink,
} from "@/lib/intervals/push-server";

type LinkState = Awaited<ReturnType<typeof getIntervalsLink>>;

export function SyncDesk({ copy }: { copy: Copy }) {
  const t = copy.tools.sync;
  const [token, setToken] = useState<string | null>(null);
  const [link, setLink] = useState<LinkState | null>(null);
  const [athleteId, setAthleteId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getIntervalsLink().then(setLink).catch(() => undefined);
  }, []);

  const feedUrl = token
    ? `${typeof window === "undefined" ? "" : window.location.origin}/calendar/${token}.ics`
    : null;

  async function run<T>(fn: () => Promise<T>, done?: (value: T) => void) {
    setBusy(true);
    setError(null);
    setFlash(null);
    try {
      done?.(await fn());
    } catch {
      setError(t.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8" data-sync-desk="1">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-ridge">{t.kicker}</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{t.title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.lead}</p>
      </div>

      <section className="rounded-2xl border border-line bg-card p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold text-ink">{t.calendarTitle}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.calendarLead}</p>
        {feedUrl ? (
          <div className="mt-4">
            <code className="block overflow-x-auto rounded-lg border border-line bg-paper px-3 py-2.5 text-xs text-ink">
              {feedUrl}
            </code>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard?.writeText(feedUrl);
                  setFlash(t.copied);
                }}
                className="min-h-11 rounded-lg bg-ridge px-5 py-2.5 text-sm font-medium text-paper hover:bg-ridge-deep"
              >
                {t.copy}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void run(() => rotateCalendarToken(), (r) => setToken(r.token))}
                className="min-h-11 rounded-lg border border-line px-5 py-2.5 text-sm text-ink-muted hover:bg-paper-warm disabled:opacity-60"
              >
                {t.rotate}
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">{t.calendarNote}</p>
          </div>
        ) : (
          <button
            type="button"
            disabled={busy}
            onClick={() => void run(() => getCalendarToken(), (r) => setToken(r.token))}
            className="mt-4 min-h-11 rounded-lg bg-ridge px-5 py-2.5 text-sm font-medium text-paper hover:bg-ridge-deep disabled:opacity-60"
          >
            {t.calendarCta}
          </button>
        )}
      </section>

      <section className="rounded-2xl border border-line bg-card p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold text-ink">{t.intervalsTitle}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.intervalsLead}</p>

        {link?.connected ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-ink">
              {t.connectedAs} <span className="font-medium">{link.athleteId}</span>
            </p>
            {link.lastPushedAt ? (
              <p className="text-xs text-ink-soft">
                {t.lastPushed} {new Date(link.lastPushedAt).toLocaleString()}
              </p>
            ) : null}
            {link.lastError ? <p className="text-xs text-warn">{link.lastError}</p> : null}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  void run(
                    () => pushToIntervals(),
                    (r) => (r.ok ? setFlash(`${t.pushed} (${r.pushed})`) : setError(r.error)),
                  )
                }
                className="min-h-11 rounded-lg bg-ridge px-5 py-2.5 text-sm font-medium text-paper hover:bg-ridge-deep disabled:opacity-60"
              >
                {busy ? t.pushing : t.push}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  void run(
                    () => disconnectIntervals(),
                    () => setLink({ connected: false, athleteId: "", lastPushedAt: null, lastError: null }),
                  )
                }
                className="min-h-11 rounded-lg border border-line px-5 py-2.5 text-sm text-ink-muted hover:bg-paper-warm disabled:opacity-60"
              >
                {t.disconnect}
              </button>
            </div>
          </div>
        ) : (
          <form
            className="mt-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              void run(
                () => saveIntervalsLink({ data: { athleteId: athleteId.trim(), apiKey: apiKey.trim() } }),
                () => {
                  setApiKey("");
                  void getIntervalsLink().then(setLink).catch(() => undefined);
                  setFlash(t.connected);
                },
              );
            }}
          >
            <label className="block text-sm font-medium text-ink">
              {t.athleteId}
              <input
                value={athleteId}
                onChange={(e) => setAthleteId(e.target.value)}
                placeholder="i12345"
                className="mt-1 w-full max-w-xs rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
              />
            </label>
            <label className="block text-sm font-medium text-ink">
              {t.apiKey}
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1 w-full max-w-md rounded-lg border border-line bg-paper px-3 py-2.5 text-sm"
              />
            </label>
            <p className="text-xs leading-relaxed text-ink-soft">{t.apiKeyHint}</p>
            <button
              type="submit"
              disabled={busy || !athleteId.trim() || !apiKey.trim()}
              className="min-h-11 rounded-lg bg-ridge px-5 py-2.5 text-sm font-medium text-paper hover:bg-ridge-deep disabled:opacity-60"
            >
              {t.connect}
            </button>
          </form>
        )}
        <p className="mt-4 text-xs leading-relaxed text-ink-soft">{t.intervalsNote}</p>
      </section>

      {flash ? <p className="text-sm text-ridge">{flash}</p> : null}
      {error ? <p className="text-sm text-warn">{error}</p> : null}
    </div>
  );
}
