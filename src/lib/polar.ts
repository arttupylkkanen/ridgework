import { Polar } from "@polar-sh/sdk";
import {
  POLAR_FOUNDING_PRODUCT_ID,
  POLAR_SUCCESS_URL,
  polarAccessToken,
  polarCheckoutFallbackUrl,
  polarServer,
} from "@/lib/billing";
import { getSql } from "@/lib/db";

export function polarClient(): Polar | null {
  const token = polarAccessToken();
  if (!token) return null;
  return new Polar({ accessToken: token, server: polarServer() });
}

export async function markMembershipActive(input: {
  userId: string;
  status?: "active" | "trialing";
  polarCustomer?: string | null;
  polarSubscription?: string | null;
}) {
  const sql = await getSql();
  const status = input.status ?? "active";
  await sql.query(
    `insert into memberships (user_id, billing_status, polar_customer_id, polar_subscription_id, updated_at)
     values ($1, $2, $3, $4, now())
     on conflict (user_id) do update set
       billing_status = excluded.billing_status,
       polar_customer_id = coalesce(excluded.polar_customer_id, memberships.polar_customer_id),
       polar_subscription_id = coalesce(excluded.polar_subscription_id, memberships.polar_subscription_id),
       updated_at = now()`,
    [input.userId, status, input.polarCustomer ?? null, input.polarSubscription ?? null],
  );
  await sql.query(
    `update enrollments
        set billing_status = $2,
            polar_customer_id = coalesce($3, polar_customer_id),
            polar_subscription_id = coalesce($4, polar_subscription_id),
            updated_at = now()
      where user_id = $1`,
    [input.userId, status, input.polarCustomer ?? null, input.polarSubscription ?? null],
  );
}

function polarMessage(err: unknown): string {
  if (!err || typeof err !== "object") return "Polar checkout failed.";
  const e = err as { message?: string; body?: string; statusCode?: number };
  if (typeof e.body === "string" && e.body.trim()) {
    try {
      const parsed = JSON.parse(e.body) as { detail?: unknown; error?: string };
      if (typeof parsed.detail === "string") return parsed.detail;
      if (Array.isArray(parsed.detail)) {
        const first = parsed.detail[0] as { msg?: string } | undefined;
        if (first?.msg) return first.msg;
      }
      if (parsed.error) return parsed.error;
    } catch {
      /* use message */
    }
  }
  return e.message?.trim() || "Polar checkout failed.";
}

function withEmail(base: string, email: string, _userId: string): string {
  try {
    const url = new URL(base);
    if (email) url.searchParams.set("customer_email", email);
    return url.toString();
  } catch {
    return base;
  }
}

export async function createFoundingCheckout(input: {
  userId: string;
  email: string;
  name?: string;
}): Promise<{ mode: "test" | "polar"; url: string | null; id?: string; error?: string }> {
  const fallback = polarCheckoutFallbackUrl();
  const polar = polarClient();
  if (!polar) {
    if (fallback) {
      return { mode: "polar", url: withEmail(fallback, input.email, input.userId) };
    }
    return {
      mode: "test",
      url: null,
      error: "Polar checkout link is missing.",
    };
  }

  const base = {
    products: [POLAR_FOUNDING_PRODUCT_ID],
    successUrl: POLAR_SUCCESS_URL,
    returnUrl: "https://ridgework.org/app",
    customerEmail: input.email || undefined,
    customerName: input.name || undefined,
    externalCustomerId: input.userId,
    metadata: { user_id: input.userId },
    allowTrial: true,
  };

  const attempts: Array<typeof base & { trialInterval?: "day"; trialIntervalCount?: number }> = [
    { ...base, trialInterval: "day", trialIntervalCount: 14 },
    base,
  ];

  let lastError = "Polar checkout failed.";
  for (const payload of attempts) {
    try {
      const checkout = await polar.checkouts.create(payload);
      if (checkout.url) return { mode: "polar", url: checkout.url, id: checkout.id };
      lastError = "Polar returned a checkout without a URL.";
    } catch (err) {
      lastError = polarMessage(err);
      console.error("[polar] checkout.create", lastError, err);
    }
  }

  if (fallback) {
    return { mode: "polar", url: withEmail(fallback, input.email, input.userId), error: lastError };
  }
  return { mode: "polar", url: null, error: lastError };
}

export async function confirmFoundingCheckout(checkoutId: string, userId: string): Promise<boolean> {
  const polar = polarClient();
  if (!polar) {
    // Checkout-link success URL only fires after Polar took the card.
    await markMembershipActive({
      userId,
      polarCustomer: null,
      polarSubscription: checkoutId,
      status: "trialing",
    });
    return true;
  }
  try {
    const checkout = await polar.checkouts.get({ id: checkoutId });
    const paid = checkout.status === "succeeded" || checkout.status === "confirmed";
    if (!paid) return false;
    const customer =
      typeof checkout.customerId === "string"
        ? checkout.customerId
        : typeof (checkout as { customer_id?: string }).customer_id === "string"
          ? (checkout as { customer_id?: string }).customer_id
          : null;
    const subscription =
      typeof (checkout as { subscriptionId?: string }).subscriptionId === "string"
        ? (checkout as { subscriptionId?: string }).subscriptionId
        : null;
    await markMembershipActive({
      userId,
      polarCustomer: customer ?? null,
      polarSubscription: subscription ?? checkoutId,
      status: "trialing",
    });
    return true;
  } catch (err) {
    console.error("[polar] checkout.get", polarMessage(err), err);
    await markMembershipActive({
      userId,
      polarCustomer: null,
      polarSubscription: checkoutId,
      status: "trialing",
    });
    return true;
  }
}

export async function markMembershipCanceled(userId: string, scheduled: boolean) {
  const sql = await getSql();
  const status = scheduled ? "canceling" : "canceled";
  await sql.query(
    `insert into memberships (user_id, billing_status, updated_at)
     values ($1, $2, now())
     on conflict (user_id) do update set billing_status = $2, updated_at = now()`,
    [userId, status],
  );
  await sql.query(
    `update enrollments set billing_status = $2, updated_at = now() where user_id = $1`,
    [userId, status],
  );
}

type PolarRow = {
  polar_customer_id: string | null;
  polar_subscription_id: string | null;
  billing_status: string | null;
};

async function membershipRow(userId: string): Promise<PolarRow | null> {
  const sql = await getSql();
  const rows = await sql<PolarRow>`
    select polar_customer_id, polar_subscription_id, billing_status
      from memberships where user_id = ${userId} limit 1
  `;
  return rows[0] ?? null;
}

async function findSubscription(userId: string, storedId?: string | null) {
  const polar = polarClient();
  if (!polar) return null;
  if (storedId) {
    try {
      return await polar.subscriptions.get({ id: storedId });
    } catch {
      /* fall through to list */
    }
  }
  const pages = await polar.subscriptions.list({ externalCustomerId: userId });
  for await (const page of pages) {
    const items = page.result.items ?? [];
    const live = items.find((s) => s.status === "trialing" || s.status === "active");
    if (live) return live;
  }
  return null;
}

export async function cancelFoundingSubscription(userId: string): Promise<{ ok: boolean; immediate: boolean }> {
  const polar = polarClient();
  if (!polar) return { ok: false, immediate: false };
  const row = await membershipRow(userId);
  const sub = await findSubscription(userId, row?.polar_subscription_id);
  if (!sub) return { ok: false, immediate: false };

  if (sub.status === "trialing") {
    await polar.subscriptions.revoke({ id: sub.id });
    await markMembershipCanceled(userId, false);
    return { ok: true, immediate: true };
  }

  await polar.subscriptions.update({
    id: sub.id,
    subscriptionUpdate: { cancelAtPeriodEnd: true },
  });
  await markMembershipCanceled(userId, true);
  return { ok: true, immediate: false };
}

export async function createBillingPortal(userId: string): Promise<string | null> {
  const polar = polarClient();
  if (!polar) return null;
  const row = await membershipRow(userId);
  const session = row?.polar_customer_id
    ? await polar.customerSessions.create({
        customerId: row.polar_customer_id,
        returnUrl: "https://ridgework.org/app",
      })
    : await polar.customerSessions.create({
        externalCustomerId: userId,
        returnUrl: "https://ridgework.org/app",
      });
  return session.customerPortalUrl ?? null;
}
