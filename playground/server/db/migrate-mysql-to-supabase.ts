/**
 * Menyalin seluruh data MySQL lama ke PostgreSQL Supabase secara idempotent.
 * Jalankan setelah `npm run db:migrate`.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { access, readFile } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import mysql, { type RowDataPacket } from 'mysql2/promise'
import postgres from 'postgres'
import { createPostgresOptions, validateDatabaseUrl } from './postgres-options'

dotenv.config({ path: fileURLToPath(new URL('../../../.env', import.meta.url)) })

interface PenggunaRow extends RowDataPacket {
  id: number
  nama: string
  username: string
  password: string
  peran: 'admin' | 'pengurus' | 'anggota'
  created_at: Date
  updated_at: Date
}

interface BeritaRow extends RowDataPacket {
  id: number
  judul: string
  ringkasan: string
  konten: string
  kategori: 'kegiatan' | 'pengumuman' | 'artikel'
  gambar_url: string | null
  status: 'draf' | 'terbit'
  penulis_id: number
  created_at: Date
  updated_at: Date
}

interface SliderRow extends RowDataPacket {
  id: number
  judul: string
  subjudul: string
  deskripsi: string | null
  gambar_url: string
  urutan: number
  aktif: number | boolean
  created_at: Date
  updated_at: Date
}

interface PinjamGedungRow extends RowDataPacket {
  id: number
  nama_pemohon: string
  organisasi: string
  no_hp: string
  email: string | null
  keperluan: string
  keterangan: string | null
  tanggal_mulai: string
  tanggal_selesai: string
  status: 'menunggu' | 'disetujui' | 'ditolak'
  catatan_admin: string | null
  created_at: Date
  updated_at: Date
}

const uploadCache = new Map<string, string>()
const uploadsDir = fileURLToPath(new URL('../../public/uploads/', import.meta.url))

function contentTypeFor(fileName: string): string {
  const extension = extname(fileName).toLowerCase()
  return ({
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  } as Record<string, string>)[extension] || 'application/octet-stream'
}

async function migrateImageUrl(
  oldUrl: string | null,
  storage: SupabaseClient | null,
  bucket: string,
): Promise<string | null> {
  if (!oldUrl || !oldUrl.startsWith('/uploads/') || !storage) return oldUrl
  if (uploadCache.has(oldUrl)) return uploadCache.get(oldUrl)!

  const fileName = basename(oldUrl)
  const localPath = join(uploadsDir, fileName)

  try {
    await access(localPath)
  }
  catch {
    console.warn(`⚠️  File lokal tidak ditemukan, URL dipertahankan: ${oldUrl}`)
    return oldUrl
  }

  const objectPath = `legacy/${fileName}`
  const file = await readFile(localPath)
  const { error } = await storage.storage.from(bucket).upload(objectPath, file, {
    contentType: contentTypeFor(fileName),
    cacheControl: '31536000',
    upsert: true,
  })

  if (error) throw new Error(`Upload ${fileName} gagal: ${error.message}`)

  const { data } = storage.storage.from(bucket).getPublicUrl(objectPath)
  uploadCache.set(oldUrl, data.publicUrl)
  return data.publicUrl
}

async function tableExists(connection: mysql.Connection, tableName: string): Promise<boolean> {
  const [rows] = await connection.query<RowDataPacket[]>(
    'SELECT 1 FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ? LIMIT 1',
    [tableName],
  )
  return rows.length > 0
}

async function run() {
  const targetUrl = process.env.NUXT_SUPABASE_DATABASE_URL || process.env.SUPABASE_DIRECT_URL
  if (!targetUrl) throw new Error('NUXT_SUPABASE_DATABASE_URL belum diatur.')
  validateDatabaseUrl(targetUrl)

  const source = await mysql.createConnection({
    host: process.env.LEGACY_DB_HOST || process.env.NUXT_DB_HOST || '127.0.0.1',
    port: Number(process.env.LEGACY_DB_PORT || process.env.NUXT_DB_PORT || 3306),
    database: process.env.LEGACY_DB_DATABASE || process.env.NUXT_DB_DATABASE || 'knpi-langsa',
    user: process.env.LEGACY_DB_USERNAME || process.env.NUXT_DB_USERNAME || 'root',
    password: process.env.LEGACY_DB_PASSWORD || process.env.NUXT_DB_PASSWORD || '',
  })
  const target = postgres(targetUrl, createPostgresOptions(targetUrl, 1))

  const supabaseUrl = process.env.NUXT_SUPABASE_URL
  const serviceRoleKey = process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY
  const storage = supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
    : null
  const bucket = process.env.NUXT_SUPABASE_STORAGE_BUCKET || 'knpi-media'

  if (!storage) {
    console.warn('⚠️  Kredensial Storage tidak lengkap; file lokal tidak diunggah dan URL lama dipertahankan.')
  }

  try {
    const targetReady = await target<{ exists: string | null }[]>`
      select to_regclass('public.pengguna')::text as exists
    `
    if (!targetReady[0]?.exists) {
      throw new Error('Tabel target belum ada. Jalankan `npm run db:migrate` terlebih dahulu.')
    }

    const penggunaRows = await tableExists(source, 'pengguna')
      ? (await source.query<PenggunaRow[]>('SELECT * FROM pengguna'))[0]
      : []
    const beritaRows = await tableExists(source, 'berita')
      ? (await source.query<BeritaRow[]>('SELECT * FROM berita'))[0]
      : []
    const sliderRows = await tableExists(source, 'slider')
      ? (await source.query<SliderRow[]>('SELECT * FROM slider'))[0]
      : []
    const pinjamRows = await tableExists(source, 'pinjam_gedung')
      ? (await source.query<PinjamGedungRow[]>('SELECT * FROM pinjam_gedung'))[0]
      : []

    for (const row of beritaRows) row.gambar_url = await migrateImageUrl(row.gambar_url, storage, bucket)
    for (const row of sliderRows) row.gambar_url = (await migrateImageUrl(row.gambar_url, storage, bucket)) || row.gambar_url

    await target.begin(async (sql) => {
      for (const row of penggunaRows) {
        await sql`
          insert into public.pengguna
            (id, nama, username, password, peran, created_at, updated_at)
          values
            (${row.id}, ${row.nama}, ${row.username}, ${row.password}, ${row.peran}, ${row.created_at}, ${row.updated_at})
          on conflict (id) do update set
            nama = excluded.nama,
            username = excluded.username,
            password = excluded.password,
            peran = excluded.peran,
            created_at = excluded.created_at,
            updated_at = excluded.updated_at
        `
      }

      for (const row of beritaRows) {
        await sql`
          insert into public.berita
            (id, judul, ringkasan, konten, kategori, gambar_url, status, penulis_id, created_at, updated_at)
          values
            (${row.id}, ${row.judul}, ${row.ringkasan}, ${row.konten}, ${row.kategori}, ${row.gambar_url}, ${row.status}, ${row.penulis_id}, ${row.created_at}, ${row.updated_at})
          on conflict (id) do update set
            judul = excluded.judul,
            ringkasan = excluded.ringkasan,
            konten = excluded.konten,
            kategori = excluded.kategori,
            gambar_url = excluded.gambar_url,
            status = excluded.status,
            penulis_id = excluded.penulis_id,
            created_at = excluded.created_at,
            updated_at = excluded.updated_at
        `
      }

      for (const row of sliderRows) {
        await sql`
          insert into public.slider
            (id, judul, subjudul, deskripsi, gambar_url, urutan, aktif, created_at, updated_at)
          values
            (${row.id}, ${row.judul}, ${row.subjudul || ''}, ${row.deskripsi}, ${row.gambar_url}, ${row.urutan}, ${Boolean(row.aktif)}, ${row.created_at}, ${row.updated_at})
          on conflict (id) do update set
            judul = excluded.judul,
            subjudul = excluded.subjudul,
            deskripsi = excluded.deskripsi,
            gambar_url = excluded.gambar_url,
            urutan = excluded.urutan,
            aktif = excluded.aktif,
            created_at = excluded.created_at,
            updated_at = excluded.updated_at
        `
      }

      for (const row of pinjamRows) {
        await sql`
          insert into public.pinjam_gedung
            (id, nama_pemohon, organisasi, no_hp, email, keperluan, keterangan, tanggal_mulai, tanggal_selesai, status, catatan_admin, created_at, updated_at)
          values
            (${row.id}, ${row.nama_pemohon}, ${row.organisasi}, ${row.no_hp}, ${row.email}, ${row.keperluan}, ${row.keterangan}, ${row.tanggal_mulai}, ${row.tanggal_selesai}, ${row.status}, ${row.catatan_admin}, ${row.created_at}, ${row.updated_at})
          on conflict (id) do update set
            nama_pemohon = excluded.nama_pemohon,
            organisasi = excluded.organisasi,
            no_hp = excluded.no_hp,
            email = excluded.email,
            keperluan = excluded.keperluan,
            keterangan = excluded.keterangan,
            tanggal_mulai = excluded.tanggal_mulai,
            tanggal_selesai = excluded.tanggal_selesai,
            status = excluded.status,
            catatan_admin = excluded.catatan_admin,
            created_at = excluded.created_at,
            updated_at = excluded.updated_at
        `
      }

      await sql`select setval(pg_get_serial_sequence('public.pengguna', 'id'), coalesce(max(id), 1), max(id) is not null) from public.pengguna`
      await sql`select setval(pg_get_serial_sequence('public.berita', 'id'), coalesce(max(id), 1), max(id) is not null) from public.berita`
      await sql`select setval(pg_get_serial_sequence('public.slider', 'id'), coalesce(max(id), 1), max(id) is not null) from public.slider`
      await sql`select setval(pg_get_serial_sequence('public.pinjam_gedung', 'id'), coalesce(max(id), 1), max(id) is not null) from public.pinjam_gedung`
    })

    console.log('✅ Migrasi data selesai:')
    console.log(`   pengguna      : ${penggunaRows.length}`)
    console.log(`   berita        : ${beritaRows.length}`)
    console.log(`   slider        : ${sliderRows.length}`)
    console.log(`   pinjam_gedung : ${pinjamRows.length}`)
  }
  finally {
    await source.end()
    await target.end({ timeout: 5 })
  }
}

run().catch((error) => {
  console.error('❌ Migrasi MySQL → Supabase gagal:', error)
  process.exitCode = 1
})
