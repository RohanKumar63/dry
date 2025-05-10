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

    // Build base where clause
    const baseWhere: Prisma.ProductWhereInput = {
      ...(category ? { category } : {}),
      ...(bestseller ? { bestseller: true } : {}),
      ...(featured ? { featured: true } : {}),
    };

    // Add search condition if query exists
    const whereClause: Prisma.ProductWhereInput = searchQuery
      ? {
          ...baseWhere,
          OR: [
            { name: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
            { category: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
            { description: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : baseWhere;

    // Extend timeout to 20 seconds
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Query timeout')), 20000);
    });

    // First get just the products without variants
    const productsPromise = prisma.product.findMany({
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
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Race between product query and timeout
    const productsWithoutVariants = await Promise.race([productsPromise, timeoutPromise]);
    
    // Only continue if we have products
    if (productsWithoutVariants.length === 0) {
      return NextResponse.json({
        products: [],
        pagination: {
          total: 0,
          pages: 0,
          page,
          limit,
        },
      });
    }

    // Get variants in separate query
    const productIds = productsWithoutVariants.map(p => p.id);
    const variantsPromise = prisma.sizeVariant.findMany({
      where: {
        productId: { in: productIds }
      },
      select: {
        id: true,
        size: true,
        price: true,
        stock: true,
        productId: true,
      }
    });

    // Get total count in a separate query
    const countPromise = prisma.product.count({ where: whereClause });
    
    // Execute both remaining queries in parallel with timeout
    const [variants, total] = await Promise.race([
      Promise.all([variantsPromise, countPromise]),
      timeoutPromise
    ]);

    // Combine products with their variants
    const products = productsWithoutVariants.map(product => ({
      ...product,
      variants: variants.filter(v => v.productId === product.id)
    }));

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
    
    // Handle timeout specifically
    if (error instanceof Error && error.message === 'Query timeout') {
      return NextResponse.json(
        { error: 'Request timed out. The database is currently experiencing high load. Please try again.' },
        { status: 504 }
      );
    }

    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch products' },
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
