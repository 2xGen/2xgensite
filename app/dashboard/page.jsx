'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardShell from '@/components/DashboardShell';
import DashboardOverview from '@/components/DashboardOverview';

export default function DashboardPage() {
  return (
    <ProtectedRoute loginPath="/login">
      <DashboardShell>
        <DashboardOverview />
      </DashboardShell>
    </ProtectedRoute>
  );
}
