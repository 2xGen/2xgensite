import ArubaGuidesIndex from '@/components/ArubaGuidesIndex';

export const metadata = {
  title: 'Aruba Growth Guides | 2xGen Aruba',
  description:
    'Praktische playbooks om gevonden te worden, leads te genereren en te groeien op Aruba — local SEO, Google Ads, directe boekingen, leadgeneratie en websitekosten.',
  alternates: {
    canonical: '/nl/aruba/guides',
    languages: {
      en: '/aruba/guides',
      nl: '/nl/aruba/guides',
    },
  },
};

export default function Page() {
  return <ArubaGuidesIndex />;
}
