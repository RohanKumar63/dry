// Add or update middleware.ts to handle authentication redirects
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the admin_session cookie
  const adminSession = request.cookies.get('admin_session')?.value;
  
  // Check if the user is trying to access admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // If not authenticated, redirect to login
    if (adminSession !== 'true') {
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }
  
  // If authenticated and trying to access login page, redirect to dashboard
  if (pathname === '/admin/login' && adminSession === 'true') {
    const url = new URL('/admin/dashboard', request.url);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};