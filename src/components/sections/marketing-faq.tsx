/*
 * Adapted from shadcn-ui-kit, components/sections/FaqSection.tsx
 * (https://github.com/bundui/shadcn-ui-kit). Copyright (c) 2024 Mohd. Nisab, MIT License.
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { SectionHeading } from './section-parts';

/**
 * The heading in a narrow column, held in view on wider screens, beside the
 * questions: one accordion per group, the groups side by side from 1024px.
 */
export function MarketingFaq({
  id,
  eyebrow,
  title,
  description,
  groups,
}: SectionOf<'marketing-faq'>) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <Container className="grid gap-12 py-20 md:grid-cols-3 md:gap-10 lg:py-28">
        <div className="md:sticky md:top-24 md:self-start">
          <SectionHeading id={id} eyebrow={eyebrow} title={title} description={description} />
        </div>
        <div className="grid gap-12 md:col-span-2 lg:grid-cols-2 lg:gap-10">
          {groups.map((group, groupIndex) => (
            <div key={group.title}>
              <h3 className="border-b pb-4 text-2xl">{group.title}</h3>
              <Accordion type="single" collapsible>
                {group.items.map((item, index) => (
                  // Radix wraps each trigger in an h3, which would take the serif heading face.
                  <AccordionItem
                    key={item.question}
                    value={`${groupIndex}-${index}`}
                    className="border-b [&>[data-slot=accordion-content][data-state=closed]]:hidden [&>h3]:font-sans"
                  >
                    <AccordionTrigger className="py-4 text-base">{item.question}</AccordionTrigger>
                    {/*
                      Kept in the page while closed, so every answer is in the HTML. Radix
                      doesn't hide force-mounted content, so the item hides closed answers.
                    */}
                    <AccordionContent
                      forceMount
                      className="pb-5 text-base leading-relaxed text-muted-foreground"
                    >
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
