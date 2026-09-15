-- Outbound integrations: a calendar subscription token, and the athlete's own
-- intervals.icu credentials.
--
-- The calendar token is a capability URL: anyone holding it can read that
-- athlete's planned sessions, so it is random, revocable, and never derived
-- from the user id.

create table if not exists calendar_feeds (
  user_id text primary key,
  token text not null unique,
  created_at timestamptz not null default now()
);

create unique index if not exists calendar_feeds_token_idx on calendar_feeds (token);

-- The API key belongs to the athlete, not to us. It is stored so the push can
-- run server-side (the intervals.icu API is not callable from a browser), and
-- it is never sent back to the client — only whether one is present.
create table if not exists intervals_links (
  user_id text primary key,
  athlete_id text not null,
  api_key text not null,
  last_pushed_at timestamptz,
  last_error text,
  updated_at timestamptz not null default now()
);
