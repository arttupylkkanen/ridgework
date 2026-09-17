import type { FoundingMember } from "./founding-server";

/**
 * A local mirror of the founding record that lives in `founding_members`.
 *
 * This file used to BE the record: a `ridgework-founding-v1` key in
 * localStorage, written on sign-in and read back as though it meant something.
 * It did not. Clearing browser data erased it, a second device never had it,
 * and there was no list anywhere of who the founding members actually were —
 * which is the one thing the cohort exists to answer.
 *
 * The database holds the truth now. What stays here is a cache, for the two
 * places that need a name synchronously on first paint (the passport's default
 * display name) before a round trip can finish. A cache that is missing, stale
 * or wrong must therefore never change what an athlete is allowed to do —
 * nothing in this file grants access, and the functions that pretended to
 * (`hasDeskAccess`, `trialDaysLeft`) are gone rather than left to mislead.
 */
const KEY = "ridgework-founding-v1";
export const FOUNDING_EVENT = "ridgework-founding";

export type FoundingRecord = FoundingMember;

function canUseStorage() {
  return typeof window !== "undefined";
}

/** The cached record, or null. Never a permission check — see the note above. */
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

/** Mirror what the server returned. Private browsing may refuse; that is fine. */
export function cacheFounding(record: FoundingRecord | null) {
  if (!canUseStorage()) return;
  try {
    if (record) localStorage.setItem(KEY, JSON.stringify(record));
    else localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(FOUNDING_EVENT));
  } catch {
    /* the server still has the record */
  }
}
