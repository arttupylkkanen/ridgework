import { emptyProfile, type AthleteProfile } from "./athlete.ts";
import { suggestedPeakOn, todayIso } from "./rolling-plan.ts";

/**
 * Shared QA login for Ridgework testers and other AIs.
 * Always has desk access, even after billing turns on. Not a customer account.
 */
export const TEST_ACCOUNT = {
  email: "tester@ridgework.org",
  password: "TrailTest77!",
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
