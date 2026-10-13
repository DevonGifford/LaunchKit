import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { useCssVariables } from './tokens';

const radii = [
  { className: 'rounded-sm', variable: '--radius-sm', use: 'Available; no component uses it yet' },
  {
    className: 'rounded-md',
    variable: '--radius-md',
    use: 'Menu items, nav links and focusable rows',
  },
  {
    className: 'rounded-lg',
    variable: '--radius-lg',
    use: 'Buttons, inputs and selects (the base radius)',
  },
  { className: 'rounded-xl', variable: '--radius-xl', use: 'Cards, dialogs and large blocks' },
  {
    className: 'rounded-2xl',
    variable: '--radius-2xl',
    use: 'Available; no component uses it yet',
  },
] as const;

const variables = ['--radius', ...radii.map((r) => r.variable)];

/** Reports computed style values of the referenced element, updated on resize. */
function useComputed<T extends HTMLElement>(read: (style: CSSStyleDeclaration) => string) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => setValue(read(getComputedStyle(element)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [read]);

  return [ref, value] as const;
}

const readFrame = (style: CSSStyleDeclaration) =>
  `${style.paddingLeft} gutters, ${style.maxWidth === 'none' ? 'no' : style.maxWidth} maximum width`;
const readHeight = (style: CSSStyleDeclaration) => style.height;

function RadiusAndSpacing() {
  const values = useCssVariables(variables);
  const [frameRef, frame] = useComputed<HTMLDivElement>(readFrame);
  const [buttonRef, buttonHeight] = useComputed<HTMLButtonElement>(readHeight);
  const [inputRef, inputHeight] = useComputed<HTMLInputElement>(readHeight);

  return (
    <div className="max-w-5xl space-y-14">
      <header className="max-w-2xl space-y-3">
        <h1 className="text-headline">Radius and spacing</h1>
        <p className="text-muted-foreground">
          One base radius, <code className="font-mono text-sm">--radius</code> ({values['--radius']}
          ), sets every corner. Change it in{' '}
          <code className="font-mono text-sm">src/app/theme.css</code> and the whole scale follows.
        </p>
      </header>

      <section aria-labelledby="radius" className="space-y-6">
        <h2 id="radius" className="text-2xl">
          Radius
        </h2>
        <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {radii.map((radius) => (
            <li key={radius.className} className="space-y-3">
              <div
                aria-hidden="true"
                className={`h-24 border-2 border-foreground/70 bg-muted ${radius.className}`}
              />
              <div className="space-y-1">
                <code className="font-mono text-sm">{radius.className}</code>
                <p className="text-sm text-muted-foreground">{radius.use}</p>
                <p className="font-mono text-xs text-muted-foreground">{values[radius.variable]}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="container" className="space-y-6">
        <h2 id="container" className="text-2xl">
          Page frame
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          The header, every section and the footer sit in{' '}
          <code className="font-mono text-sm">Container</code>. Its gutters widen at the{' '}
          <code className="font-mono text-sm">sm</code> and{' '}
          <code className="font-mono text-sm">lg</code> breakpoints. Use the viewport toolbar to see
          them change.
        </p>
        <div className="rounded-lg bg-muted py-6">
          <Container ref={frameRef}>
            <div className="rounded-md border border-dashed border-foreground/40 bg-background p-6 text-sm">
              Content area
            </div>
          </Container>
        </div>
        <p className="font-mono text-xs text-muted-foreground">{frame} at this width</p>
      </section>

      <section aria-labelledby="controls" className="space-y-6">
        <h2 id="controls" className="text-2xl">
          Control size
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Buttons and inputs are 40px tall, well above the 24px minimum target size in WCAG 2.2.
        </p>
        <div className="flex flex-wrap items-end gap-6">
          <div className="space-y-2">
            <Button ref={buttonRef}>Button</Button>
            <p className="font-mono text-xs text-muted-foreground">{buttonHeight} tall</p>
          </div>
          <div className="w-64 space-y-2">
            <Input ref={inputRef} aria-label="Example input" placeholder="Input" />
            <p className="font-mono text-xs text-muted-foreground">{inputHeight} tall</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Foundations/Radius and spacing',
  tags: ['!autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadiusAndSpacingStory: Story = {
  name: 'Radius and spacing',
  render: () => <RadiusAndSpacing />,
};
