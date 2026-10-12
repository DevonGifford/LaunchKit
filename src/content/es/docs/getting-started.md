---
title: Primeros pasos
description: Crea un proyecto a partir de LaunchKit, ejecútalo en local y descubre dónde está cada cosa.
updated: 2026-10-12
order: 1
---

## Requisitos

- Node.js 24 o posterior
- pnpm 12 — la versión exacta está fijada en `package.json`

No hacen falta bases de datos, cuentas ni claves de API. Un clon recién descargado se instala, se compila y supera sus pruebas sin ninguna variable de entorno.

## Crear un proyecto

Clona LaunchKit en un directorio nuevo y consérvalo como remoto `upstream` para poder fusionar mejoras en tu proyecto más adelante:

```sh
git clone --origin upstream git@github.com:DevonGifford/LaunchKit.git my-site
cd my-site
git remote add origin git@github.com:your-org/my-site.git
pnpm install
pnpm exec playwright install chromium
pnpm dev
```

El sitio ya está funcionando en `http://localhost:3000`.

## Dónde está cada cosa

| Ruta                | Contenido                                                            |
| ------------------- | -------------------------------------------------------------------- |
| `src/content/`      | Contenido de las páginas y documentos largos, una carpeta por idioma |
| `messages/`         | Textos breves de la interfaz, un archivo JSON por idioma             |
| `src/app/theme.css` | Colores de la marca, tipografías y radio de las esquinas             |
| `src/components/`   | Primitivas, maquetación y componentes de sección                     |
| `src/config/`       | Navegación, funciones activables y ajustes del sitio                 |

Los textos y la marca de tu proyecto viven en `src/content/`, `messages/` y `src/app/theme.css`. Mantenerlos ahí, separados del código compartido, es lo que hace sencillas las futuras fusiones desde LaunchKit.

## Comandos habituales

| Comando          | Qué hace                                                             |
| ---------------- | -------------------------------------------------------------------- |
| `pnpm dev`       | Inicia el servidor de desarrollo                                     |
| `pnpm check`     | Comprueba tipos, lint, formato y traducciones, y ejecuta las pruebas |
| `pnpm test:e2e`  | Ejecuta pruebas de extremo a extremo en navegadores reales           |
| `pnpm storybook` | Abre el taller de componentes                                        |
| `pnpm build`     | Genera una compilación de producción                                 |
