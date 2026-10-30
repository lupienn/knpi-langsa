import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { createPostgresOptions, validateDatabaseUrl } from './postgres-options'

let db: PostgresJsDatabase<typeof schema> | null = null

export function useDB(): PostgresJsDatabase<typeof schema> {
  if (db) return db

  const config = useRuntimeConfig()
  const databaseUrl = String(config.supabaseDatabaseUrl || '')

  if (!databaseUrl) {
    throw new Error(
      'NUXT_SUPABASE_DATABASE_URL belum diatur. Salin connection string dari Supabase Dashboard > Connect.',
    )
  }
  validateDatabaseUrl(databaseUrl)

  const client = postgres(databaseUrl, createPostgresOptions(
    databaseUrl,
    Number(config.supabaseDbPoolSize || 1),
  ))

  db = drizzle(client, { schema })
  return db
}
