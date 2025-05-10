'use client';

import Link from 'next/link';
import ProductForm from '@/components/admin/ProductForm';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <Link 
            href="/admin/products"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
          >
            Back to Products
          </Link>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <ProductForm isEditing={false} />
        </div>
      </main>
    </div>
  );
}