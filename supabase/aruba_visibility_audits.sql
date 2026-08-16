-- Run in Supabase → SQL Editor
create table if not exists public.aruba_visibility_audits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  business_name text not null,
  website text not null,
  email text not null,
  overall_score integer,
  gbp_score integer,
  local_seo_score integer,
  website_score integer,
  reviews_score integer,
  conversion_score integer,
  opportunity_ids text,
  source text not null default 'website'
);

alter table public.aruba_visibility_audits enable row level security;

drop policy if exists "Anyone can insert aruba_visibility_audits" on public.aruba_visibility_audits;
create policy "Anyone can insert aruba_visibility_audits"
  on public.aruba_visibility_audits
  for insert
  to anon, authenticated
  with check (true);
