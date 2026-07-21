<template>
  <div
    class="min-h-screen font-sans transition-colors duration-500 selection:bg-knpi-500/30 selection:text-knpi-200"
    :class="isDarkMode ? 'bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-800'"
  >
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
      <div class="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <!-- Logo Brand (Selalu Tampak) -->
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

        <!-- Desktop Navigation Menu (Sembunyi saat scroll kebawah) -->
        <nav
          class="hidden md:flex items-center gap-8 text-sm font-semibold transition-all duration-300 transform"
          :class="[
            isScrolledDown && !isHeaderHovered ? 'opacity-0 -translate-y-2 pointer-events-none w-0 h-0 overflow-hidden' : 'opacity-100 translate-y-0',
            isDarkMode ? 'text-slate-400' : 'text-slate-600',
          ]"
        >
          <a
            href="#beranda"
            :class="isDarkMode ? 'text-knpi-300 hover:text-white' : 'text-knpi-600 hover:text-knpi-800'"
            class="transition-colors"
          >Beranda</a>
          <a
            href="#pengurus"
            :class="isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'"
            class="transition-colors"
          >Pengurus</a>
          <a
            href="#visi-misi"
            :class="isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'"
            class="transition-colors"
          >Visi & Misi</a>
          <a
            href="#program-kerja"
            :class="isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'"
            class="transition-colors"
          >Program</a>
          <a
            href="#berita"
            :class="isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'"
            class="transition-colors"
          >Berita</a>
        </nav>

        <!-- Right Controls: Theme Toggle & Login Button -->
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

          <!-- Login Button (Sembunyi saat scroll kebawah jika tidak di-hover) -->
          <NuxtLink
            to="/login"
            class="btn-primary !w-auto !py-2.5 !px-5 !text-xs transition-all duration-300 transform"
            :class="isScrolledDown && !isHeaderHovered ? 'opacity-0 scale-90 pointer-events-none hidden md:hidden' : 'opacity-100 scale-100 flex'"
          >
            <LucideLogIn :size="15" />
            <span>Masuk Panel</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <main>
      <!-- Hero Section Slider -->
      <section
        id="beranda"
        class="relative w-full h-[85vh] min-h-[600px] overflow-hidden"
        :class="isDarkMode ? 'bg-[#070a14]' : 'bg-slate-900 text-white'"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
        >
          <!-- Background Image + Dark Mask -->
          <div class="absolute inset-0 overflow-hidden">
            <img
              :src="slide.gambarUrl"
              :alt="slide.judul"
              class="w-full h-full object-cover transition-all duration-1000 ease-out transform"
              :class="[
                currentSlide === index ? 'opacity-60' : 'opacity-0',
                halamanSelesaiMuat ? 'scale-100' : 'scale-105',
              ]"
              onerror="this.src='/favicon.ico'; this.classList.add('object-contain', 'p-20')"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/40 to-transparent" />
            <div class="absolute inset-0 bg-gradient-to-r from-[#090d16]/90 via-[#090d16]/40 to-transparent" />
          </div>

          <!-- Content inside Hero -->
          <div class="absolute inset-0 flex items-center">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
              <div
                class="max-w-2xl transform transition-all duration-1000"
                :class="currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
              >
                <!-- Badge Pill -->
                <div
                  class="inline-flex items-center gap-2 rounded-full bg-knpi-600/20 border border-knpi-500/30 px-3.5 py-1.5 text-xs font-bold text-knpi-300 mb-6 backdrop-blur-md transition-all duration-700 delay-150 transform"
                  :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'"
                >
                  <span class="h-2 w-2 rounded-full bg-knpi-400 animate-pulse" />
                  <span class="tracking-wide">DPD KNPI Kota Langsa</span>
                </div>

                <h1
                  class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4 transition-all duration-700 delay-300 transform"
                  :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
                >
                  {{ slide.judul }}
                  <span class="block text-knpi-300 mt-2">
                    {{ slide.subjudul }}
                  </span>
                </h1>

                <p
                  class="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl transition-all duration-700 delay-500 transform"
                  :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
                >
                  {{ slide.deskripsi }}
                </p>

                <div
                  class="mt-8 flex flex-wrap gap-4 items-center transition-all duration-700 delay-700 transform"
                  :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
                >
                  <a
                    href="#berita"
                    class="btn-primary !w-auto !py-3.5 !px-7 !text-xs"
                  >
                    <span>Jelajahi Berita</span>
                    <LucideArrowRight :size="16" />
                  </a>
                  <a
                    href="#pinjam-gedung"
                    class="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-xs font-bold text-white backdrop-blur-md hover:bg-white/20 transition cursor-pointer"
                  >
                    <LucideBuilding2 :size="16" />
                    <span>Pinjam Gedung</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slider Navigation Controls -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          <button
            v-for="(_, index) in slides"
            :key="'dot-'+index"
            class="h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer"
            :class="currentSlide === index ? 'w-10 bg-knpi-400' : 'w-2 bg-white/30 hover:bg-white/60'"
            @click="currentSlide = index"
          />
        </div>

        <button
          class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900/60 text-white backdrop-blur-md border border-white/10 hover:bg-slate-800 transition cursor-pointer"
          @click="prevSlide"
        >
          <LucideChevronLeft :size="20" />
        </button>
        <button
          class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900/60 text-white backdrop-blur-md border border-white/10 hover:bg-slate-800 transition cursor-pointer"
          @click="nextSlide"
        >
          <LucideChevronRight :size="20" />
        </button>
      </section>

      <!-- Dewan Pengurus Section -->
      <section
        id="pengurus"
        class="py-24 relative overflow-hidden transition-colors duration-500"
        :class="isDarkMode ? 'bg-[#0c1322]' : 'bg-slate-100/70'"
      >
        <div
          v-if="isDarkMode"
          class="pointer-events-none absolute top-0 right-1/3 h-96 w-96 rounded-full bg-knpi-600/10 blur-[130px]"
        />

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center max-w-2xl mx-auto mb-14 reveal">
            <span class="text-xs font-extrabold uppercase tracking-widest text-knpi-500">Struktur Organisasi</span>
            <h2
              class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight"
              :class="isDarkMode ? 'text-white' : 'text-slate-900'"
            >
              Dewan Pengurus DPD KNPI
            </h2>
            <p
              class="mt-3 text-sm leading-relaxed"
              :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'"
            >
              Jajaran kepengurusan Komite Nasional Pemuda Indonesia DPD Kota Langsa.
            </p>
          </div>

          <div class="max-w-5xl mx-auto reveal reveal-delay-200">
            <div
              class="p-4 sm:p-6 md:p-8 rounded-2xl transition-all"
              :class="isDarkMode ? 'glass-card' : 'bg-white border border-slate-200/80 shadow-xl'"
            >
              <div
                class="relative rounded-xl overflow-hidden aspect-video flex items-center justify-center border"
                :class="isDarkMode ? 'bg-slate-950/60 border-white/5' : 'bg-slate-50 border-slate-200/60'"
              >
                <img
                  src="~/assets/ketua,sekret,bendahara knpi langsa.png"
                  alt="Ketua, Sekretaris, dan Bendahara KNPI Kota Langsa"
                  class="w-full h-full object-contain p-2"
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Visi & Misi Section -->
      <section
        id="visi-misi"
        class="py-24 relative overflow-hidden transition-colors duration-500"
        :class="isDarkMode ? 'bg-[#090d16]' : 'bg-white'"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center max-w-2xl mx-auto mb-14 reveal">
            <span class="text-xs font-extrabold uppercase tracking-widest text-knpi-500">Arah Gerak Organisasi</span>
            <h2
              class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight"
              :class="isDarkMode ? 'text-white' : 'text-slate-900'"
            >
              Visi & Misi Pemuda
            </h2>
          </div>

          <!-- Visi Display Card -->
          <div class="max-w-3xl mx-auto mb-12 reveal reveal-delay-100">
            <div
              class="p-8 sm:p-10 text-center rounded-2xl border transition-all"
              :class="isDarkMode
                ? 'glass-card border-knpi-500/20 bg-gradient-to-br from-knpi-950/40 via-slate-900/80 to-slate-900/60'
                : 'bg-gradient-to-br from-knpi-50 via-white to-slate-50 border-slate-200 shadow-xl'"
            >
              <div
                class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl mb-4 border"
                :class="isDarkMode ? 'bg-knpi-600/20 text-knpi-300 border-knpi-500/30' : 'bg-knpi-100 text-knpi-600 border-knpi-200'"
              >
                <LucideTarget :size="28" />
              </div>
              <span class="text-xs font-bold uppercase tracking-widest text-knpi-500">Visi Utama</span>
              <h3
                class="mt-2 text-3xl sm:text-5xl font-black tracking-tight"
                :class="isDarkMode ? 'text-white' : 'text-knpi-900'"
              >
                "PEMUDA HEBAT"
              </h3>
            </div>
          </div>

          <!-- Misi 2x2 Grid -->
          <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              v-for="(misi, i) in [
                { title: 'Konsolidasi Penguatan Kelembagaan dan Kaderisasi OKP.', num: '01', icon: 'building', color: 'knpi' },
                { title: 'Mendorong Kemandirian Pemuda berbasis Entrepreneur, Ekonomi Kreatif, dan Literasi.', num: '02', icon: 'trending', color: 'amber' },
                { title: 'Relasi Sinergis Pemuda dan Pemerintah sebagai Mitra Strategis Pembangunan Daerah.', num: '03', icon: 'handshake', color: 'knpi' },
                { title: 'Revitalisasi Semangat Pemuda dalam Pembentukan Integritas & Karakter Islamiah.', num: '04', icon: 'shield', color: 'amber' },
              ]"
              :key="misi.num"
              class="p-6 flex items-start gap-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 reveal"
              :class="[
                `reveal-delay-${(i + 1) * 100}`,
                isDarkMode ? 'glass-card-hover' : 'bg-white border-slate-200/90 shadow-md hover:shadow-xl',
              ]"
            >
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                :class="misi.color === 'knpi'
                  ? (isDarkMode ? 'bg-knpi-600/20 text-knpi-300 border-knpi-500/30' : 'bg-knpi-100 text-knpi-600 border-knpi-200')
                  : (isDarkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-600 border-amber-200')"
              >
                <LucideBuilding2
                  v-if="misi.icon === 'building'"
                  :size="22"
                />
                <LucideTrendingUp
                  v-else-if="misi.icon === 'trending'"
                  :size="22"
                />
                <LucideHandshake
                  v-else-if="misi.icon === 'handshake'"
                  :size="22"
                />
                <LucideShieldCheck
                  v-else-if="misi.icon === 'shield'"
                  :size="22"
                />
              </div>
              <div>
                <span
                  class="text-[11px] font-bold uppercase tracking-wider"
                  :class="misi.color === 'knpi' ? 'text-knpi-500' : 'text-amber-500'"
                >Misi {{ misi.num }}</span>
                <h4
                  class="mt-1 text-sm font-semibold leading-relaxed"
                  :class="isDarkMode ? 'text-slate-200' : 'text-slate-800'"
                >
                  {{ misi.title }}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Program Kerja Section -->
      <section
        id="program-kerja"
        class="py-24 transition-colors duration-500"
        :class="isDarkMode ? 'bg-[#0c1322]' : 'bg-slate-100/70'"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-14 reveal">
            <span class="text-xs font-extrabold uppercase tracking-widest text-knpi-500">Pilar Pergerakan</span>
            <h2
              class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight"
              :class="isDarkMode ? 'text-white' : 'text-slate-900'"
            >
              Program Kerja Unggulan
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            <div
              v-for="(prog, index) in programKerja"
              :key="index"
              class="p-6 flex flex-col justify-between rounded-2xl border transition-all duration-300 hover:-translate-y-1 reveal"
              :class="[
                `reveal-delay-${(index + 1) * 100}`,
                isDarkMode ? 'glass-card-hover' : 'bg-white border-slate-200/90 shadow-md hover:shadow-xl',
              ]"
            >
              <div>
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-xl border mb-5"
                  :class="isDarkMode ? 'bg-knpi-600/20 text-knpi-300 border-knpi-500/30' : 'bg-knpi-100 text-knpi-600 border-knpi-200'"
                >
                  <LucideGraduationCap
                    v-if="prog.icon === 'graduation'"
                    :size="24"
                  />
                  <LucideBriefcase
                    v-else-if="prog.icon === 'briefcase'"
                    :size="24"
                  />
                  <LucideHeartHandshake
                    v-else-if="prog.icon === 'heart'"
                    :size="24"
                  />
                  <LucideLightbulb
                    v-else-if="prog.icon === 'lightbulb'"
                    :size="24"
                  />
                </div>
                <h4
                  class="text-base font-bold mb-2"
                  :class="isDarkMode ? 'text-white' : 'text-slate-900'"
                >
                  {{ prog.title }}
                </h4>
                <p
                  class="text-xs leading-relaxed"
                  :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'"
                >
                  {{ prog.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Berita Terkini Section -->
      <section
        id="berita"
        class="py-24 transition-colors duration-500"
        :class="isDarkMode ? 'bg-[#090d16]' : 'bg-white'"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-end justify-between mb-10 max-w-6xl mx-auto reveal">
            <div>
              <span class="text-xs font-extrabold uppercase tracking-widest text-knpi-500">Publikasi Warta</span>
              <h2
                class="mt-1 text-3xl font-extrabold tracking-tight"
                :class="isDarkMode ? 'text-white' : 'text-slate-900'"
              >
                Berita Terkini
              </h2>
            </div>
          </div>

          <div class="max-w-6xl mx-auto">
            <!-- Loading -->
            <div
              v-if="memuatBerita"
              class="flex items-center justify-center py-16 text-xs text-slate-400 gap-2"
            >
              <LucideLoader
                :size="18"
                class="animate-spin text-knpi-400"
              />
              <span>Memuat data berita...</span>
            </div>

            <!-- Empty -->
            <div
              v-else-if="daftarBerita.length === 0"
              class="p-12 text-center rounded-2xl border"
              :class="isDarkMode ? 'glass-card' : 'bg-slate-50 border-slate-200'"
            >
              <LucideNewspaper
                :size="40"
                class="mx-auto text-slate-500 mb-3"
              />
              <p
                class="text-sm font-semibold"
                :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
              >
                Belum ada berita yang diterbitkan.
              </p>
            </div>

            <!-- News Cards Grid -->
            <div
              v-else
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <NuxtLink
                v-for="(item, idx) in daftarBerita"
                :key="item.id"
                :to="`/berita/${item.id}`"
                class="group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 reveal"
                :class="[
                  `reveal-delay-${((idx % 3) + 1) * 100}`,
                  isDarkMode ? 'glass-card-hover' : 'bg-white border-slate-200/90 shadow-md hover:shadow-xl',
                ]"
              >
                <div
                  class="aspect-[16/10] overflow-hidden relative"
                  :class="isDarkMode ? 'bg-slate-950' : 'bg-slate-100'"
                >
                  <img
                    v-if="item.gambarUrl"
                    :src="item.gambarUrl"
                    :alt="item.judul"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  >
                  <div
                    v-else
                    class="absolute inset-0 flex items-center justify-center text-slate-400"
                  >
                    <LucideImage :size="36" />
                  </div>
                  <div class="absolute top-3 left-3">
                    <span class="badge badge-admin uppercase text-[9px]">
                      {{ item.kategori }}
                    </span>
                  </div>
                </div>

                <div class="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <span
                      class="text-[11px] flex items-center gap-1 mb-2"
                      :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
                    >
                      <LucideCalendar :size="13" />
                      {{ formatTanggal(item.createdAt) }}
                    </span>
                    <h3
                      class="text-base font-bold transition-colors line-clamp-2"
                      :class="isDarkMode ? 'text-white group-hover:text-knpi-300' : 'text-slate-900 group-hover:text-knpi-600'"
                    >
                      {{ item.judul }}
                    </h3>
                    <p
                      class="mt-2 text-xs line-clamp-2"
                      :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'"
                    >
                      {{ item.ringkasan }}
                    </p>
                  </div>

                  <div
                    class="flex items-center gap-1 text-xs font-semibold group-hover:translate-x-1 transition-transform"
                    :class="isDarkMode ? 'text-knpi-400' : 'text-knpi-600'"
                  >
                    <span>Baca Selengkapnya</span>
                    <LucideChevronRight :size="15" />
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Pinjam Gedung Promo CTA -->
      <section
        id="pinjam-gedung"
        class="py-20 relative overflow-hidden bg-gradient-to-br from-knpi-900 via-knpi-800 to-blue-900 border-y border-white/10"
      >
        <div class="container mx-auto px-4 relative z-10 text-center">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-3xl font-extrabold text-white mb-3">
              Layanan Pinjam Pakai Graha Pemuda
            </h2>
            <p class="text-slate-200 text-xs sm:text-sm mb-6 leading-relaxed">
              Fasilitas gedung KNPI Kota Langsa siap digunakan untuk kegiatan kemasyarakatan dan kepemudaan.
            </p>
            <NuxtLink
              to="/dashboard/pinjam-gedung"
              class="inline-flex items-center gap-2 rounded-xl bg-white text-knpi-900 px-6 py-3 text-xs font-bold shadow-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <LucideBuilding2 :size="16" />
              <span>Pengajuan Pinjam Gedung</span>
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer
      class="pt-16 pb-8 border-t transition-colors duration-500"
      :class="isDarkMode ? 'bg-[#070a14] text-slate-400 border-white/10' : 'bg-slate-900 text-slate-300 border-slate-800'"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
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
              Wadah berhimpun organisasi kepemudaan DPD KNPI Kota Langsa.
            </p>
          </div>

          <div>
            <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Navigasi
            </h4>
            <ul class="space-y-2 text-xs">
              <li>
                <a
                  href="#beranda"
                  class="hover:text-white transition"
                >Beranda</a>
              </li>
              <li>
                <a
                  href="#visi-misi"
                  class="hover:text-white transition"
                >Visi & Misi</a>
              </li>
              <li>
                <a
                  href="#berita"
                  class="hover:text-white transition"
                >Berita Terkini</a>
              </li>
              <li>
                <NuxtLink
                  to="/login"
                  class="hover:text-white transition"
                >Login Admin</NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Sekretariat
            </h4>
            <p class="text-xs leading-relaxed text-slate-400">
              Graha Pemuda KNPI<br>
              Jl. Jend. Ahmad Yani, Kota Langsa, Aceh
            </p>
          </div>
        </div>

        <div class="border-t border-white/5 pt-6 text-center text-[11px] text-slate-500">
          <p>&copy; {{ new Date().getFullYear() }} DPD KNPI Kota Langsa.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'

definePageMeta({ layout: false })

// Theme & Scroll State
const isDarkMode = ref(true)
const isScrolledDown = ref(false)
const isHeaderHovered = ref(false)
const halamanSelesaiMuat = ref(false)

const handleScroll = () => {
  isScrolledDown.value = window.scrollY > 60
}

// ---- Slider: tipe & fallback ----
interface SlideItem {
  gambarUrl: string
  judul: string
  subjudul: string
  deskripsi: string
}

// Fallback jika DB kosong — beranda tidak pernah blank
const slidesFallback: SlideItem[] = [
  {
    gambarUrl: '/images/slider/1.jpeg',
    judul: 'Bakti Pada Negeri',
    subjudul: 'Sinergi & Kolaborasi Pemuda',
    deskripsi: 'Komite Nasional Pemuda Indonesia (KNPI) berupaya mewujudkan visi pemuda yang tangguh, berperan aktif dalam pembangunan, dan berbakti untuk kemajuan bangsa.',
  },
  {
    gambarUrl: '/images/slider/2.jpeg',
    judul: 'Pemuda Hebat',
    subjudul: 'Membangun Kota Langsa',
    deskripsi: 'Menjadi wadah berhimpunnya seluruh organisasi kepemudaan untuk bersama-sama menciptakan pemimpin masa depan yang berintegritas dan inovatif.',
  },
  {
    gambarUrl: '/images/slider/3.jpeg',
    judul: 'Bersatu Kita Maju',
    subjudul: 'Kemandirian & Aksi Nyata',
    deskripsi: 'Mendorong kemandirian ekonomi, sosial, dan budaya di kalangan pemuda melalui program-program strategis yang langsung menyentuh masyarakat.',
  },
]

const slidesDB = ref<SlideItem[]>([])

// Gunakan data dari DB, atau fallback jika DB kosong
const slides = computed<SlideItem[]>(() =>
  slidesDB.value.length > 0 ? slidesDB.value : slidesFallback
)

interface ItemBeritaPublik {
  id: number
  judul: string
  ringkasan: string
  kategori: string
  gambarUrl: string | null
  createdAt: string
}

const currentSlide = ref(0)
let slideInterval: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

// Auto-play slider + ambil berita dari API + Scroll listener
onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000)
  ambilBerita()
  ambilSliderBeranda()

  window.addEventListener('scroll', handleScroll, { passive: true })

  // Trigger entrance animations after a small delay for smooth effect
  setTimeout(() => {
    halamanSelesaiMuat.value = true
  }, 100)

  // Restore Theme Preference
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('knpi-theme')
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark'
    }
  }

  // Intersection Observer for Animations (Reveal on Scroll)
  setupRevealObserver()
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
  window.removeEventListener('scroll', handleScroll)
})

watch(isDarkMode, (val) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('knpi-theme', val ? 'dark' : 'light')
  }
})

useSeoMeta({
  title: 'KNPI Langsa',
  description: 'Situs resmi Komite Nasional Pemuda Indonesia (KNPI) Kota Langsa.',
})

useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
})

// Data Berita Terkini
const daftarBerita = ref<ItemBeritaPublik[]>([])
const memuatBerita = ref(true)

const formatTanggal = (tanggal: string) => {
  try {
    return new Date(tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  catch {
    return tanggal
  }
}

// Shared Intersection Observer for reveal animations
let revealObserver: IntersectionObserver | null = null

function setupRevealObserver() {
  const callback: IntersectionObserverCallback = (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        obs.unobserve(entry.target)
      }
    })
  }
  revealObserver = new IntersectionObserver(callback, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  })
  observeNewRevealElements()
}

function observeNewRevealElements() {
  if (!revealObserver) return
  document.querySelectorAll('.reveal:not(.active)').forEach((el) => {
    revealObserver!.observe(el)
  })
}

const ambilBerita = async () => {
  memuatBerita.value = true
  try {
    const res = await $fetch<{ berhasil: boolean, data: ItemBeritaPublik[] }>('/api/publik/berita')
    if (res.berhasil) {
      daftarBerita.value = res.data
    }
  }
  catch (err) {
    console.error('Gagal memuat berita:', err)
  }
  finally {
    memuatBerita.value = false
    // Re-observe newly rendered .reveal elements after data loads
    await nextTick()
    observeNewRevealElements()
  }
}

// Fetch slide dari database, fallback ke slidesFallback jika kosong/gagal
const ambilSliderBeranda = async () => {
  try {
    const res = await $fetch<{ berhasil: boolean, data: any[] }>('/api/publik/slider')
    if (res.berhasil && res.data.length > 0) {
      slidesDB.value = res.data.map(s => ({
        gambarUrl: s.gambarUrl || '',
        judul: s.judul || '',
        subjudul: s.subjudul || '',
        deskripsi: s.deskripsi || '',
      }))
    }
  }
  catch (err) {
    console.error('Gagal memuat slider:', err)
    // Fallback otomatis dari slidesFallback via computed
  }
}

// Data Program Kerja
const programKerja = [
  {
    title: 'Pendidikan & Pelatihan',
    desc: 'Peningkatan kapasitas pemuda melalui seminar, lokakarya, dan pelatihan kepemimpinan berkelanjutan.',
    icon: 'graduation',
  },
  {
    title: 'Kewirausahaan Pemuda',
    desc: 'Membina dan memfasilitasi wirausaha muda untuk mendorong kemandirian ekonomi kreatif di Kota Langsa.',
    icon: 'briefcase',
  },
  {
    title: 'Sosial Kemasyarakatan',
    desc: 'Kegiatan bakti sosial, tanggap bencana, dan pengabdian masyarakat sebagai bentuk nyata kepedulian pemuda.',
    icon: 'heart',
  },
  {
    title: 'Inovasi & Teknologi',
    desc: 'Mendorong adaptasi pemuda terhadap perkembangan literasi digital dan pemanfaatan teknologi informasi.',
    icon: 'lightbulb',
  },
]
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Reveal Animations Classes */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-100 { transition-delay: 100ms; }
.reveal-delay-200 { transition-delay: 200ms; }
.reveal-delay-300 { transition-delay: 300ms; }
.reveal-delay-400 { transition-delay: 400ms; }

html {
  scroll-behavior: smooth;
}
</style>
