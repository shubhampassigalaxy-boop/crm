-- Anra Social Media Management CRM — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "uuid-ossp";

-- ========== USERS ==========
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  auth_id uuid references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  role text not null check (role in ('Admin', 'Graphic Designer', 'Social Media Marketer', 'Manager')),
  username text unique,
  password text,
  avatar_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Make auth_id nullable for team members without auth accounts
alter table users alter column auth_id drop not null;

-- Add username and password columns if they don't exist
alter table users add column if not exists username text unique;
alter table users add column if not exists password text;

-- ========== CLIENTS ==========
create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null,
  client_name text,
  logo_url text,
  phone text,
  email text,
  website text,
  instagram_url text,
  facebook_url text,
  linkedin_url text,
  gbp_url text,
  brand_color text,
  brand_font text,
  google_drive_link text,
  canva_link text,
  brand_notes text,
  facebook_username text,
  facebook_password text,
  instagram_username text,
  instagram_password text,
  access_with text,
  assigned_designer_id uuid references users(id),
  assigned_marketer_id uuid references users(id),
  created_at timestamptz default now()
);

-- ========== PACKAGES ==========
create table if not exists packages (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  package_name text not null,
  total_monthly_posts int not null default 0,
  stories int default 0,
  reels int default 0,
  ads int default 0,
  start_date date not null,
  end_date date not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ========== POSTS (CONTENT CALENDAR ENTRIES) ==========
create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  package_id uuid references packages(id),
  title text not null,
  platform text check (platform in ('Instagram', 'Facebook', 'LinkedIn', 'Threads', 'Google Business')),
  post_type text check (post_type in ('Post', 'Story', 'Reel', 'Ad')),
  scheduled_date date not null,
  status text not null default 'Design Pending'
    check (status in ('Design Pending', 'Ready for Review', 'Approved', 'Uploaded', 'Missed')),
  designer_id uuid references users(id),
  marketer_id uuid references users(id),
  caption text,
  hashtags text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ========== DESIGNS ==========
create table if not exists designs (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts(id) on delete cascade,
  designer_id uuid references users(id),
  psd_url text,
  ai_file_url text,
  png_url text,
  design_notes text,
  status text default 'Pending' check (status in ('Pending', 'Submitted', 'Approved', 'Rejected')),
  submitted_at timestamptz,
  created_at timestamptz default now()
);

-- ========== UPLOADS ==========
create table if not exists uploads (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts(id) on delete cascade,
  marketer_id uuid references users(id),
  instagram_link text,
  facebook_link text,
  linkedin_link text,
  threads_link text,
  upload_date date,
  upload_time time,
  created_at timestamptz default now()
);

-- ========== APPROVALS ==========
create table if not exists approvals (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts(id) on delete cascade,
  approved_by uuid references users(id),
  decision text check (decision in ('Approved', 'Rejected', 'Changes Requested')),
  notes text,
  created_at timestamptz default now()
);

-- ========== NOTIFICATIONS ==========
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  type text check (type in ('expiry', 'pending', 'approval', 'overdue')),
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ========== MEDIA LIBRARY ==========
create table if not exists media_library (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  file_name text not null,
  file_type text check (file_type in ('Logo', 'Brand Kit', 'Image', 'Video', 'Document')),
  file_url text not null,
  file_size_kb int,
  uploaded_by uuid references users(id),
  created_at timestamptz default now()
);

-- ========== AUDIT LOGS ==========
create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id),
  post_id uuid references posts(id),
  designer_id uuid references users(id),
  marketer_id uuid references users(id),
  approved_by uuid references users(id),
  action text,
  created_at timestamptz default now(),
  modified_at timestamptz,
  completed_at timestamptz
);

-- ========== INDEXES ==========
create index if not exists idx_posts_client on posts(client_id);
create index if not exists idx_posts_date on posts(scheduled_date);
create index if not exists idx_posts_status on posts(status);
create index if not exists idx_notifications_user on notifications(user_id, is_read);
create index if not exists idx_packages_client on packages(client_id);

-- ========== ROW LEVEL SECURITY ==========
alter table clients enable row level security;
alter table posts enable row level security;
alter table designs enable row level security;
alter table uploads enable row level security;

-- Admins & Managers see everything; Designers/Marketers see only their assigned rows.
-- Example policy (adapt to your auth.uid() -> users.id mapping):
drop policy if exists "Admins and managers see all posts" on posts;
create policy "Admins and managers see all posts" on posts
  for select using (
    exists (
      select 1 from users u
      where u.auth_id = auth.uid() and u.role in ('Admin', 'Manager')
    )
  );

drop policy if exists "Designers see their assigned posts" on posts;
create policy "Designers see their assigned posts" on posts
  for select using (
    exists (
      select 1 from users u
      where u.auth_id = auth.uid() and u.id = posts.designer_id
    )
  );

drop policy if exists "Marketers see their assigned posts" on posts;
create policy "Marketers see their assigned posts" on posts
  for select using (
    exists (
      select 1 from users u
      where u.auth_id = auth.uid() and u.id = posts.marketer_id
    )
  );

-- ========== TRIGGER: auto-flag packages expiring in 5 days ==========
create or replace function notify_expiring_packages() returns trigger as $$
begin
  if (new.end_date - current_date) <= 5 then
    insert into notifications (user_id, type, message)
    select id, 'expiry', 'Package for a client expires in ' || (new.end_date - current_date) || ' days'
    from users where role = 'Admin';
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_package_expiry on packages;
create trigger trg_package_expiry
  after insert or update on packages
  for each row execute function notify_expiring_packages();

-- ========== ENABLE REALTIME ==========
alter publication supabase_realtime add table clients;
