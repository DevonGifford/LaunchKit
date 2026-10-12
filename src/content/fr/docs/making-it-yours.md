---
title: Vous l’approprier
description: Changez la marque, réécrivez les pages, choisissez vos langues et continuez de profiter des améliorations de LaunchKit.
updated: 2026-10-12
order: 2
---

## Marque

Chaque couleur de LaunchKit est un token sémantique — `background`, `foreground`, `surface`, `primary`, `muted`, `accent` et quelques autres — défini pour les apparences claire et sombre dans `src/app/theme.css`. Les composants n’utilisent que les noms des tokens : une nouvelle palette se résume à modifier ce seul fichier.

Gardez pour chaque couleur de texte un contraste d’au moins 4,5:1 avec les fonds sur lesquels elle apparaît. Les commentaires de `theme.css` précisent quels tokens servent au texte et lesquels sont décoratifs.

## Pages

Les pages structurées sont des listes ordonnées de sections dans `src/content/<langue>/pages/`. Pour modifier une page, modifiez ses sections : réordonnez-les, supprimez-en une ou ajoutez-en une d’un type que LaunchKit fournit déjà. TypeScript vérifie chaque champ pendant la saisie.

Une section dont votre projet a besoin mais que LaunchKit ne propose pas commence dans votre projet. Si elle s’avère utile à d’autres sites, proposez-la en upstream.

## Langues

Les langues prises en charge sont listées dans `src/i18n/routing.ts`. Pour en ajouter une, déclarez-la ici, créez `messages/<langue>.json` et `src/content/<langue>/`, puis lancez :

```sh
pnpm i18n:check
```

La vérification liste chaque message et chaque document manquants, pour que rien ne parte à moitié traduit par mégarde.

## Rester synchronisé

Les améliorations de LaunchKit arrivent comme n’importe quel changement Git : délibérément.

```sh
git fetch upstream
git merge upstream/main
```

Les fusions ne sont pas automatiques et peuvent provoquer des conflits. Ceux-ci restent limités quand le travail propre au projet vit dans le contenu, les messages, le fichier de thème et vos propres composants.
