// src/types/index.ts
export interface SizeVariant {
  size: string;
  price: number;
  stock?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number; // Default/base price
  sizeVariants?: SizeVariant[]; // Optional size variants with different prices
  image: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  bestseller?: boolean;
  featured?: boolean;
  new?: boolean;
  description?: string;
}
  