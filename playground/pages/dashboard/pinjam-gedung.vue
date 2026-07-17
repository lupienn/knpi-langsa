<template>
  <div class="flex flex-col gap-6">
    <!-- Header Page Section -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-xl font-extrabold text-white tracking-tight">
          Permohonan Pinjam Gedung
        </h2>
        <p class="text-xs text-slate-400 mt-1">
          Kelola surat permohonan dan persetujuan pinjam pakai Graha Pemuda KNPI Kota Langsa
        </p>
      </div>
    </div>

    <!-- Filter Pills & Search -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex gap-2 overflow-x-auto pb-1 max-w-full">
        <button
          v-for="tab in tabFilter"
          :key="tab.value"
          class="shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer"
          :class="filterAktif === tab.value
            ? 'border-knpi-500/40 bg-knpi-600/25 text-knpi-300 shadow-sm'
            : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'"
          @click="filterAktif = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="sedangMemuat"
      class="py-16 flex items-center justify-center gap-2.5 text-xs text-slate-400"
    >
      <LucideLoader
        :size="18"
        class="animate-spin text-knpi-400"
      />
      <span>Memuat data permohonan...</span>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="dataFiltered.length === 0"
      class="glass-card p-12 text-center"
    >
      <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-500">
        <LucideBuilding2 :size="26" />
      </div>
      <h3 class="text-sm font-bold text-slate-300">
        Belum ada permohonan pinjam gedung
      </h3>
      <p class="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
        Permohonan yang diajukan oleh masyarakat atau organisasi melalui portal publik akan tampil di sini.
      </p>
    </div>

    <!-- Table Container -->
    <div
      v-else
      class="glass-card overflow-hidden"
    >
      <!-- Desktop Table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-white/[0.08] bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <th class="px-5 py-4">
                No
              </th>
              <th class="px-5 py-4">
                Pemohon & Organisasi
              </th>
              <th class="px-5 py-4">
                Keperluan
              </th>
              <th class="px-5 py-4">
                Jadwal Pinjam
              </th>
              <th class="px-5 py-4">
                Status
              </th>
              <th class="px-5 py-4 text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/[0.04]">
            <tr
              v-for="(item, i) in dataFiltered"
              :key="item.id"
              class="transition-colors hover:bg-white/[0.03]"
            >
              <td class="px-5 py-4 text-xs font-medium text-slate-500">
                {{ i + 1 }}
              </td>
              <td class="px-5 py-4">
                <p class="font-bold text-slate-200 text-xs sm:text-sm">
                  {{ item.namaPemohon }}
                </p>
                <p class="text-xs text-slate-400 mt-0.5">
                  {{ item.organisasi }} · <span class="text-slate-500">{{ item.noHp }}</span>
                </p>
              </td>
              <td class="px-5 py-4 max-w-[220px]">
                <p class="text-xs text-slate-300 truncate">
                  {{ item.keperluan }}
                </p>
              </td>
              <td class="px-5 py-4 text-xs text-slate-400 font-medium whitespace-nowrap">
                {{ formatTanggal(item.tanggalMulai) }} — {{ formatTanggal(item.tanggalSelesai) }}
              </td>
              <td class="px-5 py-4">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                  :class="kelasStatus(item.status)"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full"
                    :class="dotStatus(item.status)"
                  />
                  {{ labelStatus(item.status) }}
                </span>
              </td>
              <td class="px-5 py-4">
                <div class="flex items-center justify-end gap-1.5">
                  <button
                    class="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:bg-knpi-600/20 hover:text-knpi-300 hover:border-knpi-500/30"
                    title="Lihat Detail"
                    @click="bukaDetail(item)"
                  >
                    <LucideEye :size="15" />
                  </button>
                  <button
                    v-if="item.status === 'menunggu'"
                    class="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/30"
                    title="Setujui Permohonan"
                    @click="ubahStatus(item, 'disetujui')"
                  >
                    <LucideCheck :size="15" />
                  </button>
                  <button
                    v-if="item.status === 'menunggu'"
                    class="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-500/30"
                    title="Tolak Permohonan"
                    @click="ubahStatus(item, 'ditolak')"
                  >
                    <LucideX :size="15" />
                  </button>
                  <button
                    class="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30"
                    title="Hapus Permohonan"
                    @click="konfirmasiHapus(item)"
                  >
                    <LucideTrash2 :size="15" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards Grid -->
      <div class="flex flex-col gap-3 p-4 md:hidden">
        <div
          v-for="item in dataFiltered"
          :key="'m-'+item.id"
          class="rounded-2xl border border-white/[0.08] bg-slate-900/40 p-4 flex flex-col gap-3"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="font-bold text-slate-200 text-sm">
                {{ item.namaPemohon }}
              </p>
              <p class="text-xs text-slate-400">
                {{ item.organisasi }}
              </p>
            </div>
            <span
              class="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
              :class="kelasStatus(item.status)"
            >
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="dotStatus(item.status)"
              />
              {{ labelStatus(item.status) }}
            </span>
          </div>

          <p class="text-xs text-slate-300 leading-relaxed line-clamp-2">
            {{ item.keperluan }}
          </p>

          <div class="flex items-center justify-between border-t border-white/5 pt-3 mt-1">
            <span class="text-[11px] text-slate-400 font-medium">
              {{ formatTanggal(item.tanggalMulai) }} — {{ formatTanggal(item.tanggalSelesai) }}
            </span>
            <div class="flex gap-1.5">
              <button
                class="rounded-lg border border-white/10 p-1.5 text-slate-400"
                @click="bukaDetail(item)"
              >
                <LucideEye :size="14" />
              </button>
              <button
                v-if="item.status === 'menunggu'"
                class="rounded-lg border border-white/10 p-1.5 text-emerald-400"
                @click="ubahStatus(item, 'disetujui')"
              >
                <LucideCheck :size="14" />
              </button>
              <button
                v-if="item.status === 'menunggu'"
                class="rounded-lg border border-white/10 p-1.5 text-amber-400"
                @click="ubahStatus(item, 'ditolak')"
              >
                <LucideX :size="14" />
              </button>
              <button
                class="rounded-lg border border-white/10 p-1.5 text-red-400"
                @click="konfirmasiHapus(item)"
              >
                <LucideTrash2 :size="14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Detail Permohonan -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="tampilDetail"
        class="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md"
        @click.self="tampilDetail = false"
      >
        <div class="glass-card w-full max-w-lg p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <div>
              <h3 class="text-base font-bold text-white">
                Detail Permohonan Gedung
              </h3>
              <p class="text-xs text-slate-400">
                Informasi permohonan pinjam pakai Graha Pemuda
              </p>
            </div>
            <button
              class="rounded-xl border border-white/10 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
              @click="tampilDetail = false"
            >
              <LucideX :size="16" />
            </button>
          </div>

          <div
            v-if="detailItem"
            class="space-y-4"
          >
            <div
              v-for="field in detailFields"
              :key="field.label"
              class="border-b border-white/5 pb-2.5"
            >
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">{{ field.label }}</span>
              <p class="mt-0.5 text-xs sm:text-sm font-medium text-slate-200">
                {{ field.value || '—' }}
              </p>
            </div>

            <div class="border-b border-white/5 pb-2.5">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Status Pengajuan</span>
              <div class="mt-1">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                  :class="kelasStatus(detailItem.status)"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full"
                    :class="dotStatus(detailItem.status)"
                  />
                  {{ labelStatus(detailItem.status) }}
                </span>
              </div>
            </div>

            <!-- Catatan Admin -->
            <div v-if="detailItem.status !== 'menunggu'">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Catatan Pengurus</span>
              <p class="mt-0.5 text-xs text-slate-300 italic">
                {{ detailItem.catatanAdmin || '—' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal Ubah Status (Setujui / Tolak) -->
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
        <div class="glass-card w-full max-w-sm p-6 sm:p-7 shadow-2xl text-center">
          <div
            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg"
            :class="statusBaru === 'disetujui' ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400' : 'border-amber-500/30 bg-amber-500/15 text-amber-400'"
          >
            <LucideCheck
              v-if="statusBaru === 'disetujui'"
              :size="30"
            />
            <LucideX
              v-else
              :size="30"
            />
          </div>

          <h3 class="text-base font-bold text-white">
            {{ statusBaru === 'disetujui' ? 'Setujui Permohonan?' : 'Tolak Permohonan?' }}
          </h3>
          <p class="text-xs text-slate-400 mt-1">
            Ubah status permohonan dari {{ itemUbahStatus?.namaPemohon }}.
          </p>

          <div class="mt-4 text-left">
            <label class="mb-1.5 block text-[11px] font-semibold text-slate-300">Catatan Pengurus (Opsional)</label>
            <textarea
              v-model="catatanAdmin"
              rows="3"
              placeholder="Catatan persetujuan atau alasan penolakan..."
              class="form-input-base !pl-4 resize-none"
            />
          </div>

          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
              @click="tampilUbahStatus = false"
            >
              Batal
            </button>
            <button
              class="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-60"
              :class="statusBaru === 'disetujui' ? 'bg-gradient-to-r from-emerald-600 to-emerald-500' : 'bg-gradient-to-r from-amber-600 to-amber-500'"
              :disabled="sedangUpdate"
              @click="prosesUbahStatus"
            >
              <LucideLoader
                v-if="sedangUpdate"
                :size="15"
                class="animate-spin"
              />
              {{ sedangUpdate ? 'Memproses...' : 'Konfirmasi' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus Permohonan -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="tampilHapus"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        @click.self="tampilHapus = false"
      >
        <div class="glass-card w-full max-w-sm p-6 sm:p-7 text-center shadow-2xl">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/15 text-red-400 shadow-lg">
            <LucideTrash2 :size="30" />
          </div>

          <h3 class="text-base font-bold text-white">
            Hapus Permohonan?
          </h3>
          <p class="mt-2 text-xs leading-relaxed text-slate-400">
            Data permohonan dari "<span class="font-semibold text-slate-200">{{ itemDihapus?.namaPemohon }}</span>" akan dihapus secara permanen.
          </p>

          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
              @click="tampilHapus = false"
            >
              Batal
            </button>
            <button
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-3 text-xs font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-60"
              :disabled="sedangHapus"
              @click="prosesHapus"
            >
              <LucideLoader
                v-if="sedangHapus"
                :size="15"
                class="animate-spin"
              />
              {{ sedangHapus ? 'Menghapus...' : 'Ya, Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast Notification -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="toast.tampil"
        class="fixed bottom-6 right-6 z-[110] flex items-center gap-3 rounded-xl border px-5 py-3.5 shadow-2xl backdrop-blur-xl"
        :class="toast.tipe === 'sukses' ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300' : 'border-red-500/30 bg-red-500/15 text-red-300'"
      >
        <LucideCheckCircle
          v-if="toast.tipe === 'sukses'"
          :size="18"
        />
        <LucideXCircle
          v-else
          :size="18"
        />
        <span class="text-xs font-bold">{{ toast.pesan }}</span>
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
