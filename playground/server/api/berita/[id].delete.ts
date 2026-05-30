import { eq } from 'drizzle-orm'
import { useDB } from '../../db/index'
import { berita } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const penggunaLogin = event.context.pengguna
  if (!penggunaLogin) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak terautentikasi.' })
  }

  const id = Number(getRouterParam(event, 'id'))
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const db = useDB()

  const existing = await db.select({ id: berita.id }).from(berita).where(eq(berita.id, id)).limit(1)
  if (!existing.length) {
    throw createError({ statusCode: 404, statusMessage: 'Berita tidak ditemukan.' })
  }

  await db.delete(berita).where(eq(berita.id, id))

  return { berhasil: true, pesan: 'Berita berhasil dihapus.' }
})
