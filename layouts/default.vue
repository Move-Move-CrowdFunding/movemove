<script setup>
const isLogin = useIsLoginStore()

onMounted(() => {
  nextTick(() => {
    isLogin.checkLogin()
  })
})
</script>
<template>
  <div class="relative flex min-h-dvh flex-1 flex-col">
    <Header />
    <div class="flex flex-1 flex-col">
      <slot />
    </div>
    <Footer />
  </div>
</template>
<style lang="scss" scope>
#__nuxt {
  @apply min-h-dvh;
}
</style>
