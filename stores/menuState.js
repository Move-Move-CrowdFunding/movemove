import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const mobileMenuShow = ref(false)
  return { mobileMenuShow }
})
