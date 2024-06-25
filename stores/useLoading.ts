import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading',()=>{

  const isGlobalLoading= ref(false)

  return { isGlobalLoading }
})
