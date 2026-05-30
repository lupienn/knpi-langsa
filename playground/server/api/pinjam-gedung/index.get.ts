import { desc } from 'drizzle-orm'
import { useDB } from '../../db/index'
import { pinjamGedung } from '../../db/schema'

export default defineEventHandler(async () => {
  const db = useDB()

  const hasil = await db
    .select()
    .from(pinjamGedung)
    .orderBy(desc(pinjamGedung.id))

  return { berhasil: true, data: hasil }
})
