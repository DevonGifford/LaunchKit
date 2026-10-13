import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useCssVariables } from './tokens';

const families = [
  {
    name: 'Serif',
    variable: '--typeface-serif',
    className: 'font-serif',
    use: 'Headings (h1 to h3 by default) and display text.',
    sample: 'Build once. Reuse often. Improve centrally.',
  },
  {
    name: 'Sans',
    variable: '--typeface-sans',
    className: 'font-sans',
    use: 'Body text, controls and navigation.',
    sample: 'Every shared component, rendered with the real design tokens.',
  },
  {
    name: 'Mono',
    variable: '--typeface-mono',
    className: 'font-mono',
    use: 'Code and file paths.',
    sample: 'src/app/theme.css',
  },
] as const;

const scale = [
  { className: 'text-display', variable: '--text-display', use: 'Page heroes', serif: true },
  { className: 'text-headline', variable: '--text-headline', use: 'Section headings', serif: true },
  {
    className: 'text-lede',
    variable: '--text-lede',
    use: 'Introductions under a heading',
    serif: false,
  },
  { className: 'text-base', variable: '--text-base', use: 'Body text', serif: false },
  {
    className: 'text-sm',
    variable: '--text-sm',
    use: 'Controls, captions and secondary text',
    serif: false,
  },
  { className: 'text-xs', variable: '--text-xs', use: 'Fine print', serif: false },
] as const;

const variables = [...families.map((f) => f.variable), ...scale.map((s) => s.variable)];

/** Renders its children and reports the font size they compute to at this width. */
function Measured({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [size, setSize] = useState('');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => setSize(getComputedStyle(element).fontSize);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-1">
      <p ref={ref} className={className}>
        {children}
      </p>
      <p className="font-mono text-xs text-muted-foreground">{size} at this width</p>
    </div>
  );
}

function Typography() {
  const values = useCssVariables(variables);

  return (
    <div className="max-w-5xl space-y-14">
      <header className="max-w-2xl space-y-3">
        <h1 className="text-headline">Typography</h1>
        <p className="text-muted-foreground">
          Two families carry the brand: a serif for headings and a sans for everything else. They
          are system stacks for now, set in{' '}
          <code className="font-mono text-sm">src/app/theme.css</code>, until the final typefaces
          are chosen.
        </p>
      </header>

      <section aria-labelledby="families" className="space-y-6">
        <h2 id="families" className="text-2xl">
          Families
        </h2>
        <ul className="divide-y border-y">
          {families.map((family) => (
            <li key={family.name} className="grid gap-4 py-6 md:grid-cols-[12rem_1fr]">
              <div className="space-y-1">
                <p className="font-medium">{family.name}</p>
                <p className="text-sm text-muted-foreground">{family.use}</p>
                <code className="block font-mono text-xs text-muted-foreground">
                  {family.className}
                </code>
              </div>
              <div className="min-w-0 space-y-2">
                <p className={`${family.className} text-3xl break-words`}>{family.sample}</p>
                <p className="font-mono text-xs break-words text-muted-foreground">
                  {values[family.variable]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="scale" className="space-y-6">
        <h2 id="scale" className="text-2xl">
          Scale
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Display, headline and lede grow with the screen. Use the viewport toolbar to see them
          change.
        </p>
        <ul className="divide-y border-y">
          {scale.map((step) => (
            <li key={step.className} className="grid gap-4 py-6 md:grid-cols-[12rem_1fr]">
              <div className="space-y-1">
                <code className="font-mono text-sm">{step.className}</code>
                <p className="text-sm text-muted-foreground">{step.use}</p>
                <p className="font-mono text-xs break-words text-muted-foreground">
                  {values[step.variable]}
                </p>
              </div>
              <Measured className={`${step.className} ${step.serif ? 'font-serif' : ''}`}>
                The foundation for your next idea.
              </Measured>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const meta = {
  title: 'Foundations/Typography',
  tags: ['!autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypographyStory: Story = { name: 'Typography', render: () => <Typography /> };
