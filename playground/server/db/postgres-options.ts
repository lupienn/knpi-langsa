import type { Options } from 'postgres'

export function isLocalDatabaseUrl(databaseUrl: string): boolean {
  try {
    const hostname = new URL(databaseUrl).hostname
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1'
  }
  catch {
    return false
  }
}

export function validateDatabaseUrl(databaseUrl: string): void {
  let parsed: URL
  try {
    parsed = new URL(databaseUrl)
  }
  catch {
    throw new Error('Connection string PostgreSQL Supabase tidak valid.')
  }

  const placeholderHost = /pooler[_-]?host|project[_-]?ref/i.test(parsed.hostname)
  const placeholderPassword = /^(?:password|your[_-]?password)$/i.test(parsed.password)

  if (placeholderHost || placeholderPassword) {
    throw new Error(
      'Connection string Supabase masih berisi placeholder. Salin URL asli dari Supabase Dashboard > Connect.',
    )
  }
}

/**
 * Supabase transaction pooler tidak mendukung prepared statements. Nuxt juga
 * lazim dijalankan secara serverless, jadi satu koneksi per instance adalah
 * default yang aman. Local Supabase berjalan tanpa TLS.
 */
export function createPostgresOptions(databaseUrl: string, poolSize = 1): Options<Record<string, never>> {
  return {
    max: Math.max(1, poolSize),
    prepare: false,
    ssl: isLocalDatabaseUrl(databaseUrl) ? false : 'require',
    connect_timeout: 15,
    idle_timeout: 20,
  }
}
