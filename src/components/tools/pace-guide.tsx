import type { Copy } from "@/content/types";

export function PaceGuide({ copy }: { copy: Copy }) {
  const p = copy.tools.pace;
  return (
    <section className="rounded-2xl border border-line bg-card p-5 sm:p-6" data-pace-guide="1">
      <h2 className="font-display text-xl font-semibold text-ink">{p.title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{p.lead}</p>
      <div className="mt-5 border-l-2 border-ridge pl-4">
        <p className="text-sm font-semibold text-ridge-deep">{p.talkTitle}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink">{p.talk}</p>
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-accent">{p.zonesTitle}</p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-ink-soft">
              <th className="py-2 pr-3 font-medium"> </th>
              <th className="py-2 pr-3 font-medium">{p.feelHead}</th>
              <th className="py-2 pr-3 font-medium">{p.watchHead}</th>
              <th className="py-2 font-medium">{p.noneHead}</th>
            </tr>
          </thead>
          <tbody>
            {p.rows.map((row) => (
              <tr key={row.zone} className="border-b border-line/70 align-top">
                <td className="py-3 pr-3 font-medium text-ink">{row.zone}</td>
                <td className="py-3 pr-3 text-ink-muted">{row.feel}</td>
                <td className="py-3 pr-3 text-ink-muted">{row.watch}</td>
                <td className="py-3 text-ink-muted">{row.none}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 rounded-xl border border-line bg-paper-warm/60 p-4">
        <p className="text-sm font-semibold text-ink">{p.alpineTitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.alpine}</p>
      </div>
    </section>
  );
}
