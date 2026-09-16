import { engagement, funnel, notes, type OwnerCounts, type FunnelStep } from "@/lib/owner/metrics";
import type { OwnerReport } from "@/lib/owner/metrics-server";

/**
 * Owner-only. English only on purpose: this is a tool for one person, not
 * product surface, and putting it through the four-locale content files would
 * make every future metric a translation task.
 */

const STEP_LABEL: Record<FunnelStep["id"], string> = {
  signups: "Signed up",
  verified: "Confirmed their address",
  onboarded: "Finished onboarding",
  enrolled: "Started a programme",
  returnedAfterWeek1: "Came back after week one",
};

const NOTE_TEXT: Record<string, string> = {
  noSignups: "No accounts yet. Every number below is waiting on the first one.",
  noSessionsLogged:
    "Nobody has marked a session done or missed. The adherence findings, the passport and every retention number are built on that, so all of it is currently inert.",
  fewMinutes:
    "Almost nobody types a duration when marking a session done. The 'done but short' finding needs that number, so it will not fire.",
  lowVerification:
    "Most signups never confirm their address. Check that Resend is delivering and not landing in spam — this is invisible from inside the app.",
  onboardingDropoff:
    "People confirm their address and then do not finish onboarding. That is the step to watch.",
};

function pct(value: number | null): string {
  return value === null ? "—" : `${value}%`;
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-line bg-card px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-ink">{value}</p>
      {hint ? <p className="mt-0.5 text-xs text-ink-soft">{hint}</p> : null}
    </div>
  );
}

export function OwnerPage({ report }: { report: OwnerReport | null }) {
  if (!report) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20">
        <h1 className="font-display text-2xl font-semibold text-ink">Not available</h1>
        <p className="mt-3 text-ink-muted">
          This page is for the account that owns Ridgework. Sign in with that address.
        </p>
      </main>
    );
  }

  const c: OwnerCounts = report.counts;
  const steps = funnel(c);
  const e = engagement(c);
  const found = notes(c);

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">Owner</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
        What is actually happening
      </h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Counted from Ridgework&apos;s own tables. No third-party analytics, no cookie, no event
        pipeline — nothing here tracks anyone.
      </p>

      {found.length > 0 ? (
        <ul className="mt-8 space-y-2">
          {found.map((note) => (
            <li
              key={note.id}
              className={
                note.severity === "watch"
                  ? "rounded-xl border border-accent bg-paper-warm/70 px-4 py-3 text-sm leading-relaxed text-ink"
                  : "rounded-xl border border-line bg-card px-4 py-3 text-sm leading-relaxed text-ink-muted"
              }
            >
              {NOTE_TEXT[note.id] ?? note.id}
            </li>
          ))}
        </ul>
      ) : null}

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">
        From arriving to staying
      </h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead className="bg-paper-warm/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-2 font-medium">Step</th>
              <th className="px-4 py-2 text-right font-medium">People</th>
              <th className="px-4 py-2 text-right font-medium">Of previous</th>
              <th className="px-4 py-2 text-right font-medium">Of signups</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step) => (
              <tr key={step.id} className="border-t border-line">
                <td className="px-4 py-2.5 text-ink">{STEP_LABEL[step.id]}</td>
                <td className="px-4 py-2.5 text-right font-medium text-ink">{step.count}</td>
                <td className="px-4 py-2.5 text-right text-ink-muted">{pct(step.ofPrevious)}</td>
                <td className="px-4 py-2.5 text-right text-ink-muted">{pct(step.ofSignups)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-ink-soft">
        &ldquo;Of previous&rdquo; is the one to read. A step can keep 90% of the people who reach it
        and still look poor against the top of the funnel.
      </p>

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">Are they training</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Sessions resolved" value={String(e.logged)} hint="done or missed" />
        <Stat label="Done" value={pct(e.doneShare)} hint={`${c.sessionsDone} of ${e.logged}`} />
        <Stat
          label="With a duration"
          value={pct(e.minuteShare)}
          hint={`${c.sessionsWithMinutes} of ${c.sessionsDone} done`}
        />
        <Stat label="Daily check-ins" value={String(c.dailyCheckins)} />
        <Stat label="Weekly check-ins" value={String(c.weeklyCheckins)} />
        <Stat label="Calendar feeds" value={String(c.calendarFeeds)} />
        <Stat label="intervals.icu links" value={String(c.intervalsLinks)} />
        <Stat label="Signups, 7d / 30d" value={`${c.signups7d} / ${c.signups30d}`} />
      </div>

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">Who turned up</h2>
      {report.recent.length === 0 ? (
        <p className="mt-3 text-ink-muted">Nobody yet.</p>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-paper-warm/60 text-left text-xs uppercase tracking-wider text-ink-soft">
              <tr>
                <th className="px-4 py-2 font-medium">Address</th>
                <th className="px-4 py-2 font-medium">Signed up</th>
                <th className="px-4 py-2 font-medium">Confirmed</th>
                <th className="px-4 py-2 font-medium">Onboarded</th>
              </tr>
            </thead>
            <tbody>
              {report.recent.map((row) => (
                <tr key={`${row.email}-${row.createdAt}`} className="border-t border-line">
                  <td className="px-4 py-2.5 text-ink">{row.email}</td>
                  <td className="px-4 py-2.5 text-ink-muted">{row.createdAt.slice(0, 10)}</td>
                  <td className="px-4 py-2.5 text-ink-muted">{row.verified ? "yes" : "no"}</td>
                  <td className="px-4 py-2.5 text-ink-muted">{row.onboarded ? "yes" : "no"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-8 text-xs text-ink-soft">Read at {report.generatedAt.slice(0, 19)}Z</p>
    </main>
  );
}
