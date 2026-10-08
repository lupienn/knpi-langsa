export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Inisialisasi dari cookie jika belum ada token di state
  authStore.inisialisasiDariCookie()

  // Halaman yang dapat diakses publik tanpa login
  const isHalamanPublik =
    to.path === '/' ||
    to.path === '/login' ||
    to.path === '/berita' ||
    to.path.startsWith('/berita/')

  if (isHalamanPublik) {
    // Jika sudah login dan coba akses halaman login, redirect ke dashboard
    if (authStore.terautentikasi && to.path === '/login') {
      return navigateTo('/dashboard')
    }
    return
  }

  // Halaman lain (seperti /dashboard) butuh autentikasi
  if (!authStore.terautentikasi) {
    return navigateTo('/login')
  }
})
