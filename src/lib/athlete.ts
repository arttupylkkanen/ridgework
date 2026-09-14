import type { ObjectiveId } from "./rolling-plan.ts";
import { OBJECTIVES } from "./rolling-plan.ts";

export const SPORTS = ["running", "mountaineering", "mixed"] as const;
export type Sport = (typeof SPORTS)[number];

export const DISCIPLINES = ["trail", "ultra", "alpine", "road", "ski"] as const;
export type Discipline = (typeof DISCIPLINES)[number];

export const EXPERIENCE = ["beginner", "intermediate", "experienced", "veteran"] as const;
export type Experience = (typeof EXPERIENCE)[number];

export const VOLUME_BANDS = ["h0_3", "h3_5", "h5_8", "h8_12", "h12p"] as const;
export type VolumeBand = (typeof VOLUME_BANDS)[number];

export const LONGEST_BANDS = ["m60", "m90", "m150", "m240", "m240p"] as const;
export type LongestBand = (typeof LONGEST_BANDS)[number];

export const TERRAIN = ["flat", "rolling", "mountain", "highAlpine"] as const;
export type Terrain = (typeof TERRAIN)[number];

export const EQUIPMENT = ["trailShoes", "poles", "pack", "gym", "crampons", "iceAxe"] as const;
export type Equipment = (typeof EQUIPMENT)[number];

export const CONSTRAINTS = ["shiftWork", "travelHeavy", "youngKids", "shortSleep", "deskJob"] as const;
export type Constraint = (typeof CONSTRAINTS)[number];

export const UNITS = ["km", "miles"] as const;
export type Units = (typeof UNITS)[number];

export const ACCESS_FLAGS = ["trail", "mountain", "gym", "climbing"] as const;
export type AccessFlag = (typeof ACCESS_FLAGS)[number];

export type AvailableDays = [boolean, boolean, boolean, boolean, boolean, boolean, boolean];

export type AthleteProfile = {
  sport: Sport;
  discipline: Discipline;
  goal: ObjectiveId;
  peakOn: string;
  eventName: string;
  weeklyHours: VolumeBand;
  longest: LongestBand;
  experience: Experience;
  availableDays: AvailableDays;
  terrain: Terrain;
  equipment: Equipment[];
  constraints: Constraint[];
  limitations: string;
  units: Units;
  completedAt: string;
};

const PROFILE_KEY = "ridgework-athlete-v1";
export const PROFILE_EVENT = "ridgework-athlete";

export const ALL_AVAILABLE: AvailableDays = [true, true, true, true, true, true, true];

export function weeklyMinutes(band: VolumeBand): number {
  switch (band) {
    case "h0_3":
      return 120;
    case "h3_5":
      return 240;
    case "h5_8":
      return 390;
    case "h8_12":
      return 600;
    case "h12p":
      return 780;
  }
}

export function longestMinutes(band: LongestBand): number {
  switch (band) {
    case "m60":
      return 50;
    case "m90":
      return 80;
    case "m150":
      return 120;
    case "m240":
      return 195;
    case "m240p":
      return 270;
  }
}

export function availableCount(days: AvailableDays): number {
  return days.filter(Boolean).length;
}

export function emptyProfile(partial: Partial<AthleteProfile> = {}): AthleteProfile {
  return {
    sport: "running",
    discipline: "trail",
    goal: "fifty",
    peakOn: "",
    eventName: "",
    weeklyHours: "h5_8",
    longest: "m90",
    experience: "intermediate",
    availableDays: [...ALL_AVAILABLE],
    terrain: "rolling",
    equipment: ["trailShoes"],
    constraints: [],
    limitations: "",
    units: "km",
    completedAt: "",
    ...partial,
  };
}

function isStringArray(value: unknown, allowed: readonly string[]): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string" && allowed.includes(item));
}

export function isAthleteProfile(value: unknown): value is AthleteProfile {
  if (!value || typeof value !== "object") return false;
  const p = value as AthleteProfile;
  return (
    (SPORTS as readonly string[]).includes(p.sport) &&
    (DISCIPLINES as readonly string[]).includes(p.discipline) &&
    OBJECTIVES.includes(p.goal) &&
    typeof p.peakOn === "string" &&
    typeof p.eventName === "string" &&
    (VOLUME_BANDS as readonly string[]).includes(p.weeklyHours) &&
    (LONGEST_BANDS as readonly string[]).includes(p.longest) &&
    (EXPERIENCE as readonly string[]).includes(p.experience) &&
    Array.isArray(p.availableDays) &&
    p.availableDays.length === 7 &&
    p.availableDays.every((d) => typeof d === "boolean") &&
    (TERRAIN as readonly string[]).includes(p.terrain) &&
    isStringArray(p.equipment, EQUIPMENT) &&
    isStringArray(p.constraints, CONSTRAINTS) &&
    typeof p.limitations === "string" &&
    (UNITS as readonly string[]).includes(p.units) &&
    typeof p.completedAt === "string"
  );
}

export function profileReady(profile: AthleteProfile | null | undefined): profile is AthleteProfile {
  return Boolean(profile && profile.completedAt && profile.peakOn && availableCount(profile.availableDays) >= 2);
}

function canUseStorage() {
  return typeof window !== "undefined";
}

export function loadProfile(): AthleteProfile | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    return isAthleteProfile(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile: AthleteProfile | null) {
  if (!canUseStorage()) return;
  try {
    if (profile) localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    else localStorage.removeItem(PROFILE_KEY);
    window.dispatchEvent(new Event(PROFILE_EVENT));
  } catch {
    /* private mode */
  }
}

export function toggleList<T extends string>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}
