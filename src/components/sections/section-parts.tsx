import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import type { Action } from '@/lib/content/types';
import { cn } from '@/lib/utils';

/** Small uppercase label above a heading, led by a champagne hairline. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-8 before:shrink-0 before:bg-accent',
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Eyebrow, h2 and optional intro shared by most sections. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl space-y-5', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={`${id}-title`} className="text-headline">
        {title}
      </h2>
      {description && <p className="text-lede text-muted-foreground">{description}</p>}
    </div>
  );
}

/** A content-defined call to action: locale-aware for internal paths. */
export function ActionButton({
  action,
  variant,
  size = 'lg',
}: {
  action: Action;
  variant?: React.ComponentProps<typeof Button>['variant'];
  size?: React.ComponentProps<typeof Button>['size'];
}) {
  const internal = action.href.startsWith('/');

  return (
    <Button asChild variant={variant} size={size}>
      {internal ? (
        <Link href={action.href}>{action.label}</Link>
      ) : (
        <a href={action.href}>{action.label}</a>
      )}
    </Button>
  );
}
