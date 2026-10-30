interface JwtPayload {
  role?: string
}

function readJwtRole(key: string): string | undefined {
  try {
    const payload = key.split('.')[1]
    if (!payload) return undefined

    return (JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as JwtPayload).role
  }
  catch {
    return undefined
  }
}

/**
 * Storage admin operations must use a new `sb_secret_` key or the legacy JWT
 * whose role is `service_role`. Publishable/anon keys are intentionally
 * rejected instead of weakening the Storage RLS policy.
 */
export function validateSupabaseServerKey(key: string): void {
  if (key.startsWith('sb_secret_')) return
  if (key.startsWith('eyJ') && readJwtRole(key) === 'service_role') return

  if (key.startsWith('sb_publishable_') || (key.startsWith('eyJ') && readJwtRole(key) === 'anon')) {
    throw new Error(
      'NUXT_SUPABASE_SERVICE_ROLE_KEY berisi publishable/anon key. Gunakan Secret key (sb_secret_...) dari Supabase Dashboard > Settings > API Keys.',
    )
  }

  throw new Error(
    'NUXT_SUPABASE_SERVICE_ROLE_KEY tidak valid. Gunakan Secret key (sb_secret_...) atau legacy service_role key.',
  )
}
