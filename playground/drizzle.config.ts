import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'

// Load .env dari root project (satu level di atas playground)
dotenv.config({ path: '../.env' })

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.NUXT_DB_HOST || '127.0.0.1',
    port: Number(process.env.NUXT_DB_PORT) || 3306,
    database: process.env.NUXT_DB_DATABASE || 'knpi-langsa',
    user: process.env.NUXT_DB_USERNAME || 'root',
    password: process.env.NUXT_DB_PASSWORD || '',
  },
})
