<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: '120px'
  },
  text: {
    type: String,
    default: '資料載入中...'
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="flex h-full w-full flex-col justify-center bg-neutral-50 text-center"
    >
      <div class="flex min-h-[400px] flex-col items-center justify-center p-4">
        <div class="flex h-32 items-center justify-center">
          <i class="loader" />
        </div>
        <p class="items-center text-base text-neutral-400 [word-break:break-word]">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.loader {
  --loader: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;

  aspect-ratio: 1;
  mask: var(--loader);
  mask-composite: source-out;
  mask-composite: subtract;

  @apply w-[50px] animate-[l3_1s_infinite_linear] rounded-full bg-neutral-400 p-2;
}

@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
