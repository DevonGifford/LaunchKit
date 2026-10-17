---
title: Inicio rápido de LaunchKit
description: Qué es LaunchKit, qué necesitas y cómo pasar de un clon recién descargado a un sitio funcionando en pocos minutos.
updated: 2026-10-17
order: 1
summary: Qué es LaunchKit y qué deja fuera a propósito, las dos herramientas que necesitas, los comandos para tener un sitio funcionando en local, un mapa de dónde está cada cosa y cómo se monta una página con secciones tipadas.
next: launching-a-project, making-it-yours, component-library
---

LaunchKit es una base reutilizable para crear y lanzar mejores sitios web, más rápido. Da a cada proyecto nuevo lo que necesita un sitio moderno desde el primer día: un sistema de diseño adaptable con temas claro y oscuro, cuatro idiomas, contenido por secciones, formularios validados, pruebas automatizadas y CI. Así, cada proyecto dedica su tiempo a lo que lo hace distinto.

La idea cabe en una línea: **construir una vez, reutilizar a menudo, mejorar de forma centralizada.** LaunchKit tiene opiniones firmes sobre sus cimientos y es flexible con todo lo que se construye encima. Los componentes y las herramientas compartidas viven en LaunchKit, en upstream; la marca, los textos, las secciones propias y la lógica de negocio pertenecen a cada proyecto.

## Qué incluye

- **Una base de aplicación moderna:** Next.js con App Router, React, TypeScript estricto y Tailwind CSS.
- **Un sistema de diseño con temas:** tokens de color semánticos, componentes accesibles de shadcn/ui y apariencias clara y oscura que siguen la configuración del sistema de cada visitante.
- **Cuatro idiomas:** inglés, español, francés y alemán, con rutas y metadatos localizados y una comprobación de las traducciones que faltan.
- **Contenido por secciones:** las páginas son listas tipadas de secciones en `src/content/`, separadas de los componentes de React que las dibujan.
- **Formularios validados:** React Hook Form y Zod, comprobados en el navegador y de nuevo en el servidor.
- **Pruebas y comprobaciones:** pruebas unitarias, de navegador y de extremo a extremo, historias de Storybook que también funcionan como pruebas y comprobaciones de accesibilidad con axe.

Lo que deja fuera a propósito importa igual. No hay base de datos, autenticación, pasarela de pago ni servicio de monitorización de pago. Cada proyecto los añade cuando de verdad los necesita.

## Qué necesitas

- Node.js 24 o posterior
- pnpm 12, en la versión exacta fijada en `package.json`

Nada más. Un clon recién descargado se instala, se compila y supera sus pruebas sin cuentas, claves de API ni variables de entorno. Los ajustes opcionales se describen en `.env.example`.

## Ejecútalo en local

Clona LaunchKit en una carpeta nueva y consérvalo como remoto `upstream` para poder fusionar mejoras más adelante:

```sh
git clone --origin upstream \
  git@github.com:DevonGifford/LaunchKit.git my-site
cd my-site
pnpm install

# Una sola vez: el navegador que usan las pruebas
pnpm exec playwright install chromium

pnpm dev
```

El sitio ya está funcionando en `http://localhost:3000`.

> ¿Vas a empezar un proyecto real y no solo a explorar? Lee [Lanzar con LaunchKit](launching-a-project) a continuación. Explica los remotos, la configuración del repositorio y el despliegue, paso a paso.

## Comandos de cada día

| Comando          | Qué hace                                                                          |
| ---------------- | --------------------------------------------------------------------------------- |
| `pnpm dev`       | Arranca el servidor de desarrollo                                                 |
| `pnpm check`     | Comprueba tipos, lint, formato y traducciones, y ejecuta las pruebas              |
| `pnpm test:e2e`  | Compila el sitio y ejecuta las pruebas de extremo a extremo en escritorio y móvil |
| `pnpm storybook` | Abre el taller de componentes en `http://localhost:6006`                          |
| `pnpm build`     | Crea una compilación de producción                                                |

Los hooks de Git ejecutan ESLint y Prettier sobre los archivos de cada commit, revisan el mensaje del commit y comprueban los tipos antes de cada push. `pnpm check` cubre todo eso y más, así que ejecútalo primero y los hooks pasarán.

## Dónde está cada cosa

| Ruta                | Contiene                                                             |
| ------------------- | -------------------------------------------------------------------- |
| `src/content/`      | Contenido de las páginas y documentos largos, una carpeta por idioma |
| `messages/`         | Textos cortos de la interfaz, un archivo JSON por idioma             |
| `src/app/theme.css` | Colores de marca, tipografías y radio de las esquinas                |
| `src/components/`   | Primitivas, maquetación y componentes de sección                     |
| `src/config/`       | Datos del sitio, navegación e interruptores de funciones             |
| `docs/`             | La especificación y las guías para quienes mantienen el proyecto     |

Los textos y la marca de tu proyecto viven en `src/content/`, `messages/` y `src/app/theme.css`. Mantenerlos ahí, lejos del código compartido, es lo que hace que las futuras fusiones desde LaunchKit sean pequeñas.

## Cómo se monta una página

Una página es una lista ordenada de secciones, cada una un objeto tipado:

```ts
// src/content/es/pages/contact.ts
export const contact = {
  meta: { title: 'Contacto', description: '…' },
  sections: [
    {
      id: 'intro',
      type: 'hero',
      title: 'Hablemos de tu próximo lanzamiento.',
      description: '…',
    },
    {
      id: 'message',
      type: 'contact',
      title: 'Envía un mensaje',
    },
  ],
} satisfies PageDefinition;
```

Reordena, elimina o añade secciones y la página se adapta, sin tocar ningún componente. TypeScript comprueba cada campo mientras escribes, y un tipo de sección desconocido detiene la compilación.
