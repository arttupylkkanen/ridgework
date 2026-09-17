import { fieldDe } from "./field.ts";
import { planDe } from "./plan-tools.ts";
import { athleteDe } from "./athlete-copy.ts";
import { mountainDe } from "./mountain-prep.ts";
import { passportDe, whatIfDe } from "./passport.ts";
import type { Copy } from "./types";

export const de: Copy = {
  metaTitle: "Ridgework — Trainingsprogramme für Trail, Alpin und Höhe",
  metaDescription:
    "Was du diese Woche läufst — 20-km-Trail, 50 oder 100 km Ultra, Alpentag. Eine müde Woche wird leichter. Ohne Karte zum Start.",
  footerTag: "Bergtraining, das der Woche folgt, die du wirklich hast.",
  legalEntity: "Ridgework, Frankreich.",
  support: "support@ridgework.org",
  cancelAnytime: "Jederzeit kündbar",
  terms: "AGB",
  privacy: "Datenschutz",
  legalNotice: "Impressum",
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
    signOut: "Abmelden",
    signingOut: "Abmelden…",
    signedInAs: "Angemeldet als {who}",
  },
  cta: {
    pricing: "Preise ansehen",
    openTools: "Tools öffnen",
    seeWeek: "Diese Woche ansehen",
  },
  examplePlanner: {
    h2: "Wähle den Tag, an dem du bereit sein musst",
    lead: "Geschrieben für einen ersten 50er oder einen ersten 20-km-Trail bei drei bis fünf Stunden pro Woche — gut ankommen, keine Zeit jagen. Ändere das Datum, und die drei Wochen unten werden von derselben Engine neu geschrieben, die auch der Schreibtisch nutzt.",
    goalLabel: "Ziel",
    goals: { fifty: "Erste 50 km", trail20: "Erster 20-km-Trail" },
    dateLabel: "Bereit am",
    windowOk: "{n} Wochen ab heute. Das ist der volle Aufbau.",
    windowShort:
      "{n} Wochen ab heute. Der volle Aufbau will {want}, also wird zuerst die Basis gekürzt und der spezifische Block samt Taper behalten. Du bekommst trotzdem eine geschriebene Woche.",
    tooSoon: "Wähle ein späteres Datum — davor gibt es keine Woche zu schreiben.",
    weekN: "Woche {n}",
    repeats:
      "Diese drei sind gleich geschrieben. {phase} wiederholt sich, bis es einen Grund zur Änderung gibt — der {next}-Block beginnt in Woche {n}, und eine kaputte Einheit oder eine ausgefallene Woche schreibt sie schon vorher um.",
    phases: { base: "Basis", specific: "Spezifisch", taper: "Taper", done: "Fertig" },
    note: "Drei Wochen stehen jeweils geschrieben. Trag die Woche ein, und die nächste erscheint. Hier wird nichts gespeichert, und es gibt kein Konto, bis du eines anlegst.",
  },
  pageMeta: {
    who: {
      title: "Für wen Ridgework ist — Ridgework",
      description:
        "Für wen sich eine Trainingswoche eignet, die sich neu schreibt, für wen nicht, und was du wirklich bekommst. Trail und Berg, kein festes PDF.",
    },
    after: {
      title: "Was nach der Anmeldung passiert — Ridgework",
      description:
        "Deine ersten zwei Wochen, Tag für Tag: Zieltag wählen, drei Wochen landen im Kalender, und der Plan schreibt sich um nach dem, was du tatsächlich getan hast.",
    },
    method: {
      title: "Die Methode und ihre Quellen — Ridgework",
      description:
        "Die meisten Tage locker, eine harte Einheit wenn du frisch bist, ein Taper auf den Tag. Die Forschung hinter der Wochenstruktur, mit Zitaten und Grenzen.",
    },
  },
  offer: {
    free: {
      cta: "Kostenlos starten",
      title: "Derzeit kostenlos.",
      lead: "Ridgework ist kostenlos, solange die Registrierung des Unternehmens läuft — wir dürfen noch kein Geld annehmen und tun auch nicht so. Wenn es öffnet, kostet die Mitgliedschaft 19 €/Monat.",
      badge: "Kostenlos, ohne Karte",
      line: "Kostenlos, solange die Registrierung des Unternehmens läuft. Keine Karte, nichts zu kündigen.",
      features: [
        "Sieben Programme, von der aeroben Basis bis 100 km und Alpintagen",
        "Nirgendwo wird eine Karte verlangt — Zahlungen sind noch nicht offen",
        "Wochen, die neu geschrieben werden, wenn du schlecht schläfst, etwas ausfällt oder du reist",
        "Trainingswochen, keine medizinischen Aussagen",
      ],
      laterTitle: "Wenn Zahlungen öffnen",
      laterBody:
        "Die Mitgliedschaft wird 19 €/Monat kosten, und du wirst gefragt, bevor irgendetwas abgebucht wird. Bis dahin kann dir nichts abgebucht werden: Es ist keine Karte hinterlegt, weil die Seite gar keine annehmen kann.",
      legal: [
        "Ridgework schreibt Trainingswochen für Trail und Berg. Keine medizinische Versorgung, keine Diagnosen. Preis: nichts, solange die Eintragung des Unternehmens läuft — die Kasse ist geschlossen und die Seite kann keine Karte annehmen. Du bleibst verantwortlich für Berg- und Trainingssicherheit. Zwingende Verbraucherrechte nach französischem/EU-Recht werden nicht eingeschränkt.",
        "Preis. Ridgework ist kostenlos, solange die Eintragung des Unternehmens läuft. Es ist keine Karte hinterlegt und es lässt sich auch keine hinterlegen, also kann nichts abgebucht werden und es gibt nichts zu kündigen. Wenn die Kasse öffnet, kostet die Mitgliedschaft 19 €/Monat, und diese Seite sagt es, bevor jemand zur Zahlung aufgefordert wird.",
      ],
      privacyPayments:
        "Zahlungen. Heute werden keine entgegengenommen; die Kasse ist geschlossen. Wenn sie öffnet, wickelt Polar Kartenzahlungen als Merchant of Record ab. Wir halten den Status deines Abos, nie deine Kartennummer.",
    },
    trial: {
      cta: "14 Tage kostenlos starten",
      title: "14 Tage im Kalender. Dann 19 €/Monat.",
      lead: "Lauf zuerst eine echte Woche. Danach 19 €/Monat, wenn du bleibst. Jederzeit kündbar, auch in den 14 Tagen.",
      badge: "14 Tage kostenlos",
      line: "14 Tage kostenlos, ohne Karte. Danach 19 €/Monat, wenn du eine hinterlegst. Jederzeit kündbar.",
      features: [
        "Sieben Programme, von der aeroben Basis bis 100 km und Alpintagen",
        "14 Tage ohne Karte — jederzeit eine hinterlegen und für 19 €/Monat weitertrainieren",
        "Kündige innerhalb der 14 Tage und Polar bucht nichts ab",
        "Trainingswochen, keine medizinischen Aussagen",
      ],
      laterTitle: "Nach den 14 Tagen",
      laterBody:
        "Hinterlege jederzeit eine Karte, um für 19 €/Monat weiterzutrainieren. Es wird nie automatisch abgebucht — ohne Karte pausiert der Schreibtisch einfach. Ein anderer Preis steht nirgends auf dieser Seite.",
      legal: [
        "Ridgework schreibt Trainingswochen für Trail und Berg. Keine medizinische Versorgung, keine Diagnosen. Preis: 14 Tage kostenlos, dann 19 €/Monat. Jederzeit kündbar (support@ridgework.org). Kündigung in den 14 Tagen bedeutet keine Rechnung. Du bleibst verantwortlich für Berg- und Trainingssicherheit. Zwingende Verbraucherrechte nach französischem/EU-Recht werden nicht eingeschränkt.",
        "Preis und Testphase. Der Preis beträgt 19 €/Monat, nach 14 kostenlosen Tagen. Zum Start ist keine Karte nötig. Hinterlegst du eine Karte und bleibst über diese 14 Tage hinaus, bucht Polar 19 €/Monat ab. Ohne Karte wird nie automatisch abgebucht — der Schreibtisch pausiert an Tag 14, bis du eine hinterlegst. Das ist der einzige genannte Preis.",
      ],
      privacyPayments:
        "Zahlungen. Kartenzahlungen wickelt Polar als Merchant of Record ab. Wir halten den Status deines Abos, nie deine Kartennummer.",
    },
  },
  hero: {
    kicker: "Bergtraining",
    h1: "Trainiere für den Tag, auf den es ankommt.",
    lead: "Wähle den Tag, an dem du bereit sein musst. Jede Woche wird von dort rückwärts geschrieben — und neu geschrieben, wenn das Leben dazwischenkommt.",
    proofLabel: "Was eine Fünf-Stunden-Nacht bewirkt",
    proofHeld:
      "Eine Einheit hat sich geändert. Der Rest der Woche und der Tag, auf den du hinarbeitest, blieben unverändert.",
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
              "Woche 20 (Ende spezifisch): 3×12 min im Marathon-Effort auf rollendem Trail, 4 min locker. Ziept es lauter als sonst, wird die Einheit locker. Dann 10–14 Tage Taper.",
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
        name: "Grundlagenausdauer",
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
      "Alle, die auf 20-km-Trail, 50- oder 100-km-Ultra, Alpentag, verbundene Route oder Höhenexpedition trainieren",
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
        body: "Langer Lauf und Ziepen aufschreiben. Die nächste Woche startet dort, nicht beim Wunschplan.",
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
    changeNote:
      "Eine Einheit hat sich geändert, und der Plan sagt warum. Der Rest der Woche bleibt, das Renndatum auch.",
    facts: [
      { label: "Schlaf letzte Nacht", value: "5 Stunden" },
      { label: "Gestern", value: "32 km Langer" },
      { label: "Rechtes Knie", value: "2/10" },
    ],
    says: "Was sich ändert",
    actions: [
      "Intervalle heute streichen",
      "Stattdessen 45–60 Min locker",
      "Den Langen locker halten. Keine Extra-Kilometer zum Aufholen",
      "Auf dem Langen etwa 500–750 ml/h trinken — wie schon geübt. Kein neues Gel",
      "Morgen neu bewerten",
    ],
    note: "Keine Diagnose. Wenn das Knie anschwillt, blockiert oder schlimmer wird, zum Arzt. Hier ändert sich nur die Trainingswoche.",
  },
  firstWeek: {
    kicker: "Deine ersten zwei Wochen",
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
    nextTitle: "Jetzt dein eigenes Datum",
    nextBody:
      "Dieser Guide ist ein durchgerechnetes Beispiel. Der Planer schreibt genauso für den Tag, an dem du bereit sein musst — drei Wochen auf einmal, ohne Konto, ohne Karte.",
    nextCta: "Meine drei Wochen ansehen →",
  },
  pricing: {
    kicker: "Preise",
    name: "Ridgework-Abo",
    price: "€19",
    freeTag: "Kostenlos",
    per: "/Monat",
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
      "Ridgework nimmt keine Zahlung an, bis die Registrierung des Unternehmens abgeschlossen ist. In der Zwischenzeit kann nichts belastet werden — es ist keine Karte hinterlegt.",
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
        a: "Derzeit nichts. Wir dürfen keine Zahlung annehmen, solange die Registrierung in Frankreich läuft — der Schreibtisch ist einfach kostenlos und es ist keine Karte hinterlegt. Die Mitgliedschaft wird 19 €/Monat kosten, sobald es öffnet, und du erfährst es vorher.",
      },
      {
        q: "Jederzeit kündbar?",
        a: "Ja. Am Tisch gibt es Kündigen, sobald du eine Karte hinterlegt hast. Ohne Karte wird nie etwas abgebucht — hör einfach auf. Nach einem bezahlten Monat bleibt der Zugang bis Monatsende.",
      },
      {
        q: "Kann mir unbemerkt etwas abgebucht werden?",
        a: "Ohne Karte pausiert der Tisch, bis du eine hinzufügst — es wird nichts automatisch belastet. Mit Karte läuft das Abo weiter zu 19 €/Monat, außer du kündigst.",
      },
      {
        q: "Brauche ich eine Karte für die Testphase?",
        a: "Nein. Es wird nirgends auf der Seite eine Karte verlangt. Wenn Zahlungen öffnen, kostet die Mitgliedschaft 19 €/Monat und du wirst vorher gefragt.",
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
      { q: "Support?", a: "support@ridgework.org — Antwort innerhalb von 24–48 Stunden." },
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
  legalPage: {
    title: "Impressum",
    updated: "Zuletzt aktualisiert: September 2026",
    lead: "Das französische Recht (LCEN Art. 6 III) verlangt, Herausgeber und Hoster einer Website zu nennen. Diese Seite ist diese Angabe. Nichts davon steckt hinter einem Kontaktformular.",
    publisherTitle: "Herausgeber",
    labels: {
      name: "Name",
      form: "Rechtsform",
      address: "Sitz",
      phone: "Telefon",
      siren: "SIREN",
      vat: "USt-IdNr.",
      capital: "Stammkapital",
      director: "Verantwortlich für den Inhalt",
      email: "E-Mail",
    },
    pending: "Noch nicht veröffentlicht",
    pendingNote:
      "Ridgework ist noch nicht als Unternehmen eingetragen und nimmt keine Zahlungen entgegen. Die oben so gekennzeichneten Felder werden mit der Eintragung ergänzt; bis dahin wird nichts verkauft und keine Karte belastet.",
    hostTitle: "Hosting und Infrastruktur",
    hostLead: "Wer die Maschinen betreibt, was jeder Anbieter tut, und wo die Daten liegen.",
    hostRole: "Rolle",
    hostRoles: {
      vercel: "Hoster — die Website und ihre Server-Funktionen",
      neon: "Datenbank — Konten, Profile, Trainingspläne",
      resend: "Transaktions-E-Mail — Bestätigungs- und Passwortlinks",
      cloudflare: "DNS und Weiterleitung der an die Domain gesendeten Mail",
    },
    hostRegion: "Region",
    hostContact: "Kontakt",
    contactTitle: "Kontakt",
    contactBody:
      "Schreib an support@ridgework.org. Es antwortet ein Mensch, innerhalb von 24 bis 48 Stunden.",
  },
  termsPage: {
    title: "Nutzungsbedingungen",
    updated: "Zuletzt aktualisiert: September 2026",
    body: [],
  },
  privacyPage: {
    title: "Datenschutzerklärung",
    updated: "Zuletzt aktualisiert: September 2026",
    bodyBefore: [
      "Wer wir sind. Ridgework ist Verantwortlicher für die hier beschriebenen Daten. Identität, Anschrift und Hoster stehen vollständig im Impressum. Fragen und alle unten genannten Anliegen an support@ridgework.org — es antwortet ein Mensch.",
      "Kein Tracking. Ridgework betreibt keine Analyse — weder eigene noch fremde. Kein Werbepixel, kein Fingerprinting, kein Cookie-Banner, weil es nichts einzuwilligen gibt. Das einzige Cookie hält dich angemeldet, ist unbedingt erforderlich und verschwindet beim Abmelden.",
      "Dein Konto. Name, E-Mail-Adresse und ein Hash des Passworts. Das Passwort selbst speichern wir nie. Rechtsgrundlage: Vertragserfüllung — ohne Konto gibt es keinen Plan zu zeigen.",
      "Wie du trainierst. Was du bei der Einrichtung angegeben hast: Sportart, Ziel, Zieltermin, Wochenstunden, längste jüngste Einheit, Erfahrung, mögliche Tage und deren Dauer, Gelände, Ausrüstung und Einschränkungen wie Schichtarbeit oder wenig Schlaf. Rechtsgrundlage: Vertragserfüllung. Daraus wird der Plan geschrieben.",
      "Wie du dich fühlst. Der tägliche Check-in: Schlaf, Muskelkater, Müdigkeit, Stress und Motivation auf einer Skala von 1 bis 5, dazu eine Ja/Nein-Angabe, ob etwas das Training gerade einschränkt. Rechtsgrundlage: Vertragserfüllung. Das sind subjektive Trainingsangaben, keine klinischen Messwerte; wir fragen nicht nach Diagnosen, Medikamenten, Befunden oder sonstigen Patientenakten und wollen sie auch nicht. Ridgework ist kein Gesundheitsdienst und stellt keine Diagnosen.",
      "Was du gemacht hast. Welche Einheit geplant war, ob du sie als erledigt, verpasst oder verschoben markiert hast, und die eingetragenen Minuten. Rechtsgrundlage: Vertragserfüllung — genau das lässt den Plan auf die Woche reagieren, die du wirklich hattest.",
      "Integrationen, nur auf Wunsch. Der Kalender-Feed erzeugt eine geheime Adresse für deine Einheiten. Die Verbindung zu intervals.icu speichert den API-Schlüssel, den du einfügst. Beides ist aus, bis du es einschaltest, beides lässt sich trennen, und beim Trennen wird das Gespeicherte gelöscht. Rechtsgrundlage: Einwilligung.",
      "Die Erinnerungsliste, nur auf Wunsch. Hinterlässt du eine Adresse, um zur Öffnung der Kasse benachrichtigt zu werden, speichern wir diese Adresse, das Ziel und das Datum, das du dabei angesehen hast, und ob du bestätigt hast. Rechtsgrundlage: Einwilligung. Außer der Bestätigung selbst geht an eine unbestätigte Adresse nichts raus; jede Nachricht enthält einen Link, der den Eintrag ohne Konto löscht; und die Liste dient dieser einen Nachricht und sonst nichts.",
    ],
    bodyAfter: [
      "Wer sonst Zugriff hat. Nur die Anbieter, die den Dienst betreiben, mit Anschrift und Region im Impressum aufgeführt: Vercel (Hosting, Region Paris), Neon (Datenbank, Frankfurt), Resend (Bestätigungs- und Passwort-Mails, Irland) und Cloudflare (DNS und Mail-Routing). Jeder handelt auf unsere Weisung unter einem Auftragsverarbeitungsvertrag. Wir verkaufen keine personenbezogenen Daten und geben sie nicht für Werbung weiter.",
      "Daten außerhalb der EU. Diese Anbieter sind US-Unternehmen. Gespeichert wird in der EU, wo der Anbieter das anbietet — Datenbank in Frankfurt, E-Mail in Irland — ein Support-Zugriff aus den USA ist jedoch möglich. Übermittlungen stützen sich auf die Standardvertragsklauseln der Kommission und, sofern der Anbieter zertifiziert ist, auf das EU–US Data Privacy Framework.",
      "Speicherdauer. Konto und Trainingsverlauf bleiben, solange das Konto besteht. Lösche das Konto, und wir löschen sie — außer dem, was Buchhaltung oder Gesetz nach Aufnahme der Geschäftstätigkeit verlangen, und nur für diese Dauer.",
      "Deine Rechte. Du kannst eine Kopie deiner Daten verlangen, sie berichtigen, löschen, ihre Nutzung einschränken oder ihr widersprechen, sie in einem übertragbaren Format mitnehmen und die Einwilligung für die Integrationen jederzeit widerrufen. Schreib an support@ridgework.org. Wir antworten binnen eines Monats, meist deutlich schneller.",
      "Beschwerden. Wenn dich unsere Antwort nicht zufriedenstellt, kannst du dich an die französische Aufsichtsbehörde wenden: CNIL, 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, oder cnil.fr. Ebenso an die Behörde deines Wohnsitzes.",
      "Änderungen. Ändert sich diese Erklärung wesentlich, sagen wir es auf dieser Seite und, wenn die Änderung bereits gegebene Daten betrifft, per E-Mail.",
    ],
  },
  notify: {
    title: "Sag Bescheid, wenn es öffnet",
    body: "Eine Nachricht, an dem Tag, an dem die Kasse öffnet. Kein Newsletter, keine Trainingstipps, keine Erinnerungen, deinen Lauf einzutragen. Die Adresse lässt sich direkt aus der Mail entfernen.",
    label: "E-Mail",
    placeholder: "du@beispiel.de",
    cta: "Sag Bescheid",
    pending: "Wird gesendet…",
    sentTitle: "Schau in dein Postfach",
    sentBody:
      "Wenn diese Adresse Mail empfangen kann, ist eine Bestätigung unterwegs. Auf der Liste steht nichts, bis du den Link darin öffnest.",
    badEmail: "Das sieht nicht nach einer E-Mail-Adresse aus.",
    failed: "Das ging nicht raus. Versuch es gleich noch einmal.",
    pageTitle: "Deine Adresse — Ridgework",
    pageDescription: "Bestätige oder entferne die Adresse, die du bei Ridgework hinterlassen hast.",
    confirmedTitle: "Bestätigt",
    confirmedBody:
      "Du bekommst eine Nachricht, an dem Tag, an dem die Kasse öffnet. Das ist die ganze Liste.",
    leftTitle: "Entfernt",
    leftBody: "Deine Adresse ist gelöscht. Nichts wird aufbewahrt und nichts wird gesendet.",
    unknownTitle: "Dieser Link wurde schon benutzt",
    unknownBody:
      "Er wurde entweder bereits einmal verwendet oder die Adresse ist entfernt. So oder so gibt es hier nichts mehr zu tun.",
    leaveCta: "Meine Adresse entfernen",
    back: "← Ridgework-Startseite",
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
      "Dieses Beispiel setzt sich zurück, wenn du gehst. Leg ein Konto an für deine eigene Woche, gebaut aus deiner Sportart, deinem Ziel und deinem Peak-Datum . Ohne Karte.",
  },
  sourcesPage: {
    title: "Quellen — Ridgework",
    description:
      "Alle Arbeiten hinter den Trainingswochen, und wofür jede tatsächlich verwendet wird.",
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
      more: "Mehr",
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
    verifyTitle: "Sieh in deinem Postfach nach",
    verifyBody:
      "Wenn diese Adresse Mail empfangen kann, ist ein Bestätigungslink unterwegs — das Konto ist erst aktiv, wenn du ihn öffnest. Nach ein paar Minuten nichts da? Sieh in den Spam und schreib dann an support@ridgework.org.",
    forgotLink: "Passwort vergessen?",
    forgotTitle: "Link zum Zurücksetzen schicken",
    forgotBody:
      "Gib die Adresse ein, mit der du dich registriert hast. Der Link gilt einmal und läuft in einer Stunde ab.",
    forgotSend: "Link schicken",
    resetSentTitle: "Sieh in deine Mails",
    resetSentBody:
      "Wenn es zu dieser Adresse ein Konto gibt, ist ein Link unterwegs. Wir sagen nicht, welches von beidem — das würde verraten, wer unsere Athleten sind.",
    setPasswordTitle: "Neues Passwort wählen",
    setPasswordBody: "Mindestens 8 Zeichen. Das meldet dich überall sonst ab.",
    newPassword: "Neues Passwort",
    setPasswordCta: "Speichern und anmelden",
    resetDoneTitle: "Passwort geändert",
    resetDoneBody: "Melde dich mit dem neuen an.",
    linkExpiredTitle: "Dieser Link ist verbraucht",
    linkExpiredBody:
      "Ein Link zum Zurücksetzen gilt einmal und eine Stunde lang. Fordere einen neuen an.",
    alreadyRegistered:
      "Zu dieser Adresse gibt es schon ein Konto. Melde dich an, oder setze das Passwort zurück, wenn du es nicht mehr weißt.",
    weakPassword: "Nimm mindestens 8 Zeichen.",
    unverifiedTitle: "Bestätige zuerst deine Adresse",
    unverifiedBody:
      "Das Konto gibt es, die Adresse ist aber nicht bestätigt. Wir haben den Link erneut geschickt.",
    resend: "Link erneut schicken",
    resent: "Geschickt. Gib ihm eine Minute.",
    backToSignIn: "Zurück zur Anmeldung",
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
    sync: {
      tab: "Sync",
      kicker: "Raus aus dem Browser",
      title: "Dein Plan, auf der Uhr und im Kalender",
      lead: "Zwei Wege hinaus. Keiner braucht jemandes Erlaubnis, und beide gehen gleichzeitig.",
      calendarTitle: "Im Kalender abonnieren",
      calendarLead:
        "Ein lebendiger Feed der geschriebenen Einheiten. Einmal in Google, Apple oder Outlook hinzufügen, dann bleibt er aktuell — schreibt eine müde Woche eine Einheit um, folgt der Kalender.",
      calendarCta: "Kalenderlink erstellen",
      calendarNote:
        "Wer den Link hat, sieht deine geplanten Einheiten — behandle ihn wie ein Passwort. Ein neuer Link macht den alten sofort ungültig.",
      copy: "Link kopieren",
      copied: "Kopiert.",
      rotate: "Link erneuern",
      intervalsTitle: "An intervals.icu senden",
      intervalsLead:
        "intervals.icu ist kostenlos und hat eine eigene Garmin-Connect-Anbindung für geplante Einheiten. Dort einmal verbinden, von hier senden, und die Einheiten landen auf der Uhr.",
      intervalsNote:
        "Dein Schlüssel bleibt auf unserem Server, damit das Senden läuft, und geht nie an den Browser zurück. Trennen löscht ihn.",
      athleteId: "Athlete ID",
      apiKey: "API-Schlüssel",
      apiKeyHint:
        "Beides steht in intervals.icu unter Settings → Developer. Die Athlete ID sieht aus wie i12345.",
      connect: "Verbinden",
      connected: "Verbunden.",
      connectedAs: "Verbunden als",
      disconnect: "Trennen",
      push: "Geschriebene Wochen senden",
      pushing: "Senden…",
      pushed: "Einheiten gesendet.",
      lastPushed: "Zuletzt gesendet",
      failed: "Das hat nicht geklappt. Nochmal versuchen oder support@ridgework.org schreiben.",
    },
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
