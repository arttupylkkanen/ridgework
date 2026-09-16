import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildIcs } from "./ics.ts";

const now = new Date("2026-09-15T08:00:00.000Z");

function build(sessions: Parameters<typeof buildIcs>[0]["sessions"]) {
  return buildIcs({ sessions, calendarName: "Ridgework", feedId: "feed1", now });
}

describe("ics feed", () => {
  it("writes an all-day event when no start time was given", () => {
    const out = build([
      { date: "2026-09-16", title: "Long easy", minutes: 90, description: "Talk the whole way." },
    ]);
    assert.match(out, /DTSTART;VALUE=DATE:20260916/);
    // DTEND is exclusive, so a one-day event ends on the next date.
    assert.match(out, /DTEND;VALUE=DATE:20260917/);
  });

  it("writes a timed event when the weekday has a start time", () => {
    const out = build([
      {
        date: "2026-09-16",
        title: "Quality intervals",
        minutes: 60,
        description: "",
        startAt: "06:30",
      },
    ]);
    assert.match(out, /DTSTART:20260916T063000/);
    assert.match(out, /DTEND:20260916T073000/);
  });

  it("rolls a session past midnight onto the next date", () => {
    const out = build([
      { date: "2026-09-16", title: "Night run", minutes: 120, description: "", startAt: "23:30" },
    ]);
    assert.match(out, /DTSTART:20260916T233000/);
    assert.match(out, /DTEND:20260917T013000/);
  });

  it("keeps the same UID per date so a rewritten week updates in place", () => {
    const a = build([{ date: "2026-09-16", title: "Easy", minutes: 40, description: "" }]);
    const b = build([{ date: "2026-09-16", title: "Rest", minutes: 0, description: "" }]);
    const uid = /UID:([^\r\n]+)/;
    assert.equal(a.match(uid)?.[1], b.match(uid)?.[1]);
  });

  it("escapes the characters iCalendar treats as syntax", () => {
    const out = build([
      {
        date: "2026-09-16",
        title: "Hills; fast, then easy",
        minutes: 50,
        description: "Line one\nline two",
      },
    ]);
    assert.match(out, /SUMMARY:Hills\\; fast\\, then easy/);
    assert.match(out, /DESCRIPTION:Line one\\nline two/);
  });

  it("folds long lines and uses CRLF endings throughout", () => {
    const out = build([
      {
        date: "2026-09-16",
        title: "x".repeat(200),
        minutes: 50,
        description: "",
      },
    ]);
    for (const line of out.split("\r\n")) {
      assert.ok(line.length <= 75, `line too long: ${line.length}`);
    }
    assert.ok(out.endsWith("\r\n"));
    assert.ok(!/[^\r]\n/.test(out), "every LF must be preceded by CR");
  });

  it("brackets events inside a single VCALENDAR", () => {
    const out = build([
      { date: "2026-09-16", title: "A", minutes: 30, description: "" },
      { date: "2026-09-17", title: "B", minutes: 30, description: "" },
    ]);
    assert.equal(out.match(/BEGIN:VEVENT/g)?.length, 2);
    assert.equal(out.match(/BEGIN:VCALENDAR/g)?.length, 1);
    assert.equal(out.match(/END:VCALENDAR/g)?.length, 1);
  });
});
