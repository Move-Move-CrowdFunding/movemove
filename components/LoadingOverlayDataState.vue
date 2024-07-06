<script setup lang="ts">
const isLoading = useLoadingStore()
defineProps({
  text: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: 'bg-neutral-50'
  },
  textColor: {
    type: String,
    default: 'text-neutral-50'
  }
})
</script>
<template>
  <transition name="fade">
    <div
      v-show="isLoading.isLoadingOverlayData"
      class="fixed inset-0 z-[99] flex items-center justify-center bg-neutral-950/50"
    >
      <div class="relative overflow-hidden">
        <LoadingDataState
          :text="text"
          :bg-color="bgColor"
          :text-color="textColor"
          :is-loading="isLoading.isLoadingOverlayData"
        />
      </div>
    </div>
  </transition>
</template>
<style scoped>
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
