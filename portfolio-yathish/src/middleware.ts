import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAdminSession } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const session = getAdminSession(request);

  // 1. Protect Admin API routes (/api/admin/*)
  if (pathname.startsWith('/api/admin')) {
    // Login and Logout endpoints remain publicly accessible
    if (pathname === '/api/admin/login' || pathname === '/api/admin/logout') {
      return NextResponse.next();
    }

    // All other /api/admin/* endpoints require server-side auth verification
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // 2. Protect Admin UI routes (/admin and /admin/*)
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
      // If user is already authenticated and visits /admin/login, redirect to /admin or intended destination
      if (session) {
        const redirectParam = request.nextUrl.searchParams.get('redirect');
        const targetUrl =
          redirectParam && redirectParam.startsWith('/admin') && redirectParam !== '/admin/login'
            ? redirectParam
            : '/admin';
        return NextResponse.redirect(new URL(targetUrl, request.url));
      }
      // Allow unauthenticated access to /admin/login
      return NextResponse.next();
    }

    // Unauthenticated user attempting to access protected admin route (/admin, /admin/projects, etc.)
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url);
      const fullPath = pathname + search;
      loginUrl.searchParams.set('redirect', fullPath);

      const response = NextResponse.redirect(loginUrl);
      // Enforce no-cache security headers to prevent back-button cache restoration after logout
      response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate, private');
      response.headers.set('Pragma', 'no-cache');
      return response;
    }

    // Authenticated user accessing protected admin route
    const response = NextResponse.next();
    // Enforce no-cache security headers for all admin responses
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate, private');
    response.headers.set('Pragma', 'no-cache');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
