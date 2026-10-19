import type { ComponentProps, ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import { Article } from './article';

/**
 * An article on a page of its own, in a centred reading column: the legal
 * pages, and a blog post later. `after` follows the article outside it, so it
 * stays in the page's language even when the text isn't.
 */
export function ArticleLayout({
  after,
  ...article
}: Omit<ComponentProps<typeof Article>, 'className'> & { after?: ReactNode }) {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <Article {...article} className="mx-auto max-w-3xl" />
      {after && <div className="mx-auto max-w-3xl">{after}</div>}
    </Container>
  );
}
