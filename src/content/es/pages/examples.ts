import type { PageDefinition } from '@/lib/content/types';

/**
 * A placeholder until the English Examples page (src/content/en/pages/examples.ts)
 * is translated, in the coming-soon state's words (`ComingSoon` in messages).
 */
export const examples = {
  meta: {
    title: 'Ejemplos',
    description:
      'Todavía la estamos preparando. Vuelve pronto o escríbenos si quieres saber cuándo estará lista.',
  },
  sections: [
    {
      id: 'coming-soon',
      type: 'hero',
      eyebrow: 'Próximamente',
      title: 'Esta página está en camino',
      description:
        'Todavía la estamos preparando. Vuelve pronto o escríbenos si quieres saber cuándo estará lista.',
      primaryAction: { label: 'Volver a la página de inicio', href: '/' },
      secondaryAction: { label: 'Escríbenos', href: '/contact' },
    },
  ],
} satisfies PageDefinition;
