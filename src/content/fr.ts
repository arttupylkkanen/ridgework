import { fieldFr } from "./field";
import { planFr } from "./plan-tools";
import { athleteFr } from "./athlete-copy";
import { mountainFr } from "./mountain-prep";
import { passportFr, whatIfFr } from "./passport";
import type { Copy } from "./types";

export const fr: Copy = {
  metaTitle: "Ridgework — Programmes d’entraînement trail, alpin et altitude",
  metaDescription:
    "Que courir cette semaine pour un trail 20 km, un ultra 50 ou 100 km, ou une journée alpine. Une semaine fatiguée s’allège. 14 jours gratuits, sans carte.",
  footerTag: "Un entraînement de montagne qui suit la semaine que vous avez vraiment.",
  legalEntity: "Ridgework, France.",
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
    account: "Compte",
  },
  cta: {
    start: "Commencer 14 jours gratuits",
    pricing: "Voir les tarifs",
    openTools: "Ouvrir les outils",
  },
  hero: {
    kicker: "Entraînement en montagne",
    h1: "Entraînez-vous pour le jour qui compte.",
    lead: "Choisissez le jour où vous devez être prêt. Chaque semaine est écrite à rebours depuis cette date — et réécrite quand la vie s’en mêle.",
    trial: "Gratuit tant que l’immatriculation de la société n’est pas terminée. Sans carte, rien à résilier.",
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
    teaserH2: "Ce que cela peut promettre, et ce que cela ne peut pas",
    teaserLead:
      "La plupart des jours en facile, une séance dure si vous êtes frais, un affûtage vers le jour J — cette forme vient d’une poignée d’articles d’endurance bien cités, pas d’un modèle générique à votre nom. Voici la partie que la plupart des produits d’entraînement passent sous silence.",
    teaserCta: "Lire la méthode complète",
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
              "Semaine 20 (fin du spécifique) : 3×12 min à allure marathon sur trail vallonné, 4 min facile ; gates chaleur et niggle avant le départ. Puis affûtage 10–14 jours.",
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
    h2: "Choisissez la sortie — ou le moteur. Puis le pic.",
    lead: "Vous choisissez quand vous voulez être au pic. Pas de course ? Commencez par le moteur aérobie : plus de travail à basse fréquence cardiaque, le gras comme carburant par défaut. Toute durée convient — plus long est clairement mieux.",
    columns: {
      name: "Programme",
      duration: "Durée",
      focus: "Focus",
      recipe: "Recette de séance",
    },
    rows: [
      {
        id: "engine",
        name: "Moteur aérobie",
        duration: "Recommandé 16 semaines / 4 mois",
        focus:
          "Plus de travail à allure conversationnelle. Gras comme carburant par défaut. Pas de course obligatoire.",
        locked:
          "La plupart des jours conversationnels. La longue vers 90 min. Si vous parlez en phrases, vous êtes dans le travail. Pas de dose de qualité — le moteur est la qualité.",
        pull: "Si vous sortez une phrase entière, vous êtes dans le travail.",
        layout: "textFirst",
      },
      {
        id: "trail20",
        name: "Trail 20 km",
        duration: "Recommandé 10 semaines",
        focus: "Volume facile, une dose de qualité, longue vers 90–110 min",
        locked:
          "Semaine 8 : 6×3 min à allure 10 km sur trail roulant, 2 min facile. Longue 90–110 min. Puis 7 jours d’affûtage.",
        layout: "sessionLead",
      },
      {
        id: "fifty",
        name: "Ultra 50 km",
        duration: "Recommandé 24 sem. / 6 mois",
        focus: "Base aérobie, puis progression de la longue, pic la semaine de course",
        locked:
          "Semaine 20 (fin du spécifique) : 3×12 min à effort marathon sur trail roulant, 4 min facile. Puis 10–14 jours d’affûtage.",
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
  },
  who: {
    h2: "Pour qui — et pour qui non",
    forTitle: "Conçu pour",
    forItems: [
      "Athlètes d’endurance qui planifient la semaine autour de la vraie vie et du terrain",
      "Ceux qui s’entraînent vers un trail 20 km, un ultra 50 ou 100 km, une journée alpine, un itinéraire lié ou un camp d’altitude",
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
        body: "Notez la sortie longue, la chaleur, et ce qui a tiré. La semaine suivante part de là, pas du plan rêvé.",
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
    changeNote: "Une séance a changé, et le plan dit pourquoi. Le reste de la semaine est intact et la date de course n’a pas bougé.",
    facts: [
      { label: "Sommeil cette nuit", value: "5 heures" },
      { label: "Hier", value: "32 km longue" },
      { label: "Genou droit", value: "2/10" },
      { label: "Météo dimanche", value: "28°C" },
    ],
    says: "Ce qui change",
    actions: [
      "Sauter les intervalles d’aujourd’hui",
      "45–60 min facile à la place",
      "Déplacer la longue au lundi s’il reste chaud",
      "Boire 500–750 ml/h sur la longue",
      "Réévaluer demain",
    ],
    note: "Pas un diagnostic. Si le genou gonfle, se bloque ou empire, voyez un médecin. Ici on ne change que la semaine d’entraînement.",
  },
  firstWeek: {
    kicker: "Vos 14 premiers jours",
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
  },
  pricing: {
    kicker: "Tarifs",
    h2: "14 jours sur le calendrier. Puis 19 €/mois.",
    lead: "Courez d’abord une vraie semaine. Ensuite 19 €/mois si vous restez. Résiliez à tout moment, y compris pendant les 14 jours.",
    badge: "Prix actuel",
    trialBadge: "14 jours gratuits",
    name: "Abonnement Ridgework",
    price: "€19",
    freeTag: "Gratuit",
    freeNow: "Gratuit tant que l’immatriculation de la société n’est pas terminée. Sans carte, rien à résilier. 19 €/mois à l’ouverture.",
    per: "/mois",
    blurb: "14 jours gratuits. Puis 19 €/mois. Résiliez à tout moment.",
    features: [
      "Sept programmes, du moteur aérobie au 100 km et aux journées alpines",
      "19 €/mois tant que l’abonnement continue",
      "Résiliation à tout moment, y compris pendant les 14 jours — alors rien n’est facturé",
      "Des semaines d’entraînement, pas de claims médicaux",
    ],
    laterTitle: "Après les 14 jours",
    laterBody:
      "Si vous restez, Polar facture 19 €/mois. Si vous résiliez pendant les 14 jours, vous n’êtes pas facturé. Plus tard, l’accès dure jusqu’à la fin de la période déjà payée. Aucun autre tarif n’est affiché sur ce site.",
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
      "Ridgework ne prend aucun paiement tant que l’immatriculation de la société n’est pas terminée. Vos 14 jours continuent, et rien ne peut être débité entre-temps.",
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
        a: "14 jours gratuits. Puis 19 €/mois si vous restez. Résiliez pendant les 14 jours : rien n’est facturé.",
      },
      {
        q: "Puis-je résilier à tout moment ?",
        a: "Oui. Un bouton Résilier est dans le bureau. Pendant les 14 jours Polar ne facture pas. Après un mois payé, l’accès dure jusqu’à la fin de ce mois. Carte et factures est à côté.",
      },
      {
        q: "Après les 14 jours ?",
        a: "Si vous n’avez pas ajouté de carte, le bureau se met en pause jusqu’à ce que vous en ajoutiez une — rien n’est facturé automatiquement. Si vous en avez ajouté une, l’abonnement continue à 19 €/mois sauf résiliation.",
      },
      {
        q: "Faut-il une carte pour l’essai ?",
        a: "Non. Commencez gratuitement pendant 14 jours sans carte. Ajoutez-en une quand vous voulez, pendant ou après l’essai, pour continuer à 19 €/mois.",
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
      { q: "Support ?", a: "support@ridgework.org — réponse sous quelques jours ouvrés." },
    ],
  },
  disclaimer: {
    h2: "Avertissement",
    body: "Ridgework fournit des outils d’aide à la décision pour l’entraînement et la préparation en montagne. Ce n’est pas un dispositif médical ni un substitut à un conseil professionnel. Les citations de recherche publiée informent des cadres de planification et des checklists ; ce ne sont pas des claims médicaux ni des prescriptions individualisées. Vous restez responsable de vos décisions de sécurité. Pas de diagnostics. Pas de claims de traitement.",
  },
  foundingPage: {
    kicker: "Founding",
    h1: "Commencez 14 jours gratuits",
    lead: "Les mêmes semaines. 14 jours gratuits, puis 19 €/mois.",
    trial: "14 jours gratuits. Puis 19 €/mois. Résiliez à tout moment.",
    note: "Sans carte pendant 14 jours. Ajoutez-en une quand vous voulez pour continuer à 19 €/mois. C’est le seul tarif affiché ici.",
    back: "← Ridgework",
    title: "Founding — Ridgework",
    description:
      "Entraînement hebdomadaire. 14 jours gratuits, puis 19 €/mois. Résiliez à tout moment.",
  },
  termsPage: {
    title: "Conditions d’utilisation",
    updated: "Dernière mise à jour : septembre 2026",
    body: [
      "Ridgework fournit des plans d’entraînement hebdomadaires — pas de soins médicaux, pas de diagnostics. Prix : 14 jours gratuits, puis 19 €/mois. Résiliez à tout moment (support@ridgework.org). Pendant les 14 jours, la résiliation signifie aucune facture. Vous restez responsable de la sécurité en montagne et à l’entraînement. Les droits impératifs des consommateurs français/UE ne sont pas limités.",
    ],
  },
  privacyPage: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : septembre 2026",
    body: [
      "Stub privacy notice (EU / France / GDPR principles). Company: Ridgework, France. Contact: support@ridgework.org. Full counsel-reviewed policy before launch. We do not sell personal data for ads. Payments via Polar. Not a medical service — do not submit sensitive health diagnoses.",
      "Rights: access, rectification, erasure, restriction, portability, objection where applicable; complaint to a French/EU authority.",
    ],
  },
  examplePage: {
    title: "Essayez une vraie journée — Ridgework",
    description: "Bougez les curseurs. Regardez la séance changer. Sans compte.",
    back: "← Ridgework",
    kicker: "Exemple en direct",
    h1: "Une vraie journée, pas une capture d’écran",
    lead: "Déplacez les curseurs ci-dessous comme vous vous sentez vraiment certains matins. Regardez la séance du jour et les explications changer avec eux — c’est le même bureau qu’un athlète connecté, sur un plan exemple de 50 km ultra.",
    noteTitle: "Rien n’est enregistré ici",
    noteBody:
      "Cet exemple se réinitialise quand vous partez. Créez un compte pour obtenir votre propre semaine, construite pour votre sport, votre objectif et votre date de pic — 14 jours gratuits, sans carte.",
  },
  sourcesPage: {
    title: "Sources — Ridgework",
    description: "Tous les articles derrière les semaines d’entraînement, et à quoi sert vraiment chacun.",
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
    lockedBody:
      "Créez un compte pour les 14 jours gratuits : programme, semaine, préparation du jour et journal. Puis 19 €/mois si vous restez.",
    trialLabel: "Essai 14 jours",
    testBanner: "14 jours gratuits, sans carte. Puis 19 €/mois si vous en ajoutez une.",
    signInToTrain: "Connectez-vous, choisissez une date de pic. 14 jours gratuits, sans carte.",
    tabs: {
      today: "Aujourd’hui",
      plan: "Programme",
      week: "Semaine",
      prep: "Le jour",
      log: "Comment faire",
      profile: "Vous",
      whatIf: "Et si",
      passport: "Passeport",
    },
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
