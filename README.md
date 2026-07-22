# Sistem Informasi DPD KNPI Kota Langsa

Website resmi Dewan Pengurus Daerah Komite Nasional Pemuda Indonesia (DPD KNPI) Kota Langsa. Dibangun sebagai sistem informasi terpadu yang mencakup portal publik dan panel administrasi untuk pengelolaan konten organisasi.

---

## Fitur Utama

### Portal Publik

- Halaman beranda dengan hero slider dinamis
- Profil dewan pengurus (Ketua, Sekretaris, Bendahara)
- Visi, misi, dan program kerja organisasi
- Berita dan informasi terkini
- Formulir pengajuan pinjam pakai Graha Pemuda
- Tampilan responsif dengan dukungan mode gelap dan terang

### Panel Administrasi

- Login admin dengan autentikasi berbasis JWT
- Kelola berita: tambah, edit, hapus, ubah status publikasi
- Kelola slider beranda: tambah, edit, aktifkan/nonaktifkan slide
- Kelola pengajuan pinjam gedung: lihat, setujui, atau tolak permohonan
- Unggah gambar sampul artikel dan gambar slider
- Dashboard statistik ringkas

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
- MySQL 8
- bcryptjs (enkripsi password)
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
│   │       ├── slider.vue
│   │       └── pinjam-gedung.vue
│   ├── server/
│   │   ├── api/                 # API routes (Nitro)
│   │   │   ├── auth/
│   │   │   ├── berita/
│   │   │   ├── slider/
│   │   │   ├── pinjam-gedung/
│   │   │   ├── publik/
│   │   │   └── upload.post.ts
│   │   ├── db/
│   │   │   ├── index.ts         # Koneksi database (Drizzle)
│   │   │   ├── schema.ts        # Skema tabel
│   │   │   └── seed.ts          # Script seed data awal
│   │   └── middleware/          # Middleware autentikasi
│   ├── stores/                  # Pinia stores
│   └── public/
│       └── uploads/             # Direktori file gambar yang diunggah
└── README.md
```

---

## Cara Menjalankan

### Prasyarat

- Node.js 18 atau lebih baru
- MySQL 8 berjalan di sistem lokal

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

Buat file `.env` dengan isi berikut:

```env
NUXT_DB_HOST=127.0.0.1
NUXT_DB_PORT=3306
NUXT_DB_DATABASE=knpi-langsa
NUXT_DB_USERNAME=root
NUXT_DB_PASSWORD=

NUXT_JWT_SECRET=k9x2mPqL8nRvTwZaYcDfHjBsEuNgOiXl (sebagai contoh)
```

### 4. Buat tabel database

```bash
cd playground
npx drizzle-kit push
```

### 5. Isi data awal (seed)

```bash
npm run seed
```

Perintah ini akan membuat akun admin default dan data contoh.

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
| Password | admin123 |

> Segera ganti password akun ini setelah berhasil masuk pertama kali demi keamanan sistem.

---

## Perintah Tersedia

| Perintah              | Keterangan                              |
|-----------------------|-----------------------------------------|
| `npm run dev`         | Jalankan server pengembangan            |
| `npm run build`       | Build untuk produksi                    |
| `npm run seed`        | Isi data awal ke database               |
| `npm run db:generate` | Generate migrasi Drizzle                |
| `npm run db:push`     | Terapkan skema database ke MySQL        |
| `npm run lint`        | Periksa kode dengan ESLint              |

---

## Author

GitHub: [https://github.com/lupienn](https://github.com/lupienn)