import { useDB } from '../../db/index'
import { berita } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const penggunaLogin = event.context.pengguna
  if (!penggunaLogin) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak terautentikasi.' })
  }

  const body = await readBody(event)

  // Validasi
  if (!body.judul || !body.ringkasan || !body.konten) {
    throw createError({ statusCode: 400, statusMessage: 'Judul, ringkasan, dan konten wajib diisi.' })
  }

  const db = useDB()

  await db.insert(berita).values({
    judul: body.judul,
    ringkasan: body.ringkasan,
    konten: body.konten,
    kategori: body.kategori || 'kegiatan',
    gambarUrl: body.gambarUrl || null,
    status: body.status || 'draf',
    penulisId: penggunaLogin.id,
  })

  return { berhasil: true, pesan: 'Berita berhasil ditambahkan.' }
})
