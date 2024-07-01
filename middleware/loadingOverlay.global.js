export default defineNuxtRouteMiddleware(() => {
  const loading = useLoadingStore()

  loading.isGlobalLoading = false
  // setTimeout(() => {
  //   loading.isGlobalLoading = false
  // }, 300)
})
