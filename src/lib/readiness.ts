export const READINESS = ["fresh", "ok", "tired", "wrecked"] as const;
export type Readiness = (typeof READINESS)[number];
export const SESSION_TYPES = ["easy", "steady", "hard", "rest"] as const;
export type SessionType = (typeof SESSION_TYPES)[number];

export type DayPlan = { type: SessionType; notes: string };

/** If tired, drop hard/steady to easy. If wrecked, drop hard/steady to rest. */
export function applyReadiness(days: DayPlan[], readiness: Readiness): DayPlan[] {
  if (readiness === "fresh" || readiness === "ok") return days;
  if (readiness === "tired") {
    return days.map((day) => ({
      ...day,
      type: day.type === "hard" || day.type === "steady" ? "easy" : day.type,
    }));
  }
  return days.map((day) => ({
    ...day,
    type: day.type === "rest" ? "rest" : day.type === "easy" ? "easy" : "rest",
  }));
}
