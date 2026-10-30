/**
 * Seed pengguna admin awal pada PostgreSQL Supabase.
 * Jalankan sesudah migrasi dengan: npm run db:seed
 */

import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { fileURLToPath } from 'node:url'
import postgres from 'postgres'
import { createPostgresOptions, validateDatabaseUrl } from './postgres-options'
import * as schema from './schema'

dotenv.config({ path: fileURLToPath(new URL('../../../.env', import.meta.url)) })

async function seed() {
  console.log('🌱 Memulai seed PostgreSQL Supabase...')

  // Seed tidak memerlukan direct connection; pooler lebih kompatibel dengan
  // jaringan IPv4 dan serverless.
  const databaseUrl = process.env.NUXT_SUPABASE_DATABASE_URL || process.env.SUPABASE_DIRECT_URL
  if (!databaseUrl) throw new Error('NUXT_SUPABASE_DATABASE_URL belum diatur.')
  validateDatabaseUrl(databaseUrl)

  const client = postgres(databaseUrl, createPostgresOptions(databaseUrl, 1))
  const db = drizzle(client, { schema })

  try {
    const existing = await db
      .select({ id: schema.pengguna.id })
      .from(schema.pengguna)
      .where(eq(schema.pengguna.username, 'admin'))
      .limit(1)

    if (existing.length > 0) {
      console.log('ℹ️  Admin sudah ada; seed dilewati.')
      return
    }

    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123'
    const passwordHash = await bcrypt.hash(adminPassword, 12)

    await db.insert(schema.pengguna).values({
      nama: 'Administrator KNPI',
      username: 'admin',
      password: passwordHash,
      peran: 'admin',
    })

    console.log('✅ Pengguna admin berhasil dibuat.')
    console.log('   Username : admin')
    console.log(`   Password : ${adminPassword}`)
    console.log('   ⚠️  Ganti password segera setelah login pertama.')
  }
  finally {
    await client.end({ timeout: 5 })
  }
}

seed().catch((error) => {
  console.error('❌ Seed gagal:', error)
  process.exitCode = 1
})
