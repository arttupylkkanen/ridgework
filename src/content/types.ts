import type { ObjectiveId } from "@/lib/rolling-plan";
import type { PlanToolsCopy } from "./plan-tools";
import type { AthleteCopy } from "./athlete-copy";
import type { MountainPrepCopy } from "./mountain-prep";

export type NavItem = { href: string; label: string; hash?: string };

export type FaqItem = { q: string; a: string };

export type ProjectBrief = {
  title: string;
  fields: { label: string; value: string; locked?: boolean }[];
};

export type ProgramRow = {
  id: ObjectiveId;
  name: string;
  duration: string;
  focus: string;
  locked: string;
  tag?: string;
  pull?: string;
  layout?: "default" | "wide" | "textFirst" | "sessionLead" | "compact";
};

export type FieldStory = {
  kicker: string;
  title: string;
  place: string;
  pull: string;
  body: string[];
  lesson: string;
  science: string;
};

export type FieldPage = {
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lead: string;
  compositeNote: string;
  back: string;
  storyNote: string;
  storySource: string;
  teaserH2: string;
  teaserLead: string;
  teaserCta: string;
  tabs: { stories: string; science: string; terrain: string };
  stories: FieldStory[];
  science: {
    kicker: string;
    h2: string;
    lead: string;
    limitTitle: string;
    limitBody: string;
    sections: { title: string; body: string[] }[];
  };
  terrain: {
    kicker: string;
    h2: string;
    lead: string;
    photoNote: string;
    items: { id: string; title: string; place: string; caption: string }[];
  };
};

export type Copy = {
  metaTitle: string;
  metaDescription: string;
  footerTag: string;
  legalEntity: string;
  support: string;
  cancelAnytime: string;
  terms: string;
  privacy: string;
  copyright: string;
  nav: {
    about: string;
    method: string;
    projects: string;
    programs: string;
    who: string;
    what: string;
    week: string;
    pricing: string;
    faq: string;
    app: string;
    field: string;
    guides: string;
    example: string;
    menu: string;
    login: string;
    account: string;
  };
  cta: { start: string; pricing: string; openTools: string };
  hero: { kicker: string; h1: string; lead: string; trial: string };
  about: {
    kicker: string;
    h2: string;
    lead: string;
    cards: { title: string; body: string }[];
  };
  method: {
    kicker: string;
    h2: string;
    lead: string;
    cards: { title: string; body: string }[];
    caveatsTitle: string;
    caveats: string[];
    sourcesTitle: string;
  };
  /**
   * Optional: the rolling-plan-engine explainer section. English-only for
   * now (one language at a time) — the homepage renders nothing where this
   * is absent, so fi/fr/de need no placeholder.
   */
  rollingEngine?: {
    kicker: string;
    h2: string;
    lead: string;
    points: { title: string; body: string }[];
  };
  projects: {
    kicker: string;
    h2: string;
    lead: string;
    items: ProjectBrief[];
  };
  programs: {
    kicker: string;
    h2: string;
    lead: string;
    columns: { name: string; duration: string; focus: string; recipe: string };
    rows: ProgramRow[];
    lockHint: string;
    cta: string;
  };
  who: {
    h2: string;
    forTitle: string;
    forItems: string[];
    notTitle: string;
    notItems: string[];
  };
  what: {
    h2: string;
    items: { n: string; title: string; body: string }[];
  };
  week: {
    h2: string;
    steps: { day: string; title: string; body: string }[];
  };
  scenario: {
    kicker: string;
    h2: string;
    setup: string;
    facts: { label: string; value: string }[];
    says: string;
    actions: string[];
    note: string;
  };
  firstWeek: {
    kicker: string;
    h2: string;
    lead: string;
    days: { day: string; title: string; body: string }[];
  };
  guidesIndex: {
    kicker: string;
    h2: string;
    lead: string;
    cta: string;
    read: string;
  };
  pricing: {
    kicker: string;
    h2: string;
    lead: string;
    badge: string;
    trialBadge: string;
    name: string;
    /** Struck through next to `price` when set — a comparison anchor, not a second buyable tier. */
    anchorPrice?: string;
    price: string;
    per: string;
    blurb: string;
    features: string[];
    laterTitle: string;
    laterBody: string;
  };
  checkout: {
    kicker: string;
    h2: string;
    lead: string;
    name: string;
    email: string;
    submit: string;
    note: string;
    successTitle: string;
    successBody: string;
    daysLeft: string;
    payTitle: string;
    payBody: string;
    payCta: string;
    trialLeft: string;
    trialNoCard: string;
    trialOn: string;
    subscribed: string;
    payFail: string;
    paying: string;
    dueToday: string;
    dueAmount: string;
    terms: string;
    includesTitle: string;
    includes: string[];
    afterLine: string;
    chipCancel: string;
    chipSupport: string;
    chipMerchant: string;
    cancelCta: string;
    cancelConfirm: string;
    cancelYes: string;
    cancelKeep: string;
    canceling: string;
    canceledNow: string;
    canceledLater: string;
    manageCta: string;
    cancelFail: string;
  };
  faq: { h2: string; items: FaqItem[] };
  disclaimer: { h2: string; body: string };
  foundingPage: {
    kicker: string;
    h1: string;
    lead: string;
    trial: string;
    note: string;
    back: string;
    title: string;
    description: string;
  };
  termsPage: { title: string; updated: string; body: string[] };
  privacyPage: { title: string; updated: string; body: string[] };
  examplePage: {
    title: string;
    description: string;
    back: string;
    kicker: string;
    h1: string;
    lead: string;
    noteTitle: string;
    noteBody: string;
  };
  appPage: {
    title: string;
    kicker: string;
    h1: string;
    lead: string;
    lockedTitle: string;
    lockedBody: string;
    trialLabel: string;
    testBanner: string;
    signInToTrain: string;
    tabs: {
      week: string;
      plan: string;
      prep: string;
      log: string;
      today: string;
      profile: string;
      whatIf: string;
      passport: string;
    };
  };
  auth: {
    title: string;
    lead: string;
    email: string;
    password: string;
    name: string;
    signIn: string;
    signUp: string;
    or: string;
    withGoogle: string;
    withX: string;
    haveAccount: string;
    noAccount: string;
    error: string;
    testNote: string;
  };
  dashboard: {
    enrollments: string;
    empty: string;
    billingTest: string;
    peak: string;
    statusTest: string;
    saved: string;
  };
  fieldPage: FieldPage;
  tools: {
    week: {
      save: string;
      saved: string;
      days: string[];
      types: { easy: string; steady: string; hard: string; rest: string };
      session: string;
      readiness: string;
      readinessLead: string;
      levels: { fresh: string; ok: string; tired: string; wrecked: string };
      notes: { fresh: string; ok: string; tired: string; wrecked: string };
    };
    pace: {
      title: string;
      lead: string;
      talkTitle: string;
      talk: string;
      zonesTitle: string;
      feelHead: string;
      watchHead: string;
      noneHead: string;
      rows: { zone: string; feel: string; watch: string; none: string }[];
      alpineTitle: string;
      alpine: string;
    };
    prep: MountainPrepCopy;
    log: {
      empty: string;
      decision: string;
      why: string;
      add: string;
      clear: string;
    };
    plan: PlanToolsCopy;
    athlete: AthleteCopy;
    passport: import("./passport").PassportCopy;
    whatIf: import("./passport").WhatIfCopy;
  };
};
