<template>
  <div class="relative min-h-screen w-full flex items-center justify-center bg-[#070a14] px-4 py-10 text-slate-100 selection:bg-knpi-500/30 selection:text-knpi-200">
    <!-- Ambient Dynamic Background Glow -->
    <div class="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-knpi-600/20 blur-[120px] animate-float" />
    <div class="pointer-events-none absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-[120px] animate-float-slow" />
    <div class="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />

    <div class="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <!-- SISI KIRI: Logo & Info Utama -->
      <div class="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 px-2">
        <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md p-3">
          <img
            :src="logoKnpi"
            alt="Logo KNPI Kota Langsa"
            class="h-full w-full object-contain"
          >
        </div>

        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            KNPI Kota Langsa
          </h1>
          <p class="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
            Sistem informasi pengelolaan berita publikasi dan permohonan pinjam gedung Graha Pemuda.
          </p>
        </div>
      </div>

      <!-- SISI KANAN: Form Login -->
      <div class="lg:col-span-6 flex flex-col items-center">
        <div class="glass-card w-full max-w-md p-6 sm:p-8 shadow-2xl">
          <div class="mb-6">
            <h2 class="text-lg font-bold text-white">
              Masuk Akun
            </h2>
            <p class="text-xs text-slate-400 mt-1">
              Silakan masukkan username dan password Anda.
            </p>
          </div>

          <form
            class="flex flex-col gap-4.5"
            novalidate
            @submit.prevent="handleLogin"
          >
            <!-- Alert Error -->
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              leave-active-class="transition duration-200 ease-in"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div
                v-if="pesanError"
                class="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-3 text-xs text-red-300"
                role="alert"
              >
                <LucideAlertCircle
                  :size="16"
                  class="shrink-0 text-red-400"
                />
                <span>{{ pesanError }}</span>
              </div>
            </Transition>

            <!-- Input Username -->
            <div class="flex flex-col gap-1.5">
              <label
                for="username"
                class="text-xs font-semibold text-slate-300"
              >Username</label>
              <div class="relative">
                <LucideUser
                  :size="16"
                  class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  id="username"
                  v-model="form.username"
                  type="text"
                  class="form-input-base"
                  :class="errorUsername ? 'border-red-500/60 bg-red-500/5 focus:border-red-400' : ''"
                  placeholder="Username"
                  autocomplete="username"
                  :disabled="sedangMemuat"
                  @input="errorUsername = ''"
                >
              </div>
              <span
                v-if="errorUsername"
                class="flex items-center gap-1 text-[11px] text-red-400"
              >
                <LucideAlertCircle :size="12" />{{ errorUsername }}
              </span>
            </div>

            <!-- Input Password -->
            <div class="flex flex-col gap-1.5">
              <label
                for="password"
                class="text-xs font-semibold text-slate-300"
              >Password</label>
              <div class="relative">
                <LucideLock
                  :size="16"
                  class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  id="password"
                  v-model="form.password"
                  :type="tampilPassword ? 'text' : 'password'"
                  class="form-input-base pr-11"
                  :class="errorPassword ? 'border-red-500/60 bg-red-500/5 focus:border-red-400' : ''"
                  placeholder="Password"
                  autocomplete="current-password"
                  :disabled="sedangMemuat"
                  @input="errorPassword = ''"
                >
                <button
                  type="button"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1"
                  :aria-label="tampilPassword ? 'Sembunyikan password' : 'Tampilkan password'"
                  @click="tampilPassword = !tampilPassword"
                >
                  <LucideEyeOff
                    v-if="tampilPassword"
                    :size="16"
                  />
                  <LucideEye
                    v-else
                    :size="16"
                  />
                </button>
              </div>
              <span
                v-if="errorPassword"
                class="flex items-center gap-1 text-[11px] text-red-400"
              >
                <LucideAlertCircle :size="12" />{{ errorPassword }}
              </span>
            </div>

            <!-- Submit Button -->
            <button
              id="btn-login"
              type="submit"
              class="btn-primary mt-1"
              :disabled="sedangMemuat"
            >
              <template v-if="!sedangMemuat">
                <LucideLogIn :size="17" />
                Masuk
              </template>
              <template v-else>
                <LucideLoader
                  :size="17"
                  class="animate-spin"
                />
                Memproses...
              </template>
            </button>
          </form>

          <div class="mt-6 border-t border-white/10 pt-4 text-center">
            <p class="text-[11px] text-slate-500">
              &copy; {{ tahunSekarang }} DPD KNPI Kota Langsa
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoKnpi from '~/assets/logo-knpi.png'

definePageMeta({ layout: false })

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({ username: '', password: '' })
const sedangMemuat = ref(false)
const pesanError = ref('')
const errorUsername = ref('')
const errorPassword = ref('')
const tampilPassword = ref(false)
const tahunSekarang = new Date().getFullYear()

function validasiForm(): boolean {
  let valid = true
  if (!form.username.trim()) {
    errorUsername.value = 'Username wajib diisi.'
    valid = false
  }
  if (!form.password.trim()) {
    errorPassword.value = 'Password wajib diisi.'
    valid = false
  }
  return valid
}

async function handleLogin() {
  pesanError.value = ''
  if (!validasiForm()) return

  sedangMemuat.value = true
  try {
    await authStore.login(form.username.trim(), form.password)
    await router.push('/dashboard')
  }
  catch (err: unknown) {
    pesanError.value = err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.'
  }
  finally {
    sedangMemuat.value = false
  }
}

useSeoMeta({
  title: 'Masuk — KNPI Kota Langsa',
  description: 'Halaman masuk Sistem Informasi KNPI Kota Langsa.',
})
</script>
