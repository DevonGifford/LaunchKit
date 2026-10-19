---
title: El futuro de LaunchKit
description: Hacia dónde va LaunchKit, qué añade cada fase y en qué no se convertirá nunca.
updated: 2026-10-19
order: 6
summary: Hacia dónde va LaunchKit: terminar y traducir este sitio, demostrar la base en sitios reales, analítica y monitorización de errores opcionales, servicios de aplicación solo cuando hagan falta, las decisiones aún abiertas y en qué no se convertirá nunca.
next: launching-a-project, building-with-ai
---

LaunchKit está pensado para seguir siendo pequeño. No crecerá añadiendo todo lo que un sitio web podría necesitar algún día; crece cuando los proyectos reales muestran lo que de verdad necesitan. Por eso esta hoja de ruta no es una lista de funciones con fechas. Es el orden en el que LaunchKit piensa demostrar su valor y las reglas sobre lo que entra.

## Ahora: terminar el sitio

La base en sí ya está: el sistema de diseño, cuatro idiomas, contenido por secciones, formularios, pruebas, CI y un proceso de publicación controlado. El trabajo actual es el propio sitio de LaunchKit, el que estás leyendo.

- **Contenido definitivo.** Opiniones reales en lugar de las de ejemplo y precios cerrados, en todos los idiomas.
- **Cada página en cada idioma.** El sitio y estas guías se escriben primero en inglés y se traducen al español, el francés y el alemán cuando el inglés está cerrado, para no traducir nada dos veces.
- **Las páginas que faltan.** Los enlaces provisionales del pie de página, como «Acerca de» y el registro de cambios, tendrán destinos reales.

## Después: demostrarlo en sitios reales

La especificación lo llama **validación en el mundo real**, y es la fase que más importa. Una base vale lo que valen los sitios construidos sobre ella.

- **Un primer sitio real**, construido a partir de LaunchKit cambiando su marca, su contenido y su navegación y manteniendo intacta la ingeniería compartida.
- **Un segundo sitio, deliberadamente distinto**, para demostrar que dos sitios muy diferentes pueden compartir una base sin pelearse con ella.
- **Mejoras en ambas direcciones.** Un cambio hecho para un proyecto se contribuye a upstream, se publica y se fusiona en el otro, poniendo a prueba de principio a fin el modelo de upstream y proyectos derivados.

Hay seis sitios previstos para esto, desde el sitio de una agencia y una tienda de hardware para homelab hasta UnPocketed, la página de una aplicación. A medida que se lancen, aparecerán en la página de [Ejemplos](/examples), presentados con componentes de Storybook creados para ello.

## Más adelante: visibilidad opcional

Cuando los despliegues reales lo justifiquen, LaunchKit ofrecerá formas ligeras de ver cómo van los sitios. Las primeras ya están aquí:

- **Tráfico y velocidad** con Vercel Web Analytics y Speed Insights. Ninguno de los dos identifica a los visitantes, así que funcionan para todos, y solo se cargan en Vercel.
- **Monitorización de errores** con Sentry, con un muestreo conservador.
- **Analítica de producto** con PostHog cuando un proyecto la necesite, a la espera del consentimiento del visitante. Nunca junto a Vercel Web Analytics por defecto.

Cada una es, o será, un interruptor en `src/config/features.ts`, respetuoso con la privacidad y seguro de dejar sin configurar. Un clon nuevo sigue funcionando sin ninguna cuenta.

## Más lejos: servicios de aplicación

Algunos proyectos dejarán de ser solo un sitio web. Para ellos, y solo cuando un proyecto real los necesite, LaunchKit podría añadir:

- **Autenticación**, con Clerk u otro proveedor elegido en su momento.
- **Una base de datos**, probablemente Neon PostgreSQL con Drizzle.
- **Logs estructurados**, con un muestreo sensato y protección de la privacidad.

Los pagos, la monitorización de disponibilidad y las pruebas de regresión visual están aún más lejos. Son posibilidades, no promesas, y ninguna es condición para el éxito de LaunchKit.

## Aún por decidir

Dos decisiones siguen abiertas a propósito, para tomarlas con datos y no por inercia:

- **Las tipografías definitivas.** LaunchKit usa fuentes del sistema hasta elegir una serif y una sans-serif por su renderizado, su accesibilidad y su licencia.
- **El proveedor de analítica**, si lo hay: si basta con Vercel Web Analytics o un proyecto necesita PostHog.

## En qué no se convertirá LaunchKit

Decir que no forma parte del plan. LaunchKit no tendrá:

- un CMS obligatorio ni un editor de páginas de arrastrar y soltar;
- un sistema enorme de variantes de sección pensado para necesidades imaginarias;
- una pila obligatoria de autenticación, base de datos o facturación;
- un servicio obligatorio de monitorización o logs, ni de pago ni autoalojado.

Cada una de estas cosas haría que todos los proyectos cargaran con el peso de unos pocos. Si un proyecto necesita alguna, la añade en su propio repositorio, y si resulta útil para todos, puede volver a upstream.

## Seguir el proyecto

Cada cambio relevante queda registrado en `CHANGELOG.md`, y cada versión incluye notas sobre lo que deben hacer los proyectos derivados. Si tienes una idea, o un proyecto que te gustaría construir sobre LaunchKit, [escríbenos](/contact).
