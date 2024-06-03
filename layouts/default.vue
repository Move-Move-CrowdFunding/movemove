<script setup>
const isLogin = useIsLoginStore()
const checkPermission = async () => {
  if (!isLogin.isLogin) {
    await isLogin.checkLogin()
  }
}
onMounted(() => {
  nextTick(() => {
    checkPermission()
  })
})
</script>
<template>
  <div class="relative flex min-h-dvh flex-1 flex-col">
    <Header />
    <div class="flex flex-1 flex-col">
      <slot />
    </div>
    <GoTop />
    <Footer />
  </div>
</template>
<style lang="scss" scope>
#__nuxt {
  @apply min-h-dvh;
}
</style>
