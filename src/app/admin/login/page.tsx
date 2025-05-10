// src/app/admin/login/page.tsx
import LoginForm from '@/components/admin/LoginForm';

export const metadata = {
  title: 'Admin Login | TheNutriDry',
  description: 'Login to TheNutriDry admin dashboard',
};

// Remove server-side authentication check to prevent timeouts
export default function AdminLoginPage() {
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
