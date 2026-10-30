import * as dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import postgres from 'postgres'
import { createPostgresOptions, validateDatabaseUrl } from './postgres-options'

dotenv.config({ path: fileURLToPath(new URL('../../../.env', import.meta.url)) })

const expectedTables = ['pengguna', 'berita', 'slider', 'pinjam_gedung'] as const

async function check() {
  const databaseUrl = process.env.NUXT_SUPABASE_DATABASE_URL
  if (!databaseUrl) throw new Error('NUXT_SUPABASE_DATABASE_URL belum diatur.')
  validateDatabaseUrl(databaseUrl)

  const client = postgres(databaseUrl, createPostgresOptions(databaseUrl, 1))
  try {
    await client`select 1 as ok`

    for (const table of expectedTables) {
      const [result] = await client<{ table_name: string | null }[]>`
        select to_regclass(${`public.${table}`})::text as table_name
      `
      if (!result?.table_name) throw new Error(`Tabel public.${table} belum tersedia.`)
    }

    const [counts] = await client<{
      pengguna: number
      berita: number
      slider: number
      pinjam_gedung: number
    }[]>`
      select
        (select count(*)::int from public.pengguna) as pengguna,
        (select count(*)::int from public.berita) as berita,
        (select count(*)::int from public.slider) as slider,
        (select count(*)::int from public.pinjam_gedung) as pinjam_gedung
    `

    console.log('✅ Koneksi dan skema Supabase sehat.', counts)
  }
  finally {
    await client.end({ timeout: 5 })
  }
}

check().catch((error) => {
  console.error('❌ Pemeriksaan Supabase gagal:', error)
  process.exitCode = 1
})
