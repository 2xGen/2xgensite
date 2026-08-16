/** Deterministic Aruba Visibility Score from business inputs (same input → same score). */

function hashString(input = '') {
  let h = 2166136261;
  const s = String(input).toLowerCase().trim();
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function scoreFrom(seed, min, max) {
  const span = max - min + 1;
  return min + (seed % span);
}

/**
 * @param {{ businessName: string, website: string }} input
 */
export function computeArubaVisibility(input) {
  const key = `${input.businessName || ''}|${input.website || ''}`;
  const base = hashString(key);

  const gbp = scoreFrom(base, 48, 88);
  const localSeo = scoreFrom(base >>> 3, 42, 82);
  const website = scoreFrom(base >>> 7, 55, 92);
  const reviews = scoreFrom(base >>> 11, 35, 78);
  const conversion = scoreFrom(base >>> 15, 45, 85);

  const overall = Math.round(
    gbp * 0.25 + localSeo * 0.25 + website * 0.2 + reviews * 0.15 + conversion * 0.15
  );

  const dimensions = [
    { id: 'gbp', score: gbp },
    { id: 'localSeo', score: localSeo },
    { id: 'website', score: website },
    { id: 'reviews', score: reviews },
    { id: 'conversion', score: conversion },
  ];

  // Pick 3 weakest as opportunities (stable order by score then id)
  const opportunities = [...dimensions]
    .sort((a, b) => a.score - b.score || a.id.localeCompare(b.id))
    .slice(0, 3)
    .map((d) => d.id);

  return {
    overall,
    scores: {
      gbp,
      localSeo,
      website,
      reviews,
      conversion,
    },
    opportunityIds: opportunities,
  };
}
