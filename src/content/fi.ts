import { fieldFi } from "./field.ts";
import { planFi } from "./plan-tools.ts";
import { athleteFi } from "./athlete-copy.ts";
import { mountainFi } from "./mountain-prep.ts";
import { passportFi, whatIfFi } from "./passport.ts";
import type { Copy } from "./types";

export const fi: Copy = {
  metaTitle: "Polku- ja ultratreenin viikkosuunnitelma | Ridgework",
  metaDescription:
    "Mitä juokset tällä viikolla, kun edessä on 20 km polku, 50 tai 100 km ultra tai alppipäivä. Väsynyt viikko kevenee. Ei korttia aloittaessa.",
  footerTag: "Vuoritreeniä sen viikon mukaan joka sinulla oikeasti on.",
  legalEntity: "Ridgework, Ranska.",
  support: "support@ridgework.org",
  cancelAnytime: "Peru milloin tahansa",
  terms: "Ehdot",
  privacy: "Tietosuoja",
  legalNotice: "Oikeudelliset tiedot",
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
    account: "Tili",
    signOut: "Kirjaudu ulos",
    signingOut: "Kirjaudutaan ulos…",
    signedInAs: "Kirjautuneena: {who}",
  },
  cta: {
    pricing: "Katso hinnat",
    openTools: "Avaa työkalut",
    seeWeek: "Katso tämä viikko",
  },
  examplePlanner: {
    h2: "Valitse päivä jolloin sinun pitää olla valmis",
    lead: "Kirjoitettu ensimmäiseen 50 kilometriin tai ensimmäiseen 20 km polkujuoksuun 3–5 tunnilla viikossa — maaliin hyvin, ei aikaa vastaan. Vaihda päivä, niin alla olevat kolme viikkoa kirjoitetaan uusiksi samalla moottorilla jota työpöytä ajaa.",
    goalLabel: "Tavoite",
    goals: { fifty: "Ensimmäinen 50 km", trail20: "Ensimmäinen 20 km polku" },
    dateLabel: "Valmiina",
    windowOk: "{n} viikkoa tästä päivästä. Se on täysi rakennus.",
    windowShort:
      "{n} viikkoa tästä päivästä. Täysi rakennus haluaisi {want}, joten peruskuntoa leikataan ensin ja lajiosa sekä kevennys säilytetään. Saat silti kirjoitetun viikon.",
    tooSoon: "Valitse päivä kauempaa — sitä ennen ei ole viikkoa kirjoitettavaksi.",
    weekN: "Viikko {n}",
    repeats:
      "Nämä kolme on kirjoitettu samoiksi. {phase} toistuu kunnes on syy muuttaa sitä — {next}-jakso alkaa viikolla {n}, ja romahtanut treeni tai väliin jäänyt viikko kirjoittaa ne uusiksi jo ennen sitä.",
    phases: { base: "Perus", specific: "Laji", taper: "Kevennys", done: "Valmis" },
    note: "Kolme viikkoa on kerrallaan kirjoitettuna. Kirjaa viikko, niin seuraava ilmestyy. Mitään tästä ei tallenneta, eikä tiliä ole ennen kuin teet sellaisen.",
  },
  pageMeta: {
    who: {
      title: "Kenelle Ridgework on — Ridgework",
      description:
        "Kenelle itseään uudelleen kirjoittava treeniviikko sopii, kenelle ei, ja mitä oikeasti saat. Vuori- ja polkutreeniä, ei kiinteää PDF:ää.",
    },
    after: {
      title: "Mitä tapahtuu kirjautumisen jälkeen — Ridgework",
      description:
        "Ensimmäiset kaksi viikkoa päivä kerrallaan: valitse tavoitepäivä, kolme viikkoa ilmestyy kalenteriin, ja suunnitelma kirjoitetaan uusiksi sen mukaan mitä teit.",
    },
    method: {
      title: "Menetelmä ja lähteet — Ridgework",
      description:
        "Useimmat päivät kevyitä, yksi kova jos olet virkeä, kevennys kohti päivää. Viikkorakenteen takana oleva tutkimus lähdeviitteineen ja rajoituksineen.",
    },
  },
  offer: {
    free: {
      cta: "Aloita ilmaiseksi",
      title: "Nyt ilmainen.",
      lead: "Ridgework on ilmainen niin kauan kuin yhtiön rekisteröinti on kesken — emme saa vielä ottaa maksuja, emmekä esitä muuta. Kun kassa aukeaa, jäsenyys on 19 €/kk.",
      badge: "Ilmainen, ei korttia",
      line: "Ilmainen niin kauan kuin yhtiön rekisteröinti on kesken. Ei korttia, ei mitään peruttavaa.",
      features: [
        "Seitsemän ohjelmaa peruskunnosta 100 kilometriin ja vuoripäiviin",
        "Korttia ei kysytä missään — maksut eivät ole vielä auki",
        "Viikot kirjoitetaan uusiksi kun nukut huonosti, jätät treenin väliin tai matkustat",
        "Treeniviikkoja, ei lääketieteellisiä väitteitä",
      ],
      laterTitle: "Kun maksut avautuvat",
      laterBody:
        "Jäsenyys tulee maksamaan 19 €/kk, ja sinulta kysytään ennen kuin mitään veloitetaan. Sitä ennen sinulta ei voi ottaa mitään: korttia ei ole tallessa, koska sivusto ei pysty ottamaan sitä vastaan.",
    },
    trial: {
      cta: "Aloita 14 päivää ilmaiseksi",
      title: "14 päivää kalenterissa. Sitten 19 €/kk.",
      lead: "Juokse ensin oikea viikko. Sen jälkeen 19 €/kk jos jäät. Peru milloin tahansa, myös 14 päivän aikana.",
      badge: "14 päivää ilmaiseksi",
      line: "14 päivää ilmaiseksi, ei korttia. Sen jälkeen 19 €/kk jos lisäät kortin. Peru milloin tahansa.",
      features: [
        "Seitsemän ohjelmaa peruskunnosta 100 kilometriin ja vuoripäiviin",
        "Ei korttia 14 päivään — lisää se milloin tahansa ja jatka hintaan 19 €/kk",
        "Peru 14 päivän aikana, eikä Polar veloita mitään",
        "Treeniviikkoja, ei lääketieteellisiä väitteitä",
      ],
      laterTitle: "14 päivän jälkeen",
      laterBody:
        "Lisää kortti milloin tahansa ja jatka hintaan 19 €/kk. Mitään ei veloiteta automaattisesti — ilman korttia työpöytä yksinkertaisesti pysähtyy kunnes lisäät sen. Muuta hintaa ei tällä sivustolla ole.",
    },
  },
  hero: {
    kicker: "Vuoritreeni",
    h1: "Treenaa sitä päivää varten jolla on väliä.",
    lead: "Valitse päivä jolloin sinun pitää olla valmis. Jokainen viikko kirjoitetaan siitä taaksepäin — ja kirjoitetaan uusiksi kun elämä tulee väliin.",
    proofLabel: "Mitä viiden tunnin yö tekee",
    proofHeld: "Yksi treeni muuttui. Muu viikko ja päivä johon tähtäät pysyivät paikallaan.",
  },
  about: {
    kicker: "Mitä tämä on",
    h2: "Treenipöytä ihmisille jotka menevät vuorille",
    lead: "Viikko kirjoitetaan tutkimuksesta jota siteeraamme, sitten se taipuu uneen, matkaan, lapsiin ja kamoihin jotka omistat. Kysymykset menevät osoitteeseen support@ridgework.org. Kaudet jäävät passiin, jonka voit pitää yksityisenä.",
    cards: [
      {
        title: "Viikko tulee papereista, ei fiiliksestä",
        body: "Kevyt volyymi, yksi kova jos olet virkeä, kevennys ennen päivää. Mallit ovat metodi-sivulla lähteineen. Se on lähtöviikko, ei diagnoosi.",
      },
      {
        title: "Elämä on syöte",
        body: "Tiistai jäi väliin, työmatka, ei rautakenkiä, lyhyt yö. Suunnitelma nimeää muutoksen ja miksi. Tavoitepäivä pysyy ellet siirrä sitä.",
      },
      {
        title: "Ihminen vastaa",
        body: "support@ridgework.org on ihminen. Metodi pysyy viikosta toiseen. Vuorilla päätät silti itse.",
      },
      {
        title: "Kaudet, kirjoitettuna",
        body: "Passi on sinä vs viime vuosi: pisimmät päivät, kevyt volyymi, mikä hajosi. Jaa valmentajalle tai pidä yksityisenä.",
      },
    ],
  },
  method: {
    kicker: "Miksi viikko näyttää tältä",
    h2: "Suurin osa kevyttä. Yksi kova, tai ei yhtään.",
    lead: "Taustalla on kestävyystutkimusta, ei taikuutta: paljon kevyttä, väsymys syötteenä, kevennys ennen päivää. Listoja, ei diagnooseja.",
    cards: [
      {
        title: "Miksi viikko on kevyt",
        body: "Seiler & Kjerland (2006) mittasivat juniorihiihtäjillä noin 75 % sessioista helpoiksi. Seilerin 2010 katsaus kuvaa polarisoitua tai pyramidia sellaiseksi kuin kestävyysurheilijat oikeasti treenaavat. Esteve-Lanao ym. (2007): enemmän aikaa helpolla seurasi parempaa juoksua. Stöggl & Sperlich (2014): polarisoidut jaksot liikuttivat avainmuuttujia enemmän kuin kynnyspainotteiset. Ridgework lähtee tästä. Saat säätää.",
      },
      {
        title: "Kuorma on viikon syöte",
        body: "Fosterin session RPE (2001) on yksi luku: miltä tuntui, kertaa kesto. Bourdon ym. (2017) on konsensus: kirjoita ulkoinen työ ja sisäinen vaste, säädä seuraava sessio. Sinä merkitset treenin. Jos se oli rikki, tai johonkin sattuu, seuraava kova päivä kirjoitetaan kevyemmäksi. Se on kuorman seurantaa. Ridgework ei arvaa että väsyttää, eikä se ole lääketieteellinen testi.",
      },
      {
        title: "Kevennys ennen päivää",
        body: "Mujika & Padilla (2003): volyymi tyypillisesti laskee ennen päivää, osa intensiteetistä jää lyhyempinä annoksina. Kunto ilmaistaan, ei haudata jälkiväsymykseen. Kirjoitamme sen 10–14 päivän lohkoksi. Uni ja varusteet voittavat lisälenkin.",
      },
    ],
    caveatsTitle: "Rehelliset varaukset",
    caveats: [
      "Yksilövaste vaihtelee. Ikä, historia, maasto ja elämän kuorma muuttavat sitä, mikä toimii.",
      "Julkaistut keskiarvot eivät ole lääketieteellistä neuvontaa eivätkä korvaa ammattilaista terveyskysymyksissä.",
      "Tämä kirjoittaa lähtöviikon siitä mitä kerrot sille. Se ei näe sinua treenaamassa ja tietää vain ne treenit jotka kirjaat.",
    ],
    sourcesTitle: "Lähteet",
    allSourcesCta: "Kaikki lähteet ja mihin kutakin käytetään",
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
            value: "Saapua alppipäivään jalat tallella, ei rikkinäisenä tiistaina",
          },
          {
            label: "Suunnitelma",
            value:
              "10 viikkoa: 6 vk peruskuntoa ja nousua, 3 vk tarkempi jakso, 10–14 pv kevennys säähän",
          },
          {
            label: "Fokus",
            value:
              "Pidä helppo helppona. Lisää puhevauhdin nousua. Huippu sääikkunaan, ei lisäkilometreihin.",
          },
          {
            label: "Väsymys",
            value: "Jos uni tai jalat ovat poissa, jätä teho. Viikonloppu on huippu, ei tiistai.",
          },
        ],
      },
      {
        title: "Ensimmäinen 50 km polku",
        fields: [
          { label: "Tavoite", value: "Maaliin hallitusti: tankkaus ja vauhti kunnossa" },
          {
            label: "Suunnitelma",
            value:
              "Noin puoli vuotta: 10 vk peruskunto, 12 vk pitkän kasvatus, 10–14 pv kevennys kisaviikolle",
          },
          {
            label: "Fokus",
            value:
              "Ensin kevyt juoksu, sitten pitkän progressio ja yksi teho. Huippu kisaviikolla.",
          },
          {
            label: "Avainharjoitus",
            value:
              "Viikko 20: 3×12 min maratonteholla rullaavalla polulla, 4 min kevyttä. Lämpö- ja kolotusportit ennen starttia. Sitten 10–14 pv kevennys.",
            locked: true,
          },
        ],
      },
      {
        title: "Tuvasta tupaan",
        fields: [
          {
            label: "Tavoite",
            value: "Kolme ketjutettua päivää, koska toisen päivän treeni sai kutistua",
          },
          {
            label: "Suunnitelma",
            value:
              "Noin 8 kuukautta: talvi–kevät peruskuntoa ja vaellusta, 10 vk rinkkaa ja peräkkäisiä päiviä, 10–14 pv kevennys päivään 1",
          },
          {
            label: "Fokus",
            value:
              "Jalat pohjakuukausina. Tarkempi jakso on rinkka ja peräkkäiset päivät. Huippu päivälle 1, ei romahdus päivälle 3.",
          },
          {
            label: "Väsymys",
            value:
              "Jos päivän 1 jäänteet istuvat jaloissa, leikkaa päivän 2 määrä. Päivä 3 tarvitsee varaa.",
          },
        ],
      },
    ],
  },
  programs: {
    kicker: "Ohjelmat",
    h2: "Seitsemän ohjelmaa. Kerro milloin haluat olla valmis.",
    lead: "Jos ei ole kisaa, aloita peruskunnosta: paljon kevyttä, matalalla sykkeellä. Mitä enemmän viikkoja ennen päivää, sen vakaampi pohja.",
    columns: {
      name: "Ohjelma",
      duration: "Kesto",
      focus: "Fokus",
      recipe: "Avainharjoitus",
    },
    rows: [
      {
        id: "engine",
        name: "Aerobinen moottori",
        duration: "Noin 16 viikkoa kevyttä juoksua",
        focus: "Lisää kevyttä. Rasva polttoaineena. Kisaa ei tarvita.",
        locked:
          "Useimmat päivät niin kevyitä että pystyt puhumaan. Pitkä kasvaa kohti 90 minuuttia. Erillistä tehoa ei ole: tämä on teho.",
        pull: "Jos saat kokonaisen lauseen ulos, olet oikeassa työssä.",
        layout: "textFirst",
      },
      {
        id: "trail20",
        name: "20 km polku",
        duration: "Kymmenen viikkoa riittää useimmille",
        focus: "Kevyttä pohjaa, yksi teho, pitkä 90–110 min.",
        locked:
          "Viikko 8: kuusi kertaa 3 min kympin teholla, 2 min kevyttä välissä. Sitten viikon kevennys.",
        layout: "sessionLead",
      },
      {
        id: "fifty",
        name: "50 km ultra",
        duration: "Noin puoli vuotta",
        focus: "Pitkä peruskunto, sitten pitkät kasvavat, huippu kisaviikolla.",
        locked: "Viikko 20: 3×12 min maratonteholla polulla. Sitten 10–14 päivän kevennys.",
        tag: "Monen ensimmäinen ultra",
        pull: "Maaliin hallitusti, ei vain maaliin.",
        layout: "wide",
      },
      {
        id: "ultra100",
        name: "80–120 km ultra",
        duration: "Usein yhdeksän kuukautta",
        focus: "Kuukausia kevyttä juoksua. Lopussa kaksi pitkää peräkkäin, sitten reilu kevennys.",
        locked:
          "Viikko 30: lauantai 4–5 tuntia kevyttä, sunnuntai 2,5–3 tuntia. Arki pysyy puheella.",
      },
      {
        id: "alpine",
        name: "Alppipäivä",
        duration: "Noin kymmenen viikkoa",
        focus: "Nousut kevyinä, plus oikeaa kiipeilyä ja voimaa.",
        locked:
          "Viikko 8: kiipeilykerta (kallio, jää tai sali) ja 30–40 min voimaa. Nousu puhevauhdissa. Jos väsyttää, kiipeily vaihtuu kävelyyn.",
        tag: "Mukana kiipeilyä",
        layout: "sessionLead",
      },
      {
        id: "traverse",
        name: "Usean päivän alppireitti",
        duration: "Noin kahdeksan kuukautta",
        focus: "Vaelluspohja, sitten kiipeilyä ja rinkkaa peräkkäisinä päivinä.",
        locked:
          "Viikko 28: kiipeilypäivä, seuraavana kevyt rinkkavaellus. Lyhennä kakkospäivä jos jalat ovat täynnä.",
        layout: "compact",
      },
      {
        id: "expedition",
        name: "Korkean paikan retkikunta",
        duration: "Noin kymmenen kuukautta",
        focus:
          "Kevyttä juoksua pitkään, sitten rinkkaa ja sen verran kiipeilyä ettei vuori ole ensimmäinen veto.",
        locked:
          "Viikko 34: 3–4 tuntia rinkalla. Lepo perään. Kevennys on unta ja pakkaamista, ei lisäkorkeutta.",
        pull: "Kevennys on unta ja pakkaamista.",
      },
    ],
    lockHint: "Avainharjoitus",
    cta: "Aloita tämä ohjelma",
  },
  who: {
    h2: "Kenelle tämä on, ja kenelle ei",
    forTitle: "Rakennettu",
    forItems: [
      "Kestävyysurheilijoille, jotka suunnittelevat viikkoja elämän ja maaston ympärille",
      "Niille jotka treenaavat kohti aerobista moottoria, 20 km polkua, 50 tai 100 km ultraa, alppipäivää, ketjutettua reittiä tai korkealla tehtävää retkikuntaa",
      "Kaikille, jotka haluavat rauhalliset työkalut, ei motivaatio-spamia",
    ],
    notTitle: "Ei",
    notItems: [
      "Vamman diagnoosiin tai hoitoon",
      "Live-valmentajaan taskussa",
      "Hätä- tai pelastusohjeisiin",
    ],
  },
  what: {
    h2: "Mitä saat",
    items: [
      {
        n: "01",
        title: "Viikot tavoitepäivästä taaksepäin",
        body: "Kerrot milloin kisan tai retken pitää olla valmis. Sitten peruskunto, kisajakso, kevennys. Jos viikkoja on paljon, pohja ehtii kasvaa.",
      },
      {
        n: "02",
        title: "Loki muuttaa seuraavaa päivää",
        body: "Merkitset miltä edellinen treeni tuntui. Jos se oli rikki, tai johonkin sattuu, seuraava kova päivä kirjoitetaan kevyemmäksi. Foster (2001) ja Bourdon ym. (2017): sisäinen kuorma on suunnitteluluku, ei diagnoosi. Tavoitepäivä pysyy.",
      },
      {
        n: "03",
        title: "Varusteet tälle viikolle",
        body: "Kengät, juoma, uni. Sille viikolle jota oikeasti juokset, ei ideaaliviikolle.",
      },
      {
        n: "04",
        title: "Treeniloki",
        body: "Kirjaa mitä teit ja miksi viikko muuttui. Seuraava viikko lähtee siitä, ei toiveesta.",
      },
    ],
  },
  week: {
    h2: "Miten viikko kulkee",
    steps: [
      {
        day: "Ma",
        title: "Rakenna tämä viikko",
        body: "Tavoitepäivä on jo kalenterissa. Suurin osa päivistä on kevyttä juoksua. Jos nukuit hyvin, yksi kovempi treeni. Pitkä lenkki tulee viikon loppuun.",
      },
      {
        day: "Ti",
        title: "Katso uni ja jalat",
        body: "Viisi tuntia unta? Vedot muuttuvat 45–60 min helpoksi. Kisapäivä ei siirry.",
      },
      {
        day: "To",
        title: "Pidä kevyet kevyinä",
        body: "Suurin osa viikosta vauhdissa jossa saat puhuttua. Jos lause tulee ulos, olet oikealla alueella.",
      },
      {
        day: "Su",
        title: "Kirjaa mitä tapahtui",
        body: "Kirjaa pitkä lenkki ja jos jokin kolotti. Seuraava viikko rakennetaan siitä, ei viikosta jota toivoit.",
      },
    ],
  },
  scenario: {
    kicker: "Esimerkki",
    h2: "Oikea tiistai, ei iskulausetta",
    setup: "77 km ultraan on kuusi viikkoa.",
    weekTitle: "Ja tässä viikko jonka se kirjoittaa",
    writtenLabel: "Kirjoitettu",
    shownLabel: "Viiden tunnin yön jälkeen",
    changeNote:
      "Yksi treeni muuttui, ja suunnitelma kertoo miksi. Muu viikko on koskematon eikä kisapäivä siirtynyt.",
    facts: [
      { label: "Uni viime yönä", value: "5 tuntia" },
      { label: "Eilen", value: "32 km pitkä juoksu" },
      { label: "Oikea polvi", value: "2/10" },
    ],
    says: "Mitä viikko tekee",
    actions: [
      "Jätä tämän päivän vedot",
      "45–60 min helppoa tilalle",
      "Pidä pitkä helppona. Älä lisää kilometrejä kuroaksesi",
      "Pitkällä juo noin 500–750 ml/h — määrä jonka olet jo harjoitellut. Älä kokeile uutta geeliä",
      "Katso huomenna uudestaan",
    ],
    note: "Ei diagnoosi. Jos polvi turpoaa, lukittuu tai pahenee, mene lääkäriin. Tässä muutetaan vain treeniviikkoa.",
  },
  firstWeek: {
    kicker: "Ensimmäiset kaksi viikkoa",
    h2: "Mitä tapahtuu kun kirjaudut",
    lead: "Valitse tavoitepäivä. Kolme viikkoa ilmestyy kalenteriin. Jos sessio oli rikki tai johonkin sattuu, seuraavat päivät kirjoitetaan uusiksi. Retki pysyy siinä mihin sen laitoit.",
    days: [
      {
        day: "Päivä 1",
        title: "Valitse tavoite ja rakenna viikko",
        body: "77 km, alppipäivä tai pelkkä moottori. Seuraavat kolme viikkoa ilmestyvät kalenteriin.",
      },
      {
        day: "Päivä 3",
        title: "Merkitse miltä tiistai tuntui",
        body: "Lyhyt uni, kolotus, tai treeni joka tuntui rikkinäiseltä: merkitset sen. Seuraava kova päivä kirjoitetaan kevyemmäksi. Tavoitepäivä pysyy.",
      },
      {
        day: "Päivä 6",
        title: "Juokse ensimmäinen pitkä",
        body: "Niin kevyttä että puhut. Sama juoma jota jo käytät. Jos viikko oli sekava, tämä lenkki on lyhyempi. Älä kiritä kilometreillä.",
      },
      {
        day: "Päivä 7",
        title: "Kirjaa viikko jonka oikeasti juoksit",
        body: "Mitä teit, mitä jätit, mikä kolotti. Viikko kaksi rakennetaan siitä, ei viikosta jonka aioit juosta.",
      },
    ],
  },
  guidesIndex: {
    kicker: "Oppaat",
    h2: "Treenikysymykset kirjoitettuna",
    lead: "77 km ja kuusi viikkoa. 100 km aika jaloilla. Väsymys. Alppipäivät. Kisaviikon lista.",
    cta: "Avaa oppaat",
    read: "Lue",
  },
  pricing: {
    kicker: "Hinta",
    name: "Ridgework-jäsenyys",
    price: "€19",
    freeTag: "Ilmainen",
    per: "/kk",
  },
  checkout: {
    kicker: "Aloita",
    h2: "Kirjoita tämä viikko",
    lead: "Tee tili. Ei korttia 14 päivään. Lisää se milloin tahansa jatkaaksesi.",
    name: "Nimi",
    email: "Sähköposti",
    submit: "Aloita 14 pv ilmaiseksi",
    note: "Peru pöydästä. 14 päivän aikana Polar ei veloita. Ei diagnooseja. Olet vastuussa vuoristo- ja treeniturvallisuudesta.",
    successTitle: "Kortti tallessa",
    successBody: "14 päivää 0 €. Sitten 19 €/kk ellet peru ensin.",
    daysLeft: "päivää jäljellä kokeilussa",
    payTitle: "Lisää kortti jatkaaksesi",
    payBody:
      "Ilmainen kokeilusi on päättynyt. Lisää kortti jatkaaksesi — 19 €/kk ellet peru ensin.",
    payCta: "Maksa kortilla",
    trialLeft: "{n} päivää jäljellä kokeilussa",
    trialNoCard: "{n} päivää jäljellä, ei korttia vielä. Lisää se milloin tahansa jatkaaksesi.",
    trialOn: "Kortti tallessa. Ensimmäinen veloitus 14 päivän jälkeen, ellet peru.",
    subscribed: "Tilaus voimassa · 19 €/kk",
    payFail: "Kassa ei auennut. Yritä uudelleen, tai kirjoita support@ridgework.org mitä näit.",
    closedTitle: "Korttimaksut eivät ole vielä auki",
    closedBody:
      "Ridgework ei ota maksuja ennen kuin yhtiön rekisteröinti on valmis. Mitään ei voi veloittaa sillä välin — korttia ei tallenneta mihinkään.",
    paying: "Avataan kassaa…",
    dueToday: "Maksettavaa tänään",
    dueAmount: "0 €",
    terms:
      "Polar ottaa kortin. Tänään 0 €, 14 päivää. Sitten 19 €/kk ellet peru ennen 14 päivän loppua. Sen jälkeen tilaus uusiutuu joka kuukausi kunnes perut pöydästä. Hinnat euroina. Polar on maksunvälittäjä (merchant of record).",
    includesTitle: "14 päivään kuuluu",
    includes: [
      "Tämän viikon treenit kirjoitettuna: mitä teet, miltä sen pitää tuntua, kuinka kauan",
      "Kerrot milloin pitää olla valmis. Viikko rakennetaan siitä taaksepäin",
      "Kävely, hölkkä, vaellus tai pyörä — samat minuutit lasketaan",
      "Peru 14 päivän aikana, niin Polar ei veloita",
    ],
    afterLine: "Päivästä 14 eteenpäin jäsenyys on 19 €/kk kunnes perut.",
    chipCancel: "Peru milloin tahansa",
    chipSupport: "support@ridgework.org",
    chipMerchant: "Laskuttaja Polar",
    cancelCta: "Peru",
    cancelConfirm:
      "Perutaanko nyt? 14 päivän kokeilussa Polar ei veloita. Maksetun kuukauden jälkeen pääsy kestää sen kuun loppuun.",
    cancelYes: "Kyllä, peru",
    cancelKeep: "Pidä",
    canceling: "Perutaan…",
    canceledNow: "Peruttu. Polar ei veloita.",
    canceledLater: "Peruttu. Pääsy kestää jo maksetun jakson loppuun.",
    manageCta: "Kortti ja laskut",
    cancelFail: "Peruutus ei onnistunut tästä. Avaa Kortti ja laskut.",
  },
  faq: {
    h2: "Kysyttyä",
    items: [
      {
        q: "Mikä Ridgework on?",
        a: "Kirjoitettu treeniviikko polulle, ultralle ja alppipäiville. Kerrot milloin pitää olla valmis. Viikko ilmestyy kalenteriin.",
      },
      {
        q: "Mitä 5 euroa kuussa tarkoittaa?",
        a: "Se on nykyinen hinta 14 ilmaisen päivän jälkeen. Korttia ei tarvita aloittaessa — lisää se milloin tahansa jatkaaksesi päivän 14 jälkeen.",
      },
      {
        q: "Voiko perua?",
        a: "Kyllä, milloin tahansa kortin lisäämisen jälkeen. Pöydässä on Peru-nappi. Ilman korttia mitään ei veloiteta lainkaan. Maksetun kuukauden jälkeen pääsy kestää sen kuun loppuun.",
      },
      {
        q: "Voiko minulta veloittaa huomaamatta?",
        a: "Jos et lisännyt korttia, pöytä pysähtyy kunnes lisäät sen — mitään ei veloiteta automaattisesti. Jos lisäsit kortin, tilaus jatkuu 19 €/kk ellet peru ensin.",
      },
      {
        q: "Pitääkö kortti antaa heti?",
        a: "Ei. Korttia ei kysytä missään kohtaa sivustoa. Kun maksut avautuvat, jäsenyys on 19 €/kk ja sinulta kysytään ensin.",
      },
      {
        q: "Onko tämä lääketiedettä tai valmennusta livenä?",
        a: "Ei kumpaakaan. Saat viikon paperille. Polvi lääkärille, vuori itsellesi.",
      },
      {
        q: "Päivittyykö ohjelma itsestään?",
        a: "Tuotteessa kyllä. Kolme viikkoa on aina valmiina. Kun kirjaat viikon, seuraava ilmestyy. Väsymys lyhentää tätä viikkoa. Se ei siirrä kisaa.",
      },
      {
        q: "Miksi enemmän aikaa auttaa?",
        a: "Kevyt aerobinen volyymi kertyy hitaasti. Kuuden viikon ikkuna saa silti kirjoitetun viikon. Pohjaa on vain vähemmän.",
      },
      {
        q: "Kuka tämän tekee?",
        a: "Ridgework, Ranska. Tuki: support@ridgework.org.",
      },
      {
        q: "Millä kielillä sivu on?",
        a: "Englanti, suomi, ranska ja saksa.",
      },
      {
        q: "Entä tietosuoja?",
        a: "EU ja Ranska. Emme myy dataa mainoksiin. Katso tietosuojaseloste.",
      },
      {
        q: "Miten saan apua?",
        a: "support@ridgework.org. Vastaamme 24–48 tunnissa.",
      },
    ],
  },
  disclaimer: {
    h2: "Vastuuvapaus",
    body: "Ridgework kirjoittaa treeniviikkoja polulle ja vuorille. Se ei ole lääkinnällinen laite eikä korvaa lääkäriä, opasta tai pelastusta. Tutkimusviitteet ohjaavat viikon rakennetta; ne eivät ole reseptejä. Olet vastuussa turvallisuudesta vuorilla ja treenissä.",
  },
  foundingPage: {
    kicker: "Perustajille",
    h1: "Aloita ensimmäisestä viikosta",
    lead: "Sama treeni. Ei korttia.",
    trial: "Ei korttia. Jäsenyys on 19 €/kk kun maksut avautuvat.",
    note: "Korttia ei kysytä missään. 19 €/kk kun maksut avautuvat — se on ainoa hinta tällä sivulla.",
    back: "← Ridgework",
    title: "Perustajahinta, Ridgework",
    description: "Viikkotreeni. Ei korttia aloittaessa. 19 €/kk kun maksut avautuvat.",
  },
  legalPage: {
    title: "Oikeudelliset tiedot",
    updated: "Päivitetty: syyskuu 2026",
    lead: "Ranskan laki (LCEN art. 6 III) vaatii sivustoa nimeämään julkaisijansa ja ylläpitäjänsä. Tämä sivu on se tieto. Mitään ei ole piilotettu yhteydenottolomakkeen taakse.",
    publisherTitle: "Julkaisija",
    labels: {
      name: "Nimi",
      form: "Yhtiömuoto",
      address: "Rekisteröity osoite",
      phone: "Puhelin",
      siren: "SIREN",
      vat: "ALV-numero",
      capital: "Osakepääoma",
      director: "Julkaisusta vastaava",
      email: "Sähköposti",
    },
    pending: "Ei vielä julkaistu",
    pendingNote:
      "Ridgework ei ole vielä rekisteröity yhtiö eikä ota vastaan maksuja. Yllä merkityt kentät täytetään rekisteröinnin valmistuttua; siihen asti mitään ei myydä eikä korttia veloiteta koskaan.",
    hostTitle: "Ylläpito ja infrastruktuuri",
    hostLead: "Kuka koneita oikeasti ajaa, mitä kukin tekee ja missä data sijaitsee.",
    hostRole: "Tehtävä",
    hostRoles: {
      vercel: "Ylläpitäjä — sivusto ja sen palvelinfunktiot",
      neon: "Tietokanta — tilit, profiilit, treenisuunnitelmat",
      resend: "Tapahtumaposti — vahvistus- ja salasanalinkit",
      cloudflare: "DNS ja domainille tulevan postin reititys",
    },
    hostRegion: "Alue",
    hostContact: "Yhteystieto",
    contactTitle: "Yhteystiedot",
    contactBody: "Kirjoita support@ridgework.org. Vastaajana on ihminen, 24–48 tunnissa.",
  },
  termsPage: {
    title: "Käyttöehdot",
    updated: "Päivitetty: syyskuu 2026",
    body: [
      "Ridgework kirjoittaa treeniviikkoja polulle ja vuorille. Tämä ei ole hoitoa eikä diagnooseja. Hinta: 14 päivää ilmaiseksi, sitten 19 €/kk. Peru milloin tahansa (support@ridgework.org). 14 päivän aikana peruminen tarkoittaa ettei veloiteta. Olet vastuussa treeni- ja vuoristoturvallisuudesta. Ranskan ja EU:n pakottavia kuluttajanoikeuksia ei rajata.",
    ],
  },
  privacyPage: {
    title: "Tietosuojaseloste",
    updated: "Päivitetty: syyskuu 2026",
    body: [
      "Keitä olemme. Ridgework on tässä kuvatun henkilötiedon rekisterinpitäjä. Nimemme, osoitteemme ja ylläpitäjämme on julkaistu kokonaisuudessaan Oikeudelliset tiedot -sivulla. Kysymykset ja kaikki alla mainitut pyynnöt osoitteeseen support@ridgework.org — vastaajana on ihminen.",
      "Ei seurantaa. Ridgework ei käytä analytiikkaa — ei omaa eikä kolmannen osapuolen. Ei mainospikseliä, ei sormenjälkitunnistusta, ei evästebanneria, koska ei ole mitään mihin suostua. Ainoa asettamamme eväste pitää sinut kirjautuneena, se on välttämätön ja katoaa kun kirjaudut ulos.",
      "Tilisi. Nimi, sähköpostiosoite ja salasanan tiiviste. Salasanaa itseään emme koskaan tallenna. Peruste: sopimuksen täyttäminen — ilman tiliä ei ole suunnitelmaa näytettäväksi.",
      "Miten harjoittelet. Se mitä kerroit alkukyselyssä: laji, tavoite, huippupäivä, viikkotunnit, pisin viimeaikainen suoritus, kokemus, mitkä päivät ja kuinka kauan voit harjoitella, maasto, varusteet ja rajoitteet kuten vuorotyö tai lyhyet yöunet. Peruste: sopimuksen täyttäminen. Tästä suunnitelma kirjoitetaan; ilman sitä ei ole tuotetta.",
      "Miltä tuntuu. Päivittäinen kirjaus: uni, lihasarkuus, väsymys, stressi ja motivaatio asteikolla 1–5, sekä kyllä/ei-tieto siitä rajoittaako jokin harjoittelua juuri nyt. Peruste: sopimuksen täyttäminen. Nämä ovat subjektiivisia harjoitustietoja, eivät kliinisiä mittauksia, emmekä kysy emmekä halua diagnooseja, lääkityksiä, tutkimustuloksia tai muita potilastietoja. Ridgework ei ole terveydenhuollon palvelu eikä tee diagnooseja.",
      "Mitä teit. Mikä harjoitus oli suunniteltu, merkitsitkö sen tehdyksi, väliin jääneeksi vai siirretyksi, ja kirjaamasi minuutit. Peruste: sopimuksen täyttäminen — juuri tämä antaa suunnitelman mukautua siihen viikkoon joka sinulla oikeasti oli.",
      "Integraatiot, vain pyynnöstä. Kalenterisyöte luo harjoituksillesi salaisen osoitteen. intervals.icu:n kytkeminen tallentaa liittämäsi API-avaimen, jotta voimme työntää harjoitukset sinne. Molemmat ovat pois päältä kunnes kytket ne, molemmat voi katkaista, ja katkaisu poistaa tallennetun. Peruste: suostumus.",
      "Maksut. Niitä ei oteta vastaan tällä hetkellä; kassa on kiinni. Kun se avataan, korttimaksut hoitaa Polar merchant of record -roolissa. Meillä on tilauksesi tila, ei koskaan korttinumeroasi.",
      "Kuka muu näkee. Vain palvelun ajavat toimittajat, listattuna osoitteineen ja alueineen Oikeudelliset tiedot -sivulla: Vercel (ylläpito, Pariisin alue), Neon (tietokanta, Frankfurt), Resend (vahvistus- ja salasanaviestit, Irlanti) ja Cloudflare (DNS ja postin reititys). Kukin toimii ohjeidemme mukaan käsittelysopimuksen alla. Emme myy henkilötietoja emmekä jaa niitä mainontaan.",
      "Tieto EU:n ulkopuolella. Nuo toimittajat ovat yhdysvaltalaisia yhtiöitä. Tieto säilytetään EU:ssa siellä missä toimittaja sen tarjoaa — tietokanta on Frankfurtissa ja sähköposti Irlannissa — mutta tukipääsy Yhdysvalloista on mahdollista. Siirrot nojaavat komission vakiosopimuslausekkeisiin ja, toimittajan ollessa sertifioitu, EU–US Data Privacy Frameworkiin.",
      "Kuinka kauan. Tili ja harjoitushistoria säilyvät niin kauan kuin tili on olemassa. Poista tili, niin poistamme ne — pois lukien se mitä kirjanpito tai laki vaatii säilyttämään sitten kun toiminta alkaa, ja senkin vain lain vaatiman ajan.",
      "Oikeutesi. Voit pyytää kopion tiedoistasi, oikaista niitä, poistaa ne, rajoittaa tai vastustaa käyttöä, siirtää ne koneluettavassa muodossa, ja peruuttaa integraatioiden suostumuksen milloin tahansa. Kirjoita support@ridgework.org. Vastaamme kuukauden kuluessa, yleensä huomattavasti nopeammin.",
      "Valitukset. Jos vastauksemme ei tyydytä, voit tehdä valituksen Ranskan valvontaviranomaiselle: CNIL, 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, tai cnil.fr. Voit valittaa myös oman asuinmaasi viranomaiselle.",
      "Muutokset. Jos tämä seloste muuttuu olennaisesti, kerromme siitä tällä sivulla ja, kun muutos koskee jo antamiesi tietojen käyttöä, sähköpostitse.",
    ],
  },
  examplePage: {
    title: "Kokeile oikeaa päivää — Ridgework",
    description: "Siirrä liukusäätimiä. Katso miten treeni muuttuu. Ei vaadi tiliä.",
    back: "← Ridgework",
    kicker: "Live-esimerkki",
    h1: "Tämä on oikea päivä, ei kuvakaappaus",
    lead: "Vedä alla olevia liukusäätimiä sen mukaan miltä oikeasti tuntuu jonain aamuna. Katso miten tämän päivän treeni ja perustelut muuttuvat mukana — sama pöytä jonka kirjautunut käyttäjä näkee, ajaen esimerkki-50 km-ultraohjelmaa.",
    noteTitle: "Mitään ei tallenneta",
    noteBody:
      "Tämä esimerkki nollautuu kun poistut. Tee tili saadaksesi oman viikkosi, rakennettu omasta lajistasi, tavoitteestasi ja tavoitepäivästä — ilmaiseksi, ei korttia.",
  },
  sourcesPage: {
    title: "Lähteet — Ridgework",
    description:
      "Kaikki treeniviikkojen taustalla olevat julkaisut ja mihin kutakin oikeasti käytetään.",
    back: "← Ridgework",
    kicker: "Metodi",
    h1: "Jokainen lähde ja mihin sitä käytetään",
    lead: "Etusivulla on ne neljä julkaisua jotka vastaavat suoraan jotain tuotteessa näkyvää mekanismia. Tässä on koko lista, mukaan lukien luettu tausta joka muokkasi ajattelua mutta ei aja mitään yksittäistä ominaisuutta.",
    noteTitle: "Mitä viittaus tässä ei tarkoita",
    noteBody:
      "Julkaisu tällä listalla ei ole väite siitä että Ridgework toistaa sen tuloksen sinulle. Julkaistut keskiarvot kuvaavat ryhmiä, eivät sinun tiistaitasi. Kun lähde on muokannut oikeaa sääntöä, metodiosio nimeää sen säännön. Loput on taustalukemista, ja sanomme sen mieluummin ääneen kuin täytämme sivua viittauksilla.",
  },
  appPage: {
    title: "Tämä viikko, Ridgework",
    kicker: "Treeni",
    h1: "Tämän viikon treeni",
    lead: "Muutama fakta siitä miten treenaat. Tämän päivän sessio seuraa unta, väsymystä ja jo kirjoitettua viikkoa. Väsynyt päivä treenaa vähemmän. Tavoitepäivä pysyy.",
    lockedTitle: "Kirjaudu jotta viikko tallentuu",
    lockedBody: "Tilin takana ohjelma, viikko ja loki pysyvät tallessa.",
    trialLabel: "14 päivän kokeilu",
    testBanner: "14 päivää ilmaiseksi, ei korttia. Sitten 19 €/kk jos lisäät sen.",
    signInToTrain: "Kirjaudu, valitse tavoitepäivä. 14 päivää ilmaiseksi, ei korttia.",
    tabs: {
      today: "Tänään",
      plan: "Ohjelma",
      week: "Viikko",
      prep: "Päivä",
      log: "Näin teet",
      profile: "Sinä",
      whatIf: "Entä jos",
      passport: "Passi",
      more: "Lisää",
    },
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
    verifyTitle: "Tarkista sähköpostisi",
    verifyBody:
      "Jos osoite pystyy vastaanottamaan postia, vahvistuslinkki on matkalla — tili ei ole käytössä ennen kuin avaat sen. Ei mitään muutamassa minuutissa? Katso roskaposti ja kirjoita sitten support@ridgework.org.",
    forgotLink: "Unohtuiko salasana?",
    forgotTitle: "Lähetä palautuslinkki",
    forgotBody: "Kirjoita osoite jolla rekisteröidyit. Linkki toimii kerran ja vanhenee tunnissa.",
    forgotSend: "Lähetä linkki",
    resetSentTitle: "Tarkista sähköpostisi",
    resetSentBody:
      "Jos osoitteella on tili, palautuslinkki on matkalla. Emme kerro kumpi — se paljastaisi kysyjälle ketkä ovat asiakkaitamme.",
    setPasswordTitle: "Valitse uusi salasana",
    setPasswordBody: "Vähintään 8 merkkiä. Tämä kirjaa sinut ulos muualta.",
    newPassword: "Uusi salasana",
    setPasswordCta: "Tallenna ja kirjaudu",
    resetDoneTitle: "Salasana vaihdettu",
    resetDoneBody: "Kirjaudu sisään uudella.",
    linkExpiredTitle: "Linkki on käytetty",
    linkExpiredBody: "Palautuslinkki toimii kerran ja on voimassa tunnin. Pyydä uusi.",
    alreadyRegistered:
      "Osoitteella on jo tili. Kirjaudu sisään, tai palauta salasana jos et muista sitä.",
    weakPassword: "Käytä vähintään 8 merkkiä.",
    unverifiedTitle: "Vahvista osoitteesi ensin",
    unverifiedBody:
      "Tili on olemassa mutta osoitetta ei ole vahvistettu. Lähetimme linkin uudestaan.",
    resend: "Lähetä linkki uudestaan",
    resent: "Lähetetty. Anna sille hetki.",
    backToSignIn: "Takaisin kirjautumiseen",
    testNote: "14 päivää ilmaiseksi. Ei korttia. Lisää se milloin tahansa jatkaaksesi.",
  },
  dashboard: {
    enrollments: "Ohjelmasi",
    empty: "Tällä tilillä ei ole vielä ohjelmaa. Valitse alta.",
    billingTest: "14 päivää ilmaiseksi, ei korttia.",
    peak: "Tavoite",
    statusTest: "Testi",
    saved: "Tallennettu tilillesi",
  },
  tools: {
    sync: {
      tab: "Synkka",
      kicker: "Pois selaimesta",
      title: "Suunnitelmasi kelloon ja kalenteriin",
      lead: "Kaksi reittiä ulos. Kumpikaan ei vaadi keneltäkään lupaa, ja voit käyttää molempia.",
      calendarTitle: "Tilaa kalenteriisi",
      calendarLead:
        "Elävä syöte kirjoitetuista treeneistä. Lisää kerran Google-, Apple- tai Outlook-kalenteriin ja se pysyy ajan tasalla — kun väsynyt viikko kirjoittaa treenin uusiksi, kalenteri seuraa.",
      calendarCta: "Luo kalenterilinkki",
      calendarNote:
        "Kuka tahansa linkin haltija näkee suunnitellut treenisi, joten käsittele sitä kuin salasanaa. Vaihto katkaisee vanhan linkin heti; lisää uusi kalenteriin.",
      copy: "Kopioi linkki",
      copied: "Kopioitu.",
      rotate: "Vaihda linkki",
      intervalsTitle: "Työnnä intervals.icu:hun",
      intervalsLead:
        "intervals.icu on ilmainen ja siinä on oma Garmin Connect -integraatio suunnitelluille treeneille. Kytke se siellä kerran, työnnä täältä, ja treenit päätyvät kelloon.",
      intervalsNote:
        "Avaimesi jää palvelimellemme jotta työntö toimii, eikä sitä koskaan lähetetä takaisin selaimeen. Katkaisu poistaa sen. Tili on sinun — me vain välitämme siihen.",
      athleteId: "Athlete ID",
      apiKey: "API-avain",
      apiKeyHint:
        "Molemmat löytyvät intervals.icu:sta kohdasta Settings → Developer. Athlete ID näyttää tältä: i12345.",
      connect: "Kytke",
      connected: "Kytketty.",
      connectedAs: "Kytketty tunnuksella",
      disconnect: "Katkaise",
      push: "Työnnä kirjoitetut viikot",
      pushing: "Työnnetään…",
      pushed: "Treenit työnnetty.",
      lastPushed: "Viimeksi työnnetty",
      failed: "Ei onnistunut. Yritä uudelleen tai kirjoita support@ridgework.org.",
    },
    week: {
      save: "Tallenna viikko",
      saved: "Tallennettu tälle laitteelle",
      days: ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"],
      types: { easy: "Kevyt", steady: "Tasainen", hard: "Kova", rest: "Lepo" },
      session: "Mitä oikeasti juoksit",
      readiness: "Miltä kroppa tuntuu tällä viikolla?",
      readinessLead:
        "Tämä muuttaa vain treeniä. Väsynyt = vähemmän työtä. Rikki = lepo laadun sijaan.",
      levels: { fresh: "Virkeä", ok: "Ihan ok", tired: "Väsynyt", wrecked: "Rikki" },
      notes: {
        fresh: "Pidä kirjoitettu viikko. Ei extra-sankarointia.",
        ok: "Pidä kuorma. Älä lisää toista kovaa päivää.",
        tired: "Kovat ja tasaiset sessiot putoavat kevyiksi. Treenaat vähemmän.",
        wrecked: "Kovat ja tasaiset muuttuvat lepoksi. Kevyt pysyy kevyenä. Jatka ensi viikolla.",
      },
    },
    pace: {
      title: "Mitä sanat tarkoittavat",
      lead: "Jos et ole treenannut, aloita kävellen. Puhevauhti tarkoittaa että saat kokonaisen lauseen ulos. Käytä kelloa jos on. Puhelimen ajastin ja puhetesti riittävät.",
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
          watch:
            "Noin 60–75 % max-sykkeestä, tai alle aerobisen kynnyksen jos sinulla on testi. Polarisoitu suunnitelma pitää ~80 % ajasta tässä.",
          none: "Puhetesti. Jos mäki vie lauseen, kävele kunnes puhe palaa.",
        },
        {
          zone: "Tasainen · korkea Z2 / matala Z3",
          feel: "Vain lyhyitä fraaseja. Hallittu, ei kisa.",
          watch: "Noin 75–85 % max-sykkeestä. Älä pinoa tätä väsyneelle viikolle.",
          none: "Voit vastata kysymykseen, et kertoa tarinaa.",
        },
        {
          zone: "Kova / laatu · Z3–4",
          feel: "Muutama sana. Yksi annos viikossa, tai ei yhtään jos väsyttää.",
          watch:
            "Kynnys: ~85–92 % max HR, tai vauhti jota jaksaisit ~30–40 min. Pidä se viikon ainoana kovana.",
          none: "Hengitys on äänekästä. Et juttelisi. Lopeta jos tekniikka tai kolotus pahenee.",
        },
        {
          zone: "Kiipeily / voima",
          feel: "Ei sykevyöhyke. Ote, lock-offit ja taito nostavat sykettä vaikka jalat voisivat puhua.",
          watch: "Unohda vyöhykkeet seinällä. Laske laadukkaat välit tai sarjat, sitten lopeta.",
          none: "Lopeta kun tekniikka hajoaa, ei kun olet tyhjä. Voima on lyhyt: veto, hang, core, antagonistit.",
        },
      ],
      alpineTitle: "Alppiviikot eivät ole pelkkää kävelyä",
      alpine:
        "Nousut ja vaelluspäivät pysyvät puhevauhdissa. Spesifissä on kiipeilysessio (kallio, jää tai sali) ja lyhyt voima-annos (lock-offit, leuat, core). House/Johnston: ensin aerobinen pohja, sitten kiipeilyvoima ja tekniikka, sitten vuoripäivät rinkalla. Köysivälit ovat työtä. Väsymys laskee niitä silti.",
    },
    prep: mountainFi,
    log: {
      empty: "Ei treenimuistiinpanoja tällä viikolla.",
      decision: "Mitä teit tai muutit",
      why: "Miksi (uni, väsymys, elämä)",
      add: "Lisää",
      clear: "Tyhjennä loki",
    },
    plan: planFi,
    athlete: athleteFi,
    passport: passportFi,
    whatIf: whatIfFi,
  },
  fieldPage: fieldFi,
};
