-- The founding cohort, on the server.
--
-- It used to live in localStorage under `ridgework-founding-v1`, which made it
-- a per-device flag rather than a list: clearing browser data or opening the
-- desk on a second phone erased it, and there was no record anywhere of who
-- the founding members were. The point of the cohort is to know, on the day
-- payments open, which athletes were here first and which of them actually
-- used the thing. A flag in one browser cannot answer that.
--
-- `started_at` is when the athlete first reached the desk, not when the row was
-- written, so re-running the upsert never moves it.

create table if not exists founding_members (
  user_id text primary key,
  email text not null,
  name text not null default '',
  started_at timestamptz not null default now()
);

create index if not exists founding_members_started_idx on founding_members (started_at);
