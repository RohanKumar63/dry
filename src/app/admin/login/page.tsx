// src/app/admin/login/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/admin/LoginForm';

export const metadata = {
  title: 'Admin Login | TheNutriDry',
  description: 'Login to TheNutriDry admin dashboard',
};

export default async function AdminLoginPage() {
  // Use cookies() with await
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get('admin_session') !== undefined;
  
  // If already logged in, redirect to dashboard
  if (isLoggedIn) {
    redirect('/admin/dashboard');
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-800 font-playfair">
            TheNutriDry
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Administrator Portal
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}