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
  <div id="pagination" class="container py-10 lg:py-20">
    <UPagination
      v-model="page"
      :max="5"
      :page-count="pagination.pageSize"
      :total="pagination.count"
    >
    </UPagination>
  </div>
</template>
<style scoped lang="scss">
#pagination {
  .flex {
    @apply justify-center gap-4;
  }
  :deep(button:focus) {
    @apply bg-primary-1;
  }
}
</style>
