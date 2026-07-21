import { eq } from 'drizzle-orm'
import { useDB } from '../../db/index'
import { slider } from '../../db/schema'

/**
 * DELETE /api/slider/:id
 * Hapus slide dari database berdasarkan ID.
 */
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

  const existing = await db.select({ id: slider.id }).from(slider).where(eq(slider.id, id)).limit(1)
  if (!existing.length) {
    throw createError({ statusCode: 404, statusMessage: 'Slide tidak ditemukan.' })
  }

  await db.delete(slider).where(eq(slider.id, id))

  return { berhasil: true, pesan: 'Slide berhasil dihapus.' }
})
