<template>
  <div>
    <!-- Welcome Banner -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-knpi-700 to-knpi-500 p-6 shadow-knpi">
      <!-- Dekorasi lingkaran -->
      <div class="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
      <div class="pointer-events-none absolute -bottom-8 right-20 h-32 w-32 rounded-full bg-white/8" />
      <div class="pointer-events-none absolute bottom-4 right-8 h-16 w-16 rounded-full bg-white/10" />

      <div class="relative">
        <p class="text-sm text-knpi-200">
          {{ sapaanWaktu }},
        </p>
        <h2 class="mt-0.5 text-2xl font-extrabold text-white">
          {{ pengguna?.nama || pengguna?.username || '...' }} 👋
        </h2>
        <p class="mt-1.5 max-w-md text-sm leading-relaxed text-knpi-100/80">
          Selamat datang di Sistem Informasi KNPI Kota Langsa. Semoga hari Anda menyenangkan dan produktif.
        </p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div
        v-for="stat in statistik"
        :key="stat.label"
        class="glass-card flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5 hover:bg-white/[0.07]"
      >
        <div
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          :class="stat.ikonBg"
        >
          <component
            :is="stat.ikon"
            :size="22"
            class="text-white"
          />
        </div>
        <div>
          <p class="text-xs font-medium text-slate-500">
            {{ stat.label }}
          </p>
          <p class="mt-0.5 text-2xl font-extrabold text-slate-100">
            {{ stat.nilai }}
          </p>
        </div>
      </div>
    </div>

    <!-- Info Akun -->
    <div class="mt-5">
      <h3 class="mb-3 text-xs font-bold uppercase tracking-widest text-slate-600">
        Informasi Akun
      </h3>
      <div class="glass-card p-5">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div
            v-for="item in infoAkun"
            :key="item.label"
            class="flex flex-col gap-1"
          >
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-600">{{ item.label }}</span>
            <span
              v-if="item.isBadge"
              class="mt-0.5"
            >
              <span
                class="badge"
                :class="`badge-${pengguna?.peran}`"
              >{{ item.nilai }}</span>
            </span>
            <span
              v-else
              class="text-sm font-medium text-slate-300"
            >{{ item.nilai || '—' }}</span>
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

useSeoMeta({
  title: 'Dashboard — KNPI Langsa',
  description: 'Dashboard sistem informasi KNPI Kota Langsa.',
})
</script>
