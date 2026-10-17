import { ContactForm } from '@/components/forms/contact-form';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';

/** Contact details beside the reference form. */
export function ContactSection({ id, title, description, details }: SectionOf<'contact'>) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t">
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="space-y-6 lg:col-span-4">
          <h2 id={`${id}-title`} className="text-3xl">
            {title}
          </h2>
          {description && <p className="leading-relaxed text-muted-foreground">{description}</p>}
          {details && (
            <dl className="space-y-5 border-t pt-6">
              {details.map((detail) => (
                <div key={detail.label} className="space-y-1">
                  <dt className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {detail.label}
                  </dt>
                  <dd className="font-serif text-lg">{detail.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
