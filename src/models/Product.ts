interface Product {
    _id?: string;
    name: string;
    price: number;
    description: string;
    features?: string[];
    specs?: Record<string, string>;
    images: string[];
    category: string;
    rating?: number;
    reviews?: number;
    stock: number;
    isTopRated: boolean;  // Flag for Top Rated products
    isNewArrival: boolean; // Flag for New Arrivals
    createdAt: Date;
    updatedAt: Date;
  }
  