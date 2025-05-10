'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function LoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Login error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-bold text-emerald-800 font-playfair">
            TheNutriDry
          </h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Something went wrong
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We encountered an error while trying to log you in.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-500 mb-4">
            {error.message || "An unexpected error occurred"}
          </p>
          
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => reset()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Try again
            </button>
            
            <Link href="/" className="text-emerald-600 hover:text-emerald-800">
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}