create table if not exists memberships (
  user_id text primary key,
  billing_status text not null default 'trial',
  polar_customer_id text,
  polar_subscription_id text,
  updated_at timestamptz not null default now()
);
