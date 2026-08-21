-- Run in Supabase → SQL Editor
create table if not exists public.aruba_business_surveys (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  business_name text not null,
  contact_name text not null,
  email text not null,
  business_type text not null,
  biggest_problem text not null,
  booking_method text,
  tourist_share text,
  source text not null default 'website',
  locale text not null default 'en'
);

-- If the table already exists without tourist_share:
alter table public.aruba_business_surveys
  add column if not exists tourist_share text;

alter table public.aruba_business_surveys enable row level security;

drop policy if exists "Anyone can insert aruba_business_surveys" on public.aruba_business_surveys;
create policy "Anyone can insert aruba_business_surveys"
  on public.aruba_business_surveys
  for insert
  to anon, authenticated
  with check (true);
