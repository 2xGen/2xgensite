import PageShell from '@/components/PageShell';
import SignupForm from '@/components/SignupForm';

export const metadata = {
  title: 'Create free account',
  description:
    'Create a free 2xGen operator account to join the waitlist. Subscribe at $249/year to enter the build queue.',
  alternates: { canonical: '/signup' },
  robots: 'noindex, follow',
};

export default function SignupPage() {
  return (
    <PageShell className="!min-h-0 pattern-diagonal">
      <div className="max-w-md mx-auto px-4">
        <div className="accent-bar mb-4" />
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Create a free account</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Sign in with Google to join the waitlist and track your site status. Subscribe at $249/year
          when you&apos;re ready to enter the build queue.
        </p>
        <div className="rounded-3xl border border-[#09294c]/12 bg-white/90 p-6 shadow-[0_20px_50px_rgba(9,41,76,0.1)]">
          <SignupForm />
        </div>
      </div>
    </PageShell>
  );
}
