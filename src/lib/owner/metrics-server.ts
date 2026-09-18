/**
 * Owner-only funnel counts, read straight from Ridgework's own tables.
 *
 * Named `-server.ts`, not `.server.ts`: the import-protection plugin *mocks*
 * `.server.ts` modules in the client bundle, and a mocked server function
 * returns a truthy object, so the page would render invented numbers instead
 * of failing. That mistake has already cost this codebase one broken panel.
 *
 * Every query is an aggregate over the whole table — there is no per-user
 * filtering to get wrong, which is exactly why the gate below has to be the
 * strict part.
 */
import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { OWNER_EMAIL } from "@/lib/test-account";
import { EMPTY_COUNTS, type OwnerCounts } from "./metrics";

export type RecentSignup = {
  email: string;
  createdAt: string;
  verified: boolean;
  onboarded: boolean;
};

export type OwnerReport = {
  counts: OwnerCounts;
  recent: RecentSignup[];
  generatedAt: string;
};

type CountRow = { n: string | number };

function toNumber(value: string | number | null | undefined): number {
  const n = typeof value === "string" ? Number.parseInt(value, 10) : (value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

/**
 * The gate. Read the caller's address from the database rather than trusting
 * anything that travelled with the request, and compare it to the single
 * address allowed to see aggregate data about other people.
 */
async function assertOwner(userId: string): Promise<void> {
  const sql = await getSql();
  const rows = await sql<{ email: string | null }>`
    select email from "user" where id = ${userId} limit 1
  `;
  const email = (rows[0]?.email ?? "").trim().toLowerCase();
  if (!email || email !== OWNER_EMAIL.trim().toLowerCase()) {
    throw new Error("not_owner");
  }
}

export const ownerReport = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<OwnerReport> => {
    await assertOwner(context.userId);
    const sql = await getSql();

    const one = async (query: Promise<CountRow[]>): Promise<number> =>
      toNumber((await query)[0]?.n);

    // Session logs live inside `enrollments.state` as a jsonb array (see the
    // note in migrations/0004), so the status counts unnest rather than join.
    const [
      signups,
      verified,
      onboarded,
      enrolled,
      returnedAfterWeek1,
      dailyCheckins,
      weeklyCheckins,
      calendarFeeds,
      intervalsLinks,
      signups7d,
      signups30d,
      foundingMembers,
      notifyConfirmed,
      notifyPending,
      weeklyOptOuts,
    ] = await Promise.all([
      one(sql<CountRow>`select count(*)::int as n from "user"`),
      one(sql<CountRow>`select count(*)::int as n from "user" where "emailVerified"`),
      one(sql<CountRow>`
        select count(*)::int as n from athlete_profiles
        where coalesce(profile->>'completedAt', '') <> ''
      `),
      one(sql<CountRow>`select count(distinct user_id)::int as n from enrollments`),
      one(sql<CountRow>`
        select count(distinct d.user_id)::int as n
        from daily_checkins d
        join "user" u on u.id = d.user_id
        where d.created_at > u."createdAt" + interval '7 days'
      `),
      one(sql<CountRow>`select count(*)::int as n from daily_checkins`),
      one(sql<CountRow>`select count(*)::int as n from checkins`),
      one(sql<CountRow>`select count(*)::int as n from calendar_feeds`),
      one(sql<CountRow>`select count(*)::int as n from intervals_links`),
      one(sql<CountRow>`
        select count(*)::int as n from "user" where "createdAt" > now() - interval '7 days'
      `),
      one(sql<CountRow>`
        select count(*)::int as n from "user" where "createdAt" > now() - interval '30 days'
      `),
      one(sql<CountRow>`select count(*)::int as n from founding_members`),
      one(sql<CountRow>`
        select count(*)::int as n from notify_list where confirmed_at is not null
      `),
      one(sql<CountRow>`select count(*)::int as n from notify_list where confirmed_at is null`),
      one(sql<CountRow>`select count(*)::int as n from weekly_notes where not enabled`),
    ]);

    const logRows = await sql<{ status: string | null; has_minutes: boolean | null; n: string }>`
      select
        log->>'status' as status,
        (log ? 'actualMinutes') as has_minutes,
        count(*)::int as n
      from enrollments e,
           lateral jsonb_array_elements(coalesce(e.state->'logs', '[]'::jsonb)) as log
      group by 1, 2
    `;
    let sessionsDone = 0;
    let sessionsMissed = 0;
    let sessionsWithMinutes = 0;
    for (const row of logRows) {
      const n = toNumber(row.n);
      if (row.status === "done") {
        sessionsDone += n;
        if (row.has_minutes) sessionsWithMinutes += n;
      } else if (row.status === "missed") {
        sessionsMissed += n;
      }
    }

    const recentRows = await sql<{
      email: string;
      created_at: string;
      verified: boolean;
      onboarded: boolean;
    }>`
      select
        u.email,
        u."createdAt"::text as created_at,
        u."emailVerified" as verified,
        (coalesce(p.profile->>'completedAt', '') <> '') as onboarded
      from "user" u
      left join athlete_profiles p on p.user_id = u.id
      order by u."createdAt" desc
      limit 25
    `;

    return {
      counts: {
        ...EMPTY_COUNTS,
        signups,
        verified,
        onboarded,
        enrolled,
        returnedAfterWeek1,
        sessionsDone,
        sessionsMissed,
        sessionsWithMinutes,
        dailyCheckins,
        weeklyCheckins,
        calendarFeeds,
        intervalsLinks,
        signups7d,
        signups30d,
        foundingMembers,
        notifyConfirmed,
        notifyPending,
        weeklyOptOuts,
      },
      recent: recentRows.map((row) => ({
        email: row.email,
        createdAt: row.created_at,
        verified: Boolean(row.verified),
        onboarded: Boolean(row.onboarded),
      })),
      generatedAt: new Date().toISOString(),
    };
  });
