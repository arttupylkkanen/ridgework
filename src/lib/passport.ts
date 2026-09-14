import type { StoredDaily } from "./daily-readiness.ts";
import {
  type ArchivedSeason,
  type Checkin,
  type ObjectiveId,
  type RollingState,
  type SessionKey,
  type SessionLog,
} from "./rolling-plan.ts";

export const OUTING_RESULTS = ["finished", "dnf", "dns", "training"] as const;
export type OutingResult = (typeof OUTING_RESULTS)[number];

export const SHARE_AUDIENCES = ["private", "coach", "partner", "club", "sponsor", "event"] as const;
export type ShareAudience = (typeof SHARE_AUDIENCES)[number];

export type PassportEvent = {
  id: string;
  date: string;
  name: string;
  objective: ObjectiveId;
  distanceKm: number | null;
  elevationM: number | null;
  durationMin: number | null;
  result: OutingResult;
  confidence: 1 | 2 | 3 | 4 | 5;
  lesson: string;
  season: number;
};

export type PrivacyFlags = {
  publicEnabled: boolean;
  showEvents: boolean;
  showVolume: boolean;
  showConsistency: boolean;
  showPbs: boolean;
  showLessons: boolean;
  showConfidence: boolean;
  displayName: string;
  audience: ShareAudience;
};

export type PassportRecord = {
  events: PassportEvent[];
  privacy: PrivacyFlags;
  shareToken: string | null;
};

export const PRIVATE_DEFAULT: PrivacyFlags = {
  publicEnabled: false,
  showEvents: false,
  showVolume: false,
  showConsistency: false,
  showPbs: false,
  showLessons: false,
  showConfidence: false,
  displayName: "",
  audience: "private",
};

export function emptyPassport(): PassportRecord {
  return { events: [], privacy: { ...PRIVATE_DEFAULT }, shareToken: null };
}

const EASY_KEYS = new Set<SessionKey>(["easy", "recovery", "engine", "hike", "long"]);
const QUALITY_KEYS = new Set<SessionKey>(["quality", "sharpness", "climb", "strength", "steady"]);
const MOUNTAIN_KEYS = new Set<SessionKey>(["mountain", "vert", "pack", "climb", "hike"]);

export type SeasonCard = {
  season: number;
  objective: ObjectiveId;
  startedOn: string;
  peakOn: string;
  current: boolean;
  weeksLogged: number;
  sessionsDone: number;
  sessionsMissed: number;
  completionRate: number | null;
  easyCount: number;
  qualityCount: number;
  mountainDays: number;
  longestMin: number | null;
  tiredWeeks: number;
  wreckedWeeks: number;
  goodWeeks: number;
  interruptions: number;
  consistency: number | null;
  avgConfidence: number | null;
  eventsFinished: number;
  elevationM: number;
  distanceKm: number;
};

export type BaselineDelta = {
  key: "completion" | "consistency" | "easy" | "quality" | "mountain" | "longest" | "confidence" | "elevation";
  current: number | null;
  previous: number | null;
  direction: "up" | "down" | "flat" | "new";
};

export type PersonalBest = {
  kind: "duration" | "distance" | "elevation" | "streak";
  value: number;
  unit: "min" | "km" | "m" | "days";
  date: string;
  name: string;
};

export type PassportSnapshot = {
  seasons: SeasonCard[];
  current: SeasonCard | null;
  previous: SeasonCard | null;
  deltas: BaselineDelta[];
  pbs: PersonalBest[];
  interruptions: { date: string; kind: string; note: string }[];
  totals: {
    seasons: number;
    events: number;
    finished: number;
    easyCount: number;
    qualityCount: number;
    mountainDays: number;
    elevationM: number;
    distanceKm: number;
    longestMin: number | null;
  };
};

const KEY = "ridgework-passport-v1";
export const PASSPORT_EVENT = "ridgework-passport";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function newEventId(): string {
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function newShareToken(): string {
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").slice(0, 24);
}

export function isOutingResult(value: unknown): value is OutingResult {
  return typeof value === "string" && (OUTING_RESULTS as readonly string[]).includes(value);
}

export function isShareAudience(value: unknown): value is ShareAudience {
  return typeof value === "string" && (SHARE_AUDIENCES as readonly string[]).includes(value);
}

export function isPassportEvent(value: unknown): value is PassportEvent {
  if (!value || typeof value !== "object") return false;
  const row = value as PassportEvent;
  return (
    typeof row.id === "string" &&
    typeof row.date === "string" &&
    typeof row.name === "string" &&
    typeof row.objective === "string" &&
    isOutingResult(row.result) &&
    typeof row.confidence === "number" &&
    row.confidence >= 1 &&
    row.confidence <= 5 &&
    typeof row.lesson === "string" &&
    typeof row.season === "number"
  );
}

export function isPrivacyFlags(value: unknown): value is PrivacyFlags {
  if (!value || typeof value !== "object") return false;
  const p = value as PrivacyFlags;
  return (
    typeof p.publicEnabled === "boolean" &&
    typeof p.showEvents === "boolean" &&
    typeof p.showVolume === "boolean" &&
    typeof p.showConsistency === "boolean" &&
    typeof p.showPbs === "boolean" &&
    typeof p.showLessons === "boolean" &&
    typeof p.showConfidence === "boolean" &&
    typeof p.displayName === "string" &&
    isShareAudience(p.audience)
  );
}

export function isPassportRecord(value: unknown): value is PassportRecord {
  if (!value || typeof value !== "object") return false;
  const row = value as PassportRecord;
  return Array.isArray(row.events) && row.events.every(isPassportEvent) && isPrivacyFlags(row.privacy);
}

function parseSeasonSources(state: RollingState): {
  season: number;
  objective: ObjectiveId;
  startedOn: string;
  peakOn: string;
  checkins: Checkin[];
  logs: SessionLog[];
  extraBase: number;
  current: boolean;
}[] {
  const archived = (state.history ?? []).map((row: ArchivedSeason) => ({
    season: row.season,
    objective: row.objective,
    startedOn: row.startedOn,
    peakOn: row.peakOn,
    checkins: row.checkins ?? [],
    logs: row.logs ?? [],
    extraBase: row.extraBase,
    current: false,
  }));
  return [
    ...archived,
    {
      season: state.season,
      objective: state.objective,
      startedOn: state.startedOn,
      peakOn: state.peakOn,
      checkins: state.checkins,
      logs: state.logs ?? [],
      extraBase: state.extraBase,
      current: true,
    },
  ];
}

function weeksWithDone(logs: SessionLog[]): number {
  const weeks = new Set(logs.filter((log) => log.status === "done").map((log) => log.weekCalendar));
  return weeks.size;
}

function cardFromSource(
  source: ReturnType<typeof parseSeasonSources>[number],
  events: PassportEvent[],
): SeasonCard {
  const logs = source.logs;
  const done = logs.filter((log) => log.status === "done");
  const missed = logs.filter((log) => log.status === "missed");
  const planned = done.length + missed.length;
  const seasonEvents = events.filter((evt) => evt.objective === source.objective && evt.season === source.season);
  const finished = seasonEvents.filter((evt) => evt.result === "finished");
  const conf = finished.map((evt) => evt.confidence);
  const longestEvent = finished.reduce<number | null>((max, evt) => {
    if (evt.durationMin == null) return max;
    return max == null ? evt.durationMin : Math.max(max, evt.durationMin);
  }, null);
  const tired = source.checkins.filter((c) => c.result === "problem").length;
  const wrecked = source.checkins.filter((c) => c.result === "wrecked").length;
  const good = source.checkins.filter((c) => c.result === "good" || c.result === "ok").length;
  const elapsedWeeks = Math.max(source.checkins.length, weeksWithDone(logs), 1);
  return {
    season: source.season,
    objective: source.objective,
    startedOn: source.startedOn,
    peakOn: source.peakOn,
    current: source.current,
    weeksLogged: source.checkins.length,
    sessionsDone: done.length,
    sessionsMissed: missed.length,
    completionRate: planned === 0 ? null : done.length / planned,
    easyCount: done.filter((log) => EASY_KEYS.has(log.actualKey)).length,
    qualityCount: done.filter((log) => QUALITY_KEYS.has(log.actualKey)).length,
    mountainDays: done.filter((log) => MOUNTAIN_KEYS.has(log.actualKey)).length,
    longestMin: longestEvent,
    tiredWeeks: tired,
    wreckedWeeks: wrecked,
    goodWeeks: good,
    interruptions: source.extraBase + wrecked,
    consistency: logs.length === 0 ? null : weeksWithDone(logs) / elapsedWeeks,
    avgConfidence: conf.length ? conf.reduce((a, b) => a + b, 0) / conf.length : null,
    eventsFinished: finished.length,
    elevationM: finished.reduce((sum, evt) => sum + (evt.elevationM ?? 0), 0),
    distanceKm: finished.reduce((sum, evt) => sum + (evt.distanceKm ?? 0), 0),
  };
}

function delta(key: BaselineDelta["key"], current: number | null, previous: number | null): BaselineDelta {
  if (previous == null || current == null) {
    return { key, current, previous, direction: previous == null ? "new" : "new" };
  }
  const diff = current - previous;
  const direction = Math.abs(diff) < 0.02 * Math.max(1, Math.abs(previous)) ? "flat" : diff > 0 ? "up" : "down";
  return { key, current, previous, direction };
}

function pbsFrom(events: PassportEvent[], cards: SeasonCard[]): PersonalBest[] {
  const finished = events.filter((evt) => evt.result === "finished");
  const out: PersonalBest[] = [];
  const byDur = [...finished].filter((e) => e.durationMin != null).sort((a, b) => (b.durationMin ?? 0) - (a.durationMin ?? 0))[0];
  const byKm = [...finished].filter((e) => e.distanceKm != null).sort((a, b) => (b.distanceKm ?? 0) - (a.distanceKm ?? 0))[0];
  const byEl = [...finished].filter((e) => e.elevationM != null).sort((a, b) => (b.elevationM ?? 0) - (a.elevationM ?? 0))[0];
  if (byDur?.durationMin) out.push({ kind: "duration", value: byDur.durationMin, unit: "min", date: byDur.date, name: byDur.name });
  if (byKm?.distanceKm) out.push({ kind: "distance", value: byKm.distanceKm, unit: "km", date: byKm.date, name: byKm.name });
  if (byEl?.elevationM) out.push({ kind: "elevation", value: byEl.elevationM, unit: "m", date: byEl.date, name: byEl.name });
  const bestStreak = cards.reduce((max, card) => Math.max(max, card.goodWeeks), 0);
  if (bestStreak > 0) {
    const card = cards.find((c) => c.goodWeeks === bestStreak);
    out.push({
      kind: "streak",
      value: bestStreak,
      unit: "days",
      date: card?.peakOn ?? "",
      name: "logged-good-weeks",
    });
  }
  return out;
}

export function buildSnapshot(
  enrollments: RollingState[],
  events: PassportEvent[],
  _daily: StoredDaily[] = [],
  activeObjective?: ObjectiveId,
): PassportSnapshot {
  const seasons = enrollments.flatMap((state) => parseSeasonSources(state).map((src) => cardFromSource(src, events)));
  const objective = activeObjective ?? enrollments[0]?.objective;
  const forObj = objective ? seasons.filter((s) => s.objective === objective) : seasons;
  const current = forObj.find((s) => s.current) ?? forObj[forObj.length - 1] ?? null;
  const previous =
    current != null
      ? forObj.filter((s) => !s.current && s.season < current.season).sort((a, b) => b.season - a.season)[0] ?? null
      : null;
  const deltas: BaselineDelta[] = current
    ? [
        delta("completion", current.completionRate, previous?.completionRate ?? null),
        delta("consistency", current.consistency, previous?.consistency ?? null),
        delta("easy", current.easyCount, previous?.easyCount ?? null),
        delta("quality", current.qualityCount, previous?.qualityCount ?? null),
        delta("mountain", current.mountainDays, previous?.mountainDays ?? null),
        delta("longest", current.longestMin, previous?.longestMin ?? null),
        delta("confidence", current.avgConfidence, previous?.avgConfidence ?? null),
        delta("elevation", current.elevationM, previous?.elevationM ?? null),
      ]
    : [];
  const interruptions = enrollments.flatMap((state) =>
    (state.adjustments ?? [])
      .filter((adj) => adj.trigger === "illness" || adj.trigger === "missed" || adj.trigger === "travel")
      .map((adj) => ({ date: adj.date, kind: adj.trigger, note: adj.reason.id })),
  );
  const finished = events.filter((e) => e.result === "finished");
  const allDone = seasons.reduce(
    (acc, s) => ({
      easy: acc.easy + s.easyCount,
      quality: acc.quality + s.qualityCount,
      mountain: acc.mountain + s.mountainDays,
    }),
    { easy: 0, quality: 0, mountain: 0 },
  );
  return {
    seasons,
    current,
    previous,
    deltas,
    pbs: pbsFrom(events, seasons),
    interruptions,
    totals: {
      seasons: new Set(seasons.map((s) => `${s.objective}:${s.season}`)).size,
      events: events.length,
      finished: finished.length,
      easyCount: allDone.easy,
      qualityCount: allDone.quality,
      mountainDays: allDone.mountain,
      elevationM: finished.reduce((sum, e) => sum + (e.elevationM ?? 0), 0),
      distanceKm: finished.reduce((sum, e) => sum + (e.distanceKm ?? 0), 0),
      longestMin: finished.reduce<number | null>((max, e) => {
        if (e.durationMin == null) return max;
        return max == null ? e.durationMin : Math.max(max, e.durationMin);
      }, null),
    },
  };
}

export type SharedPassport = {
  displayName: string;
  audience: ShareAudience;
  generatedOn: string;
  current: SeasonCard | null;
  previous: SeasonCard | null;
  deltas: BaselineDelta[];
  totals: PassportSnapshot["totals"] | null;
  events: PassportEvent[];
  pbs: PersonalBest[];
  lessons: { date: string; name: string; lesson: string }[];
  avgConfidence: number | null;
};

export function filterForShare(snapshot: PassportSnapshot, events: PassportEvent[], privacy: PrivacyFlags, generatedOn: string): SharedPassport | null {
  if (!privacy.publicEnabled) return null;
  const name = privacy.displayName.trim() || "Athlete";
  return {
    displayName: name,
    audience: privacy.audience === "private" ? "coach" : privacy.audience,
    generatedOn,
    current: privacy.showVolume || privacy.showConsistency ? snapshot.current : null,
    previous: privacy.showVolume || privacy.showConsistency ? snapshot.previous : null,
    deltas: privacy.showVolume || privacy.showConsistency ? snapshot.deltas : [],
    totals: privacy.showVolume ? snapshot.totals : null,
    events: privacy.showEvents ? events.map((e) => (privacy.showLessons ? e : { ...e, lesson: "" })) : [],
    pbs: privacy.showPbs ? snapshot.pbs : [],
    lessons: privacy.showLessons
      ? events.filter((e) => e.lesson.trim()).map((e) => ({ date: e.date, name: e.name, lesson: e.lesson }))
      : [],
    avgConfidence: privacy.showConfidence ? snapshot.current?.avgConfidence ?? null : null,
  };
}

export function loadPassport(): PassportRecord {
  if (!canUseStorage()) return emptyPassport();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyPassport();
    const parsed = JSON.parse(raw) as unknown;
    if (!isPassportRecord(parsed)) return emptyPassport();
    return {
      ...parsed,
      shareToken: typeof (parsed as PassportRecord).shareToken === "string" ? (parsed as PassportRecord).shareToken : null,
    };
  } catch {
    return emptyPassport();
  }
}

export function savePassport(record: PassportRecord) {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(record));
    window.dispatchEvent(new Event(PASSPORT_EVENT));
  } catch {
    /* quota */
  }
}

export function upsertEvent(record: PassportRecord, event: PassportEvent): PassportRecord {
  const rest = record.events.filter((row) => row.id !== event.id);
  const events = [event, ...rest].sort((a, b) => b.date.localeCompare(a.date));
  return { ...record, events };
}

export function removeEvent(record: PassportRecord, id: string): PassportRecord {
  return { ...record, events: record.events.filter((row) => row.id !== id) };
}
