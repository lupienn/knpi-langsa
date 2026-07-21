<template>
  <div class="flex flex-col gap-6">
    <!-- ====== HEADER BANNER ====== -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900/60 via-amber-800/40 to-knpi-900 p-6 sm:p-8 shadow-2xl border border-amber-500/20">
      <div class="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-amber-400/15 blur-3xl" />
      <div class="pointer-events-none absolute -bottom-10 left-20 h-40 w-40 rounded-full bg-knpi-400/20 blur-2xl" />
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-xs font-semibold text-amber-300 mb-3">
            <LucideImages :size="14" />
            <span>Manajemen Slider Beranda</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Kelola Slider Beranda
          </h2>
          <p class="mt-1 text-sm text-slate-300/80">
            Pusat pengaturan foto hero, headline, deskripsi, dan urutan tampilan slider halaman utama.
          </p>
        </div>
        <button
          id="btn-tambah-slide"
          class="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition cursor-pointer"
          @click="bukaFormTambah"
        >
          <LucidePlus :size="18" />
          <span>Tambah Slide Baru</span>
        </button>
      </div>
    </div>

    <!-- ====== METRIC CARDS ====== -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <!-- Total Slide -->
      <div class="glass-card p-4 flex items-center gap-3.5 border-amber-500/20">
        <div class="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
          <LucideImages :size="20" />
        </div>
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Slide</p>
          <p class="text-xl font-extrabold text-white mt-0.5">{{ daftarSlider.length }}</p>
        </div>
      </div>

      <!-- Slide Aktif -->
      <div class="glass-card p-4 flex items-center gap-3.5 border-emerald-500/20">
        <div class="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
          <LucideCheckCircle2 :size="20" />
        </div>
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Slide Aktif</p>
          <p class="text-xl font-extrabold text-emerald-400 mt-0.5">{{ totalAktif }}</p>
        </div>
      </div>

      <!-- Slide Nonaktif -->
      <div class="glass-card p-4 flex items-center gap-3.5 border-slate-500/20">
        <div class="p-3 rounded-2xl bg-slate-500/10 text-slate-400 border border-slate-500/20 shrink-0">
          <LucideEyeOff :size="20" />
        </div>
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Slide Nonaktif</p>
          <p class="text-xl font-extrabold text-slate-300 mt-0.5">{{ totalNonaktif }}</p>
        </div>
      </div>

      <!-- Slide Pertama -->
      <div class="glass-card p-4 flex items-center gap-3.5 border-amber-500/20">
        <div class="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
          <LucideSparkles :size="20" />
        </div>
        <div class="min-w-0">
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Slide Utamakan #1</p>
          <p class="text-xs font-bold text-amber-300 mt-0.5 truncate">{{ daftarSlider[0]?.judul || 'Belum Ada' }}</p>
        </div>
      </div>
    </div>

    <!-- ====== SEARCH & FILTER TOOLBAR ====== -->
    <div class="glass-card p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      <!-- Search Input -->
      <div class="relative flex-1 min-w-0">
        <LucideSearch :size="16" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          v-model="kataKunciCari"
          type="text"
          placeholder="Cari judul slide, subjudul, atau deskripsi..."
          class="w-full rounded-xl border border-white/10 bg-slate-900/80 pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
        />
        <button
          v-if="kataKunciCari"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          @click="kataKunciCari = ''"
        >
          <LucideX :size="14" />
        </button>
      </div>

      <!-- Filter Tabs & View Switcher -->
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          <button
            v-for="tab in tabFilter"
            :key="tab.value"
            class="shrink-0 flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer"
            :class="filterAktif === tab.value
              ? 'border-amber-500/40 bg-amber-600/25 text-amber-300 shadow-sm'
              : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'"
            @click="filterAktif = tab.value"
          >
            <span>{{ tab.label }}</span>
            <span
              class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
              :class="filterAktif === tab.value ? 'bg-amber-500/30 text-amber-200' : 'bg-white/10 text-slate-400'"
            >
              {{ hitungFilter(tab.value) }}
            </span>
          </button>
        </div>

        <!-- View Switcher -->
        <div class="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/5 ml-auto md:ml-0">
          <button
            class="p-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
            :class="tampilanMode === 'grid' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'"
            title="Tampilan Kartu Grid"
            @click="tampilanMode = 'grid'"
          >
            <LucideLayoutGrid :size="15" />
          </button>
          <button
            class="p-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
            :class="tampilanMode === 'tabel' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'"
            title="Tampilan Tabel Data"
            @click="tampilanMode = 'tabel'"
          >
            <LucideList :size="15" />
          </button>
        </div>
      </div>
    </div>

    <!-- ====== SKELETON LOADING STATE ====== -->
    <div v-if="memuat" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="i in 3" :key="'skel-' + i" class="glass-card p-4 flex flex-col gap-3 animate-pulse">
        <div class="w-full aspect-[16/10] rounded-xl bg-slate-800/80" />
        <div class="space-y-2 py-1">
          <div class="h-4 bg-slate-800/80 rounded w-3/4" />
          <div class="h-3 bg-slate-800/60 rounded w-1/2" />
        </div>
        <div class="flex gap-2 pt-2 border-t border-white/5">
          <div class="h-7 w-16 bg-slate-800/60 rounded-lg" />
          <div class="h-7 w-16 bg-slate-800/60 rounded-lg" />
        </div>
      </div>
    </div>

    <!-- ====== EMPTY STATE ====== -->
    <div
      v-else-if="sliderFiltered.length === 0"
      class="glass-card flex flex-col items-center justify-center py-20 gap-4 text-center px-6"
    >
      <div class="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
        <LucideImageOff :size="32" />
      </div>
      <div>
        <h3 class="text-white font-bold text-lg">Tidak Ada Slide Ditemukan</h3>
        <p class="text-slate-400 text-sm mt-1 max-w-md">
          {{ kataKunciCari ? `Tidak ada slide yang cocok dengan kata kunci "${kataKunciCari}".` : 'Klik tombol di bawah untuk menambahkan foto hero slide pertama.' }}
        </p>
      </div>
      <button
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-amber-950 font-bold text-xs shadow-lg hover:bg-amber-400 transition cursor-pointer"
        @click="kataKunciCari ? (kataKunciCari = '') : bukaFormTambah()"
      >
        <LucideRotateCcw v-if="kataKunciCari" :size="15" />
        <LucidePlus v-else :size="15" />
        <span>{{ kataKunciCari ? 'Reset Pencarian' : 'Tambah Slide Pertama' }}</span>
      </button>
    </div>

    <!-- ====== TAMPILAN GRID CARDS ====== -->
    <div v-else-if="tampilanMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      <div
        v-for="(slide, index) in sliderFiltered"
        :key="slide.id"
        class="glass-card group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:bg-white/[0.02]"
      >
        <div>
          <!-- Thumbnail Sampul -->
          <div class="relative w-full aspect-[16/10] overflow-hidden bg-slate-900 border-b border-white/10">
            <img
              v-if="slide.gambarUrl"
              :src="slide.gambarUrl"
              :alt="slide.judul"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onerror="this.src='/favicon.ico'; this.classList.add('object-contain','p-8')"
            />
            <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-slate-600 bg-slate-900/90">
              <LucideImage :size="36" />
              <span class="text-[10px] text-slate-500 font-medium mt-1">Tanpa Gambar</span>
            </div>

            <!-- Order Badge -->
            <div class="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-amber-300 text-xs font-extrabold px-2.5 py-1 rounded-lg border border-amber-500/30 shadow-sm">
              Urutan #{{ slide.urutan + 1 }}
            </div>

            <!-- Status Dot -->
            <div class="absolute top-3 right-3">
              <span
                class="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border shadow-sm"
                :class="slide.aktif
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-950/80 text-slate-400 border-slate-500/30'"
              >
                <span class="h-1.5 w-1.5 rounded-full" :class="slide.aktif ? 'bg-emerald-400' : 'bg-slate-500'" />
                {{ slide.aktif ? 'Aktif' : 'Nonaktif' }}
              </span>
            </div>

            <!-- Lightbox Trigger -->
            <button
              type="button"
              class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white backdrop-blur-[2px] transition-opacity duration-200 cursor-pointer"
              title="Lihat Foto Ukuran Penuh"
              @click="previewFoto = slide.gambarUrl"
            >
              <span class="p-2 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md">
                <LucideMaximize2 :size="18" />
              </span>
            </button>
          </div>

          <!-- Content Info -->
          <div class="p-4 sm:p-5">
            <h3 class="font-bold text-white text-base truncate group-hover:text-amber-300 transition-colors">
              {{ slide.judul }}
            </h3>
            <p v-if="slide.subjudul" class="text-xs text-amber-400 font-semibold truncate mt-0.5">
              {{ slide.subjudul }}
            </p>
            <p class="text-xs text-slate-300/80 mt-2 line-clamp-2 leading-relaxed">
              {{ slide.deskripsi || 'Tidak ada deskripsi tambahan.' }}
            </p>
          </div>
        </div>

        <!-- Footer Actions Toolbar -->
        <div class="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
          <!-- Reorder Buttons -->
          <div class="flex items-center gap-1">
            <button
              :disabled="index === 0 || sedangProses"
              class="p-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              title="Geser Naik"
              @click="pindahUrutan(index, 'naik')"
            >
              <LucideArrowUp :size="14" />
            </button>
            <button
              :disabled="index === sliderFiltered.length - 1 || sedangProses"
              class="p-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              title="Geser Turun"
              @click="pindahUrutan(index, 'turun')"
            >
              <LucideArrowDown :size="14" />
            </button>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1.5">
            <button
              :disabled="sedangProses"
              class="p-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer disabled:opacity-50"
              :class="slide.aktif
                ? 'border-slate-500/20 bg-slate-500/10 text-slate-400 hover:bg-slate-500/20'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'"
              :title="slide.aktif ? 'Sembunyikan Slide' : 'Aktifkan Slide'"
              @click="toggleAktif(slide)"
            >
              <LucideEyeOff v-if="slide.aktif" :size="14" />
              <LucideEye v-else :size="14" />
            </button>

            <button
              class="p-1.5 rounded-lg text-xs font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition cursor-pointer"
              title="Edit Slide"
              @click="bukaFormEdit(slide)"
            >
              <LucidePencil :size="14" />
            </button>

            <button
              :disabled="sedangProses"
              class="p-1.5 rounded-lg text-xs font-semibold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer disabled:opacity-50"
              title="Hapus Slide"
              @click="konfirmasiHapus(slide)"
            >
              <LucideTrash2 :size="14" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ====== TAMPILAN TABEL DATA ====== -->
    <div v-else-if="tampilanMode === 'tabel'" class="glass-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-white/[0.08] bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <th class="px-5 py-3.5">Urutan</th>
              <th class="px-5 py-3.5">Foto &amp; Judul</th>
              <th class="px-5 py-3.5">Subjudul &amp; Deskripsi</th>
              <th class="px-5 py-3.5">Status</th>
              <th class="px-5 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/[0.04]">
            <tr
              v-for="(slide, index) in sliderFiltered"
              :key="'tbl-' + slide.id"
              class="transition-colors hover:bg-white/[0.02]"
            >
              <td class="px-5 py-4 whitespace-nowrap">
                <span class="font-extrabold text-amber-400 text-xs bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md">
                  #{{ slide.urutan + 1 }}
                </span>
              </td>
              <td class="px-5 py-4">
                <div class="flex items-center gap-3 min-w-[240px]">
                  <div class="w-14 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-white/10 cursor-pointer" @click="previewFoto = slide.gambarUrl">
                    <img v-if="slide.gambarUrl" :src="slide.gambarUrl" :alt="slide.judul" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-slate-600">
                      <LucideImage :size="16" />
                    </div>
                  </div>
                  <h4 class="font-bold text-white text-xs sm:text-sm truncate">{{ slide.judul }}</h4>
                </div>
              </td>
              <td class="px-5 py-4 max-w-xs">
                <p v-if="slide.subjudul" class="text-xs text-amber-400 font-semibold truncate">{{ slide.subjudul }}</p>
                <p class="text-xs text-slate-400 truncate mt-0.5">{{ slide.deskripsi || '—' }}</p>
              </td>
              <td class="px-5 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border"
                  :class="slide.aktif ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' : 'bg-slate-500/10 text-slate-400 border-slate-500/25'"
                >
                  <span class="h-1.5 w-1.5 rounded-full" :class="slide.aktif ? 'bg-emerald-400' : 'bg-slate-500'" />
                  {{ slide.aktif ? 'Aktif' : 'Nonaktif' }}
                </span>
              </td>
              <td class="px-5 py-4 text-right whitespace-nowrap">
                <div class="flex items-center justify-end gap-1.5">
                  <button :disabled="index === 0" class="p-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-30 transition cursor-pointer" title="Naik" @click="pindahUrutan(index, 'naik')">
                    <LucideArrowUp :size="14" />
                  </button>
                  <button :disabled="index === sliderFiltered.length - 1" class="p-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-30 transition cursor-pointer" title="Turun" @click="pindahUrutan(index, 'turun')">
                    <LucideArrowDown :size="14" />
                  </button>
                  <button class="p-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition cursor-pointer" title="Edit" @click="bukaFormEdit(slide)">
                    <LucidePencil :size="14" />
                  </button>
                  <button class="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer" title="Hapus" @click="konfirmasiHapus(slide)">
                    <LucideTrash2 :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ====== MODAL PREVIEW FOTO (LIGHTBOX) ====== -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="previewFoto"
        class="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
        @click.self="previewFoto = ''"
      >
        <div class="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl">
          <button
            class="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition cursor-pointer backdrop-blur-md"
            @click="previewFoto = ''"
          >
            <LucideX :size="20" />
          </button>
          <img :src="previewFoto" alt="Preview Foto Slide" class="w-full max-h-[80vh] object-contain bg-black/50" />
        </div>
      </div>
    </Transition>

    <!-- ====== MODAL FORM TAMBAH / EDIT SLIDE ====== -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="modalForm"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        @click.self="tutupModal"
      >
        <div class="glass-card w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-slate-900/60">
            <div class="flex items-center gap-2.5">
              <span class="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <LucideImages :size="18" />
              </span>
              <div>
                <h3 class="text-base font-bold text-white">
                  {{ modeForm === 'tambah' ? 'Tambah Slide Baru' : 'Edit Slide' }}
                </h3>
                <p class="text-[11px] text-slate-400">Atur judul, deskripsi, dan foto utama hero slider</p>
              </div>
            </div>
            <button class="p-1.5 rounded-lg text-slate-400 hover:text-white transition cursor-pointer" @click="tutupModal">
              <LucideX :size="18" />
            </button>
          </div>

          <!-- Body Form -->
          <form class="flex-1 overflow-y-auto p-6 flex flex-col gap-4" @submit.prevent="simpanSlide">
            <!-- Judul -->
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">
                Judul Slide <span class="text-red-400">*</span>
              </label>
              <input
                v-model="form.judul"
                type="text"
                placeholder="Masukkan judul utama slide"
                class="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                required
              />
            </div>

            <!-- Subjudul -->
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Subjudul Header</label>
              <input
                v-model="form.subjudul"
                type="text"
                placeholder="Masukkan subjudul slide"
                class="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
              />
            </div>

            <!-- Deskripsi -->
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Deskripsi Singkat</label>
              <textarea
                v-model="form.deskripsi"
                rows="3"
                placeholder="Masukkan deskripsi penjelas slide"
                class="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-none transition-all"
              />
            </div>

            <!-- Upload Foto -->
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">
                Foto Slide Hero <span class="text-red-400">*</span>
              </label>

              <!-- Preview Foto -->
              <div v-if="form.gambarUrl" class="mb-3 relative rounded-xl overflow-hidden aspect-[16/9] bg-slate-900 border border-white/15 shadow-inner group">
                <img :src="form.gambarUrl" alt="Preview Foto Slide" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    class="p-2 rounded-xl bg-red-500/80 text-white hover:bg-red-600 transition shadow-lg cursor-pointer"
                    title="Ganti Foto Slide"
                    @click="form.gambarUrl = ''"
                  >
                    <LucideTrash2 :size="16" />
                  </button>
                </div>
              </div>

              <!-- Dropzone Upload -->
              <div
                v-if="!form.gambarUrl"
                class="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/15 bg-slate-900/50 py-7 px-4 text-center hover:border-amber-500/50 hover:bg-amber-500/[0.02] transition-all cursor-pointer"
                @click="($refs.inputFoto as HTMLInputElement)?.click()"
                @dragover.prevent
                @drop.prevent="handleDrop"
              >
                <div class="p-3 rounded-full bg-amber-500/10 text-amber-400 mb-2 border border-amber-500/20">
                  <LucideUploadCloud :size="24" />
                </div>
                <p class="text-xs font-bold text-slate-200">Klik atau seret foto ke sini</p>
                <p class="text-[11px] text-slate-500 mt-0.5">Format JPG, PNG, atau WebP (Maksimal 5MB)</p>
                <input
                  ref="inputFoto"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  class="hidden"
                  @change="handlePilihFile"
                />
              </div>

              <!-- Loading Upload -->
              <div v-if="sedangUpload" class="mt-2.5 flex items-center gap-2 text-xs font-semibold text-amber-400">
                <LucideLoader :size="15" class="animate-spin" />
                <span>Mengunggah foto slide...</span>
              </div>
            </div>

            <!-- Toggle Status Aktif -->
            <div class="flex items-center justify-between py-2 border-t border-white/5 mt-1">
              <div>
                <p class="text-xs font-bold text-slate-200">Status Publikasi Slide</p>
                <p class="text-[11px] text-slate-400">Tampilkan slide ini di beranda utama</p>
              </div>
              <button
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer"
                :class="form.aktif ? 'bg-emerald-500' : 'bg-slate-700'"
                @click="form.aktif = !form.aktif"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                  :class="form.aktif ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>

            <!-- Error Banner -->
            <div v-if="pesanError" class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
              {{ pesanError }}
            </div>

            <!-- Footer Buttons -->
            <div class="flex gap-3 pt-2">
              <button
                type="button"
                class="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition cursor-pointer"
                @click="tutupModal"
              >
                Batal
              </button>
              <button
                id="btn-simpan-slide"
                type="submit"
                :disabled="sedangProses || sedangUpload || !form.gambarUrl"
                class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-2.5 text-xs font-bold text-white shadow-lg shadow-amber-500/20 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <LucideLoader v-if="sedangProses" :size="15" class="animate-spin" />
                <LucideCheck v-else :size="15" />
                <span>{{ sedangProses ? 'Menyimpan...' : (modeForm === 'tambah' ? 'Tambah Slide' : 'Simpan Perubahan') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- ====== MODAL KONFIRMASI HAPUS ====== -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="modalHapus"
        class="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        @click.self="modalHapus = false"
      >
        <div class="glass-card w-full max-w-sm p-6 text-center relative overflow-hidden shadow-2xl">
          <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/15 text-red-400 shadow-inner">
            <LucideTrash2 :size="26" />
          </div>
          <h3 class="text-base font-bold text-white">Hapus Slide Ini?</h3>
          <p class="mt-1.5 text-xs leading-relaxed text-slate-400">
            Slide <span class="text-white font-semibold">"{{ slideYangDihapus?.judul }}"</span> akan dihapus secara permanen.
          </p>
          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition cursor-pointer"
              @click="modalHapus = false"
            >
              Batal
            </button>
            <button
              id="btn-konfirmasi-hapus"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-2.5 text-xs font-bold text-white shadow-lg hover:brightness-110 disabled:opacity-60 transition cursor-pointer"
              :disabled="sedangProses"
              @click="hapusSlide"
            >
              <LucideLoader v-if="sedangProses" :size="14" class="animate-spin" />
              <span>{{ sedangProses ? 'Menghapus...' : 'Ya, Hapus' }}</span>
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
        class="fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl"
        :class="toast.tipe === 'sukses' ? 'border-emerald-500/30 bg-emerald-950/90 text-emerald-300' : 'border-red-500/30 bg-red-950/90 text-red-300'"
      >
        <LucideCheckCircle2 v-if="toast.tipe === 'sukses'" :size="18" />
        <LucideXCircle v-else :size="18" />
        <span class="text-xs font-semibold">{{ toast.pesan }}</span>
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

// State
const memuat = ref(true)
const sedangProses = ref(false)
const sedangUpload = ref(false)
const pesanError = ref('')
const daftarSlider = ref<SlideItem[]>([])
const filterAktif = ref('semua')
const kataKunciCari = ref('')
const tampilanMode = ref<'grid' | 'tabel'>('grid')
const previewFoto = ref('')

const modalForm = ref(false)
const modeForm = ref<'tambah' | 'edit'>('tambah')
const slideYangDiedit = ref<SlideItem | null>(null)

const modalHapus = ref(false)
const slideYangDihapus = ref<SlideItem | null>(null)

const tabFilter = [
  { label: 'Semua', value: 'semua' },
  { label: 'Aktif', value: 'aktif' },
  { label: 'Nonaktif', value: 'nonaktif' },
]

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

// Metrics computed
const totalAktif = computed(() => daftarSlider.value.filter(s => s.aktif).length)
const totalNonaktif = computed(() => daftarSlider.value.filter(s => !s.aktif).length)

function hitungFilter(val: string) {
  let list = daftarSlider.value
  if (kataKunciCari.value.trim()) {
    const q = kataKunciCari.value.toLowerCase()
    list = list.filter(s =>
      s.judul.toLowerCase().includes(q) ||
      (s.subjudul && s.subjudul.toLowerCase().includes(q)) ||
      (s.deskripsi && s.deskripsi.toLowerCase().includes(q))
    )
  }
  if (val === 'semua') return list.length
  if (val === 'aktif') return list.filter(s => s.aktif).length
  return list.filter(s => !s.aktif).length
}

const sliderFiltered = computed(() => {
  let list = daftarSlider.value

  if (kataKunciCari.value.trim()) {
    const q = kataKunciCari.value.toLowerCase()
    list = list.filter(s =>
      s.judul.toLowerCase().includes(q) ||
      (s.subjudul && s.subjudul.toLowerCase().includes(q)) ||
      (s.deskripsi && s.deskripsi.toLowerCase().includes(q))
    )
  }

  if (filterAktif.value === 'semua') return list
  if (filterAktif.value === 'aktif') return list.filter(s => s.aktif)
  return list.filter(s => !s.aktif)
})

// Data fetch
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

// Form helpers
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

// Upload foto
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

// Save slide
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

// Toggle active status
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

// Reorder
async function pindahUrutan(index: number, arah: 'naik' | 'turun') {
  const targetIndex = arah === 'naik' ? index - 1 : index + 1
  if (targetIndex < 0 || targetIndex >= sliderFiltered.value.length) return

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

// Delete
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
  title: 'Slider Beranda — KNPI Langsa',
  description: 'Manajemen foto dan deskripsi slider halaman beranda KNPI Kota Langsa.',
})
</script>
