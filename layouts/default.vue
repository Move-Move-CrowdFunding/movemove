<script setup>
import { useWindowScroll } from '@vueuse/core'
const { y } = useWindowScroll({ behavior: 'smooth' })

const isLogin = useIsLoginStore()
const checkPermission = async () => {
  if (!isLogin.isLogin) {
    await isLogin.checkLogin()
  }
}

const showToTop = ref(false)
const checkScroll = () => {
  if (y.value >= 500) {
    showToTop.value = true
  } else {
    showToTop.value = false
  }
}
onMounted(() => {
  nextTick(() => {
    checkPermission()

    window.addEventListener('scroll', checkScroll)
  })
})
</script>
<template>
  <div class="relative flex min-h-dvh flex-1 flex-col">
    <Header />
    <div class="flex flex-1 flex-col">
      <slot />
    </div>
    <GoTop v-if="showToTop" />
    <Footer />
  </div>
</template>
<style lang="scss" scope>
#__nuxt {
  @apply min-h-dvh;
}
</style>
