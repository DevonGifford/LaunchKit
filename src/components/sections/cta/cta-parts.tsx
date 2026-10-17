import type { Action } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { ActionButton } from '@/components/sections/section-parts';

/** The primary and secondary buttons, styled for the high-emphasis surface. */
export function CtaActions({
  primaryAction,
  secondaryAction,
  className,
}: {
  primaryAction?: Action;
  secondaryAction?: Action;
  className?: string;
}) {
  if (!primaryAction && !secondaryAction) return null;

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {primaryAction && <ActionButton action={primaryAction} variant="inverse" />}
      {secondaryAction && <ActionButton action={secondaryAction} variant="inverse-outline" />}
    </div>
  );
}
