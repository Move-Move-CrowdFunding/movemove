import { defineStore } from 'pinia'

export const useIsLoginStore = defineStore('isLogin', () => {
  const isLogin = ref(false)

  return { isLogin }
})
