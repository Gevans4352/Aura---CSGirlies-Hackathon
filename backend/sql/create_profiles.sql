create table if not exists public.profiles (
    id uuid references auth.users(id) primary key,
      name text,
      answers jsonb,
      baseline_msi numeric,
      dashboard_priority text,
      created_at timestamptz default now(),
      updated_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "own select" on public.profiles for select using (auth.uid() = id);
create policy "own insert" on public.profiles for insert with check (auth.uid() = id);
create policy "own update" on public.profiles for update using (auth.uid() = id);
