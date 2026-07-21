import { asc } from 'drizzle-orm'
import { useDB } from '../../db/index'
import { slider } from '../../db/schema'

/**
 * GET /api/slider
 * Ambil semua data slider (termasuk yang nonaktif) untuk dashboard admin.
 */
export default defineEventHandler(async (event) => {
  const penggunaLogin = event.context.pengguna
  if (!penggunaLogin) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak terautentikasi.' })
  }

  const db = useDB()
  const data = await db.select().from(slider).orderBy(asc(slider.urutan))

  return { berhasil: true, data }
})
