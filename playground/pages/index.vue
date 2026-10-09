<template>
  <div class="min-h-screen bg-[#060914] text-slate-100 selection:bg-knpi-500/30 selection:text-knpi-200" style="font-family: 'Manrope', sans-serif;">
    <!-- Navbar Header -->
    <header
      class="sticky top-0 z-50 w-full transition-all duration-700 ease-out"
      :class="[
        isScrolledDown ? 'border-b border-white/[0.06] bg-[#060914]/90 backdrop-blur-2xl py-3' : 'bg-transparent py-5',
        halamanSelesaiMuat ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0',
      ]"
      @mouseenter="isHeaderHovered = true"
      @mouseleave="isHeaderHovered = false"
    >
      <div class="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <!-- Logo Brand -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3 group shrink-0"
        >
          <img
            src="~/assets/logo-knpi.png"
            alt="Logo KNPI Langsa"
            class="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          >
          <div>
            <span class="block text-sm font-black tracking-tight text-white group-hover:text-knpi-300 transition-colors">
              KNPI Langsa
            </span>
            <span class="block text-[10px] font-medium text-slate-500">Kota Langsa</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-400">
          <a href="#beranda" class="transition-colors hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-knpi-400 after:transition-all hover:after:w-full">Beranda</a>
          <a href="#pengurus" class="transition-colors hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-knpi-400 after:transition-all hover:after:w-full">Pengurus</a>
          <a href="#visi-misi" class="transition-colors hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-knpi-400 after:transition-all hover:after:w-full">Visi & Misi</a>
          <a href="#program-kerja" class="transition-colors hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-knpi-400 after:transition-all hover:after:w-full">Program</a>
          <NuxtLink to="/berita" class="transition-colors hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-knpi-400 after:transition-all hover:after:w-full">Berita</NuxtLink>
        </nav>

        <!-- Right Controls -->
        <div class="flex items-center gap-2.5">
          <NuxtLink
            to="/login"
            class="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white hover:bg-white/15 hover:border-knpi-500/50 transition-all duration-200"
          >
            <LucideLogIn :size="14" />
            <span>Masuk Panel</span>
          </NuxtLink>

          <!-- Mobile Hamburger Toggle -->
          <button
            type="button"
            class="flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/15 transition-all duration-300 cursor-pointer"
            aria-label="Toggle navigasi mobile"
            @click="menuMobileTerbuka = !menuMobileTerbuka"
          >
            <LucideX v-if="menuMobileTerbuka" :size="18" />
            <LucideMenu v-else :size="18" />
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Drawer -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="menuMobileTerbuka"
        class="fixed inset-x-0 top-14 z-40 md:hidden border-b p-5 backdrop-blur-2xl shadow-2xl bg-[#060914]/97 border-white/10"
      >
        <nav class="flex flex-col gap-1 font-semibold text-sm">
          <a href="#beranda" class="px-3.5 py-3 rounded-xl transition hover:bg-white/5 text-slate-300" @click="menuMobileTerbuka = false">Beranda</a>
          <a href="#pengurus" class="px-3.5 py-3 rounded-xl transition hover:bg-white/5 text-slate-300" @click="menuMobileTerbuka = false">Pengurus</a>
          <a href="#visi-misi" class="px-3.5 py-3 rounded-xl transition hover:bg-white/5 text-slate-300" @click="menuMobileTerbuka = false">Visi & Misi</a>
          <a href="#program-kerja" class="px-3.5 py-3 rounded-xl transition hover:bg-white/5 text-slate-300" @click="menuMobileTerbuka = false">Program Kerja</a>
          <NuxtLink to="/berita" class="px-3.5 py-3 rounded-xl transition hover:bg-white/5 text-slate-300" @click="menuMobileTerbuka = false">Berita</NuxtLink>
          <div class="border-t border-white/10 pt-3 mt-1">
            <NuxtLink to="/login" class="btn-primary !w-full !py-2.5 !text-xs" @click="menuMobileTerbuka = false">
              <LucideLogIn :size="15" />
              <span>Masuk Panel Administrasi</span>
            </NuxtLink>
          </div>
        </nav>
      </div>
    </Transition>

    <main>
      <!-- ===== HERO SECTION ===== -->
      <section
        id="beranda"
        class="relative w-full min-h-screen flex items-center overflow-hidden bg-[#060914]"
        @touchstart.passive="tanganiTouchStart"
        @touchend="tanganiTouchEnd"
      >
        <!-- Animated mesh background -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <!-- Primary orb -->
          <div
            class="absolute animate-mesh"
            style="width: 900px; height: 900px; border-radius: 50%; background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.06) 40%, transparent 70%); top: -200px; left: -100px; filter: blur(40px);"
          />
          <!-- Secondary orb -->
          <div
            class="absolute animate-mesh-2"
            style="width: 700px; height: 700px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 40%, transparent 70%); bottom: -150px; right: -50px; filter: blur(50px);"
          />
          <!-- Accent orb -->
          <div
            class="absolute animate-gradient-shift"
            style="width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%); top: 30%; right: 15%; filter: blur(60px);"
          />
          <!-- Grid lines -->
          <svg class="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <!-- Skeleton Loading -->
        <div
          v-if="memuatSlider"
          class="absolute inset-0 z-10 flex items-center justify-center"
        >
          <div class="w-10 h-10 rounded-full border-2 border-knpi-500/40 border-t-knpi-400 animate-spin" />
        </div>

        <template v-else>
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
          >
            <!-- Background Image -->
            <div class="absolute inset-0 overflow-hidden">
              <img
                :src="slide.gambarUrl"
                :alt="slide.judul"
                class="w-full h-full object-cover transition-all duration-1500 ease-out"
                :class="currentSlide === index ? 'scale-100 opacity-40' : 'scale-110 opacity-0'"
                onerror="this.style.display='none'"
              >
              <!-- Cinematic gradient overlays -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#060914] via-[#060914]/70 to-[#060914]/20" />
              <div class="absolute inset-0 bg-gradient-to-r from-[#060914]/80 via-[#060914]/30 to-transparent" />
            </div>
          </div>
        </template>

        <!-- Hero Content — fixed z-20 over slides -->
        <div class="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 sm:pt-32 sm:pb-28">
          <div
            class="max-w-3xl transition-all duration-1000"
            :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
          >
            <!-- Org label — minimal, not eyebrow spam -->
            <div
              class="inline-flex items-center gap-2.5 mb-8 transition-all duration-700 delay-100"
              :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
            >
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-knpi-400 opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-knpi-500" />
              </span>
              <span class="text-xs font-bold tracking-[0.2em] uppercase text-knpi-400">DPD KNPI Kota Langsa</span>
            </div>

            <!-- Headline — large and commanding -->
            <div class="overflow-hidden">
              <h1
                class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.95] tracking-[-0.02em] mb-6 transition-all duration-700 delay-200"
                :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
                style="text-wrap: balance;"
              >
                <template v-if="slides.length > 0">
                  {{ slides[currentSlide]?.judul }}
                  <span class="block text-knpi-400 mt-2">
                    {{ slides[currentSlide]?.subjudul }}
                  </span>
                </template>
                <template v-else>
                  Bakti Pada<br>
                  <span class="text-knpi-400">Negeri</span>
                </template>
              </h1>
            </div>

            <!-- Description -->
            <p
              class="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mb-10 transition-all duration-700 delay-300"
              :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
            >
              {{ slides[currentSlide]?.deskripsi || 'Komite Nasional Pemuda Indonesia (KNPI) berupaya mewujudkan visi pemuda yang tangguh, berperan aktif dalam pembangunan, dan berbakti untuk kemajuan bangsa.' }}
            </p>

            <!-- CTAs -->
            <div
              class="flex flex-wrap gap-4 items-center transition-all duration-700 delay-500"
              :class="halamanSelesaiMuat ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
            >
              <NuxtLink
                to="/berita"
                class="group inline-flex items-center gap-2.5 bg-knpi-500 hover:bg-knpi-400 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-knpi-500/25"
              >
                <span>Jelajahi Berita</span>
                <LucideArrowRight :size="16" class="group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
              <a
                href="#visi-misi"
                class="inline-flex items-center gap-2.5 border border-white/20 text-slate-300 hover:text-white hover:border-white/40 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200"
              >
                <LucideCompass :size="16" />
                <span>Visi & Misi</span>
              </a>
            </div>
          </div>

          <!-- Slide progress indicators — bottom left -->
          <div
            class="absolute bottom-8 left-4 sm:left-6 lg:left-8 z-20 flex items-center gap-3 transition-all duration-700 delay-700"
            :class="halamanSelesaiMuat ? 'opacity-100' : 'opacity-0'"
          >
            <!-- Mobile Prev/Next -->
            <button
              class="flex md:hidden w-8 h-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/15 active:scale-90 transition cursor-pointer"
              @click="prevSlide"
            >
              <LucideChevronLeft :size="16" />
            </button>

            <div class="flex items-center gap-2">
              <button
                v-for="(_, index) in slides"
                :key="'dot-'+index"
                class="h-1.5 rounded-full transition-all duration-500 focus:outline-none cursor-pointer"
                :class="currentSlide === index ? 'w-8 bg-knpi-400' : 'w-2 bg-white/25 hover:bg-white/50'"
                @click="currentSlide = index"
              />
            </div>

            <button
              class="flex md:hidden w-8 h-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/15 active:scale-90 transition cursor-pointer"
              @click="nextSlide"
            >
              <LucideChevronRight :size="16" />
            </button>
          </div>

          <!-- Desktop Floating Arrows -->
          <button
            class="hidden md:flex absolute right-24 bottom-8 z-20 w-10 h-10 items-center justify-center rounded-xl bg-white/[0.06] text-white border border-white/10 hover:bg-white/15 transition cursor-pointer hover:scale-105 active:scale-95"
            @click="prevSlide"
          >
            <LucideChevronLeft :size="18" />
          </button>
          <button
            class="hidden md:flex absolute right-8 bottom-8 z-20 w-10 h-10 items-center justify-center rounded-xl bg-knpi-600/80 text-white border border-knpi-500/40 hover:bg-knpi-500 transition cursor-pointer hover:scale-105 active:scale-95"
            @click="nextSlide"
          >
            <LucideChevronRight :size="18" />
          </button>
        </div>

        <!-- Scroll cue -->
        <div
          class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 transition-all duration-1000 delay-1000"
          :class="halamanSelesaiMuat ? 'opacity-30' : 'opacity-0'"
        >
          <div class="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent animate-pulse" />
        </div>
      </section>

      <!-- ===== DEWAN PENGURUS ===== -->
      <section
        id="pengurus"
        class="relative overflow-hidden"
        style="background: linear-gradient(180deg, #060914 0%, #0a0f1e 50%, #060914 100%);"
      >
        <!-- Decorative side accent -->
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-knpi-500/40 to-transparent" />

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <!-- Section heading — asymmetric layout -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center reveal">
            <div>
              <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1] tracking-[-0.02em] mb-6" style="text-wrap: balance;">
                Dewan<br>
                <span class="text-slate-400">Pengurus</span><br>
                DPD KNPI
              </h2>
              <p class="text-sm leading-relaxed text-slate-400 max-w-sm mb-8">
                Jajaran kepengurusan Komite Nasional Pemuda Indonesia DPD Kota Langsa yang berkomitmen membangun pemuda Aceh yang berdaya.
              </p>
              <div class="flex items-center gap-3">
                <div class="h-px w-14 bg-knpi-500/60" />
                <span class="text-xs font-bold uppercase tracking-widest text-knpi-500">Struktur Organisasi</span>
              </div>
            </div>

            <div class="reveal reveal-delay-200">
              <div class="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-slate-950/60">
                <!-- Accent line top -->
                <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-knpi-500/50 to-transparent" />
                <img
                  src="~/assets/ketua,sekret,bendahara knpi langsa.png"
                  alt="Ketua, Sekretaris, dan Bendahara KNPI Kota Langsa"
                  class="w-full h-auto object-contain"
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== VISI & MISI ===== -->
      <section
        id="visi-misi"
        class="relative overflow-hidden py-24 lg:py-32"
        style="background: #090d16;"
      >
        <!-- Atmospheric background — original knpi blue orb -->
        <div
          class="absolute pointer-events-none"
          style="width: 800px; height: 800px; border-radius: 50%; background: radial-gradient(circle, rgba(59,100,240,0.10) 0%, transparent 70%); top: -200px; right: -200px; filter: blur(80px);"
        />

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <!-- Visi — Tipografi besar dramatis dalam card -->
          <div class="reveal mb-16">
            <div class="flex items-center gap-4 mb-10">
              <div class="h-px flex-1 bg-white/[0.06]" />
              <span class="text-xs font-bold tracking-[0.25em] uppercase text-slate-500">Arah Gerak Organisasi</span>
              <div class="h-px flex-1 bg-white/[0.06]" />
            </div>

            <!-- Visi Card dengan tipografi besar, satu baris -->
            <div class="max-w-4xl mx-auto">
              <div
                class="p-8 sm:p-12 text-center rounded-2xl border transition-all glass-card border-knpi-500/20 bg-gradient-to-br from-knpi-950/40 via-slate-900/80 to-slate-900/60"
                style="box-shadow: 0 0 80px rgba(48,112,240,0.08) inset;"
              >
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl mb-5 border bg-knpi-600/20 text-knpi-300 border-knpi-500/30">
                  <LucideTarget :size="24" />
                </div>
                <span class="text-xs font-bold uppercase tracking-widest text-knpi-500">Visi Utama</span>
                <h2
                  class="mt-3 text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.02em] text-white whitespace-nowrap"
                  style="text-shadow: 0 0 80px rgba(48,112,240,0.35);"
                >
                  "PEMUDA <span class="text-knpi-400">HEBAT"</span>
                </h2>
              </div>
            </div>
          </div>

          <!-- Misi — List-style, not card grid -->
          <div class="max-w-3xl mx-auto reveal reveal-delay-200">
            <h3 class="text-xs font-bold uppercase tracking-[0.25em] text-slate-500 mb-8 text-center">Empat Misi Strategis</h3>
            <div class="space-y-0">
              <div
                v-for="(misi, i) in [
                  { title: 'Konsolidasi Penguatan Kelembagaan dan Kaderisasi OKP.', num: '01', color: 'knpi' },
                  { title: 'Mendorong Kemandirian Pemuda berbasis Entrepreneur, Ekonomi Kreatif, dan Literasi.', num: '02', color: 'amber' },
                  { title: 'Relasi Sinergis Pemuda dan Pemerintah sebagai Mitra Strategis Pembangunan Daerah.', num: '03', color: 'knpi' },
                  { title: 'Revitalisasi Semangat Pemuda dalam Pembentukan Integritas & Karakter Islamiah.', num: '04', color: 'amber' },
                ]"
                :key="misi.num"
                class="group flex items-start gap-6 py-7 border-b border-white/[0.06] transition-all duration-300 cursor-default"
                :class="[
                  `reveal-delay-${(i + 1) * 100}`,
                  misi.color === 'knpi' ? 'hover:border-knpi-500/30' : 'hover:border-amber-500/30'
                ]"
              >
                <span
                  class="text-4xl font-black leading-none tabular-nums shrink-0 pt-0.5 transition-colors duration-300"
                  :class="misi.color === 'knpi'
                    ? 'text-knpi-500/20 group-hover:text-knpi-500/50'
                    : 'text-amber-500/20 group-hover:text-amber-500/50'"
                >
                  {{ misi.num }}
                </span>
                <div class="flex-1">
                  <p class="text-base sm:text-lg font-semibold text-slate-300 group-hover:text-white leading-relaxed transition-colors duration-300">
                    {{ misi.title }}
                  </p>
                </div>
                <LucideArrowRight
                  :size="16"
                  class="shrink-0 transition-all duration-300 mt-1.5 group-hover:translate-x-1"
                  :class="misi.color === 'knpi' ? 'text-slate-600 group-hover:text-knpi-400' : 'text-slate-600 group-hover:text-amber-400'"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== PROGRAM KERJA ===== -->
      <section
        id="program-kerja"
        class="relative py-24 lg:py-32 overflow-hidden"
        style="background: linear-gradient(180deg, #060914 0%, #080d19 100%);"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Header row -->
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 reveal">
            <div>
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-[-0.02em]" style="text-wrap: balance;">
                Program Kerja<br>
                <span class="text-slate-500">Unggulan</span>
              </h2>
            </div>
            <div class="h-px flex-1 hidden sm:block bg-white/[0.05] max-w-xs mb-2" />
            <p class="text-xs font-bold uppercase tracking-widest text-knpi-500 sm:mb-2">Pilar Pergerakan</p>
          </div>

          <!-- Programs — Horizontal scroll on mobile, 2x2 on desktop -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.05] rounded-2xl overflow-hidden">
            <div
              v-for="(prog, index) in programKerja"
              :key="index"
              class="group relative p-8 sm:p-10 bg-[#080d19] hover:bg-[#0a1225] transition-all duration-300 reveal"
              :class="`reveal-delay-${(index + 1) * 100}`"
            >
              <!-- Number watermark -->
              <span class="absolute top-6 right-8 text-6xl font-black text-white/[0.03] group-hover:text-white/[0.05] transition-colors duration-300 leading-none tabular-nums">
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <div class="relative z-10">
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-knpi-600/15 text-knpi-400 border border-knpi-500/20 mb-6 group-hover:bg-knpi-600/25 transition-colors duration-300"
                >
                  <LucideGraduationCap v-if="prog.icon === 'graduation'" :size="22" />
                  <LucideBriefcase v-else-if="prog.icon === 'briefcase'" :size="22" />
                  <LucideHeartHandshake v-else-if="prog.icon === 'heart'" :size="22" />
                  <LucideLightbulb v-else-if="prog.icon === 'lightbulb'" :size="22" />
                </div>
                <h4 class="text-base font-bold mb-3 text-white">{{ prog.title }}</h4>
                <p class="text-sm leading-relaxed text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                  {{ prog.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== BERITA TERKINI ===== -->
      <section
        id="berita"
        class="py-24 lg:py-32 bg-[#060914]"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-end justify-between mb-12 max-w-6xl mx-auto reveal">
            <h2 class="text-3xl sm:text-4xl font-black text-white tracking-[-0.02em]">
              Berita<br>
              <span class="text-slate-500">Terkini</span>
            </h2>
            <NuxtLink
              to="/berita"
              class="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-knpi-400 hover:text-knpi-300 transition-colors group border-b border-knpi-500/30 hover:border-knpi-400 pb-0.5"
            >
              <span>Semua Berita</span>
              <LucideArrowRight :size="13" class="group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>

          <div class="max-w-6xl mx-auto">
            <!-- Loading -->
            <div
              v-if="memuatBerita"
              class="flex items-center justify-center py-20 text-xs text-slate-500 gap-2"
            >
              <LucideLoader :size="18" class="animate-spin text-knpi-400" />
              <span>Memuat berita...</span>
            </div>

            <!-- Empty -->
            <div
              v-else-if="daftarBerita.length === 0"
              class="py-20 text-center"
            >
              <LucideNewspaper :size="36" class="mx-auto text-slate-700 mb-3" />
              <p class="text-sm font-semibold text-slate-500">Belum ada berita yang diterbitkan.</p>
            </div>

            <!-- News Cards -->
            <div
              v-else
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <NuxtLink
                v-for="(item, idx) in daftarBerita"
                :key="item.id"
                :to="`/berita/${item.id}`"
                class="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0f1e] hover:border-knpi-500/25 hover:bg-[#0c1226] transition-all duration-300 hover:-translate-y-1 reveal"
                :class="`reveal-delay-${((idx % 3) + 1) * 100}`"
              >
                <div class="aspect-[16/10] overflow-hidden relative bg-slate-950">
                  <img
                    v-if="item.gambarUrl"
                    :src="item.gambarUrl"
                    :alt="item.judul"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  >
                  <div
                    v-else
                    class="absolute inset-0 flex items-center justify-center text-slate-700"
                  >
                    <LucideImage :size="36" />
                  </div>
                  <div class="absolute top-3 left-3">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] font-bold uppercase text-slate-300">
                      {{ item.kategori }}
                    </span>
                  </div>
                </div>

                <div class="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <span class="text-[11px] flex items-center gap-1 mb-2 text-slate-600">
                      <LucideCalendar :size="12" />
                      {{ formatTanggal(item.createdAt) }}
                    </span>
                    <h3 class="text-sm font-bold transition-colors line-clamp-2 text-slate-200 group-hover:text-white leading-snug">
                      {{ item.judul }}
                    </h3>
                    <p class="mt-2 text-xs line-clamp-2 text-slate-600 leading-relaxed">
                      {{ item.ringkasan }}
                    </p>
                  </div>

                  <div class="flex items-center gap-1 text-xs font-bold group-hover:translate-x-1 transition-transform text-knpi-500 group-hover:text-knpi-400">
                    <span>Baca Selengkapnya</span>
                    <LucideChevronRight :size="14" />
                  </div>
                </div>
              </NuxtLink>
            </div>

            <!-- Bottom CTA -->
            <div
              v-if="daftarBerita.length > 0"
              class="mt-12 text-center reveal"
            >
              <NuxtLink
                to="/berita"
                class="inline-flex items-center gap-2 border border-white/10 hover:border-knpi-500/30 bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-white px-7 py-3 rounded-xl text-xs font-bold transition-all duration-200 group"
              >
                <LucideNewspaper :size="15" class="text-knpi-500" />
                <span>Buka Seluruh Arsip Berita</span>
                <LucideArrowRight :size="13" class="group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== CTA BANNER ===== -->
      <section class="relative overflow-hidden py-24 lg:py-32">
        <!-- Bold gradient background -->
        <div class="absolute inset-0" style="background: linear-gradient(135deg, #1e3a8a 0%, #312e81 35%, #1e1b4b 65%, #0f172a 100%);" />
        <!-- Texture overlays -->
        <div class="absolute inset-0 pointer-events-none">
          <div
            class="absolute animate-float"
            style="width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%); bottom: -200px; right: -100px; filter: blur(60px);"
          />
          <div
            class="absolute animate-float-slow"
            style="width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%); top: -150px; left: -100px; filter: blur(70px);"
          />
          <!-- Noise overlay -->
          <svg class="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div class="max-w-3xl mx-auto reveal">
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-indigo-300/80 mb-6">Wadah Kolaborasi & Kreativitas</p>
            <h2 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.02em] leading-[1.05] mb-6" style="text-wrap: balance;">
              Bersatu, Bangkit, dan<br>Berdaya Bersama
            </h2>
            <p class="text-slate-300/80 text-sm leading-relaxed max-w-xl mx-auto mb-10">
              DPD KNPI Kota Langsa terus berkomitmen sebagai wadah berhimpun seluruh organisasi kepemudaan, memperkuat kemandirian, dan mengawal kemajuan Kota Langsa.
            </p>
            <div class="flex flex-wrap items-center justify-center gap-4">
              <NuxtLink
                to="/berita"
                class="inline-flex items-center gap-2 bg-white text-[#312e81] px-7 py-3.5 rounded-xl text-sm font-black shadow-2xl hover:bg-slate-100 hover:-translate-y-0.5 transition-all duration-200"
              >
                <LucideNewspaper :size="16" />
                <span>Baca Seluruh Berita</span>
              </NuxtLink>
              <a
                href="#pengurus"
                class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <LucideUsers :size="16" />
                <span>Dewan Pengurus</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="pt-16 pb-8 border-t bg-[#040710] border-white/[0.06]">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <img src="~/assets/logo-knpi.png" alt="Logo KNPI Langsa" class="h-9 w-auto">
              <span class="text-base font-black text-white">KNPI Kota Langsa</span>
            </div>
            <p class="text-xs leading-relaxed text-slate-400 max-w-sm mb-5">
              Wadah berhimpun organisasi kepemudaan DPD KNPI Kota Langsa.
            </p>
            <a
              href="https://www.instagram.com/knpikotalangsa/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2.5 text-xs text-slate-400 hover:text-white transition group py-1"
            >
              <div class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-pink-400 group-hover:border-pink-500/30 group-hover:bg-pink-500/10 transition">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
              <span class="group-hover:text-pink-300 font-medium transition-colors">@knpikotalangsa</span>
            </a>
          </div>

          <div>
            <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-5">Navigasi</h4>
            <ul class="space-y-2.5 text-xs text-slate-400">
              <li><a href="#beranda" class="hover:text-white transition">Beranda</a></li>
              <li><a href="#visi-misi" class="hover:text-white transition">Visi & Misi</a></li>
              <li><NuxtLink to="/berita" class="hover:text-white transition">Arsip Berita</NuxtLink></li>
              <li><NuxtLink to="/login" class="hover:text-white transition">Login Admin</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-5">Sekretariat</h4>
            <p class="text-xs leading-relaxed text-slate-400">
              Graha Pemuda KNPI<br>
              Jl. Jend. Ahmad Yani, Kota Langsa, Aceh
            </p>
          </div>
        </div>

        <div class="border-t border-white/[0.04] pt-6 text-center text-[11px] text-slate-500">
          <p>&copy; {{ new Date().getFullYear() }} DPD KNPI Kota Langsa.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'

definePageMeta({ layout: false })

// Scroll & Animation State
const isScrolledDown = ref(false)
const isHeaderHovered = ref(false)
const menuMobileTerbuka = ref(false)
const halamanSelesaiMuat = ref(false)

const handleScroll = () => {
  isScrolledDown.value = window.scrollY > 60
}

// ---- Slider ----
interface SlideItem {
  gambarUrl: string
  judul: string
  subjudul: string
  deskripsi: string
}

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
const memuatSlider = ref(true)

const slides = computed<SlideItem[]>(() =>
  slidesDB.value.length > 0 ? slidesDB.value : slidesFallback,
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

// Swipe gestures
let touchStartX = 0
let touchEndX = 0

const tanganiTouchStart = (e: TouchEvent) => {
  if (e.changedTouches && e.changedTouches[0]) {
    touchStartX = e.changedTouches[0].clientX
  }
}

const tanganiTouchEnd = (e: TouchEvent) => {
  if (e.changedTouches && e.changedTouches[0]) {
    touchEndX = e.changedTouches[0].clientX
    const jarak = touchEndX - touchStartX
    if (jarak > 40) prevSlide()
    else if (jarak < -40) nextSlide()
  }
}

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000)
  ambilBerita()
  ambilSliderBeranda()
  window.addEventListener('scroll', handleScroll, { passive: true })

  setTimeout(() => {
    halamanSelesaiMuat.value = true
  }, 100)

  setupRevealObserver()
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
  window.removeEventListener('scroll', handleScroll)
})

useSeoMeta({
  title: 'KNPI Langsa',
  description: 'Situs resmi Komite Nasional Pemuda Indonesia (KNPI) Kota Langsa.',
})

useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap' },
  ],
})

// Data Berita
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

// Reveal Observer
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
    threshold: 0.1,
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
    await nextTick()
    observeNewRevealElements()
  }
}

interface SlideApiItem {
  gambarUrl?: string
  judul?: string
  subjudul?: string
  deskripsi?: string
}

const ambilSliderBeranda = async () => {
  try {
    const res = await $fetch<{ berhasil: boolean, data: SlideApiItem[] }>('/api/publik/slider')
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
  }
  finally {
    memuatSlider.value = false
  }
}

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
/* Reveal Animations */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
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

/* Gradient text for visi */
.hero-gradient-text {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Image transition duration */
.duration-1500 {
  transition-duration: 1500ms;
}
</style>
