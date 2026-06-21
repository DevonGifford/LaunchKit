import { getLlmsTxt } from '@/lib/llms-txt';

// Built once, at build time, like the sitemap.
export const dynamic = 'force-static';

/** Serves /llms.txt: the same Markdown the LLM notice displays. */
export async function GET() {
  return new Response(await getLlmsTxt(), {
    // Plain text, so browsers show the Markdown rather than download it.
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
