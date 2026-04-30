import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { SectionHeading } from './section-parts';

/** Developer experience: the stack, and the commands that get a project running. */
export function MarketingDeveloperExperience({
  id,
  eyebrow,
  title,
  description,
  steps,
  stack,
}: SectionOf<'marketing-developer-experience'>) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t bg-muted/50">
      <Container className="grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
        <div className="space-y-8">
          <SectionHeading id={id} eyebrow={eyebrow} title={title} description={description} />
          {stack && (
            <ul className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border bg-background px-3 py-1 font-mono text-xs text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="min-w-0 rounded-xl bg-emphasis text-emphasis-foreground shadow-[0_24px_60px_-30px_var(--overlay)]">
          <pre className="p-6 font-mono text-[0.8125rem] leading-6 [overflow-wrap:anywhere] whitespace-pre-wrap sm:p-8">
            <code>
              {steps.map((step, index) => (
                <span key={step.command} className="block">
                  {index > 0 && '\n'}
                  <span className="text-emphasis-foreground/70"># {step.comment}</span>
                  {'\n'}
                  <span aria-hidden="true" className="text-accent select-none">
                    ${' '}
                  </span>
                  {step.command}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </Container>
    </section>
  );
}
