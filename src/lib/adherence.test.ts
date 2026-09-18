import assert from "node:assert/strict";
import { test } from "node:test";
import {
  LOOKBACK_WEEKS,
  MIN_OBSERVATIONS,
  findings,
  MAX_FOLLOW_DOWN,
  hardestDayToKeep,
  keyToSoften,
  longBeingSkipped,
  longShortfall,
  missedDays,
  shortLongs,
  skippedKeys,
} from "./adherence.ts";
import type { SessionKey, SessionLog, SessionStatus } from "./rolling-plan.ts";

function log(
  weekCalendar: number,
  dayIndex: number,
  status: SessionStatus,
  extra: Partial<SessionLog> = {},
): SessionLog {
  return {
    date: `2026-01-${String(weekCalendar * 7 + dayIndex + 1).padStart(2, "0")}`,
    weekCalendar,
    dayIndex,
    plannedKey: "quality",
    actualKey: status === "missed" ? "rest" : "quality",
    status,
    at: "2026-01-01T00:00:00.000Z",
    ...extra,
  };
}

test("says nothing without enough evidence", () => {
  const logs = [log(1, 4, "missed"), log(2, 4, "missed")];
  assert.deepEqual(missedDays(logs, 5), []);
  assert.equal(logs.length, MIN_OBSERVATIONS - 1);
});

test("a weekday missed three times out of three is a finding", () => {
  const logs = [log(1, 4, "missed"), log(2, 4, "missed"), log(3, 4, "missed")];
  assert.deepEqual(missedDays(logs, 5), [{ id: "dayMissed", dayIndex: 4, missed: 3, of: 3 }]);
});

test("a weekday that mostly happens is left alone", () => {
  const logs = [log(1, 4, "missed"), log(2, 4, "done"), log(3, 4, "done"), log(4, 4, "done")];
  assert.deepEqual(missedDays(logs, 5), []);
});

test("the current week is still being lived, so it is not evidence", () => {
  const logs = [log(5, 4, "missed"), log(5, 3, "missed"), log(5, 2, "missed")];
  assert.deepEqual(missedDays(logs, 5), []);
});

test("history older than the lookback says more about last season", () => {
  const calendar = 20;
  const old = calendar - LOOKBACK_WEEKS - 1;
  const logs = [log(old, 4, "missed"), log(old - 1, 4, "missed"), log(old - 2, 4, "missed")];
  assert.deepEqual(missedDays(logs, calendar), []);
});

test("a moved session is the athlete's own fix, not a miss", () => {
  // markMoved writes two rows: the vacated slot and the day it landed on.
  const logs = [log(1, 4, "moved"), log(2, 4, "moved"), log(3, 4, "moved")];
  assert.deepEqual(missedDays(logs, 5), []);
});

test("the worst weekday ranks first", () => {
  const logs = [
    log(1, 4, "missed"),
    log(2, 4, "missed"),
    log(3, 4, "missed"),
    log(1, 2, "missed"),
    log(2, 2, "missed"),
    log(3, 2, "missed"),
    log(4, 2, "done"),
  ];
  const found = missedDays(logs, 5);
  assert.equal(found.length, 2);
  assert.equal(found[0].id === "dayMissed" && found[0].dayIndex, 4);
});

test("only one weekday is ever handed to the planner", () => {
  const logs = [
    log(1, 4, "missed"),
    log(2, 4, "missed"),
    log(3, 4, "missed"),
    log(1, 2, "missed"),
    log(2, 2, "missed"),
    log(3, 2, "missed"),
  ];
  assert.equal(hardestDayToKeep(missedDays(logs, 5)), 4);
});

test("no findings means no instruction", () => {
  assert.equal(hardestDayToKeep([]), null);
});

test("a session kind skipped wherever it lands is a finding", () => {
  const key: SessionKey = "strength";
  const logs = [
    log(1, 1, "missed", { plannedKey: key }),
    log(2, 3, "missed", { plannedKey: key }),
    log(3, 5, "missed", { plannedKey: key }),
  ];
  const found = skippedKeys(logs, 5);
  assert.equal(found.length, 1);
  assert.equal(found[0].id === "keySkipped" && found[0].key, "strength");
});

test("rest is not a session that can be skipped", () => {
  const logs = [
    log(1, 0, "missed", { plannedKey: "rest" }),
    log(2, 0, "missed", { plannedKey: "rest" }),
    log(3, 0, "missed", { plannedKey: "rest" }),
  ];
  assert.deepEqual(skippedKeys(logs, 5), []);
});

function longLog(week: number, planned: number, actual: number): SessionLog {
  return log(week, 6, "done", {
    plannedKey: "long",
    actualKey: "long",
    plannedMinutes: planned,
    actualMinutes: actual,
  });
}

test("long sessions done but consistently short are a finding", () => {
  const logs = [longLog(1, 180, 120), longLog(2, 180, 130), longLog(3, 180, 125)];
  const found = shortLongs(logs, 5);
  assert.ok(found && found.id === "longShort");
  assert.ok(found.share < 0.8);
  assert.equal(found.of, 3);
});

test("long sessions that run close to written are fine", () => {
  const logs = [longLog(1, 180, 175), longLog(2, 180, 180), longLog(3, 180, 165)];
  assert.equal(shortLongs(logs, 5), null);
});

test("a duration nobody entered is not treated as a full session", () => {
  // The whole point: marked done, no minutes. Assuming completion here would
  // hide the shortfall this finding exists to catch.
  const logs = [
    log(1, 6, "done", { plannedKey: "long", plannedMinutes: 180 }),
    log(2, 6, "done", { plannedKey: "long", plannedMinutes: 180 }),
    log(3, 6, "done", { plannedKey: "long", plannedMinutes: 180 }),
  ];
  assert.equal(shortLongs(logs, 5), null);
});

test("findings reads missing logs as an empty history", () => {
  assert.deepEqual(findings(undefined, 5), []);
  assert.deepEqual(findings([], 5), []);
});

test("findings returns days, then keys, then duration", () => {
  const logs = [
    log(1, 4, "missed"),
    log(2, 4, "missed"),
    log(3, 4, "missed"),
    longLog(1, 180, 100),
    longLog(2, 180, 110),
    longLog(3, 180, 105),
  ];
  const ids = findings(logs, 5).map((f) => f.id);
  assert.deepEqual(ids, ["dayMissed", "keySkipped", "longShort"]);
});

/**
 * `findings` computed three things and the planner read one. `longShort` and
 * `keySkipped` were calculated every week and thrown away — including the
 * shortfall, which is the only signal that a ramp is too steep for the person
 * following it.
 */
test("the long run's shortfall reaches the planner", () => {
  const short = (week: number) =>
    log(week, 5, "done", {
      plannedKey: "long",
      actualKey: "long",
      plannedMinutes: 100,
      actualMinutes: 70,
    });
  const got = longShortfall(findings([short(1), short(2), short(3)], 5));
  assert.equal(got, 0.7);
});

test("the plan follows the athlete down, but only so far", () => {
  // Reading a 40% shortfall straight would let one bad month set the ceiling
  // for the season: shorter written, shorter logged, shorter written again.
  const bad = (week: number) =>
    log(week, 5, "done", {
      plannedKey: "long",
      actualKey: "long",
      plannedMinutes: 100,
      actualMinutes: 40,
    });
  assert.equal(longShortfall(findings([bad(1), bad(2), bad(3)], 5)), MAX_FOLLOW_DOWN);
});

test("longs that are done in full ask for no adjustment", () => {
  const full = (week: number) =>
    log(week, 5, "done", {
      plannedKey: "long",
      actualKey: "long",
      plannedMinutes: 100,
      actualMinutes: 98,
    });
  assert.equal(longShortfall(findings([full(1), full(2), full(3)], 5)), null);
});

test("a hard session nobody does is handed over to be softened", () => {
  const skipped = (week: number) => log(week, 2, "missed", { plannedKey: "quality" });
  assert.equal(keyToSoften(findings([skipped(1), skipped(2), skipped(3)], 5)), "quality");
});

test("the long run is never the session handed over", () => {
  // Swapping it for easy work would turn an ultra build into a jogging
  // schedule without telling anyone. It is reported instead.
  const skipped = (week: number) =>
    log(week, 5, "missed", { plannedKey: "long", actualKey: "rest" });
  const found = findings([skipped(1), skipped(2), skipped(3)], 5);
  assert.equal(keyToSoften(found), null);
  assert.equal(longBeingSkipped(found), true);
});

test("an easy day nobody does is not worth rewriting the week over", () => {
  const skipped = (week: number) => log(week, 2, "missed", { plannedKey: "easy" });
  assert.equal(keyToSoften(findings([skipped(1), skipped(2), skipped(3)], 5)), null);
});

test("no history means no instruction, for either of them", () => {
  assert.equal(longShortfall([]), null);
  assert.equal(keyToSoften([]), null);
  assert.equal(longBeingSkipped([]), false);
});
