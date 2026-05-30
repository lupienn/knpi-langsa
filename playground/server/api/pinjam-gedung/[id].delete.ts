import { eq } from 'drizzle-orm'
import { useDB } from '../../db/index'
import { pinjamGedung } from '../../db/schema'

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

  const existing = await db.select({ id: pinjamGedung.id }).from(pinjamGedung).where(eq(pinjamGedung.id, id)).limit(1)
  if (!existing.length) {
    throw createError({ statusCode: 404, statusMessage: 'Permohonan tidak ditemukan.' })
  }

  await db.delete(pinjamGedung).where(eq(pinjamGedung.id, id))

  return { berhasil: true, pesan: 'Permohonan berhasil dihapus.' }
})
