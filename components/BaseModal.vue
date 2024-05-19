<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '標題'
  },
  message: {
    type: String,
    default: '內容'
  }
})

const emit = defineEmits(['close'])
</script>
<template>
  <UModal>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800 text-center' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ title }}
          </h2>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="emit('close')"
          />
        </div>
      </template>
      {{ message }}
    </UCard>
  </UModal>
</template>
