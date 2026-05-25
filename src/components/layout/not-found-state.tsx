import { useTranslations } from 'next-intl';
import { HeroSection } from '@/components/sections/hero/hero-section';
import { NotFoundIllustration } from './page-state-illustrations';
import { PageState } from './page-state';

/** The 404 page: what happened, and the way back to the homepage. */
export function NotFoundState() {
  const t = useTranslations('NotFound');

  return (
    <PageState>
      <HeroSection
        id="not-found"
        type="hero"
        eyebrow={t('label')}
        title={t('title')}
        description={t('description')}
        primaryAction={{ label: t('backHome'), href: '/' }}
        media={<NotFoundIllustration />}
        // Its heading is two lines on phones, so a smaller disc ends with it.
        mediaSize="clamp(11.5rem, 49vw, 12rem)"
      />
    </PageState>
  );
}
