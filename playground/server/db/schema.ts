import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const peranPengguna = pgEnum('peran_pengguna', ['admin', 'pengurus', 'anggota'])
export const kategoriBerita = pgEnum('kategori_berita', ['kegiatan', 'pengumuman', 'artikel'])
export const statusBerita = pgEnum('status_berita', ['draf', 'terbit'])
export const statusPinjamGedung = pgEnum('status_pinjam_gedung', ['menunggu', 'disetujui', 'ditolak'])

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}

// Tabel pengguna
export const pengguna = pgTable('pengguna', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  peran: peranPengguna('peran').default('anggota').notNull(),
  ...timestamps,
})

export type Pengguna = typeof pengguna.$inferSelect
export type PenggunaBaru = typeof pengguna.$inferInsert

// Tabel berita
export const berita = pgTable('berita', {
  id: serial('id').primaryKey(),
  judul: varchar('judul', { length: 255 }).notNull(),
  ringkasan: varchar('ringkasan', { length: 500 }).notNull(),
  konten: text('konten').notNull(),
  kategori: kategoriBerita('kategori').default('kegiatan').notNull(),
  gambarUrl: varchar('gambar_url', { length: 500 }),
  status: statusBerita('status').default('draf').notNull(),
  penulisId: integer('penulis_id')
    .notNull()
    .references(() => pengguna.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  ...timestamps,
})

export type Berita = typeof berita.$inferSelect
export type BeritaBaru = typeof berita.$inferInsert

// Tabel slider beranda
export const slider = pgTable('slider', {
  id: serial('id').primaryKey(),
  judul: varchar('judul', { length: 255 }).notNull(),
  subjudul: varchar('subjudul', { length: 255 }).notNull().default(''),
  deskripsi: text('deskripsi'),
  gambarUrl: varchar('gambar_url', { length: 500 }).notNull(),
  urutan: integer('urutan').default(0).notNull(),
  aktif: boolean('aktif').default(true).notNull(),
  ...timestamps,
})

export type Slider = typeof slider.$inferSelect
export type SliderBaru = typeof slider.$inferInsert

// Tabel historis tetap dipertahankan agar data MySQL lama tidak hilang.
export const pinjamGedung = pgTable('pinjam_gedung', {
  id: serial('id').primaryKey(),
  namaPemohon: varchar('nama_pemohon', { length: 255 }).notNull(),
  organisasi: varchar('organisasi', { length: 255 }).notNull(),
  noHp: varchar('no_hp', { length: 20 }).notNull(),
  email: varchar('email', { length: 255 }),
  keperluan: varchar('keperluan', { length: 500 }).notNull(),
  keterangan: text('keterangan'),
  tanggalMulai: date('tanggal_mulai').notNull(),
  tanggalSelesai: date('tanggal_selesai').notNull(),
  status: statusPinjamGedung('status').default('menunggu').notNull(),
  catatanAdmin: text('catatan_admin'),
  ...timestamps,
})

export type PinjamGedung = typeof pinjamGedung.$inferSelect
export type PinjamGedungBaru = typeof pinjamGedung.$inferInsert
