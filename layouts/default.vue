<script setup>
const isLogin = useIsLoginStore()

onMounted(() => {
  nextTick(() => {
    isLogin.checkLogin()
  })
})
</script>
<template>
  <div class="relative flex flex-1 flex-col">
    <Header />
    <div class="flex min-h-[`calc(100dvh_-_212px_-_72px)`] flex-1 flex-col">
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
