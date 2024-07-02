<script setup>
defineProps({
  count: {
    type: Number,
    default: 0
  },
  maxLength: {
    type: Number,
    default: 0
  }
})
</script>
<template>
  <div
    class="absolute bottom-0.5 right-0.5 select-none rounded-[3px] bg-neutral-50 px-0.5 pr-1 text-xs text-neutral-400"
  >
    <template v-if="maxLength && maxLength > 0"> {{ count }} / {{ maxLength }} </template>
    <template v-else> {{ count }} 個字</template>
  </div>
</template>
