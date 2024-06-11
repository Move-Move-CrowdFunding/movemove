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
  size: {
    type: String,
    default: 'md'
  }
})
const mapImageSize = (size: 'lg' | 'md' | 'sm'): { size: string; defaultImage: string } => {
  const sizeVariants: { [key in 'lg' | 'md' | 'sm']: { size: string; defaultImage: string } } = {
    lg: {
      size: 'w-[80px] h-[80px]',
      defaultImage: 'before:w-[60px] before:h-[60px]'
    },
    md: {
      size: 'w-[60px] h-[60px]',
      defaultImage: 'before:w-[50px] before:h-[50px]'
    },
    sm: {
      size: 'w-[40px] h-[40px]',
      defaultImage: 'before:w-[30px] before:h-[30px]'
    }
  }
  return sizeVariants[size]
}
</script>
<template>
  <div
    class="relative flex-shrink-0 overflow-hidden"
    :class="mapImageSize(size as 'lg' | 'md' | 'sm').size"
  >
    <div
      v-if="!src"
      class="m-auto flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-200 before:block before:flex-shrink-0 before:bg-neutral-50 before:content-[''] before:[mask-image:url('~/assets/icons/avatar.svg')] before:[mask-position:center] before:[mask-repeat:no-repeat] before:[mask-size:contain]"
      :class="
        mapImageSize(size as 'lg' | 'md' | 'sm').size +
        ' ' +
        mapImageSize(size as 'lg' | 'md' | 'sm').defaultImage
      "
    ></div>

    <img
      v-else
      class="overflow-hidden rounded-full border border-neutral-200 object-cover"
      :alt="alt"
      :src="src"
      :class="mapImageSize(size as 'lg' | 'md' | 'sm').size"
    />
    <slot name="upload" />
  </div>
</template>
