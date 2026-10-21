---
title: Sistema de diseño de LaunchKit
description: Las primitivas y secciones con las que se construye cada sitio de LaunchKit, cómo pasa una sección del contenido tipado a la página y cómo añadir las tuyas.
updated: 2026-10-21
order: 4
summary: Cómo encajan las dos capas de LaunchKit: unas cincuenta primitivas propias y 29 tipos de sección, cómo viaja una sección de un esquema de Zod a la página, cómo Storybook prueba cada historia, y los pasos y normas para añadir la tuya.
next: making-it-yours, building-with-ai
---

Cada página de un sitio de LaunchKit, incluida esta, se monta con la misma biblioteca. Tiene dos capas. Las **primitivas** son las piezas pequeñas y accesibles: botones, campos, diálogos, menús. Las **secciones** son los bloques a todo el ancho que forman una página: un hero, un grupo de funciones, planes de precios, una llamada a la acción final. Las primitivas forman secciones; las secciones forman páginas.

Este artículo explica cómo funcionan ambas capas y por qué tienen la forma que tienen.

## Primitivas: propias, no instaladas

Las primitivas de `src/components/ui/` vienen de shadcn/ui, que no es un paquete que se instala, sino código que copias en el proyecto y que pasa a ser tuyo. Eso importa en una base: cada primitiva puede adaptarse a los tokens de LaunchKit, a sus controles de 40 px y a sus etiquetas traducibles, y nada cambia a tus espaldas con una actualización.

Hoy hay unas cincuenta: el conjunto de shadcn/ui, de accordion a tooltip, más algunos controles pequeños propios de LaunchKit, como el logotipo, el selector de idioma y el interruptor de tema. Cada una se colorea solo con tokens semánticos como `bg-surface` y `text-muted-foreground`, así que una marca nueva en `theme.css` llega a todas a la vez.

Añadir otra desde el registro de shadcn/ui lleva un comando y una breve lista de comprobación: cambiar sus colores de hover por los de LaunchKit, hacer traducibles sus etiquetas y revisar la altura de sus controles. La lista está en `docs/theming.md`.

## Secciones: entra contenido, sale una página

Las secciones son donde LaunchKit se diferencia de la mayoría de plantillas. Una sección nunca contiene sus propios textos. Recibe contenido tipado y lo dibuja, lo que mantiene las palabras en `src/content/`, donde se pueden traducir y reescribir sin tocar ningún componente.

Cada tipo de sección recorre el mismo camino:

1. **Un esquema.** Un esquema de Zod en `src/lib/content/types.ts` describe el contenido que recibe la sección. El tipo de TypeScript sale del esquema, así que no pueden contradecirse.
2. **Un componente.** El componente de la sección, en `src/components/sections/`, recibe exactamente ese tipo.
3. **El registro.** `src/lib/content/registry.ts` asocia cada tipo de sección a su componente. El tipo del mapa exige que estén todos, así que un esquema sin componente es un error de compilación y no un hueco en blanco en una página.
4. **La página.** Una página en `src/content/` enumera las secciones en orden, y el renderizador dibuja cada una con su componente.

Este es el ejemplo más pequeño, una fila de cifras:

```ts
// El esquema: de dos a cuatro cifras bajo un título.
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
// El contenido, en cualquier página.
{
  id: 'numbers',
  type: 'stats',
  title: 'Una base que va a tu ritmo.',
  stats: [
    { value: '4', label: 'Idiomas incluidos' },
    { value: '40+', label: 'Componentes probados' },
  ],
}
```

Equivoca un campo, o pon cinco cifras, y TypeScript lo dirá antes de que la página llegue a renderizarse.

## Qué hay en la biblioteca

Hay 29 tipos de sección, agrupados según la función que cumplen en una página:

| Grupo                     | Secciones                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| Abrir la página           | Heros básico, centrado, dividido, cinemático y con vídeo                                          |
| Contar la historia        | Declaración, funciones, capacidades, bento, catálogo, escaparate                                  |
| Convencer                 | Cifras, marquesina de logotipos, opiniones, precios, preguntas frecuentes, formulario de contacto |
| Invitar al siguiente paso | Llamadas a la acción de banda, panel, editorial, imagen y dividida                                |
| El sitio de LaunchKit     | Siete secciones de marketing, del hero de la portada a los controles de calidad                   |

El último grupo está escrito para el propio sitio de LaunchKit y vive en su propia carpeta. Las secciones genéricas nunca importan nada de ahí, así que un proyecto derivado puede ignorarlo por completo.

Una regla decide si un diseño nuevo es una **variante** o un **tipo nuevo**. Si dos diseños reciben el mismo contenido, son una sola sección con un campo `variant`; la sección de capacidades, por ejemplo, tiene las variantes de tarjetas, numerada y detallada. Si necesitan contenido distinto, son tipos separados, agrupados en una carpeta con el nombre de su clase, como `hero/` y `cta/`.

## Storybook, el banco de trabajo

Cada componente tiene historias a su lado: hoy son 93 archivos, cada uno mostrando el componente con contenido realista. Storybook (`pnpm storybook`) es donde una sección se diseña y se revisa antes de usarse en una página.

Las historias también se ejecutan como pruebas. Cada historia se renderiza en un navegador real y axe la revisa en busca de problemas de accesibilidad. Otras historias fijan el tema oscuro y los anchos de móvil, tableta y escritorio, para comprobar el contraste y la maquetación en cada uno, y las pruebas de interacción confirman que los menús se abren, los carruseles avanzan y los formularios avisan con amabilidad. Varias historias leen su contenido directamente de una página real, así que lo que revisas ahí es exactamente lo que se publica.

## Añade tu propia sección

Cuando un proyecto necesita una sección que LaunchKit no tiene, sigue el mismo camino:

1. Añade un esquema en `src/lib/content/types.ts` y súmalo a `sectionSchema`, la lista de todos los tipos de sección.
2. Construye el componente en `src/components/sections/`. Recibe `SectionOf<'tu-tipo'>` y nada más.
3. Regístralo en `src/lib/content/registry.ts`. TypeScript falla hasta que lo hagas.
4. Dale una historia, para que se revise y se pruebe como las demás.

Unas pocas normas de la casa mantienen sana la biblioteca a medida que crece:

- **Sin textos en los componentes.** El texto llega como contenido o desde `messages/`, para que cada palabra se pueda traducir.
- **Solo tokens.** Los colores salen del tema, nunca del componente.
- **Primero el servidor.** Las secciones se renderizan en el servidor; solo la parte interactiva más pequeña, como un carrusel o un menú, se ejecuta en el navegador.
- **Secciones independientes.** No se importan entre sí. Las piezas compartidas van en `section-parts.tsx`.

Una sección que resulta útil más allá de un proyecto es buena candidata para contribuirla a LaunchKit. Así crece la biblioteca: una necesidad real cada vez, no una galería construida para necesidades imaginadas.
