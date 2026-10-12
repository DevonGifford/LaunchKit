import type { PageDefinition } from '@/lib/content/types';

export const contact = {
  meta: {
    title: 'Contacto',
    description:
      '¿Tienes preguntas sobre LaunchKit o un proyecto que te gustaría construir con él? Envíanos un mensaje.',
  },
  sections: [
    {
      id: 'intro',
      type: 'hero',
      eyebrow: 'Contacto',
      title: 'Hablemos de tu próximo lanzamiento.',
      description:
        '¿Vas a crear un sitio nuevo a partir de LaunchKit o a mejorar la propia base? Nos encantará saber de ti.',
    },
    {
      id: 'message',
      type: 'contact',
      title: 'Envía un mensaje',
      description:
        'Este formulario es el patrón de referencia de LaunchKit: se valida mientras escribes y otra vez en el servidor antes de aceptarse.',
      details: [
        { label: 'Validación', value: 'En el navegador y en el servidor' },
        { label: 'Entrega', value: 'La configura cada proyecto' },
      ],
    },
  ],
} satisfies PageDefinition;
