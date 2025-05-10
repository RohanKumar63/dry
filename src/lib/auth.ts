// src/lib/auth.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Check if user is authenticated as admin
export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_session') !== undefined;
}

// Redirect if not authenticated
export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }
}

// Logout function
export async function logoutAdmin() {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Logout request failed');
    }
    
    return response.json();
  } catch (error) {
    console.error('Logout error:', error);
    throw error; // Re-throw to allow handling by the caller
  }
}