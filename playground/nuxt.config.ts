export default defineNuxtConfig({
  modules: [
    'my-module',
    '@pinia/nuxt',
    'nuxt-lucide-icons',
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    // Private (server-only)
    supabaseDatabaseUrl: process.env.NUXT_SUPABASE_DATABASE_URL || '',
    supabaseUrl: process.env.NUXT_SUPABASE_URL || '',
    supabaseServiceRoleKey: process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY || '',
    supabaseStorageBucket: process.env.NUXT_SUPABASE_STORAGE_BUCKET || 'knpi-media',
    supabaseDbPoolSize: Number(process.env.NUXT_SUPABASE_DB_POOL_SIZE || '1'),
    jwtSecret: process.env.NUXT_JWT_SECRET || 'fallback-secret-ganti-segera',

    // Public (exposed ke client)
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'KNPI Langsa',
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000',
    },
  },

  // Pastikan semua path /api/** diarahkan ke Nitro server, bukan Vue Router
  routeRules: {
    '/api/**': { ssr: false },
  },
  compatibilityDate: 'latest',

  tailwindcss: {
    configPath: '~/tailwind.config.ts',
    exposeConfig: false,
  },
})
