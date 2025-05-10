// src/app/admin/dashboard/page.tsx
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import AdminHeader from '@/components/admin/AdminHeader';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard | TheNutriDry',
  description: 'TheNutriDry admin dashboard',
};

export default async function AdminDashboardPage() {
  // Check authentication - now with await
  await requireAdmin();
  
  // Get product counts with error handling
  const [productCount, featuredCount, bestsellerCount] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { featured: true } }),
    prisma.product.count({ where: { bestseller: true } })
  ]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Products</h2>
            <p className="text-3xl font-bold mt-2">{productCount}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Featured Products</h2>
            <p className="text-3xl font-bold mt-2">{featuredCount}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Bestsellers</h2>
            <p className="text-3xl font-bold mt-2">{bestsellerCount}</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/products/new"
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg text-center transition-colors"
            >
              Add New Product
            </Link>
            <Link
              href="/admin/products"
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-colors"
            >
              Manage Products
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
