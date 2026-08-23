import { supabase } from '@/lib/supabase';
import { FALLBACK_MICROSITES, imageForSite } from '@/data/microsites';

function normalize(row) {
  return {
    id: row.id,
    domain: row.domain,
    url: row.url,
    category: row.category,
    destination: row.destination,
    title: row.title || row.domain,
    blurb: row.blurb || '',
    image: imageForSite(row),
    featured: row.featured !== false,
    sort_order: row.sort_order ?? 0,
  };
}

export async function listMicrosites() {
  const { data, error } = await supabase
    .from('tour_microsites')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error || !data?.length) {
    if (error) console.warn('tour_microsites read failed, using fallback:', error.message);
    return FALLBACK_MICROSITES;
  }

  return data.map(normalize);
}

export async function createMicrosite(payload) {
  const { data, error } = await supabase
    .from('tour_microsites')
    .insert({
      domain: payload.domain.trim(),
      url: payload.url.trim(),
      category: payload.category.trim(),
      destination: payload.destination.trim(),
      title: (payload.title || payload.domain).trim(),
      blurb: (payload.blurb || '').trim(),
      featured: payload.featured !== false,
      sort_order: Number(payload.sort_order) || 0,
    })
    .select()
    .single();

  if (error) throw error;
  return normalize(data);
}

export async function updateMicrosite(id, payload) {
  const { data, error } = await supabase
    .from('tour_microsites')
    .update({
      domain: payload.domain.trim(),
      url: payload.url.trim(),
      category: payload.category.trim(),
      destination: payload.destination.trim(),
      title: (payload.title || payload.domain).trim(),
      blurb: (payload.blurb || '').trim(),
      featured: payload.featured !== false,
      sort_order: Number(payload.sort_order) || 0,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return normalize(data);
}

export async function deleteMicrosite(id) {
  const { error } = await supabase.from('tour_microsites').delete().eq('id', id);
  if (error) throw error;
}
