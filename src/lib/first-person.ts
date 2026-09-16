import { emptyProfile, type AthleteProfile } from "./athlete.ts";
import type { ObjectiveId } from "./rolling-plan.ts";

/**
 * The person the public example is written for: time-poor, first 50 km or
 * first 20 km trail race, wants to finish well rather than hit a time.
 *
 * Deliberately not `sampleTesterProfile`, which is an intermediate on 5-8 hours
 * a week with a 150-minute longest outing. Showing a stranger that week answers
 * a question they did not ask — the weeks it writes assume a base they do not
 * have, so the plan looks like somebody else's.
 *
 * Three to five hours a week and a 90-minute longest outing is the honest
 * starting point for a first ultra, and it is what makes the engine produce a
 * week this reader recognises.
 */
export const FIRST_OBJECTIVES = ["fifty", "trail20"] as const satisfies readonly ObjectiveId[];
export type FirstObjective = (typeof FIRST_OBJECTIVES)[number];

export function firstPersonProfile(goal: FirstObjective, peakOn: string): AthleteProfile {
  return emptyProfile({
    sport: "running",
    discipline: "ultra",
    goal,
    peakOn,
    weeklyHours: "h3_5",
    longest: "m90",
    experience: "beginner",
    // Five days, not seven. A seven-day week is the tell that a plan was
    // written for somebody with nothing else on.
    availableDays: [true, true, true, true, false, true, false],
    terrain: "rolling",
    equipment: ["trailShoes"],
    constraints: [],
    limitations: "",
    units: "km",
    completedAt: `${peakOn}T08:00:00.000Z`,
  });
}
