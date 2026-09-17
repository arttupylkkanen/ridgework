import type { ObjectiveId } from "@/lib/rolling-plan";

/**
 * Public, outcome-named landing pages — one per objective. These exist to be
 * found by someone searching for their goal ("50k training plan"), not for the
 * mechanism behind it. English only for now: thin translations of long-form
 * pages compete with themselves in search.
 */
export type PlanPage = {
  slug: string;
  objective: ObjectiveId;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  h1: string;
  lead: string;
  /** Long-form body. This is the part that earns the search result. */
  body: string[];
  phaseNotes: { base: string; specific: string; taper: string };
  forWhom: string[];
  notForWhom: string[];
  kit: string[];
  faq: { q: string; a: string }[];
};

/**
 * Chrome for these pages. Not part of the multi-locale `Copy` type on purpose:
 * the plan pages are English-only, so a per-locale copy of this would be four
 * copies of a string nothing renders.
 */
export const PLAN_UI = {
  indexTitle: "Training Plans for Trail, Ultra and Mountain — Ridgework",
  indexDescription:
    "Seven training plans: 20 km trail, 50 km and 100 km ultra, alpine days, multi-day routes, high-altitude expeditions, and aerobic base. You pick the date.",
  indexKicker: "Training plans",
  indexH1: "Training plans",
  indexLead:
    "Pick the day you want to be ready. Each plan is written backwards from that date, then rewritten forward around the weeks you actually get. Nothing here is a PDF.",
  back: "← Ridgework home",
  weeksUnit: "weeks",
  statTotal: "Full build",
  phaseBase: "Base",
  phaseSpecific: "Specific",
  phaseTaper: "Taper",
  phasesTitle: "How the block is shaped",
  phasesLead:
    "These are the suggested lengths. A shorter window cuts base first and keeps the specific block and the taper, and the plan tells you when the window you chose is thinner than the objective wants.",
  weekTitle: "What a week actually looks like",
  weekLead:
    "Generated from the same engine that writes the real plan, so this is the template itself rather than a marketing illustration of it.",
  weekNote:
    "Sessions land on the days you said you can train, and the week is rewritten when you report a session as wrecked, miss one, or travel. These templates are the starting shape, not a fixed schedule.",
  forTitle: "Built for",
  notForTitle: "Not for",
  kitTitle: "Kit this assumes",
  faqTitle: "Questions",
  ctaTitle: "Start this plan",
  ctaBody:
    "No card needed. You set the date, answer a short setup, and three weeks land on the calendar straight away.",
  ctaExample: "See a live example first",
} as const;

export const PLAN_PAGES: PlanPage[] = [
  {
    slug: "50k-ultra-training-plan",
    objective: "fifty",
    metaTitle: "50K Ultra Training Plan — Ridgework",
    metaDescription:
      "A 24-week 50 km ultra training plan that rewrites itself around missed sessions, bad sleep and travel. You pick the race date. No card needed.",
    kicker: "50 km ultra",
    h1: "50K ultra training plan",
    lead: "A first ultra for a lot of people — finish well, not just finish. Mostly easy running, one quality session once the base is there, and a long run that grows toward the day you picked.",
    body: [
      "A 50 km is the distance where most runners discover that a marathon plan does not transfer. The problem is rarely speed. It is time on feet, climbing, eating while moving, and arriving at the start line without six months of accumulated fatigue in your legs.",
      "This plan puts the bulk of its work at conversational pace — easy enough to hold a full sentence. That is not a soft option, it is the part most people skip and then wonder why the last 15 km falls apart. One quality session per week appears only once you have the base to absorb it, and only when you turned up rested.",
      "The long run is the spine of the block, and it is capped by what you have actually done rather than what the calendar wishes you had done. If your longest outing this year is 90 minutes, week one does not hand you four hours. It builds from the band you reported in setup.",
      "What makes this different from a PDF is what happens when the block goes sideways — and it will. Log a wrecked week and the next weeks get lighter, not louder. Miss a Tuesday and it is not stacked onto Wednesday. Travel for work and the mountain days become whatever is possible where you are. The race date does not move unless you move it.",
    ],
    phaseNotes: {
      base: "Aerobic base: easy volume, a growing long run, and the habit of finishing sessions able to talk. No quality work is forced on a beginner here.",
      specific:
        "Race-specific: one quality dose a week, long runs on terrain that resembles the course, and practice with the food and pack you intend to actually use.",
      taper:
        "Volume comes down, a little intensity stays in short doses, and the last two weeks are about sleep, kit and not inventing anything new.",
    },
    forWhom: [
      "Runners stepping up from a marathon or a 20–30 km trail race",
      "Anyone who has a date in mind and wants the weeks written backwards from it",
      "People whose training weeks get interrupted by shift work, travel or young kids",
    ],
    notForWhom: [
      "Anyone looking for a fixed twelve-week PDF to print and follow regardless of how the body responds",
      "Runners who want a guaranteed finish time — this writes training, it does not predict results",
    ],
    kit: [
      "Trail shoes already broken in on a long run",
      "A pack or vest you have carried loaded",
      "Poles if your course has real climbing",
    ],
    faq: [
      {
        q: "How long does it take to train for a 50K?",
        a: "The full block here is 24 weeks: about 10 weeks of aerobic base, 12 specific, and a 2-week taper. A shorter window still writes a plan — it just cuts base first rather than pretending fitness appears faster.",
      },
      {
        q: "Can I train for a 50K in 12 weeks?",
        a: "Yes, with honest expectations. Twelve weeks compresses the base and keeps the specific block and taper. You get a written week either way; what you do not get is the aerobic depth that twenty-four weeks builds. The plan says so rather than hiding it.",
      },
      {
        q: "How many days a week will I run?",
        a: "You choose the days you can train in setup, minimum two. The week is placed on those days — rest goes on the days you said you cannot train, not on the days a template assumed.",
      },
      {
        q: "What happens if I miss a week?",
        a: "Nothing is stacked to catch up. A missed session is logged, the next days are rewritten around the fatigue you reported, and the race date stays where you put it.",
      },
    ],
  },
  {
    slug: "100k-ultra-training-plan",
    objective: "ultra100",
    metaTitle: "100K Ultra Training Plan (80–120 km) — Ridgework",
    metaDescription:
      "A 36-week 100 km ultra training plan with back-to-back long runs, night running and a four-week taper. Adapts to missed sessions. No card needed.",
    kicker: "80–120 km ultra",
    h1: "100K ultra training plan",
    lead: "Not a first ultra. Months of easy time on feet, late back-to-back long runs and a four-week taper, all written around the date you gave.",
    body: [
      "A 100 km day goes through a sunset. That single fact changes the training: you are preparing for hours of movement at an effort that feels almost embarrassingly easy, eating on a schedule, and staying functional when it gets dark, cold and slow.",
      "Most of this block is unglamorous aerobic volume. The back-to-back long weekends arrive late, not early, because they are the sessions that leave the deepest hole — stacking them before the base is there is the classic way to arrive at the start line already cooked.",
      "Nutrition is trained here, not improvised. The plan puts carbohydrate and fluid amounts into the long runs so race day is a repeat of something your gut has already accepted, and flags when a session is the right place to rehearse the night kit.",
      "The taper is four weeks, and it is longer than most people are comfortable with. Feeling fresh and twitchy in the last fortnight is the taper doing its job, not a sign you should add a session. The plan will keep saying so.",
    ],
    phaseNotes: {
      base: "Fourteen weeks of easy volume and a long run that grows slowly. The goal is durability, not sharpness.",
      specific:
        "Eighteen weeks: back-to-back long weekends, night sessions, and full dress rehearsals with race kit and race food.",
      taper:
        "Four weeks down. Volume drops hard, short intensity stays, and the last week is sleep, packing and drop-bag logistics.",
    },
    forWhom: [
      "Runners who have finished a 50 km and want the next distance",
      "Anyone training around a job, who needs the long weekends placed where they actually fit",
      "People who want the night-running and fuelling rehearsals written in rather than left to chance",
    ],
    notForWhom: [
      "First-time ultra runners — start at 50 km and come back",
      "Anyone who cannot protect at least one long weekend session most weeks",
    ],
    kit: [
      "A vest you have run long in, loaded",
      "Headlamp plus spare cells, tested in the dark",
      "Poles for sustained climbing",
      "A dry layer you can put on with cold hands",
    ],
    faq: [
      {
        q: "How long should I train for a 100K?",
        a: "This block runs 36 weeks: 14 base, 18 specific, 4 taper. It is long because the adaptation that matters — aerobic durability and a gut that works at hour ten — accumulates slowly and cannot be rushed in the final month.",
      },
      {
        q: "What are back-to-back long runs and when do they start?",
        a: "A long session on Saturday followed by a second long one on Sunday, on tired legs, to rehearse the second half of the race. They arrive in the specific block, not the base, and the plan cuts day two when you report leftovers in the legs.",
      },
      {
        q: "Do I need to train at night?",
        a: "If your race goes through darkness, yes — and the plan schedules it rather than leaving it as a surprise. Test the lamp, the layers and the food on an ordinary easy run first.",
      },
      {
        q: "How much weekly volume does this require?",
        a: "It follows the weekly hours band you set, not a fixed mileage number. Two people on the same 100 km plan with different available hours get different weeks. The plan will tell you when the window you chose is thinner than the objective wants.",
      },
    ],
  },
  {
    slug: "20k-trail-race-training-plan",
    objective: "trail20",
    metaTitle: "20K Trail Running Training Plan — Ridgework",
    metaDescription:
      "A 10-week 20 km trail race training plan: easy volume, one quality session a week, a long run toward 110 minutes, and a 7-day taper. No card needed.",
    kicker: "20 km trail",
    h1: "20K trail race training plan",
    lead: "A first trail race, for someone who already runs. Easy volume, one quality session a week, and a long run growing toward two hours.",
    body: [
      "Twenty kilometres on trail is long enough that pacing and climbing matter, and short enough that you can still race it. That combination makes it the best first trail objective: you get a real result without needing to rearrange your life for six months.",
      "The week here is simple. Most days are easy enough to talk through. One session a week has real intensity in it — intervals at around 10 km effort on rolling ground — and the long run works toward 90 to 110 minutes on terrain that looks like the course.",
      "The quality session is the first thing to go when you turn up short of sleep or carrying a niggle. That is deliberate. A hard session done tired is the worst of both worlds: it costs recovery and buys no fitness. The plan swaps it for easy running and says why.",
      "The taper is seven days. Short, because there is not much accumulated fatigue to shed at this distance, and enough to arrive fresh.",
    ],
    phaseNotes: {
      base: "Five weeks of easy running with a long run that grows gradually. Quality appears only once the base is there.",
      specific: "Four weeks with one quality session a week and long runs on race-like terrain.",
      taper: "One week. Volume down, a few short strides to stay sharp, and rest.",
    },
    forWhom: [
      "Road runners moving to trail for the first time",
      "Anyone with a local trail race about ten weeks out",
      "Runners who want structure without a half-year commitment",
    ],
    notForWhom: [
      "Complete beginners who have not been running at all — build easy weeks first with the aerobic base plan",
      "Anyone chasing 50 km or longer, where the long run needs far more room",
    ],
    kit: [
      "Trail shoes with grip that matches your ground",
      "A handheld or small vest if the course is dry",
    ],
    faq: [
      {
        q: "How long does it take to train for a 20K trail race?",
        a: "Ten weeks: five of base, four specific, one taper week. If your race is sooner, the plan cuts base and keeps the specific block and taper.",
      },
      {
        q: "Is a 20K trail race harder than a half marathon?",
        a: "Usually yes, in time on feet rather than distance. Climbing and technical ground slow everyone down, so plan for the duration your course will actually take, not your road half time.",
      },
      {
        q: "How long should my long run be?",
        a: "Toward 90 to 110 minutes, capped by the longest outing you reported in setup. The plan will not jump you from 40 minutes to two hours because the calendar says week six.",
      },
      {
        q: "Do I need to run hills?",
        a: "If your race has climbing, yes. The plan biases long runs toward the terrain you named, and swaps hill work for what is available if you told it you only have flat ground.",
      },
    ],
  },
  {
    slug: "aerobic-base-training-plan",
    objective: "engine",
    metaTitle: "Aerobic Base Training Plan (Low Heart Rate) — Ridgework",
    metaDescription:
      "A 16-week aerobic base plan: easy volume at conversational pace, no race required. Build the engine before the next objective. No card needed.",
    kicker: "Aerobic engine",
    h1: "Aerobic base training plan",
    lead: "No race on the calendar, on purpose. Easy volume at a pace you can talk through — the block that makes every later objective possible, and the one most people skip.",
    body: [
      "If you can only do one thing well, do this. Aerobic base is slow to accumulate and quick to reveal itself: it is why one runner fades at hour three and another does not, and it cannot be bought back with a hard month before a race.",
      "The rule here is uncomfortable in its simplicity. If you cannot finish a sentence, you are going too fast. That applies to almost every session in this block. Roughly 60 to 75 percent of maximum heart rate, or below aerobic threshold if you have tested it properly — but the talk test works without any device.",
      "There is no separate quality session, because in this block the easy work is the quality. Adding intervals to a base block is how people convert a productive sixteen weeks into a tired eight. The long run grows toward ninety minutes and stays conversational the whole way.",
      "This plan also suits the months when nothing is scheduled: winter, the off-season, or the year after an injury when you are rebuilding honestly rather than chasing what you used to do.",
    ],
    phaseNotes: {
      base: "Twelve weeks of easy running and one long, all at talking pace. Fat becomes the default fuel for ordinary sessions.",
      specific:
        "Three weeks that add a hike or longer aerobic day — still conversational, just more of it.",
      taper: "One quiet week to consolidate before you point the engine at something.",
    },
    forWhom: [
      "Runners with no race booked who want the months to count",
      "Anyone returning after time off and rebuilding from a low base",
      "People preparing for a big objective next season and doing it in the right order",
    ],
    notForWhom: [
      "Anyone with a race in under twelve weeks — use the plan for that distance instead",
      "Runners looking for speed work; this block deliberately has none",
    ],
    kit: [
      "Shoes you can spend hours in",
      "Optionally a heart-rate monitor, though the talk test is enough",
    ],
    faq: [
      {
        q: "What is aerobic base training?",
        a: "Sustained easy running at an intensity where fat covers most of the fuel demand and conversation stays possible. It builds the cardiovascular and muscular foundation that harder work later sits on top of.",
      },
      {
        q: "How slow should easy running be?",
        a: "Slow enough for full sentences. Roughly 60 to 75 percent of maximum heart rate, or below aerobic threshold if you have a lab or field test. If talking breaks, walk until it comes back — walking counts.",
      },
      {
        q: "How long before I see results?",
        a: "Aerobic adaptation is measured in months, not weeks. Sixteen weeks is a meaningful block. Anyone promising a transformed engine in four is selling something.",
      },
      {
        q: "Can I do this without a race goal?",
        a: "That is exactly what it is for. You still pick an end date so the weeks have a shape, but there is nothing to peak for except being fitter than when you started.",
      },
    ],
  },
  {
    slug: "alpine-climbing-training-plan",
    objective: "alpine",
    metaTitle: "Alpine Climbing Training Plan — Ridgework",
    metaDescription:
      "A 10-week alpine day training plan: aerobic approaches, climbing sessions, mountain strength and muscular endurance, then the summit day. No card needed.",
    kicker: "Alpine day",
    h1: "Alpine climbing training plan",
    lead: "One big mountain day, for someone who already climbs. Aerobic approaches, real climbing sessions and mountain-specific strength, then a taper into your weather window.",
    body: [
      "An alpine day is an endurance event with technical sections inside it, and training for it as though it were only one or the other is the usual mistake. Pure hill fitness leaves you gripped on the pitches; pure climbing leaves you wrecked on the approach.",
      "So this block runs both. Approaches and hiking days stay aerobic and conversational. Specific weeks add a climbing session — rock, ice, or the gym when the weather refuses — plus a muscular endurance day and a short strength dose: lock-offs, pull-ups, step-ups with load, core that holds a body position under fatigue.",
      "Load carrying is progressive rather than guessed. Pack weight ramps through the specific block instead of appearing as a single brutal carry the week before you leave, and drops back down for the taper.",
      "If your objective is genuinely high, the plan adds altitude reasoning to the weeks near the end — sleep low after going high, and the blunt reminder that descent and qualified care beat any checklist. Ridgework will not pretend to clear you medically for altitude.",
      "Kit honesty is built in. If you have not listed crampons and an axe, the plan does not quietly assume them: it either points you at a snow-free line or tells you to add the kit and go practise with it before the day.",
    ],
    phaseNotes: {
      base: "Six weeks: aerobic approaches, a climbing session, and strength moved early so the pattern is established before the hard weeks.",
      specific:
        "Three weeks of climbing, muscular endurance, and mountain days with a progressively loaded pack.",
      taper:
        "One week. Lock the kit, confirm the forecast and the turnaround time, and stop experimenting.",
    },
    forWhom: [
      "Climbers with a specific alpine objective and a weather window in mind",
      "Hill walkers moving into technical ground who need the strength and climbing built in",
      "Anyone who has found that aerobic fitness alone is not enough on pitches",
    ],
    notForWhom: [
      "Anyone looking for climbing instruction — this trains you for the day, it does not teach you to climb or to place gear",
      "People wanting a medical altitude clearance; that is a qualified human's job, not a checklist's",
    ],
    kit: [
      "Boots that take your crampons, already walked in",
      "Crampons and an axe you have practised with",
      "Harness and the rack the actual route needs",
      "Pack loaded as you will carry it",
    ],
    faq: [
      {
        q: "How do you train for alpine climbing?",
        a: "Aerobic base for the approach and the long day, climbing sessions for the technical ground, and muscular endurance plus strength for the legs and the lock-offs. This plan runs all of it across ten weeks, weighted toward aerobic work early and specificity late.",
      },
      {
        q: "How much weight should I train with in my pack?",
        a: "Load ramps through the specific block rather than starting heavy. It steps up across those weeks and drops back for the taper. The plan tells you the weight for each carry instead of leaving you to guess.",
      },
      {
        q: "What if I do not have crampons or an ice axe?",
        a: "The plan says so plainly and adjusts: pick a snow-free line, or add the kit and practise self-arrest and crampon technique on ground you already know. It will not assume equipment you did not list.",
      },
      {
        q: "Can I train for altitude at sea level?",
        a: "Partly. You can arrive aerobically strong and well rested, which helps. You cannot acclimatise at home. The plan handles the training side and is explicit that acclimatisation happens on the mountain, with descent as the answer to worsening symptoms.",
      },
    ],
  },
  {
    slug: "multi-day-traverse-training-plan",
    objective: "traverse",
    metaTitle: "Multi-Day Alpine Traverse Training Plan — Ridgework",
    metaDescription:
      "A 32-week training plan for a multi-day alpine route: hiking base, climbing, loaded back-to-back days, and peaking on day one. No card needed.",
    kicker: "Multi-day route",
    h1: "Multi-day alpine traverse training plan",
    lead: "A linked alpine route over several days. Hiking base, then climbing plus loaded back-to-back days — built so you peak on day one and still have something left on day three.",
    body: [
      "A traverse is not one hard day repeated. It is a hard day, followed by another one on legs that have not recovered, with a pack, at altitude, possibly after a poor night in a hut. The training has to rehearse that second and third day, not just the first.",
      "The base here is long and deliberately unexciting: twenty weeks of hiking and easy aerobic volume, because the thing that fails on day three is almost never technical skill. It is accumulated fatigue and a body that has never been asked to go again.",
      "The specific block adds the pattern that matters — a climbing day followed by a linked hike with a loaded pack. When you report leftovers in the legs, day two gets cut rather than forced, which is the same judgement you will need on the route itself.",
      "Logistics get built in near the end: huts or bivy sites in order, a reserve weather day, and the reminder that the range does not owe you a window on the day you booked the train.",
    ],
    phaseNotes: {
      base: "Twenty weeks: hiking volume, aerobic easy days, a climbing session and early strength.",
      specific:
        "Ten weeks of climbing days linked to loaded hikes — the back-to-back pattern the route will demand.",
      taper: "Two weeks. Kit locked, logistics confirmed, legs allowed to come back.",
    },
    forWhom: [
      "Climbers with a linked route or a hut-to-hut objective",
      "Anyone who has done single alpine days and found day two the problem",
      "People planning a season around one big multi-day objective",
    ],
    notForWhom: [
      "Anyone without prior single-day alpine experience",
      "People who cannot protect back-to-back weekend days in the specific block",
    ],
    kit: [
      "Pack loaded as you will carry it, including water",
      "Crampons, axe and the rack the line needs",
      "Sleep system if you are bivying",
      "Map or GPS with a battery plan",
    ],
    faq: [
      {
        q: "How do you train for a multi-day mountain route?",
        a: "With volume first and the back-to-back pattern last. Twenty weeks of hiking and aerobic base, then ten weeks pairing a climbing day with a loaded hike the next day, so day two on tired legs is rehearsed rather than discovered.",
      },
      {
        q: "Should I peak for day one or the middle of the route?",
        a: "Day one. You arrive fresh and the route takes it from there. The taper is built for that, and the plan is honest that the later days are carried by base fitness, not sharpness.",
      },
      {
        q: "How do I train with a heavy pack safely?",
        a: "Progressively, and on hiking rather than running days. Pack load ramps through the specific block and drops for the taper. Sudden heavy carries are how backs and knees get hurt three weeks before departure.",
      },
      {
        q: "What if the weather closes the window?",
        a: "The plan puts a reserve day in the logistics list and treats a packed itinerary with zero slack as a planning error rather than bad luck.",
      },
    ],
  },
  {
    slug: "high-altitude-expedition-training-plan",
    objective: "expedition",
    metaTitle: "High-Altitude Expedition Training Plan — Ridgework",
    metaDescription:
      "A 40-week expedition training plan: hiking volume, pack carries, muscular endurance, and a final block that is sleep and logistics rather than more load.",
    kicker: "High-altitude expedition",
    h1: "High-altitude expedition training plan",
    lead: "A high camp, months out. Hiking and easy volume, progressive pack carries and muscular endurance — with a last block that is about sleep, food and packing, not one more hard carry.",
    body: [
      "Expedition training is a long game played mostly at low intensity. The work that matters is the ability to carry a load, day after day, at an effort that leaves something in reserve, while eating enough when altitude has quietly removed your appetite.",
      "Twenty-two weeks of base come first: hiking, easy aerobic volume, and strength established early. The specific block adds muscular endurance and loaded carries on hiking days, building the tolerance that rotation days will demand.",
      "The last weeks are the part most plans get wrong by adding volume. Here they get quieter on purpose. Arriving at base camp already tired is a common and entirely avoidable way to lose an expedition, and the plan will keep telling you that fresh is the goal.",
      "Altitude itself is treated as logistics and medicine, not as a training variable you can train away at home. Sleep lower than you climbed, eat on a schedule because thirst and hunger both lie higher up, and descend for worsening symptoms. Ridgework does not diagnose altitude illness and will not pretend to.",
    ],
    phaseNotes: {
      base: "Twenty-two weeks of hiking, easy volume and early strength. Patience is the training.",
      specific:
        "Fourteen weeks adding muscular endurance and progressively loaded pack carries on hiking days.",
      taper:
        "Four weeks. Sleep, food, permits and packing — not extra altitude and not extra load.",
    },
    forWhom: [
      "Climbers with a high-altitude objective and a departure date",
      "Anyone who needs the load progression written rather than improvised",
      "People whose last expedition went badly because they arrived tired",
    ],
    notForWhom: [
      "Anyone looking for an acclimatisation protocol or medical guidance — that needs a qualified human",
      "People without prior multi-day mountain experience",
    ],
    kit: [
      "Boots and crampons matched and walked in",
      "Pack loaded to expedition weight",
      "Sleep system and stove you have already used",
      "Permits and contacts on paper as well as a phone",
    ],
    faq: [
      {
        q: "How long should I train for a high-altitude expedition?",
        a: "This block runs 40 weeks: 22 base, 14 specific, 4 weeks of easing off. The length is the point — carrying capacity and durability accumulate slowly, and there is no compressed version that produces the same thing.",
      },
      {
        q: "Can you train for altitude at sea level?",
        a: "You can arrive strong, well fed and rested, which materially helps. You cannot acclimatise in advance at home. Acclimatisation happens on the mountain through rotations and sleeping low after climbing high.",
      },
      {
        q: "How heavy should training carries be?",
        a: "Load ramps across the specific block on hiking days and comes back down for the final weeks. The plan names the weight for each carry rather than leaving it to guesswork or ego.",
      },
      {
        q: "What should the last month look like?",
        a: "Quiet. Sleep, packing, food you have tested and logistics. If you feel undertrained in the last weeks and want to add a big carry, that urge is the thing the taper exists to resist.",
      },
    ],
  },
];

export function getPlanPage(slug: string): PlanPage | undefined {
  return PLAN_PAGES.find((plan) => plan.slug === slug);
}

export function planPageFor(objective: ObjectiveId): PlanPage | undefined {
  return PLAN_PAGES.find((plan) => plan.objective === objective);
}
