import Stripe from 'stripe';

let stripe;

export function getStripe() {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
    stripe = new Stripe(key);
  }
  return stripe;
}

export const ANNUAL_PRICE_USD = 249;

export function trackingBaseUrl() {
  return (process.env.NEXT_PUBLIC_TRACKING_BASE_URL || 'https://2xgen.com').replace(/\/$/, '');
}

export function trackingLinkUrl(code) {
  return `${trackingBaseUrl()}/go/${code}`;
}

export function isAdminEmail(email = '') {
  const list = (process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(String(email).toLowerCase());
}

export const SITE_STATUSES = ['waitlist', 'queued', 'building', 'live'];

export function statusLabel(status) {
  const map = {
    waitlist: 'Waitlist',
    queued: 'Queued to build',
    building: 'Building',
    live: 'Live',
  };
  return map[status] || status;
}

export function statusHint(status) {
  const map = {
    waitlist: 'Create your free account is done. Subscribe at $249/year to join the build queue.',
    queued: 'Payment received. You’re in the build queue — we’ll start your site soon.',
    building: 'We’re building your Google-facing site now.',
    live: 'Your site is live. Preview it below and track booking-link clicks.',
  };
  return map[status] || '';
}
