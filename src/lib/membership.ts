import { isBillingExemptEmail } from "./test-account.ts";

export const TRIAL_DAYS = 14;
export const MS_DAY = 86_400_000;

export type MembershipStatus = "needs_card" | "trialing" | "active" | "expired";

export type Membership = {
  status: MembershipStatus;
  trialEndsOn: string;
  daysLeft: number;
  canUseDesk: boolean;
  charging: boolean;
  canCancel: boolean;
  cancelScheduled: boolean;
};

export function trialEnd(createdAt: string | Date): Date {
  const start = new Date(createdAt).getTime();
  return new Date(start + TRIAL_DAYS * MS_DAY);
}

const OPEN_STATUSES = new Set(["active", "trialing"]);

export function evaluateMembership(input: {
  email?: string | null;
  createdAt: string | Date;
  billingStatus?: string | null;
  charging?: boolean;
  now?: Date;
  canCancel?: boolean;
}): Membership {
  const now = input.now ?? new Date();
  const end = trialEnd(input.createdAt);
  const trialEndsOn = end.toISOString().slice(0, 10);
  const charging = Boolean(input.charging);
  const canCancel = Boolean(input.canCancel);
  if (isBillingExemptEmail(input.email)) {
    return {
      status: "active",
      trialEndsOn,
      daysLeft: TRIAL_DAYS,
      canUseDesk: true,
      charging,
      canCancel: false,
      cancelScheduled: false,
    };
  }
  if (input.billingStatus === "canceling") {
    return {
      status: "active",
      trialEndsOn,
      daysLeft: 0,
      canUseDesk: true,
      charging,
      canCancel,
      cancelScheduled: true,
    };
  }
  if (OPEN_STATUSES.has(input.billingStatus ?? "")) {
    const status: MembershipStatus = input.billingStatus === "trialing" ? "trialing" : "active";
    return { status, trialEndsOn, daysLeft: 0, canUseDesk: true, charging, canCancel, cancelScheduled: false };
  }
  if (input.billingStatus === "canceled" || input.billingStatus === "expired") {
    return { status: "expired", trialEndsOn, daysLeft: 0, canUseDesk: false, charging, canCancel: false, cancelScheduled: false };
  }
  return { status: "needs_card", trialEndsOn, daysLeft: TRIAL_DAYS, canUseDesk: false, charging, canCancel: false, cancelScheduled: false };
}