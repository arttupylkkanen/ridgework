-- Athlete profile (one per user) and daily readiness check-ins.
-- Session logs stay on enrollments.state jsonb so the rolling plan remains one document.

create table if not exists athlete_profiles (
  user_id text primary key,
  profile jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists daily_checkins (
  id serial primary key,
  user_id text not null,
  on_date date not null,
  payload jsonb not null,
  call text not null,
  overridden boolean not null default false,
  created_at timestamptz not null default now(),
  unique (user_id, on_date)
);

create index if not exists daily_checkins_user_id_idx on daily_checkins (user_id);
