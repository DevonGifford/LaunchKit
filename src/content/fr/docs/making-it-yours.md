---
title: Personnaliser LaunchKit
description: Changez la marque, réécrivez les pages, choisissez vos langues et les informations du site, et continuez à profiter des améliorations de LaunchKit.
updated: 2026-10-17
order: 2
summary: Un aide-mémoire de ce qu’il faut modifier, puis comment adopter vos propres couleurs, polices et logo, réécrire les pages, choisir vos langues, les informations du site et les menus, et continuer à fusionner les améliorations de LaunchKit.
next: launching-a-project, component-library
---

Un site construit avec LaunchKit ne devrait pas ressembler à LaunchKit. La base regroupe tout ce qui définit votre projet dans une poignée de fichiers, pour que vous puissiez remplacer la marque et les textes sans toucher au code partagé, et continuer malgré tout à fusionner les améliorations de LaunchKit.

| Pour changer…                                  | Modifiez                                      |
| ---------------------------------------------- | --------------------------------------------- |
| Couleurs, polices, rayon                       | `src/app/theme.css`                           |
| Contenu et ordre des sections                  | `src/content/<langue>/pages/*.ts`             |
| Documents longs                                | `src/content/<langue>/docs/*.md`              |
| Textes de l’interface                          | `messages/<langue>.json`                      |
| Nom, coordonnées, réseaux sociaux              | `src/config/site.ts`                          |
| Navigation et interrupteurs de fonctionnalités | `src/config/navigation.ts`, `features.ts`     |
| Langues                                        | `src/i18n/routing.ts`, puis `pnpm i18n:check` |
| Logo et image de partage                       | `public/brand/`                               |

## La marque

Chaque couleur de LaunchKit est un token sémantique, comme `background`, `foreground`, `surface`, `primary`, `muted`, `accent` et `emphasis`, défini pour l’apparence claire et l’apparence sombre dans `src/app/theme.css`. Les composants n’utilisent que les noms des tokens : une nouvelle palette se résume donc à un changement dans ce seul fichier. ESLint refuse les couleurs hexadécimales dans le TypeScript pour qu’il en reste ainsi.

Pour créer une palette, copiez les deux blocs de `theme.css` et changez les valeurs :

```css
:root {
  --background: #f0e9db;
  --foreground: #10241e;
  --primary: #10241e;
  --accent: #c2a879;
  /* …tous les tokens */
}

.dark {
  --background: #10241e;
  --foreground: #f0e9db;
  /* …tous les tokens, à nouveau */
}
```

Vérifiez ensuite le contraste. Les tokens de texte doivent atteindre au moins 4,5:1 face aux fonds sur lesquels ils apparaissent ; les commentaires de `theme.css` indiquent quels tokens portent du texte et lesquels sont décoratifs. Les tests lancent axe sur chaque page dans les deux apparences, et le panneau d’accessibilité de Storybook signale les problèmes story par story pendant que vous choisissez encore vos couleurs.

> La barre latérale et la barre d’outils de Storybook ne peuvent pas lire les variables CSS : elles gardent donc une copie de la palette dans `.storybook/theme.ts`, avec un logo recoloré dans `.storybook/brand/`. Mettez-les aussi à jour, puis redémarrez Storybook.

## Les polices

LaunchKit utilise les polices du système jusqu’à ce qu’un projet choisisse les siennes : rien à télécharger, rien à défaire. Pour utiliser une police web, chargez-la avec `next/font` dans `src/app/[locale]/layout.tsx` et placez sa variable en tête de la pile correspondante dans `theme.css` :

```css
--typeface-serif: var(--font-brand-serif), serif;
```

## Les pages

Les pages structurées sont des listes ordonnées de sections dans `src/content/<langue>/pages/`. Pour changer une page, modifiez ses sections : réordonnez-les, retirez-en une ou ajoutez-en une autre d’un type que LaunchKit propose déjà. TypeScript vérifie chaque champ pendant que vous écrivez.

Parcourez les sections dans Storybook (`pnpm storybook`) pour voir à quoi chacune ressemble, dans les deux thèmes et à toutes les tailles d’écran. Quand une page a besoin d’une section que LaunchKit n’a pas, construisez-la d’abord dans votre projet. [Le design system de LaunchKit](component-library) explique comment. Si elle se révèle utile à d’autres sites, proposez-la en upstream.

## Les textes autour des pages

Les textes courts de l’interface, comme les libellés des boutons, les noms des menus et les erreurs des formulaires, vivent dans `messages/<langue>.json`, avec l’anglais comme source. Les textes longs, comme ces guides, sont en Markdown dans `src/content/<langue>/docs/`. Un guide absent dans une langue s’affiche en anglais, avec une note qui le signale.

## Informations du site et navigation

`src/config/site.ts` contient le nom du site, les coordonnées et les profils sociaux. Le pied de page complet affiche les informations renseignées : laissez de côté tout ce que vous ne voulez pas publier. Les menus de l’en-tête et du pied de page se trouvent dans `src/config/navigation.ts` ; chaque libellé est un message, il se traduit donc avec tout le reste. `src/config/features.ts` active ou désactive les sélecteurs de thème et de langue.

## Les langues

Les langues prises en charge sont listées dans `src/i18n/routing.ts`. Pour en ajouter une, ajoutez-la là, créez `messages/<langue>.json` et `src/content/<langue>/`, puis lancez :

```sh
pnpm i18n:check
```

La vérification liste chaque message et chaque document manquant, pour que rien ne soit publié à moitié traduit par accident. Pour la même raison, une page qui existe en anglais mais pas dans une autre langue est une erreur de type.

## Rester à jour

Les améliorations de LaunchKit arrivent comme n’importe quel changement Git : de façon délibérée.

```sh
git fetch upstream --tags
git merge v0.2.0   # une version de LaunchKit
```

Les fusions ne sont pas automatiques et peuvent provoquer des conflits. Ceux-ci restent limités quand le travail de votre projet vit dans le contenu, les messages, le fichier de thème et vos propres composants, ce pour quoi tout ce qui précède est conçu.
