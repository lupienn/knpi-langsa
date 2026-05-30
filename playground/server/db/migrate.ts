import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

async function createTables() {
  const connection = await mysql.createConnection({
    host: process.env.NUXT_DB_HOST || '127.0.0.1',
    port: Number(process.env.NUXT_DB_PORT) || 3306,
    database: process.env.NUXT_DB_DATABASE || 'knpi-langsa',
    user: process.env.NUXT_DB_USERNAME || 'root',
    password: process.env.NUXT_DB_PASSWORD || '',
  })

  console.log('📦 Membuat tabel berita...')
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS berita (
      id INT AUTO_INCREMENT PRIMARY KEY,
      judul VARCHAR(255) NOT NULL,
      ringkasan VARCHAR(500) NOT NULL,
      konten TEXT NOT NULL,
      kategori ENUM('kegiatan', 'pengumuman', 'artikel') NOT NULL DEFAULT 'kegiatan',
      gambar_url VARCHAR(500),
      status ENUM('draf', 'terbit') NOT NULL DEFAULT 'draf',
      penulis_id INT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)
  console.log('✅ Tabel berita berhasil dibuat.')

  console.log('📦 Membuat tabel pinjam_gedung...')
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS pinjam_gedung (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama_pemohon VARCHAR(255) NOT NULL,
      organisasi VARCHAR(255) NOT NULL,
      no_hp VARCHAR(20) NOT NULL,
      email VARCHAR(255),
      keperluan VARCHAR(500) NOT NULL,
      keterangan TEXT,
      tanggal_mulai DATE NOT NULL,
      tanggal_selesai DATE NOT NULL,
      status ENUM('menunggu', 'disetujui', 'ditolak') NOT NULL DEFAULT 'menunggu',
      catatan_admin TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)
  console.log('✅ Tabel pinjam_gedung berhasil dibuat.')

  await connection.end()
  console.log('🎉 Selesai!')
}

createTables().catch(console.error)
