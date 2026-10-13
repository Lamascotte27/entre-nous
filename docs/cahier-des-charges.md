# Cahier des charges MVP – App de couple française

13 octobre 2026 · @Arthur

## Contexte et objectifs

Le MVP est une app de couple française, sur iOS et Android, en ligne le 15 janvier 2027, un mois avant la Saint-Valentin (14 février 2027). Chaque jour, les deux partenaires reçoivent la même question. La réponse de l'autre reste cachée tant qu'on n'a pas répondu soi-même.

- **Cible :** couples francophones de 20 à 45 ans. En priorité ceux qui vivent ensemble depuis 1 à 10 ans, et les couples à distance.
- **Promesse :** 2 minutes par jour pour mieux se connaître.
- **Modèle :** abonnement. Un seul paiement couvre les deux partenaires.
- **Nom :** à trouver. Il doit marcher à l'oral, en France comme au Québec, et le domaine en .fr ou .app doit être libre.

Le MVP doit prouver une chose : un onboarding français convertit au moins aussi bien que la moyenne du marché, et les couples reviennent chaque jour.

| Indicateur, 30 jours après le lancement | Cible | Repère |
| --- | --- | --- |
| Couples appairés | 1 000 | aucun |
| Installs dont le partenaire rejoint sous 7 jours | ≥ 50 % | aucun |
| Install → essai gratuit | ≥ 8 % | médiane santé et bien-être : 6,9 % ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps)) |
| Essai → abonné payant | ≥ 35 % | médiane santé et bien-être : 37,7 % |
| Couples qui répondent tous les deux à J+7 | ≥ 40 % | aucun |
| Note moyenne sur les stores | ≥ 4,5 | Paired : 4,6 en France |

Règle de décision : on n'augmente la pub payante que si au moins 3,7 % des installs deviennent payants, sur deux cohortes d'au moins 500 installs. En dessous, la pub coûte plus qu'elle ne rapporte.

## Périmètre

Le MVP tient en une boucle : question du jour, réponse, révélation, notification au partenaire. Tout ce qui ne sert pas cette boucle ou le paiement attend la V2.

| Fonctionnalité | MVP | Gratuit ou Premium |
| --- | --- | --- |
| Compte (Apple, Google, email par lien magique) | Oui | Gratuit |
| Onboarding personnalisé et consentement | Oui | Gratuit |
| Appairage par lien ou code | Oui | Gratuit |
| Question du jour et révélation | Oui | Gratuit |
| Réaction et commentaire sur une réponse | Oui | Gratuit |
| Historique des réponses | Oui | 7 derniers jours en gratuit, tout en Premium |
| Série de jours | Oui | Gratuit, avec un gel par semaine en Premium |
| Packs de questions thématiques à volonté | Oui | Premium |
| Dates importantes et rappels | Oui | Gratuit |
| Notifications | Oui | Gratuit |
| Abonnement partagé, essai de 7 jours | Oui | aucun |
| Paramètres, export et suppression du compte | Oui | Gratuit |
| Widget d'écran d'accueil | V1.1, février 2027 | Gratuit |
| Carte cadeau « un an pour deux » | V1.1, février 2027 | Achat |
| Quiz, jeux, parcours d'experts, frise photo, analyses IA | V2 | Premium |
| Paiement sur le web, autres pays francophones | V2 | aucun |

Le gratuit doit suffire pour vivre la promesse chaque jour. Le Premium vend la profondeur (packs, historique) et la tranquillité (gel de série). Paired est critiqué pour ses relances d'achat « vingt fois par jour » : on limite le paywall à une apparition spontanée par jour au maximum.

## Parcours et onboarding

L'onboarding compte 17 écrans maison, plus 3 écrans système. Il reprend la structure de Paired : compte, profil, relation, partenaire, paywall. Il ajoute trois écrans propres à la France : le consentement, les pronoms et les objectifs. Chaque écran a une barre de progression et un retour arrière.

1. **Accueil.** « Faites de votre couple un rituel quotidien ». Boutons Apple et Google, lien « Continuer avec mon email » (lien magique, sans mot de passe).
2. **Bienvenue.** « Quelques questions pour adapter l'app à votre couple ». Lien secondaire : « J'ai un code de mon ou ma partenaire », qui ouvre le parcours partenaire.
3. **Confidentialité.** « Vos réponses restent entre vous deux ». Case de consentement explicite, non pré-cochée, pour les données sur la vie de couple. Sans elle, on ne peut pas continuer.
4. **Ton prénom.** Date de naissance facultative.
5. **Comment s'adresser à toi.** Il, elle ou iel. Sert uniquement à accorder les phrases en français.
6. **Le prénom de ton ou ta partenaire,** avec son pronom.
7. **Depuis quand êtes-vous ensemble ?** Sélecteur de date. « On te rappellera votre anniversaire. »
8. **Votre situation.** En couple, pacsé·es, fiancé·es, marié·es. Si pacsés ou mariés : date facultative, pour un second rappel.
9. **Vous vivez ensemble ?** Ensemble, séparément mais proches, à distance.
10. **Des enfants ?** Oui, non, famille recomposée.
11. **Ce que vous cherchez** (choix multiple). Mieux se connaître, plus de complicité, parler des sujets difficiles, garder le lien à distance, pimenter. Cela règle le mélange de questions.
12. **Inviter \[prénom\].** Lien à partager sur WhatsApp ou iMessage, avec un aperçu soigné, plus un code à 6 caractères. On peut passer l'écran.
13. **Notifications.** « Sois prévenu·e quand \[prénom\] a répondu », puis la demande système iOS.
14. **Comment nous as-tu connus ?** TikTok, Instagram, un·e créateur·rice (avec champ code), ami·e, App Store, podcast, ChatGPT ou autre IA, mon ou ma partenaire.
15. **Avant / après.** La routine, la distance qui s'installe, face à ce que l'app apporte.
16. **Paywall** « Un abonnement pour vous deux ». Annuel présélectionné avec essai de 7 jours, mensuel en dessous. Fermable.
17. **Offre de rattrapage** à la fermeture du paywall, une seule fois, réellement valable 24 h.

Ensuite, l'utilisateur arrive directement sur la question du jour. Les trois premières questions sont légères et drôles, pour donner envie de les envoyer au partenaire.

**Parcours partenaire.** Celui qui arrive avec un code passe par les écrans 1, 3, 4, 5 et 13, puis arrive sur la question du jour. Si le couple a déjà un abonnement, il n'y a pas de paywall. Sinon, il voit le paywall à son tour, car n'importe lequel des deux peut payer.

## Fonctionnalités détaillées

La question du jour (F3) est la seule fonctionnalité qui doit être parfaite au lancement. Les autres doivent être fiables, sans plus.

### F1. Compte

En tant qu'utilisateur, je crée un compte en un geste et je le retrouve sur un autre téléphone.

- Connexion avec Apple, Google ou un lien magique envoyé par email. Pas de mot de passe.
- L'email est enregistré dès l'écran 1, pour relancer ceux qui ne passent pas le paywall (avec leur accord).
- Suppression du compte possible depuis l'app, comme l'exige Apple.

### F2. Appairage

En tant qu'utilisateur, j'invite mon ou ma partenaire en un message, quel que soit son téléphone.

- Lien universel qui ouvre l'app ou le store, plus un code de 6 caractères valable 7 jours.
- Un compte appartient à un seul couple à la fois.
- Un couple iPhone + Android fonctionne exactement comme un couple iPhone + iPhone.
- L'un ou l'autre peut se désappairer. L'historique commun est alors archivé, puis supprimé après 30 jours. On peut aussi le supprimer tout de suite.
- Tant que le partenaire n'a pas rejoint, l'app propose une question « en solo » et un rappel d'invitation, une fois par jour au plus.

### F3. Question du jour et révélation

En tant que couple, nous recevons la même question chaque jour et découvrons nos réponses ensemble.

- Une question par couple et par jour, la même pour les deux. Elle change à 4 h, heure du fuseau de référence du couple (celui de la personne qui a invité).
- Formats : question ouverte (texte de 1 à 500 caractères) ou choix multiple.
- **La réponse du partenaire n'est jamais envoyée au téléphone avant que les deux aient répondu.** C'est le serveur qui la retient, pas un simple flou à l'écran : sinon, on peut tricher.
- On peut modifier sa réponse tant que l'autre n'a pas répondu. Elle est verrouillée ensuite.
- Quand le second répond, les deux réponses s'affichent avec une animation, en moins de 500 ms, et l'autre reçoit une notification.
- Une question manquée reste disponible 24 h. En Premium, on peut rattraper n'importe quelle question passée.
- Sans réseau, la réponse est gardée en brouillon et envoyée au retour de la connexion.

### F4. Réagir et discuter

- Une réaction par réponse, parmi 6 emojis.
- Un fil de commentaires sous chaque question révélée, texte uniquement, notifié au partenaire.

### F5. Historique

- Liste des questions passées avec les deux réponses, recherche par mot.
- Gratuit : 7 derniers jours. Premium : tout l'historique.

### F6. Série

- La série augmente d'un jour quand les deux ont répondu le même jour.
- En Premium, un gel automatique par semaine protège la série d'un jour manqué.
- Paliers célébrés : 7, 30, 100 et 365 jours.

### F7. Notifications

- « \[Prénom\] a répondu », envoyée dès que le partenaire répond.
- « Vos réponses sont prêtes », quand les deux ont répondu.
- Un rappel quotidien à l'heure choisie (20 h 30 par défaut), seulement si on n'a pas encore répondu.
- Rappels d'anniversaire à J-7 et le jour J.
- 3 notifications par jour au maximum par personne.
- Sur l'écran verrouillé, jamais le texte d'une réponse.

### F8. Dates importantes

- Début de la relation, PACS, mariage, plus des dates libres.
- Compte à rebours et rappels (F7).

### F9. Abonnement partagé

- Le droit Premium appartient au couple, pas à la personne. N'importe lequel des deux peut payer.
- Le détail des offres est dans la partie Monétisation.

### F10. Paramètres et confidentialité

- Heure du rappel, thèmes à exclure (dont le pack intimité), pronom, désappairage.
- Export de mes données (fichier JSON), suppression du compte.
- Lien vers la gestion de l'abonnement dans l'App Store ou le Play Store, et bouton « Restaurer mes achats ».

### F11. Gestion du contenu

- Les questions sont stockées en base, avec leurs tags (partie Contenu). Pas besoin de mettre l'app à jour pour en ajouter.
- Un tableur ou un écran d'administration simple permet d'ajouter, désactiver et programmer des questions (par exemple le pack Saint-Valentin).

## Contenu

Il faut 400 questions écrites en français au lancement, puis 30 nouvelles par mois. Le contenu est l'avantage principal face à Paired, qui est traduit de l'anglais.

| Bloc | Nombre | Accès |
| --- | --- | --- |
| Rotation quotidienne, de légère à profonde | 200 | Gratuit |
| Pack Souvenirs | 40 | Premium |
| Pack Projets et avenir | 40 | Premium |
| Pack Argent et quotidien | 40 | Premium |
| Pack Communication et disputes | 40 | Premium |
| Pack Intimité (activé seulement si les deux l'acceptent, 18 ans et plus) | 40 | Premium |

**Tags de chaque question :** thème ; profondeur de 1 à 3 ; format (ouverte ou choix multiple) ; ancienneté du couple (moins d'un an, installé, parents) ; compatible à distance ; sensible.

**Ordre :** les 3 premiers jours, profondeur 1, des questions drôles qui donnent envie de partager. La profondeur monte ensuite progressivement sur 14 jours, puis la rotation mélange selon les objectifs choisis à l'écran 11. Une question n'est jamais reposée au même couple.

**Règles d'écriture :**

- Tutoiement, phrases de moins de 20 mots.
- Accords gérés par variables selon les pronoms (« Qu'est-ce qui t'a rendu{e} fier{e} » devient « rendue fière » pour elle). Pas de point médian dans les questions.
- Références françaises : les vacances d'août, le marché du dimanche, les repas de famille. Pas de Thanksgiving.
- Jamais de culpabilisation, ni de question qui oblige à juger l'autre.
- 80 % de questions ouvertes, 20 % de choix multiples (« Toi ou moi ? », « Plutôt A ou B ? »).

**Relecture :** un·e conseiller·e conjugal·e relit les 400 questions avant le lancement, en priorité les packs Communication et Intimité.

**Calendrier :** un pack Saint-Valentin de 14 questions, du 1er au 14 février 2027.

## Monétisation

L'offre phare est l'annuel à 59,99 € TTC pour deux, avec 7 jours d'essai. C'est le prix que Paired pratique en France sur son site. Le paywall l'affiche aussi par personne : 2,50 € par mois.

| Offre | Prix TTC | Essai | Rôle |
| --- | --- | --- | --- |
| Annuel, présélectionné | 59,99 € | 7 jours | l'offre visée (80 % des ventes attendues) |
| Mensuel | 14,99 € | aucun | sert d'ancre : l'annuel affiche « −67 % » |
| Offre de rattrapage, une fois | 39,99 € la première année | 7 jours | récupère les indécis qui ferment le paywall |
| Carte cadeau, en V1.1 | 49,99 € pour un an | aucun | Saint-Valentin, anniversaires, fiançailles |

**Où apparaît le paywall :**

- à la fin de l'onboarding ;
- quand on touche un contenu Premium (pack, historique ancien, rattrapage) ;
- au 3e jour d'utilisation pour ceux qui n'ont pas pris l'essai, une seule fois.

Jamais plus d'une apparition spontanée par jour.

**Règles :**

- Le droit Premium est attaché au couple côté serveur. Si les deux s'abonnent par erreur, l'app le détecte et explique comment annuler le second abonnement.
- Après un désappairage, seul le payeur garde le Premium.
- Le paywall affiche le prix, la durée, le renouvellement automatique, la date de fin de l'essai, et les liens vers les CGU, la confidentialité et « Restaurer mes achats ». C'est ce qu'exige la règle 3.1.2 de l'App Store.
- Le compte à rebours de l'offre de rattrapage est réel et lié au compte. Un faux compte à rebours peut être une pratique commerciale trompeuse.
- Inscription au programme Apple pour les petites entreprises avant la première vente (15 % de commission). Côté Google Play, compter environ 15 % aussi.
- Les paywalls sont pilotés à distance (textes, ordre, prix testés) pour faire des tests A/B sans mettre l'app à jour.

## Exigences techniques

Une seule base de code React Native pour iOS et Android, et un backend Supabase hébergé dans l'UE. Ce choix permet à une personne seule ou à un·e freelance de tenir la date du 15 janvier.

*(Schéma « architecture du MVP · app, backend UE, 3 services externes » non reproduit dans cette version Markdown.)*

Le téléphone ne reçoit la réponse du partenaire que lorsque les règles d'accès de la base l'autorisent, c'est-à-dire après sa propre réponse.

| Brique | Choix | Pourquoi |
| --- | --- | --- |
| App | React Native, Expo, TypeScript | une base de code pour les deux systèmes ; corrections d'écrans envoyées à distance |
| Backend | Supabase (Postgres, Auth, temps réel, fonctions, tâches planifiées), région UE | rapide à monter, règles d'accès en base, données dans l'UE |
| Abonnements | RevenueCat | droits partagés, webhooks, paywalls modifiables à distance |
| Notifications | Expo Push (APNs, FCM) | un seul service pour les deux systèmes |
| Analytics | PostHog, hébergement UE | entonnoirs, rétention, tests A/B |
| Erreurs | Sentry, région UE | suivi des crashs |
| Liens d'invitation | liens universels sur le domaine de l'app | pas de service tiers |

**Modèle de données**

| Table | Contenu |
| --- | --- |
| `users` | prénom, pronom, date de naissance facultative, fuseau, consentements |
| `couples` | début de la relation, situation, cohabitation, enfants, objectifs, fuseau de référence |
| `couple_members` | lien entre utilisateur et couple, rôle (invitant ou invité), dates |
| `invites` | code, lien, expiration |
| `questions` | texte avec variables d'accord, format, options, tags, actif ou non |
| `daily_questions` | couple, date, question |
| `answers` | question du jour, auteur, texte chiffré, date, verrouillée ou non |
| `reactions`, `comments` | réactions et fil de discussion |
| `streaks` | série en cours, record, gels restants |
| `important_dates` | type, date, rappel |
| `entitlements` | couple, offre, payeur, expiration (mis à jour par les webhooks) |

**Exigences générales**

- Ouverture de l'app en moins de 2 secondes, révélation en moins de 500 ms.
- Sauvegarde quotidienne de la base, conservée au moins 7 jours.
- Trois environnements : développement, recette, production. Builds automatiques.
- Texte agrandi, lecteurs d'écran et contrastes AA sur tous les écrans.
- Versions minimales d'iOS et d'Android à fixer d'après le parc des testeurs, en couvrant au moins 95 % des téléphones français.

## RGPD, sécurité et conformité

Toutes les données de l'app sont traitées comme des données sensibles (article 9 du RGPD). Elles parlent de vie de couple et de sexualité, et un couple appairé peut révéler une orientation sexuelle, même indirectement ([CJUE, C-184/20](https://www.twobirds.com/en/insights/2022/global/what-is-in-a-name-cjeu)).

**Données personnelles**

- Consentement explicite et séparé (écran 3), qu'on peut retirer dans les paramètres. Le pack Intimité demande un second accord, de chacun des deux partenaires.
- On ne collecte que le nécessaire : pas de photo de profil, pas de genre, seulement un pronom pour la grammaire. La date de naissance est facultative.
- Hébergement dans l'Union européenne, chiffrement en transit et au repos. Les réponses sont chiffrées dans leur colonne en base.
- Aucun SDK publicitaire ne reçoit de réponses, de thèmes ou de profil. L'attribution ne remonte que l'install, l'essai et l'achat. Grindr a été condamné à 65 M NOK pour avoir partagé ce type d'information avec ses partenaires pub ([CMS](https://cms.law/en/nor/publication/gdpr-enforcement-tracker-report-2025/norway)).
- Analyse d'impact (AIPD) et registre des traitements avant le lancement. Contrat de sous-traitance avec chaque prestataire technique.
- Export des données en JSON et suppression du compte depuis l'app.
- Respect des [recommandations de la CNIL pour les applications mobiles](https://www.cnil.fr/fr/recommandations-applications-mobiles), qui mène des contrôles sur les SDK depuis 2025.

**Sécurité**

- Règles d'accès en base : on ne lit que les données de son couple, et la réponse de l'autre seulement après avoir répondu.
- Verrouillage par Face ID ou code, en option.
- Notifications sans contenu de réponse sur l'écran verrouillé.

**Stores et droit de la consommation**

- Classification d'âge 18+ à cause du pack Intimité. À défaut, le pack sort du MVP et on vise une classification plus basse.
- Étiquettes de confidentialité App Store et section Sécurité des données de Google Play remplies à partir du registre.
- Prix TTC, essai clair, offres limitées qui le sont vraiment.
- Mentions légales, CGU, CGV et politique de confidentialité en français simple.
- Si l'abonnement est vendu sur le web plus tard : résiliation en trois clics obligatoire.

## Analytics

On suit 15 événements, dès la première bêta. Ils servent à trouver l'écran d'onboarding où l'on perd le plus de monde, et à savoir quand lancer la pub. Aucun événement ne contient le texte d'une réponse.

| Événement | Propriétés | Sert à |
| --- | --- | --- |
| `app_installed` | source d'attribution | coût par install par canal |
| `onboarding_step_viewed` | numéro d'écran | entonnoir écran par écran |
| `account_created` | Apple, Google ou email | choix du mode de connexion |
| `consent_given` | type de consentement | conformité |
| `partner_invite_sent` | WhatsApp, iMessage, code | canal d'invitation |
| `couple_paired` | délai depuis l'install | taux d'appairage |
| `notif_permission` | acceptée ou refusée | taux d'acceptation |
| `attribution_answered` | source déclarée, code créateur | paiement des créateurs |
| `paywall_viewed` | emplacement, variante | tests A/B |
| `trial_started` | offre | install → essai |
| `subscription_started` | offre, prix | essai → payant |
| `subscription_renewed` ou `subscription_cancelled` | offre | rétention payante |
| `question_answered` | thème, profondeur, délai | contenu qui marche |
| `answers_revealed` | temps entre les deux réponses | santé de la boucle |
| `streak_milestone` | palier | engagement |

**Tableau de bord hebdomadaire :**

- install → essai et essai → payant, par source ;
- taux d'appairage à 7 jours ;
- rétention des couples à J1, J7 et J30 (les deux ont répondu ce jour-là) ;
- part des jours où les deux répondent ;
- install → payant à 35 jours, comparé au seuil de 3,7 %.

## Planning

Il y a 13 semaines entre aujourd'hui et le lancement. Le développement du cœur de l'app en prend 6, la bêta 2. Il reste 9 jours pour les corrections et la soumission, puis 3 jours de marge pour la validation des stores.

*(Schéma « planning du MVP · 13 oct. 2026 → 14 févr. 2027 » non reproduit dans cette version Markdown.)*

Les comptes TikTok démarrent dès décembre, pour avoir une audience le jour du lancement. La pub payante attend février.

**Jalons de décision**

- 26 octobre 2026 : maquettes validées, nom choisi, domaine réservé.
- 6 décembre 2026 : boucle complète testable en interne sur un iPhone et un Android.
- 3 janvier 2027 : fin de la bêta. On passe à la suite si au moins 60 % des couples répondent tous les deux 5 jours sur 7.
- 12 janvier 2027 : soumission aux stores, avec toutes les cases de la recette cochées.
- 15 janvier 2027 : lancement.
- 14 février 2027 : bilan à 30 jours, avec les indicateurs du début de ce document.

## Budget

Le MVP coûte de 4 à 53 k€ selon qui le développe. À cela s'ajoutent environ 10 k€ de lancement pour janvier et février. Ce sont des ordres de grandeur, à valider par des devis et sur les grilles tarifaires des outils.

| Option de réalisation | Coût du développement | Délai | Commentaire |
| --- | --- | --- | --- |
| Toi au développement, avec un assistant de code IA | 0 à 500 € (outils) | 12 semaines | le moins cher ; demande d'y passer ses journées |
| Un·e freelance React Native senior | 25 à 45 k€ (50 à 70 jours à 450–650 €) | 10 à 12 semaines | le plus sûr pour tenir la date |
| Agence | 60 à 120 k€ | 4 à 6 mois | trop lent pour la Saint-Valentin |

**À ajouter dans tous les cas, 3,5 à 8 k€ :**

- Design : interface et 6 à 8 illustrations, 1,5 à 3 k€.
- Contenu : relecture des 400 questions par un·e conseiller·e conjugal·e, 1 à 2 k€.
- Juridique : CGU, CGV, politique de confidentialité et AIPD, 1 à 3 k€.
- Comptes développeur : 99 $ par an pour Apple, 25 $ une fois pour Google.

**Fonctionnement mensuel au lancement :** entre 100 et 300 € (base de données, builds, analytics, suivi des erreurs, emails). La gestion des abonnements est gratuite au début, puis prend un petit pourcentage du chiffre d'affaires.

**Lancement, janvier et février 2027 :** environ 10 k€. Créateurs payés à la performance, créas vidéo, et pub concentrée du 1er au 14 février. C'est le budget de départ du scénario réaliste du rapport (6 k€ par mois).

## Recette

L'app part en soumission aux stores quand toutes ces cases sont cochées. Les tests se font sur au moins 4 appareils : 2 iPhone et 2 Android, dont un ancien modèle de chaque.

**Fonctionnel**

- [ ] Parcours complet pour un couple iPhone + Android, de l'install à la première révélation
- [ ] Parcours partenaire par lien et par code, appli déjà installée ou non
- [ ] Couple à distance sur deux fuseaux : même question, changement à 4 h du fuseau de référence
- [ ] Brouillon gardé sans réseau, puis envoyé
- [ ] Série, gel Premium et paliers corrects sur 10 jours simulés

**Paiement (en environnement de test des stores)**

- [ ] Achat, essai, conversion, annulation, expiration, remboursement, restauration
- [ ] Le Premium s'applique aux deux partenaires, et seul le payeur le garde après un désappairage
- [ ] Double abonnement détecté et expliqué
- [ ] Paywall conforme à la règle 3.1.2 de l'App Store

**Sécurité et données**

- [ ] Test d'intrusion simple : la réponse du partenaire n'apparaît dans aucune réponse de l'API avant la double réponse
- [ ] Un utilisateur ne peut lire aucune donnée d'un autre couple
- [ ] Refus du consentement : on ne peut pas continuer, et rien n'est enregistré
- [ ] Export JSON et suppression du compte fonctionnent
- [ ] Aucune réponse en clair sur l'écran verrouillé

**Qualité**

- [ ] Plus de 99,5 % de sessions sans crash pendant la bêta
- [ ] Ouverture de l'app en moins de 2 secondes sur l'ancien modèle
- [ ] Texte agrandi, VoiceOver et TalkBack sur les écrans clés, contrastes AA

**Bêta**

- [ ] 30 couples en bêta pendant 2 semaines
- [ ] Au moins 60 % des couples répondent tous les deux 5 jours sur 7 la deuxième semaine
- [ ] Aucune question signalée comme blessante sans correction

**Stores**

- [ ] Fiches en français : titre, sous-titre, mots-clés (« questions couple », « jeu couple », « application couple »), captures, vidéo
- [ ] Classification d'âge, étiquettes de confidentialité, lien vers la politique de confidentialité
- [ ] Compte de démonstration fourni à l'équipe de validation d'Apple

## Après le MVP

La V2 est classée par impact attendu sur la rétention et le revenu. On la reclassera avec les chiffres des 30 premiers jours.

| Priorité | Fonctionnalité | Pourquoi | Quand |
| --- | --- | --- | --- |
| 1 | Widget d'écran d'accueil | les challengers qui montent (Candle, Couple Joy) misent dessus | V1.1, février 2027 |
| 2 | Carte cadeau « un an pour deux » | ventes de Saint-Valentin | V1.1, février 2027 |
| 3 | Quiz « Qui me connaît le mieux ? » | deuxième raison d'ouvrir l'app chaque semaine | mars 2027 |
| 4 | Jeux « Toi ou moi ? » et « Plutôt A ou B ? » | moments légers, très partageables sur TikTok | mars 2027 |
| 5 | Mode à distance | fuseaux, compte à rebours des retrouvailles ; segment le plus motivé | avril 2027 |
| 6 | Parcours d'experts français | profondeur Premium, crédibilité presse | printemps 2027 |
| 7 | Frise de souvenirs avec photos | attachement au contenu créé ensemble | printemps 2027 |
| 8 | Bilan de couple et analyses IA de la semaine | valeur perçue du Premium (consentement spécifique) | été 2027 |
| 9 | Paiement sur le web pour les renouvellements | environ 5 points de commission en moins en UE ; utile surtout au-delà de 1 M$ de CA, quand Apple passe à 26 % | été 2027 |
| 10 | Belgique, Suisse, Québec | environ 3 millions de couples de plus | automne 2027 |

## Sources

- Étude d'opportunité complète, avec le simulateur de chiffre d'affaires : [Paired, version française](../rapport/index.html)
- [RevenueCat, State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps)
- [Paired, FAQ](https://www.paired.com/frequently-asked-questions) et [fiche App Store France](https://apps.apple.com/fr/app/id1469609343)
- [CNIL, recommandations pour les applications mobiles](https://www.cnil.fr/fr/recommandations-applications-mobiles) et [données sensibles](https://www.cnil.fr/fr/definition/donnee-sensible)
- [Apple, conditions pour les apps dans l'Union européenne](https://developer.apple.com/support/apps-in-the-eu)
