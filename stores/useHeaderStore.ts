import { defineStore } from 'pinia'

export const useHeaderStore = defineStore({
  id: 'header',
  state: () => ({
    searchKeyword: '',
    mobileMenuShow: false,
    searching: false
  })
})
