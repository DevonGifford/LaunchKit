---
title: Lanzar con LaunchKit
description: Un ejemplo práctico, desde un repositorio vacío hasta un sitio publicado, probado y que sigue recibiendo las mejoras de LaunchKit.
updated: 2026-10-17
order: 3
summary: Un recorrido en ocho pasos para lanzar un sitio con LaunchKit: preparar el repositorio, darle una marca, componer páginas con secciones existentes, conectar el formulario de contacto, ejecutar las comprobaciones, publicarlo y recibir futuras versiones.
next: making-it-yours, component-library
---

LaunchKit existe para construir sobre él. Este recorrido sigue un proyecto desde el primer comando hasta el día del lanzamiento: **UnPocketed**, una aplicación móvil que necesita una página de presentación con sus funciones, algunas capturas y enlaces de descarga. Es uno de los sitios previstos sobre LaunchKit, lo que lo convierte en un buen ejemplo: lo bastante pequeño para seguirlo y lo bastante distinto del sitio de LaunchKit para demostrar la idea.

Los pasos son los mismos para cualquier proyecto. Donde UnPocketed toma una decisión, el tuyo puede tomar otra.

## 1. Empieza desde upstream

Un proyecto derivado es un repositorio propio que comparte el historial de Git de LaunchKit. Ese historial compartido es lo que permite que las mejoras lleguen después, así que empieza con un clon, no con una copia:

```sh
git clone --origin upstream \
  git@github.com:DevonGifford/LaunchKit.git unpocketed-site
cd unpocketed-site
git remote add origin \
  git@github.com:unpocketed/unpocketed-site.git
git push -u origin main
pnpm install
```

LaunchKit es ahora el remoto `upstream` y tu repositorio es `origin`. GitHub solo permite un fork por cuenta, y por eso esto es un clon con dos remotos en lugar de un fork: lo que importa es el historial, no la etiqueta.

Después, prepara el repositorio:

1. Ejecuta `scripts/setup-github.sh`. Crea la rama `staging` y las reglas que la protegen a ella y a `main`: cambios solo mediante pull request, y la CI debe pasar.
2. Activa las alertas y las actualizaciones de seguridad de Dependabot cuando el script lo ofrezca. La configuración viene con el código, pero GitHub no la activa por sí solo en un repositorio nuevo.
3. Sustituye los datos de contacto de `CODE_OF_CONDUCT.md` y `SECURITY.md`.

## 2. Dale una marca

El aspecto de UnPocketed empieza en un solo archivo. Su paleta sustituye los dos bloques de tokens de `src/app/theme.css`, uno para el tema claro y otro para el oscuro, y todos los componentes la siguen. Su logotipo va en `public/brand/`, como archivos nuevos en lugar de sobrescribir los de LaunchKit, lo que mantiene limpias las futuras fusiones.

Abre Storybook y alterna entre los temas. Todas las secciones están ahí en todos los tamaños de pantalla, así que un problema de paleta aparece en minutos, y el panel de accesibilidad señala cualquier texto que no alcance el contraste necesario.

## 3. Da forma a las páginas

La página de presentación de una aplicación necesita una apertura potente, pruebas de que vale la pena instalarla y una forma clara de conseguirla. La portada de UnPocketed, en `src/content/en/pages/home.ts`, se compone de secciones que LaunchKit ya tiene:

| Sección         | Su función en la portada de UnPocketed                                |
| --------------- | --------------------------------------------------------------------- |
| `hero-centered` | La promesa de la aplicación, con el botón de descarga primero         |
| `showcase`      | Un carrusel de capturas reales, en claro y en oscuro                  |
| `features`      | Lo que hace la aplicación, en tres grupos sencillos                   |
| `reviews`       | Lo que dicen los primeros usuarios, cuando haya opiniones reales      |
| `faq`           | Privacidad, precios y plataformas, respondidos antes de que pregunten |
| `cta-band`      | Los enlaces de descarga otra vez, para quien lee hasta el final       |

No hace falta cambiar ningún componente: la página son datos, y TypeScript comprueba cada campo. Cualquier cosa propia de UnPocketed, como una fila de insignias de las tiendas de aplicaciones, sería una sección nueva en el proyecto, construida como explica [Sistema de diseño de LaunchKit](component-library).

## 4. Completa los datos

`src/config/site.ts` recibe el nombre del proyecto, los datos de contacto y los perfiles sociales. `src/config/navigation.ts` define los menús. Para el sitio de una aplicación de una sola página, podrían ser solo Funciones, Opiniones y Preguntas frecuentes, apuntando a secciones de la portada. Cada etiqueta es un mensaje en `messages/`, así que los menús se traducen con todo lo demás.

## 5. Conecta el formulario de contacto

Este paso es fácil de pasar por alto. El formulario de contacto de LaunchKit valida cada mensaje, en el navegador y de nuevo en el servidor, y ahí se detiene: el envío queda en manos de cada proyecto, para que un clon nuevo no necesite ninguna cuenta de correo. Hasta que lo conectes, los mensajes no llegan a ninguna parte.

El envío es una sola función, `deliver()` en `src/lib/forms/contact-action.ts`. Envía el mensaje desde ahí a un servicio de correo, un CRM o un webhook. Declara las claves en `src/env.ts`, para que un valor ausente falle de forma segura, y no registres los mensajes en los logs: son datos personales.

## 6. Compruébalo todo

Antes de publicar nada, ejecuta las mismas comprobaciones que la CI:

```sh
# Tipos, lint, formato y traducciones; luego las
# pruebas unitarias, de navegador y de historias
pnpm check

# Compilación de producción, probada en escritorio y móvil
pnpm test:e2e
```

Entre las dos, comprueban la accesibilidad de cada página con ambos temas, se aseguran de que ninguna página se desplace en horizontal en un móvil de 320 px y detectan cualquier idioma al que le falte un mensaje.

## 7. Publícalo

Despliega en cualquier hosting que ejecute Next.js. En Vercel, conecta el repositorio y los despliegues de producción seguirán a `main`. Define `NEXT_PUBLIC_SITE_URL` con la dirección real del sitio, para que los enlaces canónicos, el sitemap y las alternativas de idioma apunten al dominio correcto.

A partir de aquí, el trabajo sigue el modelo de ramas de LaunchKit: ramas de corta duración hacia `staging` mediante pull request, y `staging` hacia `main` cuando está listo para publicarse.

## 8. Sigue recibiendo mejoras

El lanzamiento no es el final de la relación. Cuando LaunchKit publica una versión nueva, UnPocketed la fusiona de forma deliberada:

```sh
git fetch upstream --tags
git switch staging
git switch -c chore/launchkit-v0.2.0
git merge v0.2.0
pnpm install
pnpm check && pnpm test:e2e
```

Lee antes las notas de esa versión en el `CHANGELOG.md` de LaunchKit; los cambios incompatibles vienen con los pasos que hay que seguir. Es normal que haya conflictos en `src/content/`, `messages/` y `theme.css`. Quédate con tu versión, porque las de LaunchKit en esos archivos son solo ejemplos.

Y cuando UnPocketed construya algo que otros sitios puedan usar, como un carrusel de capturas mejor, puede viajar en sentido contrario: como pull request a LaunchKit y de vuelta en la siguiente versión. Esa es toda la idea. Constrúyelo una vez, reutilízalo a menudo y mejóralo de forma centralizada.
