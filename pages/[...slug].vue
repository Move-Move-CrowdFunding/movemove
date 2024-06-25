<script setup>
const loading = useLoadingStore()

definePageMeta({
  layout: false
})

onMounted(() => {
  loading.isGlobalLoading = false
})
</script>

<template>
  <div class="fixed inset-0 flex items-center bg-secondary-5">
    <div class="mx-auto flex flex-col flex-wrap items-center space-y-6 p-4">
      <div class="text-9xl font-semibold">404</div>
      <div class="text-center">
        <p class="mb-4 text-3xl font-medium">噢不！找不到這個頁面</p>
        <p class="mb-8 text-lg">您可能輸入了錯誤的網址或頁面已被刪除</p>
        <UButton
          to="/"
          class="rounded-lg border border-transparent bg-secondary-2 px-5 py-2 text-neutral-50 shadow-none transition hover:border-primary-2 hover:bg-primary-2"
          >回首頁</UButton
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.text-9xl {
  font-size: 8rem;
}
</style>
