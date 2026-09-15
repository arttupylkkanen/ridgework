import { isBillingExemptEmail } from "./test-account.ts";

/**
 * Polar is the merchant of record. New accounts add a card at Polar checkout.
 * Polar collects the card, charges €0 for 14 days, then €5/month unless cancelled.
 * tester@ridgework.org and the owner Google login never hit Polar.
 *
 * Polar checkout link is public (Polar dashboard → Checkout Links).
 * Do not put POLAR_ACCESS_TOKEN in the repo. Optional later: POLAR_ACCESS_TOKEN
 * and POLAR_WEBHOOK_SECRET in the host env so membership syncs via API/webhook.
 */

export const BILLING_REQUIRED = true;
export const FOUNDING_PRICE_CENTS = 900;
export const REGULAR_PRICE_CENTS = 1900;
export const FOUNDING_CURRENCY = "eur";
export const TEST_BILLING_STATUS = "trial" as const;

/**
 * Polar product: Ridgework Founding (€9/month, shown against a €19/month
 * regular-price anchor — see `copy.pricing`). The actual charged price lives
 * in Polar's own dashboard on this product; these constants are documentation,
 * not something Polar reads.
 */
export const POLAR_FOUNDING_PRODUCT_ID = "0cfe768e-74ff-44a9-a2bd-f6ee93212d44";

/** Public Polar checkout link. Card form lives on Polar. */
export const POLAR_CHECKOUT_LINK =
  "https://buy.polar.sh/polar_cl_o1UkpaNrcMif8T1L5Cd8yXqAiKSOhbiXXLxvU46B56D";

export const POLAR_SUCCESS_URL = "https://ridgework.org/app?checkout_id={CHECKOUT_ID}";

export type BillingStatus = "trial" | "active" | "past_due" | "canceled";

export function polarAccessToken(): string | null {
  const token = typeof process !== "undefined" ? process.env.POLAR_ACCESS_TOKEN?.trim() : undefined;
  return token || null;
}

export function polarWebhookSecret(): string | null {
  const secret =
    typeof process !== "undefined" ? process.env.POLAR_WEBHOOK_SECRET?.trim() : undefined;
  return secret || null;
}

export function polarCheckoutFallbackUrl(): string | null {
  const fromEnv =
    typeof process !== "undefined" ? process.env.POLAR_CHECKOUT_URL?.trim() : undefined;
  return fromEnv || POLAR_CHECKOUT_LINK;
}

export function polarServer(): "production" | "sandbox" {
  const value =
    typeof process !== "undefined" ? process.env.POLAR_SERVER?.trim().toLowerCase() : "";
  return value === "sandbox" ? "sandbox" : "production";
}

export function polarConfigured(): boolean {
  return Boolean(polarAccessToken() || polarCheckoutFallbackUrl());
}

export function canCharge(): boolean {
  return BILLING_REQUIRED && polarConfigured();
}

export function billingStatusFor(email?: string | null): BillingStatus {
  if (isBillingExemptEmail(email)) return "active";
  return "trial";
}

export function billingPublicState() {
  return {
    required: BILLING_REQUIRED,
    polarProductId: POLAR_FOUNDING_PRODUCT_ID,
    configured: polarConfigured(),
    charging: canCharge(),
  };
}
