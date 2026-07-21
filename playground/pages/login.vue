<template>
  <div class="relative min-h-screen w-full flex items-center justify-center bg-[#070a14] px-4 py-12 text-slate-100 selection:bg-knpi-500/30 selection:text-knpi-200 overflow-hidden">
    <!-- Ambient Dynamic Background Glows -->
    <div class="pointer-events-none absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-knpi-600/15 blur-[140px]" />
    <div class="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
    <div class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-knpi-950/40 blur-[160px]" />

    <div class="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <!-- SISI KIRI: Branding & Feature Highlights -->
      <div class="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 px-2 animate-fade-in-up">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-md hover:bg-white/10 hover:text-white transition group mb-2"
        >
          <LucideArrowLeft
            :size="14"
            class="group-hover:-translate-x-0.5 transition-transform"
          />
          <span>Kembali ke Beranda</span>
        </NuxtLink>
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900/80 border border-white/10 shadow-card backdrop-blur-xl p-3 shrink-0">
            <img
              :src="logoKnpi"
              alt="Logo KNPI Kota Langsa"
              class="h-full w-full object-contain"
            >
          </div>
          <div>
            <span class="text-xs font-extrabold uppercase tracking-widest text-knpi-400">Portal Resmi</span>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              DPD KNPI Kota Langsa
            </h1>
          </div>
        </div>

        <p class="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
          Sistem informasi terintegrasi pengelolaan publikasi warta berita kepemudaan dan permohonan pinjam pakai Graha Pemuda Kota Langsa.
        </p>

        <!-- Feature List -->
        <div class="w-full max-w-md pt-2 space-y-3 hidden sm:block">
          <div class="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-knpi-600/20 text-knpi-300 border border-knpi-500/30 shrink-0">
              <LucideNewspaper :size="16" />
            </div>
            <span class="text-xs font-medium text-slate-300">Pengelolaan Warta & Berita Publikasi</span>
          </div>

          <div class="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
              <LucideBuilding2 :size="16" />
            </div>
            <span class="text-xs font-medium text-slate-300">Layanan Permohonan Pinjam Gedung</span>
          </div>

          <div class="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
              <LucideShieldCheck :size="16" />
            </div>
            <span class="text-xs font-medium text-slate-300">Otentikasi Akses Terenkripsi & Aman</span>
          </div>
        </div>
      </div>

      <!-- SISI KANAN: Form Login Card -->
      <div class="lg:col-span-6 flex flex-col items-center animate-fade-in-up duration-700">
        <div class="glass-card w-full max-w-md p-6 sm:p-8 shadow-card-hover border-white/10">
          <div class="mb-6">
            <h2 class="text-lg font-bold text-white tracking-tight">
              Masuk Panel Administrasi
            </h2>
            <p class="text-xs text-slate-400 mt-1">
              Silakan masukkan kredensial akun pengurus Anda.
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
                  placeholder="Username pengurus"
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
                  placeholder="Password akun"
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
              class="btn-primary mt-2"
              :disabled="sedangMemuat"
            >
              <template v-if="!sedangMemuat">
                <LucideLogIn :size="16" />
                <span>Masuk Sekarang</span>
              </template>
              <template v-else>
                <LucideLoader
                  :size="16"
                  class="animate-spin"
                />
                <span>Memproses Verifikasi...</span>
              </template>
            </button>
          </form>

          <div class="mt-6 border-t border-white/10 pt-4 text-center">
            <p class="text-[11px] text-slate-500">
              &copy; {{ tahunSekarang }} DPD KNPI Kota Langsa. Hak Cipta Dilindungi.
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
  title: 'Masuk Panel — KNPI Kota Langsa',
  description: 'Halaman masuk Sistem Informasi DPD KNPI Kota Langsa.',
})
</script>
