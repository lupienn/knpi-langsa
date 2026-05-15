<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-knpi-500 selection:text-white">
    <!-- Navbar -->
    <header class="sticky top-0 z-50 w-full border-b border-white/10 bg-[#003399] shadow-lg">
      <div class="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 64 64"
            fill="none"
            class="drop-shadow-md"
          >
            <path
              d="M32 4L8 16V34C8 47.3 18.4 59.8 32 63C45.6 59.8 56 47.3 56 34V16L32 4Z"
              fill="#FFD700"
            />
            <text
              x="32"
              y="38"
              text-anchor="middle"
              font-family="system-ui,sans-serif"
              font-size="14"
              font-weight="900"
              fill="#003399"
              letter-spacing="0.5"
            >KNPI</text>
          </svg>
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
      <section
        id="beranda"
        class="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <!-- Hero Left: Text -->
            <div class="reveal max-w-2xl">
              <div class="inline-flex items-center gap-2 rounded-full bg-[#003399]/10 px-3 py-1.5 text-sm font-bold text-[#003399] mb-6 border border-[#003399]/20">
                <span class="relative flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#003399] opacity-75" />
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#003399]" />
                </span>
                Pemuda Hebat
              </div>
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Sinergi <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#003399] to-knpi-500">Pemuda</span> Membangun Kota Langsa
              </h1>
              <p class="mt-6 text-lg leading-relaxed text-slate-600">
                Komite Nasional Pemuda Indonesia (KNPI) adalah wadah berhimpunnya organisasi kemasyarakatan pemuda (OKP) di Indonesia. KNPI Kota Langsa berkomitmen untuk menjadi motor penggerak pembangunan daerah dan mencetak pemimpin masa depan yang berintegritas.
              </p>
              <div class="mt-8 flex flex-wrap gap-4">
                <a
                  href="#berita"
                  class="flex items-center gap-2 rounded-full bg-[#003399] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  Jelajahi Berita
                  <LucideArrowRight :size="16" />
                </a>
                <a
                  href="#visi-misi"
                  class="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
                >
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </div>

            <!-- Hero Right: Image & Geometry -->
            <div class="reveal reveal-delay-200 relative lg:ml-auto w-full max-w-sm lg:max-w-md mx-auto aspect-[3/4]">
              <!-- Geometric Background Accents -->
              <div class="absolute -top-10 -right-10 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" />
              <div class="absolute -bottom-12 -left-12 w-80 h-80 bg-[#003399] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-slow" />

              <!-- Abstract Frame -->
              <div class="absolute inset-0 border-2 border-[#003399]/20 rounded-[2.5rem] transform rotate-3 scale-105 transition-transform duration-700 hover:rotate-6" />
              <div class="absolute inset-0 bg-gradient-to-tr from-[#003399] to-blue-600 rounded-[2.5rem] transform -rotate-2 opacity-10" />

              <!-- Actual Image Card -->
              <div class="absolute inset-0 bg-white p-2 rounded-[2.5rem] shadow-2xl group transform transition-transform duration-500 hover:-translate-y-2">
                <div class="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-100">
                  <img
                    src="~/assets/ketua-knpi.jpeg"
                    alt="Foto Ketua KNPI Kota Langsa"
                    class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  >

                  <!-- Gradient Overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-[#003399]/90 via-[#003399]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                  <!-- Text Information -->
                  <div class="absolute bottom-0 w-full p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p class="text-white font-extrabold text-2xl drop-shadow-lg mb-2">
                      Dr. RIZKI MAULANA, S.Sos, SH., MSP., MH
                    </p>
                    <div class="inline-block bg-[#FFD700] text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                      Ketua DPD KNPI Kota Langsa
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Visi & Misi Section -->
      <section
        id="visi-misi"
        class="py-24 bg-white"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="reveal text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Visi & Misi
            </h2>
            <div class="mt-4 h-1.5 w-24 bg-[#FFD700] mx-auto rounded-full" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <!-- Visi -->
            <div class="reveal reveal-delay-100 flex flex-col p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#003399]/10 text-[#003399] mb-6">
                <LucideTarget :size="28" />
              </div>
              <h3 class="text-2xl font-bold text-slate-900 mb-4">
                Visi
              </h3>
              <p class="text-slate-600 leading-relaxed font-medium text-xl italic text-center">
                "Pemuda Hebat"
              </p>
            </div>

            <!-- Misi -->
            <div class="reveal reveal-delay-200 flex flex-col p-8 rounded-3xl bg-[#003399] text-white shadow-xl shadow-blue-900/20">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#FFD700] mb-6 backdrop-blur-sm">
                <LucideUsers :size="28" />
              </div>
              <h3 class="text-2xl font-bold text-white mb-6">
                Misi
              </h3>
              <ul class="space-y-4">
                <li class="flex items-start gap-3">
                  <LucideCheckCircle2
                    :size="20"
                    class="text-[#FFD700] shrink-0 mt-0.5"
                  />
                  <span class="text-blue-100/90 leading-relaxed">Konsolidasi Penguatan Kelembagaan dan Kaderisasi OKP,</span>
                </li>
                <li class="flex items-start gap-3">
                  <LucideCheckCircle2
                    :size="20"
                    class="text-[#FFD700] shrink-0 mt-0.5"
                  />
                  <span class="text-blue-100/90 leading-relaxed">Mendorong Kemandirian Pemuda berbasis Entrepreneur, Ekonomi Kreatif, dan Literasi,</span>
                </li>
                <li class="flex items-start gap-3">
                  <LucideCheckCircle2
                    :size="20"
                    class="text-[#FFD700] shrink-0 mt-0.5"
                  />
                  <span class="text-blue-100/90 leading-relaxed">Relasi Sinergis Pemuda dan Pemerintah sebagai Mitra Strategis dalam Pembangunan Daerah,</span>
                </li>
                <li class="flex items-start gap-3">
                  <LucideCheckCircle2
                    :size="20"
                    class="text-[#FFD700] shrink-0 mt-0.5"
                  />
                  <span class="text-blue-100/90 leading-relaxed">Revitalisasi Semangat Pemuda dalam pembentukan Integritas untuk menjawab tantangan Global dan ancaman Narkoba melalui wawasan kebangsaan dan Karakter Islamiah.</span>
                </li>
              </ul>
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
            <!-- News Cards -->
            <div
              v-for="i in 5"
              :key="i"
              class="snap-start shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col overflow-hidden"
            >
              <div class="aspect-[16/10] bg-slate-200 overflow-hidden relative">
                <div class="absolute inset-0 bg-[#003399]/5 group-hover:bg-transparent transition-colors z-10" />
                <LucideImage
                  :size="40"
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400"
                />
                <div class="absolute top-4 left-4 z-20 bg-[#FFD700] text-amber-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Kegiatan
                </div>
              </div>
              <div class="p-6 flex-1 flex flex-col">
                <div class="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                  <LucideCalendar :size="14" />
                  <span>{{ new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#003399] transition-colors line-clamp-2">
                  Pemuda KNPI Langsa Menggelar Aksi Bakti Sosial Membersihkan Lingkungan
                </h3>
                <p class="text-sm text-slate-500 line-clamp-2 mb-6 flex-1">
                  Sebagai bentuk kepedulian terhadap lingkungan, pengurus DPD KNPI Kota Langsa bersama dengan masyarakat sekitar melakukan gotong royong massal...
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
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#003399] to-knpi-500">
                <span class="text-xs font-extrabold text-[#FFD700]">KNPI</span>
              </div>
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
definePageMeta({ layout: false })

useSeoMeta({
  title: 'Beranda — KNPI Langsa',
  description: 'Situs resmi Komite Nasional Pemuda Indonesia (KNPI) Kota Langsa.',
})

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
