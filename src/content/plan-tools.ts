import type { ObjectiveId, PhaseId, QualityBand, SessionKey } from "@/lib/rolling-plan";

export type PlanToolsCopy = {
  kicker: string;
  lead: string;
  method: [string, string, string];
  pickTitle: string;
  peakTitle: string;
  peakLead: string;
  peakLabel: string;
  peakHint: string;
  windowLabel: string;
  recommendedLabel: string;
  phaseSplit: string;
  longerBetter: string;
  seasonsKey: string;
  quality: Record<QualityBand, { label: string; body: string }>;
  start: string;
  startDisabled: string;
  reset: string;
  status: string;
  peakStatus: string;
  weekLabel: string;
  current: string;
  ahead: string;
  extraBase: string;
  nowMark: string;
  weeksLeft: string;
  seasonLabel: string;
  historyTitle: string;
  historyEmpty: string;
  checkinTitle: string;
  checkinLead: string;
  good: string;
  ok: string;
  problem: string;
  wrecked: string;
  note: string;
  submit: string;
  afterGood: string;
  afterOk: string;
  afterProblem: string;
  afterWrecked: string;
  changed: string;
  doneTitle: string;
  doneBody: string;
  nextSeason: string;
  nextSeasonBody: string;
  nextSeasonPeak: string;
  easedNote: string;
  disclaimer: string;
  phases: Record<Exclude<PhaseId, "done">, string>;
  donePhase: string;
  objectives: Record<ObjectiveId, { name: string; length: string; blurb: string }>;
  sessions: Record<SessionKey, string>;
};

export const planEn: PlanToolsCopy = {
  kicker: "Rolling program",
  lead: "Tell us when the race or the outing has to be ready. Weeks fill backward from that day. Extra weeks go to easy running. A short window still gets a week, just a thinner one.",
  method: [
    "Date first. Then easy base, a specific block, and an easy-down into the day.",
    "Spare weeks stay easy. They are not extra intervals. Six weeks still writes a plan; it is just thinner than six months.",
    "A tired week trains less. The outing does not move. The next season starts higher than this one.",
  ],
  pickTitle: "1. What are you training for?",
  peakTitle: "2. When does it need to be ready?",
  peakLead: "The suggestion is a full build. Move the date. The weeks follow.",
  peakLabel: "Ready date",
  peakHint: "This date is a suggestion from the full window. Change it if the race or the trip sits on another week.",
  windowLabel: "{weeks} weeks left",
  recommendedLabel: "Full build: {n} weeks",
  phaseSplit: "{base} wk base · {specific} wk specific · {taper} wk easy-down",
  longerBetter: "If you have time, easy running can accumulate. That is why six months beats a six-week scramble.",
  seasonsKey:
    "One race does not make fitness. The next season starts higher than this one, if this one was actually run.",
  quality: {
    generous: {
      label: "More time than the suggestion. Use it.",
      body: "Extra weeks stay in easy base. The specific block and the easy-down stay full.",
    },
    full: {
      label: "The suggested window",
      body: "Enough base, a full specific block, and a proper easy-down into the day you chose.",
    },
    solid: {
      label: "Shorter than the suggestion. Still a plan.",
      body: "Base is cut first. Specific work and the easy-down are kept. More time would still help.",
    },
    tight: {
      label: "Compressed window",
      body: "A plan is still written, but there is less time to build. More weeks would clearly help.",
    },
    short: {
      label: "Very short. A holding pattern.",
      body: "This is not a full build. We still write weeks into the day. The real gain is the next season with more time.",
    },
  },
  start: "Start this plan",
  startDisabled: "Pick a ready date on or after today.",
  reset: "Reset plan",
  status: "Week {calendar} of {total} · {phase} · {remaining} weeks left",
  peakStatus: "Ready {peak}",
  weekLabel: "Week {n}",
  current: "This week",
  ahead: "Written ahead",
  extraBase: "{n} week(s) trained easier. Ready date unchanged.",
  nowMark: "You are here",
  weeksLeft: "{n} weeks left",
  seasonLabel: "Season {n}",
  historyTitle: "Logged weeks",
  historyEmpty: "No weeks logged yet. The first three are already written.",
  checkinTitle: "How does the body feel this week?",
  checkinLead: "Tap a mark. This week's sessions change now. Tired means less work. Wrecked means rest instead of quality. The ready date stays.",
  good: "Fresh. Keep the written week.",
  ok: "Fine. Keep the load, no extra.",
  problem: "Tired. Train less this week.",
  wrecked: "Wrecked. Rest instead of quality.",
  note: "Sleep, fatigue, niggle (optional)",
  submit: "Log week and roll forward",
  afterGood: "Next weeks are written. The plan still lands on the date you chose.",
  afterOk: "Load kept. Ready date unchanged.",
  afterProblem: "This week trained less. Next week starts from the written plan. Ready date stays.",
  afterWrecked: "Quality became rest. Next week is written again. Ready date stays.",
  changed: "Changed this week",
  doneTitle: "The target week is in the book",
  doneBody:
    "One season is done. Pick a new ready date. The next one starts from a higher floor if this one was actually run.",
  nextSeason: "Start next season",
  nextSeasonBody: "Same outing type. New ready date. You start higher than season one.",
  nextSeasonPeak: "Next ready date",
  easedNote: "Eased because you are tired: easy volume, no quality dose. Ready date unchanged.",
  disclaimer: "Not medical advice. You stay responsible for training and mountain decisions.",
  phases: { base: "Aerobic base", specific: "Specific block", taper: "Easy-down" },
  donePhase: "Target week",
  objectives: {
    engine: {
      name: "Aerobic engine",
      length: "Recommended 16 weeks / 4 months",
      blurb:
        "No race required. Teach the body to do more work at conversation pace. Fat as the default fuel, low heart rate as the point. Ready is the week you want the engine settled.",
    },
    trail20: {
      name: "20 km trail",
      length: "Recommended 10 weeks",
      blurb: "Already running. Easy volume, one quality dose, a long that grows toward 90–110 min. Peak on race week.",
    },
    fifty: {
      name: "50 km ultra",
      length: "Recommended 24 weeks / 6 months",
      blurb: "Long aerobic base, then long-run progression with one quality session, easy-down into race week.",
    },
    ultra100: {
      name: "80–120 km ultra",
      length: "Recommended 36 weeks / 9 months",
      blurb: "Aerobic months first. The specific block is time on feet and one quality dose. Back-to-back days late. Then three to four weeks easy-down.",
    },
    alpine: {
      name: "Alpine day",
      length: "Recommended 10 weeks",
      blurb:
        "Aerobic approaches plus actual climbing: rock or ice technique, pulling strength, then a mountain day. Pitches are not conversation pace.",
    },
    traverse: {
      name: "Multi-day alpine route",
      length: "Recommended 32 weeks / 8 months",
      blurb:
        "Hiking base, then climbing and pack back-to-backs so day two still has a reserve. You climb in the specific block. You do not only walk.",
    },
    expedition: {
      name: "High-altitude expedition",
      length: "Recommended 40 weeks / 10 months",
      blurb:
        "Months of easy volume, then pack, hike, and enough climbing that the mountain is not the first time you pull. The easy-down is sleep and kit.",
    },
  },
  sessions: {
    easy: "Easy aerobic, conversational (Zone 1–2)",
    steady: "Steady: short sentences only (high Zone 2 / low 3)",
    long: "Long easy: time on feet, still conversational",
    quality: "One quality dose, few words (Zone 3–4). Keep it the only hard run.",
    vert: "Uphill at conversation pace. If you cannot talk, slow down.",
    mountain: "Mountain day: hiking conversational; climbing is its own effort",
    sharpness: "Short sharpness, not a new long",
    recovery: "Recovery easy: shorter than usual, full sentences",
    rest: "Rest",
    hike: "Hiking day: time on feet, light pack, talk if you can",
    pack: "Pack carry, heavier; the walk stays mostly conversational",
    engine: "Low-HR aerobic. Stay conversational. More work at this pace is the point.",
    climb: "Climbing: rock, ice, or gym. Technique and pulling, not a jog.",
    strength: "Alpine strength: lock-offs, pull-ups, core, antagonists. Short and hard.",
  },
};

export const planFi: PlanToolsCopy = {
  kicker: "Tämän kauden ohjelma",
  lead: "Kerro milloin kisan tai retken pitää olla valmis. Viikot täytetään siitä taaksepäin. Jos viikkoja on paljon, ne menevät kevyeen juoksuun. Jos vähemmän, pohjaa lyhennetään.",
  method: [
    "Tavoitepäivä ensin. Sitten peruskunto, kisajakso, kevennys.",
    "Ylimääräiset viikot ovat kevyttä juoksua, ei lisätehoja. Kuuden viikon ikkuna saa silti viikon, mutta ohuemman.",
    "Väsynyt viikko kevenee. Kisapäivää ei siirretä. Seuraava kausi lähtee ylempää kuin tämä.",
  ],
  pickTitle: "1. Mikä on tavoite?",
  peakTitle: "2. Milloin sen pitää olla valmis?",
  peakLead: "Ehdotus on täysi valmistautuminen. Voit siirtää päivää. Viikot muuttuvat.",
  peakLabel: "Tavoitepäivä",
  peakHint: "Päivämäärä on ehdotus. Vaihda se, jos kisa tai reissu on toisella viikolla.",
  windowLabel: "{weeks} viikkoa jäljellä",
  recommendedLabel: "Täysi valmistautuminen: {n} viikkoa",
  phaseSplit: "{base} vk peruskunto · {specific} vk kisajakso · {taper} vk kevennys",
  longerBetter: "Jos aikaa on, kevyt juoksu ehtii kertyä. Siksi puoli vuotta voittaa kuuden viikon rypistyksen.",
  seasonsKey:
    "Yksi kisa ei tee kuntoa. Seuraava kausi lähtee ylempää kuin tämä, jos tämä kausi juostiin.",
  quality: {
    generous: {
      label: "Enemmän aikaa kuin ehdotus. Käytä se.",
      body: "Ylimääräiset viikot jäävät kevyeen juoksuun. Kisajakso ja kevennys pysyvät täysinä.",
    },
    full: {
      label: "Ehdotettu ikkuna",
      body: "Tarpeeksi pohjaa, täysi kisajakso ja kunnollinen kevennys valitsemaasi päivään.",
    },
    solid: {
      label: "Lyhyempi kuin ehdotus. Silti suunnitelma.",
      body: "Pohjaa leikataan ensin. Kisajakso ja kevennys pidetään. Lisäaika auttaisi silti.",
    },
    tight: {
      label: "Puristettu ikkuna",
      body: "Suunnitelma kirjoitetaan silti, mutta rakentamiseen on vähemmän aikaa. Lisäviikot auttaisivat selvästi.",
    },
    short: {
      label: "Hyvin lyhyt. Pito viikkoina.",
      body: "Tämä ei ole täysi valmistautuminen. Viikot kirjoitetaan silti päivään. Oikea hyöty on seuraava kausi, jossa on enemmän aikaa.",
    },
  },
  start: "Aloita tämä suunnitelma",
  startDisabled: "Valitse tavoitepäivä tältä päivältä tai myöhemmin.",
  reset: "Nollaa ohjelma",
  status: "Viikko {calendar} / {total} · {phase} · {remaining} viikkoa jäljellä",
  peakStatus: "Valmis {peak}",
  weekLabel: "Viikko {n}",
  current: "Tämä viikko",
  ahead: "Kirjoitettu eteen",
  extraBase: "{n} viikko(a) treenattu kevyemmin. Tavoitepäivä ennallaan.",
  nowMark: "Olet tässä",
  weeksLeft: "{n} viikkoa jäljellä",
  seasonLabel: "Kausi {n}",
  historyTitle: "Kirjatut viikot",
  historyEmpty: "Ei kirjattuja viikkoja vielä. Ensimmäiset kolme on jo kirjoitettu.",
  checkinTitle: "Miltä kroppa tuntuu tällä viikolla?",
  checkinLead: "Napauta merkki. Tämän viikon treenit muuttuvat heti. Väsynyt: vähemmän työtä. Hajalla: tehoista lepoa. Tavoitepäivä pysyy.",
  good: "Virkeä. Pidä kirjoitettu viikko.",
  ok: "Ihan ok. Pidä kuorma, ei lisää.",
  problem: "Väsynyt. Treenaa vähemmän tällä viikolla.",
  wrecked: "Hajalla. Tehot vaihtuvat lepoon.",
  note: "Uni, väsymys, kolotus (ei pakollinen)",
  submit: "Kirjaa viikko ja rullaa eteen",
  afterGood: "Seuraavat viikot on kirjoitettu. Tavoitepäivä pysyy.",
  afterOk: "Kuorma pidetty. Tavoitepäivä ennallaan.",
  afterProblem: "Tämä viikko treenasi vähemmän. Seuraava viikko alkaa kirjoitetusta suunnitelmasta. Tavoitepäivä pysyy.",
  afterWrecked: "Tehot muuttuivat lepoksi. Seuraava viikko kirjoitetaan uudestaan. Tavoitepäivä pysyy.",
  changed: "Muuttui tällä viikolla",
  doneTitle: "Tavoiteviikko on kirjassa",
  doneBody:
    "Yksi kausi on ohi. Valitse uusi tavoitepäivä. Seuraava lähtee ylempää jos tämä kausi juostiin.",
  nextSeason: "Aloita seuraava kausi",
  nextSeasonBody: "Sama retkityyppi. Uusi tavoitepäivä. Lähdet ylempää kuin kaudella yksi.",
  nextSeasonPeak: "Seuraava tavoitepäivä",
  easedNote: "Kevennetty koska olet väsynyt: kevyttä juoksua, ei tehoa. Tavoitepäivä ennallaan.",
  disclaimer: "Ei lääketieteellistä neuvontaa. Vastuu treeni- ja vuoripäätöksistä säilyy sinulla.",
  phases: { base: "Peruskunto", specific: "Kisajakso", taper: "Kevennys" },
  donePhase: "Tavoiteviikko",
  objectives: {
    engine: {
      name: "Aerobinen moottori",
      length: "Suositus 16 viikkoa / 4 kk",
      blurb:
        "Kisaa ei tarvita. Opettaa kropan tekemään enemmän työtä puhevauhdissa. Rasva oletuspolttoaineena, matala syke on tavoite. Valmis on se viikko jolloin moottorin haluat olevan paikallaan.",
    },
    trail20: {
      name: "20 km polku",
      length: "Suositus 10 viikkoa",
      blurb: "Olettaa että juokset jo. Kevyt juoksu, yksi teho, pitkä kasvaa 90–110 minuuttiin. Huippu kisaviikolla.",
    },
    fifty: {
      name: "50 km ultra",
      length: "Suositus 24 vk / 6 kk",
      blurb: "Pitkä peruskunto, sitten pitkän lenkin progressio ja yksi teho, kevennys kisaviikolle.",
    },
    ultra100: {
      name: "80–120 km ultra",
      length: "Suositus 36 vk / 9 kk",
      blurb: "Ensin kevyet kuukaudet. Kisajakso on aika jaloilla ja yksi teho. Peräkkäiset päivät myöhään. Sitten 3–4 viikon kevennys.",
    },
    alpine: {
      name: "Alppipäivä",
      length: "Suositus 10 viikkoa",
      blurb:
        "Aerobiset nousut plus oikea kiipeily: kallio tai jää, vetovoima, sitten vuoripäivä. Köysivälit eivät ole puhevauhtia.",
    },
    traverse: {
      name: "Usean päivän alppireitti",
      length: "Suositus 32 vk / 8 kk",
      blurb:
        "Vaelluspohja, sitten kiipeily ja rinkka peräkkäisinä päivinä jotta päivällä kaksi on varaa. Kisajaksossa kiivetään, ei vain kävellä.",
    },
    expedition: {
      name: "Korkean paikan retkikunta",
      length: "Suositus 40 vk / 10 kk",
      blurb:
        "Kuukausia kevyttä juoksua, sitten rinkka, vaellus ja sen verran kiipeilyä ettei vuori ole ensimmäinen kerta kun vedät. Kevennys on uni ja pakkaaminen.",
    },
  },
  sessions: {
    easy: "Helppo aerobinen, puhevauhti (vyöhyke 1–2)",
    steady: "Tasainen: vain lyhyitä lauseita (korkea Z2 / matala Z3)",
    long: "Pitkä helppo: aika jaloilla, yhä puhevauhti",
    quality: "Yksi teho, muutama sana (Z3–4). Pidä se viikon ainoana kovana.",
    vert: "Nousua puhevauhdissa. Jos et puhu, hidasta.",
    mountain: "Vuoripäivä: nousu puheella, kiipeily on oma ponnistus",
    sharpness: "Lyhyt terävyys, ei uusi pitkä",
    recovery: "Palauttava helppo: tavallista lyhyempi, kokonaisia lauseita",
    rest: "Lepo",
    hike: "Vaelluspäivä: aika jaloilla, kevyt rinkka, puhu jos voit",
    pack: "Rinkkapäivä, raskaampi; kävely pysyy enimmäkseen puheella",
    engine: "Matalan sykkeen aerobinen. Pidä puhevauhti. Enemmän työtä tällä vauhdilla on koko juttu.",
    climb: "Kiipeily: kallio, jää tai sali. Tekniikka ja veto, ei hölkkä.",
    strength: "Alppivoima: lukot, leuat, keskivartalo, antagonistit. Lyhyt ja kova.",
  },
};

export const planFr: PlanToolsCopy = {
  kicker: "Programme glissant",
  lead: "Vous choisissez le jour où vous voulez être au pic. L’entraînement s’adapte à cette fenêtre. Toute date convient — une préparation plus longue est toujours meilleure. Le grand résultat se construit saison après saison.",
  method: [
    "Choisissez d’abord la date de pic. Les semaines s’écrivent à rebours : base, puis spécifique, puis affûtage.",
    "Plus long est toujours mieux. Les semaines extra restent en base aérobie. Une fenêtre courte a quand même un plan — c’est juste une construction plus mince.",
    "Fatigué : cette semaine s’entraîne moins. La date de pic reste. Après la sortie, la saison suivante part d’un plancher plus haut.",
  ],
  pickTitle: "1. Choisissez la sortie",
  peakTitle: "2. Choisissez quand vous voulez être au pic",
  peakLead: "Toute date convient. La suggestion est la construction complète recommandée. Déplacez-la — les semaines se réécrivent.",
  peakLabel: "Date de pic",
  peakHint: "Suggestion de la fenêtre recommandée. Changez-la. Le plan suit.",
  windowLabel: "{weeks} semaines jusqu’au pic",
  recommendedLabel: "Construction complète recommandée : {n} semaines",
  phaseSplit: "{base} sem. base · {specific} sem. spécifique · {taper} sem. affûtage",
  longerBetter: "Une préparation plus longue est toujours meilleure. Les semaines extra restent en base aérobie.",
  seasonsKey:
    "La clé d’un grand résultat n’est pas un bloc héroïque. C’est le développement continu, saison après saison — chaque pic part d’un plancher plus haut.",
  quality: {
    generous: {
      label: "Plus long que recommandé — la meilleure voie",
      body: "Les semaines extra restent en base aérobie. Construction plus solide. Spécifique et affûtage restent complets.",
    },
    full: {
      label: "Fenêtre recommandée",
      body: "Assez de base, un bloc spécifique complet, un affûtage propre jusqu’au jour choisi.",
    },
    solid: {
      label: "Plus court que recommandé — encore complet",
      body: "La base est coupée d’abord. Spécifique et affûtage sont gardés. Plus long serait encore mieux.",
    },
    tight: {
      label: "Fenêtre compressée",
      body: "Un pic est encore écrit, mais il y a moins de temps pour construire. Plus long serait clairement mieux.",
    },
    short: {
      label: "Très court — un maintien",
      body: "Ce n’est pas une construction complète. Les semaines sont quand même écrites. Le vrai gain est la saison suivante, avec plus de temps.",
    },
  },
  start: "Démarrer ce plan",
  startDisabled: "Choisissez une date de pic aujourd’hui ou plus tard.",
  reset: "Réinitialiser",
  status: "Semaine {calendar} sur {total} · {phase} · {remaining} semaines jusqu’au pic",
  peakStatus: "Pic {peak}",
  weekLabel: "Semaine {n}",
  current: "Cette semaine",
  ahead: "Écrit d’avance",
  extraBase: "{n} semaine(s) plus facile(s) — date de pic inchangée",
  nowMark: "Vous êtes ici",
  weeksLeft: "{n} semaines restantes",
  seasonLabel: "Saison {n}",
  historyTitle: "Semaines notées",
  historyEmpty: "Aucune semaine notée — les trois premières sont déjà écrites.",
  checkinTitle: "Comment le corps se sent-il cette semaine ?",
  checkinLead: "Touchez une marque — les séances de cette semaine changent tout de suite. Fatigué = moins de travail. Cassé = repos à la place de la qualité. La date de pic reste.",
  good: "Frais — garder la semaine écrite",
  ok: "Correct — garder la charge, pas d’extra",
  problem: "Fatigué — s’entraîner moins cette semaine",
  wrecked: "Cassé — repos à la place de la qualité",
  note: "Sommeil, fatigue, niggle (optionnel)",
  submit: "Noter la semaine et avancer",
  afterGood: "Les semaines suivantes sont écrites. La date de pic reste.",
  afterOk: "Charge gardée. Date de pic inchangée.",
  afterProblem: "Cette semaine a moins travaillé. La suivante repart du plan écrit. La date de pic reste.",
  afterWrecked: "La qualité est devenue repos. La semaine suivante est réécrite. La date de pic reste.",
  changed: "Changé cette semaine",
  doneTitle: "La semaine de pic est dans le livre",
  doneBody:
    "Une saison est faite. Le grand résultat est la suivante, et celle d’après. Choisissez une nouvelle date de pic — le développement continu est la méthode.",
  nextSeason: "Démarrer la saison suivante",
  nextSeasonBody: "Même type de sortie. Nouvelle date de pic. Vous partez d’un plancher plus haut.",
  nextSeasonPeak: "Prochaine date de pic",
  easedNote: "Allégé parce que vous êtes fatigué — volume facile, pas de dose de qualité. Date de pic inchangée.",
  disclaimer: "Pas un avis médical. Vous restez responsable des décisions d’entraînement et de montagne.",
  phases: { base: "Base aérobie", specific: "Bloc spécifique", taper: "Affûtage" },
  donePhase: "Semaine de pic",
  objectives: {
    engine: {
      name: "Moteur aérobie",
      length: "Recommandé 16 semaines / 4 mois",
      blurb:
        "Pas de course obligatoire. Apprendre au corps à faire plus de travail à allure conversationnelle — le gras comme carburant par défaut, la basse fréquence cardiaque comme but. Le pic est la semaine où le moteur doit être en place.",
    },
    trail20: {
      name: "Trail 20 km",
      length: "Recommandé 10 semaines",
      blurb: "Vous courez déjà. Volume facile, une dose de qualité, une longue vers 90–110 min. Pic la semaine de course.",
    },
    fifty: {
      name: "Ultra 50 km",
      length: "Recommandé 24 sem. / 6 mois",
      blurb: "Longue base aérobie, puis progression de la longue avec une séance de qualité, affûtage la semaine de course.",
    },
    ultra100: {
      name: "Ultra 80–120 km",
      length: "Recommandé 36 sem. / 9 mois",
      blurb: "Des mois aérobies d’abord. Le spécifique est du temps sur les pieds et une dose de qualité. Back-to-backs tard. Affûtage de quatre semaines.",
    },
    alpine: {
      name: "Journée alpine",
      length: "Recommandé 10 semaines",
      blurb:
        "Approches aérobies plus de l’escalade vraie : rocher ou glace, force de traction, puis une journée montagne. Les longueurs ne sont pas conversationnelles.",
    },
    traverse: {
      name: "Itinéraire alpin de plusieurs jours",
      length: "Recommandé 32 sem. / 8 mois",
      blurb:
        "Base rando, puis escalade et portage en back-to-backs pour que le jour 2 ait une réserve. On grimpe dans le spécifique — on ne fait pas que marcher.",
    },
    expedition: {
      name: "Expédition en altitude",
      length: "Recommandé 40 sem. / 10 mois",
      blurb:
        "Des mois de volume facile, puis sac, rando, et assez d’escalade pour que la montagne ne soit pas la première traction. Affûtage = sommeil et matériel.",
    },
  },
  sessions: {
    easy: "Aérobie facile — conversationnel (zone 1–2)",
    steady: "Soutenu — phrases courtes seulement (haut Z2 / bas Z3)",
    long: "Longue facile — temps sur les pieds, encore conversationnel",
    quality: "Une dose de qualité — peu de mots (Z3–4). Le seul jour dur.",
    vert: "D+ à l’allure conversation — si vous ne parlez plus, ralentissez",
    mountain: "Journée montagne — rando conversationnelle ; l’escalade est un effort à part",
    sharpness: "Courte vivacité — pas une nouvelle longue",
    recovery: "Récup facile — plus courte, phrases complètes",
    rest: "Repos",
    hike: "Journée rando — temps sur les pieds, sac léger",
    pack: "Portage — plus lourd ; la marche reste surtout conversationnelle",
    engine: "Aérobie à basse FC — rester conversationnel. Plus de travail à cette allure, c’est le but.",
    climb: "Escalade — rocher, glace ou salle. Technique et traction, pas un footing.",
    strength: "Force alpine — lock-offs, tractions, gainage, antagonistes. Court et dur.",
  },
};

export const planDe: PlanToolsCopy = {
  kicker: "Rollender Plan",
  lead: "Du wählst den Tag, an dem du in Peak-Form sein willst. Das Training passt sich dem Fenster an. Jedes Datum geht — längere Vorbereitung ist immer besser. Das große Ergebnis entsteht Saison für Saison.",
  method: [
    "Zuerst das Peak-Datum. Die Wochen werden rückwärts geschrieben: Basis, dann spezifisch, dann Taper.",
    "Länger ist immer besser. Extra-Wochen bleiben in der aeroben Basis. Ein kurzes Fenster bekommt trotzdem einen Plan — nur dünnerer Aufbau.",
    "Müde: diese Woche weniger trainieren. Das Peak-Datum bleibt. Nach der Tour startet die nächste Saison von einem höheren Boden.",
  ],
  pickTitle: "1. Tour wählen",
  peakTitle: "2. Wähle, wann du peak sein willst",
  peakLead: "Jedes Datum geht. Der Vorschlag ist der empfohlene volle Aufbau. Verschiebe ihn — die Wochen schreiben sich neu.",
  peakLabel: "Peak-Datum",
  peakHint: "Vorschlag aus dem empfohlenen Fenster. Ändere es. Der Plan folgt.",
  windowLabel: "{weeks} Wochen bis zum Peak",
  recommendedLabel: "Empfohlener voller Aufbau: {n} Wochen",
  phaseSplit: "{base} Wo. Basis · {specific} Wo. spezifisch · {taper} Wo. Taper",
  longerBetter: "Längere Vorbereitung ist immer besser. Extra-Wochen bleiben in der aeroben Basis.",
  seasonsKey:
    "Der Schlüssel zum großen Erfolg ist nicht ein heroischer Block. Es ist kontinuierliche Entwicklung, Saison für Saison — jeder Peak startet höher als der letzte.",
  quality: {
    generous: {
      label: "Länger als empfohlen — der bessere Weg",
      body: "Extra-Wochen bleiben in der aeroben Basis. Das ist der stärkere Aufbau. Spezifisch und Taper bleiben voll.",
    },
    full: {
      label: "Empfohlenes Fenster",
      body: "Genug Basis, voller spezifischer Block, sauberer Taper in den gewählten Tag.",
    },
    solid: {
      label: "Kürzer als empfohlen — noch vollständig",
      body: "Die Basis wird zuerst gekürzt. Spezifisch und Taper bleiben. Länger wäre trotzdem besser.",
    },
    tight: {
      label: "Komprimiertes Fenster",
      body: "Ein Peak wird trotzdem geschrieben, aber weniger Zeit zum Aufbau. Länger wäre klar besser.",
    },
    short: {
      label: "Sehr kurz — ein Halten",
      body: "Kein voller Aufbau. Wochen werden trotzdem geschrieben. Der echte Gewinn ist die nächste Saison mit mehr Zeit.",
    },
  },
  start: "Diesen Plan starten",
  startDisabled: "Wähle ein Peak-Datum heute oder später.",
  reset: "Plan zurücksetzen",
  status: "Woche {calendar} von {total} · {phase} · {remaining} Wochen bis Peak",
  peakStatus: "Peak {peak}",
  weekLabel: "Woche {n}",
  current: "Diese Woche",
  ahead: "Voraus geschrieben",
  extraBase: "{n} Woche(n) leichter trainiert — Peak-Datum unverändert",
  nowMark: "Du bist hier",
  weeksLeft: "{n} Wochen übrig",
  seasonLabel: "Saison {n}",
  historyTitle: "Eingetragene Wochen",
  historyEmpty: "Noch keine Woche eingetragen — die ersten drei sind schon geschrieben.",
  checkinTitle: "Wie fühlt sich der Körper diese Woche?",
  checkinLead: "Tippe eine Marke — die Einheiten dieser Woche ändern sich sofort. Müde = weniger Arbeit. Kaputt = Pause statt Qualität. Peak-Datum bleibt.",
  good: "Frisch — geschriebene Woche behalten",
  ok: "In Ordnung — Last behalten, nichts extra",
  problem: "Müde — diese Woche weniger trainieren",
  wrecked: "Kaputt — Pause statt Qualität",
  note: "Schlaf, Müdigkeit, Niggle (optional)",
  submit: "Woche eintragen und weiterrollen",
  afterGood: "Nächste Wochen sind geschrieben. Peak-Datum bleibt.",
  afterOk: "Last behalten. Peak-Datum unverändert.",
  afterProblem: "Diese Woche hat weniger trainiert. Nächste startet vom geschriebenen Plan. Peak-Datum bleibt.",
  afterWrecked: "Qualität wurde Pause. Nächste Woche wird neu geschrieben. Peak-Datum bleibt.",
  changed: "Diese Woche geändert",
  doneTitle: "Peak-Woche steht im Buch",
  doneBody:
    "Eine Saison ist durch. Das große Ergebnis ist die nächste, und die danach. Neues Peak-Datum wählen — kontinuierliche Entwicklung ist die Methode.",
  nextSeason: "Nächste Saison starten",
  nextSeasonBody: "Gleicher Tour-Typ. Neues Peak-Datum. Du startest von einem höheren Boden.",
  nextSeasonPeak: "Nächstes Peak-Datum",
  easedNote: "Erleichtert weil du müde bist — lockeres Volumen, keine Qualitätsdosis. Peak-Datum unverändert.",
  disclaimer: "Kein medizinischer Rat. Du bleibst verantwortlich für Trainings- und Bergentscheidungen.",
  phases: { base: "Aerobe Basis", specific: "Spezifischer Block", taper: "Taper" },
  donePhase: "Peak-Woche",
  objectives: {
    engine: {
      name: "Aerober Motor",
      length: "Empfohlen 16 Wochen / 4 Monate",
      blurb:
        "Kein Rennen nötig. Dem Körper beibringen, mehr Arbeit im Gesprächstempo zu leisten — Fett als Standardkraftstoff, niedrige Herzfrequenz als Ziel. Peak ist die Woche, in der der Motor sitzen soll.",
    },
    trail20: {
      name: "20-km-Trail",
      length: "Empfohlen 10 Wochen",
      blurb: "Du läufst schon. Lockeres Volumen, eine Qualitätsdosis, der Lange wächst auf 90–110 min. Peak in der Rennwoche.",
    },
    fifty: {
      name: "50-km-Ultra",
      length: "Empfohlen 24 Wochen / 6 Monate",
      blurb: "Lange aerobe Basis, dann Long-run-Progression mit einer Qualitätseinheit, Taper auf die Rennwoche.",
    },
    ultra100: {
      name: "80–120-km-Ultra",
      length: "Empfohlen 36 Wochen / 9 Monate",
      blurb: "Zuerst aerobe Monate. Spezifisch ist Zeit auf den Füßen und eine Qualitätsdosis. Back-to-backs spät. Vier Wochen Taper.",
    },
    alpine: {
      name: "Alpentag",
      length: "Empfohlen 10 Wochen",
      blurb:
        "Aerobe Zustiege plus echtes Klettern: Fels oder Eis, Zugkraft, dann ein Bergtag. Seillängen sind kein Gesprächstempo.",
    },
    traverse: {
      name: "Mehrtägige Alpenroute",
      length: "Empfohlen 32 Wochen / 8 Monate",
      blurb:
        "Wanderbasis, dann Klettern und Pack-Back-to-backs, damit Tag zwei Reserve hat. Im Specific wird geklettert — nicht nur gegangen.",
    },
    expedition: {
      name: "Höhenexpedition",
      length: "Empfohlen 40 Wochen / 10 Monate",
      blurb:
        "Monate lockeres Volumen, dann Pack, Wanderung und genug Klettern, dass der Berg nicht das erste Ziehen ist. Taper ist Schlaf und Kit.",
    },
  },
  sessions: {
    easy: "Locker aerob — gesprächig (Zone 1–2)",
    steady: "Stetig — nur kurze Sätze (hohe Z2 / niedrige Z3)",
    long: "Langer lockerer — Zeit auf den Füßen, noch gesprächig",
    quality: "Eine Qualitätsdosis — wenige Worte (Z3–4). Einziger harter Lauf.",
    vert: "Bergauf im Gesprächstempo — wenn du nicht redest, langsamer",
    mountain: "Bergtag — Gehen gesprächig; Klettern ist eigene Arbeit",
    sharpness: "Kurze Schärfe — kein neuer Langer",
    recovery: "Erholung locker — kürzer als üblich, volle Sätze",
    rest: "Ruhe",
    hike: "Wandertag — Zeit auf den Füßen, leichter Pack",
    pack: "Packtragen — schwerer; das Gehen bleibt meist gesprächig",
    engine: "Aerob bei niedriger HF — gesprächig bleiben. Mehr Arbeit in diesem Tempo ist der Punkt.",
    climb: "Klettern — Fels, Eis oder Halle. Technik und Zug, kein Joggen.",
    strength: "Alpinkraft — Lock-offs, Klimmzüge, Rumpf, Antagonisten. Kurz und hart.",
  },
};
