import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'

// Load .env dari root project (satu level di atas playground)
dotenv.config({ path: '../.env' })

const url = process.env.SUPABASE_DIRECT_URL
  || process.env.NUXT_SUPABASE_DATABASE_URL
  || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres'

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url,
  },
  strict: true,
  verbose: true,
})
