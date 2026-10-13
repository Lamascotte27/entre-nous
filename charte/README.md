Entre nous est une app de couple française : chaque jour, une question ; chacun écrit sa réponse ; le billet de l'autre reste scellé tant qu'on n'a pas répondu. La marque repose sur une idée : **un couple, c'est un point-virgule, deux signes et une seule phrase.** Point (bleu) et Virgule (rouge) sont les mascottes, et le point-virgule se glisse entre « entre » et « nous » dans le logo.

Signature : « Deux, et pourtant liés ; ». Promesse : « Une question par jour, rien que pour vous deux. »

## Les trois couleurs qui racontent le couple

Chaque couleur vive a un rôle fixe. Ne les échange jamais.

| Token | Rôle | Exemples |
| --- | --- | --- |
| `rouge` | **Toi**, et Virgule | ton billet, ton avatar, le bouton principal, le cachet |
| `bleu` | **L'autre**, et Point | son billet, son avatar, les liens, le focus |
| `beurre` | **Vous deux** | la série, les célébrations, les étincelles |

Le rôle dépend du téléphone : sur chaque écran, la personne qui le tient est rouge, son ou sa partenaire est bleu.

- Pose les écrans sur `papier`, les billets et les cartes sur `craie`. Écris en `graphite`, les informations secondaires en `graphite-doux`.
- Sur un aplat `rouge`, écris en `on-rouge` ; sur `bleu`, en `on-bleu` ; sur `beurre`, en `on-beurre` (jamais en blanc).
- N'écris en `rouge` qu'à 24 px et plus. En dessous (signature, lien d'action), utilise `rouge-texte`.
- N'utilise jamais `beurre` pour du texte ni pour un trait fin sur papier : il n'est lisible qu'en aplat.
- Pour les fonds teintés, utilise `buvard` (ce qui est à toi), `bleu-pale` (ce qui vient de l'autre) et `beurre-pale` (ce qui est à vous deux).
- Proportions d'un écran : environ 70 % de papier et craie, 20 % de graphite, 10 % de couleurs vives. Une seule couleur vive domine un écran.
- `succes` et `erreur` s'accompagnent toujours d'une icône et d'un mot. `erreur` ne doit jamais se lire comme le rouge de marque : l'icône et la phrase font la différence.

Le thème Nuit reprend les mêmes rôles, en éclaircissant `rouge` et `bleu`. Sur leurs aplats, le texte devient alors sombre (`on-rouge`, `on-bleu`).

## Typographie

Deux familles, chargées depuis Google Fonts :

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Figtree:ital,wght@0,400..800;1,400..800&display=swap">
```

- **Caprasimo** (`--font-display`) : le logo, la question du jour (`question`), les titres d'écran (`display-l`), les affiches (`display-xl`), les titres de cartes (`titre-carte`). Jamais en dessous de 22 px, jamais en capitales, jamais pour un paragraphe.
- **Figtree** (`--font-sans`) : tout le reste. Les réponses dans les billets en `billet`, le texte courant en `corps`, les boutons en `corps-fort`, les signatures en `signature` (italique).
- Une seule ligne Caprasimo forte par écran : la question, ou le titre.
- Le « ? » qui termine la question du jour est en `rouge`, une taille au-dessus. C'est le seul signe de ponctuation coloré dans un texte.
- Capitales seulement pour les étiquettes `micro` (QUESTION DU JOUR).
- Typographie française : espace insécable avant « ? ! ; : », guillemets « », point médian pour l'écriture inclusive dans l'interface (« aimé·e »).

## Logo

Utilise les fichiers de `assets/Logos` ou le composant `Logo`, jamais une recomposition.

- `entre-nous-logo.svg` sur papier ou craie. `entre-nous-logo-papier.svg` sur `bleu` ou une photo sombre. `entre-nous-logo-graphite.svg` pour une seule encre (tampon, gravure, fond `beurre`).
- `entre-nous-signe.svg` : le point-virgule seul, pour l'icône d'app, l'avatar des réseaux, le favicon.
- Marge autour du logo : au moins la hauteur de Point. Taille minimale du logo complet : 24 px de haut ; du signe : 16 px.
- Ne remplace jamais Point et Virgule par le « ; » d'une police. Pas d'ombre, de contour ou de dégradé sur le logo.

## Mascottes

Point et Virgule ont neuf poses (`assets/Mascottes`, composant `PointVirgule`). Le détail est dans la section « Point et Virgule ». À retenir :

- Toujours en autocollant (découpe papier) sur tout fond qui n'est pas `papier`.
- Une pose par écran, au service d'un moment : `question`, `attente`, `revelation`, `fete`, `endormi`, `calin`, `ensemble`.
- Jamais tristes, jamais moqueurs, jamais culpabilisants.

## Formes et matières

- **Le billet** : chaque réponse est un petit mot sur fond `craie`, coins `rayon-billet`, ombre `ombre-billet`, incliné de `incline-toi` (ton billet) ou `incline-autre` (le sien), signé en italique.
- **Le cachet** : le billet de l'autre est scellé par un cachet de cire rouge marqué du point-virgule. Il ne sert qu'à ça.
- **La ponctuation comme système** : « ? » pour la question du jour, « … » pour l'attente, « ! » pour la révélation, « ; » pour vous deux. Fichiers dans `assets/Ponctuation`.
- **Rayons** : `rayon-billet` pour les billets (du papier), `rayon-m` pour les cartes et notifications, `rayon-l` pour la carte question et les feuilles, `rayon-pilule` pour les boutons et badges.
- **Ombres** : `ombre-billet` pour ce qui est posé, `ombre-flottante` pour ce qui flotte. Jamais de lueur colorée.
- **Espacements** : marges d'écran `espace-5`, padding des cartes `espace-6`, écart entre billets `espace-4`, entre sections `espace-8`.
- **Motif** : `motif-ponctuation.svg` en fond d'écrans d'attente, de réseaux sociaux et de papeterie. Jamais derrière du texte long.

## Iconographie

- Les quatre signes de ponctuation sont les icônes de marque. Utilise-les pour les états, pas pour les actions.
- Pour les actions de l'interface (paramètres, historique, partager), utilise Lucide en trait de 2 px, extrémités arrondies, 24 px, couleur `graphite`. Ce choix n'est pas encore figé : à valider avec le design de l'app.
- Pas d'émoji dans l'interface, sauf les 6 réactions aux billets.

## Accessibilité

- Chaque couleur de texte est vérifiée à 4,5:1 minimum sur les fonds cités dans sa note, dans les deux thèmes.
- Anneau de focus : 2 px de `focus` (bleu) à 2 px de distance, visible sur papier, craie et teintes.
- Ne distingue jamais toi et l'autre par la couleur seule : la signature (prénom) et l'inclinaison du billet le disent aussi.
- Respecte « réduire les animations » : la révélation devient un simple fondu.

## Utiliser les composants

Les composants sont dans `components/bundle.js` sous `window.EntreNous` (`Logo`, `PointVirgule`, `Bouton`, `CarteQuestion`, `Billet`, `Cachet`, `SerieBadge`, `CarteOffre`, `NotificationPush`). Ils demandent React 18, `tokens.css` et `components/bundle.css` sur la page.
