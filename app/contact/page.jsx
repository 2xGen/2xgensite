import Contact from '@/views/Contact';

const title = 'Contact - 2xGen | Get in Touch for Your Digital Project';
const description = 'Contact 2xGen for your next digital project. We build AI-powered SaaS platforms, web applications, and digital solutions. Get in touch today.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title,
    description,
    url: '/contact',
    siteName: '2xGen',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function ContactPage() {
  return <Contact />;
}
