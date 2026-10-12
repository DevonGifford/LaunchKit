---
title: Premiers pas
description: Créez un projet à partir de LaunchKit, lancez-le en local et découvrez où se trouve chaque chose.
updated: 2026-10-12
order: 1
---

## Prérequis

- Node.js 24 ou version ultérieure
- pnpm 12 — la version exacte est fixée dans `package.json`

Aucune base de données, aucun compte ni aucune clé d’API n’est nécessaire. Un clone tout neuf s’installe, se compile et réussit ses tests sans la moindre variable d’environnement.

## Créer un projet

Clonez LaunchKit dans un nouveau dossier en le conservant comme dépôt distant `upstream`, afin de pouvoir fusionner ses améliorations dans votre projet plus tard :

```sh
git clone --origin upstream git@github.com:DevonGifford/LaunchKit.git my-site
cd my-site
git remote add origin git@github.com:your-org/my-site.git
pnpm install
pnpm exec playwright install chromium
pnpm dev
```

Le site tourne désormais sur `http://localhost:3000`.

## Où se trouve chaque chose

| Chemin              | Contenu                                                     |
| ------------------- | ----------------------------------------------------------- |
| `src/content/`      | Contenu des pages et documents longs, un dossier par langue |
| `messages/`         | Textes courts de l’interface, un fichier JSON par langue    |
| `src/app/theme.css` | Couleurs de la marque, polices et arrondi des angles        |
| `src/components/`   | Primitives, mise en page et composants de section           |
| `src/config/`       | Navigation, fonctionnalités activables et réglages du site  |

Les textes et la marque de votre projet vivent dans `src/content/`, `messages/` et `src/app/theme.css`. Les garder là, à l’écart du code partagé, est ce qui rend les futures fusions depuis LaunchKit simples.

## Commandes courantes

| Commande         | Rôle                                                                              |
| ---------------- | --------------------------------------------------------------------------------- |
| `pnpm dev`       | Lance le serveur de développement                                                 |
| `pnpm check`     | Vérifie les types, le lint, le formatage et les traductions, puis lance les tests |
| `pnpm test:e2e`  | Lance les tests de bout en bout dans de vrais navigateurs                         |
| `pnpm storybook` | Ouvre l’atelier de composants                                                     |
| `pnpm build`     | Produit une version de production                                                 |
