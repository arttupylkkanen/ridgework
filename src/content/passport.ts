import type { OutingResult, ShareAudience } from "@/lib/passport";
import type { PeakOutlook, LoadRisk, ScenarioId } from "@/lib/scenario-sim";

export type PassportCopy = {
  tab: string;
  kicker: string;
  title: string;
  lead: string;
  vsYou: string;
  firstSeason: string;
  empty: string;
  addOuting: string;
  outingName: string;
  outingDate: string;
  distance: string;
  elevation: string;
  duration: string;
  result: string;
  confidence: string;
  lesson: string;
  saveOuting: string;
  remove: string;
  results: Record<OutingResult, string>;
  metrics: {
    completion: string;
    consistency: string;
    easy: string;
    quality: string;
    mountain: string;
    longest: string;
    confidence: string;
    elevation: string;
  };
  metricHint: {
    completion: string;
    consistency: string;
    easy: string;
    quality: string;
    mountain: string;
    longest: string;
    confidence: string;
    elevation: string;
  };
  delta: { up: string; down: string; flat: string; new: string };
  pbs: string;
  pbKinds: { duration: string; distance: string; elevation: string; streak: string };
  eventsTitle: string;
  lessonsTitle: string;
  interruptions: string;
  noInterruptions: string;
  privacyTitle: string;
  privacyLead: string;
  publicOn: string;
  publicOff: string;
  displayName: string;
  audience: string;
  audiences: Record<ShareAudience, string>;
  flags: {
    showEvents: string;
    showVolume: string;
    showConsistency: string;
    showPbs: string;
    showLessons: string;
    showConfidence: string;
  };
  shareLink: string;
  copyLink: string;
  copied: string;
  openReport: string;
  print: string;
  download: string;
  reportKicker: string;
  reportHedge: string;
  reportPrivate: string;
  missing: string;
  units: { min: string; km: string; m: string; days: string };
};

export const passportEn: PassportCopy = {
  tab: "Passport",
  kicker: "Across seasons",
  title: "Your training passport",
  lead: "This is you against last season, not against a professional field. It fills from logged weeks and the outings you add. Private until you share it.",
  vsYou: "This season against your last one",
  firstSeason: "First season on record. The next one is the comparison that matters.",
  empty: "Log sessions on Today, then add an outing here. Empty is honest. A template is not.",
  addOuting: "Add an outing",
  outingName: "Name",
  outingDate: "Date",
  distance: "Distance (km)",
  elevation: "Elevation (m)",
  duration: "Time (min)",
  result: "Result",
  confidence: "How ready you felt (1–5)",
  lesson: "What you would repeat or change",
  saveOuting: "Save outing",
  remove: "Remove",
  results: {
    finished: "Finished",
    dnf: "Did not finish",
    dns: "Did not start",
    training: "Training outing",
  },
  metrics: {
    completion: "Sessions completed",
    consistency: "Weeks with work",
    easy: "Easy aerobic sessions",
    quality: "Quality / climbing sessions",
    mountain: "Mountain days",
    longest: "Longest outing",
    confidence: "Reported confidence",
    elevation: "Elevation from outings",
  },
  metricHint: {
    completion: "Done versus missed. Missed is not stacked.",
    consistency: "Share of weeks that actually had a logged session.",
    easy: "Conversational work that was logged as done.",
    quality: "The sparse hard days, including climbing and strength.",
    mountain: "Days logged as hike, climb, pack, or mountain. Not a GPS invent.",
    longest: "Longest finished outing you entered, in minutes.",
    confidence: "Average of the 1–5 you put on finished outings.",
    elevation: "Sum of elevation you typed on finished outings.",
  },
  delta: {
    up: "Up on last season",
    down: "Down on last season",
    flat: "About the same",
    new: "No previous season yet",
  },
  pbs: "Your bests, from your outings",
  pbKinds: {
    duration: "Longest time",
    distance: "Longest distance",
    elevation: "Most climbing",
    streak: "Weeks logged good",
  },
  eventsTitle: "Outings",
  lessonsTitle: "Lessons",
  interruptions: "Interruptions",
  noInterruptions: "No travel, illness, or missed-week notes on this plan.",
  privacyTitle: "Who can see this",
  privacyLead:
    "Off by default. A link only works while sharing is on. Sleep, heart numbers, and injuries never go on the public page.",
  publicOn: "Sharing on",
  publicOff: "Keep private",
  displayName: "Name on the report",
  audience: "This copy is for",
  audiences: {
    private: "Nobody",
    coach: "A coach",
    partner: "A training partner",
    club: "A club",
    sponsor: "A sponsor",
    event: "An event application",
  },
  flags: {
    showEvents: "Outings list",
    showVolume: "Volume totals",
    showConsistency: "Consistency and completion",
    showPbs: "Personal bests",
    showLessons: "Lessons",
    showConfidence: "Confidence marks",
  },
  shareLink: "Share link",
  copyLink: "Copy link",
  copied: "Copied",
  openReport: "Open the report",
  print: "Print / save PDF",
  download: "Download JSON",
  reportKicker: "Ridgework performance passport",
  reportHedge:
    "Compared with this athlete’s previous season. Not a ranking, not a medical file, not a prediction.",
  reportPrivate: "This passport is private.",
  missing: "That link is off or unknown.",
  units: { min: "min", km: "km", m: "m", days: "weeks" },
};

export const passportFi: PassportCopy = {
  tab: "Passi",
  kicker: "Kausi kaudelta",
  title: "Treenipassi",
  lead: "Tämä on sinä viime kautta vasten, ei ammattilaisten kenttää. Täyttyy kirjatuista viikoista ja retkistä jotka lisäät. Yksityinen kunnes jaat.",
  vsYou: "Tämä kausi vastaan edellinen",
  firstSeason: "Ensimmäinen kausi kirjassa. Seuraava on se vertailu jolla on väliä.",
  empty:
    "Kirjaa sessiot Tänään-välilehdellä, lisää retki tähän. Tyhjä on rehellinen. Mallipohja ei.",
  addOuting: "Lisää retki",
  outingName: "Nimi",
  outingDate: "Päivä",
  distance: "Matka (km)",
  elevation: "Nousu (m)",
  duration: "Aika (min)",
  result: "Tulos",
  confidence: "Miltä valmius tuntui (1–5)",
  lesson: "Minkä toistaisit tai muuttaisit",
  saveOuting: "Tallenna retki",
  remove: "Poista",
  results: { finished: "Maaliin", dnf: "Keskeytys", dns: "Ei startannut", training: "Treeniretki" },
  metrics: {
    completion: "Tehdyt treenit",
    consistency: "Viikot joissa työtä",
    easy: "Kevyet aerobiset",
    quality: "Teho- / kiipeilysessiot",
    mountain: "Vuoripäivät",
    longest: "Pisin retki",
    confidence: "Ilmoitettu valmius",
    elevation: "Nousu retkistä",
  },
  metricHint: {
    completion: "Tehty vastaan väliin jäänyt. Väliin jäänyttä ei pinota.",
    consistency: "Osuus viikoista joissa on kirjattu sessio.",
    easy: "Puhevauhtiset jotka merkittiin tehdyiksi.",
    quality: "Harvat kovat päivät, kiipeily ja voima mukana.",
    mountain: "Vaellus, kiipeily, rinkka tai vuoripäivä. Ei keksittyä GPS-lukua.",
    longest: "Pisin maaliin viemäsi retki, minuutteina.",
    confidence: "Keskiarvo 1–5 merkeistä jotka laitoit maaliin viedyille retkille.",
    elevation: "Summa nousuista jotka kirjoitit maaliin viedyille retkille.",
  },
  delta: {
    up: "Ylös edellisestä",
    down: "Alas edellisestä",
    flat: "Suunnilleen sama",
    new: "Ei edellistä kautta vielä",
  },
  pbs: "Omat ennätykset, omista retkistä",
  pbKinds: {
    duration: "Pisin aika",
    distance: "Pisin matka",
    elevation: "Eniten nousua",
    streak: "Hyviksi kirjatut viikot",
  },
  eventsTitle: "Retket",
  lessonsTitle: "Opit",
  interruptions: "Katko",
  noInterruptions: "Ei matka-, sairaus- tai väliin jääneen viikon merkintöjä tällä suunnitelmalla.",
  privacyTitle: "Kuka näkee",
  privacyLead:
    "Pois päältä oletuksena. Linkki toimii vain kun jako on päällä. Uni, syke ja vammat eivät ikinä julkiselle sivulle.",
  publicOn: "Jako päällä",
  publicOff: "Pidä yksityisenä",
  displayName: "Nimi raportissa",
  audience: "Tämä kopio on",
  audiences: {
    private: "Ei kenellekään",
    coach: "Valmentajalle",
    partner: "Treenikaverille",
    club: "Seuralle",
    sponsor: "Sponsorille",
    event: "Kisahakemukseen",
  },
  flags: {
    showEvents: "Retkilista",
    showVolume: "Volyymit",
    showConsistency: "Säännöllisyys ja valmistuminen",
    showPbs: "Ennätykset",
    showLessons: "Opit",
    showConfidence: "Valmiusmerkit",
  },
  shareLink: "Jakolinkki",
  copyLink: "Kopioi linkki",
  copied: "Kopioitu",
  openReport: "Avaa raportti",
  print: "Tulosta / tallenna PDF",
  download: "Lataa JSON",
  reportKicker: "Ridgework-treenipassi",
  reportHedge:
    "Verrattu tämän urheilijan edelliseen kauteen. Ei ranking, ei potilaskertomus, ei ennuste.",
  reportPrivate: "Tämä passi on yksityinen.",
  missing: "Linkki on pois päältä tai tuntematon.",
  units: { min: "min", km: "km", m: "m", days: "vko" },
};

export const passportFr: PassportCopy = {
  tab: "Passeport",
  kicker: "D’une saison à l’autre",
  title: "Votre passeport d’entraînement",
  lead: "Vous contre la saison dernière, pas contre un peloton pro. Ça se remplit avec les semaines notées et les sorties que vous ajoutez. Privé tant que vous ne partagez pas.",
  vsYou: "Cette saison contre la précédente",
  firstSeason: "Première saison au registre. La suivante est la comparaison qui compte.",
  empty:
    "Notez les séances dans Aujourd’hui, puis ajoutez une sortie ici. Vide est honnête. Un modèle ne l’est pas.",
  addOuting: "Ajouter une sortie",
  outingName: "Nom",
  outingDate: "Date",
  distance: "Distance (km)",
  elevation: "Dénivelé (m)",
  duration: "Temps (min)",
  result: "Résultat",
  confidence: "Forme ressentie (1–5)",
  lesson: "À répéter ou à changer",
  saveOuting: "Enregistrer la sortie",
  remove: "Retirer",
  results: {
    finished: "Terminé",
    dnf: "Abandon",
    dns: "Non partant",
    training: "Sortie d’entraînement",
  },
  metrics: {
    completion: "Séances faites",
    consistency: "Semaines avec du travail",
    easy: "Séances aérobies faciles",
    quality: "Qualité / escalade",
    mountain: "Jours montagne",
    longest: "Plus longue sortie",
    confidence: "Confiance déclarée",
    elevation: "Dénivelé des sorties",
  },
  metricHint: {
    completion: "Fait contre manqué. Rien n’est empilé.",
    consistency: "Part des semaines avec une séance notée.",
    easy: "Travail conversationnel marqué comme fait.",
    quality: "Les rares jours durs, escalade et force compris.",
    mountain: "Rando, escalade, sac ou jour montagne. Pas un GPS inventé.",
    longest: "Plus longue sortie terminée, en minutes.",
    confidence: "Moyenne des notes 1–5 sur les sorties terminées.",
    elevation: "Somme du dénivelé saisi sur les sorties terminées.",
  },
  delta: {
    up: "Au-dessus de la saison dernière",
    down: "En dessous",
    flat: "À peu près pareil",
    new: "Pas encore de saison précédente",
  },
  pbs: "Vos meilleurs, depuis vos sorties",
  pbKinds: {
    duration: "Plus long temps",
    distance: "Plus longue distance",
    elevation: "Plus de dénivelé",
    streak: "Semaines notées bonnes",
  },
  eventsTitle: "Sorties",
  lessonsTitle: "Leçons",
  interruptions: "Coupures",
  noInterruptions: "Pas de voyage, maladie ou semaine manquée notés sur ce plan.",
  privacyTitle: "Qui peut voir",
  privacyLead:
    "Désactivé par défaut. Un lien ne marche que si le partage est allumé. Sommeil, cardio et blessures ne vont jamais sur la page publique.",
  publicOn: "Partage allumé",
  publicOff: "Rester privé",
  displayName: "Nom sur le rapport",
  audience: "Cette copie est pour",
  audiences: {
    private: "Personne",
    coach: "Un coach",
    partner: "Un partenaire",
    club: "Un club",
    sponsor: "Un sponsor",
    event: "Un dossier d’épreuve",
  },
  flags: {
    showEvents: "Liste des sorties",
    showVolume: "Totaux de volume",
    showConsistency: "Régularité et achèvement",
    showPbs: "Meilleurs",
    showLessons: "Leçons",
    showConfidence: "Notes de confiance",
  },
  shareLink: "Lien de partage",
  copyLink: "Copier le lien",
  copied: "Copié",
  openReport: "Ouvrir le rapport",
  print: "Imprimer / PDF",
  download: "Télécharger JSON",
  reportKicker: "Passeport d’entraînement Ridgework",
  reportHedge:
    "Comparé à la saison précédente de cet athlète. Pas un classement, pas un dossier médical, pas une prédiction.",
  reportPrivate: "Ce passeport est privé.",
  missing: "Ce lien est éteint ou inconnu.",
  units: { min: "min", km: "km", m: "m", days: "sem." },
};

export const passportDe: PassportCopy = {
  tab: "Pass",
  kicker: "Saison für Saison",
  title: "Dein Trainingspass",
  lead: "Du gegen die letzte Saison, nicht gegen ein Profifeld. Füllt sich aus geloggten Wochen und den Touren, die du einträgst. Privat, bis du teilst.",
  vsYou: "Diese Saison gegen die letzte",
  firstSeason: "Erste Saison in der Akte. Die nächste ist der Vergleich, der zählt.",
  empty:
    "Einheiten unter Heute loggen, dann hier eine Tour eintragen. Leer ist ehrlich. Eine Vorlage nicht.",
  addOuting: "Tour eintragen",
  outingName: "Name",
  outingDate: "Datum",
  distance: "Distanz (km)",
  elevation: "Höhenmeter (m)",
  duration: "Zeit (min)",
  result: "Ergebnis",
  confidence: "Wie bereit du dich fühltest (1–5)",
  lesson: "Was du wiederholen oder ändern würdest",
  saveOuting: "Tour speichern",
  remove: "Entfernen",
  results: {
    finished: "Im Ziel",
    dnf: "Aufgegeben",
    dns: "Nicht gestartet",
    training: "Trainingstour",
  },
  metrics: {
    completion: "Einheiten erledigt",
    consistency: "Wochen mit Arbeit",
    easy: "Lockere aerobe Einheiten",
    quality: "Qualität / Klettern",
    mountain: "Bergtage",
    longest: "Längste Tour",
    confidence: "Gemeldete Form",
    elevation: "Höhenmeter aus Touren",
  },
  metricHint: {
    completion: "Erledigt gegen verpasst. Nichts wird gestapelt.",
    consistency: "Anteil Wochen mit einer geloggten Einheit.",
    easy: "Gesprächiges Arbeit, als erledigt markiert.",
    quality: "Die wenigen harten Tage, inklusive Klettern und Kraft.",
    mountain: "Wanderung, Klettern, Pack oder Bergtag. Kein erfundenes GPS.",
    longest: "Längste beendete Tour, in Minuten.",
    confidence: "Mittel der 1–5 auf beendeten Touren.",
    elevation: "Summe der Höhenmeter, die du auf beendeten Touren eingetragen hast.",
  },
  delta: {
    up: "Über der letzten Saison",
    down: "Unter der letzten Saison",
    flat: "Ungefähr gleich",
    new: "Noch keine vorherige Saison",
  },
  pbs: "Deine Besten, aus deinen Touren",
  pbKinds: {
    duration: "Längste Zeit",
    distance: "Längste Distanz",
    elevation: "Meiste Höhe",
    streak: "Als gut geloggte Wochen",
  },
  eventsTitle: "Touren",
  lessonsTitle: "Lehren",
  interruptions: "Unterbrechungen",
  noInterruptions: "Keine Reise-, Krankheits- oder verpassten-Wochen-Notizen auf diesem Plan.",
  privacyTitle: "Wer das sieht",
  privacyLead:
    "Standard aus. Ein Link gilt nur, solange Teilen an ist. Schlaf, Herzwerte und Verletzungen kommen nie auf die öffentliche Seite.",
  publicOn: "Teilen an",
  publicOff: "Privat bleiben",
  displayName: "Name auf dem Bericht",
  audience: "Diese Kopie ist für",
  audiences: {
    private: "Niemanden",
    coach: "Einen Trainer",
    partner: "Einen Trainingspartner",
    club: "Einen Verein",
    sponsor: "Einen Sponsor",
    event: "Eine Eventbewerbung",
  },
  flags: {
    showEvents: "Tourenliste",
    showVolume: "Volumen",
    showConsistency: "Konstanz und Abschluss",
    showPbs: "Bestleistungen",
    showLessons: "Lehren",
    showConfidence: "Formnoten",
  },
  shareLink: "Teilen-Link",
  copyLink: "Link kopieren",
  copied: "Kopiert",
  openReport: "Bericht öffnen",
  print: "Drucken / PDF",
  download: "JSON laden",
  reportKicker: "Ridgework-Trainingspass",
  reportHedge:
    "Verglichen mit der vorherigen Saison dieses Athleten. Kein Ranking, keine Krankenakte, keine Vorhersage.",
  reportPrivate: "Dieser Pass ist privat.",
  missing: "Dieser Link ist aus oder unbekannt.",
  units: { min: "min", km: "km", m: "m", days: "Wo." },
};

export type WhatIfCopy = {
  tab: string;
  kicker: string;
  title: string;
  lead: string;
  needPlan: string;
  demoHint: string;
  apply: string;
  applied: string;
  recommended: string;
  improves: string;
  sacrifices: string;
  loadRisk: string;
  peak: string;
  hedge: string;
  weekChanges: string;
  paramTravel: string;
  paramWeeks: string;
  paramPeak: string;
  paramSecond: string;
  paramIllness: string;
  outlook: Record<PeakOutlook, string>;
  risk: Record<LoadRisk, string>;
  gains: Record<string, string>;
  losses: Record<string, string>;
  scenarios: Record<ScenarioId, { title: string; body: string }>;
  options: Record<string, { label: string; change: string }>;
};

export const whatIfEn: WhatIfCopy = {
  tab: "What if",
  kicker: "Before you commit",
  title: "Try the change first",
  lead: "Pick a situation. Three options, with what you keep and what you give up. Nothing moves until you apply it. The ready date stays unless you choose to move it.",
  needPlan:
    "Start a program to apply a change to your own weeks. The comparison below uses a sample 50 km build.",
  demoHint: "Sample 50 km. Apply is off until you start a program.",
  apply: "Apply this change",
  applied:
    "Applied. The written weeks updated. The ready date only moved if you chose that option.",
  recommended: "The honest option",
  improves: "What improves",
  sacrifices: "What you give up",
  loadRisk: "Load risk",
  peak: "Ready date",
  hedge:
    "This is a comparison, not a diagnosis and not a guarantee. Tomorrow’s sleep can still veto any of these.",
  weekChanges: "Sessions that would change",
  paramTravel: "Days away",
  paramWeeks: "Weeks until the event",
  paramPeak: "New ready date",
  paramSecond: "Second event date",
  paramIllness: "Weeks of easy return",
  outlook: {
    holds: "The window still looks like a full build. That is not a promise you will be ready.",
    stretched:
      "The date can stay. The build is thinner than the suggestion. More time would clearly help.",
    unrealistic: "The date can stay on the calendar. This is a holding pattern, not a full build.",
  },
  risk: {
    low: "Load goes down or stays honest. The usual failure is too little specific work, not blowing up.",
    moderate: "Some specific work stays on a shorter fuse. Watch sleep and niggles.",
    high: "This piles work on a hole. That is how a niggle becomes time off.",
  },
  gains: {
    recovery: "More recovery this week",
    niggle: "Less chance of turning a niggle into time off",
    aerobic: "Easy aerobic work still happens",
    time: "You are not cramming the calendar",
    specific: "Specific work is kept",
    climbing: "Climbing or strength stays",
    elevation: "Mountain stimulus stays",
    sharpness: "A quality dose stays in the week",
    racePractice: "You still get a race-week rehearsal",
    window: "More weeks of actual base",
    honesty: "The written week matches what you can do",
    stack: "Nothing is stacked on a hole",
  },
  losses: {
    recovery: "Recovery this week",
    niggle: "A quieter tissue week",
    aerobic: "Running-specific stimulus",
    time: "Calendar days until the event",
    specific: "Specific / quality work in this block",
    climbing: "Climbing volume",
    elevation: "Mountain and vert stimulus",
    sharpness: "The quality dose",
    racePractice: "Treating the first date as the A-priority",
    window: "Weeks of base before the day",
    honesty: "A plan that matches the life you actually have",
    stack: "You would stack load on a hole",
  },
  scenarios: {
    missedWeek: {
      title: "I missed a week",
      body: "Write the week off. Do not stack it on the next one.",
    },
    sixWeeks: {
      title: "Only six weeks left",
      body: "A plan still writes. It is thinner. Longer would have been better.",
    },
    travel: {
      title: "I am travelling",
      body: "Mountain days become easy work from wherever you are.",
    },
    noRun: {
      title: "I cannot run",
      body: "Hike or cycle the aerobic work. Climbing can stay if the body allows it.",
    },
    fatigue: {
      title: "This week I am tired",
      body: "Quality becomes easy. The ready date does not move.",
    },
    movePeak: {
      title: "Move the ready date",
      body: "Only if you mean it. Tired weeks are not a reason.",
    },
    lessElevation: {
      title: "Less mountain access",
      body: "Hikes and gym strength instead of pretending the ridge is there.",
    },
    secondEvent: {
      title: "A second event",
      body: "One A-priority. The other is a rehearsal or the next season.",
    },
    returnIllness: {
      title: "Back after time off",
      body: "Easy weeks first. Moving the date is often the honest call.",
    },
  },
  options: {
    "missedWeek.keepPeak": {
      label: "Write it off, keep the date",
      change: "This week is missed. Next week starts from the template. Ready date {peak} stays.",
    },
    "missedWeek.shiftPeak": {
      label: "Write it off and move the date a week",
      change: "Same recovery, one extra easy week before {peak}.",
    },
    "missedWeek.makeup": {
      label: "Stack a quality session to catch up",
      change:
        "An extra hard day on top of a hole. Ridgework will write it if you insist. It is the worse option.",
    },
    "sixWeeks.compress": {
      label: "Fit the plan into this window",
      change:
        "{weeks} weeks to {peak}. Base is cut first. This is thinner than the {rec}-week suggestion.",
    },
    "sixWeeks.keepLonger": {
      label: "Keep the longer window if the date can move",
      change: "If the event is not fixed, more weeks of easy running beat a scramble.",
    },
    "sixWeeks.cram": {
      label: "Compress and add extra quality",
      change: "Shorter window plus stacked intensity. High cost, little extra fitness.",
    },
    "travel.swap": {
      label: "Easy work on the road",
      change: "Until {until}, mountain and climbing days become easy from where you are.",
    },
    "travel.recoveryBlock": {
      label: "Treat the trip as recovery",
      change: "{days} days easy. Specific work waits. Ready date stays.",
    },
    "travel.stackAfter": {
      label: "Make it up when you get back",
      change: "Extra quality after the trip. That is stacking.",
    },
    "noRun.hikeCycle": {
      label: "Hike or cycle the aerobic work",
      change: "Running days become hiking. Climbing and strength can stay.",
    },
    "noRun.pauseAndShift": {
      label: "Easy substitute and move the date",
      change: "Two quieter weeks and a later ready date. Better if the window was already short.",
    },
    "noRun.keepRunning": {
      label: "Leave the run sessions as written",
      change: "The plan will still show runs. That does not make them a good idea.",
    },
    "fatigue.easeWeek": {
      label: "Easy this week",
      change: "Quality and the long get quieter. Ready date {peak} stays.",
    },
    "fatigue.extraRest": {
      label: "Rest instead of the hard days",
      change: "Hard days become rest. Easy can stay easy.",
    },
    "fatigue.keepLoad": {
      label: "Keep the written week",
      change: "No change. The body already said it is tired.",
    },
    "movePeak.applyMove": {
      label: "Move it to the date you picked",
      change: "From {from} to {to}. Extra weeks go to easy base. A shorter window cuts base first.",
    },
    "movePeak.keepDate": {
      label: "Leave the ready date",
      change: "Nothing moves. Tired weeks still do not shift it.",
    },
    "movePeak.moveAndEase": {
      label: "Move it and ease this week",
      change: "New date, and this week stays quiet while the calendar resettles.",
    },
    "lessElevation.swapHike": {
      label: "Hike instead of mountain days",
      change: "Mountain and vert become hiking. Climbing can stay if you have a wall.",
    },
    "lessElevation.alsoBlockClimb": {
      label: "Hike, and drop climbing too",
      change: "No mountain, no climbing. Strength or easy work instead.",
    },
    "lessElevation.ignore": {
      label: "Leave mountain days as written",
      change: "The week will still show a ridge you cannot reach.",
    },
    "secondEvent.bRaceEase": {
      label: "Treat the extra date as a B-race",
      change: "Ease around {second}. The A-date stays {peak}.",
    },
    "secondEvent.retargetToNearest": {
      label: "Peak on the sooner date",
      change: "The nearer day becomes the A-priority. The later one is next season.",
    },
    "secondEvent.trainThrough": {
      label: "Train through both at full load",
      change: "Two peaks, no ease. That is the expensive option.",
    },
    "returnIllness.easyReturn": {
      label: "Easy return, keep the date",
      change: "{weeks} quieter weeks. Ready date stays if the window can still hold a build.",
    },
    "returnIllness.shiftPeak": {
      label: "Easy return and move the date",
      change: "{weeks} easy weeks and a later ready date. Often the honest call after time off.",
    },
    "returnIllness.resumeNow": {
      label: "Resume the written week today",
      change: "No ease. Coming back at full load is how time off gets longer.",
    },
  },
};

export const whatIfFi: WhatIfCopy = {
  ...whatIfEn,
  tab: "Entä jos",
  kicker: "Ennen kuin sitoudut",
  title: "Kokeile muutos ensin",
  lead: "Valitse tilanne. Kolme vaihtoehtoa: mitä jää, mitä lähtee. Mikään ei muutu ennen kuin käytät. Tavoitepäivä pysyy, ellet siirrä sitä.",
  needPlan: "Aloita ohjelma, jotta muutos menee omiin viikkoihin. Alla on mallin 50 km -rakennus.",
  demoHint: "Mallin 50 km. Käyttö on pois päältä kunnes aloitat ohjelman.",
  apply: "Käytä tämä muutos",
  applied: "Käytetty. Kirjoitetut viikot päivittyivät. Tavoitepäivä siirtyi vain jos valitsit sen.",
  recommended: "Rehellinen vaihtoehto",
  improves: "Mitä paranee",
  sacrifices: "Mitä jää pois",
  loadRisk: "Kuormariski",
  peak: "Tavoitepäivä",
  hedge:
    "Tämä on vertailu, ei diagnoosi eikä lupaus. Huomisen uni voi yhä kumota minkä tahansa näistä.",
  weekChanges: "Sessiot jotka muuttuisivat",
  paramTravel: "Päiviä poissa",
  paramWeeks: "Viikkoja kisaan",
  paramPeak: "Uusi tavoitepäivä",
  paramSecond: "Toisen kisan päivä",
  paramIllness: "Helppoja paluuviikkoja",
  outlook: {
    holds: "Ikkuna näyttää vielä täydeltä rakennukselta. Se ei ole lupaus että olet valmis.",
    stretched: "Päivä voi pysyä. Rakennus on ohuempi kuin suositus. Lisäaika auttaisi selvästi.",
    unrealistic: "Päivä voi pysyä kalenterissa. Tämä on pito, ei täysi rakennus.",
  },
  risk: {
    low: "Kuorma laskee tai pysyy rehellisenä. Tyypillinen virhe on liian vähän spesifiä, ei räjähtäminen.",
    moderate: "Spesifiä työtä jää lyhyempään ikkunaan. Katso unta ja kolotuksia.",
    high: "Tämä pinottaa työtä reiän päälle. Näin kolotus muuttuu tauoksi.",
  },
  gains: {
    recovery: "Enemmän palautumista tällä viikolla",
    niggle: "Pienempi riski että kolotus venyy tauoksi",
    aerobic: "Kevyt aerobinen työ jatkuu",
    time: "Kalenteria ei ahdeta",
    specific: "Spesifi työ säilyy",
    climbing: "Kiipeily tai voima säilyy",
    elevation: "Vuoristimulus säilyy",
    sharpness: "Tehoannos jää viikkoon",
    racePractice: "Saat silti kisaviikon harjoituksen",
    window: "Enemmän oikeaa pohjaa",
    honesty: "Kirjoitettu viikko vastaa sitä mitä voit tehdä",
    stack: "Reiän päälle ei pinota",
  },
  losses: {
    recovery: "Palautuminen tällä viikolla",
    niggle: "Rauhallisempi kudosviikko",
    aerobic: "Juoksuspesifi stimulus",
    time: "Kalenteripäivät kisaan",
    specific: "Spesifi / teho tässä jaksossa",
    climbing: "Kiipeilyvolyymi",
    elevation: "Vuori- ja nousustimulus",
    sharpness: "Tehoannos",
    racePractice: "Ensimmäinen päivä A-kisana",
    window: "Pohjaviikot ennen päivää",
    honesty: "Suunnitelma joka vastaa oikeaa elämää",
    stack: "Kuorma pinottaisiin reiän päälle",
  },
  scenarios: {
    missedWeek: { title: "Viikko jäi väliin", body: "Kirjaa viikko pois. Älä pinota seuraavaan." },
    sixWeeks: {
      title: "Vain kuusi viikkoa jäljellä",
      body: "Suunnitelma kirjoitetaan silti. Se on ohuempi. Pidempi olisi ollut parempi.",
    },
    travel: { title: "Olen matkoilla", body: "Vuoripäivät muuttuvat kevyeksi sieltä missä olet." },
    noRun: {
      title: "En voi juosta",
      body: "Vaella tai pyöräile aerobinen työ. Kiipeily voi jäädä jos kroppa sallii.",
    },
    fatigue: { title: "Tämä viikko väsyttää", body: "Tehot kevenevät. Tavoitepäivä ei siirry." },
    movePeak: {
      title: "Siirrä tavoitepäivä",
      body: "Vain jos tarkoitat sitä. Väsynyt viikko ei ole syy.",
    },
    lessElevation: {
      title: "Vähemmän vuoripääsyä",
      body: "Vaellusta ja salivoimaa, ei teeskentelyä että harjanne on siinä.",
    },
    secondEvent: {
      title: "Toinen kisa",
      body: "Yksi A-tavoite. Toinen on harjoitus tai seuraava kausi.",
    },
    returnIllness: {
      title: "Tauon jälkeen takaisin",
      body: "Helpot viikot ensin. Päivän siirto on usein rehellinen veto.",
    },
  },
  options: {
    "missedWeek.keepPeak": {
      label: "Kirjaa pois, pidä päivä",
      change: "Tämä viikko on väliin jäänyt. Seuraava alkaa mallista. Tavoitepäivä {peak} pysyy.",
    },
    "missedWeek.shiftPeak": {
      label: "Kirjaa pois ja siirrä päivä viikolla",
      change: "Sama palautuminen, yksi extra-kevyt viikko ennen {peak}.",
    },
    "missedWeek.makeup": {
      label: "Pinota teho kiriäksesi",
      change:
        "Extra-kova päivä reiän päälle. Ridgework kirjoittaa sen jos vaadit. Se on huonompi vaihtoehto.",
    },
    "sixWeeks.compress": {
      label: "Sovita suunnitelma tähän ikkunaan",
      change:
        "{weeks} viikkoa päivään {peak}. Pohja leikkautuu ensin. Ohuempi kuin {rec} viikon suositus.",
    },
    "sixWeeks.keepLonger": {
      label: "Pidä pidempi ikkuna jos päivä voi siirtyä",
      change: "Jos kisa ei ole lukittu, lisää kevyttä juoksua voittaa kiireen.",
    },
    "sixWeeks.cram": {
      label: "Pakota ja lisää tehoa",
      change: "Lyhyempi ikkuna plus pinottu teho. Kallis, vähän lisäkuntoa.",
    },
    "travel.swap": {
      label: "Kevyttä matkalla",
      change: "Päivään {until} asti vuori- ja kiipeilypäivät ovat kevyttä sieltä missä olet.",
    },
    "travel.recoveryBlock": {
      label: "Hoida reissu palautumisena",
      change: "{days} päivää kevyttä. Spesifi odottaa. Tavoitepäivä pysyy.",
    },
    "travel.stackAfter": {
      label: "Kiri kun palajat",
      change: "Extra-teho reissun jälkeen. Se on pinoamista.",
    },
    "noRun.hikeCycle": {
      label: "Vaella tai pyöräile aerobinen",
      change: "Juoksupäivät muuttuvat vaellukseksi. Kiipeily ja voima voivat jäädä.",
    },
    "noRun.pauseAndShift": {
      label: "Kevyt korvaus ja siirrä päivä",
      change: "Kaksi hiljaisempaa viikkoa ja myöhempi tavoite. Parempi jos ikkuna oli jo lyhyt.",
    },
    "noRun.keepRunning": {
      label: "Jätä juoksut kirjoitetuiksi",
      change: "Suunnitelma näyttää yhä juoksuja. Se ei tee niistä hyvää ideaa.",
    },
    "fatigue.easeWeek": {
      label: "Kevyt tämä viikko",
      change: "Teho ja pitkä hiljenevät. Tavoitepäivä {peak} pysyy.",
    },
    "fatigue.extraRest": {
      label: "Lepo kovien sijaan",
      change: "Kovat päivät muuttuvat leoksi. Kevyt voi jäädä kevyeksi.",
    },
    "fatigue.keepLoad": {
      label: "Pidä kirjoitettu viikko",
      change: "Ei muutosta. Kroppa sanoi jo että väsyttää.",
    },
    "movePeak.applyMove": {
      label: "Siirrä valitsemaasi päivään",
      change:
        "{from} → {to}. Ylimääräiset viikot kevyeen pohjaan. Lyhyempi ikkuna leikkaa pohjan ensin.",
    },
    "movePeak.keepDate": {
      label: "Jätä tavoitepäivä",
      change: "Mikään ei siirry. Väsynyt viikko ei silti siirrä sitä.",
    },
    "movePeak.moveAndEase": {
      label: "Siirrä ja kevennä tämä viikko",
      change: "Uusi päivä, ja tämä viikko pysyy hiljaisena kun kalenteri asettuu.",
    },
    "lessElevation.swapHike": {
      label: "Vaellus vuoripäivien sijaan",
      change: "Vuori ja nousu muuttuvat vaellukseksi. Kiipeily voi jäädä jos seinä on.",
    },
    "lessElevation.alsoBlockClimb": {
      label: "Vaellus, ja kiipeily pois",
      change: "Ei vuorta, ei kiipeilyä. Voimaa tai kevyttä tilalle.",
    },
    "lessElevation.ignore": {
      label: "Jätä vuoripäivät kirjoitetuiksi",
      change: "Viikko näyttää yhä harjanteen jota et tavoita.",
    },
    "secondEvent.bRaceEase": {
      label: "Extra-päivä B-kisana",
      change: "Kevennä {second} ympärillä. A-päivä pysyy {peak}.",
    },
    "secondEvent.retargetToNearest": {
      label: "Huippu lähempänä päivänä",
      change: "Lähempi päivä on A. Myöhempi on seuraava kausi.",
    },
    "secondEvent.trainThrough": {
      label: "Treenaa molemmat täysillä",
      change: "Kaksi huippua, ei kevennystä. Kallis vaihtoehto.",
    },
    "returnIllness.easyReturn": {
      label: "Helppo paluu, pidä päivä",
      change: "{weeks} hiljaisempaa viikkoa. Päivä pysyy jos ikkuna vielä kantaa rakennuksen.",
    },
    "returnIllness.shiftPeak": {
      label: "Helppo paluu ja siirrä päivä",
      change: "{weeks} kevyttä viikkoa ja myöhempi tavoite. Usein rehellinen veto tauon jälkeen.",
    },
    "returnIllness.resumeNow": {
      label: "Jatka kirjoitettua viikkoa tänään",
      change: "Ei kevennystä. Täysillä paluu on tapa pidentää taukoa.",
    },
  },
};

export const whatIfFr: WhatIfCopy = {
  ...whatIfEn,
  tab: "Et si",
  kicker: "Avant de trancher",
  title: "Tester le changement d’abord",
  lead: "Choisissez une situation. Trois options, avec ce que vous gardez et ce que vous laissez. Rien ne bouge tant que vous n’appliquez pas. La date cible reste, sauf si vous la déplacez.",
  needPlan:
    "Démarrez un programme pour appliquer le changement à vos semaines. Ci-dessous, un 50 km d’exemple.",
  demoHint: "50 km d’exemple. Appliquer est désactivé tant que vous n’avez pas de programme.",
  apply: "Appliquer ce changement",
  applied:
    "Appliqué. Les semaines écrites ont changé. La date n’a bougé que si vous l’avez choisi.",
  recommended: "L’option honnête",
  improves: "Ce qui s’améliore",
  sacrifices: "Ce que vous laissez",
  loadRisk: "Risque de charge",
  peak: "Date cible",
  hedge:
    "C’est une comparaison, pas un diagnostic ni une garantie. Le sommeil de demain peut encore tout veto.",
  weekChanges: "Séances qui changeraient",
  paramTravel: "Jours absents",
  paramWeeks: "Semaines avant l’épreuve",
  paramPeak: "Nouvelle date cible",
  paramSecond: "Date de la deuxième épreuve",
  paramIllness: "Semaines de retour facile",
};

export const whatIfDe: WhatIfCopy = {
  ...whatIfEn,
  tab: "Was wäre",
  kicker: "Bevor du dich festlegst",
  title: "Die Änderung zuerst testen",
  lead: "Situation wählen. Drei Optionen, mit dem was bleibt und dem was wegfällt. Nichts bewegt sich, bis du es anwendest. Das Zieldatum bleibt, außer du verschiebst es.",
  needPlan:
    "Starte ein Programm, um die Änderung auf deine Wochen anzuwenden. Unten ein Beispiel-50-km.",
  demoHint: "Beispiel-50-km. Anwenden ist aus, bis ein Programm läuft.",
  apply: "Diese Änderung anwenden",
  applied:
    "Angewendet. Die geschriebenen Wochen sind neu. Das Datum hat sich nur bewegt, wenn du das gewählt hast.",
  recommended: "Die ehrliche Option",
  improves: "Was besser wird",
  sacrifices: "Was wegfällt",
  loadRisk: "Lastrisiko",
  peak: "Zieldatum",
  hedge:
    "Ein Vergleich, keine Diagnose und keine Garantie. Der Schlaf von morgen kann das noch kippen.",
  weekChanges: "Einheiten, die sich ändern würden",
  paramTravel: "Tage unterwegs",
  paramWeeks: "Wochen bis zum Event",
  paramPeak: "Neues Zieldatum",
  paramSecond: "Datum des zweiten Events",
  paramIllness: "Wochen lockerer Rückkehr",
};
