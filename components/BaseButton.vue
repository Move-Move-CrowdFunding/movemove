<script setup lang="ts">
const nuxtlink = defineNuxtLink({})
defineProps({
  tag: {
    type: String,
    default: 'button'
  },
  text: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <Component
    :is="tag === 'nuxtLink' ? nuxtlink : tag"
    class="flex cursor-pointer items-center justify-center"
  >
    <slot name="prepend" />
    <slot>{{ text }}</slot>
    <slot name="append" />
  </Component>
</template>
