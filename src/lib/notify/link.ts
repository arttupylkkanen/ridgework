/**
 * The /notify route's search parameters: one token, arriving as either a
 * confirmation or a removal. Unrecognised input is dropped rather than thrown,
 * because these links are opened out of an email client months later, by
 * scanners and previewers as well as by people.
 */
export type NotifySearch = { confirm?: string; leave?: string };

function token(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (trimmed.length < 8 || trimmed.length > 128) return undefined;
  return /^[A-Za-z0-9_-]+$/.test(trimmed) ? trimmed : undefined;
}

export function parseNotifySearch(raw: Record<string, unknown>): NotifySearch {
  const out: NotifySearch = {};
  const confirm = token(raw.confirm);
  const leave = token(raw.leave);
  if (confirm) out.confirm = confirm;
  if (leave) out.leave = leave;
  return out;
}
