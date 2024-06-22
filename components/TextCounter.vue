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
    class="absolute bottom-0.5 right-0.5 select-none rounded-[3px] bg-neutral-50 px-px pr-1 text-sm text-neutral-400"
  >
    <template v-if="maxLength && maxLength > 0"> {{ count }} / {{ maxLength }} </template>
    <template v-else> {{ count }} </template>
  </div>
</template>
