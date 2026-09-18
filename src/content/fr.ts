import { fieldFr } from "./field.ts";
import { planFr } from "./plan-tools.ts";
import { athleteFr } from "./athlete-copy.ts";
import { mountainFr } from "./mountain-prep.ts";
import { passportFr, whatIfFr } from "./passport.ts";
import type { Copy } from "./types";

export const fr: Copy = {
  metaTitle: "Des semaines qui se réécrivent — trail et ultra | Ridgework",
  metaDescription:
    "Choisissez le jour où vous devez être prêt. La semaine s’adapte à une mauvaise nuit ; la date ne bouge pas. Du 20 km au 100 km. Sans carte.",
  footerTag: "Un entraînement de montagne qui suit la semaine que vous avez vraiment.",
  legalEntity: "Ridgework, France.",
  support: "support@ridgework.org",
  cancelAnytime: "Résiliez à tout moment",
  terms: "Conditions",
  privacy: "Confidentialité",
  legalNotice: "Mentions légales",
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
    account: "Compte",
    signOut: "Se déconnecter",
    signingOut: "Déconnexion…",
    signedInAs: "Connecté en tant que {who}",
  },
  cta: {
    pricing: "Voir les tarifs",
    openTools: "Ouvrir les outils",
    seeWeek: "Voir cette semaine",
  },
  examplePlanner: {
    h2: "Choisissez le jour où vous devez être prêt",
    lead: "Base sans course, premier trail 20 km, ou premier 50 km — trois à cinq heures par semaine, finir bien, pas un chrono. Changez la date et les trois semaines ci-dessous sont réécrites par le moteur qui fait tourner le bureau.",
    goalLabel: "Objectif",
    goals: { fifty: "Premier 50 km", trail20: "Premier trail 20 km", engine: "Base aérobie" },
    dateLabel: "Prêt le",
    windowOk: "{n} semaines à partir d’aujourd’hui. C’est la préparation complète.",
    windowShort:
      "{n} semaines à partir d’aujourd’hui. La préparation complète en veut {want} : le foncier est réduit en premier, le bloc spécifique et l’affûtage sont gardés. Vous avez quand même une semaine écrite.",
    tooSoon: "Choisissez une date plus lointaine — il n’y a aucune semaine à écrire avant.",
    weekN: "Semaine {n}",
    repeats:
      "Ces trois-là sont écrites à l’identique. {phase} se répète jusqu’à ce qu’il y ait une raison d’en changer — le bloc {next} commence en semaine {n}, et une séance cassée ou une semaine sautée les réécrit avant cela.",
    phases: { base: "Foncier", specific: "Spécifique", taper: "Affûtage", done: "Terminé" },
    note: "Trois semaines restent écrites à la fois. Enregistrez la semaine et la suivante apparaît. Rien n’est sauvegardé ici, et aucun compte n’existe tant que vous n’en créez pas un.",
  },
  pageMeta: {
    who: {
      title: "À qui s’adresse Ridgework — Ridgework",
      description:
        "À qui convient une semaine d’entraînement qui se réécrit, à qui elle ne convient pas, et ce que vous obtenez vraiment. Trail et montagne, pas un PDF figé.",
    },
    after: {
      title: "Ce qui se passe après la connexion — Ridgework",
      description:
        "Vos deux premières semaines, jour par jour : choisissez une date de pic, trois semaines arrivent au calendrier, et le plan se réécrit selon ce que vous avez fait.",
    },
    method: {
      title: "La méthode et ses sources — Ridgework",
      description:
        "La plupart des jours faciles, une séance dure si vous êtes frais, un affûtage vers le jour J. La recherche derrière la structure, citations et limites comprises.",
    },
  },
  offer: {
    free: {
      cta: "Commencer gratuitement",
      title: "Gratuit pour le moment.",
      lead: "Ridgework est gratuit tant que l’immatriculation de la société est en cours — nous n’avons pas le droit d’encaisser, et nous ne prétendons pas le contraire. À l’ouverture, l’abonnement sera de 19 €/mois.",
      badge: "Gratuit, sans carte",
      line: "Gratuit tant que l’immatriculation de la société n’est pas terminée. Sans carte, rien à résilier.",
      features: [
        "Sept programmes, du foncier aérobie aux 100 km et aux journées alpines",
        "Aucune carte demandée nulle part — les paiements ne sont pas encore ouverts",
        "Des semaines réécrites quand vous dormez mal, sautez une séance ou voyagez",
        "Des semaines d’entraînement, pas des allégations médicales",
      ],
      laterTitle: "À l’ouverture des paiements",
      laterBody:
        "L’abonnement sera de 19 €/mois, et votre accord sera demandé avant tout prélèvement. D’ici là rien ne peut vous être prélevé : aucune carte n’est enregistrée, le site ne pouvant pas en accepter.",
      legal: [
        "Ridgework fournit des plans d’entraînement hebdomadaires — pas de soins médicaux, pas de diagnostics. Prix : rien, tant que l’immatriculation de la société est en cours — la caisse est fermée et le site ne peut pas accepter de carte. Vous restez responsable de la sécurité en montagne et à l’entraînement. Les droits impératifs des consommateurs français/UE ne sont pas limités.",
        "Prix. Ridgework est gratuit tant que l’immatriculation de la société est en cours. Aucune carte n’est enregistrée et il n’est pas possible d’en ajouter une : rien ne peut être facturé et il n’y a rien à résilier. À l’ouverture de la caisse, l’abonnement sera de 19 €/mois, et cette page le dira avant que quiconque ne soit invité à payer.",
      ],
      privacyPayments:
        "Paiements. Aucun n’est encaissé aujourd’hui ; la caisse est fermée. À son ouverture, les paiements par carte seront traités par Polar en tant que merchant of record. Nous conservons l’état de votre abonnement, jamais votre numéro de carte.",
    },
    trial: {
      cta: "Commencer 14 jours gratuits",
      title: "14 jours sur le calendrier. Puis 19 €/mois.",
      lead: "Courez d’abord une vraie semaine. Ensuite 19 €/mois si vous restez. Résiliez à tout moment, y compris pendant les 14 jours.",
      badge: "14 jours gratuits",
      line: "14 jours gratuits, sans carte. Puis 19 €/mois si vous en ajoutez une. Résiliez à tout moment.",
      features: [
        "Sept programmes, du foncier aérobie aux 100 km et aux journées alpines",
        "Sans carte pendant 14 jours — ajoutez-en une quand vous voulez pour continuer à 19 €/mois",
        "Résiliez pendant les 14 jours et Polar ne prélève rien",
        "Des semaines d’entraînement, pas des allégations médicales",
      ],
      laterTitle: "Après les 14 jours",
      laterBody:
        "Ajoutez une carte quand vous voulez pour continuer à 19 €/mois. Rien n’est jamais prélevé automatiquement — sans carte, le bureau se met simplement en pause. Aucun autre tarif n’est indiqué sur ce site.",
      legal: [
        "Ridgework fournit des plans d’entraînement hebdomadaires — pas de soins médicaux, pas de diagnostics. Prix : 14 jours gratuits, puis 19 €/mois. Résiliez à tout moment (support@ridgework.org). Pendant les 14 jours, la résiliation signifie aucune facture. Vous restez responsable de la sécurité en montagne et à l’entraînement. Les droits impératifs des consommateurs français/UE ne sont pas limités.",
        "Prix et essai. Le prix est de 19 €/mois, après 14 jours gratuits. Aucune carte n’est nécessaire pour commencer. Si vous ajoutez une carte et restez au-delà de ces 14 jours, Polar facture 19 €/mois. Sans carte, rien n’est jamais facturé automatiquement — le bureau se met en pause au 14e jour jusqu’à ce que vous en ajoutiez une. C’est le seul prix affiché.",
      ],
      privacyPayments:
        "Paiements. Les paiements par carte sont traités par Polar en tant que merchant of record. Nous conservons l’état de votre abonnement, jamais votre numéro de carte.",
    },
  },
  hero: {
    kicker: "Entraînement trail et montagne",
    h1: "La semaine bouge. Le jour que vous avez choisi, non.",
    lead: "Choisissez le jour où vous devez être prêt. Ridgework écrit trois semaines à rebours depuis ce jour, puis les réécrit selon le sommeil que vous avez eu, la séance manquée et la semaine que vous avez réellement vécue.",
    proofLabel: "Ce que fait une nuit de cinq heures",
    proofHeld:
      "Une séance a changé. Le reste de la semaine, et le jour que vous visez, sont restés en place.",
    noCard: "Pas de carte, pas de compte pour regarder.",
    sourced:
      "Chaque règle suivie par le plan est écrite noir sur blanc, avec l’étude derrière — y compris ce qu’elle ne prouve pas.",
    sourcedCta: "Lire la méthode",
  },
  about: {
    kicker: "Ce que c’est",
    h2: "Un bureau d’entraînement pour qui va en montagne",
    lead: "La semaine est écrite à partir des articles que nous citons, puis pliée autour du sommeil, des voyages, des enfants, et du matériel que vous avez. Les questions vont à support@ridgework.org. Les saisons restent sur un passeport que vous pouvez garder privé.",
    cards: [
      {
        title: "La semaine vient des papiers, pas d’une humeur",
        body: "Volume facile, une séance dure si vous êtes frais, un affûtage vers le jour. Ces motifs sont sur la page méthode, avec les citations. C’est une semaine de départ, pas un diagnostic.",
      },
      {
        title: "La vie est une entrée",
        body: "Mardi manqué, un déplacement, pas de crampons, une nuit courte. Le plan nomme le changement et pourquoi. La date de pic reste sauf si vous la déplacez.",
      },
      {
        title: "Une personne répond",
        body: "support@ridgework.org, c’est une personne. Les méthodes restent stables d’une semaine à l’autre. En montagne, c’est vous qui décidez.",
      },
      {
        title: "Des saisons, écrites",
        body: "Le passeport, c’est vous contre l’an dernier : plus longues sorties, volume facile, ce qui a cassé. Partagez-le avec un coach ou gardez-le fermé.",
      },
    ],
  },
  method: {
    kicker: "Méthode",
    h2: "Volume facile, une dose de qualité, affûtage vers le jour J",
    lead: "Nous nous appuyons sur un petit ensemble d’articles bien cités : distribution d’intensité, charge comme entrée de planification, taper comme motif. Checklists et structures de semaine — pas un avis médical.",
    cards: [
      {
        title: "Distribution d’intensité",
        body: "Seiler & Kjerland (2006) : environ 75 % de séances faciles chez des fondeurs juniors. La revue de Seiler (2010) décrit le polarisé ou pyramidal comme ce que font vraiment les endurants. Esteve-Lanao et al. (2007) : plus de temps en zone facile, meilleure course. Stöggl & Sperlich (2014) : des blocs polarisés déplaçaient davantage les variables clés. Ridgework part de là. Vous pouvez éditer.",
      },
      {
        title: "La charge comme entrée de semaine",
        body: "Le RPE de séance de Foster (2001) est un chiffre : ressenti × durée. Bourdon et al. (2017) : écrire le travail externe et la réponse interne, puis ajuster la séance suivante. Vous marquez la séance. Si elle était cassée, ou si ça fait mal, le prochain jour dur est réécrit plus facile. C’est du suivi de charge. Ce n’est pas Ridgework qui décide que vous êtes fatigué, ni un test médical.",
      },
      {
        title: "Le taper comme motif de planification",
        body: "Mujika & Padilla (2003) : le volume baisse souvent avant le jour J, une part d’intensité reste en doses plus courtes. La forme s’exprime au lieu d’être enterrée. Nous l’écrivons en bloc de 10–14 jours. Sommeil et matériel battent les kilomètres en plus.",
      },
    ],
    caveatsTitle: "Réserves honnêtes",
    caveats: [
      "La réponse individuelle varie — âge, historique, terrain et stress de vie changent ce qui “marche”.",
      "Les moyennes publiées ne sont pas un avis médical et ne remplacent pas un clinicien pour les questions de santé.",
      "Cela écrit une semaine de départ à partir de ce que vous lui dites. Cela ne vous voit pas vous entraîner et ne connaît que les séances que vous notez.",
    ],
    sourcesTitle: "Sources (vérifiées Crossref)",
    allSourcesCta: "Toutes les sources, et à quoi sert chacune",
  },
  projects: {
    kicker: "Projets exemples",
    h2: "Briefs de projet compacts",
    lead: "Trois objectifs exemples comme objets de planification. La durée est le plan d’entraînement — base aérobie, bloc spécifique, affûtage pour piquer le jour J — pas la longueur du week-end ou de la course. Une cellule de détail reste verrouillée jusqu’au compte.",
    items: [
      {
        title: "Objectif week-end alpin",
        fields: [
          {
            label: "Objectif",
            value: "Journée de montagne sûre et efficace avec règles de demi-tour claires",
          },
          {
            label: "Plan",
            value:
              "10 semaines — 6 sem. base aérobie + dénivelé, 3 sem. spécifique, affûtage 10–14 j. dans la fenêtre météo",
          },
          {
            label: "Focus",
            value:
              "Garder le volume facile facile ; ajouter du D+ conversationnel ; piquer la fenêtre météo, pas les kilomètres extra",
          },
          {
            label: "Risque / décision",
            value: "Fenêtre météo, freeze–thaw, itinéraires de repli, gate fatigue la veille",
          },
        ],
      },
      {
        title: "Premier 50 km trail",
        fields: [
          {
            label: "Objectif",
            value: "Finir bien, pas seulement finir — ravitaillement et allure sous contrôle",
          },
          {
            label: "Plan",
            value:
              "6 mois (24 sem.) — 10 sem. base aérobie, 12 sem. construction de la longue, affûtage 10–14 j. pour la semaine de course",
          },
          {
            label: "Focus",
            value:
              "Volume facile d’abord, puis progression de la longue et une séance de qualité ; pic la semaine de course",
          },
          {
            label: "Recette de séance",
            value:
              "Semaine 20 (fin du spécifique) : 3×12 min à allure marathon sur trail vallonné, 4 min facile. Si ça tire plus que d’habitude, la séance devient facile. Puis affûtage 10–14 jours.",
            locked: true,
          },
        ],
      },
      {
        title: "Traversée refuge à refuge",
        fields: [
          {
            label: "Objectif",
            value: "Trois jours liés, décisions météo et matériel déjà écrites",
          },
          {
            label: "Plan",
            value:
              "8 mois — base aérobie/randonnée hiver–printemps, 10 sem. sac et back-to-backs, affûtage 10–14 j. vers le jour 1",
          },
          {
            label: "Focus",
            value:
              "Les jambes se font dans les mois de base ; le spécifique est sac + jours liés ; pic pour le jour 1, pas un crash le jour 3",
          },
          {
            label: "Risque / décision",
            value:
              "Convection l’après-midi, neige versants nord, vallée de repli, fatigue après le jour 1",
          },
        ],
      },
    ],
  },
  programs: {
    kicker: "Programmes",
    h2: "Commencez ici.",
    lead: "Pas de course ? La base. Déjà une semaine de sorties ? Trail 20 km. Premier ultra ? 50 km. Les journées montagne plus longues sont sur la page des plans.",
    columns: {
      name: "Programme",
      duration: "Durée",
      focus: "Focus",
      recipe: "Recette de séance",
    },
    rows: [
      {
        id: "engine",
        name: "Base aérobie",
        duration: "Recommandé 16 semaines / 4 mois",
        focus:
          "Le bloc que la plupart sautent. Une heure suante à chaque sortie ne vous rend pas plus fort. Celle-ci oui : plus de minutes à une allure où vous parlez.",
        locked:
          "La plupart des jours assez faciles pour parler. La longue grandit vers 90 min à partir de ce que vous faites déjà. Pas de séance dure à part — c’est le travail.",
        pull: "Si vous sortez une phrase entière, vous êtes dans le travail.",
        layout: "textFirst",
      },
      {
        id: "trail20",
        name: "Trail 20 km",
        duration: "Environ dix semaines",
        focus:
          "Si vous courez déjà la plupart des semaines et voulez un trail dont vous sortez entier.",
        locked:
          "La plupart des jours : 40–60 minutes, assez lent pour parler. Un jour plus long qui part de l’heure que vous faites déjà. La semaine de course, on court moins, pas plus.",
        layout: "sessionLead",
      },
      {
        id: "fifty",
        name: "Ultra 50 km",
        duration: "Environ six mois",
        focus:
          "Si 20–30 km ou un marathon route sont déjà derrière vous. Finir bien, pas un chrono.",
        locked:
          "La plupart des jours assez faciles pour parler. La longue part de ce que vous savez faire maintenant, pas de quatre heures en semaine un. Les deux dernières semaines sont plus courtes, pas plus dures.",
        tag: "Souvent un premier ultra",
        pull: "Finir bien, pas seulement finir.",
        layout: "wide",
      },
      {
        id: "ultra100",
        name: "Ultra 80–120 km",
        duration: "Recommandé 36 sem. / 9 mois",
        focus:
          "Des mois de temps facile sur les pieds, back-to-backs tard, affûtage de quatre semaines",
        locked:
          "Semaine 30 : sam. 4–5 h trail facile, dim. 2,5–3 h facile. La semaine reste conversationnelle. Puis 3–4 semaines d’affûtage.",
      },
      {
        id: "alpine",
        name: "Journée alpine",
        duration: "Recommandé 10 semaines",
        focus: "Approches aérobies, escalade et force, puis journée montagne",
        locked:
          "Semaine 8 : séance d’escalade (rocher/glace/salle) + 1 200–1 800 m d’approche conversationnelle. Force 30–40 min. Fatigué : l’escalade devient rando facile.",
        tag: "Avec de l’escalade",
        layout: "sessionLead",
      },
      {
        id: "traverse",
        name: "Itinéraire alpin de plusieurs jours",
        duration: "Recommandé 32 sem. / 8 mois",
        focus: "Base rando, puis sac et back-to-backs, pic le jour 1",
        locked:
          "Semaine 28 : deux jours liés, sac léger. Couper le jour 2 si les restes sont dans les jambes.",
        layout: "compact",
      },
      {
        id: "expedition",
        name: "Expédition en altitude",
        duration: "Recommandé 40 sem. / 10 mois",
        focus: "Rando et volume facile, portages, l’affûtage est sommeil et matériel",
        locked:
          "Semaine 34 : portage 3–4 h en rando, puis un jour de repos. Une nuit dehors si la vie le permet. L’affûtage est sommeil et matériel, pas l’altitude extra.",
      },
    ],
    lockHint: "Séance clé",
    cta: "Commencer ce programme",
    more: "100 km, journées alpines et expéditions",
  },
  who: {
    h2: "Pour qui — et pour qui non",
    forTitle: "Conçu pour",
    forItems: [
      "Athlètes d’endurance qui planifient la semaine autour de la vraie vie et du terrain",
      "Ceux qui s’entraînent vers un trail 20 km, un ultra 50 ou 100 km, une journée alpine, un itinéraire lié ou une expédition en altitude",
      "Ceux qui préfèrent des outils calmes au spam motivationnel",
    ],
    notTitle: "Pas pour",
    notItems: [
      "Conseils médicaux, diagnostics ou traitements",
      "Un coach personnel ou un chat en direct",
      "Un soutien clinique ou d’urgence",
    ],
  },
  what: {
    h2: "Ce que vous obtenez",
    items: [
      {
        n: "01",
        title: "Plan depuis votre date de pic",
        body: "Vous choisissez quand piquer. Les semaines s’écrivent dans cette fenêtre — base, spécifique, affûtage. Plus long est toujours mieux.",
      },
      {
        n: "02",
        title: "Le journal change le lendemain",
        body: "Vous notez comment la dernière séance a été. Si elle était cassée, ou si ça fait mal, le prochain jour dur est réécrit plus facile. Foster (2001) et Bourdon et al. (2017) : la charge interne est un chiffre de planification, pas un diagnostic. La date de pic reste.",
      },
      {
        n: "03",
        title: "Matériel et ravitaillement",
        body: "Chaussures, couches, boisson et sommeil pour la semaine réelle.",
      },
      {
        n: "04",
        title: "Journal d’entraînement",
        body: "Notez ce que vous avez fait et pourquoi la charge a changé.",
      },
    ],
  },
  week: {
    h2: "Comment se déroule une semaine",
    steps: [
      {
        day: "Lun",
        title: "Construire la semaine",
        body: "La date de pic est déjà au calendrier. La plupart des jours sont faciles. Si vous avez bien dormi, une séance plus dure. Une sortie longue plus tard dans la semaine.",
      },
      {
        day: "Mar",
        title: "Sommeil et jambes",
        body: "Cinq heures de sommeil ? Les intervalles deviennent 45–60 min facile. La date de course ne bouge pas.",
      },
      {
        day: "Jeu",
        title: "Garder les jours faciles faciles",
        body: "Le gros de la semaine reste à une allure où vous parlez. Si la phrase sort, vous êtes dans la bonne zone.",
      },
      {
        day: "Dim",
        title: "Noter ce qui s’est passé",
        body: "Notez la sortie longue et ce qui a tiré. La semaine suivante part de là, pas du plan rêvé.",
      },
    ],
  },
  scenario: {
    kicker: "Exemple",
    h2: "Un vrai mardi, pas un slogan",
    setup: "Ultra de 77 km dans six semaines.",
    weekTitle: "Et voici la semaine qu’il écrit",
    writtenLabel: "Écrit",
    shownLabel: "Après une nuit de cinq heures",
    changeNote:
      "Une séance a changé, et le plan dit pourquoi. Le reste de la semaine est intact et la date de course n’a pas bougé.",
    facts: [
      { label: "Sommeil cette nuit", value: "5 heures" },
      { label: "Hier", value: "32 km longue" },
      { label: "Genou droit", value: "2/10" },
    ],
    says: "Ce qui change",
    actions: [
      "Sauter les intervalles d’aujourd’hui",
      "45–60 min facile à la place",
      "Garder la longue facile. Ne pas ajouter de kilomètres pour rattraper",
      "Sur la longue, boire environ 500–750 ml/h — un rythme déjà pratiqué. Pas de nouveau gel",
      "Réévaluer demain",
    ],
    note: "Pas un diagnostic. Si le genou gonfle, se bloque ou empire, voyez un médecin. Ici on ne change que la semaine d’entraînement.",
  },
  firstWeek: {
    kicker: "Vos deux premières semaines",
    h2: "Ce qui se passe après la connexion",
    lead: "Vous choisissez une date de pic. Trois semaines arrivent au calendrier. Si une séance est cassée ou si ça fait mal, les jours suivants sont réécrits. La sortie reste où vous l’avez mise.",
    days: [
      {
        day: "Jour 1",
        title: "Choisir le pic et bâtir la semaine",
        body: "77 km, journée alpine, ou le moteur. Trois semaines apparaissent.",
      },
      {
        day: "Jour 3",
        title: "Noter comment mardi s’est passé",
        body: "Sommeil court, une gène, ou une séance cassée : vous la marquez. Le prochain jour dur est réécrit plus facile. La date de pic reste.",
      },
      {
        day: "Jour 6",
        title: "Faire la première sortie longue",
        body: "Assez facile pour parler. La même boisson que d’habitude. Si la semaine était brouillonne, cette sortie est plus courte. Pas de kilomètres de rattrapage.",
      },
      {
        day: "Jour 7",
        title: "Noter la semaine réellement courue",
        body: "Ce que vous avez fait, ce que vous avez sauté, ce qui a tiré. La semaine deux part de là, pas de la semaine prévue.",
      },
    ],
  },
  guidesIndex: {
    kicker: "Guides",
    h2: "Des questions d’entraînement, écrites",
    lead: "77 km et six semaines. 100 km. Fatigue. Journées alpines. Checklist de course.",
    cta: "Ouvrir les guides",
    read: "Lire",
    nextTitle: "Mettez maintenant votre propre date",
    nextBody:
      "Ce guide est un exemple travaillé. Le planificateur écrit de la même façon pour le jour où vous devez être prêt — trois semaines à la fois, sans compte, sans carte.",
    nextCta: "Voir mes trois semaines →",
  },
  pricing: {
    kicker: "Tarifs",
    name: "Abonnement Ridgework",
    price: "€19",
    freeTag: "Gratuit",
    per: "/mois",
  },
  checkout: {
    kicker: "Essai",
    h2: "Commencer 14 jours à 0 €",
    lead: "Créez un compte. Sans carte pendant 14 jours. Ajoutez-en une quand vous voulez pour continuer.",
    name: "Nom",
    email: "E-mail",
    submit: "Ajouter une carte",
    note: "Résiliez dans le bureau. Pendant les 14 jours, Polar ne facture pas. Pas de diagnostics. Vous restez responsable de la sécurité en montagne et à l’entraînement.",
    successTitle: "Carte enregistrée",
    successBody: "14 jours à 0 €. Puis 19 €/mois sauf résiliation avant.",
    daysLeft: "jours restants d’essai",
    payTitle: "Ajoutez une carte pour continuer",
    payBody:
      "Votre essai gratuit est terminé. Ajoutez une carte pour continuer — 19 €/mois sauf résiliation.",
    payCta: "Payer par carte",
    trialLeft: "{n} jours restants d’essai",
    trialNoCard:
      "Plus que {n} jours, sans carte pour l’instant. Ajoutez-en une quand vous voulez pour continuer.",
    trialOn: "Carte enregistrée. Premier prélèvement après 14 jours sauf résiliation.",
    subscribed: "Abonné · 19 €/mois",
    payFail: "Le paiement ne s’est pas ouvert. Écrivez à support@ridgework.org.",
    closedTitle: "Les paiements par carte ne sont pas encore ouverts",
    closedBody:
      "Ridgework ne prend aucun paiement tant que l’immatriculation de la société n’est pas terminée. Rien ne peut être débité entre-temps — aucune carte n’est enregistrée.",
    paying: "Ouverture du paiement…",
    dueToday: "À régler aujourd’hui",
    dueAmount: "0 €",
    terms:
      "Polar enregistre la carte. 0 € aujourd’hui pour 14 jours. Puis 19 €/mois sauf résiliation avant la fin des 14 jours. Ensuite, renouvellement chaque mois jusqu’à résiliation dans le bureau. Montants en EUR. Polar est le marchand de record.",
    includesTitle: "Les 14 jours comprennent",
    includes: [
      "Les séances de la semaine, écrites : quoi faire, ce que ça doit donner, combien de temps",
      "Vous dites la date où il faut être prêt. La semaine part de là",
      "Marche, footing, rando ou vélo — les mêmes minutes comptent",
      "Résiliez dans les 14 jours : Polar ne facture rien",
    ],
    afterLine: "Après le 14e jour, l’abonnement est à 19 €/mois jusqu’à résiliation.",
    chipCancel: "Résiliation à tout moment",
    chipSupport: "support@ridgework.org",
    chipMerchant: "Facturé par Polar",
    cancelCta: "Résilier",
    cancelConfirm:
      "Résilier maintenant ? Pendant les 14 jours Polar ne facture pas. Après un mois payé, l’accès dure jusqu’à la fin de ce mois.",
    cancelYes: "Oui, résilier",
    cancelKeep: "Garder",
    canceling: "Résiliation…",
    canceledNow: "Résilié. Polar ne facturera pas.",
    canceledLater: "Résilié. L’accès dure jusqu’à la fin de la période déjà payée.",
    manageCta: "Carte et factures",
    cancelFail: "La résiliation n’a pas marché ici. Ouvrez Carte et factures.",
  },
  faq: {
    h2: "FAQ",
    items: [
      {
        q: "Qu’est-ce que Ridgework ?",
        a: "Une semaine d’entraînement écrite pour le trail, l’ultra et les jours alpins. Vous dites quand il faut être prêt. La semaine arrive au calendrier.",
      },
      {
        q: "Comment marche le prix ?",
        a: "Rien pour l’instant. Nous ne pouvons pas encaisser tant que l’immatriculation en France n’est pas terminée : le bureau est simplement gratuit et aucune carte n’est enregistrée. L’abonnement sera de 19 €/mois à l’ouverture, et vous le saurez avant.",
      },
      {
        q: "Puis-je résilier à tout moment ?",
        a: "Oui. Un bouton Résilier est dans le bureau une fois une carte ajoutée. Sans carte, rien n’est jamais facturé — arrêtez simplement. Après un mois payé, l’accès dure jusqu’à la fin de ce mois.",
      },
      {
        q: "Puis-je être débité sans m’en apercevoir ?",
        a: "Si vous n’avez pas ajouté de carte, le bureau se met en pause jusqu’à ce que vous en ajoutiez une — rien n’est facturé automatiquement. Si vous en avez ajouté une, l’abonnement continue à 19 €/mois sauf résiliation.",
      },
      {
        q: "Faut-il une carte pour commencer ?",
        a: "Non. Aucune carte n’est demandée nulle part sur le site. À l’ouverture des paiements, l’abonnement sera de 19 €/mois et votre accord sera demandé d’abord.",
      },
      {
        q: "Est-ce un avis médical ?",
        a: "Non. Pas de diagnostic ni de traitement. Pour la santé, consultez un professionnel.",
      },
      {
        q: "Le programme s’écrit-il tout seul au fil des semaines ?",
        a: "Oui — dans le produit, pas dans un chat bot. Vous choisissez la date de pic. L’onglet Programme garde toujours trois semaines écrites dans cette fenêtre. Une bonne semaine ajoute la suivante. Une semaine fatiguée s’entraîne moins ; la date de pic reste. Après la sortie, la saison suivante part d’un plancher plus haut.",
      },
      {
        q: "Qui est derrière ?",
        a: "Ridgework, France. support@ridgework.org.",
      },
      { q: "Quelles langues ?", a: "Anglais, finnois, français, allemand." },
      {
        q: "Données personnelles ?",
        a: "Attentes UE/France. Voir Confidentialité. Pas de vente pour la pub.",
      },
      { q: "Support ?", a: "support@ridgework.org — réponse sous 24–48 heures." },
    ],
  },
  disclaimer: {
    h2: "Avertissement",
    body: "Ridgework fournit des outils d’aide à la décision pour l’entraînement et la préparation en montagne. Ce n’est pas un dispositif médical ni un substitut à un conseil professionnel. Les citations de recherche publiée informent des cadres de planification et des checklists ; ce ne sont pas des claims médicaux ni des prescriptions individualisées. Vous restez responsable de vos décisions de sécurité. Pas de diagnostics. Pas de claims de traitement.",
  },
  foundingPage: {
    kicker: "Founding",
    h1: "Commencez par la première semaine",
    lead: "Les mêmes semaines. Sans carte.",
    trial: "Sans carte. L’abonnement sera de 19 €/mois à l’ouverture des paiements.",
    note: "Sans carte pendant 14 jours. Ajoutez-en une quand vous voulez pour continuer à 19 €/mois. C’est le seul tarif affiché ici.",
    back: "← Ridgework",
    title: "Founding — Ridgework",
    description:
      "Entraînement hebdomadaire. 14 jours gratuits, puis 19 €/mois. Résiliez à tout moment.",
  },
  legalPage: {
    title: "Mentions légales",
    updated: "Dernière mise à jour : septembre 2026",
    lead: "La loi française (LCEN art. 6 III) impose d’identifier l’éditeur du site et son hébergeur. Cette page est cette information. Rien n’est caché derrière un formulaire de contact.",
    publisherTitle: "Éditeur",
    labels: {
      name: "Nom",
      form: "Forme juridique",
      address: "Siège social",
      phone: "Téléphone",
      siren: "SIREN",
      vat: "Numéro de TVA",
      capital: "Capital social",
      director: "Directeur de la publication",
      email: "Courriel",
    },
    pending: "Non encore publié",
    pendingNote:
      "Ridgework n’est pas encore immatriculée et n’encaisse aucun paiement. Les champs ci-dessus signalés comme non publiés seront renseignés dès l’immatriculation ; d’ici là rien n’est vendu et aucune carte n’est débitée.",
    hostTitle: "Hébergement et infrastructure",
    hostLead: "Qui fait tourner les machines, le rôle de chacun, et où résident les données.",
    hostRole: "Rôle",
    hostRoles: {
      vercel: "Hébergeur — le site et ses fonctions serveur",
      neon: "Base de données — comptes, profils, plans d’entraînement",
      resend: "Courriels transactionnels — liens de confirmation et de mot de passe",
      cloudflare: "DNS et routage du courrier adressé au domaine",
    },
    hostRegion: "Région",
    hostContact: "Contact",
    contactTitle: "Contact",
    contactBody: "Écrivez à support@ridgework.org. Une personne répond, sous 24 à 48 heures.",
  },
  termsPage: {
    title: "Conditions d’utilisation",
    updated: "Dernière mise à jour : septembre 2026",
    body: [],
  },
  privacyPage: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : septembre 2026",
    bodyBefore: [
      "Qui nous sommes. Ridgework est responsable du traitement des données décrites ici. Notre identité, notre adresse et notre hébergeur sont publiés intégralement sur la page Mentions légales. Toute question, et toute demande ci-dessous, à support@ridgework.org — une personne répond.",
      "Aucun traçage. Ridgework n’utilise aucune mesure d’audience — ni la nôtre, ni celle d’un tiers. Pas de pixel publicitaire, pas d’empreinte numérique, pas de bandeau cookies, car il n’y a rien à accepter. Le seul cookie déposé vous garde connecté ; il est strictement nécessaire et disparaît à la déconnexion.",
      "Votre compte. Nom, adresse e-mail et empreinte du mot de passe. Le mot de passe lui-même n’est jamais conservé. Base légale : exécution du contrat — sans compte, aucun plan à afficher.",
      "Comment vous vous entraînez. Ce que vous avez indiqué à l’inscription : sport, objectif, date de pic, heures hebdomadaires, sortie la plus longue récente, expérience, jours disponibles et durée, terrain, matériel et contraintes telles que le travail posté ou le manque de sommeil. Base légale : exécution du contrat. C’est la matière à partir de laquelle le plan est écrit.",
      "Comment vous vous sentez. Le point quotidien : sommeil, courbatures, fatigue, stress et motivation sur une échelle de 1 à 5, plus une réponse oui/non sur ce qui limite l’entraînement. Base légale : exécution du contrat. Ce sont des ressentis d’entraînement, pas des mesures cliniques ; nous ne demandons ni ne souhaitons diagnostics, traitements, résultats d’examens ou tout autre dossier médical. Ridgework n’est pas un service de santé et ne pose aucun diagnostic.",
      "Ce que vous avez fait. La séance prévue, si vous l’avez marquée faite, manquée ou déplacée, et les minutes saisies. Base légale : exécution du contrat — c’est ce qui permet au plan de réagir à la semaine que vous avez réellement eue.",
      "Intégrations, seulement si vous le demandez. Le flux calendrier crée une adresse secrète pour vos séances. Connecter intervals.icu enregistre la clé API que vous collez. Les deux sont désactivées tant que vous ne les activez pas, les deux se déconnectent, et la déconnexion supprime ce qui était stocké. Base légale : consentement.",
      "La liste de rappel, seulement si vous le demandez. Si vous laissez une adresse pour être prévenu à l’ouverture de la caisse, nous conservons cette adresse, l’objectif et la date que vous regardiez alors, et le fait que vous ayez confirmé ou non. Base légale : consentement. Hormis la confirmation elle-même, rien n’est envoyé à une adresse non confirmée ; chaque message contient un lien qui supprime l’entrée sans compte ; et la liste ne sert qu’à ce message unique.",
    ],
    bodyAfter: [
      "Qui d’autre y a accès. Seulement les prestataires qui font tourner le service, listés avec adresses et régions sur la page Mentions légales : Vercel (hébergement, région Paris), Neon (base de données, Francfort), Resend (e-mails de confirmation et de mot de passe, Irlande) et Cloudflare (DNS et routage du courrier). Chacun agit sur nos instructions sous accord de sous-traitance. Nous ne vendons pas de données et n’en partageons pas à des fins publicitaires.",
      "Données hors UE. Ces prestataires sont des sociétés américaines. Les données sont stockées dans l’UE lorsque le prestataire le permet — base de données à Francfort, e-mail en Irlande — mais un accès support depuis les États-Unis reste possible. Les transferts reposent sur les clauses contractuelles types de la Commission et, lorsque le prestataire est certifié, sur le cadre EU–US Data Privacy Framework.",
      "Durée de conservation. Compte et historique d’entraînement restent tant que le compte existe. Supprimez le compte et nous les supprimons, sauf ce que la comptabilité ou la loi imposera de garder une fois l’activité commencée, et pour cette seule durée.",
      "Vos droits. Vous pouvez demander une copie de vos données, les rectifier, les effacer, en limiter ou contester l’usage, les emporter dans un format portable, et retirer à tout moment votre consentement aux intégrations. Écrivez à support@ridgework.org. Nous répondons sous un mois, en général bien plus vite.",
      "Réclamations. Si notre réponse ne vous satisfait pas, vous pouvez saisir la CNIL, 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou cnil.fr. Vous pouvez aussi saisir l’autorité de votre pays de résidence.",
      "Modifications. En cas de changement important, nous l’indiquerons sur cette page et, si le changement concerne l’usage de données déjà fournies, par e-mail.",
    ],
  },
  notify: {
    title: "Prévenez-moi à l’ouverture",
    body: "Un message, le jour où la caisse ouvre. Pas de newsletter, pas de conseils d’entraînement, pas de rappels pour noter vos sorties. Vous pouvez retirer votre adresse depuis le message lui-même.",
    label: "E-mail",
    placeholder: "vous@exemple.fr",
    cta: "Prévenez-moi",
    pending: "Envoi…",
    sentTitle: "Regardez votre boîte",
    sentBody:
      "Si cette adresse peut recevoir du courrier, une confirmation est en route. Rien n’est sur la liste tant que vous n’ouvrez pas le lien.",
    badEmail: "Cela ne ressemble pas à une adresse e-mail.",
    failed: "L’envoi a échoué. Réessayez dans un instant.",
    pageTitle: "Votre adresse — Ridgework",
    pageDescription: "Confirmez ou retirez l’adresse que vous avez laissée à Ridgework.",
    confirmedTitle: "Confirmé",
    confirmedBody: "Vous recevrez un message, le jour où la caisse ouvre. C’est toute la liste.",
    leftTitle: "Retirée",
    leftBody: "Votre adresse est supprimée. Rien n’est conservé et rien ne sera envoyé.",
    stoppedTitle: "Arrêté",
    stoppedBody:
      "Plus de note hebdomadaire. Votre compte et votre plan sont intacts — le bureau écrit toujours la semaine, il ne vous en parlera simplement plus.",
    unknownTitle: "Ce lien a déjà servi",
    unknownBody:
      "Il a déjà été utilisé une fois, ou l’adresse a été retirée. Dans les deux cas il n’y a plus rien à faire ici.",
    leaveCta: "Retirer mon adresse",
    back: "← Accueil Ridgework",
  },
  examplePage: {
    title: "Essayez une vraie journée — Ridgework",
    description: "Bougez les curseurs. Regardez la séance changer. Sans compte.",
    shared: {
      title: "{goal} — prêt le {date} | Ridgework",
      description:
        "{goal}. Trois semaines écrites à rebours depuis le {date} — changez la date et elles sont réécrites. Sans compte pour regarder.",
    },
    back: "← Ridgework",
    kicker: "Exemple en direct",
    h1: "Une vraie journée, pas une capture d’écran",
    lead: "Déplacez les curseurs ci-dessous comme vous vous sentez vraiment certains matins. Regardez la séance du jour et les explications changer avec eux — c’est le même bureau qu’un athlète connecté, sur un plan exemple de 50 km ultra.",
    noteTitle: "Rien n’est enregistré ici",
    noteBody:
      "Cet exemple se réinitialise quand vous partez. Créez un compte pour obtenir votre propre semaine, construite pour votre sport, votre objectif et votre date de pic . Sans carte.",
  },
  sourcesPage: {
    title: "Sources — Ridgework",
    description:
      "Tous les articles derrière les semaines d’entraînement, et à quoi sert vraiment chacun.",
    back: "← Ridgework",
    kicker: "Méthode",
    h1: "Chaque source, et à quoi elle sert",
    lead: "La page d’accueil cite les quatre articles qui correspondent directement à un mécanisme visible dans le produit. Voici la liste complète, y compris les lectures qui ont façonné la réflexion sans piloter une fonctionnalité précise.",
    noteTitle: "Ce qu’une citation ici ne signifie pas",
    noteBody:
      "Un article de cette liste n’est pas une promesse que Ridgework reproduira son résultat pour vous. Les moyennes publiées décrivent des groupes, pas votre mardi. Là où une source a façonné une règle réelle, la section méthode nomme la règle. Le reste est de la lecture de fond, et nous préférons le dire que remplir la page de citations.",
  },
  appPage: {
    title: "Outils — Ridgework",
    kicker: "Outils",
    h1: "L’entraînement de la semaine",
    lead: "Choisissez le jour où vous voulez être au pic. Le programme glissant écrit les semaines dans cette fenêtre. Fatigué : moins de travail. Rien ici n’est un avis médical.",
    lockedTitle: "Compte requis",
    lockedBody: "Créez un compte pour garder le programme, la semaine et le journal. Sans carte.",
    trialLabel: "Gratuit pour l’instant",
    testBanner: "Gratuit tant que l’immatriculation n’est pas terminée. Sans carte.",
    signInToTrain: "Connectez-vous, choisissez le jour où vous devez être prêt. Sans carte.",
    tabs: {
      today: "Aujourd’hui",
      plan: "Programme",
      week: "Semaine",
      prep: "Le jour",
      log: "Comment faire",
      profile: "Vous",
      whatIf: "Et si",
      passport: "Passeport",
      more: "Plus",
    },
  },
  auth: {
    title: "Connexion",
    lead: "Gardez la semaine que vous venez de voir. Sans carte. Vous choisissez le jour où vous devez être prêt.",
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
    verifyTitle: "Vérifiez votre e-mail",
    verifyBody:
      "Si cette adresse peut recevoir du courrier, un lien de confirmation est en route — le compte n’est pas actif tant que vous ne l’ouvrez pas. Rien après quelques minutes ? Regardez les spams, puis écrivez à support@ridgework.org.",
    forgotLink: "Mot de passe oublié ?",
    forgotTitle: "Envoyer un lien de réinitialisation",
    forgotBody:
      "Saisis l’adresse utilisée à l’inscription. Le lien sert une fois et expire en une heure.",
    forgotSend: "Envoyer le lien",
    resetSentTitle: "Regarde tes mails",
    resetSentBody:
      "Si cette adresse a un compte, un lien est en route. Nous ne disons pas lequel — cela révélerait qui sont nos athlètes.",
    setPasswordTitle: "Choisis un nouveau mot de passe",
    setPasswordBody: "Au moins 8 caractères. Cela te déconnecte partout ailleurs.",
    newPassword: "Nouveau mot de passe",
    setPasswordCta: "Enregistrer et se connecter",
    resetDoneTitle: "Mot de passe changé",
    resetDoneBody: "Connecte-toi avec le nouveau.",
    linkExpiredTitle: "Ce lien est épuisé",
    linkExpiredBody:
      "Un lien de réinitialisation sert une fois et dure une heure. Demandes-en un autre.",
    alreadyRegistered:
      "Cette adresse a déjà un compte. Connecte-toi, ou réinitialise le mot de passe si tu ne t’en souviens plus.",
    weakPassword: "Utilise au moins 8 caractères.",
    unverifiedTitle: "Confirme d’abord ton adresse",
    unverifiedBody:
      "Le compte existe mais l’adresse n’est pas confirmée. Nous avons renvoyé le lien.",
    resend: "Renvoyer le lien",
    resent: "Envoyé. Laisse-lui une minute.",
    backToSignIn: "Retour à la connexion",
    testNote: "14 jours gratuits. Sans carte. Ajoutez-en une quand vous voulez pour continuer.",
  },
  dashboard: {
    enrollments: "Vos programmes",
    empty: "Aucun programme sur ce compte. Choisissez ci-dessous.",
    billingTest: "14 jours gratuits, sans carte.",
    peak: "Pic",
    statusTest: "Test",
    saved: "Enregistré sur votre compte",
  },
  tools: {
    sync: {
      tab: "Sync",
      kicker: "Sortir du navigateur",
      title: "Votre plan, sur la montre et dans l’agenda",
      lead: "Deux chemins. Aucun ne demande la permission de qui que ce soit, et les deux peuvent servir.",
      calendarTitle: "S’abonner dans l’agenda",
      calendarLead:
        "Un flux vivant des séances écrites. Ajoutez-le une fois dans Google, Apple ou Outlook et il se tient à jour — si une semaine fatiguée réécrit une séance, l’agenda suit.",
      calendarCta: "Créer mon lien d’agenda",
      calendarNote:
        "Quiconque a ce lien peut lire vos séances : traitez-le comme un mot de passe. Le renouveler coupe l’ancien immédiatement.",
      copy: "Copier le lien",
      copied: "Copié.",
      rotate: "Renouveler le lien",
      intervalsTitle: "Envoyer vers intervals.icu",
      intervalsLead:
        "intervals.icu est gratuit et dispose de sa propre intégration Garmin Connect pour les séances planifiées. Reliez-les une fois là-bas, envoyez d’ici, et les séances arrivent sur la montre.",
      intervalsNote:
        "Votre clé reste sur notre serveur pour permettre l’envoi et n’est jamais renvoyée au navigateur. La déconnexion la supprime.",
      athleteId: "Athlete ID",
      apiKey: "Clé API",
      apiKeyHint:
        "Les deux sont dans intervals.icu, Settings → Developer. L’athlete ID ressemble à i12345.",
      connect: "Connecter",
      connected: "Connecté.",
      connectedAs: "Connecté en tant que",
      disconnect: "Déconnecter",
      push: "Envoyer les semaines écrites",
      pushing: "Envoi…",
      pushed: "Séances envoyées.",
      lastPushed: "Dernier envoi",
      failed: "Cela n’a pas fonctionné. Réessayez ou écrivez à support@ridgework.org.",
    },
    week: {
      save: "Enregistrer la semaine",
      saved: "Enregistré sur cet appareil",
      days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      types: { easy: "Facile", steady: "Soutenu", hard: "Dur", rest: "Repos" },
      session: "Ce que vous avez vraiment couru",
      readiness: "Comment le corps sent-il cette semaine ?",
      readinessLead:
        "Cela ne change que l’entraînement. Fatigué = moins de travail. Cassé = repos à la place de la qualité.",
      levels: { fresh: "Frais", ok: "Correct", tired: "Fatigué", wrecked: "Cassé" },
      notes: {
        fresh: "Garder la semaine écrite. Pas d’héroïsme extra.",
        ok: "Garder la charge. Pas de second jour dur.",
        tired: "Les séances dures et soutenues passent en facile. Vous vous entraînez moins.",
        wrecked:
          "Dur et soutenu deviennent repos. Le facile reste facile. Reprise la semaine suivante.",
      },
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
          none: "Test de parole. Si la côte vole la phrase, marchez jusqu’à ce qu’elle revienne.",
        },
        {
          zone: "Soutenu · haut Z2 / bas Z3",
          feel: "Phrases courtes. Contrôlé, pas une course.",
          watch: "Environ 75–85 % FC max. Pas sur une semaine fatiguée.",
          none: "Vous répondez à une question, vous ne racontez pas une histoire.",
        },
        {
          zone: "Dur / qualité · Z3–4",
          feel: "Quelques mots. Une dose par semaine, ou zéro si fatigué.",
          watch: "Seuil ~85–92 % FC max. Le seul jour dur.",
          none: "La respiration est bruyante. Vous ne discuteriez pas.",
        },
        {
          zone: "Escalade / force",
          feel: "Pas une zone FC. La préhension et le skill montent le pouls.",
          watch: "Ignorez les zones au mur. Comptez les longueurs ou séries, puis stop.",
          none: "Arrêtez quand la technique casse. La force est courte.",
        },
      ],
      alpineTitle: "Les semaines alpines ne sont pas que de la marche",
      alpine:
        "Les approches restent conversationnelles. Le spécifique ajoute une séance d’escalade et une dose de force courte. Base aérobie d’abord, puis force et technique, puis journées montagne avec sac. Les longueurs sont du travail.",
    },
    prep: mountainFr,
    log: {
      empty: "Aucune note d’entraînement cette semaine.",
      decision: "Ce que vous avez fait ou changé",
      why: "Pourquoi (sommeil, fatigue, vie)",
      add: "Ajouter",
      clear: "Vider le journal",
    },
    plan: planFr,
    athlete: athleteFr,
    passport: passportFr,
    whatIf: whatIfFr,
  },
  fieldPage: fieldFr,
};
