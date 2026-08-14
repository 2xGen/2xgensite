export const metadata = {
  title: {
    default: '2xGen | Systemen die klanten vinden',
    template: '%s | 2xGen',
  },
  description:
    '2xGen bouwt acquisitiesystemen die zoekvraag omzetten in gekwalificeerde leads — tools, SEO, lead capture en automatisering.',
  alternates: {
    canonical: '/nl',
    languages: { en: '/', nl: '/nl' },
  },
  openGraph: {
    locale: 'nl_NL',
    url: '/nl',
    title: '2xGen | Systemen die klanten vinden',
    description:
      'Zet zoekvraag om in gekwalificeerde leads — en leads in klanten.',
  },
};

export default function NlLayout({ children }) {
  return children;
}
