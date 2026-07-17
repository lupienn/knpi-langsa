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
      <LucideLoader
        :size="18"
        class="animate-spin"
      />
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
      enter-from-class="opacity-0 scale-95"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="tampilForm"
        class="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 sm:p-6 backdrop-blur-md"
        @click.self="tampilForm = false"
      >
        <div class="glass-card w-full max-w-3xl p-6 sm:p-8 shadow-2xl relative border border-white/10 bg-slate-950/80 my-8">
          <!-- Ambient Glow Effect -->
          <div class="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-knpi-500/10 blur-3xl" />
          <div class="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-white/10 pb-5 mb-6 relative">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-knpi-600 to-knpi-500 text-white shadow-knpi">
                <LucidePlusCircle
                  v-if="!modeEdit"
                  :size="20"
                />
                <LucidePencil
                  v-else
                  :size="18"
                />
              </div>
              <div>
                <h3 class="text-lg font-bold text-white tracking-tight">
                  {{ modeEdit ? 'Edit Berita & Pengumuman' : 'Buat Berita Baru' }}
                </h3>
                <p class="text-xs text-slate-400">
                  {{ modeEdit ? 'Perbarui konten atau status berita yang sudah terpublikasi' : 'Isi formulir berikut untuk menerbitkan berita ke portal KNPI Langsa' }}
                </p>
              </div>
            </div>
            <button
              class="rounded-xl border border-white/10 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
              @click="tampilForm = false"
            >
              <LucideX :size="18" />
            </button>
          </div>

          <form
            class="flex flex-col gap-6 relative"
            @submit.prevent="simpanBerita"
          >
            <!-- Grid Utama: Form Input & Opsi -->
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <!-- Kolom Kiri: Konten Utama (8 cols) -->
              <div class="lg:col-span-8 flex flex-col gap-5">
                <!-- Judul Berita -->
                <div>
                  <label class="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span>Judul Berita <span class="text-red-400">*</span></span>
                    <span class="text-[10px] text-slate-500 font-normal">{{ form.judul.length }}/120 karakter</span>
                  </label>
                  <input
                    v-model="form.judul"
                    type="text"
                    maxlength="120"
                    placeholder="Judul berita"
                    class="form-input-base !pl-4 focus:border-knpi-500 focus:ring-1 focus:ring-knpi-500"
                    required
                  >
                </div>

                <!-- Ringkasan Singkat -->
                <div>
                  <label class="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span>Ringkasan Singkat <span class="text-red-400">*</span></span>
                    <span class="text-[10px] text-slate-500 font-normal">Tampil di feed & kartu berita</span>
                  </label>
                  <input
                    v-model="form.ringkasan"
                    type="text"
                    placeholder="Ringkasan berita"
                    class="form-input-base !pl-4"
                    required
                  >
                </div>

                <!-- Konten Lengkap -->
                <div>
                  <label class="mb-1.5 block text-xs font-semibold text-slate-300">
                    Isi Konten Berita <span class="text-red-400">*</span>
                  </label>
                  <textarea
                    v-model="form.konten"
                    rows="9"
                    placeholder="Isi berita"
                    class="form-input-base !pl-4 resize-none leading-relaxed"
                    required
                  />
                </div>
              </div>

              <!-- Kolom Kanan: Pengaturan & Gambar (4 cols) -->
              <div class="lg:col-span-4 flex flex-col gap-5">
                <!-- Kategori Berita -->
                <div class="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col gap-3">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Pilih Kategori</span>
                  <div class="flex flex-col gap-2">
                    <label
                      v-for="cat in [
                        { val: 'kegiatan', label: 'Kegiatan Pemuda', desc: 'Acara & program kerja' },
                        { val: 'pengumuman', label: 'Pengumuman Resmi', desc: 'Informasi DPD KNPI' },
                        { val: 'artikel', label: 'Artikel & Opini', desc: 'Wawasan & ulasan' },
                      ]"
                      :key="cat.val"
                      class="flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-all"
                      :class="form.kategori === cat.val
                        ? 'border-knpi-500/40 bg-knpi-600/15 text-knpi-300 shadow-sm'
                        : 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'"
                    >
                      <input
                        v-model="form.kategori"
                        type="radio"
                        :value="cat.val"
                        class="mt-0.5 accent-knpi-500"
                      >
                      <div>
                        <p class="text-xs font-bold leading-none text-slate-200">
                          {{ cat.label }}
                        </p>
                        <p class="text-[10px] text-slate-500 mt-1">
                          {{ cat.desc }}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Status Publikasi -->
                <div class="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col gap-3">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Status Publikasi</span>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      class="flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition cursor-pointer"
                      :class="form.status === 'draf'
                        ? 'border-amber-500/40 bg-amber-500/20 text-amber-300 shadow-sm'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'"
                      @click="form.status = 'draf'"
                    >
                      <span class="h-2 w-2 rounded-full bg-amber-400" />
                      Draf
                    </button>
                    <button
                      type="button"
                      class="flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition cursor-pointer"
                      :class="form.status === 'terbit'
                        ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300 shadow-sm'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'"
                      @click="form.status = 'terbit'"
                    >
                      <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Terbit
                    </button>
                  </div>
                </div>

                <!-- Featured Image Upload -->
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-semibold text-slate-300">Gambar Utama (Header)</label>

                  <!-- Preview Gambar -->
                  <div
                    v-if="previewGambar || form.gambarUrl"
                    class="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-900 group"
                  >
                    <img
                      :src="previewGambar || form.gambarUrl"
                      alt="Preview Berita"
                      class="w-full h-36 object-cover transition duration-300 group-hover:scale-105"
                    >
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    <span class="absolute bottom-2 left-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[9px] font-bold text-slate-300 backdrop-blur-md border border-white/10">
                      Gambar Sampul
                    </span>
                    <button
                      type="button"
                      class="absolute top-2 right-2 rounded-xl bg-black/70 p-2 text-slate-300 hover:bg-red-600 hover:text-white transition shadow-lg backdrop-blur-md cursor-pointer"
                      title="Hapus Gambar"
                      @click="hapusGambar"
                    >
                      <LucideTrash2 :size="14" />
                    </button>
                  </div>

                  <!-- Upload Dropzone -->
                  <div
                    v-else
                    class="relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] p-6 text-center transition hover:border-knpi-500/50 hover:bg-white/[0.05] cursor-pointer group"
                    @click="($refs.inputGambar as HTMLInputElement)?.click()"
                    @dragover.prevent
                    @drop.prevent="handleDrop"
                  >
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 group-hover:text-knpi-400 group-hover:scale-110 transition">
                      <LucideUploadCloud :size="20" />
                    </div>
                    <div>
                      <p class="text-xs font-bold text-slate-300">
                        Unggah Sampul
                      </p>
                      <p class="text-[10px] text-slate-500 mt-0.5">
                        JPG, PNG, WebP · Maks. 5MB
                      </p>
                    </div>
                  </div>

                  <input
                    ref="inputGambar"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    class="hidden"
                    @change="handleFileChange"
                  >

                  <div
                    v-if="sedangUpload"
                    class="mt-1 flex items-center gap-2 text-xs text-knpi-400"
                  >
                    <LucideLoader
                      :size="14"
                      class="animate-spin"
                    />
                    <span>Mengunggah gambar...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Footer Buttons -->
            <div class="flex items-center justify-end gap-3 border-t border-white/10 pt-5 mt-2">
              <button
                type="button"
                class="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold text-slate-300 transition hover:bg-white/10 cursor-pointer"
                @click="tampilForm = false"
              >
                Batal
              </button>
              <button
                type="submit"
                class="btn-primary !w-auto !py-3 !px-7 !text-xs shadow-lg shadow-knpi/25 disabled:opacity-60 cursor-pointer"
                :disabled="sedangMenyimpan"
              >
                <LucideLoader
                  v-if="sedangMenyimpan"
                  :size="16"
                  class="animate-spin"
                />
                {{ sedangMenyimpan ? 'Menyimpan...' : (modeEdit ? 'Simpan Perubahan' : 'Terbitkan Berita') }}
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
