/**
 * The founder's view of the funnel, shaped from raw counts.
 *
 * Deliberately not analytics. There is no third-party script, no cookie and no
 * event pipeline — every number here is a `count(*)` over tables Ridgework
 * already writes because the product needs them. That keeps the privacy policy
 * honest and means this page can never be the reason a visitor is tracked.
 *
 * Pure so the arithmetic is testable without a database, and so the wording
 * lives in the component rather than in the query layer.
 */

export type OwnerCounts = {
  /** Rows in `user`. */
  signups: number;
  /** …of which confirmed their address. */
  verified: number;
  /** …of which finished onboarding (`profile.completedAt` is set). */
  onboarded: number;
  /** …of which have at least one enrollment. */
  enrolled: number;
  /** …of which touched the app more than seven days after signing up. */
  returnedAfterWeek1: number;

  /** Session logs across every enrollment, by status. */
  sessionsDone: number;
  sessionsMissed: number;
  /** …of the done ones, how many carry a duration the athlete typed. */
  sessionsWithMinutes: number;

  /** Readiness answers: one per day, and the weekly check-in. */
  dailyCheckins: number;
  weeklyCheckins: number;

  /** Integrations actually connected. */
  calendarFeeds: number;
  intervalsLinks: number;

  /** Signups in the last 7 and 30 days. */
  signups7d: number;
  signups30d: number;
};

export const EMPTY_COUNTS: OwnerCounts = {
  signups: 0,
  verified: 0,
  onboarded: 0,
  enrolled: 0,
  returnedAfterWeek1: 0,
  sessionsDone: 0,
  sessionsMissed: 0,
  sessionsWithMinutes: 0,
  dailyCheckins: 0,
  weeklyCheckins: 0,
  calendarFeeds: 0,
  intervalsLinks: 0,
  signups7d: 0,
  signups30d: 0,
};

export type FunnelStep = {
  id: "signups" | "verified" | "onboarded" | "enrolled" | "returnedAfterWeek1";
  count: number;
  /** Share of the step above, or null for the first step. */
  ofPrevious: number | null;
  /** Share of signups. */
  ofSignups: number | null;
};

/** A share as a whole percent, or null when the denominator is zero. */
export function share(part: number, whole: number): number | null {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) return null;
  return Math.round((part / whole) * 100);
}

/**
 * The five steps between arriving and coming back.
 *
 * The step that matters is whichever one loses the most people, which is why
 * `ofPrevious` is reported next to `ofSignups`: a stage that keeps 90% of a
 * tiny number still looks fine against the top of the funnel.
 */
export function funnel(counts: OwnerCounts): FunnelStep[] {
  const order: FunnelStep["id"][] = [
    "signups",
    "verified",
    "onboarded",
    "enrolled",
    "returnedAfterWeek1",
  ];
  return order.map((id, i) => {
    const count = counts[id];
    const previous = i === 0 ? null : counts[order[i - 1]!];
    return {
      id,
      count,
      ofPrevious: previous === null ? null : share(count, previous),
      ofSignups: i === 0 ? null : share(count, counts.signups),
    };
  });
}

export type Engagement = {
  /** Sessions resolved either way. */
  logged: number;
  /** Share of resolved sessions that were done. */
  doneShare: number | null;
  /** Share of done sessions carrying a typed duration. */
  minuteShare: number | null;
};

export function engagement(counts: OwnerCounts): Engagement {
  const logged = counts.sessionsDone + counts.sessionsMissed;
  return {
    logged,
    doneShare: share(counts.sessionsDone, logged),
    minuteShare: share(counts.sessionsWithMinutes, counts.sessionsDone),
  };
}

export type Note = { id: string; severity: "watch" | "info" };

/**
 * The few statements worth making out loud, so the page says something rather
 * than only counting. Each one is a question the numbers can answer and a
 * founder would otherwise have to remember to ask.
 */
export function notes(counts: OwnerCounts): Note[] {
  const out: Note[] = [];
  if (counts.signups === 0) {
    out.push({ id: "noSignups", severity: "info" });
    return out;
  }
  const e = engagement(counts);
  if (e.logged === 0) {
    // Nothing downstream works without this: the adherence findings, the
    // passport and every retention number are built on logged sessions.
    out.push({ id: "noSessionsLogged", severity: "watch" });
  } else if (e.minuteShare !== null && e.minuteShare < 20) {
    out.push({ id: "fewMinutes", severity: "info" });
  }
  const verifiedShare = share(counts.verified, counts.signups);
  if (verifiedShare !== null && counts.signups >= 5 && verifiedShare < 60) {
    // Either the mail is not arriving or it is landing in spam. Both are fixable
    // and both are invisible from inside the app.
    out.push({ id: "lowVerification", severity: "watch" });
  }
  const onboardShare = share(counts.onboarded, counts.verified);
  if (onboardShare !== null && counts.verified >= 5 && onboardShare < 50) {
    out.push({ id: "onboardingDropoff", severity: "watch" });
  }
  return out;
}
