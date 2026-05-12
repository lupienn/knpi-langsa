<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b1120] px-4 py-8">
    <!-- Orbs dekoratif background -->
    <div class="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-knpi-600/20 blur-[100px] animate-float" />
    <div class="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-knpi-500/15 blur-[100px] animate-float-slow" />
    <div class="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-knpi-700/10 blur-[80px] animate-float" />

    <div class="relative z-10 flex w-full max-w-sm flex-col items-center gap-6">
      <!-- Header Logo -->
      <div class="flex flex-col items-center gap-3 text-center">
        <div class="animate-pulse-glow flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-knpi-600 to-knpi-500 shadow-knpi">
          <div class="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#0b1120]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 64 64"
              fill="none"
            >
              <path
                d="M32 4L8 16V34C8 47.3 18.4 59.8 32 63C45.6 59.8 56 47.3 56 34V16L32 4Z"
                fill="url(#g1)"
              />
              <text
                x="32"
                y="37"
                text-anchor="middle"
                font-family="system-ui,sans-serif"
                font-size="11"
                font-weight="800"
                fill="white"
                letter-spacing="0.5"
              >KNPI</text>
              <defs>
                <linearGradient
                  id="g1"
                  x1="8"
                  y1="4"
                  x2="56"
                  y2="63"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop
                    offset="0%"
                    stop-color="#1a63c8"
                  />
                  <stop
                    offset="100%"
                    stop-color="#3070f0"
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-white">
            KNPI Langsa
          </h1>
          <p class="mt-1 text-sm leading-relaxed text-slate-400">
            Komite Nasional Pemuda Indonesia<br>Kota Langsa
          </p>
        </div>
      </div>

      <!-- Card -->
      <div class="glass-card w-full shadow-card p-7">
        <div class="mb-6">
          <h2 class="text-base font-bold text-slate-100">
            Masuk ke Sistem
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Silakan masukkan kredensial Anda untuk melanjutkan
          </p>
        </div>

        <form
          class="flex flex-col gap-4"
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
              class="flex items-center gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-3 text-sm text-red-300"
              role="alert"
            >
              <LucideAlertCircle
                :size="16"
                class="shrink-0"
              />
              <span>{{ pesanError }}</span>
            </div>
          </Transition>

          <!-- Username -->
          <div class="flex flex-col gap-1.5">
            <label
              for="username"
              class="text-xs font-semibold tracking-wide text-slate-300"
            >Username</label>
            <div class="relative">
              <LucideUser
                :size="16"
                class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
              <input
                id="username"
                v-model="form.username"
                type="text"
                class="form-input-base"
                :class="errorUsername ? 'border-red-500/60 bg-red-500/5 focus:border-red-400 focus:ring-red-400/20' : ''"
                placeholder="Masukkan username"
                autocomplete="username"
                :disabled="sedangMemuat"
                @input="errorUsername = ''"
              >
            </div>
            <span
              v-if="errorUsername"
              class="flex items-center gap-1 text-xs text-red-400"
            >
              <LucideAlertCircle :size="12" />{{ errorUsername }}
            </span>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-1.5">
            <label
              for="password"
              class="text-xs font-semibold tracking-wide text-slate-300"
            >Password</label>
            <div class="relative">
              <LucideLock
                :size="16"
                class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
              <input
                id="password"
                v-model="form.password"
                :type="tampilPassword ? 'text' : 'password'"
                class="form-input-base pr-11"
                :class="errorPassword ? 'border-red-500/60 bg-red-500/5 focus:border-red-400 focus:ring-red-400/20' : ''"
                placeholder="Masukkan password"
                autocomplete="current-password"
                :disabled="sedangMemuat"
                @input="errorPassword = ''"
              >
              <button
                type="button"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-0.5"
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
              class="flex items-center gap-1 text-xs text-red-400"
            >
              <LucideAlertCircle :size="12" />{{ errorPassword }}
            </span>
          </div>

          <!-- Tombol Masuk -->
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
                class="animate-spin-slow"
              />
              Memproses...
            </template>
          </button>
        </form>
      </div>

      <!-- Footer -->
      <p class="text-center text-xs text-slate-600">
        &copy; {{ tahunSekarang }} KNPI Kota Langsa. Hak cipta dilindungi.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  title: 'Masuk — KNPI Langsa',
  description: 'Halaman login sistem informasi KNPI Kota Langsa.',
})
</script>
