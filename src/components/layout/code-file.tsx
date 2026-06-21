/**
 * A file's complete contents under its name, styled like the code blocks in
 * the docs. Long lines wrap, so the whole file stays readable on a phone.
 */
export function CodeFile({ name, code }: { name: string; code: string }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-lg bg-emphasis text-emphasis-foreground">
      <figcaption className="flex items-center gap-3 border-b border-emphasis-foreground/15 px-5 py-3 font-mono text-xs text-emphasis-foreground/80">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
        {name}
      </figcaption>
      <pre className="p-5 font-mono text-[0.8125rem] leading-6 [overflow-wrap:anywhere] whitespace-pre-wrap sm:text-sm">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
