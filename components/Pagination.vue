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
const emit = defineEmits(['customEvent', 'emit'])
watch(page, () => {
  emit('page', page.value)
})
</script>
<template>
  <div class="flex justify-center py-10 lg:py-20">
    <UPagination
      v-model="page"
      :max="5"
      :page-count="pagination.pageSize"
      :total="pagination.count"
    >
    </UPagination>
  </div>
</template>
<style scoped></style>
