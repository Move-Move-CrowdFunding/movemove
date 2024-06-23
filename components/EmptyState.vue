<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    default: 'mdi:database-remove-outline'
  },
  text: {
    type: String,
    default: '找不到相符條件的資料'
  }
})
const { icon } = props
</script>
<template>
  <div class="flex h-full w-full flex-col justify-center text-center">
    <div class="flex min-h-[400px] flex-col items-center justify-center space-y-6 p-4">
      <div
        class="relative flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-neutral-200 bg-neutral-100 p-6"
      >
        <Icon :name="icon" class="!block flex-shrink-0 text-neutral-400" width="80" height="80" />
      </div>
      <p class="items-center text-base text-neutral-400 [word-break:break-word]">{{ text }}</p>
    </div>
  </div>
</template>
