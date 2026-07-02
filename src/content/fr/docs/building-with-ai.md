---
title: L’IA dans LaunchKit
description: Comment les agents de code travaillent dans ce dépôt, les règles qui les encadrent et à quoi ressemble une vraie session de travail.
updated: 2026-10-17
order: 5
summary: Comment les agents d’IA travaillent dans LaunchKit : le règlement commun d’AGENTS.md, la règle selon laquelle seules les personnes commitent, 18 skills épinglées, la documentation fournie avec le framework, les vérifications qui attrapent les erreurs et la boucle en cinq étapes qui a servi à construire ce site.
next: component-library, roadmap
---

Une grande partie de LaunchKit, ce site compris, a été construite par un agent de code d’IA travaillant aux côtés d’une personne. Cela ne fonctionne que parce que le dépôt est prévu pour. Un agent a besoin de la même chose qu’un nouveau développeur : des conventions claires, des retours rapides et des limites fermes. LaunchKit lui donne les trois, et laisse le dernier mot à la personne.

## Un seul règlement pour les personnes et les agents

Chaque session d’un agent commence par la lecture d’`AGENTS.md`, à la racine du dépôt. (`CLAUDE.md` renvoie simplement vers lui, pour que tous les outils lisent le même fichier.) Il couvre ce que tout nouvel arrivant doit savoir :

- **L’organisation du code :** quels dossiers dépendent de quels autres, où vivent les sections, et pourquoi les routes ne contiennent aucune logique réutilisable.
- **Les conventions :** TypeScript strict, couleurs issues des tokens uniquement, aucun texte codé en dur dans les composants, et chaque texte d’interface dans les quatre langues.
- **Les vérifications à lancer :** `pnpm check` et `pnpm test:e2e`, et que faire quand l’une échoue pour une raison sans rapport.
- **Comment rendre compte :** ce qui a changé et pourquoi, quelles vérifications ont été lancées et ont réussi, et ce qu’il reste à décider à la personne.

Écrire les règles une fois sert deux fois. Les agents les suivent, et les personnes qui rejoignent le projet disposent du même guide.

## Les agents écrivent le code ; les personnes possèdent l’historique

La section la plus importante d’`AGENTS.md` est reprise mot pour mot de la spécification du projet. Les agents peuvent lire le dépôt, modifier des fichiers, lancer les tests et préparer le travail. Ils ne peuvent ni indexer, ni commiter, ni pousser, ni ouvrir de pull request, ni réécrire l’historique sans autorisation explicite, et même alors ils doivent redemander confirmation juste avant d’agir.

> L’agent écrit et valide le code. La personne garde le contrôle final sur l’historique Git, les modifications du dépôt et la publication.

En pratique, un agent termine un travail, lance les vérifications et laisse chaque modification non indexée, avec un résumé. La personne relit le diff, le commite et décide de la suite. Rien n’entre dans l’historique du dépôt sans qu’une personne l’ait choisi.

## Les skills : du savoir-faire à la demande

Les agents peuvent charger des **skills** : des instructions packagées pour un type de tâche précis. LaunchKit en épingle 18 au niveau du projet dans `skills-lock.json`, pour que chaque clone obtienne exactement les mêmes versions :

- quatorze skills d’ingénierie issues de la collection de Matt Pocock, pour la revue de code, le développement piloté par les tests, le diagnostic de bugs et la conception de modules ;
- deux de Vercel, sur les performances React et les bonnes pratiques d’interface web ;
- une d’Anthropic, sur le design frontend ;
- une de shadcn/ui, pour travailler avec ses composants.

Les skills se restaurent sur un nouveau clone avec `pnpm dlx skills experimental_install`. Une skill s’exécute avec toutes les permissions de l’agent : le `SKILL.md` de chacune est donc lu avant de l’ajouter, et `AGENTS.md` l’emporte toujours sur ses conseils. Les règles Git gagnent à tous les coups.

## Un savoir frais, pas une mémoire périmée

L’entraînement d’un modèle s’arrête à un moment donné ; les outils, eux, continuent d’avancer. LaunchKit utilise Next.js 16, qui change assez pour que le souvenir qu’un agent a des anciennes versions l’induise en erreur. Next.js livre sa documentation dans le paquet installé, et `AGENTS.md` demande aux agents de lire le guide concerné dans `node_modules/next/dist/docs/` avant d’écrire du code. Quand un agent a ajouté les transitions entre les pages de ce site, il a travaillé à partir de cette documentation, pas de mémoire.

Storybook fait de même : `pnpm exec storybook skills stories` et `write-story` donnent à un agent des instructions à jour pour écrire des stories.

## Des vérifications qui attrapent ce que la relecture laisse passer

Des règles ne servent que si on remarque qu’elles sont enfreintes. Les vérifications de LaunchKit ne se soucient pas de qui a écrit le code :

- **TypeScript et Zod** refusent le contenu qui ne respecte pas le schéma d’une section.
- **Le registre des sections** ne compile pas tant qu’un type de section n’a pas de composant.
- **ESLint** n’accepte aucun avertissement et refuse les couleurs codées en dur.
- **`pnpm i18n:check`** échoue dès qu’un message manque dans une langue.
- **Les tests de stories** lancent axe sur chaque composant, et **les tests de bout en bout** vérifient chaque page sur ordinateur et mobile, dans les deux thèmes.

Un agent les lance toutes avant de rendre compte, et les mêmes vérifications tournent dans la CI à chaque pull request.

## À quoi ressemble une session

Ce site a été construit au fil d’une série de sessions avec un agent, chacune étant un travail unique et relisible : l’en-tête et la navigation, la page d’accueil, les pages Exemples et Tarifs, une passe de finition et ces guides. Toutes ont suivi la même boucle.

1. **Une demande.** La personne décrit l’objectif et les limites : ce qui est inclus, ce qui ne l’est pas, et ce qui ne doit pas être touché.
2. **Lire d’abord.** L’agent examine le code, les tests et la documentation concernés avant de proposer quoi que ce soit, et pose les questions qui relèvent vraiment de la personne, comme les sections qu’une page doit contenir.
3. **Construire et vérifier.** Il fait le changement propre le plus petit possible, lance toutes les vérifications et regarde le résultat dans un vrai navigateur, dans les deux thèmes et à plusieurs largeurs.
4. **Rendre compte.** Il liste ce qui a changé, les vérifications qui ont réussi et tout ce que la personne doit décider ou savoir.
5. **Relire et commiter.** La personne lit le diff et le commite, ou demande des changements.

L’étape de vérification mérite sa place. Au fil de ces sessions, elle a repéré un en-tête qui défilait horizontalement sur tablette dans trois langues, un test qui n’échouait que sous charge, un menu déroulant qui ramenait la page en haut après un saut vers une section, et un formulaire de contact qui jetait silencieusement chaque message. Aucun de ces problèmes n’apparaissait en survolant le code. Tous sont apparus quand l’agent a mesuré, lancé et parcouru le vrai site.

## Travailler ainsi vous-même

Tout projet construit sur LaunchKit hérite de cette organisation : le même `AGENTS.md`, les mêmes skills et les mêmes vérifications. Adaptez `AGENTS.md` à votre projet, gardez les règles Git et laissez les vérifications faire la police. Le but n’est pas de confier le projet à un agent. C’est de donner à un collaborateur compétent des règles claires, des retours rapides et une personne qui décide.
