import { emptyProfile, type AthleteProfile } from "./athlete.ts";
import { suggestedPeakOn, todayIso } from "./rolling-plan.ts";

/**
 * Shared QA login for Ridgework testers and other AIs.
 * Always has desk access, even after billing turns on. Not a customer account.
 *
 * The password is deliberately NOT here. This repository is public, so a
 * literal in this file is a published credential into production — the one
 * that used to sit on this line has been readable on GitHub since the first
 * commit and can never be unpublished, which is why the live account no longer
 * uses it. The password lives in the TEST_ACCOUNT_PASSWORD environment
 * variable, is handed to whoever runs the bot out of band, and is read only by
 * scripts/seed-test-account.mjs. Do not add it back.
 */
export const TEST_ACCOUNT = {
  email: "tester@ridgework.org",
  name: "Ridgework Tester",
} as const;

/** Owner Google login. Never hits Polar. */
export const OWNER_EMAIL = "arttu.pylkkanen@gmail.com";

export function isTestAccountEmail(email: string | null | undefined): boolean {
  return (email ?? "").trim().toLowerCase() === TEST_ACCOUNT.email;
}

export function isBillingExemptEmail(email: string | null | undefined): boolean {
  const v = (email ?? "").trim().toLowerCase();
  return v === TEST_ACCOUNT.email || v === OWNER_EMAIL;
}

export function sampleTesterProfile(now = todayIso()): AthleteProfile {
  return emptyProfile({
    sport: "running",
    discipline: "ultra",
    goal: "fifty",
    peakOn: suggestedPeakOn("fifty", now),
    eventName: "QA 50 km",
    weeklyHours: "h5_8",
    longest: "m150",
    experience: "intermediate",
    availableDays: [true, true, true, true, true, true, true],
    terrain: "mountain",
    equipment: ["trailShoes", "poles", "pack"],
    constraints: [],
    limitations: "",
    units: "km",
    completedAt: `${now}T08:00:00.000Z`,
  });
}
