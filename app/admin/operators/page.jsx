'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminOperators from '@/components/AdminOperators';

export default function AdminOperatorsPage() {
  return (
    <ProtectedRoute requireAdmin loginPath="/admin/login">
      <AdminOperators />
    </ProtectedRoute>
  );
}
