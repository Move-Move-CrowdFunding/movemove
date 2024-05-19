<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <img :alt="alt" :src="src" />
</template>
