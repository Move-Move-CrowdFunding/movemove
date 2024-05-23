<script setup>
const props = defineProps({
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
  <div>
    <UBreadcrumb divider="/" :links="props.links" class="my-4 rounded-xl bg-neutral-50 p-3">
      <template #default="{ link }">
        {{ link.label }}
      </template>
    </UBreadcrumb>
  </div>
</template>
