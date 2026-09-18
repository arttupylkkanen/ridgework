-- Who gets the weekly note, and when they last got one.
--
-- Ridgework sent exactly two emails before this: confirm your address, and
-- reset your password. A product whose entire claim is that the week gets
-- rewritten never told anybody that it had.
--
-- A row is created the first time an athlete is considered for a note, so the
-- default is opt-in by having a plan rather than by an extra switch. `enabled`
-- is what the stop link in every message turns off, and `token` is what makes
-- that link work without signing in.
--
-- `last_sent_on` is the Monday of the week the note described, not the moment
-- the mail went out. The sender runs from a daily cron, so keying on the week
-- is what makes a missed slot, a retry, and a double run all harmless.

create table if not exists weekly_notes (
  user_id text primary key,
  token text not null unique,
  enabled boolean not null default true,
  last_sent_on date,
  updated_at timestamptz not null default now()
);

create index if not exists weekly_notes_enabled_idx on weekly_notes (enabled, last_sent_on);
