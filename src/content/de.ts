import { fieldDe } from "./field";
import { planDe } from "./plan-tools";
import { athleteDe } from "./athlete-copy";
import { mountainDe } from "./mountain-prep";
import { passportDe, whatIfDe } from "./passport";
import type { Copy } from "./types";

export const de: Copy = {
  metaTitle: "Ridgework — Trainingsprogramme für Trail, Alpin und Höhe",
  metaDescription:
    "Was du diese Woche läufst — 20-km-Trail, 50 oder 100 km Ultra, Alpentag. Eine müde Woche wird leichter. 14 Tage kostenlos, ohne Karte.",
  footerTag: "Bergtraining, das der Woche folgt, die du wirklich hast.",
  legalEntity: "Ridgework, Frankreich.",
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
    account: "Konto",
  },
  cta: {
    start: "14 Tage kostenlos starten",
    pricing: "Preise ansehen",
    openTools: "Tools öffnen",
  },
  hero: {
    kicker: "Bergtraining",
    h1: "Trainiere für den Tag, auf den es ankommt.",
    lead: "Wähle den Tag, an dem du bereit sein musst. Jede Woche wird von dort rückwärts geschrieben — und neu geschrieben, wenn das Leben dazwischenkommt.",
    trial: "Kostenlos, solange die Registrierung des Unternehmens läuft. Keine Karte, nichts zu kündigen.",
  },
  about: {
    kicker: "Was das ist",
    h2: "Ein Trainingstisch für Leute, die in die Berge gehen",
    lead: "Die Woche wird aus den Papers geschrieben, die wir zitieren, dann um Schlaf, Reisen, Kinder und das Material gebogen, das du hast. Fragen gehen an support@ridgework.org. Saisons bleiben auf einem Pass, den du privat halten kannst.",
    cards: [
      {
        title: "Die Woche kommt aus Papers, nicht aus Stimmung",
        body: "Lockeres Volumen, eine harte Einheit wenn du frisch bist, Taper in den Tag. Die Muster stehen auf der Methodenseite, mit Quellen. Das ist eine Startwoche, keine Diagnose.",
      },
      {
        title: "Leben ist eine Eingabe",
        body: "Dienstag verpasst, Dienstreise, keine Steigeisen, kurze Nacht. Der Plan nennt die Änderung und warum. Das Peak-Datum bleibt, außer du schiebst es.",
      },
      {
        title: "Ein Mensch antwortet",
        body: "support@ridgework.org ist ein Mensch. Die Methode bleibt von Woche zu Woche. Im Gebirge entscheidest du.",
      },
      {
        title: "Saisons, aufgeschrieben",
        body: "Der Pass bist du gegen letztes Jahr: längste Tage, lockeres Volumen, was kaputtging. Mit einem Trainer teilen oder geschlossen halten.",
      },
    ],
  },
  method: {
    kicker: "Methode",
    h2: "Lockeres Volumen, eine Qualitätsdosis, Taper in den Tag",
    lead: "Wir stützen uns auf eine kleine Menge gut zitierter Papers: Intensitätsverteilung, Belastung als Planungseingabe, Taper als Muster. Checklisten und Wochenstrukturen — kein medizinischer Rat.",
    cards: [
      {
        title: "Intensitätsverteilung",
        body: "Seiler & Kjerland (2006): etwa 75 % leichte Einheiten bei Junior-Langläufern. Seilers Review 2010 beschreibt polarisiert oder pyramidal als das, was Ausdauerathleten wirklich tun. Esteve-Lanao et al. (2007): mehr Zeit in der leichten Zone, bessere Laufleistung. Stöggl & Sperlich (2014): polarisierte Blöcke bewegten Schlüsselgrößen stärker. Ridgework startet dort. Du kannst es ändern.",
      },
      {
        title: "Last als Wocheneingabe",
        body: "Fosters Session-RPE (2001) ist eine Zahl: wie hart es sich anfühlte, mal Dauer. Bourdon et al. (2017): äußere Arbeit und innere Antwort aufschreiben, dann die nächste Einheit anpassen. Du markierst die Einheit. War sie kaputt, oder tut etwas weh, wird der nächste harte Tag leichter geschrieben. Das ist Lastmonitoring. Ridgework entscheidet nicht, dass du müde bist, und es ist kein medizinischer Test.",
      },
      {
        title: "Taper als Planungsmuster",
        body: "Mujika & Padilla (2003): Volumen sinkt typisch vor dem Tag, etwas Intensität bleibt in kürzeren Dosen. Form zeigt sich, statt unter Restmüdigkeit begraben zu werden. Wir schreiben das als 10–14-Tage-Block. Schlaf und Kit schlagen Extra-Kilometer.",
      },
    ],
    caveatsTitle: "Ehrliche Einschränkungen",
    caveats: [
      "Individuelle Reaktion variiert — Alter, Historie, Gelände und Alltagsstress ändern, was „funktioniert“.",
      "Publizierte Mittelwerte sind kein medizinischer Rat und ersetzen keine Fachperson bei Gesundheitsfragen.",
      "Das schreibt eine Startwoche aus dem, was du angibst. Es sieht dich nicht trainieren und kennt nur die Einheiten, die du einträgst.",
    ],
    sourcesTitle: "Quellen (Crossref-verifiziert)",
    teaserH2: "Was das versprechen kann und was nicht",
    teaserLead:
      "Die meisten Tage locker, eine harte Einheit wenn du frisch bist, ein Tapering in den Tag — diese Form kommt aus einer Handvoll gut zitierter Ausdauerarbeiten, nicht aus einer Vorlage mit deinem Namen darauf. Hier ist der Teil, den die meisten Trainingsprodukte weglassen.",
    teaserCta: "Die ganze Methode lesen",
    allSourcesCta: "Alle Quellen, und wofür jede verwendet wird",
  },
  projects: {
    kicker: "Beispielprojekte",
    h2: "Kompakte Projektbriefs",
    lead: "Drei Beispielziele als Planungsobjekte. Dauer ist der Trainingsplan — aerobe Basis, spezifischer Block, Taper, damit der Peak auf den Tag fällt — nicht die Länge des Wochenendes oder des Rennens. Eine Detailzelle bleibt bis zum Konto gesperrt.",
    items: [
      {
        title: "Alpines Wochenendziel",
        fields: [
          { label: "Ziel", value: "Sicherer, effizienter Bergtag mit klaren Umkehrregeln" },
          {
            label: "Plan",
            value:
              "10 Wochen — 6 Wo. aerobe + Vert-Basis, 3 Wo. spezifisch, 10–14 Tage Taper ins Wetterfenster",
          },
          {
            label: "Fokus",
            value:
              "Leichtes Volumen leicht halten; Gesprächs-Vert dazu; Peak fürs Wetterfenster, nicht für Extra-Kilometer",
          },
          {
            label: "Risiko / Entscheidung",
            value: "Forecast-Fenster, Freeze–Thaw, Bail-Routen, Fatigue-Gate am Vorabend",
          },
        ],
      },
      {
        title: "Erster 50-km-Trail",
        fields: [
          {
            label: "Ziel",
            value: "Gut ankommen, nicht nur ankommen — Ernährung und Tempo unter Kontrolle",
          },
          {
            label: "Plan",
            value:
              "6 Monate (24 Wochen) — 10 Wo. aerobe Basis, 12 Wo. Long-run-Aufbau, 10–14 Tage Taper auf die Rennwoche",
          },
          {
            label: "Fokus",
            value:
              "Zuerst leichtes Volumen, dann Long-run-Progression und eine Qualitätseinheit; Peak in der Rennwoche",
          },
          {
            label: "Session-Rezept",
            value:
              "Woche 20 (Ende spezifisch): 3×12 min im Marathon-Effort auf rollendem Trail, 4 min locker; Hitze- und Niggle-Gates vor dem Start. Dann 10–14 Tage Taper.",
            locked: true,
          },
        ],
      },
      {
        title: "Hütte-zu-Hütte-Traverse",
        fields: [
          {
            label: "Ziel",
            value: "Drei verbundene Tage, Wetter- und Materialentscheidungen schon notiert",
          },
          {
            label: "Plan",
            value:
              "8 Monate — aerobe/Wander-Basis Winter–Frühling, 10 Wo. Pack und Back-to-backs, 10–14 Tage Taper in Tag 1",
          },
          {
            label: "Fokus",
            value:
              "Beine in den Basismonaten; spezifisch ist Pack + Hintereinander-Tage; Peak für Tag 1, kein Dump an Tag 3",
          },
          {
            label: "Risiko / Entscheidung",
            value: "Konvektion nachmittags, Schnee an Nordhängen, Bail-Tal, Fatigue nach Tag 1",
          },
        ],
      },
    ],
  },
  programs: {
    kicker: "Programme",
    h2: "Tour wählen — oder den Motor. Dann den Peak.",
    lead: "Du wählst, wann du in Peak-Form sein willst. Kein Rennen? Starte mit dem aeroben Motor: mehr Arbeit bei niedriger Herzfrequenz, Fett als Standardkraftstoff. Jede Länge geht — länger ist klar besser.",
    columns: {
      name: "Programm",
      duration: "Dauer",
      focus: "Fokus",
      recipe: "Session-Rezept",
    },
    rows: [
      {
        id: "engine",
        name: "Aerober Motor",
        duration: "Empfohlen 16 Wochen / 4 Monate",
        focus: "Mehr Arbeit im Gesprächstempo. Fett als Standardkraftstoff. Kein Rennen nötig.",
        locked:
          "Die meisten Tage gesprächig. Der Lange wächst Richtung 90 min. Wenn du in Sätzen sprechen kannst, bist du in der Arbeit. Keine Qualitätsdosis — der Motor ist die Qualität.",
        pull: "Wenn du einen ganzen Satz rauskriegst, bist du in der Arbeit.",
        layout: "textFirst",
      },
      {
        id: "trail20",
        name: "20-km-Trail",
        duration: "Empfohlen 10 Wochen",
        focus: "Lockeres Volumen, eine Qualitätsdosis, Langer auf 90–110 min",
        locked:
          "Woche 8: 6×3 min im 10-km-Tempo auf rollendem Trail, 2 min locker. Langer 90–110 min. Dann 7 Tage Taper.",
        layout: "sessionLead",
      },
      {
        id: "fifty",
        name: "50-km-Ultra",
        duration: "Empfohlen 24 Wochen / 6 Monate",
        focus: "Aerobe Basis, dann Long-run-Progression, Peak in der Rennwoche",
        locked:
          "Woche 20 (Ende spezifisch): 3×12 min im Marathon-Effort auf rollendem Trail, 4 min locker. Dann 10–14 Tage Taper.",
        tag: "Oft der erste Ultra",
        pull: "Gut ankommen, nicht nur ankommen.",
        layout: "wide",
      },
      {
        id: "ultra100",
        name: "80–120-km-Ultra",
        duration: "Empfohlen 36 Wochen / 9 Monate",
        focus: "Monate lockere Zeit auf den Füßen, späte Back-to-backs, vier Wochen Taper",
        locked:
          "Woche 30: Sa 4–5 h lockerer Trail, So 2,5–3 h locker. Die Woche bleibt gesprächig. Dann 3–4 Wochen Taper.",
      },
      {
        id: "alpine",
        name: "Alpentag",
        duration: "Empfohlen 10 Wochen",
        focus: "Aerobe Zustiege, Klettern und Kraft, dann Bergtag",
        locked:
          "Woche 8: Klettereinheit (Fels/Eis/Halle) + 1.200–1.800 m Zustieg im Gesprächstempo. Kraft 30–40 Min. Müde: Klettern wird leichtes Wandern.",
        tag: "Mit Klettern",
        layout: "sessionLead",
      },
      {
        id: "traverse",
        name: "Mehrtägige Alpenroute",
        duration: "Empfohlen 32 Wochen / 8 Monate",
        focus: "Wander-Basis, dann Pack und Back-to-backs, Peak an Tag 1",
        locked:
          "Woche 28: zwei verbundene Tage, leichter Pack. Tag 2 kürzen, wenn Reste in den Beinen sitzen.",
        layout: "compact",
      },
      {
        id: "expedition",
        name: "Höhenexpedition",
        duration: "Empfohlen 40 Wochen / 10 Monate",
        focus: "Wandern und lockeres Volumen, Packtragen, Taper ist Schlaf und Kit",
        locked:
          "Woche 34: Packtragen 3–4 h auf einer Wanderung, dann Ruhe. Eine Nacht draußen, wenn das Leben es erlaubt. Taper ist Schlaf und Kit, nicht extra Höhe.",
      },
    ],
    lockHint: "Schlüsseleinheit",
    cta: "Dieses Programm starten",
  },
  who: {
    h2: "Für wen — und für wen nicht",
    forTitle: "Gebaut für",
    forItems: [
      "Ausdauerathletinnen und -athleten, die Wochen um Leben und Gelände planen",
      "Alle, die auf 20-km-Trail, 50- oder 100-km-Ultra, Alpentag, verbundene Route oder Höhenlager trainieren",
      "Alle, die ruhige Tools Motivation-Spam vorziehen",
    ],
    notTitle: "Nicht für",
    notItems: [
      "Medizinische Beratung, Diagnosen oder Behandlung",
      "Persönliches Coaching oder Live-Chat",
      "Klinische oder Notfall-Entscheidungshilfe",
    ],
  },
  what: {
    h2: "Was du bekommst",
    items: [
      {
        n: "01",
        title: "Plan vom Peak-Datum",
        body: "Du wählst, wann du peaken willst. Die Wochen werden in dieses Fenster geschrieben — Basis, spezifisch, Taper. Länger ist immer besser.",
      },
      {
        n: "02",
        title: "Das Log ändert den nächsten Tag",
        body: "Du markierst, wie die letzte Einheit war. War sie kaputt, oder tut etwas weh, wird der nächste harte Tag leichter geschrieben. Foster (2001) und Bourdon et al. (2017): interne Last ist eine Planungszahl, keine Diagnose. Das Peak-Datum bleibt.",
      },
      {
        n: "03",
        title: "Kit und Verpflegung",
        body: "Schuhe, Lagen, Trinken und Schlaf für die echte Woche.",
      },
      {
        n: "04",
        title: "Trainingslog",
        body: "Was du getan hast und warum die Last sich änderte.",
      },
    ],
  },
  week: {
    h2: "So läuft eine Woche",
    steps: [
      {
        day: "Mo",
        title: "Woche aufbauen",
        body: "Das Peak-Datum steht schon im Kalender. Die meisten Tage sind lockeres Laufen. Wenn du gut geschlafen hast, eine härtere Einheit. Ein langer Lauf später in der Woche.",
      },
      {
        day: "Di",
        title: "Schlaf und Beine",
        body: "Fünf Stunden Schlaf? Intervalle werden 45–60 Min locker. Der Renntag rückt nicht.",
      },
      {
        day: "Do",
        title: "Lockere Tage bleiben locker",
        body: "Der Großteil der Woche bleibt in einem Tempo, in dem du sprechen kannst. Kommt der Satz, bist du in der richtigen Zone.",
      },
      {
        day: "So",
        title: "Loggen was passiert ist",
        body: "Langer Lauf, Hitze, Ziepen aufschreiben. Die nächste Woche startet dort, nicht beim Wunschplan.",
      },
    ],
  },
  scenario: {
    kicker: "Beispiel",
    h2: "Ein echter Dienstag, kein Slogan",
    setup: "77-km-Ultra in sechs Wochen.",
    weekTitle: "Und so sieht die Woche aus, die daraus entsteht",
    writtenLabel: "Geschrieben",
    shownLabel: "Nach einer Fünf-Stunden-Nacht",
    changeNote: "Eine Einheit hat sich geändert, und der Plan sagt warum. Der Rest der Woche bleibt, das Renndatum auch.",
    facts: [
      { label: "Schlaf letzte Nacht", value: "5 Stunden" },
      { label: "Gestern", value: "32 km Langer" },
      { label: "Rechtes Knie", value: "2/10" },
      { label: "Sonntag Wetter", value: "28°C" },
    ],
    says: "Was sich ändert",
    actions: [
      "Intervalle heute streichen",
      "Stattdessen 45–60 Min locker",
      "Langen auf Montag, wenn Sonntag heiß bleibt",
      "500–750 ml/h auf dem Langen trinken",
      "Morgen neu bewerten",
    ],
    note: "Keine Diagnose. Wenn das Knie anschwillt, blockiert oder schlimmer wird, zum Arzt. Hier ändert sich nur die Trainingswoche.",
  },
  firstWeek: {
    kicker: "Deine ersten 14 Tage",
    h2: "Was nach dem Login passiert",
    lead: "Du wählst ein Peak-Datum. Drei Wochen stehen im Kalender. War eine Einheit kaputt oder tut etwas weh, werden die nächsten Tage neu geschrieben. Der Termin bleibt, wo du ihn hingesetzt hast.",
    days: [
      {
        day: "Tag 1",
        title: "Peak wählen, Woche bauen",
        body: "77 km, Alpentag oder Motor. Drei Wochen erscheinen.",
      },
      {
        day: "Tag 3",
        title: "Dienstag markieren",
        body: "Kurzer Schlaf, ein Ziepen, oder eine kaputte Einheit: du markierst es. Der nächste harte Tag wird leichter geschrieben. Das Peak-Datum bleibt.",
      },
      {
        day: "Tag 6",
        title: "Die erste lange Einheit laufen",
        body: "Locker genug zum Sprechen. Das Getränk, das du schon nutzt. War die Woche unruhig, ist dieser Lauf kürzer. Keine Extra-Kilometer zum Aufholen.",
      },
      {
        day: "Tag 7",
        title: "Die Woche loggen, die du wirklich gelaufen bist",
        body: "Was du getan, was du gestrichen, was gezogen hat. Woche zwei kommt daraus, nicht aus der Woche, die du vorhattest.",
      },
    ],
  },
  guidesIndex: {
    kicker: "Guides",
    h2: "Trainingsfragen, ausgeschrieben",
    lead: "77 km und sechs Wochen. 100 km. Müdigkeit. Alpentage. Renn-Checkliste.",
    cta: "Guides öffnen",
    read: "Lesen",
  },
  pricing: {
    kicker: "Preise",
    h2: "14 Tage im Kalender. Dann 19 €/Monat.",
    lead: "Lauf zuerst eine echte Woche. Danach 19 €/Monat, wenn du bleibst. Jederzeit kündbar, auch in den 14 Tagen.",
    badge: "Aktueller Preis",
    trialBadge: "14 Tage kostenlos",
    name: "Ridgework-Abo",
    price: "€19",
    freeTag: "Kostenlos",
    freeNow: "Kostenlos, solange die Registrierung des Unternehmens läuft. Keine Karte, nichts zu kündigen. 19 €/Monat, wenn es öffnet.",
    per: "/Monat",
    blurb: "14 Tage kostenlos. Dann 19 €/Monat. Jederzeit kündbar.",
    features: [
      "Sieben Programme vom aeroben Motor bis 100 km und Alpentage",
      "19 €/Monat, solange das Abo läuft",
      "Jederzeit kündbar, auch in den 14 Tagen — dann keine Rechnung",
      "Trainingswochen, keine medizinischen Claims",
    ],
    laterTitle: "Nach den 14 Tagen",
    laterBody:
      "Wenn du bleibst, belastet Polar 19 €/Monat. Kündigst du in den 14 Tagen, wirst du nicht belastet. Später gilt: Zugang bis zum Ende der bereits bezahlten Zeit. Auf dieser Seite steht kein anderer Preis.",
  },
  checkout: {
    kicker: "Start",
    h2: "14 Tage zu 0 € starten",
    lead: "Konto anlegen. 14 Tage ohne Karte. Füge jederzeit eine hinzu, um weiterzutrainieren.",
    name: "Name",
    email: "E-Mail",
    submit: "Karte hinterlegen",
    note: "Kündige am Tisch. In den 14 Tagen belastet Polar nicht. Keine Diagnosen. Du bleibst verantwortlich für Berg- und Trainingssicherheit.",
    successTitle: "Karte hinterlegt",
    successBody: "14 Tage 0 €. Dann 19 €/Monat, außer du kündigst vorher.",
    daysLeft: "Tage übrig im Test",
    payTitle: "Karte hinzufügen zum Weitermachen",
    payBody:
      "Deine kostenlose Testphase ist vorbei. Füge eine Karte hinzu, um weiterzumachen — 19 €/Monat, außer du kündigst.",
    payCta: "Mit Karte zahlen",
    trialLeft: "{n} Tage übrig im Test",
    trialNoCard:
      "Noch {n} Tage, bisher ohne Karte. Füge jederzeit eine hinzu, um weiterzutrainieren.",
    trialOn: "Karte hinterlegt. Erste Abbuchung nach 14 Tagen, außer du kündigst.",
    subscribed: "Abo aktiv · 19 €/Monat",
    payFail: "Kasse hat nicht geöffnet. Mail an support@ridgework.org.",
    closedTitle: "Kartenzahlung ist noch nicht offen",
    closedBody:
      "Ridgework nimmt keine Zahlung an, bis die Registrierung des Unternehmens abgeschlossen ist. Deine 14 Tage laufen weiter, und in der Zwischenzeit kann nichts belastet werden.",
    paying: "Kasse wird geöffnet…",
    dueToday: "Heute fällig",
    dueAmount: "0 €",
    terms:
      "Polar nimmt die Karte. Heute 0 € für 14 Tage. Dann 19 €/Monat, außer du kündigst vor Ende der 14 Tage. Danach monatliche Verlängerung, bis du am Tisch kündigst. Beträge in EUR. Polar ist Merchant of Record.",
    includesTitle: "Die 14 Tage enthalten",
    includes: [
      "Diese Woche aufgeschrieben: was du tust, wie es sich anfühlen soll, wie lange",
      "Du sagst, wann du ready sein musst. Die Woche wird von dem Datum rückwärts gebaut",
      "Gehen, joggen, wandern oder Rad — dieselben Minuten zählen",
      "In den 14 Tagen kündigen: Polar belastet nichts",
    ],
    afterLine: "Ab Tag 14 kostet die Mitgliedschaft 19 €/Monat, bis du kündigst.",
    chipCancel: "Jederzeit kündbar",
    chipSupport: "support@ridgework.org",
    chipMerchant: "Abrechnung über Polar",
    cancelCta: "Kündigen",
    cancelConfirm:
      "Jetzt kündigen? In den 14 Tagen belastet Polar nicht. Nach einem bezahlten Monat bleibt der Zugang bis Monatsende.",
    cancelYes: "Ja, kündigen",
    cancelKeep: "Behalten",
    canceling: "Wird gekündigt…",
    canceledNow: "Gekündigt. Polar belastet nicht.",
    canceledLater: "Gekündigt. Zugang bleibt bis zum Ende der bereits bezahlten Zeit.",
    manageCta: "Karte und Rechnungen",
    cancelFail: "Kündigung hier nicht möglich. Öffne Karte und Rechnungen.",
  },
  faq: {
    h2: "FAQ",
    items: [
      {
        q: "Was ist Ridgework?",
        a: "Eine geschriebene Trainingswoche für Trail, Ultra und Alpentage. Du sagst, wann du ready sein musst. Die Woche steht im Kalender.",
      },
      {
        q: "Wie funktioniert der Preis?",
        a: "14 Tage kostenlos. Dann 19 €/Monat, wenn du bleibst. Kündigung in den 14 Tagen: keine Rechnung.",
      },
      {
        q: "Jederzeit kündbar?",
        a: "Ja. Am Tisch gibt es Kündigen. In den 14 Tagen belastet Polar nicht. Nach einem bezahlten Monat bleibt der Zugang bis Monatsende. Daneben: Karte und Rechnungen.",
      },
      {
        q: "Was passiert nach den 14 Tagen?",
        a: "Ohne Karte pausiert der Tisch, bis du eine hinzufügst — es wird nichts automatisch belastet. Mit Karte läuft das Abo weiter zu 19 €/Monat, außer du kündigst.",
      },
      {
        q: "Brauche ich eine Karte für die Testphase?",
        a: "Nein. Starte 14 Tage kostenlos ohne Karte. Füge jederzeit eine hinzu, während oder nach der Testphase, um bei 19 €/Monat weiterzutrainieren.",
      },
      {
        q: "Ist das medizinisch?",
        a: "Nein. Keine Diagnosen, keine Behandlung. Bei Gesundheit: Fachperson.",
      },
      {
        q: "Schreibt sich der Plan von allein weiter?",
        a: "Ja — im Produkt, nicht in einem Chat-Bot. Du wählst das Peak-Datum. Der Programm-Tab hält immer drei Wochen in diesem Fenster bereit. Eine frische Woche schreibt den nächsten Block. Eine müde Woche trainiert weniger; das Peak-Datum bleibt. Nach der Tour startet die nächste Saison höher.",
      },
      {
        q: "Wer steckt dahinter?",
        a: "Ridgework, Frankreich. support@ridgework.org.",
      },
      { q: "Welche Sprachen?", a: "Englisch, Finnisch, Französisch, Deutsch." },
      { q: "Daten?", a: "EU/Frankreich-Erwartungen. Siehe Privacy. Kein Verkauf für Ads." },
      { q: "Support?", a: "support@ridgework.org — Antwort in wenigen Werktagen." },
    ],
  },
  disclaimer: {
    h2: "Haftungsausschluss",
    body: "Ridgework bietet Entscheidungshilfe für Trainingsplanung und Bergtags-Prep. Kein Medizinprodukt und kein Ersatz für professionellen Rat. Zitate publizierter Forschung informieren Planungsrahmen und Checklisten; sie sind keine medizinischen Claims und keine individualisierten Vorschriften. Du bleibst für deine Sicherheitsentscheidungen verantwortlich. Keine Diagnosen. Keine Behandlungsclaims.",
  },
  foundingPage: {
    kicker: "Founding",
    h1: "Starte mit 14 Tagen kostenlos",
    lead: "Dieselben Wochen. 14 Tage kostenlos, dann 19 €/Monat.",
    trial: "14 Tage kostenlos. Dann 19 €/Monat. Jederzeit kündbar.",
    note: "14 Tage ohne Karte. Füge jederzeit eine hinzu, um für 19 €/Monat weiterzutrainieren. Das ist der einzige Preis hier.",
    back: "← Ridgework",
    title: "Founding — Ridgework",
    description: "Wöchentliches Training. 14 Tage kostenlos, dann 19 €/Monat. Jederzeit kündbar.",
  },
  termsPage: {
    title: "Nutzungsbedingungen",
    updated: "Zuletzt aktualisiert: September 2026",
    body: [
      "Ridgework schreibt Trainingswochen für Trail und Berg. Keine medizinische Versorgung, keine Diagnosen. Preis: 14 Tage kostenlos, dann 19 €/Monat. Jederzeit kündbar (support@ridgework.org). Kündigung in den 14 Tagen bedeutet keine Rechnung. Du bleibst verantwortlich für Berg- und Trainingssicherheit. Zwingende Verbraucherrechte nach französischem/EU-Recht werden nicht eingeschränkt.",
    ],
  },
  privacyPage: {
    title: "Datenschutzerklärung",
    updated: "Zuletzt aktualisiert: September 2026",
    body: [
      "Stub privacy notice (EU / France / GDPR principles). Company: Ridgework, France. Contact: support@ridgework.org. Full counsel-reviewed policy before launch. We do not sell personal data for ads. Payments via Polar. Not a medical service — do not submit sensitive health diagnoses.",
      "Rights: access, rectification, erasure, restriction, portability, objection where applicable; complaint to a French/EU authority.",
    ],
  },
  examplePage: {
    title: "Probier einen echten Tag aus — Ridgework",
    description: "Bewege die Regler. Sieh, wie sich die Einheit ändert. Kein Konto nötig.",
    back: "← Ridgework",
    kicker: "Live-Beispiel",
    h1: "Das ist ein echter Tag, kein Screenshot",
    lead: "Bewege die Regler unten so, wie du dich an manchen Morgen wirklich fühlst. Sieh, wie sich die heutige Einheit und die Begründung mitändern — derselbe Tisch, den ein angemeldeter Athlet sieht, auf einem Beispiel-50-km-Ultraplan.",
    noteTitle: "Hier wird nichts gespeichert",
    noteBody:
      "Dieses Beispiel setzt sich zurück, wenn du gehst. Leg ein Konto an für deine eigene Woche, gebaut aus deiner Sportart, deinem Ziel und deinem Peak-Datum — 14 Tage kostenlos, ohne Karte.",
  },
  sourcesPage: {
    title: "Quellen — Ridgework",
    description: "Alle Arbeiten hinter den Trainingswochen, und wofür jede tatsächlich verwendet wird.",
    back: "← Ridgework",
    kicker: "Methode",
    h1: "Jede Quelle, und wofür sie verwendet wird",
    lead: "Die Startseite zitiert die vier Arbeiten, die direkt einem im Produkt sichtbaren Mechanismus entsprechen. Das hier ist die vollständige Liste, samt der Lektüre, die das Denken geprägt hat, ohne eine bestimmte Funktion zu steuern.",
    noteTitle: "Was ein Zitat hier nicht bedeutet",
    noteBody:
      "Eine Arbeit auf dieser Liste ist keine Behauptung, dass Ridgework ihr Ergebnis für dich reproduziert. Veröffentlichte Mittelwerte beschreiben Gruppen, nicht deinen Dienstag. Wo eine Quelle eine echte Regel geprägt hat, benennt der Methodenteil die Regel. Alles andere ist Hintergrundlektüre, und das sagen wir lieber, als die Seite mit Zitaten zu füllen.",
  },
  appPage: {
    title: "Tools — Ridgework",
    kicker: "Tools",
    h1: "Training dieser Woche",
    lead: "Wähle den Tag, an dem du peak sein willst. Der rollende Plan schreibt die Wochen in dieses Fenster. Müde: weniger trainieren. Nichts hiervon ist medizinischer Rat.",
    lockedTitle: "Konto nötig",
    lockedBody:
      "Konto anlegen für 14 Tage kostenlos: Plan, Woche, Tagesvorbereitung und Log. Dann 19 €/Monat, wenn du bleibst.",
    trialLabel: "14-Tage-Test",
    testBanner: "14 Tage kostenlos, ohne Karte. Dann 19 €/Monat, wenn du eine hinzufügst.",
    signInToTrain: "Anmelden, Peak-Datum wählen. 14 Tage kostenlos, ohne Karte.",
    tabs: {
      today: "Heute",
      plan: "Programm",
      week: "Woche",
      prep: "Der Tag",
      log: "So geht’s",
      profile: "Du",
      whatIf: "Was wäre",
      passport: "Pass",
    },
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
    testNote: "14 Tage kostenlos. Ohne Karte. Füge jederzeit eine hinzu, um weiterzutrainieren.",
  },
  dashboard: {
    enrollments: "Deine Programme",
    empty: "Noch kein Programm auf diesem Konto. Unten wählen.",
    billingTest: "14 Tage kostenlos, ohne Karte.",
    peak: "Peak",
    statusTest: "Test",
    saved: "Auf dem Konto gespeichert",
  },
  tools: {
    week: {
      save: "Woche speichern",
      saved: "Auf diesem Gerät gespeichert",
      days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
      types: { easy: "Locker", steady: "Steady", hard: "Hart", rest: "Ruhe" },
      session: "Was du wirklich gelaufen bist",
      readiness: "Wie fühlt sich der Körper diese Woche?",
      readinessLead:
        "Das ändert nur das Training. Müde = weniger Arbeit. Kaputt = Ruhe statt Qualität.",
      levels: { fresh: "Frisch", ok: "In Ordnung", tired: "Müde", wrecked: "Kaputt" },
      notes: {
        fresh: "Die geschriebene Woche behalten. Kein Extra-Heldentum.",
        ok: "Last behalten. Keinen zweiten harten Tag dazulegen.",
        tired: "Harte und stetige Einheiten fallen auf locker. Du trainierst weniger.",
        wrecked: "Hart und stetig werden Ruhe. Locker bleibt locker. Nächste Woche weiter.",
      },
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
          none: "Sprechtest. Stiehlt der Hang den Satz, gehen bis die Sprache zurück ist.",
        },
        {
          zone: "Stetig · hohe Z2 / niedrige Z3",
          feel: "Nur kurze Phrasen. Kontrolliert, kein Rennen.",
          watch: "Etwa 75–85 % max HF. Nicht in einer müden Woche stapeln.",
          none: "Du beantwortest eine Frage, erzählst keine Geschichte.",
        },
        {
          zone: "Hart / Qualität · Z3–4",
          feel: "Ein paar Worte. Eine Dosis pro Woche, oder keine wenn müde.",
          watch: "Schwelle ~85–92 % max HF. Einziger harter Lauf.",
          none: "Atmung laut. Du würdest nicht plaudern.",
        },
        {
          zone: "Klettern / Kraft",
          feel: "Keine HF-Zone. Griff und Skill heben den Puls.",
          watch: "Zonen an der Wand ignorieren. Qualitäslängen oder Sätze zählen, dann stop.",
          none: "Stoppen wenn die Technik bricht. Kraft ist kurz.",
        },
      ],
      alpineTitle: "Alpinwochen sind nicht nur Gehen",
      alpine:
        "Zustiege bleiben gesprächig. Specific fügt eine Klettereinheit und eine kurze Kraftdosis hinzu. Zuerst aerobe Basis, dann Kletterkraft und Technik, dann Bergtage mit Pack. Seillängen sind Arbeit.",
    },
    prep: mountainDe,
    log: {
      empty: "Noch keine Trainingsnotizen diese Woche.",
      decision: "Was du getan oder geändert hast",
      why: "Warum (Schlaf, Müdigkeit, Leben)",
      add: "Eintrag",
      clear: "Log leeren",
    },
    plan: planDe,
    athlete: athleteDe,
    passport: passportDe,
    whatIf: whatIfDe,
  },
  fieldPage: fieldDe,
};
