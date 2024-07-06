import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', () => {
  const searchKeyword = ref('')
  const mobileMenuShow = ref(false)
  const searching = ref(false)
  return { searchKeyword, mobileMenuShow, searching }
})
