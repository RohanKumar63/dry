'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminHeader() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch('/api/admin/auth', {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Logged out successfully');
        router.push('/admin/login');
      } else {
        toast.error('Failed to logout');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </header>
  );
}