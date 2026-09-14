import type { FieldPage } from "./types";

const terrainIds = {
  chamonix: "chamonix",
  bonhomme: "bonhomme",
  ferret: "ferret",
  sierre: "sierre",
  haute: "haute",
  dolomites: "dolomites",
  tds: "tds",
  trail: "trail",
  ultra: "ultra",
  expedition: "expedition",
} as const;

export const fieldEn: FieldPage = {
  title: "Field notes — Ridgework",
  description:
    "How the method plays out on real weeks and mountain days: composite field notes, the science behind realistic limits, and the terrain we plan for.",
  kicker: "Field notes",
  h1: "Limits are real. The method is how you meet them with eyes open.",
  lead: "Ridgework spends capacity on the day that matters. Easy volume is most of the week because that is what the endurance papers keep finding. If a session is wrecked or something hurts, the next days are rewritten from that log.",
  compositeNote:
    "Composite field notes from coaching patterns.",
  back: "← Ridgework home",
  storyNote: "Note",
  storySource: "Sources",
  teaserH2: "How the method meets a real limit",
  teaserLead:
    "Field notes, the science we actually use, and the terrain of famous alpine races and routes — without the hype those places usually attract.",
  teaserCta: "Open field notes",
  tabs: { stories: "Stories", science: "Science", terrain: "Terrain" },
  stories: [
    {
      kicker: "First 50 km",
      title: "The limit was arriving intact, not running faster than the week allowed",
      place: "Pre-Alpine trail, late September",
      pull: "Week 5 was not a hero session. It was an easy Tuesday, because sleep had already spent the quality.",
      body: [
        "M. is 44, teaches, and trains around term time. The objective was a first 50 km on rolling trail — finish well, not a time. We set a polarized week as the default hypothesis: most sessions conversational, one quality dose, a long run that grew by minutes rather than by theatre.",
        "That pattern is the one Seiler and Kjerland quantified in well-trained endurance athletes: about three-quarters of sessions clearly easy, a small share truly hard, surprisingly little sitting on the threshold. It is not a law of nature. It is a starting map you can adjust when the terrain and the life in the week disagree.",
        "In week 5 the sleep collapsed — parenting, not injury. The midweek check is the whole method in miniature. Session RPE and a one-line readiness note said the quality session would have been junk intensity dressed as work. We turned it easy. The long run stayed. The 50 km still happened.",
        "Finish was ordinary. Fueling held. No collapse, no story for a feed. The limit M. pushed was completing a long day inside a life that is not a training camp. That is what “toward your own limits, inside realism” looks like on a school-term calendar.",
      ],
      lesson: "Backing off a quality session is not leaving capacity on the table. It is how the easy volume that actually accumulates is allowed to remain easy.",
      science:
        "Seiler & Kjerland 2006; Seiler 2010; Esteve-Lanao, Foster, Seiler & Lucia 2007 — more time in the easy zone tracked with better running performance than piling work into the middle.",
    },
    {
      kicker: "Alpine weekend",
      title: "They climbed the week. The hard Tuesday was the trap, not the col.",
      place: "Mixed snow and rock, Écrins-style weekend",
      pull: "Tuesday vert was written. Sleep was already spent. Doing it anyway would have been commitment, not training.",
      body: [
        "A. had trained a mountain-specific week: conversational vert, one longer day. The alpine weekend was the peak of the block — a training objective, not a separate day-call product.",
        "Midweek sleep collapsed. The written quality session was sitting there. Doing it because it was on the card is the commitment trap McCammon named: we said we were going, so we go. Fitness does not cancel that. Training does not either.",
        "They turned the session easy. The long day stayed shorter. Legs were still used. The weekend still happened because Tuesday had not spent the reserve.",
        "Pushing a limit inside realism is not always more work. Sometimes it is spending the week’s capacity on the day that matters, and training less when you are tired.",
      ],
      lesson: "Backing off a tired week is the method. The outing is the peak, not a hero Tuesday.",
      science:
        "McCammon 2004 on heuristic traps (commitment, familiarity, expert halo). Bourdon et al. 2017 — load and readiness are planning inputs, not permission slips after you are already on the slope.",
    },
    {
      kicker: "Hut to hut",
      title: "Three days linked because day two was allowed to change",
      place: "Haute Route country, three huts",
      pull: "The taper was the last decision: volume down, one short sharpness, pack weight written. Day two still had to be called again.",
      body: [
        "L. is 38, first time linking alpine days. Ten days out, volume dropped about a third, one short sharpness session stayed, sleep outranked extra kilometres. That is Mujika and Padilla’s taper in checklist form: reduce the work, keep a little intensity, do not invent new stress.",
        "Day one was honest. Day two grew a convective afternoon. They left earlier, cut a lake detour, arrived at the hut before the cells. The original line would have been a sunk-cost march under building weather — the same commitment trap as the weekend summit, stretched across a traverse.",
        "Day three they still had legs. Not because the method is magic. Because day two was not allowed to spend the reserve that day three needed. The linked objective — three days, one pack, weather and kit already written — is a harder limit than any single summit photo.",
        "This is the Ridgework claim, stated without theatre: you get closer to your own ceiling when the easy work stays easy, the hard work is actually hard, and the mountain day is allowed to become a different day when the card says so.",
      ],
      lesson: "A traverse is a sequence of decisions. The log after day one is part of the plan for day two — not a diary for later.",
      science:
        "Mujika & Padilla 2003 on taper. Foster et al. 2001 — session RPE as a simple internal-load mark you can actually write down at a hut table.",
    },
  ],
  science: {
    kicker: "What we actually use",
    h2: "The literature is a map. It is not a prescription, and it is not medicine.",
    lead: "We keep a short shelf. Intensity distribution, load as a decision input, taper as a pattern, and a few mountain-decision papers on why people walk past an honest limit. We translate those into checklists. We do not diagnose. We do not claim a private training secret.",
    limitTitle: "What “your own limit” means here",
    limitBody:
      "A limit is personal and situational: aerobic capacity, skill, sleep, terrain, time. Most of the work that gets you there is easy on purpose, because that is the distribution Seiler described. If a session is wrecked or something hurts, you log it. The next hard day is rewritten from that number, not from a mood Ridgework invented.",
    sections: [
      {
        title: "Easy volume is how a real ceiling is approached",
        body: [
          "Observational work on elite endurance athletes keeps finding the same shape: a large share of training clearly below the first threshold, a smaller share truly hard, little time parked in the middle. Seiler & Kjerland (2006) measured about 75% of sessions easy in junior skiers. Seiler’s 2010 review treated that polarized (or pyramidal) pattern as best-practice description, not a brand.",
          "Esteve-Lanao, Foster, Seiler and Lucia (2007) then tested distribution in runners: more time in the easy zone tracked with better performance than piling kilometres into threshold. Stöggl and Sperlich (2014) found polarized blocks moved key endurance variables more than threshold-heavy or high-volume-only blocks in their sample.",
          "Ridgework’s planner treats this as a default hypothesis you can edit. The point for limits is blunt. If the easy work is not actually easy, you never accumulate the volume that would have let you stand near your ceiling on the day. “Hard every session” is not pushing a limit. It is spending the limit on Tuesday.",
        ],
      },
      {
        title: "Load and readiness are inputs, not a diagnosis",
        body: [
          "Foster’s session RPE (2001) is a one-number internal load: how hard was that, times how long. Bourdon and colleagues’ 2017 consensus statement is the adult version of the same idea — external work and internal response, written down, used to adjust the next session. None of this is a medical test. None of it tells you that you are healthy.",
          "We use those marks as train / ease / rest hooks in the week. Sleep crashed, niggle appeared: the quality session becomes easy, or the long run shortens, before it becomes junk. That is how you still have a limit left to push on Saturday.",
        ],
      },
      {
        title: "Taper is a decision about what you will not do",
        body: [
          "Mujika and Padilla (2003) summarised pre-competition tapering: volume typically falls while some intensity is kept in shorter doses, so fitness is expressed rather than buried under residual fatigue. We encode that as a 10–14 day block with decision hooks — sleep and kit checks outrank extra kilometres.",
          "For a mountain weekend or a first 50 km, the taper is the last realistic limit: you cannot add fitness in the final ten days, you can only avoid subtracting it. That is the opposite of last-minute hero mileage.",
        ],
      },
      {
        title: "Commitment to the written session is a trap",
        body: [
          "Ian McCammon’s work on recreational accidents (ISSW 2004) named traps that show up in training as clearly as on a slope: familiarity (“I always do Tuesday intervals”), commitment (“it is on the plan”), scarcity of the only quality slot in the week. Fitness does not cancel those.",
          "Ridgework’s answer is not a mountain go/no-go card. You log the session. If it was wrecked or something hurts, the next hard day is rewritten (Foster 2001; Bourdon et al. 2017). Extending aerobic base is allowed. The objective date may move.",
        ],
      },
    ],
  },
  terrain: {
    kicker: "Terrain",
    h2: "The races and routes these tools were built to stand on",
    lead: "Famous lines are useful because they are specific: vert, weather, turnaround, fueling, freeze–thaw. We do not sell entries. We use the terrain as the planning object.",
    photoNote:
      "Editorial photographs of alpine trail and hut terrain in the spirit of UTMB country, Sierre-Zinal, the Haute Route, TDS above Courmayeur, and the Dolomites. Not race coverage, not sponsored imagery.",
    items: [
      {
        id: terrainIds.chamonix,
        title: "Chamonix valley under a cloud cap",
        place: "Aiguillette des Houches, Mont Blanc massif",
        caption:
          "The week of UTMB is a circus. The trail on an ordinary wet day is the actual training object: muddy, dark spruce, the massif hidden. Plan the week for this light, not for the postcard.",
      },
      {
        id: terrainIds.bonhomme,
        title: "Col du Bonhomme",
        place: "Tour du Mont Blanc / UTMB south loop",
        caption:
          "A long, honest climb on wet schist. Polarized weeks exist so this can stay conversational for hours. If it cannot, the week should already have dropped the quality session.",
      },
      {
        id: terrainIds.ferret,
        title: "Grand Col Ferret",
        place: "Italy–Switzerland, CCC and UTMB high point",
        caption:
          "The col every recce dreads. Highest point of the loop, two-stage climb, weather sitting on the Italian side. Turnaround time is a number you write before you leave Courmayeur, not a feeling at the cairn.",
      },
      {
        id: terrainIds.sierre,
        title: "Sierre–Zinal balcony",
        place: "Valais — course of the five 4,000s",
        caption:
          "31 km, +2,200 m, a high traverse with Weisshorn and Matterhorn often in haze. Fast mountain racing still needs easy volume in the months before. The balcony is not a place to discover you trained only in the middle zone.",
      },
      {
        id: terrainIds.haute,
        title: "Classic Haute Route",
        place: "Chamonix toward Zermatt",
        caption:
          "Linked days, glacier weather, hut rhythm. Pack weight and day-two convective risk are the decision objects. A taper into the first hut is more useful than a last extra summit in the valley.",
      },
      {
        id: terrainIds.dolomites,
        title: "Tre Cime in fog",
        place: "Dolomites, north circuit",
        caption:
          "Limestone, puddles, the towers missing. Familiarity is the trap here: the postcard is in your head, the path is this. Train the week you actually have.",
      },
      {
        id: terrainIds.tds,
        title: "Technical trail above Courmayeur",
        place: "Italian flank — TDS country",
        caption:
          "Blocky rock, tired legs, no golden hour. TDS is the technical sibling of the Mont Blanc loop. Skill and turnaround matter as much as the polarized week that got you to the start.",
      },
      {
        id: terrainIds.trail,
        title: "Wet forest trail",
        place: "A 20 km objective — spruce, granite, puddles",
        caption:
          "This is the 10-week object: roots, needle duff, overcast. The long run grows here, not on a dry track. If the week is tired, this stays easy.",
      },
      {
        id: terrainIds.ultra,
        title: "High ridge, long day",
        place: "80–120 km country",
        caption:
          "Hours on a crest in flat light. The 36-week plan exists so this can stay conversational late. Back-to-backs belong in the last specific month, not as a surprise.",
      },
      {
        id: terrainIds.expedition,
        title: "High camp under cloud",
        place: "Altitude objective — tents small on purpose",
        caption:
          "The 40-week plan is hiking and pack, then sleep. Extra altitude in the last fortnight is not fitness. The camp is small because the work was the months before.",
      },
    ],
  },
};

export const fieldFi: FieldPage = {
  title: "Kenttämuistiinpanot — Ridgework",
  description:
    "Miten metodi toimii oikealla viikolla ja vuoripäivänä: kootut kenttämuistiinpanot, tieteen osa jota käytämme, ja maasto johon suunnittelemme.",
  kicker: "Kenttämuistiinpanot",
  h1: "Rajat ovat tosia. Metodi on tapa kohdata ne silmät auki.",
  lead: "Ridgework käyttää kapasiteetin päivään joka merkitsee. Helppo volyymi on suurin osa viikosta, koska kestävyyspaperit löytävät sen muodon uudestaan. Jos sessio oli rikki tai johonkin sattuu, seuraavat päivät kirjoitetaan siitä lokista.",
  compositeNote:
    "Koosteita valmennuksen kaavoista, kirjoitettu viikkoina.",
  back: "← Ridgework-etusivu",
  storyNote: "Huomio",
  storySource: "Lähteet",
  teaserH2: "Miten metodi kohtaa oikean rajan",
  teaserLead:
    "Kenttämuistiinpanoja, tiede jota oikeasti käytämme, ja tunnettujen alppikisojen ja -reittien maasto — ilman sen hypeä jota nämä paikat tavallisesti keräävät.",
  teaserCta: "Avaa kenttämuistiinpanot",
  tabs: { stories: "Tarinat", science: "Tiede", terrain: "Maasto" },
  stories: [
    {
      kicker: "Ensimmäinen 50 km",
      title: "Raja oli saapua ehjänä, ei juosta kovempaa kuin viikko salli",
      place: "Esi-Alppien polku, syyskuun loppu",
      pull: "Viikko 5 ei ollut sankarisessio. Se oli helppo tiistai, koska uni oli jo käyttänyt laadun.",
      body: [
        "M. on 44, opettaa ja treenaa lukukausien ympärillä. Tavoite oli ensimmäinen 50 km rullaavalla polulla — maaliin hyvin, ei aikaa. Oletusviikko oli polarisoitu: suurin osa sessioista puhekävelyä, yksi laatuannos, pitkä lenkki joka kasvoi minuuteilla eikä teatterilla.",
        "Se on sama muoto, jonka Seiler ja Kjerland mittasivat kestävyysurheilijoilla: noin kolme neljäsosaa sessioista selvästi helppoja, pieni osa oikeasti kovia, yllättävän vähän kynnysvauhdissa. Se ei ole luonnonlaki. Se on lähtökartta, jota säädetään kun maasto ja viikon elämä ovat eri mieltä.",
        "Viikolla 5 uni romahti — vanhemmuus, ei vamma. Keskiviikon tarkistus on koko metodi pienoiskoossa. Session RPE ja yhden rivin valmiusmerkintä sanoivat, että laatuharjoitus olisi ollut roskaintensiteettiä työn valekaavussa. Muutimme sen helpoksi. Pitkä lenkki jäi. 50 km tapahtui silti.",
        "Maali oli tavallinen. Tankkaus piti. Ei romahdusta, ei tarinaa syötteeseen. Raja jota M. työnsi oli pitkä päivä elämässä joka ei ole leiritys. Tätä “omia rajoja kohti, realismin puitteissa” tarkoittaa lukukausikalenterissa.",
      ],
      lesson:
        "Laatusession keventäminen ei ole kapasiteetin jättämistä käyttämättä. Se on tapa pitää helppo volyymi oikeasti helppona, jotta se ehtii kertyä.",
      science:
        "Seiler & Kjerland 2006; Seiler 2010; Esteve-Lanao, Foster, Seiler & Lucia 2007 — suurempi osuus helpossa vyöhykkeessä seurasi parempaa juoksusuoritusta kuin työn kasaaminen keskelle.",
    },
    {
      kicker: "Alppiviikonloppu",
      title: "He treenasivat viikon. Kova tiistai oli ansa, ei coli.",
      place: "Lumi ja kallio, Écrins-tyyppinen viikonloppu",
      pull: "Tiistain nousu oli kirjoitettu. Uni oli jo käytetty. Tekeminen silti olisi ollut sitoutumista, ei treeniä.",
      body: [
        "A. oli treenannut vuorispessifin viikon: nousua puhevauhdissa, yksi pidempi päivä. Alppiviikonloppu oli jakson huippu — treenitavoite, ei erillinen päiväkutsu.",
        "Keskellä viikkoa uni romahti. Kirjoitettu laatutreeni odotti. Tekeminen koska se on kortissa on sama commitment-ansa jonka McCammon nimesi: sanoimme että mennään, joten mennään. Kunto ei kumoa sitä. Treeni ei myöskään.",
        "He käänsivät session kevyeksi. Pitkä päivä lyheni. Jalkoja käytettiin. Viikonloppu tapahtui, koska tiistai ei ollut käyttänyt varaa.",
        "Rajan työntäminen realismin puitteissa ei aina ole lisää työtä. Joskus se on viikon kapasiteetin käyttäminen päivään joka merkitsee. Jos sessio oli rikki tai johonkin sattuu, se merkitään. Seuraava kova päivä kirjoitetaan siitä.",
      ],
      lesson: "Väsyneen viikon keventäminen on metodi. Retki on huippu, ei sankaritiistai.",
      science:
        "McCammon 2004 heuristisista ansoista (sitoutuminen, tuttuus, expert halo). Bourdon ym. 2017 — kuorma ja valmius ovat suunnittelun syötteitä, eivät lupia kun olet jo rinteessä.",
    },
    {
      kicker: "Tuvasta tupaan",
      title: "Kolme päivää linkittyi, koska toinen päivä sai muuttua",
      place: "Haute Route -maasto, kolme tupaa",
      pull: "Taper oli viimeinen päätös: volyymi alas, yksi lyhyt terävyys, rinkkapaino kirjoitettuna. Toinen päivä piti silti kutsua uudestaan.",
      body: [
        "L. on 38, ensimmäistä kertaa linkittää alppipäiviä. Kymmenen päivää ennen volyymi putosi noin kolmanneksen, yksi lyhyt terävyys jäi, uni voitti lisäkilometrit. Tämä on Mujikan ja Padillan taper checklistinä: vähennä työtä, pidä vähän intensiteettiä, älä keksi uutta stressiä.",
        "Ensimmäinen päivä oli rehellinen. Toiseen kasvoi konvektiivinen iltapäivä. He lähtivät aiemmin, karsivat järvikieron, tulivat tuvalle ennen soluja. Alkuperäinen linja olisi ollut uponneen kustannuksen marssi kasvavan sään alla — sama sitoutumisansa kuin viikonlopun huippu, venytettynä ylitykseen.",
        "Kolmantena päivänä jalkoja vielä oli. Ei siksi että metodi on taikaa. Koska toinen päivä ei saanut käyttää varaa jonka kolmas tarvitsi. Linkitetty tavoite — kolme päivää, yksi rinkka, sää ja kitti jo kirjoitettuna — on kovempi raja kuin yksittäinen huippukuva.",
        "Tämä on Ridgeworkin väite ilman teatteria: pääset lähemmäs omaa kattoa, kun helppo työ pysyy helppona, kova työ on oikeasti kovaa, ja vuoripäivä saa muuttua toiseksi päiväksi kun kortti niin sanoo.",
      ],
      lesson:
        "Ylitys on jono päätöksiä. Ensimmäisen päivän loki on osa toisen päivän suunnitelmaa — ei päiväkirja myöhemmäksi.",
      science:
        "Mujika & Padilla 2003 taperista. Foster ym. 2001 — session RPE on sisäinen kuormamerkintä jonka voi kirjoittaa tuvan pöytään.",
    },
  ],
  science: {
    kicker: "Mitä oikeasti käytämme",
    h2: "Kirjallisuus on kartta. Se ei ole määräys, eikä se ole lääketiedettä.",
    lead: "Pidämme lyhyen hyllyn. Intensiteettijakauma, kuorma päätössyötteenä, taper mallina, ja muutama vuoripäätöksen artikkeli siitä miksi rehellinen raja kävellään ohi. Käännämme ne checklisteiksi. Emme diagnosoi. Emme väitä salaisuutta.",
    limitTitle: "Mitä “oma raja” tässä tarkoittaa",
    limitBody:
      "Raja on henkilökohtainen ja tilannekohtainen: aerobinen kapasiteetti, taito, uni, maasto, aika. Suurin osa työstä joka sinne vie on tahallaan helppoa, koska se on jakauma jonka Seiler kuvasi. Jos sessio oli rikki tai johonkin sattuu, merkitset sen. Seuraava kova päivä kirjoitetaan siitä luvusta, ei Ridgeworkin keksimästä olosta.",
    sections: [
      {
        title: "Helppo volyymi on tapa lähestyä oikeaa kattoa",
        body: [
          "Eliittikestävyyden seurantatyö löytää saman muodon: suuri osa treenistä selvästi ensimmäisen kynnyksen alla, pienempi osa oikeasti kovaa, vähän aikaa keskellä. Seiler & Kjerland (2006) mittasivat noin 75 % sessioista helpoiksi juniorihiihtäjillä. Seilerin 2010 katsaus käsitteli polarisoitua (tai pyramidia) parhaana kuvauksena, ei brändinä.",
          "Esteve-Lanao, Foster, Seiler ja Lucia (2007) testasivat jakaumaa juoksijoilla: enemmän aikaa helpossa vyöhykkeessä seurasi parempaa suoritusta kuin kilometrien kasaaminen kynnykseen. Stöggl ja Sperlich (2014) näkivät polarisoitujen jaksojen liikuttavan kestävyysmuuttujia enemmän kuin kynnyspainotteiset tai pelkkä suurivolyymi heidän otoksessaan.",
          "Ridgeworkin suunnittelija käsittelee tätä oletushypoteesina jota saa muokata. Rajoille pointti on suora. Jos helppo työ ei ole helppoa, et koskaan kerää volyymia joka antaisi seistä katon lähellä päivänä. “Kova joka sessiossa” ei ole rajan työntämistä. Se on rajan käyttäminen tiistaina.",
        ],
      },
      {
        title: "Kuorma ja valmius ovat syötteitä, eivät diagnoosi",
        body: [
          "Fosterin session RPE (2001) on yhden luvun sisäinen kuorma: miten kova, kertaa miten pitkä. Bourdonin ja kollegoiden 2017 konsensus on saman idean aikuisversio — ulkoinen työ ja sisäinen vaste, kirjoitettuna, seuraavan session säätöön. Mikään tästä ei ole lääketieteellinen testi. Mikään ei kerro että olet terve.",
          "Käytämme merkintöjä treenaa / kevennä / lepää -koukkuina viikossa. Uni romahti, niggle ilmestyi: laatuharjoitus muuttuu helpoksi tai pitkä lyhenee, ennen kuin siitä tulee roskaa. Näin lauantaille jää vielä raja jota työntää.",
        ],
      },
      {
        title: "Taper on päätös siitä mitä et tee",
        body: [
          "Mujika ja Padilla (2003) kokosivat kisakevennyksen: volyymi tyypillisesti laskee, osa intensiteetistä säilyy lyhyempinä annoksina, jotta kunto ilmaistaan eikä haudata jälkiväsymyksen alle. Koodaamme sen 10–14 päivän lohkoksi — uni ja kitti voittavat lisäkilometrit.",
          "Vuoriviikonlopulle tai ensimmäiselle 50 kilometrille taper on viimeinen realistinen raja: kuntoa ei lisätä viimeiseen kymmeneen päivään, sen voi vain olla vähentämättä. Se on päinvastaista kuin viime hetken sankarikilometrit.",
        ],
      },
      {
        title: "Sitoutuminen kirjoitettuun sessioon on ansa",
        body: [
          "Ian McCammonin työ (ISSW 2004) nimesi ansat jotka näkyvät treenissä yhtä selvästi kuin rinteessä: tuttuus (“tiistain intervallit tehdään aina”), sitoutuminen (“se on suunnitelmassa”), ainoan laatuslotin niukkuus. Kunto ei kumoa niitä.",
          "Ridgeworkin vastaus ei ole vuoripäivän go/no-go -kortti. Merkitset session. Jos se oli rikki tai johonkin sattuu, seuraava kova päivä kirjoitetaan uusiksi (Foster 2001; Bourdon ym. 2017). Peruskuntojaksoa saa pidentää. Tavoitepäivä saa siirtyä.",
        ],
      },
    ],
  },
  terrain: {
    kicker: "Maasto",
    h2: "Kisat ja reitit joiden päällä nämä työkalut seisovat",
    lead: "Kuuluisat linjat ovat hyödyllisiä koska ne ovat tarkkoja: nousu, sää, käännös, tankkaus, freeze–thaw. Emme myy paikkoja. Käytämme maastoa suunnittelun kohteena.",
    photoNote:
      "Toimituksellisia valokuvia alppipolusta ja tupamaastosta UTMB-seudun, Sierre-Zinalin, Haute Routen, Courmayeurin TDS-rinteiden ja Dolomiittien hengessä. Ei kisakuvitusta, ei sponsoroitua kuvastoa.",
    items: [
      {
        id: terrainIds.chamonix,
        title: "Chamonix’n laakso pilvilakin alla",
        place: "Aiguillette des Houches, Mont Blancin massiivi",
        caption:
          "UTMB-viikko on sirkus. Polku tavallisena märkänä päivänä on varsinainen treenikohde: muta, kuusi, massiivi piilossa. Suunnittele viikko tälle valolle, ei postikortille.",
      },
      {
        id: terrainIds.bonhomme,
        title: "Col du Bonhomme",
        place: "Tour du Mont Blanc / UTMB:n eteläkaari",
        caption:
          "Pitkä, rehellinen nousu märällä liuskeella. Polarisoitu viikko on olemassa jotta tämä voi pysyä puhe-vauhtina tunteja. Jos ei voi, viikon piti jo dropata laatutreeni.",
      },
      {
        id: terrainIds.ferret,
        title: "Grand Col Ferret",
        place: "Italia–Sveitsi, CCC:n ja UTMB:n korkein kohta",
        caption:
          "Col jota jokainen recce pelkää. Silmukan korkein kohta, kaksivaiheinen nousu, sää Italian puolella. Käännösaika on luku jonka kirjoitat ennen Courmayeuria, ei tunne cairnilla.",
      },
      {
        id: terrainIds.sierre,
        title: "Sierre–Zinalin parveke",
        place: "Valais — viiden nelitonnin reitti",
        caption:
          "31 km, +2 200 m, korkea ylitys jossa Weisshorn ja Matterhorn usein utuisina. Nopea vuorijuoksu tarvitsee silti helppoa volyymia kuukausia ennen. Parveke ei ole paikka huomata että treenasit vain keskivyöhykkeessä.",
      },
      {
        id: terrainIds.haute,
        title: "Klassinen Haute Route",
        place: "Chamonix kohti Zermattia",
        caption:
          "Linkitetyt päivät, jäätikön sää, tuvan rytmi. Rinkkapaino ja toisen päivän konvektio ovat päätöskohteet. Taper ensimmäiselle tuvalle on hyödyllisempi kuin extra-huippu laaksossa.",
      },
      {
        id: terrainIds.dolomites,
        title: "Tre Cime sumussa",
        place: "Dolomiitit, pohjoinen kierto",
        caption:
          "Kalkkikivi, lätäköt, tornit poissa. Tuttuus on ansa: postikortti on päässä, polku on tämä. Treenaa se viikko joka sinulla on.",
      },
      {
        id: terrainIds.tds,
        title: "Tekninen polku Courmayeurin yllä",
        place: "Italian kylki — TDS-maasto",
        caption:
          "Lohkareinen kallio, väsyneet jalat, ei kultaista tuntia. TDS on Mont Blanc -silmukan tekninen sisarus. Taito ja käännös merkitsevät yhtä paljon kuin polarisoitu viikko joka vei lähtöön.",
      },
      {
        id: terrainIds.trail,
        title: "Märkä metsäpolku",
        place: "20 km tavoite — kuusi, graniitti, lätäköt",
        caption:
          "Tämä on 10 viikon kohde: juuret, neulaset, pilvinen valo. Pitkä kasvaa täällä, ei kuivalla radalla. Jos viikko on väsynyt, tämä pysyy kevyenä.",
      },
      {
        id: terrainIds.ultra,
        title: "Korkea harjanne, pitkä päivä",
        place: "80–120 km -maasto",
        caption:
          "Tunteja harjanteella tasaisessa valossa. 36 viikon suunnitelma on olemassa jotta tämä voi pysyä puhevauhdissa myöhään. Peräkkäiset päivät kuuluvat spesifin viimeiseen kuukauteen, ei yllätykseksi.",
      },
      {
        id: terrainIds.expedition,
        title: "Korkea leiri pilven alla",
        place: "Korkeustavoite — teltat pieninä tarkoituksella",
        caption:
          "40 viikon suunnitelma on vaellus ja rinkka, sitten uni. Lisäkorkeus kahdessa viimeisessä viikossa ei ole kuntoa. Leiri on pieni koska työ oli kuukausia ennen.",
      },
    ],
  },
};

export const fieldFr: FieldPage = {
  title: "Carnets de terrain — Ridgework",
  description:
    "Comment la méthode se joue sur une vraie semaine et un jour de montagne : carnets composites, la science que nous utilisons, le terrain que nous planifions.",
  kicker: "Carnets de terrain",
  h1: "Les limites sont réelles. La méthode, c’est les rencontrer les yeux ouverts.",
  lead: "Ridgework dépense la capacité le jour qui compte. Le volume facile est le gros de la semaine parce que c’est ce que les papiers d’endurance retrouvent. Si une séance est cassée ou si ça fait mal, les jours suivants sont réécrits à partir de ce journal.",
  compositeNote:
    "Carnets composites tirés de schémas d’accompagnement.",
  back: "← Accueil Ridgework",
  storyNote: "Note",
  storySource: "Sources",
  teaserH2: "Comment la méthode rencontre une vraie limite",
  teaserLead:
    "Carnets de terrain, la science que nous utilisons vraiment, et le terrain des courses et itinéraires alpins connus — sans le hype que ces lieux attirent.",
  teaserCta: "Ouvrir les carnets",
  tabs: { stories: "Récits", science: "Science", terrain: "Terrain" },
  stories: [
    {
      kicker: "Premier 50 km",
      title: "La limite était d’arriver entier, pas de courir plus vite que la semaine ne le permettait",
      place: "Sentier préalpin, fin septembre",
      pull: "La semaine 5 n’était pas une séance héroïque. C’était un mardi facile, parce que le sommeil avait déjà dépensé la qualité.",
      body: [
        "M. a 44 ans, enseigne, et s’entraîne autour des trimestres. L’objectif était un premier 50 km sur sentier vallonné — finir bien, pas un temps. La semaine polarisée était l’hypothèse par défaut : la plupart des séances conversationnelles, une dose de qualité, une sortie longue qui croissait en minutes, pas en théâtre.",
        "C’est la forme que Seiler et Kjerland ont quantifiée : environ trois quarts des séances nettement faciles, une petite part vraiment dure, étonnamment peu au seuil. Ce n’est pas une loi. C’est une carte de départ à ajuster quand le terrain et la vie de la semaine ne sont pas d’accord.",
        "En semaine 5 le sommeil s’est effondré — parentalité, pas une blessure. Le point mi-semaine est la méthode en miniature. Le RPE de séance et une ligne de readiness disaient que la qualité aurait été de l’intensité poubelle. On l’a passée facile. La longue est restée. Le 50 km a eu lieu.",
        "L’arrivée était ordinaire. Le ravitaillement a tenu. Pas d’effondrement. La limite poussée par M. était une longue journée dans une vie qui n’est pas un stage. Voilà “vers ses propres limites, dans le réel” sur un calendrier scolaire.",
      ],
      lesson:
        "Alléger une séance de qualité n’est pas laisser de la capacité de côté. C’est permettre au volume facile de rester facile pour qu’il s’accumule.",
      science:
        "Seiler & Kjerland 2006 ; Seiler 2010 ; Esteve-Lanao, Foster, Seiler & Lucia 2007 — plus de temps en zone facile suivait une meilleure performance en course que d’empiler le travail au milieu.",
    },
    {
      kicker: "Week-end alpin",
      title: "Ils ont entraîné la semaine. Le mardi dur était le piège, pas le col.",
      place: "Neige et rocher, week-end façon Écrins",
      pull: "Le D+ de mardi était écrit. Le sommeil était déjà dépensé. Le faire quand même aurait été de l’engagement, pas de l’entraînement.",
      body: [
        "A. avait préparé une semaine spécifique montagne : dénivelé conversationnel, une journée plus longue. Le week-end alpin était le pic du bloc — un objectif d’entraînement.",
        "En milieu de semaine le sommeil s’est effondré. La séance de qualité écrite attendait. La faire parce qu’elle est sur la carte, c’est le piège d’engagement de McCammon : on a dit qu’on y allait, donc on y va.",
        "Ils ont passé la séance en facile. La longue a raccourci. Les jambes ont servi. Le week-end a eu lieu parce que mardi n’avait pas dépensé la réserve.",
        "Pousser une limite dans le réel, ce n’est pas toujours plus de travail. Parfois c’est dépenser la capacité de la semaine le jour qui compte, et s’entraîner moins quand on est fatigué.",
      ],
      lesson: "Alléger une semaine fatiguée, c’est la méthode. La sortie est le pic, pas un mardi héroïque.",
      science:
        "McCammon 2004 sur les pièges heuristiques. Bourdon et al. 2017 — la charge et la readiness sont des entrées de planification, pas des permis une fois sur la pente.",
    },
    {
      kicker: "Refuge à refuge",
      title: "Trois jours liés parce que le deuxième a eu le droit de changer",
      place: "Pays de la Haute Route, trois refuges",
      pull: "L’affûtage était la dernière décision : volume en baisse, une courte acuité, poids du sac écrit. Le jour deux devait encore être rappelé.",
      body: [
        "L. a 38 ans, première liaison de jours alpins. Dix jours avant, le volume a chuté d’environ un tiers, une courte séance d’acuité est restée, le sommeil a battu les kilomètres en plus. C’est l’affûtage de Mujika et Padilla en checklist.",
        "Le jour un était honnête. Le jour deux a poussé un après-midi convectif. Ils sont partis plus tôt, ont coupé un détour de lac, sont arrivés au refuge avant les cellules. La ligne d’origine aurait été une marche à coût irrécupérable sous une météo qui se construisait.",
        "Le jour trois, il restait des jambes. Pas parce que la méthode est magique. Parce que le jour deux n’a pas eu le droit de dépenser la réserve dont le jour trois avait besoin. L’objectif lié — trois jours, un sac, météo et matériel déjà écrits — est une limite plus dure qu’une photo de sommet.",
        "La thèse Ridgework, sans théâtre : on se rapproche de son plafond quand le facile reste facile, le dur est vraiment dur, et le jour de montagne a le droit de devenir un autre jour quand la carte le dit.",
      ],
      lesson:
        "Une traversée est une suite de décisions. Le carnet après le jour un fait partie du plan du jour deux — ce n’est pas un journal pour plus tard.",
      science:
        "Mujika & Padilla 2003 sur l’affûtage. Foster et al. 2001 — le RPE de séance comme marque de charge interne que l’on peut écrire à la table du refuge.",
    },
  ],
  science: {
    kicker: "Ce que nous utilisons vraiment",
    h2: "La littérature est une carte. Ce n’est pas une prescription, et ce n’est pas de la médecine.",
    lead: "Une étagère courte. Distribution d’intensité, charge comme entrée de décision, affûtage comme patron, et quelques papiers sur pourquoi on dépasse une limite honnête en montagne. Nous en faisons des checklists. Nous ne diagnostiquons pas.",
    limitTitle: "Ce que “votre propre limite” veut dire ici",
    limitBody:
      "Une limite est personnelle et situationnelle : capacité aérobie, technique, sommeil, terrain, temps. La plus grande part du travail qui y mène est facile exprès, parce que c’est la distribution que Seiler a décrite. Si une séance est cassée ou si ça fait mal, vous la notez. Le prochain jour dur est réécrit à partir de ce chiffre, pas d’une humeur inventée par Ridgework.",
    sections: [
      {
        title: "Le volume facile est la façon d’approcher un vrai plafond",
        body: [
          "Les travaux d’observation sur les endurants d’élite retrouvent la même forme : une grande part nettement sous le premier seuil, une plus petite vraiment dure, peu de temps au milieu. Seiler & Kjerland (2006) : environ 75 % de séances faciles chez des fondeurs juniors. La revue de Seiler (2010) décrit le polarisé (ou pyramidal) comme description de bonne pratique, pas comme marque.",
          "Esteve-Lanao, Foster, Seiler et Lucia (2007) : plus de temps en zone facile suivait une meilleure performance que d’empiler les kilomètres au seuil. Stöggl et Sperlich (2014) : des blocs polarisés déplaçaient davantage les variables clés que des blocs au seuil ou à haut volume seul, dans leur échantillon.",
          "Le planificateur Ridgework traite cela comme une hypothèse par défaut, éditable. Le point pour les limites est net. Si le facile n’est pas facile, vous n’accumulez jamais le volume qui vous laisserait près du plafond le jour J. “Dur à chaque séance” n’est pas pousser une limite. C’est la dépenser mardi.",
        ],
      },
      {
        title: "Charge et readiness sont des entrées, pas un diagnostic",
        body: [
          "Le RPE de séance de Foster (2001) est une charge interne en un nombre. Le consensus de Bourdon et al. (2017) est la version adulte : travail externe et réponse interne, écrits, pour ajuster la séance suivante. Rien de ceci n’est un test médical.",
          "Nous les utilisons comme crochets entraîner / alléger / reposer dans la semaine. Sommeil cassé, niggle : la qualité devient facile, ou la longue raccourcit. C’est ainsi qu’il reste une limite à pousser samedi.",
        ],
      },
      {
        title: "L’affûtage est une décision sur ce que vous ne ferez pas",
        body: [
          "Mujika et Padilla (2003) : le volume baisse typiquement, une part d’intensité reste en doses plus courtes, pour que la forme s’exprime. Nous l’encodons en bloc de 10–14 jours — sommeil et matériel battent les kilomètres en plus.",
          "Pour un week-end de montagne ou un premier 50 km, l’affûtage est la dernière limite réaliste : on n’ajoute pas de forme dans les dix derniers jours, on évite seulement d’en retrancher.",
        ],
      },
      {
        title: "S’engager sur la séance écrite est un piège",
        body: [
          "McCammon (ISSW 2004) a nommé des pièges qui apparaissent aussi à l’entraînement : familiarité (“je fais toujours les intervalles du mardi”), engagement (“c’est sur le plan”). La forme ne les annule pas.",
          "La réponse Ridgework n’est pas une carte go/no-go de montagne. Vous notez la séance. Si elle était cassée ou si ça fait mal, le prochain jour dur est réécrit (Foster 2001 ; Bourdon et al. 2017). Allonger la base est permis. La date d’objectif peut bouger.",
        ],
      },
    ],
  },
  terrain: {
    kicker: "Terrain",
    h2: "Les courses et itinéraires sur lesquels ces outils sont construits",
    lead: "Les lignes célèbres sont utiles parce qu’elles sont précises : dénivelé, météo, demi-tour, ravitaillement, gel–dégel. Nous ne vendons pas d’inscriptions. Nous prenons le terrain comme objet de planification.",
    photoNote:
      "Photographies éditoriales de sentier et de refuges dans l’esprit du pays UTMB, de Sierre-Zinal, de la Haute Route, du TDS au-dessus de Courmayeur, et des Dolomites. Pas de couverture de course, pas d’images sponsorisées.",
    items: [
      {
        id: terrainIds.chamonix,
        title: "Vallée de Chamonix sous un chapeau de nuages",
        place: "Aiguillette des Houches, massif du Mont Blanc",
        caption:
          "La semaine de l’UTMB est un cirque. Le sentier d’un jour mouillé ordinaire est l’objet d’entraînement : boue, épicéas, massif caché. Planifiez la semaine pour cette lumière, pas pour la carte postale.",
      },
      {
        id: terrainIds.bonhomme,
        title: "Col du Bonhomme",
        place: "Tour du Mont Blanc / boucle sud UTMB",
        caption:
          "Une montée longue et honnête sur schiste mouillé. Les semaines polarisées existent pour que cela reste conversationnel des heures. Sinon, l’appel du jour aurait déjà dû modifier la ligne.",
      },
      {
        id: terrainIds.ferret,
        title: "Grand Col Ferret",
        place: "Italie–Suisse, point haut de la CCC et de l’UTMB",
        caption:
          "Le col que chaque recce redoute. Point le plus haut de la boucle, montée en deux temps, météo côté italien. L’heure de demi-tour s’écrit avant de quitter Courmayeur, pas au cairn.",
      },
      {
        id: terrainIds.sierre,
        title: "Balcon de Sierre–Zinal",
        place: "Valais — course des cinq 4 000",
        caption:
          "31 km, +2 200 m, une traversée haute où Weisshorn et Cervin sont souvent dans la brume. Une course de montagne rapide a tout de même besoin de volume facile dans les mois d’avant.",
      },
      {
        id: terrainIds.haute,
        title: "Haute Route classique",
        place: "Chamonix vers Zermatt",
        caption:
          "Jours liés, météo de glacier, rythme de refuge. Poids du sac et convection du jour deux sont les objets de décision. Un affûtage vers le premier refuge vaut mieux qu’un sommet de trop dans la vallée.",
      },
      {
        id: terrainIds.dolomites,
        title: "Tre Cime dans le brouillard",
        place: "Dolomites, circuit nord",
        caption:
          "Calcaire, flaques, les tours absentes. La familiarité est le piège : la carte postale est dans la tête, le chemin est celui-ci. Entraînez la semaine que vous avez.",
      },
      {
        id: terrainIds.tds,
        title: "Sentier technique au-dessus de Courmayeur",
        place: "Versant italien — pays du TDS",
        caption:
          "Roche en blocs, jambes lourdes, pas d’heure dorée. Le TDS est le frère technique de la boucle du Mont Blanc. La technique et le demi-tour comptent autant que la semaine polarisée qui vous a mené au départ.",
      },
      {
        id: terrainIds.trail,
        title: "Sentier forestier mouillé",
        place: "Objectif 20 km — épicéa, granite, flaques",
        caption:
          "Voici l’objet des 10 semaines : racines, aiguilles, ciel couvert. La longue grandit ici, pas sur une piste sèche. Si la semaine est fatiguée, cela reste facile.",
      },
      {
        id: terrainIds.ultra,
        title: "Crête haute, longue journée",
        place: "Pays des 80–120 km",
        caption:
          "Des heures sur une crête en lumière plate. Le plan de 36 semaines existe pour que cela reste conversationnel tard. Les back-to-backs appartiennent au dernier mois spécifique, pas à la surprise.",
      },
      {
        id: terrainIds.expedition,
        title: "Camp d’altitude sous nuage",
        place: "Objectif altitude — tentes petites exprès",
        caption:
          "Le plan de 40 semaines est rando et sac, puis sommeil. L’altitude extra dans les deux dernières semaines n’est pas de la forme. Le camp est petit parce que le travail était les mois d’avant.",
      },
    ],
  },
};

export const fieldDe: FieldPage = {
  title: "Feldnotizen — Ridgework",
  description:
    "Wie die Methode in einer echten Woche und an einem Bergtag läuft: zusammengesetzte Feldnotizen, die Wissenschaft, die wir nutzen, das Gelände, das wir planen.",
  kicker: "Feldnotizen",
  h1: "Grenzen sind real. Die Methode ist, ihnen mit offenen Augen zu begegnen.",
  lead: "Ridgework gibt die Kapazität an dem Tag aus, der zählt. Leichtes Volumen ist der Großteil der Woche, weil die Ausdauerpapers diese Form immer wieder finden. War eine Einheit kaputt oder tut etwas weh, werden die nächsten Tage aus diesem Log neu geschrieben.",
  compositeNote:
    "Zusammengesetzte Feldnotizen aus Coaching-Mustern.",
  back: "← Ridgework-Start",
  storyNote: "Hinweis",
  storySource: "Quellen",
  teaserH2: "Wie die Methode auf eine echte Grenze trifft",
  teaserLead:
    "Feldnotizen, die Wissenschaft, die wir wirklich nutzen, und das Gelände bekannter Alpenrennen und -routen — ohne den Hype, den diese Orte sonst anziehen.",
  teaserCta: "Feldnotizen öffnen",
  tabs: { stories: "Geschichten", science: "Wissenschaft", terrain: "Gelände" },
  stories: [
    {
      kicker: "Erste 50 km",
      title: "Die Grenze war, heil anzukommen, nicht schneller zu laufen, als die Woche erlaubte",
      place: "Voralpiner Trail, Ende September",
      pull: "Woche 5 war keine Helden-Einheit. Es war ein leichter Dienstag, weil der Schlaf die Qualität schon ausgegeben hatte.",
      body: [
        "M. ist 44, unterrichtet, trainiert um Schulzeiten. Das Ziel war ein erster 50 km auf rollendem Trail — gut ankommen, keine Zeit. Die polarisierte Woche war die Ausgangshypothese: die meisten Einheiten gesprächig, eine Qualitätsdosis, ein Langer, der in Minuten wuchs, nicht im Theater.",
        "Das ist die Form, die Seiler und Kjerland gemessen haben: etwa drei Viertel der Einheiten klar leicht, ein kleiner Anteil wirklich hart, überraschend wenig an der Schwelle. Kein Naturgesetz. Eine Startkarte, die man anpasst, wenn Gelände und Leben der Woche anderer Meinung sind.",
        "In Woche 5 brach der Schlaf ein — Elternschaft, keine Verletzung. Der Wochenmitte-Check ist die ganze Methode im Kleinen. Session-RPE und eine Zeile Readiness sagten: die Qualität wäre Junk-Intensität gewesen. Wir machten sie leicht. Der Lange blieb. Die 50 km fanden trotzdem statt.",
        "Das Ziel war gewöhnlich. Die Verpflegung hielt. Kein Kollaps. Die Grenze, die M. schob, war ein langer Tag in einem Leben, das kein Trainingslager ist. Das ist “in Richtung der eigenen Grenzen, innerhalb des Realen” im Schulkalender.",
      ],
      lesson:
        "Eine Qualitätseinheit zu entschärfen heißt nicht, Kapazität liegen zu lassen. Es heißt, das leichte Volumen leicht zu lassen, damit es sich stapeln kann.",
      science:
        "Seiler & Kjerland 2006; Seiler 2010; Esteve-Lanao, Foster, Seiler & Lucia 2007 — mehr Zeit in der leichten Zone hing mit besserer Laufleistung zusammen als Arbeit in der Mitte.",
    },
    {
      kicker: "Alpenwochenende",
      title: "Sie haben die Woche trainiert. Der harte Dienstag war die Falle, nicht der Col.",
      place: "Schnee und Fels, Wochenende im Écrins-Stil",
      pull: "Dienstag-Vert war geschrieben. Der Schlaf war schon ausgegeben. Es trotzdem zu tun wäre Commitment gewesen, kein Training.",
      body: [
        "A. hatte eine bergspezifische Woche trainiert: Höhenmeter im Gesprächstempo, ein längerer Tag. Das Alpenwochenende war der Peak des Blocks — ein Trainingsziel.",
        "Mitten in der Woche brach der Schlaf ein. Die geschriebene Qualitätseinheit saß da. Sie zu machen, weil sie auf der Karte steht, ist McCammons Commitment-Falle: wir haben gesagt, wir gehen, also gehen wir.",
        "Sie machten die Einheit locker. Der Lange wurde kürzer. Die Beine wurden benutzt. Das Wochenende fand statt, weil Dienstag die Reserve nicht ausgegeben hatte.",
        "Eine Grenze im Realen zu schieben heißt nicht immer mehr Arbeit. Manchmal heißt es, die Kapazität der Woche am Tag auszugeben, der zählt — und weniger zu trainieren, wenn du müde bist.",
      ],
      lesson: "Eine müde Woche zu entlasten ist die Methode. Die Tour ist der Peak, kein Helden-Dienstag.",
      science:
        "McCammon 2004 zu Heuristik-Fallen. Bourdon et al. 2017 — Last und Readiness sind Planungseingaben, keine Genehmigungen, wenn man schon am Hang steht.",
    },
    {
      kicker: "Hütte zu Hütte",
      title: "Drei Tage verbunden, weil Tag zwei sich ändern durfte",
      place: "Haute-Route-Land, drei Hütten",
      pull: "Die Taper war die letzte Entscheidung: Volumen runter, eine kurze Schärfe, Packgewicht geschrieben. Tag zwei musste trotzdem neu gerufen werden.",
      body: [
        "L. ist 38, zum ersten Mal alpine Tage verbunden. Zehn Tage vorher fiel das Volumen um etwa ein Drittel, eine kurze Schärfe blieb, Schlaf schlug Extra-Kilometer. Das ist Mujika und Padilla als Checkliste.",
        "Tag eins war ehrlich. Tag zwei bekam einen konvektiven Nachmittag. Sie gingen früher, strichen einen See-Umweg, kamen vor den Zellen an der Hütte an. Die Originallinie wäre ein Sunk-Cost-Marsch unter aufbauendem Wetter gewesen.",
        "Tag drei hatten sie noch Beine. Nicht weil die Methode Magie ist. Weil Tag zwei die Reserve nicht ausgeben durfte, die Tag drei brauchte. Das verbundene Ziel — drei Tage, ein Rucksack, Wetter und Kit schon geschrieben — ist eine härtere Grenze als jedes Gipfelfoto.",
        "Die Ridgework-Behauptung ohne Theater: du kommst deiner Decke näher, wenn die leichte Arbeit leicht bleibt, die harte wirklich hart ist, und der Bergtag ein anderer Tag werden darf, wenn die Karte das sagt.",
      ],
      lesson:
        "Eine Traverse ist eine Folge von Entscheidungen. Das Log nach Tag eins ist Teil des Plans für Tag zwei — kein Tagebuch für später.",
      science:
        "Mujika & Padilla 2003 zur Taper. Foster et al. 2001 — Session-RPE als interne Last, die man am Hüttentisch notieren kann.",
    },
  ],
  science: {
    kicker: "Was wir wirklich nutzen",
    h2: "Die Literatur ist eine Karte. Sie ist keine Vorschrift und keine Medizin.",
    lead: "Ein kurzes Regal. Intensitätsverteilung, Last als Entscheidungseingabe, Taper als Muster, und ein paar Papiere dazu, warum man an einer ehrlichen Grenze vorbeigeht. Wir machen Checklisten daraus. Wir diagnostizieren nicht.",
    limitTitle: "Was “deine eigene Grenze” hier heißt",
    limitBody:
      "Eine Grenze ist persönlich und situativ: aerobe Kapazität, Können, Schlaf, Gelände, Zeit. Der größte Teil der Arbeit dorthin ist absichtlich leicht, weil das die Verteilung ist, die Seiler beschrieben hat. War eine Einheit kaputt oder tut etwas weh, markierst du sie. Der nächste harte Tag wird aus dieser Zahl neu geschrieben, nicht aus einer Stimmung, die Ridgework erfunden hat.",
    sections: [
      {
        title: "Leichtes Volumen ist der Weg an eine echte Decke",
        body: [
          "Beobachtungsarbeit an Elite-Ausdauer findet dieselbe Form: großer Anteil klar unter der ersten Schwelle, kleinerer wirklich hart, wenig Zeit in der Mitte. Seiler & Kjerland (2006): etwa 75 % leichte Einheiten bei Junior-Langläufern. Seilers Review 2010 beschreibt polarisiert (oder pyramidal) als Best-Practice-Beschreibung, nicht als Marke.",
          "Esteve-Lanao, Foster, Seiler und Lucia (2007): mehr Zeit in der leichten Zone hing mit besserer Leistung zusammen als Kilometer an der Schwelle. Stöggl und Sperlich (2014): polarisierte Blöcke bewegten Schlüsselgrößen stärker als schwellenlastige oder nur-hohe-Volumen-Blöcke in ihrer Stichprobe.",
          "Der Ridgework-Planer behandelt das als editierbare Ausgangshypothese. Der Punkt für Grenzen ist scharf. Ist die leichte Arbeit nicht leicht, sammelst du nie das Volumen, das dich am Tag nahe der Decke stehen ließe. “Hart in jeder Einheit” ist keine Grenze schieben. Es ist die Grenze am Dienstag ausgeben.",
        ],
      },
      {
        title: "Last und Readiness sind Eingaben, keine Diagnose",
        body: [
          "Fosters Session-RPE (2001) ist interne Last in einer Zahl. Bourdon et al. 2017 ist die Erwachsenenversion: äußere Arbeit und innere Antwort, aufgeschrieben, für die nächste Einheit. Nichts davon ist ein medizinischer Test.",
          "Wir nutzen die Marken als trainieren / entlasten / ruhen in der Woche. Schlaf weg, Niggle: die Qualität wird leicht, oder der Lange kürzer. So bleibt samstags eine Grenze zum Schieben.",
        ],
      },
      {
        title: "Taper ist eine Entscheidung über das, was du nicht tust",
        body: [
          "Mujika und Padilla (2003): Volumen sinkt typisch, etwas Intensität bleibt in kürzeren Dosen, damit Form sich zeigt. Wir kodieren das als 10–14-Tage-Block — Schlaf und Kit schlagen Extra-Kilometer.",
          "Für ein Bergwochenende oder erste 50 km ist die Taper die letzte realistische Grenze: in den letzten zehn Tagen fügst du keine Form hinzu, du vermeidest nur, sie abzuziehen.",
        ],
      },
      {
        title: "Commitment zur geschriebenen Einheit ist eine Falle",
        body: [
          "McCammon (ISSW 2004) benannte Fallen, die auch im Training auftauchen: Vertrautheit (“Dienstag-Intervalle mache ich immer”), Commitment (“steht im Plan”). Form hebt sie nicht auf.",
          "Ridgeworks Antwort ist keine Berg-Go/No-Go-Karte. Du loggst die Einheit. War sie kaputt oder tut etwas weh, wird der nächste harte Tag neu geschrieben (Foster 2001; Bourdon et al. 2017). Die Basis darf länger werden. Das Zieldatum darf rücken.",
        ],
      },
    ],
  },
  terrain: {
    kicker: "Gelände",
    h2: "Die Rennen und Routen, auf denen diese Tools stehen",
    lead: "Berühmte Linien sind nützlich, weil sie konkret sind: Höhenmeter, Wetter, Umkehr, Verpflegung, Frost-Tau. Wir verkaufen keine Startplätze. Wir nehmen das Gelände als Planungsobjekt.",
    photoNote:
      "Redaktionelle Fotografien von Alpenpfad und Hüttengelände im Geist von UTMB-Land, Sierre-Zinal, Haute Route, TDS über Courmayeur und den Dolomiten. Keine Rennberichterstattung, keine gesponserten Bilder.",
    items: [
      {
        id: terrainIds.chamonix,
        title: "Chamonix-Tal unter einer Wolkenkappe",
        place: "Aiguillette des Houches, Mont-Blanc-Massiv",
        caption:
          "Die UTMB-Woche ist ein Zirkus. Der Pfad an einem gewöhnlichen nassen Tag ist das Trainingsobjekt: Matsch, Fichte, Massiv versteckt. Plane die Woche für dieses Licht, nicht für die Postkarte.",
      },
      {
        id: terrainIds.bonhomme,
        title: "Col du Bonhomme",
        place: "Tour du Mont Blanc / UTMB-Südbogen",
        caption:
          "Ein langer, ehrlicher Anstieg auf nassem Schiefer. Polarisierte Wochen gibt es, damit das stundenlang gesprächig bleiben kann. Wenn nicht, hätte die Woche die Qualitätseinheit schon streichen müssen.",
      },
      {
        id: terrainIds.ferret,
        title: "Grand Col Ferret",
        place: "Italien–Schweiz, Hochpunkt von CCC und UTMB",
        caption:
          "Der Col, den jede Recce fürchtet. Höchster Punkt der Runde, zweistufiger Anstieg, Wetter auf der italienischen Seite. Die Umkehrzeit schreibst du vor Courmayeur, nicht am Steinmann.",
      },
      {
        id: terrainIds.sierre,
        title: "Sierre–Zinal-Balkon",
        place: "Wallis — Rennen der fünf Viertausender",
        caption:
          "31 km, +2.200 m, eine hohe Querung, Weisshorn und Matterhorn oft im Dunst. Schnelles Bergrennen braucht trotzdem leichtes Volumen in den Monaten davor.",
      },
      {
        id: terrainIds.haute,
        title: "Klassische Haute Route",
        place: "Chamonix Richtung Zermatt",
        caption:
          "Verbundene Tage, Gletscherwetter, Hüttenrhythmus. Packgewicht und Konvektion an Tag zwei sind die Entscheidungsobjekte. Eine Taper in die erste Hütte nützt mehr als ein Extra-Gipfel im Tal.",
      },
      {
        id: terrainIds.dolomites,
        title: "Tre Cime im Nebel",
        place: "Dolomiten, Nordrunde",
        caption:
          "Kalk, Pfützen, die Türme fehlen. Vertrautheit ist die Falle: die Postkarte sitzt im Kopf, der Weg ist dieser. Trainiere die Woche, die du hast.",
      },
      {
        id: terrainIds.tds,
        title: "Technischer Trail über Courmayeur",
        place: "Italienische Flanke — TDS-Land",
        caption:
          "Blockiger Fels, müde Beine, keine goldene Stunde. TDS ist das technische Geschwister der Mont-Blanc-Runde. Können und Umkehr zählen so viel wie die polarisierte Woche, die dich an den Start brachte.",
      },
      {
        id: terrainIds.trail,
        title: "Nasser Waldpfad",
        place: "20-km-Ziel — Fichte, Granit, Pfützen",
        caption:
          "Das ist das 10-Wochen-Objekt: Wurzeln, Nadeln, bedecktes Licht. Der Lange wächst hier, nicht auf trockener Bahn. Ist die Woche müde, bleibt das locker.",
      },
      {
        id: terrainIds.ultra,
        title: "Hoher Grat, langer Tag",
        place: "80–120-km-Gelände",
        caption:
          "Stunden auf einem Grat im flachen Licht. Der 36-Wochen-Plan existiert, damit das spät gesprächig bleiben kann. Back-to-backs gehören in den letzten spezifischen Monat, nicht als Überraschung.",
      },
      {
        id: terrainIds.expedition,
        title: "Höhenlager unter Wolken",
        place: "Höhenziel — Zelte absichtlich klein",
        caption:
          "Der 40-Wochen-Plan ist Wandern und Pack, dann Schlaf. Extra Höhe in den letzten zwei Wochen ist keine Fitness. Das Lager ist klein, weil die Arbeit die Monate davor war.",
      },
    ],
  },
};

export const fieldCopy = {
  en: fieldEn,
  fi: fieldFi,
  fr: fieldFr,
  de: fieldDe,
} as const;
