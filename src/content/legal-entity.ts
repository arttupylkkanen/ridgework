/**
 * The facts French law requires a site to publish, in one place.
 *
 * LCEN art. 6 III obliges anyone publishing a site professionally to name the
 * publisher, give an address and a phone number, name the director of
 * publication, give the registration number once registered, and identify the
 * host. GDPR art. 13 then requires the controller's identity on top.
 *
 * Kept out of the four locale files on purpose. A SIREN translated four ways
 * is a SIREN that will eventually disagree with itself; the locale files carry
 * the labels, this carries the values.
 *
 * `null` means "we do not have this yet", not "hide it". The page prints an
 * explicit line for every missing field rather than quietly omitting it,
 * because a mentions légales page that silently lacks a required field looks
 * complete and is not.
 */

export type LegalEntity = {
  /** Registered name, or the individual's full name before registration. */
  name: string | null;
  /** Legal form: "Micro-entreprise", "SASU", "SAS"… */
  form: string | null;
  /** Full postal address of the registered office. */
  address: string | null;
  /** A number a reader can actually call. Required by LCEN. */
  phone: string | null;
  /** SIREN, once the company exists. */
  siren: string | null;
  /** Intra-community VAT number, if registered for VAT. */
  vat: string | null;
  /** Share capital, for companies. */
  capital: string | null;
  /** Directeur de la publication — a named person, not a role. */
  publicationDirector: string | null;
  /** Always present: the address that reaches a human. */
  email: string;
};

/**
 * Ridgework's own details.
 *
 * TO FILL BEFORE TRADING — each of these is a legal requirement, not a nicety:
 *   name, form, address, phone, publicationDirector
 * TO FILL ON REGISTRATION:
 *   siren, and vat + capital if they apply
 */
export const ENTITY: LegalEntity = {
  name: null,
  form: null,
  address: null,
  phone: null,
  siren: null,
  vat: null,
  capital: null,
  publicationDirector: null,
  email: "support@ridgework.org",
};

export type HostId = "vercel" | "neon" | "resend" | "cloudflare";

export type Host = {
  /** Keys the localised description in `copy.legalPage.hostRoles`. */
  id: HostId;
  name: string;
  address: string;
  contact: string;
  /**
   * Where the data physically sits. A place name, so it reads the same in
   * every language — unlike the role, which is prose and lives in the locale
   * files. A French legal page describing its host in English is not a French
   * legal page.
   */
  region: string;
};

/**
 * Who actually runs the machines. Verified against this project's own setup
 * rather than copied from a template — these are the providers Ridgework was
 * moved onto, not a generic list.
 */
export const HOSTS: Host[] = [
  {
    id: "vercel",
    name: "Vercel Inc.",
    address: "340 S Lemon Ave #4133, Walnut, CA 91789, United States",
    contact: "https://vercel.com/help",
    region: "Paris (cdg1)",
  },
  {
    id: "neon",
    name: "Neon Inc.",
    address: "209 Orange St, Wilmington, DE 19801, United States",
    contact: "https://neon.com/contact-sales",
    region: "Europe (Frankfurt)",
  },
  {
    id: "resend",
    name: "Resend (Plus Five Five, Inc.)",
    address: "2261 Market Street #5039, San Francisco, CA 94114, United States",
    contact: "https://resend.com/contact",
    region: "Europe (Ireland)",
  },
  {
    id: "cloudflare",
    name: "Cloudflare, Inc.",
    address: "101 Townsend St, San Francisco, CA 94107, United States",
    contact: "https://www.cloudflare.com/contact/",
    region: "Global network",
  },
];

/** Whether the mandatory publisher fields are all present. */
export function entityComplete(entity: LegalEntity = ENTITY): boolean {
  return Boolean(
    entity.name && entity.form && entity.address && entity.phone && entity.publicationDirector,
  );
}

/** The mandatory fields still missing, in the order the page prints them. */
export function missingFields(entity: LegalEntity = ENTITY): string[] {
  const required: [keyof LegalEntity, string][] = [
    ["name", "name"],
    ["form", "form"],
    ["address", "address"],
    ["phone", "phone"],
    ["publicationDirector", "publicationDirector"],
  ];
  return required.filter(([key]) => !entity[key]).map(([, label]) => label);
}
