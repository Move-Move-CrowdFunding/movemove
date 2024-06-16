<script setup lang="ts">
const modal = useModal()

// MobileMenu 打開時 body 加上 overflow-hidden
const mobileState = useHeaderStore()
const bodyClass = computed(() => (mobileState.mobileMenuShow ? 'overflow-hidden' : ''))
useHead({
  bodyAttrs: {
    class: bodyClass
  }
})
</script>
<template>
  <LoadingOverlay />
  <NuxtLayout>
    <NuxtPage />
    <UModals prevent-close @close="modal.close()" />
    <UNotifications />
  </NuxtLayout>
</template>
