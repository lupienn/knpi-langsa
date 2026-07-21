<template>
  <div class="flex flex-col gap-6">
    <!-- ====== HEADER BANNER ====== -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900/60 to-knpi-950 p-6 sm:p-8 shadow-2xl border border-emerald-500/20">
      <div class="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />
      <div class="pointer-events-none absolute -bottom-10 left-20 h-40 w-40 rounded-full bg-teal-400/20 blur-2xl" />
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-semibold text-emerald-300 mb-3">
            <LucideBuilding2 :size="14" />
            <span>Layanan Graha Pemuda</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Permohonan Pinjam Pakai Gedung
          </h2>
          <p class="mt-1 text-sm text-slate-300/80">
            Pusat verifikasi pengajuan, persetujuan jadwal, dan manajemen penggunaan Graha Pemuda DPD KNPI Kota Langsa.
          </p>
        </div>
      </div>
    </div>

    <!-- ====== METRIC CARDS ====== -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <!-- Total -->
      <div class="glass-card p-4 flex items-center gap-3.5 border-emerald-500/20">
        <div class="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
          <LucideBuilding2 :size="20" />
        </div>
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Pengajuan</p>
          <p class="text-xl font-extrabold text-white mt-0.5">{{ daftarData.length }}</p>
        </div>
      </div>

      <!-- Menunggu -->
      <div class="glass-card p-4 flex items-center gap-3.5 border-amber-500/20">
        <div class="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
          <LucideClock :size="20" />
        </div>
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Menunggu Verifikasi</p>
          <p class="text-xl font-extrabold text-amber-400 mt-0.5">{{ totalMenunggu }}</p>
        </div>
      </div>

      <!-- Disetujui -->
      <div class="glass-card p-4 flex items-center gap-3.5 border-emerald-500/20">
        <div class="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
          <LucideCheckCircle2 :size="20" />
        </div>
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Disetujui</p>
          <p class="text-xl font-extrabold text-emerald-400 mt-0.5">{{ totalDisetujui }}</p>
        </div>
      </div>

      <!-- Ditolak -->
      <div class="glass-card p-4 flex items-center gap-3.5 border-red-500/20">
        <div class="p-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
          <LucideXCircle :size="20" />
        </div>
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Ditolak</p>
          <p class="text-xl font-extrabold text-red-400 mt-0.5">{{ totalDitolak }}</p>
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
          placeholder="Cari nama pemohon, organisasi, atau keperluan..."
          class="w-full rounded-xl border border-white/10 bg-slate-900/80 pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
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
              ? 'border-emerald-500/40 bg-emerald-600/25 text-emerald-300 shadow-sm'
              : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'"
            @click="filterAktif = tab.value"
          >
            <span>{{ tab.label }}</span>
            <span
              class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
              :class="filterAktif === tab.value ? 'bg-emerald-500/30 text-emerald-200' : 'bg-white/10 text-slate-400'"
            >
              {{ hitungFilter(tab.value) }}
            </span>
          </button>
        </div>

        <!-- View Switcher -->
        <div class="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/5 ml-auto md:ml-0">
          <button
            class="p-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
            :class="tampilanMode === 'grid' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'"
            title="Tampilan Kartu Grid"
            @click="tampilanMode = 'grid'"
          >
            <LucideLayoutGrid :size="15" />
          </button>
          <button
            class="p-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
            :class="tampilanMode === 'tabel' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'"
            title="Tampilan Tabel Data"
            @click="tampilanMode = 'tabel'"
          >
            <LucideList :size="15" />
          </button>
        </div>
      </div>
    </div>

    <!-- ====== SKELETON LOADING STATE ====== -->
    <div v-if="sedangMemuat" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="i in 4" :key="'skel-' + i" class="glass-card p-5 flex flex-col space-y-4 animate-pulse">
        <div class="flex justify-between items-center">
          <div class="h-4 bg-slate-800/80 rounded w-1/3" />
          <div class="h-5 bg-slate-800/60 rounded-full w-20" />
        </div>
        <div class="h-12 bg-slate-800/50 rounded-xl" />
        <div class="flex justify-between items-center pt-2 border-t border-white/5">
          <div class="h-4 bg-slate-800/60 rounded w-1/2" />
          <div class="h-8 bg-slate-800/60 rounded-lg w-24" />
        </div>
      </div>
    </div>

    <!-- ====== EMPTY STATE ====== -->
    <div
      v-else-if="dataFiltered.length === 0"
      class="glass-card flex flex-col items-center justify-center py-20 gap-4 text-center px-6"
    >
      <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
        <LucideBuilding2 :size="32" />
      </div>
      <div>
        <h3 class="text-white font-bold text-lg">Tidak Ada Permohonan Ditemukan</h3>
        <p class="text-slate-400 text-sm mt-1 max-w-md">
          {{ kataKunciCari ? `Tidak ada pengajuan pinjam gedung yang cocok dengan pencarian "${kataKunciCari}".` : 'Permohonan pinjam gedung yang diajukan masyarakat atau organisasi akan tampil di sini.' }}
        </p>
      </div>
      <button
        v-if="kataKunciCari"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition"
        @click="kataKunciCari = ''"
      >
        <LucideRotateCcw :size="14" /> Reset Pencarian
      </button>
    </div>

    <!-- ====== TAMPILAN GRID CARDS ====== -->
    <div v-else-if="tampilanMode === 'grid'" class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
      <div
        v-for="item in dataFiltered"
        :key="item.id"
        class="glass-card group flex flex-col justify-between p-5 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.02]"
      >
        <div>
          <!-- Card Header Info & Status -->
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-bold text-white text-base truncate">{{ item.namaPemohon }}</h4>
                <span class="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300">
                  {{ item.organisasi }}
                </span>
              </div>
              <p class="text-xs text-emerald-400 font-medium mt-1">
                📞 {{ item.noHp }} <span v-if="item.email" class="text-slate-400 font-normal">· ✉️ {{ item.email }}</span>
              </p>
            </div>

            <!-- Status Pill -->
            <span
              class="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border shadow-sm"
              :class="kelasStatus(item.status)"
            >
              <span class="h-1.5 w-1.5 rounded-full" :class="dotStatus(item.status)" />
              {{ labelStatus(item.status) }}
            </span>
          </div>

          <!-- Keperluan Box -->
          <div class="mt-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <p class="text-xs text-slate-200 font-medium leading-relaxed">
              <span class="text-slate-400 font-normal">Keperluan:</span> {{ item.keperluan }}
            </p>
            <p v-if="item.keterangan" class="text-xs text-slate-400 leading-relaxed">
              <span class="text-slate-500">Keterangan:</span> {{ item.keterangan }}
            </p>
            <div v-if="item.catatanAdmin" class="mt-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-medium">
              Catatan Admin: {{ item.catatanAdmin }}
            </div>
          </div>
        </div>

        <!-- Footer Meta & Actions -->
        <div class="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
            <LucideCalendar :size="14" class="text-emerald-400" />
            <span>{{ formatTanggal(item.tanggalMulai) }}</span>
            <span class="text-slate-500">s/d</span>
            <span>{{ formatTanggal(item.tanggalSelesai) }}</span>
          </div>

          <div class="flex items-center gap-2">
            <!-- Detail Button -->
            <button
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition cursor-pointer"
              title="Lihat Detail"
              @click="bukaDetail(item)"
            >
              <LucideEye :size="14" /> Detail
            </button>

            <!-- Approve Button -->
            <button
              v-if="item.status === 'menunggu'"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition cursor-pointer"
              title="Setujui Permohonan"
              @click="ubahStatus(item, 'disetujui')"
            >
              <LucideCheck :size="14" /> Setujui
            </button>

            <!-- Reject Button -->
            <button
              v-if="item.status === 'menunggu'"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition cursor-pointer"
              title="Tolak Permohonan"
              @click="ubahStatus(item, 'ditolak')"
            >
              <LucideX :size="14" /> Tolak
            </button>

            <!-- Delete Button -->
            <button
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
              title="Hapus Permohonan"
              @click="konfirmasiHapus(item)"
            >
              <LucideTrash2 :size="14" /> Hapus
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
              <th class="px-5 py-3.5">Pemohon &amp; Organisasi</th>
              <th class="px-5 py-3.5">Keperluan</th>
              <th class="px-5 py-3.5">Jadwal Pinjam</th>
              <th class="px-5 py-3.5">Status</th>
              <th class="px-5 py-3.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/[0.04]">
            <tr
              v-for="item in dataFiltered"
              :key="'tbl-' + item.id"
              class="transition-colors hover:bg-white/[0.02]"
            >
              <td class="px-5 py-4">
                <p class="font-bold text-white text-xs sm:text-sm">{{ item.namaPemohon }}</p>
                <p class="text-xs text-emerald-400 mt-0.5 font-medium">{{ item.organisasi }} · <span class="text-slate-400 font-normal">{{ item.noHp }}</span></p>
              </td>
              <td class="px-5 py-4 max-w-xs">
                <p class="text-xs text-slate-300 truncate">{{ item.keperluan }}</p>
              </td>
              <td class="px-5 py-4 text-xs text-slate-300 whitespace-nowrap">
                {{ formatTanggal(item.tanggalMulai) }} — {{ formatTanggal(item.tanggalSelesai) }}
              </td>
              <td class="px-5 py-4 whitespace-nowrap">
                <span class="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border" :class="kelasStatus(item.status)">
                  <span class="h-1.5 w-1.5 rounded-full" :class="dotStatus(item.status)" />
                  {{ labelStatus(item.status) }}
                </span>
              </td>
              <td class="px-5 py-4 text-right whitespace-nowrap">
                <div class="flex items-center justify-end gap-1.5">
                  <button class="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer" title="Detail" @click="bukaDetail(item)">
                    <LucideEye :size="14" />
                  </button>
                  <button v-if="item.status === 'menunggu'" class="p-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition cursor-pointer" title="Setujui" @click="ubahStatus(item, 'disetujui')">
                    <LucideCheck :size="14" />
                  </button>
                  <button v-if="item.status === 'menunggu'" class="p-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition cursor-pointer" title="Tolak" @click="ubahStatus(item, 'ditolak')">
                    <LucideX :size="14" />
                  </button>
                  <button class="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer" title="Hapus" @click="konfirmasiHapus(item)">
                    <LucideTrash2 :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ====== MODAL DETAIL PERMOHONAN ====== -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="tampilDetail"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        @click.self="tampilDetail = false"
      >
        <div class="glass-card w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-slate-900/60">
            <div class="flex items-center gap-2.5">
              <span class="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <LucideBuilding2 :size="18" />
              </span>
              <div>
                <h3 class="text-base font-bold text-white">Detail Permohonan Pinjam Gedung</h3>
                <p class="text-[11px] text-slate-400">Informasi lengkap pengajuan pemakaian Graha Pemuda</p>
              </div>
            </div>
            <button class="p-1.5 rounded-lg text-slate-400 hover:text-white transition cursor-pointer" @click="tampilDetail = false">
              <LucideX :size="18" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
            <div
              v-for="field in detailFields"
              :key="field.label"
              class="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-white/5 text-xs gap-1"
            >
              <span class="text-slate-400 font-medium">{{ field.label }}</span>
              <span class="text-white font-semibold text-right">{{ field.value || '—' }}</span>
            </div>

            <div v-if="detailItem?.catatanAdmin" class="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
              <span class="font-bold text-amber-300 block mb-1">Catatan Admin:</span>
              <span class="text-slate-300">{{ detailItem.catatanAdmin }}</span>
            </div>
          </div>

          <div class="p-4 border-t border-white/[0.08] bg-slate-900/40 flex justify-end">
            <button
              class="rounded-xl border border-white/10 bg-white/5 px-6 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 transition cursor-pointer"
              @click="tampilDetail = false"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ====== MODAL UBAH STATUS (SETUJUI / TOLAK) ====== -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="tampilUbahStatus"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        @click.self="tampilUbahStatus = false"
      >
        <div class="glass-card w-full max-w-md p-6 relative shadow-2xl">
          <div class="absolute inset-x-0 top-0 h-[1px]" :class="statusBaru === 'disetujui' ? 'bg-emerald-500' : 'bg-amber-500'" />

          <h3 class="text-base font-bold text-white mb-1">
            {{ statusBaru === 'disetujui' ? 'Setujui Permohonan' : 'Tolak Permohonan' }}
          </h3>
          <p class="text-xs text-slate-400 mb-4">
            Pemohon: <span class="text-white font-semibold">{{ itemUbahStatus?.namaPemohon }}</span> ({{ itemUbahStatus?.organisasi }})
          </p>

          <form @submit.prevent="prosesUbahStatus" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Catatan Admin (Opsional)</label>
              <textarea
                v-model="catatanAdmin"
                rows="3"
                placeholder="Berikan catatan persetujuan atau alasan penolakan..."
                class="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 resize-none"
              />
            </div>

            <div class="flex gap-3">
              <button
                type="button"
                class="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition cursor-pointer"
                @click="tampilUbahStatus = false"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="sedangUpdate"
                class="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-lg transition cursor-pointer"
                :class="statusBaru === 'disetujui' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20' : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'"
              >
                <LucideLoader v-if="sedangUpdate" :size="15" class="animate-spin" />
                <span>{{ sedangUpdate ? 'Memproses...' : 'Konfirmasi' }}</span>
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
        v-if="tampilHapus"
        class="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        @click.self="tampilHapus = false"
      >
        <div class="glass-card w-full max-w-sm p-6 text-center relative overflow-hidden shadow-2xl">
          <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/15 text-red-400 shadow-inner">
            <LucideTrash2 :size="26" />
          </div>
          <h3 class="text-base font-bold text-white">Hapus Permohonan Ini?</h3>
          <p class="mt-1.5 text-xs leading-relaxed text-slate-400">
            Permohonan dari <span class="text-white font-semibold">"{{ itemDihapus?.namaPemohon }}"</span> akan dihapus permanen.
          </p>
          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition cursor-pointer"
              @click="tampilHapus = false"
            >
              Batal
            </button>
            <button
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-2.5 text-xs font-bold text-white shadow-lg hover:brightness-110 disabled:opacity-60 transition cursor-pointer"
              :disabled="sedangHapus"
              @click="prosesHapus"
            >
              <LucideLoader v-if="sedangHapus" :size="14" class="animate-spin" />
              <span>{{ sedangHapus ? 'Menghapus...' : 'Ya, Hapus' }}</span>
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
        <LucideCheckCircle v-if="toast.tipe === 'sukses'" :size="18" />
        <LucideXCircle v-else :size="18" />
        <span class="text-xs font-semibold">{{ toast.pesan }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

interface PinjamItem {
  id: number
  namaPemohon: string
  organisasi: string
  noHp: string
  email: string | null
  keperluan: string
  keterangan: string | null
  tanggalMulai: string
  tanggalSelesai: string
  status: string
  catatanAdmin: string | null
  createdAt: string
  updatedAt: string
}

const authStore = useAuthStore()
const daftarData = ref<PinjamItem[]>([])
const sedangMemuat = ref(true)
const filterAktif = ref('semua')
const kataKunciCari = ref('')
const tampilanMode = ref<'grid' | 'tabel'>('grid')

const tabFilter = [
  { label: 'Semua', value: 'semua' },
  { label: 'Menunggu', value: 'menunggu' },
  { label: 'Disetujui', value: 'disetujui' },
  { label: 'Ditolak', value: 'ditolak' },
]

// Computed Quick Stats Metrics
const totalMenunggu = computed(() => daftarData.value.filter(d => d.status === 'menunggu').length)
const totalDisetujui = computed(() => daftarData.value.filter(d => d.status === 'disetujui').length)
const totalDitolak = computed(() => daftarData.value.filter(d => d.status === 'ditolak').length)

function hitungFilter(val: string) {
  let list = daftarData.value
  if (kataKunciCari.value.trim()) {
    const q = kataKunciCari.value.toLowerCase()
    list = list.filter(d =>
      d.namaPemohon.toLowerCase().includes(q) ||
      d.organisasi.toLowerCase().includes(q) ||
      d.keperluan.toLowerCase().includes(q)
    )
  }
  if (val === 'semua') return list.length
  return list.filter(d => d.status === val).length
}

const dataFiltered = computed(() => {
  let list = daftarData.value

  if (kataKunciCari.value.trim()) {
    const q = kataKunciCari.value.toLowerCase()
    list = list.filter(d =>
      d.namaPemohon.toLowerCase().includes(q) ||
      d.organisasi.toLowerCase().includes(q) ||
      d.keperluan.toLowerCase().includes(q)
    )
  }

  if (filterAktif.value === 'semua') return list
  return list.filter(d => d.status === filterAktif.value)
})

// Detail
const tampilDetail = ref(false)
const detailItem = ref<PinjamItem | null>(null)
const detailFields = computed(() => {
  if (!detailItem.value) return []
  const d = detailItem.value
  return [
    { label: 'Nama Pemohon', value: d.namaPemohon },
    { label: 'Organisasi', value: d.organisasi },
    { label: 'No. HP', value: d.noHp },
    { label: 'Email', value: d.email },
    { label: 'Keperluan', value: d.keperluan },
    { label: 'Keterangan', value: d.keterangan },
    { label: 'Tanggal Mulai', value: formatTanggal(d.tanggalMulai) },
    { label: 'Tanggal Selesai', value: formatTanggal(d.tanggalSelesai) },
    { label: 'Diajukan Pada', value: formatTanggal(d.createdAt) },
  ]
})

// Status update
const tampilUbahStatus = ref(false)
const sedangUpdate = ref(false)
const statusBaru = ref('')
const catatanAdmin = ref('')
const itemUbahStatus = ref<PinjamItem | null>(null)

// Delete
const tampilHapus = ref(false)
const sedangHapus = ref(false)
const itemDihapus = ref<PinjamItem | null>(null)

// Toast
const toast = reactive({ tampil: false, pesan: '', tipe: 'sukses' as 'sukses' | 'error' })
function tampilkanToast(pesan: string, tipe: 'sukses' | 'error' = 'sukses') {
  toast.pesan = pesan
  toast.tipe = tipe
  toast.tampil = true
  setTimeout(() => {
    toast.tampil = false
  }, 3000)
}

function formatTanggal(tgl: string) {
  try {
    return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  }
  catch {
    return tgl
  }
}

function labelStatus(s: string) {
  const map: Record<string, string> = { menunggu: 'Menunggu', disetujui: 'Disetujui', ditolak: 'Ditolak' }
  return map[s] || s
}

function kelasStatus(s: string) {
  const map: Record<string, string> = {
    menunggu: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    disetujui: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    ditolak: 'bg-red-500/10 text-red-300 border-red-500/25',
  }
  return map[s] || ''
}

function dotStatus(s: string) {
  const map: Record<string, string> = {
    menunggu: 'bg-amber-400',
    disetujui: 'bg-emerald-400',
    ditolak: 'bg-red-400',
  }
  return map[s] || ''
}

async function muatData() {
  sedangMemuat.value = true
  try {
    const res = await $fetch<{ data: PinjamItem[] }>('/api/pinjam-gedung', { headers: { Authorization: `Bearer ${authStore.token}` } })
    daftarData.value = res.data
  }
  catch {
    tampilkanToast('Gagal memuat data permohonan.', 'error')
  }
  finally {
    sedangMemuat.value = false
  }
}

function bukaDetail(item: PinjamItem) {
  detailItem.value = item
  tampilDetail.value = true
}

function ubahStatus(item: PinjamItem, status: string) {
  itemUbahStatus.value = item
  statusBaru.value = status
  catatanAdmin.value = ''
  tampilUbahStatus.value = true
}

async function prosesUbahStatus() {
  if (!itemUbahStatus.value) return
  sedangUpdate.value = true
  try {
    await $fetch(`/api/pinjam-gedung/${itemUbahStatus.value.id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: { status: statusBaru.value, catatanAdmin: catatanAdmin.value },
    })
    tampilkanToast(`Permohonan berhasil ${statusBaru.value === 'disetujui' ? 'disetujui' : 'ditolak'}.`)
    tampilUbahStatus.value = false
    await muatData()
  }
  catch {
    tampilkanToast('Gagal memperbarui status.', 'error')
  }
  finally {
    sedangUpdate.value = false
  }
}

function konfirmasiHapus(item: PinjamItem) {
  itemDihapus.value = item
  tampilHapus.value = true
}

async function prosesHapus() {
  if (!itemDihapus.value) return
  sedangHapus.value = true
  try {
    await $fetch(`/api/pinjam-gedung/${itemDihapus.value.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    tampilkanToast('Permohonan berhasil dihapus.')
    tampilHapus.value = false
    itemDihapus.value = null
    await muatData()
  }
  catch {
    tampilkanToast('Gagal menghapus permohonan.', 'error')
  }
  finally {
    sedangHapus.value = false
  }
}

onMounted(() => muatData())

useSeoMeta({
  title: 'Pinjam Pakai Gedung — KNPI Langsa',
  description: 'Kelola permohonan pinjam pakai gedung KNPI Kota Langsa.',
})
</script>
