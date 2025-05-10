import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Check if user is logged in by verifying cookies
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');
    
    // Simple response for now (can be expanded later with actual user data)
    const isAuthenticated = sessionCookie?.value === 'true';
    
    return NextResponse.json({
      isAuthenticated,
      admin: isAuthenticated ? { role: 'admin' } : null,
      message: isAuthenticated ? 'Authenticated' : 'Not authenticated'
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Error checking authentication status' },
      { status: 500 }
    );
  }
} 