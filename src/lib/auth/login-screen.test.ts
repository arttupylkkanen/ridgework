import assert from "node:assert/strict";
import { test } from "node:test";
import { readSignInError, readSignUpError, screenFromQuery } from "./login-screen.ts";

test("a plain visit shows the form", () => {
  assert.deepEqual(screenFromQuery(null, null), { kind: "form" });
  assert.deepEqual(screenFromQuery("", null), { kind: "form" });
  assert.deepEqual(screenFromQuery("   ", null), { kind: "form" });
});

test("a reset link opens the new-password screen", () => {
  assert.deepEqual(screenFromQuery("abc123", null), { kind: "setPassword", token: "abc123" });
});

test("an expired link says so instead of showing a dead form", () => {
  assert.deepEqual(screenFromQuery(null, "INVALID_TOKEN"), { kind: "linkExpired" });
});

test("an expired link wins over a token that came with it", () => {
  assert.deepEqual(screenFromQuery("abc123", "INVALID_TOKEN"), { kind: "linkExpired" });
});

test("a duplicate address is named, not disguised as a sent email", () => {
  assert.equal(readSignUpError({ code: "USER_ALREADY_EXISTS" }), "alreadyRegistered");
  assert.equal(readSignUpError({ message: "User already exists" }), "alreadyRegistered");
});

test("a short password is its own failure", () => {
  assert.equal(readSignUpError({ message: "Password too short" }), "weakPassword");
});

test("an unknown signup failure is not guessed at", () => {
  assert.equal(readSignUpError({ code: "SOMETHING_ELSE" }), "failed");
  assert.equal(readSignUpError(null), "failed");
});

test("an unverified address is not a wrong password", () => {
  // These need different words: one means "check your inbox", the other means
  // "you typed it wrong". Telling an unverified user their password is wrong
  // sends them to a reset they do not need.
  assert.equal(readSignInError({ code: "EMAIL_NOT_VERIFIED" }), "unverified");
  assert.equal(readSignInError({ code: "INVALID_EMAIL_OR_PASSWORD" }), "badCredentials");
  assert.equal(readSignInError({ code: "USER_NOT_FOUND" }), "badCredentials");
});

test("an unknown sign-in failure is not guessed at", () => {
  assert.equal(readSignInError({ code: "RATE_LIMITED" }), "failed");
});
