'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminCRM from '@/components/AdminCRM';

export default function AdminCrmPage() {
  return (
    <ProtectedRoute requireAdmin loginPath="/admin/login">
      <AdminCRM />
    </ProtectedRoute>
  );
}
