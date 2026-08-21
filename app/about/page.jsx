import PageShell from '@/components/PageShell';
import AboutPage from '@/components/AboutPage';

export const metadata = {
  title: 'About 2xGen | Managed Google Acquisition for Tour Operators',
  description:
    '2xGen LLC builds and operates tourism acquisition sites that feed Viator and GetYourGuide bookings. Founded by Matthijs van Reek.',
  alternates: { canonical: '/about', languages: { en: '/about' } },
  openGraph: {
    title: 'About 2xGen',
    description: 'We sell the system we already operate — Google acquisition for tour operators.',
    url: '/about',
    images: [{ url: '/office.png' }],
  },
};

export default function EnAboutPage() {
  return (
    <PageShell className="!pt-0 !pb-0 pattern-dots">
      <AboutPage />
    </PageShell>
  );
}
