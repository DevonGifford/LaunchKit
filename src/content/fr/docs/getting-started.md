---
title: Démarrer avec LaunchKit
description: Ce qu’est LaunchKit, ce dont vous avez besoin, et comment passer d’un clone tout neuf à un site qui tourne en quelques minutes.
updated: 2026-10-17
order: 1
summary: Ce qu’est LaunchKit et ce qu’il laisse volontairement de côté, les deux outils nécessaires, les commandes pour faire tourner un site en local, un plan de l’arborescence et la façon dont une page s’assemble à partir de sections typées.
next: launching-a-project, making-it-yours, component-library
---

LaunchKit est une base réutilisable pour créer et lancer de meilleurs sites web, plus vite. Il donne à chaque nouveau projet ce dont un site moderne a besoin dès le premier jour : un système de design adaptatif avec des thèmes clair et sombre, quatre langues, du contenu par sections, des formulaires validés, des tests automatisés et une CI. Chaque projet consacre ensuite son temps à ce qui le rend différent.

L’idée tient en une ligne : **construire une fois, réutiliser souvent, améliorer de façon centralisée.** LaunchKit a des partis pris sur ses fondations et reste souple pour tout ce qui se construit par-dessus. Les composants et les outils partagés vivent dans LaunchKit, en upstream ; la marque, les textes, les sections propres et la logique métier appartiennent à chaque projet.

## Ce qui est inclus

- **Un socle applicatif moderne :** Next.js avec l’App Router, React, TypeScript strict et Tailwind CSS.
- **Un système de design à thèmes :** des tokens de couleur sémantiques, des composants accessibles de shadcn/ui et des apparences claire et sombre qui suivent le réglage du système de chaque visiteur.
- **Quatre langues :** l’anglais, l’espagnol, le français et l’allemand, avec des routes et des métadonnées localisées et une vérification des traductions manquantes.
- **Du contenu par sections :** les pages sont des listes typées de sections dans `src/content/`, séparées des composants React qui les affichent.
- **Des formulaires validés :** React Hook Form et Zod, vérifiés dans le navigateur puis à nouveau sur le serveur.
- **Des tests et des vérifications :** tests unitaires, en navigateur et de bout en bout, stories Storybook qui servent aussi de tests, et vérifications d’accessibilité avec axe.

Ce qu’il laisse volontairement de côté compte tout autant. Il n’y a ni base de données, ni authentification, ni paiement, ni service de monitoring payant. Chaque projet les ajoute quand il en a réellement besoin.

## Ce dont vous avez besoin

- Node.js 24 ou ultérieur
- pnpm 12, dans la version exacte fixée dans `package.json`

C’est tout. Un clone tout neuf s’installe, se compile et passe ses tests sans compte, sans clé d’API et sans variable d’environnement. Les réglages facultatifs sont décrits dans `.env.example`.

## Le lancer en local

Clonez LaunchKit dans un nouveau dossier, en le gardant comme remote `upstream` pour pouvoir fusionner ses améliorations plus tard :

```sh
git clone --origin upstream \
  git@github.com:DevonGifford/LaunchKit.git my-site
cd my-site
pnpm install

# Une seule fois : le navigateur des tests
pnpm exec playwright install chromium

pnpm dev
```

Le site tourne maintenant sur `http://localhost:3000`.

> Vous démarrez un vrai projet plutôt que d’explorer ? Lisez ensuite [Lancer avec LaunchKit](launching-a-project). Ce guide détaille les remotes, la configuration du dépôt et le déploiement, étape par étape.

## Les commandes du quotidien

| Commande         | Ce qu’elle fait                                                                   |
| ---------------- | --------------------------------------------------------------------------------- |
| `pnpm dev`       | Lance le serveur de développement                                                 |
| `pnpm check`     | Vérifie les types, le lint, le formatage et les traductions, puis lance les tests |
| `pnpm test:e2e`  | Compile le site et lance les tests de bout en bout sur ordinateur et sur mobile   |
| `pnpm storybook` | Ouvre l’atelier de composants sur `http://localhost:6006`                         |
| `pnpm build`     | Crée un build de production                                                       |

Les hooks Git lancent ESLint et Prettier sur les fichiers que vous commitez, vérifient le message de commit et lancent la vérification des types avant chaque push. `pnpm check` couvre tout cela et plus encore : lancez-le d’abord, et les hooks passeront.

## Où se trouve quoi

| Chemin              | Contenu                                                                         |
| ------------------- | ------------------------------------------------------------------------------- |
| `src/content/`      | Le contenu des pages et les documents longs, un dossier par langue              |
| `messages/`         | Les textes courts de l’interface, un fichier JSON par langue                    |
| `src/app/theme.css` | Les couleurs de la marque, les polices et le rayon des angles                   |
| `src/components/`   | Les primitives, la mise en page et les composants de section                    |
| `src/config/`       | Les informations du site, la navigation et les interrupteurs de fonctionnalités |
| `docs/`             | La spécification et les guides pour les mainteneurs                             |

Les textes et la marque de votre projet vivent dans `src/content/`, `messages/` et `src/app/theme.css`. Les garder là, à l’écart du code partagé, c’est ce qui rend les futures fusions depuis LaunchKit légères.

## Comment une page est assemblée

Une page est une liste ordonnée de sections, chacune étant un objet typé :

```ts
// src/content/fr/pages/contact.ts
export const contact = {
  meta: { title: 'Contact', description: '…' },
  sections: [
    {
      id: 'intro',
      type: 'hero',
      title: 'Parlons de votre prochain lancement.',
      description: '…',
    },
    {
      id: 'message',
      type: 'contact',
      title: 'Envoyer un message',
    },
  ],
} satisfies PageDefinition;
```

Réordonnez, retirez ou ajoutez des sections et la page suit, sans modifier aucun composant. TypeScript vérifie chaque champ pendant que vous écrivez, et un type de section inconnu arrête le build.
