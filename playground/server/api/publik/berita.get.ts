import { and, desc, eq, like, or } from 'drizzle-orm'
import { useDB } from '../../db/index'
import { berita, pengguna } from '../../db/schema'

/**
 * Endpoint publik untuk menampilkan berita yang sudah diterbitkan (status = 'terbit')
 * Mendukung filter kategori, pencarian judul/ringkasan, serta batasan limit dinamis.
 */
export default defineEventHandler(async (event) => {
  const db = useDB()
  const query = getQuery(event)
  const limitParam = query.limit ? Number(query.limit) : undefined
  const kategoriParam = query.kategori ? String(query.kategori).trim().toLowerCase() : undefined
  const cariParam = query.cari ? String(query.cari).trim() : undefined

  const conditions = [eq(berita.status, 'terbit')]

  if (kategoriParam && kategoriParam !== 'semua' && ['kegiatan', 'pengumuman', 'artikel'].includes(kategoriParam)) {
    conditions.push(eq(berita.kategori, kategoriParam as 'kegiatan' | 'pengumuman' | 'artikel'))
  }

  if (cariParam) {
    conditions.push(
      or(
        like(berita.judul, `%${cariParam}%`),
        like(berita.ringkasan, `%${cariParam}%`),
      )!,
    )
  }

  const baseQuery = db
    .select({
      id: berita.id,
      judul: berita.judul,
      ringkasan: berita.ringkasan,
      kategori: berita.kategori,
      gambarUrl: berita.gambarUrl,
      penulis: pengguna.nama,
      createdAt: berita.createdAt,
    })
    .from(berita)
    .leftJoin(pengguna, eq(berita.penulisId, pengguna.id))
    .where(and(...conditions))
    .orderBy(desc(berita.createdAt))

  const hasil = (limitParam && limitParam > 0)
    ? await baseQuery.limit(limitParam)
    : await baseQuery

  return { berhasil: true, data: hasil, total: hasil.length }
})
