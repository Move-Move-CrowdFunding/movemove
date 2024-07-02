<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps({
  title: {
    type: String,
    default: '標題'
  }
})

const emit = defineEmits(['confirm'])
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="flex flex-col w-full max-w-[400px] mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
  >
    <slot name="header">
      <div v-if="title" class="flex items-center justify-between">
        <h2 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          {{ title }}
        </h2>
        <div class="absolute right-0 flex items-center justify-end">
          <div
            class="h-6 w-6 flex-shrink-0 bg-neutral-900 [mask-image:url('~/assets/icons/close-line.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
          ></div>
        </div>
      </div>
    </slot>
    <slot />
    <slot name="footer">
      <button class="ml-auto mt-1 rounded-lg border px-2" @click="emit('confirm')">確定</button>
    </slot>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
}
.confirm-modal-content > * + * {
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 1.375rem;
}
.confirm-modal-content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .confirm-modal-content {
  background: #000;
}
</style>
