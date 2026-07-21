import { asc, eq } from 'drizzle-orm'
import { useDB } from '../../db/index'
import { slider } from '../../db/schema'

/**
 * GET /api/publik/slider
 * Endpoint publik — mengembalikan daftar slide yang aktif,
 * diurutkan berdasarkan kolom `urutan`.
 * Tidak memerlukan autentikasi.
 */
export default defineEventHandler(async () => {
  const db = useDB()

  const data = await db
    .select()
    .from(slider)
    .where(eq(slider.aktif, 1))
    .orderBy(asc(slider.urutan))

  return { berhasil: true, data }
})
