import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from './schema'

let db: ReturnType<typeof drizzle> | null = null

export function useDB() {
  if (db) return db

  const config = useRuntimeConfig()

  const pool = mysql.createPool({
    host: config.dbHost,
    port: Number(config.dbPort),
    database: config.dbDatabase,
    user: config.dbUsername,
    password: config.dbPassword,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })

  db = drizzle(pool, { schema, mode: 'default' })
  return db
}
