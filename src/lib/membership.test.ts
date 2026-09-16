import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evaluateMembership, trialEnd } from "./membership.ts";
import { OWNER_EMAIL } from "./test-account.ts";

const start = "2026-09-14T16:20:00.000Z";

describe("evaluateMembership", () => {
  it("opens the desk for the first 14 days with no card at all", () => {
    const m = evaluateMembership({
      email: "a@b.c",
      createdAt: start,
      now: new Date("2026-09-20T12:00:00.000Z"),
    });
    assert.equal(m.status, "trialing");
    assert.equal(m.canUseDesk, true);
    assert.equal(m.canCancel, false);
    assert.equal(m.cancelScheduled, false);
    assert.equal(m.daysLeft, 9);
  });

  it("blocks the desk once the free trial window has closed with no card", () => {
    const m = evaluateMembership({
      email: "a@b.c",
      createdAt: start,
      now: new Date("2026-10-01T00:00:00.000Z"),
    });
    assert.equal(m.status, "needs_card");
    assert.equal(m.canUseDesk, false);
    assert.equal(m.canCancel, false);
    assert.equal(m.cancelScheduled, false);
  });

  it("opens the desk during Polar trial after the card is in", () => {
    const m = evaluateMembership({
      email: "a@b.c",
      createdAt: start,
      billingStatus: "trialing",
      canCancel: true,
      now: new Date("2026-09-20T12:00:00.000Z"),
    });
    assert.equal(m.status, "trialing");
    assert.equal(m.canUseDesk, true);
    assert.equal(m.canCancel, true);
  });

  it("stays open if Polar marked the membership active", () => {
    const m = evaluateMembership({
      email: "a@b.c",
      createdAt: start,
      billingStatus: "active",
      now: new Date("2026-10-20T00:00:00.000Z"),
    });
    assert.equal(m.status, "active");
    assert.equal(m.canUseDesk, true);
    assert.equal(m.cancelScheduled, false);
  });

  it("keeps access after cancel-at-period-end until Polar ends it", () => {
    const m = evaluateMembership({
      email: "a@b.c",
      createdAt: start,
      billingStatus: "canceling",
      canCancel: true,
      now: new Date("2026-10-20T00:00:00.000Z"),
    });
    assert.equal(m.status, "active");
    assert.equal(m.canUseDesk, true);
    assert.equal(m.cancelScheduled, true);
    assert.equal(m.canCancel, true);
  });

  it("closes after Polar cancel", () => {
    const m = evaluateMembership({
      email: "a@b.c",
      createdAt: start,
      billingStatus: "canceled",
      now: trialEnd(start),
    });
    assert.equal(m.status, "expired");
    assert.equal(m.canUseDesk, false);
  });

  it("does not lock a no-card athlete out while the checkout is closed", () => {
    const m = evaluateMembership({
      email: "someone@example.com",
      createdAt: start,
      now: new Date("2027-01-01T00:00:00.000Z"),
      checkoutOpen: false,
    });
    assert.equal(m.status, "trialing");
    assert.equal(m.canUseDesk, true);
    assert.equal(m.daysLeft, 0);
  });

  it("still expires a no-card trial once the checkout is open", () => {
    const m = evaluateMembership({
      email: "someone@example.com",
      createdAt: start,
      now: new Date("2027-01-01T00:00:00.000Z"),
      checkoutOpen: true,
    });
    assert.equal(m.status, "needs_card");
    assert.equal(m.canUseDesk, false);
  });

  it("never paywalls the shared tester login", () => {
    const m = evaluateMembership({
      email: "tester@ridgework.org",
      createdAt: start,
      now: new Date("2027-01-01T00:00:00.000Z"),
    });
    assert.equal(m.status, "active");
    assert.equal(m.canUseDesk, true);
  });

  it("never paywalls the owner Google login", () => {
    const m = evaluateMembership({
      email: OWNER_EMAIL,
      createdAt: start,
      now: new Date("2027-01-01T00:00:00.000Z"),
    });
    assert.equal(m.status, "active");
    assert.equal(m.canUseDesk, true);
  });
});
