import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { validateSupabaseServerKey } from './supabase-key'

let supabaseAdmin: SupabaseClient | null = null

export function useSupabaseAdmin(): SupabaseClient {
  if (supabaseAdmin) return supabaseAdmin

  const config = useRuntimeConfig()
  const supabaseUrl = String(config.supabaseUrl || '')
  const serviceRoleKey = String(config.supabaseServiceRoleKey || '')

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'NUXT_SUPABASE_URL dan NUXT_SUPABASE_SERVICE_ROLE_KEY wajib diatur untuk menggunakan Supabase Storage.',
    )
  }
  validateSupabaseServerKey(serviceRoleKey)

  supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  })

  return supabaseAdmin
}
