import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import type { SectionOf } from '@/lib/content/types';
import { cn } from '@/lib/utils';
import { ActionLink } from '@/components/sections/section-parts';

type Project = SectionOf<'marketing-downstream-examples'>['projects'][number];

/**
 * A group of downstream sites, each a screenshot linking to the live site. From
 * 1024px the first is featured, with the other two stacked beside it; tablets
 * show it full width above the other two; phones get a compact list of
 * thumbnails. Each site is one link at every width: only its layout changes.
 */
export function MarketingDownstreamExamples({
  id,
  title,
  description,
  action,
  projects,
}: SectionOf<'marketing-downstream-examples'>) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      {/* Modest padding, so groups that follow one another read as one page. */}
      <Container className="py-8 lg:py-12">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-2">
          <h2 id={`${id}-title`} className="text-3xl">
            {title}
          </h2>
          {description && (
            <p className="col-span-full max-w-2xl text-muted-foreground">{description}</p>
          )}
          {action && (
            <div className="col-start-2 row-start-1">
              <ActionLink action={action} />
            </div>
          )}
        </div>
        <ul className="mt-6 grid gap-5 md:grid-cols-2 md:gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          {projects.map((project, index) => (
            <li
              key={project.href}
              className={cn(index === 0 && 'md:col-span-2 lg:col-span-1 lg:row-span-2')}
            >
              <ProjectCard project={project} featured={index === 0} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/**
 * A row of thumbnail, copy and arrow on phones; from 768px a card with the
 * screenshot above the copy. From 1024px the featured screenshot keeps 16:10 and
 * sets the group's height, and the other two share it, each screenshot filling
 * what its copy leaves. A long description grows the featured screenshot rather
 * than shrinking theirs below 7rem.
 */
function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <a
      href={project.href}
      className="group grid h-full grid-cols-[7rem_minmax(0,1fr)_auto] items-center gap-x-4 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50 max-md:focus-visible:ring-offset-4 max-md:focus-visible:ring-offset-background md:grid-cols-1 md:grid-rows-[auto_1fr] md:items-stretch md:overflow-hidden md:rounded-lg md:border md:bg-card md:transition-colors md:hover:border-accent lg:grid-rows-[minmax(0,1fr)_auto]"
    >
      <span
        className={cn(
          'relative block aspect-[3/2] overflow-hidden rounded-sm border md:rounded-none md:border-0 md:border-b',
          featured
            ? 'md:aspect-[2/1] lg:aspect-[16/10] lg:h-full'
            : 'md:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-28',
        )}
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes={
            featured
              ? '(min-width: 64rem) 42rem, (min-width: 48rem) 100vw, 7rem'
              : '(min-width: 64rem) 25rem, (min-width: 48rem) 50vw, 7rem'
          }
          className="object-cover object-top"
        />
      </span>
      {/* Its children are cells of the row on phones, and a line under the screenshot from 768px. */}
      <span className="contents md:flex md:items-start md:justify-between md:gap-4 md:px-5 md:py-4">
        <span className="min-w-0">
          <span className="block font-medium decoration-accent underline-offset-4 group-hover:underline">
            {project.name}
          </span>
          <span className="mt-1 block text-sm text-pretty text-muted-foreground">
            {project.description}
          </span>
        </span>
        <ArrowUpRightIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground md:mt-1"
        />
      </span>
    </a>
  );
}
