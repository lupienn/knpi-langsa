<template>
  <div class="flex flex-col gap-6">
    <!-- ====== HEADER BANNER ====== -->
    <div
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900/60 via-amber-800/40 to-knpi-900 p-6 sm:p-8 shadow-2xl border border-amber-500/20">
      <div class="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-amber-400/15 blur-3xl" />
      <div class="pointer-events-none absolute -bottom-10 left-20 h-40 w-40 rounded-full bg-knpi-400/20 blur-2xl" />
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-xs font-semibold text-amber-300 mb-3">
            <LucideImages :size="14" />
            <span>Manajemen Slider Beranda</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Kelola Slider Beranda
          </h2>
          <p class="mt-1 text-sm text-slate-300/80">
            Tambah, edit, hapus, dan atur urutan foto yang tampil di slider halaman utama.
          </p>
        </div>
        <button id="btn-tambah-slide"
          class="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-amber-950 font-bold text-sm shadow-lg hover:bg-amber-400 transition"
          @click="bukaFormTambah">
          <LucidePlus :size="18" />
          Tambah Slide Baru
        </button>
      </div>
    </div>

    <!-- ====== LOADING STATE ====== -->
    <div v-if="memuat" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center gap-4">
        <div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span class="text-slate-400 text-sm">Memuat data slider...</span>
      </div>
    </div>

    <!-- ====== EMPTY STATE ====== -->
    <div v-else-if="daftarSlider.length === 0"
      class="glass-card flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div
        class="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
        <LucideImageOff :size="32" />
      </div>
      <div>
        <h3 class="text-white font-bold text-lg">Belum ada slide</h3>
        <p class="text-slate-400 text-sm mt-1">Klik tombol "Tambah Slide Baru" untuk menambahkan foto pertama.</p>
      </div>
      <button
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-amber-950 font-bold text-sm hover:bg-amber-400 transition"
        @click="bukaFormTambah">
        <LucidePlus :size="16" />
        Tambah Slide Pertama
      </button>
    </div>

    <!-- ====== DAFTAR SLIDER ====== -->
    <div v-else class="flex flex-col gap-4">
      <div v-for="(slide, index) in daftarSlider" :key="slide.id"
        class="glass-card flex flex-col sm:flex-row gap-4 p-4 sm:p-5 hover:border-amber-500/30 transition-colors">
        <!-- Thumbnail -->
        <div
          class="shrink-0 w-full sm:w-44 h-28 rounded-xl overflow-hidden bg-slate-800 border border-white/5 relative">
          <img v-if="slide.gambarUrl" :src="slide.gambarUrl" :alt="slide.judul" class="w-full h-full object-cover"
            onerror="this.src='/favicon.ico'; this.classList.add('object-contain','p-4')" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-slate-600">
            <LucideImage :size="32" />
          </div>
          <!-- Nomor urutan -->
          <div
            class="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full">
            #{{ index + 1 }}
          </div>
        </div>

        <!-- Info & Aksi -->
        <div class="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <h4 class="font-bold text-white text-base truncate">{{ slide.judul }}</h4>
                <p class="text-amber-300 text-sm font-medium truncate">{{ slide.subjudul }}</p>
              </div>
              <!-- Status Aktif -->
              <span class="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                :class="slide.aktif ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-slate-500/15 text-slate-400 border border-slate-500/30'">
                <span class="h-1.5 w-1.5 rounded-full" :class="slide.aktif ? 'bg-emerald-400' : 'bg-slate-500'" />
                {{ slide.aktif ? 'Aktif' : 'Nonaktif' }}
              </span>
            </div>
            <p class="mt-2 text-xs text-slate-400 line-clamp-2">{{ slide.deskripsi || '—' }}</p>
          </div>

          <!-- Tombol aksi -->
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <!-- Naik -->
            <button :disabled="index === 0 || sedangProses"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Pindahkan ke atas" @click="pindahUrutan(index, 'naik')">
              <LucideArrowUp :size="14" /> Naik
            </button>
            <!-- Turun -->
            <button :disabled="index === daftarSlider.length - 1 || sedangProses"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Pindahkan ke bawah" @click="pindahUrutan(index, 'turun')">
              <LucideArrowDown :size="14" /> Turun
            </button>

            <!-- Toggle Aktif/Nonaktif -->
            <button :disabled="sedangProses"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition disabled:opacity-50"
              :class="slide.aktif
                ? 'border-slate-500/30 bg-slate-500/10 text-slate-400 hover:bg-slate-500/20'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'"
              @click="toggleAktif(slide)">
              <LucideEyeOff v-if="slide.aktif" :size="14" />
              <LucideEye v-else :size="14" />
              {{ slide.aktif ? 'Nonaktifkan' : 'Aktifkan' }}
            </button>

            <!-- Edit -->
            <button
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-knpi-500/30 bg-knpi-500/10 text-knpi-300 hover:bg-knpi-500/20 transition"
              @click="bukaFormEdit(slide)">
              <LucidePencil :size="14" /> Edit
            </button>

            <!-- Hapus -->
            <button :disabled="sedangProses"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition disabled:opacity-50"
              @click="konfirmasiHapus(slide)">
              <LucideTrash2 :size="14" /> Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ====== MODAL FORM TAMBAH / EDIT ====== -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="modalForm"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        @click.self="tutupModal">
        <div class="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
          <div
            class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

          <div class="p-6">
            <div class="flex items-center justify-between mb-5">
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <LucideImages :size="20" class="text-amber-400" />
                {{ modeForm === 'tambah' ? 'Tambah Slide Baru' : 'Edit Slide' }}
              </h3>
              <button class="text-slate-400 hover:text-white transition" @click="tutupModal">
                <LucideX :size="20" />
              </button>
            </div>

            <form class="flex flex-col gap-4" @submit.prevent="simpanSlide">
              <!-- Judul -->
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1.5">
                  Judul Slide <span class="text-red-400">*</span>
                </label>
                <input v-model="form.judul" type="text" placeholder="Masukkan judul slide"
                  class="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  required />
              </div>

              <!-- Subjudul -->
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1.5">Subjudul</label>
                <input v-model="form.subjudul" type="text" placeholder="Masukkan subjudul slide"
                  class="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30" />
              </div>

              <!-- Deskripsi -->
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1.5">Deskripsi</label>
                <textarea v-model="form.deskripsi" rows="3" placeholder="Masukkan deskripsi slide"
                  class="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30 resize-none" />
              </div>

              <!-- Upload Foto -->
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1.5">
                  Foto Slide <span class="text-red-400">*</span>
                </label>

                <!-- Preview -->
                <div v-if="form.gambarUrl"
                  class="mb-3 relative rounded-xl overflow-hidden h-36 bg-slate-800 border border-white/10">
                  <img :src="form.gambarUrl" alt="Preview" class="w-full h-full object-cover" />
                  <button type="button"
                    class="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-red-500/80 transition"
                    @click="form.gambarUrl = ''">
                    <LucideX :size="14" />
                  </button>
                </div>

                <!-- Area Upload -->
                <div v-if="!form.gambarUrl"
                  class="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/15 bg-slate-900/40 py-8 px-4 text-center hover:border-amber-500/40 transition cursor-pointer"
                  @click="($refs.inputFoto as HTMLInputElement)?.click()" @dragover.prevent @drop.prevent="handleDrop">
                  <LucideUploadCloud :size="28" class="text-slate-500 mb-2" />
                  <p class="text-sm text-slate-400 font-medium">Klik atau seret foto ke sini</p>
                  <p class="text-xs text-slate-500 mt-1">JPG, PNG, WebP — Maks. 5MB</p>
                  <input ref="inputFoto" type="file" accept="image/jpeg,image/png,image/webp" class="hidden"
                    @change="handlePilihFile" />
                </div>

                <!-- Loading upload -->
                <div v-if="sedangUpload" class="mt-2 flex items-center gap-2 text-xs text-amber-400">
                  <div class="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  Mengunggah foto...
                </div>
              </div>

              <!-- Toggle Aktif -->
              <div class="flex items-center justify-between py-2 border-t border-white/5 mt-1">
                <div>
                  <p class="text-sm font-semibold text-slate-200">Status Aktif</p>
                  <p class="text-xs text-slate-400">Slide akan tampil di beranda jika diaktifkan</p>
                </div>
                <button type="button" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                  :class="form.aktif ? 'bg-emerald-500' : 'bg-slate-600'" @click="form.aktif = !form.aktif">
                  <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                    :class="form.aktif ? 'translate-x-6' : 'translate-x-1'" />
                </button>
              </div>

              <!-- Pesan Error -->
              <div v-if="pesanError"
                class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {{ pesanError }}
              </div>

              <!-- Tombol Submit -->
              <div class="flex gap-3 pt-1">
                <button type="button"
                  class="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 transition"
                  @click="tutupModal">
                  Batal
                </button>
                <button id="btn-simpan-slide" type="submit" :disabled="sedangProses || sedangUpload || !form.gambarUrl"
                  class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-3 text-sm font-bold text-white shadow-lg hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition">
                  <LucideLoader v-if="sedangProses" :size="16" class="animate-spin" />
                  <LucideSave v-else :size="16" />
                  {{ sedangProses ? 'Menyimpan...' : (modeForm === 'tambah' ? 'Tambah Slide' : 'Simpan Perubahan') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ====== MODAL KONFIRMASI HAPUS ====== -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="modalHapus"
        class="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        @click.self="modalHapus = false">
        <div class="glass-card w-full max-w-sm p-7 text-center relative overflow-hidden">
          <div
            class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
          <div
            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/15 text-red-400">
            <LucideTrash2 :size="28" />
          </div>
          <h3 class="text-lg font-bold text-white">Hapus Slide Ini?</h3>
          <p class="mt-2 text-xs leading-relaxed text-slate-400">
            Slide <span class="text-white font-semibold">"{{ slideYangDihapus?.judul }}"</span> akan dihapus secara
            permanen.
          </p>
          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 hover:bg-white/10 transition"
              @click="modalHapus = false">
              Batal
            </button>
            <button id="btn-konfirmasi-hapus"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-3 text-xs font-bold text-white hover:brightness-110 disabled:opacity-60 transition"
              :disabled="sedangProses" @click="hapusSlide">
              <LucideLoader v-if="sedangProses" :size="14" class="animate-spin" />
              {{ sedangProses ? 'Menghapus...' : 'Ya, Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ====== TOAST NOTIFIKASI ====== -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-4"
      leave-active-class="transition duration-200 ease-in" leave-to-class="opacity-0 translate-y-2">
      <div v-if="toast.tampil"
        class="fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-2xl border px-5 py-3.5 shadow-2xl backdrop-blur-xl"
        :class="toast.tipe === 'sukses'
          ? 'border-emerald-500/30 bg-emerald-950/80 text-emerald-300'
          : 'border-red-500/30 bg-red-950/80 text-red-300'">
        <LucideCheckCircle2 v-if="toast.tipe === 'sukses'" :size="18" />
        <LucideXCircle v-else :size="18" />
        <span class="text-sm font-semibold">{{ toast.pesan }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

interface SlideItem {
  id: number
  judul: string
  subjudul: string
  deskripsi: string | null
  gambarUrl: string
  urutan: number
  aktif: boolean
}

const authStore = useAuthStore()

// ---- State ----
const memuat = ref(true)
const sedangProses = ref(false)
const sedangUpload = ref(false)
const pesanError = ref('')
const daftarSlider = ref<SlideItem[]>([])

const modalForm = ref(false)
const modeForm = ref<'tambah' | 'edit'>('tambah')
const slideYangDiedit = ref<SlideItem | null>(null)

const modalHapus = ref(false)
const slideYangDihapus = ref<SlideItem | null>(null)

const form = reactive({
  judul: '',
  subjudul: '',
  deskripsi: '',
  gambarUrl: '',
  aktif: true,
})

const toast = reactive({ tampil: false, pesan: '', tipe: 'sukses' as 'sukses' | 'error' })
let toastTimeout: ReturnType<typeof setTimeout>

function tampilkanToast(pesan: string, tipe: 'sukses' | 'error' = 'sukses') {
  clearTimeout(toastTimeout)
  toast.pesan = pesan
  toast.tipe = tipe
  toast.tampil = true
  toastTimeout = setTimeout(() => { toast.tampil = false }, 3500)
}

// ---- Ambil Data ----
async function ambilSlider() {
  memuat.value = true
  try {
    const res = await $fetch<{ berhasil: boolean; data: any[] }>('/api/slider', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    if (res.berhasil) {
      daftarSlider.value = res.data.map(s => ({
        ...s,
        aktif: s.aktif === 1 || s.aktif === true,
      }))
    }
  }
  catch {
    tampilkanToast('Gagal memuat data slider.', 'error')
  }
  finally {
    memuat.value = false
  }
}

// ---- Form ----
function resetForm() {
  form.judul = ''
  form.subjudul = ''
  form.deskripsi = ''
  form.gambarUrl = ''
  form.aktif = true
  pesanError.value = ''
}

function bukaFormTambah() {
  resetForm()
  modeForm.value = 'tambah'
  slideYangDiedit.value = null
  modalForm.value = true
}

function bukaFormEdit(slide: SlideItem) {
  form.judul = slide.judul
  form.subjudul = slide.subjudul || ''
  form.deskripsi = slide.deskripsi || ''
  form.gambarUrl = slide.gambarUrl
  form.aktif = slide.aktif
  pesanError.value = ''
  modeForm.value = 'edit'
  slideYangDiedit.value = slide
  modalForm.value = true
}

function tutupModal() {
  modalForm.value = false
  resetForm()
}

// ---- Upload Foto ----
async function uploadFoto(file: File) {
  sedangUpload.value = true
  try {
    const formData = new FormData()
    formData.append('gambar', file)
    const res = await $fetch<{ berhasil: boolean; url: string }>('/api/upload', {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    if (res.berhasil) {
      form.gambarUrl = res.url
    }
  }
  catch {
    tampilkanToast('Gagal mengunggah foto. Pastikan ukuran kurang dari 5MB.', 'error')
  }
  finally {
    sedangUpload.value = false
  }
}

function handlePilihFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) uploadFoto(file)
}

function handleDrop(event: DragEvent) {
  const file = event.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) uploadFoto(file)
}

// ---- Simpan Slide ----
async function simpanSlide() {
  if (!form.judul.trim() || !form.gambarUrl) {
    pesanError.value = 'Judul dan foto wajib diisi.'
    return
  }
  sedangProses.value = true
  pesanError.value = ''
  try {
    const payload = {
      judul: form.judul,
      subjudul: form.subjudul,
      deskripsi: form.deskripsi || null,
      gambarUrl: form.gambarUrl,
      aktif: form.aktif,
      urutan: modeForm.value === 'tambah'
        ? daftarSlider.value.length
        : (slideYangDiedit.value?.urutan ?? 0),
    }

    if (modeForm.value === 'tambah') {
      await $fetch('/api/slider', {
        method: 'POST',
        body: payload,
        headers: { Authorization: `Bearer ${authStore.token}` },
      })
      tampilkanToast('Slide berhasil ditambahkan!')
    }
    else {
      await $fetch(`/api/slider/${slideYangDiedit.value!.id}`, {
        method: 'PUT',
        body: payload,
        headers: { Authorization: `Bearer ${authStore.token}` },
      })
      tampilkanToast('Slide berhasil diperbarui!')
    }

    tutupModal()
    await ambilSlider()
  }
  catch (err: any) {
    pesanError.value = err?.data?.statusMessage || 'Gagal menyimpan slide.'
  }
  finally {
    sedangProses.value = false
  }
}

// ---- Toggle Aktif ----
async function toggleAktif(slide: SlideItem) {
  sedangProses.value = true
  try {
    await $fetch(`/api/slider/${slide.id}`, {
      method: 'PUT',
      body: {
        judul: slide.judul,
        subjudul: slide.subjudul,
        deskripsi: slide.deskripsi,
        gambarUrl: slide.gambarUrl,
        urutan: slide.urutan,
        aktif: !slide.aktif,
      },
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    tampilkanToast(`Slide ${!slide.aktif ? 'diaktifkan' : 'dinonaktifkan'}.`)
    await ambilSlider()
  }
  catch {
    tampilkanToast('Gagal mengubah status slide.', 'error')
  }
  finally {
    sedangProses.value = false
  }
}

// ---- Atur Urutan (Naik / Turun) ----
async function pindahUrutan(index: number, arah: 'naik' | 'turun') {
  const targetIndex = arah === 'naik' ? index - 1 : index + 1
  if (targetIndex < 0 || targetIndex >= daftarSlider.value.length) return

  const arr = [...daftarSlider.value]
    ;[arr[index], arr[targetIndex]] = [arr[targetIndex], arr[index]]
  daftarSlider.value = arr

  sedangProses.value = true
  try {
    await Promise.all([
      $fetch(`/api/slider/${arr[index].id}`, {
        method: 'PUT',
        body: { ...arr[index], urutan: index, aktif: arr[index].aktif },
        headers: { Authorization: `Bearer ${authStore.token}` },
      }),
      $fetch(`/api/slider/${arr[targetIndex].id}`, {
        method: 'PUT',
        body: { ...arr[targetIndex], urutan: targetIndex, aktif: arr[targetIndex].aktif },
        headers: { Authorization: `Bearer ${authStore.token}` },
      }),
    ])
    tampilkanToast('Urutan slide diperbarui.')
    await ambilSlider()
  }
  catch {
    tampilkanToast('Gagal mengubah urutan.', 'error')
    await ambilSlider()
  }
  finally {
    sedangProses.value = false
  }
}

// ---- Hapus ----
function konfirmasiHapus(slide: SlideItem) {
  slideYangDihapus.value = slide
  modalHapus.value = true
}

async function hapusSlide() {
  if (!slideYangDihapus.value) return
  sedangProses.value = true
  try {
    await $fetch(`/api/slider/${slideYangDihapus.value.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    modalHapus.value = false
    slideYangDihapus.value = null
    tampilkanToast('Slide berhasil dihapus.')
    await ambilSlider()
  }
  catch {
    tampilkanToast('Gagal menghapus slide.', 'error')
  }
  finally {
    sedangProses.value = false
  }
}

onMounted(() => { ambilSlider() })

useSeoMeta({
  title: 'Dashboard KNPI Langsa',
  description: 'Manajemen foto dan deskripsi slider halaman beranda KNPI Kota Langsa.',
})
</script>
