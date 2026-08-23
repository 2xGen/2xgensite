'use client';

import GoogleAuthButton from '@/components/GoogleAuthButton';

export default function SignupForm() {
  return (
    <GoogleAuthButton
      nextPath="/dashboard"
      label="Continue with Google"
      altHref="/login"
      altLabel="Sign in"
      showServiceNotice
      requireTermsAcceptance
    />
  );
}
