'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function GoogleAuthButton({
  nextPath = '/dashboard',
  label = 'Continue with Google',
  altHref = '/login',
  altLabel = 'Sign in',
  showAlt = true,
  showServiceNotice = false,
  requireTermsAcceptance = false,
}) {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleClick = async () => {
    if (requireTermsAcceptance && !acceptedTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy to continue.');
      return;
    }
    setError('');
    setSubmitting(true);
    const { error: err } = await signInWithGoogle(nextPath);
    if (err) {
      setError(err.message);
      setSubmitting(false);
    }
    // On success the browser redirects to Google
  };

  return (
    <div className="space-y-4">
      {requireTermsAcceptance && (
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => {
              setAcceptedTerms(e.target.checked);
              if (e.target.checked) setError('');
            }}
            className="mt-0.5 h-4 w-4 rounded border-[#09294c]/30 text-[#1a5f9e] focus:ring-[#3d8fd1]"
          />
          <span className="text-sm text-gray-600 leading-relaxed">
            I agree to the{' '}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a5f9e] hover:underline"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a5f9e] hover:underline"
            >
              Privacy Policy
            </a>
            .
          </span>
        </label>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={submitting || (requireTermsAcceptance && !acceptedTerms)}
        className="w-full inline-flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl border border-[#09294c]/12 bg-white text-[#09294c] font-semibold hover:bg-[#f3f7fb] transition-colors disabled:opacity-50"
      >
        <GoogleIcon className="w-5 h-5 shrink-0" />
        {submitting ? 'Redirecting…' : label}
      </button>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      {showServiceNotice && (
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          By creating an account and completing the onboarding form, you agree that 2xGen may contact you
          regarding your account, onboarding, subscription, payment status, and the service, including if
          you start but do not complete a subscription or payment. These communications may be sent by
          email.
        </p>
      )}
      {!requireTermsAcceptance && (
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Google is the only sign-in method. By continuing you agree to our{' '}
          <a href="/terms" className="text-[#1a5f9e] underline underline-offset-2">
            terms
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-[#1a5f9e] underline underline-offset-2">
            privacy policy
          </a>
          .
        </p>
      )}
      {requireTermsAcceptance && (
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Google is the only sign-in method.
        </p>
      )}
      {showAlt && (
        <p className="text-sm text-gray-500 text-center">
          {altHref.includes('signup') ? 'New here?' : 'Already have an account?'}{' '}
          <Link href={altHref} className="text-[#1a5f9e] font-semibold hover:underline">
            {altLabel}
          </Link>
        </p>
      )}
    </div>
  );
}
