# Paw Planner - informations internes

En français pour s'assurer que les informations passent bien dans l'équipe sans quiproquos.

## Imports Aliases

Dans le fichier [client/vite.config.ts](./client/vite.config.ts), des alias de routes ont été créés. Les alias de routes permettent de raccourcir et de normaliser les imports. Les alias créés dans ce fichier ne sont utilisables que dans /client.
- @ = `root/client/src` (plutôt que de mettre `../../` plusieurs fois devant un fichier, `@/` nous assure d'être toujours dans `src`)
- @style = `root/client/src/styles/global.scss` (on peut donc importer le CSS global avec toujours le même import, peu importe où se trouve le fichier, à savoir `@import "@style";`)
