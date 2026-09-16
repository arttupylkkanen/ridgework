import type { PrepPhase, PrepSectionId } from "@/lib/mountain-prep";

export type MountainPrepCopy = {
  tab: string;
  kicker: string;
  title: string;
  lead: string;
  unnamed: string;
  daysLeft: string;
  daysAgo: string;
  todayIs: string;
  recWeeks: string;
  progress: string;
  phases: Record<PrepPhase, { title: string; body: string }>;
  sections: Record<PrepSectionId, { title: string; lead: string }>;
  weatherTitle: string;
  weatherLead: string;
  precip: string;
  precipOpts: { none: string; rain: string; snow: string; mix: string };
  wind: string;
  windOpts: { calm: string; breeze: string; strong: string };
  freezeM: string;
  items: Record<string, { label: string; why: string }>;
  prompts: Record<string, string>;
  debriefResult: string;
  debriefConfidence: string;
  saveDebrief: string;
  savedDebrief: string;
  savedPassport: string;
  safety: string;
};

const enItems: MountainPrepCopy["items"] = {
  "fitness.window": {
    label: "{remaining} weeks on the calendar. Ridgework’s full build for this objective is {rec}.",
    why: "The date is yours. A thinner window still writes a plan. It does not invent fitness.",
  },
  "fitness.thinWindow": {
    label: "This is a thinner build than the {rec}-week suggestion.",
    why: "Cut base first. Do not stack extra quality to ‘catch up’ in the last weeks.",
  },
  "fitness.fullWindow": {
    label: "The window still looks like a full build.",
    why: "That is not a promise you will feel ready. It means the written weeks can still do their job.",
  },
  "fitness.longestGap": {
    label:
      "Your longest outing band is about {longest} min. A typical day here runs closer to {typical} min.",
    why: "Use the remaining weeks for a closer rehearsal. The peak day is a poor place to jump duration.",
  },
  "fitness.longestOk": {
    label:
      "Your longest outing band ({longest} min) is in range of a typical day (~{typical} min).",
    why: "Keep one long that stays conversational. Tired still shortens it.",
  },
  "fitness.tiredWeeks": {
    label: "{n} weeks already came in tired and went to extra easy.",
    why: "That is the method working. The peak date did not move. Fitness is the weeks you actually absorbed.",
  },
  "fitness.beginner": {
    label: "Keep the day inside work you have already practised.",
    why: "New shoes, new fuel, new night running, new crampons: pick one experiment, and not on the peak day.",
  },
  "fitness.alpineSkill": {
    label:
      "Aerobic weeks are not enough. Specific weeks need climbing or strength, not only hiking.",
    why: "Pitches are work. A tired week still turns them down. The mountain day is not the place to learn a new system.",
  },
  "fitness.engineAerobic": {
    label: "The job is easy volume at a pace you can talk.",
    why: "Low-heart-rate work is the point. Save the hard session for another objective.",
  },
  "fitness.taperHonest": {
    label: "This week is quieter on purpose.",
    why: "Do not add a last hard day because you feel fresh. Fresh is the taper working.",
  },
  "fitness.rehearseDay": {
    label: "Put one training day on similar terrain, kit, and food.",
    why: "A dress rehearsal tells you more than another quality session.",
  },
  "equipment.shoes": {
    label: "Shoes that have already done a long on this terrain.",
    why: "New foam on the day is a common way to lose toenails or a season.",
  },
  "equipment.pack": {
    label: "Pack loaded as you will carry it, including water.",
    why: "A race vest or alpine pack that you only packed on the morning sits differently.",
  },
  "equipment.polesOwned": {
    label: "Poles you already used on a long. Baskets that match the ground.",
    why: "You listed poles. Practise the stow, not only the plant.",
  },
  "equipment.polesOptional": {
    label: "Poles are optional. If they come, they have been on a long already.",
    why: "You did not list poles. Borrowed sticks on the day are extra work.",
  },
  "equipment.nightKit": {
    label: "Headlamp, spare cells, and a layer you can put on with cold hands.",
    why: "Night on a 100 km or a traverse is ordinary. Test the lamp on a dark easy run.",
  },
  "equipment.cramponsOwned": {
    label: "Crampons fitted to these boots, practised on a slope you already know.",
    why: "You listed crampons. The day is not the first time they go on.",
  },
  "equipment.cramponsMissing": {
    label: "No crampons on your profile. Pick a snow-free line, or add them and practise.",
    why: "Ridgework will not pretend a summer trail shoe is enough on hard snow.",
  },
  "equipment.axeOwned": {
    label: "Axe (or tool) you have already used for self-arrest practice.",
    why: "You listed an ice axe. A leash and a dry run beat a new tool on the ridge.",
  },
  "equipment.axeMissing": {
    label: "No ice axe listed. Stay off sustained snow slopes, or add an axe and practise.",
    why: "A trekking pole is not an arrest tool.",
  },
  "equipment.harness": {
    label: "Harness, belay device, a few lockers, and a plan for the actual route.",
    why: "Carry what the line needs. A full rack ‘just in case’ is how the day gets slow.",
  },
  "equipment.nav": {
    label: "Map or GPS track plus a battery plan. Someone else knows the line.",
    why: "Cloud on a ridge is ordinary. A screenshot in airplane mode is not a plan.",
  },
  "equipment.expeditionCamp": {
    label: "Sleep system, stove, and repair kit you have already slept in.",
    why: "A new tent at 4,000 m is a long night. Test the stove with the fuel you will buy there.",
  },
  "equipment.lightKit": {
    label: "Keep it light: shoes, one layer, water. This is not a mountain rack.",
    why: "Extra kit you do not use is just weight on an easy or short day.",
  },
  "equipment.snowNoCrampons": {
    label: "Forecast has snow and you have no crampons listed.",
    why: "Change the line, postpone, or practise the ice kit. Do not invent a dry trail.",
  },
  "clothing.writeForecast": {
    label: "Write tomorrow’s forecast in the fields above before you pack.",
    why: "A generic ‘layers’ list without numbers is how people overpack or freeze.",
  },
  "clothing.baseLayer": {
    label: "A shirt you can hike or run in, plus one thing you can add without stopping long.",
    why: "The base is the day. Spare warmth is for the stop, the summit, or the night.",
  },
  "clothing.rainShell": {
    label: "A shell that actually blocks rain, packed where you can reach it.",
    why: "A fashion jacket in the bottom of the pack is a wet hour.",
  },
  "clothing.snowKit": {
    label: "Snow in the forecast: gloves you can use with an axe or poles, and eye protection.",
    why: "Wet gloves and hard snow is how hands stop working.",
  },
  "clothing.wind": {
    label: "Strong wind: a true wind layer, not only a mesh vest.",
    why: "Ridges steal heat even on a ‘nice’ number in the valley.",
  },
  "clothing.alpineSpare": {
    label: "One spare warm piece and spare gloves in a dry bag.",
    why: "The spare is for the stop or the partner, not for starting cold.",
  },
  "clothing.freezeLevel": {
    label: "Freeze level around {freeze} m. Compare that to the route, not the car park.",
    why: "Soft snow below and hard snow above is a crampon question, not a vibe.",
  },
  "clothing.nightChange": {
    label: "A dry shirt for the night hours, even if the start is hot.",
    why: "100 km days go through a sunset. A wet shirt at 2 a.m. is the whole problem.",
  },
  "nutrition.engineFat": {
    label: "Eat ordinary food. The point of this block is to work on fat, not on gels.",
    why: "If you need sugar to finish an easy hour, the easy hour was not easy.",
  },
  "nutrition.enginePractised": {
    label: "Breakfast you already used on a long easy day.",
    why: "New porridge on a teaching-the-body week is noise.",
  },
  "nutrition.shortRace": {
    label: "A bottle you have used, and one snack you do not have to think about.",
    why: "20 km is not a gut experiment. Water and something you like is enough.",
  },
  "nutrition.gutTraining": {
    label: "Carb and fluid amounts you have already held on a long.",
    why: "Race-day guts do not magically accept a new brand.",
  },
  "nutrition.nothingNew": {
    label: "Nothing new on the day: drink, gel, bar, or caffeine.",
    why: "The long runs were the test. The peak day is a repeat.",
  },
  "nutrition.nightFood": {
    label: "Food you can eat at 2 a.m. when chewing feels stupid.",
    why: "Soft, salty, practised. A new ‘real food’ experiment at km 80 is a DNF pattern.",
  },
  "nutrition.alpineSimple": {
    label: "Food you can open with gloves. Water that will not freeze in the lid.",
    why: "A summit sandwich you cannot unwrap is just weight.",
  },
  "nutrition.multiDayFood": {
    label: "Day bags packed per day, plus one reserve meal.",
    why: "Hut closures and slow days are ordinary. Hunger on day three is a planning miss.",
  },
  "nutrition.expeditionEat": {
    label: "Eat on rotation days even when the appetite drops.",
    why: "Altitude steals hunger. Forcing simple calories is part of the work, not a race tactic.",
  },
  "logistics.turnaround": {
    label: "A turnaround time written before you leave, and a partner who will keep it.",
    why: "The summit is optional. The walk-off in daylight is not.",
  },
  "logistics.bail": {
    label: "A bail line you could actually follow in cloud.",
    why: "‘We will figure it out’ is not a descent.",
  },
  "logistics.aidOrDrop": {
    label: "Aid stations or drop bags listed, with what is in each.",
    why: "A bag with ‘stuff’ is how you stand still for twenty minutes.",
  },
  "logistics.crewOrSolo": {
    label: "If someone is meeting you, they have a time window and a plan if you are late.",
    why: "Crew is logistics, not a surprise party.",
  },
  "logistics.travelToStart": {
    label: "How you get to the start, including a buffer for a missed connection.",
    why: "The taper is wasted on a 3 a.m. drive you did not need.",
  },
  "logistics.workTravel": {
    label: "Work travel sits on this calendar. Protect sleep the two nights before.",
    why: "You marked a heavy travel life. The day does not care about the airport.",
  },
  "logistics.familyCover": {
    label: "Cover at home is named, including if you finish late.",
    why: "You marked young kids. A vague ‘it should be fine’ is how the day starts already tired.",
  },
  "logistics.sleepBefore": {
    label: "Shift work: the night before is treated as part of the event.",
    why: "You cannot out-train a short night on the start line.",
  },
  "logistics.reserveDay": {
    label: "A reserve weather day on a traverse, not a packed itinerary with zero slack.",
    why: "The range does not owe you a window on the day you booked the train.",
  },
  "logistics.permits": {
    label: "Permits, peak fees, and liaison contacts in one place, on paper as well as a phone.",
    why: "A dead battery at a checkpoint is a season.",
  },
  "logistics.partnerPlan": {
    label: "Who is on the rope, who makes the call to turn, and how you get off.",
    why: "A team that has not said this out loud will say it too late.",
  },
  "logistics.printedPlan": {
    label: "The written week and the day plan live on paper in the pack.",
    why: "Phones die. The plan should not.",
  },
  "altitude.notDiagnosis": {
    label:
      "Ridgework does not diagnose altitude illness. Descent and qualified care beat any checklist.",
    why: "A score or a ‘ready’ label would be theatre. This is a reminder of the actual work.",
  },
  "altitude.rotations": {
    label: "Sleep lower than you climbed. Rotations are the acclimatisation, not a single push.",
    why: "A rushed summit from a low sleep is a classic way to get sent down.",
  },
  "altitude.sleepHigh": {
    label: "Do not plan a first night at a new high camp after a huge carry.",
    why: "Arrive, melt snow, eat, sleep. The ridge can wait one morning.",
  },
  "altitude.descend": {
    label:
      "Worsening headache with effort, ataxia, or wet breathing: down, then professional care.",
    why: "That is not a Ridgework call. It is the only call that matters.",
  },
  "altitude.dayHigh": {
    label: "Go high, sleep lower if you can. The car park is not the same as the col.",
    why: "A long alpine day still has an altitude cost even if you sleep in the valley.",
  },
  "altitude.drinkEat": {
    label: "Drink and eat on a schedule, because thirst lies higher up.",
    why: "This is logistics, not a medical protocol.",
  },
  "altitude.notAnIssue": {
    label: "This objective is not an altitude problem unless the course itself is high.",
    why: "Skip the AMS theatre. Pack for the terrain you named.",
  },
  "debrief.writeSameDay": {
    label: "Write the debrief the same day, while the food choice and the weather are still true.",
    why: "A week later you will remember the summit and forget the 4 p.m. bonk.",
  },
  "debrief.whatWorked": {
    label: "Name one thing you would repeat without thinking.",
    why: "That is the next season’s default, not a mood.",
  },
  "debrief.whatBroke": {
    label: "Name one thing that actually broke: kit, fuel, timing, or a story you told yourself.",
    why: "Vague ‘I should be fitter’ is not a lesson.",
  },
  "debrief.wouldTurn": {
    label: "Would you have turned around earlier? Write the time you would use next time.",
    why: "Alpine days are won on the way down.",
  },
};

const enPrompts: MountainPrepCopy["prompts"] = {
  "nutrition.carbsPerHour": "Carb target you already held on a long (g/h, your number)",
  "logistics.startTime": "Start time leaving the car / hut / gun",
  "logistics.turnaroundTime": "Turnaround time (on the watch, not ‘we will see’)",
  "altitude.sleepElevation": "Sleep elevation this block (m), if you know it",
};

export const mountainEn: MountainPrepCopy = {
  tab: "The day",
  kicker: "Before you leave",
  title: "The day itself",
  lead: "Training gets you to the morning. This page is the morning: kit, weather, food, the way home, and what you write when it is over. It follows your objective and the kit you said you own.",
  unnamed: "Your peak day",
  daysLeft: "{n} days out",
  daysAgo: "{n} days since",
  todayIs: "The day is today",
  recWeeks: "Suggested full build: {n} weeks",
  progress: "{done} of {total} ticked",
  phases: {
    build: {
      title: "Still in the build",
      body: "Rehearse kit and food on ordinary weeks. Do not save the first time for the peak morning.",
    },
    approach: {
      title: "Three weeks or less",
      body: "Lock the kit. Confirm travel. The written weeks get more specific. New experiments stop.",
    },
    week: {
      title: "The week of",
      body: "Quieter training, real forecast, packed bags. Fresh is the point.",
    },
    day: {
      title: "The morning",
      body: "Forecast, start time, turnaround if it is a mountain, food you already trust.",
    },
    after: {
      title: "After",
      body: "Write the debrief while it is true. That note is next season’s advantage.",
    },
  },
  sections: {
    fitness: {
      title: "Fitness, honestly",
      lead: "What the calendar and your longest outings actually say. Not a medical pass.",
    },
    equipment: {
      title: "Kit for this objective",
      lead: "Built from the objective and the gear you listed. Missing ice kit stays missing until you add it.",
    },
    clothing: {
      title: "Clothes against this forecast",
      lead: "Fill the numbers. The list changes. A generic ‘layers’ pile is how people overpack.",
    },
    nutrition: { title: "Food and water", lead: "Practised amounts. Nothing new on the day." },
    logistics: {
      title: "Getting there and off",
      lead: "Start, travel, family cover, a way down. The boring things that end days.",
    },
    altitude: {
      title: "If the day goes high",
      lead: "Descent and qualified care. Ridgework will not pretend to be a doctor.",
    },
    debrief: {
      title: "After the outing",
      lead: "One page for the coach, the partner, or next season. Save it into your passport if you want.",
    },
  },
  weatherTitle: "Forecast you are packing for",
  weatherLead:
    "Valley numbers lie. Write what you will actually meet on the ridge or the last climb.",
  precip: "Precipitation",
  precipOpts: { none: "Dry", rain: "Rain", snow: "Snow", mix: "Mix" },
  wind: "Wind",
  windOpts: { calm: "Calm", breeze: "Breeze", strong: "Strong" },
  freezeM: "Freeze level (m)",
  items: enItems,
  prompts: enPrompts,
  debriefResult: "How it ended",
  debriefConfidence: "How ready it felt (1–5)",
  saveDebrief: "Save into the passport",
  savedDebrief: "Debrief kept on this page.",
  savedPassport: "Copied into your passport as an outing.",
  safety:
    "This is preparation, not medical advice and not a permission slip. If you are injured, ill, or at altitude with worsening symptoms, you need a qualified human, not a checklist.",
};

export const mountainFi: MountainPrepCopy = {
  ...mountainEn,
  tab: "Päivä",
  kicker: "Ennen lähtöä",
  title: "Itse päivä",
  lead: "Treeni vie aamuun. Tämä sivu on aamu: kamoja, säätä, ruokaa, kotiinpaluu ja mitä kirjoitat kun se on ohi. Se seuraa tavoitettasi ja kamalistaa jonka sanoit omistavasi.",
  unnamed: "Tavoitepäiväsi",
  daysLeft: "{n} päivää jäljellä",
  daysAgo: "{n} päivää sitten",
  todayIs: "Päivä on tänään",
  recWeeks: "Suositeltu täysi rakennus: {n} viikkoa",
  progress: "{done}/{total} ruksattu",
  phases: {
    build: {
      title: "Vielä rakennuksessa",
      body: "Harjoittele kamat ja ruoka tavallisilla viikoilla. Älä säästä ensikertaa aamuun.",
    },
    approach: {
      title: "Kolme viikkoa tai vähemmän",
      body: "Lukitse kamat. Vahvista matkat. Kirjoitetut viikot tarkentuvat. Uudet kokeilut loppuvat.",
    },
    week: {
      title: "Kisaviikko",
      body: "Hiljaisempi treeni, oikea ennuste, pakatut kassit. Virkeys on pointti.",
    },
    day: {
      title: "Aamu",
      body: "Ennuste, lähtöaika, kääntymisaika jos kyse on vuoresta, ruoka johon luotat.",
    },
    after: {
      title: "Jälkeen",
      body: "Kirjoita debrief kun se on totta. Se muistiinpano on seuraavan kauden etu.",
    },
  },
  sections: {
    fitness: {
      title: "Kunto, rehellisesti",
      lead: "Mitä kalenteri ja pisimmät retket oikeasti sanovat. Ei lääketieteellistä lupaa.",
    },
    equipment: {
      title: "Kamat tälle tavoitteelle",
      lead: "Rakennettu tavoitteesta ja listoistasi. Puuttuva jääkama pysyy puuttuvana kunnes lisäät sen.",
    },
    clothing: {
      title: "Vaatteet tätä ennustetta vasten",
      lead: "Täytä luvut. Lista muuttuu. Geneerinen ‘kerrokset’ on tapa pakata liikaa.",
    },
    nutrition: { title: "Ruoka ja vesi", lead: "Harjoitellut määrät. Ei uutta päivänä." },
    logistics: {
      title: "Perille ja pois",
      lead: "Lähtö, matkat, kotihoito, reitti alas. Tylsät asiat jotka päättävät päiviä.",
    },
    altitude: {
      title: "Jos päivä nousee korkealle",
      lead: "Laskeutuminen ja ammattilainen. Ridgework ei esitä lääkäriä.",
    },
    debrief: {
      title: "Retken jälkeen",
      lead: "Yksi sivu valmentajalle, kaverille tai seuraavalle kaudelle. Vie passiin jos haluat.",
    },
  },
  weatherTitle: "Ennuste jota vasten pakkaat",
  weatherLead:
    "Laakson lukemat valehtelevat. Kirjoita se mitä harjanteella tai viimeisessä nousussa oikeasti on.",
  precip: "Sade",
  precipOpts: { none: "Kuivaa", rain: "Vettä", snow: "Lunta", mix: "Räntää" },
  wind: "Tuuli",
  windOpts: { calm: "Tyyntä", breeze: "Tuulista", strong: "Kovaa" },
  freezeM: "Nollaraja (m)",
  debriefResult: "Miten se päättyi",
  debriefConfidence: "Miltä valmius tuntui (1–5)",
  saveDebrief: "Vie passiin",
  savedDebrief: "Debrief jäi tälle sivulle.",
  savedPassport: "Kopioitu passiin retkenä.",
  safety:
    "Tämä on valmistelua, ei lääketieteellistä neuvoa eikä lupaa. Jos olet kipeä, sairas tai korkealla ja oireet pahenevat, tarvitset ihmisen, et listaa.",
  prompts: {
    "nutrition.carbsPerHour": "Hiilihydraattimäärä jonka jo pidit pitkällä (g/h, sinun lukusi)",
    "logistics.startTime": "Lähtöaika autolta / tuvalta / laukauksesta",
    "logistics.turnaroundTime": "Kääntymisaika (kellossa, ei ‘katsotaan’)",
    "altitude.sleepElevation": "Nukkumiskorkeus tässä jaksossa (m), jos tiedät",
  },
  items: {
    ...enItems,
    "fitness.window": {
      label: "{remaining} viikkoa kalenterissa. Täysi rakennus tälle tavoitteelle on {rec}.",
      why: "Päivä on sinun. Ohuempi ikkuna kirjoittaa silti suunnitelman. Se ei keksi kuntoa.",
    },
    "fitness.thinWindow": {
      label: "Tämä on ohuempi rakennus kuin {rec} viikon suositus.",
      why: "Leikkaa pohja ensin. Älä pinota extra-tehoa ‘kiriäksesi’ viimeisillä viikoilla.",
    },
    "fitness.fullWindow": {
      label: "Ikkuna näyttää vielä täydeltä rakennukselta.",
      why: "Se ei ole lupaus että tunnet olosi valmiiksi. Kirjoitetut viikot ehtivät vielä tehdä työnsä.",
    },
    "fitness.longestGap": {
      label:
        "Pisimmän retkesi kaista on noin {longest} min. Tyypillinen päivä tässä on lähempänä {typical} min.",
      why: "Käytä jäljellä olevat viikot lähempään kenraaliharjoitukseen. Huippupäivä on huono paikka hypätä kestossa.",
    },
    "fitness.longestOk": {
      label: "Pisin retkikaista ({longest} min) on tyypillisen päivän haarukassa (~{typical} min).",
      why: "Pidä yksi pitkä puhevauhdissa. Väsymys silti lyhentää sen.",
    },
    "fitness.tiredWeeks": {
      label: "{n} viikkoa tuli jo väsyneenä ja meni extra-kevyeksi.",
      why: "Metodi toimii. Tavoitepäivä ei siirtynyt. Kunto on viikot jotka oikeasti imeytyivät.",
    },
    "fitness.beginner": {
      label: "Pidä päivä työssä jota olet jo harjoitellut.",
      why: "Uudet kengät, uusi polttoaine, uusi yöjuoksu, uudet rautakengät: yksi koe, eikä huippupäivänä.",
    },
    "fitness.alpineSkill": {
      label:
        "Aerobiset viikot eivät riitä. Spesifeihin tarvitaan kiipeilyä tai voimaa, ei vain vaellusta.",
      why: "Reitit ovat työtä. Väsynyt viikko keventää ne silti. Vuoripäivä ei ole paikka opetella uutta systeemiä.",
    },
    "fitness.engineAerobic": {
      label: "Työ on kevyt volyymi vauhdilla jolla puhut.",
      why: "Matala syke on pointti. Säästä kova sessio toiseen tavoitteeseen.",
    },
    "fitness.taperHonest": {
      label: "Tämä viikko on hiljaisempi tarkoituksella.",
      why: "Älä lisää viimeistä kovaa koska tunnet olosi virkeäksi. Virkeys on taper.",
    },
    "fitness.rehearseDay": {
      label: "Laita yksi treenipäivä samalle maastolle, kamoille ja ruoalle.",
      why: "Kenraali kertoo enemmän kuin uusi teho.",
    },
    "equipment.shoes": {
      label: "Kengät jotka ovat jo tehneet pitkän tällä maastolla.",
      why: "Uusi vaahto päivänä on tavallinen tapa menettää kynnet tai kausi.",
    },
    "equipment.pack": {
      label: "Rinkka lastattuna niin kuin sen kannat, vesi mukana.",
      why: "Liivi tai alppirinkka jonka pakkasit vasta aamulla istuu toisin.",
    },
    "equipment.polesOwned": {
      label: "Sauvat joita käytit jo pitkällä. Sommat maastoon.",
      why: "Listasit sauvat. Harjoittele myös pakkaus, ei vain pisto.",
    },
    "equipment.polesOptional": {
      label: "Sauvat ovat valinnaiset. Jos tulevat, ne ovat olleet pitkällä.",
      why: "Et listannut sauvoja. Lainakepit päivänä ovat extra-työtä.",
    },
    "equipment.nightKit": {
      label: "Otsalamppu, varaparistot, kerros jonka saat päälle kylmin käsin.",
      why: "Yö 100 km:llä tai traversella on tavallinen. Testaa lamppu pimeällä kevyellä.",
    },
    "equipment.cramponsOwned": {
      label: "Rautakengät näihin monoihin, harjoiteltu rinteellä jonka jo tunnet.",
      why: "Listasit rautakengät. Päivä ei ole ensimmäinen kerta kun ne menee jalkaan.",
    },
    "equipment.cramponsMissing": {
      label: "Ei rautakenkiä profiilissa. Valitse lumeton linja, tai lisää ne ja harjoittele.",
      why: "Ridgework ei teeskentele että kesäkengät riittävät kovalla lumella.",
    },
    "equipment.axeOwned": {
      label: "Hakku jota olet jo käyttänyt jarrutusharjoituksessa.",
      why: "Listasit hakun. Hihna ja kuiva harjoitus voittaa uuden työkalun harjanteella.",
    },
    "equipment.axeMissing": {
      label:
        "Ei hakkua listalla. Pysy pois jatkuvilta lumirinteiltä, tai lisää hakku ja harjoittele.",
      why: "Vaellussauva ei ole jarrutusväline.",
    },
    "equipment.harness": {
      label: "Valjaat, varmistuslaite, muutama lukko, ja suunnitelma itse reitille.",
      why: "Kannat sen mitä linja tarvitsee. Täysi rack ‘varmuuden vuoksi’ hidastaa päivän.",
    },
    "equipment.nav": {
      label: "Kartta tai GPS-reitti plus akkusuunnitelma. Joku muu tietää linjan.",
      why: "Pilvi harjanteella on tavallinen. Kuvakaappaus lentokonetilassa ei ole suunnitelma.",
    },
    "equipment.expeditionCamp": {
      label: "Nukkumisysteemi, keitin ja korjaussetti joissa olet jo nukkunut.",
      why: "Uusi teltta 4000 metrissä on pitkä yö. Testaa keitin sillä polttoaineella jonka ostat siellä.",
    },
    "equipment.lightKit": {
      label: "Pidä kevyenä: kengät, yksi kerros, vesi. Tämä ei ole vuorirack.",
      why: "Extra-kama jota et käytä on vain painoa kevyellä tai lyhyellä päivällä.",
    },
    "clothing.writeForecast": {
      label: "Kirjoita huomisen ennuste yllä oleviin kenttiin ennen pakkaamista.",
      why: "Geneerinen ‘kerrokset’ ilman lukuja on tapa pakata liikaa tai palella.",
    },
    "clothing.baseLayer": {
      label:
        "Paita jossa voit vaeltaa tai juosta, plus yksi asia jonka lisäät ilman pitkää stoppia.",
      why: "Pohja on päivä. Varalämpö on stoppiin, huipulle tai yöhön.",
    },
    "logistics.turnaround": {
      label: "Kääntymisaika kirjoitettuna ennen lähtöä, ja kaveri joka pitää sen.",
      why: "Huippu on vapaaehtoinen. Alas kävely valossa ei.",
    },
    "altitude.rotations": {
      label: "Nuku alempana kuin kiipesit. Rotaatiot ovat totuttelu, ei yksi push.",
      why: "Kiireinen huippu matalasta unesta on klassinen tapa tulla alas.",
    },
    "equipment.snowNoCrampons": {
      label: "Ennusteessa lunta eikä rautakenkiä listalla.",
      why: "Vaihda linjaa, siirrä, tai harjoittele jääkamat. Älä keksi kuivaa polkua.",
    },
    "nutrition.engineFat": {
      label: "Syö tavallista ruokaa. Tämän jakson pointti on rasva, ei geelit.",
      why: "Jos tarvitset sokeria päättääksesi kevyen tunnin, tunti ei ollut kevyt.",
    },
    "nutrition.nothingNew": {
      label: "Ei uutta päivänä: juoma, geeli, patukka tai kofeiini.",
      why: "Pitkät olivat testi. Huippupäivä on toisto.",
    },
    "altitude.notDiagnosis": {
      label:
        "Ridgework ei diagnosoi vuoristotautia. Alas ja ammattilainen voittaa minkä tahansa listan.",
      why: "Pisteytys olisi teatteria. Tämä on muistutus varsinaisesta työstä.",
    },
    "altitude.descend": {
      label:
        "Paheneva päänsärky rasituksessa, horjunta tai märkä hengitys: alas, sitten ammattilainen.",
      why: "Se ei ole Ridgeworkin veto. Se on ainoa veto jolla on väliä.",
    },
    "debrief.whatBroke": {
      label:
        "Nimeä yksi asia joka oikeasti hajosi: kama, polttoaine, ajoitus tai tarina jonka kerroit itsellesi.",
      why: "Epämääräinen ‘olisi pitänyt olla kovempi’ ei ole oppi.",
    },
  },
};

export const mountainFr: MountainPrepCopy = {
  ...mountainEn,
  tab: "Le jour",
  kicker: "Avant de partir",
  title: "Le jour lui-même",
  lead: "L’entraînement amène au matin. Cette page est le matin : matériel, météo, nourriture, le retour, et ce que vous écrivez après. Elle suit l’objectif et le matériel que vous avez déclaré.",
  unnamed: "Votre jour cible",
  daysLeft: "{n} jours",
  daysAgo: "il y a {n} jours",
  todayIs: "C’est aujourd’hui",
  recWeeks: "Construction complète suggérée : {n} semaines",
  progress: "{done} sur {total}",
  phases: {
    build: {
      title: "Encore en construction",
      body: "Répétez matériel et nourriture sur des semaines ordinaires.",
    },
    approach: {
      title: "Trois semaines ou moins",
      body: "Geler le kit. Confirmer le trajet. Plus d’expériences nouvelles.",
    },
    week: { title: "La semaine J", body: "Entraînement plus calme, vraie prévision, sacs faits." },
    day: {
      title: "Le matin",
      body: "Prévision, heure de départ, horaire de demi-tour, nourriture déjà testée.",
    },
    after: { title: "Après", body: "Écrire le debrief tant que c’est vrai." },
  },
  sections: {
    fitness: {
      title: "La forme, honnêtement",
      lead: "Ce que le calendrier et vos plus longues sorties disent. Pas un feu vert médical.",
    },
    equipment: {
      title: "Matériel pour cet objectif",
      lead: "Issu de l’objectif et du matériel listé.",
    },
    clothing: {
      title: "Vêtements contre cette prévision",
      lead: "Remplissez les chiffres. La liste change.",
    },
    nutrition: {
      title: "Nourriture et eau",
      lead: "Quantités déjà testées. Rien de nouveau le jour J.",
    },
    logistics: {
      title: "Y aller et en revenir",
      lead: "Départ, trajet, couverture familiale, une descente.",
    },
    altitude: {
      title: "Si la journée monte",
      lead: "Descente et soignant qualifié. Pas un médecin.",
    },
    debrief: {
      title: "Après la sortie",
      lead: "Une page pour le coach, le partenaire, ou la saison suivante.",
    },
  },
  weatherTitle: "Prévision pour laquelle vous partez",
  weatherLead: "Les chiffres de vallée mentent. Écrivez ce que la crête verra.",
  precip: "Précipitations",
  precipOpts: { none: "Sec", rain: "Pluie", snow: "Neige", mix: "Mélange" },
  wind: "Vent",
  windOpts: { calm: "Calme", breeze: "Brise", strong: "Fort" },
  freezeM: "Isotherme 0° (m)",
  debriefResult: "Comment ça s’est fini",
  debriefConfidence: "Forme ressentie (1–5)",
  saveDebrief: "Mettre dans le passeport",
  savedDebrief: "Debrief gardé ici.",
  savedPassport: "Copié dans le passeport comme une sortie.",
  safety:
    "Ceci est de la préparation, pas un avis médical. Blessure, maladie, ou symptômes d’altitude qui empirent : un humain qualifié, pas une liste.",
};

export const mountainDe: MountainPrepCopy = {
  ...mountainEn,
  tab: "Der Tag",
  kicker: "Bevor du gehst",
  title: "Der Tag selbst",
  lead: "Training bringt dich zum Morgen. Diese Seite ist der Morgen: Material, Wetter, Essen, der Rückweg, und was du danach schreibst. Sie folgt dem Ziel und dem Material, das du angegeben hast.",
  unnamed: "Dein Zieltage",
  daysLeft: "{n} Tage hin",
  daysAgo: "vor {n} Tagen",
  todayIs: "Der Tag ist heute",
  recWeeks: "Voller Aufbau empfohlen: {n} Wochen",
  progress: "{done} von {total}",
  phases: {
    build: { title: "Noch im Aufbau", body: "Material und Essen in normalen Wochen proben." },
    approach: {
      title: "Drei Wochen oder weniger",
      body: "Kit festziehen. Anreise klären. Keine neuen Experimente.",
    },
    week: {
      title: "Die Woche selbst",
      body: "Ruhigeres Training, echte Vorhersage, gepackte Taschen.",
    },
    day: {
      title: "Der Morgen",
      body: "Vorhersage, Startzeit, Umkehrzeit, Essen das du schon kennst.",
    },
    after: { title: "Danach", body: "Debrief schreiben, solange es stimmt." },
  },
  sections: {
    fitness: {
      title: "Form, ehrlich",
      lead: "Was Kalender und längste Unternehmungen sagen. Kein medizinischer Pass.",
    },
    equipment: { title: "Material für dieses Ziel", lead: "Aus Ziel und angegebenem Material." },
    clothing: {
      title: "Kleidung gegen diese Vorhersage",
      lead: "Zahlen eintragen. Die Liste ändert sich.",
    },
    nutrition: { title: "Essen und Wasser", lead: "Geübte Mengen. Nichts Neues am Tag." },
    logistics: { title: "Hin und runter", lead: "Start, Anreise, Familie, ein Abstieg." },
    altitude: {
      title: "Wenn der Tag hoch geht",
      lead: "Abstieg und qualifizierte Hilfe. Kein Arzt.",
    },
    debrief: {
      title: "Nach der Tour",
      lead: "Eine Seite für Trainer, Partner oder die nächste Saison.",
    },
  },
  weatherTitle: "Vorhersage, für die du packst",
  weatherLead: "Talzahlen lügen. Schreib, was der Grat wirklich sieht.",
  precip: "Niederschlag",
  precipOpts: { none: "Trocken", rain: "Regen", snow: "Schnee", mix: "Mix" },
  wind: "Wind",
  windOpts: { calm: "Ruhig", breeze: "Brise", strong: "Stark" },
  freezeM: "Nullgradgrenze (m)",
  debriefResult: "Wie es endete",
  debriefConfidence: "Wie bereit es sich anfühlte (1–5)",
  saveDebrief: "In den Pass legen",
  savedDebrief: "Debrief bleibt auf dieser Seite.",
  savedPassport: "Als Tour in den Pass kopiert.",
  safety:
    "Vorbereitung, keine medizinische Beratung. Verletzung, Krankheit oder sich verschlechternde Höhensymptome: ein qualifizierter Mensch, keine Liste.",
};
