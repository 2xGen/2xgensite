'use client';

import GoogleAuthButton from '@/components/GoogleAuthButton';

export default function LoginForm({ nextPath = '/dashboard', showAlt = true }) {
  return (
    <GoogleAuthButton
      nextPath={nextPath}
      label="Continue with Google"
      altHref="/signup"
      altLabel="Create a free account"
      showAlt={showAlt}
    />
  );
}
