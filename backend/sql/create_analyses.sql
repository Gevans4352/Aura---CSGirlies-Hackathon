create table if not exists public.analyses (
    id bigint generated always as identity primary key,
    user_id uuid not null references auth.users(id) on delete cascade,
    emotional_allostatic_load int not null check (emotional_allostatic_load between 0 and 100),
    masking_strain_index int not null check (masking_strain_index between 0 and 100),
    created_at timestamptz default now()
);

alter table public.analyses enable row level security;

drop policy if exists "own select" on public.analyses;
create policy "own select" on public.analyses for select using (auth.uid() = user_id);

drop policy if exists "own insert" on public.analyses;
create policy "own insert" on public.analyses for insert with check (auth.uid() = user_id);

grant select, insert, update, delete on public.analyses to service_role;
grant usage, select on sequence public.analyses_id_seq to service_role;
