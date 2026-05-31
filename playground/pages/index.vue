<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-knpi-500 selection:text-white">
    <!-- Navbar -->
    <header class="sticky top-0 z-50 w-full border-b border-white/10 bg-[#003399] shadow-lg">
      <div class="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <img src="~/assets/logo-knpi.png" alt="Logo KNPI Langsa" class="h-9 w-auto drop-shadow-md" />
          <span class="text-xl font-extrabold tracking-wide text-white">KNPI Langsa</span>
        </div>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex items-center gap-8">
          <a
            href="#beranda"
            class="text-sm font-semibold text-[#FFD700] border-b-2 border-[#FFD700] pb-1"
          >Beranda</a>
          <a
            href="#berita"
            class="text-sm font-medium text-white/80 hover:text-white transition-colors pb-1"
          >Berita</a>
          <a
            href="#pinjam-gedung"
            class="text-sm font-medium text-white/80 hover:text-white transition-colors pb-1"
          >Pinjam Pakai Gedung</a>
        </nav>

        <!-- Right: Login Button -->
        <div class="flex items-center">
          <NuxtLink
            to="/login"
            class="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#003399] hover:shadow-lg hover:shadow-white/20"
          >
            <LucideLogIn :size="16" />
            <span>Masuk</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <main>
      <!-- Hero Section -->
      <!-- Hero Section Slider -->
      <section id="beranda" class="relative w-full h-screen min-h-[600px] bg-slate-900 overflow-hidden">
        <div v-for="(slide, index) in slides" :key="index"
             class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
             :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'">
          
          <!-- Background Image -->
          <div class="absolute inset-0">
            <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" onerror="this.src='/favicon.ico'; this.classList.add('object-contain', 'p-20', 'bg-slate-800')" />
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20"></div>
          </div>

          <!-- Content -->
          <div class="absolute inset-0 flex items-center">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
              <div class="max-w-3xl transform transition-all duration-1000 delay-300"
                   :class="currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
                <div class="inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-bold text-white mb-6 border border-white/20">
                  <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75" />
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-[#FFD700]" />
                  </span>
                  <span class="uppercase tracking-wide">KNPI Kota Langsa</span>
                </div>
                
                <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight mb-4 drop-shadow-2xl">
                  {{ slide.title }}
                  <span class="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-200 mt-2">
                    {{ slide.subtitle }}
                  </span>
                </h1>
                
                <p class="mt-6 text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl drop-shadow-md border-l-4 border-[#FFD700] pl-4">
                  {{ slide.description }}
                </p>
                
                <div class="mt-10 flex flex-wrap gap-4 items-center">
                  <a href="#berita" class="flex items-center gap-2 rounded-full bg-[#003399] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-900/40 transition-all hover:-translate-y-1 hover:bg-blue-800">
                    Jelajahi Berita
                    <LucideArrowRight :size="18" />
                  </a>
                  <a href="#pengurus" class="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-8 py-4 text-sm font-bold text-white border border-white/20 transition-all hover:-translate-y-1 hover:bg-white/20">
                    Dewan Pengurus
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slider Navigation Controls -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          <button v-for="(_, index) in slides" :key="'dot-'+index" 
                  @click="currentSlide = index"
                  class="h-2 rounded-full transition-all duration-300 focus:outline-none"
                  :class="currentSlide === index ? 'w-12 bg-[#FFD700]' : 'w-3 bg-white/50 hover:bg-white'">
          </button>
        </div>
        
        <button @click="prevSlide" class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md border border-white/20 hover:bg-black/40 transition-all">
          <LucideChevronLeft :size="24" />
        </button>
        <button @click="nextSlide" class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md border border-white/20 hover:bg-black/40 transition-all">
          <LucideChevronRight :size="24" />
        </button>
      </section>

      <!-- Dewan Pengurus Section -->
      <section id="pengurus" class="py-32 relative overflow-hidden bg-slate-50">
        <!-- Premium Decorative Background -->
        <div class="absolute inset-0 pointer-events-none">
          <!-- Grid Pattern -->
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgNTEsIDE1MywgMC4xKSIvPjwvc3ZnPg==')] opacity-60" />
          
          <!-- Animated Blobs -->
          <div class="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#003399]/30 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
          <div class="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-[#FFD700]/30 to-yellow-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-float-slow" />
          <div class="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-gradient-to-t from-white to-transparent" />
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center max-w-3xl mx-auto mb-20 reveal">
            <span class="inline-block py-1.5 px-4 rounded-full bg-white text-[#003399] font-bold text-sm tracking-widest mb-6 shadow-sm border border-slate-200">STRUKTUR ORGANISASI</span>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight drop-shadow-sm">
              Dewan Pengurus
            </h2>
            <div class="mt-8 h-1.5 w-32 bg-gradient-to-r from-[#003399] via-blue-500 to-[#FFD700] mx-auto rounded-full" />
            <p class="mt-8 text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
              Pilar penggerak visi dan misi Komite Nasional Pemuda Indonesia (KNPI) DPD Kota Langsa.
            </p>
          </div>

          <div class="reveal max-w-6xl mx-auto">
            <!-- Glassmorphism Card Frame -->
            <div class="relative rounded-[2.5rem] md:rounded-[3.5rem] p-4 sm:p-6 md:p-8 bg-white/50 backdrop-blur-2xl border border-white/80 shadow-[0_20px_60px_-15px_rgba(0,51,153,0.15)] hover:shadow-[0_30px_80px_-15px_rgba(0,51,153,0.25)] transition-all duration-700">
              
              <!-- Glowing accents behind the inner card -->
              <div class="absolute inset-0 bg-gradient-to-br from-white/90 to-white/30 rounded-[2.5rem] md:rounded-[3.5rem] pointer-events-none" />
              
              <!-- Inner Content -->
              <div class="relative bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm flex items-center justify-center p-2 md:p-4 aspect-video group border border-slate-100">
                
                <!-- Decorative Corner Accents -->
                <div class="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#003399]/5 to-transparent rounded-br-[100%] pointer-events-none transition-transform duration-700 group-hover:scale-125" />
                <div class="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#FFD700]/10 to-transparent rounded-tl-[100%] pointer-events-none transition-transform duration-700 group-hover:scale-125" />
                
                <img src="~/assets/ketua,sekret,bendahara knpi langsa.png" alt="Ketua, Sekretaris, dan Bendahara KNPI Kota Langsa" class="w-full h-full object-contain object-center transform transition-transform duration-1000 group-hover:scale-105 relative z-10" />
                
                <!-- Overlay Gradient on Hover -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Visi & Misi Section -->
      <section
        id="visi-misi"
        class="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
      >
        <!-- Decorative Backgrounds -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#FFD700]/5 blur-[100px]" />
          <div class="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#003399]/5 blur-[100px]" />
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="reveal text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Visi & Misi
            </h2>
            <div class="mt-4 h-1.5 w-24 bg-gradient-to-r from-[#003399] to-[#FFD700] mx-auto rounded-full" />
            <p class="mt-6 text-slate-600 text-lg">
              Arah pergerakan dan cita-cita luhur KNPI Kota Langsa dalam mewujudkan generasi muda yang unggul dan berintegritas.
            </p>
          </div>

          <!-- Visi Showcase -->
          <div class="reveal max-w-4xl mx-auto mb-16">
            <div class="relative bg-gradient-to-br from-[#003399] to-blue-800 rounded-[2.5rem] p-10 md:p-14 text-center overflow-hidden shadow-2xl shadow-blue-900/20 group hover:shadow-blue-900/30 transition-all duration-500 hover:-translate-y-1">
              <!-- Overlay patterns -->
              <div class="absolute -top-32 -right-32 w-80 h-80 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
              <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
              
              <div class="relative z-10">
                <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[#FFD700] mb-6 backdrop-blur-md ring-1 ring-white/20 shadow-inner">
                  <LucideTarget :size="32" />
                </div>
                <h3 class="text-xl md:text-2xl font-bold text-blue-100 mb-2 uppercase tracking-widest">
                  Visi
                </h3>
                <h2 class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-md">
                  "Pemuda Hebat"
                </h2>
              </div>
            </div>
          </div>

          <!-- Misi Grid -->
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-10 reveal">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#003399]/10 text-[#003399] font-bold text-sm border border-[#003399]/20">
                <LucideUsers :size="16" />
                Misi Kami
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <!-- Misi 1 -->
              <div class="reveal reveal-delay-100 group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#003399]/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div class="absolute top-0 right-0 p-6 text-[10rem] leading-none font-black text-slate-50 opacity-50 group-hover:text-[#003399]/5 transition-colors duration-300 select-none pointer-events-none -mt-8 -mr-4">
                  1
                </div>
                <div class="relative z-10">
                  <div class="w-14 h-14 rounded-2xl bg-blue-50 text-[#003399] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#003399] group-hover:text-white transition-all duration-300 ring-1 ring-slate-100 group-hover:ring-blue-800">
                    <LucideBuilding2 :size="28" />
                  </div>
                  <h4 class="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed">
                    Konsolidasi Penguatan Kelembagaan dan Kaderisasi OKP.
                  </h4>
                </div>
              </div>

              <!-- Misi 2 -->
              <div class="reveal reveal-delay-200 group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#FFD700]/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div class="absolute top-0 right-0 p-6 text-[10rem] leading-none font-black text-slate-50 opacity-50 group-hover:text-[#FFD700]/10 transition-colors duration-300 select-none pointer-events-none -mt-8 -mr-4">
                  2
                </div>
                <div class="relative z-10">
                  <div class="w-14 h-14 rounded-2xl bg-yellow-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FFD700] group-hover:text-amber-900 transition-all duration-300 ring-1 ring-slate-100 group-hover:ring-yellow-400">
                    <LucideTrendingUp :size="28" />
                  </div>
                  <h4 class="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed">
                    Mendorong Kemandirian Pemuda berbasis Entrepreneur, Ekonomi Kreatif, dan Literasi.
                  </h4>
                </div>
              </div>

              <!-- Misi 3 -->
              <div class="reveal reveal-delay-300 group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#003399]/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div class="absolute top-0 right-0 p-6 text-[10rem] leading-none font-black text-slate-50 opacity-50 group-hover:text-[#003399]/5 transition-colors duration-300 select-none pointer-events-none -mt-8 -mr-4">
                  3
                </div>
                <div class="relative z-10">
                  <div class="w-14 h-14 rounded-2xl bg-blue-50 text-[#003399] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#003399] group-hover:text-white transition-all duration-300 ring-1 ring-slate-100 group-hover:ring-blue-800">
                    <LucideHandshake :size="28" />
                  </div>
                  <h4 class="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed">
                    Relasi Sinergis Pemuda dan Pemerintah sebagai Mitra Strategis dalam Pembangunan Daerah.
                  </h4>
                </div>
              </div>

              <!-- Misi 4 -->
              <div class="reveal reveal-delay-400 group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#FFD700]/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div class="absolute top-0 right-0 p-6 text-[10rem] leading-none font-black text-slate-50 opacity-50 group-hover:text-[#FFD700]/10 transition-colors duration-300 select-none pointer-events-none -mt-8 -mr-4">
                  4
                </div>
                <div class="relative z-10">
                  <div class="w-14 h-14 rounded-2xl bg-yellow-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FFD700] group-hover:text-amber-900 transition-all duration-300 ring-1 ring-slate-100 group-hover:ring-yellow-400">
                    <LucideShieldCheck :size="28" />
                  </div>
                  <h4 class="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed">
                    Revitalisasi Semangat Pemuda dalam pembentukan Integritas untuk menjawab tantangan Global dan ancaman Narkoba melalui wawasan kebangsaan dan Karakter Islamiah.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Program Kerja Section -->
      <section
        id="program-kerja"
        class="py-24 bg-slate-50"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="reveal text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Program Kerja Unggulan
            </h2>
            <div class="mt-4 h-1.5 w-24 bg-[#003399] mx-auto rounded-full" />
            <p class="mt-6 text-slate-600">
              Fokus pergerakan pemuda dalam mendukung pembangunan di berbagai sektor esensial.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="(prog, index) in programKerja"
              :key="index"
              class="reveal bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition duration-300"
              :class="`reveal-delay-${index * 100}`"
            >
              <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#003399] mb-6">
                <component
                  :is="resolveComponent(prog.icon)"
                  :size="24"
                />
              </div>
              <h4 class="text-lg font-bold text-slate-900 mb-2">
                {{ prog.title }}
              </h4>
              <p class="text-sm text-slate-500 leading-relaxed">
                {{ prog.desc }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- News Section -->
      <section
        id="berita"
        class="py-24 bg-white overflow-hidden"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="reveal flex items-end justify-between mb-12">
            <div>
              <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Berita Terkini
              </h2>
              <div class="mt-4 h-1.5 w-24 bg-[#FFD700] rounded-full" />
            </div>
            <a
              href="#"
              class="hidden sm:flex items-center gap-1.5 text-sm font-bold text-[#003399] hover:text-blue-800"
            >
              Lihat Semua <LucideArrowRight :size="16" />
            </a>
          </div>

          <!-- Horizontal Scroll Container -->
          <div class="reveal reveal-delay-200 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 flex gap-6 scrollbar-hide">
            <!-- Loading State -->
            <div v-if="memuatBerita" class="flex items-center justify-center w-full py-20">
              <div class="flex flex-col items-center gap-4">
                <div class="w-10 h-10 border-4 border-[#003399] border-t-transparent rounded-full animate-spin"></div>
                <span class="text-slate-400 text-sm font-medium">Memuat berita...</span>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="daftarBerita.length === 0" class="flex items-center justify-center w-full py-20">
              <div class="text-center">
                <LucideNewspaper :size="48" class="mx-auto text-slate-300 mb-4" />
                <p class="text-slate-400 font-medium">Belum ada berita yang diterbitkan.</p>
              </div>
            </div>

            <!-- News Cards -->
            <div
              v-for="item in daftarBerita"
              :key="item.id"
              class="snap-start shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col overflow-hidden"
            >
              <div class="aspect-[16/10] bg-slate-200 overflow-hidden relative">
                <div class="absolute inset-0 bg-[#003399]/10 group-hover:bg-transparent transition-colors z-10" />
                <img v-if="item.gambarUrl" :src="item.gambarUrl" :alt="item.judul" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div v-else class="absolute inset-0 flex items-center justify-center">
                  <LucideImage :size="40" class="text-slate-300" />
                </div>
                <div class="absolute top-4 left-4 z-20 bg-[#FFD700] text-amber-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {{ item.kategori }}
                </div>
              </div>
              <div class="p-6 flex-1 flex flex-col">
                <div class="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                  <LucideCalendar :size="14" />
                  <span>{{ formatTanggal(item.createdAt) }}</span>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#003399] transition-colors line-clamp-2">
                  {{ item.judul }}
                </h3>
                <p class="text-sm text-slate-500 line-clamp-2 mb-6 flex-1">
                  {{ item.ringkasan }}
                </p>
                <span class="text-sm font-bold text-[#003399] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya <LucideChevronRight :size="16" />
                </span>
              </div>
            </div>
          </div>

          <div class="mt-4 text-center sm:hidden">
            <a
              href="#"
              class="inline-flex items-center gap-1.5 text-sm font-bold text-[#003399] hover:text-blue-800"
            >
              Lihat Semua Berita <LucideArrowRight :size="16" />
            </a>
          </div>
        </div>
      </section>

      <!-- Pinjam Gedung Promo CTA -->
      <section
        id="pinjam-gedung"
        class="py-20 relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-[#003399]" />
        <!-- Pattern overlay -->
        <div
          class="absolute inset-0 opacity-10"
          style="background-image: radial-gradient(#ffffff 2px, transparent 2px); background-size: 30px 30px;"
        />

        <div class="container mx-auto px-4 relative z-10 text-center">
          <div class="reveal max-w-2xl mx-auto">
            <h2 class="text-3xl font-extrabold text-white mb-4">
              Butuh Fasilitas untuk Kegiatan Anda?
            </h2>
            <p class="text-blue-100 text-lg mb-8">
              Graha Pemuda KNPI Kota Langsa menyediakan fasilitas gedung yang dapat dipinjam pakai untuk berbagai kegiatan kemasyarakatan dan kepemudaan.
            </p>
            <a
              href="#"
              class="inline-flex items-center gap-2 rounded-full bg-[#FFD700] px-8 py-4 text-sm font-bold text-amber-900 shadow-lg hover:-translate-y-1 hover:bg-yellow-300 transition duration-300"
            >
              <LucideBuilding2 :size="18" />
              Info Pinjam Pakai Gedung
            </a>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <!-- Brand -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <img src="~/assets/logo-knpi.png" alt="Logo KNPI Langsa" class="h-10 w-10 object-contain drop-shadow-md" />
              <span class="text-xl font-extrabold text-white">KNPI Kota Langsa</span>
            </div>
            <p class="text-sm leading-relaxed text-slate-400 max-w-sm">
              Wadah berhimpun organisasi kepemudaan (OKP) di Kota Langsa. Bersama mewujudkan pemuda mandiri, berkarakter, dan berdaya saing.
            </p>
            <div class="mt-6 flex gap-4">
              <a
                href="#"
                class="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#003399] hover:text-white transition-colors"
              >
                <LucideFacebook :size="18" />
              </a>
              <a
                href="#"
                class="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#003399] hover:text-white transition-colors"
              >
                <LucideInstagram :size="18" />
              </a>
              <a
                href="#"
                class="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#003399] hover:text-white transition-colors"
              >
                <LucideTwitter :size="18" />
              </a>
            </div>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-white font-bold mb-6">
              Tautan Cepat
            </h4>
            <ul class="space-y-3 text-sm">
              <li>
                <a
                  href="#beranda"
                  class="hover:text-[#FFD700] transition-colors"
                >Beranda</a>
              </li>
              <li>
                <a
                  href="#visi-misi"
                  class="hover:text-[#FFD700] transition-colors"
                >Visi & Misi</a>
              </li>
              <li>
                <a
                  href="#berita"
                  class="hover:text-[#FFD700] transition-colors"
                >Berita Terkini</a>
              </li>
              <li>
                <a
                  href="#pinjam-gedung"
                  class="hover:text-[#FFD700] transition-colors"
                >Pinjam Gedung</a>
              </li>
              <li>
                <NuxtLink
                  to="/login"
                  class="hover:text-[#FFD700] transition-colors"
                >Login Pengurus</NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-white font-bold mb-6">
              Sekretariat
            </h4>
            <ul class="space-y-4 text-sm">
              <li class="flex gap-3">
                <LucideMapPin
                  :size="18"
                  class="shrink-0 text-[#FFD700]"
                />
                <span class="leading-relaxed">Graha Pemuda KNPI<br>Jl. Jend. Ahmad Yani,<br>Kota Langsa, Aceh</span>
              </li>
              <li class="flex gap-3 items-center">
                <LucidePhone
                  :size="18"
                  class="shrink-0 text-[#FFD700]"
                />
                <span>+62 812-3456-7890</span>
              </li>
              <li class="flex gap-3 items-center">
                <LucideMail
                  :size="18"
                  class="shrink-0 text-[#FFD700]"
                />
                <span>info@knpilangsa.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {{ new Date().getFullYear() }} KNPI Kota Langsa. Hak cipta dilindungi.</p>
          <p>Dibuat dengan Nuxt & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

definePageMeta({ layout: false })

// Slider Logic
const slides = [
  {
    image: '/images/slider/1.jpeg',
    title: 'Bakti Pada Negeri',
    subtitle: 'Sinergi & Kolaborasi Pemuda',
    description: 'Komite Nasional Pemuda Indonesia (KNPI) berupaya mewujudkan visi pemuda yang tangguh, berperan aktif dalam pembangunan, dan berbakti untuk kemajuan bangsa.'
  },
  {
    image: '/images/slider/2.jpeg',
    title: 'Pemuda Hebat',
    subtitle: 'Membangun Kota Langsa',
    description: 'Menjadi wadah berhimpunnya seluruh organisasi kepemudaan untuk bersama-sama menciptakan pemimpin masa depan yang berintegritas dan inovatif.'
  },
  {
    image: '/images/slider/3.jpeg',
    title: 'Bersatu Kita Maju',
    subtitle: 'Kemandirian & Aksi Nyata',
    description: 'Mendorong kemandirian ekonomi, sosial, dan budaya di kalangan pemuda melalui program-program strategis yang langsung menyentuh masyarakat.'
  },
  {
    image: '/images/slider/4.jpeg',
    title: 'Energi Pemuda',
    subtitle: 'Menggerakkan Perubahan',
    description: 'Setiap karya dan inovasi pemuda adalah langkah nyata menuju masa depan yang lebih baik dan gemilang.'
  },
  {
    image: '/images/slider/5.jpeg',
    title: 'Generasi Cerdas',
    subtitle: 'Solusi Untuk Negeri',
    description: 'Pemuda adalah kunci utama dalam menjawab berbagai tantangan zaman dengan kreativitas dan kecerdasan.'
  },
  {
    image: '/images/slider/6.jpeg',
    title: 'Semangat Kolaborasi',
    subtitle: 'Merajut Asa, Mewujudkan Cita',
    description: 'Bersama-sama membangun ekosistem yang suportif bagi tumbuh kembangnya potensi pemuda daerah.'
  },
  {
    image: '/images/slider/7.jpeg',
    title: 'Tangguh & Adaptif',
    subtitle: 'Pemuda di Era Digital',
    description: 'Siap menghadapi persaingan global dengan memperkuat literasi digital dan kemampuan wirausaha.'
  },
  {
    image: '/images/slider/8.jpeg',
    title: 'Aksi Nyata',
    subtitle: 'Kepedulian Sosial & Lingkungan',
    description: 'Wujud nyata kepedulian pemuda dalam menjaga kelestarian lingkungan dan membantu sesama.'
  },
  {
    image: '/images/slider/9.jpeg',
    title: 'Kreativitas Tanpa Batas',
    subtitle: 'Wadah Inovasi & Seni',
    description: 'Mengembangkan bakat dan minat pemuda dalam bidang seni, budaya, dan ekonomi kreatif.'
  },
  {
    image: '/images/slider/10.jpeg',
    title: 'Masa Depan Cerah',
    subtitle: 'Pemuda Langsa Berjaya',
    description: 'Menuju Indonesia Emas dengan mencetak generasi muda Kota Langsa yang unggul, berprestasi, dan berakhlak mulia.'
  }
]

const currentSlide = ref(0)
let slideInterval: any

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

// Auto-play slider + ambil berita dari API
onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000)
  ambilBerita()
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

useSeoMeta({
  title: 'KNPI Langsa',
  description: 'Situs resmi Komite Nasional Pemuda Indonesia (KNPI) Kota Langsa.',
})

useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})

// Data Berita Terkini (diambil dari API publik)
const daftarBerita = ref<any[]>([])
const memuatBerita = ref(true)

const formatTanggal = (tanggal: string) => {
  try {
    return new Date(tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return tanggal
  }
}

const ambilBerita = async () => {
  memuatBerita.value = true
  try {
    const res = await $fetch<{ berhasil: boolean; data: any[] }>('/api/publik/berita')
    if (res.berhasil) {
      daftarBerita.value = res.data
    }
  } catch (err) {
    console.error('Gagal memuat berita:', err)
  } finally {
    memuatBerita.value = false
  }
}

// Data Program Kerja
const programKerja = [
  {
    title: 'Pendidikan & Pelatihan',
    desc: 'Peningkatan kapasitas pemuda melalui seminar, lokakarya, dan pelatihan kepemimpinan berkelanjutan.',
    icon: 'LucideGraduationCap',
  },
  {
    title: 'Kewirausahaan Pemuda',
    desc: 'Membina dan memfasilitasi wirausaha muda untuk mendorong kemandirian ekonomi kreatif di Kota Langsa.',
    icon: 'LucideBriefcase',
  },
  {
    title: 'Sosial Kemasyarakatan',
    desc: 'Kegiatan bakti sosial, tanggap bencana, dan pengabdian masyarakat sebagai bentuk nyata kepedulian pemuda.',
    icon: 'LucideHeartHandshake',
  },
  {
    title: 'Inovasi & Teknologi',
    desc: 'Mendorong adaptasi pemuda terhadap perkembangan literasi digital dan pemanfaatan teknologi informasi.',
    icon: 'LucideLightbulb',
  },
]

// Intersection Observer for Animations (Reveal on Scroll)
onMounted(() => {
  const observerCallback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        // Stop observing once animated
        observer.unobserve(entry.target)
      }
    })
  }

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15, // Trigger when 15% is visible
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)

  // Select all elements with the 'reveal' class
  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<style>
/* Custom Scrollbar for the horizontal news list to keep it clean */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
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

/* Delays */
.reveal-delay-100 { transition-delay: 100ms; }
.reveal-delay-200 { transition-delay: 200ms; }
.reveal-delay-300 { transition-delay: 300ms; }
.reveal-delay-400 { transition-delay: 400ms; }

/* Smooth scrolling behavior for anchor links */
html {
  scroll-behavior: smooth;
}
</style>
