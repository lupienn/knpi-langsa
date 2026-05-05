export default defineEventHandler(async (_event) => {
  // JWT bersifat stateless — logout di sisi client dengan menghapus token
  // Di sini kita hanya return konfirmasi
  return {
    berhasil: true,
    pesan: 'Logout berhasil. Silakan hapus token di sisi client.',
  }
})
