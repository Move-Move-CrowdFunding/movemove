<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: '內容'
  }
})
const emit = defineEmits(['close', 'confirm'])
const modalType = (type: string) => {
  switch (type) {
    case 'error':
      return '錯誤'
    case 'success':
      return '成功'
    default:
      return type
  }
}
</script>
<template>
  <UModal
    :ui="{
      width: 'lg:max-w-[300px] sm:max-w-lg'
    }"
  >
    <UCard
      :ui="{
        divide: 'divide-none',
        header: {
          base: 'overflow-hidden',
          padding: '!p-3'
        },
        body: {
          padding: '!p-3 text-neutral-700 text-center'
        },
        footer: {
          base: 'flex space-x-3',
          padding: '!p-3'
        },
        overlay: {
          base: 'fixed inset-0 transition-opacity',
          background: 'bg-neutral-700/50 dark:bg-neutral-700/75',
          transition: {
            enter: 'ease-out duration-300',
            enterFrom: 'opacity-0',
            enterTo: 'opacity-100',
            leave: 'ease-in duration-200',
            leaveFrom: 'opacity-100',
            leaveTo: 'opacity-0'
          }
        }
      }"
    >
      <template #header>
        <div class="flex items-start justify-between overflow-hidden [word-break:break-word]">
          <h2
            v-if="title"
            class="flex flex-1 items-center space-x-2 text-sm font-semibold leading-6 text-neutral-600 dark:text-white"
          >
            <Icon name="mdi:error" width="20" height="20" />
            <span>{{ modalType(title) }}</span>
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
            class="-my-1 ml-auto bg-neutral-50 text-neutral-700 transition-all hover:bg-secondary-3/20 focus:outline-0"
            @click="emit('close')"
          />
        </div>
      </template>
      {{ message }}
      <template #footer>
        <UButton
          class="h-full flex-1 justify-center rounded-lg border border-secondary-2 bg-secondary-2 px-5 py-2 text-neutral-50 shadow-none transition hover:border-primary-2 hover:bg-primary-2"
          @click="emit('close')"
          >確定</UButton
        >
      </template>
    </UCard>
  </UModal>
</template>
