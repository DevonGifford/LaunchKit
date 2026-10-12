import type { PageDefinition } from '@/lib/content/types';

export const contact = {
  meta: {
    title: 'Contact',
    description:
      'Une question sur LaunchKit, ou un projet que vous aimeriez construire avec ? Envoyez-nous un message.',
  },
  sections: [
    {
      id: 'intro',
      type: 'hero',
      eyebrow: 'Contact',
      title: 'Parlons de votre prochain lancement.',
      description:
        'Vous démarrez un nouveau site à partir de LaunchKit, ou vous voulez améliorer la base elle-même ? Écrivez-nous.',
    },
    {
      id: 'message',
      type: 'contact',
      title: 'Envoyer un message',
      description:
        'Ce formulaire est le modèle de référence de LaunchKit : validé pendant la saisie, puis de nouveau sur le serveur avant d’être accepté.',
      details: [
        { label: 'Validation', value: 'Dans le navigateur et sur le serveur' },
        { label: 'Acheminement', value: 'Configuré par chaque projet' },
      ],
    },
  ],
} satisfies PageDefinition;
