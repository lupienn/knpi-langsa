-- ============================================================
-- DPD KNPI Kota Langsa - Supabase schema
-- Jalankan seluruh file ini di Supabase Dashboard > SQL Editor.
-- Ditujukan untuk project Supabase baru/kosong.
-- ============================================================

begin;

-- ------------------------------------------------------------
-- Enum
-- ------------------------------------------------------------

do $$
begin
  create type public.peran_pengguna as enum ('admin', 'pengurus', 'anggota');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.kategori_berita as enum ('kegiatan', 'pengumuman', 'artikel');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.status_berita as enum ('draf', 'terbit');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.status_pinjam_gedung as enum ('menunggu', 'disetujui', 'ditolak');
exception
  when duplicate_object then null;
end
$$;

-- ------------------------------------------------------------
-- Tables
-- ------------------------------------------------------------

create table if not exists public.pengguna (
  id serial primary key,
  nama varchar(255) not null,
  username varchar(100) not null unique,
  password varchar(255) not null,
  peran public.peran_pengguna not null default 'anggota',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.berita (
  id serial primary key,
  judul varchar(255) not null,
  ringkasan varchar(500) not null,
  konten text not null,
  kategori public.kategori_berita not null default 'kegiatan',
  gambar_url varchar(500),
  status public.status_berita not null default 'draf',
  penulis_id integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint berita_penulis_id_pengguna_id_fk
    foreign key (penulis_id)
    references public.pengguna(id)
    on update cascade
    on delete restrict
);

create table if not exists public.slider (
  id serial primary key,
  judul varchar(255) not null,
  subjudul varchar(255) not null default '',
  deskripsi text,
  gambar_url varchar(500) not null,
  urutan integer not null default 0,
  aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tabel historis dari database MySQL lama tetap dipertahankan.
create table if not exists public.pinjam_gedung (
  id serial primary key,
  nama_pemohon varchar(255) not null,
  organisasi varchar(255) not null,
  no_hp varchar(20) not null,
  email varchar(255),
  keperluan varchar(500) not null,
  keterangan text,
  tanggal_mulai date not null,
  tanggal_selesai date not null,
  status public.status_pinjam_gedung not null default 'menunggu',
  catatan_admin text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------

create index if not exists berita_status_created_at_idx
  on public.berita (status, created_at desc);

create index if not exists berita_kategori_idx
  on public.berita (kategori);

create index if not exists berita_penulis_id_idx
  on public.berita (penulis_id);

create index if not exists slider_aktif_urutan_idx
  on public.slider (aktif, urutan);

create index if not exists pinjam_gedung_status_idx
  on public.pinjam_gedung (status);

-- ------------------------------------------------------------
-- updated_at triggers
-- ------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists pengguna_set_updated_at on public.pengguna;
create trigger pengguna_set_updated_at
before update on public.pengguna
for each row execute function public.set_updated_at();

drop trigger if exists berita_set_updated_at on public.berita;
create trigger berita_set_updated_at
before update on public.berita
for each row execute function public.set_updated_at();

drop trigger if exists slider_set_updated_at on public.slider;
create trigger slider_set_updated_at
before update on public.slider
for each row execute function public.set_updated_at();

drop trigger if exists pinjam_gedung_set_updated_at on public.pinjam_gedung;
create trigger pinjam_gedung_set_updated_at
before update on public.pinjam_gedung
for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
--
-- Aplikasi mengakses tabel hanya melalui Nuxt/Nitro memakai koneksi server.
-- Tidak ada policy anon/authenticated agar password dan data admin tidak bisa
-- dibaca langsung melalui Supabase Data API.
-- ------------------------------------------------------------

alter table public.pengguna enable row level security;
alter table public.berita enable row level security;
alter table public.slider enable row level security;
alter table public.pinjam_gedung enable row level security;

revoke all on table public.pengguna from anon, authenticated;
revoke all on table public.berita from anon, authenticated;
revoke all on table public.slider from anon, authenticated;
revoke all on table public.pinjam_gedung from anon, authenticated;

-- ------------------------------------------------------------
-- Supabase Storage
--
-- Bucket dibuat public agar gambar berita/slider bisa ditampilkan tanpa
-- signed URL. Upload tetap dilakukan oleh server dengan service-role key.
-- ------------------------------------------------------------

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'knpi-media',
  'knpi-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

commit;

-- ============================================================
-- Verifikasi: query ini seharusnya mengembalikan 4 baris tabel.
-- ============================================================

select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('pengguna', 'berita', 'slider', 'pinjam_gedung')
order by table_name;
