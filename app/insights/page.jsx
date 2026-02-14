import Insights from '@/views/Insights';

const title = 'Insights & Guides - 2xGen';
const description = 'Guides and insights on SaaS, local SEO, travel tech, and digital product development from 2xGen and our ventures.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/insights' },
  openGraph: {
    title,
    description,
    url: '/insights',
    siteName: '2xGen',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function InsightsPage() {
  return <Insights />;
}
