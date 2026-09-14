-- Ridgework training enrollments. Per-user rows; user_id is Better Auth text id.
-- Billing columns exist now; Stripe stays off until SIRET + keys. Test enrollments
-- use billing_status = 'test' (no charge).

create table if not exists enrollments (
  id serial primary key,
  user_id text not null,
  objective text not null,
  peak_on date not null,
  started_on date not null,
  billing_status text not null default 'test',
  stripe_customer_id text,
  stripe_subscription_id text,
  state jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, objective)
);

create index if not exists enrollments_user_id_idx on enrollments (user_id);

create table if not exists checkins (
  id serial primary key,
  enrollment_id integer not null references enrollments (id) on delete cascade,
  user_id text not null,
  calendar integer not null,
  result text not null,
  note text not null default '',
  at timestamptz not null default now()
);

create index if not exists checkins_user_id_idx on checkins (user_id);
create index if not exists checkins_enrollment_id_idx on checkins (enrollment_id);

create table if not exists billing_events (
  id serial primary key,
  user_id text not null,
  enrollment_id integer references enrollments (id) on delete set null,
  kind text not null,
  stripe_id text,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists billing_events_user_id_idx on billing_events (user_id);
