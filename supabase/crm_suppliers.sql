-- Admin CRM: outreach suppliers (Viator/GYG operators you contact before signup).
-- Run in Supabase → SQL Editor.

create table if not exists public.crm_suppliers (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  email text,
  tour_type text,
  destination text,
  viator_url text,
  status text not null default 'first_email'
    check (status in (
      'first_email',
      'no_reply',
      'reply_not_interested',
      'reply_with_questions'
    )),
  email_sent_on date,
  first_contact_on date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists crm_suppliers_destination_idx
  on public.crm_suppliers (destination);

create index if not exists crm_suppliers_tour_type_idx
  on public.crm_suppliers (tour_type);

create index if not exists crm_suppliers_status_idx
  on public.crm_suppliers (status);

create index if not exists crm_suppliers_email_sent_on_idx
  on public.crm_suppliers (email_sent_on desc nulls last);

create index if not exists crm_suppliers_company_name_idx
  on public.crm_suppliers (company_name);

alter table public.crm_suppliers enable row level security;

drop policy if exists "crm_suppliers_admin_all" on public.crm_suppliers;
create policy "crm_suppliers_admin_all"
  on public.crm_suppliers for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

comment on table public.crm_suppliers is
  'Admin CRM for outbound supplier outreach (pre-signup operators)';
