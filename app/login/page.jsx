import PageShell from '@/components/PageShell';
import LoginForm from '@/components/LoginForm';

export const metadata = {
  title: 'Sign in',
  description: 'Sign in to your 2xGen operator dashboard.',
  alternates: { canonical: '/login' },
  robots: 'noindex, follow',
};

export default function LoginPage() {
  return (
    <PageShell className="!min-h-0 pattern-diagonal">
      <div className="max-w-md mx-auto px-4">
        <div className="accent-bar mb-4" />
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Sign in</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Continue with Google to open your dashboard — site status, billing, and click stats.
        </p>
        <div className="rounded-3xl border border-[#09294c]/12 bg-white/90 p-6 shadow-[0_20px_50px_rgba(9,41,76,0.1)]">
          <LoginForm />
        </div>
      </div>
    </PageShell>
  );
}
