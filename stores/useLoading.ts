import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const isGlobalLoading = ref(false)
  const isLoadingOverlayData = ref(false)
  return { isGlobalLoading, isLoadingOverlayData }
})
