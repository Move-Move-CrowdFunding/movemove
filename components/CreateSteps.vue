<script setup>
const props = defineProps({
  step: {
    type: Number,
    required: true
  }
})
const { step } = props
</script>
<template>
  <!-- <ul class="flex justify-center gap-6 py-10">
    <li class="border-b-2" :class="{ 'border-primary-1': step == 1, 'border-white': step != 1 }">
      <NuxtLink>提案者合約</NuxtLink>
    </li>
    <li class="border-b-2" :class="{ 'border-primary-1': step == 2, 'border-white': step != 2 }">
      <NuxtLink>提案內容</NuxtLink>
    </li>
    <li class="border-b-2" :class="{ 'border-primary-1': step == 3, 'border-white': step != 3 }">
      <NuxtLink>提案成功</NuxtLink>
    </li>
  </ul> -->
  <div class="container relative bottom-2 px-6">
    <ul
      class="relative mx-auto flex max-w-[480px] justify-between py-10 text-center before:absolute before:left-0 before:top-1/2 before:block before:h-0.5 before:w-1/2 before:-translate-y-1/2 before:bg-secondary-1 after:absolute after:right-0 after:top-1/2 after:block after:h-0.5 after:w-1/2 after:-translate-y-1/2 after:bg-secondary-1"
      :class="{
        'before:bg-neutral-300 after:bg-neutral-300': step == 1,
        'before:bg-secondary-1 after:bg-neutral-300': step == 2,
        'before:bg-secondary-1 after:bg-secondary-1': step == 3
      }"
    >
      <li class="z-20">
        <div class="step bg-primary-1 after:text-secondary-1 after:content-['提案者合約']">1</div>
      </li>
      <li class="z-20">
        <div
          class="step after:content-['提案內容']"
          :class="{
            'bg-neutral-300 after:text-neutral-300': step < 2,
            'bg-primary-1 after:text-secondary-1': step >= 2
          }"
        >
          2
        </div>
      </li>
      <li class="z-20">
        <div
          class="step after:content-['提案成功']"
          :class="{
            'bg-neutral-300 after:text-neutral-300': step < 3,
            'bg-primary-1 after:text-secondary-1': step == 3
          }"
        >
          3
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* *{
  outline: 1px solid #0A0
} */
.step {
  @apply relative flex h-12 w-12 items-center justify-center rounded-full border-[8px] border-white text-xl font-bold text-white after:absolute after:top-[120%] after:whitespace-nowrap after:text-base;
}
</style>
