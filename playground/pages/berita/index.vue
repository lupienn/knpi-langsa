<template>
  <div class="min-h-screen font-sans bg-[#090d16] text-slate-100 selection:bg-knpi-500/30 selection:text-knpi-200 flex flex-col relative overflow-x-hidden">
    <!-- Ambient Background Lighting with Organic Motion -->
    <div class="pointer-events-none fixed top-0 right-1/4 h-[550px] w-[550px] rounded-full bg-knpi-600/10 blur-[150px] -z-10 animate-float" />
    <div class="pointer-events-none fixed bottom-1/4 left-10 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px] -z-10 animate-float-slow" />
    <div class="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-cyan-600/5 blur-[160px] -z-10 animate-float" />

    <!-- Navbar Header with Slide Down Entrance -->
    <header
      class="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0c1322]/85 text-white backdrop-blur-2xl transition-all duration-700 ease-out transform"
      :class="[
        isScrolledDown ? 'h-16 py-2 shadow-lg shadow-black/30' : 'h-20 py-4',
        halamanSelesaiMuat ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0',
      ]"
    >
      <div class="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
        <!-- Logo Brand -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3.5 group shrink-0"
        >
          <img
            src="~/assets/logo-knpi.png"
            alt="Logo KNPI Langsa"
            class="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          >
          <div>
            <span class="block text-base font-extrabold tracking-tight transition-colors text-white group-hover:text-knpi-300">
              KNPI Langsa
            </span>
            <span class="block text-[10px] font-medium text-slate-400">Kota Langsa</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
          <NuxtLink
            to="/#beranda"
            class="transition-colors hover:text-white"
          >
            Beranda
          </NuxtLink>
          <NuxtLink
            to="/#pengurus"
            class="transition-colors hover:text-white"
          >
            Pengurus
          </NuxtLink>
          <NuxtLink
            to="/#visi-misi"
            class="transition-colors hover:text-white"
          >
            Visi &amp; Misi
          </NuxtLink>
          <NuxtLink
            to="/#program-kerja"
            class="transition-colors hover:text-white"
          >
            Program
          </NuxtLink>
          <NuxtLink
            to="/berita"
            class="transition-colors text-knpi-400 font-bold"
          >
            Berita
          </NuxtLink>
        </nav>

        <!-- Right Controls: Login & Mobile Hamburger -->
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/login"
            class="btn-primary !w-auto !py-2.5 !px-5 !text-xs hidden sm:flex items-center gap-2"
          >
            <LucideLogIn :size="15" />
            <span>Masuk Panel</span>
          </NuxtLink>

          <!-- Mobile Hamburger Toggle -->
          <button
            type="button"
            class="flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/15 transition cursor-pointer"
            aria-label="Buka menu navigasi"
            @click="menuMobileTerbuka = !menuMobileTerbuka"
          >
            <LucideX
              v-if="menuMobileTerbuka"
              :size="18"
            />
            <LucideMenu
              v-else
              :size="18"
            />
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Drawer -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="menuMobileTerbuka"
        class="fixed inset-x-0 top-16 z-40 md:hidden border-b p-5 backdrop-blur-2xl transition-colors shadow-2xl bg-[#0c1322]/95 border-white/10 text-white"
      >
        <nav class="flex flex-col gap-2 font-semibold text-sm">
          <NuxtLink
            to="/#beranda"
            class="px-3.5 py-2.5 rounded-xl transition hover:bg-white/5"
            @click="menuMobileTerbuka = false"
          >
            Beranda
          </NuxtLink>
          <NuxtLink
            to="/#pengurus"
            class="px-3.5 py-2.5 rounded-xl transition hover:bg-white/5"
            @click="menuMobileTerbuka = false"
          >
            Pengurus
          </NuxtLink>
          <NuxtLink
            to="/#visi-misi"
            class="px-3.5 py-2.5 rounded-xl transition hover:bg-white/5"
            @click="menuMobileTerbuka = false"
          >
            Visi &amp; Misi
          </NuxtLink>
          <NuxtLink
            to="/#program-kerja"
            class="px-3.5 py-2.5 rounded-xl transition hover:bg-white/5"
            @click="menuMobileTerbuka = false"
          >
            Program Kerja
          </NuxtLink>
          <NuxtLink
            to="/berita"
            class="px-3.5 py-2.5 rounded-xl transition bg-knpi-500/15 text-knpi-300 border border-knpi-500/30 font-bold"
            @click="menuMobileTerbuka = false"
          >
            Berita (Aktif)
          </NuxtLink>
          <div class="border-t border-white/10 pt-3 mt-1">
            <NuxtLink
              to="/login"
              class="btn-primary !w-full !py-2.5 !text-xs"
              @click="menuMobileTerbuka = false"
            >
              <LucideLogIn :size="15" />
              <span>Masuk Panel Administrasi</span>
            </NuxtLink>
          </div>
        </nav>
      </div>
    </Transition>

    <!-- Main Content Area -->
    <main class="flex-1">
      <!-- Hero / Header Banner with Entrance Animation -->
      <section class="relative py-12 sm:py-16 border-b border-white/[0.08] bg-[#0c1322]/60 overflow-hidden">
        <!-- Floating Accent Glows -->
        <div class="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-knpi-500/10 rounded-full blur-3xl animate-float-slow" />
        <div class="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <!-- Breadcrumb with Slide In -->
          <nav
            class="flex items-center gap-2 text-xs font-semibold mb-5 text-slate-400 transition-all duration-700 delay-75 transform"
            :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          >
            <NuxtLink
              to="/"
              class="hover:text-knpi-300 transition-colors"
            >
              Beranda
            </NuxtLink>
            <LucideChevronRight
              :size="13"
              class="opacity-50"
            />
            <span class="text-slate-200">Arsip Warta &amp; Berita</span>
          </nav>

          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div class="max-w-3xl space-y-3">
              <div
                class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-knpi-600/20 border border-knpi-500/30 text-xs font-bold text-knpi-300 backdrop-blur-md transition-all duration-700 delay-150 transform"
                :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'"
              >
                <LucideSparkles
                  :size="14"
                  class="text-amber-400 animate-pulse"
                />
                <span>Publikasi &amp; Warta Resmi</span>
              </div>
              <h1
                class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight transition-all duration-700 delay-300 transform"
                :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
              >
                Seluruh Berita &amp; Artikel Pemuda
              </h1>
              <p
                class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl transition-all duration-700 delay-450 transform"
                :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
              >
                Jelajahi seluruh arsip informasi warta, agenda kegiatan, pengumuman, serta artikel kepemudaan resmi DPD KNPI Kota Langsa.
              </p>
            </div>

            <!-- Stats Badge Quick Summary -->
            <div
              class="flex items-center gap-3 shrink-0 transition-all duration-700 delay-500 transform"
              :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95'"
            >
              <div class="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl flex items-center gap-3 shadow-lg shadow-black/20 hover:border-knpi-500/40 transition-all">
                <div class="h-10 w-10 rounded-xl bg-knpi-600/20 border border-knpi-500/30 flex items-center justify-center text-knpi-300">
                  <LucideNewspaper :size="20" />
                </div>
                <div>
                  <span class="block text-xs text-slate-400 font-medium">Total Terbit</span>
                  <span class="block text-lg font-extrabold text-white leading-tight">
                    {{ daftarBeritaSemua.length }} Artikel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Filter, Search & Toolbar Bar with Slide In -->
      <section
        class="sticky top-16 sm:top-20 z-30 border-b border-white/[0.08] bg-[#090d16]/90 backdrop-blur-xl py-4 transition-all duration-700 delay-500 transform"
        :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <!-- Search Input -->
            <div class="relative flex-1 max-w-lg">
              <LucideSearch
                :size="16"
                class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                v-model="kataKunciPencarian"
                type="text"
                placeholder="Cari berdasarkan judul warta atau ringkasan..."
                class="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-knpi-500/80 focus:bg-white/[0.07] focus:ring-2 focus:ring-knpi-500/20 transition-all shadow-inner"
              >
              <button
                v-if="kataKunciPencarian"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                title="Hapus pencarian"
                @click="kataKunciPencarian = ''"
              >
                <LucideX :size="15" />
              </button>
            </div>

            <!-- Controls: Category Filter, Sort & View Mode -->
            <div class="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <!-- Category Tabs -->
              <div class="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 overflow-x-auto max-w-full">
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                  :class="kategoriDipilih === 'semua'
                    ? 'bg-knpi-600 text-white shadow-sm shadow-knpi-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'"
                  @click="kategoriDipilih = 'semua'"
                >
                  Semua
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                  :class="kategoriDipilih === 'kegiatan'
                    ? 'bg-knpi-600 text-white shadow-sm shadow-knpi-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'"
                  @click="kategoriDipilih = 'kegiatan'"
                >
                  Kegiatan
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                  :class="kategoriDipilih === 'pengumuman'
                    ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'"
                  @click="kategoriDipilih = 'pengumuman'"
                >
                  Pengumuman
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                  :class="kategoriDipilih === 'artikel'
                    ? 'bg-violet-600 text-white shadow-sm shadow-violet-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'"
                  @click="kategoriDipilih = 'artikel'"
                >
                  Artikel
                </button>
              </div>

              <!-- Sort Order Toggle -->
              <button
                type="button"
                class="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
                :title="urutanTerbaru ? 'Mengurutkan: Terbaru ke Terlama' : 'Mengurutkan: Terlama ke Terbaru'"
                @click="urutanTerbaru = !urutanTerbaru"
              >
                <span>{{ urutanTerbaru ? 'Terbaru' : 'Terlama' }}</span>
                <LucideArrowUpDown :size="13" />
              </button>

              <!-- View Layout Mode Toggle (Grid vs List) -->
              <div class="hidden sm:flex items-center p-1 rounded-xl bg-white/[0.03] border border-white/10">
                <button
                  type="button"
                  class="p-1.5 rounded-lg transition cursor-pointer"
                  :class="modeTampilan === 'grid' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'"
                  title="Tampilan Grid"
                  @click="modeTampilan = 'grid'"
                >
                  <LucideLayoutGrid :size="16" />
                </button>
                <button
                  type="button"
                  class="p-1.5 rounded-lg transition cursor-pointer"
                  :class="modeTampilan === 'list' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'"
                  title="Tampilan Daftar / List"
                  @click="modeTampilan = 'list'"
                >
                  <LucideList :size="16" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Articles Container -->
      <section class="py-10 sm:py-14">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <!-- Loading State (Skeleton Cards) -->
          <div
            v-if="sedangMemuat"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="n in 6"
              :key="'skel-' + n"
              class="glass-card p-5 rounded-2xl flex flex-col gap-4 animate-pulse"
            >
              <div class="aspect-[16/10] w-full rounded-xl bg-slate-800/80" />
              <div class="h-4 bg-slate-800/80 rounded w-1/3" />
              <div class="h-6 bg-slate-800/80 rounded w-5/6" />
              <div class="h-4 bg-slate-800/80 rounded w-full" />
              <div class="h-4 bg-slate-800/80 rounded w-2/3" />
            </div>
          </div>

          <!-- Error State -->
          <div
            v-else-if="adaError"
            class="p-12 text-center rounded-3xl border border-red-500/20 bg-red-500/5 max-w-md mx-auto my-12"
          >
            <div class="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mx-auto mb-4">
              <LucideAlertCircle :size="28" />
            </div>
            <h3 class="text-base font-bold text-white mb-2">
              Gagal Memuat Berita
            </h3>
            <p class="text-xs text-slate-400 mb-6">
              Terjadi kesalahan saat memuat data publikasi warta. Silakan coba kembali.
            </p>
            <button
              type="button"
              class="btn-primary !w-auto !py-2.5 !px-6 !text-xs mx-auto"
              @click="muatSemuaBerita"
            >
              <LucideRotateCcw :size="14" />
              <span>Muat Ulang</span>
            </button>
          </div>

          <!-- Empty State (No Articles matching filter/search) -->
          <div
            v-else-if="beritaTerfilter.length === 0"
            class="p-12 sm:p-16 text-center rounded-3xl border border-white/10 glass-card max-w-xl mx-auto my-8"
          >
            <div class="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <LucideSearchX :size="32" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">
              Tidak Ada Berita Ditemukan
            </h3>
            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 max-w-md mx-auto">
              Tidak ada artikel yang sesuai dengan kata kunci
              <span
                v-if="kataKunciPencarian"
                class="text-knpi-300 font-semibold"
              >"{{ kataKunciPencarian }}"</span>
              <span v-if="kategoriDipilih !== 'semua'"> pada kategori "{{ kategoriDipilih }}"</span>.
            </p>
            <button
              type="button"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-white hover:bg-white/15 transition cursor-pointer"
              @click="resetFilter"
            >
              <LucideRotateCcw :size="14" />
              <span>Reset Pencarian &amp; Filter</span>
            </button>
          </div>

          <!-- News Articles List / Grid Content -->
          <div v-else>
            <!-- Meta Result Count Summary -->
            <div class="flex items-center justify-between text-xs text-slate-400 font-medium mb-6 px-1">
              <span>
                Menampilkan <strong class="text-white">{{ indexAwalItem + 1 }} - {{ indexAkhirItem }}</strong> dari <strong class="text-white">{{ beritaTerfilter.length }}</strong> warta
              </span>
              <span v-if="kataKunciPencarian || kategoriDipilih !== 'semua'">
                Hasil filter aktif
              </span>
            </div>

            <!-- GRID VIEW -->
            <div
              v-if="modeTampilan === 'grid'"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <NuxtLink
                v-for="(item, idx) in beritaHalamanIni"
                :key="'grid-' + item.id + '-' + halamanAktif + '-' + kategoriDipilih"
                :to="`/berita/${item.id}`"
                class="group flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-2 glass-card-hover hover:border-knpi-500/50 hover:shadow-[0_20px_40px_-15px_rgba(48,112,240,0.28)] animate-card-cascade"
                :style="{ animationDelay: `${Math.min(idx * 70, 560)}ms` }"
              >
                <div>
                  <!-- Thumbnail Image -->
                  <div class="aspect-[16/10] overflow-hidden relative bg-slate-950 border-b border-white/10">
                    <img
                      v-if="item.gambarUrl"
                      :src="item.gambarUrl"
                      :alt="item.judul"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onerror="this.src='/favicon.ico'; this.classList.add('object-contain','p-8')"
                    >
                    <div
                      v-else
                      class="absolute inset-0 flex items-center justify-center text-slate-500"
                    >
                      <LucideImage :size="36" />
                    </div>

                    <!-- Ambient shimmer overlay on hover -->
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0c1322]/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />

                    <!-- Category Pill Tag -->
                    <div class="absolute top-3 left-3">
                      <span
                        class="badge text-[9px] uppercase font-bold tracking-wider"
                        :class="badgeKategori(item.kategori)"
                      >
                        {{ labelKategori(item.kategori) }}
                      </span>
                    </div>
                  </div>

                  <!-- Details Text -->
                  <div class="p-5 flex flex-col gap-2.5">
                    <div class="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                      <span class="flex items-center gap-1">
                        <LucideCalendar :size="12" class="text-knpi-400" />
                        {{ formatTanggal(item.createdAt) }}
                      </span>
                      <span
                        v-if="item.penulis"
                        class="flex items-center gap-1 truncate max-w-[140px]"
                      >
                        <LucideUser :size="12" class="text-slate-400" />
                        {{ item.penulis }}
                      </span>
                    </div>

                    <h2 class="text-base font-bold text-white group-hover:text-knpi-300 transition-colors line-clamp-2 leading-snug">
                      {{ item.judul }}
                    </h2>

                    <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {{ item.ringkasan }}
                    </p>
                  </div>
                </div>

                <!-- Card Footer Link -->
                <div class="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-knpi-400 group-hover:text-knpi-300">
                  <span>Baca Selengkapnya</span>
                  <LucideChevronRight
                    :size="16"
                    class="group-hover:translate-x-1.5 transition-transform duration-300"
                  />
                </div>
              </NuxtLink>
            </div>

            <!-- LIST VIEW -->
            <div
              v-else
              class="flex flex-col gap-4"
            >
              <NuxtLink
                v-for="(item, idx) in beritaHalamanIni"
                :key="'list-' + item.id + '-' + halamanAktif + '-' + kategoriDipilih"
                :to="`/berita/${item.id}`"
                class="group flex flex-col sm:flex-row items-stretch overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 glass-card-hover hover:border-knpi-500/50 hover:shadow-[0_20px_40px_-15px_rgba(48,112,240,0.28)] animate-card-cascade"
                :style="{ animationDelay: `${Math.min(idx * 70, 560)}ms` }"
              >
                <!-- Thumbnail -->
                <div class="sm:w-64 md:w-72 lg:w-80 aspect-[16/10] sm:aspect-auto shrink-0 overflow-hidden relative bg-slate-950 border-b sm:border-b-0 sm:border-r border-white/10">
                  <img
                    v-if="item.gambarUrl"
                    :src="item.gambarUrl"
                    :alt="item.judul"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onerror="this.src='/favicon.ico'; this.classList.add('object-contain','p-8')"
                  >
                  <div
                    v-else
                    class="absolute inset-0 flex items-center justify-center text-slate-500"
                  >
                    <LucideImage :size="36" />
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-t from-[#0c1322]/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                  <div class="absolute top-3 left-3">
                    <span
                      class="badge text-[9px] uppercase font-bold tracking-wider"
                      :class="badgeKategori(item.kategori)"
                    >
                      {{ labelKategori(item.kategori) }}
                    </span>
                  </div>
                </div>

                <!-- Text Content -->
                <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <div class="flex items-center gap-3 text-[11px] text-slate-400 font-medium mb-2">
                      <span class="flex items-center gap-1">
                        <LucideCalendar :size="12" class="text-knpi-400" />
                        {{ formatTanggal(item.createdAt) }}
                      </span>
                      <span
                        v-if="item.penulis"
                        class="flex items-center gap-1 truncate max-w-[160px]"
                      >
                        <LucideUser :size="12" class="text-slate-400" />
                        {{ item.penulis }}
                      </span>
                    </div>

                    <h2 class="text-lg sm:text-xl font-bold text-white group-hover:text-knpi-300 transition-colors line-clamp-2 leading-snug">
                      {{ item.judul }}
                    </h2>

                    <p class="text-xs sm:text-sm text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {{ item.ringkasan }}
                    </p>
                  </div>

                  <div class="flex items-center gap-1.5 text-xs font-semibold text-knpi-400 group-hover:text-knpi-300 pt-2">
                    <span>Baca Selengkapnya</span>
                    <LucideChevronRight
                      :size="15"
                      class="group-hover:translate-x-1.5 transition-transform duration-300"
                    />
                  </div>
                </div>
              </NuxtLink>
            </div>

            <!-- PAGINATION CONTROLS -->
            <div
              v-if="totalHalaman > 1"
              class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-white/10"
            >
              <div class="text-xs text-slate-400">
                Halaman <strong class="text-white">{{ halamanAktif }}</strong> dari <strong class="text-white">{{ totalHalaman }}</strong>
              </div>

              <div class="flex items-center gap-1.5">
                <!-- Tombol Sebelumnya -->
                <button
                  type="button"
                  class="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition border border-white/10"
                  :class="halamanAktif > 1
                    ? 'bg-white/5 text-slate-200 hover:bg-white/10 cursor-pointer'
                    : 'bg-transparent text-slate-600 border-white/5 cursor-not-allowed'"
                  :disabled="halamanAktif <= 1"
                  @click="keHalaman(halamanAktif - 1)"
                >
                  <LucideChevronLeft :size="14" />
                  <span>Sebelumnya</span>
                </button>

                <!-- Nomor Halaman -->
                <button
                  v-for="h in daftarNomorHalaman"
                  :key="'hal-' + h"
                  type="button"
                  class="h-8 w-8 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center border"
                  :class="h === halamanAktif
                    ? 'bg-knpi-600 text-white border-knpi-500 shadow-md shadow-knpi-500/20'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'"
                  @click="keHalaman(h)"
                >
                  {{ h }}
                </button>

                <!-- Tombol Berikutnya -->
                <button
                  type="button"
                  class="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition border border-white/10"
                  :class="halamanAktif < totalHalaman
                    ? 'bg-white/5 text-slate-200 hover:bg-white/10 cursor-pointer'
                    : 'bg-transparent text-slate-600 border-white/5 cursor-not-allowed'"
                  :disabled="halamanAktif >= totalHalaman"
                  @click="keHalaman(halamanAktif + 1)"
                >
                  <span>Berikutnya</span>
                  <LucideChevronRight :size="14" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Public Footer -->
    <footer class="pt-16 pb-8 border-t bg-[#070a14] text-slate-400 border-white/10 mt-auto">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <img
                src="~/assets/logo-knpi.png"
                alt="Logo KNPI Langsa"
                class="h-9 w-auto"
              >
              <span class="text-lg font-bold text-white">KNPI Kota Langsa</span>
            </div>
            <p class="text-xs leading-relaxed text-slate-400 max-w-sm">
              Wadah berhimpun organisasi kepemudaan DPD KNPI Kota Langsa, merajut kolaborasi demi kemajuan bangsa.
            </p>
          </div>

          <div>
            <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Navigasi Halaman
            </h4>
            <ul class="space-y-2 text-xs">
              <li>
                <NuxtLink
                  to="/"
                  class="hover:text-white transition"
                >
                  Beranda
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/#pengurus"
                  class="hover:text-white transition"
                >
                  Dewan Pengurus
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/#visi-misi"
                  class="hover:text-white transition"
                >
                  Visi &amp; Misi
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/berita"
                  class="text-knpi-400 font-bold hover:text-knpi-300 transition"
                >
                  Arsip Berita Terkini
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/login"
                  class="hover:text-white transition"
                >
                  Masuk Panel Admin
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Sekretariat Resmi
            </h4>
            <p class="text-xs leading-relaxed text-slate-400">
              Graha Pemuda KNPI<br>
              Jl. Jend. Ahmad Yani, Kota Langsa, Aceh
            </p>
          </div>
        </div>

        <div class="border-t border-white/5 pt-6 text-center text-[11px] text-slate-500">
          <p>&copy; {{ new Date().getFullYear() }} DPD KNPI Kota Langsa. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

definePageMeta({ layout: false })

useSeoMeta({
  title: 'Arsip Berita & Warta Publikasi — KNPI Kota Langsa',
  description: 'Seluruh arsip publikasi warta berita resmi, kegiatan, pengumuman, dan artikel kepemudaan DPD KNPI Kota Langsa.',
})

useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
})

// Data Structure
interface ItemBeritaPublik {
  id: number
  judul: string
  ringkasan: string
  kategori: string
  gambarUrl: string | null
  penulis?: string | null
  createdAt: string
}

// State
const halamanSelesaiMuat = ref(false)
const daftarBeritaSemua = ref<ItemBeritaPublik[]>([])
const sedangMemuat = ref(true)
const adaError = ref(false)

const kataKunciPencarian = ref('')
const kategoriDipilih = ref<'semua' | 'kegiatan' | 'pengumuman' | 'artikel'>('semua')
const urutanTerbaru = ref(true)
const modeTampilan = ref<'grid' | 'list'>('grid')

const halamanAktif = ref(1)
const itemPerHalaman = 9

// Scroll state for header styling
const isScrolledDown = ref(false)
const menuMobileTerbuka = ref(false)

function tanganiScroll() {
  isScrolledDown.value = window.scrollY > 40
}

// Formatters & Labels
function formatTanggal(tanggal: string) {
  try {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }
  catch {
    return tanggal
  }
}

function labelKategori(kat: string) {
  const map: Record<string, string> = {
    kegiatan: 'Kegiatan',
    pengumuman: 'Pengumuman',
    artikel: 'Artikel',
  }
  return map[kat] || kat
}

function badgeKategori(kat: string) {
  const map: Record<string, string> = {
    kegiatan: 'badge-admin bg-knpi-600/25 text-knpi-300 border-knpi-500/30',
    pengumuman: 'bg-amber-500/25 text-amber-300 border-amber-500/30',
    artikel: 'bg-violet-500/25 text-violet-300 border-violet-500/30',
  }
  return map[kat] || 'bg-slate-500/25 text-slate-300 border-slate-500/30'
}

// Fetch All Articles
async function muatSemuaBerita() {
  sedangMemuat.value = true
  adaError.value = false
  try {
    // Request all published articles without artificial limit
    const res = await $fetch<{ berhasil: boolean, data: ItemBeritaPublik[] }>('/api/publik/berita')
    if (res.berhasil) {
      daftarBeritaSemua.value = res.data
    }
    else {
      adaError.value = true
    }
  }
  catch (err) {
    console.error('Gagal memuat arsip berita:', err)
    adaError.value = true
  }
  finally {
    sedangMemuat.value = false
  }
}

// Filtered & Sorted Articles Computed
const beritaTerfilter = computed(() => {
  let list = [...daftarBeritaSemua.value]

  // Filter Kategori
  if (kategoriDipilih.value !== 'semua') {
    list = list.filter(b => b.kategori === kategoriDipilih.value)
  }

  // Filter Kata Kunci
  if (kataKunciPencarian.value.trim()) {
    const q = kataKunciPencarian.value.trim().toLowerCase()
    list = list.filter(b =>
      b.judul.toLowerCase().includes(q)
      || b.ringkasan.toLowerCase().includes(q)
      || (b.penulis && b.penulis.toLowerCase().includes(q)),
    )
  }

  // Sorting
  list.sort((a, b) => {
    const tA = new Date(a.createdAt).getTime()
    const tB = new Date(b.createdAt).getTime()
    return urutanTerbaru.value ? tB - tA : tA - tB
  })

  return list
})

// Pagination
const totalHalaman = computed(() => {
  return Math.ceil(beritaTerfilter.value.length / itemPerHalaman) || 1
})

const indexAwalItem = computed(() => {
  return (halamanAktif.value - 1) * itemPerHalaman
})

const indexAkhirItem = computed(() => {
  return Math.min(indexAwalItem.value + itemPerHalaman, beritaTerfilter.value.length)
})

const beritaHalamanIni = computed(() => {
  return beritaTerfilter.value.slice(indexAwalItem.value, indexAkhirItem.value)
})

const daftarNomorHalaman = computed(() => {
  const total = totalHalaman.value
  const arr: number[] = []
  for (let i = 1; i <= total; i++) {
    arr.push(i)
  }
  return arr
})

function keHalaman(nomor: number) {
  if (nomor >= 1 && nomor <= totalHalaman.value) {
    halamanAktif.value = nomor
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 300, behavior: 'smooth' })
    }
  }
}

function resetFilter() {
  kataKunciPencarian.value = ''
  kategoriDipilih.value = 'semua'
  halamanAktif.value = 1
}

// Reset page when filter/search changes
watch([kataKunciPencarian, kategoriDipilih], () => {
  halamanAktif.value = 1
})

onMounted(() => {
  muatSemuaBerita()
  setTimeout(() => {
    halamanSelesaiMuat.value = true
  }, 50)
  window.addEventListener('scroll', tanganiScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', tanganiScroll)
})
</script>
