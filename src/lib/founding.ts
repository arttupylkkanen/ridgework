import { isBillingExemptEmail } from "./test-account.ts";

const KEY = "ridgework-founding-v1";
export const FOUNDING_EVENT = "ridgework-founding";

/** Exempt logins bypass Polar. Everyone else adds a card for the 14-day €0 trial. */
export const TEST_PERIOD = false;

export type FoundingRecord = {
  name: string;
  email: string;
  startedAt: string;
};

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getFounding(): FoundingRecord | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FoundingRecord;
    if (!parsed?.email || !parsed?.startedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setFounding(record: FoundingRecord) {
  localStorage.setItem(KEY, JSON.stringify(record));
  window.dispatchEvent(new Event(FOUNDING_EVENT));
}

export function trialDaysLeft(record: FoundingRecord, now = Date.now()): number {
  const start = new Date(record.startedAt).getTime();
  const elapsed = Math.max(0, now - start);
  const left = 14 - Math.floor(elapsed / 86_400_000);
  return Math.max(0, left);
}

export function grantFounding(input: { name: string; email: string }) {
  setFounding({
    name: input.name,
    email: input.email,
    startedAt: new Date().toISOString(),
  });
}

export function hasDeskAccess(email?: string | null): boolean {
  return isBillingExemptEmail(email) || Boolean(getFounding());
}

export function subscribeFounding(onChange: () => void) {
  window.addEventListener(FOUNDING_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(FOUNDING_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
