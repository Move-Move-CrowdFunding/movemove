<template>
  <Component :is="tag === 'nuxtLink' ? nuxtlink : tag">
    <slot name="prepend" />
    <slot>{{ text }}</slot>
    <slot name="append" />
  </Component>
</template>
<script lang="ts" setup>
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
