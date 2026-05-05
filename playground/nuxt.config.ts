export default defineNuxtConfig({
  modules: [
    'my-module',
    '@pinia/nuxt',
    'nuxt-lucide-icons',
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },
  compatibilityDate: 'latest',

  css: ['~/assets/css/tailwind.css'],

  tailwindcss: {
    configPath: '~/tailwind.config.ts',
    exposeConfig: false,
  },

  runtimeConfig: {
    // Private (server-only)
    dbHost: process.env.NUXT_DB_HOST || '127.0.0.1',
    dbPort: process.env.NUXT_DB_PORT || '3306',
    dbDatabase: process.env.NUXT_DB_DATABASE || 'knpi-langsa',
    dbUsername: process.env.NUXT_DB_USERNAME || 'root',
    dbPassword: process.env.NUXT_DB_PASSWORD || '',
    jwtSecret: process.env.NUXT_JWT_SECRET || 'fallback-secret-ganti-segera',

    // Public (exposed ke client)
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'KNPI Langsa',
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000',
    },
  },

  myModule: {},
})
