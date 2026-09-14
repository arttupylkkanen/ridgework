import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { canCharge } from "@/lib/billing";
import { getSql } from "@/lib/db";
import { evaluateMembership, type Membership } from "@/lib/membership";
import { confirmFoundingCheckout } from "@/lib/polar";

type UserRow = { email: string; createdAt: string };
type StatusRow = { billing_status: string; polar_customer_id?: string | null; polar_subscription_id?: string | null };

export const getMembership = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<Membership> => {
    const sql = await getSql();
    const users = await sql<UserRow>`
      select email, "createdAt" from "user" where id = ${context.userId} limit 1
    `;
    const user = users[0];
    const mem = await sql<StatusRow>`
      select billing_status, polar_customer_id, polar_subscription_id
        from memberships where user_id = ${context.userId} limit 1
    `;
    const enroll = await sql<StatusRow>`
      select billing_status from enrollments
       where user_id = ${context.userId} and billing_status = 'active'
       limit 1
    `;
    const billingStatus =
      mem[0]?.billing_status === "canceling"
        ? "canceling"
        : mem[0]?.billing_status === "active" || enroll[0]?.billing_status === "active"
        ? "active"
        : mem[0]?.billing_status === "trialing" || enroll[0]?.billing_status === "trialing"
          ? "trialing"
          : mem[0]?.billing_status ?? null;
    return evaluateMembership({
      email: user?.email ?? null,
      createdAt: user?.createdAt ?? new Date().toISOString(),
      billingStatus,
      charging: canCharge(),
      canCancel:
        Boolean(mem[0]?.polar_customer_id || mem[0]?.polar_subscription_id) ||
        billingStatus === "trialing" ||
        billingStatus === "active" ||
        billingStatus === "canceling",
    });
  });

export const confirmMembershipCheckout = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ checkoutId: z.string().min(8).max(128) }))
  .handler(async ({ context, data }) => {
    const ok = await confirmFoundingCheckout(data.checkoutId, context.userId);
    return { ok };
  });
