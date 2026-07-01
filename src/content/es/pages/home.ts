import type { PageDefinition } from '@/lib/content/types';
import { pricingCurrencies, pricingPlans } from './pricing';

/** Screenshots of LaunchKit's own sections, in public/marketing/showcase/. */
const screenshot = (file: string) => ({
  light: `/marketing/showcase/${file}-light.webp`,
  dark: `/marketing/showcase/${file}-dark.webp`,
});

/**
 * Technology marks in public/marketing/logos/: the marquee stories'
 * tests/fixtures/logos/ files, plus more drawn the same way from the path data
 * in src/components/sections/tech-icons.tsx. Both come from Simple Icons
 * 16.35.0 (CC0-1.0, https://simpleicons.org). The marks are trademarks of their
 * owners, used here only to name the tools.
 */
const logo = (name: string, file: string) => ({
  name,
  src: `/marketing/logos/${file}.svg`,
  width: 24,
  height: 24,
});

/** The homepage in Spanish, translated from src/content/en/pages/home.ts. */
export const home = {
  meta: {
    title: 'La base para tu próximo sitio web',
    description:
      'LaunchKit es una base de Next.js cuidada, con sistema de diseño, cuatro idiomas, contenido tipado y comprobaciones automáticas, para que cada sitio web nuevo empiece sobre terreno probado.',
  },
  sections: [
    {
      id: 'hero',
      type: 'marketing-hero-launchkit',
      eyebrow: 'La base moderna para tu próxima gran idea',
      title: ['Lanza más rápido.', 'Construye lo que importa.'],
      titleHighlight: 'importa.',
      audiences: ['Para fundadores', 'Para startups', 'Para rediseños'],
      description:
        'Una base cuidada para fundadores, startups y empresas listas para empezar de nuevo.',
      primaryAction: { label: 'Empezar', href: '/docs/getting-started' },
      secondaryAction: { label: 'Ver ejemplos', href: '/examples' },
      showcase: {
        light: '/marketing/hero-showcase-light.webp',
        dark: '/marketing/hero-showcase-dark.webp',
        alt: 'Tres sitios web creados con LaunchKit, en ventanas de navegador',
        width: 1448,
        height: 1086,
      },
    },
    {
      id: 'technologies',
      type: 'marquee',
      title: 'Hecho con herramientas que ya conoces',
      items: [
        logo('Next.js', 'nextjs'),
        logo('React', 'react'),
        logo('TypeScript', 'typescript'),
        logo('Tailwind CSS', 'tailwindcss'),
        logo('shadcn/ui', 'shadcn-ui'),
        logo('Radix UI', 'radix-ui'),
        logo('Zod', 'zod'),
        logo('React Hook Form', 'react-hook-form'),
        logo('Vitest', 'vitest'),
        logo('Storybook', 'storybook'),
        logo('ESLint', 'eslint'),
        logo('pnpm', 'pnpm'),
        logo('GitHub Actions', 'github-actions'),
      ],
      direction: 'right',
      speed: 'slow',
    },
    {
      id: 'timeline',
      type: 'marketing-setup-timeline',
      title: 'La misma configuración, cada vez.',
      titleMuted: 'No tiene por qué.',
      paragraphs: [
        {
          text: 'Un framework, un tema, traducciones, formularios, pruebas y CI, montados de nuevo en cada proyecto y cada vez de forma un poco distinta.',
        },
        { text: 'Nueve semanas de trabajo que no hacen distinto tu sitio.', emphasis: true },
        {
          text: 'LaunchKit hace ese trabajo una sola vez y lo mantiene, para que cada proyecto empiece por lo que lo hace único.',
        },
      ],
      callout: {
        eyebrow: 'Con LaunchKit',
        title: 'Día 1: construye lo que importa',
        description:
          'La base ya está hecha. Empieza por la marca, el contenido y las funciones que solo tú puedes aportar.',
      },
      // Illustrative estimates, as in the fixture; the fixture's note to "replace
      // these figures" is meant for downstream projects, so it is left off here.
      timeline: {
        title: 'Calendario de desarrollo',
        badge: 'Estimación',
        columns: { item: 'Capacidad', before: 'Desde cero', after: 'Con LaunchKit' },
        rows: [
          { item: 'Configuración y herramientas', before: '1 semana', after: 'Día 1' },
          { item: 'Tokens de diseño y temas', before: '1 semana', after: 'Día 1' },
          { item: 'Componentes de interfaz accesibles', before: '2 semanas', after: 'Día 1' },
          { item: 'Localización en cuatro idiomas', before: '1 semana', after: 'Día 1' },
          { item: 'Contenido y secciones tipados', before: '1 semana', after: 'Día 1' },
          { item: 'Formularios y acciones de servidor', before: '1 semana', after: 'Día 1' },
          {
            item: 'Pruebas unitarias, de navegador y de extremo a extremo',
            before: '1 semana',
            after: 'Día 1',
          },
          { item: 'CI, hooks de Git y versiones', before: '1 semana', after: 'Día 1' },
        ],
        total: { item: 'Total', before: '9 semanas', after: 'Día 1' },
        note: 'Estimado para un desarrollador con experiencia.',
      },
    },
    {
      id: 'included',
      type: 'bento',
      eyebrow: 'Dentro de LaunchKit',
      title: 'Todo lo que necesita un sitio nuevo, ya construido.',
      description:
        'Temas, cuatro idiomas, diseños adaptables, pruebas y comprobaciones de accesibilidad vienen con cada proyecto.',
      showcase: {
        stat: '20+ secciones',
        title: 'Secciones para cada página',
        description:
          'Heros, precios, cronologías, preguntas frecuentes y más, cada una con contenido tipado y lista para ambos temas.',
        images: [
          screenshot('hero'),
          screenshot('pricing'),
          screenshot('timeline'),
          screenshot('infrastructure'),
        ],
        alt: 'Secciones de LaunchKit una tras otra: el hero, los planes de precios, una cronología y una vista de la infraestructura.',
      },
      marquee: {
        stat: '40+ componentes',
        title: 'Primitivas de shadcn/ui',
        description:
          'Piezas accesibles sobre Radix UI, con el estilo de los tokens de LaunchKit y revisadas en Storybook.',
        action: { label: 'Leer la documentación', href: '/docs' },
        rows: [
          [
            'Accordion',
            'Alert dialog',
            'Avatar',
            'Badge',
            'Button',
            'Calendar',
            'Card',
            'Carousel',
          ],
          [
            'Checkbox',
            'Combobox',
            'Dialog',
            'Drawer',
            'Dropdown menu',
            'Popover',
            'Select',
            'Tabs',
          ],
          [
            'Input OTP',
            'Pagination',
            'Radio group',
            'Sheet',
            'Slider',
            'Switch',
            'Table',
            'Tooltip',
          ],
        ],
      },
      integrations: {
        title: 'Sobre herramientas que conoces',
        description:
          'Next.js, React y TypeScript debajo; Tailwind CSS, shadcn/ui y Zod encima. Nada propietario que aprender.',
        tools: [
          { name: 'Next.js', icon: 'nextjs' },
          { name: 'React', icon: 'react' },
          { name: 'TypeScript', icon: 'typescript' },
          { name: 'Tailwind CSS', icon: 'tailwindcss' },
          { name: 'shadcn/ui', icon: 'shadcn-ui' },
          { name: 'Zod', icon: 'zod' },
        ],
      },
      gallery: {
        title: 'Páginas con aspecto terminado',
        description:
          'Temas Sunlight y Midnight, con el contraste comprobado, para que cada página sea presentable desde el primer despliegue.',
        action: { label: 'Personalízalo', href: '/docs/making-it-yours' },
        images: [
          { ...screenshot('tech-stack'), alt: 'La sección del stack tecnológico' },
          { ...screenshot('developer-experience'), alt: 'La sección de experiencia de desarrollo' },
          { ...screenshot('quality'), alt: 'La sección de calidad y automatización' },
        ],
      },
    },
    {
      id: 'stack',
      type: 'marketing-technical-stack',
      eyebrow: 'Stack tecnológico',
      title: 'Sobre herramientas probadas.',
      description: 'Herramientas actuales y bien mantenidas, ya configuradas y probadas juntas.',
      featured: [
        { name: 'Next.js', description: 'Framework de React', icon: 'nextjs' },
        { name: 'React', description: 'Biblioteca de interfaz', icon: 'react' },
        { name: 'TypeScript', description: 'Tipado estricto', icon: 'typescript' },
        { name: 'Tailwind CSS', description: 'Estilos basados en tokens', icon: 'tailwindcss' },
        { name: 'shadcn/ui', description: 'Componentes de interfaz', icon: 'shadcn-ui' },
        { name: 'next-intl', description: 'Cuatro idiomas integrados', icon: 'next-intl' },
        { name: 'Zod', description: 'Validación de esquemas', icon: 'zod' },
        { name: 'React Hook Form', description: 'Formularios validados', icon: 'react-hook-form' },
      ],
      tools: [
        { name: 'Radix UI', description: 'Primitivas de interfaz', icon: 'radix-ui' },
        { name: 'Lucide', description: 'Iconos', icon: 'lucide' },
        { name: 'next-themes', description: 'Claro y oscuro', icon: 'next-themes' },
        { name: 'Sonner', description: 'Notificaciones', icon: 'sonner' },
        { name: 'date-fns', description: 'Fechas', icon: 'date-fns' },
        { name: 'Marked', description: 'Documentos Markdown', icon: 'marked' },
        { name: 'T3 Env', description: 'Variables de entorno tipadas', icon: 't3-env' },
        { name: 'Vitest', description: 'Pruebas unitarias', icon: 'vitest' },
        { name: 'Playwright', description: 'Pruebas de extremo a extremo', icon: 'playwright' },
        { name: 'Storybook', description: 'Documentación de componentes', icon: 'storybook' },
        { name: 'axe-core', description: 'Comprobaciones de accesibilidad', icon: 'axe-core' },
        { name: 'ESLint', description: 'Análisis estático', icon: 'eslint' },
        { name: 'Prettier', description: 'Formato', icon: 'prettier' },
        { name: 'Lefthook', description: 'Hooks de Git', icon: 'lefthook' },
        { name: 'Commitlint', description: 'Mensajes de commit', icon: 'commitlint' },
        { name: 'pnpm', description: 'Gestor de paquetes', icon: 'pnpm' },
        { name: 'GitHub Actions', description: 'CI', icon: 'github-actions' },
        { name: 'Dependabot', description: 'Actualizaciones semanales', icon: 'dependabot' },
      ],
    },
    {
      // The pipeline fixture, with two of its promises reworded to what
      // LaunchKit itself provides rather than what a host does.
      id: 'infrastructure',
      type: 'marketing-deployment-pipeline',
      eyebrow: 'Pipeline de despliegue',
      title: 'Infraestructura que crece contigo.',
      description:
        'Un push lleva un cambio de tu rama a producción, siempre por las mismas comprobaciones.',
      items: [
        {
          icon: 'globe',
          title: 'Despliega donde quieras',
          description:
            'Una aplicación Next.js estándar, para Vercel o cualquier hosting que ejecute Next.js.',
        },
        {
          icon: 'trending-up',
          title: 'Escala con el tráfico',
          description:
            'Las páginas se prerenderizan al compilar y se sirven como archivos estáticos.',
        },
        {
          icon: 'coins',
          title: 'Ligero de mantener',
          description:
            'Sin servicios de pago para empezar, y las páginas estáticas mantienen bajo el coste del hosting.',
        },
        {
          icon: 'file-code',
          title: 'Infraestructura como código',
          description:
            'La configuración, los entornos y el despliegue quedan bajo control de versiones.',
        },
      ],
      pipeline: {
        caption: 'Del push a producción',
        command: 'git push origin feat/pricing-page',
        steps: [
          { label: 'Calidad', detail: 'tipos, lint, pruebas y axe' },
          { label: 'Compilación', detail: 'cada idioma prerenderizado' },
          { label: 'Vista previa', detail: 'una URL por cada pull request' },
          { label: 'Producción', detail: 'en vivo al fusionar en main' },
        ],
      },
      badges: ['GitHub Actions', 'Vercel', 'Node.js 24+', 'pnpm 12'],
    },
    {
      id: 'quality',
      type: 'marketing-quality-gates',
      eyebrow: 'Controles de calidad',
      title: 'Comprobado en cada paso.',
      description:
        'Las mismas comprobaciones automáticas se ejecutan en tu equipo y en la CI, tanto si el código lo escribió una persona como un agente.',
      stages: [
        {
          label: 'Etapa 1',
          title: 'Antes del commit',
          icon: 'shield-check',
          items: [
            { name: 'Lefthook', description: 'Hooks de Git rápidos que solo comprueban' },
            { name: 'ESLint', description: 'Cero avisos permitidos' },
            { name: 'Prettier', description: 'Formato coherente' },
            { name: 'Commitlint', description: 'Conventional Commits' },
          ],
        },
        {
          label: 'Etapa 2',
          title: 'Pipeline de CI',
          icon: 'flask-conical',
          items: [
            { name: 'TypeScript', description: 'Comprobación estricta de tipos' },
            { name: 'Vitest', description: 'Pruebas unitarias y en navegador' },
            { name: 'Storybook', description: 'Cada historia probada con axe' },
            { name: 'Playwright', description: 'Pruebas de extremo a extremo' },
          ],
        },
        {
          label: 'Etapa 3',
          title: 'Publicación',
          icon: 'package-check',
          items: [
            { name: 'Ramas protegidas', description: 'La CI debe pasar' },
            { name: 'Dependabot', description: 'Actualizaciones semanales' },
            { name: 'Registro de cambios', description: 'Notas de cada versión' },
            { name: 'Flujo de publicación', description: 'Solo builds que pasan' },
          ],
        },
      ],
      highlights: [
        'Cada commit se comprueba',
        'Las mismas comprobaciones en local y en la CI',
        'Versiones solo desde builds que pasan',
      ],
    },
    {
      id: 'talk',
      type: 'cta-editorial',
      eyebrow: '¿Listo para empezar algo nuevo?',
      title: 'Hablemos de tu proyecto.',
      primaryAction: { label: 'Empezar una conversación', href: '/contact' },
    },
    {
      id: 'developer-experience',
      type: 'marketing-developer-experience',
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
      id: 'numbers',
      type: 'stats',
      eyebrow: 'En cifras',
      title: 'Una base que va a tu ritmo.',
      description:
        'Cada versión pasa por el mismo conjunto de pruebas, en todos los idiomas y en ambos temas, antes de llegar a tu proyecto.',
      stats: [
        { value: '4', label: 'Idiomas incluidos' },
        { value: '40+', label: 'Componentes probados' },
        { value: '400+', label: 'Pruebas automatizadas' },
      ],
    },
    {
      id: 'pricing',
      type: 'pricing',
      eyebrow: 'Precios',
      title: 'Precios sencillos para cada etapa.',
      description: 'Empieza con la base de LaunchKit y elige cuánta ayuda directa necesitas.',
      // The plans, shared with /pricing, and a link to everything else there.
      currencies: pricingCurrencies,
      plans: pricingPlans,
      callout: {
        title: 'Compara los planes en detalle',
        description:
          'Todo lo que incluye cada plan, los precios en tu moneda y respuestas a las dudas más comunes.',
        action: { label: 'Ver precios', href: '/pricing' },
      },
    },
    {
      // Demo reviews from the fixture: invented people. Replace them with real,
      // attributable reviews before launch.
      id: 'reviews',
      type: 'reviews',
      eyebrow: 'Opiniones',
      title: 'Lo que dicen los equipos sobre LaunchKit',
      reviews: [
        {
          name: 'Amara Osei',
          role: 'Fundadora, estudio de diseño',
          quote:
            'Lanzamos nuestro nuevo sitio en una semana. Las secciones, las traducciones y las pruebas ya estaban ahí, así que dedicamos el tiempo a contar nuestra historia.',
        },
        {
          name: 'Jonas Weber',
          role: 'Desarrollador principal, agencia de software',
          quote:
            'El modelo de contenido es lo que no sabía que necesitaba. Con secciones tipadas, la compilación falla antes de que una página rota llegue a producción.',
        },
        {
          name: 'Lucía Romero',
          role: 'Diseñadora freelance',
          quote:
            'Cambiar la marca me llevó un solo archivo. Los dos temas se adaptaron, y las comprobaciones de contraste me dijeron dónde fallaba mi paleta.',
        },
        {
          name: 'Théo Martin',
          role: 'CTO, comercio en línea',
          quote:
            'Cuatro idiomas desde el primer día. Nuestros clientes franceses y alemanes por fin tienen el mismo sitio que todos los demás.',
        },
        {
          name: 'Priya Nair',
          role: 'Responsable de producto, startup SaaS',
          quote:
            'Storybook facilitó las revisiones: cada sección por separado, en cada ancho y en ambos temas, antes de publicar nada.',
        },
        {
          name: 'Sam Okafor',
          role: 'Responsable, agencia web',
          quote:
            'Ahora empezamos cada proyecto de cliente con LaunchKit, y las mejoras que hacemos para un cliente llegan también a los demás.',
        },
      ],
    },
    {
      id: 'faq',
      type: 'faq',
      eyebrow: 'Dudas',
      title: 'Preguntas frecuentes',
      description: 'Todo lo demás que quizá quieras saber antes de empezar.',
      groups: [
        {
          title: 'General',
          items: [
            {
              question: '¿Qué es LaunchKit?',
              answer:
                'Una base reutilizable de Next.js para crear y lanzar sitios web: páginas basadas en contenido, secciones listas para usar, dos temas, cuatro idiomas y un conjunto completo de pruebas.',
            },
            {
              question: '¿Para quién es?',
              answer:
                'Para fundadores, startups y agencias que empiezan sitios nuevos a menudo y quieren que cada uno parta de la misma base bien probada.',
            },
            {
              question: '¿Puedo cambiar la marca?',
              answer:
                'Sí. Los colores y la tipografía están en un solo archivo de tema, y todos los componentes lo siguen en claro y en oscuro.',
            },
            {
              question: '¿Es gratis?',
              answer:
                'Sí. LaunchKit se publica bajo la licencia MIT, tanto para proyectos personales como comerciales.',
            },
          ],
        },
        {
          title: 'Soporte',
          items: [
            {
              question: '¿Cómo añado una página?',
              answer:
                'Añade un archivo de contenido por idioma y regístralo. La página se genera a partir de secciones tipadas, así que cualquier error se detecta antes de publicarse.',
            },
            {
              question: '¿Cómo llegan las actualizaciones a mi proyecto?',
              answer:
                'Los proyectos creados a partir de LaunchKit incorporan los cambios de upstream con Git, como describe la guía de sincronización.',
            },
            {
              question: '¿Qué idiomas incluye?',
              answer:
                'Inglés, español, francés y alemán. Añadir otro solo requiere un catálogo de mensajes y un conjunto de archivos de contenido.',
            },
            {
              question: '¿Puedo encargar mi sitio?',
              answer: 'Sí. Escríbenos desde la página de contacto y hablamos de lo que necesitas.',
            },
          ],
        },
      ],
    },
    {
      // The previous homepage's closing band, with the header's contact label.
      id: 'begin',
      type: 'cta-band',
      title: 'Empieza con una base mejor.',
      description:
        'Crea tu próximo sitio web a partir de LaunchKit, hazlo inconfundiblemente tuyo y deja que la ingeniería siga mejorando por debajo.',
      primaryAction: { label: 'Empezar', href: '/docs/getting-started' },
      secondaryAction: { label: 'Ponte en contacto', href: '/contact' },
    },
  ],
} satisfies PageDefinition;
