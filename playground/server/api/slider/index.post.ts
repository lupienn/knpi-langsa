import { useDB } from '../../db/index'
import { slider } from '../../db/schema'

/**
 * POST /api/slider
 * Tambah slide baru ke database.
 */
export default defineEventHandler(async (event) => {
  const penggunaLogin = event.context.pengguna
  if (!penggunaLogin) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak terautentikasi.' })
  }

  const body = await readBody(event)

  if (!body.judul || !body.gambarUrl) {
    throw createError({ statusCode: 400, statusMessage: 'Judul dan gambar wajib diisi.' })
  }

  const db = useDB()

  await db.insert(slider).values({
    judul: body.judul,
    subjudul: body.subjudul || '',
    deskripsi: body.deskripsi || null,
    gambarUrl: body.gambarUrl,
    urutan: body.urutan ?? 0,
    aktif: body.aktif !== undefined ? (body.aktif ? 1 : 0) : 1,
  })

  return { berhasil: true, pesan: 'Slide berhasil ditambahkan.' }
})
