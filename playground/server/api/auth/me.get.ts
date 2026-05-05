import { eq } from 'drizzle-orm'
import { useDB } from '../../db/index'
import { pengguna } from '../../db/schema'

export default defineEventHandler(async (event) => {
  // Payload sudah diisi oleh middleware auth
  const penggunaLogin = event.context.pengguna

  if (!penggunaLogin) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak terautentikasi.' })
  }

  const db = useDB()
  const hasil = await db
    .select({
      id: pengguna.id,
      nama: pengguna.nama,
      username: pengguna.username,
      peran: pengguna.peran,
      createdAt: pengguna.createdAt,
    })
    .from(pengguna)
    .where(eq(pengguna.id, penggunaLogin.id))
    .limit(1)

  const user = hasil[0]
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'Pengguna tidak ditemukan.' })
  }

  return {
    berhasil: true,
    data: { pengguna: user },
  }
})
