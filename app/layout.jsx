import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const BASE_URL = 'https://2xgen.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '2xGen | Managed Google Acquisition for Tour Operators',
    template: '%s | 2xGen',
  },
  description:
    'Get more bookings from Google without leaving Viator or GetYourGuide. We build and manage a highly targeted SEO site around your tour that sends travelers to your existing listing.',
  keywords:
    'tour operator SEO, Google acquisition, Viator booking, GetYourGuide, travel SEO, tour bookings, destination SEO',
  authors: [{ name: 'Matthijs van Reek', url: `${BASE_URL}/founder` }, { name: '2xGen LLC' }],
  robots: 'index, follow',
  alternates: {
    canonical: '/',
    languages: { en: '/' },
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: '2xGen | Managed Google Acquisition for Tour Operators',
    description:
      'We build and manage a Google-ranking site around your tour and send travelers to your existing Viator or GetYourGuide checkout.',
    siteName: '2xGen LLC',
    locale: 'en_US',
    images: [
      {
        url: 'https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/new%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL25ldyBsb2dvLnBuZyIsImlhdCI6MTc1NzI0MTcyOSwiZXhwIjo0MjgwMTIxNzI5fQ.fHOoeBZzP_4kqfj6k2kVVY999LyT_OXEyToDeWi3pEE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2xGen | Managed Google Acquisition for Tour Operators',
    description:
      'We build and manage a Google-ranking site around your tour and send travelers to your existing Viator or GetYourGuide checkout.',
  },
  icons: {
    icon: 'https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/images/favicon.png',
    apple: 'https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/images/favicon.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'JiADLh3Bmq5TaxgwrelX1YPhkW6JDut95j9LdMOJ8cc',
    other: {
      ...((process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION &&
        !process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION.startsWith('YOUR_'))
        ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {}),
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#09294c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="geo.region" content="US-NM" />
        <meta name="geo.placename" content="Albuquerque" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '2xGen LLC',
              alternateName: '2xGen',
              description:
                '2xGen builds SEO microsites for tour operators that rank for destination activities and send travelers into live Viator booking.',
              url: 'https://2xgen.com',
              logo: 'https://2xgen.com/favicon.svg',
              foundingDate: '2024',
              founder: { '@type': 'Person', name: 'Matthijs van Reek' },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Albuquerque',
                addressRegion: 'New Mexico',
                postalCode: '87110',
                addressCountry: 'USA',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@2xgen.com',
                contactType: 'business',
                availableLanguage: ['English'],
              },
              sameAs: ['https://www.linkedin.com/company/2xgen-com/'],
              knowsAbout: [
                'Tour operator SEO',
                'Viator microsites',
                'Travel SEO',
                'Destination microsites',
                'Tour booking websites',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '2xGen',
              url: 'https://2xgen.com',
              description:
                '2xGen builds SEO microsites for tour operators connected to Viator live booking.',
              inLanguage: 'en-US',
              publisher: { '@type': 'Organization', name: '2xGen LLC' },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Matthijs van Reek',
              jobTitle: 'Founder',
              description:
                'Founder of 2xGen — builds SEO microsites for tour operators on Viator.',
              worksFor: { '@type': 'Organization', name: '2xGen LLC', url: 'https://2xgen.com' },
              url: 'https://2xgen.com/founder',
              mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://2xgen.com/founder' },
              image: 'https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/founder%202xGen.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL2ZvdW5kZXIgMnhHZW4ucG5nIiwiaWF0IjoxNzU3MjM5NjYxLCJleHAiOjQyODAxMTk2NjF9.LeDtfzNJq5ny7A3MFdeeZb4wYii53V7tBut9vSoLrkc',
              sameAs: ['https://www.linkedin.com/company/2xgen-com/'],
              knowsAbout: [
                'Tour operator SEO',
                'Viator microsites',
                'Travel SEO',
                'Destination websites',
              ],
            }),
          }}
        />
      </head>
      <body className="overflow-x-hidden min-h-screen bg-[#f8fafc] text-gray-800">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
