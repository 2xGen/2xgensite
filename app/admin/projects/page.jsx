'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminProjects from '@/components/AdminProjects';

export default function AdminProjectsPage() {
  return (
    <ProtectedRoute>
      <AdminProjects />
    </ProtectedRoute>
  );
}
