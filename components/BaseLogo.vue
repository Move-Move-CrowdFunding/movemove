<template>
  <NuxtLink to="/">
    <h1
      class="h-[40px] w-[227px] overflow-hidden whitespace-nowrap indent-[100%] [mask-image:url('~/assets/images/logo.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
      title="movemove 募募"
      :class="bgColor"
    >
      movemove 募募
    </h1>
  </NuxtLink>
</template>
<script lang="ts" setup>
defineProps({
  bgColor: {
    type: String,
    default: 'bg-secondary-1'
  }
})
</script>
