-- Optional operator site ideas / suggestions from onboarding.
alter table public.sites
  add column if not exists operator_ideas text;

comment on column public.sites.operator_ideas is
  'Optional operator suggestions for the managed site (copy, tours to highlight, etc.)';
