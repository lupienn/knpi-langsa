<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-knpi-500 selection:text-white flex flex-col">
    <!-- Navbar -->
    <header class="sticky top-0 z-50 w-full border-b border-white/10 bg-[#003399] shadow-lg">
      <div class="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img src="~/assets/logo-knpi.png" alt="Logo KNPI Langsa" class="h-9 w-auto drop-shadow-md" />
          <span class="text-xl font-extrabold tracking-wide text-white hidden sm:block">KNPI Langsa</span>
        </NuxtLink>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            to="/#beranda"
            class="text-sm font-medium text-white/80 hover:text-white transition-colors pb-1"
          >Beranda</NuxtLink>
          <NuxtLink
            to="/#berita"
            class="text-sm font-semibold text-[#FFD700] border-b-2 border-[#FFD700] pb-1"
          >Berita</NuxtLink>
          <NuxtLink
            to="/#pinjam-gedung"
            class="text-sm font-medium text-white/80 hover:text-white transition-colors pb-1"
          >Pinjam Pakai Gedung</NuxtLink>
        </nav>

        <!-- Right: Login Button -->
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/"
            class="flex items-center gap-1.5 text-sm font-bold text-white/90 hover:text-white"
          >
            <LucideArrowLeft :size="16" />
            <span class="hidden sm:block">Kembali</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-4xl">
      <!-- Loading State -->
      <div v-if="memuat" class="flex flex-col items-center justify-center py-32">
        <div class="w-12 h-12 border-4 border-[#003399] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-slate-500 font-medium">Memuat berita...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-32 bg-white rounded-3xl shadow-sm border border-slate-100">
        <LucideAlertCircle :size="64" class="mx-auto text-red-400 mb-6" />
        <h2 class="text-2xl font-bold text-slate-900 mb-2">Berita Tidak Ditemukan</h2>
        <p class="text-slate-500 mb-8">Berita yang Anda cari mungkin sudah dihapus atau URL tidak valid.</p>
        <NuxtLink to="/" class="inline-flex items-center gap-2 rounded-full bg-[#003399] px-6 py-3 text-sm font-bold text-white shadow-lg hover:-translate-y-1 hover:bg-blue-800 transition duration-300">
          <LucideHome :size="18" />
          Kembali ke Beranda
        </NuxtLink>
      </div>

      <!-- Content -->
      <article v-else-if="berita" class="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <!-- Hero Image -->
        <div class="relative w-full aspect-[16/9] md:aspect-[21/9] bg-slate-200 overflow-hidden group">
          <img v-if="berita.gambarUrl" :src="berita.gambarUrl" :alt="berita.judul" class="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105" />
          <div v-else class="absolute inset-0 flex items-center justify-center">
            <LucideImage :size="64" class="text-slate-400" />
          </div>
          
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <!-- Category Badge -->
          <div class="absolute top-6 left-6 z-20 bg-[#FFD700] text-amber-900 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
            {{ berita.kategori }}
          </div>
          
          <!-- Title on Hero -->
          <div class="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20">
            <h1 class="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 drop-shadow-md">
              {{ berita.judul }}
            </h1>
            <div class="flex flex-wrap items-center gap-4 text-sm text-white/80 font-medium">
              <div class="flex items-center gap-1.5">
                <LucideCalendar :size="16" />
                <span>{{ formatTanggal(berita.createdAt) }}</span>
              </div>
              <div v-if="berita.penulis" class="flex items-center gap-1.5">
                <LucideUser :size="16" />
                <span>Oleh {{ berita.penulis }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="p-6 md:p-12">
          <!-- Summary/Lead -->
          <p class="text-lg md:text-xl text-[#003399] font-medium leading-relaxed mb-8 pb-8 border-b border-slate-100 italic">
            {{ berita.ringkasan }}
          </p>
          
          <!-- Main Content -->
          <div class="prose prose-lg prose-slate max-w-none text-slate-700 leading-loose" style="white-space: pre-wrap;">{{ berita.konten }}</div>
        </div>
        
        <!-- Footer actions -->
        <div class="bg-slate-50 p-6 md:p-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-sm font-bold text-slate-500 uppercase tracking-wider">Bagikan Berita Ini</span>
          <div class="flex items-center gap-3">
            <button class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors" @click="bagikan('facebook')">
              <LucideFacebook :size="18" />
            </button>
            <button class="w-10 h-10 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors" @click="bagikan('twitter')">
              <LucideTwitter :size="18" />
            </button>
            <button class="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-600 hover:text-white transition-colors" @click="salinLink">
              <LucideLink :size="18" />
            </button>
          </div>
        </div>
      </article>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-300 py-10 mt-auto">
      <div class="container mx-auto px-4 text-center">
        <p class="text-sm text-slate-500">
          &copy; {{ new Date().getFullYear() }} KNPI Kota Langsa. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({ layout: false })

const route = useRoute()
const memuat = ref(true)
const error = ref(false)
const berita = ref<any>(null)

const formatTanggal = (tanggal: string) => {
  try {
    return new Date(tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return tanggal
  }
}

onMounted(async () => {
  const id = route.params.id
  if (!id) {
    error.value = true
    memuat.value = false
    return
  }

  try {
    const res = await $fetch<{ berhasil: boolean; data: any }>(`/api/publik/berita/${id}`)
    if (res.berhasil) {
      berita.value = res.data
      
      // Update meta tags for SEO
      useSeoMeta({
        title: `${res.data.judul} — KNPI Langsa`,
        description: res.data.ringkasan,
        ogImage: res.data.gambarUrl,
      })
    } else {
      error.value = true
    }
  } catch (err) {
    console.error('Gagal memuat berita:', err)
    error.value = true
  } finally {
    memuat.value = false
  }
})

const bagikan = (platform: string) => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(berita.value?.judul || 'Berita KNPI Langsa')
  
  if (platform === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  } else if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
  }
}

const salinLink = () => {
  navigator.clipboard.writeText(window.location.href)
  alert('Link berita disalin ke clipboard!')
}
</script>
