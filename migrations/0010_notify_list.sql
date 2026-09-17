-- People who asked to be told when Ridgework opens, without making an account.
--
-- Until now the only way onto any list was a full account: a password, and an
-- email round trip to verify it. That is a large ask of somebody who has read
-- one guide and built one example week, and it meant the site had no way at all
-- of hearing from a stranger who was interested but not ready.
--
-- Double opt-in, because a list nobody confirmed is not a list worth having and
-- because anyone can type anyone's address into a public form. A row is inert
-- until `confirmed_at` is set. `token` is the capability: it confirms the
-- address and, later, removes it, so leaving never needs an account either.
-- Leaving deletes the row outright rather than flagging it — there is no reason
-- to keep the address of somebody who asked not to be written to.
--
-- `goal` and `peak_on` are what the person was looking at when they asked. They
-- are the only context worth keeping, and they are what makes a later message
-- about their race rather than about us.

create table if not exists notify_list (
  email text primary key,
  token text not null unique,
  goal text,
  peak_on date,
  locale text not null default 'en',
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  -- When the confirmation mail last went out. The join endpoint is public and
  -- unauthenticated, so without this anyone could repeat the request and have
  -- us mail a stranger's inbox as fast as they can post.
  last_sent_at timestamptz
);

create index if not exists notify_list_confirmed_idx on notify_list (confirmed_at);
