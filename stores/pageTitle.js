import { defineStore } from 'pinia'

export const usePageTitleStore = defineStore('pageTitle', () => {
  const currentTitle = ref('')

  const getCurrentTitle = (title) => {
    console.log('getCurrentTitle', title)
    currentTitle.value = title
  }
  return { currentTitle, getCurrentTitle }
})
