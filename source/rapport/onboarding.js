// Onboarding Paired reconstitué depuis la vidéo appkittie (22 écrans, iOS, oct. 2026)
window.ONBOARDING = [
  {
    phase: "compte", sys: false,
    title: "Make connection a daily habit",
    sub: "Celebrate time each day to connect with each other through quick daily activities.",
    ui: { illus: true, buttons: ["Continue with Apple", "Continue with Google"], link: "Sign up with email" },
    lever: "Compte créé avant toute question",
    why: "La promesse est une habitude, pas une thérapie : ça déculpabilise. Le compte se crée en un tap avec Apple. Paired récupère l'email tout de suite, ce qui permet de relancer par mail les personnes qui ne passent pas le paywall.",
    fr: "« Faites de votre couple un rituel quotidien ». Garder Apple et Google en premier, l'email en lien secondaire."
  },
  {
    phase: "compte", sys: true,
    title: "Sign in with Apple",
    sub: "Feuille système iOS : nom + partage ou masquage de l'email.",
    ui: { sheet: true },
    lever: "Friction quasi nulle",
    why: "La feuille Apple inspire confiance et évite le mot de passe. C'est le chemin que prend la majorité des utilisateurs iPhone.",
    fr: "Identique. Sur Android, Google One Tap."
  },
  {
    phase: "compte", sys: false,
    title: "Create your Paired account",
    sub: "Champ email, puis mot de passe (avec suggestion du trousseau iCloud).",
    ui: { fields: ["Email", "Password"], buttons: ["Next"] },
    lever: "Effet d'engagement",
    why: "Chaque info donnée augmente l'investissement de l'utilisateur. Plus il en a mis, moins il abandonne au paywall.",
    fr: "Remplacer le mot de passe par un lien magique pour supprimer un écran."
  },
  {
    phase: "compte", sys: true,
    title: "AutoFill Password",
    sub: "Suggestion de mot de passe fort par iOS.",
    ui: { sheet: true },
    lever: "Écran système",
    why: "Compté dans les 22 écrans, mais c'est iOS qui l'affiche. Paired ne le maîtrise pas.",
    fr: "Disparaît avec le lien magique."
  },
  {
    phase: "compte", sys: true,
    title: "Save password?",
    sub: "iOS propose d'enregistrer l'identifiant dans le trousseau.",
    ui: { sheet: true },
    lever: "Écran système",
    why: "Encore un écran imposé par le choix du mot de passe. Trois écrans sur 22 servent juste à créer le compte par email.",
    fr: "Disparaît avec le lien magique."
  },
  {
    phase: "profil", sys: false,
    title: "Welcome to Paired",
    sub: "To personalise your experience, we'll ask you a few questions.",
    ui: { illus: true, buttons: ["Continue"], link: "I have my partner's code" },
    lever: "Annonce la personnalisation",
    why: "Prévenir qu'on va poser des questions les rend légitimes. Le lien « code de mon partenaire » sort tout de suite le 2e partenaire du tunnel : il rejoint l'abonnement existant sans repasser par le paywall.",
    fr: "« Quelques questions pour adapter Paired à votre couple »."
  },
  {
    phase: "profil", sys: false,
    title: "Tell us a little about yourself",
    sub: "Prénom + date de naissance (facultative).",
    ui: { fields: ["Your first name", "Your birthday (optional)"], buttons: ["Next"] },
    lever: "Le prénom devient une arme",
    why: "Le prénom est réutilisé dès l'écran suivant (« Which gender describes you best, Léa? »). L'onboarding ressemble alors à une conversation, plus à un formulaire.",
    fr: "Tutoiement ou vouvoiement ? À tester. Le tutoiement colle mieux au sujet intime."
  },
  {
    phase: "profil", sys: false,
    title: "Which gender describes you best, {name}?",
    sub: "",
    ui: { options: ["Female", "Male", "Gender queer / Non-binary", "Other"] },
    lever: "Segmentation du contenu",
    why: "Sert à personnaliser les questions et à nourrir les audiences publicitaires (lookalikes Meta/TikTok).",
    fr: "Inclusif dès le départ : couples LGBT+ compris dans toute la com'."
  },
  {
    phase: "profil", sys: false,
    title: "Get ready to explore your relationship",
    sub: "We'll ask a few details about your relationship to provide you with relevant couple activities.",
    ui: { illus: true, buttons: ["Continue"] },
    lever: "Respiration",
    why: "Un écran sans effort casse la monotonie du formulaire et relance l'attention avant le bloc « relation ».",
    fr: "Illustration de couple variée, ton chaleureux."
  },
  {
    phase: "relation", sys: false,
    title: "What's your partner's name?",
    sub: "",
    ui: { fields: ["Their name"], buttons: ["Next"] },
    lever: "Le partenaire devient réel",
    why: "Le prénom du partenaire revient ensuite partout, jusqu'au paywall : « Choose a plan for you & Thomas ». On n'achète plus une app, on achète quelque chose pour son couple.",
    fr: "Gérer l'élision : « pour toi et Thomas », « d'Inès »."
  },
  {
    phase: "relation", sys: false,
    title: "How long have you been together as a couple?",
    sub: "We'll add this to your relationship timeline and send you reminders on your anniversary.",
    ui: { picker: "September · 22 · 2015" },
    lever: "Valeur immédiate",
    why: "La date débloque un bénéfice concret (rappel d'anniversaire) et segmente : un couple de 6 mois ne veut pas les mêmes questions qu'un couple de 12 ans.",
    fr: "Ajouter la date de PACS ou de mariage : deux anniversaires à fêter, deux rappels."
  },
  {
    phase: "relation", sys: false,
    title: "How do you define your relationship with {partner}?",
    sub: "",
    ui: { options: ["In a relationship", "Engaged", "Married", "In a civil partnership"] },
    lever: "Segmentation",
    why: "Personnalise les parcours (fiançailles, mariage, vie de famille).",
    fr: "Remplacer « civil partnership » par « Pacsé·es ». Près de 200 000 PACS par an en France."
  },
  {
    phase: "relation", sys: false,
    title: "Do you live together?",
    sub: "",
    ui: { options: ["We live together", "We live separately, nearby", "We live separately, long distance"] },
    lever: "Repère les couples à distance",
    why: "Les couples à distance ont le plus besoin d'un rituel à distance : c'est le segment le plus motivé à payer.",
    fr: "Créer un mode « à distance » dédié (fuseaux horaires, Erasmus, expat). Bon angle TikTok."
  },
  {
    phase: "relation", sys: false,
    title: "Do either of you have kids?",
    sub: "Let us know if you or your partner have children, either together or from previous relationships.",
    ui: { options: ["Yes", "No"] },
    lever: "Empathie + contenu",
    why: "Les parents ont moins de temps. L'app peut leur proposer des formats plus courts et des thèmes « couple après bébé ».",
    fr: "Ajouter l'option « famille recomposée » pour adapter le contenu."
  },
  {
    phase: "viral", sys: false,
    title: "Invite {partner}",
    sub: "Pair your accounts to answer questions, quizzes, games and more.",
    ui: { card: "Share your invite link", buttons: ["Invite {partner}"], link: "I have a code from {partner}", skip: true },
    lever: "La boucle virale",
    why: "L'app ne sert à rien seul : chaque utilisateur doit faire venir son partenaire. 1 install achetée = ~2 installs, sans payer la seconde. Ça gonfle le classement App Store et fait baisser le coût réel par install.",
    fr: "Lien d'invitation pensé pour WhatsApp et iMessage avec un aperçu soigné (« Léa t'invite à répondre à la question du jour »)."
  },
  {
    phase: "viral", sys: false,
    title: "Get notified when {partner} completes an activity",
    sub: "…or adds a memory to your Timeline.",
    ui: { notif: true, buttons: ["Yes please"] },
    lever: "Pré-permission des notifs",
    why: "Un écran maison avant la pop-up iOS fait monter le taux d'acceptation. Et la notif est sociale (« ton partenaire a répondu ») plutôt qu'un rappel générique : c'est le moteur de la rétention.",
    fr: "« Être prévenu·e quand Thomas a répondu ». Jamais de rappel culpabilisant."
  },
  {
    phase: "viral", sys: true,
    title: "“Paired” Would Like to Send You Notifications",
    sub: "Pop-up système iOS.",
    ui: { alert: true },
    lever: "Écran système",
    why: "Arrive juste après le « Yes please » : l'utilisateur a déjà dit oui une fois, il accepte par cohérence.",
    fr: "Identique."
  },
  {
    phase: "attrib", sys: false,
    title: "How did you hear about Paired?",
    sub: "",
    ui: { options: ["Friend or family", "TikTok", "Podcast", "YouTube", "Therapist or counselor", "App Store / Play Store", "ChatGPT or similar", "My partner"], skip: true },
    lever: "Attribution déclarative",
    why: "Depuis iOS 14 (ATT), le tracking pub est flou. Demander directement mesure TikTok, podcasts et bouche-à-oreille. L'option « ChatGPT » montre que les recommandations des IA comptent déjà.",
    fr: "Ajouter « Instagram », « Un·e créateur·rice » et un champ code créateur pour payer les influenceurs à la perf."
  },
  {
    phase: "paywall", sys: false,
    title: "Paired helps couples stay in love",
    sub: "",
    ui: { compare: { without: ["Stuck in the day to day routine", "Feeling detached", "Avoiding deeper conversations"], with: ["Getting to know each other deeper", "Feeling connected every day", "Talking openly about sex, finances, conflict"] }, buttons: ["Next"] },
    lever: "Avant / après",
    why: "Rappelle la douleur (routine, distance) et l'aspiration juste avant le prix. Le paywall arrive au pic d'envie.",
    fr: "Formulations françaises naturelles : « la routine a pris le dessus », « on ne se parle plus vraiment »."
  },
  {
    phase: "paywall", sys: false,
    title: "Choose a plan for you & {partner}",
    sub: "",
    ui: { paywall: true },
    lever: "Ancrage + prix par personne",
    why: "Le mensuel à 29,99 $ sert de leurre : il fait paraître l'annuel à 79,99 $ « −77 % ». Le prix est affiché par personne (3,33 $ « each »), car 1 abonnement couvre les deux. L'essai de 7 jours est présenté comme déjà activé.",
    fr: "Prix en euros ronds (59,99 € / an), mention « 1 abonnement pour vous deux ». Afficher le prix TTC comme l'exige le droit français."
  },
  {
    phase: "paywall", sys: false,
    title: "One time offer! 50% off",
    sub: "Offer expires in 23:56:34 · Just $79.99 → $39.99/year",
    ui: { offer: true },
    lever: "Downsell à la fermeture",
    why: "Quand on ferme le paywall, une offre −50 % avec compte à rebours s'affiche. Ça récupère une partie des indécis à moindre prix. Le bouton de refus « I don't want it » culpabilise légèrement.",
    fr: "Attention : un faux compte à rebours peut être une pratique commerciale trompeuse (DGCCRF, directive UE 2005/29). Faire une offre réellement limitée."
  },
  {
    phase: "paywall", sys: true,
    title: "In-App Purchase",
    sub: "Paired Premium · 1-week free trial · $39.99 per year",
    ui: { sheet: true, iap: true },
    lever: "Paiement en 1 geste",
    why: "Face ID, aucune carte à saisir. L'essai gratuit enlève la peur de payer : la décision réelle est repoussée à J+7.",
    fr: "Identique. Rendre l'annulation évidente : c'est la meilleure défense contre les avis 1 étoile."
  }
];

window.PHASES = {
  compte:   { label: "Compte",           n: 0 },
  profil:   { label: "Profil",           n: 1 },
  relation: { label: "Relation",         n: 2 },
  viral:    { label: "Partenaire + notifs", n: 3 },
  attrib:   { label: "Attribution",      n: 4 },
  paywall:  { label: "Paywall",          n: 5 }
};
