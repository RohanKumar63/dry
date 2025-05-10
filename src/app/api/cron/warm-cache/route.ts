// Create a cron job to warm up the cache
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const maxDuration = 300; // 5 minutes

export async function GET() {
  try {
    // Get product counts and cache them
    const [productCount, featuredCount, bestsellerCount] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { featured: true } }),
      prisma.product.count({ where: { bestseller: true } })
    ]);
    
    // Store in a global cache (this is just an example)
    global.dashboardStats = {
      productCount,
      featuredCount,
      bestsellerCount,
      lastUpdated: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      message: 'Cache warmed up successfully',
      stats: global.dashboardStats
    });
  } catch (error) {
    console.error('Cache warming error:', error);
    return NextResponse.json(
      { error: 'Failed to warm up cache' },
      { status: 500 }
    );
  }
}