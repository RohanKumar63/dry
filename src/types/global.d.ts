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
  
  // Add to the global namespace
  var dashboardStats: DashboardStats | undefined;
}

// This export is needed to make this a module
export {};