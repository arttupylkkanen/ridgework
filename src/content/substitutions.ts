import type { SessionKey } from "@/lib/rolling-plan";

/**
 * What to do when the written session is not possible, ranked.
 *
 * The ordering principle is specificity. Cross-training transfers part of the
 * aerobic effect but does not exceed training in the target mode, and the gap
 * widens the better trained you already are (Loy et al. 1995; Frontiers 2026
 * systematic review). So each rung keeps the *purpose* of the session and gives
 * up a little more of the thing that made it specific — and the page says which
 * thing, rather than pretending the swap is free.
 *
 * English only for now: `SessionHow.swap` still carries the one-line version in
 * every locale, and the ladder renders on top of it where it exists.
 */
export type LadderRung = {
  /** What to actually do. */
  do: string;
  /** What this rung keeps, and what it gives up. */
  cost: string;
};

export type SessionLadder = {
  /** The one sentence that says what the session is really for. */
  purpose: string;
  rungs: LadderRung[];
  /** Optional evidence note, only where there is something real to cite. */
  evidence?: string;
};

export const LADDER_LABELS = {
  title: "If you cannot do this session",
  purpose: "What this session is for",
  best: "Best",
  worse: "Step down",
  costLabel: "Trade-off",
  principle:
    "Ranked by specificity. Cross-training carries part of the aerobic effect across, but it does not beat training in the mode you are preparing for, and the gap grows the fitter you get. Every step down keeps the purpose and gives up something — each one says what.",
} as const;

export const SESSION_LADDERS: Partial<Record<SessionKey, SessionLadder>> = {
  climb: {
    purpose:
      "Hours of movement on rock at an intensity you can sustain — for an alpine day the currency is metres climbed and time on the wall, not the hardest move you can pull.",
    rungs: [
      {
        do: "Several hours on real rock, well below your limit. Long easy routes, linked pitches, moving steadily rather than resting between hard attempts.",
        cost: "Nothing given up. This is the session.",
      },
      {
        do: "Indoor rope climbing, long easy routes and laps. Count metres, not grades. Keep moving between climbs.",
        cost: "Keeps the movement, the pacing and the forearm endurance. Gives up real rock, route-finding and gear.",
      },
      {
        do: "Bouldering for volume: many easy problems, short rests, down-climb where you can. Not projecting.",
        cost: "Keeps grip and movement quality. Gives up the continuous time under tension that the long day actually demands.",
      },
      {
        do: "Fingerboard repeaters plus core and pulling work, then add whatever climbing you can get.",
        cost: "Keeps finger strength, which supplemental hangboard work does improve. Gives up almost all of the endurance and all of the movement skill.",
      },
    ],
    evidence:
      "Ten weeks of hangboard work on top of regular climbing raised peak finger force 17–28% where climbing alone did not — but that is maximal strength, not the sustained capacity an alpine day runs on. It is a supplement and a bad-weather fallback, not the top rung.",
  },
  mountain: {
    purpose:
      "A long day on real vertical terrain, up and down, so the legs meet both the climbing and the descending they will meet on the objective.",
    rungs: [
      {
        do: "A real mountain day with the vert and the full descent on your feet.",
        cost: "Nothing given up.",
      },
      {
        do: "Repeats on the steepest hill you can reach, and run or hike every descent rather than taking the lift or the road.",
        cost: "Keeps the climbing and, crucially, the eccentric loading of the descent. Gives up altitude, exposure and route length.",
      },
      {
        do: "Stairs, a stadium, or a treadmill at incline, with a pack if you have one.",
        cost: "Keeps the uphill work. Gives up the descent entirely — and the descent is the part that wrecks legs on the day.",
      },
      {
        do: "Easy cycling for the same minutes.",
        cost: "Keeps aerobic time with no impact, which is why it is the injury fallback. Transfers least of all to mountain legs.",
      },
    ],
    evidence:
      "Descending is not the easy half. Trail races produce severe neuromuscular fatigue driven by repeated eccentric contractions on the downhills, and a single prior downhill bout measurably protects against the next one — habitual downhill repeats show lower creatine kinase and better retained strength. A stair machine cannot rehearse that.",
  },
  vert: {
    purpose: "Time spent going up at a conversational effort, to build the climbing engine.",
    rungs: [
      {
        do: "Uphill on trail, hiking or jogging, talking the whole way.",
        cost: "Nothing given up.",
      },
      {
        do: "Steep road or a long stairway at the same effort.",
        cost: "Keeps the effort and the gradient. Gives up uneven footing.",
      },
      {
        do: "Treadmill at incline.",
        cost: "Keeps the uphill demand. Gives up the descent and the terrain.",
      },
      {
        do: "Easy cycling with sustained climbs.",
        cost: "Keeps aerobic load. Gives up weight-bearing, which is most of the point.",
      },
    ],
  },
  pack: {
    purpose:
      "Carrying the load you will actually carry, so the shoulders, back and legs have met it before the day.",
    rungs: [
      {
        do: "Loaded hike on real terrain, pack weighted as you will carry it, water included.",
        cost: "Nothing given up.",
      },
      {
        do: "Loaded stairs or a steep local hill for the same time.",
        cost: "Keeps the load and the climbing. Gives up distance and terrain.",
      },
      {
        do: "Loaded treadmill at incline.",
        cost: "Keeps the load. Gives up the descent, where a pack does the most damage.",
      },
      {
        do: "Unloaded hike, plus weighted step-ups afterwards.",
        cost: "Keeps some of each separately. Gives up carrying under fatigue, which is the actual skill.",
      },
    ],
  },
  me: {
    purpose:
      "Muscular endurance: keeping force going in the legs long after they would rather stop. Strength is the precondition; this is extracting endurance from it.",
    rungs: [
      {
        do: "Long uphill carrying a load, continuous, at an effort you could hold for hours.",
        cost: "Nothing given up.",
      },
      {
        do: "Weighted step-ups or box step-ups in long sets, continuous rather than heavy.",
        cost: "Keeps the sustained leg loading. Gives up terrain and the aerobic length.",
      },
      {
        do: "Bodyweight step-ups, split squats and calf work in long sets.",
        cost: "Keeps the movement pattern. Gives up the load, so the stimulus is much lighter.",
      },
    ],
  },
  long: {
    purpose: "Time on feet. The single most transferable session for any long day.",
    rungs: [
      { do: "Long outing on terrain like your objective.", cost: "Nothing given up." },
      {
        do: "Long outing on whatever trail or path you can reach.",
        cost: "Keeps duration and impact. Gives up terrain specificity.",
      },
      {
        do: "Long hike for the same minutes.",
        cost: "Keeps time on feet and load-bearing. Gives up running-specific stress — which for a mountain objective is often no loss at all.",
      },
      {
        do: "Long easy bike for the same minutes.",
        cost: "Keeps aerobic duration. Gives up the impact and the eccentric work your legs need.",
      },
    ],
  },
  quality: {
    purpose: "One controlled dose of harder work, taken only when you turned up rested.",
    rungs: [
      { do: "Intervals on terrain resembling the objective.", cost: "Nothing given up." },
      {
        do: "Intervals on any hill or trail at the same effort.",
        cost: "Keeps the physiological dose. Gives up terrain rehearsal.",
      },
      {
        do: "Treadmill intervals.",
        cost: "Keeps the effort precisely. Gives up footing and descent.",
      },
      {
        do: "Bike intervals at the same effort and duration.",
        cost: "Keeps the cardiac work. Transfers least to running legs — use it when impact is the problem.",
      },
    ],
  },
  strength: {
    purpose:
      "Enough strength to hold position and keep producing force late in a long day. Strength comes before muscular endurance, not after it.",
    rungs: [
      { do: "Gym session: squat or deadlift pattern, pulling, core.", cost: "Nothing given up." },
      {
        do: "Weighted step-ups, split squats, pull-ups, hanging core work — a pack or any load will do.",
        cost: "Keeps most of the stimulus. Gives up heavy loading at the top end.",
      },
      {
        do: "Bodyweight circuit: split squats, calf raises, push-ups, planks, slow and controlled.",
        cost: "Keeps the patterns and the tendon work. Light for anyone already strong.",
      },
    ],
  },
  hike: {
    purpose: "Easy aerobic time on feet, usually with some climbing.",
    rungs: [
      { do: "Hike on trail or hill.", cost: "Nothing given up." },
      {
        do: "Brisk walk anywhere, stairs if you have them.",
        cost: "Keeps time on feet. Gives up gradient and terrain.",
      },
      {
        do: "Easy bike or easy ski for the same minutes.",
        cost: "Keeps aerobic time. Gives up weight-bearing.",
      },
    ],
  },
  easy: {
    purpose: "Easy aerobic volume at a pace you can talk through. The bulk of the week.",
    rungs: [
      { do: "Easy jog or walk outside.", cost: "Nothing given up." },
      {
        do: "Treadmill or indoor track at the same effort.",
        cost: "Keeps the aerobic dose. Gives up terrain.",
      },
      {
        do: "Easy bike, easy ski, or easy row for the same minutes.",
        cost: "Keeps aerobic time with no impact — the right choice when something hurts.",
      },
    ],
  },
};

export function ladderFor(key: SessionKey): SessionLadder | undefined {
  return SESSION_LADDERS[key];
}
