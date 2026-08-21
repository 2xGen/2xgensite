import ArubaBusinessSurvey from '@/components/ArubaBusinessSurvey';

export const metadata = {
  title: 'Aruba Business Research | 2xGen Aruba',
  description:
    '60-second survey for Aruba businesses. Help us understand how tourists find, contact and book you — so we build what the market actually needs.',
  alternates: {
    canonical: '/aruba/survey',
    languages: { en: '/aruba/survey', nl: '/nl/aruba/survey' },
  },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ArubaBusinessSurvey />;
}
