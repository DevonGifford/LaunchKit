import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/** Horizontal page frame shared by the header, sections and footer. */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10', className)} {...props} />
  );
}
