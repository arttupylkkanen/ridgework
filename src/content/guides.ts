import type { Locale } from "@/lib/locale";
import type { FirstObjective } from "@/lib/first-person";

export type GuideCopy = {
  slug: string;
  /**
   * Which objective the end-of-guide link opens the planner on. Coarse on
   * purpose: the planner writes for a first 50 km or a first 20 km trail race,
   * so every guide lands on whichever of those two its reader is closer to.
   */
  goal: FirstObjective;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  kicker: Record<Locale, string>;
  body: Record<Locale, string[]>;
};

export const GUIDES: GuideCopy[] = [
  {
    slug: "six-weeks-to-a-77k-ultra",
    goal: "fifty",
    title: {
      en: "Six weeks to a 77 km ultra: what to run this week",
      fi: "Kuusi viikkoa 77 km ultraan: mitä juokset tällä viikolla",
      fr: "Six semaines avant un ultra de 77 km : que courir cette semaine",
      de: "Sechs Wochen bis zum 77-km-Ultra: was diese Woche laufen",
    },
    description: {
      en: "A worked example: 77 km in six weeks, 5 hours of sleep, a 32 km long run yesterday, a niggle. The week changes. The peak date stays.",
      fi: "Konkreettinen esimerkki: 77 km kuuden viikon päästä, 5 tuntia unta, eilen 32 km, kolotus.",
      fr: "Exemple concret : 77 km dans six semaines, 5 h de sommeil, 32 km hier, une gène.",
      de: "Konkretes Beispiel: 77 km in sechs Wochen, 5 Stunden Schlaf, 32 km gestern, ein Ziepen.",
    },
    kicker: {
      en: "Ultra race preparation",
      fi: "Ultran valmistelu",
      fr: "Préparation ultra",
      de: "Ultra-Vorbereitung",
    },
    body: {
      en: [
        "You are six weeks from a 77 km trail ultra. That is a short window. It is still a written block: keep the long run, keep most days easy, put one quality dose in only if sleep and legs allow, and taper the last 10–14 days.",
        "Yesterday you ran 32 km. Last night you slept five hours. The right knee is a 2/10 niggle, not a collapse.",
        "Today’s written session was intervals. That session is junk intensity on five hours of sleep and a niggle. Skip it. Do 45–60 minutes easy: walk or jog so slowly you can speak a full sentence. If you have never run, walk the whole 45–60 min. That counts. Flat or gentle trail. If talking breaks, walk until it comes back.",
        "A sample week from here, if sleep returns: Mon rest or 30 min walk. Tue 50 min easy walk/jog (full sentences). Wed rest. Thu 40 min easy. Fri rest. Sat long 90 min walk/jog, still talking — or hike the same minutes. Sun 40 min easy or rest if the knee is louder. Same minutes on a bike if you cannot run: 50 min easy cycling replaces 50 min easy jogging.",
        "Keep the long easy. Don’t add kilometres to catch up. Drink on a schedule you have already used — about 500–750 ml per hour (Sawka, Burke et al., ACSM 2007, as a starting range). Do not invent a new gel.",
        "Reassess tomorrow. One easy day does not lose the 77 km. A smashed Tuesday can. The peak date stays.",
      ],
      fi: [
        "77 km polku-ultraan on kuusi viikkoa. Ikkuna on lyhyt, mutta viikko kirjoitetaan silti: pitkä juoksu, suurin osa päivistä helppoa, yksi teho vain jos uni ja jalat antavat, kevennys 10–14 päivää ennen.",
        "Eilen 32 km. Yöllä viisi tuntia unta. Oikea polvi 2/10, ei romahdus.",
        "Tänään oli vedot. Viiden tunnin unella ja kolotuksella se on roskaintensiteettiä. Jätä vedot. 45–60 min helppoa: kävele tai hölkkää niin hitaasti että saat kokonaisen lauseen. Jos et ole juossut, kävele koko 45–60 min. Se lasketaan. Tasainen tai loiva polku. Jos puhe katkeaa, kävele kunnes se palaa.",
        "Esimerkkiviikko jos uni palaa: ma lepo tai 30 min kävely. ti 50 min kevyt kävely/hölkkä (kokonaisia lauseita). ke lepo. to 40 min kevyt. pe lepo. la pitkä 90 min kävely/hölkkä, yhä puhetta — tai vaella samat minuutit. su 40 min kevyt tai lepo jos polvi on äänekkäämpi. Pyörällä samat minuutit: 50 min helppoa pyörää korvaa 50 min hölkkää.",
        "Pidä pitkä helppona. Älä lisää kilometrejä kuroaksesi. Juo jo harjoiteltu määrä — noin 500–750 ml/h. Älä kokeile uutta geeliä.",
        "Katso huomenna uudestaan. Yksi helppo päivä ei vie 77 km:ää. Hajotettu tiistai voi viedä. Tavoitepäivä pysyy.",
      ],
      fr: [
        "Ultra trail de 77 km dans six semaines. Fenêtre courte, semaine quand même écrite : garder la sortie longue, garder l’essentiel facile, une séance qualité seulement si le sommeil et les jambes le permettent, taper 10–14 jours.",
        "Hier 32 km. Cinq heures de sommeil. Genou droit 2/10.",
        "Aujourd’hui c’était des intervalles. Avec cinq heures de sommeil, c’est de l’intensité pour rien. 45–60 min facile. Si vous parlez en phrases, vous êtes dans le travail.",
        "Gardez la longue facile. N’ajoutez pas de kilomètres pour rattraper. Buvez un rythme déjà testé, environ 500–750 ml/h. Pas de nouveau gel.",
        "Réévaluez demain. Un jour facile ne perd pas les 77 km. Un mardi cassé peut. La date de pic reste.",
      ],
      de: [
        "77-km-Trail-Ultra in sechs Wochen. Kurzes Fenster, Woche trotzdem geschrieben: Langer Lauf bleibt, die meisten Tage locker, eine Qualitätseinheit nur bei Schlaf und Beinen, Taper 10–14 Tage.",
        "Gestern 32 km. Fünf Stunden Schlaf. Rechtes Knie 2/10.",
        "Heute standen Intervalle. Bei fünf Stunden Schlaf ist das Müllintensität. 45–60 Min locker. Volle Sätze = richtige Intensität.",
        "Den Langen locker halten. Keine Extra-Kilometer zum Aufholen. Trinken wie schon geübt, etwa 500–750 ml/h. Kein neues Gel.",
        "Morgen neu bewerten. Ein lockerer Tag verliert die 77 km nicht. Ein kaputter Dienstag kann. Das Peak-Datum bleibt.",
      ],
    },
  },
  {
    slug: "100km-ultra-training-plan",
    goal: "fifty",
    title: {
      en: "100 km ultra training plan: time on feet, then back-to-backs",
      fi: "100 km ultran treenisuunnitelma: aika jaloilla, sitten peräkkäiset päivät",
      fr: "Plan d’entraînement ultra 100 km : du temps sur les jambes, puis des back-to-backs",
      de: "100-km-Ultra-Trainingsplan: Zeit auf den Beinen, dann Back-to-backs",
    },
    description: {
      en: "How a 80–120 km ultra block is built: months of easy volume, late back-to-backs, a four-week taper. Tired weeks cut the hard work. The race date stays.",
      fi: "Miten 80–120 km ultra rakennetaan: kuukausia kevyttä juoksua, myöhään peräkkäiset päivät, neljän viikon kevennys.",
      fr: "Comment se construit un ultra 80–120 km : des mois de volume facile, des back-to-backs tardifs, un taper de quatre semaines.",
      de: "So entsteht ein 80–120-km-Ultra: Monate lockeres Volumen, späte Back-to-backs, vier Wochen Taper.",
    },
    kicker: {
      en: "100km ultra training",
      fi: "100 km ultra",
      fr: "Ultra 100 km",
      de: "100-km-Ultra",
    },
    body: {
      en: [
        "A hundred kilometres is not a bigger 50. The limiter is usually time on feet and how you recover between long days, not a heroic Tuesday.",
        "Ridgework’s 80–120 km program is built as months of conversational running, then a specific block with weekend back-to-backs, then three to four weeks of taper. Extra weeks before that sit in aerobic base. Longer is the stronger path.",
        "A typical late specific weekend: Saturday 4–5 hours easy trail, Sunday 2.5–3 hours easy. Midweek stays conversational. If Saturday leftovers sit in the legs, Sunday shortens. That is training load, not a character test.",
        "Fuel the longs with what you will use in the race. Practise drink and carb timing on the long, not on a tired interval day. A niggle is a reason to shorten the long, not to add a second hard session.",
        "After the race, the next season starts from a higher floor if the easy work actually stayed easy. Season after season is the method.",
      ],
      fi: [
        "Sata kilometriä ei ole isompi 50. Rajoitin on yleensä aika jaloilla ja palautuminen pitkien päivien välillä, ei sankaritiistai.",
        "80–120 km -ohjelma: kuukausia puhelenkkiä, sitten kisajakso viikonlopun peräkkäisillä päivillä, sitten 3–4 viikon kevennys. Ylimääräiset viikot jäävät kevyeen juoksuun.",
        "Tyypillinen myöhäinen kisajakson viikonloppu: la 4–5 h helppoa, su 2,5–3 h helppoa. Arki puheella. Jos lauantain jäänteet istuvat jaloissa, sunnuntai lyhenee.",
        "Tankkaa pitkät sillä mitä kisassa käytät. Kolotus lyhentää pitkän, ei lisää toista tehoa.",
        "Kisan jälkeen seuraava kausi lähtee korkeammalta jos helppo pysyi helppona.",
      ],
      fr: [
        "Cent kilomètres n’est pas un 50 plus gros. Le limiteur est le temps sur les jambes et la récupération entre les longues, pas un mardi héroïque.",
        "Le programme 80–120 km : des mois de footing conversationnel, un bloc spécifique avec back-to-backs, puis 3–4 semaines de taper.",
        "Week-end type : samedi 4–5 h facile, dimanche 2,5–3 h facile. La semaine reste facile. Si samedi reste dans les jambes, dimanche raccourcit.",
        "Alimentez les longues avec ce que vous utiliserez en course. Une gène raccourcit la longue ; elle n’ajoute pas une deuxième séance dure.",
        "Après la course, la saison suivante part plus haut si le facile est resté facile.",
      ],
      de: [
        "Hundert Kilometer sind kein größerer 50er. Der Begrenzer ist Zeit auf den Beinen und Erholung zwischen langen Tagen, kein heldenhafter Dienstag.",
        "Das 80–120-km-Programm: Monate Gesprächspuls, dann Specific mit Back-to-backs, dann 3–4 Wochen Taper.",
        "Typisches Wochenende: Sa 4–5 h locker, So 2,5–3 h locker. Die Woche bleibt locker. Sitzt Samstag in den Beinen, wird Sonntag kürzer.",
        "Verpflegung wie im Rennen. Ein Ziepen verkürzt den Langen, es fügt keine zweite harte Einheit hinzu.",
        "Nach dem Rennen startet die nächste Saison höher, wenn locker locker blieb.",
      ],
    },
  },
  {
    slug: "trail-running-training-plan",
    goal: "trail20",
    title: {
      en: "Trail running training plan for 20 km and 50 km",
      fi: "Polkujuoksun treenisuunnitelma 20 km ja 50 km",
      fr: "Plan d’entraînement trail 20 km et 50 km",
      de: "Trailrunning-Trainingsplan für 20 km und 50 km",
    },
    description: {
      en: "Easy volume, one quality dose, a long that grows. How Ridgework writes a 20 km trail block and a first 50 km ultra from the peak date you pick.",
      fi: "Helppo juoksu, yksi teho, kasvava pitkä. Miten 20 km polku ja ensimmäinen 50 km kirjoitetaan tavoitepäivästä.",
      fr: "Volume facile, une dose de qualité, une longue qui grandit. 20 km trail et premier 50 km à partir de la date de pic.",
      de: "Lockeres Volumen, eine Qualitätseinheit, ein wachsender Langer. 20-km-Trail und erster 50er vom Peak-Datum.",
    },
    kicker: {
      en: "Trail running training plan",
      fi: "Polkujuoksun suunnitelma",
      fr: "Plan trail",
      de: "Trail-Plan",
    },
    body: {
      en: [
        "Most trail weeks should feel ordinary. Conversation pace on terrain that matches the race, one quality session if you are fresh, a long that grows by minutes — not by theatre.",
        "The 20 km trail program is about ten weeks if you have them: easy volume, strides or short hills as the quality dose, a long toward 90–110 minutes, then a seven-day taper.",
        "A first 50 km wants more base. Ridgework’s recommended full build is 24 weeks: ten weeks aerobic, twelve weeks of long-run progression, ten to fourteen days taper so you peak race week. If you have less time, the plan still writes — it is a thinner build. Longer is clearly better.",
        "Fatigue is a training input. Sleep collapsed? The quality session becomes easy. Knee at 2/10? Flatten the long. The peak date does not move unless you move it.",
        "That is the whole product: pick the day, run the week you actually have, log what changed.",
      ],
      fi: [
        "Useimmat polkuviikot saavat tuntua tavallisilta. Puhevauhtia maastossa joka muistuttaa kisaa, yksi teho jos olet virkeä, pitkä joka kasvaa minuuteilla.",
        "20 km -ohjelma on noin kymmenen viikkoa: kevyt juoksu, lyhyet mäet tehona, pitkä kohti 90–110 min, seitsemän päivän kevennys.",
        "Ensimmäinen 50 km haluaa enemmän pohjaa. Suositeltu täysi rakennus 24 viikkoa. Lyhyempi ikkuna kirjoittaa silti ohuemman suunnitelman. Pidempi on selvästi parempi.",
        "Väsymys on treenisyöte. Uni hajosi? Teho muuttuu helpoksi. Peak-päivä ei siirry ellei sinä siirrä.",
        "Koko tuote: valitse päivä, juokse viikko joka sinulla on, kirjaa mitä muuttui.",
      ],
      fr: [
        "La plupart des semaines trail doivent rester ordinaires. Allure conversation, une séance qualité si vous êtes frais, une longue qui grandit par minutes.",
        "Le 20 km : environ dix semaines, volume facile, côtes courtes, longue vers 90–110 min, taper de sept jours.",
        "Un premier 50 km veut plus de base. Construction complète recommandée : 24 semaines. Une fenêtre plus courte écrit quand même un plan plus mince.",
        "La fatigue est une entrée d’entraînement. Sommeil cassé ? La qualité devient facile. La date de pic ne bouge que si vous la bougez.",
        "Le produit : choisir le jour, courir la semaine réelle, noter ce qui a changé.",
      ],
      de: [
        "Die meisten Trail-Wochen dürfen gewöhnlich sein. Gesprächspuls, eine Qualitätseinheit wenn frisch, ein Langer der in Minuten wächst.",
        "20 km: etwa zehn Wochen, lockeres Volumen, kurze Hügel, Langer Richtung 90–110 Min, sieben Tage Taper.",
        "Ein erster 50er will mehr Basis. Volle Empfehlung 24 Wochen. Kürzeres Fenster schreibt trotzdem einen dünneren Plan.",
        "Müdigkeit ist Trainingsinput. Schlaf weg? Qualität wird locker. Peak-Datum bleibt, bis du es verschiebst.",
        "Das Produkt: Tag wählen, die echte Woche laufen, notieren was sich änderte.",
      ],
    },
  },
  {
    slug: "trail-running-fatigue",
    goal: "trail20",
    title: {
      en: "Trail running fatigue: when the week should train less",
      fi: "Polkujuoksun väsymys: milloin viikko treenaa vähemmän",
      fr: "Fatigue en trail : quand la semaine doit moins entraîner",
      de: "Trailrunning-Müdigkeit: wann die Woche weniger trainieren soll",
    },
    description: {
      en: "Sleep, niggles, and a long from yesterday are training inputs. Tired means skip intervals. Wrecked means rest. The peak date stays.",
      fi: "Uni, nigglit ja eilinen pitkä ovat treenisyötteitä. Väsynyt = ei vetoja. Hajalla = lepo. Peak-päivä pysyy.",
      fr: "Sommeil, gènes et la longue d’hier sont des entrées. Fatigué = pas d’intervalles. Cassé = repos.",
      de: "Schlaf, Ziepen und der Lange von gestern sind Inputs. Müde = keine Intervalle. Kaputt = Pause.",
    },
    kicker: {
      en: "Ultra training load",
      fi: "Ultran kuorma",
      fr: "Charge d’entraînement ultra",
      de: "Ultra-Trainingslast",
    },
    body: {
      en: [
        "Fatigue is not a mood. It is last night’s sleep, yesterday’s long, a knee at 2/10. Those facts change Tuesday. They do not cancel the race.",
        "Ridgework uses four marks: fresh, fine, tired, wrecked. Fresh keeps the written week. Fine keeps load but does not add a second hard day. Tired turns hard and steady into easy. Wrecked turns them into rest; easy stays easy.",
        "This is how load monitoring is used in the endurance literature: as a planning input, not a diagnosis. If it feels like injury or illness, see a doctor. The app only changes the week.",
        "The mistake is doing the intervals because they were on the card. Commitment to a session is not fitness. The 77 km still happens if Tuesday is 50 minutes easy.",
      ],
      fi: [
        "Väsymys ei ole fiilis. Se on viime yön uni, eilinen pitkä, polvi 2/10. Ne muuttavat tiistain. Ne eivät peru kisaa.",
        "Neljä merkkiä: virkeä, ok, väsynyt, hajalla. Väsynyt tekee tehoista helppoa. Hajalla tekee niistä lepoa.",
        "Kuormaa käytetään suunnitteluun, ei diagnoosiin. Jos kyse on vammasta tai sairaudesta, mene lääkäriin. Sovellus muuttaa vain viikkoa.",
        "Virhe on tehdä vedot koska ne olivat kortilla. 77 km tapahtuu silti jos tiistai on 50 min helppoa.",
      ],
      fr: [
        "La fatigue n’est pas une humeur. C’est le sommeil, la longue d’hier, un genou à 2/10. Ça change mardi. Ça n’annule pas la course.",
        "Quatre marques : frais, correct, fatigué, cassé. Fatigué : le dur devient facile. Cassé : repos.",
        "La charge sert à planifier, pas à diagnostiquer. Blessure ou maladie: voyez un médecin. L’app ne change que la semaine.",
        "L’erreur est de faire les intervalles parce qu’ils étaient écrits. Les 77 km tiennent si mardi fait 50 min facile.",
      ],
      de: [
        "Müdigkeit ist keine Stimmung. Schlaf, Langer von gestern, Knie 2/10. Das ändert Dienstag. Das sagt das Rennen nicht ab.",
        "Vier Marken: frisch, okay, müde, kaputt. Müde macht hart zu locker. Kaputt macht Pause.",
        "Last ist Planung, keine Diagnose. Verletzung oder Krankheit: zum Arzt. Die App ändert nur die Woche.",
        "Der Fehler ist, Intervalle zu machen weil sie auf der Karte standen. Die 77 km halten, wenn Dienstag 50 Min locker ist.",
      ],
    },
  },
  {
    slug: "mountain-running-preparation",
    goal: "fifty",
    title: {
      en: "Mountain running preparation for an alpine day",
      fi: "Vuorijuoksun valmistelu alppipäivään",
      fr: "Préparation à la course en montagne pour une journée alpine",
      de: "Berglauf-Vorbereitung für einen Alpentag",
    },
    description: {
      en: "Conversational vert, a short specific block, taper into the forecast. The alpine day is the peak — not a hard Tuesday.",
      fi: "Nousua puhevauhdissa, lyhyt tarkempi jakso, kevennys säähän. Alppipäivä on huippu, ei tiistai.",
      fr: "D+ conversationnel, bloc spécifique court, taper vers la météo. La journée alpine est le pic — pas le mardi.",
      de: "Gesprächs-Hm, kurzer Specific, Taper in die Wetterlage. Der Alpentag ist der Peak — nicht Dienstag.",
    },
    kicker: {
      en: "Mountain running preparation",
      fi: "Vuorijuoksun valmistelu",
      fr: "Préparation montagne",
      de: "Berglauf-Vorbereitung",
    },
    body: {
      en: [
        "An alpine day is a training peak with a forecast attached. You want unused legs on the col, not a wrecked quality session two days out.",
        "Ridgework’s alpine-day program is about ten weeks: conversational climbing, one longer day, a short specific block, then taper into the weather window. Week 8 might be 1,200–1,800 m of vert at conversation pace. If the week is already tired, that becomes easy.",
        "Pack weight, start time, and layers belong in prep lists, not in a motivational paragraph. If sleep collapsed midweek, Tuesday vert is the trap — the mountain is still the peak.",
        "Multi-day routes and high-altitude expeditions stretch the same idea: hiking base, pack and back-to-backs, then sleep and kit as the taper. Day two is allowed to shrink so day three still has a reserve.",
      ],
      fi: [
        "Alppipäivä on treenihuippu johon liittyy ennuste. Haluat käyttämättömät jalat colilla, et hajotettua tehoa kaksi päivää ennen.",
        "Alppipäivä-ohjelma on noin kymmenen viikkoa: puhe-nousua, yksi pidempi päivä, lyhyt tarkempi jakso, kevennys säähän. Viikko 8 voi olla 1 200–1 800 m nousua puheella. Jos viikko on jo väsynyt, siitä tulee helppoa.",
        "Repun paino, lähtöaika ja kerrokset kuuluvat prep-listaan. Jos uni hajosi, tiistain vert on ansa — vuori on yhä peak.",
        "Usean päivän reitti ja korkealla tehtävä retkikunta venyttävät samaa: vaelluspohja, rinkka ja peräkkäiset päivät. Kevennys on uni ja pakkaaminen.",
      ],
      fr: [
        "Une journée alpine est un pic d’entraînement avec une météo. Vous voulez des jambes inutilisées au col, pas une séance dure deux jours avant.",
        "Le programme : environ dix semaines de D+ conversationnel, une journée plus longue, un bloc court, un taper vers la fenêtre météo.",
        "Le poids du sac, l’heure de départ et les couches vont dans les listes de prep. Si le sommeil casse, le D+ du mardi est le piège.",
        "Les raids et les expéditions en altitude étirent la même idée : base marche, sac et back-to-backs, taper = sommeil et matériel.",
      ],
      de: [
        "Ein Alpentag ist ein Trainingspeak mit Wetter. Unbenutzte Beine am Col, keine harte Einheit zwei Tage vorher.",
        "Programm: etwa zehn Wochen Gesprächs-Hm, ein längerer Tag, kurzer Specific, Taper ins Wetterfenster.",
        "Packgewicht, Startzeit und Lagen gehören in die Prep-Liste. Bricht der Schlaf, ist Dienstags-Hm die Falle.",
        "Mehrtagesrouten und Höhenexpeditionen dehnen dasselbe: Wanderbasis, Pack und Back-to-backs, Taper ist Schlaf und Kit.",
      ],
    },
  },
  {
    slug: "ultra-race-preparation-checklist",
    goal: "fifty",
    title: {
      en: "Ultra race preparation checklist for the last two weeks",
      fi: "Ultra-kisan checklist kahdelle viimeiselle viikolle",
      fr: "Checklist de préparation ultra pour les deux dernières semaines",
      de: "Ultra-Rennvorbereitung: Checkliste für die letzten zwei Wochen",
    },
    description: {
      en: "Taper volume, keep a little sharpness, practise fuel, write sleep. What the last 14 days look like before a 50 km or 100 km ultra.",
      fi: "Taper volyymi, pidä vähän terävyyttä, harjoittele tankkaus, kirjoita uni. Viimeiset 14 päivää ennen 50 tai 100 km.",
      fr: "Baisser le volume, garder un peu de vivacité, tester l’alimentation, écrire le sommeil. Les 14 derniers jours.",
      de: "Volumen runter, etwas Schärfe behalten, Verpflegung üben, Schlaf schreiben. Die letzten 14 Tage.",
    },
    kicker: {
      en: "Ultra race preparation checklist",
      fi: "Kisachecklist",
      fr: "Checklist course",
      de: "Renn-Checkliste",
    },
    body: {
      en: [
        "Taper is not rest-until-bored. Volume steps down. A little sharpness stays in short doses. You do not invent new sessions, new shoes, or new gels.",
        "Fourteen days out: cut the long, keep most days easy, protect sleep harder than you protect kilometres. Seven days out: one short sharpness if you are fresh — or skip it if you are not.",
        "Write the race fuel on paper: what you ate on the long that held, and the drink timing you already practised. Pack the kit you trained in.",
        "If a niggle is louder in taper week, flatten the remaining quality. Arriving intact is the point of the last two weeks. Ridgework’s taper blocks for 50 km and 80–120 km encode exactly that.",
      ],
      fi: [
        "Taper ei ole lepoa kyllästymiseen asti. Volyymi laskee. Vähän terävyyttä jää lyhyinä annoksina. Ei uusia vetoja, kenkiä tai geelejä.",
        "14 päivää: lyhennä pitkä, pidä päivät helppoina, suojaa unta kilometrejä kovemmin. 7 päivää: lyhyt terävyys jos olet virkeä — muuten ei.",
        "Kirjoita tankkaus paperille: mikä piti pitkällä, juonti, suola. Pakkaa kit jolla treenasit.",
        "Jos kolotus on kevennysviikolla äänekkäämpi, loput tehot jäävät pois. Perille ehjänä on näiden kahden viikon pointti.",
      ],
      fr: [
        "Le taper n’est pas du repos jusqu’à l’ennui. Le volume baisse. Un peu de vivacité reste en doses courtes. Pas de nouvelles séances, chaussures ou gels.",
        "J-14 : raccourcir la longue, garder le facile, protéger le sommeil. J-7 : une petite vivacité si vous êtes frais.",
        "Écrivez l’alimentation de course : ce qui a tenu sur la longue, le rythme de boisson. Le kit avec lequel vous vous êtes entraîné.",
        "Si une gène parle plus fort, enlevez la qualité restante. Arriver entier est le but.",
      ],
      de: [
        "Taper ist kein Ruhen bis zur Langeweile. Volumen runter. Etwas Schärfe in kurzen Dosen. Keine neuen Einheiten, Schuhe, Gele.",
        "14 Tage: Langen kürzen, locker bleiben, Schlaf härter schützen als Kilometer. 7 Tage: kurze Schärfe nur wenn frisch.",
        "Rennverpflegung aufschreiben: was auf dem Langen hielt, Trinkrhythmus. Kit aus dem Training.",
        "Wird das Ziepen lauter, fällt die restliche Qualität. Intakt ankommen ist der Punkt.",
      ],
    },
  },
  {
    slug: "aerobic-engine-low-heart-rate",
    goal: "trail20",
    title: {
      en: "Aerobic engine: more work at a low heart rate",
      fi: "Aerobinen moottori: lisää työtä matalalla sykkeellä",
      fr: "Moteur aérobie : plus de travail à basse fréquence cardiaque",
      de: "Aerober Motor: mehr Arbeit bei niedriger Herzfrequenz",
    },
    description: {
      en: "No race required. Conversational running, a long toward 90 minutes, fat as the default fuel. The engine is the quality.",
      fi: "Kisaa ei tarvita. Puhelenkki, pitkä kohti 90 min, rasva oletuspolttoaineena. Moottori on teho.",
      fr: "Pas besoin de course. Allure conversation, longue vers 90 min, graisse comme carburant par défaut.",
      de: "Kein Rennen nötig. Gesprächspuls, Langer Richtung 90 Min, Fett als Standardtreibstoff.",
    },
    kicker: {
      en: "Low-heart-rate training",
      fi: "Matalan sykkeen treeni",
      fr: "Entraînement basse FC",
      de: "Training bei niedriger HF",
    },
    body: {
      en: [
        "If you do not have a race, you still have a peak: a stronger aerobic engine. That means more minutes where you can speak in full sentences, and a long that grows toward 90 minutes without turning into a sufferfest.",
        "Ridgework’s engine program is sixteen weeks of that. No quality dose in the usual sense — the easy volume is the work. If you cannot speak, you are too fast.",
        "Fat as the default fuel is a pacing and fuelling habit on those easy days, not a diet religion. Eat normally. Keep the long conversational. Save sugar for when the outing actually needs it.",
        "This block is also the base under every other program. Extra weeks before a 50 km or a 100 km sit here. Season after season, this is what compounds.",
      ],
      fi: [
        "Jos ei ole kisaa, peak on silti: vahvempi aerobinen moottori. Enemmän minuutteja joilla saat kokonaisia lauseita, pitkä kohti 90 min ilman kärsimysnäytelmää.",
        "Moottoriohjelma on kuusitoista viikkoa sitä. Ei erillistä tehoa — helppo volyymi on työ. Jos et puhu, olet liian lujaa.",
        "Rasva oletuspolttoaineena on vauhti- ja tankkaustapa helppoina päivinä, ei dieettiuskonto.",
        "Tämä jakso on pohja kaikille muille ohjelmille. Ylimääräiset viikot ennen 50 tai 100 km istuvat tässä.",
      ],
      fr: [
        "Sans course, le pic reste : un moteur aérobie plus solide. Plus de minutes à l’allure conversation, une longue vers 90 min.",
        "Le programme moteur : seize semaines. Pas de séance qualité au sens habituel — le volume facile est le travail. Si vous ne parlez pas, vous allez trop vite.",
        "La graisse comme carburant par défaut est une habitude d’allure, pas une religion alimentaire.",
        "Ce bloc est aussi la base sous tous les autres programmes.",
      ],
      de: [
        "Ohne Rennen bleibt der Peak: ein stärkerer aerober Motor. Mehr Minuten im Gesprächspuls, Langer Richtung 90 Min.",
        "Motor-Programm: sechzehn Wochen. Keine Qualitätseinheit im üblichen Sinn — das lockere Volumen ist die Arbeit. Keine Sätze = zu schnell.",
        "Fett als Standardtreibstoff ist ein Tempo-Habit, keine Diätreligion.",
        "Dieser Block ist auch die Basis unter allen anderen Programmen.",
      ],
    },
  },
];

export function getGuide(slug: string): GuideCopy | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
