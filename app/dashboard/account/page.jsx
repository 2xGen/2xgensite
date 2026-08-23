'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardShell from '@/components/DashboardShell';
import DashboardAccount from '@/components/DashboardAccount';

export default function DashboardAccountPage() {
  return (
    <ProtectedRoute loginPath="/login">
      <DashboardShell>
        <DashboardAccount />
      </DashboardShell>
    </ProtectedRoute>
  );
}
