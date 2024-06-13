<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '標題'
  },
  message: {
    type: String,
    default: '內容'
  },
  preventClose: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['close', 'success'])
// function onSuccess() {
//   emit('success')
// }
</script>
<template>
  <UModal
    :ui="{
      width: 'lg:max-w-[300px] sm:max-w-lg'
    }"
    prevent-close
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        header: {
          base: 'overflow-hidden',
          padding: '!p-3'
        },
        body: {
          padding: '!p-3'
        }
      }"
    >
      <template #header>
        <div class="flex items-start justify-between overflow-hidden [word-break:break-word]">
          <h2 class="flex-1 text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ title }}
          </h2>
          <UButton
            :ui="{
              icon: {
                size: {
                  '2xl': 'w-10 h-10'
                }
              }
            }"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1 bg-neutral-50 hover:bg-primary-3"
            @click="emit('close')"
          />
        </div>
      </template>
      {{ message }}
      <template #footer>
        <UButton @click="emit('close')">確定</UButton>
      </template>
    </UCard>
  </UModal>
</template>
