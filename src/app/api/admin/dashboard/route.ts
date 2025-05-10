// Create a new API route for dashboard data
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');
    
    if (sessionCookie?.value !== 'true') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get product counts
    const [productCount, featuredCount, bestsellerCount] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { featured: true } }),
      prisma.product.count({ where: { bestseller: true } })
    ]);
    
    return NextResponse.json({
      productCount,
      featuredCount,
      bestsellerCount
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}