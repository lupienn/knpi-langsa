import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'

// Load .env dari root project (satu level di atas playground)
dotenv.config({ path: '../.env' })

const host = process.env.NUXT_DB_HOST || '127.0.0.1'
const port = process.env.NUXT_DB_PORT || '3306'
const user = process.env.NUXT_DB_USERNAME || 'root'
const password = process.env.NUXT_DB_PASSWORD || ''
const database = process.env.NUXT_DB_DATABASE || 'knpi-langsa'

const url = password
  ? `mysql://${user}:${password}@${host}:${port}/${database}`
  : `mysql://${user}@${host}:${port}/${database}`

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'mysql',
  dbCredentials: {
    url,
  },
})
