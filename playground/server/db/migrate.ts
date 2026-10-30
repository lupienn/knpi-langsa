import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { fileURLToPath } from 'node:url'
import postgres from 'postgres'
import { createPostgresOptions } from './postgres-options'

dotenv.config({ path: fileURLToPath(new URL('../../../.env', import.meta.url)) })

async function runMigrations() {
  const databaseUrl = process.env.SUPABASE_DIRECT_URL || process.env.NUXT_SUPABASE_DATABASE_URL
  if (!databaseUrl) throw new Error('SUPABASE_DIRECT_URL atau NUXT_SUPABASE_DATABASE_URL belum diatur.')

  const client = postgres(databaseUrl, createPostgresOptions(databaseUrl, 1))
  const db = drizzle(client)

  try {
    await migrate(db, {
      migrationsFolder: fileURLToPath(new URL('./migrations', import.meta.url)),
    })
    console.log('✅ Migrasi PostgreSQL Supabase selesai.')
  }
  finally {
    await client.end({ timeout: 5 })
  }
}

runMigrations().catch((error) => {
  console.error('❌ Migrasi gagal:', error)
  process.exitCode = 1
})
