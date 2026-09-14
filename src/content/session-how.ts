import type { SessionKey } from "@/lib/rolling-plan";
import type { Locale } from "@/lib/locale";

export type SessionHow = {
  feel: string;
  do: string;
  swap: string;
  watch: string;
};

export const howLabels: Record<Locale, { feel: string; do: string; swap: string; watch: string }> = {
  en: { feel: "How it should feel", do: "Do this", swap: "Same session if you cannot run", watch: "Watch, or none" },
  fi: { feel: "Miltä sen pitää tuntua", do: "Tee näin", swap: "Sama treeni jos et juokse", watch: "Kello, tai ilman" },
  fr: { feel: "Ce que ça doit donner", do: "Faites ceci", swap: "Même séance sans courir", watch: "Montre, ou rien" },
  de: { feel: "So soll es sich anfühlen", do: "Mach das", swap: "Dieselbe Einheit ohne Laufen", watch: "Uhr, oder keine" },
};

export const sessionHowEn: Record<SessionKey, SessionHow> = {
  easy: {
    feel: "You can say a full sentence out loud. Breathing is quiet. The pace looks almost too slow. That is correct.",
    do: "Put on shoes you can walk in. Go outside. Start walking. If jogging still lets you talk, jog. If talking breaks, walk until you can talk again. Keep going until the minutes are done. Speed does not count. The clock does. If you have never trained, walk the whole time. That is the session.",
    swap: "Walk, hike a path, easy bike, or easy ski for the same minutes. 120 min walking = 120 min easy jogging = 120 min easy cycling. No gasping hills.",
    watch: "No watch: talk test. Watch: zone 1–2, roughly 60–75% of max heart rate. A phone timer is enough.",
  },
  engine: {
    feel: "Same as easy: full sentences. Heart rate stays low on purpose. You finish wanting a little more, not empty.",
    do: "Do the minutes at conversation pace. A walk/jog mix is fine. The point is more time at this pace, week after week, so the body learns to use fat as default fuel. Do not add sprints to make it count.",
    swap: "Walk, hike, bike, or ski. Same minutes. Flat or gentle grade. Treadmill walking at 3–6% incline counts.",
    watch: "Talk test, or zone 1. If the watch says you are slow, keep it. Slow is the work.",
  },
  recovery: {
    feel: "Easier than yesterday. Full sentences. Legs rinsing, not working.",
    do: "Shorter than a normal easy day. Walk more than you jog. Stop if anything is louder than a dull ache. This is not a hidden quality session.",
    swap: "Walk only, easy bike, or easy swim. Same minutes. No pack, no intervals.",
    watch: "Bottom of zone 1, or talk test. If you could hold a phone call, you are right.",
  },
  long: {
    feel: "Still conversational. Tired in the last third is normal. Gasping is not. Eat and drink as you already practised.",
    do: "This is time on feet. Start walking or very easy jogging. Take a walk break before talking breaks, not after. Carry water if it is over about 75 min. Do not test new shoes or new food today.",
    swap: "Hike the same minutes. Easy bike about 1.2× the minutes (90 min run ≈ 110 min easy bike). Mix walk and jog. Gentle trail hills are fine if you can still talk on them.",
    watch: "Zone 1–2 the whole time. If the long is 120 min and you have never gone over 40, do 60–75 min this time and walk the rest. Next long can grow.",
  },
  steady: {
    feel: "Short phrases only. Controlled. Not a race. You could hold this maybe 40–60 min, not hours.",
    do: "10 min easy walk/jog first. Then the written minutes at “I can answer, not tell a story.” 10 min easy to finish. If you have never done a harder day, skip this and do easy instead.",
    swap: "Uphill hike that still allows short phrases, or bike at that same breathing.",
    watch: "High zone 2 / low 3, about 75–85% max HR. No watch: you can answer a question, not tell a story.",
  },
  quality: {
    feel: "A few words. Breathing is loud. This is the only hard session this week.",
    do: "Warm up 15 min easy walking then jogging. Then quality: for example 5×3 min where talking is a few words, with 2 min walk between. Cool down 10 min walk. If you have never done intervals, do 4×1 min slightly quicker than easy, walk 2 min. Stop if a niggle gets worse.",
    swap: "Hill repeats: walk or jog up 60–90 sec, walk down. Same hard minutes. Bike intervals if you cannot run.",
    watch: "Zone 3–4 on the hard bits only. Easy bits stay easy. No watch: hard = a few words; rest = full sentences again.",
  },
  sharpness: {
    feel: "Short and snappy, not a new long run. You should talk again within a minute.",
    do: "Easy 10 min. Then 6–8 × 20–30 seconds a bit quicker, walk back. Easy 10 min. Never on wrecked legs.",
    swap: "Hill strides: 20 sec up, walk down. Or bike spin-ups. Short, then full recovery.",
    watch: "Ignore average HR. The 20 seconds are quick; the walk is easy.",
  },
  vert: {
    feel: "Uphill, but you can still talk. If the hill steals the sentence, slow down or walk.",
    do: "Find a hill, a treadmill at 6–12%, or a long climb on a path. Go up at conversation pace. Walk down or reset. Repeat until the minutes are done. Poles are allowed.",
    swap: "Stair walking, treadmill incline, or ski touring. Same minutes. A flat run is not this session.",
    watch: "Heart rate will rise on the grade. Trust the talk test more than the zone.",
  },
  hike: {
    feel: "Time on feet. You can talk. A light pack (water, jacket) is enough.",
    do: "Pick a path. Walk. If the path is easy you may jog the flats. Eat something if it is over 90 min. This is not a summit push.",
    swap: "Long walk in a park, treadmill incline walk, or easy trail. Same minutes.",
    watch: "Talk test. Watch optional. Time on the clock is the session.",
  },
  pack: {
    feel: "Heavier pack, still mostly talking. The extra weight is the work, not speed.",
    do: "Pack 6–10 kg (water bottles work). Walk the minutes on a path so you can talk. If you have never carried a pack, start at 4–6 kg.",
    swap: "A weighted vest walk, or a backpack with books. Same minutes. Do not run with a heavy pack.",
    watch: "Talk test. Heart rate sits a bit higher than an empty easy day. That is expected.",
  },
  mountain: {
    feel: "Hiking to the climb stays conversational. The climbing itself is its own effort, not a heart-rate zone.",
    do: "Use a line you already know, or a gym session plus a hike. Approach easy. Climb pitches or problems with rests. Descend with care. This is not a first-time unroped ridge.",
    swap: "No mountain: long hike with pack plus a climbing-gym session the same day or the day before. If you have never climbed, book a gym intro. Do not solo.",
    watch: "Ignore zones on the wall. Count quality pitches or problems, then stop while technique is still clean.",
  },
  climb: {
    feel: "Grip and skill, not jogging. Arms and fingers work. Legs can often still talk between efforts.",
    do: "Gym, rock, or ice. Warm up on easy problems or pitches. Then 4–8 harder efforts with full rest. Stop when moves get sloppy. If you have never climbed, a beginner gym session is this workout.",
    swap: "No wall: pull-ups, lock-offs, and rows, 30–40 min, not to failure on day one.",
    watch: "Do not chase heart-rate zones. Leave when technique breaks.",
  },
  strength: {
    feel: "Short and hard on the muscles, then done. You should walk home, not crawl.",
    do: "20–40 min. If you have never lifted: 2 rounds of 8 bodyweight squats, 5–8 knee push-ups or rows, 20 sec plank, 8 step-ups per leg. Rest a minute between moves. Next weeks add a little, not a new circus.",
    swap: "Gym if you have one. At home: pack as weight, a step, a towel for rows. No barbell needed.",
    watch: "Irrelevant. Count reps with clean form. Stop two reps before failure.",
  },
  rest: {
    feel: "Normal life. A little stiffness from yesterday is fine. Sharp pain is not.",
    do: "Do not train. Walk to the shop if you want. Sleep. Eat. Guilt is not a reason to add a run.",
    swap: "Easy 20 min walk only if sitting all day makes you worse. That walk is not making up a missed session.",
    watch: "Off. No zones.",
  },
};

export const sessionHowFi: Record<SessionKey, SessionHow> = {
  easy: {
    feel: "Saat sanottua kokonaisen lauseen ääneen. Hengitys on rauhallinen. Vauhti näyttää melkein liian hitaalta. Se on oikein.",
    do: "Kengät jalkaan, ulos. Aloita kävellen. Jos hölkkä sujuu niin että pystyt puhumaan, hölkkää. Jos puhe katkeaa, kävele kunnes puhe palaa. Jatka kunnes minuutit täyttyvät. Nopeus ei lasketa. Kello lasketaan. Jos et ole treenannut, kävele koko aika. Se on treeni.",
    swap: "Kävely, polku, helppo pyörä tai hiihto samoilla minuuteilla. 120 min kävelyä = 120 min hölkkää = 120 min helppoa pyörää. Ei hengästyttäviä mäkiä.",
    watch: "Ilman kelloa: puhetesti. Kellolla: vyöhyke 1–2, noin 60–75 % maksimisykkeestä. Puhelimen ajastin riittää.",
  },
  engine: {
    feel: "Sama kuin kevyt: kokonaisia lauseita. Syke pidetään matalana tarkoituksella. Lopetat niin että voisit jatkaa, et tyhjänä.",
    do: "Minuutit puhevauhdissa. Kävely/hölkkä-sekoitus käy. Pointti on lisää aikaa tällä vauhdilla viikko viikolta, jotta kroppa oppii käyttämään rasvaa. Älä lisää spurtteja jotta se tuntuisi treeniltä.",
    swap: "Kävely, vaellus, pyörä, hiihto. Samat minuutit. Tasainen tai loiva. Juoksumatolla 3–6 % kävely lasketaan.",
    watch: "Puhetesti tai vyöhyke 1. Jos kello sanoo että olet hidas, pidä se. Hidas on työ.",
  },
  recovery: {
    feel: "Helpompaa kuin eilen. Kokonaisia lauseita. Jalat huuhtoutuvat, eivät tee töitä.",
    do: "Lyhyempi kuin tavallinen kevyt. Kävele enemmän kuin hölkkäät. Lopeta jos jokin on pahempaa kuin tylsä jomotus. Tämä ei ole piilotettu teho.",
    swap: "Pelkkä kävely, helppo pyörä tai uinti. Samat minuutit. Ei rinkkaa, ei vetoja.",
    watch: "Vyöhykkeen 1 pohja tai puhetesti. Jos voisit puhua puhelimessa, olet oikein.",
  },
  long: {
    feel: "Yhä puhevauhtia. Viimeisessä kolmanneksessa väsymys on normaalia. Haukkova hengitys ei. Syö ja juo niin kuin olet jo harjoitellut.",
    do: "Aika jaloilla. Aloita kävellen tai hyvin hitaasti hölkäten. Kävelytauko ennen kuin puhe katkeaa, ei jälkeen. Vettä mukaan jos yli noin 75 min. Älä kokeile uusia kenkiä tai uutta ruokaa.",
    swap: "Vaella samat minuutit. Helppo pyörä noin 1,2× minuutit (90 min juoksu ≈ 110 min pyörää). Kävely+hölkkä. Loiva polku on parempi kuin rata, jos mäessäkin pystyy puhumaan.",
    watch: "Koko ajan vyöhyke 1–2. Jos pitkä on 120 min etkä ole mennyt yli 40:n, tee 60–75 min ja kävele loput. Seuraava pitkä saa kasvaa.",
  },
  steady: {
    feel: "Vain lyhyitä lauseita. Hallittua. Ei kisa. Tätä jaksaisi ehkä 40–60 min, ei tunteja.",
    do: "10 min helppoa kävelyä tai hölkkää. Sitten kirjoitetut minuutit vauhdilla vastaan, en kerro tarinaa. 10 min helppoa loppuun. Jos et ole tehnyt tehopäivää, jätä tämä ja tee kevyt.",
    swap: "Nousu jossa lyhyet lauseet vielä onnistuvat, tai pyörä samalla hengityksellä.",
    watch: "Korkea Z2 / matala Z3, noin 75–85 % max-syke. Ilman kelloa: vastaan kysymykseen, en kerro tarinaa.",
  },
  quality: {
    feel: "Muutama sana. Hengitys kuuluu. Viikon ainoa kova.",
    do: "Alkuun 15 min kävelyä sitten hölkkää. Sitten teho: esim. 5×3 min jolloin puhut muutaman sanan, välissä 2 min kävelyä. Loppuun 10 min kävely. Jos et ole tehnyt vetoja, tee 4×1 min hieman kevyttä napakammin, 2 min kävely. Lopeta jos kolotus pahenee.",
    swap: "Mäkivedot: 60–90 s ylös, kävely alas. Sama kova minuuttimäärä. Pyörävedot käyvät jos et juokse.",
    watch: "Tehoissa Z3–4, palautuksissa kevyt. Ilman kelloa: kova = muutama sana; palautus = taas kokonaisia lauseita.",
  },
  sharpness: {
    feel: "Lyhyt ja napakka, ei uusi pitkä. Minuutissa puhut taas.",
    do: "10 min helppoa. Sitten 6–8 × 20–30 s hieman napakammin, kävely takaisin. 10 min helppoa. Ei rikkinäisillä jaloilla.",
    swap: "Mäkirytinä 20 s ylös, kävely alas. Tai pyörän spinnit. Lyhyt, sitten täysi palautus.",
    watch: "Keskiarvosyke ei merkitse. 20 s napakka, kävely helppo.",
  },
  vert: {
    feel: "Ylämäkeä, mutta pystyt puhumaan. Jos mäki vie lauseen, hidasta tai kävele.",
    do: "Etsi mäki, juoksumatto 6–12 % tai pitkä nousu. Ylös puhevauhtia. Alas kävellen. Toista kunnes minuutit täyttyvät. Sauvat sallittu.",
    swap: "Porraskävely, maton nousu tai hiihto. Samat minuutit. Tasainen juoksu ei ole tämä treeni.",
    watch: "Syke nousee mäessä. Luota puheeseen enemmän kuin vyöhykkeeseen.",
  },
  hike: {
    feel: "Aika jaloilla. Pystyt puhumaan. Kevyt rinkka (vesi, takki) riittää.",
    do: "Valitse polku. Kävele. Tasaisella saat hölkätä. Yli 90 min: ota evästä. Tämä ei ole huippuponnistus.",
    swap: "Pitkä kävely puistossa, maton nousukävely tai helppo polku. Samat minuutit.",
    watch: "Puhetesti. Kello vapaaehtoinen. Aika on treeni.",
  },
  pack: {
    feel: "Raskaampi rinkka, yhä enimmäkseen puhetta. Paino on työ, ei vauhti.",
    do: "Rinkkaan 6–10 kg (vesipullot käyvät). Kävele minuutit polulla niin että pystyt puhumaan. Jos et ole kantanut, aloita 4–6 kg.",
    swap: "Painoliivi tai rinkka jossa kirjoja. Samat minuutit. Älä juokse raskaalla rinkalla.",
    watch: "Puhetesti. Syke on hieman korkeampi kuin tyhjällä kevyellä. Se on odotettua.",
  },
  mountain: {
    feel: "Nousu kiipeilyyn puhevauhtia. Itse kiipeily on oma ponnistus, ei sykevyöhyke.",
    do: "Valitse reitti jonka tunnet, tai sali plus vaellus. Lähestyminen kevyttä. Kiivetään pätkissä, palautetaan. Alas varovasti. Tämä ei ole ensimmäinen köydetön harjanne.",
    swap: "Jos ei ole vuorta: pitkä rinkkavaellus plus kiipeilysali samana tai edellisenä päivänä. Jos et ole kiivennyt, varaa salin alkeet. Älä sooloa.",
    watch: "Seinällä ei vyöhykkeitä. Laske laadukkaat pätkät ja lopeta kun tekniikka on vielä siisti.",
  },
  climb: {
    feel: "Ote ja taito, ei hölkkä. Kädet ja sormet tekevät. Jalat voivat puhua ponnistusten välissä.",
    do: "Kiipeilysali, kallio tai jää. Alkuun helppoja. Sitten 4–8 kovempaa, täysi lepo välissä. Lopeta kun liikkeet sottaantuvat. Jos et ole kiivennyt, alkeet salilla on tämä treeni.",
    swap: "Ei seinää: leuät, lukot ja soudut 30–40 min, ei uupumukseen ensimmäisellä kerralla.",
    watch: "Älä jahtaa sykettä. Lopeta kun tekniikka hajoaa.",
  },
  strength: {
    feel: "Lyhyt ja lihaksille kova, sitten ohi. Kävelet kotiin, et ryömi.",
    do: "20–40 min. Jos et ole nostanut: 2 kierrosta 8 kyykkyä, 5–8 polvipunnerrusta tai soutua, 20 s lankku, 8 askelnousua per jalka. Minuutti lepoa liikkeiden välissä. Seuraavilla viikoilla lisää vähän.",
    swap: "Sali jos on. Kotona: rinkka painoksi, porras, pyyhe soutuun. Tankoa ei tarvita.",
    watch: "Ei merkitse. Laske toistot puhtaalla tekniikalla. Lopeta kaksi toistoa ennen uupumusta.",
  },
  rest: {
    feel: "Tavallinen päivä. Pieni jäykkyys eilisestä on ok. Terävä kipu ei.",
    do: "Älä treenaa. Kävele kauppaan jos haluat. Nuku. Syö. Syyllisyys ei ole syy lisätä lenkkiä.",
    swap: "Helppo 20 min kävely vain jos istuminen tekee olon pahemmaksi. Se ei ole korvaus väliin jääneestä.",
    watch: "Kiinni. Ei vyöhykkeitä.",
  },
};

export const sessionHowFr: Record<SessionKey, SessionHow> = {
  easy: {
    feel: "Vous dites une phrase complète à voix haute. La respiration est calme. L’allure paraît trop lente. C’est correct.",
    do: "Chaussures de marche. Sortez. Commencez à marcher. Si le footing laisse parler, trottez. Si la phrase casse, marchez. Continuez jusqu’aux minutes. La vitesse ne compte pas. L’horloge oui. Jamais entraîné : marchez tout le temps. C’est la séance.",
    swap: "Marche, sentier, vélo facile ou ski, mêmes minutes. 120 min de marche = 120 min de footing facile = 120 min de vélo facile.",
    watch: "Sans montre : test de parole. Avec : zone 1–2, ~60–75 % FC max. Un minuteur de téléphone suffit.",
  },
  engine: {
    feel: "Comme le facile : phrases complètes. Le pouls reste bas exprès.",
    do: "Les minutes à l’allure conversation. Marche/footing OK. Le but est plus de temps à cette allure, semaine après semaine. Pas de sprints pour que ça compte.",
    swap: "Marche, rando, vélo, ski. Mêmes minutes. Tapis 3–6 % en marche compte.",
    watch: "Test de parole, ou zone 1. Lent = le travail.",
  },
  recovery: {
    feel: "Plus facile qu’hier. Phrases complètes.",
    do: "Plus court qu’un facile normal. Marchez plus que vous ne trottez. Stop si ça devient pire qu’une gêne sourde.",
    swap: "Marche seule, vélo facile ou nage. Mêmes minutes.",
    watch: "Bas de zone 1, ou test de parole.",
  },
  long: {
    feel: "Encore conversationnel. Fatigué au dernier tiers : normal. Haleter : non.",
    do: "Temps sur les pieds. Marche ou footing très facile. Pause marche avant que la phrase casse. Eau si > ~75 min. Pas de nouvelles chaussures ni de nouvel aliment.",
    swap: "Rando les mêmes minutes. Vélo facile ≈ 1,2× (90 min course ≈ 110 min vélo).",
    watch: "Zone 1–2 tout du long. Si 120 min et jamais plus de 40 : 60–75 min cette fois, le reste à pied.",
  },
  steady: {
    feel: "Phrases courtes. Contrôlé. Pas une course.",
    do: "10 min facile. Puis les minutes à “je réponds, je ne raconte pas”. 10 min facile. Jamais fait dur : faites facile.",
    swap: "Montée où les phrases courtes restent, ou vélo à la même respiration.",
    watch: "Haut Z2 / bas Z3, ~75–85 % FC max.",
  },
  quality: {
    feel: "Quelques mots. Respiration forte. Seule séance dure de la semaine.",
    do: "15 min facile. Puis 5×3 min quelques mots, 2 min marche. 10 min marche. Jamais d’intervalles : 4×1 min un peu plus vite, 2 min marche.",
    swap: "Côtes 60–90 s, marche descente. Intervalles vélo si vous ne courez pas.",
    watch: "Z3–4 sur le dur seulement.",
  },
  sharpness: {
    feel: "Court et vif. Vous reparlez dans la minute.",
    do: "10 min facile. 6–8 × 20–30 s un peu plus vite, marche retour. 10 min facile.",
    swap: "20 s de côte, marche descente. Ou spins vélo.",
    watch: "Ignorez la FC moyenne.",
  },
  vert: {
    feel: "En montée, vous parlez encore. Sinon, ralentissez.",
    do: "Côte, tapis 6–12 %, ou longue montée. Montez en parlant. Descendez à pied. Répétez jusqu’aux minutes.",
    swap: "Escaliers, tapis en pente, ski de rando. Une course plate n’est pas cette séance.",
    watch: "La FC monte. Fiez-vous à la parole.",
  },
  hike: {
    feel: "Temps sur les pieds. Vous parlez. Sac léger (eau, veste).",
    do: "Choisissez un sentier. Marchez. Trottez le plat si c’est facile. Mangez si > 90 min.",
    swap: "Longue marche au parc, tapis en pente, sentier facile.",
    watch: "Test de parole. L’horloge est la séance.",
  },
  pack: {
    feel: "Sac plus lourd, encore surtout de la parole. Le poids est le travail.",
    do: "6–10 kg (bouteilles). Marchez en parlant. Jamais porté : 4–6 kg.",
    swap: "Gilet lesté ou sac de livres. Ne courez pas avec un sac lourd.",
    watch: "Test de parole. FC un peu plus haute : normal.",
  },
  mountain: {
    feel: "L’approche reste conversationnelle. L’escalade est un effort à part.",
    do: "Une ligne que vous connaissez, ou salle plus rando. Approche facile. Longueurs avec repos. Descente soignée. Pas une arête sans corde pour la première fois.",
    swap: "Longue rando sac + séance salle. Jamais grimpé : intro en salle. Pas de solo.",
    watch: "Ignorez les zones au mur.",
  },
  climb: {
    feel: "Prise et technique, pas un footing.",
    do: "Salle, rocher ou glace. Échauffement facile. 4–8 efforts plus durs, repos complet. Stop quand ça devient sale. Jamais grimpé : intro salle = cette séance.",
    swap: "Tractions, blocages, rowing 30–40 min, pas à l’échec le premier jour.",
    watch: "Ne chassez pas la FC.",
  },
  strength: {
    feel: "Court et dur pour les muscles, puis fini. Vous rentrez à pied.",
    do: "20–40 min. Jamais soulevé : 2 tours de 8 squats, 5–8 pompes genoux ou rowing, 20 s planche, 8 step-ups par jambe.",
    swap: "Salle, ou sac comme poids, une marche, une serviette. Pas besoin de barre.",
    watch: "Comptez des reps propres. Stop deux reps avant l’échec.",
  },
  rest: {
    feel: "Journée normale. Raideur légère OK. Douleur vive non.",
    do: "Pas d’entraînement. Magasin à pied si vous voulez. Dormez. Mangez.",
    swap: "20 min de marche seulement si rester assis empire. Ce n’est pas un rattrapage.",
    watch: "Éteint.",
  },
};

export const sessionHowDe: Record<SessionKey, SessionHow> = {
  easy: {
    feel: "Du sagst einen ganzen Satz laut. Atmung ruhig. Das Tempo wirkt zu langsam. Das ist richtig.",
    do: "Schuhe an, raus. Losgehen. Joggen nur, wenn du noch reden kannst. Satz weg: gehen, bis er zurück ist. Bis die Minuten voll sind. Tempo zählt nicht. Die Uhr zählt. Noch nie trainiert: die ganze Zeit gehen. Das ist die Einheit.",
    swap: "Gehen, Weg, lockeres Rad oder Ski, gleiche Minuten. 120 Min Gehen = 120 Min lockeres Joggen = 120 Min lockeres Rad.",
    watch: "Ohne Uhr: Sprechtest. Mit: Zone 1–2, ~60–75 % max HF. Handy-Timer reicht.",
  },
  engine: {
    feel: "Wie locker: volle Sätze. Puls absichtlich niedrig.",
    do: "Die Minuten im Gesprächstempo. Gehen/Joggen-Mix ist okay. Mehr Zeit in diesem Tempo, Woche für Woche. Keine Sprints, damit es sich nach Training anfühlt.",
    swap: "Gehen, Wandern, Rad, Ski. Gleiche Minuten. Laufband 3–6 % Gehen zählt.",
    watch: "Sprechtest oder Zone 1. Langsam ist die Arbeit.",
  },
  recovery: {
    feel: "Leichter als gestern. Volle Sätze.",
    do: "Kürzer als ein normales lockeres. Mehr gehen als joggen. Stopp, wenn es schlimmer als ein dumpfes Ziehen ist.",
    swap: "Nur gehen, lockeres Rad oder Schwimmen. Gleiche Minuten.",
    watch: "Unteres Zone 1 oder Sprechtest.",
  },
  long: {
    feel: "Noch gesprächig. Müde im letzten Drittel: normal. Keuchen: nicht.",
    do: "Zeit auf den Füßen. Gehen oder sehr lockeres Joggen. Gehpause, bevor der Satz bricht. Wasser ab ~75 Min. Keine neuen Schuhe, kein neues Essen.",
    swap: "Wandern gleiche Minuten. Lockeres Rad ≈ 1,2× (90 Min Lauf ≈ 110 Min Rad).",
    watch: "Zone 1–2 die ganze Zeit. 120 Min und nie über 40: diesmal 60–75 Min, Rest gehen.",
  },
  steady: {
    feel: "Nur kurze Sätze. Kontrolliert. Kein Rennen.",
    do: "10 Min locker. Dann die Minuten auf „ich antworte, erzähle nicht“. 10 Min locker. Noch nie hart: mach locker.",
    swap: "Anstieg mit kurzen Sätzen, oder Rad mit derselben Atmung.",
    watch: "Hohe Z2 / niedrige Z3, ~75–85 % max HF.",
  },
  quality: {
    feel: "Wenige Worte. Laute Atmung. Einzige harte Einheit der Woche.",
    do: "15 Min locker. Dann 5×3 Min wenige Worte, 2 Min gehen. 10 Min gehen. Noch nie Intervalle: 4×1 Min etwas quicker, 2 Min gehen.",
    swap: "Hügel 60–90 s, runtergehen. Radintervalle, wenn du nicht läufst.",
    watch: "Z3–4 nur in den harten Stücken.",
  },
  sharpness: {
    feel: "Kurz und knackig. Innerhalb einer Minute wieder reden.",
    do: "10 Min locker. 6–8 × 20–30 s etwas quicker, zurückgehen. 10 Min locker.",
    swap: "20 s hügeln, runtergehen. Oder Rad-Spins.",
    watch: "Durchschnitts-HF ignorieren.",
  },
  vert: {
    feel: "Bergauf, du redest noch. Sonst langsamer.",
    do: "Hügel, Laufband 6–12 %, oder langer Anstieg. Rauf im Gespräch. Runtergehen. Bis die Minuten voll sind.",
    swap: "Treppen, Steigung, Skitour. Flacher Lauf ist nicht diese Einheit.",
    watch: "HF steigt. Dem Sprechen vertrauen.",
  },
  hike: {
    feel: "Zeit auf den Füßen. Du redest. Leichter Pack (Wasser, Jacke).",
    do: "Weg wählen. Gehen. Flach joggen, wenn es leicht ist. Essen ab 90 Min.",
    swap: "Langer Parkspaziergang, Steigungslaufband, lockerer Trail.",
    watch: "Sprechtest. Die Uhr ist die Einheit.",
  },
  pack: {
    feel: "Schwererer Pack, noch meistens reden. Das Gewicht ist die Arbeit.",
    do: "6–10 kg (Flaschen). Gehen und reden. Nie getragen: 4–6 kg.",
    swap: "Gewichtsweste oder Bücher-Rucksack. Nicht mit schwerem Pack laufen.",
    watch: "Sprechtest. HF etwas höher: erwartet.",
  },
  mountain: {
    feel: "Zustieg gesprächig. Klettern ist eigene Arbeit.",
    do: "Eine Linie, die du kennst, oder Halle plus Wanderung. Zustieg locker. Seillängen mit Pausen. Abstieg vorsichtig. Kein erster ungesicherter Grat.",
    swap: "Lange Packwanderung plus Halle. Nie geklettert: Hallen-Intro. Kein Solo.",
    watch: "Zonen an der Wand ignorieren.",
  },
  climb: {
    feel: "Griff und Technik, kein Joggen.",
    do: "Halle, Fels oder Eis. Warm-up leicht. 4–8 härtere Züge, volle Pause. Stopp, wenn es schlampig wird. Nie geklettert: Hallen-Intro ist diese Einheit.",
    swap: "Klimmzüge, Lock-offs, Rudern 30–40 Min, nicht bis zum Versagen am ersten Tag.",
    watch: "Keine HF-Jagd.",
  },
  strength: {
    feel: "Kurz und hart für die Muskeln, dann fertig. Du gehst nach Hause.",
    do: "20–40 Min. Nie gehoben: 2 Runden 8 Kniebeugen, 5–8 Knie-Liegestütze oder Rudern, 20 s Plank, 8 Step-ups pro Bein.",
    swap: "Gym, oder Pack als Gewicht, eine Stufe, ein Handtuch. Keine Langhantel nötig.",
    watch: "Saubere Wiederholungen. Zwei vor dem Versagen stoppen.",
  },
  rest: {
    feel: "Normaler Tag. Leichte Steifheit OK. Scharfer Schmerz nicht.",
    do: "Nicht trainieren. Zum Laden gehen, wenn du willst. Schlafen. Essen.",
    swap: "20 Min gehen nur, wenn Sitzen schlechter macht. Das ist kein Nachholen.",
    watch: "Aus.",
  },
};

export const sessionHowByLocale: Record<Locale, Record<SessionKey, SessionHow>> = {
  en: sessionHowEn,
  fi: sessionHowFi,
  fr: sessionHowFr,
  de: sessionHowDe,
};
