---
title: Hazlo tuyo
description: Cambia la marca, reescribe las páginas, elige tus idiomas y sigue incorporando las mejoras de LaunchKit.
updated: 2026-10-12
order: 2
---

## Marca

Cada color de LaunchKit es un token semántico — `background`, `foreground`, `surface`, `primary`, `muted`, `accent` y algunos más — definido para las apariencias clara y oscura en `src/app/theme.css`. Los componentes solo usan los nombres de los tokens, así que una paleta nueva es un cambio en ese único archivo.

Mantén cada color de texto con un contraste mínimo de 4,5:1 frente a los fondos sobre los que aparece. Los comentarios de `theme.css` indican qué tokens son para texto y cuáles son decorativos.

## Páginas

Las páginas estructuradas son listas ordenadas de secciones en `src/content/<idioma>/pages/`. Para cambiar una página, edita sus secciones: reordénalas, elimina una o añade otra de un tipo que LaunchKit ya ofrece. TypeScript comprueba cada campo mientras escribes.

Si tu proyecto necesita una sección que LaunchKit no tiene, créala primero en tu proyecto. Si más adelante resulta útil para otros sitios, propónla en upstream.

## Idiomas

Los idiomas disponibles están en `src/i18n/routing.ts`. Para añadir uno, inclúyelo ahí, crea `messages/<idioma>.json` y `src/content/<idioma>/`, y ejecuta:

```sh
pnpm i18n:check
```

La comprobación enumera cada mensaje y documento que falta, para que nada se publique a medio traducir por accidente.

## Mantenerse al día

Las mejoras de LaunchKit llegan como cualquier otro cambio de Git: de forma deliberada.

```sh
git fetch upstream
git merge upstream/main
```

Las fusiones no son automáticas y pueden generar conflictos. Los conflictos se mantienen pequeños cuando el trabajo propio del proyecto vive en el contenido, los mensajes, el archivo del tema y tus propios componentes.
