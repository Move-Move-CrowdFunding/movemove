<template>
  <div class="relative flex flex-1 flex-col">
    <Header />
    <div class="flex min-h-[`calc(100dvh_-_212px_-_72px)`] flex-1 flex-col">
      <!-- {{ headerHeight }}
      {{ customHeight }} -->
      <slot />
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
// import { useElementSize } from '@vueuse/core'
// import { vElementSize } from '@vueuse/components'
// const headerElement = ref(null)
// // const footerElement = ref(null)
// const { height: customHeight } = useElementSize(headerElement)
// const headerHeight = ref(0)
// const onResize = ({ width, height }: { width: number; height: number }) => {
//   headerHeight.value = height
//   console.log('headerHeight', headerHeight.value, height)
// }

// console.log('height', headerElement)
// const { height } = useElementSize(footerElement)
</script>
<style lang="scss" scope>
#__nuxt {
  @apply min-h-dvh;
}
</style>
