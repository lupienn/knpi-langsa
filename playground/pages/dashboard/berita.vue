<template>
  <div class="flex flex-col gap-6">
    <!-- ====== HEADER BANNER EDITORIAL ====== -->
    <div
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-knpi-900 via-knpi-800/80 to-blue-950 p-6 sm:p-8 shadow-2xl border border-knpi-500/20"
    >
      <div class="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-knpi-400/15 blur-3xl" />
      <div class="pointer-events-none absolute -bottom-10 left-20 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-knpi-500/20 border border-knpi-400/30 text-xs font-semibold text-knpi-300 mb-3"
          >
            <LucideNewspaper :size="14" />
            <span>Portal Editorial &amp; Warta Pemuda</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Kelola Berita &amp; Informasi
          </h2>
          <p class="mt-1 text-sm text-slate-300/80">
            Pusat kendali pembuatan, penerbitan, dan pengelolaan warta resmi DPD KNPI Kota Langsa.
          </p>
        </div>
        <button
          id="btn-tambah-berita"
          class="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-knpi-500 to-knpi-600 text-white font-bold text-sm shadow-lg shadow-knpi-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          @click="bukaFormTambah"
        >
          <LucidePenSquare :size="18" />
          <span>Tulis Berita Baru</span>
        </button>
      </div>
    </div>

    <!-- ====== EDITORIAL STATS METRIC CARDS ====== -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <!-- Card Total -->
      <div class="glass-card p-4 flex items-center gap-3.5 border-knpi-500/20">
        <div class="p-3 rounded-2xl bg-knpi-500/10 text-knpi-400 border border-knpi-500/20 shrink-0">
          <LucideFileText :size="20" />
        </div>
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Berita
          </p>
          <p class="text-xl font-extrabold text-white mt-0.5">
            {{ daftarBerita.length }}
          </p>
        </div>
      </div>

      <!-- Card Terbit -->
      <div class="glass-card p-4 flex items-center gap-3.5 border-emerald-500/20">
        <div class="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
          <LucideCheckCircle2 :size="20" />
        </div>
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Terpublikasi
          </p>
          <p class="text-xl font-extrabold text-emerald-400 mt-0.5">
            {{ totalTerbit }}
          </p>
        </div>
      </div>

      <!-- Card Draf -->
      <div class="glass-card p-4 flex items-center gap-3.5 border-amber-500/20">
        <div class="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
          <LucideFileEdit :size="20" />
        </div>
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Draf Disimpan
          </p>
          <p class="text-xl font-extrabold text-amber-400 mt-0.5">
            {{ totalDraf }}
          </p>
        </div>
      </div>

      <!-- Card Kegiatan -->
      <div class="glass-card p-4 flex items-center gap-3.5 border-violet-500/20">
        <div class="p-3 rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/20 shrink-0">
          <LucideTag :size="20" />
        </div>
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Kegiatan
          </p>
          <p class="text-xl font-extrabold text-violet-400 mt-0.5">
            {{ totalKegiatan }}
          </p>
        </div>
      </div>
    </div>

    <!-- ====== SEARCH & FILTER TOOLBAR ====== -->
    <div class="glass-card p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      <!-- Search Input -->
      <div class="relative flex-1 min-w-0">
        <LucideSearch
          :size="16"
          class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          v-model="kataKunciCari"
          type="text"
          placeholder="Cari judul berita atau kata kunci..."
          class="w-full rounded-xl border border-white/10 bg-slate-900/80 pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:border-knpi-500 focus:outline-none focus:ring-1 focus:ring-knpi-500/50 transition-all"
        >
        <button
          v-if="kataKunciCari"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          @click="kataKunciCari = ''"
        >
          <LucideX :size="14" />
        </button>
      </div>

      <!-- Filter Pills & View Switcher -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          <button
            v-for="tab in tabFilter"
            :key="tab.value"
            class="shrink-0 flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer"
            :class="filterAktif === tab.value
              ? 'border-knpi-500/40 bg-knpi-600/25 text-knpi-300 shadow-sm'
              : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'"
            @click="filterAktif = tab.value"
          >
            <span>{{ tab.label }}</span>
            <span
              class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
              :class="filterAktif === tab.value ? 'bg-knpi-500/30 text-knpi-200' : 'bg-white/10 text-slate-400'"
            >
              {{ hitungFilter(tab.value) }}
            </span>
          </button>
        </div>

        <!-- View Switcher (Grid vs Table) -->
        <div class="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/5 ml-auto md:ml-0">
          <button
            class="p-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
            :class="tampilanMode === 'grid' ? 'bg-knpi-500/20 text-knpi-300 border border-knpi-500/30' : 'text-slate-400 hover:text-white'"
            title="Tampilan Kartu Grid"
            @click="tampilanMode = 'grid'"
          >
            <LucideLayoutGrid :size="15" />
          </button>
          <button
            class="p-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
            :class="tampilanMode === 'tabel' ? 'bg-knpi-500/20 text-knpi-300 border border-knpi-500/30' : 'text-slate-400 hover:text-white'"
            title="Tampilan Tabel Data"
            @click="tampilanMode = 'tabel'"
          >
            <LucideList :size="15" />
          </button>
        </div>
      </div>
    </div>

    <!-- ====== SKELETON LOADING STATE ====== -->
    <div
      v-if="sedangMemuat"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="i in 6"
        :key="'skel-' + i"
        class="glass-card p-4 flex flex-col gap-3 animate-pulse"
      >
        <div class="w-full aspect-[16/10] rounded-xl bg-slate-800/80" />
        <div class="space-y-2 py-1">
          <div class="h-4 bg-slate-800/80 rounded w-3/4" />
          <div class="h-3 bg-slate-800/60 rounded w-1/2" />
          <div class="h-3 bg-slate-800/40 rounded w-full" />
        </div>
        <div class="flex gap-2 pt-2 border-t border-white/5">
          <div class="h-7 w-16 bg-slate-800/60 rounded-lg" />
          <div class="h-7 w-16 bg-slate-800/60 rounded-lg" />
        </div>
      </div>
    </div>

    <!-- ====== EMPTY STATE ====== -->
    <div
      v-else-if="beritaFiltered.length === 0"
      class="glass-card flex flex-col items-center justify-center py-20 gap-4 text-center px-6"
    >
      <div
        class="w-16 h-16 rounded-2xl bg-knpi-500/10 border border-knpi-500/20 flex items-center justify-center text-knpi-400 shadow-inner"
      >
        <LucideNewspaper :size="32" />
      </div>
      <div>
        <h3 class="text-white font-bold text-lg">
          Tidak Ada Berita Ditemukan
        </h3>
        <p class="text-slate-400 text-sm mt-1 max-w-md">
          {{ pesanEmptyState }}
        </p>
      </div>
      <button
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-knpi-500 text-white font-bold text-xs shadow-lg hover:bg-knpi-400 transition cursor-pointer"
        @click="kataKunciCari ? (kataKunciCari = '') : bukaFormTambah()"
      >
        <LucideRotateCcw
          v-if="kataKunciCari"
          :size="15"
        />
        <LucidePlus
          v-else
          :size="15"
        />
        <span>{{ kataKunciCari ? 'Reset Pencarian' : 'Tulis Berita Pertama' }}</span>
      </button>
    </div>

    <!-- ====== TAMPILAN GRID EDITORIAL ====== -->
    <div
      v-else-if="tampilanMode === 'grid'"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
    >
      <div
        v-for="item in beritaFiltered"
        :key="item.id"
        class="glass-card group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-knpi-500/40 hover:bg-white/[0.02]"
      >
        <div>
          <!-- Thumbnail Sampul -->
          <div class="relative w-full aspect-[16/10] overflow-hidden bg-slate-900 border-b border-white/10">
            <img
              v-if="item.gambarUrl"
              :src="item.gambarUrl"
              :alt="item.judul"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onerror="this.src='/favicon.ico'; this.classList.add('object-contain','p-8')"
            >
            <div
              v-else
              class="absolute inset-0 flex flex-col items-center justify-center text-slate-600 bg-slate-900/90"
            >
              <LucideImage :size="36" />
              <span class="text-[10px] text-slate-500 font-medium mt-1">Tanpa Gambar Sampul</span>
            </div>

            <!-- Category Badge (Top Left) -->
            <div class="absolute top-3 left-3">
              <span
                class="inline-block rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border"
                :class="kelasKategori(item.kategori)"
              >
                {{ labelKategori(item.kategori) }}
              </span>
            </div>

            <!-- Status Badge (Top Right) -->
            <div class="absolute top-3 right-3">
              <span
                class="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border shadow-sm"
                :class="item.status === 'terbit'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-950/80 text-amber-300 border-amber-500/30'"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full"
                  :class="item.status === 'terbit' ? 'bg-emerald-400' : 'bg-amber-400'"
                />
                {{ item.status === 'terbit' ? 'Terbit' : 'Draf' }}
              </span>
            </div>

            <!-- Reader Preview Hover Button -->
            <button
              type="button"
              class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white backdrop-blur-[2px] transition-opacity duration-200 cursor-pointer"
              title="Baca Pratinjau Artikel"
              @click="bukaPratinjauArtikel(item)"
            >
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md text-xs font-bold shadow-lg"
              >
                <LucideBookOpen :size="15" />
                <span>Baca Artikel</span>
              </span>
            </button>
          </div>

          <!-- Content Info -->
          <div class="p-4 sm:p-5">
            <h3
              class="font-bold text-white text-base line-clamp-2 leading-snug group-hover:text-knpi-300 transition-colors"
            >
              {{ item.judul }}
            </h3>
            <p class="text-xs text-slate-300/80 mt-2 line-clamp-3 leading-relaxed">
              {{ item.ringkasan }}
            </p>
          </div>
        </div>

        <!-- Card Footer Toolbar -->
        <div
          class="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2"
        >
          <!-- Meta Date -->
          <div class="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
            <LucideCalendar
              :size="13"
              class="text-slate-500"
            />
            <span>{{ formatTanggal(item.createdAt) }}</span>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1.5">
            <!-- Toggle Status -->
            <button
              class="p-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer"
              :class="item.status === 'terbit'
                ? 'border-slate-500/20 bg-slate-500/10 text-slate-400 hover:bg-slate-500/20'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'"
              :title="item.status === 'terbit' ? 'Ubah ke Draf' : 'Terbitkan Berita'"
              @click="toggleStatusBerita(item)"
            >
              <LucideEyeOff
                v-if="item.status === 'terbit'"
                :size="14"
              />
              <LucideSend
                v-else
                :size="14"
              />
            </button>

            <!-- Edit -->
            <button
              class="p-1.5 rounded-lg text-xs font-semibold border border-knpi-500/30 bg-knpi-500/10 text-knpi-300 hover:bg-knpi-500/20 transition cursor-pointer"
              title="Edit Berita"
              @click="bukaFormEdit(item)"
            >
              <LucidePencil :size="14" />
            </button>

            <!-- Delete -->
            <button
              class="p-1.5 rounded-lg text-xs font-semibold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
              title="Hapus Berita"
              @click="konfirmasiHapus(item)"
            >
              <LucideTrash2 :size="14" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ====== TAMPILAN TABEL DATA EDITORIAL ====== -->
    <div
      v-else-if="tampilanMode === 'tabel'"
      class="glass-card overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr
              class="border-b border-white/[0.08] bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-slate-400"
            >
              <th class="px-5 py-3.5">
                Berita &amp; Ringkasan
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
          <tbody class="divide-y divide-white/[0.04]">
            <tr
              v-for="item in beritaFiltered"
              :key="'tbl-' + item.id"
              class="transition-colors hover:bg-white/[0.02]"
            >
              <!-- Sampul & Judul -->
              <td class="px-5 py-4">
                <div class="flex items-center gap-3 min-w-[280px] max-w-md">
                  <div class="w-14 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-white/10">
                    <img
                      v-if="item.gambarUrl"
                      :src="item.gambarUrl"
                      :alt="item.judul"
                      class="w-full h-full object-cover"
                      onerror="this.src='/favicon.ico'; this.classList.add('object-contain','p-2')"
                    >
                    <div
                      v-else
                      class="w-full h-full flex items-center justify-center text-slate-600"
                    >
                      <LucideImage :size="16" />
                    </div>
                  </div>
                  <div class="min-w-0">
                    <h4
                      class="font-bold text-white text-xs sm:text-sm truncate hover:text-knpi-300 cursor-pointer"
                      @click="bukaPratinjauArtikel(item)"
                    >
                      {{ item.judul }}
                    </h4>
                    <p class="text-[11px] text-slate-400 truncate mt-0.5">
                      {{ item.ringkasan }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Kategori -->
              <td class="px-5 py-4 whitespace-nowrap">
                <span
                  class="inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase border"
                  :class="kelasKategori(item.kategori)"
                >
                  {{ labelKategori(item.kategori) }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-5 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border"
                  :class="item.status === 'terbit' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' : 'bg-amber-500/10 text-amber-400 border-amber-500/25'"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full"
                    :class="item.status === 'terbit' ? 'bg-emerald-400' : 'bg-amber-400'"
                  />
                  {{ item.status === 'terbit' ? 'Terbit' : 'Draf' }}
                </span>
              </td>

              <!-- Tanggal -->
              <td class="px-5 py-4 text-xs text-slate-400 whitespace-nowrap">
                {{ formatTanggal(item.createdAt) }}
              </td>

              <!-- Aksi -->
              <td class="px-5 py-4 text-right whitespace-nowrap">
                <div class="flex items-center justify-end gap-1.5">
                  <button
                    class="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    title="Baca Pratinjau"
                    @click="bukaPratinjauArtikel(item)"
                  >
                    <LucideBookOpen :size="14" />
                  </button>
                  <button
                    class="p-1.5 rounded-lg border border-knpi-500/30 bg-knpi-500/10 text-knpi-300 hover:bg-knpi-500/20 transition cursor-pointer"
                    title="Edit Berita"
                    @click="bukaFormEdit(item)"
                  >
                    <LucidePencil :size="14" />
                  </button>
                  <button
                    class="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                    title="Hapus Berita"
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
    </div>

    <!-- ====== MODAL PRATINJAU BACA ARTIKEL ====== -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="itemPratinjau"
        class="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        @click.self="itemPratinjau = null"
      >
        <div class="glass-card w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative">
          <!-- Header Pratinjau -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-slate-900/80">
            <div class="flex items-center gap-2 text-xs font-bold text-knpi-400 uppercase tracking-wider">
              <LucideBookOpen :size="16" />
              <span>Pratinjau Pembaca Artikel</span>
            </div>
            <button
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              @click="itemPratinjau = null"
            >
              <LucideX :size="18" />
            </button>
          </div>

          <!-- Body Artikel -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <!-- Badges & Meta -->
            <div class="flex items-center gap-2">
              <span
                class="rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase border"
                :class="kelasKategori(itemPratinjau.kategori)"
              >
                {{ labelKategori(itemPratinjau.kategori) }}
              </span>
              <span class="text-xs text-slate-400">· {{ formatTanggal(itemPratinjau.createdAt) }}</span>
            </div>

            <h1 class="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {{ itemPratinjau.judul }}
            </h1>

            <!-- Cover Image -->
            <div
              v-if="itemPratinjau.gambarUrl"
              class="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 border border-white/10 my-3"
            >
              <img
                :src="itemPratinjau.gambarUrl"
                :alt="itemPratinjau.judul"
                class="w-full h-full object-cover"
              >
            </div>

            <!-- Excerpt Blockquote -->
            <div
              class="p-4 rounded-xl bg-white/[0.03] border-l-4 border-knpi-500 text-sm italic text-slate-300 leading-relaxed"
            >
              "{{ itemPratinjau.ringkasan }}"
            </div>

            <!-- Content HTML -->
            <div
              class="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 whitespace-pre-line border-t border-white/5 pt-4 prose prose-invert max-w-none"
              v-html="itemPratinjau.konten"
            />
          </div>
        </div>
      </div>
    </Transition>

    <!-- ====== MODAL FORM TAMBAH / EDIT BERITA WITH RICH TEXT TOOLBAR ====== -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="tampilForm"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        @click.self="tampilForm = false"
      >
        <div class="glass-card w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
          <!-- Ambient Top Line Accent -->
          <div
            class="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-knpi-500/70 to-transparent"
          />

          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-slate-900/60 shrink-0">
            <div class="flex items-center gap-2.5">
              <span class="p-2 rounded-xl bg-knpi-500/10 text-knpi-400 border border-knpi-500/20">
                <LucidePenSquare :size="18" />
              </span>
              <div>
                <h3 class="text-base font-bold text-white">
                  {{ modeEdit ? 'Edit Artikel Berita' : 'Tulis Berita Baru' }}
                </h3>
                <p class="text-[11px] text-slate-400">
                  {{ subJudulFormModal }}
                </p>
              </div>
            </div>
            <button
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              @click="tampilForm = false"
            >
              <LucideX :size="18" />
            </button>
          </div>

          <!-- Modal Body Form (2 Column Split Grid) -->
          <form
            class="flex-1 overflow-y-auto p-6 flex flex-col justify-between gap-6"
            @submit.prevent="simpanBerita"
          >
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <!-- Kolom Kiri: Form Detail Teks Berita (7 Columns) -->
              <div class="lg:col-span-7 flex flex-col gap-4">
                <!-- Judul Artikel -->
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">
                    Judul Artikel <span class="text-red-400">*</span>
                  </label>
                  <input
                    v-model="form.judul"
                    type="text"
                    placeholder="Masukkan judul artikel berita"
                    class="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-knpi-500 focus:outline-none focus:ring-1 focus:ring-knpi-500/50 transition-all"
                    required
                  >
                </div>

                <!-- Kategori & Status Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5">Kategori Editorial</label>
                    <select
                      v-model="form.kategori"
                      class="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-knpi-500 focus:outline-none focus:ring-1 focus:ring-knpi-500/50 transition-all cursor-pointer"
                    >
                      <option
                        value="kegiatan"
                        class="bg-slate-900 text-white"
                      >
                        Kegiatan
                      </option>
                      <option
                        value="pengumuman"
                        class="bg-slate-900 text-white"
                      >
                        Pengumuman
                      </option>
                      <option
                        value="artikel"
                        class="bg-slate-900 text-white"
                      >
                        Artikel
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5">Status Publikasi</label>
                    <select
                      v-model="form.status"
                      class="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-knpi-500 focus:outline-none focus:ring-1 focus:ring-knpi-500/50 transition-all cursor-pointer"
                    >
                      <option
                        value="draf"
                        class="bg-slate-900 text-white"
                      >
                        Draf (Disimpan)
                      </option>
                      <option
                        value="terbit"
                        class="bg-slate-900 text-white"
                      >
                        Terbit (Publikasi)
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Ringkasan Excerpt -->
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ringkasan / Excerpt <span class="text-red-400">*</span>
                  </label>
                  <textarea
                    v-model="form.ringkasan"
                    rows="2"
                    placeholder="Masukkan ringkasan singkat artikel"
                    class="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-knpi-500 focus:outline-none focus:ring-1 focus:ring-knpi-500/50 resize-none transition-all"
                    required
                  />
                </div>

                <!-- Konten Lengkap + Word-Style Rich Text Editor Toolbar -->
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="block text-xs font-semibold text-slate-300">
                      Isi Konten Lengkap <span class="text-red-400">*</span>
                    </label>
                    <span class="text-[10px] text-slate-400 font-mono">{{ form.konten.length }} Karakter</span>
                  </div>

                  <!-- Word-Style Formatting Toolbar -->
                  <div
                    class="flex items-center flex-wrap gap-1 p-1.5 rounded-t-xl border border-b-0 border-white/10 bg-slate-950/90 text-slate-300 shadow-inner"
                  >
                    <!-- Undo & Redo Buttons -->
                    <button
                      type="button"
                      class="p-1.5 rounded-lg transition cursor-pointer text-xs font-bold flex items-center gap-1"
                      :class="riwayatUndo.length > 0 ? 'hover:bg-white/10 hover:text-white text-slate-300' : 'text-slate-600 cursor-not-allowed'"
                      :disabled="riwayatUndo.length === 0"
                      title="Batal Tindakan (Undo Ctrl+Z)"
                      @click="lakukanUndo"
                    >
                      <LucideUndo2 :size="15" />
                    </button>
                    <button
                      type="button"
                      class="p-1.5 rounded-lg transition cursor-pointer text-xs font-bold flex items-center gap-1"
                      :class="riwayatRedo.length > 0 ? 'hover:bg-white/10 hover:text-white text-slate-300' : 'text-slate-600 cursor-not-allowed'"
                      :disabled="riwayatRedo.length === 0"
                      title="Ulangi Tindakan (Redo Ctrl+Y)"
                      @click="lakukanRedo"
                    >
                      <LucideRedo2 :size="15" />
                    </button>
                    <div class="h-4 w-[1px] bg-white/10 mx-1" />

                    <!-- Format Styling Buttons -->
                    <button
                      type="button"
                      class="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition cursor-pointer text-xs font-bold flex items-center gap-1"
                      title="Tebal (Bold <b>)"
                      @click="sisipkanFormat('<b>', '</b>')"
                    >
                      <LucideBold :size="15" />
                    </button>
                    <button
                      type="button"
                      class="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition cursor-pointer text-xs font-bold flex items-center gap-1"
                      title="Miring (Italic <i>)"
                      @click="sisipkanFormat('<i>', '</i>')"
                    >
                      <LucideItalic :size="15" />
                    </button>
                    <button
                      type="button"
                      class="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition cursor-pointer text-xs font-bold flex items-center gap-1"
                      title="Garis Bawah (Underline <u>)"
                      @click="sisipkanFormat('<u>', '</u>')"
                    >
                      <LucideUnderline :size="15" />
                    </button>
                    <div class="h-4 w-[1px] bg-white/10 mx-1" />
                    <button
                      type="button"
                      class="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition cursor-pointer text-xs font-bold flex items-center gap-1"
                      title="Subjudul (Heading <h3>)"
                      @click="sisipkanFormat('\n<h3>', '</h3>\n')"
                    >
                      <LucideHeading :size="15" />
                    </button>
                    <button
                      type="button"
                      class="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition cursor-pointer text-xs font-bold flex items-center gap-1"
                      title="Poin List (Bullet •)"
                      @click="sisipkanFormat('\n• ')"
                    >
                      <LucideList :size="15" />
                    </button>
                    <button
                      type="button"
                      class="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition cursor-pointer text-xs font-bold flex items-center gap-1"
                      title="Angka List (Numbered 1.)"
                      @click="sisipkanFormat('\n1. ')"
                    >
                      <LucideListOrdered :size="15" />
                    </button>
                    <div class="h-4 w-[1px] bg-white/10 mx-1" />
                    <button
                      type="button"
                      class="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition cursor-pointer text-xs font-bold flex items-center gap-1"
                      title="Kutipan (Blockquote <blockquote>)"
                      @click="sisipkanFormat('\n<blockquote>', '</blockquote>\n')"
                    >
                      <LucideQuote :size="15" />
                    </button>
                    <button
                      type="button"
                      class="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition cursor-pointer text-xs font-bold flex items-center gap-1"
                      title="Sisipkan Tautan (Link)"
                      @click="sisipkanFormat('<a href=\'https://\' target=\'_blank\'>', '</a>')"
                    >
                      <LucideLink :size="15" />
                    </button>
                    <button
                      type="button"
                      class="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition cursor-pointer text-xs font-bold flex items-center gap-1"
                      title="Garis Pemisah (<hr>)"
                      @click="sisipkanFormat('\n<hr>\n')"
                    >
                      <LucideMinus :size="15" />
                    </button>
                  </div>

                  <!-- Textarea Konten Kebawah -->
                  <textarea
                    ref="refKontenTextarea"
                    v-model="form.konten"
                    rows="10"
                    placeholder="Tuliskan isi konten berita secara lengkap di sini. Gunakan tombol toolbar di atas untuk menambahkan tebal (bold), miring, subjudul, list, atau tautan..."
                    class="w-full rounded-b-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-knpi-500 focus:outline-none focus:ring-1 focus:ring-knpi-500/50 resize-y transition-all font-sans min-h-[220px]"
                    required
                    @keydown="handleKeydownTextarea"
                  />
                </div>
              </div>

              <!-- Kolom Kanan: Upload & Preview Gambar Sampul Utama (5 Columns) -->
              <div class="lg:col-span-5 flex flex-col gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">Gambar Sampul Utama</label>

                  <!-- Preview Gambar -->
                  <div
                    v-if="previewGambar || form.gambarUrl"
                    class="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-white/15 shadow-2xl group"
                  >
                    <img
                      :src="previewGambar || form.gambarUrl"
                      alt="Preview Sampul"
                      class="w-full h-full object-cover"
                    >
                    <div
                      class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]"
                    >
                      <button
                        type="button"
                        class="px-3 py-2 rounded-xl bg-red-500/90 text-white hover:bg-red-600 transition shadow-lg cursor-pointer text-xs font-bold flex items-center gap-1.5"
                        title="Ganti Gambar Sampul"
                        @click="hapusGambar"
                      >
                        <LucideTrash2 :size="15" />
                        <span>Hapus Foto</span>
                      </button>
                    </div>
                  </div>

                  <!-- Dropzone Upload (Tinggi Penuh di Kanan) -->
                  <div
                    v-if="!previewGambar && !form.gambarUrl"
                    class="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-slate-900/50 min-h-[340px] p-6 text-center hover:border-knpi-500/50 hover:bg-knpi-500/[0.03] transition-all cursor-pointer group"
                    @click="($refs.inputGambar as HTMLInputElement)?.click()"
                    @dragover.prevent
                    @drop.prevent="handleDrop"
                  >
                    <div class="p-4 rounded-2xl bg-knpi-500/10 text-knpi-400 mb-3 border border-knpi-500/20 group-hover:scale-110 transition-transform">
                      <LucideUploadCloud :size="32" />
                    </div>
                    <p class="text-sm font-bold text-slate-200">
                      Klik atau seret file gambar sampul ke sini
                    </p>
                    <p class="text-xs text-slate-400 mt-1 max-w-[200px] leading-relaxed">
                      Unggah foto untuk dijadikan gambar sampul utama artikel.
                    </p>
                    <span class="inline-block mt-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-400 font-mono">
                      JPG, PNG, WebP (Maks 5MB)
                    </span>
                    <input
                      ref="inputGambar"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      class="hidden"
                      @change="handleFileChange"
                    >
                  </div>

                  <!-- Loading Upload -->
                  <div
                    v-if="sedangUpload"
                    class="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-knpi-400 p-3 rounded-xl bg-knpi-500/10 border border-knpi-500/20"
                  >
                    <LucideLoader
                      :size="15"
                      class="animate-spin"
                    />
                    <span>Mengunggah gambar sampul...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Buttons -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                class="px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition cursor-pointer"
                @click="tampilForm = false"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="sedangMenyimpan || sedangUpload"
                class="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-knpi-600 to-knpi-500 text-xs font-bold text-white shadow-lg shadow-knpi-500/20 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <LucideLoader
                  v-if="sedangMenyimpan"
                  :size="15"
                  class="animate-spin"
                />
                <LucideCheck
                  v-else
                  :size="15"
                />
                <span>{{ labelTombolSubmit }}</span>
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
        v-if="tampilKonfirmasiHapus"
        class="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        @click.self="tampilKonfirmasiHapus = false"
      >
        <div class="glass-card w-full max-w-sm p-6 text-center relative overflow-hidden shadow-2xl">
          <div
            class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/15 text-red-400 shadow-inner"
          >
            <LucideTrash2 :size="26" />
          </div>
          <h3 class="text-base font-bold text-white">
            Hapus Berita Ini?
          </h3>
          <p class="mt-1.5 text-xs leading-relaxed text-slate-400">
            Berita <span class="text-white font-semibold">"{{ beritaDihapus?.judul }}"</span> akan dihapus secara
            permanen dari sistem.
          </p>
          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition cursor-pointer"
              @click="tampilKonfirmasiHapus = false"
            >
              Batal
            </button>
            <button
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-2.5 text-xs font-bold text-white shadow-lg hover:brightness-110 disabled:opacity-60 transition cursor-pointer"
              :disabled="sedangMenghapus"
              @click="hapusBerita"
            >
              <LucideLoader
                v-if="sedangMenghapus"
                :size="14"
                class="animate-spin"
              />
              <span>{{ sedangMenghapus ? 'Menghapus...' : 'Ya, Hapus' }}</span>
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
        :class="toast.tipe === 'error' ? 'border-red-500/30 bg-red-950/90 text-red-300' : 'border-emerald-500/30 bg-emerald-950/90 text-emerald-300'"
      >
        <LucideAlertCircle
          v-if="toast.tipe === 'error'"
          :size="18"
        />
        <LucideCheckCircle
          v-else
          :size="18"
        />
        <span class="text-xs font-semibold">{{ toast.pesan }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'dashboard',
})

interface BeritaItem {
  id: number
  judul: string
  ringkasan: string
  konten: string
  gambarUrl?: string | null
  kategori: string
  status: string
  penulis?: string | null
  createdAt: string
  updatedAt?: string
}

const authStore = useAuthStore()

const daftarBerita = ref<BeritaItem[]>([])
const sedangMemuat = ref(true)
const filterAktif = ref('semua')
const kataKunciCari = ref('')
const tampilanMode = ref<'grid' | 'tabel'>('grid')
const itemPratinjau = ref<BeritaItem | null>(null)

const tabFilter = [
  { label: 'Semua', value: 'semua' },
  { label: 'Terbit', value: 'terbit' },
  { label: 'Draf', value: 'draf' },
  { label: 'Kegiatan', value: 'kegiatan' },
  { label: 'Pengumuman', value: 'pengumuman' },
  { label: 'Artikel', value: 'artikel' },
]

// Metrics & Text Computed
const totalTerbit = computed(() => daftarBerita.value.filter(b => b.status === 'terbit').length)
const totalDraf = computed(() => daftarBerita.value.filter(b => b.status === 'draf').length)
const totalKegiatan = computed(() => daftarBerita.value.filter(b => b.kategori === 'kegiatan').length)

const pesanEmptyState = computed(() => {
  if (kataKunciCari.value.trim()) {
    return `Tidak ada berita yang cocok dengan kata kunci "${kataKunciCari.value}".`
  }
  return 'Belum ada berita yang diterbitkan. Klik tombol di bawah untuk membuat berita baru.'
})

const subJudulFormModal = computed(() => {
  return modeEdit.value
    ? 'Perbarui konten artikel berita yang telah ada'
    : 'Isi formulir editorial untuk publikasi warta DPD KNPI Langsa'
})

const labelTombolSubmit = computed(() => {
  if (sedangMenyimpan.value) return 'Menyimpan...'
  return modeEdit.value ? 'Simpan Perubahan' : 'Terbitkan Berita'
})

function hitungFilter(val: string) {
  let list = daftarBerita.value
  if (kataKunciCari.value.trim()) {
    const q = kataKunciCari.value.toLowerCase()
    list = list.filter(b => b.judul.toLowerCase().includes(q) || b.ringkasan.toLowerCase().includes(q))
  }
  if (val === 'semua') return list.length
  if (['terbit', 'draf'].includes(val)) {
    return list.filter(b => b.status === val).length
  }
  return list.filter(b => b.kategori === val).length
}

const beritaFiltered = computed(() => {
  let list = daftarBerita.value

  // Search keyword filter
  if (kataKunciCari.value.trim()) {
    const q = kataKunciCari.value.toLowerCase()
    list = list.filter(b => b.judul.toLowerCase().includes(q) || b.ringkasan.toLowerCase().includes(q))
  }

  // Category/Status filter
  if (filterAktif.value === 'semua') return list
  if (['terbit', 'draf'].includes(filterAktif.value)) {
    return list.filter(b => b.status === filterAktif.value)
  }
  return list.filter(b => b.kategori === filterAktif.value)
})

// Form state & Rich Text Editor Undo/Redo Helper
const tampilForm = ref(false)
const modeEdit = ref(false)
const sedangMenyimpan = ref(false)
const idDiedit = ref<number | null>(null)
const refKontenTextarea = ref<HTMLTextAreaElement | null>(null)

const form = reactive({
  judul: '',
  ringkasan: '',
  konten: '',
  kategori: 'kegiatan',
  status: 'draf',
  gambarUrl: '',
})

// Undo & Redo History Stack Engine
const riwayatUndo = ref<string[]>([])
const riwayatRedo = ref<string[]>([])
const isUndoingOrRedoing = ref(false)
let timerDebounceRiwayat: ReturnType<typeof setTimeout> | null = null

watch(() => form.konten, (valBaru, valLama) => {
  if (isUndoingOrRedoing.value) return

  clearTimeout(timerDebounceRiwayat)
  timerDebounceRiwayat = setTimeout(() => {
    if (valLama !== undefined && valLama !== valBaru) {
      if (riwayatUndo.value[riwayatUndo.value.length - 1] !== valLama) {
        riwayatUndo.value.push(valLama)
        if (riwayatUndo.value.length > 50) riwayatUndo.value.shift()
        riwayatRedo.value = []
      }
    }
  }, 350)
})

function lakukanUndo() {
  if (riwayatUndo.value.length > 0) {
    isUndoingOrRedoing.value = true
    const stateLama = riwayatUndo.value.pop()!
    riwayatRedo.value.push(form.konten)
    form.konten = stateLama
    nextTick(() => {
      isUndoingOrRedoing.value = false
    })
  }
}

function lakukanRedo() {
  if (riwayatRedo.value.length > 0) {
    isUndoingOrRedoing.value = true
    const stateSelanjutnya = riwayatRedo.value.pop()!
    riwayatUndo.value.push(form.konten)
    form.konten = stateSelanjutnya
    nextTick(() => {
      isUndoingOrRedoing.value = false
    })
  }
}

function sisipkanFormat(prefix: string, suffix: string = '') {
  const el = refKontenTextarea.value
  if (!el) {
    form.konten += `${prefix}${suffix}`
    return
  }

  el.focus()
  const start = el.selectionStart
  const end = el.selectionEnd
  const selectedText = form.konten.substring(start, end)
  const textSel = selectedText || 'teks'
  const replacement = prefix + textSel + suffix

  // Menggunakan insertText agar riwayat native browser Undo/Redo (Ctrl+Z) juga tetap terjaga
  try {
    if (document.queryCommandSupported && document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, replacement)
    }
    else {
      form.konten = form.konten.substring(0, start) + replacement + form.konten.substring(end)
    }
  }
  catch {
    form.konten = form.konten.substring(0, start) + replacement + form.konten.substring(end)
  }

  nextTick(() => {
    el.focus()
    el.setSelectionRange(start + prefix.length, start + prefix.length + textSel.length)
  })
}

function handleKeydownTextarea(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
    if (e.shiftKey) {
      e.preventDefault()
      lakukanRedo()
    }
    else {
      e.preventDefault()
      lakukanUndo()
    }
  }
  else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
    e.preventDefault()
    lakukanRedo()
  }
}

const fileGambar = ref<File | null>(null)
const previewGambar = ref<string | null>(null)
const sedangUpload = ref(false)

// Delete State
const tampilKonfirmasiHapus = ref(false)
const beritaDihapus = ref<BeritaItem | null>(null)
const sedangMenghapus = ref(false)

// Toast State
const toast = reactive({ tampil: false, pesan: '', tipe: 'success' })

function tampilkanToast(pesan: string, tipe = 'success') {
  toast.pesan = pesan
  toast.tipe = tipe
  toast.tampil = true
  setTimeout(() => {
    toast.tampil = false
  }, 3500)
}

// Helpers
function formatTanggal(tgl: string) {
  try {
    return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  }
  catch {
    return tgl
  }
}

function labelKategori(kat: string) {
  const map: Record<string, string> = { kegiatan: 'Kegiatan', pengumuman: 'Pengumuman', artikel: 'Artikel' }
  return map[kat] || kat
}

function kelasKategori(kat: string) {
  const map: Record<string, string> = {
    kegiatan: 'bg-knpi-600/20 text-knpi-300 border-knpi-500/30',
    pengumuman: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    artikel: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  }
  return map[kat] || 'bg-slate-500/20 text-slate-400 border-slate-500/20'
}

function bukaPratinjauArtikel(item: BeritaItem) {
  itemPratinjau.value = item
}

// Quick status toggle
async function toggleStatusBerita(item: BeritaItem) {
  const statusBaru = item.status === 'terbit' ? 'draf' : 'terbit'
  try {
    await $fetch(`/api/berita/${item.id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: {
        judul: item.judul,
        ringkasan: item.ringkasan,
        konten: item.konten,
        kategori: item.kategori,
        gambarUrl: item.gambarUrl,
        status: statusBaru,
      },
    })
    tampilkanToast(`Status berita diubah ke ${statusBaru === 'terbit' ? 'Terbit' : 'Draf'}.`)
    await muatBerita()
  }
  catch {
    tampilkanToast('Gagal mengubah status berita.', 'error')
  }
}

// CRUD Operations
async function muatBerita() {
  sedangMemuat.value = true
  try {
    const res = await $fetch<{ berhasil: boolean, data: BeritaItem[] }>('/api/berita', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    if (res.berhasil) {
      daftarBerita.value = res.data
    }
  }
  catch {
    tampilkanToast('Gagal memuat daftar berita.', 'error')
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
  previewGambar.value = null
  idDiedit.value = null
  modeEdit.value = false
  riwayatUndo.value = []
  riwayatRedo.value = []
}

function bukaFormTambah() {
  resetForm()
  tampilForm.value = true
}

function bukaFormEdit(item: BeritaItem) {
  resetForm()
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

// Upload Handling
function processFile(file: File) {
  if (file.size > 5 * 1024 * 1024) {
    tampilkanToast('Ukuran file maksimal 5MB.', 'error')
    return
  }
  fileGambar.value = file
  previewGambar.value = URL.createObjectURL(file)
  uploadGambar(file)
}

function handleFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files && input.files[0]) {
    processFile(input.files[0])
  }
}

function handleDrop(e: DragEvent) {
  if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
    processFile(e.dataTransfer.files[0])
  }
}

async function uploadGambar(file: File) {
  sedangUpload.value = true
  try {
    const formData = new FormData()
    formData.append('gambar', file)
    const res = await $fetch<{ berhasil: boolean, url: string }>('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: formData,
    })
    if (res.berhasil) {
      form.gambarUrl = res.url
      tampilkanToast('Gambar sampul berhasil diunggah.')
    }
  }
  catch {
    tampilkanToast('Gagal mengunggah gambar sampul.', 'error')
    previewGambar.value = null
    fileGambar.value = null
  }
  finally {
    sedangUpload.value = false
  }
}

function hapusGambar() {
  form.gambarUrl = ''
  fileGambar.value = null
  previewGambar.value = null
}

// Simpan Form
async function simpanBerita() {
  if (!form.judul.trim() || !form.ringkasan.trim() || !form.konten.trim()) {
    tampilkanToast('Harap isi semua kolom wajib.', 'error')
    return
  }

  sedangMenyimpan.value = true
  try {
    if (modeEdit.value && idDiedit.value) {
      await $fetch(`/api/berita/${idDiedit.value}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${authStore.token}` },
        body: form,
      })
      tampilkanToast('Artikel berita berhasil diperbarui!')
    }
    else {
      await $fetch('/api/berita', {
        method: 'POST',
        headers: { Authorization: `Bearer ${authStore.token}` },
        body: form,
      })
      tampilkanToast('Artikel berita baru berhasil diterbitkan!')
    }
    tampilForm.value = false
    await muatBerita()
  }
  catch {
    tampilkanToast('Gagal menyimpan artikel berita.', 'error')
  }
  finally {
    sedangMenyimpan.value = false
  }
}

// Hapus
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
    tampilkanToast(`Berita "${beritaDihapus.value.judul}" berhasil dihapus.`)
    tampilKonfirmasiHapus.value = false
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
</script>
