import { useDB } from '../../db/index'
import { pinjamGedung } from '../../db/schema'

export default defineEventHandler(async (event) => {
  // Endpoint ini bisa diakses publik (tanpa login) untuk mengajukan permohonan
  const body = await readBody(event)

  // Validasi
  if (!body.namaPemohon || !body.organisasi || !body.noHp || !body.keperluan || !body.tanggalMulai || !body.tanggalSelesai) {
    throw createError({ statusCode: 400, statusMessage: 'Nama pemohon, organisasi, no. HP, keperluan, tanggal mulai dan selesai wajib diisi.' })
  }

  const db = useDB()

  await db.insert(pinjamGedung).values({
    namaPemohon: body.namaPemohon,
    organisasi: body.organisasi,
    noHp: body.noHp,
    email: body.email || null,
    keperluan: body.keperluan,
    keterangan: body.keterangan || null,
    tanggalMulai: body.tanggalMulai,
    tanggalSelesai: body.tanggalSelesai,
  })

  return { berhasil: true, pesan: 'Permohonan pinjam pakai gedung berhasil dikirim.' }
})
