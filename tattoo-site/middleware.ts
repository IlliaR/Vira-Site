import createMiddleware from 'next-intl/middleware';
import { routing } from './src/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|admin|_next/static|_next/image|uploads|images|fonts|accents|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
