import { NextRequest, NextResponse } from 'next/server';
import { getSlugFromHostname } from './domain-config';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';
  const { pathname } = req.nextUrl;

  // Skip Next.js internals
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // If we're on a custom client domain and at the root, rewrite to /[slug]
  if (pathname === '/') {
    const slug = getSlugFromHostname(hostname);
    if (slug) {
      return NextResponse.rewrite(new URL(`/${slug}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
