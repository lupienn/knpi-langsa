/**
 * Script seed untuk mengisi data awal database.
 * Jalankan dengan: npx tsx server/db/seed.ts
 */

import mysql from 'mysql2/promise'
import { drizzle } from 'drizzle-orm/mysql2'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

// Load .env dari root project
dotenv.config({ path: '../../.env' })

async function seed() {
  console.log('🌱 Memulai proses seed database...\n')

  const dbName = process.env.NUXT_DB_DATABASE || 'knpi-langsa'

  // Koneksi tanpa database dulu untuk membuat database jika belum ada
  const initConn = await mysql.createConnection({
    host: process.env.NUXT_DB_HOST || '127.0.0.1',
    port: Number(process.env.NUXT_DB_PORT) || 3306,
    user: process.env.NUXT_DB_USERNAME || 'root',
    password: process.env.NUXT_DB_PASSWORD || '',
  })
  console.log(`🗄️  Memastikan database '${dbName}' tersedia...`)
  await initConn.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
  console.log(`✅ Database '${dbName}' siap.\n`)
  await initConn.end()

  // Koneksi ke database target
  const connection = await mysql.createConnection({
    host: process.env.NUXT_DB_HOST || '127.0.0.1',
    port: Number(process.env.NUXT_DB_PORT) || 3306,
    database: dbName,
    user: process.env.NUXT_DB_USERNAME || 'root',
    password: process.env.NUXT_DB_PASSWORD || '',
    multipleStatements: true,
  })

  try {
    // Buat tabel pengguna jika belum ada
    console.log('📋 Membuat tabel pengguna...')
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS pengguna (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        peran ENUM('admin', 'pengurus', 'anggota') NOT NULL DEFAULT 'anggota',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)
    console.log('✅ Tabel pengguna siap.\n')

    // Cek apakah admin sudah ada
    const [rows] = await connection.execute(
      'SELECT id FROM pengguna WHERE username = ? LIMIT 1',
      ['admin']
    ) as any[]

    if (rows.length > 0) {
      console.log('ℹ️  Admin sudah ada, melewati seed pengguna admin.')
    }
    else {
      // Hash password
      const passwordHash = await bcrypt.hash('admin123', 12)

      await connection.execute(
        'INSERT INTO pengguna (nama, username, password, peran) VALUES (?, ?, ?, ?)',
        ['Administrator KNPI', 'admin', passwordHash, 'admin']
      )
      console.log('✅ Pengguna admin berhasil dibuat.')
      console.log('   Username : admin')
      console.log('   Password : admin123')
      console.log('   ⚠️  Segera ganti password setelah login pertama!\n')
    }

    console.log('\n🎉 Seed database selesai!')
  }
  finally {
    await connection.end()
  }
}

seed().catch((err) => {
  console.error('❌ Seed gagal:', err)
  process.exit(1)
})
