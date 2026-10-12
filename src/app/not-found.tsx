import { routing } from '@/i18n/routing';
import './globals.css';

// Requests outside any locale (rare: the proxy redirects most of them). There
// is no locale to translate into, so this page links to the default locale.
export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body className="grid min-h-dvh place-items-center p-6 text-center">
        <main className="space-y-4">
          <h1 className="text-headline">Page not found</h1>
          <a href={`/${routing.defaultLocale}`} className="underline underline-offset-4">
            LaunchKit
          </a>
        </main>
      </body>
    </html>
  );
}
