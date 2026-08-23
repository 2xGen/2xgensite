'use client';

import React from 'react';
import LoginForm from '@/components/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pattern-diagonal px-4 py-12">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-semibold tracking-tight mb-2 text-center">Admin sign in</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Continue with Google using an email listed in ADMIN_EMAILS.
        </p>
        <div className="rounded-3xl border border-[#09294c]/12 bg-white p-6 shadow-lg">
          <LoginForm nextPath="/admin/operators" showAlt={false} />
        </div>
      </div>
    </div>
  );
}
