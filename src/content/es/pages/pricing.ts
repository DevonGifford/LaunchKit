import type { PageDefinition, SectionOf } from '@/lib/content/types';
import { planAmounts, pricingCurrencies } from '@/content/en/pages/pricing';

// Prices and currencies are shared by every language: see src/content/en/pages/pricing.ts.
export { pricingCurrencies };

/** The plans, shared with the homepage's pricing section. */
export const pricingPlans = [
  {
    name: 'Hazlo tú',
    description: 'Para fundadores, desarrolladores y equipos que usan LaunchKit directamente.',
    price: { amounts: planAmounts.buildItYourself },
    priceNote: 'código abierto',
    features: [
      'Base web reutilizable',
      'Temas y cuatro idiomas',
      'Contenido por secciones',
      'Formularios, pruebas y CI',
    ],
    action: { label: 'Empezar', href: '/docs/getting-started' },
  },
  {
    name: 'Hecho para ti',
    description: 'Diseñamos y construimos tu sitio web con LaunchKit.',
    price: { amounts: planAmounts.builtForYou },
    priceNote: 'precio inicial',
    features: [
      'Diseño para tu marca',
      'Desarrollo adaptable y lanzamiento',
      'Estructura de contenido y orientación',
      'Una base probada debajo',
    ],
    action: { label: 'Reservar una llamada', href: '/contact' },
    recommended: true,
  },
  {
    name: 'Hecho para crecer',
    description: 'Para equipos que necesitan funciones a medida y soporte continuo.',
    price: { label: 'A medida' },
    priceNote: 'continuo',
    features: [
      'Funciones e integraciones a medida',
      'Mejoras continuas',
      'Mantenimiento y soporte',
      'Un socio técnico a largo plazo',
    ],
    action: { label: 'Hablemos', href: '/contact' },
  },
] satisfies SectionOf<'pricing'>['plans'];

/** Placeholder client wordmarks in public/marketing/clients/, from the marquee story's fixtures. */
const client = (name: string, file: string, width: number) => ({
  name,
  src: `/marketing/clients/${file}.svg`,
  width,
  height: 40,
});

/** The Pricing page in Spanish, translated from src/content/en/pages/pricing.ts. */
export const pricing = {
  meta: {
    title: 'Precios',
    description:
      'Empieza gratis con la base de LaunchKit o deja que diseñemos, construyamos y hagamos crecer tu sitio web contigo.',
  },
  sections: [
    {
      // The pricing fixture in full. Its own compact heading opens the page, so
      // the plans start close to the top.
      id: 'plans',
      type: 'pricing',
      eyebrow: 'Precios',
      title: 'Precios sencillos para cada etapa.',
      description:
        'Empieza gratis con la base o deja que diseñemos, construyamos y hagamos crecer tu sitio web contigo.',
      currencies: pricingCurrencies,
      currencyNote: 'Elige tu moneda. Los precios se fijan para cada región.',
      plans: pricingPlans,
      callout: {
        title: '¿Necesitas algo más?',
        description:
          'Para proyectos más grandes, trabajos de software más amplios o soporte técnico dedicado, escríbenos.',
        action: { label: 'Contáctanos', href: '/contact' },
      },
      // Facts about LaunchKit itself, not customer metrics: it has none to show yet.
      proof: {
        title: 'LaunchKit de un vistazo',
        items: [
          { value: 'MIT', label: 'Licencia de código abierto' },
          { value: '4', label: 'Idiomas integrados' },
          { value: '0', label: 'Cuentas necesarias para empezar' },
          { value: '5', label: 'Comprobaciones de CI obligatorias en cada pull request' },
        ],
      },
    },
    {
      // Placeholders: invented companies from the marquee fixture. Replace them
      // with real clients, or remove the section, before launch.
      id: 'clients',
      type: 'marquee',
      title: 'Equipos que confían en nosotros',
      items: [
        client('Brightfold', 'brightfold', 168),
        client('Quillmark', 'quillmark', 172),
        client('Fernvale', 'fernvale', 156),
        client('Kitewell', 'kitewell', 150),
        client('Lumora', 'lumora', 132),
        client('Northpine', 'northpine', 170),
      ],
    },
    {
      id: 'faq',
      type: 'faq',
      eyebrow: 'Dudas',
      title: 'Preguntas sobre precios',
      description: 'Cómo elegir un plan y qué pasa cuando tu sitio ya está publicado.',
      groups: [
        {
          title: 'Elegir un plan',
          items: [
            {
              question: '¿Qué plan me conviene?',
              answer:
                'Hazlo tú, si el sitio lo vas a desarrollar tú o tu equipo; Hecho para ti, si quieres que lo diseñemos y construyamos nosotros; y Hecho para crecer, si necesitas funciones a medida y soporte continuo.',
            },
            {
              question: '¿Qué significa «precio inicial»?',
              answer:
                'Es el punto de partida de un sitio típico de Hecho para ti. El precio final depende de las páginas y funciones que necesites, y lo sabrás antes de empezar ningún trabajo.',
            },
            {
              question: '¿Por qué Hecho para crecer tiene precio a medida?',
              answer:
                'Las funciones a medida y el soporte continuo varían de un equipo a otro, así que el precio se ajusta a lo que necesitas. Escríbenos y lo hablamos.',
            },
            {
              question: '¿Por qué puedo elegir la moneda?',
              answer:
                'Los precios se fijan a mano para cada región en lugar de convertirse al momento, así que siguen siendo redondos y no cambian con el tipo de cambio.',
            },
          ],
        },
        {
          title: 'Después del lanzamiento',
          items: [
            {
              question: '¿Puedo empezar por mi cuenta y pedir ayuda después?',
              answer:
                'Sí. Todos los planes usan la misma base, así que un sitio que empezaste por tu cuenta puede pasar a Hecho para ti o Hecho para crecer sin volver a empezar.',
            },
            {
              question: '¿Dónde se alojará mi sitio?',
              answer:
                'Donde mejor te venga. Un sitio de LaunchKit es una aplicación Next.js estándar, así que funciona en Vercel o en cualquier hosting compatible con Next.js.',
            },
            {
              question: '¿Mi sitio seguirá mejorando?',
              answer:
                'Las mejoras de LaunchKit llegan a tu sitio cuando decides fusionarlas, con Git. Hecho para crecer añade mejoras continuas hechas específicamente para tu sitio.',
            },
          ],
        },
      ],
    },
    {
      // A quiet close for anyone who read this far: the plans' buttons are well above.
      id: 'talk',
      type: 'cta-panel',
      title: '¿Aún lo estás pensando?',
      description:
        'Cuéntanos tu proyecto y te ayudaremos a elegir el plan adecuado, o empieza hoy por tu cuenta.',
      primaryAction: { label: 'Ponte en contacto', href: '/contact' },
      secondaryAction: { label: 'Empezar gratis', href: '/docs/getting-started' },
    },
  ],
} satisfies PageDefinition;
