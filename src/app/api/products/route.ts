// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// In the GET function, add search query parameter handling
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const bestseller = searchParams.get('bestseller') === 'true';
    const featured = searchParams.get('featured') === 'true';
    const searchQuery = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build where clause with proper Prisma types
    const whereClause: Prisma.ProductWhereInput = {
      ...(category ? { category } : {}),
      ...(bestseller ? { bestseller: true } : {}),
      ...(featured ? { featured: true } : {}),
      ...(searchQuery ? {
        OR: [
          { name: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
          { category: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
        ],
      } : {}),
    };

    // Optimize the query by selecting only needed fields
    const products = await prisma.product.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        salePrice: true,
        image: true,
        category: true,
        bestseller: true,
        featured: true,
        rating: true,
        reviews: true,
        variants: {
          select: {
            id: true,
            size: true,
            price: true,
            stock: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Only fetch total count if needed (for pagination)
    const total = page === 1 && limit >= 20 ? products.length : await prisma.product.count({ where: whereClause });

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
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const productData = await request.json();
    console.log('Received product data:', productData);
    
    // Extract variants data if any
    const { variants, ...productDetails } = productData;
    console.log('Variants:', variants);
    console.log('Product details:', productDetails);
    
    // Create product first, then add variants
    try {
      // Create the product
      const newProduct = await prisma.product.create({
        data: productDetails,
      });
      
      // Create variants if provided
      if (variants && variants.length > 0) {
        await prisma.sizeVariant.createMany({
          data: variants.map((variant: { size: string; price: number; stock: number }) => ({
            size: variant.size || '',
            price: Number(variant.price) || 0,
            stock: Number(variant.stock) || 0,
            productId: newProduct.id,
          })),
        });
      }
      
      // Return the complete product with variants
      const productWithVariants = await prisma.product.findUnique({
        where: { id: newProduct.id },
        include: { variants: true },
      });
      
      return NextResponse.json(productWithVariants);
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      throw dbError;
    }
  } catch (error) {
    console.error('Error creating product:', error);
    // Safely access error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: `Failed to create product: ${errorMessage}` },
      { status: 500 }
    );
  }
}
