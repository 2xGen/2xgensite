'use client';

import { Suspense } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardShell from '@/components/DashboardShell';
import DashboardBilling from '@/components/DashboardBilling';

export default function DashboardBillingPage() {
  return (
    <ProtectedRoute loginPath="/login">
      <DashboardShell>
        <Suspense fallback={<p className="text-sm text-gray-500">Loading…</p>}>
          <DashboardBilling />
        </Suspense>
      </DashboardShell>
    </ProtectedRoute>
  );
}
