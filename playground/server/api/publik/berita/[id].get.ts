import { eq } from 'drizzle-orm'
import { useDB } from '../../../db/index'
import { berita, pengguna } from '../../../db/schema'

/**
 * Endpoint publik untuk mengambil detail satu berita berdasarkan ID.
 * Hanya mengembalikan berita yang berstatus 'terbit'.
 */
export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const db = useDB()

  const hasil = await db
    .select({
      id: berita.id,
      judul: berita.judul,
      ringkasan: berita.ringkasan,
      konten: berita.konten,
      kategori: berita.kategori,
      gambarUrl: berita.gambarUrl,
      penulis: pengguna.nama,
      createdAt: berita.createdAt,
    })
    .from(berita)
    .leftJoin(pengguna, eq(berita.penulisId, pengguna.id))
    .where(eq(berita.id, id))
    .limit(1)

  if (!hasil.length) {
    throw createError({ statusCode: 404, statusMessage: 'Berita tidak ditemukan.' })
  }

  return { berhasil: true, data: hasil[0] }
})
