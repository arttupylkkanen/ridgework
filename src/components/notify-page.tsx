import { useEffect, useState } from "react";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { HomeLink } from "./app-link";
import { confirmNotify, leaveNotify, type TokenOutcome } from "@/lib/notify/list-server";

type State = { kind: "working" } | { kind: "done"; outcome: TokenOutcome; token: string | null };

/**
 * Where the confirmation mail lands. It does one of two things depending on
 * which parameter the link carried, and offers the other one afterwards, so
 * somebody who confirms and immediately changes their mind never has to find
 * the older message to get back off.
 */
export function NotifyPage({
  locale,
  copy,
  confirm,
  leave,
}: {
  locale: Locale;
  copy: Copy;
  confirm?: string;
  leave?: string;
}) {
  const t = copy.notify;
  const [state, setState] = useState<State>({ kind: "working" });

  useEffect(() => {
    let cancelled = false;
    const run = async (): Promise<{ outcome: TokenOutcome; token: string | null }> => {
      if (leave) return { outcome: await leaveNotify({ data: { token: leave } }), token: null };
      if (confirm) {
        return { outcome: await confirmNotify({ data: { token: confirm } }), token: confirm };
      }
      return { outcome: "unknown", token: null };
    };
    void run()
      .then((r) => {
        if (!cancelled) setState({ kind: "done", ...r });
      })
      .catch(() => {
        if (!cancelled) setState({ kind: "done", outcome: "unknown", token: null });
      });
    return () => {
      cancelled = true;
    };
  }, [confirm, leave]);

  const said =
    state.kind === "working"
      ? null
      : state.outcome === "confirmed"
        ? { title: t.confirmedTitle, body: t.confirmedBody }
        : state.outcome === "left"
          ? { title: t.leftTitle, body: t.leftBody }
          : { title: t.unknownTitle, body: t.unknownBody };

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <HomeLink locale={locale} className="text-sm text-ink-muted hover:text-ink">
        {t.back}
      </HomeLink>
      {said ? (
        <>
          <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight text-ink">
            {said.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">{said.body}</p>
          {state.kind === "done" && state.outcome === "confirmed" && state.token ? (
            <button
              type="button"
              onClick={() => {
                const token = state.token;
                if (!token) return;
                setState({ kind: "working" });
                void leaveNotify({ data: { token } })
                  .then((outcome) => setState({ kind: "done", outcome, token: null }))
                  .catch(() => setState({ kind: "done", outcome: "unknown", token: null }));
              }}
              className="mt-8 min-h-11 rounded-lg border border-line bg-card px-5 text-sm font-medium text-ink hover:bg-paper-warm"
            >
              {t.leaveCta}
            </button>
          ) : null}
        </>
      ) : (
        <p className="mt-8 text-base text-ink-muted">{t.pending}</p>
      )}
    </article>
  );
}
