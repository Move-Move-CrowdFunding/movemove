<template>
  <Component :is="tag === 'nuxtLink' ? nuxtlink : tag">
    <slot name="prepend" />
    <slot>{{ text }}</slot>
    <slot name="append" />
  </Component>
</template>
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
