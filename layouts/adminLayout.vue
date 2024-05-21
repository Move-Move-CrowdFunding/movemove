<script setup>
const isLogin = useIsLoginStore()
const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/admin'
  },
  {
    label: '後台管理',
    icon: 'i-heroicons-square-3-stack-3d',
    to: '/admin'
  },
  {
    label: '提案列表',
    icon: 'i-heroicons-link',
    to: '/admin'
  }
]

onMounted(() => {
  nextTick(() => {
    isLogin.checkLogin()
  })
})
</script>
<template>
  <div class="relative flex flex-1 flex-col bg-neutral-100 shadow-md">
    <div class="flex min-h-dvh flex-1 flex-col">
      <header
        class="sticky left-0 right-0 top-0 z-10 flex items-center justify-between bg-neutral-50 px-3 py-4 shadow-md"
      >
        <BaseLogo
          class="mx-auto h-[24px] w-[135px] overflow-hidden whitespace-nowrap bg-secondary-1 indent-[100%] [mask-image:url('~/assets/icons/logo.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] md:mx-0"
          target="_blank"
        />
        <UButton
          icon="i-heroicons-arrow-right-on-rectangle-20-solid"
          size="md"
          color="primary"
          variant="outline"
          :trailing="false"
          @click="logout"
          >登出</UButton
        >
      </header>
      <UContainer
        class="mx-auto flex w-full max-w-[100%] flex-col"
        :ui="{
          strategy: 'override',
          padding: 'px-3'
        }"
      >
        <div class="space-y-3">
          <PageHeader :links="links" page-head="後台管理" />
          <!-- <h2 class="flex-shrink-0 py-6 font-semibold text-neutral-800">管理 - 提案列表</h2>
          <div class="bg-neutral-50 p-3">
            <UBreadcrumb :links="links" />
          </div> -->
          <slot />
        </div>
      </UContainer>
    </div>
  </div>
</template>
