<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
const { y } = useWindowScroll({ behavior: 'smooth' })
const scrollToTop = () => {
  y.value = 0
}
</script>
<template>
  <div
    title="返回最上層"
    class="absolute -top-6 right-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary-1 shadow-md transition-all hover:bg-primary-2 active:bg-primary-2 lg:right-20"
    @click="scrollToTop"
  >
    <div
      class="h-[22px] w-9 -rotate-90 bg-neutral-50 [mask-image:url('~/assets/icons/arrow_forward.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
    ></div>
  </div>
</template>
