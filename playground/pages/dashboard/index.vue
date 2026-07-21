<template>
  <div class="flex flex-col gap-6">
    <!-- ============ WELCOME HERO BANNER ============ -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-knpi-900 via-knpi-700 to-blue-600 p-6 sm:p-8 shadow-2xl border border-white/10">
      <div class="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl animate-float" />
      <div class="pointer-events-none absolute -bottom-16 right-32 h-48 w-48 rounded-full bg-knpi-400/25 blur-2xl animate-float-slow" />
      <div class="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-knpi-200">
            <component
              :is="ikonWaktu"
              :size="14"
              class="text-amber-300"
            />
            <span>{{ sapaanWaktu }}, {{ pengguna?.nama?.split(' ')[0] || pengguna?.username || 'User' }}</span>
          </div>

          <h2 class="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Dashboard KNPI Kota Langsa
          </h2>
          <p class="mt-1 text-xs sm:text-sm text-knpi-100/90">
            Kelola publikasi berita dan permohonan pinjam pakai Graha Pemuda.
          </p>
        </div>

        <div class="flex flex-wrap gap-3 shrink-0">
          <NuxtLink
            to="/dashboard/berita"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-knpi-800 font-bold text-xs shadow-lg hover:bg-knpi-50 transition"
          >
            <LucidePlus :size="16" />
            <span>Kelola Berita</span>
          </NuxtLink>
          <NuxtLink
            to="/dashboard/pinjam-gedung"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white font-bold text-xs backdrop-blur-md hover:bg-white/25 transition"
          >
            <LucideBuilding2 :size="16" />
            <span>Pinjam Gedung</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ============ STATS CARDS ============ -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <LucideActivity
            :size="14"
            class="text-knpi-400"
          /> Ringkasan Statistik
        </h3>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <!-- Card 1: Total Berita -->
        <NuxtLink
          to="/dashboard/berita"
          class="glass-card-hover p-5 flex flex-col justify-between group cursor-pointer"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400">Total Berita</span>
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-knpi-600 to-knpi-400 shadow-knpi text-white group-hover:scale-105 transition-transform">
              <LucideNewspaper :size="20" />
            </div>
          </div>
          <div class="mt-4">
            <span class="text-3xl font-black text-white tracking-tight">
              {{ memuatStats ? '...' : totalBerita }}
            </span>
            <div class="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
              <LucideTrendingUp :size="13" />
              <span>Publikasi aktif</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Card 2: Permohonan Gedung -->
        <NuxtLink
          to="/dashboard/pinjam-gedung"
          class="glass-card-hover p-5 flex flex-col justify-between group cursor-pointer"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400">Pinjam Gedung</span>
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-400 shadow-lg text-white group-hover:scale-105 transition-transform">
              <LucideBuilding2 :size="20" />
            </div>
          </div>
          <div class="mt-4">
            <span class="text-3xl font-black text-white tracking-tight">
              {{ memuatStats ? '...' : totalPermohonan }}
            </span>
            <div class="mt-2 flex items-center gap-1.5 text-[11px] text-teal-300 font-medium">
              <LucideCheckCircle2 :size="13" />
              <span>Pengajuan pinjam pakai</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Card 4: Status Sistem -->
        <div class="glass-card p-5 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400">Status Server</span>
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg text-white">
              <LucideShieldCheck :size="20" />
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center gap-2">
              <span class="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span class="text-xl font-bold text-white">Normal</span>
            </div>
            <div class="mt-2 flex items-center gap-1.5 text-[11px] text-amber-300 font-medium">
              <LucideZap :size="13" />
              <span>Sistem Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============ QUICK ACCESS & INFO SECTION ============ -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- SISI KIRI: Pintasan Modul Utama (8 Columns) -->
      <div class="lg:col-span-8 flex flex-col gap-4">
        <h3 class="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <LucideLayers
            :size="14"
            class="text-knpi-400"
          /> Pintasan Modul
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Tile Berita -->
          <NuxtLink
            to="/dashboard/berita"
            class="glass-card-hover p-6 flex flex-col justify-between group"
          >
            <div>
              <div class="flex items-center gap-3">
                <div class="p-2.5 rounded-xl bg-knpi-600/20 text-knpi-300 border border-knpi-500/30">
                  <LucideNewspaper :size="22" />
                </div>
                <div>
                  <h4 class="text-base font-bold text-white group-hover:text-knpi-300 transition-colors">
                    Kelola Berita
                  </h4>
                  <span class="text-[11px] text-slate-400">Kelola publikasi artikel</span>
                </div>
              </div>
              <p class="mt-4 text-xs text-slate-400 leading-relaxed">
                Buat dan perbarui artikel atau berita kegiatan DPD KNPI Kota Langsa.
              </p>
            </div>
            <div class="mt-5 flex items-center gap-2 text-xs font-semibold text-knpi-400 group-hover:translate-x-1 transition-transform">
              <span>Buka Halaman</span>
              <LucideArrowRight :size="15" />
            </div>
          </NuxtLink>

          <!-- Tile Pinjam Gedung -->
          <NuxtLink
            to="/dashboard/pinjam-gedung"
            class="glass-card-hover p-6 flex flex-col justify-between group"
          >
            <div>
              <div class="flex items-center gap-3">
                <div class="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <LucideBuilding2 :size="22" />
                </div>
                <div>
                  <h4 class="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Pinjam Gedung
                  </h4>
                  <span class="text-[11px] text-slate-400">Permohonan &amp; Jadwal</span>
                </div>
              </div>
              <p class="mt-4 text-xs text-slate-400 leading-relaxed">
                Tinjau surat permohonan dan atur persetujuan jadwal pinjam pakai Graha Pemuda.
              </p>
            </div>
            <div class="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Buka Halaman</span>
              <LucideArrowRight :size="15" />
            </div>
          </NuxtLink>

          <!-- Tile Kelola Slider -->
          <NuxtLink
            to="/dashboard/slider"
            class="glass-card-hover p-6 flex flex-col justify-between group sm:col-span-2"
          >
            <div>
              <div class="flex items-center gap-3">
                <div class="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <LucideImages :size="22" />
                </div>
                <div>
                  <h4 class="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Kelola Slider Beranda
                  </h4>
                  <span class="text-[11px] text-slate-400">Foto &amp; Deskripsi Slider</span>
                </div>
              </div>
              <p class="mt-4 text-xs text-slate-400 leading-relaxed">
                Tambah, edit, atau hapus foto dan teks yang tampil di slider halaman utama website KNPI Kota Langsa.
              </p>
            </div>
            <div class="mt-5 flex items-center gap-2 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Buka Halaman</span>
              <LucideArrowRight :size="15" />
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- SISI KANAN: Detail Informasi Akun (4 Columns) -->
      <div class="lg:col-span-4 flex flex-col gap-4">
        <h3 class="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <LucideUserCheck
            :size="14"
            class="text-knpi-400"
          /> Detail Akun
        </h3>

        <div class="glass-card p-6 flex flex-col gap-5">
          <!-- Avatar + Header Profil -->
          <div class="flex items-center gap-4 pb-4 border-b border-white/10">
            <div class="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-knpi-600 via-knpi-500 to-blue-500 text-lg font-black text-white shadow-knpi">
              {{ inisialNama }}
              <span class="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-900 bg-emerald-400" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="truncate text-base font-extrabold text-white">
                {{ pengguna?.nama || pengguna?.username || '—' }}
              </h4>
              <p class="text-xs text-slate-400 truncate">
                @{{ pengguna?.username || 'user' }}
              </p>
              <div class="mt-1.5">
                <span
                  class="badge"
                  :class="`badge-${pengguna?.peran}`"
                >
                  {{ labelPeran }}
                </span>
              </div>
            </div>
          </div>

          <!-- Detail Attributes -->
          <div class="flex flex-col gap-3.5 text-xs">
            <div class="flex items-center justify-between py-1.5 border-b border-white/5">
              <span class="text-slate-400 font-medium flex items-center gap-2">
                <LucideUser
                  :size="14"
                  class="text-slate-500"
                /> Username
              </span>
              <span class="font-semibold text-slate-200">{{ pengguna?.username || '—' }}</span>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-white/5">
              <span class="text-slate-400 font-medium flex items-center gap-2">
                <LucideShield
                  :size="14"
                  class="text-slate-500"
                /> Hak Akses
              </span>
              <span class="font-semibold text-knpi-300 capitalize">{{ labelPeran }}</span>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-white/5">
              <span class="text-slate-400 font-medium flex items-center gap-2">
                <LucideCalendar
                  :size="14"
                  class="text-slate-500"
                /> Terdaftar Sejak
              </span>
              <span class="font-semibold text-slate-200">{{ tanggalBergabung }}</span>
            </div>

            <div class="flex items-center justify-between py-1.5">
              <span class="text-slate-400 font-medium flex items-center gap-2">
                <LucideClock
                  :size="14"
                  class="text-slate-500"
                /> Sesi Aktif
              </span>
              <span class="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Terhubung
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const authStore = useAuthStore()
const pengguna = computed(() => authStore.penggunaLogin)

const totalBerita = ref<number | string>('—')
const totalPermohonan = ref<number | string>('—')
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

const tanggalBergabung = computed(() => {
  if (!pengguna.value?.createdAt) return '—'
  return new Date(pengguna.value.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
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

// Ambil data statistik dari API backend
onMounted(async () => {
  try {
    const token = authStore.token
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    const [resBerita, resPermohonan] = await Promise.allSettled([
      $fetch<unknown[]>('/api/berita', { headers }),
      $fetch<unknown[]>('/api/pinjam-gedung', { headers }),
    ])

    if (resBerita.status === 'fulfilled' && Array.isArray(resBerita.value)) {
      totalBerita.value = resBerita.value.length
    }
    else {
      totalBerita.value = 0
    }

    if (resPermohonan.status === 'fulfilled' && Array.isArray(resPermohonan.value)) {
      totalPermohonan.value = resPermohonan.value.length
    }
    else {
      totalPermohonan.value = 0
    }
  }
  catch {
    totalBerita.value = 0
    totalPermohonan.value = 0
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
