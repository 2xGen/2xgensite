-- Run in Supabase → SQL Editor
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

alter table public.tour_microsites enable row level security;
alter table public.tour_microsite_leads enable row level security;

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

drop policy if exists "Anyone can insert tour_microsite_leads" on public.tour_microsite_leads;
create policy "Anyone can insert tour_microsite_leads"
  on public.tour_microsite_leads for insert
  to anon, authenticated
  with check (true);

-- Seed network examples (skip if already present)
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
