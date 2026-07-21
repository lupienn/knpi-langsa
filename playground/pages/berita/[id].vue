<template>
  <div
    class="min-h-screen font-sans flex flex-col transition-colors duration-500 selection:bg-knpi-500/30 selection:text-knpi-200 relative"
    :class="isDarkMode ? 'bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-800'"
  >
    <!-- Reading Progress Indicator Bar -->
    <div
      class="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-knpi-500 via-emerald-400 to-amber-400 z-[60] transition-all duration-150"
      :style="{ width: persentaseBaca + '%' }"
    />

    <!-- Navbar Header -->
    <header
      class="sticky top-0 z-50 w-full border-b backdrop-blur-2xl transition-all duration-700 ease-out transform"
      :class="[
        isDarkMode ? 'border-white/[0.08] bg-[#0c1322]/85 text-white' : 'border-slate-200/80 bg-white/90 text-slate-900 shadow-sm',
        isScrolledDown && !isHeaderHovered ? 'h-14 py-2' : 'h-20 py-4',
        halamanSelesaiMuat ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0',
      ]"
      @mouseenter="isHeaderHovered = true"
      @mouseleave="isHeaderHovered = false"
    >
      <div class="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 max-w-6xl">
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
            <span
              class="block text-base font-extrabold tracking-tight transition-colors"
              :class="isDarkMode ? 'text-white group-hover:text-knpi-300' : 'text-slate-900 group-hover:text-knpi-600'"
            >
              KNPI Langsa
            </span>
            <span
              class="block text-[10px] font-medium"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >Kota Langsa</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation Links (Sembunyi saat scroll kebawah) -->
        <nav
          class="hidden md:flex items-center gap-7 text-sm font-semibold transition-all duration-300 transform"
          :class="[
            isScrolledDown && !isHeaderHovered ? 'opacity-0 -translate-y-2 pointer-events-none w-0 h-0 overflow-hidden' : 'opacity-100 translate-y-0',
            isDarkMode ? 'text-slate-400' : 'text-slate-600',
          ]"
        >
          <NuxtLink
            to="/#beranda"
            class="hover:text-knpi-400 transition-colors"
          >Beranda</NuxtLink>
          <NuxtLink
            to="/#pengurus"
            class="hover:text-knpi-400 transition-colors"
          >Pengurus</NuxtLink>
          <NuxtLink
            to="/#visi-misi"
            class="hover:text-knpi-400 transition-colors"
          >Visi &amp; Misi</NuxtLink>
          <NuxtLink
            to="/#program-kerja"
            class="hover:text-knpi-400 transition-colors"
          >Program</NuxtLink>
          <NuxtLink
            to="/#berita"
            class="text-knpi-400 font-bold"
          >Berita</NuxtLink>
          <NuxtLink
            to="/#pinjam-gedung"
            class="hover:text-knpi-400 transition-colors"
          >Pinjam Gedung</NuxtLink>
        </nav>

        <!-- Controls: Theme Toggle & Back Button -->
        <div class="flex items-center gap-3">
          <!-- Toggle Light / Dark Mode -->
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 cursor-pointer"
            :class="isDarkMode
              ? 'border-white/10 bg-white/5 text-amber-300 hover:bg-white/15'
              : 'border-slate-200 bg-slate-100 text-amber-600 hover:bg-slate-200 shadow-sm'"
            :title="isDarkMode ? 'Ubah ke Mode Terang' : 'Ubah ke Mode Gelap'"
            @click="isDarkMode = !isDarkMode"
          >
            <LucideSun
              v-if="isDarkMode"
              :size="18"
            />
            <LucideMoon
              v-else
              :size="18"
            />
          </button>

          <!-- Back Button -->
          <NuxtLink
            to="/#berita"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm"
            :class="isDarkMode ? 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'"
          >
            <LucideArrowLeft :size="15" />
            <span>Kembali</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col">
      <!-- Loading State -->
      <div
        v-if="memuat"
        class="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh]"
      >
        <div class="w-12 h-12 border-4 border-knpi-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p
          class="text-sm font-semibold"
          :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'"
        >
          Memuat artikel berita...
        </p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center min-h-[60vh]"
      >
        <div class="glass-card max-w-md p-8 sm:p-10 flex flex-col items-center gap-4 text-center rounded-3xl shadow-xl">
          <div class="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <LucideAlertCircle :size="32" />
          </div>
          <h2 class="text-xl font-bold text-white">
            Berita Tidak Ditemukan
          </h2>
          <p class="text-xs text-slate-400 leading-relaxed">
            Artikel yang Anda cari mungkin telah dihapus, dipindahkan, atau tautan URL tidak valid.
          </p>
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-knpi-500 text-white font-bold text-xs hover:bg-knpi-400 transition cursor-pointer shadow-lg mt-2"
          >
            <LucideHome :size="16" />
            <span>Kembali ke Beranda</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Article Reader Content -->
      <article
        v-else-if="berita"
        class="flex-1 flex flex-col"
      >
        <!-- 1. Breadcrumb & Headline Banner -->
        <div
          class="w-full border-b py-10 sm:py-12 relative overflow-hidden"
          :class="isDarkMode ? 'border-white/[0.08] bg-[#0c1322]/60' : 'border-slate-200/80 bg-white/80'"
        >
          <!-- Background Ambient Glow -->
          <div class="pointer-events-none absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-knpi-600/10 blur-3xl" />
          <div class="pointer-events-none absolute bottom-0 left-10 h-60 w-60 rounded-full bg-blue-600/5 blur-3xl" />

          <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
            <!-- Breadcrumb Navigation -->
            <nav
              class="flex items-center gap-2 text-xs font-semibold mb-6 flex-wrap"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
            >
              <NuxtLink
                to="/"
                class="hover:text-knpi-400 transition-colors"
              >Beranda</NuxtLink>
              <LucideChevronRight
                :size="13"
                class="opacity-50"
              />
              <NuxtLink
                to="/#berita"
                class="hover:text-knpi-400 transition-colors"
              >Berita</NuxtLink>
              <LucideChevronRight
                :size="13"
                class="opacity-50"
              />
              <span
                class="truncate max-w-[200px] sm:max-w-xs font-normal"
                :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
              >
                {{ berita.judul }}
              </span>
            </nav>

            <!-- Category Pill & Reading Time -->
            <div class="flex items-center gap-3 mb-4 flex-wrap">
              <div
                class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm"
                :class="kelasKategori(berita.kategori)"
              >
                <LucideTag :size="13" />
                <span>{{ labelKategori(berita.kategori) }}</span>
              </div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                <LucideClock
                  :size="13"
                  class="text-knpi-400"
                />
                <span>{{ estimasiWaktuBaca }} mnt baca</span>
              </span>
            </div>

            <!-- Main Headline -->
            <h1
              class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-snug sm:leading-tight mb-6"
              :class="isDarkMode ? 'text-white' : 'text-slate-900'"
            >
              {{ berita.judul }}
            </h1>

            <!-- Meta Info Bar with Author Avatar -->
            <div
              class="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium pt-4 border-t"
              :class="isDarkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'"
            >
              <div
                v-if="berita.penulis"
                class="flex items-center gap-2.5"
              >
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-knpi-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  {{ inisialPenulis }}
                </div>
                <span>Oleh <strong :class="isDarkMode ? 'text-slate-200' : 'text-slate-800'">{{ berita.penulis }}</strong></span>
              </div>
              <div class="flex items-center gap-2">
                <LucideCalendar
                  :size="16"
                  class="text-knpi-400"
                />
                <span>Publikasi: {{ formatTanggal(berita.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Wide Featured Cover Photo (Foto Utama Lebar Penuh) -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl pt-8 sm:pt-10">
          <div
            v-if="berita.gambarUrl"
            class="relative rounded-3xl overflow-hidden aspect-[16/9] w-full bg-slate-900 border shadow-2xl group"
            :class="isDarkMode ? 'border-white/10' : 'border-slate-200'"
          >
            <img
              :src="berita.gambarUrl"
              :alt="berita.judul"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
            <!-- Lightbox Zoom Trigger -->
            <button
              type="button"
              class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white backdrop-blur-[2px] transition-opacity cursor-pointer"
              title="Lihat Gambar Ukuran Penuh"
              @click="previewFoto = berita.gambarUrl!"
            >
              <span class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md text-xs font-bold shadow-lg">
                <LucideMaximize2 :size="16" />
                <span>Perbesar Foto Sampul</span>
              </span>
            </button>
          </div>

          <!-- Photo Caption Credit -->
          <div
            v-if="berita.gambarUrl"
            class="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mt-2.5 px-1"
          >
            <LucideCamera
              :size="13"
              class="text-knpi-400"
            />
            <span>Dokumentasi Resmi DPD KNPI Kota Langsa</span>
          </div>
        </div>

        <!-- 3. Article Content Body Area -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8 sm:py-10">
          <div class="flex flex-col gap-6">
            <!-- Excerpt Summary Lead Blockquote -->
            <div
              class="p-5 sm:p-6 rounded-2xl border-l-4 border-knpi-500 text-sm sm:text-base font-medium italic leading-relaxed shadow-sm relative overflow-hidden"
              :class="isDarkMode ? 'bg-knpi-500/10 text-slate-200 border-r border-t border-b border-knpi-500/20' : 'bg-knpi-50/80 text-slate-700 border-r border-t border-b border-knpi-200/80'"
            >
              "{{ berita.ringkasan }}"
            </div>

            <!-- Main Body Content Text (Render Rich Text HTML) -->
            <div
              class="text-sm sm:text-base leading-relaxed space-y-5 whitespace-pre-line font-normal prose prose-invert max-w-none text-slate-200"
              :class="isDarkMode ? 'text-slate-200' : 'text-slate-800'"
              v-html="berita.konten"
            />

            <!-- Social Sharing & Print Toolbar -->
            <div
              class="mt-8 p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
              :class="isDarkMode ? 'border-white/10 bg-[#0c1322]/80' : 'border-slate-200 bg-white'"
            >
              <div
                class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
              >
                <LucideShare2
                  :size="16"
                  class="text-knpi-400"
                />
                <span>Bagikan Artikel Ini</span>
              </div>

              <div class="flex items-center gap-2">
                <button
                  class="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition cursor-pointer"
                  title="Bagikan ke WhatsApp"
                  @click="bagikan('whatsapp')"
                >
                  <LucideMessageCircle :size="18" />
                </button>
                <button
                  class="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition cursor-pointer"
                  title="Bagikan ke Facebook"
                  @click="bagikan('facebook')"
                >
                  <LucideFacebook :size="18" />
                </button>
                <button
                  class="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/20 transition cursor-pointer"
                  title="Bagikan ke X / Twitter"
                  @click="bagikan('twitter')"
                >
                  <LucideTwitter :size="18" />
                </button>
                <button
                  class="p-2.5 rounded-xl bg-slate-500/10 text-slate-300 hover:bg-slate-500/20 border border-slate-500/20 transition cursor-pointer"
                  title="Salin Tautan"
                  @click="salinLink"
                >
                  <LucideCopy :size="18" />
                </button>
                <button
                  class="p-2.5 rounded-xl bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/20 transition cursor-pointer"
                  title="Cetak Artikel"
                  @click="cetakHalaman"
                >
                  <LucidePrinter :size="18" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Bottom Widgets (Berita Terkait Grid & Graha Pemuda CTA Banner) -->
        <div
          class="w-full border-t py-12 sm:py-16 mt-6"
          :class="isDarkMode ? 'border-white/[0.08] bg-[#0c1322]/40' : 'border-slate-200/80 bg-slate-100/60'"
        >
          <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl flex flex-col gap-10">
            <!-- Section Berita Terkait -->
            <div class="flex flex-col gap-6">
              <div
                class="flex items-center justify-between pb-3 border-b"
                :class="isDarkMode ? 'border-white/10' : 'border-slate-200'"
              >
                <h3
                  class="font-bold text-lg sm:text-xl flex items-center gap-2"
                  :class="isDarkMode ? 'text-white' : 'text-slate-900'"
                >
                  <LucideNewspaper
                    :size="20"
                    class="text-knpi-400"
                  />
                  <span>Berita Terkait Lainnya</span>
                </h3>
                <NuxtLink
                  to="/#berita"
                  class="text-xs font-bold text-knpi-400 hover:underline"
                >
                  Lihat Semua Berita →
                </NuxtLink>
              </div>

              <!-- Skeleton Loading -->
              <div
                v-if="sedangMemuatLainnya"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                <div
                  v-for="i in 3"
                  :key="'skel-' + i"
                  class="glass-card p-4 flex flex-col gap-3 animate-pulse"
                >
                  <div class="w-full aspect-[16/10] rounded-xl bg-slate-800/80" />
                  <div class="h-4 bg-slate-800/80 rounded w-3/4" />
                </div>
              </div>

              <!-- Related News 3-Column Cards Grid -->
              <div
                v-else
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                <NuxtLink
                  v-for="item in beritaLainnya"
                  :key="item.id"
                  :to="`/berita/${item.id}`"
                  class="glass-card group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-knpi-500/40"
                >
                  <div>
                    <!-- Thumbnail -->
                    <div class="relative w-full aspect-[16/10] overflow-hidden bg-slate-900 border-b border-white/10">
                      <img
                        v-if="item.gambarUrl"
                        :src="item.gambarUrl"
                        :alt="item.judul"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onerror="this.src='/favicon.ico'; this.classList.add('object-contain','p-6')"
                      >
                      <div
                        v-else
                        class="w-full h-full flex items-center justify-center text-slate-600"
                      >
                        <LucideImage :size="28" />
                      </div>
                      <div class="absolute top-2.5 left-2.5">
                        <span
                          class="inline-block rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border shadow-sm"
                          :class="kelasKategori(item.kategori)"
                        >
                          {{ labelKategori(item.kategori) }}
                        </span>
                      </div>
                    </div>

                    <!-- Details -->
                    <div class="p-4">
                      <h4
                        class="font-bold text-sm line-clamp-2 leading-snug group-hover:text-knpi-300 transition-colors"
                        :class="isDarkMode ? 'text-white' : 'text-slate-900'"
                      >
                        {{ item.judul }}
                      </h4>
                      <p class="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {{ item.ringkasan }}
                      </p>
                    </div>
                  </div>

                  <div class="px-4 pb-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>{{ formatTanggal(item.createdAt) }}</span>
                    <span class="text-knpi-400 group-hover:translate-x-1 transition-transform font-bold">Baca →</span>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- Banner Graha Pemuda CTA (Wide Bottom Banner) -->
            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900/60 to-knpi-950 p-6 sm:p-8 border border-emerald-500/20 shadow-2xl text-white">
              <div class="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
              <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-2 max-w-xl">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    <LucideBuilding2 :size="14" /> Layanan Graha Pemuda KNPI
                  </span>
                  <h4 class="text-xl sm:text-2xl font-extrabold leading-tight">
                    Butuh Lokasi Acara atau Kegiatan Organisasi?
                  </h4>
                  <p class="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                    Gedung Graha Pemuda DPD KNPI Kota Langsa siap digunakan untuk berbagai kegiatan kepemudaan, rapat, dan seminar organisasi.
                  </p>
                </div>
                <NuxtLink
                  to="/#pinjam-gedung"
                  class="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-emerald-400 transition shadow-lg cursor-pointer hover:scale-105"
                >
                  <span>Ajukan Pinjam Gedung</span>
                  <LucideArrowRight :size="16" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>

    <!-- Public Footer -->
    <footer
      class="border-t py-12 transition-colors"
      :class="isDarkMode ? 'border-white/[0.08] bg-[#070a14] text-slate-400' : 'border-slate-200 bg-slate-900 text-slate-400'"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <!-- Brand Info -->
          <div class="flex items-center gap-3">
            <img
              src="~/assets/logo-knpi.png"
              alt="Logo KNPI"
              class="h-9 w-auto object-contain"
            >
            <div>
              <span class="block text-sm font-bold text-white">DPD KNPI Kota Langsa</span>
              <span class="block text-xs text-slate-400">Komite Nasional Pemuda Indonesia</span>
            </div>
          </div>

          <!-- Links -->
          <div class="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-300">
            <NuxtLink
              to="/#beranda"
              class="hover:text-knpi-300 transition-colors"
            >Beranda</NuxtLink>
            <NuxtLink
              to="/#visi-misi"
              class="hover:text-knpi-300 transition-colors"
            >Visi &amp; Misi</NuxtLink>
            <NuxtLink
              to="/#berita"
              class="hover:text-knpi-300 transition-colors"
            >Berita</NuxtLink>
            <NuxtLink
              to="/#pinjam-gedung"
              class="hover:text-knpi-300 transition-colors"
            >Pinjam Gedung</NuxtLink>
            <NuxtLink
              to="/login"
              class="hover:text-knpi-300 transition-colors"
            >Masuk Panel</NuxtLink>
          </div>

          <!-- Copyright -->
          <div class="text-xs text-slate-400">
            &copy; {{ new Date().getFullYear() }} DPD KNPI Kota Langsa.
          </div>
        </div>
      </div>
    </footer>

    <!-- ====== LIGHTBOX PREVIEW FOTO ====== -->
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
          <img
            :src="previewFoto"
            alt="Preview Sampul Berita"
            class="w-full max-h-[80vh] object-contain bg-black/50"
          >
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
        class="fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl border-emerald-500/30 bg-emerald-950/90 text-emerald-300 text-xs font-semibold"
      >
        <LucideCheckCircle :size="18" />
        <span>{{ toast.pesan }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

interface BeritaDetail {
  id: number
  judul: string
  ringkasan: string
  konten: string
  gambarUrl?: string | null
  kategori: string
  penulis?: string | null
  createdAt: string
}

const route = useRoute()
const isDarkMode = ref(true)
const memuat = ref(true)
const error = ref(false)
const berita = ref<BeritaDetail | null>(null)
const previewFoto = ref('')
const persentaseBaca = ref(0)

// Header navbar scroll state (seperti di beranda index.vue)
const isScrolledDown = ref(false)
const isHeaderHovered = ref(false)
const halamanSelesaiMuat = ref(false)

function handleScroll() {
  isScrolledDown.value = window.scrollY > 80
}

// Related news list
const beritaLainnya = ref<BeritaDetail[]>([])
const sedangMemuatLainnya = ref(true)

// Toast
const toast = reactive({ tampil: false, pesan: '' })
function tampilkanToast(pesan: string) {
  toast.pesan = pesan
  toast.tampil = true
  setTimeout(() => {
    toast.tampil = false
  }, 3000)
}

// Helpers
function formatTanggal(tgl: string) {
  try {
    return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
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

const inisialPenulis = computed(() => {
  const nama = berita.value?.penulis || 'KNPI'
  return nama.slice(0, 1).toUpperCase()
})

const estimasiWaktuBaca = computed(() => {
  if (!berita.value?.konten) return 1
  const kata = berita.value.konten.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(kata / 200))
})

// Scroll progress listener
function updateReadingProgress() {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight
  if (totalHeight > 0) {
    persentaseBaca.value = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100))
  }
}

// Fetch article data
async function muatDetailBerita() {
  const id = route.params.id
  if (!id) {
    error.value = true
    memuat.value = false
    return
  }

  memuat.value = true
  error.value = false
  try {
    const res = await $fetch<{ berhasil: boolean, data: BeritaDetail }>(`/api/publik/berita/${id}`)
    if (res.berhasil) {
      berita.value = res.data
      useSeoMeta({
        title: `${res.data.judul} — KNPI Langsa`,
        description: res.data.ringkasan,
        ogImage: res.data.gambarUrl || undefined,
      })
    }
    else {
      error.value = true
    }
  }
  catch {
    error.value = true
  }
  finally {
    memuat.value = false
  }
}

// Fetch related articles
async function muatBeritaLainnya() {
  sedangMemuatLainnya.value = true
  try {
    const res = await $fetch<{ data: BeritaDetail[] }>('/api/publik/berita')
    const idSekarang = Number(route.params.id)
    beritaLainnya.value = res.data.filter(b => b.id !== idSekarang).slice(0, 3)
  }
  catch {
    beritaLainnya.value = []
  }
  finally {
    sedangMemuatLainnya.value = false
  }
}

// Social Sharing
function bagikan(platform: 'whatsapp' | 'facebook' | 'twitter') {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(berita.value?.judul || 'Berita KNPI Langsa')

  if (platform === 'whatsapp') {
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank')
  }
  else if (platform === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }
  else if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
  }
}

function salinLink() {
  navigator.clipboard.writeText(window.location.href)
  tampilkanToast('Tautan artikel telah disalin ke clipboard!')
}

function cetakHalaman() {
  window.print()
}

onMounted(() => {
  muatDetailBerita()
  muatBeritaLainnya()
  window.addEventListener('scroll', updateReadingProgress)
  window.addEventListener('scroll', handleScroll)
  halamanSelesaiMuat.value = true
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateReadingProgress)
  window.removeEventListener('scroll', handleScroll)
})

// Watch route parameter change if user clicks related article
watch(() => route.params.id, () => {
  muatDetailBerita()
  muatBeritaLainnya()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
