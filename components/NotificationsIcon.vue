<script setup lange="ts">
defineProps({
  count: {
    type: Number,
    default: 0
  }
})
</script>
<template>
  <UButton
    tag="nuxtLink"
    to="/member/notifications"
    class="relative h-full flex-shrink-0 items-center justify-center bg-neutral-50 p-2 shadow-none transition-all hover:bg-secondary-3/20 focus:outline-0"
  >
    <div
      class="bg-neutral-2 h-6 w-6 flex-shrink-0 overflow-hidden bg-secondary-2 [mask-image:url('~/assets/icons/notifications.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
    ></div>
    <div
      v-if="count > 0"
      class="absolute bottom-[7px] right-[7px] flex h-3 w-3 items-center justify-center overflow-hidden rounded-full bg-[#FF0000] text-sm text-neutral-50"
    >
      <p v-if="count > 99" class="scale-[0.4]">99+</p>
      <p v-else class="scale-[0.5]">
        {{ count }}
      </p>
    </div>
  </UButton>
</template>
