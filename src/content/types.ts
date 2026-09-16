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

export type OfferTerms = {
  /** Primary button label, everywhere one appears. */
  cta: string;
  /** Headline and standfirst of the pricing section. */
  title: string;
  lead: string;
  /** Short chip on the pricing card. */
  badge: string;
  /** One sentence under the hero and above the sign-up form. */
  line: string;
  /** Four bullets on the pricing card. */
  features: string[];
  laterTitle: string;
  laterBody: string;
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
  legalNotice: string;
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
  cta: { pricing: string; openTools: string };
  /**
   * The two shapes the offer can take. src/lib/offer.ts picks one from
   * CHECKOUT_OPEN — never read both, and never hard-code a trial length in
   * copy outside this block.
   */
  offer: { free: OfferTerms; trial: OfferTerms };
  hero: {
    kicker: string;
    h1: string;
    lead: string;
    proofLabel: string;
    proofHeld: string;
  };
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
    /** Condensed method block rendered high on the homepage, above the programs. */
    teaserH2: string;
    teaserLead: string;
    teaserCta: string;
    allSourcesCta: string;
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
    weekTitle: string;
    writtenLabel: string;
    shownLabel: string;
    changeNote: string;
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
  /** Everything price-dependent lives on `offer`; these are the fixed labels. */
  pricing: {
    kicker: string;
    name: string;
    freeTag: string;
    price: string;
    per: string;
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
    /** Shown while CHECKOUT_OPEN is false — no card can be taken yet. */
    closedTitle: string;
    closedBody: string;
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
  /** Mentions légales — the publisher and host disclosure French law requires. */
  legalPage: {
    title: string;
    updated: string;
    lead: string;
    publisherTitle: string;
    labels: {
      name: string;
      form: string;
      address: string;
      phone: string;
      siren: string;
      vat: string;
      capital: string;
      director: string;
      email: string;
    };
    pending: string;
    pendingNote: string;
    hostTitle: string;
    hostLead: string;
    hostRole: string;
    hostRoles: Record<"vercel" | "neon" | "resend" | "cloudflare", string>;
    hostRegion: string;
    hostContact: string;
    contactTitle: string;
    contactBody: string;
  };
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
  sourcesPage: {
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
      more: string;
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
    verifyTitle: string;
    verifyBody: string;
    forgotLink: string;
    forgotTitle: string;
    forgotBody: string;
    forgotSend: string;
    resetSentTitle: string;
    resetSentBody: string;
    setPasswordTitle: string;
    setPasswordBody: string;
    newPassword: string;
    setPasswordCta: string;
    resetDoneTitle: string;
    resetDoneBody: string;
    linkExpiredTitle: string;
    linkExpiredBody: string;
    alreadyRegistered: string;
    weakPassword: string;
    unverifiedTitle: string;
    unverifiedBody: string;
    resend: string;
    resent: string;
    backToSignIn: string;
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
    /** Calendar subscription and intervals.icu push. */
    sync: {
      tab: string;
      kicker: string;
      title: string;
      lead: string;
      calendarTitle: string;
      calendarLead: string;
      calendarCta: string;
      calendarNote: string;
      copy: string;
      copied: string;
      rotate: string;
      intervalsTitle: string;
      intervalsLead: string;
      intervalsNote: string;
      athleteId: string;
      apiKey: string;
      apiKeyHint: string;
      connect: string;
      connected: string;
      connectedAs: string;
      disconnect: string;
      push: string;
      pushing: string;
      pushed: string;
      lastPushed: string;
      failed: string;
    };
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
