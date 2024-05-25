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
      <template #default="{ link, isActive }">
        <span
          class="transitino-all duration-300"
          :class="[isActive ? 'text-secondary-2 ' : 'text-neutral-600 hover:text-neutral-900']"
          >{{ link.label }}</span
        >
      </template>
    </UBreadcrumb>
  </div>
</template>
