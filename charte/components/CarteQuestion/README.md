# CarteQuestion

L'écran central de l'app : la question du jour, ton billet et celui de ton ou ta partenaire.

- Fournis `question` (le « ? » final passe automatiquement en rouge), `date`, `serie` (nombre de jours), `prenom` (le partenaire) et `monPrenom`.
- `maReponse` et `saReponse` : tant que tu n'as pas répondu, son billet est scellé par un cachet et son texte n'est pas affiché. Quand les deux existent, les billets s'ouvrent et Point et Virgule passent en pose `revelation`.
- Le serveur ne doit jamais envoyer `saReponse` au téléphone avant `maReponse` : le composant cache, il ne protège pas.
