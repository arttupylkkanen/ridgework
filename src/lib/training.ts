import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { billingStatusFor } from "@/lib/billing";
import { getSql } from "@/lib/db";
import {
  OBJECTIVES,
  isRollingState,
  type ObjectiveId,
  type RollingState,
} from "@/lib/rolling-plan";

export type EnrollmentRecord = {
  id: number;
  userId: string;
  objective: ObjectiveId;
  peakOn: string;
  startedOn: string;
  billingStatus: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  state: RollingState;
  updatedAt: string;
};

type EnrollmentRow = {
  id: number;
  user_id: string;
  objective: string;
  peak_on: string;
  started_on: string;
  billing_status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  state: unknown;
  updated_at: string;
};

function parseState(raw: unknown): RollingState {
  const value = typeof raw === "string" ? (JSON.parse(raw) as unknown) : raw;
  if (!isRollingState(value)) throw new Error("Invalid training state");
  return value;
}

function toRecord(row: EnrollmentRow): EnrollmentRecord {
  return {
    id: Number(row.id),
    userId: row.user_id,
    objective: row.objective as ObjectiveId,
    peakOn: String(row.peak_on).slice(0, 10),
    startedOn: String(row.started_on).slice(0, 10),
    billingStatus: row.billing_status,
    stripeCustomerId: row.stripe_customer_id,
    stripeSubscriptionId: row.stripe_subscription_id,
    state: parseState(row.state),
    updatedAt: String(row.updated_at),
  };
}

const objectiveSchema = z.enum(OBJECTIVES);

async function emailFor(userId: string): Promise<string | null> {
  const sql = await getSql();
  const rows = await sql<{ email: string }>`select email from "user" where id = ${userId} limit 1`;
  return rows[0]?.email ?? null;
}

export const listEnrollments = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<EnrollmentRow>`
      select id, user_id, objective, peak_on, started_on, billing_status,
             stripe_customer_id, stripe_subscription_id, state, updated_at
      from enrollments
      where user_id = ${context.userId}
      order by updated_at desc
    `;
    return rows.map(toRecord);
  });

export const upsertEnrollment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      objective: objectiveSchema,
      peakOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      startedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      state: z.unknown(),
    }),
  )
  .handler(async ({ context, data }) => {
    if (!isRollingState(data.state)) throw new Error("Invalid training state");
    const billing = billingStatusFor(await emailFor(context.userId));
    const sql = await getSql();
    const payload = JSON.stringify(data.state);
    const rows = await sql.query<EnrollmentRow>(
      `insert into enrollments
         (user_id, objective, peak_on, started_on, billing_status, state, updated_at)
       values ($1, $2, $3::date, $4::date, $5, $6::jsonb, now())
       on conflict (user_id, objective) do update set
         peak_on = excluded.peak_on,
         started_on = excluded.started_on,
         state = excluded.state,
         updated_at = now()
       returning id, user_id, objective, peak_on, started_on, billing_status,
                 stripe_customer_id, stripe_subscription_id, state, updated_at`,
      [context.userId, data.objective, data.peakOn, data.startedOn, billing, payload],
    );
    const row = rows[0];
    if (!row) throw new Error("Enrollment failed");
    return toRecord(row);
  });

export const saveEnrollmentState = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      objective: objectiveSchema,
      state: z.unknown(),
    }),
  )
  .handler(async ({ context, data }) => {
    if (!isRollingState(data.state)) throw new Error("Invalid training state");
    const sql = await getSql();
    const payload = JSON.stringify(data.state);
    const rows = await sql.query<EnrollmentRow>(
      `update enrollments
          set state = $1::jsonb,
              peak_on = $2::date,
              started_on = $3::date,
              updated_at = now()
        where user_id = $4 and objective = $5
        returning id, user_id, objective, peak_on, started_on, billing_status,
                  stripe_customer_id, stripe_subscription_id, state, updated_at`,
      [
        payload,
        data.state.peakOn,
        data.state.startedOn,
        context.userId,
        data.objective,
      ],
    );
    const row = rows[0];
    if (!row) {
      const created = await sql.query<EnrollmentRow>(
        `insert into enrollments
           (user_id, objective, peak_on, started_on, billing_status, state, updated_at)
         values ($1, $2, $3::date, $4::date, $5, $6::jsonb, now())
         returning id, user_id, objective, peak_on, started_on, billing_status,
                   stripe_customer_id, stripe_subscription_id, state, updated_at`,
        [
          context.userId,
          data.objective,
          data.state.peakOn,
          data.state.startedOn,
          billingStatusFor(await emailFor(context.userId)),
          payload,
        ],
      );
      if (!created[0]) throw new Error("Save failed");
      return toRecord(created[0]);
    }
    return toRecord(row);
  });
