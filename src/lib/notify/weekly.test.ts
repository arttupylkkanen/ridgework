import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { shouldSend, targetMonday, weeklyNote } from "./weekly.ts";
import type { RealizedWeek } from "../plan-engine.ts";

const week: RealizedWeek = {
  calendar: 4,
  phase: "base",
  eased: false,
  reasons: [],
  days: [
    { key: "rest" },
    { key: "easy", minutes: 50 },
    { key: "rest" },
    { key: "easy", minutes: 40 },
    { key: "rest" },
    { key: "long", minutes: 90 },
    { key: "easy", minutes: 40 },
  ] as RealizedWeek["days"],
  dates: [
    "2026-06-01",
    "2026-06-02",
    "2026-06-03",
    "2026-06-04",
    "2026-06-05",
    "2026-06-06",
    "2026-06-07",
  ],
};

const note = () =>
  weeklyNote({
    name: "Arttu",
    week,
    sessions: { rest: "Rest", easy: "Easy", long: "Long" },
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    deskUrl: "https://ridgework.org/app",
    stopUrl: "https://ridgework.org/notify?stop=abc",
  });

describe("which week the note is about", () => {
  it("names the next Monday when run on the Sunday before it", () => {
    // 2026-06-07 is a Sunday; the week it introduces starts 2026-06-08.
    assert.equal(targetMonday("2026-06-07"), "2026-06-08");
  });

  it("names today when run on a Monday", () => {
    assert.equal(targetMonday("2026-06-08"), "2026-06-08");
  });

  it("never names a week that is already half over", () => {
    // Run mid-week by hand, the note must still describe the week ahead.
    for (const day of ["2026-06-09", "2026-06-10", "2026-06-11", "2026-06-12", "2026-06-13"]) {
      assert.equal(targetMonday(day), "2026-06-15", day);
    }
  });
});

describe("one note per week described, at most", () => {
  it("sends when no note has gone out yet", () => {
    assert.equal(shouldSend(null, "2026-06-07"), true);
  });

  it("does not send the same week twice", () => {
    // A retried run asks again minutes later, and the Monday run asks about the
    // week the Sunday run already covered.
    assert.equal(shouldSend("2026-06-08", "2026-06-07"), false);
    assert.equal(shouldSend("2026-06-08", "2026-06-08"), false);
  });

  it("moves on to the following week once this one has begun", () => {
    // Asked on the Wednesday of the week already sent, the answer is yes —
    // because the target has moved to the week after. That is only reachable by
    // running the sender by hand off its Sunday schedule, and the note it
    // produces is early rather than wrong.
    assert.equal(shouldSend("2026-06-08", "2026-06-10"), true);
  });

  it("sends again once the next week comes round", () => {
    assert.equal(shouldSend("2026-06-08", "2026-06-14"), true);
  });

  it("picks up a week that was missed entirely", () => {
    // The Sunday slot never fired. Running late still sends, for the week
    // ahead, rather than staying silent because a date has passed.
    assert.equal(shouldSend("2026-06-01", "2026-06-17"), true);
  });
});

describe("what the note says", () => {
  it("lists every day of the week, in order, with its minutes", () => {
    const { text } = note();
    const body = text.split("\n");
    assert.ok(body.includes("Tue  Easy · 50 min"), text);
    assert.ok(body.includes("Sat  Long · 90 min"), text);
    // Rest days carry no duration rather than a fabricated zero.
    assert.ok(body.includes("Mon  Rest"), text);
    assert.equal(body.filter((l) => /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s{2}/.test(l)).length, 7);
  });

  it("always carries a way to stop", () => {
    assert.match(note().text, /https:\/\/ridgework\.org\/notify\?stop=abc/);
  });

  it("never nags about what was missed", () => {
    // The brief bans daily-logging guilt; this is the message best placed to
    // break that rule, so the ban is asserted rather than trusted.
    assert.doesNotMatch(note().text, /missed|streak|don't forget|remember to log/i);
  });

  it("greets somebody with no name without leaving a hole", () => {
    const text = weeklyNote({
      name: "   ",
      week,
      sessions: { rest: "Rest", easy: "Easy", long: "Long" },
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      deskUrl: "https://ridgework.org/app",
      stopUrl: "https://ridgework.org/notify?stop=abc",
    }).text;
    assert.ok(text.startsWith("Hello,"), text.slice(0, 40));
  });
});
