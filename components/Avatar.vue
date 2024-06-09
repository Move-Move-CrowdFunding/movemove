<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  defaultImageSize: {
    type: String,
    default: 'lg'
  },
  imageSize: {
    type: String,
    default: '40px'
  }
})
</script>
<template>
  <div class="relative flex-shrink-0" :class="`h-[${imageSize}] w-[${imageSize}]`">
    <div
      v-if="!src"
      class="m-auto flex h-full w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-200 p-2 before:block before:h-full before:w-full before:bg-neutral-50 before:content-[''] before:[mask-image:url('~/assets/icons/avatar.svg')] before:[mask-position:center] before:[mask-repeat:no-repeat] before:[mask-size:contain]"
    ></div>
    <img
      v-else
      class="h-full w-full overflow-hidden rounded-full border border-neutral-200 object-cover"
      :alt="alt"
      :src="src"
    />
    <slot name="upload" />
  </div>
</template>
