import { defineStore } from 'pinia'

export const usePageTitleStore = defineStore('pageTitle', () => {
  const currentTitle = ref('')
  const title = ref('')

  return { currentTitle, title }
})
