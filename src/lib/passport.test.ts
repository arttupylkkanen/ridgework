import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  PRIVATE_DEFAULT,
  buildSnapshot,
  emptyPassport,
  filterForShare,
  upsertEvent,
  type PassportEvent,
} from "./passport.ts";
import { applyCheckin, nextSeason, startPlan, type RollingState, type SessionLog } from "./rolling-plan.ts";

const FROM = new Date(2026, 0, 5);

function log(over: Partial<SessionLog>): SessionLog {
  return {
    date: "2026-01-10",
    weekCalendar: 1,
    dayIndex: 5,
    plannedKey: "long",
    actualKey: "long",
    status: "done",
    at: "2026-01-10T10:00:00.000Z",
    ...over,
  };
}

function event(over: Partial<PassportEvent> = {}): PassportEvent {
  return {
    id: "evt_1",
    date: "2026-06-20",
    name: "Local 50k",
    objective: "fifty",
    distanceKm: 52,
    elevationM: 1800,
    durationMin: 420,
    result: "finished",
    confidence: 4,
    lesson: "Walk the steep bits early.",
    season: 1,
    ...over,
  };
}

describe("performance passport", () => {
  it("compares the current season to this athlete's previous one, not to an elite template", () => {
    let s1: RollingState = startPlan("fifty", "2026-06-22", FROM, 1);
    s1 = applyCheckin(s1, "good", "");
    s1 = applyCheckin(s1, "problem", "tired");
    s1 = { ...s1, logs: [log({ date: "2026-01-10" }), log({ date: "2026-01-17", weekCalendar: 2, status: "missed", actualKey: "rest" })] };
    const s2 = nextSeason(s1, "2026-12-01", FROM);
    assert.equal(s2.season, 2);
    assert.equal(s2.history?.length, 1);
    assert.equal(s2.history?.[0]?.season, 1);
    assert.equal(s2.history?.[0]?.logs.length, 2);

    const snap = buildSnapshot([s2], [event({ season: 1 })], [], "fifty");
    assert.ok(snap.current);
    assert.ok(snap.previous);
    assert.equal(snap.previous?.season, 1);
    assert.equal(snap.previous?.sessionsDone, 1);
    assert.equal(snap.previous?.sessionsMissed, 1);
    assert.equal(snap.previous?.completionRate, 0.5);
    assert.equal(snap.current?.season, 2);
    assert.equal(snap.deltas.find((d) => d.key === "completion")?.direction, "new");
  });

  it("does not invent a 0% completion rate when nothing has been logged", () => {
    const state = startPlan("trail20", "2026-04-01", FROM);
    const snap = buildSnapshot([state], [], [], "trail20");
    assert.equal(snap.current?.completionRate, null);
    assert.equal(snap.current?.consistency, null);
  });

  it("reads personal bests from this athlete's finished outings", () => {
    const state = startPlan("ultra100", "2026-09-01", FROM);
    const snap = buildSnapshot(
      [state],
      [
        event({ id: "a", name: "A", distanceKm: 50, durationMin: 300, elevationM: 1000 }),
        event({ id: "b", name: "B", distanceKm: 100, durationMin: 720, elevationM: 4200, date: "2026-08-01" }),
      ],
    );
    const dist = snap.pbs.find((p) => p.kind === "distance");
    const dur = snap.pbs.find((p) => p.kind === "duration");
    const el = snap.pbs.find((p) => p.kind === "elevation");
    assert.equal(dist?.value, 100);
    assert.equal(dur?.value, 720);
    assert.equal(el?.value, 4200);
    assert.equal(el?.name, "B");
  });

  it("keeps the share payload empty until the athlete turns sharing on", () => {
    const state = startPlan("fifty", "2026-06-22", FROM);
    const record = upsertEvent(emptyPassport(), event());
    const snap = buildSnapshot([state], record.events);
    assert.equal(filterForShare(snap, record.events, PRIVATE_DEFAULT, "2026-09-14"), null);
  });

  it("strips lessons and confidence when those flags are off", () => {
    const state = startPlan("fifty", "2026-06-22", FROM);
    const events = [event()];
    const snap = buildSnapshot([state], events);
    const shared = filterForShare(
      snap,
      events,
      {
        ...PRIVATE_DEFAULT,
        publicEnabled: true,
        showEvents: true,
        showPbs: true,
        displayName: "Alex",
        audience: "coach",
      },
      "2026-09-14",
    );
    assert.ok(shared);
    assert.equal(shared.displayName, "Alex");
    assert.equal(shared.events[0]?.lesson, "");
    assert.equal(shared.lessons.length, 0);
    assert.equal(shared.avgConfidence, null);
    assert.ok(shared.pbs.length >= 1);
    assert.equal(shared.totals, null);
  });

  it("counts mountain days from done sessions, not from a fake GPS total", () => {
    const state: RollingState = {
      ...startPlan("alpine", "2026-03-01", FROM),
      logs: [
        log({ actualKey: "climb", plannedKey: "climb", date: "2026-01-06", dayIndex: 1 }),
        log({ actualKey: "hike", plannedKey: "hike", date: "2026-01-11", dayIndex: 6 }),
        log({ actualKey: "easy", plannedKey: "easy", date: "2026-01-07", dayIndex: 2 }),
      ],
    };
    const snap = buildSnapshot([state], []);
    assert.equal(snap.current?.mountainDays, 2);
    assert.equal(snap.totals.elevationM, 0);
  });
});
