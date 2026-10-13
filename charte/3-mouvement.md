# Mouvement

Le mouvement d'Entre nous imite le papier : on pose, on glisse, on décachette. Pas de rebond de jeu vidéo, sauf pour les célébrations.

## Les moments animés

| Moment | Ce qui se passe | Durée | Courbe |
| --- | --- | --- | --- |
| Billet envoyé | Ton billet glisse de 12 px vers le haut et prend son inclinaison | 250 ms | `cubic-bezier(.2, .8, .2, 1)` |
| Révélation | Le cachet se fend en deux et tombe, le billet se déplie (rotation de 1,2° à 0 puis retour), Point et Virgule passent en pose `revelation` | 600 ms | `cubic-bezier(.34, 1.4, .64, 1)` |
| Point attend… | Les trois points s'allument l'un après l'autre, en boucle | 1 200 ms par cycle | linéaire |
| Palier de série | Point et Virgule sautent deux fois, confettis rouge, bleu et beurre | 900 ms | ressort |
| Changement d'écran | Fondu croisé et glissement de 16 px | 200 ms | `ease-out` |

## Règles

- Une seule animation forte par écran : la révélation.
- Les confettis sont réservés aux paliers de série (7, 30, 100 et 365 jours).
- Avec « réduire les animations » activé : la révélation devient un fondu de 150 ms, les points de suspension restent fixes, pas de confettis.
- Retour haptique léger sur l'envoi du billet, moyen sur la révélation.
