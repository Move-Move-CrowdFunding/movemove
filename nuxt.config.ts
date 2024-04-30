// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/stylelint-module', '@nuxtjs/tailwindcss'],
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
  css: ["~/assets/style/root.scss"]

})
