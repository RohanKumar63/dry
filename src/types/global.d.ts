// src/types/global.d.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // For Prisma
  var prisma: PrismaClient | undefined;
  
  // For dashboard stats
  interface DashboardStats {
    productCount: number;
    featuredCount: number;
    bestsellerCount: number;
    lastUpdated: string;
  }
  
  // Product cache interface
  interface ProductCache {
    bestsellers: { data: any; timestamp: number };
    featured: { data: any; timestamp: number };
    categories: Record<string, { data: any; timestamp: number }>;
  }
  
  // Add to the global namespace
  var dashboardStats: DashboardStats | undefined;
  var productCache: ProductCache | undefined;
}

// This export is needed to make this a module
export {};