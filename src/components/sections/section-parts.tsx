import type { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import type { Action } from '@/lib/content/types';
import { cn } from '@/lib/utils';

/** Small uppercase label above a heading, led by a champagne hairline. */
export function Eyebrow({
  children,
  align = 'start',
  className,
}: {
  children: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-8 before:shrink-0 before:bg-accent',
        // Centred, the hairline is mirrored so the label stays optically centred.
        align === 'center' && 'justify-center after:h-px after:w-8 after:shrink-0 after:bg-accent',
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
  align = 'start',
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'start' | 'center';
  className?: string;
}) {
  const centered = align === 'center';

  return (
    <div className={cn('max-w-2xl space-y-5', centered && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow align={align}>{eyebrow}</Eyebrow>}
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

/** A person's photo, or their initials when there is none. Decorative: name them nearby. */
export function PersonAvatar({
  name,
  image,
  size,
  className,
}: {
  name: string;
  image?: string;
  size?: React.ComponentProps<typeof Avatar>['size'];
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('');

  return (
    <Avatar aria-hidden="true" size={size} className={className}>
      {image && <AvatarImage src={image} alt="" />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
