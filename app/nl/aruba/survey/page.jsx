import ArubaBusinessSurvey from '@/components/ArubaBusinessSurvey';

export const metadata = {
  title: 'Aruba Business Research | 2xGen Aruba',
  description:
    '60-seconden survey voor Arubaanse bedrijven. Help ons begrijpen hoe toeristen je vinden, contacteren en boeken — zodat we bouwen wat de markt écht nodig heeft.',
  alternates: {
    canonical: '/nl/aruba/survey',
    languages: { en: '/aruba/survey', nl: '/nl/aruba/survey' },
  },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ArubaBusinessSurvey />;
}
