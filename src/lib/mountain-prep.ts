import type { AthleteProfile, Equipment } from "./athlete.ts";
import { longestMinutes } from "./athlete.ts";
import {
  daysBetween,
  qualityFor,
  recommendedWeeks,
  remainingWeeks,
  todayIso,
  type ObjectiveId,
  type QualityBand,
  type RollingState,
} from "./rolling-plan.ts";

export const PREP_SECTIONS = [
  "fitness",
  "equipment",
  "clothing",
  "nutrition",
  "logistics",
  "altitude",
  "debrief",
] as const;
export type PrepSectionId = (typeof PREP_SECTIONS)[number];

export const PREP_PHASES = ["build", "approach", "week", "day", "after"] as const;
export type PrepPhase = (typeof PREP_PHASES)[number];

export const PRECIP = ["none", "rain", "snow", "mix"] as const;
export type Precip = (typeof PRECIP)[number];

export const WIND = ["calm", "breeze", "strong"] as const;
export type Wind = (typeof WIND)[number];

export type WeatherInput = {
  highC: number | null;
  lowC: number | null;
  precip: Precip;
  wind: Wind;
  freezeM: number | null;
};

export function emptyWeather(): WeatherInput {
  return { highC: null, lowC: null, precip: "none", wind: "calm", freezeM: null };
}

export type PrepItem = {
  id: string;
  section: PrepSectionId;
  copyKey: string;
  whyKey?: string;
  values: Record<string, string | number>;
  core: boolean;
};

export type PrepPrompt = {
  id: string;
  section: PrepSectionId;
  copyKey: string;
  kind: "number" | "time";
};

export type PrepWorkspace = {
  objective: ObjectiveId;
  eventName: string;
  peakOn: string;
  daysLeft: number;
  phase: PrepPhase;
  quality: QualityBand;
  recWeeks: number;
  remaining: number;
  altitudeRelevant: boolean;
  items: PrepItem[];
  prompts: PrepPrompt[];
};

export function typicalDayMinutes(objective: ObjectiveId): number {
  switch (objective) {
    case "engine":
      return 75;
    case "trail20":
      return 140;
    case "fifty":
      return 360;
    case "ultra100":
      return 840;
    case "alpine":
      return 540;
    case "traverse":
      return 480;
    case "expedition":
      return 360;
  }
}

export function needsAltitude(objective: ObjectiveId, terrain: AthleteProfile["terrain"]): boolean {
  if (objective === "expedition" || objective === "alpine" || objective === "traverse") return true;
  return terrain === "highAlpine";
}

export function prepPhase(peakOn: string, today = todayIso()): PrepPhase {
  if (!peakOn) return "build";
  const days = daysBetween(today, peakOn);
  if (days < 0) return "after";
  if (days <= 1) return "day";
  if (days <= 7) return "week";
  if (days <= 21) return "approach";
  return "build";
}

function has(profile: AthleteProfile, item: Equipment): boolean {
  return profile.equipment.includes(item);
}

function item(
  section: PrepSectionId,
  id: string,
  values: Record<string, string | number> = {},
  extra: { whyKey?: string; core?: boolean } = {},
): PrepItem {
  return {
    id: `${section}.${id}`,
    section,
    copyKey: `${section}.${id}`,
    whyKey: extra.whyKey ?? `${section}.${id}Why`,
    values,
    core: extra.core !== false,
  };
}

function prompt(section: PrepSectionId, id: string, kind: PrepPrompt["kind"]): PrepPrompt {
  return { id: `${section}.${id}`, section, copyKey: `${section}.${id}`, kind };
}

export function buildPrep(opts: {
  profile: AthleteProfile;
  state?: RollingState | null;
  weather?: WeatherInput;
  today?: string;
}): PrepWorkspace {
  const profile = opts.profile;
  const state = opts.state ?? null;
  const weather = opts.weather ?? emptyWeather();
  const today = opts.today ?? todayIso();
  const objective = state?.objective ?? profile.goal;
  const peakOn = state?.peakOn || profile.peakOn;
  const daysLeft = peakOn ? daysBetween(today, peakOn) : recommendedWeeks(objective) * 7;
  const phase = prepPhase(peakOn, today);
  const rec = recommendedWeeks(objective);
  const remaining = state ? remainingWeeks(state) : Math.max(1, Math.round(daysLeft / 7));
  const quality = qualityFor(objective, Math.max(1, remaining));
  const altitudeRelevant = needsAltitude(objective, profile.terrain);
  const longest = longestMinutes(profile.longest);
  const typical = typicalDayMinutes(objective);
  const eventName = profile.eventName.trim();
  const alpine = objective === "alpine" || objective === "traverse" || objective === "expedition";
  const ultra = objective === "fifty" || objective === "ultra100";
  const items: PrepItem[] = [];
  const prompts: PrepPrompt[] = [];

  // --- Fitness: honest training state, not a medical call ---
  items.push(item("fitness", "window", { rec, remaining, peak: peakOn || "—" }));
  if (quality === "short" || quality === "tight") {
    items.push(item("fitness", "thinWindow", { remaining, rec }));
  } else {
    items.push(item("fitness", "fullWindow", { remaining, rec }));
  }
  if (longest + 30 < typical && objective !== "engine") {
    items.push(item("fitness", "longestGap", { longest, typical }));
  } else {
    items.push(item("fitness", "longestOk", { longest, typical }));
  }
  if (state && state.extraBase >= 2) {
    items.push(item("fitness", "tiredWeeks", { n: state.extraBase }));
  }
  if (profile.experience === "beginner") {
    items.push(item("fitness", "beginner"));
  }
  if (alpine) {
    items.push(item("fitness", "alpineSkill"));
  }
  if (objective === "engine") {
    items.push(item("fitness", "engineAerobic"));
  }
  if (phase === "week" || phase === "day") {
    items.push(item("fitness", "taperHonest"));
  }
  if (phase === "build" || phase === "approach") {
    items.push(item("fitness", "rehearseDay"));
  }

  // --- Equipment ---
  items.push(item("equipment", "shoes"));
  if (has(profile, "pack") || ultra || alpine) {
    items.push(item("equipment", "pack", {}, { core: ultra || alpine }));
  }
  if (has(profile, "poles") || ultra) {
    items.push(
      item("equipment", has(profile, "poles") ? "polesOwned" : "polesOptional", {}, { core: objective === "ultra100" }),
    );
  }
  if (objective === "ultra100" || objective === "traverse") {
    items.push(item("equipment", "nightKit"));
  }
  if (alpine) {
    if (has(profile, "crampons")) items.push(item("equipment", "cramponsOwned"));
    else items.push(item("equipment", "cramponsMissing"));
    if (has(profile, "iceAxe")) items.push(item("equipment", "axeOwned"));
    else items.push(item("equipment", "axeMissing"));
    items.push(item("equipment", "harness"));
    items.push(item("equipment", "nav"));
  }
  if (objective === "expedition") {
    items.push(item("equipment", "expeditionCamp"));
  }
  if (objective === "engine" || objective === "trail20") {
    items.push(item("equipment", "lightKit"));
  }
  if (weather.precip === "snow" && alpine && !has(profile, "crampons")) {
    items.push(item("equipment", "snowNoCrampons"));
  }

  // --- Clothing from forecast ---
  items.push(item("clothing", "writeForecast"));
  items.push(item("clothing", "baseLayer"));
  if (weather.lowC != null && weather.lowC <= 6) {
    items.push(item("clothing", "warmLayer", { low: weather.lowC }));
  }
  if (weather.highC != null && weather.highC >= 22) {
    items.push(item("clothing", "hotDay", { high: weather.highC }));
  }
  if (weather.precip === "rain" || weather.precip === "mix") {
    items.push(item("clothing", "rainShell"));
  }
  if (weather.precip === "snow" || weather.precip === "mix") {
    items.push(item("clothing", "snowKit"));
  }
  if (weather.wind === "strong") {
    items.push(item("clothing", "wind"));
  }
  if (alpine) {
    items.push(item("clothing", "alpineSpare"));
    if (weather.freezeM != null) {
      items.push(item("clothing", "freezeLevel", { freeze: weather.freezeM }));
    }
  }
  if (objective === "ultra100") {
    items.push(item("clothing", "nightChange"));
  }

  // --- Nutrition ---
  if (objective === "engine") {
    items.push(item("nutrition", "engineFat"));
    items.push(item("nutrition", "enginePractised"));
  } else if (objective === "trail20") {
    items.push(item("nutrition", "shortRace"));
  } else if (ultra) {
    items.push(item("nutrition", "gutTraining"));
    items.push(item("nutrition", "nothingNew"));
    prompts.push(prompt("nutrition", "carbsPerHour", "number"));
    if (objective === "ultra100") {
      items.push(item("nutrition", "nightFood"));
    }
  } else if (objective === "alpine") {
    items.push(item("nutrition", "alpineSimple"));
  } else if (objective === "traverse") {
    items.push(item("nutrition", "multiDayFood"));
  } else {
    items.push(item("nutrition", "expeditionEat"));
  }

  // --- Logistics ---
  prompts.push(prompt("logistics", "startTime", "time"));
  if (alpine) {
    items.push(item("logistics", "turnaround"));
    prompts.push(prompt("logistics", "turnaroundTime", "time"));
    items.push(item("logistics", "bail"));
  }
  if (ultra) {
    items.push(item("logistics", "aidOrDrop"));
    items.push(item("logistics", "crewOrSolo"));
  }
  items.push(item("logistics", "travelToStart"));
  if (profile.constraints.includes("travelHeavy")) {
    items.push(item("logistics", "workTravel"));
  }
  if (profile.constraints.includes("youngKids")) {
    items.push(item("logistics", "familyCover"));
  }
  if (profile.constraints.includes("shiftWork")) {
    items.push(item("logistics", "sleepBefore"));
  }
  if (objective === "traverse") {
    items.push(item("logistics", "reserveDay"));
  }
  if (objective === "expedition") {
    items.push(item("logistics", "permits"));
    items.push(item("logistics", "partnerPlan"));
  }
  if (phase === "approach" || phase === "week" || phase === "day") {
    items.push(item("logistics", "printedPlan"));
  }

  // --- Altitude ---
  if (altitudeRelevant) {
    items.push(item("altitude", "notDiagnosis"));
    if (objective === "expedition") {
      items.push(item("altitude", "rotations"));
      items.push(item("altitude", "sleepHigh"));
      items.push(item("altitude", "descend"));
    } else {
      items.push(item("altitude", "dayHigh"));
      items.push(item("altitude", "descend"));
    }
    items.push(item("altitude", "drinkEat"));
    prompts.push(prompt("altitude", "sleepElevation", "number"));
  } else {
    items.push(item("altitude", "notAnIssue", {}, { core: false }));
  }

  // --- Debrief: always present; primary after the day ---
  items.push(item("debrief", "writeSameDay", {}, { core: phase === "after" }));
  items.push(item("debrief", "whatWorked"));
  items.push(item("debrief", "whatBroke"));
  if (alpine) items.push(item("debrief", "wouldTurn"));

  return {
    objective,
    eventName,
    peakOn,
    daysLeft,
    phase,
    quality,
    recWeeks: rec,
    remaining,
    altitudeRelevant,
    items,
    prompts,
  };
}

export function sectionProgress(workspace: PrepWorkspace, checks: Record<string, boolean>): Record<PrepSectionId, { done: number; total: number }> {
  const out = {} as Record<PrepSectionId, { done: number; total: number }>;
  for (const section of PREP_SECTIONS) {
    const rows = workspace.items.filter((row) => row.section === section);
    out[section] = {
      total: rows.length,
      done: rows.filter((row) => checks[row.id]).length,
    };
  }
  return out;
}

export type DebriefDraft = {
  result: "" | "finished" | "dnf" | "dns" | "training";
  confidence: 0 | 1 | 2 | 3 | 4 | 5;
  savedToPassport: boolean;
};

export type PrepPersist = {
  objective: ObjectiveId;
  checks: Record<string, boolean>;
  answers: Record<string, string>;
  weather: WeatherInput;
  debrief: DebriefDraft;
};

export function emptyDebrief(): DebriefDraft {
  return { result: "", confidence: 0, savedToPassport: false };
}

export function emptyPersist(objective: ObjectiveId): PrepPersist {
  return { objective, checks: {}, answers: {}, weather: emptyWeather(), debrief: emptyDebrief() };
}

const STORE_KEY = "ridgework-mountain-prep-v1";
export const PREP_EVENT = "ridgework-mountain-prep";

export function loadPrepStore(): Record<string, PrepPersist> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as Record<string, PrepPersist>;
  } catch {
    return {};
  }
}

export function loadPrep(objective: ObjectiveId): PrepPersist {
  const all = loadPrepStore();
  return all[objective] ?? emptyPersist(objective);
}

export function savePrep(record: PrepPersist) {
  if (typeof window === "undefined") return;
  try {
    const all = loadPrepStore();
    all[record.objective] = record;
    localStorage.setItem(STORE_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event(PREP_EVENT));
  } catch {
    /* quota */
  }
}

