import ArubaGuidesIndex from '@/components/ArubaGuidesIndex';

export const metadata = {
  title: 'Aruba Growth Guides | 2xGen Aruba',
  description:
    'Practical playbooks for getting found, generating leads and growing in Aruba — local SEO, Google Ads, direct bookings, lead generation and website costs.',
  alternates: {
    canonical: '/aruba/guides',
    languages: {
      en: '/aruba/guides',
      nl: '/nl/aruba/guides',
    },
  },
};

export default function Page() {
  return <ArubaGuidesIndex />;
}
