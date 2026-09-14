import { o as __toESM } from "../_runtime.mjs";
import { B as notFound, V as require_react, b as require_jsx_runtime, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as __exportAll } from "./ssr.mjs";
import { r as getSql } from "./db-CWLrYAZJ.mjs";
import { Bt as union, Ft as number, It as object, Nt as literal, zt as string } from "../_libs/@better-auth/core+[...].mjs";
import { n as auth } from "./server-BoaqzEkN.mjs";
import { r as polarWebhookSecret } from "./billing-BeRFwJx3.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as validateEvent, t as WebhookVerificationError } from "../_libs/@polar-sh/sdk+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/locale-B9WCeyaQ.js
var terrainIds = {
	chamonix: "chamonix",
	bonhomme: "bonhomme",
	ferret: "ferret",
	sierre: "sierre",
	haute: "haute",
	dolomites: "dolomites",
	tds: "tds",
	trail: "trail",
	ultra: "ultra",
	expedition: "expedition"
};
var fieldEn = {
	title: "Field notes — Ridgework",
	description: "How the method plays out on real weeks and mountain days: composite field notes, the science behind realistic limits, and the terrain we plan for.",
	kicker: "Field notes",
	h1: "Limits are real. The method is how you meet them with eyes open.",
	lead: "Ridgework is not a slogan. It is a way to spend your actual capacity on the day that matters — and to train less when the week says the honest limit has arrived.",
	compositeNote: "The stories below are composite field notes drawn from coaching patterns. They are not named testimonials, not race results, and not medical case studies.",
	back: "← Ridgework home",
	storyNote: "Note",
	storySource: "Sources",
	teaserH2: "How the method meets a real limit",
	teaserLead: "Field notes, the science we actually use, and the terrain of famous alpine races and routes — without the hype those places usually attract.",
	teaserCta: "Open field notes",
	tabs: {
		stories: "Stories",
		science: "Science",
		terrain: "Terrain"
	},
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
				"Finish was ordinary. Fueling held. No collapse, no story for a feed. The limit M. pushed was completing a long day inside a life that is not a training camp. That is what “toward your own limits, inside realism” looks like on a school-term calendar."
			],
			lesson: "Backing off a quality session is not leaving capacity on the table. It is how the easy volume that actually accumulates is allowed to remain easy.",
			science: "Seiler & Kjerland 2006; Seiler 2010; Esteve-Lanao, Foster, Seiler & Lucia 2007 — more time in the easy zone tracked with better running performance than piling work into the middle."
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
				"Pushing a limit inside realism is not always more work. Sometimes it is spending the week’s capacity on the day that matters, and training less when you are tired."
			],
			lesson: "Backing off a tired week is the method. The outing is the peak, not a hero Tuesday.",
			science: "McCammon 2004 on heuristic traps (commitment, familiarity, expert halo). Bourdon et al. 2017 — load and readiness are planning inputs, not permission slips after you are already on the slope."
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
				"This is the Ridgework claim, stated without theatre: you get closer to your own ceiling when the easy work stays easy, the hard work is actually hard, and the mountain day is allowed to become a different day when the card says so."
			],
			lesson: "A traverse is a sequence of decisions. The log after day one is part of the plan for day two — not a diary for later.",
			science: "Mujika & Padilla 2003 on taper. Foster et al. 2001 — session RPE as a simple internal-load mark you can actually write down at a hut table."
		}
	],
	science: {
		kicker: "What we actually use",
		h2: "The literature is a map. It is not a prescription, and it is not medicine.",
		lead: "We keep a short shelf. Intensity distribution, load as a decision input, taper as a pattern, and a few mountain-decision papers on why people walk past an honest limit. We translate those into checklists. We do not diagnose. We do not claim a private training secret.",
		limitTitle: "What “your own limit” means here",
		limitBody: "A limit is personal and situational: aerobic capacity, skill, sleep, terrain, time. Pushing toward it, inside realism, means arriving at that line with unused panic — not performing a slogan. Most of the work that gets you there is easy on purpose. Most of the courage is in training less when you are tired.",
		sections: [
			{
				title: "Easy volume is how a real ceiling is approached",
				body: [
					"Observational work on elite endurance athletes keeps finding the same shape: a large share of training clearly below the first threshold, a smaller share truly hard, little time parked in the middle. Seiler & Kjerland (2006) measured about 75% of sessions easy in junior skiers. Seiler’s 2010 review treated that polarized (or pyramidal) pattern as best-practice description, not a brand.",
					"Esteve-Lanao, Foster, Seiler and Lucia (2007) then tested distribution in runners: more time in the easy zone tracked with better performance than piling kilometres into threshold. Stöggl and Sperlich (2014) found polarized blocks moved key endurance variables more than threshold-heavy or high-volume-only blocks in their sample.",
					"Ridgework’s planner treats this as a default hypothesis you can edit. The point for limits is blunt. If the easy work is not actually easy, you never accumulate the volume that would have let you stand near your ceiling on the day. “Hard every session” is not pushing a limit. It is spending the limit on Tuesday."
				]
			},
			{
				title: "Load and readiness are inputs, not a diagnosis",
				body: ["Foster’s session RPE (2001) is a one-number internal load: how hard was that, times how long. Bourdon and colleagues’ 2017 consensus statement is the adult version of the same idea — external work and internal response, written down, used to adjust the next session. None of this is a medical test. None of it tells you that you are healthy.", "We use those marks as train / ease / rest hooks in the week. Sleep crashed, niggle appeared: the quality session becomes easy, or the long run shortens, before it becomes junk. That is how you still have a limit left to push on Saturday."]
			},
			{
				title: "Taper is a decision about what you will not do",
				body: ["Mujika and Padilla (2003) summarised pre-competition tapering: volume typically falls while some intensity is kept in shorter doses, so fitness is expressed rather than buried under residual fatigue. We encode that as a 10–14 day block with decision hooks — sleep and kit checks outrank extra kilometres.", "For a mountain weekend or a first 50 km, the taper is the last realistic limit: you cannot add fitness in the final ten days, you can only avoid subtracting it. That is the opposite of last-minute hero mileage."]
			},
			{
				title: "Commitment to the written session is a trap",
				body: ["Ian McCammon’s work on recreational accidents (ISSW 2004) named traps that show up in training as clearly as on a slope: familiarity (“I always do Tuesday intervals”), commitment (“it is on the plan”), scarcity of the only quality slot in the week. Fitness does not cancel those.", "Ridgework’s answer is not a mountain go/no-go card. It is a training input: if you are tired, the week trains less. Extending aerobic base is allowed. The objective date may move. Skipping a wrecked Tuesday is the method working."]
			}
		]
	},
	terrain: {
		kicker: "Terrain",
		h2: "The races and routes these tools were built to stand on",
		lead: "Famous lines are useful because they are specific: vert, weather, turnaround, fueling, freeze–thaw. We do not sell entries. We use the terrain as the planning object.",
		photoNote: "Editorial photographs of alpine trail and hut terrain in the spirit of UTMB country, Sierre-Zinal, the Haute Route, TDS above Courmayeur, and the Dolomites. Not race coverage, not sponsored imagery.",
		items: [
			{
				id: terrainIds.chamonix,
				title: "Chamonix valley under a cloud cap",
				place: "Aiguillette des Houches, Mont Blanc massif",
				caption: "The week of UTMB is a circus. The trail on an ordinary wet day is the actual training object: muddy, dark spruce, the massif hidden. Plan the week for this light, not for the postcard."
			},
			{
				id: terrainIds.bonhomme,
				title: "Col du Bonhomme",
				place: "Tour du Mont Blanc / UTMB south loop",
				caption: "A long, honest climb on wet schist. Polarized weeks exist so this can stay conversational for hours. If it cannot, the week should already have dropped the quality session."
			},
			{
				id: terrainIds.ferret,
				title: "Grand Col Ferret",
				place: "Italy–Switzerland, CCC and UTMB high point",
				caption: "The col every recce dreads. Highest point of the loop, two-stage climb, weather sitting on the Italian side. Turnaround time is a number you write before you leave Courmayeur, not a feeling at the cairn."
			},
			{
				id: terrainIds.sierre,
				title: "Sierre–Zinal balcony",
				place: "Valais — course of the five 4,000s",
				caption: "31 km, +2,200 m, a high traverse with Weisshorn and Matterhorn often in haze. Fast mountain racing still needs easy volume in the months before. The balcony is not a place to discover you trained only in the middle zone."
			},
			{
				id: terrainIds.haute,
				title: "Classic Haute Route",
				place: "Chamonix toward Zermatt",
				caption: "Linked days, glacier weather, hut rhythm. Pack weight and day-two convective risk are the decision objects. A taper into the first hut is more useful than a last extra summit in the valley."
			},
			{
				id: terrainIds.dolomites,
				title: "Tre Cime in fog",
				place: "Dolomites, north circuit",
				caption: "Limestone, puddles, the towers missing. Familiarity is the trap here: the postcard is in your head, the path is this. Train the week you actually have."
			},
			{
				id: terrainIds.tds,
				title: "Technical trail above Courmayeur",
				place: "Italian flank — TDS country",
				caption: "Blocky rock, tired legs, no golden hour. TDS is the technical sibling of the Mont Blanc loop. Skill and turnaround matter as much as the polarized week that got you to the start."
			},
			{
				id: terrainIds.trail,
				title: "Wet forest trail",
				place: "A 20 km objective — spruce, granite, puddles",
				caption: "This is the 10-week object: roots, needle duff, overcast. The long run grows here, not on a dry track. If the week is tired, this stays easy."
			},
			{
				id: terrainIds.ultra,
				title: "High ridge, long day",
				place: "80–120 km country",
				caption: "Hours on a crest in flat light. The 36-week plan exists so this can stay conversational late. Back-to-backs belong in the last specific month, not as a surprise."
			},
			{
				id: terrainIds.expedition,
				title: "High camp under cloud",
				place: "Altitude objective — tents small on purpose",
				caption: "The 40-week plan is hiking and pack, then sleep. Extra altitude in the last fortnight is not fitness. The camp is small because the work was the months before."
			}
		]
	}
};
var fieldFi = {
	title: "Kenttämuistiinpanot — Ridgework",
	description: "Miten metodi toimii oikealla viikolla ja vuoripäivänä: kootut kenttämuistiinpanot, tieteen osa jota käytämme, ja maasto johon suunnittelemme.",
	kicker: "Kenttämuistiinpanot",
	h1: "Rajat ovat tosia. Metodi on tapa kohdata ne silmät auki.",
	lead: "Ridgework ei ole iskulause rajojen rikkomisesta. Se on tapa käyttää todellinen kapasiteetti päivään joka merkitsee — ja pysähtyä, kun vuori, sää tai viikko sanoo rehellisen rajan tulleen.",
	compositeNote: "Tarinat ovat koosteita valmennuksen kaavoista. Ne eivät ole nimettyjä suosituksia, kisatuloksia tai lääketieteellisiä tapauskertomuksia.",
	back: "← Ridgework-etusivu",
	storyNote: "Huomio",
	storySource: "Lähteet",
	teaserH2: "Miten metodi kohtaa oikean rajan",
	teaserLead: "Kenttämuistiinpanoja, tiede jota oikeasti käytämme, ja tunnettujen alppikisojen ja -reittien maasto — ilman sen hypeä jota nämä paikat tavallisesti keräävät.",
	teaserCta: "Avaa kenttämuistiinpanot",
	tabs: {
		stories: "Tarinat",
		science: "Tiede",
		terrain: "Maasto"
	},
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
				"Maali oli tavallinen. Tankkaus piti. Ei romahdusta, ei tarinaa syötteeseen. Raja jota M. työnsi oli pitkä päivä elämässä joka ei ole leiritys. Tätä “omia rajoja kohti, realismin puitteissa” tarkoittaa lukukausikalenterissa."
			],
			lesson: "Laatusession keventäminen ei ole kapasiteetin jättämistä käyttämättä. Se on tapa pitää helppo volyymi oikeasti helppona, jotta se ehtii kertyä.",
			science: "Seiler & Kjerland 2006; Seiler 2010; Esteve-Lanao, Foster, Seiler & Lucia 2007 — suurempi osuus helpossa vyöhykkeessä seurasi parempaa juoksusuoritusta kuin työn kasaaminen keskelle."
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
				"Rajan työntäminen realismin puitteissa ei aina ole lisää työtä. Joskus se on viikon kapasiteetin käyttäminen päivään joka merkitsee, ja vähemmän treeniä kun väsyttää."
			],
			lesson: "Väsyneen viikon keventäminen on metodi. Retki on huippu, ei sankaritiistai.",
			science: "McCammon 2004 heuristisista ansoista (sitoutuminen, tuttuus, expert halo). Bourdon ym. 2017 — kuorma ja valmius ovat suunnittelun syötteitä, eivät lupia kun olet jo rinteessä."
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
				"Tämä on Ridgeworkin väite ilman teatteria: pääset lähemmäs omaa kattoa, kun helppo työ pysyy helppona, kova työ on oikeasti kovaa, ja vuoripäivä saa muuttua toiseksi päiväksi kun kortti niin sanoo."
			],
			lesson: "Ylitys on jono päätöksiä. Ensimmäisen päivän loki on osa toisen päivän suunnitelmaa — ei päiväkirja myöhemmäksi.",
			science: "Mujika & Padilla 2003 taperista. Foster ym. 2001 — session RPE on sisäinen kuormamerkintä jonka voi kirjoittaa tuvan pöytään."
		}
	],
	science: {
		kicker: "Mitä oikeasti käytämme",
		h2: "Kirjallisuus on kartta. Se ei ole määräys, eikä se ole lääketiedettä.",
		lead: "Pidämme lyhyen hyllyn. Intensiteettijakauma, kuorma päätössyötteenä, taper mallina, ja muutama vuoripäätöksen artikkeli siitä miksi rehellinen raja kävellään ohi. Käännämme ne checklisteiksi. Emme diagnosoi. Emme väitä salaisuutta.",
		limitTitle: "Mitä “oma raja” tässä tarkoittaa",
		limitBody: "Raja on henkilökohtainen ja tilannekohtainen: aerobinen kapasiteetti, taito, uni, maasto, aika. Sitä kohti työntäminen, realismin puitteissa, tarkoittaa saapumista siihen linjaan ilman paniikkia — ei iskulauseen esittämistä. Suurin osa työstä joka sinne vie on tahallaan helppoa. Suurin osa rohkeudesta on treenata vähemmän kun väsyttää.",
		sections: [
			{
				title: "Helppo volyymi on tapa lähestyä oikeaa kattoa",
				body: [
					"Eliittikestävyyden seurantatyö löytää saman muodon: suuri osa treenistä selvästi ensimmäisen kynnyksen alla, pienempi osa oikeasti kovaa, vähän aikaa keskellä. Seiler & Kjerland (2006) mittasivat noin 75 % sessioista helpoiksi juniorihiihtäjillä. Seilerin 2010 katsaus käsitteli polarisoitua (tai pyramidia) parhaana kuvauksena, ei brändinä.",
					"Esteve-Lanao, Foster, Seiler ja Lucia (2007) testasivat jakaumaa juoksijoilla: enemmän aikaa helpossa vyöhykkeessä seurasi parempaa suoritusta kuin kilometrien kasaaminen kynnykseen. Stöggl ja Sperlich (2014) näkivät polarisoitujen jaksojen liikuttavan kestävyysmuuttujia enemmän kuin kynnyspainotteiset tai pelkkä suurivolyymi heidän otoksessaan.",
					"Ridgeworkin suunnittelija käsittelee tätä oletushypoteesina jota saa muokata. Rajoille pointti on suora. Jos helppo työ ei ole helppoa, et koskaan kerää volyymia joka antaisi seistä katon lähellä päivänä. “Kova joka sessiossa” ei ole rajan työntämistä. Se on rajan käyttäminen tiistaina."
				]
			},
			{
				title: "Kuorma ja valmius ovat syötteitä, eivät diagnoosi",
				body: ["Fosterin session RPE (2001) on yhden luvun sisäinen kuorma: miten kova, kertaa miten pitkä. Bourdonin ja kollegoiden 2017 konsensus on saman idean aikuisversio — ulkoinen työ ja sisäinen vaste, kirjoitettuna, seuraavan session säätöön. Mikään tästä ei ole lääketieteellinen testi. Mikään ei kerro että olet terve.", "Käytämme merkintöjä treenaa / kevennä / lepää -koukkuina viikossa. Uni romahti, niggle ilmestyi: laatuharjoitus muuttuu helpoksi tai pitkä lyhenee, ennen kuin siitä tulee roskaa. Näin lauantaille jää vielä raja jota työntää."]
			},
			{
				title: "Taper on päätös siitä mitä et tee",
				body: ["Mujika ja Padilla (2003) kokosivat kisakevennyksen: volyymi tyypillisesti laskee, osa intensiteetistä säilyy lyhyempinä annoksina, jotta kunto ilmaistaan eikä haudata jälkiväsymyksen alle. Koodaamme sen 10–14 päivän lohkoksi — uni ja kitti voittavat lisäkilometrit.", "Vuoriviikonlopulle tai ensimmäiselle 50 kilometrille taper on viimeinen realistinen raja: kuntoa ei lisätä viimeiseen kymmeneen päivään, sen voi vain olla vähentämättä. Se on päinvastaista kuin viime hetken sankarikilometrit."]
			},
			{
				title: "Sitoutuminen kirjoitettuun sessioon on ansa",
				body: ["Ian McCammonin työ (ISSW 2004) nimesi ansat jotka näkyvät treenissä yhtä selvästi kuin rinteessä: tuttuus (“tiistain intervallit tehdään aina”), sitoutuminen (“se on suunnitelmassa”), ainoan laatuslotin niukkuus. Kunto ei kumoa niitä.", "Ridgeworkin vastaus ei ole vuoripäivän go/no-go -kortti. Se on treenin syöte: jos väsyttää, viikko treenaa vähemmän. Peruskuntojaksoa saa pidentää. Tavoitepäivä saa siirtyä. Rikkinäisen tiistain skippaaminen on metodi toiminnassa."]
			}
		]
	},
	terrain: {
		kicker: "Maasto",
		h2: "Kisat ja reitit joiden päällä nämä työkalut seisovat",
		lead: "Kuuluisat linjat ovat hyödyllisiä koska ne ovat tarkkoja: nousu, sää, käännös, tankkaus, freeze–thaw. Emme myy paikkoja. Käytämme maastoa suunnittelun kohteena.",
		photoNote: "Toimituksellisia valokuvia alppipolusta ja tupamaastosta UTMB-seudun, Sierre-Zinalin, Haute Routen, Courmayeurin TDS-rinteiden ja Dolomiittien hengessä. Ei kisakuvitusta, ei sponsoroitua kuvastoa.",
		items: [
			{
				id: terrainIds.chamonix,
				title: "Chamonix’n laakso pilvilakin alla",
				place: "Aiguillette des Houches, Mont Blancin massiivi",
				caption: "UTMB-viikko on sirkus. Polku tavallisena märkänä päivänä on varsinainen treenikohde: muta, kuusi, massiivi piilossa. Suunnittele viikko tälle valolle, ei postikortille."
			},
			{
				id: terrainIds.bonhomme,
				title: "Col du Bonhomme",
				place: "Tour du Mont Blanc / UTMB:n eteläkaari",
				caption: "Pitkä, rehellinen nousu märällä liuskeella. Polarisoitu viikko on olemassa jotta tämä voi pysyä puhe-vauhtina tunteja. Jos ei voi, viikon piti jo dropata laatutreeni."
			},
			{
				id: terrainIds.ferret,
				title: "Grand Col Ferret",
				place: "Italia–Sveitsi, CCC:n ja UTMB:n korkein kohta",
				caption: "Col jota jokainen recce pelkää. Silmukan korkein kohta, kaksivaiheinen nousu, sää Italian puolella. Käännösaika on luku jonka kirjoitat ennen Courmayeuria, ei tunne cairnilla."
			},
			{
				id: terrainIds.sierre,
				title: "Sierre–Zinalin parveke",
				place: "Valais — viiden nelitonnin reitti",
				caption: "31 km, +2 200 m, korkea ylitys jossa Weisshorn ja Matterhorn usein utuisina. Nopea vuorijuoksu tarvitsee silti helppoa volyymia kuukausia ennen. Parveke ei ole paikka huomata että treenasit vain keskivyöhykkeessä."
			},
			{
				id: terrainIds.haute,
				title: "Klassinen Haute Route",
				place: "Chamonix kohti Zermattia",
				caption: "Linkitetyt päivät, jäätikön sää, tuvan rytmi. Rinkkapaino ja toisen päivän konvektio ovat päätöskohteet. Taper ensimmäiselle tuvalle on hyödyllisempi kuin extra-huippu laaksossa."
			},
			{
				id: terrainIds.dolomites,
				title: "Tre Cime sumussa",
				place: "Dolomiitit, pohjoinen kierto",
				caption: "Kalkkikivi, lätäköt, tornit poissa. Tuttuus on ansa: postikortti on päässä, polku on tämä. Treenaa se viikko joka sinulla on."
			},
			{
				id: terrainIds.tds,
				title: "Tekninen polku Courmayeurin yllä",
				place: "Italian kylki — TDS-maasto",
				caption: "Lohkareinen kallio, väsyneet jalat, ei kultaista tuntia. TDS on Mont Blanc -silmukan tekninen sisarus. Taito ja käännös merkitsevät yhtä paljon kuin polarisoitu viikko joka vei lähtöön."
			},
			{
				id: terrainIds.trail,
				title: "Märkä metsäpolku",
				place: "20 km tavoite — kuusi, graniitti, lätäköt",
				caption: "Tämä on 10 viikon kohde: juuret, neulaset, pilvinen valo. Pitkä kasvaa täällä, ei kuivalla radalla. Jos viikko on väsynyt, tämä pysyy kevyenä."
			},
			{
				id: terrainIds.ultra,
				title: "Korkea harjanne, pitkä päivä",
				place: "80–120 km -maasto",
				caption: "Tunteja harjanteella tasaisessa valossa. 36 viikon suunnitelma on olemassa jotta tämä voi pysyä puhevauhdissa myöhään. Peräkkäiset päivät kuuluvat spesifin viimeiseen kuukauteen, ei yllätykseksi."
			},
			{
				id: terrainIds.expedition,
				title: "Korkea leiri pilven alla",
				place: "Korkeustavoite — teltat pieninä tarkoituksella",
				caption: "40 viikon suunnitelma on vaellus ja rinkka, sitten uni. Lisäkorkeus kahdessa viimeisessä viikossa ei ole kuntoa. Leiri on pieni koska työ oli kuukausia ennen."
			}
		]
	}
};
var fieldFr = {
	title: "Carnets de terrain — Ridgework",
	description: "Comment la méthode se joue sur une vraie semaine et un jour de montagne : carnets composites, la science que nous utilisons, le terrain que nous planifions.",
	kicker: "Carnets de terrain",
	h1: "Les limites sont réelles. La méthode, c’est les rencontrer les yeux ouverts.",
	lead: "Ridgework n’est pas un slogan pour briser des barrières. C’est une façon de dépenser votre capacité réelle le jour qui compte — et de s’arrêter quand la montagne, la météo ou la semaine dit que la limite honnête est là.",
	compositeNote: "Les récits sont des carnets composites tirés de schémas d’accompagnement. Ce ne sont pas des témoignages nominatifs, ni des résultats de course, ni des cas médicaux.",
	back: "← Accueil Ridgework",
	storyNote: "Note",
	storySource: "Sources",
	teaserH2: "Comment la méthode rencontre une vraie limite",
	teaserLead: "Carnets de terrain, la science que nous utilisons vraiment, et le terrain des courses et itinéraires alpins connus — sans le hype que ces lieux attirent.",
	teaserCta: "Ouvrir les carnets",
	tabs: {
		stories: "Récits",
		science: "Science",
		terrain: "Terrain"
	},
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
				"L’arrivée était ordinaire. Le ravitaillement a tenu. Pas d’effondrement. La limite poussée par M. était une longue journée dans une vie qui n’est pas un stage. Voilà “vers ses propres limites, dans le réel” sur un calendrier scolaire."
			],
			lesson: "Alléger une séance de qualité n’est pas laisser de la capacité de côté. C’est permettre au volume facile de rester facile pour qu’il s’accumule.",
			science: "Seiler & Kjerland 2006 ; Seiler 2010 ; Esteve-Lanao, Foster, Seiler & Lucia 2007 — plus de temps en zone facile suivait une meilleure performance en course que d’empiler le travail au milieu."
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
				"Pousser une limite dans le réel, ce n’est pas toujours plus de travail. Parfois c’est dépenser la capacité de la semaine le jour qui compte, et s’entraîner moins quand on est fatigué."
			],
			lesson: "Alléger une semaine fatiguée, c’est la méthode. La sortie est le pic, pas un mardi héroïque.",
			science: "McCammon 2004 sur les pièges heuristiques. Bourdon et al. 2017 — la charge et la readiness sont des entrées de planification, pas des permis une fois sur la pente."
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
				"La thèse Ridgework, sans théâtre : on se rapproche de son plafond quand le facile reste facile, le dur est vraiment dur, et le jour de montagne a le droit de devenir un autre jour quand la carte le dit."
			],
			lesson: "Une traversée est une suite de décisions. Le carnet après le jour un fait partie du plan du jour deux — ce n’est pas un journal pour plus tard.",
			science: "Mujika & Padilla 2003 sur l’affûtage. Foster et al. 2001 — le RPE de séance comme marque de charge interne que l’on peut écrire à la table du refuge."
		}
	],
	science: {
		kicker: "Ce que nous utilisons vraiment",
		h2: "La littérature est une carte. Ce n’est pas une prescription, et ce n’est pas de la médecine.",
		lead: "Une étagère courte. Distribution d’intensité, charge comme entrée de décision, affûtage comme patron, et quelques papiers sur pourquoi on dépasse une limite honnête en montagne. Nous en faisons des checklists. Nous ne diagnostiquons pas.",
		limitTitle: "Ce que “votre propre limite” veut dire ici",
		limitBody: "Une limite est personnelle et situationnelle : capacité aérobie, technique, sommeil, terrain, temps. La pousser, dans le réel, c’est arriver à cette ligne sans panique — pas jouer un slogan. La plus grande part du travail qui y mène est facile exprès. Le courage est de s’entraîner moins quand on est fatigué.",
		sections: [
			{
				title: "Le volume facile est la façon d’approcher un vrai plafond",
				body: [
					"Les travaux d’observation sur les endurants d’élite retrouvent la même forme : une grande part nettement sous le premier seuil, une plus petite vraiment dure, peu de temps au milieu. Seiler & Kjerland (2006) : environ 75 % de séances faciles chez des fondeurs juniors. La revue de Seiler (2010) décrit le polarisé (ou pyramidal) comme description de bonne pratique, pas comme marque.",
					"Esteve-Lanao, Foster, Seiler et Lucia (2007) : plus de temps en zone facile suivait une meilleure performance que d’empiler les kilomètres au seuil. Stöggl et Sperlich (2014) : des blocs polarisés déplaçaient davantage les variables clés que des blocs au seuil ou à haut volume seul, dans leur échantillon.",
					"Le planificateur Ridgework traite cela comme une hypothèse par défaut, éditable. Le point pour les limites est net. Si le facile n’est pas facile, vous n’accumulez jamais le volume qui vous laisserait près du plafond le jour J. “Dur à chaque séance” n’est pas pousser une limite. C’est la dépenser mardi."
				]
			},
			{
				title: "Charge et readiness sont des entrées, pas un diagnostic",
				body: ["Le RPE de séance de Foster (2001) est une charge interne en un nombre. Le consensus de Bourdon et al. (2017) est la version adulte : travail externe et réponse interne, écrits, pour ajuster la séance suivante. Rien de ceci n’est un test médical.", "Nous les utilisons comme crochets entraîner / alléger / reposer dans la semaine. Sommeil cassé, niggle : la qualité devient facile, ou la longue raccourcit. C’est ainsi qu’il reste une limite à pousser samedi."]
			},
			{
				title: "L’affûtage est une décision sur ce que vous ne ferez pas",
				body: ["Mujika et Padilla (2003) : le volume baisse typiquement, une part d’intensité reste en doses plus courtes, pour que la forme s’exprime. Nous l’encodons en bloc de 10–14 jours — sommeil et matériel battent les kilomètres en plus.", "Pour un week-end de montagne ou un premier 50 km, l’affûtage est la dernière limite réaliste : on n’ajoute pas de forme dans les dix derniers jours, on évite seulement d’en retrancher."]
			},
			{
				title: "S’engager sur la séance écrite est un piège",
				body: ["McCammon (ISSW 2004) a nommé des pièges qui apparaissent aussi à l’entraînement : familiarité (“je fais toujours les intervalles du mardi”), engagement (“c’est sur le plan”). La forme ne les annule pas.", "La réponse Ridgework n’est pas une carte go/no-go de montagne. C’est une entrée d’entraînement : si vous êtes fatigué, la semaine s’entraîne moins. Allonger la base est permis. La date d’objectif peut bouger."]
			}
		]
	},
	terrain: {
		kicker: "Terrain",
		h2: "Les courses et itinéraires sur lesquels ces outils sont construits",
		lead: "Les lignes célèbres sont utiles parce qu’elles sont précises : dénivelé, météo, demi-tour, ravitaillement, gel–dégel. Nous ne vendons pas d’inscriptions. Nous prenons le terrain comme objet de planification.",
		photoNote: "Photographies éditoriales de sentier et de refuges dans l’esprit du pays UTMB, de Sierre-Zinal, de la Haute Route, du TDS au-dessus de Courmayeur, et des Dolomites. Pas de couverture de course, pas d’images sponsorisées.",
		items: [
			{
				id: terrainIds.chamonix,
				title: "Vallée de Chamonix sous un chapeau de nuages",
				place: "Aiguillette des Houches, massif du Mont Blanc",
				caption: "La semaine de l’UTMB est un cirque. Le sentier d’un jour mouillé ordinaire est l’objet d’entraînement : boue, épicéas, massif caché. Planifiez la semaine pour cette lumière, pas pour la carte postale."
			},
			{
				id: terrainIds.bonhomme,
				title: "Col du Bonhomme",
				place: "Tour du Mont Blanc / boucle sud UTMB",
				caption: "Une montée longue et honnête sur schiste mouillé. Les semaines polarisées existent pour que cela reste conversationnel des heures. Sinon, l’appel du jour aurait déjà dû modifier la ligne."
			},
			{
				id: terrainIds.ferret,
				title: "Grand Col Ferret",
				place: "Italie–Suisse, point haut de la CCC et de l’UTMB",
				caption: "Le col que chaque recce redoute. Point le plus haut de la boucle, montée en deux temps, météo côté italien. L’heure de demi-tour s’écrit avant de quitter Courmayeur, pas au cairn."
			},
			{
				id: terrainIds.sierre,
				title: "Balcon de Sierre–Zinal",
				place: "Valais — course des cinq 4 000",
				caption: "31 km, +2 200 m, une traversée haute où Weisshorn et Cervin sont souvent dans la brume. Une course de montagne rapide a tout de même besoin de volume facile dans les mois d’avant."
			},
			{
				id: terrainIds.haute,
				title: "Haute Route classique",
				place: "Chamonix vers Zermatt",
				caption: "Jours liés, météo de glacier, rythme de refuge. Poids du sac et convection du jour deux sont les objets de décision. Un affûtage vers le premier refuge vaut mieux qu’un sommet de trop dans la vallée."
			},
			{
				id: terrainIds.dolomites,
				title: "Tre Cime dans le brouillard",
				place: "Dolomites, circuit nord",
				caption: "Calcaire, flaques, les tours absentes. La familiarité est le piège : la carte postale est dans la tête, le chemin est celui-ci. Entraînez la semaine que vous avez."
			},
			{
				id: terrainIds.tds,
				title: "Sentier technique au-dessus de Courmayeur",
				place: "Versant italien — pays du TDS",
				caption: "Roche en blocs, jambes lourdes, pas d’heure dorée. Le TDS est le frère technique de la boucle du Mont Blanc. La technique et le demi-tour comptent autant que la semaine polarisée qui vous a mené au départ."
			},
			{
				id: terrainIds.trail,
				title: "Sentier forestier mouillé",
				place: "Objectif 20 km — épicéa, granite, flaques",
				caption: "Voici l’objet des 10 semaines : racines, aiguilles, ciel couvert. La longue grandit ici, pas sur une piste sèche. Si la semaine est fatiguée, cela reste facile."
			},
			{
				id: terrainIds.ultra,
				title: "Crête haute, longue journée",
				place: "Pays des 80–120 km",
				caption: "Des heures sur une crête en lumière plate. Le plan de 36 semaines existe pour que cela reste conversationnel tard. Les back-to-backs appartiennent au dernier mois spécifique, pas à la surprise."
			},
			{
				id: terrainIds.expedition,
				title: "Camp d’altitude sous nuage",
				place: "Objectif altitude — tentes petites exprès",
				caption: "Le plan de 40 semaines est rando et sac, puis sommeil. L’altitude extra dans les deux dernières semaines n’est pas de la forme. Le camp est petit parce que le travail était les mois d’avant."
			}
		]
	}
};
var fieldDe = {
	title: "Feldnotizen — Ridgework",
	description: "Wie die Methode in einer echten Woche und an einem Bergtag läuft: zusammengesetzte Feldnotizen, die Wissenschaft, die wir nutzen, das Gelände, das wir planen.",
	kicker: "Feldnotizen",
	h1: "Grenzen sind real. Die Methode ist, ihnen mit offenen Augen zu begegnen.",
	lead: "Ridgework ist kein Slogan vom Grenzen-Sprengen. Es ist ein Weg, die tatsächliche Kapazität am Tag auszugeben, der zählt — und zu stoppen, wenn Berg, Wetter oder Woche sagen, dass die ehrliche Grenze da ist.",
	compositeNote: "Die Geschichten sind zusammengesetzte Feldnotizen aus Coaching-Mustern. Keine namentlichen Testimonials, keine Rennergebnisse, keine medizinischen Fälle.",
	back: "← Ridgework-Start",
	storyNote: "Hinweis",
	storySource: "Quellen",
	teaserH2: "Wie die Methode auf eine echte Grenze trifft",
	teaserLead: "Feldnotizen, die Wissenschaft, die wir wirklich nutzen, und das Gelände bekannter Alpenrennen und -routen — ohne den Hype, den diese Orte sonst anziehen.",
	teaserCta: "Feldnotizen öffnen",
	tabs: {
		stories: "Geschichten",
		science: "Wissenschaft",
		terrain: "Gelände"
	},
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
				"Das Ziel war gewöhnlich. Die Verpflegung hielt. Kein Kollaps. Die Grenze, die M. schob, war ein langer Tag in einem Leben, das kein Trainingslager ist. Das ist “in Richtung der eigenen Grenzen, innerhalb des Realen” im Schulkalender."
			],
			lesson: "Eine Qualitätseinheit zu entschärfen heißt nicht, Kapazität liegen zu lassen. Es heißt, das leichte Volumen leicht zu lassen, damit es sich stapeln kann.",
			science: "Seiler & Kjerland 2006; Seiler 2010; Esteve-Lanao, Foster, Seiler & Lucia 2007 — mehr Zeit in der leichten Zone hing mit besserer Laufleistung zusammen als Arbeit in der Mitte."
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
				"Eine Grenze im Realen zu schieben heißt nicht immer mehr Arbeit. Manchmal heißt es, die Kapazität der Woche am Tag auszugeben, der zählt — und weniger zu trainieren, wenn du müde bist."
			],
			lesson: "Eine müde Woche zu entlasten ist die Methode. Die Tour ist der Peak, kein Helden-Dienstag.",
			science: "McCammon 2004 zu Heuristik-Fallen. Bourdon et al. 2017 — Last und Readiness sind Planungseingaben, keine Genehmigungen, wenn man schon am Hang steht."
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
				"Die Ridgework-Behauptung ohne Theater: du kommst deiner Decke näher, wenn die leichte Arbeit leicht bleibt, die harte wirklich hart ist, und der Bergtag ein anderer Tag werden darf, wenn die Karte das sagt."
			],
			lesson: "Eine Traverse ist eine Folge von Entscheidungen. Das Log nach Tag eins ist Teil des Plans für Tag zwei — kein Tagebuch für später.",
			science: "Mujika & Padilla 2003 zur Taper. Foster et al. 2001 — Session-RPE als interne Last, die man am Hüttentisch notieren kann."
		}
	],
	science: {
		kicker: "Was wir wirklich nutzen",
		h2: "Die Literatur ist eine Karte. Sie ist keine Vorschrift und keine Medizin.",
		lead: "Ein kurzes Regal. Intensitätsverteilung, Last als Entscheidungseingabe, Taper als Muster, und ein paar Papiere dazu, warum man an einer ehrlichen Grenze vorbeigeht. Wir machen Checklisten daraus. Wir diagnostizieren nicht.",
		limitTitle: "Was “deine eigene Grenze” hier heißt",
		limitBody: "Eine Grenze ist persönlich und situativ: aerobe Kapazität, Können, Schlaf, Gelände, Zeit. Darauf zuzugehen, im Realen, heißt, an dieser Linie ohne Panik anzukommen — kein Slogan. Der größte Teil der Arbeit dorthin ist absichtlich leicht. Der Mut sitzt darin, weniger zu trainieren, wenn du müde bist.",
		sections: [
			{
				title: "Leichtes Volumen ist der Weg an eine echte Decke",
				body: [
					"Beobachtungsarbeit an Elite-Ausdauer findet dieselbe Form: großer Anteil klar unter der ersten Schwelle, kleinerer wirklich hart, wenig Zeit in der Mitte. Seiler & Kjerland (2006): etwa 75 % leichte Einheiten bei Junior-Langläufern. Seilers Review 2010 beschreibt polarisiert (oder pyramidal) als Best-Practice-Beschreibung, nicht als Marke.",
					"Esteve-Lanao, Foster, Seiler und Lucia (2007): mehr Zeit in der leichten Zone hing mit besserer Leistung zusammen als Kilometer an der Schwelle. Stöggl und Sperlich (2014): polarisierte Blöcke bewegten Schlüsselgrößen stärker als schwellenlastige oder nur-hohe-Volumen-Blöcke in ihrer Stichprobe.",
					"Der Ridgework-Planer behandelt das als editierbare Ausgangshypothese. Der Punkt für Grenzen ist scharf. Ist die leichte Arbeit nicht leicht, sammelst du nie das Volumen, das dich am Tag nahe der Decke stehen ließe. “Hart in jeder Einheit” ist keine Grenze schieben. Es ist die Grenze am Dienstag ausgeben."
				]
			},
			{
				title: "Last und Readiness sind Eingaben, keine Diagnose",
				body: ["Fosters Session-RPE (2001) ist interne Last in einer Zahl. Bourdon et al. 2017 ist die Erwachsenenversion: äußere Arbeit und innere Antwort, aufgeschrieben, für die nächste Einheit. Nichts davon ist ein medizinischer Test.", "Wir nutzen die Marken als trainieren / entlasten / ruhen in der Woche. Schlaf weg, Niggle: die Qualität wird leicht, oder der Lange kürzer. So bleibt samstags eine Grenze zum Schieben."]
			},
			{
				title: "Taper ist eine Entscheidung über das, was du nicht tust",
				body: ["Mujika und Padilla (2003): Volumen sinkt typisch, etwas Intensität bleibt in kürzeren Dosen, damit Form sich zeigt. Wir kodieren das als 10–14-Tage-Block — Schlaf und Kit schlagen Extra-Kilometer.", "Für ein Bergwochenende oder erste 50 km ist die Taper die letzte realistische Grenze: in den letzten zehn Tagen fügst du keine Form hinzu, du vermeidest nur, sie abzuziehen."]
			},
			{
				title: "Commitment zur geschriebenen Einheit ist eine Falle",
				body: ["McCammon (ISSW 2004) benannte Fallen, die auch im Training auftauchen: Vertrautheit (“Dienstag-Intervalle mache ich immer”), Commitment (“steht im Plan”). Form hebt sie nicht auf.", "Ridgeworks Antwort ist keine Berg-Go/No-Go-Karte. Es ist eine Trainingseingabe: wenn du müde bist, trainiert die Woche weniger. Die Basis darf länger werden. Das Zieldatum darf rücken."]
			}
		]
	},
	terrain: {
		kicker: "Gelände",
		h2: "Die Rennen und Routen, auf denen diese Tools stehen",
		lead: "Berühmte Linien sind nützlich, weil sie konkret sind: Höhenmeter, Wetter, Umkehr, Verpflegung, Frost-Tau. Wir verkaufen keine Startplätze. Wir nehmen das Gelände als Planungsobjekt.",
		photoNote: "Redaktionelle Fotografien von Alpenpfad und Hüttengelände im Geist von UTMB-Land, Sierre-Zinal, Haute Route, TDS über Courmayeur und den Dolomiten. Keine Rennberichterstattung, keine gesponserten Bilder.",
		items: [
			{
				id: terrainIds.chamonix,
				title: "Chamonix-Tal unter einer Wolkenkappe",
				place: "Aiguillette des Houches, Mont-Blanc-Massiv",
				caption: "Die UTMB-Woche ist ein Zirkus. Der Pfad an einem gewöhnlichen nassen Tag ist das Trainingsobjekt: Matsch, Fichte, Massiv versteckt. Plane die Woche für dieses Licht, nicht für die Postkarte."
			},
			{
				id: terrainIds.bonhomme,
				title: "Col du Bonhomme",
				place: "Tour du Mont Blanc / UTMB-Südbogen",
				caption: "Ein langer, ehrlicher Anstieg auf nassem Schiefer. Polarisierte Wochen gibt es, damit das stundenlang gesprächig bleiben kann. Wenn nicht, hätte die Woche die Qualitätseinheit schon streichen müssen."
			},
			{
				id: terrainIds.ferret,
				title: "Grand Col Ferret",
				place: "Italien–Schweiz, Hochpunkt von CCC und UTMB",
				caption: "Der Col, den jede Recce fürchtet. Höchster Punkt der Runde, zweistufiger Anstieg, Wetter auf der italienischen Seite. Die Umkehrzeit schreibst du vor Courmayeur, nicht am Steinmann."
			},
			{
				id: terrainIds.sierre,
				title: "Sierre–Zinal-Balkon",
				place: "Wallis — Rennen der fünf Viertausender",
				caption: "31 km, +2.200 m, eine hohe Querung, Weisshorn und Matterhorn oft im Dunst. Schnelles Bergrennen braucht trotzdem leichtes Volumen in den Monaten davor."
			},
			{
				id: terrainIds.haute,
				title: "Klassische Haute Route",
				place: "Chamonix Richtung Zermatt",
				caption: "Verbundene Tage, Gletscherwetter, Hüttenrhythmus. Packgewicht und Konvektion an Tag zwei sind die Entscheidungsobjekte. Eine Taper in die erste Hütte nützt mehr als ein Extra-Gipfel im Tal."
			},
			{
				id: terrainIds.dolomites,
				title: "Tre Cime im Nebel",
				place: "Dolomiten, Nordrunde",
				caption: "Kalk, Pfützen, die Türme fehlen. Vertrautheit ist die Falle: die Postkarte sitzt im Kopf, der Weg ist dieser. Trainiere die Woche, die du hast."
			},
			{
				id: terrainIds.tds,
				title: "Technischer Trail über Courmayeur",
				place: "Italienische Flanke — TDS-Land",
				caption: "Blockiger Fels, müde Beine, keine goldene Stunde. TDS ist das technische Geschwister der Mont-Blanc-Runde. Können und Umkehr zählen so viel wie die polarisierte Woche, die dich an den Start brachte."
			},
			{
				id: terrainIds.trail,
				title: "Nasser Waldpfad",
				place: "20-km-Ziel — Fichte, Granit, Pfützen",
				caption: "Das ist das 10-Wochen-Objekt: Wurzeln, Nadeln, bedecktes Licht. Der Lange wächst hier, nicht auf trockener Bahn. Ist die Woche müde, bleibt das locker."
			},
			{
				id: terrainIds.ultra,
				title: "Hoher Grat, langer Tag",
				place: "80–120-km-Gelände",
				caption: "Stunden auf einem Grat im flachen Licht. Der 36-Wochen-Plan existiert, damit das spät gesprächig bleiben kann. Back-to-backs gehören in den letzten spezifischen Monat, nicht als Überraschung."
			},
			{
				id: terrainIds.expedition,
				title: "Höhenlager unter Wolken",
				place: "Höhenziel — Zelte absichtlich klein",
				caption: "Der 40-Wochen-Plan ist Wandern und Pack, dann Schlaf. Extra Höhe in den letzten zwei Wochen ist keine Fitness. Das Lager ist klein, weil die Arbeit die Monate davor war."
			}
		]
	}
};
var copies = {
	en: {
		metaTitle: "Ultra and trail training plans — Ridgework",
		metaDescription: "What to run this week for a 20 km trail, 50 km or 100 km ultra, or an alpine day. You pick the peak date. Tired weeks train less. 14 days free, then €5/month.",
		footerTag: "Weekly training for trail, ultra, and mountains.",
		legalEntity: "Ridgework, Magnieu, France. Company registration in progress.",
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
			account: "Account"
		},
		cta: {
			start: "Start 14 days free",
			pricing: "See pricing",
			openTools: "Open tools"
		},
		hero: {
			kicker: "Trail and ultra training",
			h1: "77 km in six weeks. What do you run on Tuesday?",
			lead: "You slept five hours. Long run yesterday. Knee at 2/10. Heat on Sunday. From that, the week is: skip intervals, run easy, move the long. Race day does not move.",
			trial: "14 days free. Then €5/month. Cancel anytime."
		},
		about: {
			kicker: "About",
			h2: "A small training desk in France",
			lead: "Ridgework writes the week you can actually run: peak date, fatigue, terrain. Support is a coaching inbox, not a chatbot pitch.",
			cards: [
				{
					title: "A week on the calendar",
					body: "Load, easy volume, one quality dose if you are fresh. The boring parts that add up."
				},
				{
					title: "Tired means less work",
					body: "Sleep, niggles, and heat change Tuesday. They do not cancel the outing."
				},
				{
					title: "Plain prices",
					body: "Fourteen days to use it. Then €5/month while you stay. No fake reviews."
				}
			],
			foot: "We start in the EU, UK, and Switzerland."
		},
		method: {
			kicker: "Why the week looks like this",
			h2: "Most days easy. One hard session, or none.",
			lead: "The week is built from a small set of well-cited endurance papers: lots of easy volume, load as a planning input, taper before the day. Checklists, not diagnoses.",
			cards: [
				{
					title: "Intensity distribution",
					body: "Much of the endurance literature describes a large share of easy aerobic volume, with a smaller share of harder work, often discussed as polarized or pyramidal distributions. Our planners treat that pattern as a default hypothesis you can adjust, not a rigid prescription."
				},
				{
					title: "Load as a week input",
					body: "Session logs, sleep, and a simple fatigue mark change Tuesday. Monitoring plans training. It does not diagnose health."
				},
				{
					title: "Taper as a planning pattern",
					body: "Before an objective, volume typically steps down while key intensities are preserved in shorter doses. We encode that as a reusable block: sleep and kit outrank extra kilometres."
				}
			],
			caveatsTitle: "Honest caveats",
			caveats: [
				"Individual response varies. Age, history, terrain, and life stress change what works.",
				"Published averages are not a prescription and do not replace a clinician when health questions arise.",
				"We turn that literature into a week you can run."
			],
			sourcesTitle: "Sources (Crossref-verified)"
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
							value: "Arrive on the alpine day with unused legs, not a wrecked Tuesday"
						},
						{
							label: "Plan",
							value: "10 weeks — 6 wk aerobic + vert base, 3 wk specific, 10–14 day taper into the forecast window"
						},
						{
							label: "Focus",
							value: "Keep easy volume easy; add conversational vert; peak for the weather window, not extra kilometres"
						},
						{
							label: "Fatigue / load",
							value: "If sleep or legs are gone, drop the quality session. The weekend is the peak, not Tuesday."
						}
					]
				},
				{
					title: "First 50 km trail",
					fields: [
						{
							label: "Goal",
							value: "Finish well, not just finish — fueling and pacing under control"
						},
						{
							label: "Plan",
							value: "6 months (24 weeks) — 10 wk aerobic base, 12 wk long-run build, 10–14 day taper to peak race week"
						},
						{
							label: "Focus",
							value: "Easy volume first, then long-run progression and one quality session; peak on race week"
						},
						{
							label: "Key session recipe",
							value: "Week 20 (end of specific): 3×12 min at marathon effort on rolling trail, 4 min easy; heat and niggle gates before start. Then 10–14 days taper.",
							locked: true
						}
					]
				},
				{
					title: "Hut-to-hut alpine traverse",
					fields: [
						{
							label: "Goal",
							value: "Three days linked because day-two training was allowed to shrink"
						},
						{
							label: "Plan",
							value: "8 months — winter–spring aerobic/hiking base, 10 wk pack and back-to-backs, 10–14 day taper into day 1"
						},
						{
							label: "Focus",
							value: "Build legs in the base months; specific block is pack + back-to-backs; peak for day 1, not a dump on day 3"
						},
						{
							label: "Fatigue / load",
							value: "If day-one leftovers sit in the legs, cut day-two volume. Day three still needs a reserve."
						}
					]
				}
			]
		},
		programs: {
			kicker: "Programs",
			h2: "Seven programs. Tell us when you need to be ready.",
			lead: "No race on the calendar? Start with easy volume at a low heart rate. More weeks before the day almost always means a sturdier base.",
			columns: {
				name: "Program",
				duration: "Duration",
				focus: "Focus",
				recipe: "Session recipe"
			},
			rows: [
				{
					id: "engine",
					name: "Aerobic engine",
					duration: "About 16 weeks of easy running",
					focus: "More work at conversation pace. Fat as default fuel. No race required.",
					locked: "Most days easy enough to talk. The long grows toward 90 minutes. There is no separate quality session: this is the quality.",
					pull: "If you can finish a sentence, you are in the work.",
					layout: "textFirst"
				},
				{
					id: "trail20",
					name: "20 km trail",
					duration: "Ten weeks is enough for most",
					focus: "Easy volume, one quality dose, a long toward 90–110 min",
					locked: "Week 8: 6×3 min at 10k effort on rolling trail, 2 min easy. Long 90–110 min. Then a 7-day taper.",
					layout: "sessionLead"
				},
				{
					id: "fifty",
					name: "50 km ultra",
					duration: "About half a year",
					focus: "Aerobic base, then long-run progression, peak race week",
					locked: "Week 20: 3×12 min at marathon effort on trail. Then 10–14 days of easing off.",
					tag: "A first ultra for a lot of people",
					pull: "Finish well, not just finish.",
					layout: "wide"
				},
				{
					id: "ultra100",
					name: "80–120 km ultra",
					duration: "Often nine months",
					focus: "Months of easy time on feet, late back-to-backs, four-week taper",
					locked: "Week 30: Sat 4–5 h easy trail, Sun 2.5–3 h easy. Midweek stays conversational. Then 3–4 weeks taper."
				},
				{
					id: "alpine",
					name: "Alpine day",
					duration: "About ten weeks",
					focus: "Aerobic approaches, climbing and strength, then a mountain day",
					locked: "Week 8: climbing session (rock, ice, or gym) plus 30–40 min of strength. Approaches stay easy. Tired? Climbing becomes hiking.",
					tag: "Includes climbing",
					layout: "sessionLead"
				},
				{
					id: "traverse",
					name: "Multi-day alpine route",
					duration: "About eight months",
					focus: "Hiking base, then climbing plus pack back-to-backs, peak on day 1",
					locked: "Week 28: climbing day, then a linked hike with pack. Cut day 2 if leftovers sit in the legs.",
					layout: "compact"
				},
				{
					id: "expedition",
					name: "High-altitude expedition",
					duration: "About ten months",
					focus: "Hiking and easy volume, pack carries. The last weeks are sleep and kit.",
					locked: "Week 34: pack carry 3–4 h on a hike, then a rest day. One night out if life allows. The last weeks are sleep and packing, not extra altitude."
				}
			],
			lockHint: "This week’s key session"
		},
		who: {
			h2: "Who it’s for, and who it isn’t",
			forTitle: "Built for",
			forItems: [
				"Endurance athletes planning training weeks around real life and terrain",
				"People training toward an aerobic engine, a 20 km trail, a 50 or 100 km ultra, an alpine day, a linked route, or a high camp",
				"Anyone who will actually drop a session when they are tired",
				"Anyone who prefers calm tools over motivational spam"
			],
			notTitle: "Not for",
			notItems: [
				"Injury diagnosis or treatment",
				"VO2 hacks, race-winning secrets, hustle culture",
				"A live personal trainer in your pocket",
				"Emergency or mountain-rescue guidance"
			]
		},
		what: {
			h2: "What you get",
			items: [
				{
					n: "01",
					title: "Weeks written back from a ready date",
					body: "You say when the race or the outing has to be ready. Then easy base, a specific block, an easy-down. If you have weeks to spare, the base can grow."
				},
				{
					n: "02",
					title: "Fatigue as a training input",
					body: "If you are tired, the week trains less. Hard sessions become easy. Wrecked weeks rest. The peak date stays."
				},
				{
					n: "03",
					title: "Kit and fuel for this week",
					body: "Shoes, layers, drink, and sleep written for the week you are actually running."
				},
				{
					n: "04",
					title: "Training log",
					body: "Note what you did and why you changed load, so next week is grounded in the week you had."
				}
			]
		},
		week: {
			h2: "How a week works",
			steps: [
				{
					day: "Mon",
					title: "Write the week",
					body: "Peak date is already set. This week gets easy volume, one quality dose if you are fresh, and the long."
				},
				{
					day: "Tue",
					title: "Check sleep and legs",
					body: "Five hours of sleep? Intervals become 45–60 min easy. The race date does not move."
				},
				{
					day: "Thu",
					title: "Keep easy easy",
					body: "Most of the week stays conversational. If you can talk, you are in the work."
				},
				{
					day: "Sun",
					title: "Log what happened",
					body: "Note the long, the heat, the niggle. Next week is written from that, not from the plan you wished you had."
				}
			]
		},
		scenario: {
			kicker: "Example",
			h2: "A real Tuesday, not a slogan",
			setup: "You have 6 weeks until your 77 km ultra.",
			facts: [
				{
					label: "Sleep last night",
					value: "5 hours"
				},
				{
					label: "Yesterday",
					value: "32 km long run"
				},
				{
					label: "Right knee",
					value: "2/10 discomfort"
				},
				{
					label: "Sunday forecast",
					value: "28°C"
				}
			],
			says: "This week’s call",
			actions: [
				"Skip today’s intervals",
				"45–60 min easy instead",
				"Move the long run to Monday if Sunday stays hot",
				"Drink 500–750 ml/h on the long — salt if you usually need it",
				"Reassess tomorrow"
			],
			note: "Not a diagnosis. If the knee is swelling, locking, or getting worse, that is a clinician. This is a training week."
		},
		firstWeek: {
			kicker: "Your first 14 days",
			h2: "What happens after you sign in",
			lead: "€5 is cheap. The point of the free stretch is to run a real week, not to admire a price.",
			days: [
				{
					day: "Day 1",
					title: "Pick the peak and build the week",
					body: "77 km, alpine day, or just the engine. The next three weeks appear on the calendar."
				},
				{
					day: "Day 3",
					title: "Adjust from fatigue",
					body: "Sleep was short. Hard work becomes easy. The peak date stays."
				},
				{
					day: "Day 6",
					title: "Prep the long run",
					body: "Kit, drink, and pace you have already used. No new gel."
				},
				{
					day: "Day 7",
					title: "Log what actually happened",
					body: "The next week is written from that log, not from a fantasy block."
				}
			]
		},
		guidesIndex: {
			kicker: "Guides",
			h2: "Training questions, written out",
			lead: "77 km with six weeks left. 100 km time on feet. Fatigue. Alpine days. Checklists for race week.",
			cta: "Open the guides"
		},
		pricing: {
			kicker: "Pricing",
			h2: "14 days on the calendar. Then €5/month.",
			lead: "Use a real week first. Founding stays €5 while you remain subscribed.",
			badge: "Founding price",
			trialBadge: "14 days free",
			name: "Founding membership",
			price: "€5",
			per: "/month",
			blurb: "14 days free. Then €5/month founding price. Cancel anytime.",
			features: [
				"Seven programs from aerobic engine to 100 km and alpine days",
				"€5/month locked while you remain subscribed",
				"Cancel anytime. No long contracts.",
				"Training weeks, not medical claims"
			],
			laterTitle: "Later public pricing",
			laterBody: "When founding closes, new members start at €1 for 7 days, then €12/month. Later public pricing for new sign-ups is expected around €15–19/month. Founders keep €5/month for as long as they stay subscribed."
		},
		checkout: {
			kicker: "Start",
			h2: "Write this week",
			lead: "Create an account, pick a peak date, run Tuesday. No card during the test period.",
			name: "Name",
			email: "Email",
			submit: "Start 14 days free",
			note: "Cancel anytime by emailing support@ridgework.org. No diagnoses. You stay responsible for mountain and training safety.",
			successTitle: "Founding trial is on",
			successBody: "Tools are unlocked on this device. Open Program, pick when you want to peak, then run this week’s load and log.",
			daysLeft: "days left on the preview trial"
		},
		faq: {
			h2: "FAQ",
			items: [
				{
					q: "What is Ridgework?",
					a: "A weekly plan for trail and mountains. 20 km, 50 km, a hundred, an alpine day, or just easy volume. Tired weeks get easier. Not a clinic."
				},
				{
					q: "What does €5/month mean?",
					a: "Two weeks free. If you stay, it is €5 a month for as long as you keep the subscription. Later sign-ups will see a higher list. Yours stays if you don’t cancel."
				},
				{
					q: "Can I cancel?",
					a: "Yes. Email support@ridgework.org."
				},
				{
					q: "What happens when founding closes?",
					a: "New people get another path: a euro for a week, then €12/month, later maybe €15–19. You keep the five if you stay subscribed."
				},
				{
					q: "Do I need a card for the trial?",
					a: "Not during this test period. Once the French company number is in, payment will ask for a card. Charge starts after the free days."
				},
				{
					q: "Is this medical advice?",
					a: "No. You get a week on paper. Health questions go to a clinician. In the mountains you decide."
				},
				{
					q: "Does the plan update itself?",
					a: "In the product, yes. Three weeks stay written. Log the week and the next one appears. Fatigue shortens this week. It does not move the race."
				},
				{
					q: "Why does more time help?",
					a: "Because easy volume is what later hard work sits on. Extra weeks stay easy. A short window still gets a plan, just a thinner one. The big result is season after season, not one heroic block."
				},
				{
					q: "Who is this?",
					a: "Ridgework, Magnieu, France. support@ridgework.org."
				},
				{
					q: "Which languages?",
					a: "English in full. Finnish, French, and German in shorter versions."
				},
				{
					q: "What about my data?",
					a: "EU and France. We don’t sell it for ads. See the privacy page."
				},
				{
					q: "How do I get help?",
					a: "support@ridgework.org. We try to answer within a few working days."
				}
			]
		},
		disclaimer: {
			h2: "Disclaimer",
			body: "Ridgework writes training weeks for trail and mountain. It is not a medical device, not healthcare, and not a substitute for a clinician, a guide, or rescue. Research citations inform the week structure; they are not prescriptions. You remain responsible for safety in the mountains and in training."
		},
		foundingPage: {
			kicker: "Founding",
			h1: "You’re invited to founding",
			lead: "Same weeks. Locked founding price.",
			trial: "14 days free. Then €5/month founding price. Cancel anytime.",
			note: "This page is for warm invites. Public pricing later will be higher for new members; founders keep €5/month while subscribed.",
			back: "← Ridgework home",
			title: "Founding invite, Ridgework",
			description: "Weekly training. Founding €5/month after 14 days free."
		},
		termsPage: {
			title: "Terms of Service",
			updated: "Last updated: September 2026",
			body: [
				"Stub terms (France / EU). Ridgework writes training weeks — not medical care, no diagnoses. Founding: 14 days free, then €5/month while subscribed. Cancel anytime (support@ridgework.org). You remain responsible for training and mountain safety. Mandatory consumer rights under French/EU law are not limited.",
				"Service. Ridgework provides weekly training plans for trail and mountain. It is not medical care and makes no diagnoses.",
				"Subscription & founding price. Founding membership: 14 days free, then €5/month while you remain subscribed. Cancel anytime. If you cancel and later re-subscribe after founding closes, public pricing then in effect may apply.",
				"Cancel anytime. You may cancel at any time via your account controls or by emailing support@ridgework.org. Access continues through the end of the period already paid.",
				"Your responsibility. You remain solely responsible for training and mountain safety decisions. Ridgework does not provide rescue, guiding, or emergency services.",
				"Liability. To the extent permitted by French and EU consumer law, the service is provided as-is. Nothing in these terms limits mandatory consumer rights.",
				"Contact. support@ridgework.org. Ridgework, Magnieu, France."
			]
		},
		privacyPage: {
			title: "Privacy Policy",
			updated: "Last updated: September 2026",
			body: [
				"This is a stub privacy notice for Ridgework, a product company based in France, operating under EU expectations (including GDPR principles). It will be replaced with counsel-reviewed text before launch.",
				"Who we are. Controller: Ridgework, Magnieu, France. Contact: support@ridgework.org.",
				"What we collect. Account and billing data needed to provide the service (e.g. email, subscription status via Stripe). Usage data limited to operating and improving the product. We do not sell personal data for advertising.",
				"Legal bases. Contract performance (providing the subscription), legitimate interests (security, product improvement), and legal obligations where applicable.",
				"Retention & rights. We retain data only as long as needed for the service and legal requirements. You may request access, rectification, erasure, restriction, portability, or object where applicable. You may lodge a complaint with a French / EU supervisory authority.",
				"Payments. Card payments are processed by Stripe. We do not store full card numbers on our servers.",
				"Not medical data. Ridgework is not a medical service and is not intended to process health diagnoses. Do not submit sensitive medical information you are not comfortable sharing for account/support purposes."
			]
		},
		appPage: {
			title: "This week, Ridgework",
			kicker: "This week",
			h1: "This week’s training",
			lead: "A few facts about how you train. Today’s session follows sleep, fatigue, and the week already written. Tired days train less. The ready date stays.",
			lockedTitle: "Sign in to save the week",
			lockedBody: "Create an account to keep the program, the week, and the log on this login.",
			trialLabel: "Preview trial",
			testBanner: "Test period: all seven programs are open, no charge. Sign in, pick the day you need to be ready. Card billing starts after the company number is in.",
			signInToTrain: "Sign in to save programs to your account. No payment during the test period.",
			tabs: {
				today: "Today",
				plan: "Program",
				week: "Week",
				prep: "Prep",
				log: "Log",
				profile: "You"
			}
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
			testNote: "Test period: programs are free. Card billing (Stripe) comes when the French company number is ready."
		},
		dashboard: {
			enrollments: "Your programs",
			empty: "No program saved on this account yet. Pick one below.",
			billingTest: "Test access, not charged",
			peak: "Peak",
			statusTest: "Test",
			saved: "Saved to your account"
		},
		tools: {
			week: {
				save: "Save week",
				saved: "Saved on this device",
				days: [
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri",
					"Sat",
					"Sun"
				],
				types: {
					easy: "Easy",
					steady: "Steady",
					hard: "Hard",
					rest: "Rest"
				},
				session: "What you actually ran",
				readiness: "How does the body feel this week?",
				readinessLead: "This only changes training. Tired means less work — hard sessions become easy. Wrecked means rest instead of quality.",
				levels: {
					fresh: "Fresh",
					ok: "Fine",
					tired: "Tired",
					wrecked: "Wrecked"
				},
				notes: {
					fresh: "Keep the written week. No extra heroics needed.",
					ok: "Keep the load. Do not add a second hard day.",
					tired: "Hard and steady sessions drop to easy. You train less this week.",
					wrecked: "Hard and steady become rest. Easy stays easy. Come back next week."
				}
			},
			pace: {
				title: "What the words mean",
				lead: "Conversational is not a vibe. It is whether you can speak. Use a watch if you have one. Use talk-test if you do not.",
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
						watch: "Roughly 60–75% of max HR, or below aerobic threshold if you have a lab/field test. Polarized plans put ~80% of time here.",
						none: "Talk test. If a hill steals the sentence, walk until speech comes back."
					},
					{
						zone: "Steady · high Z2 / low Z3",
						feel: "Short phrases only. Controlled, not a race.",
						watch: "Around 75–85% max HR. Do not stack this on a tired week.",
						none: "You can answer a question, not tell a story."
					},
					{
						zone: "Hard / quality · Z3–4",
						feel: "A few words. One dose per week, or none if tired.",
						watch: "Threshold-ish: ~85–92% max HR, or the pace you could hold ~30–40 min. Keep it the only hard run.",
						none: "Breathing is loud. You would not chat. Stop if form or a niggle gets worse."
					},
					{
						zone: "Climbing / strength",
						feel: "Not a heart-rate zone. Grip, lock-offs, and skill spike HR even when the legs could talk.",
						watch: "Ignore zone targets on the wall. Count quality pitches or sets, then stop.",
						none: "Leave when technique breaks, not when you are empty. Strength is short: pull, hang, core, antagonists."
					}
				],
				alpineTitle: "Alpine weeks are not only walking",
				alpine: "Approaches and hiking days stay conversational. Specific weeks add a climbing session (rock, ice, or gym) and a short strength dose (lock-offs, pull-ups, core). House/Johnston-style: aerobic base first, then climbing strength and technique, then mountain days with a pack. Pitches are work. Tired still turns them down."
			},
			prep: {
				kit: "Session kit",
				fuel: "Fuel",
				recovery: "Recovery",
				kitItems: [
					"Shoes that match the week’s terrain",
					"Layer you can actually run easy in",
					"Headlamp if the long starts in the dark",
					"Watch or phone with the session written",
					"One spare pair of socks for the long"
				],
				fuelItems: [
					"Breakfast that you have already used in training",
					"Carbs on the long — practised, not new",
					"Water for the actual duration, not the hoped-for one",
					"Something salty if the week is hot",
					"No new gels on a tired week"
				],
				recoveryItems: [
					"Sleep window written before the hard day",
					"Easy day after the quality dose",
					"Food in the first hour after the long",
					"If tired: skip the extra strides",
					"If wrecked: the session is rest"
				]
			},
			log: {
				empty: "No training notes yet this week.",
				decision: "What you did or changed",
				why: "Why (sleep, fatigue, life)",
				add: "Add note",
				clear: "Clear log"
			},
			plan: {
				kicker: "Rolling program",
				lead: "Tell us when the race or the outing has to be ready. Weeks fill backward from that day. Extra weeks go to easy running. A short window still gets a week, just a thinner one.",
				method: [
					"Date first. Then easy base, a specific block, and an easy-down into the day.",
					"Spare weeks stay easy. They are not extra intervals. Six weeks still writes a plan; it is just thinner than six months.",
					"A tired week trains less. The outing does not move. The next season starts higher than this one."
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
				seasonsKey: "One race does not make fitness. The next season starts higher than this one, if this one was actually run.",
				quality: {
					generous: {
						label: "More time than the suggestion. Use it.",
						body: "Extra weeks stay in easy base. The specific block and the easy-down stay full."
					},
					full: {
						label: "The suggested window",
						body: "Enough base, a full specific block, and a proper easy-down into the day you chose."
					},
					solid: {
						label: "Shorter than the suggestion. Still a plan.",
						body: "Base is cut first. Specific work and the easy-down are kept. More time would still help."
					},
					tight: {
						label: "Compressed window",
						body: "A plan is still written, but there is less time to build. More weeks would clearly help."
					},
					short: {
						label: "Very short. A holding pattern.",
						body: "This is not a full build. We still write weeks into the day. The real gain is the next season with more time."
					}
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
				doneBody: "One season is done. Pick a new ready date. The next one starts from a higher floor if this one was actually run.",
				nextSeason: "Start next season",
				nextSeasonBody: "Same outing type. New ready date. You start higher than season one.",
				nextSeasonPeak: "Next ready date",
				easedNote: "Eased because you are tired: easy volume, no quality dose. Ready date unchanged.",
				disclaimer: "Not medical advice. You stay responsible for training and mountain decisions.",
				phases: {
					base: "Aerobic base",
					specific: "Specific block",
					taper: "Easy-down"
				},
				donePhase: "Target week",
				objectives: {
					engine: {
						name: "Aerobic engine",
						length: "Recommended 16 weeks / 4 months",
						blurb: "No race required. Teach the body to do more work at conversation pace. Fat as the default fuel, low heart rate as the point. Ready is the week you want the engine settled."
					},
					trail20: {
						name: "20 km trail",
						length: "Recommended 10 weeks",
						blurb: "Already running. Easy volume, one quality dose, a long that grows toward 90–110 min. Peak on race week."
					},
					fifty: {
						name: "50 km ultra",
						length: "Recommended 24 weeks / 6 months",
						blurb: "Long aerobic base, then long-run progression with one quality session, easy-down into race week."
					},
					ultra100: {
						name: "80–120 km ultra",
						length: "Recommended 36 weeks / 9 months",
						blurb: "Aerobic months first. The specific block is time on feet and one quality dose. Back-to-back days late. Then three to four weeks easy-down."
					},
					alpine: {
						name: "Alpine day",
						length: "Recommended 10 weeks",
						blurb: "Aerobic approaches plus actual climbing: rock or ice technique, pulling strength, then a mountain day. Pitches are not conversation pace."
					},
					traverse: {
						name: "Multi-day alpine route",
						length: "Recommended 32 weeks / 8 months",
						blurb: "Hiking base, then climbing and pack back-to-backs so day two still has a reserve. You climb in the specific block. You do not only walk."
					},
					expedition: {
						name: "High-altitude expedition",
						length: "Recommended 40 weeks / 10 months",
						blurb: "Months of easy volume, then pack, hike, and enough climbing that the mountain is not the first time you pull. The easy-down is sleep and kit."
					}
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
					strength: "Alpine strength: lock-offs, pull-ups, core, antagonists. Short and hard."
				}
			},
			athlete: {
				onboarding: {
					kicker: "Your setup",
					h1: "What should this week actually look like?",
					lead: "A few facts about how you train. The week is written from those, not from a generic template with your name on it.",
					next: "Continue",
					back: "Back",
					start: "Write my three weeks",
					step: "Step {n} of {total}",
					needDays: "Pick at least two days you can train.",
					eventName: "Event or outing name (optional)",
					eventPlaceholder: "UTMB CCC, local 50k, Grand Combin…",
					limitations: "Anything that currently limits training",
					limitationsHint: "A niggle, a time cap, a doctor's note you already have. We treat it as a training constraint, not a diagnosis.",
					reviewTitle: "This is what we will write from",
					reviewLead: "Ready date stays unless you change it. Tired days train less. Missed sessions are not stacked.",
					steps: [
						"Sport",
						"Goal",
						"Ready date",
						"Load",
						"Days",
						"Terrain",
						"Life"
					],
					sports: {
						running: "Running",
						mountaineering: "Mountaineering",
						mixed: "Both"
					},
					disciplines: {
						trail: "Trail",
						ultra: "Ultra",
						alpine: "Alpine / climbing",
						road: "Road",
						ski: "Ski-mo / ski tour"
					},
					experience: {
						beginner: "New to this distance or terrain",
						intermediate: "A season or two in already",
						experienced: "Several peaks or ultras done",
						veteran: "This is a repeat cycle"
					},
					volume: {
						h0_3: "Under 3 hours a week",
						h3_5: "3–5 hours",
						h5_8: "5–8 hours",
						h8_12: "8–12 hours",
						h12p: "12 hours or more"
					},
					longest: {
						m60: "Under 60 min",
						m90: "60–90 min",
						m150: "90–150 min",
						m240: "2.5–4 hours",
						m240p: "Over 4 hours"
					},
					terrain: {
						flat: "Mostly flat",
						rolling: "Hills and trails",
						mountain: "Mountains I can reach",
						highAlpine: "High alpine / glacier access"
					},
					equipment: {
						trailShoes: "Trail shoes",
						poles: "Poles",
						pack: "Pack I can train in",
						gym: "Gym or home strength",
						crampons: "Crampons",
						iceAxe: "Ice axe"
					},
					constraints: {
						shiftWork: "Shift work",
						travelHeavy: "Travel-heavy weeks",
						youngKids: "Young kids / family mornings",
						shortSleep: "Habitually short sleep",
						deskJob: "Desk job, stiff hips"
					},
					units: {
						km: "Kilometres",
						miles: "Miles"
					},
					availableTitle: "Days you can train",
					peakLabel: "Day you want to be ready"
				},
				today: {
					kicker: "Today",
					title: "What you run today",
					wakeTitle: "How did you wake up?",
					wakeLead: "Five marks. Optional heart numbers if you have them. The call is the strictest rule that fires — not a hidden score.",
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
						stress: "Calm"
					},
					scaleHigh: {
						sleep: "Excellent",
						soreness: "Severe",
						motivation: "Keen",
						fatigue: "Wrecked",
						stress: "High"
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
					access: {
						trail: "Trail",
						mountain: "Mountain",
						gym: "Gym",
						climbing: "Climbing kit"
					},
					whyChanged: "Why this changed",
					whyWeek: "Why this week looks like this",
					peakLocked: "Ready date {peak} — it moves only if you change it.",
					noSession: "No session written for today. Rest, or the plan has not started this week yet.",
					doneFlash: "Logged. Nothing extra is added.",
					missedFlash: "Missed. Later hard sessions this week will not stack on top.",
					editProfile: "Edit how you train",
					thisWeek: "This week",
					safety: "This is a training-load call, not a diagnosis. Pain, illness, or injury: stop and speak to a clinician or a qualified coach.",
					overrideLabel: "I understand the recommendation and I choose to keep the written session.",
					overrideKeep: "Keep the written session",
					calls: {
						ready: {
							title: "Ready for the written session",
							action: "Do what is on the plan."
						},
						reduce: {
							title: "Train, but reduce load",
							action: "Keep moving. Cut the hard part."
						},
						easy: {
							title: "Easy or recovery today",
							action: "Conversational only. No quality."
						},
						rest: {
							title: "Rest and reassess tomorrow",
							action: "No session today."
						}
					},
					reasons: {
						availableDays: "You have {n} training days. Rest sits on the others.",
						beginnerNoQuality: "Base weeks stay easy while you are still building the habit. Quality waits for the specific block.",
						noQualityBase: "This is still aerobic base. No quality dose this week.",
						gymInsteadOfClimb: "No ice or rock kit listed, so climbing is gym strength.",
						noClimbGear: "No climbing kit listed, so the mountain pull becomes a hike.",
						noGym: "No gym listed, so strength is an easy session instead.",
						hikeInsteadOfMountain: "Mountain access is off or the terrain you have is flatter, so this is a hike or easy run.",
						noPack: "No pack listed, so the pack day is a hike.",
						flatTerrain: "You trained on flat ground, so the hike is an easy run.",
						shiftNoEarlyQuality: "Shift work: quality sits later in the week, not Monday or Tuesday.",
						shortSleepSpacing: "Short sleep is a standing constraint, so back-to-back work days are split.",
						kidsCapLong: "Family constraint: the long is capped at {n} min.",
						limitationsConservative: "You noted a limitation. Long and quality stay conservative. This is not a rehab plan.",
						longFromBand: "The long is {n} min because that matches your current longest outing.",
						volumeSplit: "Easy days share the rest of a {n} min week.",
						missedNoStack: "A hard session was missed. Nothing is stacked on top. No makeup quality.",
						travelSwap: "Travel until {until}. Mountain and climbing days become easy work from wherever you are.",
						engineConversational: "Aerobic engine: every run stays conversational.",
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
						normalLoad: "Recent load is ordinary ({n} hard/long days in the last three)."
					}
				},
				profile: {
					title: "How you train",
					lead: "Change a fact, and the next week is rewritten from it. The ready date stays unless you edit that field.",
					save: "Save and rewrite the week",
					saved: "Saved",
					reopen: "Change setup"
				}
			}
		},
		fieldPage: fieldEn
	},
	fi: {
		metaTitle: "Polku- ja ultratreenin viikkosuunnitelma | Ridgework",
		metaDescription: "Mitä juokset tällä viikolla, kun edessä on 20 km polku, 50 tai 100 km ultra tai alppipäivä. Väsynyt viikko kevenee. Kaksi viikkoa ilmaiseksi, sitten 5 €/kk.",
		footerTag: "Viikkotreeniä polulle, ultraan ja vuorille.",
		legalEntity: "Ridgework, Magnieu, Ranska. Yritysrekisteröinti kesken.",
		support: "support@ridgework.org",
		cancelAnytime: "Peru milloin tahansa",
		terms: "Ehdot",
		privacy: "Tietosuoja",
		copyright: "© 2026 Ridgework. France.",
		nav: {
			about: "Keitä olemme",
			method: "Metodi",
			projects: "Projektit",
			programs: "Ohjelmat",
			who: "Kenelle",
			what: "Mitä saat",
			week: "Viikon kulku",
			pricing: "Hinta",
			faq: "UKK",
			app: "Tämä viikko",
			field: "Muistiinpanot",
			guides: "Oppaat",
			example: "Esimerkki",
			menu: "Valikko",
			login: "Kirjaudu",
			account: "Tili"
		},
		cta: {
			start: "Aloita 14 pv ilmaiseksi",
			pricing: "Katso hinnat",
			openTools: "Avaa työkalut"
		},
		hero: {
			kicker: "Polku ja ultra",
			h1: "77 km kuuden viikon päästä. Mitä juokset tiistaina?",
			lead: "Viisi tuntia unta. Eilen pitkä. Polvi kolottaa. Sunnuntaina 28 astetta. Tästä syntyy viikko: vedot pois, tilalle helppoa, pitkä maanantaille. Kisapäivä ei muutu.",
			trial: "Kaksi viikkoa ilmaiseksi. Sen jälkeen 5 euroa kuussa. Voit perua milloin vain."
		},
		about: {
			kicker: "Kuka tekee",
			h2: "Treenituote Magnieusta",
			lead: "Ridgework kirjoittaa viikon jonka voi juosta. Tavoitepäivä, väsymys, maasto. Tuki on postilaatikko, ei botti.",
			cards: [
				{
					title: "Selkeä hinta",
					body: "Kaksi viikkoa ilmaiseksi. Sitten 5 €/kk. Ei feikkiarvosteluja."
				},
				{
					title: "Tylsät viikot",
					body: "Kevyttä juoksua, palautumista, yksi teho jos jalat antavat."
				},
				{
					title: "Suora kieli",
					body: "Viikko kalenteriin. Ei iskulauseita."
				}
			],
			foot: "Aloitamme EU:sta, Isolta-Britannialta ja Sveitsistä."
		},
		method: {
			kicker: "Miksi viikko näyttää tältä",
			h2: "Suurin osa kevyttä. Yksi kova, tai ei yhtään.",
			lead: "Taustalla on kestävyystutkimusta, ei taikuutta: paljon kevyttä, väsymys syötteenä, kevennys ennen päivää. Listoja, ei diagnooseja.",
			cards: [
				{
					title: "Miksi viikko on kevyt",
					body: "Suurin osa juoksusta on niin kevyttä että pystyt puhumaan. Kovaa on vähän. Ridgework lähtee tästä. Voit säätää."
				},
				{
					title: "Väsymys muuttaa viikkoa",
					body: "Uni, kolotus ja kuuma päivä ovat syötteitä. Jos väsyttää, kova työ putoaa kevyeksi. Se ei ole diagnoosi."
				},
				{
					title: "Kevennys ennen päivää",
					body: "Kilometrit laskevat. Lyhyt terävyys saa jäädä. Uni ja varusteet voittavat ylimääräisen lenkin."
				}
			],
			caveatsTitle: "Rehelliset varaukset",
			caveats: [
				"Yksilövaste vaihtelee. Ikä, historia, maasto ja elämän kuorma muuttavat sitä, mikä toimii.",
				"Julkaistut keskiarvot eivät ole lääketieteellistä neuvontaa eivätkä korvaa ammattilaista terveyskysymyksissä.",
				"Käännämme kirjallisuuden listoiksi ja viikkorakenteiksi, jotta voit päättää silmät auki."
			],
			sourcesTitle: "Lähteet"
		},
		projects: {
			kicker: "Esimerkkiprojektit",
			h2: "Kolme tavoitetta paperille",
			lead: "Kesto on valmistautuminen: peruskunto, kisajakso ja kevennys niin että huippu osuu päivään. Ei viikonlopun eikä kisan pituus.",
			items: [
				{
					title: "Alppiviikonlopun tavoite",
					fields: [
						{
							label: "Tavoite",
							value: "Saapua alppipäivään jalat tallella, ei rikkinäisenä tiistaina"
						},
						{
							label: "Suunnitelma",
							value: "10 viikkoa: 6 vk peruskuntoa ja nousua, 3 vk tarkempi jakso, 10–14 pv kevennys säähän"
						},
						{
							label: "Fokus",
							value: "Pidä helppo helppona. Lisää puhevauhdin nousua. Huippu sääikkunaan, ei lisäkilometreihin."
						},
						{
							label: "Väsymys",
							value: "Jos uni tai jalat ovat poissa, jätä teho. Viikonloppu on huippu, ei tiistai."
						}
					]
				},
				{
					title: "Ensimmäinen 50 km polku",
					fields: [
						{
							label: "Tavoite",
							value: "Maaliin hallitusti: tankkaus ja vauhti kunnossa"
						},
						{
							label: "Suunnitelma",
							value: "Noin puoli vuotta: 10 vk peruskunto, 12 vk pitkän kasvatus, 10–14 pv kevennys kisaviikolle"
						},
						{
							label: "Fokus",
							value: "Ensin kevyt juoksu, sitten pitkän progressio ja yksi teho. Huippu kisaviikolla."
						},
						{
							label: "Avainharjoitus",
							value: "Viikko 20: 3×12 min maratonteholla rullaavalla polulla, 4 min kevyttä. Lämpö- ja kolotusportit ennen starttia. Sitten 10–14 pv kevennys.",
							locked: true
						}
					]
				},
				{
					title: "Tuvasta tupaan",
					fields: [
						{
							label: "Tavoite",
							value: "Kolme ketjutettua päivää, koska toisen päivän treeni sai kutistua"
						},
						{
							label: "Suunnitelma",
							value: "Noin 8 kuukautta: talvi–kevät peruskuntoa ja vaellusta, 10 vk rinkkaa ja peräkkäisiä päiviä, 10–14 pv kevennys päivään 1"
						},
						{
							label: "Fokus",
							value: "Jalat pohjakuukausina. Tarkempi jakso on rinkka ja peräkkäiset päivät. Huippu päivälle 1, ei romahdus päivälle 3."
						},
						{
							label: "Väsymys",
							value: "Jos päivän 1 jäänteet istuvat jaloissa, leikkaa päivän 2 määrä. Päivä 3 tarvitsee varaa."
						}
					]
				}
			]
		},
		programs: {
			kicker: "Ohjelmat",
			h2: "Seitsemän ohjelmaa. Kerro milloin haluat olla valmis.",
			lead: "Jos ei ole kisaa, aloita peruskunnosta: paljon kevyttä, matalalla sykkeellä. Mitä enemmän viikkoja ennen päivää, sen vakaampi pohja.",
			columns: {
				name: "Ohjelma",
				duration: "Kesto",
				focus: "Fokus",
				recipe: "Avainharjoitus"
			},
			rows: [
				{
					id: "engine",
					name: "Aerobinen moottori",
					duration: "Noin 16 viikkoa kevyttä juoksua",
					focus: "Lisää kevyttä. Rasva polttoaineena. Kisaa ei tarvita.",
					locked: "Useimmat päivät niin kevyitä että pystyt puhumaan. Pitkä kasvaa kohti 90 minuuttia. Erillistä tehoa ei ole: tämä on teho.",
					pull: "Jos saat kokonaisen lauseen ulos, olet oikeassa työssä.",
					layout: "textFirst"
				},
				{
					id: "trail20",
					name: "20 km polku",
					duration: "Kymmenen viikkoa riittää useimmille",
					focus: "Kevyttä pohjaa, yksi teho, pitkä 90–110 min.",
					locked: "Viikko 8: kuusi kertaa 3 min kympin teholla, 2 min kevyttä välissä. Sitten viikon kevennys.",
					layout: "sessionLead"
				},
				{
					id: "fifty",
					name: "50 km ultra",
					duration: "Noin puoli vuotta",
					focus: "Pitkä peruskunto, sitten pitkät kasvavat, huippu kisaviikolla.",
					locked: "Viikko 20: 3×12 min maratonteholla polulla. Sitten 10–14 päivän kevennys.",
					tag: "Monen ensimmäinen ultra",
					pull: "Maaliin hallitusti, ei vain maaliin.",
					layout: "wide"
				},
				{
					id: "ultra100",
					name: "80–120 km ultra",
					duration: "Usein yhdeksän kuukautta",
					focus: "Kuukausia kevyttä juoksua. Lopussa kaksi pitkää peräkkäin, sitten reilu kevennys.",
					locked: "Viikko 30: lauantai 4–5 tuntia kevyttä, sunnuntai 2,5–3 tuntia. Arki pysyy puheella."
				},
				{
					id: "alpine",
					name: "Alppipäivä",
					duration: "Noin kymmenen viikkoa",
					focus: "Nousut kevyinä, plus oikeaa kiipeilyä ja voimaa.",
					locked: "Viikko 8: kiipeilykerta (kallio, jää tai sali) ja 30–40 min voimaa. Nousu puhevauhdissa. Jos väsyttää, kiipeily vaihtuu kävelyyn.",
					tag: "Mukana kiipeilyä",
					layout: "sessionLead"
				},
				{
					id: "traverse",
					name: "Usean päivän alppireitti",
					duration: "Noin kahdeksan kuukautta",
					focus: "Vaelluspohja, sitten kiipeilyä ja rinkkaa peräkkäisinä päivinä.",
					locked: "Viikko 28: kiipeilypäivä, seuraavana kevyt rinkkavaellus. Lyhennä kakkospäivä jos jalat ovat täynnä.",
					layout: "compact"
				},
				{
					id: "expedition",
					name: "Korkean paikan retkikunta",
					duration: "Noin kymmenen kuukautta",
					focus: "Kevyttä juoksua pitkään, sitten rinkkaa ja sen verran kiipeilyä ettei vuori ole ensimmäinen veto.",
					locked: "Viikko 34: 3–4 tuntia rinkalla. Lepo perään. Kevennys on unta ja pakkaamista, ei lisäkorkeutta.",
					pull: "Kevennys on unta ja pakkaamista."
				}
			],
			lockHint: "Avainharjoitus"
		},
		who: {
			h2: "Kenelle tämä on, ja kenelle ei",
			forTitle: "Rakennettu",
			forItems: [
				"Kestävyysurheilijoille, jotka suunnittelevat viikkoja elämän ja maaston ympärille",
				"Niille jotka treenaavat kohti aerobista moottoria, 20 km polkua, 50 tai 100 km ultraa, alppipäivää, ketjutettua reittiä tai korkeaa leiriä",
				"Niille jotka oikeasti jättävät treenin väliin kun väsyttää",
				"Kaikille, jotka haluavat rauhalliset työkalut, ei motivaatio-spamia"
			],
			notTitle: "Ei",
			notItems: [
				"Vamman diagnoosiin tai hoitoon",
				"VO2-hakkeihin tai hustle-kulttuuriin",
				"Live-valmentajaan taskussa",
				"Hätä- tai pelastusohjeisiin"
			]
		},
		what: {
			h2: "Mitä saat",
			items: [
				{
					n: "01",
					title: "Viikot tavoitepäivästä taaksepäin",
					body: "Kerrot milloin kisan tai retken pitää olla valmis. Sitten peruskunto, kisajakso, kevennys. Jos viikkoja on paljon, pohja ehtii kasvaa."
				},
				{
					n: "02",
					title: "Väsymys on syöte",
					body: "Väsynyt viikko juoksee vähemmän. Vedot vaihtuvat kevyiksi. Jos olet rikki, lepäät. Kisapäivä pysyy kalenterissa."
				},
				{
					n: "03",
					title: "Varusteet tälle viikolle",
					body: "Kengät, juoma, uni. Sille viikolle jota oikeasti juokset, ei ideaaliviikolle."
				},
				{
					n: "04",
					title: "Treeniloki",
					body: "Kirjaa mitä teit ja miksi viikko muuttui. Seuraava viikko lähtee siitä, ei toiveesta."
				}
			]
		},
		week: {
			h2: "Miten viikko kulkee",
			steps: [
				{
					day: "Ma",
					title: "Kirjoita viikko",
					body: "Tavoitepäivä on valittu. Tälle viikolle kevyttä, teho jos olet virkeä, ja pitkä."
				},
				{
					day: "Ti",
					title: "Katso uni ja jalat",
					body: "Viisi tuntia unta? Vedot muuttuvat 45–60 min helpoksi. Kisapäivä ei siirry."
				},
				{
					day: "To",
					title: "Pidä helppo helppona",
					body: "Suurin osa viikosta puheella. Jos saat lauseita, olet työssä."
				},
				{
					day: "Su",
					title: "Kirjaa mitä tapahtui",
					body: "Pitkä, helle, kolotus. Seuraava viikko kirjoitetaan siitä, ei toiveesta."
				}
			]
		},
		scenario: {
			kicker: "Esimerkki",
			h2: "Oikea tiistai, ei iskulausetta",
			setup: "77 km ultraan on kuusi viikkoa.",
			facts: [
				{
					label: "Uni viime yönä",
					value: "5 tuntia"
				},
				{
					label: "Eilen",
					value: "32 km pitkä"
				},
				{
					label: "Oikea polvi",
					value: "2/10"
				},
				{
					label: "Sunnuntain ennuste",
					value: "28°C"
				}
			],
			says: "Tämän viikon kutsu",
			actions: [
				"Jätä tämän päivän vedot",
				"45–60 min helppoa tilalle",
				"Siirrä pitkä maanantaille jos sunnuntai pysyy kuumana",
				"Juo pitkällä 500–750 ml/h, suolaa jos yleensä tarvitset",
				"Katso huomenna uudestaan"
			],
			note: "Ei diagnoosi. Jos polvi turpoaa, lukittuu tai pahenee, se on lääkäri. Tämä on treeniviikko."
		},
		firstWeek: {
			kicker: "Ensimmäiset 14 päivää",
			h2: "Mitä tapahtuu kun kirjaudut",
			lead: "Viisi euroa on halpa. Ilmaisen jakson pointti on juosta oikea viikko, ei ihailla hintaa.",
			days: [
				{
					day: "Päivä 1",
					title: "Valitse tavoite ja rakenna viikko",
					body: "77 km, alppipäivä tai pelkkä moottori. Seuraavat kolme viikkoa ilmestyvät kalenteriin."
				},
				{
					day: "Päivä 3",
					title: "Säädä väsymyksestä",
					body: "Uni oli lyhyt. Kova työ muuttuu helpoksi. Kisapäivä pysyy."
				},
				{
					day: "Päivä 6",
					title: "Valmistele pitkä",
					body: "Varusteet, juoma ja vauhti jota olet jo käyttänyt. Ei uutta geeliä."
				},
				{
					day: "Päivä 7",
					title: "Kirjaa mitä tapahtui",
					body: "Seuraava viikko kirjoitetaan lokista, ei haavejaksosta."
				}
			]
		},
		guidesIndex: {
			kicker: "Oppaat",
			h2: "Treenikysymykset kirjoitettuna",
			lead: "77 km ja kuusi viikkoa. 100 km aika jaloilla. Väsymys. Alppipäivät. Kisaviikon lista.",
			cta: "Avaa oppaat"
		},
		pricing: {
			kicker: "Hinta",
			h2: "Kaksi viikkoa kalenterissa. Sitten 5 €/kk.",
			lead: "Juokse ensin oikea viikko. Perustajahinta pysyy viidessä eurossa niin kauan kuin tilaus jatkuu.",
			badge: "Perustajahinta",
			trialBadge: "14 päivää ilmaiseksi",
			name: "Perustajajäsenyys",
			price: "€5",
			per: "/kk",
			blurb: "Kaksi viikkoa ilmaiseksi. Sitten 5 euroa kuussa. Voit perua milloin vain.",
			features: [
				"Täysi pääsy rullaaviin ohjelmiin, viikkosuunnitelmaan ja treeniprepiin",
				"€5/kk lukittu niin kauan kuin tilaus jatkuu",
				"Peru milloin tahansa. Ei pitkiä sopimuksia",
				"Ei lääketieteellisiä väitteitä. Treeniviikkoja."
			],
			laterTitle: "Myöhempi hinta uusille",
			laterBody: "Kun perustajapaikat täyttyvät, uusille tulee toinen polku: euro viikoksi, sitten 12 €/kk, myöhemmin ehkä 15–19. Sinä pidät viitosesi jos et peru."
		},
		checkout: {
			kicker: "Aloita",
			h2: "Kirjoita tämä viikko",
			lead: "Tee tili, valitse tavoitepäivä, juokse tiistai. Testijaksolla ei korttia.",
			name: "Nimi",
			email: "Sähköposti",
			submit: "Aloita 14 pv ilmaiseksi",
			note: "Peru milloin tahansa osoitteeseen support@ridgework.org. Ei diagnooseja. Olet vastuussa vuoristo- ja treeniturvallisuudesta.",
			successTitle: "Testijakso on päällä",
			successBody: "Avaa Ohjelma, valitse tavoitepäivä, juokse tämä viikko.",
			daysLeft: "päivää jäljellä esikatselukokeilussa"
		},
		faq: {
			h2: "Kysyttyä",
			items: [
				{
					q: "Mikä Ridgework on?",
					a: "Viikkosuunnitelma polulle ja vuorille. 20 km, 50 km, satanen, alppipäivä tai pelkkä peruskunto. Väsynyt viikko kevenee. Ei lääkäri, ei diagnooseja."
				},
				{
					q: "Mitä 5 euroa kuussa tarkoittaa?",
					a: "Kaksi viikkoa ilmaiseksi. Jos jatkat, hinta on 5 €/kk niin kauan kuin tilaus on voimassa. Myöhemmin uusille tulee kalliimpi lista; nykyinen hinta jää sinulle."
				},
				{
					q: "Voiko perua?",
					a: "Kyllä. Yksi sähköposti riittää: support@ridgework.org."
				},
				{
					q: "Mitä tapahtuu kun perustajahinta sulkeutuu?",
					a: "Uudet näkevät toisen polun: ensin euro viikoksi, sitten 12 €/kk, myöhemmin ehkä 15–19. Sinä pidät viitosesi jos et peru."
				},
				{
					q: "Pitääkö kortti antaa heti?",
					a: "Testijaksolla ei. Kun yritystunnus on valmis, kassa pyytää korttia. Veloitus vasta ilmaisen jakson jälkeen."
				},
				{
					q: "Onko tämä lääketiedettä tai valmennusta livenä?",
					a: "Ei kumpaakaan. Saat viikon paperille. Polvi lääkärille, vuori itsellesi."
				},
				{
					q: "Päivittyykö ohjelma itsestään?",
					a: "Tuotteessa kyllä. Kolme viikkoa on aina valmiina. Kun kirjaat viikon, seuraava ilmestyy. Väsymys lyhentää tätä viikkoa. Se ei siirrä kisaa."
				},
				{
					q: "Miksi enemmän aikaa auttaa?",
					a: "Koska kevyt juoksu on se, minkä päälle tehot laitetaan. Lisäviikot jäävät kevyiksi. Lyhyt ikkuna saa silti suunnitelman, mutta ohuemman. Iso tulos syntyy kausi kerrallaan, ei yhdellä rypistyksellä."
				},
				{
					q: "Kuka tämän tekee?",
					a: "Ridgework, Magnieu, Ranska. Tuki: support@ridgework.org. Yritysrekisteröinti kesken."
				},
				{
					q: "Millä kielillä sivu on?",
					a: "Englanti kokonaan. Suomi, ranska ja saksa lyhyempinä."
				},
				{
					q: "Entä tietosuoja?",
					a: "EU ja Ranska. Emme myy dataa mainoksiin. Katso tietosuojaseloste."
				},
				{
					q: "Miten saan apua?",
					a: "support@ridgework.org. Pyrimme vastaamaan muutamassa arkipäivässä."
				}
			]
		},
		disclaimer: {
			h2: "Vastuuvapaus",
			body: "Ridgework kirjoittaa treeniviikkoja polulle ja vuorille. Se ei ole lääkinnällinen laite eikä korvaa lääkäriä, opasta tai pelastusta. Tutkimusviitteet ohjaavat viikon rakennetta; ne eivät ole reseptejä. Olet vastuussa turvallisuudesta vuorilla ja treenissä."
		},
		foundingPage: {
			kicker: "Perustajille",
			h1: "Sama treeni, viiden euron hinta",
			lead: "Kaksi viikkoa ilmaiseksi. Sitten 5 €/kk niin kauan kuin tilaus jatkuu.",
			trial: "Voit perua milloin vain.",
			note: "Myöhemmin uusille kalliimpi lista. Tämä hinta jää sinulle jos et peru.",
			back: "← Ridgework",
			title: "Perustajahinta, Ridgework",
			description: "Viikkotreeni. 5 €/kk kahden ilmaisen viikon jälkeen."
		},
		termsPage: {
			title: "Käyttöehdot",
			updated: "Päivitetty: syyskuu 2026",
			body: ["Ridgework kirjoittaa treeniviikkoja polulle ja vuorille. Tämä ei ole hoitoa eikä diagnooseja. Perustajahinta: 14 päivää ilmaiseksi, sitten 5 €/kk. Voit perua milloin vain (support@ridgework.org). Olet vastuussa treeni- ja vuoristoturvallisuudesta. Ranskan ja EU:n pakottavia kuluttajanoikeuksia ei rajata."]
		},
		privacyPage: {
			title: "Tietosuojaseloste",
			updated: "Päivitetty: syyskuu 2026",
			body: [
				"Ridgework, Magnieu, Ranska. Yhteys: support@ridgework.org. Yritysrekisteröinti kesken. Tämä on lyhyt ilmoitus, ei vielä lakimiehen tarkistama.",
				"Keräämme tilin ja maksun tiedot palvelun pyörittämiseen. Emme myy tietoja mainoksiin. Korttimaksut hoitaa Polar, kun yritystunnus on valmis.",
				"Oikeudet: pääsy, oikaisu, poisto, rajoitus, siirto, vastustaminen. Valitus Ranskan tai EU:n valvontaviranomaiselle.",
				"Älä lähetä terveystietoja joita et halua tukeen. Ridgework ei ole terveyspalvelu."
			]
		},
		appPage: {
			title: "Tämä viikko, Ridgework",
			kicker: "Treeni",
			h1: "Tämän viikon treeni",
			lead: "Muutama fakta siitä miten treenaat. Tämän päivän sessio seuraa unta, väsymystä ja jo kirjoitettua viikkoa. Väsynyt päivä treenaa vähemmän. Tavoitepäivä pysyy.",
			lockedTitle: "Kirjaudu jotta viikko tallentuu",
			lockedBody: "Tilin takana ohjelma, viikko ja loki pysyvät tallessa.",
			trialLabel: "Testijakso",
			testBanner: "Testijakso: kaikki seitsemän ohjelmaa auki, ei veloitusta. Kirjaudu ja valitse tavoitepäivä. Kortti tulee kun yritystunnus on valmis.",
			signInToTrain: "Kirjaudu, niin ohjelmat jäävät tilillesi. Testijaksolla ei veloiteta.",
			tabs: {
				today: "Tänään",
				plan: "Ohjelma",
				week: "Viikko",
				prep: "Varusteet",
				log: "Loki",
				profile: "Sinä"
			}
		},
		auth: {
			title: "Kirjaudu",
			lead: "Tee tili ja valitse ohjelma. Tavoitepäivä ensin, sitten viikot.",
			email: "Sähköposti",
			password: "Salasana",
			name: "Nimi",
			signIn: "Kirjaudu",
			signUp: "Luo tili",
			or: "tai",
			withGoogle: "Jatka Googlella",
			withX: "Jatka X:llä",
			haveAccount: "Onko tili jo? Kirjaudu",
			noAccount: "Ei tiliä vielä? Luo tili",
			error: "Kirjautuminen ei onnistunut. Tarkista sähköposti ja salasana.",
			testNote: "Testijakso: ohjelmat ilmaisia. Korttiveloitus (Stripe) kun ranskalainen SIRET on valmis."
		},
		dashboard: {
			enrollments: "Ohjelmasi",
			empty: "Tällä tilillä ei ole vielä ohjelmaa. Valitse alta.",
			billingTest: "Testipääsy, ei veloitusta",
			peak: "Tavoite",
			statusTest: "Testi",
			saved: "Tallennettu tilillesi"
		},
		tools: {
			week: {
				save: "Tallenna viikko",
				saved: "Tallennettu tälle laitteelle",
				days: [
					"Ma",
					"Ti",
					"Ke",
					"To",
					"Pe",
					"La",
					"Su"
				],
				types: {
					easy: "Kevyt",
					steady: "Tasainen",
					hard: "Kova",
					rest: "Lepo"
				},
				session: "Mitä oikeasti juoksit",
				readiness: "Miltä kroppa tuntuu tällä viikolla?",
				readinessLead: "Tämä muuttaa vain treeniä. Väsynyt = vähemmän työtä. Rikki = lepo laadun sijaan.",
				levels: {
					fresh: "Virkeä",
					ok: "Ihan ok",
					tired: "Väsynyt",
					wrecked: "Rikki"
				},
				notes: {
					fresh: "Pidä kirjoitettu viikko. Ei extra-sankarointia.",
					ok: "Pidä kuorma. Älä lisää toista kovaa päivää.",
					tired: "Kovat ja tasaiset sessiot putoavat kevyiksi. Treenaat vähemmän.",
					wrecked: "Kovat ja tasaiset muuttuvat lepoksi. Kevyt pysyy kevyenä. Jatka ensi viikolla."
				}
			},
			pace: {
				title: "Mitä sanat tarkoittavat",
				lead: "Puhevauhti ei ole fiilis. Se on se, saatko lauseen ulos. Käytä kelloa jos sinulla on. Käytä puhetestiä jos ei ole.",
				talkTitle: "Puhevauhti / helppo",
				talk: "Saat kokonaisen lauseen ilman haukkomista. Nenähengitys usein riittää. Jos irtoaa vain sanoja, olet liian lujaa helppoon päivään. Hidasta, vaikka kello näyttäisi vaatimattomalta.",
				zonesTitle: "Miten seuraat",
				feelHead: "Tuntuma",
				watchHead: "Kello / syke",
				noneHead: "Ei laitetta",
				rows: [
					{
						zone: "Helppo · vyöhyke 1–2",
						feel: "Kokonaisia lauseita. Suurin osa viikosta asuu tässä.",
						watch: "Noin 60–75 % max-sykkeestä, tai alle aerobisen kynnyksen jos sinulla on testi. Polarisoitu suunnitelma pitää ~80 % ajasta tässä.",
						none: "Puhetesti. Jos mäki vie lauseen, kävele kunnes puhe palaa."
					},
					{
						zone: "Tasainen · korkea Z2 / matala Z3",
						feel: "Vain lyhyitä fraaseja. Hallittu, ei kisa.",
						watch: "Noin 75–85 % max-sykkeestä. Älä pinoa tätä väsyneelle viikolle.",
						none: "Voit vastata kysymykseen, et kertoa tarinaa."
					},
					{
						zone: "Kova / laatu · Z3–4",
						feel: "Muutama sana. Yksi annos viikossa, tai ei yhtään jos väsyttää.",
						watch: "Kynnys: ~85–92 % max HR, tai vauhti jota jaksaisit ~30–40 min. Pidä se viikon ainoana kovana.",
						none: "Hengitys on äänekästä. Et juttelisi. Lopeta jos tekniikka tai kolotus pahenee."
					},
					{
						zone: "Kiipeily / voima",
						feel: "Ei sykevyöhyke. Ote, lock-offit ja taito nostavat sykettä vaikka jalat voisivat puhua.",
						watch: "Unohda vyöhykkeet seinällä. Laske laadukkaat välit tai sarjat, sitten lopeta.",
						none: "Lopeta kun tekniikka hajoaa, ei kun olet tyhjä. Voima on lyhyt: veto, hang, core, antagonistit."
					}
				],
				alpineTitle: "Alppiviikot eivät ole pelkkää kävelyä",
				alpine: "Nousut ja vaelluspäivät pysyvät puhevauhdissa. Spesifissä on kiipeilysessio (kallio, jää tai sali) ja lyhyt voima-annos (lock-offit, leuat, core). House/Johnston: ensin aerobinen pohja, sitten kiipeilyvoima ja tekniikka, sitten vuoripäivät rinkalla. Köysivälit ovat työtä. Väsymys laskee niitä silti."
			},
			prep: {
				kit: "Treenikitti",
				fuel: "Tankkaus",
				recovery: "Palautuminen",
				kitItems: [
					"Kengät viikon maastoon",
					"Kerros jossa kevyt oikeasti on kevyt",
					"Otsalamppu jos pitkä alkaa pimeässä",
					"Kello tai puhelin, sessio kirjoitettuna",
					"Varasukat pitkälle"
				],
				fuelItems: [
					"Aamiainen jota olet jo treenannut",
					"Hiilari pitkällä: harjoiteltu, ei uusi",
					"Vesi oikeaan kestoon, ei toivottuun",
					"Suolaista jos viikko on kuuma",
					"Ei uusia gelejä väsyneellä viikolla"
				],
				recoveryItems: [
					"Uni-ikkuna kirjoitettuna ennen kovaa päivää",
					"Kevyt päivä laatuannoksen jälkeen",
					"Ruoka tunnin sisään pitkästä",
					"Jos väsynyt: skippaa extra-stridet",
					"Jos rikki: sessio on lepo"
				]
			},
			log: {
				empty: "Ei treenimuistiinpanoja tällä viikolla.",
				decision: "Mitä teit tai muutit",
				why: "Miksi (uni, väsymys, elämä)",
				add: "Lisää",
				clear: "Tyhjennä loki"
			},
			plan: {
				kicker: "Tämän kauden ohjelma",
				lead: "Kerro milloin kisan tai retken pitää olla valmis. Viikot täytetään siitä taaksepäin. Jos viikkoja on paljon, ne menevät kevyeen juoksuun. Jos vähemmän, pohjaa lyhennetään.",
				method: [
					"Tavoitepäivä ensin. Sitten peruskunto, kisajakso, kevennys.",
					"Ylimääräiset viikot ovat kevyttä juoksua, ei lisätehoja. Kuuden viikon ikkuna saa silti viikon, mutta ohuemman.",
					"Väsynyt viikko kevenee. Kisapäivää ei siirretä. Seuraava kausi lähtee ylempää kuin tämä."
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
				seasonsKey: "Yksi kisa ei tee kuntoa. Seuraava kausi lähtee ylempää kuin tämä, jos tämä kausi juostiin.",
				quality: {
					generous: {
						label: "Enemmän aikaa kuin ehdotus. Käytä se.",
						body: "Ylimääräiset viikot jäävät kevyeen juoksuun. Kisajakso ja kevennys pysyvät täysinä."
					},
					full: {
						label: "Ehdotettu ikkuna",
						body: "Tarpeeksi pohjaa, täysi kisajakso ja kunnollinen kevennys valitsemaasi päivään."
					},
					solid: {
						label: "Lyhyempi kuin ehdotus. Silti suunnitelma.",
						body: "Pohjaa leikataan ensin. Kisajakso ja kevennys pidetään. Lisäaika auttaisi silti."
					},
					tight: {
						label: "Puristettu ikkuna",
						body: "Suunnitelma kirjoitetaan silti, mutta rakentamiseen on vähemmän aikaa. Lisäviikot auttaisivat selvästi."
					},
					short: {
						label: "Hyvin lyhyt. Pito viikkoina.",
						body: "Tämä ei ole täysi valmistautuminen. Viikot kirjoitetaan silti päivään. Oikea hyöty on seuraava kausi, jossa on enemmän aikaa."
					}
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
				doneBody: "Yksi kausi on ohi. Valitse uusi tavoitepäivä. Seuraava lähtee ylempää jos tämä kausi juostiin.",
				nextSeason: "Aloita seuraava kausi",
				nextSeasonBody: "Sama retkityyppi. Uusi tavoitepäivä. Lähdet ylempää kuin kaudella yksi.",
				nextSeasonPeak: "Seuraava tavoitepäivä",
				easedNote: "Kevennetty koska olet väsynyt: kevyttä juoksua, ei tehoa. Tavoitepäivä ennallaan.",
				disclaimer: "Ei lääketieteellistä neuvontaa. Vastuu treeni- ja vuoripäätöksistä säilyy sinulla.",
				phases: {
					base: "Peruskunto",
					specific: "Kisajakso",
					taper: "Kevennys"
				},
				donePhase: "Tavoiteviikko",
				objectives: {
					engine: {
						name: "Aerobinen moottori",
						length: "Suositus 16 viikkoa / 4 kk",
						blurb: "Kisaa ei tarvita. Opettaa kropan tekemään enemmän työtä puhevauhdissa. Rasva oletuspolttoaineena, matala syke on tavoite. Valmis on se viikko jolloin moottorin haluat olevan paikallaan."
					},
					trail20: {
						name: "20 km polku",
						length: "Suositus 10 viikkoa",
						blurb: "Olettaa että juokset jo. Kevyt juoksu, yksi teho, pitkä kasvaa 90–110 minuuttiin. Huippu kisaviikolla."
					},
					fifty: {
						name: "50 km ultra",
						length: "Suositus 24 vk / 6 kk",
						blurb: "Pitkä peruskunto, sitten pitkän lenkin progressio ja yksi teho, kevennys kisaviikolle."
					},
					ultra100: {
						name: "80–120 km ultra",
						length: "Suositus 36 vk / 9 kk",
						blurb: "Ensin kevyet kuukaudet. Kisajakso on aika jaloilla ja yksi teho. Peräkkäiset päivät myöhään. Sitten 3–4 viikon kevennys."
					},
					alpine: {
						name: "Alppipäivä",
						length: "Suositus 10 viikkoa",
						blurb: "Aerobiset nousut plus oikea kiipeily: kallio tai jää, vetovoima, sitten vuoripäivä. Köysivälit eivät ole puhevauhtia."
					},
					traverse: {
						name: "Usean päivän alppireitti",
						length: "Suositus 32 vk / 8 kk",
						blurb: "Vaelluspohja, sitten kiipeily ja rinkka peräkkäisinä päivinä jotta päivällä kaksi on varaa. Kisajaksossa kiivetään, ei vain kävellä."
					},
					expedition: {
						name: "Korkean paikan retkikunta",
						length: "Suositus 40 vk / 10 kk",
						blurb: "Kuukausia kevyttä juoksua, sitten rinkka, vaellus ja sen verran kiipeilyä ettei vuori ole ensimmäinen kerta kun vedät. Kevennys on uni ja pakkaaminen."
					}
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
					strength: "Alppivoima: lukot, leuat, keskivartalo, antagonistit. Lyhyt ja kova."
				}
			},
			athlete: {
				onboarding: {
					kicker: "Sinun lähtötietosi",
					h1: "Miltä tämän viikon pitää oikeasti näyttää?",
					lead: "Muutama fakta siitä miten treenaat. Viikko kirjoitetaan niistä, ei geneerisestä mallista johon on liimattu nimesi.",
					next: "Jatka",
					back: "Takaisin",
					start: "Kirjoita kolme viikkoa",
					step: "Vaihe {n} / {total}",
					needDays: "Valitse vähintään kaksi treenipäivää.",
					eventName: "Kisan tai reissun nimi (valinnainen)",
					eventPlaceholder: "UTMB CCC, paikallinen 50 km, Grand Combin…",
					limitations: "Mikä nyt rajoittaa treeniä",
					limitationsHint: "Kolotus, aikaraja, jo saatu ohje. Käsitellään treenirajoitteena, ei diagnoosina.",
					reviewTitle: "Tästä viikot kirjoitetaan",
					reviewLead: "Tavoitepäivä pysyy, ellet itse siirrä. Väsynyt päivä treenaa vähemmän. Väliin jäänyttä ei pinota.",
					steps: [
						"Laji",
						"Tavoite",
						"Päivä",
						"Kuorma",
						"Päivät",
						"Maasto",
						"Arki"
					],
					sports: {
						running: "Juoksu",
						mountaineering: "Vuorikiipeily",
						mixed: "Molemmat"
					},
					disciplines: {
						trail: "Polku",
						ultra: "Ultra",
						alpine: "Alpit / kiipeily",
						road: "Tie",
						ski: "Suksi / skimo"
					},
					experience: {
						beginner: "Matka tai maasto on uusi",
						intermediate: "Yksi tai kaksi kautta takana",
						experienced: "Useampi huippu tai ultra tehty",
						veteran: "Tämä on toistuva kausi"
					},
					volume: {
						h0_3: "Alle 3 h viikossa",
						h3_5: "3–5 h",
						h5_8: "5–8 h",
						h8_12: "8–12 h",
						h12p: "12 h tai enemmän"
					},
					longest: {
						m60: "Alle 60 min",
						m90: "60–90 min",
						m150: "90–150 min",
						m240: "2,5–4 h",
						m240p: "Yli 4 h"
					},
					terrain: {
						flat: "Enimmäkseen tasaista",
						rolling: "Mäkiä ja polkuja",
						mountain: "Vuoria joihin pääsen",
						highAlpine: "Korkea alppi / jäätikkö"
					},
					equipment: {
						trailShoes: "Polkukengät",
						poles: "Sauvat",
						pack: "Rinkka jossa voin treenata",
						gym: "Sali tai kotivoima",
						crampons: "Jääraudat",
						iceAxe: "Hakku"
					},
					constraints: {
						shiftWork: "Vuorotyö",
						travelHeavy: "Paljon matkustamista",
						youngKids: "Pienet lapset / aamut",
						shortSleep: "Tottunut lyhyeen uneen",
						deskJob: "Toimistotyö, kankeat lonkat"
					},
					units: {
						km: "Kilometrit",
						miles: "Mailit"
					},
					availableTitle: "Päivät jolloin voit treenata",
					peakLabel: "Päivä jolloin haluat olla valmis"
				},
				today: {
					kicker: "Tänään",
					title: "Mitä tänään juostaan",
					wakeTitle: "Miltä herätys tuntui?",
					wakeLead: "Viisi merkintää. Sykeluvut jos ne on. Suositus on tiukin sääntö joka täyttyy — ei piiloscorea.",
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
						stress: "Rauha"
					},
					scaleHigh: {
						sleep: "Erinomainen",
						soreness: "Kova",
						motivation: "Kova halu",
						fatigue: "Rikki",
						stress: "Korkea"
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
					access: {
						trail: "Polku",
						mountain: "Vuori",
						gym: "Sali",
						climbing: "Kiipeilykamat"
					},
					whyChanged: "Miksi tämä muuttui",
					whyWeek: "Miksi viikko näyttää tältä",
					peakLocked: "Tavoitepäivä {peak} — siirtyy vain jos siirrät sen.",
					noSession: "Tänään ei ole sessiota. Lepo, tai viikko ei ole vielä alkanut.",
					doneFlash: "Merkitty. Ekstraa ei lisätä.",
					missedFlash: "Väliin. Myöhempiä kovia ei pinota päälle.",
					editProfile: "Muuta lähtötietoja",
					thisWeek: "Tämä viikko",
					safety: "Tämä on treenikuorman kutsu, ei diagnoosi. Kipu, sairaus tai vamma: lopeta ja puhu lääkärille tai pätevälle valmentajalle.",
					overrideLabel: "Ymmärrän suosituksen ja pidän silti kirjoitetun session.",
					overrideKeep: "Pidä kirjoitettu sessio",
					calls: {
						ready: {
							title: "Valmis kirjoitettuun sessioon",
							action: "Tee se mikä on suunnitelmassa."
						},
						reduce: {
							title: "Treenaa, mutta kevennä",
							action: "Liiku. Leikkaa kova osa."
						},
						easy: {
							title: "Kevyt tai palauttava tänään",
							action: "Vain puhevauhtia. Ei tehoa."
						},
						rest: {
							title: "Lepo, katso huomenna",
							action: "Ei sessiota tänään."
						}
					},
					reasons: {
						availableDays: "Treenipäiviä on {n}. Muut ovat lepoa.",
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
						limitationsConservative: "Merkitsit rajoitteen. Pitkä ja teho pysyvät varovaisina. Tämä ei ole kuntoutusohjelma.",
						longFromBand: "Pitkä on {n} min, koska se vastaa nykyistä pisintä vetoa.",
						volumeSplit: "Kevyet päivät jakavat {n} minuutin viikon.",
						missedNoStack: "Kova sessio jäi väliin. Päälle ei pinota. Ei korvaavaa tehoa.",
						travelSwap: "Matka {until} asti. Vuori- ja kiipeilypäivät ovat kevyttä sieltä missä olet.",
						engineConversational: "Aerobinen moottori: jokainen veto pysyy puhevauhdissa.",
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
						normalLoad: "Viime päivien kuorma on tavallinen ({n} kovaa/pitkää kolmessa päivässä)."
					}
				},
				profile: {
					title: "Miten treenaat",
					lead: "Muuta fakta, niin seuraava viikko kirjoitetaan uudestaan. Tavoitepäivä pysyy, ellet muuta sitä.",
					save: "Tallenna ja kirjoita viikko uudestaan",
					saved: "Tallennettu",
					reopen: "Muuta tietoja"
				}
			}
		},
		fieldPage: fieldFi
	},
	fr: {
		metaTitle: "Ridgework — Programmes d’entraînement trail, alpin et altitude",
		metaDescription: "Sept programmes glissants : moteur aérobie, trail 20 km, 50 km, ultra 80–120 km, journée alpine, itinéraire de plusieurs jours, expédition en altitude. Fatigué : moins de travail. Prix fondateur €5/mois après 14 jours gratuits.",
		footerTag: "Programmes d’entraînement trail, alpin et altitude.",
		legalEntity: "Ridgework, Magnieu, France. Immatriculation en cours.",
		support: "support@ridgework.org",
		cancelAnytime: "Résiliez à tout moment",
		terms: "Conditions",
		privacy: "Confidentialité",
		copyright: "© 2026 Ridgework. France.",
		nav: {
			about: "Qui nous sommes",
			method: "Méthode",
			projects: "Projets",
			programs: "Programmes",
			who: "Pour qui",
			what: "Ce que vous obtenez",
			week: "Une semaine type",
			pricing: "Tarifs",
			faq: "FAQ",
			app: "Cette semaine",
			field: "Notes",
			guides: "Guides",
			example: "Exemple",
			menu: "Menu",
			login: "Connexion",
			account: "Compte"
		},
		cta: {
			start: "Commencer 14 jours gratuits",
			pricing: "Voir les tarifs",
			openTools: "Ouvrir les outils"
		},
		hero: {
			kicker: "Entraînement d’endurance",
			h1: "Choisissez le jour où vous voulez être au pic",
			lead: "Toute date convient. L’entraînement s’adapte à cette fenêtre. Une préparation plus longue est toujours meilleure. Le grand résultat se construit saison après saison.",
			trial: "14 jours gratuits. Puis €5/mois prix fondateur. Résiliez à tout moment."
		},
		about: {
			kicker: "Qui nous sommes",
			h2: "Un produit d’entraînement, basé en France",
			lead: "Ridgework écrit des structures de semaine pour le trail et la montagne. Langage clair, un calendrier que l’on peut courir, pas de théâtre.",
			cards: [
				{
					title: "Langage clair",
					body: "Prix visibles. Une semaine que vous pouvez vraiment courir. Pas de slogans, pas de faux avis."
				},
				{
					title: "Semaines répétables",
					body: "Charge, récupération, volume facile, une dose de qualité. L’ordinaire qui s’accumule."
				},
				{
					title: "Voix coach",
					body: "Le support vient d’un bureau coaching. Vous parlez à Ridgework (un alias convient) ; les méthodes restent stables."
				}
			],
			foot: "Nous commençons par l’UE, le Royaume-Uni et la Suisse."
		},
		method: {
			kicker: "Méthode",
			h2: "Volume facile, une dose de qualité, affûtage vers le jour J",
			lead: "Nous nous appuyons sur un petit ensemble d’articles bien cités : distribution d’intensité, charge comme entrée de planification, taper comme motif. Checklists et structures de semaine — pas un avis médical.",
			cards: [
				{
					title: "Distribution d’intensité",
					body: "Une grande part de la littérature décrit une forte part de volume aérobie facile, avec une part plus petite de travail dur — souvent polarisé ou pyramidal. Nos planificateurs traitent ce motif comme une hypothèse par défaut à ajuster, pas une prescription rigide."
				},
				{
					title: "Charge et récupération comme entrées de décision",
					body: "Journaux de séance, sommeil et fatigue simple changent la semaine. Si vous êtes fatigué, le dur devient facile. Le suivi aide l’entraînement ; il ne diagnostique pas la santé."
				},
				{
					title: "Le taper comme motif de planification",
					body: "Avant un objectif, le volume diminue souvent tandis que les intensités clés restent en doses plus courtes. Nous l’encodons comme un bloc réutilisable avec des points de décision clairs."
				}
			],
			caveatsTitle: "Réserves honnêtes",
			caveats: [
				"La réponse individuelle varie — âge, historique, terrain et stress de vie changent ce qui “marche”.",
				"Les moyennes publiées ne sont pas un avis médical et ne remplacent pas un clinicien pour les questions de santé.",
				"Nous traduisons la littérature en checklists et structures de semaine pour décider les yeux ouverts."
			],
			sourcesTitle: "Sources (vérifiées Crossref)"
		},
		projects: {
			kicker: "Projets exemples",
			h2: "Briefs de projet compacts",
			lead: "Trois objectifs exemples comme objets de planification. La durée est le plan d’entraînement — base aérobie, bloc spécifique, affûtage pour piquer le jour J — pas la longueur du week-end ou de la course. Une cellule de détail reste verrouillée jusqu’à l’accès fondateur.",
			items: [
				{
					title: "Objectif week-end alpin",
					fields: [
						{
							label: "Objectif",
							value: "Journée de montagne sûre et efficace avec règles de demi-tour claires"
						},
						{
							label: "Plan",
							value: "10 semaines — 6 sem. base aérobie + dénivelé, 3 sem. spécifique, affûtage 10–14 j. dans la fenêtre météo"
						},
						{
							label: "Focus",
							value: "Garder le volume facile facile ; ajouter du D+ conversationnel ; piquer la fenêtre météo, pas les kilomètres extra"
						},
						{
							label: "Risque / décision",
							value: "Fenêtre météo, freeze–thaw, itinéraires de repli, gate fatigue la veille"
						}
					]
				},
				{
					title: "Premier 50 km trail",
					fields: [
						{
							label: "Objectif",
							value: "Finir bien, pas seulement finir — ravitaillement et allure sous contrôle"
						},
						{
							label: "Plan",
							value: "6 mois (24 sem.) — 10 sem. base aérobie, 12 sem. construction de la longue, affûtage 10–14 j. pour la semaine de course"
						},
						{
							label: "Focus",
							value: "Volume facile d’abord, puis progression de la longue et une séance de qualité ; pic la semaine de course"
						},
						{
							label: "Recette de séance",
							value: "Semaine 20 (fin du spécifique) : 3×12 min à allure marathon sur trail vallonné, 4 min facile ; gates chaleur et niggle avant le départ. Puis affûtage 10–14 jours.",
							locked: true
						}
					]
				},
				{
					title: "Traversée refuge à refuge",
					fields: [
						{
							label: "Objectif",
							value: "Trois jours liés, décisions météo et matériel déjà écrites"
						},
						{
							label: "Plan",
							value: "8 mois — base aérobie/randonnée hiver–printemps, 10 sem. sac et back-to-backs, affûtage 10–14 j. vers le jour 1"
						},
						{
							label: "Focus",
							value: "Les jambes se font dans les mois de base ; le spécifique est sac + jours liés ; pic pour le jour 1, pas un crash le jour 3"
						},
						{
							label: "Risque / décision",
							value: "Convection l’après-midi, neige versants nord, vallée de repli, fatigue après le jour 1"
						}
					]
				}
			]
		},
		programs: {
			kicker: "Programmes",
			h2: "Choisissez la sortie — ou le moteur. Puis le pic.",
			lead: "Vous choisissez quand vous voulez être au pic. Pas de course ? Commencez par le moteur aérobie : plus de travail à basse fréquence cardiaque, le gras comme carburant par défaut. Toute durée convient — plus long est clairement mieux.",
			columns: {
				name: "Programme",
				duration: "Durée",
				focus: "Focus",
				recipe: "Recette de séance"
			},
			rows: [
				{
					id: "engine",
					name: "Moteur aérobie",
					duration: "Recommandé 16 semaines / 4 mois",
					focus: "Plus de travail à allure conversationnelle. Gras comme carburant par défaut. Pas de course obligatoire.",
					locked: "La plupart des jours conversationnels. La longue vers 90 min. Si vous parlez en phrases, vous êtes dans le travail. Pas de dose de qualité — le moteur est la qualité.",
					pull: "Si vous sortez une phrase entière, vous êtes dans le travail.",
					layout: "textFirst"
				},
				{
					id: "trail20",
					name: "Trail 20 km",
					duration: "Recommandé 10 semaines",
					focus: "Volume facile, une dose de qualité, longue vers 90–110 min",
					locked: "Semaine 8 : 6×3 min à allure 10 km sur trail roulant, 2 min facile. Longue 90–110 min. Puis 7 jours d’affûtage.",
					layout: "sessionLead"
				},
				{
					id: "fifty",
					name: "Ultra 50 km",
					duration: "Recommandé 24 sem. / 6 mois",
					focus: "Base aérobie, puis progression de la longue, pic la semaine de course",
					locked: "Semaine 20 (fin du spécifique) : 3×12 min à effort marathon sur trail roulant, 4 min facile. Puis 10–14 jours d’affûtage.",
					tag: "Souvent un premier ultra",
					pull: "Finir bien, pas seulement finir.",
					layout: "wide"
				},
				{
					id: "ultra100",
					name: "Ultra 80–120 km",
					duration: "Recommandé 36 sem. / 9 mois",
					focus: "Des mois de temps facile sur les pieds, back-to-backs tard, affûtage de quatre semaines",
					locked: "Semaine 30 : sam. 4–5 h trail facile, dim. 2,5–3 h facile. La semaine reste conversationnelle. Puis 3–4 semaines d’affûtage."
				},
				{
					id: "alpine",
					name: "Journée alpine",
					duration: "Recommandé 10 semaines",
					focus: "Approches aérobies, escalade et force, puis journée montagne",
					locked: "Semaine 8 : séance d’escalade (rocher/glace/salle) + 1 200–1 800 m d’approche conversationnelle. Force 30–40 min. Fatigué : l’escalade devient rando facile.",
					tag: "Avec de l’escalade",
					layout: "sessionLead"
				},
				{
					id: "traverse",
					name: "Itinéraire alpin de plusieurs jours",
					duration: "Recommandé 32 sem. / 8 mois",
					focus: "Base rando, puis sac et back-to-backs, pic le jour 1",
					locked: "Semaine 28 : deux jours liés, sac léger. Couper le jour 2 si les restes sont dans les jambes.",
					layout: "compact"
				},
				{
					id: "expedition",
					name: "Expédition en altitude",
					duration: "Recommandé 40 sem. / 10 mois",
					focus: "Rando et volume facile, portages, l’affûtage est sommeil et matériel",
					locked: "Semaine 34 : portage 3–4 h en rando, puis un jour de repos. Une nuit dehors si la vie le permet. L’affûtage est sommeil et matériel, pas l’altitude extra."
				}
			],
			lockHint: "Séance clé"
		},
		who: {
			h2: "Pour qui — et pour qui non",
			forTitle: "Conçu pour",
			forItems: [
				"Athlètes d’endurance qui planifient la semaine autour de la vraie vie et du terrain",
				"Ceux qui s’entraînent vers un trail 20 km, un ultra 50 ou 100 km, une journée alpine, un itinéraire lié ou un camp d’altitude",
				"Ceux qui droppent vraiment une séance quand ils sont fatigués",
				"Ceux qui préfèrent des outils calmes au spam motivationnel"
			],
			notTitle: "Pas pour",
			notItems: [
				"Conseils médicaux, diagnostics ou traitements",
				"Secrets de course, « hack VO2 » ou culture hustle",
				"Un coach personnel ou un chat en direct",
				"Un soutien clinique ou d’urgence"
			]
		},
		what: {
			h2: "Ce que vous obtenez",
			items: [
				{
					n: "01",
					title: "Plan depuis votre date de pic",
					body: "Vous choisissez quand piquer. Les semaines s’écrivent dans cette fenêtre — base, spécifique, affûtage. Plus long est toujours mieux."
				},
				{
					n: "02",
					title: "Fatigue comme entrée d’entraînement",
					body: "Si vous êtes fatigué, la semaine s’entraîne moins. Les séances dures deviennent faciles. La date de pic reste."
				},
				{
					n: "03",
					title: "Matériel et ravitaillement",
					body: "Chaussures, couches, boisson et sommeil pour la semaine réelle."
				},
				{
					n: "04",
					title: "Journal d’entraînement",
					body: "Notez ce que vous avez fait et pourquoi la charge a changé."
				}
			]
		},
		week: {
			h2: "Comment se déroule une semaine",
			steps: [
				{
					day: "Lun",
					title: "Écrire la semaine",
					body: "La date de pic est posée. Volume facile, une qualité si vous êtes frais, la longue."
				},
				{
					day: "Mar",
					title: "Sommeil et jambes",
					body: "Cinq heures de sommeil ? Les intervalles deviennent 45–60 min facile."
				},
				{
					day: "Jeu",
					title: "Garder le facile facile",
					body: "Le gros de la semaine reste conversationnel."
				},
				{
					day: "Dim",
					title: "Noter ce qui s’est passé",
					body: "La longue, la chaleur, la gène. La semaine suivante part de là."
				}
			]
		},
		scenario: {
			kicker: "Exemple",
			h2: "Un vrai mardi, pas un slogan",
			setup: "Ultra de 77 km dans six semaines.",
			facts: [
				{
					label: "Sommeil cette nuit",
					value: "5 heures"
				},
				{
					label: "Hier",
					value: "32 km longue"
				},
				{
					label: "Genou droit",
					value: "2/10"
				},
				{
					label: "Météo dimanche",
					value: "28°C"
				}
			],
			says: "L’appel de la semaine",
			actions: [
				"Sauter les intervalles d’aujourd’hui",
				"45–60 min facile à la place",
				"Déplacer la longue au lundi s’il reste chaud",
				"Boire 500–750 ml/h sur la longue",
				"Réévaluer demain"
			],
			note: "Pas un diagnostic. Gonflement, blocage, aggravation : un clinicien. Ici c’est une semaine d’entraînement."
		},
		firstWeek: {
			kicker: "Vos 14 premiers jours",
			h2: "Ce qui se passe après la connexion",
			lead: "€5 est bon marché. L’essai sert à courir une vraie semaine, pas à regarder un prix.",
			days: [
				{
					day: "Jour 1",
					title: "Choisir le pic et bâtir la semaine",
					body: "77 km, journée alpine, ou le moteur. Trois semaines apparaissent."
				},
				{
					day: "Jour 3",
					title: "Ajuster à la fatigue",
					body: "Sommeil court. Le dur devient facile. La date de pic reste."
				},
				{
					day: "Jour 6",
					title: "Préparer la longue",
					body: "Kit, boisson, allure déjà utilisés. Pas de nouveau gel."
				},
				{
					day: "Jour 7",
					title: "Noter ce qui s’est passé",
					body: "La semaine suivante part du journal."
				}
			]
		},
		guidesIndex: {
			kicker: "Guides",
			h2: "Des questions d’entraînement, écrites",
			lead: "77 km et six semaines. 100 km. Fatigue. Journées alpines. Checklist de course.",
			cta: "Ouvrir les guides"
		},
		pricing: {
			kicker: "Tarifs",
			h2: "Tarifs",
			lead: "Le prix fondateur est verrouillé tant que vous restez abonné. Résiliez à tout moment.",
			badge: "Fondateur — chemin principal",
			trialBadge: "14 jours gratuits",
			name: "Abonnement fondateur",
			price: "€5",
			per: "/mois",
			blurb: "14 jours gratuits. Puis €5/mois prix fondateur. Résiliez à tout moment.",
			features: [
				"Accès complet aux programmes glissants, au plan de semaine et à la prep d’entraînement",
				"€5/mois verrouillé tant que l’abonnement continue",
				"Résiliation à tout moment — pas de long engagement",
				"Pas de claims médicaux — des semaines d’entraînement"
			],
			laterTitle: "Tarifs publics plus tard",
			laterBody: "Après la phase fondateur : €1 / 7 jours puis €12/mois. Plus tard, nouveaux inscrits autour de €15–19/mois. Les fondateurs gardent €5/mois tant qu’ils restent abonnés."
		},
		checkout: {
			kicker: "Essai fondateur",
			h2: "Commencer 14 jours gratuits",
			lead: "Créez un compte et inscrivez-vous à un programme. Pas de carte pendant le test. Stripe avec le SIRET.",
			name: "Nom",
			email: "E-mail",
			submit: "Commencer 14 jours gratuits",
			note: "Résiliez à tout moment via support@ridgework.org. Pas de diagnostics. Vous restez responsable de la sécurité en montagne et à l’entraînement.",
			successTitle: "Essai fondateur activé",
			successBody: "Les outils sont déverrouillés sur cet appareil. Ouvrez Programme pour les semaines glissantes, puis la semaine en cours et le journal.",
			daysLeft: "jours restants sur l’essai aperçu"
		},
		faq: {
			h2: "FAQ",
			items: [
				{
					q: "Qu’est-ce que Ridgework ?",
					a: "Sept programmes d’entraînement glissants pour le trail et la montagne, dont un moteur aérobie à basse fréquence cardiaque. Pas un service médical."
				},
				{
					q: "Comment marche le prix fondateur ?",
					a: "14 jours gratuits, puis €5/mois verrouillé tant que vous restez abonné."
				},
				{
					q: "Puis-je résilier à tout moment ?",
					a: "Oui. Depuis le compte ou par e-mail. Accès jusqu’à la fin de la période payée."
				},
				{
					q: "Après la phase fondateur ?",
					a: "Nouveaux : €1/7 j → €12/mois ; plus tard €15–19. Fondateurs : €5."
				},
				{
					q: "Carte pour l’essai ?",
					a: "Sur le site public, le checkout peut demander une carte. Facturation après 14 jours. Cet aperçu ne prend pas de carte."
				},
				{
					q: "Est-ce un avis médical ?",
					a: "Non. Pas de diagnostic ni de traitement. Pour la santé, consultez un professionnel."
				},
				{
					q: "Le programme s’écrit-il tout seul au fil des semaines ?",
					a: "Oui — dans le produit, pas dans un chat bot. Vous choisissez la date de pic. L’onglet Programme garde toujours trois semaines écrites dans cette fenêtre. Une bonne semaine ajoute la suivante. Une semaine fatiguée s’entraîne moins ; la date de pic reste. Après la sortie, la saison suivante part d’un plancher plus haut."
				},
				{
					q: "Qui est derrière ?",
					a: "Société produit et coaching en France. Le support est assuré par l’équipe coaching (vous pouvez voir un alias). Le produit, ce sont les programmes d’entraînement : semaine, charge, préparation."
				},
				{
					q: "Quelles langues ?",
					a: "Site en EN (complet), FI, FR, DE (versions plus courtes)."
				},
				{
					q: "Données personnelles ?",
					a: "Attentes UE/France. Voir Confidentialité. Pas de vente pour la pub."
				},
				{
					q: "Support ?",
					a: "support@ridgework.org — réponse sous quelques jours ouvrés."
				}
			]
		},
		disclaimer: {
			h2: "Avertissement",
			body: "Ridgework fournit des outils d’aide à la décision pour l’entraînement et la préparation en montagne. Ce n’est pas un dispositif médical ni un substitut à un conseil professionnel. Les citations de recherche publiée informent des cadres de planification et des checklists ; ce ne sont pas des claims médicaux ni des prescriptions individualisées. Vous restez responsable de vos décisions de sécurité. Pas de diagnostics. Pas de claims de traitement."
		},
		foundingPage: {
			kicker: "Founding",
			h1: "Vous êtes invité·e au fondateur",
			lead: "Mêmes outils. Prix fondateur verrouillé. Onboarding calme.",
			trial: "14 jours gratuits. Puis €5/mois prix fondateur. Résiliez à tout moment.",
			note: "Page pour invitations chaleureuses. Tarifs publics plus élevés ensuite pour les nouveaux ; fondateurs gardent €5/mois.",
			back: "← Ridgework",
			title: "Founding — Ridgework",
			description: "Mêmes outils. Prix fondateur verrouillé. Onboarding calme."
		},
		termsPage: {
			title: "Conditions d’utilisation",
			updated: "Dernière mise à jour : septembre 2026",
			body: ["Stub terms (France / EU). Ridgework provides decision tools — not medical care, no diagnoses. Founding: 14 days free, then €5/month while subscribed. Cancel anytime (support@ridgework.org). You remain responsible for training and mountain safety decisions. Mandatory consumer rights under French/EU law are not limited."]
		},
		privacyPage: {
			title: "Politique de confidentialité",
			updated: "Dernière mise à jour : septembre 2026",
			body: ["Stub privacy notice (EU / France / GDPR principles). Company: Ridgework, France. Contact: support@ridgework.org. Full counsel-reviewed policy before launch. We do not sell personal data for ads. Payments via Stripe. Not a medical service — do not submit sensitive health diagnoses.", "Rights: access, rectification, erasure, restriction, portability, objection where applicable; complaint to a French/EU authority."]
		},
		appPage: {
			title: "Outils — Ridgework",
			kicker: "Outils fondateur",
			h1: "L’entraînement de la semaine",
			lead: "Choisissez le jour où vous voulez être au pic. Le programme glissant écrit les semaines dans cette fenêtre. Fatigué : moins de travail. Rien ici n’est un avis médical.",
			lockedTitle: "Accès fondateur requis",
			lockedBody: "Commencez l’essai fondateur de 14 jours pour utiliser le programme glissant, le plan de semaine, la prep de séance et le journal.",
			trialLabel: "Essai aperçu",
			testBanner: "Période de test — les sept programmes sont ouverts, sans paiement. Connectez-vous, choisissez le jour du pic. Stripe arrive avec le SIRET. Plus long est toujours mieux.",
			signInToTrain: "Connectez-vous pour enregistrer les programmes sur votre compte. Pas de paiement pendant le test.",
			tabs: {
				today: "Aujourd’hui",
				plan: "Programme",
				week: "Semaine",
				prep: "Prep",
				log: "Journal",
				profile: "Vous"
			}
		},
		auth: {
			title: "Connexion",
			lead: "Créez un compte pour vous inscrire à un programme. Le jour du pic d’abord, puis les semaines.",
			email: "E-mail",
			password: "Mot de passe",
			name: "Nom",
			signIn: "Se connecter",
			signUp: "Créer un compte",
			or: "ou",
			withGoogle: "Continuer avec Google",
			withX: "Continuer avec X",
			haveAccount: "Déjà un compte ? Connexion",
			noAccount: "Pas encore de compte ? Créez-en un",
			error: "Connexion impossible. Vérifiez e-mail et mot de passe.",
			testNote: "Période de test : programmes gratuits. Paiement par carte (Stripe) quand le SIRET français est prêt."
		},
		dashboard: {
			enrollments: "Vos programmes",
			empty: "Aucun programme sur ce compte. Choisissez ci-dessous.",
			billingTest: "Accès test — non facturé",
			peak: "Pic",
			statusTest: "Test",
			saved: "Enregistré sur votre compte"
		},
		tools: {
			week: {
				save: "Enregistrer la semaine",
				saved: "Enregistré sur cet appareil",
				days: [
					"Lun",
					"Mar",
					"Mer",
					"Jeu",
					"Ven",
					"Sam",
					"Dim"
				],
				types: {
					easy: "Facile",
					steady: "Soutenu",
					hard: "Dur",
					rest: "Repos"
				},
				session: "Ce que vous avez vraiment couru",
				readiness: "Comment le corps sent-il cette semaine ?",
				readinessLead: "Cela ne change que l’entraînement. Fatigué = moins de travail. Cassé = repos à la place de la qualité.",
				levels: {
					fresh: "Frais",
					ok: "Correct",
					tired: "Fatigué",
					wrecked: "Cassé"
				},
				notes: {
					fresh: "Garder la semaine écrite. Pas d’héroïsme extra.",
					ok: "Garder la charge. Pas de second jour dur.",
					tired: "Les séances dures et soutenues passent en facile. Vous vous entraînez moins.",
					wrecked: "Dur et soutenu deviennent repos. Le facile reste facile. Reprise la semaine suivante."
				}
			},
			pace: {
				title: "Ce que les mots veulent dire",
				lead: "Conversationnel n’est pas une humeur. C’est si vous pouvez parler. Montre si vous en avez une. Test de parole sinon.",
				talkTitle: "Conversationnel / facile",
				talk: "Une phrase complète sans happer l’air. Si seuls des mots sortent, vous allez trop vite pour un jour facile.",
				zonesTitle: "Comment suivre",
				feelHead: "Sensation",
				watchHead: "Montre / FC",
				noneHead: "Sans appareil",
				rows: [
					{
						zone: "Facile · zone 1–2",
						feel: "Phrases complètes. Le gros de la semaine.",
						watch: "Environ 60–75 % FC max, ou sous le seuil aérobie. ~80 % du temps ici.",
						none: "Test de parole. Si la côte vole la phrase, marchez jusqu’à ce qu’elle revienne."
					},
					{
						zone: "Soutenu · haut Z2 / bas Z3",
						feel: "Phrases courtes. Contrôlé, pas une course.",
						watch: "Environ 75–85 % FC max. Pas sur une semaine fatiguée.",
						none: "Vous répondez à une question, vous ne racontez pas une histoire."
					},
					{
						zone: "Dur / qualité · Z3–4",
						feel: "Quelques mots. Une dose par semaine, ou zéro si fatigué.",
						watch: "Seuil ~85–92 % FC max. Le seul jour dur.",
						none: "La respiration est bruyante. Vous ne discuteriez pas."
					},
					{
						zone: "Escalade / force",
						feel: "Pas une zone FC. La préhension et le skill montent le pouls.",
						watch: "Ignorez les zones au mur. Comptez les longueurs ou séries, puis stop.",
						none: "Arrêtez quand la technique casse. La force est courte."
					}
				],
				alpineTitle: "Les semaines alpines ne sont pas que de la marche",
				alpine: "Les approches restent conversationnelles. Le spécifique ajoute une séance d’escalade et une dose de force courte. Base aérobie d’abord, puis force et technique, puis journées montagne avec sac. Les longueurs sont du travail."
			},
			prep: {
				kit: "Matériel de séance",
				fuel: "Ravitaillement",
				recovery: "Récupération",
				kitItems: [
					"Chaussures adaptées au terrain de la semaine",
					"Couche dans laquelle le facile est vraiment facile",
					"Frontale si la longue part dans le noir",
					"Montre ou téléphone avec la séance écrite",
					"Une paire de chaussettes de rechange pour la longue"
				],
				fuelItems: [
					"Petit-déjeuner déjà utilisé à l’entraînement",
					"Glucides sur la longue — déjà testés",
					"Eau pour la durée réelle, pas l’espérée",
					"Quelque chose de salé si la semaine est chaude",
					"Pas de nouveaux gels une semaine fatiguée"
				],
				recoveryItems: [
					"Fenêtre de sommeil écrite avant le jour dur",
					"Jour facile après la dose de qualité",
					"Manger dans l’heure après la longue",
					"Si fatigué : sauter les strides extra",
					"Si cassé : la séance est le repos"
				]
			},
			log: {
				empty: "Aucune note d’entraînement cette semaine.",
				decision: "Ce que vous avez fait ou changé",
				why: "Pourquoi (sommeil, fatigue, vie)",
				add: "Ajouter",
				clear: "Vider le journal"
			},
			plan: {
				kicker: "Programme glissant",
				lead: "Vous choisissez le jour où vous voulez être au pic. L’entraînement s’adapte à cette fenêtre. Toute date convient — une préparation plus longue est toujours meilleure. Le grand résultat se construit saison après saison.",
				method: [
					"Choisissez d’abord la date de pic. Les semaines s’écrivent à rebours : base, puis spécifique, puis affûtage.",
					"Plus long est toujours mieux. Les semaines extra restent en base aérobie. Une fenêtre courte a quand même un plan — c’est juste une construction plus mince.",
					"Fatigué : cette semaine s’entraîne moins. La date de pic reste. Après la sortie, la saison suivante part d’un plancher plus haut."
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
				seasonsKey: "La clé d’un grand résultat n’est pas un bloc héroïque. C’est le développement continu, saison après saison — chaque pic part d’un plancher plus haut.",
				quality: {
					generous: {
						label: "Plus long que recommandé — la meilleure voie",
						body: "Les semaines extra restent en base aérobie. Construction plus solide. Spécifique et affûtage restent complets."
					},
					full: {
						label: "Fenêtre recommandée",
						body: "Assez de base, un bloc spécifique complet, un affûtage propre jusqu’au jour choisi."
					},
					solid: {
						label: "Plus court que recommandé — encore complet",
						body: "La base est coupée d’abord. Spécifique et affûtage sont gardés. Plus long serait encore mieux."
					},
					tight: {
						label: "Fenêtre compressée",
						body: "Un pic est encore écrit, mais il y a moins de temps pour construire. Plus long serait clairement mieux."
					},
					short: {
						label: "Très court — un maintien",
						body: "Ce n’est pas une construction complète. Les semaines sont quand même écrites. Le vrai gain est la saison suivante, avec plus de temps."
					}
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
				doneBody: "Une saison est faite. Le grand résultat est la suivante, et celle d’après. Choisissez une nouvelle date de pic — le développement continu est la méthode.",
				nextSeason: "Démarrer la saison suivante",
				nextSeasonBody: "Même type de sortie. Nouvelle date de pic. Vous partez d’un plancher plus haut.",
				nextSeasonPeak: "Prochaine date de pic",
				easedNote: "Allégé parce que vous êtes fatigué — volume facile, pas de dose de qualité. Date de pic inchangée.",
				disclaimer: "Pas un avis médical. Vous restez responsable des décisions d’entraînement et de montagne.",
				phases: {
					base: "Base aérobie",
					specific: "Bloc spécifique",
					taper: "Affûtage"
				},
				donePhase: "Semaine de pic",
				objectives: {
					engine: {
						name: "Moteur aérobie",
						length: "Recommandé 16 semaines / 4 mois",
						blurb: "Pas de course obligatoire. Apprendre au corps à faire plus de travail à allure conversationnelle — le gras comme carburant par défaut, la basse fréquence cardiaque comme but. Le pic est la semaine où le moteur doit être en place."
					},
					trail20: {
						name: "Trail 20 km",
						length: "Recommandé 10 semaines",
						blurb: "Vous courez déjà. Volume facile, une dose de qualité, une longue vers 90–110 min. Pic la semaine de course."
					},
					fifty: {
						name: "Ultra 50 km",
						length: "Recommandé 24 sem. / 6 mois",
						blurb: "Longue base aérobie, puis progression de la longue avec une séance de qualité, affûtage la semaine de course."
					},
					ultra100: {
						name: "Ultra 80–120 km",
						length: "Recommandé 36 sem. / 9 mois",
						blurb: "Des mois aérobies d’abord. Le spécifique est du temps sur les pieds et une dose de qualité. Back-to-backs tard. Affûtage de quatre semaines."
					},
					alpine: {
						name: "Journée alpine",
						length: "Recommandé 10 semaines",
						blurb: "Approches aérobies plus de l’escalade vraie : rocher ou glace, force de traction, puis une journée montagne. Les longueurs ne sont pas conversationnelles."
					},
					traverse: {
						name: "Itinéraire alpin de plusieurs jours",
						length: "Recommandé 32 sem. / 8 mois",
						blurb: "Base rando, puis escalade et portage en back-to-backs pour que le jour 2 ait une réserve. On grimpe dans le spécifique — on ne fait pas que marcher."
					},
					expedition: {
						name: "Expédition en altitude",
						length: "Recommandé 40 sem. / 10 mois",
						blurb: "Des mois de volume facile, puis sac, rando, et assez d’escalade pour que la montagne ne soit pas la première traction. Affûtage = sommeil et matériel."
					}
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
					strength: "Force alpine — lock-offs, tractions, gainage, antagonistes. Court et dur."
				}
			},
			athlete: {
				onboarding: {
					kicker: "Votre base",
					h1: "À quoi doit ressembler vraiment cette semaine ?",
					lead: "Quelques faits sur comment vous vous entraînez. La semaine est écrite à partir de ça, pas d’un modèle générique.",
					next: "Continuer",
					back: "Retour",
					start: "Écrire mes trois semaines",
					step: "Étape {n} sur {total}",
					needDays: "Choisissez au moins deux jours d’entraînement.",
					eventName: "Nom de la course ou de la sortie (optionnel)",
					eventPlaceholder: "UTMB CCC, 50 km local, Grand Combin…",
					limitations: "Ce qui limite l’entraînement maintenant",
					limitationsHint: "Une gêne, un plafond de temps. Traité comme une contrainte d’entraînement, pas un diagnostic.",
					reviewTitle: "C’est à partir de ça que les semaines sont écrites",
					reviewLead: "La date cible reste, sauf si vous la changez. Un jour fatigué entraîne moins.",
					steps: [
						"Sport",
						"Objectif",
						"Date",
						"Charge",
						"Jours",
						"Terrain",
						"Vie"
					],
					sports: {
						running: "Course",
						mountaineering: "Alpinisme",
						mixed: "Les deux"
					},
					disciplines: {
						trail: "Trail",
						ultra: "Ultra",
						alpine: "Alpin / escalade",
						road: "Route",
						ski: "Ski-mo"
					},
					experience: {
						beginner: "Nouveau sur cette distance ou ce terrain",
						intermediate: "Une ou deux saisons déjà",
						experienced: "Plusieurs sommets ou ultras",
						veteran: "Un cycle qui se répète"
					},
					volume: {
						h0_3: "Moins de 3 h / semaine",
						h3_5: "3–5 h",
						h5_8: "5–8 h",
						h8_12: "8–12 h",
						h12p: "12 h ou plus"
					},
					longest: {
						m60: "< 60 min",
						m90: "60–90 min",
						m150: "90–150 min",
						m240: "2,5–4 h",
						m240p: "> 4 h"
					},
					terrain: {
						flat: "Surtout plat",
						rolling: "Côtes et sentiers",
						mountain: "Montagne accessible",
						highAlpine: "Haut alpin / glacier"
					},
					equipment: {
						trailShoes: "Chaussures trail",
						poles: "Bâtons",
						pack: "Sac pour s’entraîner",
						gym: "Salle ou force à la maison",
						crampons: "Crampons",
						iceAxe: "Piolet"
					},
					constraints: {
						shiftWork: "Travail posté",
						travelHeavy: "Beaucoup de déplacements",
						youngKids: "Jeunes enfants",
						shortSleep: "Sommeil habituellement court",
						deskJob: "Bureau, hanches raides"
					},
					units: {
						km: "Kilomètres",
						miles: "Miles"
					},
					availableTitle: "Jours où vous pouvez vous entraîner",
					peakLabel: "Jour où vous voulez être prêt"
				},
				today: {
					kicker: "Aujourd’hui",
					title: "Ce que vous faites aujourd’hui",
					wakeTitle: "Comment s’est passé le réveil ?",
					wakeLead: "Cinq notes. Fréquence si vous l’avez. L’appel est la règle la plus stricte, pas un score caché.",
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
						stress: "Calme"
					},
					scaleHigh: {
						sleep: "Excellent",
						soreness: "Sévère",
						motivation: "Envie",
						fatigue: "Cassé",
						stress: "Haut"
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
					access: {
						trail: "Trail",
						mountain: "Montagne",
						gym: "Salle",
						climbing: "Matériel d’escalade"
					},
					whyChanged: "Pourquoi ça a changé",
					whyWeek: "Pourquoi la semaine ressemble à ça",
					peakLocked: "Date cible {peak} — elle ne bouge que si vous la changez.",
					noSession: "Pas de séance écrite aujourd’hui.",
					doneFlash: "Noté. Rien n’est ajouté en plus.",
					missedFlash: "Manqué. Les séances dures plus tard dans la semaine ne s’empilent pas.",
					editProfile: "Modifier la base",
					thisWeek: "Cette semaine",
					safety: "Ceci est un appel de charge d’entraînement, pas un diagnostic. Douleur, maladie, blessure : arrêtez et parlez à un clinicien ou un entraîneur qualifié.",
					overrideLabel: "Je comprends la recommandation et je garde la séance écrite.",
					overrideKeep: "Garder la séance écrite",
					calls: {
						ready: {
							title: "Prêt pour la séance écrite",
							action: "Faites ce qui est au plan."
						},
						reduce: {
							title: "S’entraîner, mais réduire",
							action: "Bouger. Couper la partie dure."
						},
						easy: {
							title: "Facile ou récupération",
							action: "Conversationnel seulement. Pas de qualité."
						},
						rest: {
							title: "Repos, réévaluer demain",
							action: "Pas de séance aujourd’hui."
						}
					},
					reasons: {
						availableDays: "Vous avez {n} jours d’entraînement. Le reste est du repos.",
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
						limitationsConservative: "Vous avez noté une limite. Longue et qualité restent prudentes. Pas un plan de rééducation.",
						longFromBand: "La longue fait {n} min, alignée sur votre sortie actuelle la plus longue.",
						volumeSplit: "Les jours faciles se partagent une semaine de {n} min.",
						missedNoStack: "Une séance dure a été manquée. Rien n’est empilé. Pas de rattrapage.",
						travelSwap: "Voyage jusqu’au {until}. Montagne et escalade deviennent du facile sur place.",
						engineConversational: "Moteur aérobie : chaque sortie reste conversationnelle.",
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
						normalLoad: "Charge récente ordinaire ({n} dur/long sur trois jours)."
					}
				},
				profile: {
					title: "Comment vous vous entraînez",
					lead: "Changez un fait, la semaine suivante est réécrite. La date cible reste, sauf si vous la changez.",
					save: "Enregistrer et réécrire la semaine",
					saved: "Enregistré",
					reopen: "Modifier"
				}
			}
		},
		fieldPage: fieldFr
	},
	de: {
		metaTitle: "Ridgework — Trainingsprogramme für Trail, Alpin und Höhe",
		metaDescription: "Sieben rollende Programme: aerober Motor, 20-km-Trail, 50 km, 80–120-km-Ultra, Alpentag, mehrtägige Route, Höhenexpedition. Müde heißt weniger trainieren. Founding €5/Monat nach 14 Tagen kostenlos.",
		footerTag: "Trainingsprogramme für Trail, Alpin und Höhe.",
		legalEntity: "Ridgework, Magnieu, Frankreich. Firmengründung läuft.",
		support: "support@ridgework.org",
		cancelAnytime: "Jederzeit kündbar",
		terms: "AGB",
		privacy: "Datenschutz",
		copyright: "© 2026 Ridgework. France.",
		nav: {
			about: "Wer wir sind",
			method: "Methode",
			projects: "Projekte",
			programs: "Programme",
			who: "Für wen",
			what: "Was du bekommst",
			week: "So läuft die Woche",
			pricing: "Preise",
			faq: "FAQ",
			app: "Diese Woche",
			field: "Notizen",
			guides: "Guides",
			example: "Beispiel",
			menu: "Menü",
			login: "Anmelden",
			account: "Konto"
		},
		cta: {
			start: "14 Tage kostenlos starten",
			pricing: "Preise ansehen",
			openTools: "Tools öffnen"
		},
		hero: {
			kicker: "Ausdauertraining",
			h1: "Wähle den Tag, an dem du peak sein willst",
			lead: "Jedes Datum geht. Das Training passt sich dem Fenster an. Längere Vorbereitung ist immer besser. Das große Ergebnis entsteht Saison für Saison.",
			trial: "14 Tage kostenlos. Dann €5/Monat Founding-Preis. Jederzeit kündbar."
		},
		about: {
			kicker: "Wer wir sind",
			h2: "Ein Trainingsprodukt, Sitz in Frankreich",
			lead: "Ridgework schreibt Wochenstrukturen für Trail- und Bergziele. Klare Sprache, ein Kalender zum Laufen, kein Theater.",
			cards: [
				{
					title: "Klare Sprache",
					body: "Transparente Preise. Eine Woche, die du wirklich laufen kannst. Keine Slogans, keine Fake-Reviews."
				},
				{
					title: "Wiederholbare Wochen",
					body: "Belastung, Erholung, lockeres Volumen, eine Qualitätsdosis. Das Langweilige, das sich summiert."
				},
				{
					title: "Coach-Stimme",
					body: "Support kommt vom Coaching-Tisch. Du sprichst mit Ridgework (Alias ist ok); die Methoden bleiben konsistent."
				}
			],
			foot: "Wir starten in der EU, UK und der Schweiz."
		},
		method: {
			kicker: "Methode",
			h2: "Lockeres Volumen, eine Qualitätsdosis, Taper in den Tag",
			lead: "Wir stützen uns auf eine kleine Menge gut zitierter Papers: Intensitätsverteilung, Belastung als Planungseingabe, Taper als Muster. Checklisten und Wochenstrukturen — kein medizinischer Rat.",
			cards: [
				{
					title: "Intensitätsverteilung",
					body: "Viel Ausdauerliteratur beschreibt einen hohen Anteil leichter aerober Volumenarbeit und einen kleineren Anteil härterer Arbeit — oft polarisiert oder pyramidal. Unsere Planer behandeln das als Default-Hypothese zum Anpassen, nicht als starre Vorschrift."
				},
				{
					title: "Belastung & Erholung als Entscheidungseingaben",
					body: "Session-Logs, Schlaf und einfache Müdigkeit ändern die Woche. Wenn du müde bist, wird hart zu locker. Monitoring unterstützt Training; es diagnostiziert keine Gesundheit."
				},
				{
					title: "Taper als Planungsmuster",
					body: "Vor einem Ziel sinkt das Volumen typischerweise, während Schlüsselintensitäten in kürzeren Dosen bleiben. Wir kodieren das als wiederverwendbaren Block mit klaren Entscheidungspunkten."
				}
			],
			caveatsTitle: "Ehrliche Einschränkungen",
			caveats: [
				"Individuelle Reaktion variiert — Alter, Historie, Gelände und Alltagsstress ändern, was „funktioniert“.",
				"Publizierte Mittelwerte sind kein medizinischer Rat und ersetzen keine Fachperson bei Gesundheitsfragen.",
				"Wir übersetzen Literatur in Checklisten und Wochenstrukturen, damit du mit offenen Augen entscheidest."
			],
			sourcesTitle: "Quellen (Crossref-verifiziert)"
		},
		projects: {
			kicker: "Beispielprojekte",
			h2: "Kompakte Projektbriefs",
			lead: "Drei Beispielziele als Planungsobjekte. Dauer ist der Trainingsplan — aerobe Basis, spezifischer Block, Taper, damit der Peak auf den Tag fällt — nicht die Länge des Wochenendes oder des Rennens. Eine Detailzelle bleibt bis zum Founding-Zugang gesperrt.",
			items: [
				{
					title: "Alpines Wochenendziel",
					fields: [
						{
							label: "Ziel",
							value: "Sicherer, effizienter Bergtag mit klaren Umkehrregeln"
						},
						{
							label: "Plan",
							value: "10 Wochen — 6 Wo. aerobe + Vert-Basis, 3 Wo. spezifisch, 10–14 Tage Taper ins Wetterfenster"
						},
						{
							label: "Fokus",
							value: "Leichtes Volumen leicht halten; Gesprächs-Vert dazu; Peak fürs Wetterfenster, nicht für Extra-Kilometer"
						},
						{
							label: "Risiko / Entscheidung",
							value: "Forecast-Fenster, Freeze–Thaw, Bail-Routen, Fatigue-Gate am Vorabend"
						}
					]
				},
				{
					title: "Erster 50-km-Trail",
					fields: [
						{
							label: "Ziel",
							value: "Gut ankommen, nicht nur ankommen — Ernährung und Tempo unter Kontrolle"
						},
						{
							label: "Plan",
							value: "6 Monate (24 Wochen) — 10 Wo. aerobe Basis, 12 Wo. Long-run-Aufbau, 10–14 Tage Taper auf die Rennwoche"
						},
						{
							label: "Fokus",
							value: "Zuerst leichtes Volumen, dann Long-run-Progression und eine Qualitätseinheit; Peak in der Rennwoche"
						},
						{
							label: "Session-Rezept",
							value: "Woche 20 (Ende spezifisch): 3×12 min im Marathon-Effort auf rollendem Trail, 4 min locker; Hitze- und Niggle-Gates vor dem Start. Dann 10–14 Tage Taper.",
							locked: true
						}
					]
				},
				{
					title: "Hütte-zu-Hütte-Traverse",
					fields: [
						{
							label: "Ziel",
							value: "Drei verbundene Tage, Wetter- und Materialentscheidungen schon notiert"
						},
						{
							label: "Plan",
							value: "8 Monate — aerobe/Wander-Basis Winter–Frühling, 10 Wo. Pack und Back-to-backs, 10–14 Tage Taper in Tag 1"
						},
						{
							label: "Fokus",
							value: "Beine in den Basismonaten; spezifisch ist Pack + Hintereinander-Tage; Peak für Tag 1, kein Dump an Tag 3"
						},
						{
							label: "Risiko / Entscheidung",
							value: "Konvektion nachmittags, Schnee an Nordhängen, Bail-Tal, Fatigue nach Tag 1"
						}
					]
				}
			]
		},
		programs: {
			kicker: "Programme",
			h2: "Tour wählen — oder den Motor. Dann den Peak.",
			lead: "Du wählst, wann du in Peak-Form sein willst. Kein Rennen? Starte mit dem aeroben Motor: mehr Arbeit bei niedriger Herzfrequenz, Fett als Standardkraftstoff. Jede Länge geht — länger ist klar besser.",
			columns: {
				name: "Programm",
				duration: "Dauer",
				focus: "Fokus",
				recipe: "Session-Rezept"
			},
			rows: [
				{
					id: "engine",
					name: "Aerober Motor",
					duration: "Empfohlen 16 Wochen / 4 Monate",
					focus: "Mehr Arbeit im Gesprächstempo. Fett als Standardkraftstoff. Kein Rennen nötig.",
					locked: "Die meisten Tage gesprächig. Der Lange wächst Richtung 90 min. Wenn du in Sätzen sprechen kannst, bist du in der Arbeit. Keine Qualitätsdosis — der Motor ist die Qualität.",
					pull: "Wenn du einen ganzen Satz rauskriegst, bist du in der Arbeit.",
					layout: "textFirst"
				},
				{
					id: "trail20",
					name: "20-km-Trail",
					duration: "Empfohlen 10 Wochen",
					focus: "Lockeres Volumen, eine Qualitätsdosis, Langer auf 90–110 min",
					locked: "Woche 8: 6×3 min im 10-km-Tempo auf rollendem Trail, 2 min locker. Langer 90–110 min. Dann 7 Tage Taper.",
					layout: "sessionLead"
				},
				{
					id: "fifty",
					name: "50-km-Ultra",
					duration: "Empfohlen 24 Wochen / 6 Monate",
					focus: "Aerobe Basis, dann Long-run-Progression, Peak in der Rennwoche",
					locked: "Woche 20 (Ende spezifisch): 3×12 min im Marathon-Effort auf rollendem Trail, 4 min locker. Dann 10–14 Tage Taper.",
					tag: "Oft der erste Ultra",
					pull: "Gut ankommen, nicht nur ankommen.",
					layout: "wide"
				},
				{
					id: "ultra100",
					name: "80–120-km-Ultra",
					duration: "Empfohlen 36 Wochen / 9 Monate",
					focus: "Monate lockere Zeit auf den Füßen, späte Back-to-backs, vier Wochen Taper",
					locked: "Woche 30: Sa 4–5 h lockerer Trail, So 2,5–3 h locker. Die Woche bleibt gesprächig. Dann 3–4 Wochen Taper."
				},
				{
					id: "alpine",
					name: "Alpentag",
					duration: "Empfohlen 10 Wochen",
					focus: "Aerobe Zustiege, Klettern und Kraft, dann Bergtag",
					locked: "Woche 8: Klettereinheit (Fels/Eis/Halle) + 1.200–1.800 m Zustieg im Gesprächstempo. Kraft 30–40 Min. Müde: Klettern wird leichtes Wandern.",
					tag: "Mit Klettern",
					layout: "sessionLead"
				},
				{
					id: "traverse",
					name: "Mehrtägige Alpenroute",
					duration: "Empfohlen 32 Wochen / 8 Monate",
					focus: "Wander-Basis, dann Pack und Back-to-backs, Peak an Tag 1",
					locked: "Woche 28: zwei verbundene Tage, leichter Pack. Tag 2 kürzen, wenn Reste in den Beinen sitzen.",
					layout: "compact"
				},
				{
					id: "expedition",
					name: "Höhenexpedition",
					duration: "Empfohlen 40 Wochen / 10 Monate",
					focus: "Wandern und lockeres Volumen, Packtragen, Taper ist Schlaf und Kit",
					locked: "Woche 34: Packtragen 3–4 h auf einer Wanderung, dann Ruhe. Eine Nacht draußen, wenn das Leben es erlaubt. Taper ist Schlaf und Kit, nicht extra Höhe."
				}
			],
			lockHint: "Schlüsseleinheit"
		},
		who: {
			h2: "Für wen — und für wen nicht",
			forTitle: "Gebaut für",
			forItems: [
				"Ausdauerathletinnen und -athleten, die Wochen um Leben und Gelände planen",
				"Alle, die auf 20-km-Trail, 50- oder 100-km-Ultra, Alpentag, verbundene Route oder Höhenlager trainieren",
				"Alle, die eine Einheit wirklich streichen, wenn sie müde sind",
				"Alle, die ruhige Tools Motivation-Spam vorziehen"
			],
			notTitle: "Nicht für",
			notItems: [
				"Medizinische Beratung, Diagnosen oder Behandlung",
				"Renngeheimnisse, „hack VO2“ oder Hustle-Kultur",
				"Persönliches Coaching oder Live-Chat",
				"Klinische oder Notfall-Entscheidungshilfe"
			]
		},
		what: {
			h2: "Was du bekommst",
			items: [
				{
					n: "01",
					title: "Plan vom Peak-Datum",
					body: "Du wählst, wann du peaken willst. Die Wochen werden in dieses Fenster geschrieben — Basis, spezifisch, Taper. Länger ist immer besser."
				},
				{
					n: "02",
					title: "Müdigkeit als Trainingseingabe",
					body: "Wenn du müde bist, trainiert die Woche weniger. Harte Einheiten werden locker. Das Peak-Datum bleibt."
				},
				{
					n: "03",
					title: "Kit und Verpflegung",
					body: "Schuhe, Lagen, Trinken und Schlaf für die echte Woche."
				},
				{
					n: "04",
					title: "Trainingslog",
					body: "Was du getan hast und warum die Last sich änderte."
				}
			]
		},
		week: {
			h2: "So läuft eine Woche",
			steps: [
				{
					day: "Mo",
					title: "Woche schreiben",
					body: "Peak-Datum steht. Lockeres Volumen, Qualität wenn frisch, der Lange."
				},
				{
					day: "Di",
					title: "Schlaf und Beine",
					body: "Fünf Stunden Schlaf? Intervalle werden 45–60 Min locker."
				},
				{
					day: "Do",
					title: "Locker bleibt locker",
					body: "Der Großteil der Woche bleibt Gesprächspuls."
				},
				{
					day: "So",
					title: "Loggen was passiert ist",
					body: "Langer, Hitze, Ziepen. Die nächste Woche startet dort."
				}
			]
		},
		scenario: {
			kicker: "Beispiel",
			h2: "Ein echter Dienstag, kein Slogan",
			setup: "77-km-Ultra in sechs Wochen.",
			facts: [
				{
					label: "Schlaf letzte Nacht",
					value: "5 Stunden"
				},
				{
					label: "Gestern",
					value: "32 km Langer"
				},
				{
					label: "Rechtes Knie",
					value: "2/10"
				},
				{
					label: "Sonntag Wetter",
					value: "28°C"
				}
			],
			says: "Der Wochenruf",
			actions: [
				"Intervalle heute streichen",
				"Stattdessen 45–60 Min locker",
				"Langen auf Montag, wenn Sonntag heiß bleibt",
				"500–750 ml/h auf dem Langen trinken",
				"Morgen neu bewerten"
			],
			note: "Keine Diagnose. Schwellung, Blockade, Verschlimmerung: Klinik. Das hier ist eine Trainingswoche."
		},
		firstWeek: {
			kicker: "Deine ersten 14 Tage",
			h2: "Was nach dem Login passiert",
			lead: "€5 ist günstig. Der Test ist eine echte Woche, kein Preis zum Anstarren.",
			days: [
				{
					day: "Tag 1",
					title: "Peak wählen, Woche bauen",
					body: "77 km, Alpentag oder Motor. Drei Wochen erscheinen."
				},
				{
					day: "Tag 3",
					title: "Nach Müdigkeit anpassen",
					body: "Schlaf kurz. Hart wird locker. Peak-Datum bleibt."
				},
				{
					day: "Tag 6",
					title: "Langen vorbereiten",
					body: "Kit, Trinken, Tempo wie schon geübt. Kein neues Gel."
				},
				{
					day: "Tag 7",
					title: "Loggen was passiert ist",
					body: "Nächste Woche kommt aus dem Log."
				}
			]
		},
		guidesIndex: {
			kicker: "Guides",
			h2: "Trainingsfragen, ausgeschrieben",
			lead: "77 km und sechs Wochen. 100 km. Müdigkeit. Alpentage. Renn-Checkliste.",
			cta: "Guides öffnen"
		},
		pricing: {
			kicker: "Preise",
			h2: "Preise",
			lead: "Founding-Preis bleibt gesperrt, solange du abonniert bleibst. Jederzeit kündbar.",
			badge: "Founding — primärer Weg",
			trialBadge: "14 Tage kostenlos",
			name: "Founding-Mitgliedschaft",
			price: "€5",
			per: "/Monat",
			blurb: "14 Tage kostenlos. Dann €5/Monat Founding-Preis. Jederzeit kündbar.",
			features: [
				"Voller Zugang zu rollenden Plänen, Wochenplaner und Trainings-Prep",
				"€5/Monat gesperrt, solange das Abo läuft",
				"Jederzeit kündbar — keine Langzeitverträge",
				"Keine medizinischen Claims; nur Trainingsprogramme"
			],
			laterTitle: "Spätere öffentliche Preise",
			laterBody: "Nach Founding: €1 / 7 Tage → €12/Monat. Später für Neue etwa €15–19/Monat. Founder behalten €5/Monat solange abonniert."
		},
		checkout: {
			kicker: "Founding-Test",
			h2: "14 Tage kostenlos starten",
			lead: "Konto anlegen und ein Programm starten. Keine Karte im Test. Stripe, sobald die SIRET da ist.",
			name: "Name",
			email: "E-Mail",
			submit: "14 Tage kostenlos starten",
			note: "Jederzeit kündbar über support@ridgework.org. Keine Diagnosen. Du bleibst verantwortlich für Berg- und Trainingssicherheit.",
			successTitle: "Founding-Test aktiv",
			successBody: "Tools sind auf diesem Gerät entsperrt. Öffne Programm, wähle wann du peaken willst, dann diese Woche und das Log.",
			daysLeft: "Tage übrig in der Vorschau"
		},
		faq: {
			h2: "FAQ",
			items: [
				{
					q: "Was ist Ridgework?",
					a: "Sieben rollende Trainingsprogramme für Trail und Berg, inklusive aerobem Motor bei niedriger Herzfrequenz. Kein medizinischer Dienst."
				},
				{
					q: "Wie funktioniert der Founding-Preis?",
					a: "14 Tage kostenlos, dann €5/Monat gesperrt solange abonniert."
				},
				{
					q: "Jederzeit kündbar?",
					a: "Ja. Im Konto oder per E-Mail. Zugang bis Ende der bezahlten Periode."
				},
				{
					q: "Nach der Founding-Phase?",
					a: "Neue: €1/7 Tage → €12/Monat; später €15–19. Founder: €5."
				},
				{
					q: "Karte für die Testphase?",
					a: "Auf der öffentlichen Site kann Checkout eine Karte verlangen. Abbuchung nach 14 Tagen. Diese Vorschau nimmt keine Karte."
				},
				{
					q: "Ist das medizinisch?",
					a: "Nein. Keine Diagnosen, keine Behandlung. Bei Gesundheit: Fachperson."
				},
				{
					q: "Schreibt sich der Plan von allein weiter?",
					a: "Ja — im Produkt, nicht in einem Chat-Bot. Du wählst das Peak-Datum. Der Programm-Tab hält immer drei Wochen in diesem Fenster bereit. Eine frische Woche schreibt den nächsten Block. Eine müde Woche trainiert weniger; das Peak-Datum bleibt. Nach der Tour startet die nächste Saison höher."
				},
				{
					q: "Wer steckt dahinter?",
					a: "Produkt- und Coachingfirma in Frankreich. Support übernimmt das Coaching-Team (du kannst einen Coach-Alias sehen). Das Produkt sind die Trainingsprogramme: Woche, Last, Prep."
				},
				{
					q: "Welche Sprachen?",
					a: "Site: EN (voll), FI, FR, DE (kürzer)."
				},
				{
					q: "Daten?",
					a: "EU/Frankreich-Erwartungen. Siehe Privacy. Kein Verkauf für Ads."
				},
				{
					q: "Support?",
					a: "support@ridgework.org — Antwort in wenigen Werktagen."
				}
			]
		},
		disclaimer: {
			h2: "Haftungsausschluss",
			body: "Ridgework bietet Entscheidungshilfe für Trainingsplanung und Bergtags-Prep. Kein Medizinprodukt und kein Ersatz für professionellen Rat. Zitate publizierter Forschung informieren Planungsrahmen und Checklisten; sie sind keine medizinischen Claims und keine individualisierten Vorschriften. Du bleibst für deine Sicherheitsentscheidungen verantwortlich. Keine Diagnosen. Keine Behandlungsclaims."
		},
		foundingPage: {
			kicker: "Founding",
			h1: "Du bist zum Founding eingeladen",
			lead: "Dieselben Tools. Gesperrter Founding-Preis. Ruhiges Onboarding.",
			trial: "14 Tage kostenlos. Dann €5/Monat Founding-Preis. Jederzeit kündbar.",
			note: "Seite für warme Einladungen. Öffentliche Preise später höher für Neue; Founder behalten €5/Monat.",
			back: "← Ridgework",
			title: "Founding — Ridgework",
			description: "Dieselben Tools. Gesperrter Founding-Preis. Ruhiges Onboarding."
		},
		termsPage: {
			title: "Nutzungsbedingungen",
			updated: "Zuletzt aktualisiert: September 2026",
			body: ["Stub terms (France / EU). Ridgework provides decision tools — not medical care, no diagnoses. Founding: 14 days free, then €5/month while subscribed. Cancel anytime (support@ridgework.org). You remain responsible for training and mountain safety decisions. Mandatory consumer rights under French/EU law are not limited."]
		},
		privacyPage: {
			title: "Datenschutzerklärung",
			updated: "Zuletzt aktualisiert: September 2026",
			body: ["Stub privacy notice (EU / France / GDPR principles). Company: Ridgework, France. Contact: support@ridgework.org. Full counsel-reviewed policy before launch. We do not sell personal data for ads. Payments via Stripe. Not a medical service — do not submit sensitive health diagnoses.", "Rights: access, rectification, erasure, restriction, portability, objection where applicable; complaint to a French/EU authority."]
		},
		appPage: {
			title: "Tools — Ridgework",
			kicker: "Founding-Tools",
			h1: "Training dieser Woche",
			lead: "Wähle den Tag, an dem du peak sein willst. Der rollende Plan schreibt die Wochen in dieses Fenster. Müde: weniger trainieren. Nichts hiervon ist medizinischer Rat.",
			lockedTitle: "Founding-Zugang nötig",
			lockedBody: "Starte den 14-Tage-Founding-Test für den rollenden Plan, Wochenplaner, Session-Prep und Log.",
			trialLabel: "Vorschau-Test",
			testBanner: "Testzeitraum — alle sieben Programme offen, ohne Zahlung. Anmelden, Peak-Tag wählen. Stripe kommt mit der SIRET. Länger ist immer besser.",
			signInToTrain: "Melde dich an, damit Programme auf dem Konto bleiben. Keine Zahlung im Test.",
			tabs: {
				today: "Heute",
				plan: "Programm",
				week: "Woche",
				prep: "Prep",
				log: "Log",
				profile: "Du"
			}
		},
		auth: {
			title: "Anmelden",
			lead: "Konto anlegen und ein Programm starten. Peak-Tag zuerst, dann die Wochen.",
			email: "E-Mail",
			password: "Passwort",
			name: "Name",
			signIn: "Anmelden",
			signUp: "Konto erstellen",
			or: "oder",
			withGoogle: "Weiter mit Google",
			withX: "Weiter mit X",
			haveAccount: "Schon ein Konto? Anmelden",
			noAccount: "Noch kein Konto? Erstellen",
			error: "Anmeldung fehlgeschlagen. E-Mail und Passwort prüfen.",
			testNote: "Testzeitraum: Programme kostenlos. Kartenzahlung (Stripe), sobald die französische SIRET da ist."
		},
		dashboard: {
			enrollments: "Deine Programme",
			empty: "Noch kein Programm auf diesem Konto. Unten wählen.",
			billingTest: "Testzugang — nicht berechnet",
			peak: "Peak",
			statusTest: "Test",
			saved: "Auf dem Konto gespeichert"
		},
		tools: {
			week: {
				save: "Woche speichern",
				saved: "Auf diesem Gerät gespeichert",
				days: [
					"Mo",
					"Di",
					"Mi",
					"Do",
					"Fr",
					"Sa",
					"So"
				],
				types: {
					easy: "Locker",
					steady: "Steady",
					hard: "Hart",
					rest: "Ruhe"
				},
				session: "Was du wirklich gelaufen bist",
				readiness: "Wie fühlt sich der Körper diese Woche?",
				readinessLead: "Das ändert nur das Training. Müde = weniger Arbeit. Kaputt = Ruhe statt Qualität.",
				levels: {
					fresh: "Frisch",
					ok: "In Ordnung",
					tired: "Müde",
					wrecked: "Kaputt"
				},
				notes: {
					fresh: "Die geschriebene Woche behalten. Kein Extra-Heldentum.",
					ok: "Last behalten. Keinen zweiten harten Tag dazulegen.",
					tired: "Harte und stetige Einheiten fallen auf locker. Du trainierst weniger.",
					wrecked: "Hart und stetig werden Ruhe. Locker bleibt locker. Nächste Woche weiter."
				}
			},
			pace: {
				title: "Was die Wörter heißen",
				lead: "Gesprächig ist kein Feeling. Es ist, ob du sprechen kannst. Uhr wenn da. Sprechtest wenn nicht.",
				talkTitle: "Gesprächig / locker",
				talk: "Ein ganzer Satz ohne Schnappen. Wenn nur Wörter kommen, bist du zu schnell für einen lockeren Tag.",
				zonesTitle: "Wie du es folgst",
				feelHead: "Gefühl",
				watchHead: "Uhr / HF",
				noneHead: "Ohne Gerät",
				rows: [
					{
						zone: "Locker · Zone 1–2",
						feel: "Volle Sätze. Der Großteil der Woche.",
						watch: "Etwa 60–75 % max HF, oder unter der aeroben Schwelle. ~80 % der Zeit hier.",
						none: "Sprechtest. Stiehlt der Hang den Satz, gehen bis die Sprache zurück ist."
					},
					{
						zone: "Stetig · hohe Z2 / niedrige Z3",
						feel: "Nur kurze Phrasen. Kontrolliert, kein Rennen.",
						watch: "Etwa 75–85 % max HF. Nicht in einer müden Woche stapeln.",
						none: "Du beantwortest eine Frage, erzählst keine Geschichte."
					},
					{
						zone: "Hart / Qualität · Z3–4",
						feel: "Ein paar Worte. Eine Dosis pro Woche, oder keine wenn müde.",
						watch: "Schwelle ~85–92 % max HF. Einziger harter Lauf.",
						none: "Atmung laut. Du würdest nicht plaudern."
					},
					{
						zone: "Klettern / Kraft",
						feel: "Keine HF-Zone. Griff und Skill heben den Puls.",
						watch: "Zonen an der Wand ignorieren. Qualitäslängen oder Sätze zählen, dann stop.",
						none: "Stoppen wenn die Technik bricht. Kraft ist kurz."
					}
				],
				alpineTitle: "Alpinwochen sind nicht nur Gehen",
				alpine: "Zustiege bleiben gesprächig. Specific fügt eine Klettereinheit und eine kurze Kraftdosis hinzu. Zuerst aerobe Basis, dann Kletterkraft und Technik, dann Bergtage mit Pack. Seillängen sind Arbeit."
			},
			prep: {
				kit: "Session-Kit",
				fuel: "Verpflegung",
				recovery: "Erholung",
				kitItems: [
					"Schuhe zum Gelände der Woche",
					"Lage, in der locker wirklich locker ist",
					"Stirnlampe, wenn der Lange im Dunkeln startet",
					"Uhr oder Handy mit geschriebener Einheit",
					"Ersatzsocken für den Langen"
				],
				fuelItems: [
					"Frühstück, das du schon im Training genutzt hast",
					"Kohlenhydrate auf dem Langen — geübt, nicht neu",
					"Wasser für die echte Dauer, nicht die erhoffte",
					"Salziges, wenn die Woche heiß ist",
					"Keine neuen Gels in einer müden Woche"
				],
				recoveryItems: [
					"Schlaf-Fenster vor dem harten Tag geschrieben",
					"Lockerer Tag nach der Qualitätsdosis",
					"Essen in der ersten Stunde nach dem Langen",
					"Wenn müde: extra Strides streichen",
					"Wenn kaputt: die Einheit ist Ruhe"
				]
			},
			log: {
				empty: "Noch keine Trainingsnotizen diese Woche.",
				decision: "Was du getan oder geändert hast",
				why: "Warum (Schlaf, Müdigkeit, Leben)",
				add: "Eintrag",
				clear: "Log leeren"
			},
			plan: {
				kicker: "Rollender Plan",
				lead: "Du wählst den Tag, an dem du in Peak-Form sein willst. Das Training passt sich dem Fenster an. Jedes Datum geht — längere Vorbereitung ist immer besser. Das große Ergebnis entsteht Saison für Saison.",
				method: [
					"Zuerst das Peak-Datum. Die Wochen werden rückwärts geschrieben: Basis, dann spezifisch, dann Taper.",
					"Länger ist immer besser. Extra-Wochen bleiben in der aeroben Basis. Ein kurzes Fenster bekommt trotzdem einen Plan — nur dünnerer Aufbau.",
					"Müde: diese Woche weniger trainieren. Das Peak-Datum bleibt. Nach der Tour startet die nächste Saison von einem höheren Boden."
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
				seasonsKey: "Der Schlüssel zum großen Erfolg ist nicht ein heroischer Block. Es ist kontinuierliche Entwicklung, Saison für Saison — jeder Peak startet höher als der letzte.",
				quality: {
					generous: {
						label: "Länger als empfohlen — der bessere Weg",
						body: "Extra-Wochen bleiben in der aeroben Basis. Das ist der stärkere Aufbau. Spezifisch und Taper bleiben voll."
					},
					full: {
						label: "Empfohlenes Fenster",
						body: "Genug Basis, voller spezifischer Block, sauberer Taper in den gewählten Tag."
					},
					solid: {
						label: "Kürzer als empfohlen — noch vollständig",
						body: "Die Basis wird zuerst gekürzt. Spezifisch und Taper bleiben. Länger wäre trotzdem besser."
					},
					tight: {
						label: "Komprimiertes Fenster",
						body: "Ein Peak wird trotzdem geschrieben, aber weniger Zeit zum Aufbau. Länger wäre klar besser."
					},
					short: {
						label: "Sehr kurz — ein Halten",
						body: "Kein voller Aufbau. Wochen werden trotzdem geschrieben. Der echte Gewinn ist die nächste Saison mit mehr Zeit."
					}
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
				doneBody: "Eine Saison ist durch. Das große Ergebnis ist die nächste, und die danach. Neues Peak-Datum wählen — kontinuierliche Entwicklung ist die Methode.",
				nextSeason: "Nächste Saison starten",
				nextSeasonBody: "Gleicher Tour-Typ. Neues Peak-Datum. Du startest von einem höheren Boden.",
				nextSeasonPeak: "Nächstes Peak-Datum",
				easedNote: "Erleichtert weil du müde bist — lockeres Volumen, keine Qualitätsdosis. Peak-Datum unverändert.",
				disclaimer: "Kein medizinischer Rat. Du bleibst verantwortlich für Trainings- und Bergentscheidungen.",
				phases: {
					base: "Aerobe Basis",
					specific: "Spezifischer Block",
					taper: "Taper"
				},
				donePhase: "Peak-Woche",
				objectives: {
					engine: {
						name: "Aerober Motor",
						length: "Empfohlen 16 Wochen / 4 Monate",
						blurb: "Kein Rennen nötig. Dem Körper beibringen, mehr Arbeit im Gesprächstempo zu leisten — Fett als Standardkraftstoff, niedrige Herzfrequenz als Ziel. Peak ist die Woche, in der der Motor sitzen soll."
					},
					trail20: {
						name: "20-km-Trail",
						length: "Empfohlen 10 Wochen",
						blurb: "Du läufst schon. Lockeres Volumen, eine Qualitätsdosis, der Lange wächst auf 90–110 min. Peak in der Rennwoche."
					},
					fifty: {
						name: "50-km-Ultra",
						length: "Empfohlen 24 Wochen / 6 Monate",
						blurb: "Lange aerobe Basis, dann Long-run-Progression mit einer Qualitätseinheit, Taper auf die Rennwoche."
					},
					ultra100: {
						name: "80–120-km-Ultra",
						length: "Empfohlen 36 Wochen / 9 Monate",
						blurb: "Zuerst aerobe Monate. Spezifisch ist Zeit auf den Füßen und eine Qualitätsdosis. Back-to-backs spät. Vier Wochen Taper."
					},
					alpine: {
						name: "Alpentag",
						length: "Empfohlen 10 Wochen",
						blurb: "Aerobe Zustiege plus echtes Klettern: Fels oder Eis, Zugkraft, dann ein Bergtag. Seillängen sind kein Gesprächstempo."
					},
					traverse: {
						name: "Mehrtägige Alpenroute",
						length: "Empfohlen 32 Wochen / 8 Monate",
						blurb: "Wanderbasis, dann Klettern und Pack-Back-to-backs, damit Tag zwei Reserve hat. Im Specific wird geklettert — nicht nur gegangen."
					},
					expedition: {
						name: "Höhenexpedition",
						length: "Empfohlen 40 Wochen / 10 Monate",
						blurb: "Monate lockeres Volumen, dann Pack, Wanderung und genug Klettern, dass der Berg nicht das erste Ziehen ist. Taper ist Schlaf und Kit."
					}
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
					strength: "Alpinkraft — Lock-offs, Klimmzüge, Rumpf, Antagonisten. Kurz und hart."
				}
			},
			athlete: {
				onboarding: {
					kicker: "Dein Setup",
					h1: "Wie soll diese Woche wirklich aussehen?",
					lead: "Ein paar Fakten, wie du trainierst. Die Woche wird daraus geschrieben, nicht aus einer generischen Vorlage.",
					next: "Weiter",
					back: "Zurück",
					start: "Meine drei Wochen schreiben",
					step: "Schritt {n} von {total}",
					needDays: "Wähle mindestens zwei Trainingstage.",
					eventName: "Name von Rennen oder Tour (optional)",
					eventPlaceholder: "UTMB CCC, lokaler 50k, Grand Combin…",
					limitations: "Was das Training gerade begrenzt",
					limitationsHint: "Ein Zwicken, eine Zeitgrenze. Als Trainingsconstraint, keine Diagnose.",
					reviewTitle: "Daraus werden die Wochen geschrieben",
					reviewLead: "Zieldatum bleibt, außer du änderst es. Müde Tage trainieren weniger.",
					steps: [
						"Sport",
						"Ziel",
						"Datum",
						"Last",
						"Tage",
						"Gelände",
						"Leben"
					],
					sports: {
						running: "Laufen",
						mountaineering: "Bergsteigen",
						mixed: "Beides"
					},
					disciplines: {
						trail: "Trail",
						ultra: "Ultra",
						alpine: "Alpin / Klettern",
						road: "Straße",
						ski: "Ski-Mo"
					},
					experience: {
						beginner: "Neu auf dieser Distanz oder diesem Gelände",
						intermediate: "Ein, zwei Saisons drin",
						experienced: "Mehrere Gipfel oder Ultras",
						veteran: "Ein wiederholter Zyklus"
					},
					volume: {
						h0_3: "Unter 3 h / Woche",
						h3_5: "3–5 h",
						h5_8: "5–8 h",
						h8_12: "8–12 h",
						h12p: "12 h oder mehr"
					},
					longest: {
						m60: "< 60 min",
						m90: "60–90 min",
						m150: "90–150 min",
						m240: "2,5–4 h",
						m240p: "> 4 h"
					},
					terrain: {
						flat: "Meist flach",
						rolling: "Hügel und Trails",
						mountain: "Berge erreichbar",
						highAlpine: "Hochalpin / Gletscher"
					},
					equipment: {
						trailShoes: "Trailschuhe",
						poles: "Stöcke",
						pack: "Pack zum Trainieren",
						gym: "Gym oder Kraft zu Hause",
						crampons: "Steigeisen",
						iceAxe: "Eispickel"
					},
					constraints: {
						shiftWork: "Schichtarbeit",
						travelHeavy: "Viel Reise",
						youngKids: "Kleine Kinder",
						shortSleep: "Gewohnt kurz schlafen",
						deskJob: "Schreibtisch, steife Hüften"
					},
					units: {
						km: "Kilometer",
						miles: "Meilen"
					},
					availableTitle: "Tage, an denen du trainieren kannst",
					peakLabel: "Tag, an dem du bereit sein willst"
				},
				today: {
					kicker: "Heute",
					title: "Was du heute läufst",
					wakeTitle: "Wie war das Aufwachen?",
					wakeLead: "Fünf Marken. Herzwerte optional. Der Call ist die strengste Regel — kein versteckter Score.",
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
						stress: "Ruhig"
					},
					scaleHigh: {
						sleep: "Ausgezeichnet",
						soreness: "Stark",
						motivation: "Lust",
						fatigue: "Kaputt",
						stress: "Hoch"
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
					access: {
						trail: "Trail",
						mountain: "Berg",
						gym: "Gym",
						climbing: "Klettermaterial"
					},
					whyChanged: "Warum das geändert hat",
					whyWeek: "Warum die Woche so aussieht",
					peakLocked: "Zieldatum {peak} — bewegt sich nur, wenn du es änderst.",
					noSession: "Heute keine geschriebene Einheit.",
					doneFlash: "Notiert. Nichts Extra wird addiert.",
					missedFlash: "Verpasst. Spätere harte Einheiten werden nicht gestapelt.",
					editProfile: "Setup ändern",
					thisWeek: "Diese Woche",
					safety: "Das ist ein Trainingslast-Call, keine Diagnose. Schmerz, Krankheit, Verletzung: stoppen und mit Klinik oder qualifiziertem Coach sprechen.",
					overrideLabel: "Ich verstehe die Empfehlung und behalte die geschriebene Einheit.",
					overrideKeep: "Geschriebene Einheit behalten",
					calls: {
						ready: {
							title: "Bereit für die geschriebene Einheit",
							action: "Mach, was im Plan steht."
						},
						reduce: {
							title: "Trainieren, aber Last senken",
							action: "Bewegen. Den harten Teil kürzen."
						},
						easy: {
							title: "Locker oder Regeneration",
							action: "Nur gesprächig. Keine Qualität."
						},
						rest: {
							title: "Ruhe, morgen neu bewerten",
							action: "Keine Einheit heute."
						}
					},
					reasons: {
						availableDays: "Du hast {n} Trainingstage. Der Rest ist Ruhe.",
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
						limitationsConservative: "Du hast eine Einschränkung notiert. Lang und Qualität bleiben vorsichtig. Kein Reha-Plan.",
						longFromBand: "Der Lange ist {n} min, passend zu deiner aktuellen längsten Einheit.",
						volumeSplit: "Lockere Tage teilen eine {n}-Minuten-Woche.",
						missedNoStack: "Harte Einheit verpasst. Nichts wird gestapelt. Kein Nachhol-Qualität.",
						travelSwap: "Reise bis {until}. Berg und Klettern werden locker vor Ort.",
						engineConversational: "Aerobic Engine: jeder Lauf bleibt gesprächig.",
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
						normalLoad: "Letzte Last gewöhnlich ({n} hart/lang in drei Tagen)."
					}
				},
				profile: {
					title: "Wie du trainierst",
					lead: "Ändere eine Tatsache, die nächste Woche wird neu geschrieben. Zieldatum bleibt, außer du änderst es.",
					save: "Speichern und Woche neu schreiben",
					saved: "Gespeichert",
					reopen: "Setup ändern"
				}
			}
		},
		fieldPage: fieldDe
	}
};
function getCopy(locale) {
	return copies[locale];
}
var SOURCES = [
	{
		authors: "Seiler S",
		year: "2010",
		title: "What is Best Practice for Training Intensity and Duration Distribution in Endurance Athletes",
		journal: "International Journal of Sports Physiology and Performance.",
		doi: "10.1123/ijspp.5.3.276",
		href: "https://doi.org/10.1123/ijspp.5.3.276"
	},
	{
		authors: "Seiler S, Kjerland GØ",
		year: "2006",
		title: "Quantifying training intensity distribution in elite endurance athletes",
		journal: "Scandinavian Journal of Medicine & Science in Sports.",
		doi: "10.1111/j.1600-0838.2004.00418.x",
		href: "https://doi.org/10.1111/j.1600-0838.2004.00418.x"
	},
	{
		authors: "Esteve-Lanao J, Foster C, Seiler S, Lucia A",
		year: "2007",
		title: "Impact of training intensity distribution on performance in endurance athletes",
		journal: "Journal of Strength and Conditioning Research.",
		doi: "10.1519/00124278-200708000-00048",
		href: "https://doi.org/10.1519/00124278-200708000-00048"
	},
	{
		authors: "Stöggl T, Sperlich B",
		year: "2014",
		title: "Polarized training has greater impact on key endurance variables than threshold, high intensity, or high volume training",
		journal: "Frontiers in Physiology.",
		doi: "10.3389/fphys.2014.00033",
		href: "https://doi.org/10.3389/fphys.2014.00033"
	},
	{
		authors: "Mujika I, Padilla S",
		year: "2003",
		title: "Scientific Bases for Precompetition Tapering Strategies",
		journal: "Medicine & Science in Sports & Exercise.",
		doi: "10.1249/01.mss.0000074448.73931.11",
		href: "https://doi.org/10.1249/01.mss.0000074448.73931.11"
	},
	{
		authors: "Foster C, Florhaug JA, Franklin J, et al.",
		year: "2001",
		title: "A New Approach to Monitoring Exercise Training",
		journal: "Journal of Strength and Conditioning Research.",
		doi: "10.1519/1533-4287(2001)015<0109:ANATME>2.0.CO;2",
		href: "https://doi.org/10.1519/1533-4287(2001)015%3C0109:ANATME%3E2.0.CO;2"
	},
	{
		authors: "Bourdon PC, Cardinale M, Murray A, et al.",
		year: "2017",
		title: "Monitoring Athlete Training Loads: Consensus Statement",
		journal: "International Journal of Sports Physiology and Performance.",
		doi: "10.1123/IJSPP.2017-0208",
		href: "https://doi.org/10.1123/IJSPP.2017-0208"
	},
	{
		authors: "McCammon I",
		year: "2004",
		title: "Heuristic Traps in Recreational Avalanche Accidents: Evidence and Implications",
		journal: "Proceedings of the International Snow Science Workshop.",
		href: "https://arc.lib.montana.edu/snow-science/objects/issw-2004-244-251.pdf"
	}
];
var LOCALES = [
	"en",
	"fi",
	"fr",
	"de"
];
var PATH_LOCALES = [
	"fi",
	"fr",
	"de"
];
function isPathLocale(value) {
	return PATH_LOCALES.includes(value);
}
function localePrefix(locale) {
	return locale === "en" ? "" : `/${locale}`;
}
function pagePath(locale, page) {
	const prefix = localePrefix(locale);
	if (page === "home") return prefix || "/";
	return `${prefix}/${page}`;
}
function guidePath(locale, slug) {
	const base = `${localePrefix(locale)}/guides`;
	if (!slug) return base || "/guides";
	return `${base}/${slug}`;
}
function homeHash(locale, id) {
	return `${pagePath(locale, "home")}#${id}`;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/guides-D-hU1VS3.js
var GUIDES = [
	{
		slug: "six-weeks-to-a-77k-ultra",
		title: {
			en: "Six weeks to a 77 km ultra: what to run this week",
			fi: "Kuusi viikkoa 77 km ultraan: mitä juokset tällä viikolla",
			fr: "Six semaines avant un ultra de 77 km : que courir cette semaine",
			de: "Sechs Wochen bis zum 77-km-Ultra: was diese Woche laufen"
		},
		description: {
			en: "A worked example: 77 km in six weeks, 5 hours of sleep, a 32 km long run yesterday, a niggle, and heat on Sunday. The week changes. The peak date stays.",
			fi: "Konkreettinen esimerkki: 77 km kuuden viikon päästä, 5 tuntia unta, eilen 32 km, kolotus ja helle sunnuntaina.",
			fr: "Exemple concret : 77 km dans six semaines, 5 h de sommeil, 32 km hier, une gène, et de la chaleur dimanche.",
			de: "Konkretes Beispiel: 77 km in sechs Wochen, 5 Stunden Schlaf, 32 km gestern, ein Ziepen, Hitze am Sonntag."
		},
		kicker: {
			en: "Ultra race preparation",
			fi: "Ultran valmistelu",
			fr: "Préparation ultra",
			de: "Ultra-Vorbereitung"
		},
		body: {
			en: [
				"You are six weeks from a 77 km trail ultra. That is a short window. It is still a written block: keep the long run, keep most days easy, put one quality dose in only if sleep and legs allow, and taper the last 10–14 days.",
				"Yesterday you ran 32 km. Last night you slept five hours. The right knee is a 2/10 niggle, not a collapse. Sunday’s forecast is 28°C.",
				"Today’s written session was intervals. That session is junk intensity on five hours of sleep and a niggle. Skip it. Run 45–60 minutes easy, conversation pace, flat or gentle trail. If you can speak in full sentences, you are in the work.",
				"Move the next long run to Monday if Sunday stays hot and the knee is louder. On the long, drink on a schedule you have already used — roughly 500–750 ml per hour in the heat, with something salty if you usually need it. Do not invent a new gel.",
				"Reassess tomorrow. One easy day does not lose the 77 km. A smashed Tuesday can. The peak date stays. Ridgework’s 80–120 km and 50 km programs do this same move: tired weeks train less; the outing still sits on the calendar."
			],
			fi: [
				"77 km polku-ultraan on kuusi viikkoa. Ikkuna on lyhyt, mutta viikko kirjoitetaan silti: pitkä juoksu, suurin osa päivistä helppoa, yksi teho vain jos uni ja jalat antavat, kevennys 10–14 päivää ennen.",
				"Eilen 32 km. Yöllä viisi tuntia unta. Oikea polvi 2/10, ei romahdus. Sunnuntain ennuste 28°C.",
				"Tänään oli vedot. Viiden tunnin unella ja kolotuksella se on roskaintensiteettiä. Jätä vedot. 45–60 min helppoa, puhevauhtia. Jos saat kokonaisia lauseita, olet työssä.",
				"Siirrä pitkä maanantaille jos sunnuntai on kuuma ja polvi äänekkäämpi. Pitkällä juo jo harjoiteltu määrä — kuumassa noin 500–750 ml/h, suolaista jos yleensä tarvitset. Älä kokeile uutta geeliä.",
				"Katso huomenna uudestaan. Yksi helppo päivä ei vie 77 km:ää. Hajotettu tiistai voi viedä. Tavoitepäivä pysyy."
			],
			fr: [
				"Ultra trail de 77 km dans six semaines. Fenêtre courte, semaine quand même écrite : garder la sortie longue, garder l’essentiel facile, une séance qualité seulement si le sommeil et les jambes le permettent, taper 10–14 jours.",
				"Hier 32 km. Cinq heures de sommeil. Genou droit 2/10. Dimanche : 28°C.",
				"Aujourd’hui c’était des intervalles. Avec cinq heures de sommeil, c’est de l’intensité pour rien. 45–60 min facile. Si vous parlez en phrases, vous êtes dans le travail.",
				"Déplacez la longue au lundi s’il fait chaud et que le genou parle. Buvez un protocole déjà testé, ~500–750 ml/h s’il fait chaud. Pas de nouveau gel.",
				"Réévaluez demain. Un jour facile ne perd pas les 77 km. Un mardi cassé peut. La date de pic reste."
			],
			de: [
				"77-km-Trail-Ultra in sechs Wochen. Kurzes Fenster, Woche trotzdem geschrieben: Langer Lauf bleibt, die meisten Tage locker, eine Qualitätseinheit nur bei Schlaf und Beinen, Taper 10–14 Tage.",
				"Gestern 32 km. Fünf Stunden Schlaf. Rechtes Knie 2/10. Sonntag 28°C.",
				"Heute standen Intervalle. Bei fünf Stunden Schlaf ist das Müllintensität. 45–60 Min locker. Volle Sätze = richtige Intensität.",
				"Langen Lauf auf Montag, wenn Sonntag heiß bleibt. Trinken wie schon geübt, in der Hitze etwa 500–750 ml/h. Kein neues Gel.",
				"Morgen neu bewerten. Ein lockerer Tag verliert die 77 km nicht. Ein kaputter Dienstag kann. Das Peak-Datum bleibt."
			]
		}
	},
	{
		slug: "100km-ultra-training-plan",
		title: {
			en: "100 km ultra training plan: time on feet, then back-to-backs",
			fi: "100 km ultran treenisuunnitelma: aika jaloilla, sitten peräkkäiset päivät",
			fr: "Plan d’entraînement ultra 100 km : du temps sur les jambes, puis des back-to-backs",
			de: "100-km-Ultra-Trainingsplan: Zeit auf den Beinen, dann Back-to-backs"
		},
		description: {
			en: "How a 80–120 km ultra block is built: months of easy volume, late back-to-backs, a four-week taper. Tired weeks cut the hard work. The race date stays.",
			fi: "Miten 80–120 km ultra rakennetaan: kuukausia kevyttä juoksua, myöhään peräkkäiset päivät, neljän viikon kevennys.",
			fr: "Comment se construit un ultra 80–120 km : des mois de volume facile, des back-to-backs tardifs, un taper de quatre semaines.",
			de: "So entsteht ein 80–120-km-Ultra: Monate lockeres Volumen, späte Back-to-backs, vier Wochen Taper."
		},
		kicker: {
			en: "100km ultra training",
			fi: "100 km ultra",
			fr: "Ultra 100 km",
			de: "100-km-Ultra"
		},
		body: {
			en: [
				"A hundred kilometres is not a bigger 50. The limiter is usually time on feet and how you recover between long days, not a heroic Tuesday.",
				"Ridgework’s 80–120 km program is built as months of conversational running, then a specific block with weekend back-to-backs, then three to four weeks of taper. Extra weeks before that sit in aerobic base. Longer is the stronger path.",
				"A typical late specific weekend: Saturday 4–5 hours easy trail, Sunday 2.5–3 hours easy. Midweek stays conversational. If Saturday leftovers sit in the legs, Sunday shortens. That is training load, not a character test.",
				"Fuel the longs with what you will use in the race. Practise drink and carb timing on the long, not on a tired interval day. Heat and a niggle are reasons to move the long, not to add a second hard session.",
				"After the race, the next season starts from a higher floor if the easy work actually stayed easy. Season after season is the method."
			],
			fi: [
				"Sata kilometriä ei ole isompi 50. Rajoitin on yleensä aika jaloilla ja palautuminen pitkien päivien välillä, ei sankaritiistai.",
				"80–120 km -ohjelma: kuukausia puhelenkkiä, sitten kisajakso viikonlopun peräkkäisillä päivillä, sitten 3–4 viikon kevennys. Ylimääräiset viikot jäävät kevyeen juoksuun.",
				"Tyypillinen myöhäinen kisajakson viikonloppu: la 4–5 h helppoa, su 2,5–3 h helppoa. Arki puheella. Jos lauantain jäänteet istuvat jaloissa, sunnuntai lyhenee.",
				"Tankkaa pitkät sillä mitä kisassa käytät. Kuuma ja kolotus siirtävät pitkän, eivät lisää toista tehoa.",
				"Kisan jälkeen seuraava kausi lähtee korkeammalta jos helppo pysyi helppona."
			],
			fr: [
				"Cent kilomètres n’est pas un 50 plus gros. Le limiteur est le temps sur les jambes et la récupération entre les longues, pas un mardi héroïque.",
				"Le programme 80–120 km : des mois de footing conversationnel, un bloc spécifique avec back-to-backs, puis 3–4 semaines de taper.",
				"Week-end type : samedi 4–5 h facile, dimanche 2,5–3 h facile. La semaine reste facile. Si samedi reste dans les jambes, dimanche raccourcit.",
				"Alimentez les longues avec ce que vous utiliserez en course. La chaleur et une gène déplacent la longue ; elles n’ajoutent pas une deuxième séance dure.",
				"Après la course, la saison suivante part plus haut si le facile est resté facile."
			],
			de: [
				"Hundert Kilometer sind kein größerer 50er. Der Begrenzer ist Zeit auf den Beinen und Erholung zwischen langen Tagen, kein heldenhafter Dienstag.",
				"Das 80–120-km-Programm: Monate Gesprächspuls, dann Specific mit Back-to-backs, dann 3–4 Wochen Taper.",
				"Typisches Wochenende: Sa 4–5 h locker, So 2,5–3 h locker. Die Woche bleibt locker. Sitzt Samstag in den Beinen, wird Sonntag kürzer.",
				"Verpflegung wie im Rennen. Hitze und Ziepen verschieben den Langen, sie fügen keine zweite harte Einheit hinzu.",
				"Nach dem Rennen startet die nächste Saison höher, wenn locker locker blieb."
			]
		}
	},
	{
		slug: "trail-running-training-plan",
		title: {
			en: "Trail running training plan for 20 km and 50 km",
			fi: "Polkujuoksun treenisuunnitelma 20 km ja 50 km",
			fr: "Plan d’entraînement trail 20 km et 50 km",
			de: "Trailrunning-Trainingsplan für 20 km und 50 km"
		},
		description: {
			en: "Easy volume, one quality dose, a long that grows. How Ridgework writes a 20 km trail block and a first 50 km ultra from the peak date you pick.",
			fi: "Helppo juoksu, yksi teho, kasvava pitkä. Miten 20 km polku ja ensimmäinen 50 km kirjoitetaan tavoitepäivästä.",
			fr: "Volume facile, une dose de qualité, une longue qui grandit. 20 km trail et premier 50 km à partir de la date de pic.",
			de: "Lockeres Volumen, eine Qualitätseinheit, ein wachsender Langer. 20-km-Trail und erster 50er vom Peak-Datum."
		},
		kicker: {
			en: "Trail running training plan",
			fi: "Polkujuoksun suunnitelma",
			fr: "Plan trail",
			de: "Trail-Plan"
		},
		body: {
			en: [
				"Most trail weeks should feel ordinary. Conversation pace on terrain that matches the race, one quality session if you are fresh, a long that grows by minutes — not by theatre.",
				"The 20 km trail program is about ten weeks if you have them: easy volume, strides or short hills as the quality dose, a long toward 90–110 minutes, then a seven-day taper.",
				"A first 50 km wants more base. Ridgework’s recommended full build is 24 weeks: ten weeks aerobic, twelve weeks of long-run progression, ten to fourteen days taper so you peak race week. If you have less time, the plan still writes — it is a thinner build. Longer is clearly better.",
				"Fatigue is a training input. Sleep collapsed? The quality session becomes easy. Knee at 2/10? Flatten the long. The peak date does not move unless you move it.",
				"That is the whole product: pick the day, run the week you actually have, log what changed."
			],
			fi: [
				"Useimmat polkuviikot saavat tuntua tavallisilta. Puhevauhtia maastossa joka muistuttaa kisaa, yksi teho jos olet virkeä, pitkä joka kasvaa minuuteilla.",
				"20 km -ohjelma on noin kymmenen viikkoa: kevyt juoksu, lyhyet mäet tehona, pitkä kohti 90–110 min, seitsemän päivän kevennys.",
				"Ensimmäinen 50 km haluaa enemmän pohjaa. Suositeltu täysi rakennus 24 viikkoa. Lyhyempi ikkuna kirjoittaa silti ohuemman suunnitelman. Pidempi on selvästi parempi.",
				"Väsymys on treenisyöte. Uni hajosi? Teho muuttuu helpoksi. Peak-päivä ei siirry ellei sinä siirrä.",
				"Koko tuote: valitse päivä, juokse viikko joka sinulla on, kirjaa mitä muuttui."
			],
			fr: [
				"La plupart des semaines trail doivent rester ordinaires. Allure conversation, une séance qualité si vous êtes frais, une longue qui grandit par minutes.",
				"Le 20 km : environ dix semaines, volume facile, côtes courtes, longue vers 90–110 min, taper de sept jours.",
				"Un premier 50 km veut plus de base. Construction complète recommandée : 24 semaines. Une fenêtre plus courte écrit quand même un plan plus mince.",
				"La fatigue est une entrée d’entraînement. Sommeil cassé ? La qualité devient facile. La date de pic ne bouge que si vous la bougez.",
				"Le produit : choisir le jour, courir la semaine réelle, noter ce qui a changé."
			],
			de: [
				"Die meisten Trail-Wochen dürfen gewöhnlich sein. Gesprächspuls, eine Qualitätseinheit wenn frisch, ein Langer der in Minuten wächst.",
				"20 km: etwa zehn Wochen, lockeres Volumen, kurze Hügel, Langer Richtung 90–110 Min, sieben Tage Taper.",
				"Ein erster 50er will mehr Basis. Volle Empfehlung 24 Wochen. Kürzeres Fenster schreibt trotzdem einen dünneren Plan.",
				"Müdigkeit ist Trainingsinput. Schlaf weg? Qualität wird locker. Peak-Datum bleibt, bis du es verschiebst.",
				"Das Produkt: Tag wählen, die echte Woche laufen, notieren was sich änderte."
			]
		}
	},
	{
		slug: "trail-running-fatigue",
		title: {
			en: "Trail running fatigue: when the week should train less",
			fi: "Polkujuoksun väsymys: milloin viikko treenaa vähemmän",
			fr: "Fatigue en trail : quand la semaine doit moins entraîner",
			de: "Trailrunning-Müdigkeit: wann die Woche weniger trainieren soll"
		},
		description: {
			en: "Sleep, niggles, heat, and a long from yesterday are training inputs. Tired means skip intervals. Wrecked means rest. The peak date stays.",
			fi: "Uni, nigglit, helle ja eilinen pitkä ovat treenisyötteitä. Väsynyt = ei vetoja. Hajalla = lepo. Peak-päivä pysyy.",
			fr: "Sommeil, gènes, chaleur et la longue d’hier sont des entrées. Fatigué = pas d’intervalles. Cassé = repos.",
			de: "Schlaf, Ziepen, Hitze und der Lange von gestern sind Inputs. Müde = keine Intervalle. Kaputt = Pause."
		},
		kicker: {
			en: "Ultra training load",
			fi: "Ultran kuorma",
			fr: "Charge d’entraînement ultra",
			de: "Ultra-Trainingslast"
		},
		body: {
			en: [
				"Fatigue is not a mood. It is last night’s sleep, yesterday’s long, a knee at 2/10, and 28°C on the forecast. Those facts change Tuesday. They do not cancel the race.",
				"Ridgework uses four marks: fresh, fine, tired, wrecked. Fresh keeps the written week. Fine keeps load but does not add a second hard day. Tired turns hard and steady into easy. Wrecked turns them into rest; easy stays easy.",
				"This is how load monitoring is used in the endurance literature: as a planning input, not a diagnosis. If something feels like injury or illness, that is a clinician, not a training app.",
				"The mistake is doing the intervals because they were on the card. Commitment to a session is not fitness. The 77 km still happens if Tuesday is 50 minutes easy."
			],
			fi: [
				"Väsymys ei ole fiilis. Se on viime yön uni, eilinen pitkä, polvi 2/10 ja 28°C ennusteessa. Ne muuttavat tiistain. Ne eivät peru kisaa.",
				"Neljä merkkiä: virkeä, ok, väsynyt, hajalla. Väsynyt tekee tehoista helppoa. Hajalla tekee niistä lepoa.",
				"Kuormaa käytetään suunnitteluun, ei diagnoosiin. Jos kyse on vammasta tai sairaudesta, se on lääkäri.",
				"Virhe on tehdä vedot koska ne olivat kortilla. 77 km tapahtuu silti jos tiistai on 50 min helppoa."
			],
			fr: [
				"La fatigue n’est pas une humeur. C’est le sommeil, la longue d’hier, un genou à 2/10, 28°C. Ça change mardi. Ça n’annule pas la course.",
				"Quatre marques : frais, correct, fatigué, cassé. Fatigué : le dur devient facile. Cassé : repos.",
				"La charge sert à planifier, pas à diagnostiquer. Blessure ou maladie : un clinicien.",
				"L’erreur est de faire les intervalles parce qu’ils étaient écrits. Les 77 km tiennent si mardi fait 50 min facile."
			],
			de: [
				"Müdigkeit ist keine Stimmung. Schlaf, Langer von gestern, Knie 2/10, 28°C. Das ändert Dienstag. Das sagt das Rennen nicht ab.",
				"Vier Marken: frisch, okay, müde, kaputt. Müde macht hart zu locker. Kaputt macht Pause.",
				"Last ist Planung, keine Diagnose. Verletzung oder Krankheit: Klinik.",
				"Der Fehler ist, Intervalle zu machen weil sie auf der Karte standen. Die 77 km halten, wenn Dienstag 50 Min locker ist."
			]
		}
	},
	{
		slug: "mountain-running-preparation",
		title: {
			en: "Mountain running preparation for an alpine day",
			fi: "Vuorijuoksun valmistelu alppipäivään",
			fr: "Préparation à la course en montagne pour une journée alpine",
			de: "Berglauf-Vorbereitung für einen Alpentag"
		},
		description: {
			en: "Conversational vert, a short specific block, taper into the forecast. The alpine day is the peak — not a hard Tuesday.",
			fi: "Nousua puhevauhdissa, lyhyt tarkempi jakso, kevennys säähän. Alppipäivä on huippu, ei tiistai.",
			fr: "D+ conversationnel, bloc spécifique court, taper vers la météo. La journée alpine est le pic — pas le mardi.",
			de: "Gesprächs-Hm, kurzer Specific, Taper in die Wetterlage. Der Alpentag ist der Peak — nicht Dienstag."
		},
		kicker: {
			en: "Mountain running preparation",
			fi: "Vuorijuoksun valmistelu",
			fr: "Préparation montagne",
			de: "Berglauf-Vorbereitung"
		},
		body: {
			en: [
				"An alpine day is a training peak with a forecast attached. You want unused legs on the col, not a wrecked quality session two days out.",
				"Ridgework’s alpine-day program is about ten weeks: conversational climbing, one longer day, a short specific block, then taper into the weather window. Week 8 might be 1,200–1,800 m of vert at conversation pace. If the week is already tired, that becomes easy.",
				"Pack weight, start time, and layers belong in prep lists, not in a motivational paragraph. If sleep collapsed midweek, Tuesday vert is the trap — the mountain is still the peak.",
				"Multi-day routes and high camps use the same idea stretched out: hiking base, pack and back-to-backs, then sleep and kit as the taper. Day two is allowed to shrink so day three still has a reserve."
			],
			fi: [
				"Alppipäivä on treenihuippu johon liittyy ennuste. Haluat käyttämättömät jalat colilla, et hajotettua tehoa kaksi päivää ennen.",
				"Alppipäivä-ohjelma on noin kymmenen viikkoa: puhe-nousua, yksi pidempi päivä, lyhyt tarkempi jakso, kevennys säähän. Viikko 8 voi olla 1 200–1 800 m nousua puheella. Jos viikko on jo väsynyt, siitä tulee helppoa.",
				"Repun paino, lähtöaika ja kerrokset kuuluvat prep-listaan. Jos uni hajosi, tiistain vert on ansa — vuori on yhä peak.",
				"Usean päivän reitti ja korkea leiri venyttävät samaa: vaelluspohja, rinkka ja peräkkäiset päivät. Kevennys on uni ja pakkaaminen."
			],
			fr: [
				"Une journée alpine est un pic d’entraînement avec une météo. Vous voulez des jambes inutilisées au col, pas une séance dure deux jours avant.",
				"Le programme : environ dix semaines de D+ conversationnel, une journée plus longue, un bloc court, un taper vers la fenêtre météo.",
				"Le poids du sac, l’heure de départ et les couches vont dans les listes de prep. Si le sommeil casse, le D+ du mardi est le piège.",
				"Les raids et les camps d’altitude étirent la même idée : base marche, sac et back-to-backs, taper = sommeil et matériel."
			],
			de: [
				"Ein Alpentag ist ein Trainingspeak mit Wetter. Unbenutzte Beine am Col, keine harte Einheit zwei Tage vorher.",
				"Programm: etwa zehn Wochen Gesprächs-Hm, ein längerer Tag, kurzer Specific, Taper ins Wetterfenster.",
				"Packgewicht, Startzeit und Lagen gehören in die Prep-Liste. Bricht der Schlaf, ist Dienstags-Hm die Falle.",
				"Mehrtagesrouten und Höhenlager dehnen dasselbe: Wanderbasis, Pack und Back-to-backs, Taper ist Schlaf und Kit."
			]
		}
	},
	{
		slug: "ultra-race-preparation-checklist",
		title: {
			en: "Ultra race preparation checklist for the last two weeks",
			fi: "Ultra-kisan checklist kahdelle viimeiselle viikolle",
			fr: "Checklist de préparation ultra pour les deux dernières semaines",
			de: "Ultra-Rennvorbereitung: Checkliste für die letzten zwei Wochen"
		},
		description: {
			en: "Taper volume, keep a little sharpness, practise fuel, write sleep. What the last 14 days look like before a 50 km or 100 km ultra.",
			fi: "Taper volyymi, pidä vähän terävyyttä, harjoittele tankkaus, kirjoita uni. Viimeiset 14 päivää ennen 50 tai 100 km.",
			fr: "Baisser le volume, garder un peu de vivacité, tester l’alimentation, écrire le sommeil. Les 14 derniers jours.",
			de: "Volumen runter, etwas Schärfe behalten, Verpflegung üben, Schlaf schreiben. Die letzten 14 Tage."
		},
		kicker: {
			en: "Ultra race preparation checklist",
			fi: "Kisachecklist",
			fr: "Checklist course",
			de: "Renn-Checkliste"
		},
		body: {
			en: [
				"Taper is not rest-until-bored. Volume steps down. A little sharpness stays in short doses. You do not invent new sessions, new shoes, or new gels.",
				"Fourteen days out: cut the long, keep most days easy, protect sleep harder than you protect kilometres. Seven days out: one short sharpness if you are fresh — or skip it if you are not.",
				"Write the race fuel on paper: what you ate on the long that held, drink timing, salt if you need it. Pack the kit you trained in. Heat on race day is a hydration problem you already practised, not a new personality.",
				"If a niggle is louder in taper week, flatten the remaining quality. Arriving intact is the point of the last two weeks. Ridgework’s taper blocks for 50 km and 80–120 km encode exactly that."
			],
			fi: [
				"Taper ei ole lepoa kyllästymiseen asti. Volyymi laskee. Vähän terävyyttä jää lyhyinä annoksina. Ei uusia vetoja, kenkiä tai geelejä.",
				"14 päivää: lyhennä pitkä, pidä päivät helppoina, suojaa unta kilometrejä kovemmin. 7 päivää: lyhyt terävyys jos olet virkeä — muuten ei.",
				"Kirjoita tankkaus paperille: mikä piti pitkällä, juonti, suola. Pakkaa kit jolla treenasit.",
				"Jos kolotus on kevennysviikolla äänekkäämpi, loput tehot jäävät pois. Perille ehjänä on näiden kahden viikon pointti."
			],
			fr: [
				"Le taper n’est pas du repos jusqu’à l’ennui. Le volume baisse. Un peu de vivacité reste en doses courtes. Pas de nouvelles séances, chaussures ou gels.",
				"J-14 : raccourcir la longue, garder le facile, protéger le sommeil. J-7 : une petite vivacité si vous êtes frais.",
				"Écrivez l’alimentation de course : ce qui a tenu sur la longue, le rythme de boisson. Le kit avec lequel vous vous êtes entraîné.",
				"Si une gène parle plus fort, enlevez la qualité restante. Arriver entier est le but."
			],
			de: [
				"Taper ist kein Ruhen bis zur Langeweile. Volumen runter. Etwas Schärfe in kurzen Dosen. Keine neuen Einheiten, Schuhe, Gele.",
				"14 Tage: Langen kürzen, locker bleiben, Schlaf härter schützen als Kilometer. 7 Tage: kurze Schärfe nur wenn frisch.",
				"Rennverpflegung aufschreiben: was auf dem Langen hielt, Trinkrhythmus. Kit aus dem Training.",
				"Wird das Ziepen lauter, fällt die restliche Qualität. Intakt ankommen ist der Punkt."
			]
		}
	},
	{
		slug: "aerobic-engine-low-heart-rate",
		title: {
			en: "Aerobic engine: more work at a low heart rate",
			fi: "Aerobinen moottori: lisää työtä matalalla sykkeellä",
			fr: "Moteur aérobie : plus de travail à basse fréquence cardiaque",
			de: "Aerober Motor: mehr Arbeit bei niedriger Herzfrequenz"
		},
		description: {
			en: "No race required. Conversational running, a long toward 90 minutes, fat as the default fuel. The engine is the quality.",
			fi: "Kisaa ei tarvita. Puhelenkki, pitkä kohti 90 min, rasva oletuspolttoaineena. Moottori on teho.",
			fr: "Pas besoin de course. Allure conversation, longue vers 90 min, graisse comme carburant par défaut.",
			de: "Kein Rennen nötig. Gesprächspuls, Langer Richtung 90 Min, Fett als Standardtreibstoff."
		},
		kicker: {
			en: "Low-heart-rate training",
			fi: "Matalan sykkeen treeni",
			fr: "Entraînement basse FC",
			de: "Training bei niedriger HF"
		},
		body: {
			en: [
				"If you do not have a race, you still have a peak: a stronger aerobic engine. That means more minutes where you can speak in full sentences, and a long that grows toward 90 minutes without turning into a sufferfest.",
				"Ridgework’s engine program is sixteen weeks of that. No quality dose in the usual sense — the easy volume is the work. If you cannot speak, you are too fast.",
				"Fat as the default fuel is a pacing and fuelling habit on those easy days, not a diet religion. Eat normally. Keep the long conversational. Save sugar for when the outing actually needs it.",
				"This block is also the base under every other program. Extra weeks before a 50 km or a 100 km sit here. Season after season, this is what compounds."
			],
			fi: [
				"Jos ei ole kisaa, peak on silti: vahvempi aerobinen moottori. Enemmän minuutteja joilla saat kokonaisia lauseita, pitkä kohti 90 min ilman kärsimysnäytelmää.",
				"Moottoriohjelma on kuusitoista viikkoa sitä. Ei erillistä tehoa — helppo volyymi on työ. Jos et puhu, olet liian lujaa.",
				"Rasva oletuspolttoaineena on vauhti- ja tankkaustapa helppoina päivinä, ei dieettiuskonto.",
				"Tämä jakso on pohja kaikille muille ohjelmille. Ylimääräiset viikot ennen 50 tai 100 km istuvat tässä."
			],
			fr: [
				"Sans course, le pic reste : un moteur aérobie plus solide. Plus de minutes à l’allure conversation, une longue vers 90 min.",
				"Le programme moteur : seize semaines. Pas de séance qualité au sens habituel — le volume facile est le travail. Si vous ne parlez pas, vous allez trop vite.",
				"La graisse comme carburant par défaut est une habitude d’allure, pas une religion alimentaire.",
				"Ce bloc est aussi la base sous tous les autres programmes."
			],
			de: [
				"Ohne Rennen bleibt der Peak: ein stärkerer aerober Motor. Mehr Minuten im Gesprächspuls, Langer Richtung 90 Min.",
				"Motor-Programm: sechzehn Wochen. Keine Qualitätseinheit im üblichen Sinn — das lockere Volumen ist die Arbeit. Keine Sätze = zu schnell.",
				"Fett als Standardtreibstoff ist ein Tempo-Habit, keine Diätreligion.",
				"Dieser Block ist auch die Basis unter allen anderen Programmen."
			]
		}
	}
];
function getGuide(slug) {
	return GUIDES.find((g) => g.slug === slug);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Crh4553Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-BlZvVleF.css";
var APP_NAME = "Ridgework";
var Route$21 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#2f8a4e"
			},
			{
				name: "description",
				content: "Weekly training for trail and ultra: 20 km, 50 km, 100 km, alpine days. Tired weeks get easier. 14 days free, then €5/month."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/brand/logo-a.png"
			},
			{
				rel: "apple-touch-icon",
				href: "/brand/logo-a.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var copy$7 = getCopy("en");
var SITE = "https://ridgework.org";
var OG_IMAGE = `${SITE}/og.jpg`;
var OG_LOCALE = {
	en: "en_GB",
	fi: "fi_FI",
	fr: "fr_FR",
	de: "de_DE"
};
function siteMeta(opts) {
	const path = opts.path ?? "/";
	const url = `${SITE}${path === "/" ? "/" : path}`;
	const locale = OG_LOCALE[opts.locale ?? "en"] ?? "en_GB";
	return [
		{ title: opts.title },
		{
			name: "description",
			content: opts.description
		},
		{
			property: "og:title",
			content: opts.title
		},
		{
			property: "og:description",
			content: opts.description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			property: "og:url",
			content: url
		},
		{
			property: "og:image",
			content: OG_IMAGE
		},
		{
			property: "og:image:width",
			content: "1200"
		},
		{
			property: "og:image:height",
			content: "630"
		},
		{
			property: "og:locale",
			content: locale
		},
		{
			property: "og:site_name",
			content: "Ridgework"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: opts.title
		},
		{
			name: "twitter:description",
			content: opts.description
		},
		{
			name: "twitter:image",
			content: OG_IMAGE
		}
	];
}
var $$splitComponentImporter$18 = () => import("./routes-CJLgdXuA.mjs");
var Route$20 = createFileRoute("/")({
	head: () => ({ meta: siteMeta({
		title: copy$7.metaTitle,
		description: copy$7.metaDescription,
		path: "/",
		locale: "en"
	}) }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("../_locale-BXcAV58D.mjs");
var Route$19 = createFileRoute("/$locale")({
	beforeLoad: ({ params }) => {
		if (!isPathLocale(params.locale)) throw notFound();
	},
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var copy$6 = getCopy("en");
var $$splitComponentImporter$16 = () => import("./app-D8G7DJSf.mjs");
var Route$18 = createFileRoute("/app")({
	head: () => ({ meta: [{ title: copy$6.appPage.title }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var copy$5 = getCopy("en");
var $$splitComponentImporter$15 = () => import("./field-CykV6ZnK.mjs");
var Route$17 = createFileRoute("/field")({
	head: () => ({ meta: [{ title: copy$5.fieldPage.title }, {
		name: "description",
		content: copy$5.fieldPage.description
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var copy$4 = getCopy("en");
var $$splitComponentImporter$14 = () => import("./founding-CBpyxvuQ.mjs");
var Route$16 = createFileRoute("/founding")({
	head: () => ({ meta: [{ title: copy$4.foundingPage.title }, {
		name: "description",
		content: copy$4.foundingPage.description
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var copy$3 = getCopy("en");
var $$splitComponentImporter$13 = () => import("./guides-zBGnqC79.mjs");
var Route$15 = createFileRoute("/guides")({
	head: () => ({ meta: [{ title: `${copy$3.guidesIndex.h2} — Ridgework` }, {
		name: "description",
		content: copy$3.guidesIndex.lead
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var copy$2 = getCopy("en");
var $$splitComponentImporter$12 = () => import("./login-gZCFKs57.mjs");
var Route$14 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: `${copy$2.auth.title} — Ridgework` }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var copy$1 = getCopy("en");
var $$splitComponentImporter$11 = () => import("./privacy-GJkJYWFy.mjs");
var Route$13 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: `${copy$1.privacyPage.title} — Ridgework` }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var copy = getCopy("en");
var $$splitComponentImporter$10 = () => import("./terms-B8xU1t3h.mjs");
var Route$12 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: `${copy.termsPage.title} — Ridgework` }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_locale-DdhKb-VF.mjs");
var Route$11 = createFileRoute("/$locale/")({
	head: ({ params }) => {
		const locale = isPathLocale(params.locale) ? params.locale : "en";
		const copy = getCopy(locale);
		return { meta: siteMeta({
			title: copy.metaTitle,
			description: copy.metaDescription,
			path: `/${locale}/`,
			locale
		}) };
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./app-PKpo_HQi.mjs");
var Route$10 = createFileRoute("/$locale/app")({
	head: ({ params }) => {
		return { meta: [{ title: getCopy(isPathLocale(params.locale) ? params.locale : "en").appPage.title }] };
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./field-D4UAW2FW.mjs");
var Route$9 = createFileRoute("/$locale/field")({
	head: ({ params }) => {
		const copy = getCopy(isPathLocale(params.locale) ? params.locale : "en");
		return { meta: [{ title: copy.fieldPage.title }, {
			name: "description",
			content: copy.fieldPage.description
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./founding-Bd1ddBTL.mjs");
var Route$8 = createFileRoute("/$locale/founding")({
	head: ({ params }) => {
		const copy = getCopy(isPathLocale(params.locale) ? params.locale : "en");
		return { meta: [{ title: copy.foundingPage.title }, {
			name: "description",
			content: copy.foundingPage.description
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./guides-Cz2IAuX4.mjs");
var Route$7 = createFileRoute("/$locale/guides")({
	head: ({ params }) => {
		const copy = getCopy(isPathLocale(params.locale) ? params.locale : "en");
		return { meta: [{ title: `${copy.guidesIndex.h2} — Ridgework` }, {
			name: "description",
			content: copy.guidesIndex.lead
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./login-9Zjbshtn.mjs");
var Route$6 = createFileRoute("/$locale/login")({
	head: ({ params }) => {
		return { meta: [{ title: `${getCopy(isPathLocale(params.locale) ? params.locale : "en").auth.title} — Ridgework` }] };
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./privacy-D9tWY0ev.mjs");
var Route$5 = createFileRoute("/$locale/privacy")({
	head: ({ params }) => {
		return { meta: [{ title: `${getCopy(isPathLocale(params.locale) ? params.locale : "en").privacyPage.title} — Ridgework` }] };
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./terms-BIASBQ1E.mjs");
var Route$4 = createFileRoute("/$locale/terms")({
	head: ({ params }) => {
		return { meta: [{ title: `${getCopy(isPathLocale(params.locale) ? params.locale : "en").termsPage.title} — Ridgework` }] };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_slug-DIKZq-ws.mjs");
var Route$3 = createFileRoute("/guides/$slug")({
	loader: ({ params }) => {
		const guide = getGuide(params.slug);
		if (!guide) throw notFound();
		return guide;
	},
	head: ({ params }) => {
		const guide = getGuide(params.slug);
		const copy = getCopy("en");
		return { meta: [{ title: `${guide?.title.en ?? copy.guidesIndex.h2} — Ridgework` }, {
			name: "description",
			content: guide?.description.en ?? copy.guidesIndex.lead
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_slug-CHpzfdaJ.mjs");
var Route$2 = createFileRoute("/$locale/guides/$slug")({
	loader: ({ params }) => {
		const guide = getGuide(params.slug);
		if (!guide) throw notFound();
		return guide;
	},
	head: ({ params }) => {
		const locale = isPathLocale(params.locale) ? params.locale : "en";
		const guide = getGuide(params.slug);
		const copy = getCopy(locale);
		return { meta: [{ title: `${guide?.title[locale] ?? copy.guidesIndex.h2} — Ridgework` }, {
			name: "description",
			content: guide?.description[locale] ?? copy.guidesIndex.lead
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$1 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var Route = createFileRoute("/api/polar/webhook")({ server: { handlers: { POST: async ({ request }) => {
	const secret = polarWebhookSecret();
	if (!secret) return new Response("webhook secret missing", { status: 503 });
	const body = await request.text();
	const headers = Object.fromEntries(request.headers.entries());
	let event;
	try {
		event = validateEvent(body, headers, secret);
	} catch (err) {
		if (err instanceof WebhookVerificationError) return new Response("invalid signature", { status: 403 });
		throw err;
	}
	const sql = await getSql();
	const type = event.type;
	const data = event.data;
	const userId = data.metadata?.user_id;
	const polarCustomer = data.customerId ?? data.customer_id ?? null;
	const polarSub = type.startsWith("subscription.") && data.id ? data.id : null;
	if (userId) await sql.query(`insert into billing_events (user_id, kind, stripe_id, payload)
             values ($1, $2, $3, $4::jsonb)`, [
		userId,
		type,
		data.id ?? null,
		body
	]);
	if (userId && (type === "subscription.created" || type === "subscription.active" || type === "order.created" || type === "subscription.updated")) await sql.query(`update enrollments
                set billing_status = 'active',
                    polar_customer_id = coalesce($2, polar_customer_id),
                    polar_subscription_id = coalesce($3, polar_subscription_id),
                    updated_at = now()
              where user_id = $1`, [
		userId,
		polarCustomer,
		polarSub
	]);
	if (userId && (type === "subscription.revoked" || type === "subscription.canceled")) await sql.query(`update enrollments
                set billing_status = 'canceled',
                    updated_at = now()
              where user_id = $1`, [userId]);
	return new Response("ok", { status: 200 });
} } } });
var IndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$21
});
var LocaleRoute = Route$19.update({
	id: "/$locale",
	path: "/$locale",
	getParentRoute: () => Route$21
});
var AppRoute = Route$18.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$21
});
var FieldRoute = Route$17.update({
	id: "/field",
	path: "/field",
	getParentRoute: () => Route$21
});
var FoundingRoute = Route$16.update({
	id: "/founding",
	path: "/founding",
	getParentRoute: () => Route$21
});
var GuidesRoute = Route$15.update({
	id: "/guides",
	path: "/guides",
	getParentRoute: () => Route$21
});
var LoginRoute = Route$14.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$21
});
var PrivacyRoute = Route$13.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$21
});
var TermsRoute = Route$12.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$21
});
var LocaleIndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => LocaleRoute
});
var LocaleAppRoute = Route$10.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => LocaleRoute
});
var LocaleFieldRoute = Route$9.update({
	id: "/field",
	path: "/field",
	getParentRoute: () => LocaleRoute
});
var LocaleFoundingRoute = Route$8.update({
	id: "/founding",
	path: "/founding",
	getParentRoute: () => LocaleRoute
});
var LocaleGuidesRoute = Route$7.update({
	id: "/guides",
	path: "/guides",
	getParentRoute: () => LocaleRoute
});
var LocaleLoginRoute = Route$6.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => LocaleRoute
});
var LocalePrivacyRoute = Route$5.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => LocaleRoute
});
var LocaleTermsRoute = Route$4.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => LocaleRoute
});
var GuidesSlugRoute = Route$3.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => GuidesRoute
});
var LocaleGuidesSlugRoute = Route$2.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => LocaleGuidesRoute
});
var ApiAuthSplatRoute = Route$1.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$21
});
var ApiPolarWebhookRoute = Route.update({
	id: "/api/polar/webhook",
	path: "/api/polar/webhook",
	getParentRoute: () => Route$21
});
var LocaleGuidesRouteChildren = { LocaleGuidesSlugRoute };
var LocaleRouteChildren = {
	LocaleAppRoute,
	LocaleFieldRoute,
	LocaleFoundingRoute,
	LocaleGuidesRoute: LocaleGuidesRoute._addFileChildren(LocaleGuidesRouteChildren),
	LocaleLoginRoute,
	LocalePrivacyRoute,
	LocaleTermsRoute,
	LocaleIndexRoute
};
var LocaleRouteWithChildren = LocaleRoute._addFileChildren(LocaleRouteChildren);
var GuidesRouteChildren = { GuidesSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	LocaleRoute: LocaleRouteWithChildren,
	AppRoute,
	FieldRoute,
	FoundingRoute,
	GuidesRoute: GuidesRoute._addFileChildren(GuidesRouteChildren),
	LoginRoute,
	PrivacyRoute,
	TermsRoute,
	ApiAuthSplatRoute,
	ApiPolarWebhookRoute
};
var routeTree = Route$21._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { SOURCES as C, isPathLocale as D, homeHash as E, pagePath as O, LOCALES as S, guidePath as T, copy$5 as _, Route$5 as a, GUIDES as b, Route$8 as c, Route$11 as d, copy as f, copy$4 as g, copy$3 as h, Route$4 as i, Route$9 as l, copy$2 as m, Route$2 as n, Route$6 as o, copy$1 as p, Route$3 as r, Route$7 as s, router_exports as t, Route$10 as u, copy$6 as v, getCopy as w, getGuide as x, copy$7 as y };
