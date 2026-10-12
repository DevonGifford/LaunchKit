import type { ComponentType } from 'react';
import { sectionComponents } from './registry';
import type { Section } from './types';

/** Renders a page's sections in the order its content definition lists them. */
export function PageSections({ sections }: { sections: readonly Section[] }) {
  return sections.map((section) => {
    // Safe: the registry's mapped type pairs each `type` with its own props.
    const Component = sectionComponents[section.type] as ComponentType<Section>;
    return <Component key={section.id} {...section} />;
  });
}
