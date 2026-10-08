<template>
  <div class="flex flex-col gap-6">
    <!-- ============ WELCOME HERO BANNER ============ -->
    <div
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-knpi-900 via-knpi-700 to-blue-600 p-5 sm:p-8 shadow-2xl border border-white/10">
      <div
        class="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl animate-float" />
      <div
        class="pointer-events-none absolute -bottom-16 right-32 h-48 w-48 rounded-full bg-knpi-400/25 blur-2xl animate-float-slow" />
      <div class="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-knpi-200">
            <component :is="ikonWaktu" :size="14" class="text-amber-300" />
            <span>{{ sapaanWaktu }}, {{ pengguna?.nama?.split(' ')[0] || pengguna?.username || 'Pengguna' }}</span>
          </div>

          <h2 class="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Dashboard KNPI Kota Langsa
          </h2>
          <p class="mt-1 text-xs sm:text-sm text-knpi-100/90 max-w-xl leading-relaxed">
            Pusat kendali portal resmi DPD KNPI Kota Langsa. Kelola publikasi berita kegiatan, slider beranda, dan
            pantau status sistem secara terpadu.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          <NuxtLink to="/dashboard/berita"
            class="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-knpi-800 font-bold text-xs shadow-lg hover:bg-knpi-50 transition active:scale-95">
            <LucidePlus :size="16" />
            <span>Tambah Berita</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/slider"
            class="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white font-bold text-xs backdrop-blur-md hover:bg-white/25 transition active:scale-95">
            <LucideImages :size="16" />
            <span>Kelola Slider</span>
          </NuxtLink>
          <NuxtLink to="/" target="_blank"
            class="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs backdrop-blur-md hover:bg-white/20 hover:text-white transition">
            <LucideExternalLink :size="15" />
            <span>Lihat Web</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ============ STATS CARDS ============ -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <LucideActivity :size="14" class="text-knpi-400" /> Ringkasan Statistik
        </h3>
        <span class="text-[11px] text-slate-500 font-medium">Diperbarui secara langsung</span>
      </div>

      <div class="grid grid-cols-1 gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Card 1: Total Berita -->
        <NuxtLink to="/dashboard/berita"
          class="glass-card-hover p-5 flex flex-col justify-between group cursor-pointer">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400">Total Berita</span>
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-knpi-600 to-knpi-400 shadow-knpi text-white group-hover:scale-105 transition-transform">
              <LucideNewspaper :size="20" />
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-white tracking-tight">
                {{ memuatStats ? '...' : totalBerita }}
              </span>
              <span class="text-xs text-slate-400 font-medium">artikel</span>
            </div>
            <div class="mt-2 flex items-center gap-3 text-[11px] font-medium">
              <span class="text-emerald-400 flex items-center gap-1">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {{ totalBeritaTerbit }} Terbit
              </span>
              <span class="text-amber-400 flex items-center gap-1">
                <span class="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {{ totalBeritaDraf }} Draf
              </span>
            </div>
          </div>
        </NuxtLink>

        <!-- Card 2: Slider Beranda -->
        <NuxtLink to="/dashboard/slider"
          class="glass-card-hover p-5 flex flex-col justify-between group cursor-pointer">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400">Slider Beranda</span>
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg text-white group-hover:scale-105 transition-transform">
              <LucideImages :size="20" />
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-white tracking-tight">
                {{ memuatStats ? '...' : totalSlider }}
              </span>
              <span class="text-xs text-slate-400 font-medium">slide</span>
            </div>
            <div class="mt-2 flex items-center gap-1.5 text-[11px] text-amber-300 font-medium">
              <LucideCheckCircle2 :size="13" />
              <span>Visual promosi beranda</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Card 3: Status Server & Database -->
        <div class="glass-card p-5 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400">Status Server</span>
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg text-white">
              <LucideShieldCheck :size="20" />
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center gap-2">
              <span class="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span class="text-xl font-bold text-white">Online &amp; Stabil</span>
            </div>
            <div class="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-300 font-medium">
              <LucideZap :size="13" />
              <span>Basis data terhubung</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============ MAIN CONTENT SECTION ============ -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- SISI KIRI: Pintasan Modul & Berita Terbaru (8 Columns) -->
      <div class="lg:col-span-8 flex flex-col gap-6">
        <!-- Pintasan Modul -->
        <div class="flex flex-col gap-3">
          <h3 class="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <LucideLayers :size="14" class="text-knpi-400" /> Akses Cepat Modul
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Tile Berita -->
            <NuxtLink to="/dashboard/berita" class="glass-card-hover p-5 flex flex-col justify-between group">
              <div>
                <div class="flex items-center gap-3">
                  <div class="p-2.5 rounded-xl bg-knpi-600/20 text-knpi-300 border border-knpi-500/30">
                    <LucideNewspaper :size="20" />
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-white group-hover:text-knpi-300 transition-colors">
                      Kelola Berita
                    </h4>
                    <span class="text-[11px] text-slate-400">Publikasi warta pemuda</span>
                  </div>
                </div>
                <p class="mt-3 text-xs text-slate-400 leading-relaxed">
                  Tulis, edit, dan atur status penerbitan artikel kegiatan organisasi kepemudaan.
                </p>
              </div>
              <div
                class="mt-4 flex items-center gap-2 text-xs font-semibold text-knpi-400 group-hover:translate-x-1 transition-transform">
                <span>Buka Modul Berita</span>
                <LucideArrowRight :size="14" />
              </div>
            </NuxtLink>

            <!-- Tile Slider -->
            <NuxtLink to="/dashboard/slider" class="glass-card-hover p-5 flex flex-col justify-between group">
              <div>
                <div class="flex items-center gap-3">
                  <div class="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <LucideImages :size="20" />
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      Slider Beranda
                    </h4>
                    <span class="text-[11px] text-slate-400">Visual halaman muka</span>
                  </div>
                </div>
                <p class="mt-3 text-xs text-slate-400 leading-relaxed">
                  Kelola foto sorotan dan teks judul banner yang tampil pada beranda website.
                </p>
              </div>
              <div
                class="mt-4 flex items-center gap-2 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Buka Modul Slider</span>
                <LucideArrowRight :size="14" />
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Berita Terbaru Widget -->
        <div class="glass-card p-5 sm:p-6">
          <div class="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <LucideClock :size="16" class="text-knpi-400" />
                Berita Terbaru
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                Daftar publikasi artikel terakhir yang tercatat di sistem
              </p>
            </div>
            <NuxtLink to="/dashboard/berita"
              class="text-xs font-semibold text-knpi-400 hover:text-knpi-300 transition flex items-center gap-1">
              <span>Semua Berita</span>
              <LucideChevronRight :size="14" />
            </NuxtLink>
          </div>

          <!-- Loading state -->
          <div v-if="memuatStats" class="py-10 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
            <LucideLoader2 :size="24" class="animate-spin text-knpi-400" />
            <span>Memuat data warta...</span>
          </div>

          <!-- Empty state -->
          <div v-else-if="beritaTerbaru.length === 0" class="py-10 text-center text-xs text-slate-500">
            <p>Belum ada artikel berita yang dibuat.</p>
            <NuxtLink to="/dashboard/berita" class="inline-block mt-3 text-knpi-400 font-semibold hover:underline">
              + Buat berita pertama sekarang
            </NuxtLink>
          </div>

          <!-- News List -->
          <div v-else class="divide-y divide-white/5">
            <div v-for="item in beritaTerbaru" :key="item.id"
              class="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] -mx-2 px-2 rounded-xl transition">
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                    :class="item.status === 'terbit' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'">
                    {{ item.status }}
                  </span>
                  <span class="text-[11px] text-slate-400 capitalize">
                    {{ item.kategori }}
                  </span>
                  <span class="text-slate-600">&bull;</span>
                  <span class="text-[11px] text-slate-500">
                    {{ formatTanggal(item.createdAt) }}
                  </span>
                </div>
                <h4 class="text-xs sm:text-sm font-semibold text-slate-200 truncate group-hover:text-white">
                  {{ item.judul }}
                </h4>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <NuxtLink to="/dashboard/berita"
                  class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium transition">
                  Kelola
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SISI KANAN: Detail Informasi Akun & Sistem (4 Columns) -->
      <div class="lg:col-span-4 flex flex-col gap-6">
        <!-- Detail Profil Akun -->
        <div class="flex flex-col gap-3">
          <h3 class="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <LucideUserCheck :size="14" class="text-knpi-400" /> Profil Pengguna
          </h3>

          <div class="glass-card p-6 flex flex-col gap-5">
            <!-- Avatar + Header Profil -->
            <div class="flex items-center gap-4 pb-4 border-b border-white/10">
              <div
                class="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-knpi-600 via-knpi-500 to-blue-500 text-lg font-black text-white shadow-knpi">
                {{ inisialNama }}
                <span
                  class="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-900 bg-emerald-400" />
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="truncate text-base font-extrabold text-white">
                  {{ pengguna?.nama || pengguna?.username || '—' }}
                </h4>
                <p class="text-xs text-slate-400 truncate">
                  @{{ pengguna?.username || 'user' }}
                </p>
                <div class="mt-1.5">
                  <span class="badge" :class="`badge-${pengguna?.peran}`">
                    {{ labelPeran }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Detail Attributes -->
            <div class="flex flex-col gap-3.5 text-xs">
              <div class="flex items-center justify-between py-1 border-b border-white/5">
                <span class="text-slate-400 font-medium flex items-center gap-2">
                  <LucideUser :size="14" class="text-slate-500" /> Username
                </span>
                <span class="font-semibold text-slate-200">{{ pengguna?.username || '—' }}</span>
              </div>

              <div class="flex items-center justify-between py-1 border-b border-white/5">
                <span class="text-slate-400 font-medium flex items-center gap-2">
                  <LucideShield :size="14" class="text-slate-500" /> Hak Akses
                </span>
                <span class="font-semibold text-knpi-300 capitalize">{{ labelPeran }}</span>
              </div>


              <div class="flex items-center justify-between py-1">
                <span class="text-slate-400 font-medium flex items-center gap-2">
                  <LucideClock :size="14" class="text-slate-500" /> Status Sesi
                </span>
                <span class="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Terhubung
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Portal KNPI -->
        <div class="glass-card p-5 text-xs flex flex-col gap-3">
          <div class="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
            <LucideInfo :size="15" class="text-knpi-400" />
            <span>Informasi Sistem</span>
          </div>
          <div class="flex items-center justify-between text-xs text-slate-400 pt-0.5">
            <span>Versi Portal</span>
            <span
              class="font-mono font-bold text-slate-200 px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10">v1.2.0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

interface BeritaItem {
  id: number
  judul: string
  ringkasan: string
  kategori: string
  status: 'draf' | 'terbit'
  createdAt: string
  penulis?: string
}

const authStore = useAuthStore()
const pengguna = computed(() => authStore.penggunaLogin)

const totalBerita = ref<number | string>('—')
const totalBeritaTerbit = ref(0)
const totalBeritaDraf = ref(0)
const totalSlider = ref<number | string>('—')
const beritaTerbaru = ref<BeritaItem[]>([])
const memuatStats = ref(true)

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

const sapaanWaktu = computed(() => {
  const jam = new Date().getHours()
  if (jam < 12) return 'Selamat Pagi'
  if (jam < 15) return 'Selamat Siang'
  if (jam < 18) return 'Selamat Sore'
  return 'Selamat Malam'
})

const ikonWaktu = computed(() => {
  const jam = new Date().getHours()
  if (jam >= 6 && jam < 18) return 'LucideSun'
  return 'LucideMoon'
})

function formatTanggal(str?: string) {
  if (!str) return '—'
  return new Date(str).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Ambil data statistik dan berita dari API backend
onMounted(async () => {
  try {
    const token = authStore.token
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    const [resBerita, resSlider] = await Promise.allSettled([
      $fetch<{ berhasil: boolean, data: BeritaItem[] }>('/api/berita', { headers }),
      $fetch<{ berhasil: boolean, data: unknown[] }>('/api/slider', { headers }),
    ])

    if (resBerita.status === 'fulfilled') {
      const items = resBerita.value?.data || (Array.isArray(resBerita.value) ? resBerita.value : [])
      totalBerita.value = items.length
      totalBeritaTerbit.value = items.filter(b => b.status === 'terbit').length
      totalBeritaDraf.value = items.filter(b => b.status === 'draf').length
      beritaTerbaru.value = items.slice(0, 5)
    }
    else {
      totalBerita.value = 0
    }

    if (resSlider.status === 'fulfilled') {
      const items = resSlider.value?.data || (Array.isArray(resSlider.value) ? resSlider.value : [])
      totalSlider.value = items.length
    }
    else {
      totalSlider.value = 0
    }
  }
  catch {
    totalBerita.value = 0
    totalSlider.value = 0
  }
  finally {
    memuatStats.value = false
  }
})

useSeoMeta({
  title: 'Dashboard — KNPI Langsa',
  description: 'Dashboard Sistem Informasi Terpadu KNPI Kota Langsa.',
})
</script>
