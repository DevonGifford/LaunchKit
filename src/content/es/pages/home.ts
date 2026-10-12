import type { PageDefinition } from '@/lib/content/types';

export const home = {
  meta: {
    title: 'Una base reutilizable de Next.js',
    description:
      'LaunchKit es una base mantenida de sistema de diseño, localización, contenido y herramientas, para que cada sitio nuevo parta de un terreno probado.',
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      eyebrow: 'Una base para ideas ambiciosas',
      title: 'Hecho para lo que viene.',
      description:
        'LaunchKit es una base refinada de Next.js: sistema de diseño, localización, contenido y herramientas, listos desde el primer día. Cada sitio nuevo parte de un terreno probado, no de una carpeta vacía.',
      primaryAction: { label: 'Empezar', href: '/docs/getting-started' },
      secondaryAction: { label: 'Iniciar un proyecto', href: '/contact' },
      preview: {
        filename: 'src/content/es/pages/home.ts',
        code: `export const home = {
  sections: [
    { type: 'hero', title: 'Hecho para lo que viene.' },
    { type: 'statement', title: 'Construir una vez…' },
    { type: 'features', title: 'Tres capas…' },
    { type: 'use-cases', title: 'Seis sitios…' },
    { type: 'workflow', title: 'Del clon…' },
    { type: 'cta', title: 'Empieza con…' },
  ],
} satisfies PageDefinition;`,
      },
    },
    {
      id: 'philosophy',
      type: 'statement',
      eyebrow: 'La filosofía',
      title: 'Construir una vez. Reutilizar a menudo. Mejorar de forma centralizada.',
      paragraphs: [
        'Casi todos los sitios web empiezan igual: un framework, componentes, un tema, traducciones, formularios, pruebas e integración continua, montados de nuevo desde cero y cada vez de forma un poco distinta.',
        'LaunchKit hace ese trabajo una sola vez, con cuidado, y lo mantiene. Los proyectos nuevos nacen accesibles, localizados y probados, y dedican su tiempo a lo que los hace diferentes.',
        'Cuando la base mejora, cada proyecto construido sobre ella puede incorporar la mejora de forma deliberada, con una fusión de Git corriente.',
      ],
    },
    {
      id: 'included',
      type: 'features',
      eyebrow: 'Qué incluye',
      title: 'Tres capas, listas desde el primer día.',
      description:
        'Una base pequeña y bien hecha, en lugar de una enorme galería creada para necesidades imaginarias.',
      items: [
        {
          title: 'Sistema de diseño',
          description:
            'Tokens semánticos, apariencias clara y oscura, y primitivas accesibles que adoptan una marca nueva sin reescribirse.',
          points: [
            'La paleta de la marca vive en un solo archivo',
            'Claro y oscuro, según el sistema',
            'Primitivas de shadcn/ui dentro del repositorio',
          ],
        },
        {
          title: 'Base de la aplicación',
          description:
            'Rutas, localización, contenido tipado y formularios validados: lo que todo sitio necesita, ya conectado.',
          points: [
            'Cuatro idiomas con metadatos localizados',
            'Páginas compuestas por secciones tipadas',
            'React Hook Form con validación de Zod',
          ],
        },
        {
          title: 'Experiencia de desarrollo',
          description:
            'Tipos estrictos, respuesta rápida y comprobaciones que funcionan igual en cada equipo y en la integración continua.',
          points: [
            'TypeScript estricto, ESLint y Prettier',
            'Pruebas unitarias, de navegador y de extremo a extremo',
            'Storybook con comprobaciones de accesibilidad',
          ],
        },
      ],
    },
    {
      id: 'adapt',
      type: 'use-cases',
      eyebrow: 'Hecho para adaptarse',
      title: 'Seis sitios web distintos. Una sola base.',
      description:
        'Cada proyecto conserva su marca, su contenido y sus funciones, y comparte la ingeniería que hay debajo.',
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
      id: 'developer-experience',
      type: 'workflow',
      eyebrow: 'Experiencia de desarrollo',
      title: 'Del clon al sitio en marcha en minutos.',
      description:
        'pnpm, TypeScript estricto y un conjunto de scripts conocido. No hacen falta cuentas, claves ni servicios de pago para empezar.',
      steps: [
        {
          comment: 'Crea un proyecto con LaunchKit como upstream',
          command: 'git clone --origin upstream git@github.com:DevonGifford/LaunchKit.git my-site',
        },
        { comment: 'Instala, sin credenciales', command: 'pnpm install' },
        { comment: 'Arranca el servidor de desarrollo', command: 'pnpm dev' },
        { comment: 'Ejecuta las mismas comprobaciones que la CI', command: 'pnpm check' },
        {
          comment: 'Más adelante: fusiona las mejoras de upstream de forma explícita',
          command: 'git fetch upstream && git merge upstream/main',
        },
      ],
      stack: [
        'Next.js 16',
        'React 19',
        'TypeScript 6',
        'Tailwind CSS 4',
        'next-intl',
        'Zod',
        'Vitest',
        'Playwright',
        'Storybook',
      ],
    },
    {
      id: 'begin',
      type: 'cta',
      title: 'Empieza con una base mejor.',
      description:
        'Crea tu próximo sitio web a partir de LaunchKit, hazlo inconfundiblemente tuyo y deja que la ingeniería siga mejorando por debajo.',
      primaryAction: { label: 'Leer la guía', href: '/docs/getting-started' },
      secondaryAction: { label: 'Contactar', href: '/contact' },
    },
  ],
} satisfies PageDefinition;
