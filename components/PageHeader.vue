<script setup>
defineProps({
  links: {
    type: Array,
    default: () => []
  },
  pageHead: {
    type: String,
    default: () => ''
  }
})
</script>
<template>
  <h2 class="flex-shrink-0 py-6 font-semibold text-neutral-800">管理 - {{ pageHead }}</h2>
  <div class="bg-neutral-50 p-3">
    <UBreadcrumb :links="links" />
  </div>
</template>
