import type { PageDefinition } from '@/lib/content/types';

/** Screenshots of LaunchKit's own sections, in public/marketing/showcase/, each linking to where it lives. */
const screen = (name: string, file: string, href: string) => ({
  name,
  href,
  light: `/marketing/showcase/${file}-light.webp`,
  dark: `/marketing/showcase/${file}-dark.webp`,
});

/** The Examples page in Spanish, translated from src/content/en/pages/examples.ts. */
export const examples = {
  meta: {
    title: 'Ejemplos',
    description:
      'Los sitios web que se están construyendo con LaunchKit, las secciones de las que están hechos y lo que tú también podrías crear.',
  },
  sections: [
    {
      // The fixture's social proof is left out: there are no real ratings to show yet.
      id: 'hero',
      type: 'hero-centered',
      title: 'Lo que se construye con LaunchKit',
      titleHighlight: 'LaunchKit',
      description:
        'Los primeros proyectos ya están en marcha. Hasta que se lancen, descubre qué será cada uno, de qué secciones está hecho y qué podrías crear tú.',
      primaryAction: { label: 'Empieza tu proyecto', href: '/contact' },
      menu: {
        label: 'Explorar',
        items: [
          { label: 'Proyectos en curso', href: '/examples#projects' },
          { label: 'La biblioteca de secciones', href: '/examples#library' },
          { label: 'Todas las secciones', href: '/examples#sections' },
          { label: 'Documentación', href: '/docs' },
        ],
      },
    },
    {
      // The previous homepage's use cases: the projects LaunchKit was made for.
      id: 'projects',
      type: 'lineup',
      eyebrow: 'En curso',
      title: 'Seis sitios web en camino.',
      description:
        'Cada uno conserva su marca, su contenido y sus funciones, y comparte la ingeniería que hay debajo. Los enlazaremos aquí a medida que se lancen.',
      items: [
        {
          name: 'Sitio de agencia',
          kind: 'Corporativo · Portafolio',
          description: 'Servicios, casos de estudio y un recorrido de contacto bien pensado.',
        },
        {
          name: 'Hardware para homelab',
          kind: 'Escaparate de productos',
          description:
            'Equipos reacondicionados con especificaciones y consultas; el comercio electrónico puede llegar después.',
        },
        {
          name: 'UnPocketed',
          kind: 'Página de aplicación',
          description:
            'Funciones, capturas de pantalla y enlaces de descarga para una aplicación móvil.',
        },
        {
          name: 'selfOS',
          kind: 'Producto · SaaS',
          description: 'Un relato de producto claro, documentación y una lista de espera.',
        },
        {
          name: 'Marca de ropa',
          kind: 'Escaparate comercial',
          description: 'Colecciones, imágenes y relato de marca, con el pago gestionado aparte.',
        },
        {
          name: 'Demostraciones de rediseño',
          kind: 'Ventas · Portafolio',
          description:
            'Rediseños de portada con un antes y un después que muestran lo que permite una base mejor.',
        },
      ],
    },
    {
      id: 'library',
      type: 'capabilities',
      variant: 'detailed',
      eyebrow: 'La biblioteca de secciones',
      title: 'Sitios distintos, compuestos con las mismas secciones.',
      description:
        'Cada proyecto se nutre de una única biblioteca de secciones tipadas, todas listas para ambos temas, cuatro idiomas y cualquier tamaño de pantalla.',
      action: { label: 'Leer la documentación', href: '/docs' },
      items: [
        {
          title: 'Abrir la página',
          description:
            'Cuatro diseños de hero, desde una apertura tipográfica sobria hasta una película que avanza con el scroll, todos con espacio para un primer paso claro.',
          tags: ['Hero básico', 'Hero centrado', 'Hero dividido', 'Hero cinemático'],
        },
        {
          title: 'Contar la historia',
          description:
            'Secciones que explican lo que haces y por qué importa, desde una sola declaración hasta una cuadrícula de funciones.',
          tags: ['Declaración', 'Funciones', 'Capacidades', 'Bento', 'Catálogo', 'Escaparate'],
        },
        {
          title: 'Convencer',
          description:
            'Pruebas y siguientes pasos: cifras, logotipos, opiniones, planes, respuestas y un formulario, para que quien visite sepa qué hacer a continuación.',
          tags: [
            'Cifras',
            'Marquesina',
            'Opiniones',
            'Precios',
            'Dudas',
            'Llamadas a la acción',
            'Formulario de contacto',
          ],
        },
      ],
    },
    {
      // The showcase fixture, linking each screenshot to where the section lives now.
      id: 'sections',
      type: 'showcase',
      eyebrow: 'Escaparate',
      title: 'Todas las secciones, listas para combinar.',
      description:
        'Explora las secciones que incluye LaunchKit. Cada una recibe contenido tipado, funciona en cuatro idiomas y sigue el tema activo.',
      primaryAction: { label: 'Empezar', href: '/docs/getting-started' },
      secondaryAction: { label: 'Leer la documentación', href: '/docs' },
      items: [
        screen('Hero', 'hero', '/#hero'),
        screen('Precios', 'pricing', '/pricing'),
        screen('Cronología', 'timeline', '/#timeline'),
        screen('Infraestructura', 'infrastructure', '/#infrastructure'),
        screen('Stack tecnológico', 'tech-stack', '/#stack'),
        screen('Experiencia de desarrollo', 'developer-experience', '/#developer-experience'),
        screen('Calidad y automatización', 'quality', '/#quality'),
        screen('Casos de uso', 'use-cases', '/examples#projects'),
      ],
    },
    {
      id: 'begin',
      type: 'cta-split',
      eyebrow: 'Tu proyecto, el siguiente',
      title: '¿Tienes un proyecto en mente?',
      description:
        'Empieza con LaunchKit por tu cuenta o deja que lo construyamos contigo. En ambos casos, parte de la misma base probada.',
      primaryAction: { label: 'Ponte en contacto', href: '/contact' },
      secondaryAction: { label: 'Empezar', href: '/docs/getting-started' },
      image: '/marketing/cta-images/cta-image-4.webp',
      items: ['Tu marca', 'Cuatro idiomas', 'Accesible', 'Probado', 'Mantenido'],
    },
  ],
} satisfies PageDefinition;
