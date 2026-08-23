'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminMicrosites from '@/components/AdminMicrosites';

export default function AdminMicrositesPage() {
  return (
    <ProtectedRoute requireAdmin loginPath="/admin/login">
      <AdminMicrosites />
    </ProtectedRoute>
  );
}
