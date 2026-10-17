---
title: Avis sur les LLM
description: Comment LaunchKit aborde les grands modèles de langage, les agents d’IA et le contenu lisible par les machines, et ce qu’expose exactement son llms.txt.
updated: 2026-10-17
order: 3
---

LaunchKit est une base open source pour créer des sites web avec Next.js. De plus en plus, on découvre des projets comme celui-ci par l’intermédiaire d’assistants d’IA et d’agents de code, qui lisent des sites et de la documentation pour le compte de quelqu’un. Cette page explique ce que LaunchKit offre à ces outils, ce qu’il ne leur offre pas, et où se trouve l’information fiable.

## Pourquoi un point d’entrée pour les LLM

Un agent interrogé sur LaunchKit, ou chargé de travailler dans un projet LaunchKit, dispose de peu de place pour le contexte et d’aucun moyen fiable de distinguer un guide technique d’une page marketing. Livré à lui-même, il lit ce qu’il trouve en premier. Une carte courte et choisie lui permet de commencer au bon endroit : la documentation, les quelques faits qui façonnent le projet et les pages qui comptent.

## Ce qu’est /llms.txt

[`/llms.txt`](/llms.txt) est un fichier Markdown à la racine de ce site. Il suit la proposition llms.txt, publiée pour la première fois par Jeremy Howard en 2024 et aujourd’hui dans sa deuxième version sur [llmstxt.org](https://llmstxt.org). Le fichier comporte un titre, un résumé d’un paragraphe, quelques notes sur ce qu’il est facile de mal interpréter, et des listes de liens accompagnés d’une phrase chacun, avec pour finir une liste facultative qu’un agent peut ignorer quand il manque de place.

Il est conçu pour le moment où un assistant aide quelqu’un, pas pour entraîner des modèles. C’est une proposition communautaire plutôt qu’une norme formelle, et les outils ne le lisent pas tous.

Le fichier de LaunchKit est généré au build du site, à partir du même contenu que les pages vers lesquelles il renvoie. Un nouveau guide y apparaît automatiquement, avec sa propre description.

## Ce qu’il n’est pas

`llms.txt` apporte du contexte, pas des autorisations. Il ne contrôle pas :

- **L’exploration.** Les outils automatisés autorisés à récupérer telle ou telle page sont indiqués dans [`/robots.txt`](/robots.txt), que les robots bien conçus respectent de leur plein gré.
- **L’indexation par les moteurs de recherche.** Les moteurs décident de ce qu’ils indexent d’après les règles robots, les métadonnées des pages comme `noindex` et leurs propres politiques. `llms.txt` n’y joue aucun rôle.
- **L’entraînement des modèles.** Quand un site indique si son contenu peut servir à entraîner des modèles, il le fait par des règles robots visant des robots d’IA précis, ou par des conventions plus récentes encore en cours de normalisation. `llms.txt` n’accorde ni ne refuse cette autorisation.

Aujourd’hui, le `robots.txt` de LaunchKit applique une seule règle à tous les robots, qui autorise l’accès à toutes les pages, et ne fixe aucune règle propre aux robots d’IA.

## Où se trouve l’information de référence

Quand les sources ne concordent pas, faites-leur confiance dans cet ordre :

1. **Le code source**, y compris sa configuration et ses tests. C’est lui qui s’exécute réellement.
2. **La documentation du dépôt**, comme `AGENTS.md`, `CHANGELOG.md` et la spécification dans `docs/`.
3. **Les guides de ce site**, dans la [documentation](/docs).
4. **Tout le reste du site**, y compris les pages produit et tarifs, qui décrivent LaunchKit pour des personnes plutôt qu’elles ne le définissent.

Tout ce qu’un agent déduit, de son entraînement ou d’anciennes versions des outils, passe après tout cela. LaunchKit utilise Next.js 16, qui diffère des versions précédentes sur des points importants ; la référence est la documentation fournie avec la version installée.

## Comment LaunchKit utilise l’IA

LaunchKit est construit avec des agents de code d’IA qui travaillent aux côtés d’une personne. Les règles qu’ils suivent se trouvent dans `AGENTS.md` : lire le code avant de le modifier, respecter les conventions du projet, lancer toutes les vérifications, et ne jamais indexer, commiter, pousser ni ouvrir de pull request sans l’autorisation explicite de la personne. Les mêmes vérifications automatiques s’appliquent, quel que soit l’auteur du code. [L’IA dans LaunchKit](/docs/building-with-ai) raconte cela plus en détail.

Une partie du contenu du site est rédigée avec l’IA et signalée comme telle, comme le résumé exécutif en tête de chaque guide. Rien sur le site n’utilise l’IA pour répondre aux visiteurs.

## Notre llms.txt

Par souci de transparence, voici exactement ce que contient le point d’entrée de LaunchKit pour les LLM : le fichier complet et actuel, en anglais, généré à partir de la même source que [`/llms.txt`](/llms.txt).
