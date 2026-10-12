import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <Container className="flex min-h-[60dvh] flex-col items-start justify-center gap-6 py-24">
      <p className="font-mono text-sm tracking-widest text-muted-foreground">404</p>
      <h1 className="text-headline">{t('title')}</h1>
      <p className="max-w-prose text-lede text-muted-foreground">{t('description')}</p>
      <Button asChild size="lg">
        <Link href="/">{t('backHome')}</Link>
      </Button>
    </Container>
  );
}
