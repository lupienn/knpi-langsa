import { mysqlTable, varchar, int, timestamp, mysqlEnum, text, date, tinyint } from 'drizzle-orm/mysql-core'

// Tabel pengguna
export const pengguna = mysqlTable('pengguna', {
  id: int('id').primaryKey().autoincrement(),
  nama: varchar('nama', { length: 255 }).notNull(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  peran: mysqlEnum('peran', ['admin', 'pengurus', 'anggota']).notNull().default('anggota'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export type Pengguna = typeof pengguna.$inferSelect
export type PenggunaBaru = typeof pengguna.$inferInsert

// Tabel berita
export const berita = mysqlTable('berita', {
  id: int('id').primaryKey().autoincrement(),
  judul: varchar('judul', { length: 255 }).notNull(),
  ringkasan: varchar('ringkasan', { length: 500 }).notNull(),
  konten: text('konten').notNull(),
  kategori: mysqlEnum('kategori', ['kegiatan', 'pengumuman', 'artikel']).notNull().default('kegiatan'),
  gambarUrl: varchar('gambar_url', { length: 500 }),
  status: mysqlEnum('status', ['draf', 'terbit']).notNull().default('draf'),
  penulisId: int('penulis_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export type Berita = typeof berita.$inferSelect
export type BeritaBaru = typeof berita.$inferInsert

// Tabel pinjam pakai gedung
export const pinjamGedung = mysqlTable('pinjam_gedung', {
  id: int('id').primaryKey().autoincrement(),
  namaPemohon: varchar('nama_pemohon', { length: 255 }).notNull(),
  organisasi: varchar('organisasi', { length: 255 }).notNull(),
  noHp: varchar('no_hp', { length: 20 }).notNull(),
  email: varchar('email', { length: 255 }),
  keperluan: varchar('keperluan', { length: 500 }).notNull(),
  keterangan: text('keterangan'),
  tanggalMulai: date('tanggal_mulai').notNull(),
  tanggalSelesai: date('tanggal_selesai').notNull(),
  status: mysqlEnum('status', ['menunggu', 'disetujui', 'ditolak']).notNull().default('menunggu'),
  catatanAdmin: text('catatan_admin'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export type PinjamGedung = typeof pinjamGedung.$inferSelect
export type PinjamGedungBaru = typeof pinjamGedung.$inferInsert

// Tabel slider beranda
export const slider = mysqlTable('slider', {
  id: int('id').primaryKey().autoincrement(),
  judul: varchar('judul', { length: 255 }).notNull(),
  subjudul: varchar('subjudul', { length: 255 }).notNull().default(''),
  deskripsi: text('deskripsi'),
  gambarUrl: varchar('gambar_url', { length: 500 }).notNull(),
  urutan: int('urutan').notNull().default(0),
  aktif: tinyint('aktif').notNull().default(1),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export type Slider = typeof slider.$inferSelect
export type SliderBaru = typeof slider.$inferInsert
