---
title: IA en LaunchKit
description: Cómo trabajan los agentes de programación en este repositorio, las reglas que los mantienen seguros y cómo es una sesión de trabajo real.
updated: 2026-10-17
order: 5
summary: Cómo trabajan los agentes de IA en LaunchKit: el reglamento común de AGENTS.md, la regla de que solo las personas hacen commits, 18 skills fijadas, la documentación que acompaña al framework, las comprobaciones que detectan errores y el ciclo de cinco pasos con el que se construyó este sitio.
next: component-library, roadmap
---

Gran parte de LaunchKit, incluido este sitio, se construyó con un agente de programación de IA trabajando junto a una persona. Eso solo funciona porque el repositorio está preparado para ello. Un agente necesita lo mismo que alguien que se incorpora al equipo: convenciones claras, respuestas rápidas y límites firmes. LaunchKit le da las tres cosas y deja la última palabra a la persona.

## Un reglamento para personas y agentes

Cada sesión de un agente empieza leyendo `AGENTS.md` en la raíz del repositorio. (`CLAUDE.md` simplemente apunta a él, así que todas las herramientas leen el mismo archivo.) Cubre lo que cualquier recién llegado necesita saber:

- **Cómo está organizado el código:** qué carpetas dependen de cuáles, dónde viven las secciones y por qué las rutas no contienen lógica reutilizable.
- **Las convenciones:** TypeScript estricto, colores solo desde tokens, ningún texto fijo en los componentes y cada texto de la interfaz en los cuatro idiomas.
- **Las comprobaciones que hay que ejecutar:** `pnpm check` y `pnpm test:e2e`, y qué hacer cuando una falla por un motivo ajeno.
- **Cómo informar:** qué cambió y por qué, qué comprobaciones se ejecutaron y pasaron, y qué le queda por decidir a la persona.

Escribir las reglas una vez cumple dos funciones. Los agentes las siguen, y las personas que se unen al proyecto tienen la misma guía.

## Los agentes escriben código; las personas son dueñas del historial

La sección más importante de `AGENTS.md` está copiada palabra por palabra de la especificación del proyecto. Los agentes pueden leer el repositorio, cambiar archivos, ejecutar pruebas y preparar trabajo. No pueden preparar cambios para un commit, hacer commits ni push, abrir pull requests ni reescribir el historial sin permiso explícito, e incluso entonces deben confirmarlo de nuevo justo antes de actuar.

> El agente escribe y valida el código. La persona conserva el control final sobre el historial de Git, los cambios en el repositorio y la publicación.

En la práctica, un agente termina un trabajo, ejecuta las comprobaciones y deja todos los cambios sin preparar, con un resumen. La persona revisa el diff, hace el commit y decide qué viene después. Nada llega al historial del repositorio sin que una persona lo elija.

## Skills: conocimiento bajo demanda

Los agentes pueden cargar **skills**: instrucciones empaquetadas para un tipo de tarea concreto. LaunchKit fija 18 a nivel de proyecto en `skills-lock.json`, para que cada clon tenga exactamente las mismas versiones:

- catorce skills de ingeniería de la colección de Matt Pocock, para revisar código, desarrollar guiado por pruebas, diagnosticar errores y diseñar módulos;
- dos de Vercel, sobre rendimiento en React y pautas de interfaces web;
- una de Anthropic, sobre diseño de frontend;
- una de shadcn/ui, para trabajar con sus componentes.

Las skills se restauran en un clon nuevo con `pnpm dlx skills experimental_install`. Una skill se ejecuta con todos los permisos del agente, así que el `SKILL.md` de cada una se lee antes de añadirla, y `AGENTS.md` siempre prevalece sobre sus consejos. Las reglas de Git ganan siempre.

## Conocimiento fresco, no memoria desfasada

El entrenamiento de un modelo termina en algún momento; las herramientas siguen avanzando. LaunchKit usa Next.js 16, que cambia lo suficiente como para que la memoria de un agente sobre versiones anteriores lo despiste. Next.js incluye su documentación dentro del paquete instalado, y `AGENTS.md` indica a los agentes que lean la guía correspondiente en `node_modules/next/dist/docs/` antes de escribir código. Cuando un agente añadió las transiciones entre páginas de este sitio, trabajó con esa documentación, no de memoria.

Storybook hace lo mismo: `pnpm exec storybook skills stories` y `write-story` dan a un agente instrucciones actuales para escribir historias.

## Comprobaciones que detectan lo que se escapa en la revisión

Las reglas solo sirven si se nota cuando se rompen. Las comprobaciones de LaunchKit no se fijan en quién escribió el código:

- **TypeScript y Zod** rechazan el contenido que no cumple el esquema de una sección.
- **El registro de secciones** no compila mientras un tipo de sección no tenga componente.
- **ESLint** no permite avisos y rechaza los colores fijos.
- **`pnpm i18n:check`** falla si a un idioma le falta un mensaje.
- **Las pruebas de historias** ejecutan axe en cada componente, y **las pruebas de extremo a extremo** revisan cada página en escritorio y móvil, con ambos temas.

Un agente las ejecuta todas antes de informar, y las mismas comprobaciones se ejecutan en la CI en cada pull request.

## Cómo es una sesión

Este sitio se construyó en una serie de sesiones con un agente, cada una un único trabajo revisable: la cabecera y la navegación, la portada, las páginas de Ejemplos y Precios, una pasada de pulido y estas guías. Todas siguieron el mismo ciclo.

1. **Un encargo.** La persona describe el objetivo y los límites: qué entra, qué no y qué no se debe tocar.
2. **Primero, leer.** El agente revisa el código, las pruebas y la documentación correspondientes antes de proponer nada, y pregunta por las decisiones que de verdad corresponden a la persona, como qué secciones debe tener una página.
3. **Construir y verificar.** Hace el cambio limpio más pequeño posible, ejecuta todas las comprobaciones y mira el resultado en un navegador real, con ambos temas y en varios anchos.
4. **Informar.** Enumera qué cambió, qué comprobaciones pasaron y cualquier cosa que la persona deba decidir o saber.
5. **Revisar y hacer commit.** La persona lee el diff y hace el commit, o pide cambios.

La verificación se gana su sitio. En estas sesiones encontró una cabecera que se desplazaba en horizontal en tabletas en tres idiomas, una prueba que solo fallaba con el sistema cargado, un desplegable que devolvía la página arriba después de saltar a una sección y un formulario de contacto que descartaba en silencio todos los mensajes. Nada de eso aparecía con un vistazo rápido al código. Todo apareció cuando el agente midió, ejecutó y recorrió el sitio real.

## Trabajar así en tu proyecto

Cualquier proyecto construido sobre LaunchKit hereda esta configuración: el mismo `AGENTS.md`, las mismas skills y las mismas comprobaciones. Adapta `AGENTS.md` a tu proyecto, conserva las reglas de Git y deja que las comprobaciones vigilen. El objetivo no es entregar el proyecto a un agente, sino dar a un colaborador capaz reglas claras, respuestas rápidas y una persona que decide.
