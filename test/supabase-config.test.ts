import { describe, expect, it } from 'vitest'
import {
  createPostgresOptions,
  isLocalDatabaseUrl,
  validateDatabaseUrl,
} from '../playground/server/db/postgres-options'
import {
  extensionForImageType,
  isSupportedImageType,
} from '../playground/server/utils/storage-file'
import { validateSupabaseServerKey } from '../playground/server/utils/supabase-key'

describe('Supabase PostgreSQL connection options', () => {
  it('uses TLS and disables prepared statements for a remote pooler', () => {
    const options = createPostgresOptions(
      'postgresql://postgres.ref:secret@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    )

    expect(options).toMatchObject({
      max: 1,
      prepare: false,
      ssl: 'require',
    })
  })

  it('allows local Supabase without TLS', () => {
    expect(isLocalDatabaseUrl('postgresql://postgres:postgres@127.0.0.1:54322/postgres')).toBe(true)
    expect(createPostgresOptions('postgresql://postgres:postgres@localhost:54322/postgres').ssl).toBe(false)
  })

  it('never configures a pool smaller than one connection', () => {
    expect(createPostgresOptions('postgresql://example.com/postgres', 0).max).toBe(1)
  })

  it('rejects connection strings copied with placeholders', () => {
    expect(() => validateDatabaseUrl(
      'postgresql://postgres.PROJECT_REF:PASSWORD@POOLER_HOST:6543/postgres',
    )).toThrow('masih berisi placeholder')
  })

  it('accepts a complete Supabase pooler URL', () => {
    expect(() => validateDatabaseUrl(
      'postgresql://postgres.abcdefghijklmnopqrst:secret@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    )).not.toThrow()
  })
})

describe('Supabase Storage image validation', () => {
  it.each([
    ['image/jpeg', 'jpg'],
    ['image/png', 'png'],
    ['image/webp', 'webp'],
    ['image/gif', 'gif'],
  ] as const)('accepts %s', (contentType, extension) => {
    expect(isSupportedImageType(contentType)).toBe(true)
    expect(extensionForImageType(contentType)).toBe(extension)
  })

  it('rejects non-image and SVG payloads', () => {
    expect(isSupportedImageType('application/javascript')).toBe(false)
    expect(isSupportedImageType('image/svg+xml')).toBe(false)
    expect(isSupportedImageType(undefined)).toBe(false)
  })
})

describe('Supabase server key validation', () => {
  it('accepts a server-only secret key', () => {
    expect(() => validateSupabaseServerKey('sb_secret_example')).not.toThrow()
  })

  it('rejects a publishable key for Storage admin operations', () => {
    expect(() => validateSupabaseServerKey('sb_publishable_example'))
      .toThrow('publishable/anon key')
  })
})
