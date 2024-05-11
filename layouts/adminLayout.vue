<template>
  <div class="relative flex flex-1 flex-col">
    <div class="flex min-h-dvh flex-1 flex-col">
      <header
        class="sticky left-0 right-0 top-0 z-10 flex items-center justify-between px-3 py-4 md:shadow-none"
      >
        <BaseLogo
          class="mx-auto h-[40px] w-[227px] overflow-hidden whitespace-nowrap bg-secondary-2 indent-[100%] [mask-image:url('~/assets/icons/logo.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] md:mx-0"
        />
        <BaseButton @click="logout">
          <span>登出</span>
        </BaseButton>
      </header>
      <!-- <UContainer class="mx-0 max-w-[100%] px-3 pb-4">
        <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800">
          <template #default="{ link }">
            <span class="group-hover:text-primary relative">{{ link.label }}</span>
          </template>
        </UHorizontalNavigation>
       </UContainer> -->
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
// const links = [
//   {
//     label: '列表',
//     icon: 'i-heroicons-home',
//     to: '/admin'
//   },
//   {
//     label: '登出',
//     icon: 'i-heroicons-home',
//     click: logout
//   }
// ]
</script>
