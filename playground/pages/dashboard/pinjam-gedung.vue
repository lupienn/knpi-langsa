<template>
  <div class="flex flex-col gap-6">
    <!-- ====== HEADER BANNER ====== -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900/60 to-knpi-950 p-6 sm:p-8 shadow-2xl border border-emerald-500/20">
      <div class="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />
      <div class="pointer-events-none absolute -bottom-10 left-20 h-40 w-40 rounded-full bg-teal-400/20 blur-2xl" />
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-semibold text-emerald-300 mb-3">
            <LucideBuilding2 :size="14" />
            <span>Layanan Graha Pemuda</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Permohonan Pinjam Gedung
          </h2>
          <p class="mt-1 text-sm text-slate-300/80">
            Kelola pengajuan, verifikasi jadwal, dan persetujuan sewa pakai Graha Pemuda KNPI Kota Langsa.
          </p>
        </div>
      </div>
    </div>

    <!-- ====== FILTER TABS ====== -->
    <div class="flex gap-2 overflow-x-auto pb-1">
      <button
        v-for="tab in tabFilter"
        :key="tab.value"
        class="shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer"
        :class="filterAktif === tab.value
          ? 'border-emerald-500/40 bg-emerald-600/25 text-emerald-300 shadow-sm'
          : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'"
        @click="filterAktif = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- ====== LOADING STATE ====== -->
    <div v-if="sedangMemuat" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center gap-4">
        <div class="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span class="text-slate-400 text-sm">Memuat data permohonan...</span>
      </div>
    </div>

    <!-- ====== EMPTY STATE ====== -->
    <div
      v-else-if="dataFiltered.length === 0"
      class="glass-card flex flex-col items-center justify-center py-20 gap-4 text-center"
    >
      <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
        <LucideBuilding2 :size="32" />
      </div>
      <div>
        <h3 class="text-white font-bold text-lg">Belum Ada Permohonan</h3>
        <p class="text-slate-400 text-sm mt-1 max-w-md">
          Permohonan pinjam gedung yang diajukan oleh organisasi atau publik akan tampil di sini.
        </p>
      </div>
    </div>

    <!-- ====== DAFTAR PERMOHONAN ====== -->
    <div v-else class="flex flex-col gap-4">
      <div
        v-for="item in dataFiltered"
        :key="item.id"
        class="glass-card flex flex-col sm:flex-row gap-4 p-4 sm:p-5 hover:border-emerald-500/30 transition-colors"
      >
        <!-- Icon & Pemohon Info -->
        <div class="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="flex items-center gap-2">
                  <h4 class="font-bold text-white text-base truncate">{{ item.namaPemohon }}</h4>
                  <span class="text-xs text-slate-400 font-normal">({{ item.organisasi }})</span>
                </div>
                <p class="text-xs text-emerald-400 font-medium mt-1">
                  📞 {{ item.noHp }} <span v-if="item.email" class="text-slate-400">· ✉️ {{ item.email }}</span>
                </p>
              </div>

              <!-- Status Pill -->
              <span
                class="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border"
                :class="kelasStatus(item.status)"
              >
                <span class="h-1.5 w-1.5 rounded-full" :class="dotStatus(item.status)" />
                {{ labelStatus(item.status) }}
              </span>
            </div>

            <div class="mt-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <p class="text-xs text-slate-300 font-medium"><span class="text-slate-400">Keperluan:</span> {{ item.keperluan }}</p>
              <p v-if="item.keterangan" class="text-xs text-slate-400 mt-1"><span class="text-slate-500">Keterangan:</span> {{ item.keterangan }}</p>
              <p v-if="item.catatanAdmin" class="text-xs text-amber-300 mt-2 font-medium bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                Catatan Admin: {{ item.catatanAdmin }}
              </p>
            </div>
          </div>

          <!-- Bottom Meta & Actions -->
          <div class="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
            <span class="text-xs text-slate-400 font-medium">
              📅 Jadwal: <strong class="text-slate-200">{{ formatTanggal(item.tanggalMulai) }}</strong> s/d <strong class="text-slate-200">{{ formatTanggal(item.tanggalSelesai) }}</strong>
            </span>

            <div class="flex items-center gap-2">
              <button
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition"
                title="Lihat Detail"
                @click="bukaDetail(item)"
              >
                <LucideEye :size="14" /> Detail
              </button>

              <button
                v-if="item.status === 'menunggu'"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition"
                title="Setujui Permohonan"
                @click="ubahStatus(item, 'disetujui')"
              >
                <LucideCheck :size="14" /> Setujui
              </button>

              <button
                v-if="item.status === 'menunggu'"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition"
                title="Tolak Permohonan"
                @click="ubahStatus(item, 'ditolak')"
              >
                <LucideX :size="14" /> Tolak
              </button>

              <button
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                title="Hapus Permohonan"
                @click="konfirmasiHapus(item)"
              >
                <LucideTrash2 :size="14" /> Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ====== MODAL DETAIL PERMOHONAN ====== -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="tampilDetail"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        @click.self="tampilDetail = false"
      >
        <div class="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
          <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

          <div class="p-6">
            <div class="flex items-center justify-between mb-5">
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <LucideBuilding2 :size="20" class="text-emerald-400" />
                Detail Permohonan Pinjam Gedung
              </h3>
              <button class="text-slate-400 hover:text-white transition" @click="tampilDetail = false">
                <LucideX :size="20" />
              </button>
            </div>

            <div class="flex flex-col gap-3">
              <div
                v-for="field in detailFields"
                :key="field.label"
                class="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-white/5 text-xs gap-1"
              >
                <span class="text-slate-400 font-medium">{{ field.label }}</span>
                <span class="text-white font-semibold text-right">{{ field.value || '—' }}</span>
              </div>

              <div v-if="detailItem?.catatanAdmin" class="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <span class="font-bold text-amber-300 block mb-1">Catatan Admin:</span>
                <span class="text-slate-300">{{ detailItem.catatanAdmin }}</span>
              </div>
            </div>

            <div class="mt-6 flex justify-end">
              <button
                class="rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 transition"
                @click="tampilDetail = false"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ====== MODAL UBAH STATUS (SETUJUI / TOLAK) ====== -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="tampilUbahStatus"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        @click.self="tampilUbahStatus = false"
      >
        <div class="glass-card w-full max-w-md p-6 relative">
          <div class="absolute inset-x-0 top-0 h-[1px]" :class="statusBaru === 'disetujui' ? 'bg-emerald-500' : 'bg-amber-500'" />

          <h3 class="text-lg font-bold text-white mb-2">
            {{ statusBaru === 'disetujui' ? 'Setujui Permohonan' : 'Tolak Permohonan' }}
          </h3>
          <p class="text-xs text-slate-400 mb-4">
            Pemohon: <span class="text-white font-semibold">{{ itemUbahStatus?.namaPemohon }}</span> ({{ itemUbahStatus?.organisasi }})
          </p>

          <form @submit.prevent="prosesUbahStatus">
            <div class="mb-4">
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Catatan Admin (Opsional)</label>
              <textarea
                v-model="catatanAdmin"
                rows="3"
                placeholder="Berikan catatan alasan persetujuan atau penolakan..."
                class="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 resize-none"
              />
            </div>

            <div class="flex gap-3">
              <button
                type="button"
                class="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 transition"
                @click="tampilUbahStatus = false"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="sedangUpdate"
                class="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white shadow-lg transition"
                :class="statusBaru === 'disetujui' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-amber-600 hover:bg-amber-500'"
              >
                <LucideLoader v-if="sedangUpdate" :size="16" class="animate-spin" />
                {{ sedangUpdate ? 'Memproses...' : 'Konfirmasi' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- ====== MODAL KONFIRMASI HAPUS ====== -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="tampilHapus"
        class="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        @click.self="tampilHapus = false"
      >
        <div class="glass-card w-full max-w-sm p-7 text-center relative overflow-hidden">
          <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/15 text-red-400">
            <LucideTrash2 :size="28" />
          </div>
          <h3 class="text-lg font-bold text-white">Hapus Permohonan Ini?</h3>
          <p class="mt-2 text-xs leading-relaxed text-slate-400">
            Permohonan dari <span class="text-white font-semibold">"{{ itemDihapus?.namaPemohon }}"</span> akan dihapus permanen.
          </p>
          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 hover:bg-white/10 transition"
              @click="tampilHapus = false"
            >
              Batal
            </button>
            <button
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-3 text-xs font-bold text-white hover:brightness-110 disabled:opacity-60 transition"
              :disabled="sedangHapus"
              @click="prosesHapus"
            >
              <LucideLoader v-if="sedangHapus" :size="14" class="animate-spin" />
              {{ sedangHapus ? 'Menghapus...' : 'Ya, Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ====== TOAST NOTIFIKASI ====== -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="toast.tampil"
        class="fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-2xl border px-5 py-3.5 shadow-2xl backdrop-blur-xl"
        :class="toast.tipe === 'sukses' ? 'border-emerald-500/30 bg-emerald-950/80 text-emerald-300' : 'border-red-500/30 bg-red-950/80 text-red-300'"
      >
        <LucideCheckCircle v-if="toast.tipe === 'sukses'" :size="18" />
        <LucideXCircle v-else :size="18" />
        <span class="text-sm font-semibold">{{ toast.pesan }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

interface PinjamItem {
  id: number
  namaPemohon: string
  organisasi: string
  noHp: string
  email: string | null
  keperluan: string
  keterangan: string | null
  tanggalMulai: string
  tanggalSelesai: string
  status: string
  catatanAdmin: string | null
  createdAt: string
  updatedAt: string
}

const authStore = useAuthStore()
const daftarData = ref<PinjamItem[]>([])
const sedangMemuat = ref(true)
const filterAktif = ref('semua')

const tabFilter = [
  { label: 'Semua', value: 'semua' },
  { label: 'Menunggu', value: 'menunggu' },
  { label: 'Disetujui', value: 'disetujui' },
  { label: 'Ditolak', value: 'ditolak' },
]

const dataFiltered = computed(() => {
  if (filterAktif.value === 'semua') return daftarData.value
  return daftarData.value.filter(d => d.status === filterAktif.value)
})

// Detail
const tampilDetail = ref(false)
const detailItem = ref<PinjamItem | null>(null)
const detailFields = computed(() => {
  if (!detailItem.value) return []
  const d = detailItem.value
  return [
    { label: 'Nama Pemohon', value: d.namaPemohon },
    { label: 'Organisasi', value: d.organisasi },
    { label: 'No. HP', value: d.noHp },
    { label: 'Email', value: d.email },
    { label: 'Keperluan', value: d.keperluan },
    { label: 'Keterangan', value: d.keterangan },
    { label: 'Tanggal Mulai', value: formatTanggal(d.tanggalMulai) },
    { label: 'Tanggal Selesai', value: formatTanggal(d.tanggalSelesai) },
    { label: 'Diajukan Pada', value: formatTanggal(d.createdAt) },
  ]
})

// Status update
const tampilUbahStatus = ref(false)
const sedangUpdate = ref(false)
const statusBaru = ref('')
const catatanAdmin = ref('')
const itemUbahStatus = ref<PinjamItem | null>(null)

// Delete
const tampilHapus = ref(false)
const sedangHapus = ref(false)
const itemDihapus = ref<PinjamItem | null>(null)

// Toast
const toast = reactive({ tampil: false, pesan: '', tipe: 'sukses' as 'sukses' | 'error' })
function tampilkanToast(pesan: string, tipe: 'sukses' | 'error' = 'sukses') {
  toast.pesan = pesan
  toast.tipe = tipe
  toast.tampil = true
  setTimeout(() => {
    toast.tampil = false
  }, 3000)
}

function formatTanggal(tgl: string) {
  try {
    return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  }
  catch {
    return tgl
  }
}

function labelStatus(s: string) {
  const map: Record<string, string> = { menunggu: 'Menunggu', disetujui: 'Disetujui', ditolak: 'Ditolak' }
  return map[s] || s
}

function kelasStatus(s: string) {
  const map: Record<string, string> = {
    menunggu: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    disetujui: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    ditolak: 'bg-red-500/20 text-red-300 border border-red-500/30',
  }
  return map[s] || ''
}

function dotStatus(s: string) {
  const map: Record<string, string> = {
    menunggu: 'bg-amber-400',
    disetujui: 'bg-emerald-400',
    ditolak: 'bg-red-400',
  }
  return map[s] || ''
}

async function muatData() {
  sedangMemuat.value = true
  try {
    const res = await $fetch<{ data: PinjamItem[] }>('/api/pinjam-gedung', { headers: { Authorization: `Bearer ${authStore.token}` } })
    daftarData.value = res.data
  }
  catch {
    tampilkanToast('Gagal memuat data permohonan.', 'error')
  }
  finally {
    sedangMemuat.value = false
  }
}

function bukaDetail(item: PinjamItem) {
  detailItem.value = item
  tampilDetail.value = true
}

function ubahStatus(item: PinjamItem, status: string) {
  itemUbahStatus.value = item
  statusBaru.value = status
  catatanAdmin.value = ''
  tampilUbahStatus.value = true
}

async function prosesUbahStatus() {
  if (!itemUbahStatus.value) return
  sedangUpdate.value = true
  try {
    await $fetch(`/api/pinjam-gedung/${itemUbahStatus.value.id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: { status: statusBaru.value, catatanAdmin: catatanAdmin.value },
    })
    tampilkanToast(`Permohonan berhasil ${statusBaru.value === 'disetujui' ? 'disetujui' : 'ditolak'}.`)
    tampilUbahStatus.value = false
    await muatData()
  }
  catch {
    tampilkanToast('Gagal memperbarui status.', 'error')
  }
  finally {
    sedangUpdate.value = false
  }
}

function konfirmasiHapus(item: PinjamItem) {
  itemDihapus.value = item
  tampilHapus.value = true
}

async function prosesHapus() {
  if (!itemDihapus.value) return
  sedangHapus.value = true
  try {
    await $fetch(`/api/pinjam-gedung/${itemDihapus.value.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    tampilkanToast('Permohonan berhasil dihapus.')
    tampilHapus.value = false
    itemDihapus.value = null
    await muatData()
  }
  catch {
    tampilkanToast('Gagal menghapus permohonan.', 'error')
  }
  finally {
    sedangHapus.value = false
  }
}

onMounted(() => muatData())

useSeoMeta({
  title: 'Pinjam Pakai Gedung — KNPI Langsa',
  description: 'Kelola permohonan pinjam pakai gedung KNPI Kota Langsa.',
})
</script>
