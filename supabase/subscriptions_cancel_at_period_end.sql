-- Track Stripe cancel-at-period-end on operator subscriptions.
alter table public.subscriptions
  add column if not exists cancel_at_period_end boolean not null default false;
