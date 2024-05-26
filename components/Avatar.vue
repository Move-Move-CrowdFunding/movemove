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
  <div class="flex-shrink-0">
    <div
      v-if="!src"
      class="m-auto flex h-[58px] w-[58px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-200 before:block before:h-12 before:w-12 before:bg-neutral-200 before:content-[''] before:[mask-image:url('~/assets/icons/avatar.svg')] before:[mask-position:center] before:[mask-repeat:no-repeat] before:[mask-size:contain]"
    ></div>
    <img
      v-else
      class="h-full w-full overflow-hidden rounded-full border border-neutral-200 object-cover"
      :alt="alt"
      :src="src"
    />
    <div class="absolute bottom-0 right-0 hidden group-hover:block">
      <label
        for="uploadImage"
        class="flex cursor-pointer items-center justify-center rounded bg-secondary-1 p-0.5 text-white hover:bg-primary-1"
      >
        <Icon name="material-symbols:upload" width="20" height="20" color="white" />
      </label>
    </div>
    <slot name="upload" />
  </div>
</template>
