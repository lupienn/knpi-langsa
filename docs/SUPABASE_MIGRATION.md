# Migrasi MySQL ke Supabase

Proyek memakai Supabase sebagai PostgreSQL terkelola dan Supabase Storage untuk
gambar. Login aplikasi tetap menggunakan tabel `pengguna`, bcrypt, dan JWT agar
akun serta alur admin lama tetap kompatibel.

## 1. Siapkan proyek Supabase

1. Buat proyek pada Supabase Dashboard.
2. Buka **Connect** dan salin dua connection string:
   - **Transaction pooler** untuk `NUXT_SUPABASE_DATABASE_URL`.
   - **Direct connection** untuk `SUPABASE_DIRECT_URL`. Jika jaringan lokal
     tidak mendukung IPv6, gunakan **Session pooler** sebagai pengganti.
3. Buka **Project Settings > API** dan salin Project URL serta service-role key.
4. Salin `.env.example` menjadi `.env`, lalu isi seluruh nilai Supabase.

Service-role key hanya boleh berada di environment server. Jangan menambahkan
awalan `NUXT_PUBLIC_` dan jangan mengirimkannya ke browser.

## 2. Terapkan skema

Cara paling mudah: buka Supabase **SQL Editor**, salin seluruh isi
[`supabase/schema.sql`](../supabase/schema.sql), lalu tekan **Run**.

Alternatif melalui Drizzle CLI:

```bash
npm install
npm run db:migrate
npm run db:check
```

Pilih salah satu cara pembuatan skema. Jika sudah menjalankan `schema.sql` di
SQL Editor, jangan menjalankan migrasi awal Drizzle lagi pada database yang
sama; lanjutkan langsung ke `npm run db:migrate-data` dan `npm run db:check`.

Migrasi membuat tabel `pengguna`, `berita`, `slider`, dan `pinjam_gedung`, enum
PostgreSQL, foreign key berita, trigger `updated_at`, RLS tertutup, serta bucket
publik `knpi-media` dengan batas upload 5 MB.

## 3. Pindahkan data MySQL lama

Pastikan MySQL lama masih berjalan dan variabel `LEGACY_DB_*` sudah benar.
Kemudian jalankan:

```bash
npm run db:migrate-data
npm run db:check
```

Skrip bersifat idempotent: data di-upsert berdasarkan ID dan sequence PostgreSQL
diselaraskan kembali. File di `playground/public/uploads` turut diunggah ke
Supabase Storage; URL pada berita dan slider otomatis diganti. Jika file lokal
tidak ditemukan, URL lama dipertahankan dan peringatan ditampilkan.

Setelah hasil diverifikasi, simpan backup MySQL untuk masa retensi yang sesuai
sebelum menonaktifkan database lama.

## 4. Instalasi baru tanpa data MySQL

Untuk proyek baru, lewati migrasi data dan buat admin pertama:

```bash
npm run db:migrate
npm run db:seed
npm run db:check
```

Atur `SEED_ADMIN_PASSWORD` sebelum menjalankan seed. Seed tidak akan menimpa
akun `admin` yang sudah ada.

## Verifikasi aplikasi

```bash
npm run lint
npm run test:types
npm test
npm run build
```

Pengujian live Supabase (`db:migrate`, `db:migrate-data`, dan `db:check`)
membutuhkan kredensial proyek yang valid dan sengaja tidak dijalankan terhadap
proyek eksternal tanpa konfigurasi pemilik.
