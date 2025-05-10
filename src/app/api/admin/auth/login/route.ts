// Create a separate, simplified login endpoint
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt'; // Changed from bcryptjs to bcrypt
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
    
    // Use bcrypt to compare passwords
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
    
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
