<template>
  <div class="flex min-h-screen bg-[#0b1120]">

    <!-- ============ SIDEBAR ============ -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/[0.07] bg-[#0c1528]/80 backdrop-blur-xl transition-transform duration-300"
      :class="sidebarTerbuka ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- Brand -->
      <div class="flex items-center gap-3 border-b border-white/[0.07] px-5 py-5">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-knpi-600 to-knpi-500">
          <span class="text-xs font-extrabold text-white">KL</span>
        </div>
        <div>
          <span class="block text-sm font-extrabold text-white">KNPI</span>
          <span class="block text-[11px] text-slate-500">Kota Langsa</span>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        <span class="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Menu Utama</span>

        <NuxtLink to="/dashboard" class="nav-item active">
          <LucideLayoutDashboard :size="17" />
          <span>Dashboard</span>
        </NuxtLink>

        <NuxtLink to="/pengguna" class="nav-item">
          <LucideUsers :size="17" />
          <span>Pengguna</span>
        </NuxtLink>

        <NuxtLink to="/program-kerja" class="nav-item">
          <LucideCalendar :size="17" />
          <span>Program Kerja</span>
        </NuxtLink>

        <NuxtLink to="/kegiatan" class="nav-item">
          <LucideClipboardList :size="17" />
          <span>Kegiatan</span>
        </NuxtLink>
      </nav>

      <!-- User footer -->
      <div class="border-t border-white/[0.07] px-3 py-4">
        <div class="flex items-center gap-2.5">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-knpi-600 to-knpi-500 text-xs font-bold text-white">
            {{ inisialNama }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold text-slate-200">{{ pengguna?.nama || pengguna?.username }}</p>
            <p class="text-[11px] text-slate-500">{{ labelPeran }}</p>
          </div>
          <button
            id="btn-logout"
            class="flex shrink-0 items-center justify-center rounded-lg border border-red-500/20 p-1.5 text-red-400 transition hover:bg-red-500/10"
            @click="modalLogout = true"
            :disabled="sedangLogout"
            title="Keluar"
          >
            <LucideLogOut :size="16" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay mobile -->
    <div
      v-if="sidebarTerbuka"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
      @click="sidebarTerbuka = false"
    />

    <!-- ============ MAIN ============ -->
    <div class="flex flex-1 flex-col lg:pl-64">

      <!-- Topbar -->
      <header class="sticky top-0 z-30 flex items-center gap-3 border-b border-white/[0.07] bg-[#0b1120]/80 px-5 py-3.5 backdrop-blur-xl">
        <button
          class="flex items-center justify-center rounded-lg border border-white/10 p-1.5 text-slate-400 hover:bg-white/5 lg:hidden transition"
          @click="sidebarTerbuka = !sidebarTerbuka"
          aria-label="Toggle menu"
        >
          <LucideMenu :size="20" />
        </button>

        <div class="flex-1">
          <h1 class="text-base font-bold text-slate-100">Dashboard</h1>
          <p class="text-xs text-slate-500">Selamat datang di Sistem KNPI Langsa</p>
        </div>

        <span class="hidden text-xs text-slate-600 sm:block">{{ tanggalSekarang }}</span>
      </header>

      <!-- Konten Halaman -->
      <main class="flex flex-col gap-5 p-5">

        <!-- Welcome Banner -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-knpi-700 to-knpi-500 p-6 shadow-knpi">
          <!-- Dekorasi lingkaran -->
          <div class="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
          <div class="pointer-events-none absolute -bottom-8 right-20 h-32 w-32 rounded-full bg-white/8" />
          <div class="pointer-events-none absolute bottom-4 right-8 h-16 w-16 rounded-full bg-white/10" />

          <div class="relative">
            <p class="text-sm text-knpi-200">{{ sapaanWaktu }},</p>
            <h2 class="mt-0.5 text-2xl font-extrabold text-white">
              {{ pengguna?.nama || pengguna?.username || '...' }} 👋
            </h2>
            <p class="mt-1.5 max-w-md text-sm leading-relaxed text-knpi-100/80">
              Selamat datang di Sistem Informasi KNPI Kota Langsa. Semoga hari Anda menyenangkan dan produktif.
            </p>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            v-for="stat in statistik"
            :key="stat.label"
            class="glass-card flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5 hover:bg-white/[0.07]"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" :class="stat.ikonBg">
              <component :is="stat.ikon" :size="22" class="text-white" />
            </div>
            <div>
              <p class="text-xs font-medium text-slate-500">{{ stat.label }}</p>
              <p class="mt-0.5 text-2xl font-extrabold text-slate-100">{{ stat.nilai }}</p>
            </div>
          </div>
        </div>

        <!-- Info Akun -->
        <div>
          <h3 class="mb-3 text-xs font-bold uppercase tracking-widest text-slate-600">Informasi Akun</h3>
          <div class="glass-card p-5">
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div v-for="item in infoAkun" :key="item.label" class="flex flex-col gap-1">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-600">{{ item.label }}</span>
                <span v-if="item.isBadge" class="mt-0.5">
                  <span class="badge" :class="`badge-${pengguna?.peran}`">{{ item.nilai }}</span>
                </span>
                <span v-else class="text-sm font-medium text-slate-300">{{ item.nilai || '—' }}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- ============ MODAL LOGOUT ============ -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modalLogout"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        @click.self="modalLogout = false"
      >
        <div class="glass-card w-full max-w-sm p-7 text-center shadow-2xl">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/25 bg-red-500/10 text-red-400">
            <LucideLogOut :size="28" />
          </div>
          <h3 class="text-base font-bold text-slate-100">Keluar dari Sistem?</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-500">
            Anda akan keluar dari sesi ini. Pastikan semua pekerjaan sudah tersimpan sebelum melanjutkan.
          </p>
          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
              @click="modalLogout = false"
            >
              Batal
            </button>
            <button
              id="btn-konfirmasi-logout"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
              @click="handleLogout"
              :disabled="sedangLogout"
            >
              <LucideLoader v-if="sedangLogout" :size="15" class="animate-spin" />
              {{ sedangLogout ? 'Keluar...' : 'Ya, Keluar' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const pengguna = computed(() => authStore.penggunaLogin)
const sidebarTerbuka = ref(false)
const modalLogout = ref(false)
const sedangLogout = ref(false)

const inisialNama = computed(() => {
  const nama = pengguna.value?.nama || pengguna.value?.username || '?'
  return nama.slice(0, 2).toUpperCase()
})

const labelPeran = computed(() => {
  const map: Record<string, string> = {
    admin: 'Administrator',
    pengurus: 'Pengurus',
    anggota: 'Anggota',
  }
  return map[pengguna.value?.peran || ''] || pengguna.value?.peran || '—'
})

const tanggalBergabung = computed(() => {
  if (!pengguna.value?.createdAt) return '—'
  return new Date(pengguna.value.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
})

const tanggalSekarang = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
})

const sapaanWaktu = computed(() => {
  const jam = new Date().getHours()
  if (jam < 12) return 'Selamat Pagi'
  if (jam < 15) return 'Selamat Siang'
  if (jam < 18) return 'Selamat Sore'
  return 'Selamat Malam'
})

const statistik = [
  { label: 'Total Anggota', nilai: '—', ikon: 'LucideUsers', ikonBg: 'bg-gradient-to-br from-knpi-700 to-knpi-500' },
  { label: 'Pengurus Aktif', nilai: '—', ikon: 'LucideUserCheck', ikonBg: 'bg-gradient-to-br from-emerald-700 to-emerald-500' },
  { label: 'Program Kerja', nilai: '—', ikon: 'LucideCalendar', ikonBg: 'bg-gradient-to-br from-amber-700 to-amber-500' },
]

const infoAkun = computed(() => [
  { label: 'Nama Lengkap', nilai: pengguna.value?.nama, isBadge: false },
  { label: 'Username', nilai: pengguna.value?.username, isBadge: false },
  { label: 'Peran', nilai: labelPeran.value, isBadge: true },
  { label: 'Bergabung Sejak', nilai: tanggalBergabung.value, isBadge: false },
])

async function handleLogout() {
  sedangLogout.value = true
  await $fetch('/api/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${authStore.token}` },
  }).catch(() => {})
  authStore.logout()
}

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) {
    await authStore.ambilProfil()
  }
})

useSeoMeta({
  title: 'Dashboard — KNPI Langsa',
  description: 'Dashboard sistem informasi KNPI Kota Langsa.',
})
</script>
