export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  bestseller?: boolean;
  new?: boolean;
  description?: string;
} 