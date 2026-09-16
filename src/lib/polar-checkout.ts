import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { CHECKOUT_OPEN, billingPublicState } from "@/lib/billing";
import { createFoundingCheckout, cancelFoundingSubscription, createBillingPortal } from "@/lib/polar";

export const getBillingState = createServerFn({ method: "GET" }).handler(async () => {
  return billingPublicState();
});

export const startFoundingCheckout = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    // Refused server-side, not just hidden in the UI: no card can be taken
    // before the company is registered.
    if (!CHECKOUT_OPEN) {
      return { mode: "polar" as const, url: null as string | null, error: "checkout_closed" };
    }
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const user = await getSessionUser();
    try {
      return await createFoundingCheckout({
        userId: context.userId,
        email: user?.email ?? "",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Polar checkout failed.";
      console.error("[polar] startFoundingCheckout", message);
      return { mode: "polar" as const, url: null as string | null, error: message };
    }
  });

export const cancelMembership = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return cancelFoundingSubscription(context.userId);
  });

export const startBillingPortal = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const url = await createBillingPortal(context.userId);
    return { url };
  });