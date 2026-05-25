'use client';

import { useTranslations } from 'next-intl';
import { HeroSection } from '@/components/sections/hero-section';
import { ActionButton } from '@/components/sections/section-parts';
import { Button } from '@/components/ui/button';
import { ErrorIllustration } from './page-state-illustrations';
import { PageState } from './page-state';

/**
 * Shown when a page fails to render: an apology, a button that tries the page
 * again, the way back home and, for server errors, a reference that matches the
 * server's logs. Its messages (`Error`) are passed to the client in the layout.
 */
export function ErrorState({ digest, onRetry }: { digest?: string; onRetry: () => void }) {
  const t = useTranslations('Error');

  return (
    <PageState>
      <HeroSection
        id="error"
        type="hero"
        eyebrow={t('label')}
        title={t('title')}
        description={t('description')}
        actions={
          <>
            <Button type="button" size="lg" onClick={onRetry}>
              {t('retry')}
            </Button>
            <ActionButton action={{ label: t('backHome'), href: '/' }} variant="outline" />
            {digest && (
              <p className="basis-full pt-2 font-mono text-xs text-muted-foreground">
                {t('reference', { digest })}
              </p>
            )}
          </>
        }
        media={<ErrorIllustration />}
      />
    </PageState>
  );
}
