import type {
  Constraint,
  Discipline,
  Equipment,
  Experience,
  LongestBand,
  Sport,
  Terrain,
  Units,
  VolumeBand,
} from "@/lib/athlete";
import type { ReadinessCall } from "@/lib/daily-readiness";

export type AthleteCopy = {
  onboarding: {
    kicker: string;
    h1: string;
    lead: string;
    next: string;
    back: string;
    start: string;
    step: string;
    needDays: string;
    limitations: string;
    limitationsYes: string;
    limitationsNo: string;
    limitationsHint: string;
    reviewTitle: string;
    reviewLead: string;
    steps: string[];
    sports: Record<Sport, string>;
    disciplines: Record<Discipline, string>;
    experience: Record<Experience, string>;
    volume: Record<VolumeBand, string>;
    longest: Record<LongestBand, string>;
    terrain: Record<Terrain, string>;
    equipment: Record<Equipment, string>;
    constraints: Record<Constraint, string>;
    units: Record<Units, string>;
    availableTitle: string;
    windowTitle: string;
    windowHint: string;
    windowMinutes: string;
    windowTime: string;
    peakLabel: string;
  };
  today: {
    kicker: string;
    title: string;
    wakeTitle: string;
    wakeLead: string;
    sleep: string;
    soreness: string;
    motivation: string;
    fatigue: string;
    stress: string;
    scaleLow: Record<"sleep" | "soreness" | "motivation" | "fatigue" | "stress", string>;
    scaleHigh: Record<"sleep" | "soreness" | "motivation" | "fatigue" | "stress", string>;
    optionalTitle: string;
    rhr: string;
    hrv: string;
    lastEffort: string;
    sessionToday: string;
    minutes: string;
    was: string;
    markDone: string;
    markMissed: string;
    didTomorrow: string;
    travellingUntil: string;
    clearTravel: string;
    accessTitle: string;
    access: Record<"trail" | "mountain" | "gym" | "climbing", string>;
    whyChanged: string;
    whyWeek: string;
    peakLocked: string;
    noSession: string;
    doneFlash: string;
    missedFlash: string;
    editProfile: string;
    thisWeek: string;
    safety: string;
    overrideLabel: string;
    overrideKeep: string;
    calls: Record<ReadinessCall, { title: string; action: string }>;
    reasons: Record<string, string>;
  };
  profile: {
    title: string;
    lead: string;
    save: string;
    saved: string;
    reopen: string;
  };
};

const reasonsEn: Record<string, string> = {
  availableDays: "You have {n} training days. Rest sits on the others.",
  dayWindowCap: "{n} session(s) were trimmed to fit the time you said those days have.",
  beginnerNoQuality:
    "Base weeks stay easy while you are still building the habit. Quality waits for the specific block.",
  noQualityBase: "This is still aerobic base. No quality dose this week.",
  gymInsteadOfClimb: "No ice or rock kit listed, so climbing is gym strength.",
  noClimbGear: "No climbing kit listed, so the mountain pull becomes a hike.",
  noGym: "No gym listed, so strength is an easy session instead.",
  hikeInsteadOfMountain:
    "Mountain access is off or the terrain you have is flatter, so this is a hike or easy run.",
  noPack: "No pack listed, so the pack day is a hike.",
  flatTerrain: "You trained on flat ground, so the hike is an easy run.",
  shiftNoEarlyQuality: "Shift work: quality sits later in the week, not Monday or Tuesday.",
  shortSleepSpacing: "Short sleep is a standing constraint, so back-to-back work days are split.",
  kidsCapLong: "Family constraint: the long is capped at {n} min.",
  limitationsConservative:
    "You noted a limitation. Long and quality stay conservative. This is not a rehab plan.",
  longFromBand: "The long is {n} min because that matches your current longest outing.",
  volumeSplit: "Easy days share the rest of a {n} min week.",
  missedNoStack: "A hard session was missed. Nothing is stacked on top. No makeup quality.",
  travelSwap:
    "Travel until {until}. Mountain and climbing days become easy work from wherever you are.",
  engineConversational: "Aerobic engine: every run stays conversational.",
  altitudeAcclimatization:
    "Above 3500 m, sleep lower than your high point this week — the climbing is the training; altitude adaptation happens on rotations, not in one push.",
  peakUnchanged: "Ready date {peak} does not move unless you change it.",
  peakMoved: "You moved the ready date from {from} to {to}. Extra weeks go to easy base.",
  keepWritten: "Today stays as written.",
  todayRest: "Today is rest. Reassess tomorrow.",
  qualityToEasy: "Today's quality is now easy aerobic work.",
  longToEasy: "Today's long is shorter and stays conversational.",
  reduceMinutes: "Today is shorter than written.",
  noMakeup: "The session moved. No extra work is added on the vacated day.",
  whyChangedToday: "Today changed: {from} → {to}.",
  sleepLow: "Sleep was {n}/5 last night.",
  sleepOk: "Sleep {n}/5.",
  fatigueHigh: "You marked fatigue {n}/5.",
  fatigueOk: "Fatigue {n}/5.",
  sorenessHigh: "Muscle soreness {n}/5.",
  motivationLow: "Motivation {n}/5.",
  stressHigh: "Stress {n}/5.",
  loadCluster: "The last three days already held {n} hard or long sessions.",
  yesterdayHard: "Yesterday was a hard or long day.",
  rhrUp: "Resting HR {rhr} is {delta} bpm above your recent baseline ({baseline}).",
  hrvDown: "HRV {hrv} is {pct}% below your recent baseline ({baseline}).",
  normalLoad: "Recent load is ordinary ({n} hard/long days in the last three).",
  runToHikeCycle: "You cannot run, so aerobic days are hiking or cycling.",
  illnessEase: "Easy return through week {n}. Quality waits.",
  secondEventEase: "The extra date {date} is treated as a B-race: this week eases.",
  makeupStacked: "An extra quality dose was stacked. That is the option you chose.",
};

export const athleteEn: AthleteCopy = {
  onboarding: {
    kicker: "Your setup",
    h1: "What should this week actually look like?",
    lead: "A few facts about how you train. The week is written from those, not from a generic template with your name on it.",
    next: "Continue",
    back: "Back",
    start: "Write my three weeks",
    step: "Step {n} of {total}",
    needDays: "Pick at least two days you can train.",
    limitations: "Anything that currently limits training",
    limitationsYes: "Yes, something limits it",
    limitationsNo: "No, nothing limits it",
    limitationsHint:
      "A niggle, a time cap, a doctor's note you already have. We treat it as a training constraint, not a diagnosis.",
    reviewTitle: "This is what we will write from",
    reviewLead:
      "Ready date stays unless you change it. Tired days train less. Missed sessions are not stacked.",
    steps: ["Sport", "Goal", "Ready date", "Load", "Days", "Terrain", "Life"],
    sports: { running: "Running", mountaineering: "Mountaineering", mixed: "Both" },
    disciplines: {
      trail: "Trail",
      ultra: "Ultra",
      alpine: "Alpine / climbing",
      road: "Road",
      ski: "Ski-mo / ski tour",
    },
    experience: {
      beginner: "New to this distance or terrain",
      intermediate: "A season or two in already",
      experienced: "Several peaks or ultras done",
      veteran: "This is a repeat cycle",
    },
    volume: {
      h0_3: "Under 3 hours a week",
      h3_5: "3–5 hours",
      h5_8: "5–8 hours",
      h8_12: "8–12 hours",
      h12p: "12 hours or more",
    },
    longest: {
      m60: "Under 60 min",
      m90: "60–90 min",
      m150: "90–150 min",
      m240: "2.5–4 hours",
      m240p: "Over 4 hours",
    },
    terrain: {
      flat: "Mostly flat",
      rolling: "Hills and trails",
      mountain: "Mountains I can reach",
      highAlpine: "High alpine / glacier access",
    },
    equipment: {
      trailShoes: "Trail shoes",
      poles: "Poles",
      pack: "Pack I can train in",
      gym: "Gym or home strength",
      crampons: "Crampons",
      iceAxe: "Ice axe",
    },
    constraints: {
      shiftWork: "Shift work",
      travelHeavy: "Travel-heavy weeks",
      youngKids: "Young kids / family mornings",
      shortSleep: "Habitually short sleep",
      deskJob: "Desk job, stiff hips",
    },
    units: { km: "Kilometres", miles: "Miles" },
    availableTitle: "Days you can train",
    windowTitle: "How long do those days actually have?",
    windowHint: "Optional. Leave a day blank and we spend the weekly budget as usual. The clock time is only there if it helps you — the plan does not need it.",
    windowMinutes: "Minutes",
    windowTime: "Start (optional)",
    peakLabel: "Day you want to be ready",
  },
  today: {
    kicker: "Today",
    title: "What you run today",
    wakeTitle: "How did you wake up?",
    wakeLead:
      "Five marks. Optional heart numbers if you have them. The call is the strictest rule that fires — not a hidden score.",
    sleep: "Sleep",
    soreness: "Soreness",
    motivation: "Motivation",
    fatigue: "Fatigue",
    stress: "Stress",
    scaleLow: {
      sleep: "Awful",
      soreness: "None",
      motivation: "None",
      fatigue: "Fresh",
      stress: "Calm",
    },
    scaleHigh: {
      sleep: "Excellent",
      soreness: "Severe",
      motivation: "Keen",
      fatigue: "Wrecked",
      stress: "High",
    },
    optionalTitle: "If you track them",
    rhr: "Resting HR",
    hrv: "HRV (ms)",
    lastEffort: "Yesterday's effort",
    sessionToday: "Today's session",
    minutes: "{n} min",
    was: "was {session}",
    markDone: "Done",
    markMissed: "Missed",
    didTomorrow: "I did tomorrow's session today",
    travellingUntil: "Travelling until",
    clearTravel: "Not travelling",
    accessTitle: "Access this week",
    access: { trail: "Trail", mountain: "Mountain", gym: "Gym", climbing: "Climbing kit" },
    whyChanged: "Why this changed",
    whyWeek: "Why this week looks like this",
    peakLocked: "Ready date {peak} — it moves only if you change it.",
    noSession: "No session written for today. Rest, or the plan has not started this week yet.",
    doneFlash: "Logged. Nothing extra is added.",
    missedFlash: "Missed. Later hard sessions this week will not stack on top.",
    editProfile: "Edit how you train",
    thisWeek: "This week",
    safety:
      "This is a training-load call, not a diagnosis. Pain, illness, or injury: stop and speak to a clinician or a qualified coach.",
    overrideLabel: "I understand the recommendation and I choose to keep the written session.",
    overrideKeep: "Keep the written session",
    calls: {
      ready: { title: "Ready for the written session", action: "Do what is on the plan." },
      reduce: { title: "Train, but reduce load", action: "Keep moving. Cut the hard part." },
      easy: { title: "Easy or recovery today", action: "Conversational only. No quality." },
      rest: { title: "Rest and reassess tomorrow", action: "No session today." },
    },
    reasons: reasonsEn,
  },
  profile: {
    title: "How you train",
    lead: "Change a fact, and the next week is rewritten from it. The ready date stays unless you edit that field.",
    save: "Save and rewrite the week",
    saved: "Saved",
    reopen: "Change setup",
  },
};

const reasonsFi: Record<string, string> = {
  availableDays: "Treenipäiviä on {n}. Muut ovat lepoa.",
  dayWindowCap: "{n} treeni(ä) lyhennettiin mahtumaan siihen aikaan jonka noille päiville annoit.",
  beginnerNoQuality: "Pohjaviikot pysyvät kevyinä. Tehot tulevat vasta kisajaksoon.",
  noQualityBase: "Tämä on vielä peruskuntoa. Ei tehoannosta tällä viikolla.",
  gymInsteadOfClimb: "Jää- tai kalliokamoja ei ole, joten kiipeily on salivoimaa.",
  noClimbGear: "Kiipeilykamoja ei ole, joten veto on vaellus.",
  noGym: "Salia ei ole merkitty, joten voima on kevyt sessio.",
  hikeInsteadOfMountain: "Vuoripäivä on vaellus tai kevyt juoksu, koska maasto tai pääsy ei riitä.",
  noPack: "Rinkkaa ei ole merkitty, joten rinkkapäivä on vaellus.",
  flatTerrain: "Maasto on tasaista, joten vaellus on kevyt juoksu.",
  shiftNoEarlyQuality: "Vuorotyö: teho ei ole maanantaina tai tiistaina.",
  shortSleepSpacing: "Lyhyt uni on vakio. Peräkkäisiä työpäiviä ei pinota.",
  kidsCapLong: "Perhe: pitkä on enintään {n} min.",
  limitationsConservative:
    "Merkitsit rajoitteen. Pitkä ja teho pysyvät varovaisina. Tämä ei ole kuntoutusohjelma.",
  longFromBand: "Pitkä on {n} min, koska se vastaa nykyistä pisintä vetoa.",
  volumeSplit: "Kevyet päivät jakavat {n} minuutin viikon.",
  missedNoStack: "Kova sessio jäi väliin. Päälle ei pinota. Ei korvaavaa tehoa.",
  travelSwap: "Matka {until} asti. Vuori- ja kiipeilypäivät ovat kevyttä sieltä missä olet.",
  engineConversational: "Aerobinen moottori: jokainen veto pysyy puhevauhdissa.",
  altitudeAcclimatization:
    "Yli 3500 m: nuku matalammalla kuin päivän korkein kohta tällä viikolla — kiipeäminen on treeni, korkeuteen sopeutuminen tapahtuu kierroksilla, ei yhdellä työnnöllä.",
  peakUnchanged: "Tavoitepäivä {peak} ei siirry, ellet itse siirrä.",
  peakMoved: "Siirsit tavoitepäivän {from} → {to}. Ylimääräiset viikot menevät kevyeen pohjaan.",
  keepWritten: "Tänään pysyy kirjoitettuna.",
  todayRest: "Tänään lepo. Katso huomenna uudestaan.",
  qualityToEasy: "Tämän päivän teho on nyt kevyt aerobinen.",
  longToEasy: "Pitkä on lyhyempi ja pysyy puhevauhdissa.",
  reduceMinutes: "Tänään on lyhyempi kuin kirjoitettu.",
  noMakeup: "Sessio siirtyi. Tyhjäksi jääneelle päivälle ei lisätä ekstra-treeniä.",
  whyChangedToday: "Tänään muuttui: {from} → {to}.",
  sleepLow: "Uni oli {n}/5.",
  sleepOk: "Uni {n}/5.",
  fatigueHigh: "Väsymys {n}/5.",
  fatigueOk: "Väsymys {n}/5.",
  sorenessHigh: "Lihasarkuus {n}/5.",
  motivationLow: "Motivaatio {n}/5.",
  stressHigh: "Stressi {n}/5.",
  loadCluster: "Kolmena viime päivänä oli jo {n} kovaa tai pitkää sessiota.",
  yesterdayHard: "Eilen oli kova tai pitkä päivä.",
  rhrUp: "Leposyke {rhr} on {delta} lyöntiä yli oman baselinen ({baseline}).",
  hrvDown: "HRV {hrv} on {pct} % alle oman baselinen ({baseline}).",
  normalLoad: "Viime päivien kuorma on tavallinen ({n} kovaa/pitkää kolmessa päivässä).",
  runToHikeCycle: "Et voi juosta, joten aerobiset päivät ovat vaellusta tai pyörää.",
  illnessEase: "Helppo paluu viikkoon {n} asti. Tehot odottavat.",
  secondEventEase: "Extra-päivä {date} on B-kisa: tämä viikko kevenee.",
  makeupStacked: "Extra-teho pinottiin. Se oli valitsemasi vaihtoehto.",
};

export const athleteFi: AthleteCopy = {
  onboarding: {
    kicker: "Sinun lähtötietosi",
    h1: "Miltä tämän viikon pitää oikeasti näyttää?",
    lead: "Muutama fakta siitä miten treenaat. Viikko kirjoitetaan niistä, ei geneerisestä mallista johon on liimattu nimesi.",
    next: "Jatka",
    back: "Takaisin",
    start: "Kirjoita kolme viikkoa",
    step: "Vaihe {n} / {total}",
    needDays: "Valitse vähintään kaksi treenipäivää.",
    limitations: "Rajoittaako jokin treeniä juuri nyt?",
    limitationsYes: "Kyllä, jokin rajoittaa",
    limitationsNo: "Ei, mikään ei rajoita",
    limitationsHint:
      "Kolotus, aikaraja, jo saatu ohje. Käsitellään treenirajoitteena, ei diagnoosina.",
    reviewTitle: "Tästä viikot kirjoitetaan",
    reviewLead:
      "Tavoitepäivä pysyy, ellet itse siirrä. Väsynyt päivä treenaa vähemmän. Väliin jäänyttä ei pinota.",
    steps: ["Laji", "Tavoite", "Päivä", "Kuorma", "Päivät", "Maasto", "Arki"],
    sports: { running: "Juoksu", mountaineering: "Vuorikiipeily", mixed: "Molemmat" },
    disciplines: {
      trail: "Polku",
      ultra: "Ultra",
      alpine: "Alpit / kiipeily",
      road: "Tie",
      ski: "Suksi / skimo",
    },
    experience: {
      beginner: "Matka tai maasto on uusi",
      intermediate: "Yksi tai kaksi kautta takana",
      experienced: "Useampi huippu tai ultra tehty",
      veteran: "Tämä on toistuva kausi",
    },
    volume: {
      h0_3: "Alle 3 h viikossa",
      h3_5: "3–5 h",
      h5_8: "5–8 h",
      h8_12: "8–12 h",
      h12p: "12 h tai enemmän",
    },
    longest: {
      m60: "Alle 60 min",
      m90: "60–90 min",
      m150: "90–150 min",
      m240: "2,5–4 h",
      m240p: "Yli 4 h",
    },
    terrain: {
      flat: "Enimmäkseen tasaista",
      rolling: "Mäkiä ja polkuja",
      mountain: "Vuoria joihin pääsen",
      highAlpine: "Korkea alppi / jäätikkö",
    },
    equipment: {
      trailShoes: "Polkukengät",
      poles: "Sauvat",
      pack: "Rinkka jossa voin treenata",
      gym: "Sali tai kotivoima",
      crampons: "Jääraudat",
      iceAxe: "Hakku",
    },
    constraints: {
      shiftWork: "Vuorotyö",
      travelHeavy: "Paljon matkustamista",
      youngKids: "Pienet lapset / aamut",
      shortSleep: "Tottunut lyhyeen uneen",
      deskJob: "Toimistotyö, kankeat lonkat",
    },
    units: { km: "Kilometrit", miles: "Mailit" },
    availableTitle: "Päivät jolloin voit treenata",
    windowTitle: "Paljonko noilla päivillä oikeasti on aikaa?",
    windowHint: "Valinnainen. Jätä päivä tyhjäksi niin viikkobudjetti jaetaan kuten ennenkin. Kellonaika on vain sinua varten — suunnitelma ei tarvitse sitä.",
    windowMinutes: "Minuuttia",
    windowTime: "Alkaa (valinnainen)",
    peakLabel: "Päivä jolloin haluat olla valmis",
  },
  today: {
    kicker: "Tänään",
    title: "Mitä tänään juostaan",
    wakeTitle: "Miltä herätys tuntui?",
    wakeLead:
      "Viisi merkintää. Sykeluvut jos ne on. Suositus on tiukin sääntö joka täyttyy — ei piiloscorea.",
    sleep: "Uni",
    soreness: "Arkkuus",
    motivation: "Motivaatio",
    fatigue: "Väsymys",
    stress: "Stressi",
    scaleLow: {
      sleep: "Surkea",
      soreness: "Ei ole",
      motivation: "Ei ole",
      fatigue: "Virkeä",
      stress: "Rauha",
    },
    scaleHigh: {
      sleep: "Erinomainen",
      soreness: "Kova",
      motivation: "Kova halu",
      fatigue: "Rikki",
      stress: "Korkea",
    },
    optionalTitle: "Jos seuraat",
    rhr: "Leposyke",
    hrv: "HRV (ms)",
    lastEffort: "Eilisen rasitus",
    sessionToday: "Tämän päivän sessio",
    minutes: "{n} min",
    was: "oli {session}",
    markDone: "Tehty",
    markMissed: "Väliin",
    didTomorrow: "Tein huomisen session tänään",
    travellingUntil: "Matkalla asti",
    clearTravel: "En ole matkalla",
    accessTitle: "Pääsy tällä viikolla",
    access: { trail: "Polku", mountain: "Vuori", gym: "Sali", climbing: "Kiipeilykamat" },
    whyChanged: "Miksi tämä muuttui",
    whyWeek: "Miksi viikko näyttää tältä",
    peakLocked: "Tavoitepäivä {peak} — siirtyy vain jos siirrät sen.",
    noSession: "Tänään ei ole sessiota. Lepo, tai viikko ei ole vielä alkanut.",
    doneFlash: "Merkitty. Ekstraa ei lisätä.",
    missedFlash: "Väliin. Myöhempiä kovia ei pinota päälle.",
    editProfile: "Muuta lähtötietoja",
    thisWeek: "Tämä viikko",
    safety:
      "Tämä on treenikuorman kutsu, ei diagnoosi. Kipu, sairaus tai vamma: lopeta ja puhu lääkärille tai pätevälle valmentajalle.",
    overrideLabel: "Ymmärrän suosituksen ja pidän silti kirjoitetun session.",
    overrideKeep: "Pidä kirjoitettu sessio",
    calls: {
      ready: { title: "Valmis kirjoitettuun sessioon", action: "Tee se mikä on suunnitelmassa." },
      reduce: { title: "Treenaa, mutta kevennä", action: "Liiku. Leikkaa kova osa." },
      easy: { title: "Kevyt tai palauttava tänään", action: "Vain puhevauhtia. Ei tehoa." },
      rest: { title: "Lepo, katso huomenna", action: "Ei sessiota tänään." },
    },
    reasons: reasonsFi,
  },
  profile: {
    title: "Miten treenaat",
    lead: "Muuta fakta, niin seuraava viikko kirjoitetaan uudestaan. Tavoitepäivä pysyy, ellet muuta sitä.",
    save: "Tallenna ja kirjoita viikko uudestaan",
    saved: "Tallennettu",
    reopen: "Muuta tietoja",
  },
};

const reasonsFr: Record<string, string> = {
  availableDays: "Vous avez {n} jours d’entraînement. Le reste est du repos.",
  dayWindowCap: "{n} séance(s) ont été raccourcies pour tenir dans le temps indiqué pour ces jours.",
  beginnerNoQuality: "La base reste facile. La qualité attend le bloc spécifique.",
  noQualityBase: "Encore de la base aérobie. Pas de qualité cette semaine.",
  gymInsteadOfClimb: "Pas de matériel glace/rocher : l’escalade devient de la force en salle.",
  noClimbGear: "Pas de matériel d’escalade : la séance devient une rando.",
  noGym: "Pas de salle : la force devient une séance facile.",
  hikeInsteadOfMountain: "Pas d’accès montagne, donc rando ou footing facile.",
  noPack: "Pas de sac listé : la journée sac devient une rando.",
  flatTerrain: "Terrain plat : la rando est un footing facile.",
  shiftNoEarlyQuality: "Horaires décalés : la qualité n’est pas lundi ni mardi.",
  shortSleepSpacing: "Sommeil court habituel : pas deux jours durs d’affilée.",
  kidsCapLong: "Contrainte familiale : la longue est plafonnée à {n} min.",
  limitationsConservative:
    "Vous avez noté une limite. Longue et qualité restent prudentes. Pas un plan de rééducation.",
  longFromBand: "La longue fait {n} min, alignée sur votre sortie actuelle la plus longue.",
  volumeSplit: "Les jours faciles se partagent une semaine de {n} min.",
  missedNoStack: "Une séance dure a été manquée. Rien n’est empilé. Pas de rattrapage.",
  travelSwap: "Voyage jusqu’au {until}. Montagne et escalade deviennent du facile sur place.",
  engineConversational: "Moteur aérobie : chaque sortie reste conversationnelle.",
  altitudeAcclimatization:
    "Au-dessus de 3500 m, dormez plus bas que votre point culminant cette semaine — l’ascension est l’entraînement, l’acclimatation se fait par rotations, pas en une seule poussée.",
  peakUnchanged: "La date cible {peak} ne bouge que si vous la changez.",
  peakMoved: "Date cible déplacée de {from} à {to}. Les semaines en plus vont à la base facile.",
  keepWritten: "Aujourd’hui reste tel qu’écrit.",
  todayRest: "Repos aujourd’hui. Réévaluer demain.",
  qualityToEasy: "La qualité du jour devient du travail aérobie facile.",
  longToEasy: "La longue est plus courte et reste conversationnelle.",
  reduceMinutes: "Aujourd’hui est plus court que prévu.",
  noMakeup: "La séance a bougé. Pas de travail en plus sur le jour laissé vide.",
  whyChangedToday: "Aujourd’hui a changé : {from} → {to}.",
  sleepLow: "Sommeil {n}/5 cette nuit.",
  sleepOk: "Sommeil {n}/5.",
  fatigueHigh: "Fatigue {n}/5.",
  fatigueOk: "Fatigue {n}/5.",
  sorenessHigh: "Courbatures {n}/5.",
  motivationLow: "Motivation {n}/5.",
  stressHigh: "Stress {n}/5.",
  loadCluster: "Les trois derniers jours avaient déjà {n} séances dures ou longues.",
  yesterdayHard: "Hier était un jour dur ou long.",
  rhrUp: "FC repos {rhr} : +{delta} bpm vs votre base récente ({baseline}).",
  hrvDown: "HRV {hrv} : {pct} % sous votre base récente ({baseline}).",
  normalLoad: "Charge récente ordinaire ({n} dur/long sur trois jours).",
  runToHikeCycle:
    "Vous ne pouvez pas courir : les jours aérobies deviennent de la rando ou du vélo.",
  illnessEase: "Retour facile jusqu’à la semaine {n}. La qualité attend.",
  secondEventEase: "La date extra {date} est une B : cette semaine s’allège.",
  makeupStacked: "Une qualité extra a été empilée. C’est l’option que vous avez choisie.",
};

export const athleteFr: AthleteCopy = {
  onboarding: {
    kicker: "Votre base",
    h1: "À quoi doit ressembler vraiment cette semaine ?",
    lead: "Quelques faits sur comment vous vous entraînez. La semaine est écrite à partir de ça, pas d’un modèle générique.",
    next: "Continuer",
    back: "Retour",
    start: "Écrire mes trois semaines",
    step: "Étape {n} sur {total}",
    needDays: "Choisissez au moins deux jours d’entraînement.",
    limitations: "Quelque chose limite-t-il l’entraînement en ce moment ?",
    limitationsYes: "Oui, quelque chose limite",
    limitationsNo: "Non, rien ne limite",
    limitationsHint:
      "Une gêne, un plafond de temps. Traité comme une contrainte d’entraînement, pas un diagnostic.",
    reviewTitle: "C’est à partir de ça que les semaines sont écrites",
    reviewLead: "La date cible reste, sauf si vous la changez. Un jour fatigué entraîne moins.",
    steps: ["Sport", "Objectif", "Date", "Charge", "Jours", "Terrain", "Vie"],
    sports: { running: "Course", mountaineering: "Alpinisme", mixed: "Les deux" },
    disciplines: {
      trail: "Trail",
      ultra: "Ultra",
      alpine: "Alpin / escalade",
      road: "Route",
      ski: "Ski-mo",
    },
    experience: {
      beginner: "Nouveau sur cette distance ou ce terrain",
      intermediate: "Une ou deux saisons déjà",
      experienced: "Plusieurs sommets ou ultras",
      veteran: "Un cycle qui se répète",
    },
    volume: {
      h0_3: "Moins de 3 h / semaine",
      h3_5: "3–5 h",
      h5_8: "5–8 h",
      h8_12: "8–12 h",
      h12p: "12 h ou plus",
    },
    longest: {
      m60: "< 60 min",
      m90: "60–90 min",
      m150: "90–150 min",
      m240: "2,5–4 h",
      m240p: "> 4 h",
    },
    terrain: {
      flat: "Surtout plat",
      rolling: "Côtes et sentiers",
      mountain: "Montagne accessible",
      highAlpine: "Haut alpin / glacier",
    },
    equipment: {
      trailShoes: "Chaussures trail",
      poles: "Bâtons",
      pack: "Sac pour s’entraîner",
      gym: "Salle ou force à la maison",
      crampons: "Crampons",
      iceAxe: "Piolet",
    },
    constraints: {
      shiftWork: "Travail posté",
      travelHeavy: "Beaucoup de déplacements",
      youngKids: "Jeunes enfants",
      shortSleep: "Sommeil habituellement court",
      deskJob: "Bureau, hanches raides",
    },
    units: { km: "Kilomètres", miles: "Miles" },
    availableTitle: "Jours où vous pouvez vous entraîner",
    windowTitle: "Combien de temps ces jours ont-ils vraiment ?",
    windowHint: "Facultatif. Laissez un jour vide et le budget hebdomadaire est réparti comme avant. L’heure n’est là que si elle vous aide.",
    windowMinutes: "Minutes",
    windowTime: "Début (facultatif)",
    peakLabel: "Jour où vous voulez être prêt",
  },
  today: {
    kicker: "Aujourd’hui",
    title: "Ce que vous faites aujourd’hui",
    wakeTitle: "Comment s’est passé le réveil ?",
    wakeLead:
      "Cinq notes. Fréquence si vous l’avez. L’appel est la règle la plus stricte, pas un score caché.",
    sleep: "Sommeil",
    soreness: "Courbatures",
    motivation: "Motivation",
    fatigue: "Fatigue",
    stress: "Stress",
    scaleLow: {
      sleep: "Mauvais",
      soreness: "Aucune",
      motivation: "Aucune",
      fatigue: "Frais",
      stress: "Calme",
    },
    scaleHigh: {
      sleep: "Excellent",
      soreness: "Sévère",
      motivation: "Envie",
      fatigue: "Cassé",
      stress: "Haut",
    },
    optionalTitle: "Si vous les suivez",
    rhr: "FC repos",
    hrv: "HRV (ms)",
    lastEffort: "Effort d’hier",
    sessionToday: "Séance du jour",
    minutes: "{n} min",
    was: "était {session}",
    markDone: "Fait",
    markMissed: "Manqué",
    didTomorrow: "J’ai fait la séance de demain aujourd’hui",
    travellingUntil: "En voyage jusqu’au",
    clearTravel: "Pas en voyage",
    accessTitle: "Accès cette semaine",
    access: { trail: "Trail", mountain: "Montagne", gym: "Salle", climbing: "Matériel d’escalade" },
    whyChanged: "Pourquoi ça a changé",
    whyWeek: "Pourquoi la semaine ressemble à ça",
    peakLocked: "Date cible {peak} — elle ne bouge que si vous la changez.",
    noSession: "Pas de séance écrite aujourd’hui.",
    doneFlash: "Noté. Rien n’est ajouté en plus.",
    missedFlash: "Manqué. Les séances dures plus tard dans la semaine ne s’empilent pas.",
    editProfile: "Modifier la base",
    thisWeek: "Cette semaine",
    safety:
      "Ceci est un appel de charge d’entraînement, pas un diagnostic. Douleur, maladie, blessure : arrêtez et parlez à un clinicien ou un entraîneur qualifié.",
    overrideLabel: "Je comprends la recommandation et je garde la séance écrite.",
    overrideKeep: "Garder la séance écrite",
    calls: {
      ready: { title: "Prêt pour la séance écrite", action: "Faites ce qui est au plan." },
      reduce: { title: "S’entraîner, mais réduire", action: "Bouger. Couper la partie dure." },
      easy: {
        title: "Facile ou récupération",
        action: "Conversationnel seulement. Pas de qualité.",
      },
      rest: { title: "Repos, réévaluer demain", action: "Pas de séance aujourd’hui." },
    },
    reasons: reasonsFr,
  },
  profile: {
    title: "Comment vous vous entraînez",
    lead: "Changez un fait, la semaine suivante est réécrite. La date cible reste, sauf si vous la changez.",
    save: "Enregistrer et réécrire la semaine",
    saved: "Enregistré",
    reopen: "Modifier",
  },
};

const reasonsDe: Record<string, string> = {
  availableDays: "Du hast {n} Trainingstage. Der Rest ist Ruhe.",
  dayWindowCap: "{n} Einheit(en) wurden gekürzt, damit sie in die angegebene Zeit passen.",
  beginnerNoQuality: "Basiswochen bleiben locker. Qualität kommt erst im Spezifischen.",
  noQualityBase: "Noch aerobe Basis. Keine Qualität diese Woche.",
  gymInsteadOfClimb: "Kein Eis-/Felsmaterial: Klettern wird Kraft im Gym.",
  noClimbGear: "Kein Klettermaterial: die Einheit wird eine Wanderung.",
  noGym: "Kein Gym: Kraft wird eine lockere Einheit.",
  hikeInsteadOfMountain: "Kein Bergzugang — Wanderung oder lockerer Lauf.",
  noPack: "Kein Pack: Pack-Tag wird Wanderung.",
  flatTerrain: "Flaches Gelände: die Wanderung ist ein lockerer Lauf.",
  shiftNoEarlyQuality: "Schichtarbeit: Qualität nicht Mo/Di.",
  shortSleepSpacing: "Kurzschlaf als Konstante: keine zwei Arbeitstage hintereinander.",
  kidsCapLong: "Familie: Langer auf {n} min gedeckelt.",
  limitationsConservative:
    "Du hast eine Einschränkung notiert. Lang und Qualität bleiben vorsichtig. Kein Reha-Plan.",
  longFromBand: "Der Lange ist {n} min, passend zu deiner aktuellen längsten Einheit.",
  volumeSplit: "Lockere Tage teilen eine {n}-Minuten-Woche.",
  missedNoStack: "Harte Einheit verpasst. Nichts wird gestapelt. Kein Nachhol-Qualität.",
  travelSwap: "Reise bis {until}. Berg und Klettern werden locker vor Ort.",
  engineConversational: "Aerobic Engine: jeder Lauf bleibt gesprächig.",
  altitudeAcclimatization:
    "Über 3500 m: schlafe niedriger als dein Tageshöhepunkt diese Woche — das Klettern ist das Training, die Höhenanpassung passiert über Rotationen, nicht in einem Zug.",
  peakUnchanged: "Zieldatum {peak} bewegt sich nur, wenn du es änderst.",
  peakMoved: "Zieldatum von {from} nach {to}. Extra Wochen gehen in lockere Basis.",
  keepWritten: "Heute bleibt wie geschrieben.",
  todayRest: "Heute Ruhe. Morgen neu bewerten.",
  qualityToEasy: "Heutige Qualität ist jetzt lockere aerobe Arbeit.",
  longToEasy: "Der Lange ist kürzer und bleibt gesprächig.",
  reduceMinutes: "Heute kürzer als geschrieben.",
  noMakeup: "Einheit verschoben. Keine Extra-Arbeit am freien Tag.",
  whyChangedToday: "Heute geändert: {from} → {to}.",
  sleepLow: "Schlaf war {n}/5.",
  sleepOk: "Schlaf {n}/5.",
  fatigueHigh: "Müdigkeit {n}/5.",
  fatigueOk: "Müdigkeit {n}/5.",
  sorenessHigh: "Muskelkater {n}/5.",
  motivationLow: "Motivation {n}/5.",
  stressHigh: "Stress {n}/5.",
  loadCluster: "Die letzten drei Tage hatten schon {n} harte oder lange Einheiten.",
  yesterdayHard: "Gestern war hart oder lang.",
  rhrUp: "Ruhe-HF {rhr} ist {delta} bpm über deiner Baseline ({baseline}).",
  hrvDown: "HRV {hrv} ist {pct} % unter deiner Baseline ({baseline}).",
  normalLoad: "Letzte Last gewöhnlich ({n} hart/lang in drei Tagen).",
  runToHikeCycle: "Du kannst nicht laufen: aerobe Tage werden Wanderung oder Rad.",
  illnessEase: "Lockere Rückkehr bis Woche {n}. Qualität wartet.",
  secondEventEase: "Das Extra-Datum {date} ist ein B-Rennen: diese Woche wird leichter.",
  makeupStacked: "Eine extra Qualität wurde gestapelt. Das war deine Wahl.",
};

export const athleteDe: AthleteCopy = {
  onboarding: {
    kicker: "Dein Setup",
    h1: "Wie soll diese Woche wirklich aussehen?",
    lead: "Ein paar Fakten, wie du trainierst. Die Woche wird daraus geschrieben, nicht aus einer generischen Vorlage.",
    next: "Weiter",
    back: "Zurück",
    start: "Meine drei Wochen schreiben",
    step: "Schritt {n} von {total}",
    needDays: "Wähle mindestens zwei Trainingstage.",
    limitations: "Begrenzt gerade etwas dein Training?",
    limitationsYes: "Ja, etwas begrenzt es",
    limitationsNo: "Nein, nichts begrenzt es",
    limitationsHint: "Ein Zwicken, eine Zeitgrenze. Als Trainingsconstraint, keine Diagnose.",
    reviewTitle: "Daraus werden die Wochen geschrieben",
    reviewLead: "Zieldatum bleibt, außer du änderst es. Müde Tage trainieren weniger.",
    steps: ["Sport", "Ziel", "Datum", "Last", "Tage", "Gelände", "Leben"],
    sports: { running: "Laufen", mountaineering: "Bergsteigen", mixed: "Beides" },
    disciplines: {
      trail: "Trail",
      ultra: "Ultra",
      alpine: "Alpin / Klettern",
      road: "Straße",
      ski: "Ski-Mo",
    },
    experience: {
      beginner: "Neu auf dieser Distanz oder diesem Gelände",
      intermediate: "Ein, zwei Saisons drin",
      experienced: "Mehrere Gipfel oder Ultras",
      veteran: "Ein wiederholter Zyklus",
    },
    volume: {
      h0_3: "Unter 3 h / Woche",
      h3_5: "3–5 h",
      h5_8: "5–8 h",
      h8_12: "8–12 h",
      h12p: "12 h oder mehr",
    },
    longest: {
      m60: "< 60 min",
      m90: "60–90 min",
      m150: "90–150 min",
      m240: "2,5–4 h",
      m240p: "> 4 h",
    },
    terrain: {
      flat: "Meist flach",
      rolling: "Hügel und Trails",
      mountain: "Berge erreichbar",
      highAlpine: "Hochalpin / Gletscher",
    },
    equipment: {
      trailShoes: "Trailschuhe",
      poles: "Stöcke",
      pack: "Pack zum Trainieren",
      gym: "Gym oder Kraft zu Hause",
      crampons: "Steigeisen",
      iceAxe: "Eispickel",
    },
    constraints: {
      shiftWork: "Schichtarbeit",
      travelHeavy: "Viel Reise",
      youngKids: "Kleine Kinder",
      shortSleep: "Gewohnt kurz schlafen",
      deskJob: "Schreibtisch, steife Hüften",
    },
    units: { km: "Kilometer", miles: "Meilen" },
    availableTitle: "Tage, an denen du trainieren kannst",
    windowTitle: "Wie viel Zeit haben diese Tage wirklich?",
    windowHint: "Optional. Lass einen Tag leer, dann wird das Wochenbudget wie bisher verteilt. Die Uhrzeit ist nur für dich da.",
    windowMinutes: "Minuten",
    windowTime: "Beginn (optional)",
    peakLabel: "Tag, an dem du bereit sein willst",
  },
  today: {
    kicker: "Heute",
    title: "Was du heute läufst",
    wakeTitle: "Wie war das Aufwachen?",
    wakeLead:
      "Fünf Marken. Herzwerte optional. Der Call ist die strengste Regel — kein versteckter Score.",
    sleep: "Schlaf",
    soreness: "Muskelkater",
    motivation: "Motivation",
    fatigue: "Müdigkeit",
    stress: "Stress",
    scaleLow: {
      sleep: "Schlecht",
      soreness: "Keiner",
      motivation: "Keine",
      fatigue: "Frisch",
      stress: "Ruhig",
    },
    scaleHigh: {
      sleep: "Ausgezeichnet",
      soreness: "Stark",
      motivation: "Lust",
      fatigue: "Kaputt",
      stress: "Hoch",
    },
    optionalTitle: "Falls du sie trackst",
    rhr: "Ruhe-HF",
    hrv: "HRV (ms)",
    lastEffort: "Gestrige Anstrengung",
    sessionToday: "Heutige Einheit",
    minutes: "{n} min",
    was: "war {session}",
    markDone: "Erledigt",
    markMissed: "Verpasst",
    didTomorrow: "Ich habe die morgige Einheit heute gemacht",
    travellingUntil: "Unterwegs bis",
    clearTravel: "Nicht unterwegs",
    accessTitle: "Zugang diese Woche",
    access: { trail: "Trail", mountain: "Berg", gym: "Gym", climbing: "Klettermaterial" },
    whyChanged: "Warum das geändert hat",
    whyWeek: "Warum die Woche so aussieht",
    peakLocked: "Zieldatum {peak} — bewegt sich nur, wenn du es änderst.",
    noSession: "Heute keine geschriebene Einheit.",
    doneFlash: "Notiert. Nichts Extra wird addiert.",
    missedFlash: "Verpasst. Spätere harte Einheiten werden nicht gestapelt.",
    editProfile: "Setup ändern",
    thisWeek: "Diese Woche",
    safety:
      "Das ist ein Trainingslast-Call, keine Diagnose. Schmerz, Krankheit, Verletzung: stoppen und mit Klinik oder qualifiziertem Coach sprechen.",
    overrideLabel: "Ich verstehe die Empfehlung und behalte die geschriebene Einheit.",
    overrideKeep: "Geschriebene Einheit behalten",
    calls: {
      ready: { title: "Bereit für die geschriebene Einheit", action: "Mach, was im Plan steht." },
      reduce: { title: "Trainieren, aber Last senken", action: "Bewegen. Den harten Teil kürzen." },
      easy: { title: "Locker oder Regeneration", action: "Nur gesprächig. Keine Qualität." },
      rest: { title: "Ruhe, morgen neu bewerten", action: "Keine Einheit heute." },
    },
    reasons: reasonsDe,
  },
  profile: {
    title: "Wie du trainierst",
    lead: "Ändere eine Tatsache, die nächste Woche wird neu geschrieben. Zieldatum bleibt, außer du änderst es.",
    save: "Speichern und Woche neu schreiben",
    saved: "Gespeichert",
    reopen: "Setup ändern",
  },
};
