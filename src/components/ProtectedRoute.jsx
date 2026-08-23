'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

/** Requires authenticated Supabase user. Optional role gate. */
export default function ProtectedRoute({ children, requireAdmin = false, loginPath = '/login' }) {
  const { user, profile, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(loginPath);
      return;
    }
    if (requireAdmin && profile && !isAdmin) {
      router.replace('/dashboard');
    }
  }, [user, profile, loading, isAdmin, requireAdmin, loginPath, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09294c]" />
      </div>
    );
  }

  if (!user) return null;
  if (requireAdmin && profile && !isAdmin) return null;
  if (requireAdmin && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09294c]" />
      </div>
    );
  }

  return children;
}
