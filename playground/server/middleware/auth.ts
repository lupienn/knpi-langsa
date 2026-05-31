import { verifyJWT } from '../utils/jwt'

export default defineEventHandler(async (event) => {
  const protectedPaths = ['/api/auth/me', '/api/dashboard', '/api/berita', '/api/pinjam-gedung', '/api/upload']
  const path = event.path
  const method = event.method

  const isProtected = protectedPaths.some(p => path.startsWith(p))
  if (!isProtected) return

  // Izinkan POST publik untuk pengajuan pinjam gedung (tanpa login)
  if (path.startsWith('/api/pinjam-gedung') && method === 'POST' && !path.includes('/')) return

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
