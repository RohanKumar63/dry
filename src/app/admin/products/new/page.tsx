'use client';

import ProductForm from '@/components/admin/ProductForm';
import AdminHeader from '@/components/admin/AdminHeader';

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <ProductForm />
        </div>
      </main>
    </div>
  );
}