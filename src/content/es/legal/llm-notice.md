---
title: Aviso sobre LLM
description: Cómo aborda LaunchKit los modelos de lenguaje, los agentes de IA y el contenido legible por máquinas, y qué expone exactamente su llms.txt.
updated: 2026-10-17
order: 3
---

LaunchKit es una base de código abierto para crear sitios web con Next.js. Cada vez más, la gente conoce proyectos como este a través de asistentes de IA y agentes de programación, que leen sitios web y documentación en nombre de alguien. Esta página explica qué ofrece LaunchKit a esas herramientas, qué no ofrece y dónde está la información fiable.

## Por qué una puerta de entrada para los LLM

Un agente al que se pregunta por LaunchKit, o al que se le pide trabajar en un proyecto de LaunchKit, tiene poco espacio para el contexto y ninguna forma fiable de distinguir una guía técnica de una página de marketing. Si nadie lo orienta, lee lo primero que encuentra. Un mapa breve y seleccionado le permite empezar por el lugar adecuado: la documentación, los pocos datos que definen el proyecto y las páginas que importan.

## Qué es /llms.txt

[`/llms.txt`](/llms.txt) es un archivo Markdown en la raíz de este sitio web. Sigue la propuesta llms.txt, publicada por primera vez por Jeremy Howard en 2024 y ya en su segunda versión en [llmstxt.org](https://llmstxt.org). El archivo tiene un título, un resumen de un párrafo, unas notas sobre lo que es fácil malinterpretar y listas de enlaces con una frase sobre cada uno, y termina con una lista opcional que un agente puede saltarse si le falta espacio.

Está pensado para el momento en que un asistente ayuda a alguien, no para entrenar modelos. Es una propuesta de la comunidad, no un estándar formal, y las herramientas difieren en si lo leen o no.

El archivo de LaunchKit se genera al compilar el sitio web, a partir del mismo contenido que las páginas a las que enlaza. Una guía nueva aparece en él automáticamente, con su propia descripción.

## Qué no es

`llms.txt` aporta contexto, no permisos. No controla:

- **El rastreo.** Qué herramientas automáticas pueden descargar qué páginas se indica en [`/robots.txt`](/robots.txt), y los rastreadores responsables lo respetan de forma voluntaria.
- **La indexación en buscadores.** Los buscadores deciden qué indexar a partir de las reglas de robots, de metadatos de la página como `noindex` y de sus propias políticas. `llms.txt` no interviene.
- **El entrenamiento de modelos.** Cuando un sitio web indica si su contenido puede usarse para entrenar modelos, lo hace con reglas de robots para rastreadores de IA concretos o con convenciones más recientes que aún se están estandarizando. `llms.txt` no concede ni deniega ese permiso.

Hoy, el `robots.txt` de LaunchKit aplica una sola regla a todos los rastreadores, que permite el acceso a todas las páginas, y no fija reglas específicas para los rastreadores de IA.

## Dónde está la información de referencia

Cuando las fuentes no coinciden, confía en ellas en este orden:

1. **El código fuente**, incluidas su configuración y sus pruebas. Es lo que de verdad se ejecuta.
2. **La documentación del repositorio**, como `AGENTS.md`, `CHANGELOG.md` y la especificación de `docs/`.
3. **Las guías de este sitio web**, en la [documentación](/docs).
4. **Todo lo demás del sitio web**, incluidas las páginas de producto y de precios, que describen LaunchKit para personas en lugar de definirlo.

Cualquier cosa que un agente deduzca, de su entrenamiento o de versiones antiguas de las herramientas, queda por debajo de todo lo anterior. LaunchKit usa Next.js 16, que se diferencia de las versiones anteriores en aspectos importantes; la referencia es la documentación que acompaña a la versión instalada.

## Cómo usa LaunchKit la IA

LaunchKit se construye con agentes de programación de IA que trabajan junto a una persona. Las reglas que siguen están en `AGENTS.md`: leer el código antes de cambiarlo, seguir las convenciones del proyecto, ejecutar todas las comprobaciones y no preparar cambios para un commit, hacer commits ni push ni abrir pull requests sin el permiso explícito de la persona. Las mismas comprobaciones automáticas se aplican escriba quien escriba el código. [IA en LaunchKit](/docs/building-with-ai) lo cuenta con más detalle.

Parte del contenido del sitio web está escrito con IA y señalado como tal, como el resumen ejecutivo al principio de cada guía. Nada en el sitio web usa IA para responder a los visitantes.

## Nuestro llms.txt

En aras de la transparencia, esto es exactamente lo que contiene la puerta de entrada de LaunchKit para los LLM: el archivo completo y actual, en inglés, generado a partir de la misma fuente que [`/llms.txt`](/llms.txt).
