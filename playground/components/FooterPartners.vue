<template>
  <div class="border-t border-white/[0.08] pt-8 text-center">
    <div class="flex items-center justify-center gap-4 sm:gap-10 mb-6">
      <img
        src="~/assets/logo-knpi.png"
        alt="Logo DPD KNPI Kota Langsa"
        class="h-12 w-10 sm:h-16 sm:w-14 object-contain"
        width="250"
        height="254"
        loading="lazy"
        decoding="async"
      >
      <img
        src="~/assets/logo-langsa-juara.png"
        alt="Logo Langsa Juara"
        class="h-16 w-24 sm:h-20 sm:w-36 object-contain"
        width="2796"
        height="1519"
        loading="lazy"
        decoding="async"
      >
      <img
        src="~/assets/logo-osn.png"
        alt="Logo OSN — PT One Seulanga Nusantara"
        class="h-16 w-28 sm:h-20 sm:w-44 object-contain brightness-0 invert"
        width="2172"
        height="724"
        loading="lazy"
        decoding="async"
      >
    </div>
    <p class="text-xs leading-relaxed text-slate-400">
      Copyright &copy; {{ new Date().getFullYear() }} DPD KNPI KOTA LANGSA x OSN
    </p>
  </div>
</template>
