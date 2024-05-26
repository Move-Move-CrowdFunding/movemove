<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <div class="flex-shrink-0 overflow-hidden rounded-full border border-neutral-200">
    <div
      v-if="!src"
      class="m-auto flex h-[58px] w-[58px] flex-shrink-0 items-center justify-center rounded-full before:block before:h-12 before:w-12 before:bg-neutral-200 before:content-[''] before:[mask-image:url('~/assets/icons/avatar.svg')] before:[mask-position:center] before:[mask-repeat:no-repeat] before:[mask-size:contain]"
    ></div>
    <img v-else class="object-cover" :alt="alt" :src="src" />
  </div>
</template>
