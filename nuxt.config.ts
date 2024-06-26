// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  colorMode: {
    preference: 'light'
  },
  app: {
    head: {
      title: 'movemove 募募',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  modules: [
    '@nuxtjs/stylelint-module',
    // '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-swiper',
    '@pinia/nuxt',
    '@nuxt/ui',
    'dayjs-nuxt'
  ],
  typescript: {
    typeCheck: true
  },
  stylelint: {
    lintOnStart: false, // 專案啟動時不自動檢查所有相關檔案
    chokidar: true, // 監聽文件異動進行檢核（文件未列出此選項）
    cache: false
  },
  postcss: {
    // css 屬性加上相容性前綴
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  dayjs: {},
  css: ['~/assets/style/root.scss'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  }
})
