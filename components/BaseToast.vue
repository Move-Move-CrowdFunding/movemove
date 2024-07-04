<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps({
  title: {
    type: String,
    default: ''
  },
  msg: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'simple-line-icons:close'
  },
  iconClass: {
    type: String,
    default: 'text-warning-500'
  }
})

const emit = defineEmits(['confirm'])
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-transition="vfm-fade"
    content-class="flex flex-col w-full max-w-[300px] min-h-[200px] mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg max-h-[60%] overflow-auto space-y-4"
  >
    <header class="flex-shrink-0">
      <slot name="header">
        <div class="relative flex w-full items-center justify-between text-center">
          <h2
            v-if="title"
            class="w-full text-center text-base font-semibold leading-6 text-neutral-900 dark:text-white"
          >
            {{ title }}
          </h2>
          <Icon class="mx-auto" :class="iconClass" :name="icon" width="60" height="60" />
        </div>
      </slot>
    </header>
    <div
      class="flex flex-1 items-center justify-center overflow-y-auto py-4 text-center text-lg text-neutral-700"
    >
      <slot
        ><p>{{ msg }}</p>
      </slot>
    </div>
    <footer class="flex-shrink-0">
      <slot name="footer">
        <button
          class="mx-auto flex w-full cursor-pointer items-center justify-center rounded-lg bg-secondary-2 py-2 text-center text-lg text-white transition-all hover:bg-primary-2"
          @click="emit('confirm')"
        >
          確定
        </button>
      </slot>
    </footer>
  </VueFinalModal>
</template>

<style>
/* .confirm-modal {
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
} */
</style>
