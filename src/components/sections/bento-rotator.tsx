'use client';

/*
 * Adapted from shadcn-ui-kit, components/sections/stacked-image-carousel.tsx
 * (https://github.com/bundui/shadcn-ui-kit). Copyright (c) 2024 Mohd. Nisab, MIT License.
 */
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { SectionOf } from '@/lib/content/types';

type Images = SectionOf<'bento'>['showcase']['images'];

const reducedMotion = '(prefers-reduced-motion: reduce)';
// How long each screenshot stays before the next slides in.
const interval = 3200;

/**
 * Screenshots stacked in one frame that take turns: the next slides in from the
 * right as the current one leaves to the left. With reduced motion only the
 * first is shown. One label describes the set, so the images themselves are
 * decorative.
 */
export function ImageRotator({ images, alt }: { images: Images; alt: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length < 2 || window.matchMedia(reducedMotion).matches) return;
    const timer = window.setInterval(
      () => setCurrent((index) => (index + 1) % images.length),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [images.length]);

  const previous = (current - 1 + images.length) % images.length;
  const image = {
    width: 1200,
    height: 750,
    sizes: '(min-width: 72rem) 34rem, (min-width: 48rem) 46vw, 90vw',
    className: 'size-full object-cover object-top',
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className="relative aspect-[16/10] overflow-hidden rounded-lg border bg-muted"
    >
      {images.map((item, index) => (
        <div
          key={item.light}
          data-state={index === current ? 'current' : index === previous ? 'previous' : 'next'}
          className="absolute inset-0 translate-x-6 scale-[0.98] opacity-0 transition-[opacity,translate,scale] duration-500 ease-out data-[state=current]:translate-x-0 data-[state=current]:scale-100 data-[state=current]:opacity-100 data-[state=previous]:-translate-x-6 motion-reduce:transition-none"
        >
          <Image {...image} alt="" src={item.light} className={`${image.className} dark:hidden`} />
          <Image
            {...image}
            alt=""
            src={item.dark}
            className={`hidden ${image.className} dark:block`}
          />
        </div>
      ))}
    </div>
  );
}
