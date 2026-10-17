---
title: Le design system de LaunchKit
description: Les primitives et les sections qui composent chaque site LaunchKit, comment une section passe du contenu typé à la page, et comment ajouter les vôtres.
updated: 2026-10-17
order: 4
summary: Comment s’articulent les deux couches de LaunchKit : une cinquantaine de primitives maison et 27 types de section, le parcours d’une section d’un schéma Zod jusqu’à la page, la façon dont Storybook teste chaque story, et les étapes et règles pour ajouter la vôtre.
next: making-it-yours, building-with-ai
---

Chaque page d’un site LaunchKit, y compris celle-ci, est assemblée à partir de la même bibliothèque. Elle a deux couches. Les **primitives** sont les petites briques accessibles : boutons, champs, boîtes de dialogue, menus. Les **sections** sont les blocs pleine largeur qui composent une page : un hero, une série de fonctionnalités, des offres tarifaires, un appel à l’action final. Les primitives forment les sections ; les sections forment les pages.

Cet article explique comment fonctionnent les deux couches, et pourquoi elles ont cette forme.

## Les primitives : possédées, pas installées

Les primitives de `src/components/ui/` viennent de shadcn/ui, qui n’est pas un paquet qu’on installe mais du code qu’on copie dans le projet et qui lui appartient. C’est important pour une base : chaque primitive peut être adaptée aux tokens de LaunchKit, à ses contrôles de 40 px et à ses libellés traduisibles, et rien ne change dans votre dos lors d’une mise à jour.

Il y en a une cinquantaine aujourd’hui : la collection shadcn/ui, d’accordion à tooltip, plus quelques petits contrôles propres à LaunchKit comme le logo, le sélecteur de langue et le bouton de thème. Chacune ne se colore qu’avec des tokens sémantiques comme `bg-surface` et `text-muted-foreground` : une nouvelle marque dans `theme.css` les atteint donc toutes à la fois.

En ajouter une depuis le registre de shadcn/ui demande une commande et une courte liste de contrôle : remplacer ses couleurs de survol par celles de LaunchKit, rendre ses libellés traduisibles et vérifier la hauteur de ses contrôles. La liste se trouve dans `docs/theming.md`.

## Les sections : du contenu en entrée, une page en sortie

C’est avec les sections que LaunchKit se distingue de la plupart des starters. Une section ne contient jamais ses propres textes. Elle reçoit du contenu typé et l’affiche, ce qui garde les mots dans `src/content/`, où l’on peut les traduire et les réécrire sans toucher à un composant.

Chaque type de section suit le même chemin :

1. **Un schéma.** Un schéma Zod dans `src/lib/content/types.ts` décrit le contenu que reçoit la section. Le type TypeScript découle du schéma : les deux ne peuvent pas diverger.
2. **Un composant.** Le composant de la section, dans `src/components/sections/`, reçoit exactement ce type.
3. **Le registre.** `src/lib/content/registry.ts` associe chaque type de section à son composant. Le type de cette table exige que tous les types y figurent : un schéma sans composant est donc une erreur de compilation, pas un trou dans une page.
4. **La page.** Une page dans `src/content/` liste les sections dans l’ordre, et le moteur de rendu affiche chacune avec son composant.

Voici le plus petit exemple, une rangée de chiffres :

```ts
// Le schéma : de deux à quatre chiffres sous un titre.
export const statsSectionSchema = z.object({
  ...sectionBase,
  type: z.literal('stats'),
  eyebrow: text.optional(),
  title: text,
  stats: z
    .array(z.object({ value: text, label: text }))
    .min(2)
    .max(4),
});
```

```ts
// Le contenu, sur n’importe quelle page.
{
  id: 'numbers',
  type: 'stats',
  title: 'Une base qui suit votre rythme.',
  stats: [
    { value: '4', label: 'Langues incluses' },
    { value: '40+', label: 'Composants testés' },
  ],
}
```

Trompez-vous sur un champ, ou donnez cinq chiffres, et TypeScript le signale avant même que la page s’affiche.

## Ce que contient la bibliothèque

Il y a 27 types de section, regroupés selon leur rôle dans une page :

| Groupe               | Sections                                                                   |
| -------------------- | -------------------------------------------------------------------------- |
| Ouvrir la page       | Heros simple, centré, scindé et cinématique                                |
| Raconter l’histoire  | Déclaration, fonctionnalités, compétences, bento, catalogue, vitrine       |
| Convaincre           | Chiffres, défilé de logos, avis, tarifs, FAQ, formulaire de contact        |
| Inviter à la suite   | Appels à l’action en bandeau, panneau, éditorial, avec image et scindé     |
| Le site de LaunchKit | Six sections marketing, du hero de la page d’accueil aux contrôles qualité |

Le dernier groupe est écrit pour le propre site de LaunchKit et vit dans son propre dossier. Les sections génériques n’en importent jamais rien : un projet dérivé peut donc l’ignorer complètement.

Une règle décide si une nouvelle mise en page est une **variante** ou un **nouveau type**. Si deux mises en page reçoivent le même contenu, elles forment une seule section avec un champ `variant` ; la section des compétences, par exemple, a des variantes en cartes, numérotée et détaillée. Si elles ont besoin de contenus différents, ce sont des types distincts, rangés dans un dossier qui porte le nom de leur famille, comme `hero/` et `cta/`.

## Storybook, l’établi

Chaque composant a des stories à côté de lui : 88 fichiers aujourd’hui, chacun montrant le composant avec un contenu réaliste. Storybook (`pnpm storybook`) est l’endroit où une section est conçue et relue avant d’être utilisée sur une page.

Les stories servent aussi de tests. Chaque story s’affiche dans un vrai navigateur et passe par axe pour détecter les problèmes d’accessibilité. Des stories dédiées fixent le thème sombre et les largeurs mobile, tablette et ordinateur, pour vérifier le contraste et la mise en page dans chaque cas, et des tests d’interaction confirment que les menus s’ouvrent, que les carrousels défilent et que les formulaires se plaignent poliment. Plusieurs stories lisent leur contenu directement depuis une vraie page : ce que vous y relisez est exactement ce qui part en production.

## Ajouter votre propre section

Quand un projet a besoin d’une section que LaunchKit n’a pas, il suit le même chemin :

1. Ajoutez un schéma dans `src/lib/content/types.ts`, puis ajoutez-le à `sectionSchema`, la liste de tous les types de section.
2. Construisez le composant dans `src/components/sections/`. Il reçoit `SectionOf<'votre-type'>` et rien d’autre.
3. Enregistrez-le dans `src/lib/content/registry.ts`. TypeScript échoue tant que ce n’est pas fait.
4. Donnez-lui une story, pour qu’il soit relu et testé comme les autres.

Quelques règles maison gardent la bibliothèque saine à mesure qu’elle grandit :

- **Pas de texte dans les composants.** Le texte arrive comme contenu ou depuis `messages/`, pour que chaque mot puisse être traduit.
- **Uniquement des tokens.** Les couleurs viennent du thème, jamais du composant.
- **Le serveur d’abord.** Les sections sont rendues côté serveur ; seule la plus petite partie interactive, comme un carrousel ou un menu, s’exécute dans le navigateur.
- **Des sections autonomes.** Elles ne s’importent pas entre elles. Les éléments partagés vont dans `section-parts.tsx`.

Une section qui se révèle utile au-delà d’un projet est une bonne candidate à une contribution à LaunchKit. C’est ainsi que la bibliothèque grandit : un vrai besoin à la fois, plutôt qu’une galerie construite pour des besoins imaginaires.
