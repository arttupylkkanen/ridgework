import assert from "node:assert/strict";
import { test } from "node:test";
import { MATERIAL_SHARE, totalMinutes, trimCost, weekShortfall } from "./session-cost.ts";
import type { DaySession } from "./rolling-plan.ts";

const rest: DaySession = { kind: "rest", key: "rest", minutes: 0 };
const day = (minutes: number): DaySession => ({ kind: "easy", key: "easy", minutes });

test("an untouched week cost nothing", () => {
  const week = [day(60), day(60), rest, day(60), rest, day(180), day(45)];
  assert.deepEqual(trimCost(week, week), {
    capped: 0,
    lost: 0,
    recovered: 0,
    recoveredOn: null,
    net: 0,
  });
});

test("counts the minutes cut, not the days touched", () => {
  const before = [day(180), day(60)];
  const after = [day(120), day(60)];
  const cost = trimCost(before, after);
  assert.equal(cost.capped, 1);
  assert.equal(cost.lost, 60);
});

test("separates what came back from what went", () => {
  const before = [day(180), day(60), day(60)];
  const after = [day(120), day(85), day(80)];
  const cost = trimCost(before, after);
  assert.equal(cost.lost, 60);
  assert.equal(cost.recovered, 45);
  assert.equal(cost.net, 15);
});

test("names the day carrying most of the recovery", () => {
  const before = [day(180), day(60), day(60)];
  const after = [day(120), day(70), day(100)];
  assert.equal(trimCost(before, after).recoveredOn, 2);
});

test("a week that lost time with nowhere to put it says so", () => {
  const before = [day(180), rest];
  const after = [day(120), rest];
  const cost = trimCost(before, after);
  assert.equal(cost.recovered, 0);
  assert.equal(cost.recoveredOn, null);
  assert.equal(cost.net, 60);
});

test("rest days are not time, however they are stored", () => {
  assert.equal(totalMinutes([rest, { kind: "rest", key: "rest", minutes: 99 }]), 0);
});

test("a week at or over target reports no shortfall", () => {
  assert.equal(weekShortfall([day(300)], 300), null);
  assert.equal(weekShortfall([day(400)], 300), null);
});

test("a shortfall inside normal variation is not worth a line", () => {
  // 5% under. Reporting this every week teaches people to ignore the line,
  // and then the 25% week goes unread too.
  const target = 300;
  const planned = Math.round(target * (1 - MATERIAL_SHARE / 2));
  assert.equal(weekShortfall([day(planned)], target), null);
});

test("a shortfall that matters is reported as a whole percent", () => {
  const found = weekShortfall([day(240)], 300);
  assert.deepEqual(found, { target: 300, planned: 240, short: 60, share: 20 });
});

test("a target of zero cannot be missed", () => {
  assert.equal(weekShortfall([day(0)], 0), null);
});

test("nonsense in never becomes NaN% in front of an athlete", () => {
  assert.equal(weekShortfall([day(60)], Number.NaN), null);
  assert.equal(weekShortfall([day(Number.NaN)], 300), null);
});
