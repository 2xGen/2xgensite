'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminTrackingLinks from '@/components/AdminTrackingLinks';

export default function AdminLinksPage() {
  return (
    <ProtectedRoute requireAdmin loginPath="/admin/login">
      <AdminTrackingLinks />
    </ProtectedRoute>
  );
}
