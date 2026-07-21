<template>
  <div class="flex flex-col gap-6">
    <!-- ====== HEADER BANNER ====== -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-knpi-900 via-knpi-800/80 to-blue-950 p-6 sm:p-8 shadow-2xl border border-knpi-500/20">
      <div class="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-knpi-400/15 blur-3xl" />
      <div class="pointer-events-none absolute -bottom-10 left-20 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-knpi-500/20 border border-knpi-400/30 text-xs font-semibold text-knpi-300 mb-3">
            <LucideNewspaper :size="14" />
            <span>Manajemen Berita & Informasi</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Kelola Berita Pemuda
          </h2>
          <p class="mt-1 text-sm text-slate-300/80">
            Publikasikan warta, kegiatan, pengumuman, dan artikel DPD KNPI Kota Langsa.
          </p>
        </div>
        <button
          id="btn-tambah-berita"
          class="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-knpi-500 text-white font-bold text-sm shadow-lg hover:bg-knpi-400 transition"
          @click="bukaFormTambah"
        >
          <LucidePlus :size="18" />
          <span>Tambah Berita Baru</span>
        </button>
      </div>
    </div>

    <!-- ====== FILTER TABS ====== -->
    <div class="flex gap-2 overflow-x-auto pb-1">
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

    <!-- ====== LOADING STATE ====== -->
    <div v-if="sedangMemuat" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center gap-4">
        <div class="w-10 h-10 border-4 border-knpi-500 border-t-transparent rounded-full animate-spin" />
        <span class="text-slate-400 text-sm">Memuat data berita...</span>
      </div>
    </div>

    <!-- ====== EMPTY STATE ====== -->
    <div
      v-else-if="beritaFiltered.length === 0"
      class="glass-card flex flex-col items-center justify-center py-20 gap-4 text-center"
    >
      <div class="w-16 h-16 rounded-2xl bg-knpi-500/10 border border-knpi-500/20 flex items-center justify-center text-knpi-400">
        <LucideNewspaper :size="32" />
      </div>
      <div>
        <h3 class="text-white font-bold text-lg">Belum ada berita</h3>
        <p class="text-slate-400 text-sm mt-1">Klik tombol "Tambah Berita Baru" untuk menerbitkan artikel pertama.</p>
      </div>
      <button
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-knpi-500 text-white font-bold text-sm hover:bg-knpi-400 transition"
        @click="bukaFormTambah"
      >
        <LucidePlus :size="16" />
        <span>Tambah Berita Pertama</span>
      </button>
    </div>

    <!-- ====== DAFTAR BERITA ====== -->
    <div v-else class="flex flex-col gap-4">
      <div
        v-for="item in beritaFiltered"
        :key="item.id"
        class="glass-card flex flex-col sm:flex-row gap-4 p-4 sm:p-5 hover:border-knpi-500/30 transition-colors"
      >
        <!-- Thumbnail Gambar -->
        <div class="shrink-0 w-full sm:w-44 h-28 rounded-xl overflow-hidden bg-slate-800 border border-white/5 relative">
          <img
            v-if="item.gambarUrl"
            :src="item.gambarUrl"
            :alt="item.judul"
            class="w-full h-full object-cover"
            onerror="this.src='/favicon.ico'; this.classList.add('object-contain','p-4')"
          />
          <div v-else class="absolute inset-0 flex items-center justify-center text-slate-600">
            <LucideImage :size="32" />
          </div>
          <!-- Badge Kategori -->
          <div class="absolute top-2 left-2">
            <span
              class="inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase backdrop-blur-md shadow-sm"
              :class="kelasKategori(item.kategori)"
            >
              {{ labelKategori(item.kategori) }}
            </span>
          </div>
        </div>

        <!-- Detail Konten -->
        <div class="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <h4 class="font-bold text-white text-base truncate">{{ item.judul }}</h4>
                <p class="text-xs text-slate-400 mt-1 line-clamp-2">{{ item.ringkasan }}</p>
              </div>
              <!-- Status Pill -->
              <span
                class="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                :class="item.status === 'terbit' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'"
              >
                <span class="h-1.5 w-1.5 rounded-full" :class="item.status === 'terbit' ? 'bg-emerald-400' : 'bg-amber-400'" />
                {{ item.status === 'terbit' ? 'Terbit' : 'Draf' }}
              </span>
            </div>
          </div>

          <!-- Bottom Meta & Actions -->
          <div class="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
            <span class="text-xs text-slate-500 font-medium">
              {{ formatTanggal(item.createdAt) }}
            </span>

            <div class="flex items-center gap-2">
              <button
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-knpi-500/30 bg-knpi-500/10 text-knpi-300 hover:bg-knpi-500/20 transition"
                @click="bukaFormEdit(item)"
              >
                <LucidePencil :size="14" /> Edit
              </button>
              <button
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                @click="konfirmasiHapus(item)"
              >
                <LucideTrash2 :size="14" /> Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ====== MODAL FORM TAMBAH / EDIT BERITA ====== -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="tampilForm"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        @click.self="tampilForm = false"
      >
        <div class="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
          <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-knpi-500/60 to-transparent" />

          <div class="p-6">
            <div class="flex items-center justify-between mb-5">
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <LucideNewspaper :size="20" class="text-knpi-400" />
                {{ modeEdit ? 'Edit Berita' : 'Buat Berita Baru' }}
              </h3>
              <button class="text-slate-400 hover:text-white transition" @click="tampilForm = false">
                <LucideX :size="20" />
              </button>
            </div>

            <form class="flex flex-col gap-4" @submit.prevent="simpanBerita">
              <!-- Judul -->
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1.5">
                  Judul Berita <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="form.judul"
                  type="text"
                  placeholder="Masukkan judul berita"
                  class="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-knpi-500/50 focus:outline-none focus:ring-1 focus:ring-knpi-500/30"
                  required
                />
              </div>

              <!-- Kategori & Status Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Kategori</label>
                  <select
                    v-model="form.kategori"
                    class="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white focus:border-knpi-500/50 focus:outline-none focus:ring-1 focus:ring-knpi-500/30"
                  >
                    <option value="kegiatan" class="bg-slate-900 text-white">Kegiatan</option>
                    <option value="pengumuman" class="bg-slate-900 text-white">Pengumuman</option>
                    <option value="artikel" class="bg-slate-900 text-white">Artikel</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Status Publikasi</label>
                  <select
                    v-model="form.status"
                    class="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white focus:border-knpi-500/50 focus:outline-none focus:ring-1 focus:ring-knpi-500/30"
                  >
                    <option value="draf" class="bg-slate-900 text-white">Draf (Disimpan)</option>
                    <option value="terbit" class="bg-slate-900 text-white">Terbit (Publik)</option>
                  </select>
                </div>
              </div>

              <!-- Ringkasan -->
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1.5">
                  Ringkasan Singkat <span class="text-red-400">*</span>
                </label>
                <textarea
                  v-model="form.ringkasan"
                  rows="2"
                  placeholder="Masukkan ringkasan singkat berita"
                  class="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-knpi-500/50 focus:outline-none focus:ring-1 focus:ring-knpi-500/30 resize-none"
                  required
                />
              </div>

              <!-- Konten -->
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1.5">
                  Konten Lengkap <span class="text-red-400">*</span>
                </label>
                <textarea
                  v-model="form.konten"
                  rows="6"
                  placeholder="Masukkan konten lengkap berita"
                  class="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-knpi-500/50 focus:outline-none focus:ring-1 focus:ring-knpi-500/30 resize-y"
                  required
                />
              </div>

              <!-- Upload Gambar Sampul -->
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1.5">Gambar Sampul</label>

                <!-- Preview Gambar -->
                <div v-if="previewGambar || form.gambarUrl" class="mb-3 relative rounded-xl overflow-hidden h-40 bg-slate-800 border border-white/10">
                  <img :src="previewGambar || form.gambarUrl" alt="Preview Sampul" class="w-full h-full object-cover" />
                  <button
                    type="button"
                    class="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-red-500/80 transition"
                    @click="hapusGambar"
                  >
                    <LucideX :size="14" />
                  </button>
                </div>

                <!-- Dropzone Upload -->
                <div
                  v-if="!previewGambar && !form.gambarUrl"
                  class="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/15 bg-slate-900/40 py-8 px-4 text-center hover:border-knpi-500/40 transition cursor-pointer"
                  @click="($refs.inputGambar as HTMLInputElement)?.click()"
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                >
                  <LucideUploadCloud :size="28" class="text-slate-500 mb-2" />
                  <p class="text-sm text-slate-400 font-medium">Klik atau seret gambar ke sini</p>
                  <p class="text-xs text-slate-500 mt-1">JPG, PNG, WebP — Maks. 5MB</p>
                  <input
                    ref="inputGambar"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    class="hidden"
                    @change="handleFileChange"
                  />
                </div>

                <!-- Loading Upload -->
                <div v-if="sedangUpload" class="mt-2 flex items-center gap-2 text-xs text-knpi-400">
                  <div class="w-4 h-4 border-2 border-knpi-400 border-t-transparent rounded-full animate-spin" />
                  Mengunggah gambar...
                </div>
              </div>

              <!-- Tombol Submit -->
              <div class="flex gap-3 pt-2">
                <button
                  type="button"
                  class="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 transition"
                  @click="tampilForm = false"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="sedangMenyimpan || sedangUpload"
                  class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-knpi-600 to-knpi-500 py-3 text-sm font-bold text-white shadow-lg hover:brightness-110 disabled:opacity-60 transition"
                >
                  <LucideLoader v-if="sedangMenyimpan" :size="16" class="animate-spin" />
                  <LucideSave v-else :size="16" />
                  {{ sedangMenyimpan ? 'Menyimpan...' : (modeEdit ? 'Simpan Perubahan' : 'Terbitkan Berita') }}
                </button>
              </div>
            </form>
          </div>
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
        v-if="tampilKonfirmasiHapus"
        class="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        @click.self="tampilKonfirmasiHapus = false"
      >
        <div class="glass-card w-full max-w-sm p-7 text-center relative overflow-hidden">
          <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/15 text-red-400">
            <LucideTrash2 :size="28" />
          </div>
          <h3 class="text-lg font-bold text-white">Hapus Berita Ini?</h3>
          <p class="mt-2 text-xs leading-relaxed text-slate-400">
            Berita <span class="text-white font-semibold">"{{ beritaDihapus?.judul }}"</span> akan dihapus secara permanen.
          </p>
          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 hover:bg-white/10 transition"
              @click="tampilKonfirmasiHapus = false"
            >
              Batal
            </button>
            <button
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-3 text-xs font-bold text-white hover:brightness-110 disabled:opacity-60 transition"
              :disabled="sedangMenghapus"
              @click="hapusBerita"
            >
              <LucideLoader v-if="sedangMenghapus" :size="14" class="animate-spin" />
              {{ sedangMenghapus ? 'Menghapus...' : 'Ya, Hapus' }}
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
const fileGambar = ref<File | null>(null)
const previewGambar = ref('')
const sedangUpload = ref(false)

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
  setTimeout(() => {
    toast.tampil = false
  }, 3000)
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
  fileGambar.value = null
  previewGambar.value = ''
  idDiedit.value = null
}

// Upload helpers
function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    pilihFile(target.files[0])
  }
}

function handleDrop(e: DragEvent) {
  if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
    pilihFile(e.dataTransfer.files[0])
  }
}

function pilihFile(file: File) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    tampilkanToast('Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.', 'error')
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    tampilkanToast('Ukuran file melebihi 5MB.', 'error')
    return
  }
  fileGambar.value = file
  previewGambar.value = URL.createObjectURL(file)
}

function hapusGambar() {
  fileGambar.value = null
  previewGambar.value = ''
  form.gambarUrl = ''
}

async function uploadGambar(): Promise<string | null> {
  if (!fileGambar.value) return null
  sedangUpload.value = true
  try {
    const formData = new FormData()
    formData.append('gambar', fileGambar.value)
    const res = await $fetch<{ berhasil: boolean, url: string }>('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: formData,
    })
    return res.url
  }
  catch {
    tampilkanToast('Gagal mengunggah gambar.', 'error')
    return null
  }
  finally {
    sedangUpload.value = false
  }
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
    // Upload gambar jika ada file baru
    if (fileGambar.value) {
      const url = await uploadGambar()
      if (url) form.gambarUrl = url
    }

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
