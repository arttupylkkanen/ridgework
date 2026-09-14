import { createFileRoute } from "@tanstack/react-router";
import { validateEvent, WebhookVerificationError } from "@polar-sh/sdk/webhooks";
import { polarWebhookSecret } from "@/lib/billing";
import { getSql } from "@/lib/db";
import { markMembershipActive, markMembershipCanceled } from "@/lib/polar";

export const Route = createFileRoute("/api/polar/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = polarWebhookSecret();
        if (!secret) {
          return new Response("webhook secret missing", { status: 503 });
        }

        const body = await request.text();
        const headers = Object.fromEntries(request.headers.entries());

        let event: ReturnType<typeof validateEvent>;
        try {
          event = validateEvent(body, headers, secret);
        } catch (err) {
          if (err instanceof WebhookVerificationError) {
            return new Response("invalid signature", { status: 403 });
          }
          throw err;
        }

        const sql = await getSql();
        const type = event.type;
        const data = event.data as {
          id?: string;
          status?: string;
          cancelAtPeriodEnd?: boolean;
          cancel_at_period_end?: boolean;
          metadata?: { user_id?: string };
          customer_id?: string;
          customerId?: string;
          externalCustomerId?: string;
        };
        const userId = data.metadata?.user_id ?? data.externalCustomerId;
        const polarCustomer = data.customerId ?? data.customer_id ?? null;
        const polarSub =
          type.startsWith("subscription.") && data.id ? data.id : null;

        if (userId) {
          await sql.query(
            `insert into billing_events (user_id, kind, stripe_id, payload)
             values ($1, $2, $3, $4::jsonb)`,
            [userId, type, data.id ?? null, body],
          );
        }

        const ending = Boolean(data.cancelAtPeriodEnd ?? data.cancel_at_period_end);
        if (
          userId &&
          !ending &&
          (type === "subscription.created" ||
            type === "subscription.active" ||
            type === "order.created" ||
            type === "subscription.updated")
        ) {
          const polarStatus = data.status === "trialing" || type === "subscription.created"
            ? data.status === "active"
              ? "active"
              : "trialing"
            : "active";
          const status =
            type === "order.created" || type === "subscription.active" || data.status === "active"
              ? "active"
              : polarStatus;
          await markMembershipActive({
            userId,
            status: status === "trialing" ? "trialing" : "active",
            polarCustomer,
            polarSubscription: polarSub,
          });
        }

        if (userId && ending && type === "subscription.updated") {
          await markMembershipCanceled(userId, true);
        }

        if (userId && (type === "subscription.revoked" || type === "subscription.canceled")) {
          await sql.query(
            `update memberships
                set billing_status = 'canceled', updated_at = now()
              where user_id = $1`,
            [userId],
          );
          await sql.query(
            `update enrollments
                set billing_status = 'canceled',
                    updated_at = now()
              where user_id = $1`,
            [userId],
          );
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});