<template>
  <div>
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-lg font-extrabold text-slate-100">Permohonan Pinjam Gedung</h2>
        <p class="text-xs text-slate-500">Kelola permohonan pinjam pakai Graha Pemuda KNPI</p>
      </div>
    </div>

    <!-- Filter -->
    <div class="mt-5 flex gap-2 overflow-x-auto pb-2">
      <button v-for="tab in tabFilter" :key="tab.value"
        class="shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all"
        :class="filterAktif === tab.value ? 'border-knpi-500/30 bg-knpi-600/20 text-knpi-400' : 'border-white/10 bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300'"
        @click="filterAktif = tab.value">{{ tab.label }}</button>
    </div>

    <div v-if="sedangMemuat" class="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
      <LucideLoader :size="18" class="animate-spin" /> Memuat data...
    </div>

    <div v-else-if="dataFiltered.length === 0" class="mt-8 glass-card p-10 text-center">
      <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-600"><LucideBuilding2 :size="28" /></div>
      <p class="text-sm font-semibold text-slate-400">Belum ada permohonan</p>
    </div>

    <!-- Table -->
    <div v-else class="mt-5 glass-card overflow-hidden">
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-white/[0.07] text-[10px] font-bold uppercase tracking-widest text-slate-600">
              <th class="px-5 py-3.5">No</th>
              <th class="px-5 py-3.5">Pemohon</th>
              <th class="px-5 py-3.5">Keperluan</th>
              <th class="px-5 py-3.5">Tanggal</th>
              <th class="px-5 py-3.5">Status</th>
              <th class="px-5 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in dataFiltered" :key="item.id" class="border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]">
              <td class="px-5 py-3.5 text-slate-500">{{ i + 1 }}</td>
              <td class="px-5 py-3.5">
                <p class="font-semibold text-slate-200">{{ item.namaPemohon }}</p>
                <p class="text-xs text-slate-500">{{ item.organisasi }} · {{ item.noHp }}</p>
              </td>
              <td class="px-5 py-3.5 max-w-[200px]"><p class="text-slate-300 truncate">{{ item.keperluan }}</p></td>
              <td class="px-5 py-3.5 text-xs text-slate-500">{{ formatTanggal(item.tanggalMulai) }} — {{ formatTanggal(item.tanggalSelesai) }}</td>
              <td class="px-5 py-3.5"><span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" :class="kelasStatus(item.status)"><span class="h-1.5 w-1.5 rounded-full" :class="dotStatus(item.status)" />{{ labelStatus(item.status) }}</span></td>
              <td class="px-5 py-3.5">
                <div class="flex items-center justify-end gap-1.5">
                  <button class="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-knpi-600/20 hover:text-knpi-400" title="Detail" @click="bukaDetail(item)"><LucideEye :size="14" /></button>
                  <button v-if="item.status === 'menunggu'" class="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-emerald-500/20 hover:text-emerald-400" title="Setujui" @click="ubahStatus(item, 'disetujui')"><LucideCheck :size="14" /></button>
                  <button v-if="item.status === 'menunggu'" class="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400" title="Tolak" @click="ubahStatus(item, 'ditolak')"><LucideX :size="14" /></button>
                  <button class="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400" title="Hapus" @click="konfirmasiHapus(item)"><LucideTrash2 :size="14" /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="flex flex-col gap-3 p-4 md:hidden">
        <div v-for="item in dataFiltered" :key="'m-'+item.id" class="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0 flex-1">
              <p class="font-semibold text-slate-200">{{ item.namaPemohon }}</p>
              <p class="text-xs text-slate-500">{{ item.organisasi }}</p>
            </div>
            <span class="shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase" :class="kelasStatus(item.status)"><span class="h-1.5 w-1.5 rounded-full" :class="dotStatus(item.status)" />{{ labelStatus(item.status) }}</span>
          </div>
          <p class="mt-2 text-xs text-slate-400 line-clamp-2">{{ item.keperluan }}</p>
          <div class="mt-3 flex items-center justify-between">
            <span class="text-xs text-slate-500">{{ formatTanggal(item.tanggalMulai) }} — {{ formatTanggal(item.tanggalSelesai) }}</span>
            <div class="flex gap-1.5">
              <button class="rounded-lg border border-white/10 p-1.5 text-slate-400" @click="bukaDetail(item)"><LucideEye :size="13" /></button>
              <button v-if="item.status==='menunggu'" class="rounded-lg border border-white/10 p-1.5 text-emerald-400" @click="ubahStatus(item,'disetujui')"><LucideCheck :size="13" /></button>
              <button v-if="item.status==='menunggu'" class="rounded-lg border border-white/10 p-1.5 text-red-400" @click="ubahStatus(item,'ditolak')"><LucideX :size="13" /></button>
              <button class="rounded-lg border border-white/10 p-1.5 text-red-400" @click="konfirmasiHapus(item)"><LucideTrash2 :size="13" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Detail -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="tampilDetail" class="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-10 backdrop-blur-sm" @click.self="tampilDetail = false">
        <div class="glass-card w-full max-w-lg p-6 shadow-2xl sm:p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-slate-100">Detail Permohonan</h3>
            <button class="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-white/10" @click="tampilDetail = false"><LucideX :size="16" /></button>
          </div>
          <div v-if="detailItem" class="space-y-4">
            <div v-for="field in detailFields" :key="field.label">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-600">{{ field.label }}</span>
              <p class="mt-0.5 text-sm text-slate-300">{{ field.value || '—' }}</p>
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-600">Status</span>
              <div class="mt-1"><span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" :class="kelasStatus(detailItem.status)"><span class="h-1.5 w-1.5 rounded-full" :class="dotStatus(detailItem.status)" />{{ labelStatus(detailItem.status) }}</span></div>
            </div>
            <!-- Catatan Admin -->
            <div v-if="detailItem.status !== 'menunggu'">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-600">Catatan Admin</span>
              <p class="mt-0.5 text-sm text-slate-300">{{ detailItem.catatanAdmin || '—' }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal Ubah Status -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="tampilUbahStatus" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" @click.self="tampilUbahStatus = false">
        <div class="glass-card w-full max-w-sm p-7 shadow-2xl">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border" :class="statusBaru === 'disetujui' ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-400' : 'border-red-500/25 bg-red-500/10 text-red-400'">
            <LucideCheck v-if="statusBaru === 'disetujui'" :size="28" />
            <LucideX v-else :size="28" />
          </div>
          <h3 class="text-base font-bold text-slate-100 text-center">{{ statusBaru === 'disetujui' ? 'Setujui Permohonan?' : 'Tolak Permohonan?' }}</h3>
          <div class="mt-4">
            <label class="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Catatan (Opsional)</label>
            <textarea v-model="catatanAdmin" rows="3" placeholder="Tambahkan catatan..." class="form-input-base !pl-4 resize-none" />
          </div>
          <div class="mt-5 flex gap-3">
            <button class="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10" @click="tampilUbahStatus = false">Batal</button>
            <button class="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60" :class="statusBaru === 'disetujui' ? 'bg-gradient-to-r from-emerald-600 to-emerald-500' : 'bg-gradient-to-r from-red-600 to-red-500'" :disabled="sedangUpdate" @click="prosesUbahStatus">
              <LucideLoader v-if="sedangUpdate" :size="15" class="animate-spin" />
              {{ sedangUpdate ? 'Memproses...' : 'Ya, Konfirmasi' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="tampilHapus" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" @click.self="tampilHapus = false">
        <div class="glass-card w-full max-w-sm p-7 text-center shadow-2xl">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/25 bg-red-500/10 text-red-400"><LucideTrash2 :size="28" /></div>
          <h3 class="text-base font-bold text-slate-100">Hapus Permohonan?</h3>
          <p class="mt-2 text-sm text-slate-500">Data permohonan dari "<span class="font-semibold text-slate-300">{{ itemDihapus?.namaPemohon }}</span>" akan dihapus permanen.</p>
          <div class="mt-6 flex gap-3">
            <button class="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10" @click="tampilHapus = false">Batal</button>
            <button class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60" :disabled="sedangHapus" @click="prosesHapus">
              <LucideLoader v-if="sedangHapus" :size="15" class="animate-spin" />
              {{ sedangHapus ? 'Menghapus...' : 'Ya, Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-4" leave-active-class="transition duration-200 ease-in" leave-to-class="opacity-0 translate-y-4">
      <div v-if="toast.tampil" class="fixed bottom-6 right-6 z-[110] flex items-center gap-3 rounded-xl border px-5 py-3 shadow-xl backdrop-blur-xl" :class="toast.tipe === 'sukses' ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400' : 'border-red-500/30 bg-red-500/15 text-red-400'">
        <LucideCheckCircle v-if="toast.tipe === 'sukses'" :size="18" /><LucideXCircle v-else :size="18" />
        <span class="text-sm font-semibold">{{ toast.pesan }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

interface PinjamItem {
  id: number; namaPemohon: string; organisasi: string; noHp: string; email: string | null
  keperluan: string; keterangan: string | null; tanggalMulai: string; tanggalSelesai: string
  status: string; catatanAdmin: string | null; createdAt: string; updatedAt: string
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
  toast.pesan = pesan; toast.tipe = tipe; toast.tampil = true
  setTimeout(() => { toast.tampil = false }, 3000)
}

function formatTanggal(tgl: string) {
  return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
function labelStatus(s: string) { return ({ menunggu: 'Menunggu', disetujui: 'Disetujui', ditolak: 'Ditolak' } as Record<string,string>)[s] || s }
function kelasStatus(s: string) { return ({ menunggu: 'bg-amber-500/20 text-amber-400 border border-amber-500/30', disetujui: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30', ditolak: 'bg-red-500/20 text-red-400 border border-red-500/30' } as Record<string,string>)[s] || '' }
function dotStatus(s: string) { return ({ menunggu: 'bg-amber-400', disetujui: 'bg-emerald-400', ditolak: 'bg-red-400' } as Record<string,string>)[s] || '' }

async function muatData() {
  sedangMemuat.value = true
  try {
    const res = await $fetch<{ data: PinjamItem[] }>('/api/pinjam-gedung', { headers: { Authorization: `Bearer ${authStore.token}` } })
    daftarData.value = res.data
  } catch { tampilkanToast('Gagal memuat data.', 'error') }
  finally { sedangMemuat.value = false }
}

function bukaDetail(item: PinjamItem) { detailItem.value = item; tampilDetail.value = true }

function ubahStatus(item: PinjamItem, status: string) {
  itemUbahStatus.value = item; statusBaru.value = status; catatanAdmin.value = ''; tampilUbahStatus.value = true
}

async function prosesUbahStatus() {
  if (!itemUbahStatus.value) return
  sedangUpdate.value = true
  try {
    await $fetch(`/api/pinjam-gedung/${itemUbahStatus.value.id}`, {
      method: 'PUT', headers: { Authorization: `Bearer ${authStore.token}` },
      body: { status: statusBaru.value, catatanAdmin: catatanAdmin.value },
    })
    tampilkanToast(`Permohonan berhasil ${statusBaru.value === 'disetujui' ? 'disetujui' : 'ditolak'}.`)
    tampilUbahStatus.value = false; await muatData()
  } catch { tampilkanToast('Gagal memperbarui status.', 'error') }
  finally { sedangUpdate.value = false }
}

function konfirmasiHapus(item: PinjamItem) { itemDihapus.value = item; tampilHapus.value = true }

async function prosesHapus() {
  if (!itemDihapus.value) return
  sedangHapus.value = true
  try {
    await $fetch(`/api/pinjam-gedung/${itemDihapus.value.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${authStore.token}` } })
    tampilkanToast('Permohonan berhasil dihapus.')
    tampilHapus.value = false; itemDihapus.value = null; await muatData()
  } catch { tampilkanToast('Gagal menghapus.', 'error') }
  finally { sedangHapus.value = false }
}

onMounted(() => muatData())

useSeoMeta({ title: 'Pinjam Pakai Gedung — KNPI Langsa', description: 'Kelola permohonan pinjam pakai gedung KNPI Kota Langsa.' })
</script>
