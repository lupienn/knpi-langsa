import { randomUUID } from 'node:crypto'
import { extensionForImageType, isSupportedImageType } from '../utils/storage-file'
import { useSupabaseAdmin } from '../utils/supabase'

/**
 * Endpoint untuk mengunggah file gambar.
 * File disimpan ke bucket publik Supabase Storage dan endpoint mengembalikan
 * public URL yang dapat langsung disimpan pada tabel berita/slider.
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
  if (!isSupportedImageType(file.type)) {
    throw createError({ statusCode: 400, statusMessage: 'Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.' })
  }

  // Validasi ukuran (maks 5MB)
  const maxSize = 5 * 1024 * 1024
  if (file.data.length > maxSize) {
    throw createError({ statusCode: 400, statusMessage: 'Ukuran file melebihi batas maksimal 5MB.' })
  }

  // Buat nama file unik
  const config = useRuntimeConfig()
  const bucket = String(config.supabaseStorageBucket || 'knpi-media')
  const ext = extensionForImageType(file.type)
  const objectPath = `gambar/${Date.now()}-${randomUUID()}.${ext}`
  const supabase = useSupabaseAdmin()

  const { error } = await supabase.storage
    .from(bucket)
    .upload(objectPath, file.data, {
      contentType: file.type,
      cacheControl: '31536000',
      upsert: false,
    })

  if (error) {
    console.error('Supabase Storage upload gagal:', error.message)
    throw createError({
      statusCode: 502,
      statusMessage: 'Gagal mengunggah gambar ke penyimpanan.',
    })
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath)
  const url = data.publicUrl
  return { berhasil: true, url }
})
