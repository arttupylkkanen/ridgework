import { fieldEn } from "./field";
import { planEn } from "./plan-tools";
import { athleteEn } from "./athlete-copy";
import { mountainEn } from "./mountain-prep";
import { passportEn, whatIfEn } from "./passport";
import type { Copy } from "./types";

export const en: Copy = {
  metaTitle: "Ultra and trail training plans — Ridgework",
  metaDescription:
    "What to run this week for a 20 km trail, 50 km or 100 km ultra, or an alpine day. You pick the peak date. 14 days free, no card needed.",
  footerTag: "Mountain training that follows the week you actually have.",
  legalEntity: "Ridgework, France.",
  support: "support@ridgework.org",
  cancelAnytime: "Cancel anytime",
  terms: "Terms",
  privacy: "Privacy",
  copyright: "© 2026 Ridgework. France.",
  nav: {
    about: "Who we are",
    method: "Method",
    projects: "Projects",
    programs: "Programs",
    who: "Who it’s for",
    what: "What you get",
    week: "How a week works",
    pricing: "Pricing",
    faq: "FAQ",
    app: "This week",
    field: "Notes",
    guides: "Guides",
    example: "Example",
    menu: "Menu",
    login: "Sign in",
    account: "Account",
  },
  cta: {
    start: "Start 14 days free",
    pricing: "See pricing",
    openTools: "Open tools",
  },
  hero: {
    kicker: "Mountain training",
    h1: "Train for the day that matters.",
    lead: "Pick the day you need to be ready. Every week is written backwards from it — and rewritten when life gets in the way.",
    trial: "Free while we finish registering the company. No card, nothing to cancel.",
  },
  about: {
    kicker: "What this is",
    h2: "A training desk for people who go to the mountains",
    lead: "The week is written from the research we cite, then bent around sleep, travel, kids, and the kit you own. Questions go to support@ridgework.org. Seasons stay on a passport you can keep private.",
    cards: [
      {
        title: "The week comes from papers, not a mood",
        body: "Easy volume, one hard session if you are fresh, a taper into the day. Those patterns are on the method page with the citations. They are a starting week, not a diagnosis.",
      },
      {
        title: "Life is an input",
        body: "Missed Tuesday, a work trip, no crampons, a short night. The plan names the change and why. The peak date stays unless you move it.",
      },
      {
        title: "A person answers",
        body: "support@ridgework.org is a person. Methods stay the same from week to week. You still decide in the mountains.",
      },
      {
        title: "Seasons, written down",
        body: "The passport is you against last year: longest days, easy volume, what broke. Share it with a coach or keep it closed.",
      },
    ],
  },
  method: {
    kicker: "Why the week looks like this",
    h2: "Most days easy. One hard session, or none.",
    lead: "The week is built from a small set of well-cited endurance papers: lots of easy volume, load as a planning input, taper before the day. Checklists, not diagnoses.",
    cards: [
      {
        title: "Intensity distribution",
        body: "Seiler & Kjerland (2006) measured about 75% of sessions easy in junior skiers. Seiler’s 2010 review treats that polarized or pyramidal shape as a description of what endurance athletes actually do. Esteve-Lanao et al. (2007) saw better running performance with more easy-zone time. Stöggl & Sperlich (2014) saw polarized blocks move key variables more than threshold-heavy blocks in their sample. Ridgework starts there. You can edit it.",
      },
      {
        title: "Load as a week input",
        body: "Foster’s session RPE (2001) is one number: how hard it felt, times how long. Bourdon et al. (2017) is the consensus version: write external work and internal response, then adjust the next session. You mark the session. If it was wrecked, or something hurts, the next hard day is rewritten easier. That is load monitoring. It is not Ridgework deciding you are tired, and it is not a medical test.",
      },
      {
        title: "Taper as a planning pattern",
        body: "Mujika & Padilla (2003): volume typically falls before the day, while some intensity stays in shorter doses, so fitness is expressed instead of buried under leftover fatigue. We write that as a 10–14 day block. Sleep and kit beat extra kilometres.",
      },
    ],
    caveatsTitle: "Honest caveats",
    caveats: [
      "Individual response varies. Age, history, terrain, and life stress change what works.",
      "Published averages are not a prescription and do not replace a clinician when health questions arise.",
      "This writes a starting week from what you tell it. It cannot watch you train, and it only knows the sessions you log.",
    ],
    sourcesTitle: "Sources (Crossref-verified)",
    teaserH2: "What this can promise, and what it cannot",
    teaserLead:
      "Most days easy, one hard session if you are fresh, a taper into the day — that shape comes from a handful of well-cited endurance papers, not from a template with your name on it. Here is the part most training products leave out.",
    teaserCta: "Read the full method",
    allSourcesCta: "All sources, and what each one is used for",
  },
  rollingEngine: {
    kicker: "Why this is not a PDF",
    h2: "A week that answers back",
    lead: "A spreadsheet cannot see that you slept five hours. A generic AI chatbot will happily tell you something, then forget it by Thursday and leave no plan behind it. Ridgework keeps three weeks on the calendar and rewrites them from what you actually did.",
    points: [
      {
        title: "Three weeks, always written",
        body: "Log today's session and the weeks ahead update. There is always something real to look at, never a blank calendar waiting on you to fill it in.",
      },
      {
        title: "A tired week trains less. It does not restart.",
        body: "Poor sleep, a missed session, a heavy week at work — the plan bends around it and names the reason in writing. The peak date only moves when you move it.",
      },
      {
        title: "It remembers what a chatbot forgets",
        body: "Every change is recorded against the date it was made, so a season reads as one continuous plan instead of a pile of disconnected answers.",
      },
    ],
  },
  projects: {
    kicker: "Example projects",
    h2: "Compact project briefs",
    lead: "Three sample objectives as planning objects. Duration is the training plan — aerobic base, a specific block, and a taper so you peak on the outing — not the length of the weekend or the race. One detail cell stays locked until founding access.",
    items: [
      {
        title: "Alpine weekend objective",
        fields: [
          {
            label: "Goal",
            value: "Arrive on the alpine day with unused legs, not a wrecked Tuesday",
          },
          {
            label: "Plan",
            value:
              "10 weeks — 6 wk aerobic + vert base, 3 wk specific, 10–14 day taper into the forecast window",
          },
          {
            label: "Focus",
            value:
              "Keep easy volume easy; add conversational vert; peak for the weather window, not extra kilometres",
          },
          {
            label: "Fatigue / load",
            value:
              "If sleep or legs are gone, drop the quality session. The weekend is the peak, not Tuesday.",
          },
        ],
      },
      {
        title: "First 50 km trail",
        fields: [
          {
            label: "Goal",
            value: "Finish well, not just finish — fueling and pacing under control",
          },
          {
            label: "Plan",
            value:
              "6 months (24 weeks) — 10 wk aerobic base, 12 wk long-run build, 10–14 day taper to peak race week",
          },
          {
            label: "Focus",
            value:
              "Easy volume first, then long-run progression and one quality session; peak on race week",
          },
          {
            label: "Key session recipe",
            value:
              "Week 20 (end of specific): 3×12 min at marathon effort on rolling trail, 4 min easy; heat and niggle gates before start. Then 10–14 days taper.",
            locked: true,
          },
        ],
      },
      {
        title: "Hut-to-hut alpine traverse",
        fields: [
          {
            label: "Goal",
            value: "Three days linked because day-two training was allowed to shrink",
          },
          {
            label: "Plan",
            value:
              "8 months — winter–spring aerobic/hiking base, 10 wk pack and back-to-backs, 10–14 day taper into day 1",
          },
          {
            label: "Focus",
            value:
              "Build legs in the base months; specific block is pack + back-to-backs; peak for day 1, not a dump on day 3",
          },
          {
            label: "Fatigue / load",
            value:
              "If day-one leftovers sit in the legs, cut day-two volume. Day three still needs a reserve.",
          },
        ],
      },
    ],
  },
  programs: {
    kicker: "Programs",
    h2: "Seven programs. Tell us when you need to be ready.",
    lead: "No race on the calendar? Start with easy volume at a low heart rate. More weeks before the day almost always means a sturdier base.",
    columns: {
      name: "Program",
      duration: "Duration",
      focus: "Focus",
      recipe: "Session recipe",
    },
    rows: [
      {
        id: "engine",
        name: "Aerobic engine",
        duration: "About 16 weeks of easy running",
        focus: "More work at conversation pace. Fat as default fuel. No race required.",
        locked:
          "Most days easy enough to talk. The long grows toward 90 minutes. There is no separate quality session: this is the quality.",
        pull: "If you can finish a sentence, you are in the work.",
        layout: "textFirst",
      },
      {
        id: "trail20",
        name: "20 km trail",
        duration: "Ten weeks is enough for most",
        focus: "Easy volume, one quality dose, a long toward 90–110 min",
        locked:
          "Week 8: 6×3 min at 10k effort on rolling trail, 2 min easy. Long 90–110 min. Then a 7-day taper.",
        layout: "sessionLead",
      },
      {
        id: "fifty",
        name: "50 km ultra",
        duration: "About half a year",
        focus: "Aerobic base, then long-run progression, peak race week",
        locked: "Week 20: 3×12 min at marathon effort on trail. Then 10–14 days of easing off.",
        tag: "A first ultra for a lot of people",
        pull: "Finish well, not just finish.",
        layout: "wide",
      },
      {
        id: "ultra100",
        name: "80–120 km ultra",
        duration: "Often nine months",
        focus: "Months of easy time on feet, late back-to-backs, four-week taper",
        locked:
          "Week 30: Sat 4–5 h easy trail, Sun 2.5–3 h easy. Midweek stays conversational. Then 3–4 weeks taper.",
      },
      {
        id: "alpine",
        name: "Alpine day",
        duration: "About ten weeks",
        focus: "Aerobic approaches, climbing and strength, then a mountain day",
        locked:
          "Week 8: climbing session (rock, ice, or gym) plus 30–40 min of strength. Approaches stay easy. Tired? Climbing becomes hiking.",
        tag: "Includes climbing",
        layout: "sessionLead",
      },
      {
        id: "traverse",
        name: "Multi-day alpine route",
        duration: "About eight months",
        focus: "Hiking base, then climbing plus pack back-to-backs, peak on day 1",
        locked:
          "Week 28: climbing day, then a linked hike with pack. Cut day 2 if leftovers sit in the legs.",
        layout: "compact",
      },
      {
        id: "expedition",
        name: "High-altitude expedition",
        duration: "About ten months",
        focus: "Hiking and easy volume, pack carries. The last weeks are sleep and kit.",
        locked:
          "Week 34: pack carry 3–4 h on a hike, then a rest day. One night out if life allows. The last weeks are sleep and packing, not extra altitude.",
      },
    ],
    lockHint: "This week’s key session",
    cta: "Start this program",
  },
  who: {
    h2: "Who it’s for, and who it isn’t",
    forTitle: "Built for",
    forItems: [
      "Endurance athletes planning training weeks around real life and terrain",
      "People training toward an aerobic engine, a 20 km trail, a 50 or 100 km ultra, an alpine day, a linked route, or a high camp",
      "Anyone who prefers calm tools over motivational spam",
    ],
    notTitle: "Not for",
    notItems: [
      "Injury diagnosis or treatment",
      "A live personal trainer in your pocket",
      "Emergency or mountain-rescue guidance",
    ],
  },
  what: {
    h2: "What you get",
    items: [
      {
        n: "01",
        title: "Weeks written back from a ready date",
        body: "You say when the race or the outing has to be ready. Then easy base, a specific block, an easy-down. If you have weeks to spare, the base can grow.",
      },
      {
        n: "02",
        title: "The log changes the next day",
        body: "You mark how the last session felt. If it was wrecked, or something hurts, the next hard day is rewritten easier. Foster (2001) and Bourdon et al. (2017) are why: internal load is a planning number, not a diagnosis. The peak date stays.",
      },
      {
        n: "03",
        title: "Kit and fuel for this week",
        body: "Shoes, layers, drink, and sleep written for the week you are actually running.",
      },
      {
        n: "04",
        title: "Training log",
        body: "Note what you did and why you changed load, so next week is grounded in the week you had.",
      },
    ],
  },
  week: {
    h2: "How a week works",
    steps: [
      {
        day: "Mon",
        title: "Build this week",
        body: "The peak date is already on the calendar. Most days are easy running. If you slept well, one harder session. One long run sits later in the week.",
      },
      {
        day: "Tue",
        title: "Check sleep and legs",
        body: "Five hours of sleep? Intervals become 45–60 min easy. The race date does not move.",
      },
      {
        day: "Thu",
        title: "Keep easy days easy",
        body: "Most of the week stays at a pace where you can talk. If you can hold a sentence, you are in the right zone.",
      },
      {
        day: "Sun",
        title: "Log what happened",
        body: "Write down the long run, the heat, and anything that niggled. Next week is built from that, not from the week you wished you had.",
      },
    ],
  },
  scenario: {
    kicker: "Example",
    h2: "A real Tuesday, not a slogan",
    setup: "You have 6 weeks until your 77 km ultra.",
    facts: [
      { label: "Sleep last night", value: "5 hours" },
      { label: "Yesterday", value: "32 km long run" },
      { label: "Right knee", value: "2/10 discomfort" },
      { label: "Sunday forecast", value: "28°C" },
    ],
    says: "What changes",
    actions: [
      "Skip today’s intervals",
      "45–60 min easy instead",
      "Move the long run to Monday if Sunday stays hot",
      "Drink 500–750 ml/h on the long run, with salt if you usually need it",
      "Reassess tomorrow",
    ],
    note: "Not a diagnosis. If the knee swells, locks, or gets worse, see a doctor. This only changes the training week.",
  },
  firstWeek: {
    kicker: "Your first 14 days",
    h2: "What happens after you sign in",
    lead: "You pick a peak date. Three weeks land on the calendar. If a session is wrecked or something hurts, the next days are rewritten. The outing stays where you put it.",
    days: [
      {
        day: "Day 1",
        title: "Pick the peak and build the week",
        body: "77 km, alpine day, or just the engine. The next three weeks appear on the calendar.",
      },
      {
        day: "Day 3",
        title: "Mark how Tuesday went",
        body: "Short sleep, a niggle, or a session that felt wrecked: you mark it. The next hard day is rewritten easier. The peak date stays.",
      },
      {
        day: "Day 6",
        title: "Do the first long outing",
        body: "Easy enough to talk. Same drink you already use. If the week was messy, this run is shorter. Don't add kilometres to catch up.",
      },
      {
        day: "Day 7",
        title: "Log the week you actually ran",
        body: "What you did, what you skipped, what niggled. Week two is built from that, not from the week you meant to have.",
      },
    ],
  },
  guidesIndex: {
    kicker: "Guides",
    h2: "Training questions, written out",
    lead: "77 km with six weeks left. 100 km time on feet. Fatigue. Alpine days. Checklists for race week.",
    cta: "Open the guides",
    read: "Read",
  },
  pricing: {
    kicker: "Pricing",
    h2: "Free right now.",
    lead: "Ridgework is free while the company registration is being completed — we are not allowed to take payment yet, so we are not pretending otherwise. When it opens, membership is €19/month.",
    badge: "Free while registration completes",
    trialBadge: "14 days free",
    name: "Ridgework membership",
    price: "€19",
    freeTag: "Free",
    freeNow: "Free while we finish registering the company. No card, nothing to cancel. €19/month when it opens.",
    per: "/month",
    blurb: "14 days free, no card. €19/month if you add one after. Cancel anytime.",
    features: [
      "Seven programs from aerobic engine to 100 km and alpine days",
      "No card for 14 days — add one anytime to keep training at €19/month",
      "Cancel during the 14 days and Polar does not charge",
      "Training weeks, not medical claims",
    ],
    laterTitle: "After the 14 days",
    laterBody:
      "Add a card anytime to keep training at €19/month. Nothing is ever charged automatically — without a card, the desk simply pauses until you add one. No other price is listed on this site.",
  },
  checkout: {
    kicker: "Start",
    h2: "Write this week",
    lead: "Create an account. No card needed for 14 days. Add one anytime to keep training after.",
    name: "Name",
    email: "Email",
    submit: "Start 14 days free",
    note: "Cancel in the desk. During the 14 days Polar does not charge. No diagnoses. You stay responsible for mountain and training safety.",
    successTitle: "Card on file",
    successBody: "€0 for 14 days. Then €19/month unless you cancel first.",
    daysLeft: "days left of the free trial",
    payTitle: "Add a card to keep training",
    payBody:
      "Your free trial has ended. Add a card to keep training — €19/month unless you cancel first.",
    payCta: "Pay with card",
    trialLeft: "{n} days left of the free trial",
    trialNoCard: "{n} days left, no card yet. Add one anytime to keep training after.",
    trialOn: "Card on file. First charge after 14 days unless you cancel.",
    subscribed: "Subscribed · €19/month",
    payFail: "Checkout did not open. Try again, or write support@ridgework.org with what you saw.",
    closedTitle: "Card payments are not open yet",
    closedBody:
      "Ridgework is not taking payment until the company registration is finished. Your 14 days are unaffected, and nothing can be charged in the meantime — no card is stored anywhere.",
    paying: "Opening checkout…",
    dueToday: "Total due today",
    dueAmount: "€0",
    terms:
      "Polar collects the card. €0 today for 14 days. Then €19/month unless you cancel before the 14 days end. After that it renews each month until you cancel in the desk. Amounts in EUR. Polar is the merchant of record.",
    includesTitle: "The 14 days include",
    includes: [
      "This week’s sessions written out: what to do, how it should feel, how long",
      "You pick the day you need to be ready. The week is built back from that date",
      "Walk, jog, hike, or bike — same minutes still count",
      "Cancel in the 14 days and Polar charges nothing",
    ],
    afterLine: "After day 14 the membership is €19/month until you cancel.",
    chipCancel: "Cancel anytime",
    chipSupport: "support@ridgework.org",
    chipMerchant: "Billed by Polar",
    cancelCta: "Cancel",
    cancelConfirm:
      "Cancel now? During the 14 days Polar does not charge. After a paid month, access lasts through that month.",
    cancelYes: "Yes, cancel",
    cancelKeep: "Keep it",
    canceling: "Canceling…",
    canceledNow: "Canceled. Polar will not charge.",
    canceledLater: "Canceled. Access lasts through the period already paid.",
    manageCta: "Card and invoices",
    cancelFail: "Could not cancel here. Use Card and invoices.",
  },
  faq: {
    h2: "FAQ",
    items: [
      {
        q: "What is Ridgework?",
        a: "A written training week for trail, ultra, and alpine days. You say when you need to be ready. The week lands on the calendar.",
      },
      {
        q: "What does this cost?",
        a: "Nothing right now. We cannot take payment until the company registration in France is finished, so the desk is simply free and no card is stored anywhere. Membership will be €19/month once it opens, and you will know before that happens.",
      },
      {
        q: "Can I cancel?",
        a: "Yes. There is a Cancel button in the desk once you have added a card. Without a card, nothing is ever charged — just stop, or let the trial end. After a paid month, access lasts through that month.",
      },
      {
        q: "What happens after the 14 days?",
        a: "If you have not added a card, the desk pauses until you add one — nothing is charged automatically. If you did add a card, it continues at €19/month unless you cancel first.",
      },
      {
        q: "Do I need a card for the trial?",
        a: "No. Start free for 14 days without one. Add a card anytime, during or after the trial, to keep training at €19/month.",
      },
      {
        q: "Is this medical advice?",
        a: "No. You get a week on paper. Health questions go to a clinician. In the mountains you decide.",
      },
      {
        q: "Does the plan update itself?",
        a: "In the product, yes. Three weeks stay written. Log the week and the next one appears. Fatigue shortens this week. It does not move the race.",
      },
      {
        q: "Why does more time help?",
        a: "Easy aerobic volume is slow to accumulate. Six weeks still gets a written week. It just has less base under it.",
      },
      {
        q: "Who is this?",
        a: "Ridgework, France. support@ridgework.org.",
      },
      {
        q: "Which languages?",
        a: "English, Finnish, French, and German.",
      },
      {
        q: "What about my data?",
        a: "EU and France. We don’t sell it for ads. See the privacy page.",
      },
      {
        q: "How do I get help?",
        a: "support@ridgework.org. We try to answer within a few working days.",
      },
    ],
  },
  disclaimer: {
    h2: "Disclaimer",
    body: "Ridgework writes training weeks for trail and mountain. It is not a medical device, not healthcare, and not a substitute for a clinician, a guide, or rescue. Research citations inform the week structure; they are not prescriptions. You remain responsible for safety in the mountains and in training.",
  },
  foundingPage: {
    kicker: "Founding",
    h1: "Start with 14 days free",
    lead: "Same weeks. 14 days free, no card needed.",
    trial: "14 days free. No card needed. Add one anytime to keep training after.",
    note: "No card needed for 14 days. Add one anytime after to keep training at €19/month. That is the only price listed here.",
    back: "← Ridgework home",
    title: "Founding invite, Ridgework",
    description: "Weekly training. 14 days free, then €19/month. Cancel anytime.",
  },
  termsPage: {
    title: "Terms of Service",
    updated: "Last updated: September 2026",
    body: [
      "Ridgework writes training weeks for trail and mountain. Not medical care, no diagnoses. Price: 14 days free, no card needed. Add a card anytime after to keep training at €19/month (support@ridgework.org). You remain responsible for training and mountain safety. Mandatory consumer rights under French/EU law are not limited.",
      "Service. Ridgework provides weekly training plans for trail and mountain. It is not medical care and makes no diagnoses.",
      "Price and trial. Current price is €19/month, after 14 free days. No card is needed to start. If you add a card and stay after those 14 days, Polar charges €19/month. Without a card, nothing is ever charged automatically — the desk pauses at day 14 until you add one. That is the only listed price.",
      "Cancel anytime. Use the Cancel button in the desk, or Card and invoices, once a card is on file. Without a card, nothing is charged in the first place. After a paid month, access continues through the end of the period already paid.",
      "Your responsibility. You remain solely responsible for training and mountain safety decisions. Ridgework does not provide rescue, guiding, or emergency services.",
      "Liability. To the extent permitted by French and EU consumer law, the service is provided as-is. Nothing in these terms limits mandatory consumer rights.",
      "Contact. support@ridgework.org. Ridgework, France.",
    ],
  },
  privacyPage: {
    title: "Privacy Policy",
    updated: "Last updated: September 2026",
    body: [
      "This is a stub privacy notice for Ridgework, a product company based in France, operating under EU expectations (including GDPR principles). It will be replaced with counsel-reviewed text before launch.",
      "Who we are. Controller: Ridgework, France. Contact: support@ridgework.org.",
      "What we collect. Account and billing data needed to provide the service (email, subscription status via Polar). Usage data limited to operating and improving the product. We do not sell personal data for advertising.",
      "Legal bases. Contract performance (providing the subscription), legitimate interests (security, product improvement), and legal obligations where applicable.",
      "Retention & rights. We retain data only as long as needed for the service and legal requirements. You may request access, rectification, erasure, restriction, portability, or object where applicable. You may lodge a complaint with a French / EU supervisory authority.",
      "Payments. Card payments are processed by Polar (merchant of record). We do not store full card numbers on our servers.",
      "Not medical data. Ridgework is not a medical service and is not intended to process health diagnoses. Do not submit sensitive medical information you are not comfortable sharing for account/support purposes.",
    ],
  },
  examplePage: {
    title: "Try a real day — Ridgework",
    description: "Move the sliders. Watch the session change. No account needed.",
    back: "← Ridgework home",
    kicker: "Live example",
    h1: "This is a real day, not a screenshot",
    lead: "Drag the sliders below the way you actually feel some mornings. Watch today's session and the reasoning change with them — this is the same desk a signed-in athlete sees, running on a sample 50 km ultra plan.",
    noteTitle: "Nothing here is saved",
    noteBody:
      "This example resets when you leave. Sign up to get your own week, built from your own sport, goal, and peak date — 14 days free, no card needed.",
  },
  sourcesPage: {
    title: "Sources — Ridgework",
    description: "Every paper behind the training weeks, and what each one is actually used for.",
    back: "← Ridgework home",
    kicker: "Method",
    h1: "Every source, and what it is used for",
    lead: "The homepage cites the four papers that map directly to something you can see in the product. This is the full list, including the reading that shaped the thinking without driving a specific feature.",
    noteTitle: "What a citation here does not mean",
    noteBody:
      "A paper in this list is not a claim that Ridgework reproduces its result for you. Published averages describe groups, not your Tuesday. Where a source shaped an actual rule, the method section names the rule. Everything else is background reading, and we would rather say so than pad the page with citations.",
  },
  appPage: {
    title: "This week, Ridgework",
    kicker: "This week",
    h1: "This week’s training",
    lead: "A few facts about how you train. Today’s session follows sleep, fatigue, and the week already written. Tired days train less. The ready date stays.",
    lockedTitle: "Sign in to save the week",
    lockedBody: "Create an account to keep the program, the week, and the log on this login.",
    trialLabel: "14-day trial",
    testBanner: "14 days free, no card needed. Then €19/month if you add one.",
    signInToTrain: "Sign in, pick a peak date. 14 days free, no card needed.",
    tabs: {
      today: "Today",
      plan: "Program",
      week: "Week",
      prep: "The day",
      log: "How to",
      profile: "You",
      whatIf: "What if",
      passport: "Passport",
    },
  },
  auth: {
    title: "Sign in",
    lead: "Create an account to enroll in a program. Peak date first, then the weeks.",
    email: "Email",
    password: "Password",
    name: "Name",
    signIn: "Sign in",
    signUp: "Create account",
    or: "or",
    withGoogle: "Continue with Google",
    withX: "Continue with X",
    haveAccount: "Already have an account? Sign in",
    noAccount: "No account yet? Create one",
    error: "Could not sign in. Check email and password.",
    testNote: "14 days free. No card needed. Add one anytime to keep training after.",
  },
  dashboard: {
    enrollments: "Your programs",
    empty: "No program saved on this account yet. Pick one below.",
    billingTest: "14 days free, no card needed.",
    peak: "Peak",
    statusTest: "Test",
    saved: "Saved to your account",
  },
  tools: {
    week: {
      save: "Save week",
      saved: "Saved on this device",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      types: { easy: "Easy", steady: "Steady", hard: "Hard", rest: "Rest" },
      session: "What you actually ran",
      readiness: "How does the body feel this week?",
      readinessLead:
        "This only changes training. Tired means less work — hard sessions become easy. Wrecked means rest instead of quality.",
      levels: { fresh: "Fresh", ok: "Fine", tired: "Tired", wrecked: "Wrecked" },
      notes: {
        fresh: "Keep the written week. No extra heroics needed.",
        ok: "Keep the load. Do not add a second hard day.",
        tired: "Hard and steady sessions drop to easy. You train less this week.",
        wrecked: "Hard and steady become rest. Easy stays easy. Come back next week.",
      },
    },
    pace: {
      title: "What the words mean",
      lead: "If you have never trained, start by walking. Conversational means you can speak a full sentence. Use a watch if you have one. A phone timer and the talk test are enough if you do not.",
      talkTitle: "Conversational / easy",
      talk: "You can say a full sentence without gasping. Nose breathing often works. If you can only spit words, you are too fast for an easy day — slow down, even if the watch looks modest.",
      zonesTitle: "How to follow it",
      feelHead: "Feel",
      watchHead: "Watch / HR",
      noneHead: "No device",
      rows: [
        {
          zone: "Easy · Zone 1–2",
          feel: "Full sentences. Most of the week lives here.",
          watch:
            "Roughly 60–75% of max HR, or below aerobic threshold if you have a lab/field test. Polarized plans put ~80% of time here.",
          none: "Talk test. If a hill steals the sentence, walk until speech comes back.",
        },
        {
          zone: "Steady · high Z2 / low Z3",
          feel: "Short phrases only. Controlled, not a race.",
          watch: "Around 75–85% max HR. Do not stack this on a tired week.",
          none: "You can answer a question, not tell a story.",
        },
        {
          zone: "Hard / quality · Z3–4",
          feel: "A few words. One dose per week, or none if tired.",
          watch:
            "Threshold-ish: ~85–92% max HR, or the pace you could hold ~30–40 min. Keep it the only hard run.",
          none: "Breathing is loud. You would not chat. Stop if form or a niggle gets worse.",
        },
        {
          zone: "Climbing / strength",
          feel: "Not a heart-rate zone. Grip, lock-offs, and skill spike HR even when the legs could talk.",
          watch: "Ignore zone targets on the wall. Count quality pitches or sets, then stop.",
          none: "Leave when technique breaks, not when you are empty. Strength is short: pull, hang, core, antagonists.",
        },
      ],
      alpineTitle: "Alpine weeks are not only walking",
      alpine:
        "Approaches and hiking days stay conversational. Specific weeks add a climbing session (rock, ice, or gym) and a short strength dose (lock-offs, pull-ups, core). House/Johnston-style: aerobic base first, then climbing strength and technique, then mountain days with a pack. Pitches are work. Tired still turns them down.",
    },
    prep: mountainEn,
    log: {
      empty: "No training notes yet this week.",
      decision: "What you did or changed",
      why: "Why (sleep, fatigue, life)",
      add: "Add note",
      clear: "Clear log",
    },
    plan: planEn,
    athlete: athleteEn,
    passport: passportEn,
    whatIf: whatIfEn,
  },
  fieldPage: fieldEn,
};
