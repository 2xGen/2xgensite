-- =============================================================================
-- 2xGen — FULL schema for a NEW Supabase project
-- =============================================================================
-- Run once in: Supabase → SQL Editor → New query → Run
--
-- BEFORE running:
--   1. Authentication → Providers → Email → enable
--   2. (Recommended) Authentication → Providers → Email → disable "Confirm email"
--      while testing, or operators must confirm before login
--
-- AFTER running:
--   1. Project Settings → API → copy URL + anon key + service_role key into .env.local
--   2. Set ADMIN_EMAILS=your@email.com in .env.local
--   3. Create your admin user via /signup (or Auth → Users), then either:
--        - add that email to ADMIN_EMAILS and sign in once, OR
--        - run: update public.profiles set role = 'admin' where email = 'you@…';
-- =============================================================================

create extension if not exists "pgcrypto";

-- =============================================================================
-- A) PUBLIC MARKETING / LEGACY FORMS
-- =============================================================================

-- Network catalog (homepage Live projects + admin microsites CRUD)
create table if not exists public.tour_microsites (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  domain text not null,
  url text not null,
  category text not null,
  destination text not null,
  title text,
  blurb text,
  featured boolean not null default true,
  sort_order integer not null default 0
);

-- get-a-site lead form
create table if not exists public.tour_microsite_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  destination text not null,
  viator_link text not null,
  email text,
  source text not null default 'website'
);

-- Legacy acquisition check form
create table if not exists public.acquisitiechecks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null,
  challenge_id text,
  challenge text,
  situation_id text,
  situation text,
  business_type text,
  website text,
  source text not null default 'website'
);

-- Aruba business survey
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

-- Aruba visibility audit form
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

alter table public.tour_microsites enable row level security;
alter table public.tour_microsite_leads enable row level security;
alter table public.acquisitiechecks enable row level security;
alter table public.aruba_business_surveys enable row level security;
alter table public.aruba_visibility_audits enable row level security;

-- tour_microsites: public read + write (admin UI uses anon/authenticated client today)
drop policy if exists "Anyone can read tour_microsites" on public.tour_microsites;
create policy "Anyone can read tour_microsites"
  on public.tour_microsites for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can insert tour_microsites" on public.tour_microsites;
create policy "Anyone can insert tour_microsites"
  on public.tour_microsites for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Anyone can update tour_microsites" on public.tour_microsites;
create policy "Anyone can update tour_microsites"
  on public.tour_microsites for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Anyone can delete tour_microsites" on public.tour_microsites;
create policy "Anyone can delete tour_microsites"
  on public.tour_microsites for delete
  to anon, authenticated
  using (true);

-- Lead / form tables: insert-only from the website (view rows in Supabase Table Editor)
drop policy if exists "Anyone can insert tour_microsite_leads" on public.tour_microsite_leads;
create policy "Anyone can insert tour_microsite_leads"
  on public.tour_microsite_leads for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Anyone can insert acquisitiechecks" on public.acquisitiechecks;
create policy "Anyone can insert acquisitiechecks"
  on public.acquisitiechecks for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Anyone can insert aruba_business_surveys" on public.aruba_business_surveys;
create policy "Anyone can insert aruba_business_surveys"
  on public.aruba_business_surveys for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Anyone can insert aruba_visibility_audits" on public.aruba_visibility_audits;
create policy "Anyone can insert aruba_visibility_audits"
  on public.aruba_visibility_audits for insert
  to anon, authenticated
  with check (true);

-- Seed public network examples
insert into public.tour_microsites (domain, url, category, destination, title, blurb, featured, sort_order)
select * from (values
  (
    'GozoQuadTours.fun',
    'https://gozoquadtours.fun',
    'Off-road tours',
    'Gozo, Malta',
    'GozoQuadTours.fun',
    'The best Gozo off-road tours — quad, UTV, buggy, jeep, or tuk tuk. Full-day from Malta; compare and book on Viator.',
    true,
    1
  ),
  (
    'PartyBusAruba.fun',
    'https://partybusaruba.fun',
    'Nightlife / Party bus',
    'Aruba',
    'Party Bus Aruba',
    'Compare Kukoo Kunuku, Chogogo, and Road Jam — Aruba party bus nightlife with booking on Viator.',
    true,
    2
  ),
  (
    'StonehengeToursLondon.site',
    'https://stonehengetourslondon.site',
    'Day trips',
    'London',
    'Stonehenge Tours London',
    'Stonehenge day trips from London — half-day coaches, Oxford/Bath combinations, private cars, and cruise-port options.',
    true,
    3
  ),
  (
    'BestHelicopterFlights.com',
    'https://besthelicopterflights.com',
    'Helicopter tours',
    'Multi-destination',
    'Best Helicopter Flights',
    'Helicopter tour discovery — compare scenic flights and book through trusted marketplace checkout.',
    true,
    4
  ),
  (
    'Cur365.com',
    'https://cur365.com',
    'Island day trips',
    'Curaçao',
    'Cur365',
    'Klein Curaçao expert site — day trips, yachts, powerboats, and private boats that actually land on the island.',
    true,
    5
  ),
  (
    'Lon365.com',
    'https://lon365.com',
    'Harry Potter tours',
    'London',
    'Lon365',
    'Harry Potter London tours — Studio Tour tickets, transfers, and filming-location experiences in one place.',
    true,
    6
  ),
  (
    'Tyo365.com',
    'https://tyo365.com',
    'Helicopter tours',
    'Tokyo',
    'Tyo365',
    'Mt. Fuji helicopter tours from Tokyo — compare private scenic flights, transfers, and luxury experiences.',
    true,
    7
  ),
  (
    'Prg365.com',
    'https://prg365.com',
    'Day trips',
    'Prague',
    'Prg365',
    'Day trips from Prague — Český Krumlov, Kutná Hora, Bohemian Switzerland, Karlovy Vary, Dresden, and more.',
    true,
    8
  ),
  (
    'Aru365.com',
    'https://aru365.com',
    'Island tours',
    'Aruba',
    'Aru365',
    'Best tours in Aruba — catamarans, snorkeling, ATV, sunset cruises, jet skis, and more with free cancellation on most bookings.',
    true,
    9
  ),
  (
    'TopTours.ai',
    'https://toptours.ai',
    'Directory',
    'Multi-destination',
    'TopTours.ai',
    'Broader tour discovery network — scale and reach across destinations.',
    true,
    10
  ),
  (
    'ArubaBuddies.com',
    'https://arubabuddies.com',
    'Tourism discovery',
    'Aruba',
    'ArubaBuddies',
    'High-traffic tourism discovery with proven visitor and conversion volume.',
    true,
    11
  )
) as v(domain, url, category, destination, title, blurb, featured, sort_order)
where not exists (
  select 1 from public.tour_microsites m where lower(m.domain) = lower(v.domain)
);

-- =============================================================================
-- B) OPERATOR SAAS (Auth-backed)
-- =============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  company text,
  role text not null default 'operator' check (role in ('operator', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'waitlist'
    check (status in ('waitlist', 'queued', 'building', 'live')),
  destination text,
  domain text,
  public_url text,
  screenshot_url text,
  listing_urls text,
  notes text,
  operator_ideas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles (id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'inactive'
    check (status in ('inactive', 'active', 'past_due', 'canceled')),
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Existing projects: create table if not exists won't add new columns
alter table public.sites add column if not exists screenshot_url text;
alter table public.sites add column if not exists listing_urls text;
alter table public.sites add column if not exists operator_ideas text;
alter table public.subscriptions
  add column if not exists cancel_at_period_end boolean not null default false;

create table if not exists public.tracking_links (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites (id) on delete cascade,
  code text not null unique,
  label text not null default 'Booking link',
  destination_url text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tracking_links_site_id_idx on public.tracking_links (site_id);
create index if not exists tracking_links_code_idx on public.tracking_links (code);

create table if not exists public.link_clicks (
  id uuid primary key default gen_random_uuid(),
  tracking_link_id uuid not null references public.tracking_links (id) on delete cascade,
  clicked_at timestamptz not null default now(),
  user_agent text,
  referer text
);

create index if not exists link_clicks_link_id_clicked_at_idx
  on public.link_clicks (tracking_link_id, clicked_at desc);

-- Auto-create profile (+ waitlist site + inactive subscription for operators) on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  user_role text := 'operator';
begin
  if coalesce(new.raw_user_meta_data->>'role', '') = 'admin' then
    user_role := 'admin';
  end if;

  insert into public.profiles (id, email, full_name, company, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'company', ''),
    user_role
  );

  if user_role = 'operator' then
    insert into public.sites (profile_id, status, destination)
    values (
      new.id,
      'waitlist',
      coalesce(new.raw_user_meta_data->>'destination', '')
    );

    insert into public.subscriptions (profile_id, status)
    values (new.id, 'inactive');
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

create or replace function public.owns_site(site uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.sites s
    where s.id = site and s.profile_id = auth.uid()
  );
$$;

alter table public.profiles enable row level security;
alter table public.sites enable row level security;
alter table public.subscriptions enable row level security;
alter table public.tracking_links enable row level security;
alter table public.link_clicks enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

drop policy if exists "sites_select_own_or_admin" on public.sites;
create policy "sites_select_own_or_admin"
  on public.sites for select
  to authenticated
  using (profile_id = auth.uid() or public.is_admin());

drop policy if exists "sites_update_admin" on public.sites;
drop policy if exists "sites_update_own_or_admin" on public.sites;
create policy "sites_update_own_or_admin"
  on public.sites for update
  to authenticated
  using (profile_id = auth.uid() or public.is_admin())
  with check (profile_id = auth.uid() or public.is_admin());

create or replace function public.sites_guard_operator_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(auth.jwt() ->> 'role', '') = 'service_role' then
    return new;
  end if;

  if public.is_admin() then
    return new;
  end if;

  if new.profile_id is distinct from old.profile_id
     or new.status is distinct from old.status
     or new.domain is distinct from old.domain
     or new.public_url is distinct from old.public_url
     or new.screenshot_url is distinct from old.screenshot_url
  then
    raise exception 'Operators can only update destination and listing details';
  end if;

  return new;
end;
$$;

drop trigger if exists sites_guard_operator_update on public.sites;
create trigger sites_guard_operator_update
  before update on public.sites
  for each row
  execute function public.sites_guard_operator_update();

drop policy if exists "sites_insert_admin" on public.sites;
create policy "sites_insert_admin"
  on public.sites for insert
  to authenticated
  with check (public.is_admin() or profile_id = auth.uid());

drop policy if exists "subscriptions_select_own_or_admin" on public.subscriptions;
create policy "subscriptions_select_own_or_admin"
  on public.subscriptions for select
  to authenticated
  using (profile_id = auth.uid() or public.is_admin());

drop policy if exists "subscriptions_update_admin" on public.subscriptions;
create policy "subscriptions_update_admin"
  on public.subscriptions for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Service role (Stripe webhooks) bypasses RLS; operators read their own row
drop policy if exists "subscriptions_insert_own" on public.subscriptions;
create policy "subscriptions_insert_own"
  on public.subscriptions for insert
  to authenticated
  with check (profile_id = auth.uid() or public.is_admin());

drop policy if exists "tracking_links_select_own_or_admin" on public.tracking_links;
create policy "tracking_links_select_own_or_admin"
  on public.tracking_links for select
  to authenticated
  using (public.owns_site(site_id) or public.is_admin());

drop policy if exists "tracking_links_admin_write" on public.tracking_links;
create policy "tracking_links_admin_write"
  on public.tracking_links for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "link_clicks_select_own_or_admin" on public.link_clicks;
create policy "link_clicks_select_own_or_admin"
  on public.link_clicks for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.tracking_links tl
      join public.sites s on s.id = tl.site_id
      where tl.id = link_clicks.tracking_link_id
        and s.profile_id = auth.uid()
    )
  );

-- Click inserts use SUPABASE_SERVICE_ROLE_KEY in /go/[code] (bypasses RLS).

comment on table public.tour_microsites is 'Public network catalog shown on 2xgen.com';
comment on table public.tour_microsite_leads is 'Leads from /get-a-site';
comment on table public.sites is 'Operator product site: waitlist → queued → building → live';
comment on table public.tracking_links is 'Short codes for /go/[code] → Viator/GYG with click logging';

-- =============================================================================
-- Done. Tables created:
--   tour_microsites, tour_microsite_leads,
--   acquisitiechecks, aruba_business_surveys, aruba_visibility_audits,
--   profiles, sites, subscriptions, tracking_links, link_clicks
-- =============================================================================
