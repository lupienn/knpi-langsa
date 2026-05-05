import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { useDB } from '../../db/index'
import { pengguna } from '../../db/schema'
import { signJWT } from '../../utils/jwt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.username || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username dan password wajib diisi.',
    })
  }

  const db = useDB()

  // Cari pengguna berdasarkan username
  const hasil = await db
    .select()
    .from(pengguna)
    .where(eq(pengguna.username, body.username))
    .limit(1)

  const user = hasil[0]

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Username atau password salah.',
    })
  }

  // Verifikasi password
  const passwordValid = await bcrypt.compare(body.password, user.password)
  if (!passwordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Username atau password salah.',
    })
  }

  // Generate JWT token
  const token = await signJWT({
    id: user.id,
    username: user.username,
    peran: user.peran,
  })

  // Return tanpa password
  const { password: _, ...userAman } = user

  return {
    berhasil: true,
    pesan: 'Login berhasil.',
    data: {
      token,
      pengguna: userAman,
    },
  }
})
