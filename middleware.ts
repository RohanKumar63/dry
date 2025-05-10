// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the path starts with /admin and is not the login page
  if (
    request.nextUrl.pathname.startsWith('/admin') && 
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    // Check if admin_session cookie exists
    const adminSessionCookie = request.cookies.get('admin_session');

    // If no session cookie, redirect to login
    if (!adminSessionCookie || adminSessionCookie.value !== 'true') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Specify paths for the middleware to run on
export const config = {
  matcher: ['/admin/:path*'],
};