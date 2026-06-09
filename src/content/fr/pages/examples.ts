import type { PageDefinition } from '@/lib/content/types';

/**
 * A placeholder until the English Examples page (src/content/en/pages/examples.ts)
 * is translated, in the coming-soon state's words (`ComingSoon` in messages).
 */
export const examples = {
  meta: {
    title: 'Exemples',
    description:
      'Nous la préparons encore. Revenez bientôt, ou contactez-nous pour être prévenu de sa mise en ligne.',
  },
  sections: [
    {
      id: 'coming-soon',
      type: 'hero',
      eyebrow: 'Bientôt disponible',
      title: 'Cette page arrive bientôt',
      description:
        'Nous la préparons encore. Revenez bientôt, ou contactez-nous pour être prévenu de sa mise en ligne.',
      primaryAction: { label: 'Retour à l’accueil', href: '/' },
      secondaryAction: { label: 'Nous contacter', href: '/contact' },
    },
  ],
} satisfies PageDefinition;
