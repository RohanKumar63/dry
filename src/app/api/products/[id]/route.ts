import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Await the params object before accessing its properties
    const { id } = await params;
    
    const product = await prisma.product.findUnique({
      where: { id },
      include: { variants: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Await the params object
    const { id } = await params;
    
    const productData = await request.json();
    const { variants, ...productDetails } = productData;

    // Update product with variants in a transaction with increased timeout
    const product = await prisma.$transaction(
      async (tx) => {
        // Update the product
        const updatedProduct = await tx.product.update({
          where: { id },
          data: productDetails,
        });

        // Handle variants if provided
        if (variants && variants.length > 0) {
          // Delete existing variants
          await tx.sizeVariant.deleteMany({
            where: { productId: id },
          });

          // Create new variants
          await tx.sizeVariant.createMany({
            data: variants.map((variant: { size: string; price: number; stock: number }) => ({
              ...variant,
              productId: id,
            })),
          });
        }

        // Return the complete product with variants
        return tx.product.findUnique({
          where: { id },
          include: { variants: true },
        });
      },
      {
        timeout: 60000, // Increased timeout to 60 seconds (1 minute)
      }
    );

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    // Await the params object
    const { id } = await params;
    
    const updates = await request.json();

    const product = await prisma.product.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Await the params object
    const { id } = await params;
    
    // Delete the product (variants will be deleted automatically due to cascade)
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}