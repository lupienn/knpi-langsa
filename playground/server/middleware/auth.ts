import { verifyJWT } from '../utils/jwt'

export default defineEventHandler(async (event) => {
  const protectedPaths = ['/api/auth/me', '/api/dashboard']
  const path = event.path

  const isProtected = protectedPaths.some(p => path.startsWith(p))
  if (!isProtected) return

  const authHeader = getHeader(event, 'authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Token tidak ditemukan. Silakan login kembali.' })
  }

  const token = authHeader.slice(7)

  try {
    const payload = await verifyJWT(token)
    event.context.pengguna = payload
  }
  catch {
    throw createError({ statusCode: 401, statusMessage: 'Token tidak valid atau sudah kadaluarsa. Silakan login kembali.' })
  }
})
