<script setup>
import { defineEmits } from 'vue'

const page = ref(1)

const props = defineProps({
  pagination: {
    type: Object
  },
  size: {
    type: String,
    default: 'md'
  },
  max: {
    type: Number,
    default: 5
  },
  containerClass: {
    type: String
  },
  paginationClass: {
    type: String,
    default: 'custom-pagination gap-4'
  }
})

const pagination = computed(() => {
  return props.pagination
})
const emit = defineEmits(['page'])
watch(page, () => {
  emit('page', page.value)
})
</script>
<template>
  <div id="pagination" :class="props.containerClass">
    <UPagination
      v-model="page"
      :ui="{
        base: 'min-w-[44px] justify-center m-0',
        rounded: 'rounded-md'
      }"
      :size="props.size"
      :max="props.max"
      :page-count="pagination.pageSize"
      :total="pagination.count"
      :class="props.paginationClass"
    >
    </UPagination>
  </div>
</template>
<style scoped lang="scss">
:deep(.custom-pagination) {
  .bg-primary-500 {
    @apply bg-secondary-2;
  }
  .bg-primary-500:hover {
    @apply border-primary-1 bg-primary-1;
  }
  .bg-white:hover {
    @apply bg-primary-1 text-white ring-primary-1;
  }
  .bg-white:disabled {
    @apply text-gray-900 ring-gray-300;

    background-color: white;
  }
}
</style>
