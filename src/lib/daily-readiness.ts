import type { SessionKey } from "@/lib/rolling-plan";

export const SCALE = [1, 2, 3, 4, 5] as const;
export type Scale = (typeof SCALE)[number];

export const READINESS_CALLS = ["ready", "reduce", "easy", "rest"] as const;
export type ReadinessCall = (typeof READINESS_CALLS)[number];

export type DailyInputs = {
  sleep: Scale;
  soreness: Scale;
  motivation: Scale;
  fatigue: Scale;
  stress: Scale;
  lastEffort?: Scale;
};

export type LoadContext = {
  hardOrLongLast3Days: number;
  hardOrLongThisWeek: number;
  yesterdayHard: boolean;
  yesterdayKey?: SessionKey;
};

export type ReasonId =
  | "sleepLow"
  | "sleepOk"
  | "fatigueHigh"
  | "fatigueOk"
  | "sorenessHigh"
  | "motivationLow"
  | "stressHigh"
  | "loadCluster"
  | "yesterdayHard"
  | "normalLoad";

export type Reason = { id: ReasonId; values: Record<string, string | number> };

export type ReadinessResult = {
  call: ReadinessCall;
  reasons: Reason[];
  /** Inputs that actually moved the call — shown first. */
  drivers: Reason[];
};

export type StoredDaily = DailyInputs & {
  date: string;
  call: ReadinessCall;
  overridden: boolean;
  at: string;
};

const DAILY_KEY = "ridgework-daily-v1";
export const DAILY_EVENT = "ridgework-daily";

const CALL_RANK: Record<ReadinessCall, number> = {
  ready: 0,
  reduce: 1,
  easy: 2,
  rest: 3,
};

function stricter(a: ReadinessCall, b: ReadinessCall): ReadinessCall {
  return CALL_RANK[a] >= CALL_RANK[b] ? a : b;
}

export function emptyInputs(): DailyInputs {
  return { sleep: 3, soreness: 2, motivation: 3, fatigue: 2, stress: 2 };
}

export function isScale(value: unknown): value is Scale {
  return typeof value === "number" && (SCALE as readonly number[]).includes(value);
}

export function isDailyInputs(value: unknown): value is DailyInputs {
  if (!value || typeof value !== "object") return false;
  const d = value as DailyInputs;
  return (
    isScale(d.sleep) &&
    isScale(d.soreness) &&
    isScale(d.motivation) &&
    isScale(d.fatigue) &&
    isScale(d.stress)
  );
}

/**
 * Transparent, ordered rules. Every firing rule is returned as a reason with
 * the actual numbers. The call is the strictest rule that fired. Never a
 * hidden composite score. Never a diagnosis.
 */
export function assessReadiness(inputs: DailyInputs, load: LoadContext = emptyLoad()): ReadinessResult {
  const reasons: Reason[] = [];
  const drivers: Reason[] = [];
  let call: ReadinessCall = "ready";

  function fire(next: ReadinessCall, reason: Reason) {
    call = stricter(call, next);
    reasons.push(reason);
    drivers.push(reason);
  }

  if (inputs.fatigue === 5) {
    fire("rest", { id: "fatigueHigh", values: { n: inputs.fatigue } });
  } else if (inputs.fatigue >= 4) {
    fire("easy", { id: "fatigueHigh", values: { n: inputs.fatigue } });
  } else {
    reasons.push({ id: "fatigueOk", values: { n: inputs.fatigue } });
  }

  if (inputs.sleep <= 2 && inputs.fatigue >= 4) {
    fire("rest", { id: "sleepLow", values: { n: inputs.sleep } });
  } else if (inputs.sleep <= 2) {
    fire("easy", { id: "sleepLow", values: { n: inputs.sleep } });
  } else {
    reasons.push({ id: "sleepOk", values: { n: inputs.sleep } });
  }

  if (inputs.soreness >= 5 && (inputs.lastEffort ?? 3) >= 4) {
    fire("rest", { id: "sorenessHigh", values: { n: inputs.soreness } });
  } else if (inputs.soreness >= 4) {
    fire("easy", { id: "sorenessHigh", values: { n: inputs.soreness } });
  } else if (inputs.soreness >= 3 && inputs.fatigue >= 3) {
    fire("reduce", { id: "sorenessHigh", values: { n: inputs.soreness } });
  }

  if (inputs.motivation <= 2 && inputs.fatigue >= 3) {
    fire("reduce", { id: "motivationLow", values: { n: inputs.motivation } });
  }

  if (inputs.stress >= 4 && inputs.sleep <= 3) {
    fire("reduce", { id: "stressHigh", values: { n: inputs.stress } });
  }

  if (load.hardOrLongLast3Days >= 2 && inputs.sleep <= 2) {
    fire("easy", { id: "loadCluster", values: { n: load.hardOrLongLast3Days } });
  } else if (load.hardOrLongLast3Days >= 2) {
    fire("reduce", { id: "loadCluster", values: { n: load.hardOrLongLast3Days } });
  } else {
    reasons.push({ id: "normalLoad", values: { n: load.hardOrLongLast3Days } });
  }

  if (load.yesterdayHard && (inputs.fatigue >= 3 || inputs.soreness >= 3)) {
    fire("reduce", { id: "yesterdayHard", values: { key: load.yesterdayKey ?? "quality" } });
  }


  return { call, reasons, drivers: drivers.length ? drivers : reasons.slice(0, 2) };
}

export function emptyLoad(): LoadContext {
  return { hardOrLongLast3Days: 0, hardOrLongThisWeek: 0, yesterdayHard: false };
}


function canUseStorage() {
  return typeof window !== "undefined";
}

export function loadDailyLog(): Record<string, StoredDaily> {
  if (!canUseStorage()) return {};
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, StoredDaily>;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

export function saveDailyEntry(entry: StoredDaily) {
  if (!canUseStorage()) return;
  try {
    const all = loadDailyLog();
    all[entry.date] = entry;
    localStorage.setItem(DAILY_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event(DAILY_EVENT));
  } catch {
    /* private mode */
  }
}

export function recentDaily(limit = 21): StoredDaily[] {
  return Object.values(loadDailyLog())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-limit);
}
