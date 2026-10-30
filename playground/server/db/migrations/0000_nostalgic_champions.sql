CREATE TYPE "public"."kategori_berita" AS ENUM('kegiatan', 'pengumuman', 'artikel');--> statement-breakpoint
CREATE TYPE "public"."peran_pengguna" AS ENUM('admin', 'pengurus', 'anggota');--> statement-breakpoint
CREATE TYPE "public"."status_berita" AS ENUM('draf', 'terbit');--> statement-breakpoint
CREATE TYPE "public"."status_pinjam_gedung" AS ENUM('menunggu', 'disetujui', 'ditolak');--> statement-breakpoint
CREATE TABLE "berita" (
	"id" serial PRIMARY KEY NOT NULL,
	"judul" varchar(255) NOT NULL,
	"ringkasan" varchar(500) NOT NULL,
	"konten" text NOT NULL,
	"kategori" "kategori_berita" DEFAULT 'kegiatan' NOT NULL,
	"gambar_url" varchar(500),
	"status" "status_berita" DEFAULT 'draf' NOT NULL,
	"penulis_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pengguna" (
	"id" serial PRIMARY KEY NOT NULL,
	"nama" varchar(255) NOT NULL,
	"username" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"peran" "peran_pengguna" DEFAULT 'anggota' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "pengguna_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "pinjam_gedung" (
	"id" serial PRIMARY KEY NOT NULL,
	"nama_pemohon" varchar(255) NOT NULL,
	"organisasi" varchar(255) NOT NULL,
	"no_hp" varchar(20) NOT NULL,
	"email" varchar(255),
	"keperluan" varchar(500) NOT NULL,
	"keterangan" text,
	"tanggal_mulai" date NOT NULL,
	"tanggal_selesai" date NOT NULL,
	"status" "status_pinjam_gedung" DEFAULT 'menunggu' NOT NULL,
	"catatan_admin" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "slider" (
	"id" serial PRIMARY KEY NOT NULL,
	"judul" varchar(255) NOT NULL,
	"subjudul" varchar(255) DEFAULT '' NOT NULL,
	"deskripsi" text,
	"gambar_url" varchar(500) NOT NULL,
	"urutan" integer DEFAULT 0 NOT NULL,
	"aktif" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "berita" ADD CONSTRAINT "berita_penulis_id_pengguna_id_fk" FOREIGN KEY ("penulis_id") REFERENCES "public"."pengguna"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint

-- Lindungi tabel dari akses langsung melalui Supabase Data API. Aplikasi
-- mengakses database hanya dari Nitro menggunakan connection string server.
ALTER TABLE "pengguna" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "berita" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "slider" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "pinjam_gedung" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint

-- PostgreSQL tidak memiliki ON UPDATE CURRENT_TIMESTAMP seperti MySQL.
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;--> statement-breakpoint

CREATE TRIGGER pengguna_set_updated_at BEFORE UPDATE ON "pengguna"
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER berita_set_updated_at BEFORE UPDATE ON "berita"
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER slider_set_updated_at BEFORE UPDATE ON "slider"
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER pinjam_gedung_set_updated_at BEFORE UPDATE ON "pinjam_gedung"
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint

-- Bucket publik untuk gambar berita dan slider. Penulisan hanya dilakukan
-- server dengan service-role key; pembacaan public dibutuhkan oleh portal.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'knpi-media',
  'knpi-media',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;
