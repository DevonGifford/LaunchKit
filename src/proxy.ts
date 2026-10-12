import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Redirects locale-less paths (e.g. `/` → `/en`), honouring the visitor's
// Accept-Language header and any previously chosen locale.
export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next.js internals and files with an extension.
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
