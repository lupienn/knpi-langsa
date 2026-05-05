import { mysqlTable, varchar, int, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core'

// Tabel pengguna
export const pengguna = mysqlTable('pengguna', {
  id: int('id').primaryKey().autoincrement(),
  nama: varchar('nama', { length: 255 }).notNull(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  peran: mysqlEnum('peran', ['admin', 'pengurus', 'anggota']).notNull().default('anggota'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export type Pengguna = typeof pengguna.$inferSelect
export type PenggunaBaru = typeof pengguna.$inferInsert
