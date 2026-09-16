import assert from "node:assert/strict";
import { test } from "node:test";
import { getCopy } from "../content/index.ts";
import { LOCALES } from "./locale.ts";
import {
  ENTITY,
  HOSTS,
  entityComplete,
  missingFields,
  type LegalEntity,
} from "../content/legal-entity.ts";

const filled: LegalEntity = {
  name: "Ridgework SASU",
  form: "SASU",
  address: "1 rue Example, 74400 Chamonix, France",
  phone: "+33 1 23 45 67 89",
  siren: "123 456 789",
  vat: null,
  capital: "1 000 €",
  publicationDirector: "Arttu Pylkkänen",
  email: "support@ridgework.org",
};

test("a fully filled publisher is complete", () => {
  assert.equal(entityComplete(filled), true);
  assert.deepEqual(missingFields(filled), []);
});

test("VAT and capital are not what make it complete", () => {
  // Neither applies to every legal form, so neither can be mandatory.
  assert.equal(entityComplete({ ...filled, vat: null, capital: null }), true);
});

test("each mandatory field is actually mandatory", () => {
  for (const key of ["name", "form", "address", "phone", "publicationDirector"] as const) {
    assert.equal(entityComplete({ ...filled, [key]: null }), false, `${key} should be required`);
    assert.ok(missingFields({ ...filled, [key]: null }).includes(key));
  }
});

test("Ridgework is not registered yet, and the page must not pretend otherwise", () => {
  // This fails the day the real values land, which is the reminder to delete it.
  assert.equal(entityComplete(ENTITY), false);
  assert.ok(missingFields(ENTITY).length > 0);
});

test("an address that can be reached is always present", () => {
  assert.match(ENTITY.email, /@ridgework\.org$/);
});

test("every host names what it does and where the data sits", () => {
  assert.ok(HOSTS.length >= 2);
  for (const host of HOSTS) {
    assert.ok(host.name.length > 0);
    assert.ok(host.address.length > 0, `${host.name} needs a postal address`);
    assert.ok(host.region.length > 0, `${host.name} needs a region`);
    assert.match(host.contact, /^https?:\/\//);
  }
});

test("the hébergeur proper is named first", () => {
  assert.equal(HOSTS[0]!.id, "vercel");
});

test("every host has prose waiting for it in every locale", () => {
  // A French legal page describing its host in English is not a French legal
  // page, so the description cannot live next to the address.
  for (const locale of LOCALES) {
    const roles = getCopy(locale).legalPage.hostRoles;
    for (const host of HOSTS) {
      assert.ok(roles[host.id]?.length > 0, `${locale} is missing ${host.id}`);
    }
  }
});
