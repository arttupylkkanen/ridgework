import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { exampleHorizon } from "./example-horizon.ts";
import { addDaysIso, recommendedWeeks } from "./rolling-plan.ts";
import { applyCallToDay } from "./plan-engine.ts";
import { formatWeekNote, rewriteIndex, weekNoteFrom } from "./week-note.ts";

describe("the note a stranger can paste", () => {
  it("writes a training-partner note, not an advert", () => {
    const text = formatWeekNote({
      headline: "First 50 km · ready 12 June 2027",
      finish: "Finish well, not a time.",
      days: [
        { label: "Tue", was: "Quality intervals · 40 min", line: "Easy walk/jog · 28 min" },
        { label: "Sat", line: "Long easy · 90 min" },
      ],
      why: "Slept badly. Tuesday's quality is easy instead. Ready date stays.",
      url: "https://ridgework.org/example?goal=fifty&peak=2027-06-12",
    });
    assert.match(text, /Quality intervals · 40 min → Easy walk\/jog · 28 min/);
    assert.match(text, /Ready date stays/);
    assert.doesNotMatch(text, /operating system|AI coach|founding/i);
  });

  it("rewrites the hard session, not whatever weekday today happens to be", () => {
    const today = "2026-09-18";
    const week = exampleHorizon("fifty", addDaysIso(today, recommendedWeeks("fifty") * 7), today)
      .weeks[0];
    assert.ok(week);
    const index = rewriteIndex(week.days);
    assert.ok(index >= 0);
    const written = week.days[index]!;
    assert.notEqual(written.key, "rest");
    const shown = applyCallToDay(written, "easy").shown;
    assert.notEqual(shown.key, written.key);

    const note = weekNoteFrom({
      week,
      wrecked: true,
      headline: "First 50 km",
      finish: "Finish well, not a time.",
      why: "Slept badly.",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      sessions: { [written.key]: "Quality", [shown.key]: "Easy", rest: "Rest" },
      minutesLabel: (n) => `${n} min`,
    });
    assert.equal(note.index, index);
    assert.match(note.text, /→/);
  });

  it("leaves the week as written when they have not tapped wrecked", () => {
    const today = "2026-09-18";
    const week = exampleHorizon("fifty", addDaysIso(today, recommendedWeeks("fifty") * 7), today)
      .weeks[0];
    assert.ok(week);
    const note = weekNoteFrom({
      week,
      wrecked: false,
      headline: "First 50 km",
      finish: "Finish well, not a time.",
      why: "Slept badly.",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      sessions: Object.fromEntries(week.days.map((d) => [d.key, d.key])),
      minutesLabel: (n) => `${n} min`,
    });
    assert.doesNotMatch(note.text, /→/);
    assert.doesNotMatch(note.text, /Slept badly/);
  });
});
