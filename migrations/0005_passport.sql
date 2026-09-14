-- Performance passport: outings, privacy, and an optional share token.
-- Training stats are derived from enrollments.state (including archived seasons).

create table if not exists passports (
  user_id text primary key,
  events jsonb not null default '[]',
  privacy jsonb not null,
  share_token text unique,
  updated_at timestamptz not null default now()
);

create unique index if not exists passports_share_token_idx
  on passports (share_token)
  where share_token is not null;
