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

        <NuxtLink
          to="/dashboard"
          class="nav-item"
          :class="{ active: route.path === '/dashboard' }"
        >
          <LucideLayoutDashboard :size="17" />
          <span>Dashboard</span>
        </NuxtLink>

        <span class="mb-2 mt-4 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Kelola Konten</span>

        <NuxtLink
          to="/dashboard/berita"
          class="nav-item"
          :class="{ active: route.path.startsWith('/dashboard/berita') }"
        >
          <LucideNewspaper :size="17" />
          <span>Berita</span>
        </NuxtLink>

        <NuxtLink
          to="/dashboard/pinjam-gedung"
          class="nav-item"
          :class="{ active: route.path.startsWith('/dashboard/pinjam-gedung') }"
        >
          <LucideBuilding2 :size="17" />
          <span>Pinjam Gedung</span>
        </NuxtLink>
      </nav>

      <!-- User footer -->
      <div class="border-t border-white/[0.07] px-3 py-4">
        <div class="flex items-center gap-2.5">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-knpi-600 to-knpi-500 text-xs font-bold text-white">
            {{ inisialNama }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold text-slate-200">
              {{ pengguna?.nama || pengguna?.username }}
            </p>
            <p class="text-[11px] text-slate-500">
              {{ labelPeran }}
            </p>
          </div>
          <button
            id="btn-logout"
            class="flex shrink-0 items-center justify-center rounded-lg border border-red-500/20 p-1.5 text-red-400 transition hover:bg-red-500/10"
            :disabled="sedangLogout"
            title="Keluar"
            @click="modalLogout = true"
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
          aria-label="Toggle menu"
          @click="sidebarTerbuka = !sidebarTerbuka"
        >
          <LucideMenu :size="20" />
        </button>

        <div class="flex-1">
          <h1 class="text-base font-bold text-slate-100">
            {{ judulHalaman }}
          </h1>
          <p class="text-xs text-slate-500">
            {{ deskripsiHalaman }}
          </p>
        </div>

        <span class="hidden text-xs text-slate-600 sm:block">{{ tanggalSekarang }}</span>
      </header>

      <!-- Konten Halaman -->
      <main class="flex flex-col gap-5 p-5">
        <slot />
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
          <h3 class="text-base font-bold text-slate-100">
            Keluar dari Sistem?
          </h3>
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
              :disabled="sedangLogout"
              @click="handleLogout"
            >
              <LucideLoader
                v-if="sedangLogout"
                :size="15"
                class="animate-spin"
              />
              {{ sedangLogout ? 'Keluar...' : 'Ya, Keluar' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
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

const tanggalSekarang = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
})

// Dynamic page title based on route
const judulHalaman = computed(() => {
  const path = route.path
  if (path === '/dashboard') return 'Dashboard'
  if (path.startsWith('/dashboard/berita')) return 'Kelola Berita'
  if (path.startsWith('/dashboard/pinjam-gedung')) return 'Pinjam Pakai Gedung'
  return 'Dashboard'
})

const deskripsiHalaman = computed(() => {
  const path = route.path
  if (path === '/dashboard') return 'Selamat datang di Sistem KNPI Langsa'
  if (path.startsWith('/dashboard/berita')) return 'Kelola berita dan informasi terbaru'
  if (path.startsWith('/dashboard/pinjam-gedung')) return 'Kelola permohonan pinjam pakai gedung'
  return 'Selamat datang di Sistem KNPI Langsa'
})

async function handleLogout() {
  sedangLogout.value = true
  await $fetch('/api/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${authStore.token}` },
  }).catch(() => {})
  authStore.logout()
}

// Close sidebar on route change (mobile)
watch(() => route.path, () => {
  sidebarTerbuka.value = false
})

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) {
    await authStore.ambilProfil()
  }
})
</script>
