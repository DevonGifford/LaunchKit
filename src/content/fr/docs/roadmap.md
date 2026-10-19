---
title: L’avenir de LaunchKit
description: Où va LaunchKit, ce que chaque phase apporte, et ce qu’il ne deviendra délibérément jamais.
updated: 2026-10-19
order: 6
summary: Où va LaunchKit : terminer et traduire ce site, faire ses preuves sur de vrais sites, des outils facultatifs d’analytics et de suivi des erreurs, des services applicatifs seulement en cas de besoin, les décisions encore ouvertes et ce qu’il ne deviendra jamais.
next: launching-a-project, building-with-ai
---

LaunchKit est fait pour rester petit. Il ne grandira pas en ajoutant tout ce dont un site pourrait un jour avoir besoin ; il grandit quand de vrais projets montrent ce dont ils ont réellement besoin. Cette feuille de route n’est donc pas une liste de fonctionnalités avec des dates. C’est l’ordre dans lequel LaunchKit compte faire ses preuves, et les règles qui décident de ce qui y entre.

## Maintenant : terminer le site

La base elle-même est en place : le système de design, quatre langues, le contenu par sections, les formulaires, les tests, la CI et un processus de publication maîtrisé. Le travail en cours porte sur le propre site de LaunchKit, celui que vous lisez.

- **Un contenu définitif.** De vrais avis à la place des exemples et des tarifs arrêtés, dans toutes les langues.
- **Chaque page dans chaque langue.** Le site et ces guides sont écrits d’abord en anglais, puis traduits en espagnol, en français et en allemand une fois l’anglais stabilisé, pour ne rien traduire deux fois.
- **Les pages qui manquent.** Les liens provisoires du pied de page, comme « À propos » et le journal des modifications, auront de vraies destinations.

## Ensuite : faire ses preuves sur de vrais sites

La spécification appelle cette phase la **validation en conditions réelles**, et c’est celle qui compte le plus. Une base ne vaut que par les sites construits dessus.

- **Un premier vrai site**, construit à partir de LaunchKit en remplaçant sa marque, son contenu et sa navigation tout en gardant intacte l’ingénierie partagée.
- **Un second, volontairement différent**, pour montrer que deux sites très différents peuvent partager une base sans se battre avec elle.
- **Des améliorations dans les deux sens.** Un changement fait pour un projet est contribué en upstream, publié, puis fusionné dans l’autre, ce qui éprouve de bout en bout le modèle upstream et projets dérivés.

Six sites sont prévus pour cela, du site d’une agence et d’une boutique de matériel pour homelab à UnPocketed, la page d’une application. À mesure qu’ils seront lancés, ils apparaîtront sur la page [Exemples](/examples), présentés avec des composants Storybook conçus pour l’occasion.

## Plus tard : de la visibilité, en option

Quand de vrais déploiements le justifieront, LaunchKit proposera des moyens légers de voir comment se portent les sites. Les premiers sont déjà là :

- **Le trafic et la vitesse** avec Vercel Web Analytics et Speed Insights. Aucun des deux n’identifie les visiteurs, ils fonctionnent donc pour tous, et ils ne se chargent que sur Vercel.
- **Le suivi des erreurs** avec Sentry, avec un échantillonnage prudent.
- **L’analytics produit** avec PostHog quand un projet en a besoin, en attendant le consentement du visiteur. Jamais en même temps que Vercel Web Analytics par défaut.

Chacun est, ou sera, un interrupteur dans `src/config/features.ts`, respectueux de la vie privée et sans risque s’il reste non configuré. Un clone tout neuf fonctionne toujours sans aucun compte.

## Plus loin : des services applicatifs

Certains projets finiront par dépasser le simple site web. Pour eux, et seulement quand un vrai projet en aura besoin, LaunchKit pourrait ajouter :

- **L’authentification**, avec Clerk ou un autre fournisseur choisi le moment venu.
- **Une base de données**, sans doute Neon PostgreSQL avec Drizzle.
- **Des logs structurés**, avec un échantillonnage raisonnable et des protections de la vie privée.

Les paiements, la surveillance de disponibilité et les tests de régression visuelle viennent encore après. Ce sont des possibilités, pas des promesses, et aucune n’est une condition du succès de LaunchKit.

## Encore à décider

Deux choix restent volontairement ouverts, pour être faits sur des éléments concrets plutôt que par défaut :

- **Les polices définitives.** LaunchKit utilise les polices du système jusqu’au choix d’une serif et d’une sans-serif, sur des critères de rendu, d’accessibilité et de licence.
- **Le fournisseur d’analytics**, s’il y en a un : Vercel Web Analytics suffit-il, ou un projet a-t-il besoin de PostHog ?

## Ce que LaunchKit ne deviendra pas

Savoir dire non fait partie du plan. LaunchKit n’intégrera pas :

- un CMS obligatoire ni un éditeur de pages par glisser-déposer ;
- un vaste système de variantes de section conçu pour des besoins imaginaires ;
- une pile obligatoire d’authentification, de base de données ou de facturation ;
- un service obligatoire de monitoring ou de logs, qu’il soit payant ou auto-hébergé.

Chacun de ces éléments ferait porter à tous les projets le poids de quelques-uns. Si un projet en a besoin, il l’ajoute de son côté, et si cela se révèle utile à tous, cela peut remonter en upstream.

## Suivre le projet

Chaque changement notable est consigné dans `CHANGELOG.md`, et chaque version est accompagnée de notes sur ce que les projets dérivés doivent faire. Si vous avez une idée, ou un projet que vous aimeriez construire sur LaunchKit, [écrivez-nous](/contact).
