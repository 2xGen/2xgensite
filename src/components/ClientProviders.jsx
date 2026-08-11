'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import StickyAcquisitieButton from '@/components/StickyAcquisitieButton';

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      {children}
      <StickyAcquisitieButton />
      <Toaster />
    </AuthProvider>
  );
}
