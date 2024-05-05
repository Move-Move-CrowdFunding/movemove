<template>
  <div class="relative flex flex-1 flex-col">
    <Header ref="headerElement" />
    <div class="flex min-h-[`calc(100dvh_-_212px_-_${headerHeight})`] flex-1 flex-col">
      <slot />
    </div>
    <Footer ref="footerElement" />
  </div>
</template>
<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
const headerElement = ref(null)
const footerElement = ref(null)

const { height: headerHeight } = useElementSize(headerElement)
console.log('height', headerHeight)
// const { height } = useElementSize(footerElement)
</script>
<style lang="scss" scope>
#__nuxt {
  @apply min-h-dvh;
}
</style>
