/**
 * Pure helpers for the "tell me when it opens" list, kept out of the server
 * module so the rules can be tested without a database.
 */

/**
 * Deliberately loose. A stricter pattern rejects real addresses — new TLDs,
 * plus-tags, unicode local parts — and the confirmation email is the real
 * check: an address that cannot receive mail never gets confirmed, so it never
 * reaches the list. All this has to do is stop obvious nonsense and anything
 * that could be smuggled into a mail header.
 */
export function normalizeEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (email.length < 6 || email.length > 254) return null;
  if (/[\s,;<>"\\]/.test(email)) return null;
  const at = email.indexOf("@");
  if (at < 1 || at !== email.lastIndexOf("@")) return null;
  const domain = email.slice(at + 1);
  if (!domain.includes(".") || domain.startsWith(".") || domain.endsWith(".")) return null;
  if (domain.includes("..")) return null;
  return email;
}

/**
 * What the form is told, whatever actually happened.
 *
 * The answer is the same for a new address, one already waiting and one already
 * confirmed, because a public form that distinguishes them is a way to ask
 * "is this person on your list" about somebody else's address.
 */
export type JoinOutcome = { ok: true } | { ok: false; reason: "badEmail" | "failed" };
