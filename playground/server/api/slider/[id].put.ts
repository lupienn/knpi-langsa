import { eq } from 'drizzle-orm'
import { useDB } from '../../db/index'
import { slider } from '../../db/schema'

/**
 * PUT /api/slider/:id
 * Edit data slide yang sudah ada.
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

  const body = await readBody(event)

  if (!body.judul || !body.gambarUrl) {
    throw createError({ statusCode: 400, statusMessage: 'Judul dan gambar wajib diisi.' })
  }

  const db = useDB()

  const existing = await db.select({ id: slider.id }).from(slider).where(eq(slider.id, id)).limit(1)
  if (!existing.length) {
    throw createError({ statusCode: 404, statusMessage: 'Slide tidak ditemukan.' })
  }

  await db.update(slider).set({
    judul: body.judul,
    subjudul: body.subjudul || '',
    deskripsi: body.deskripsi || null,
    gambarUrl: body.gambarUrl,
    urutan: body.urutan ?? 0,
    aktif: body.aktif !== undefined ? (body.aktif ? 1 : 0) : 1,
  }).where(eq(slider.id, id))

  return { berhasil: true, pesan: 'Slide berhasil diperbarui.' }
})
