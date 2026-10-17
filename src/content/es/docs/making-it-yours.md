---
title: Personalizar LaunchKit
description: Cambia la marca, reescribe las páginas, define tus idiomas y los datos del sitio, y sigue recibiendo las mejoras de LaunchKit.
updated: 2026-10-17
order: 2
summary: Una referencia rápida de qué editar y, después, cómo poner tus propios colores, tipografías y logotipo, reescribir las páginas, definir idiomas, datos del sitio y menús, y seguir fusionando las mejoras de LaunchKit.
next: launching-a-project, component-library
---

Un sitio construido con LaunchKit no debería parecerse a LaunchKit. La base guarda todo lo que define tu proyecto en un puñado de archivos, para que puedas cambiar la marca y los textos sin tocar el código compartido y, aun así, fusionar más adelante las mejoras de LaunchKit.

| Para cambiar…                           | Edita                                             |
| --------------------------------------- | ------------------------------------------------- |
| Colores, tipografías, radio             | `src/app/theme.css`                               |
| Contenido y orden de las secciones      | `src/content/<idioma>/pages/*.ts`                 |
| Documentos largos                       | `src/content/<idioma>/docs/*.md`                  |
| Textos de la interfaz                   | `messages/<idioma>.json`                          |
| Nombre, contacto, redes sociales        | `src/config/site.ts`                              |
| Navegación e interruptores de funciones | `src/config/navigation.ts`, `features.ts`         |
| Idiomas                                 | `src/i18n/routing.ts` y después `pnpm i18n:check` |
| Logotipo e imagen para redes            | `public/brand/`                                   |

## La marca

Cada color de LaunchKit es un token semántico, como `background`, `foreground`, `surface`, `primary`, `muted`, `accent` y `emphasis`, definido para la apariencia clara y la oscura en `src/app/theme.css`. Los componentes solo usan los nombres de los tokens, así que una paleta nueva es un cambio en ese único archivo. ESLint rechaza los colores hexadecimales en TypeScript para que siga siendo así.

Para crear una paleta, copia los dos bloques de `theme.css` y cambia los valores:

```css
:root {
  --background: #f0e9db;
  --foreground: #10241e;
  --primary: #10241e;
  --accent: #c2a879;
  /* …todos los tokens */
}

.dark {
  --background: #10241e;
  --foreground: #f0e9db;
  /* …todos los tokens, de nuevo */
}
```

Después, comprueba el contraste. Los tokens de texto necesitan al menos 4,5:1 frente a los fondos sobre los que van; los comentarios de `theme.css` indican qué tokens llevan texto y cuáles son decorativos. Las pruebas ejecutan axe en cada página con ambas apariencias, y el panel de accesibilidad de Storybook señala los problemas historia por historia mientras aún eliges los colores.

> La barra lateral y la barra de herramientas de Storybook no pueden leer variables CSS, así que guardan una copia de la paleta en `.storybook/theme.ts`, con un logotipo recoloreado en `.storybook/brand/`. Actualízalos también y reinicia Storybook.

## Tipografías

LaunchKit usa pilas de fuentes del sistema hasta que un proyecto elige las suyas: nada que descargar y nada que deshacer. Para usar una fuente web, cárgala con `next/font` en `src/app/[locale]/layout.tsx` y pon su variable al principio de la pila correspondiente en `theme.css`:

```css
--typeface-serif: var(--font-brand-serif), serif;
```

## Las páginas

Las páginas estructuradas son listas ordenadas de secciones en `src/content/<idioma>/pages/`. Para cambiar una página, edita sus secciones: reordénalas, quita una o añade otra de un tipo que LaunchKit ya ofrece. TypeScript comprueba cada campo mientras escribes.

Explora las secciones en Storybook (`pnpm storybook`) para ver cómo es cada una, con ambos temas y en cualquier tamaño de pantalla. Cuando una página necesite una sección que LaunchKit no tiene, constrúyela primero en tu proyecto. [Sistema de diseño de LaunchKit](component-library) explica cómo. Si después resulta útil para otros sitios, propónla en upstream.

## Los textos alrededor de las páginas

Los textos cortos de la interfaz, como las etiquetas de los botones, los nombres de los menús y los errores de los formularios, viven en `messages/<idioma>.json`, con el inglés como fuente. Los textos largos, como estas guías, son Markdown en `src/content/<idioma>/docs/`. Una guía que falta en un idioma se muestra en inglés, con una nota que lo indica.

## Datos del sitio y navegación

`src/config/site.ts` contiene el nombre del sitio, los datos de contacto y los perfiles sociales. El pie de página completo muestra los datos que estén definidos, así que deja fuera lo que no quieras publicar. Los menús de la cabecera y del pie están en `src/config/navigation.ts`; cada etiqueta es un mensaje, así que se traduce con todo lo demás. `src/config/features.ts` activa o desactiva los controles de tema e idioma.

## Idiomas

Los idiomas disponibles se enumeran en `src/i18n/routing.ts`. Para añadir uno, añádelo ahí, crea `messages/<idioma>.json` y `src/content/<idioma>/`, y ejecuta:

```sh
pnpm i18n:check
```

La comprobación enumera cada mensaje y documento que falta, para que nada se publique a medio traducir por accidente. Por el mismo motivo, una página que existe en inglés pero no en otro idioma es un error de tipos.

## Mantenerse al día

Las mejoras de LaunchKit llegan como cualquier cambio de Git: de forma deliberada.

```sh
git fetch upstream --tags
git merge v0.2.0   # una versión de LaunchKit
```

Las fusiones no son automáticas y pueden dar conflictos. Los conflictos se mantienen pequeños cuando el trabajo de tu proyecto vive en el contenido, los mensajes, el archivo del tema y tus propios componentes, que es justo para lo que está pensado todo lo anterior.
