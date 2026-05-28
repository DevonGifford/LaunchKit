/*
 * Adapted from shadcn-ui-kit, components/sections/bento.tsx and template-stack.tsx
 * (https://github.com/bundui/shadcn-ui-kit). Copyright (c) 2024 Mohd. Nisab, MIT License.
 */
import Image from 'next/image';
import type { ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import { Logo } from '@/components/ui/logo';
import type { Action, SectionOf } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { ImageRotator } from './bento-rotator';
import { TechIcon } from './tech-icons';
import { ActionLink, SectionHeading } from './section-parts';

type Section = SectionOf<'bento'>;

/**
 * Four tiles in one ruled frame, two by two from 768px: screenshots that take
 * turns, rows of names drifting past, tools wired to the LaunchKit mark, and
 * three screenshots fanned out like prints.
 */
export function BentoSection({
  id,
  eyebrow,
  title,
  description,
  showcase,
  marquee,
  integrations,
  gallery,
}: Section) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <Container className="py-20 lg:py-28">
        <SectionHeading
          id={id}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
        {/* Each tile rules its own right and bottom edges; the outermost tuck under the frame. */}
        <div className="mt-12 overflow-hidden rounded-xl border lg:mt-16">
          <div className="-me-px -mb-px grid grid-cols-1 md:grid-cols-2">
            <Tile>
              <TileCopy {...showcase} />
              <p className="font-serif text-4xl leading-none lg:text-5xl">{showcase.stat}</p>
              <ImageRotator images={showcase.images} alt={showcase.alt} />
            </Tile>
            <Tile className="px-0 lg:px-0">
              <div className="space-y-6 px-6 lg:px-8">
                <p className="font-serif text-4xl leading-none text-accent-text lg:text-5xl">
                  {marquee.stat}
                </p>
                <TileCopy {...marquee} />
              </div>
              <div className="mt-auto space-y-3">
                {marquee.rows.map((row, index) => (
                  <Marquee key={row.join()} items={row} reverse={index % 2 === 1} />
                ))}
              </div>
            </Tile>
            <Tile>
              <TileCopy {...integrations} className="md:text-center" />
              <Integrations tools={integrations.tools} />
            </Tile>
            <Tile>
              <TileCopy {...gallery} />
              <Prints images={gallery.images} />
            </Tile>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Tile({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('flex flex-col gap-8 border-e border-b px-6 py-8 lg:p-8', className)}>
      {children}
    </div>
  );
}

/** The tile's heading and copy, with its action as a link after the copy. */
function TileCopy({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: Action;
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-2xl">{title}</h3>
      <p className="leading-relaxed text-pretty text-muted-foreground">{description}</p>
      {action && <ActionLink action={action} />}
    </div>
  );
}

/**
 * A row of names drifting sideways for ever: two copies side by side, the
 * second hidden from assistive tech, moved left by one copy's width and then
 * reset. It pauses under the pointer and stands still with reduced motion.
 */
function Marquee({ items, reverse }: { items: string[]; reverse: boolean }) {
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-3 pe-3">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border bg-background px-4 py-2 text-sm whitespace-nowrap text-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden mask-x-from-85% mask-x-to-100%">
      <div
        className={cn(
          'flex w-max [--marquee-duration:50s] hover:[animation-play-state:paused] motion-safe:animate-marquee',
          reverse && '[animation-direction:reverse]',
        )}
      >
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}

/**
 * Three tools either side of the LaunchKit mark, each wired to it. The wires are
 * drawn for one half and mirrored for the other, from the cards' inner edges
 * (48px across, on rows 72px apart) to the centre, at any width.
 */
function Integrations({ tools }: { tools: Section['integrations']['tools'] }) {
  const wires = (side: string) => (
    <svg aria-hidden="true" className={cn('absolute inset-y-0 h-full w-1/2 text-border', side)}>
      {[24, 96, 168].map((y) => (
        <line key={y} x1="48" y1={y} x2="100%" y2="96" stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );

  return (
    <div className="relative mx-auto my-auto h-48 w-full max-w-sm">
      {/* A faint dot grid behind the centre, fading out at its edges. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/4 w-1/2 bg-[radial-gradient(var(--color-muted-foreground)_1px,transparent_1px)] mask-radial-from-20% mask-radial-to-70% bg-size-[16px_16px] opacity-40"
      />
      {wires('left-0')}
      {wires('right-0 -scale-x-100')}
      <ul className="relative grid h-full grid-flow-col grid-rows-3 content-between justify-between">
        {tools.map((tool) => (
          <li
            key={tool.name}
            className="flex size-12 items-center justify-center rounded-xl border bg-background"
          >
            <TechIcon name={tool.icon} className="size-6" />
            <span className="sr-only">{tool.name}</span>
          </li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-1/2 rounded-2xl border bg-muted p-1"
      >
        <div className="flex size-16 items-center justify-center rounded-xl border bg-background shadow-lg">
          <Logo variant="emblem" className="h-9 text-foreground" />
        </div>
      </div>
    </div>
  );
}

// Fanned out like prints on a table; each straightens a little under the pointer.
const tilts = ['-rotate-8 hover:-rotate-3', 'rotate-4 hover:rotate-0', 'rotate-10 hover:rotate-4'];

function Prints({ images }: { images: Section['gallery']['images'] }) {
  const image = {
    width: 1200,
    height: 750,
    sizes: '(min-width: 64rem) 12rem, 30vw',
    className: 'aspect-[4/3] w-full rounded-md border object-cover object-top shadow-md',
  };

  return (
    <ul className="my-auto grid grid-cols-3 gap-4 px-2 py-4 sm:gap-8">
      {images.map((print, index) => (
        <li
          key={print.light}
          className={cn(
            'transition-transform duration-500 motion-reduce:transition-none',
            tilts[index],
          )}
        >
          <Image
            {...image}
            src={print.light}
            alt={print.alt}
            className={`${image.className} dark:hidden`}
          />
          <Image
            {...image}
            src={print.dark}
            alt={print.alt}
            className={`hidden ${image.className} dark:block`}
          />
        </li>
      ))}
    </ul>
  );
}
