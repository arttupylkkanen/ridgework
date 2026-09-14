import type { Copy } from "@/content/types";

export function LegalPage({
  title,
  updated,
  body,
}: {
  copy: Copy;
  title: string;
  updated: string;
  body: string[];
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-ink-soft">{updated}</p>
      <div className="mt-8 space-y-6 leading-relaxed text-ink-muted">
        {body.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
    </article>
  );
}
