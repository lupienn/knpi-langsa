import { defineStore } from 'pinia'

interface Pengguna {
  id: number
  nama: string
  username: string
  peran: string
  createdAt: string
}

interface AuthState {
  token: string | null
  pengguna: Pengguna | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    pengguna: null,
  }),

  getters: {
    terautentikasi: (state) => !!state.token,
    penggunaLogin: (state) => state.pengguna,
  },

  actions: {
    async login(username: string, password: string) {
      const { data, error } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: { username, password },
      })

      if (error.value) {
        throw new Error(error.value.data?.statusMessage || 'Login gagal.')
      }

      const result = data.value as any
      this.token = result.data.token
      this.pengguna = result.data.pengguna

      // Simpan token di cookie agar persistent
      const tokenCookie = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7, // 7 hari
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
      })
      tokenCookie.value = this.token
    },

    async ambilProfil() {
      if (!this.token) return

      const { data, error } = await useFetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${this.token}` },
      })

      if (error.value) {
        this.logout()
        return
      }

      const result = data.value as any
      this.pengguna = result.data.pengguna
    },

    inisialisasiDariCookie() {
      const tokenCookie = useCookie('auth_token')
      if (tokenCookie.value) {
        this.token = tokenCookie.value
      }
    },

    logout() {
      this.token = null
      this.pengguna = null

      const tokenCookie = useCookie('auth_token')
      tokenCookie.value = null

      navigateTo('/login')
    },
  },
})
