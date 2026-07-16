<template>
  <div class="flex min-h-screen bg-[#070a14] text-slate-100 selection:bg-knpi-500/30 selection:text-knpi-200">
    <!-- Ambient Background Light Gradient for Dashboard -->
    <div class="pointer-events-none fixed top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-knpi-600/10 blur-[140px]" />
    <div class="pointer-events-none fixed bottom-0 left-10 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[120px]" />

    <!-- ============ SIDEBAR ============ -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/[0.08] bg-[#0c1322]/90 backdrop-blur-2xl transition-transform duration-300 shadow-2xl"
      :class="sidebarTerbuka ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- Brand Header -->
      <div class="flex items-center justify-between border-b border-white/[0.08] px-5 py-5">
        <NuxtLink
          to="/dashboard"
          class="flex items-center gap-3 group"
        >
          <img
            :src="logoKnpi"
            alt="Logo KNPI"
            class="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          >
          <div>
            <span class="block text-sm font-bold text-white tracking-tight leading-none group-hover:text-knpi-300 transition-colors">KNPI Langsa</span>
            <span class="block text-[10px] text-slate-400 mt-1 font-medium">Kota Langsa</span>
          </div>
        </NuxtLink>

        <button
          class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          @click="sidebarTerbuka = false"
        >
          <LucideX :size="18" />
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-1 flex-col gap-1 overflow-y-auto px-3.5 py-5">
        <span class="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
          Menu Utama
        </span>

        <NuxtLink
          to="/dashboard"
          class="nav-item"
          :class="{ active: route.path === '/dashboard' }"
        >
          <LucideLayoutDashboard
            :size="18"
            class="shrink-0"
          />
          <span class="flex-1">Dashboard</span>
          <LucideChevronRight
            v-if="route.path === '/dashboard'"
            :size="14"
            class="opacity-70"
          />
        </NuxtLink>

        <span class="mb-2 mt-6 px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
          Kelola Konten & Layanan
        </span>

        <NuxtLink
          to="/dashboard/berita"
          class="nav-item"
          :class="{ active: route.path.startsWith('/dashboard/berita') }"
        >
          <LucideNewspaper
            :size="18"
            class="shrink-0"
          />
          <span class="flex-1">Berita Pemuda</span>
          <LucideChevronRight
            v-if="route.path.startsWith('/dashboard/berita')"
            :size="14"
            class="opacity-70"
          />
        </NuxtLink>

        <NuxtLink
          to="/dashboard/pinjam-gedung"
          class="nav-item"
          :class="{ active: route.path.startsWith('/dashboard/pinjam-gedung') }"
        >
          <LucideBuilding2
            :size="18"
            class="shrink-0"
          />
          <span class="flex-1">Pinjam Gedung</span>
          <LucideChevronRight
            v-if="route.path.startsWith('/dashboard/pinjam-gedung')"
            :size="14"
            class="opacity-70"
          />
        </NuxtLink>

        <span class="mb-2 mt-6 px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
          Pintasan Tautan
        </span>

        <NuxtLink
          to="/"
          target="_blank"
          class="nav-item text-slate-400 hover:text-slate-200"
        >
          <LucideGlobe
            :size="18"
            class="shrink-0 text-slate-400"
          />
          <span class="flex-1">Lihat Website Publik</span>
          <LucideExternalLink
            :size="14"
            class="opacity-50"
          />
        </NuxtLink>
      </nav>

      <!-- User Profile Box & Logout Button -->
      <div class="border-t border-white/[0.08] p-3.5">
        <div class="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/50 p-2.5">
          <div class="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-knpi-600 to-blue-600 text-xs font-bold text-white shadow-md">
            {{ inisialNama }}
            <span class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0c1322] bg-emerald-400" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-xs font-bold text-slate-200">
              {{ pengguna?.nama || pengguna?.username || 'Pengguna' }}
            </p>
            <span
              class="badge mt-0.5"
              :class="`badge-${pengguna?.peran}`"
            >
              {{ labelPeran }}
            </span>
          </div>
          <button
            id="btn-logout"
            class="flex shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
            :disabled="sedangLogout"
            title="Keluar dari Sistem"
            @click="modalLogout = true"
          >
            <LucideLogOut :size="16" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay Mobile -->
    <div
      v-if="sidebarTerbuka"
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
      @click="sidebarTerbuka = false"
    />

    <!-- ============ MAIN CONTENT AREA ============ -->
    <div class="flex flex-1 flex-col lg:pl-64 min-w-0">
      <!-- Topbar Header -->
      <header class="sticky top-0 z-30 flex items-center gap-4 border-b border-white/[0.08] bg-[#070a14]/85 px-5 py-4 backdrop-blur-xl">
        <button
          class="flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 p-2 text-slate-300 hover:bg-white/10 lg:hidden transition"
          aria-label="Buka Menu"
          @click="sidebarTerbuka = !sidebarTerbuka"
        >
          <LucideMenu :size="20" />
        </button>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <h1 class="text-lg font-bold tracking-tight text-white truncate">
              {{ judulHalaman }}
            </h1>
          </div>
          <p class="text-xs text-slate-400 truncate">
            {{ deskripsiHalaman }}
          </p>
        </div>

        <!-- Right Topbar Utilities -->
        <div class="hidden sm:flex items-center gap-3">
          <div class="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3.5 py-1.5 text-xs text-slate-400 font-medium">
            <LucideCalendar
              :size="14"
              class="text-knpi-400"
            />
            <span>{{ tanggalSekarang }}</span>
          </div>
        </div>
      </header>

      <!-- Main Slot Content -->
      <main class="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 flex-1">
        <slot />
      </main>

      <!-- Footer Bar -->
      <footer class="border-t border-white/[0.06] py-4 px-6 text-center text-xs text-slate-500">
        DPD KNPI Kota Langsa &copy; {{ new Date().getFullYear() }} — Sistem Informasi Terpadu
      </footer>
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
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        @click.self="modalLogout = false"
      >
        <div class="glass-card w-full max-w-sm p-7 text-center shadow-2xl relative overflow-hidden">
          <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/15 text-red-400 shadow-lg">
            <LucideLogOut :size="30" />
          </div>
          <h3 class="text-lg font-bold text-white">
            Keluar dari Sistem?
          </h3>
          <p class="mt-2 text-xs leading-relaxed text-slate-400">
            Anda akan mengakhiri sesi saat ini. Pastikan seluruh perubahan telah tersimpan.
          </p>
          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
              @click="modalLogout = false"
            >
              Batal
            </button>
            <button
              id="btn-konfirmasi-logout"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-3 text-xs font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-60"
              :disabled="sedangLogout"
              @click="handleLogout"
            >
              <LucideLoader
                v-if="sedangLogout"
                :size="16"
                class="animate-spin"
              />
              {{ sedangLogout ? 'Mengeluarkan...' : 'Ya, Keluar' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import logoKnpi from '~/assets/logo-knpi.png'

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

const judulHalaman = computed(() => {
  const path = route.path
  if (path === '/dashboard') return 'Dashboard'
  if (path.startsWith('/dashboard/berita')) return 'Kelola Berita'
  if (path.startsWith('/dashboard/pinjam-gedung')) return 'Pinjam Pakai Gedung'
  return 'Dashboard'
})

const deskripsiHalaman = computed(() => {
  const path = route.path
  if (path === '/dashboard') return 'Ringkasan data dan aktivitas sistem'
  if (path.startsWith('/dashboard/berita')) return 'Manajemen warta & artikel publikasi'
  if (path.startsWith('/dashboard/pinjam-gedung')) return 'Pengajuan & persetujuan sewa gedung'
  return 'Sistem Informasi KNPI Kota Langsa'
})

async function handleLogout() {
  sedangLogout.value = true
  await $fetch('/api/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${authStore.token}` },
  }).catch(() => {})
  authStore.logout()
}

watch(() => route.path, () => {
  sidebarTerbuka.value = false
})

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) {
    await authStore.ambilProfil()
  }
})
</script>
