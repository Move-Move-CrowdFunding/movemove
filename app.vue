<template>
  <NuxtLayout>
    <NuxtPage />
    <UModals @close="modal.close()" />
  </NuxtLayout>
</template>
<script lang="ts" setup>
const modal = useModal()
</script>
<style lang="scss">
.box {
  position: absolute;
  top: 50%;
  padding: 0;
  background-color: #fff;
}
</style>
