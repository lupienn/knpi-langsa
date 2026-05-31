import { desc, eq } from 'drizzle-orm'
import { useDB } from '../../db/index'
import { berita, pengguna } from '../../db/schema'

/**
 * Endpoint publik untuk menampilkan berita yang sudah diterbitkan (status = 'terbit')
 * Digunakan oleh halaman landing page tanpa memerlukan autentikasi.
 */
export default defineEventHandler(async () => {
  const db = useDB()

  const hasil = await db
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
    .where(eq(berita.status, 'terbit'))
    .orderBy(desc(berita.createdAt))
    .limit(10)

  return { berhasil: true, data: hasil }
})
