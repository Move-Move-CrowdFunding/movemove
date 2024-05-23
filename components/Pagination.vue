<script setup>
import { defineEmits } from 'vue'

const page = ref(1)

const props = defineProps({
  pagination: {
    type: Object
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
  <div id="pagination" class="container flex items-center justify-center py-10 lg:py-20">
    <UPagination
      v-model="page"
      :ui="{
        base: 'min-w-[44px] justify-center m-0',
        rounded: 'rounded-md'
      }"
      size="xl"
      :max="5"
      :page-count="pagination.pageSize"
      :total="pagination.count"
      class="custom-pagination gap-4"
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
