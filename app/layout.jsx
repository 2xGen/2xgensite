import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const BASE_URL = 'https://2xgen.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: '2xGen | Systemen die klanten vinden',
  description: '2xGen bouwt digitale acquisitiesystemen voor Nederlandse bedrijven — leadgeneratie, data, tools, automatisering en AI. Van doelgroep naar lead. Van lead naar klant.',
  keywords: 'leadgeneratie bedrijf, b2b leads genereren, leadgeneratie uitbesteden, online leads genereren, b2b lead generation, sales automation, leadgeneratie website, meer zakelijke klanten vinden, B2B leadgeneratie Nederland, marketing automation, 2xGen',
  authors: [{ name: 'Matthijs van Reek', url: `${BASE_URL}/about` }, { name: '2xGen LLC' }],
  robots: 'index, follow',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: '2xGen | Systemen die klanten vinden',
    description: 'We bouwen websites, tools en digitale systemen waarmee bedrijven structureel nieuwe klanten vinden.',
    siteName: '2xGen LLC',
    locale: 'nl_NL',
    images: [{ url: 'https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/new%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL25ldyBsb2dvLnBuZyIsImlhdCI6MTc1NzI0MTcyOSwiZXhwIjo0MjgwMTIxNzI5fQ.fHOoeBZzP_4kqfj6k2kVVY999LyT_OXEyToDeWi3pEE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2xGen | Systemen die klanten vinden',
    description: 'We bouwen websites, tools en digitale systemen waarmee bedrijven structureel nieuwe klanten vinden.',
  },
  icons: {
    icon: 'https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/images/favicon.png',
    apple: 'https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/images/favicon.png',
  },
  verification: {
    // Google Search Console — HTML-tag content value
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'JiADLh3Bmq5TaxgwrelX1YPhkW6JDut95j9LdMOJ8cc',
    // Bing Webmaster Tools — set NEXT_PUBLIC_BING_SITE_VERIFICATION in .env.local
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
    <html lang="nl" className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="geo.region" content="NL" />
        <meta name="geo.placename" content="Nederland" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '2xGen LLC',
              alternateName: '2xGen',
              description: '2xGen is een digitaal leadgeneratie- en technologiebedrijf gespecialiseerd in B2B leadgeneratie, online acquisitie, leadgeneratie tools, marketing automation en digitale groeisystemen voor Nederlandse bedrijven.',
              url: 'https://2xgen.com',
              logo: 'https://2xgen.com/favicon.svg',
              foundingDate: '2024',
              founder: { '@type': 'Person', name: 'Matthijs van Reek' },
              address: { '@type': 'PostalAddress', addressLocality: 'Albuquerque', addressRegion: 'New Mexico', addressCountry: 'USA' },
              contactPoint: { '@type': 'ContactPoint', email: 'matthijs@2xgen.com', contactType: 'business', areaServed: ['NL', 'Nederland'], availableLanguage: ['Dutch', 'English'] },
              sameAs: ['https://www.linkedin.com/company/2xgen-com/'],
              knowsAbout: ['B2B Leadgeneratie', 'Leadgeneratie websites', 'Sales automation', 'Marketing automation', 'Leadgeneratie tools', 'AI-automatisering', 'Online acquisitie'],
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
              description: 'Digitale leadgeneratie voor Nederlandse bedrijven. Van de eerste klik tot een gekwalificeerde lead.',
              inLanguage: 'nl-NL',
              publisher: { '@type': 'Organization', name: '2xGen LLC' },
              potentialAction: {
                '@type': 'SearchAction',
                target: { '@type': 'EntryPoint', urlTemplate: 'https://2xgen.com/insights?q={search_term_string}' },
                'query-input': 'required name=search_term_string',
              },
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
              jobTitle: 'Oprichter',
              description: 'Oprichter van 2xGen, een digitaal leadgeneratie- en technologiebedrijf dat systemen bouwt waarmee Nederlandse bedrijven nieuwe klanten vinden.',
              worksFor: { '@type': 'Organization', name: '2xGen LLC', url: 'https://2xgen.com' },
              url: 'https://2xgen.com/about',
              mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://2xgen.com/about' },
              image: 'https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/founder%202xGen.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL2ZvdW5kZXIgMnhHZW4ucG5nIiwiaWF0IjoxNzU3MjM5NjYxLCJleHAiOjQyODAxMTk2NjF9.LeDtfzNJq5ny7A3MFdeeZb4wYii53V7tBut9vSoLrkc',
              sameAs: ['https://www.linkedin.com/company/2xgen-com/'],
              knowsAbout: ['B2B Leadgeneratie', 'Leadgeneratie websites', 'Sales automation', 'Marketing automation', 'Digitale acquisitie'],
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
