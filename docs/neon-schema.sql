create extension if not exists pgcrypto;

create table if not exists public.bucks_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.bucks_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.bucks_users(id) on delete cascade,
  entity_type text not null,
  entity_name text not null,
  status text not null default 'Observacion',
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bucks_notes_user_updated_idx
on public.bucks_notes (user_id, updated_at desc);
