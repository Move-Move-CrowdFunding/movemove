<script setup lang="ts">
const modal = useModal()
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
    <UModals @close="modal.close()" />
  </NuxtLayout>
</template>
<style lang="scss">
.box {
  position: absolute;
  top: 50%;
  padding: 0;
  background-color: #fff;
}
</style>
