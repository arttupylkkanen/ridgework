import { emptyProfile, type AthleteProfile } from "./athlete.ts";
import type { ObjectiveId } from "./rolling-plan.ts";

/**
 * The person the public site is written for: time-poor, first 50 km or first
 * 20 km trail, or no race yet. Finish well rather than hit a time.
 *
 * Deliberately not `sampleTesterProfile`, which is an intermediate on 5–8 hours
 * a week with a 150-minute longest outing. Showing a stranger that week answers
 * a question they did not ask.
 *
 * Three to five hours and a 90-minute longest is the honest start for a first
 * ultra. Easy base, with no race, starts lower: under three hours, longest
 * about an hour — the occasional sweaty jog, not someone already training.
 */
export const FIRST_OBJECTIVES = ["fifty", "trail20", "engine"] as const satisfies readonly ObjectiveId[];
export type FirstObjective = (typeof FIRST_OBJECTIVES)[number];

/** Homepage shows these three. The other four live on /plans. */
export const HOME_PROGRAMS = ["engine", "trail20", "fifty"] as const satisfies readonly ObjectiveId[];

export function firstPersonProfile(goal: FirstObjective, peakOn: string): AthleteProfile {
  const noRace = goal === "engine";
  return emptyProfile({
    sport: "running",
    discipline: noRace ? "trail" : "ultra",
    goal,
    peakOn,
    weeklyHours: noRace ? "h0_3" : "h3_5",
    longest: noRace ? "m60" : "m90",
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
