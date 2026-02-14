import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const BASE_URL = 'https://2xgen.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: '2xGen - We Bring You Bookings. You Run the Business.',
  description: '2xGen helps hospitality businesses get found, trusted, and booked. We position your business where travelers plan their trip, actively recommend you in real conversations, and give you visibility across our proprietary platforms.',
  keywords: 'hospitality marketing, restaurant bookings, tour bookings, travel marketing, local SEO, hospitality growth, booking platform, travel recommendations, Aruba tours, restaurant visibility, tour visibility, hospitality business growth, 2xGen',
  authors: [{ name: '2xGen LLC' }],
  robots: 'index, follow',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: '2xGen - We Bring You Bookings. You Run the Business.',
    description: '2xGen helps hospitality businesses get found, trusted, and booked.',
    siteName: '2xGen LLC',
    locale: 'en_US',
    images: [{ url: 'https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/new%20logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL25ldyBsb2dvLnBuZyIsImlhdCI6MTc1NzI0MTcyOSwiZXhwIjo0MjgwMTIxNzI5fQ.fHOoeBZzP_4kqfj6k2kVVY999LyT_OXEyToDeWi3pEE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2xGen - We Bring You Bookings. You Run the Business.',
    description: '2xGen helps hospitality businesses get found, trusted, and booked.',
  },
  icons: {
    icon: 'https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/images/favicon.png',
    apple: 'https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/images/favicon.png',
  },
  verification: { google: 'JiADLh3Bmq5TaxgwrelX1YPhkW6JDut95j9LdMOJ8cc' },
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
              description: '2xGen helps hospitality businesses get found, trusted, and booked.',
              url: 'https://2xgen.com',
              logo: 'https://2xgen.com/favicon.svg',
              foundingDate: '2024',
              founder: { '@type': 'Person', name: 'Matthijs van Reek' },
              address: { '@type': 'PostalAddress', addressLocality: 'Albuquerque', addressRegion: 'New Mexico', addressCountry: 'USA' },
              contactPoint: { '@type': 'ContactPoint', email: 'matthijs@2xgen.com', contactType: 'business', areaServed: 'Worldwide', availableLanguage: ['English', 'Dutch'] },
              sameAs: ['https://www.linkedin.com/company/2xgen-com/'],
              knowsAbout: ['Hospitality Marketing', 'Travel Marketing', 'Local SEO', 'Restaurant Bookings', 'Tour Bookings', 'Travel Recommendations', 'Booking Platforms', 'Digital Visibility'],
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
              description: 'We Bring You Bookings. You Run the Business.',
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
              jobTitle: 'Founder',
              worksFor: { '@type': 'Organization', name: '2xGen LLC' },
              url: 'https://2xgen.com/#about',
              sameAs: ['https://www.linkedin.com/company/2xgen-com/'],
              knowsAbout: ['Hospitality Marketing', 'Travel Marketing', 'Local SEO', 'Restaurant Bookings', 'Tour Bookings', 'Travel Recommendations'],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"1b10e4e8bf2cb6621bc9e5b26bca03be"})});`,
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
