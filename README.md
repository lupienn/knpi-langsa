# Sistem Informasi DPD KNPI Kota Langsa

Website resmi Dewan Pengurus Daerah Komite Nasional Pemuda Indonesia (DPD KNPI) Kota Langsa. Dibangun sebagai sistem informasi terpadu yang mencakup portal publik dan panel administrasi untuk pengelolaan konten organisasi.

---

## Fitur Utama

### Portal Publik

- Halaman beranda dengan hero slider dinamis
- Profil dewan pengurus (Ketua, Sekretaris, Bendahara)
- Visi, misi, dan program kerja organisasi
- Berita dan informasi terkini
- Tampilan responsif dengan dukungan mode gelap dan terang

### Panel Administrasi

- Login admin dengan autentikasi berbasis JWT
- Kelola berita: tambah, edit, hapus, ubah status publikasi
- Kelola slider beranda: tambah, edit, aktifkan/nonaktifkan slide
- Unggah gambar sampul artikel dan gambar slider
- Dashboard statistik ringkas warta dan sistem

---

## Teknologi yang Digunakan

### Frontend

- Nuxt 4 (Vue 3 + Composition API)
- Tailwind CSS
- Pinia (state management)
- Lucide Icons
- TypeScript

### Backend

- Nuxt Nitro (server-side API routes)
- Drizzle ORM
- Supabase PostgreSQL
- Supabase Storage
- bcryptjs (hashing password)
- jose (JWT authentication)

---

## Struktur Proyek

```
knpi-langsa/
├── playground/                  # Aplikasi utama Nuxt
│   ├── assets/                  # Aset statis (CSS, gambar, logo)
│   ├── pages/
│   │   ├── index.vue            # Halaman publik beranda
│   │   ├── login.vue            # Halaman login admin
│   │   ├── berita/[id].vue      # Halaman detail artikel
│   │   └── dashboard/           # Halaman-halaman admin
│   │       ├── index.vue
│   │       ├── berita.vue
│   │       └── slider.vue
│   ├── server/
│   │   ├── api/                 # API routes (Nitro)
│   │   │   ├── auth/
│   │   │   ├── berita/
│   │   │   ├── slider/
│   │   │   ├── publik/
│   │   │   └── upload.post.ts
│   │   ├── db/
│   │   │   ├── index.ts         # Koneksi database (Drizzle)
│   │   │   ├── schema.ts        # Skema tabel
│   │   │   └── seed.ts          # Script seed data awal
│   │   └── middleware/          # Middleware autentikasi
│   ├── stores/                  # Pinia stores
│   └── public/uploads/          # Sumber file lama saat migrasi Storage
└── README.md
```

---

## Cara Menjalankan

### Prasyarat

- Node.js 18 atau lebih baru
- Proyek Supabase
- MySQL lama hanya diperlukan bila memindahkan data existing

### 1. Clone repository

```bash
git clone https://github.com/lupienn/knpi-langsa.git
cd knpi-langsa
```

### 2. Install dependensi

```bash
npm install
```

### 3. Konfigurasi environment

Buat `.env` dari `.env.example`, kemudian isi connection string, Project URL,
service-role key, dan JWT secret. Panduan lengkap tersedia di
[`docs/SUPABASE_MIGRATION.md`](docs/SUPABASE_MIGRATION.md).

```env
NUXT_SUPABASE_DATABASE_URL=postgresql://...
SUPABASE_DIRECT_URL=postgresql://...
NUXT_SUPABASE_URL=https://PROJECT_REF.supabase.co
NUXT_SUPABASE_SERVICE_ROLE_KEY=...
NUXT_JWT_SECRET=...
```

### 4. Buat tabel database

```bash
npm run db:migrate
```

### 5. Isi data awal (seed)

```bash
npm run db:seed
```

Perintah ini membuat akun admin awal jika belum ada. Password diambil dari
`SEED_ADMIN_PASSWORD`.

### 6. Jalankan aplikasi

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`.

---

## Akun Admin Default

Proses seed akan otomatis membuat satu akun administrator bawaan. Gunakan kredensial di bawah ini untuk pertama kali masuk ke panel admin:

| Field    | Nilai    |
|----------|----------|
| Username | admin    |
| Password | Nilai `SEED_ADMIN_PASSWORD` |

---

## Perintah Tersedia

| Perintah              | Keterangan                              |
|-----------------------|-----------------------------------------|
| `npm run dev`         | Jalankan server pengembangan            |
| `npm run build`       | Build untuk produksi                    |
| `npm run db:seed`     | Isi akun admin awal ke Supabase         |
| `npm run db:migrate`  | Terapkan migrasi PostgreSQL Supabase    |
| `npm run db:migrate-data` | Salin data dan upload MySQL lama    |
| `npm run db:check`    | Periksa koneksi, skema, dan jumlah data |
| `npm run db:generate` | Generate migrasi Drizzle                |
| `npm run db:push`     | Sinkronkan skema langsung ke PostgreSQL |
| `npm run lint`        | Periksa kode dengan ESLint              |

---

## Author

GitHub: [https://github.com/lupienn](https://github.com/lupienn)
