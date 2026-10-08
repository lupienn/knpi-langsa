<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

useHead({
  htmlAttrs: {
    lang: 'id',
    class: 'dark',
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
  ],
})

onMounted(async () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('knpi-theme')
  }
  authStore.inisialisasiDariCookie()
  if (authStore.terautentikasi && !authStore.penggunaLogin) {
    await authStore.ambilProfil()
  }
})
</script>
