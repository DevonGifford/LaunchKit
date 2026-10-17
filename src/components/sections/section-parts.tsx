import { ArrowUpRightIcon } from 'lucide-react';
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

/** A content-defined text link with an arrow: locale-aware for internal paths. */
export function ActionLink({ action }: { action: Action }) {
  const className =
    'inline-flex min-h-10 items-center gap-1.5 rounded-md font-medium underline decoration-accent underline-offset-4 outline-none hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring/50';
  const content = (
    <>
      {action.label}
      <ArrowUpRightIcon aria-hidden="true" className="size-4" />
    </>
  );

  return action.href.startsWith('/') ? (
    <Link href={action.href} className={className}>
      {content}
    </Link>
  ) : (
    <a href={action.href} className={className}>
      {content}
    </a>
  );
}

/**
 * Small uppercase labels separated by dots, such as tags or places. Each label
 * carries the dot before it; the list is pulled left inside a clipping box, so
 * the dot that would start each line is hidden.
 */
export function DotList({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <ul className="-ms-5 flex flex-wrap gap-y-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">
        {items.map((item) => (
          <li key={item} className="relative ps-5">
            <span aria-hidden="true" className="absolute start-2">
              ·
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
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
