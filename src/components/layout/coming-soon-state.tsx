import { useTranslations } from 'next-intl';
import { HeroSection } from '@/components/sections/hero-section';
import { ComingSoonIllustration } from './page-state-illustrations';
import { PageState } from './page-state';

/**
 * A placeholder for a page that isn't ready: a general message by default, or
 * the page's own `title` and `description`, with the way home and to Contact.
 */
export function ComingSoonState({ title, description }: { title?: string; description?: string }) {
  const t = useTranslations('ComingSoon');

  return (
    <PageState>
      <HeroSection
        id="coming-soon"
        type="hero"
        eyebrow={t('label')}
        title={title ?? t('title')}
        description={description ?? t('description')}
        primaryAction={{ label: t('backHome'), href: '/' }}
        secondaryAction={{ label: t('contact'), href: '/contact' }}
        media={<ComingSoonIllustration />}
      />
    </PageState>
  );
}
