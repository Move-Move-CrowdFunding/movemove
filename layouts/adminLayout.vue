<template>
  <div class="relative flex flex-1 flex-col">
    <div class="flex min-h-dvh flex-1 flex-col">
      <UContainer class="mx-0 max-w-[100%] px-3 pb-4">
        <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800">
          <template #default="{ link }">
            <span class="group-hover:text-primary relative">{{ link.label }}</span>
          </template>
        </UHorizontalNavigation>
        <slot />
      </UContainer>
    </div>
  </div>
</template>
<script setup lang="ts">
// const route = useRoute()

const links = [
  {
    label: '',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    badge: 100
  },
  {
    label: 'Installation',
    icon: 'i-heroicons-home',
    to: '/admin'
  }
  //   {
  //     label: 'Horizontal Navigation',
  //     icon: 'i-heroicons-chart-bar',
  //     to: `${route.path.startsWith('/dev') ? '/dev' : ''}/components/horizontal-navigation`
  //   },
  //   {
  //     label: 'Command Palette',
  //     icon: 'i-heroicons-command-line',
  //     to: '/components/command-palette'
  //   }
]
</script>
<style lang="scss" scope></style>
