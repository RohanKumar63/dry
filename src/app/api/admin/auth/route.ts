// src/app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Add timeout handling
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Login request timeout')), 30000);
    });

    // Parse request body with timeout
    const bodyPromise = req.json();
    const body = await Promise.race([bodyPromise, timeoutPromise]);
    
    const { email, password } = body;
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // First check if the credentials match the env variables
    const isEnvAdmin = email === process.env.ADMIN_EMAIL && 
                       password === process.env.ADMIN_PASSWORD;
    
    if (isEnvAdmin) {
      // Set a cookie for authentication
      const cookieStore = await cookies();
      cookieStore.set({
        name: 'admin_session',
        value: 'true',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
        sameSite: 'strict'
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Login successful' 
      });
    }
    
    // If not matching env variables, check the database
    const admin = await prisma.admin.findUnique({
      where: { email }
    });
    
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Use bcrypt to compare passwords instead of direct comparison
    const passwordMatch = await bcrypt.compare(password, admin.password);
    
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Set a cookie for authentication
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'admin_session',
      value: 'true',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      sameSite: 'strict'
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Login successful' 
    });
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message === 'Login request timeout') {
        return NextResponse.json(
          { success: false, message: 'Login request timed out' },
          { status: 504 }
        );
      }
      
      return NextResponse.json(
        { success: false, message: `An error occurred: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred during login' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Check if admin is logged in
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get('admin_session') !== undefined;
  
  return NextResponse.json({ 
    isLoggedIn,
    message: isLoggedIn ? 'Admin session active' : 'Not authenticated'
  });
}

export async function DELETE() {
  // Logout - remove the cookie
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'admin_session',
    value: '',
    expires: new Date(0),
    path: '/'
  });
  
  return NextResponse.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
}
