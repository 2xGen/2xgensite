'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardShell from '@/components/DashboardShell';
import DashboardLinks from '@/components/DashboardLinks';

export default function DashboardLinksPage() {
  return (
    <ProtectedRoute loginPath="/login">
      <DashboardShell>
        <DashboardLinks />
      </DashboardShell>
    </ProtectedRoute>
  );
}
