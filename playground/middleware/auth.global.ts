export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Inisialisasi dari cookie jika belum ada token di state
  authStore.inisialisasiDariCookie()

  // Halaman yang tidak perlu autentikasi
  const halamanPublik = ['/', '/login']
  const isBeritaPath = to.path.startsWith('/berita/')
  
  if (halamanPublik.includes(to.path) || isBeritaPath) {
    // Jika sudah login dan coba akses halaman login, redirect ke dashboard
    if (authStore.terautentikasi && to.path === '/login') {
      return navigateTo('/dashboard')
    }
    return
  }

  // Halaman lain butuh autentikasi
  if (!authStore.terautentikasi) {
    return navigateTo('/login')
  }
})
