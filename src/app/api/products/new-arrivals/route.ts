// src/app/api/products/new-arrivals/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Always filter for featured products (new arrivals)
    const whereClause = { featured: true };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: {
          variants: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }, // Show newest first
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch new arrivals' },
      { status: 500 }
    );
  }
}