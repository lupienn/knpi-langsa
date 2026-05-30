<template>
  <div>
    <!-- Header + Tombol Tambah -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-lg font-extrabold text-slate-100">
          Daftar Berita
        </h2>
        <p class="text-xs text-slate-500">
          Kelola berita, pengumuman, dan artikel KNPI Langsa
        </p>
      </div>
      <button
        id="btn-tambah-berita"
        class="btn-primary !w-auto !py-2.5 !px-5 !text-xs"
        @click="bukaFormTambah"
      >
        <LucidePlus :size="15" />
        Tambah Berita
      </button>
    </div>

    <!-- Filter Tabs -->
    <div class="mt-5 flex gap-2 overflow-x-auto pb-2">
      <button
        v-for="tab in tabFilter"
        :key="tab.value"
        class="shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all"
        :class="filterAktif === tab.value
          ? 'border-knpi-500/30 bg-knpi-600/20 text-knpi-400'
          : 'border-white/10 bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300'"
        @click="filterAktif = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Loading -->
    <div
      v-if="sedangMemuat"
      class="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500"
    >
      <LucideLoader :size="18" class="animate-spin" />
      Memuat data berita...
    </div>

    <!-- Empty State -->
    <div
      v-else-if="beritaFiltered.length === 0"
      class="mt-8 glass-card p-10 text-center"
    >
      <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-600">
        <LucideNewspaper :size="28" />
      </div>
      <p class="text-sm font-semibold text-slate-400">
        Belum ada berita
      </p>
      <p class="mt-1 text-xs text-slate-600">
        Klik tombol "Tambah Berita" untuk membuat berita pertama Anda.
      </p>
    </div>

    <!-- Tabel Berita -->
    <div
      v-else
      class="mt-5 glass-card overflow-hidden"
    >
      <!-- Desktop Table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-white/[0.07] text-[10px] font-bold uppercase tracking-widest text-slate-600">
              <th class="px-5 py-3.5">
                No
              </th>
              <th class="px-5 py-3.5">
                Judul
              </th>
              <th class="px-5 py-3.5">
                Kategori
              </th>
              <th class="px-5 py-3.5">
                Status
              </th>
              <th class="px-5 py-3.5">
                Tanggal
              </th>
              <th class="px-5 py-3.5 text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in beritaFiltered"
              :key="item.id"
              class="border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]"
            >
              <td class="px-5 py-3.5 text-slate-500">
                {{ index + 1 }}
              </td>
              <td class="px-5 py-3.5">
                <div class="max-w-xs">
                  <p class="font-semibold text-slate-200 truncate">
                    {{ item.judul }}
                  </p>
                  <p class="mt-0.5 text-xs text-slate-500 truncate">
                    {{ item.ringkasan }}
                  </p>
                </div>
              </td>
              <td class="px-5 py-3.5">
                <span
                  class="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                  :class="kelasKategori(item.kategori)"
                >{{ labelKategori(item.kategori) }}</span>
              </td>
              <td class="px-5 py-3.5">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                  :class="item.status === 'terbit' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full"
                    :class="item.status === 'terbit' ? 'bg-emerald-400' : 'bg-amber-400'"
                  />
                  {{ item.status === 'terbit' ? 'Terbit' : 'Draf' }}
                </span>
              </td>
              <td class="px-5 py-3.5 text-xs text-slate-500">
                {{ formatTanggal(item.createdAt) }}
              </td>
              <td class="px-5 py-3.5">
                <div class="flex items-center justify-end gap-1.5">
                  <button
                    class="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-knpi-600/20 hover:text-knpi-400 hover:border-knpi-600/30"
                    title="Edit"
                    @click="bukaFormEdit(item)"
                  >
                    <LucidePencil :size="14" />
                  </button>
                  <button
                    class="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30"
                    title="Hapus"
                    @click="konfirmasiHapus(item)"
                  >
                    <LucideTrash2 :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="flex flex-col gap-3 p-4 md:hidden">
        <div
          v-for="item in beritaFiltered"
          :key="'m-' + item.id"
          class="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0 flex-1">
              <p class="font-semibold text-slate-200 truncate">
                {{ item.judul }}
              </p>
              <p class="mt-0.5 text-xs text-slate-500 line-clamp-2">
                {{ item.ringkasan }}
              </p>
            </div>
            <span
              class="shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
              :class="item.status === 'terbit' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'"
            >
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="item.status === 'terbit' ? 'bg-emerald-400' : 'bg-amber-400'"
              />
              {{ item.status === 'terbit' ? 'Terbit' : 'Draf' }}
            </span>
          </div>
          <div class="mt-3 flex items-center justify-between">
            <div class="flex items-center gap-2 text-xs text-slate-500">
              <span
                class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                :class="kelasKategori(item.kategori)"
              >{{ labelKategori(item.kategori) }}</span>
              <span>{{ formatTanggal(item.createdAt) }}</span>
            </div>
            <div class="flex gap-1.5">
              <button
                class="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-knpi-600/20 hover:text-knpi-400"
                @click="bukaFormEdit(item)"
              >
                <LucidePencil :size="13" />
              </button>
              <button
                class="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
                @click="konfirmasiHapus(item)"
              >
                <LucideTrash2 :size="13" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============ MODAL FORM BERITA ============ -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="tampilForm"
        class="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-10 backdrop-blur-sm"
        @click.self="tampilForm = false"
      >
        <div class="glass-card w-full max-w-2xl p-6 shadow-2xl sm:p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-slate-100">
              {{ modeEdit ? 'Edit Berita' : 'Tambah Berita Baru' }}
            </h3>
            <button
              class="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-white/10"
              @click="tampilForm = false"
            >
              <LucideX :size="16" />
            </button>
          </div>

          <form
            class="flex flex-col gap-5"
            @submit.prevent="simpanBerita"
          >
            <!-- Judul -->
            <div>
              <label class="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Judul Berita *</label>
              <input
                v-model="form.judul"
                type="text"
                placeholder="Masukkan judul berita..."
                class="form-input-base !pl-4"
              >
            </div>

            <!-- Ringkasan -->
            <div>
              <label class="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Ringkasan *</label>
              <input
                v-model="form.ringkasan"
                type="text"
                placeholder="Ringkasan singkat berita..."
                class="form-input-base !pl-4"
              >
            </div>

            <!-- Konten -->
            <div>
              <label class="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Konten *</label>
              <textarea
                v-model="form.konten"
                rows="8"
                placeholder="Tulis konten berita di sini..."
                class="form-input-base !pl-4 resize-none"
              />
            </div>

            <!-- Row: Kategori + Status -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Kategori</label>
                <select
                  v-model="form.kategori"
                  class="form-input-base !pl-4"
                >
                  <option value="kegiatan">
                    Kegiatan
                  </option>
                  <option value="pengumuman">
                    Pengumuman
                  </option>
                  <option value="artikel">
                    Artikel
                  </option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Status</label>
                <select
                  v-model="form.status"
                  class="form-input-base !pl-4"
                >
                  <option value="draf">
                    Draf
                  </option>
                  <option value="terbit">
                    Terbit
                  </option>
                </select>
              </div>
            </div>

            <!-- URL Gambar -->
            <div>
              <label class="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">URL Gambar (Opsional)</label>
              <input
                v-model="form.gambarUrl"
                type="url"
                placeholder="https://contoh.com/gambar.jpg"
                class="form-input-base !pl-4"
              >
            </div>

            <!-- Tombol Submit -->
            <div class="mt-2 flex gap-3">
              <button
                type="button"
                class="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
                @click="tampilForm = false"
              >
                Batal
              </button>
              <button
                type="submit"
                class="btn-primary !flex-1"
                :disabled="sedangMenyimpan"
              >
                <LucideLoader
                  v-if="sedangMenyimpan"
                  :size="15"
                  class="animate-spin"
                />
                {{ sedangMenyimpan ? 'Menyimpan...' : (modeEdit ? 'Simpan Perubahan' : 'Tambah Berita') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- ============ MODAL KONFIRMASI HAPUS ============ -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="tampilKonfirmasiHapus"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        @click.self="tampilKonfirmasiHapus = false"
      >
        <div class="glass-card w-full max-w-sm p-7 text-center shadow-2xl">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/25 bg-red-500/10 text-red-400">
            <LucideTrash2 :size="28" />
          </div>
          <h3 class="text-base font-bold text-slate-100">
            Hapus Berita?
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-500">
            Berita "<span class="font-semibold text-slate-300">{{ beritaDihapus?.judul }}</span>" akan dihapus secara permanen.
          </p>
          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
              @click="tampilKonfirmasiHapus = false"
            >
              Batal
            </button>
            <button
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
              :disabled="sedangMenghapus"
              @click="hapusBerita"
            >
              <LucideLoader
                v-if="sedangMenghapus"
                :size="15"
                class="animate-spin"
              />
              {{ sedangMenghapus ? 'Menghapus...' : 'Ya, Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ============ NOTIFIKASI TOAST ============ -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="toast.tampil"
        class="fixed bottom-6 right-6 z-[110] flex items-center gap-3 rounded-xl border px-5 py-3 shadow-xl backdrop-blur-xl"
        :class="toast.tipe === 'sukses' ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400' : 'border-red-500/30 bg-red-500/15 text-red-400'"
      >
        <LucideCheckCircle
          v-if="toast.tipe === 'sukses'"
          :size="18"
        />
        <LucideXCircle
          v-else
          :size="18"
        />
        <span class="text-sm font-semibold">{{ toast.pesan }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

interface BeritaItem {
  id: number
  judul: string
  ringkasan: string
  konten: string
  kategori: string
  gambarUrl: string | null
  status: string
  penulisId: number
  penulis: string | null
  createdAt: string
  updatedAt: string
}

const authStore = useAuthStore()
const daftarBerita = ref<BeritaItem[]>([])
const sedangMemuat = ref(true)
const filterAktif = ref('semua')

const tabFilter = [
  { label: 'Semua', value: 'semua' },
  { label: 'Terbit', value: 'terbit' },
  { label: 'Draf', value: 'draf' },
  { label: 'Kegiatan', value: 'kegiatan' },
  { label: 'Pengumuman', value: 'pengumuman' },
  { label: 'Artikel', value: 'artikel' },
]

const beritaFiltered = computed(() => {
  if (filterAktif.value === 'semua') return daftarBerita.value
  if (['terbit', 'draf'].includes(filterAktif.value)) {
    return daftarBerita.value.filter(b => b.status === filterAktif.value)
  }
  return daftarBerita.value.filter(b => b.kategori === filterAktif.value)
})

// Form state
const tampilForm = ref(false)
const modeEdit = ref(false)
const sedangMenyimpan = ref(false)
const idDiedit = ref<number | null>(null)
const form = reactive({
  judul: '',
  ringkasan: '',
  konten: '',
  kategori: 'kegiatan',
  status: 'draf',
  gambarUrl: '',
})

// Delete state
const tampilKonfirmasiHapus = ref(false)
const sedangMenghapus = ref(false)
const beritaDihapus = ref<BeritaItem | null>(null)

// Toast
const toast = reactive({ tampil: false, pesan: '', tipe: 'sukses' as 'sukses' | 'error' })
function tampilkanToast(pesan: string, tipe: 'sukses' | 'error' = 'sukses') {
  toast.pesan = pesan
  toast.tipe = tipe
  toast.tampil = true
  setTimeout(() => { toast.tampil = false }, 3000)
}

// Helpers
function formatTanggal(tgl: string) {
  return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function labelKategori(kat: string) {
  const map: Record<string, string> = { kegiatan: 'Kegiatan', pengumuman: 'Pengumuman', artikel: 'Artikel' }
  return map[kat] || kat
}

function kelasKategori(kat: string) {
  const map: Record<string, string> = {
    kegiatan: 'bg-knpi-600/20 text-knpi-400 border border-knpi-600/30',
    pengumuman: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    artikel: 'bg-violet-500/20 text-violet-400 border border-violet-500/30',
  }
  return map[kat] || 'bg-slate-500/20 text-slate-400'
}

// CRUD
async function muatBerita() {
  sedangMemuat.value = true
  try {
    const res = await $fetch<{ data: BeritaItem[] }>('/api/berita', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    daftarBerita.value = res.data
  }
  catch {
    tampilkanToast('Gagal memuat data berita.', 'error')
  }
  finally {
    sedangMemuat.value = false
  }
}

function resetForm() {
  form.judul = ''
  form.ringkasan = ''
  form.konten = ''
  form.kategori = 'kegiatan'
  form.status = 'draf'
  form.gambarUrl = ''
  idDiedit.value = null
}

function bukaFormTambah() {
  modeEdit.value = false
  resetForm()
  tampilForm.value = true
}

function bukaFormEdit(item: BeritaItem) {
  modeEdit.value = true
  idDiedit.value = item.id
  form.judul = item.judul
  form.ringkasan = item.ringkasan
  form.konten = item.konten
  form.kategori = item.kategori
  form.status = item.status
  form.gambarUrl = item.gambarUrl || ''
  tampilForm.value = true
}

async function simpanBerita() {
  if (!form.judul || !form.ringkasan || !form.konten) {
    tampilkanToast('Judul, ringkasan, dan konten wajib diisi.', 'error')
    return
  }
  sedangMenyimpan.value = true
  try {
    if (modeEdit.value && idDiedit.value) {
      await $fetch(`/api/berita/${idDiedit.value}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${authStore.token}` },
        body: { ...form },
      })
      tampilkanToast('Berita berhasil diperbarui.')
    }
    else {
      await $fetch('/api/berita', {
        method: 'POST',
        headers: { Authorization: `Bearer ${authStore.token}` },
        body: { ...form },
      })
      tampilkanToast('Berita berhasil ditambahkan.')
    }
    tampilForm.value = false
    resetForm()
    await muatBerita()
  }
  catch {
    tampilkanToast('Gagal menyimpan berita.', 'error')
  }
  finally {
    sedangMenyimpan.value = false
  }
}

function konfirmasiHapus(item: BeritaItem) {
  beritaDihapus.value = item
  tampilKonfirmasiHapus.value = true
}

async function hapusBerita() {
  if (!beritaDihapus.value) return
  sedangMenghapus.value = true
  try {
    await $fetch(`/api/berita/${beritaDihapus.value.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    tampilkanToast('Berita berhasil dihapus.')
    tampilKonfirmasiHapus.value = false
    beritaDihapus.value = null
    await muatBerita()
  }
  catch {
    tampilkanToast('Gagal menghapus berita.', 'error')
  }
  finally {
    sedangMenghapus.value = false
  }
}

onMounted(() => {
  muatBerita()
})

useSeoMeta({
  title: 'Kelola Berita — KNPI Langsa',
  description: 'Kelola berita dan informasi KNPI Kota Langsa.',
})
</script>
