/**
 * iCalendar output for planned sessions.
 *
 * Pure on purpose: the route hands it rows and gets text back, so the escaping
 * and folding rules are testable without a database or a server.
 */

export type CalendarSession = {
  /** YYYY-MM-DD */
  date: string;
  title: string;
  minutes: number;
  description: string;
  /** HH:MM if the athlete gave this weekday a start time. */
  startAt?: string | null;
};

const CRLF = "\r\n";

/** RFC 5545 §3.3.11: backslash, semicolon, comma and newlines are special. */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** RFC 5545 §3.1: lines are folded at 75 octets with a leading space. */
function fold(line: string): string {
  if (line.length <= 75) return line;
  const parts: string[] = [];
  let rest = line;
  parts.push(rest.slice(0, 75));
  rest = rest.slice(75);
  while (rest.length > 74) {
    parts.push(" " + rest.slice(0, 74));
    rest = rest.slice(74);
  }
  if (rest.length) parts.push(" " + rest);
  return parts.join(CRLF);
}

function stamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function dateOnly(iso: string): string {
  return iso.replace(/-/g, "");
}

function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

/** Local wall-clock start/end for a timed session, as floating local time. */
function timedRange(date: string, startAt: string, minutes: number) {
  const [h, min] = startAt.split(":").map(Number);
  const startMinutes = (h ?? 0) * 60 + (min ?? 0);
  const endMinutes = startMinutes + Math.max(1, minutes);
  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (total: number, dayIso: string) => {
    const dayShift = Math.floor(total / (24 * 60));
    const rem = total % (24 * 60);
    const onDate = dayShift ? addDays(dayIso, dayShift) : dayIso;
    return `${dateOnly(onDate)}T${pad(Math.floor(rem / 60))}${pad(rem % 60)}00`;
  };
  return { start: fmt(startMinutes, date), end: fmt(endMinutes, date) };
}

export function buildIcs(opts: {
  sessions: CalendarSession[];
  calendarName: string;
  /** Stable per-feed string so updates replace events rather than duplicating. */
  feedId: string;
  now?: Date;
}): string {
  const now = opts.now ?? new Date();
  const dtstamp = stamp(now);
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ridgework//Training plan//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(opts.calendarName)}`,
    // Most clients poll on their own schedule; this is a hint, not a guarantee.
    "X-PUBLISHED-TTL:PT12H",
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
  ];

  for (const session of opts.sessions) {
    // Stable per date so a rewritten week updates the same event.
    const uid = `${opts.feedId}-${session.date}@ridgework.org`;
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${dtstamp}`);
    if (session.startAt) {
      const { start, end } = timedRange(session.date, session.startAt, session.minutes);
      lines.push(`DTSTART:${start}`);
      lines.push(`DTEND:${end}`);
    } else {
      // No start time given: an all-day event, which is what "some time today"
      // actually means. DTEND is exclusive.
      lines.push(`DTSTART;VALUE=DATE:${dateOnly(session.date)}`);
      lines.push(`DTEND;VALUE=DATE:${dateOnly(addDays(session.date, 1))}`);
    }
    lines.push(fold(`SUMMARY:${escapeText(session.title)}`));
    if (session.description) {
      lines.push(fold(`DESCRIPTION:${escapeText(session.description)}`));
    }
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");
  return lines.join(CRLF) + CRLF;
}
