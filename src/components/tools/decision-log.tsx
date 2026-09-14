import { useEffect, useState, type FormEvent } from "react";
import type { Copy } from "@/content/types";

type Entry = { id: string; decision: string; why: string; at: string };
const KEY = "ridgework-log-v1";

export function DecisionLog({ copy }: { copy: Copy }) {
  const t = copy.tools.log;
  const [entries, setEntries] = useState<Entry[]>([]);
  const [decision, setDecision] = useState("");
  const [why, setWhy] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setEntries(JSON.parse(raw) as Entry[]);
    } catch {
      /* ignore */
    }
  }, []);

  function persist(next: Entry[]) {
    setEntries(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!decision.trim()) return;
    persist([
      {
        id: crypto.randomUUID(),
        decision: decision.trim(),
        why: why.trim(),
        at: new Date().toISOString(),
      },
      ...entries,
    ]);
    setDecision("");
    setWhy("");
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-card p-5">
        <label className="block text-sm font-medium text-ink">
          {t.decision}
          <input
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-ink">
          {t.why}
          <textarea
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            rows={3}
            className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ridge"
          />
        </label>
        <button
          type="submit"
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-ridge px-5 py-3 text-sm font-medium text-paper hover:bg-ridge-deep"
        >
          {t.add}
        </button>
      </form>
      {entries.length === 0 ? (
        <p className="text-sm text-ink-soft">{t.empty}</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => (
            <li key={entry.id} className="rounded-2xl border border-line bg-card p-4">
              <p className="text-xs text-ink-soft">{new Date(entry.at).toLocaleString()}</p>
              <p className="mt-1 font-medium text-ink">{entry.decision}</p>
              {entry.why ? <p className="mt-1 text-sm text-ink-muted">{entry.why}</p> : null}
            </li>
          ))}
        </ul>
      )}
      {entries.length > 0 ? (
        <button
          type="button"
          onClick={() => persist([])}
          className="text-sm text-ink-soft underline-offset-2 hover:underline"
        >
          {t.clear}
        </button>
      ) : null}
    </div>
  );
}
