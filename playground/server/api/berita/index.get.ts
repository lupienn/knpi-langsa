import { desc, eq } from 'drizzle-orm'
import { useDB } from '../../db/index'
import { berita, pengguna } from '../../db/schema'

export default defineEventHandler(async () => {
  const db = useDB()

  const hasil = await db
    .select({
      id: berita.id,
      judul: berita.judul,
      ringkasan: berita.ringkasan,
      konten: berita.konten,
      kategori: berita.kategori,
      gambarUrl: berita.gambarUrl,
      status: berita.status,
      penulisId: berita.penulisId,
      penulis: pengguna.nama,
      createdAt: berita.createdAt,
      updatedAt: berita.updatedAt,
    })
    .from(berita)
    .leftJoin(pengguna, eq(berita.penulisId, pengguna.id))
    .orderBy(desc(berita.id))

  return { berhasil: true, data: hasil }
})
