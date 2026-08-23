/**
 * Fallback microsites when Supabase is empty / offline.
 * Admin-managed rows in `tour_microsites` take precedence when available.
 */

const OG = 'https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Microsites%20OG';

/** Hostname → homepage screenshot (used for fallback + live Supabase rows). */
export const MICROSITE_IMAGES = {
  'arubabuddies.com': `${OG}/arubabuddies%20homepage.jpg`,
  'aru365.com': `${OG}/aru365%20home.jpg`,
  'cur365.com': `${OG}/cur365%20page.jpg`,
  'gozoquadtours.fun': `${OG}/gozoquad%20tours%20homepage.jpg`,
  'stonehengetourslondon.site': `${OG}/stonehengelondon%20page.jpg`,
  'partybusaruba.fun': `${OG}/partybusaruba%20homepage.jpg`,
  'prg365.com': `${OG}/prg365%20homepage.jpg`,
  'toptours.ai': `${OG}/toptours%20ai%20homepage.jpg`,
};

export function imageForUrl(url = '') {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '').toLowerCase();
    return MICROSITE_IMAGES[host] || '';
  } catch {
    return '';
  }
}

/** Resolve screenshot from url and/or domain label (e.g. "Aru365.com"). */
export function imageForSite({ url = '', domain = '', image = '' } = {}) {
  const explicit = typeof image === 'string' ? image.trim() : '';
  if (explicit) return explicit;
  const fromUrl = imageForUrl(url);
  if (fromUrl) return fromUrl;
  const host = String(domain)
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .split('/')[0]
    .toLowerCase();
  return MICROSITE_IMAGES[host] || '';
}

export const FALLBACK_MICROSITES = [
  {
    id: 'fallback-gozo',
    domain: 'GozoQuadTours.fun',
    url: 'https://gozoquadtours.fun',
    category: 'Off-road tours',
    destination: 'Gozo, Malta',
    title: 'GozoQuadTours.fun',
    blurb:
      'The best Gozo off-road tours — quad, UTV, buggy, jeep, or tuk tuk. Full-day from Malta; compare and book on Viator.',
    image: MICROSITE_IMAGES['gozoquadtours.fun'],
    featured: true,
    sort_order: 1,
  },
  {
    id: 'fallback-partybus',
    domain: 'PartyBusAruba.fun',
    url: 'https://partybusaruba.fun',
    category: 'Nightlife / Party bus',
    destination: 'Aruba',
    title: 'Party Bus Aruba',
    blurb:
      'Compare Kukoo Kunuku, Chogogo, and Road Jam — Aruba party bus nightlife with booking on Viator.',
    image: MICROSITE_IMAGES['partybusaruba.fun'],
    featured: true,
    sort_order: 2,
  },
  {
    id: 'fallback-stonehenge',
    domain: 'StonehengeToursLondon.site',
    url: 'https://stonehengetourslondon.site',
    category: 'Day trips',
    destination: 'London',
    title: 'Stonehenge Tours London',
    blurb:
      'Stonehenge day trips from London — half-day coaches, Oxford/Bath combinations, private cars, and cruise-port options.',
    image: MICROSITE_IMAGES['stonehengetourslondon.site'],
    featured: true,
    sort_order: 3,
  },
  {
    id: 'fallback-helicopter',
    domain: 'BestHelicopterFlights.com',
    url: 'https://besthelicopterflights.com',
    category: 'Helicopter tours',
    destination: 'Multi-destination',
    title: 'Best Helicopter Flights',
    blurb: 'Helicopter tour discovery — compare scenic flights and book through trusted marketplace checkout.',
    image: '',
    featured: true,
    sort_order: 4,
  },
  {
    id: 'fallback-cur365',
    domain: 'Cur365.com',
    url: 'https://cur365.com',
    category: 'Island day trips',
    destination: 'Curaçao',
    title: 'Cur365',
    blurb:
      'Klein Curaçao expert site — day trips, yachts, powerboats, and private boats that actually land on the island.',
    image: MICROSITE_IMAGES['cur365.com'],
    featured: true,
    sort_order: 5,
  },
  {
    id: 'fallback-lon365',
    domain: 'Lon365.com',
    url: 'https://lon365.com',
    category: 'Harry Potter tours',
    destination: 'London',
    title: 'Lon365',
    blurb:
      'Harry Potter London tours — Studio Tour tickets, transfers, and filming-location experiences in one place.',
    image: '',
    featured: true,
    sort_order: 6,
  },
  {
    id: 'fallback-tyo365',
    domain: 'Tyo365.com',
    url: 'https://tyo365.com',
    category: 'Helicopter tours',
    destination: 'Tokyo',
    title: 'Tyo365',
    blurb:
      'Mt. Fuji helicopter tours from Tokyo — compare private scenic flights, transfers, and luxury experiences.',
    image: '',
    featured: true,
    sort_order: 7,
  },
  {
    id: 'fallback-prg365',
    domain: 'Prg365.com',
    url: 'https://prg365.com',
    category: 'Day trips',
    destination: 'Prague',
    title: 'Prg365',
    blurb:
      'Day trips from Prague — Český Krumlov, Kutná Hora, Bohemian Switzerland, Karlovy Vary, Dresden, and more.',
    image: MICROSITE_IMAGES['prg365.com'],
    featured: true,
    sort_order: 8,
  },
  {
    id: 'fallback-aru365',
    domain: 'Aru365.com',
    url: 'https://aru365.com',
    category: 'Island tours',
    destination: 'Aruba',
    title: 'Aru365',
    blurb:
      'Best tours in Aruba — catamarans, snorkeling, ATV, sunset cruises, jet skis, and more with free cancellation on most bookings.',
    image: MICROSITE_IMAGES['aru365.com'],
    featured: true,
    sort_order: 9,
  },
  {
    id: 'fallback-toptours',
    domain: 'TopTours.ai',
    url: 'https://toptours.ai',
    category: 'Directory',
    destination: 'Multi-destination',
    title: 'TopTours.ai',
    blurb: 'Broader tour discovery network — scale and reach across destinations.',
    image: MICROSITE_IMAGES['toptours.ai'],
    featured: true,
    sort_order: 10,
  },
  {
    id: 'fallback-arubabuddies',
    domain: 'ArubaBuddies.com',
    url: 'https://arubabuddies.com',
    category: 'Tourism discovery',
    destination: 'Aruba',
    title: 'ArubaBuddies',
    blurb: 'High-traffic tourism discovery with proven visitor and conversion volume.',
    image: MICROSITE_IMAGES['arubabuddies.com'],
    featured: true,
    sort_order: 11,
  },
];
