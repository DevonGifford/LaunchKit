---
title: Lancer avec LaunchKit
description: Un exemple concret, d’un dépôt vide à un site en ligne, testé et qui continue de profiter des améliorations de LaunchKit.
updated: 2026-10-17
order: 3
summary: Un parcours en huit étapes pour lancer un site avec LaunchKit : préparer le dépôt, lui donner une marque, composer les pages avec des sections existantes, brancher le formulaire de contact, lancer les vérifications, mettre en ligne et intégrer les futures versions.
next: making-it-yours, component-library
---

LaunchKit est fait pour qu’on construise dessus. Ce parcours suit un projet de la première commande au jour du lancement : **UnPocketed**, une application mobile qui a besoin d’une page de présentation avec ses fonctionnalités, quelques captures d’écran et des liens de téléchargement. C’est l’un des sites prévus sur LaunchKit, ce qui en fait un bon exemple : assez petit pour être suivi, assez différent du site de LaunchKit pour le démontrer.

Les étapes sont les mêmes pour tous les projets. Là où UnPocketed fait un choix, le vôtre peut en faire un autre.

## 1. Partir d’upstream

Un projet dérivé est un dépôt à part entière qui partage l’historique Git de LaunchKit. C’est cet historique commun qui permet aux améliorations de descendre plus tard : commencez donc par un clone, pas par une copie.

```sh
git clone --origin upstream \
  git@github.com:DevonGifford/LaunchKit.git unpocketed-site
cd unpocketed-site
git remote add origin \
  git@github.com:unpocketed/unpocketed-site.git
git push -u origin main
pnpm install
```

LaunchKit est maintenant le remote `upstream` et votre dépôt est `origin`. GitHub n’autorise qu’un seul fork par compte, d’où un clone avec deux remotes plutôt qu’un fork : ce qui compte, c’est l’historique, pas le badge.

Préparez ensuite le dépôt :

1. Lancez `scripts/setup-github.sh`. Il crée la branche `staging` et les règles qui la protègent, elle et `main` : des changements uniquement par pull request, et la CI doit passer.
2. Activez les alertes et les mises à jour de sécurité de Dependabot quand le script le propose. La configuration est fournie avec le code, mais GitHub ne l’active pas de lui-même sur un nouveau dépôt.
3. Remplacez les coordonnées dans `CODE_OF_CONDUCT.md` et `SECURITY.md`.

## 2. Lui donner une marque

L’identité d’UnPocketed commence dans un seul fichier. Sa palette remplace les deux blocs de tokens de `src/app/theme.css`, l’un pour le clair, l’autre pour le sombre, et tous les composants suivent. Son logo va dans `public/brand/`, sous forme de nouveaux fichiers plutôt qu’en écrasant ceux de LaunchKit, ce qui garde les futures fusions propres.

Ouvrez Storybook et basculez entre les thèmes. Toutes les sections y sont, à toutes les tailles d’écran : un problème de palette apparaît en quelques minutes, et le panneau d’accessibilité signale tout texte qui n’atteint pas le contraste requis.

## 3. Façonner les pages

La page de présentation d’une application a besoin d’une ouverture forte, de preuves qu’elle mérite d’être installée et d’un moyen clair de l’obtenir. La page d’accueil d’UnPocketed, dans `src/content/en/pages/home.ts`, se compose de sections que LaunchKit possède déjà :

| Section         | Son rôle sur la page d’accueil d’UnPocketed                                 |
| --------------- | --------------------------------------------------------------------------- |
| `hero-centered` | La promesse de l’application, avec le bouton de téléchargement en premier   |
| `showcase`      | Un carrousel de vraies captures, en clair et en sombre                      |
| `features`      | Ce que fait l’application, en trois groupes simples                         |
| `reviews`       | Ce qu’en disent les premiers utilisateurs, une fois qu’il y a de vrais avis |
| `faq`           | Confidentialité, tarifs et plateformes, avant même qu’on pose la question   |
| `cta-band`      | Les liens de téléchargement à nouveau, pour qui lit jusqu’au bout           |

Aucun composant n’a besoin de changer : la page, ce sont des données, et TypeScript vérifie chaque champ. Tout ce qui est propre à UnPocketed, comme une rangée de badges des stores, deviendrait une nouvelle section du projet, construite comme l’explique [Le design system de LaunchKit](component-library).

## 4. Renseigner les informations

`src/config/site.ts` reçoit le nom du projet, ses coordonnées et ses profils sociaux. `src/config/navigation.ts` définit les menus. Pour le site d’une application sur une seule page, cela peut se limiter à Fonctionnalités, Avis et FAQ, pointant vers des sections de la page d’accueil. Chaque libellé est un message dans `messages/`, donc les menus se traduisent avec tout le reste.

## 5. Brancher le formulaire de contact

C’est l’étape facile à oublier. Le formulaire de contact de LaunchKit valide chaque message, dans le navigateur puis sur le serveur, et s’arrête là : l’envoi est laissé à chaque projet, pour qu’un clone tout neuf n’ait besoin d’aucun compte de messagerie. Tant que vous ne l’avez pas branché, les messages ne vont nulle part.

L’envoi tient en une fonction, `deliver()` dans `src/lib/forms/contact-action.ts`. Transmettez-y le message à un service d’e-mail, un CRM ou un webhook. Déclarez les clés dans `src/env.ts`, pour qu’une valeur manquante échoue sans risque, et n’enregistrez pas les messages eux-mêmes dans les logs : ce sont des données personnelles.

## 6. Tout vérifier

Avant toute mise en ligne, lancez les mêmes vérifications que la CI :

```sh
# Types, lint, formatage et traductions,
# puis les tests unitaires, navigateur et stories
pnpm check

# Un build de production, testé sur ordinateur et mobile
pnpm test:e2e
```

À elles deux, elles vérifient l’accessibilité de chaque page dans les deux thèmes, s’assurent qu’aucune page ne défile horizontalement sur un téléphone de 320 px et repèrent toute langue à laquelle il manque un message.

## 7. Mettre en ligne

Déployez chez n’importe quel hébergeur qui fait tourner Next.js. Sur Vercel, connectez le dépôt et les déploiements de production suivent `main`. Renseignez `NEXT_PUBLIC_SITE_URL` avec la vraie adresse du site, pour que les liens canoniques, le sitemap et les alternatives de langue pointent vers le bon domaine.

Dès lors, le travail suit le modèle de branches de LaunchKit : des branches de courte durée vers `staging` par pull request, et `staging` vers `main` quand c’est prêt à partir.

## 8. Continuer à intégrer les améliorations

Le lancement n’est pas la fin de l’histoire. Quand LaunchKit publie une nouvelle version, UnPocketed la fusionne de façon délibérée :

```sh
git fetch upstream --tags
git switch staging
git switch -c chore/launchkit-v0.2.0
git merge v0.2.0
pnpm install
pnpm check && pnpm test:e2e
```

Lisez d’abord les notes de cette version dans le `CHANGELOG.md` de LaunchKit ; les changements incompatibles sont accompagnés des étapes à suivre. Des conflits dans `src/content/`, `messages/` et `theme.css` sont attendus. Gardez votre version : celles de LaunchKit pour ces fichiers ne sont que des exemples.

Et quand UnPocketed construit quelque chose d’utile à d’autres sites, comme un meilleur carrousel de captures, cela peut voyager dans l’autre sens : en pull request vers LaunchKit, puis de retour dans la version suivante. C’est toute l’idée. Le construire une fois, le réutiliser souvent et l’améliorer de façon centralisée.
