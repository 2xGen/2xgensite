import PageShell from '@/components/PageShell';
import GetTourSitePage from '@/components/GetTourSitePage';

export const metadata = {
  title: 'Get a Site for Your Tours | 2xGen',
  description:
    'Request a dedicated SEO site for your Viator or GetYourGuide tours — $249/year, fully managed, live within 3 business days.',
  alternates: { canonical: '/get-a-site' },
  openGraph: {
    title: 'Get a Site for Your Tours | 2xGen',
    description:
      'Dedicated SEO site around your tours. Travelers find you on Google, then book on Viator or GetYourGuide.',
    url: '/get-a-site',
  },
};

export default function GetASiteRoute() {
  return (
    <PageShell className="!min-h-0 !pt-16 !pb-0">
      <GetTourSitePage />
    </PageShell>
  );
}
