import { randomUUID } from 'crypto'
import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'

/**
 * Endpoint untuk mengunggah file gambar.
 * File disimpan ke folder public/uploads/ agar bisa diakses secara publik.
 * Mengembalikan URL relatif gambar yang bisa langsung digunakan.
 */
export default defineEventHandler(async (event) => {
  // Pastikan hanya user yang login bisa upload
  const penggunaLogin = event.context.pengguna
  if (!penggunaLogin) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak terautentikasi.' })
  }

  // Baca multipart form data
  const items = await readMultipartFormData(event)

  if (!items || items.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada file yang diunggah.' })
  }

  const file = items.find(item => item.name === 'gambar')
  if (!file || !file.data || !file.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Field "gambar" tidak ditemukan.' })
  }

  // Validasi tipe file
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (file.type && !allowedTypes.includes(file.type)) {
    throw createError({ statusCode: 400, statusMessage: 'Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.' })
  }

  // Validasi ukuran (maks 5MB)
  const maxSize = 5 * 1024 * 1024
  if (file.data.length > maxSize) {
    throw createError({ statusCode: 400, statusMessage: 'Ukuran file melebihi batas maksimal 5MB.' })
  }

  // Buat nama file unik
  const ext = extname(file.filename) || '.jpg'
  const namaFile = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`

  // Simpan ke public/uploads/ (pastikan masuk ke folder playground jika script dijalankan dari root)
  const baseDir = process.cwd().endsWith('playground') ? process.cwd() : join(process.cwd(), 'playground')
  const uploadDir = join(baseDir, 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })
  const filePath = join(uploadDir, namaFile)
  await writeFile(filePath, file.data)

  // Kembalikan URL relatif
  const url = `/uploads/${namaFile}`
  return { berhasil: true, url }
})
