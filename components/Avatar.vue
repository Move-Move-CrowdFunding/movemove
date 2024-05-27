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
  }
})
</script>
<template>
  <div
    class="flex-shrink-0"
    :class="defaultImageSize === 'lg' ? 'h-[60px] w-[60px]' : 'h-[40px] w-[40px]'"
  >
    <div
      v-if="!src"
      class="m-auto flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-200 before:block before:bg-neutral-200 before:content-[''] before:[mask-image:url('~/assets/icons/avatar.svg')] before:[mask-position:center] before:[mask-repeat:no-repeat] before:[mask-size:contain]"
      :class="
        defaultImageSize === 'lg'
          ? 'h-[58px] w-[58px] before:h-12 before:w-12'
          : 'h-[40px] w-[40px] before:h-9 before:w-9'
      "
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
