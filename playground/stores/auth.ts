import { defineStore } from 'pinia'

interface ApiResponse {
  data: {
    token: string
    pengguna: Pengguna
  }
}

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
    terautentikasi: state => !!state.token,
    penggunaLogin: state => state.pengguna,
  },

  actions: {
    async login(username: string, password: string) {
      try {
        const result = await $fetch<ApiResponse>('/api/auth/login', {
          method: 'POST',
          body: { username, password },
        })

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
      }
      catch (err: any) {
        throw new Error(err?.data?.statusMessage || 'Login gagal.')
      }
    },

    async ambilProfil() {
      if (!this.token) return

      try {
        const result = await $fetch<ApiResponse>('/api/auth/me', {
          headers: { Authorization: `Bearer ${this.token}` },
        })

        this.pengguna = result.data.pengguna
      }
      catch {
        this.logout()
      }
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

      navigateTo('/')
    },
  },
})
