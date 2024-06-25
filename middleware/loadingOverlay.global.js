export default defineNuxtRouteMiddleware(() => {
  const loading = useLoadingStore()

  loading.isGlobalLoading = true
  // setTimeout(() => {
  //   loading.isGlobalLoading = false
  // }, 300)
})
