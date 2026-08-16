import { sectors as sectorsNl, services as servicesNl, platforms, featuredPlatforms, liveBrands } from '@/data/siteContent';

const sectorsEn = [
  {
    slug: 'tourism-hospitality',
    title: 'Tourism & Hospitality',
    items: 'Hotels · Tours · Restaurants · Activities',
    headline: 'Acquisition systems for tourism & hospitality',
    intro:
      'Travelers search before and during their trip. We build systems that turn that demand into bookings, reservations and qualified leads.',
    focus: ['Hotels and stays', 'Tours and activities', 'Restaurants and hospitality'],
    angle: 'Search → content → traffic → booking or lead — built from platforms we operate ourselves.',
  },
  {
    slug: 'car-rentals',
    title: 'Car Rentals',
    items: 'Cars · SUVs · Transfers · Mobility',
    headline: 'Acquisition systems for car rentals',
    intro:
      'Visitors compare cars, prices and pickup times before they book. We build tools and pages that capture that intent and turn it into reservations.',
    focus: ['Car and SUV rentals', 'Airport transfers', 'Local mobility'],
    angle: 'Search demand → comparison or booking tool → qualified reservation for your fleet.',
  },
  {
    slug: 'retail',
    title: 'Retail & Shopping',
    items: 'Stores · Boutiques · Duty-free · Local products',
    headline: 'Acquisition systems for retail & shopping',
    intro:
      'Shoppers search for products, gifts and places to buy. We help you show up with the right offer — and convert that interest into visits or sales.',
    focus: ['Boutiques and stores', 'Duty-free and gifts', 'Local products'],
    angle: 'Search → product or guide page → visit, inquiry or purchase.',
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    items: 'Agents · Brokers · Developers · Property services',
    headline: 'Acquisition systems for real estate',
    intro:
      'In real estate, timing matters. We help you show up when someone is searching, comparing or starting a project.',
    focus: ['Agents and brokers', 'Developers', 'Property services'],
    angle: 'Local and intent-driven acquisition — with pages and tools that move people to contact.',
  },
  {
    slug: 'professional-services',
    title: 'Professional Services',
    items: 'Legal · Accounting · Consulting · Insurance',
    headline: 'Acquisition systems for professional services',
    intro:
      'Trust-heavy services need more than ads. We build digital entry points that capture intent and warm prospects toward a conversation.',
    focus: ['Legal and compliance', 'Accounting and advisory', 'Consulting and insurance'],
    angle: 'Sharp targeting, a strong digital entry, and follow-up that fits a high-trust sales process.',
  },
  {
    slug: 'home-services',
    title: 'Local Services',
    items: 'Home services · Health · Beauty · Trades',
    headline: 'Acquisition systems for local services',
    intro:
      'Local search is concrete. Tools and landing pages turn “I need this now” into qualified leads for your team.',
    focus: ['Home services', 'Health and beauty', 'Local trades'],
    angle: 'Local intent → digital entry → a lead you can follow up immediately.',
  },
  {
    slug: 'financial-services',
    title: 'Financial Services',
    items: 'Mortgage · Insurance · Financing',
    headline: 'Acquisition systems for financial services',
    intro:
      'One new customer often has high value. Then it is not about more traffic — but the right inquiries, at the right moment.',
    focus: ['Mortgage and financing', 'Insurance', 'Financing'],
    angle: 'From search intent to a qualified inquiry — with tools, content and follow-up that fit finance.',
  },
  {
    slug: 'b2b',
    title: 'B2B',
    items: 'IT · SaaS · Telecom · Industrial services',
    headline: 'Acquisition systems for B2B',
    intro:
      'B2B buyers research before they talk. We build systems that find the right companies and move them toward sales.',
    focus: ['IT and SaaS', 'Telecom', 'Industrial services'],
    angle: 'Demand capture, qualification and delivery into CRM — built for longer sales cycles.',
  },
  {
    slug: 'recruitment',
    title: 'Recruitment',
    items: 'Employers · Staffing · Talent · Training',
    headline: 'Acquisition systems for recruitment',
    intro:
      'Whether you look for employers or candidates: acquisition only works if you capture the right intent and follow up fast.',
    focus: ['Employer leads', 'Staffing and talent', 'Training programs'],
    angle: 'Landing pages, checks and outbound that recruiters can use immediately.',
  },
];

const serviceEnBySlug = {
  leadgeneratie: {
    title: 'Lead generation',
    eyebrow: 'More relevant prospects',
    summary: 'SEO, content, outbound, partnerships and landing pages — aligned with where your customers search and decide.',
  },
  'leadgeneratie-tools': {
    title: 'Lead-generation tools',
    eyebrow: 'Give people a reason to get in touch',
    summary: 'Calculators, checks, comparators and scans that attract visitors and turn them into leads.',
  },
  'data-prospecting': {
    title: 'Data & prospecting',
    eyebrow: 'Find exactly the right companies',
    summary: 'Data sources, search data and automation to find companies and prospects that truly fit.',
  },
  automatisering: {
    title: 'Automation',
    eyebrow: 'Less manual work. More follow-up.',
    summary: 'Leads automatically into your CRM, qualified, followed up via email or WhatsApp and passed to sales.',
  },
  'leadgeneratie-websites': {
    title: 'Lead-generation websites',
    eyebrow: 'From visitor to lead',
    summary: 'Landing pages and websites that do more than inform — they get visitors to take action.',
  },
  'digitale-platforms': {
    title: 'Digital platforms',
    eyebrow: 'Build something that keeps growing',
    summary: 'Platforms that structurally attract traffic, users and leads — and gain more value as they grow.',
  },
};

export function getSectors(locale = 'nl') {
  return locale === 'en' ? sectorsEn : sectorsNl;
}

export function getSector(slug, locale = 'nl') {
  return getSectors(locale).find((s) => s.slug === slug);
}

export function getServices(locale = 'nl') {
  if (locale !== 'en') return servicesNl;
  return servicesNl.map((s) => ({
    ...s,
    ...(serviceEnBySlug[s.slug] || {}),
  }));
}

const platformEnByName = {
  ArubaBuddies: {
    blurb: 'Aruba tourism discovery — tours, activities and local highlights.',
    mechanism:
      'Search demand around Aruba lands on content and discovery. Traffic turns into tour clicks and bookings — an acquisition system we operate ourselves.',
  },
  FactuurBaas: {
    blurb: 'Freelancer acquisition platform — free invoicing for freelancers and small businesses.',
    mechanism:
      'Search traffic around invoicing lands on a free tool. Users feel value immediately — and naturally become leads and returning users.',
  },
  'TopTours.ai': {
    blurb: 'AI-driven discovery for tours and activities.',
    mechanism: 'AI helps visitors find the right experience faster. Discovery becomes the acquisition channel.',
  },
  OneHappyFinance: {
    blurb: 'Financial information and lead generation for Aruba.',
    mechanism: 'Informative content builds trust. Intent turns into leads for financial services.',
  },
  TalentPad: {
    angle: 'Search → application',
    blurb: 'Recruitment platform for talent and employers.',
    mechanism: 'Intent around jobs and talent turns into applications and employer leads.',
  },
  KlaarVoorAdvies: {
    blurb: 'Advice-led acquisition via checks and content.',
    mechanism: 'Visitors get value first through a check — then the conversation follows.',
  },
  MyGoProfile: {
    angle: 'GBP → visibility',
    blurb: 'AI automation for optimized Google Business Profiles.',
    mechanism:
      'AI automates optimization and management of Google Business Profiles — local visibility as an acquisition asset.',
  },
  AruList: {
    blurb: 'Marketplace for second-hand products in Aruba.',
    mechanism: 'Supply attracts search traffic. Listings and contact moments form the conversion path.',
  },
  ArubaCheck: {
    angle: 'Financial information → mortgage check → qualified lead',
    blurb: 'Mortgage information and lead generation for Aruba property buyers.',
    mechanism:
      'Financial information attracts search demand. A mortgage check qualifies intent and delivers leads for Aruba property buyers.',
    status: 'In development',
  },
  'Belgium Vignette': {
    angle: 'Search → purchase',
    blurb: 'Intent-driven platform around vignettes and travel formalities.',
    mechanism: 'High-intent search traffic lands on a focused conversion page.',
  },
  TYO365: {
    blurb: 'SEO platform for tours and activities.',
    mechanism: 'City- and intent-driven SEO that structurally brings search traffic to tours.',
  },
  PRG365: {
    blurb: 'SEO platform for tours in Prague.',
    mechanism: 'Local search intent turns into bookings and affiliate revenue.',
  },
  ARU365: {
    blurb: 'SEO platform for tours and activities in Aruba.',
    mechanism: 'Travel intent is captured through content and pushed toward conversion.',
  },
  Tennis365: {
    blurb: 'Tennis platform with content, tools and community.',
    mechanism: 'Community and content build reach; products follow from engaged users.',
  },
  'Tennis365.app': {
    blurb: 'Digital tennis experience and tools for players.',
    mechanism: 'Product usage itself is the acquisition and retention channel.',
  },
  TennisConnect: {
    blurb: 'Platform to find tennis partners and matches.',
    mechanism:
      'Players look for a partner or a match. Intent turns into matches, community and repeat usage.',
  },
  'TOF Sports': {
    blurb: 'Digital ecosystem for tennis and padel.',
    mechanism: 'Community and content build reach. Products and services follow from engaged users.',
  },
  'TOF Social': {
    angle: 'Community → reach',
    blurb: 'Social layer within the tennis and padel ecosystem.',
    mechanism: 'Community activity feeds reach, engagement and referrals to products.',
  },
  'Omnibus Tennis': {
    angle: 'Content → customer',
    blurb: 'Tennis-focused digital product and content channel.',
    mechanism: 'Content and product experience move players and clubs to act.',
  },
};

export function getPlatforms(locale = 'nl') {
  if (locale !== 'en') {
    return platforms.map((p) => ({
      ...p,
      status: p.status === 'In development' ? 'In ontwikkeling' : p.status,
    }));
  }
  return platforms.map((p) => ({
    ...p,
    ...(platformEnByName[p.name] || {}),
  }));
}

export function getFeaturedPlatforms(locale = 'nl') {
  return getPlatforms(locale).filter((p) => p.featured);
}

export function getLiveBrands() {
  return liveBrands;
}
