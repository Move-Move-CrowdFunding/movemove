export default defineNuxtRouteMiddleware(() => {
  const loading = useLoadingStore()
  const nuxtApp = useNuxtApp()

  loading.isGlobalLoading = true
  nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
      loading.isGlobalLoading = false
    }, 300)
  })
})
