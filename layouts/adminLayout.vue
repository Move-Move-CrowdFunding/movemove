<script setup lang="ts">
const isLogin = useIsLoginStore()

const pageTitle = usePageTitleStore()
const links = ref([
  {
    label: '後台管理',
    icon: 'i-heroicons-home',
    to: '/admin'
  },
  {
    label: pageTitle.title
  }
])
watchEffect(() => {
  links.value[1].label = pageTitle.currentTitle
})
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
        class="sticky left-0 right-0 top-0 z-10 flex items-center justify-between bg-neutral-50 p-4 shadow-md"
      >
        <BaseLogo
          class="h-[24px] w-[135px] overflow-hidden whitespace-nowrap bg-secondary-1 indent-[100%] [mask-image:url('~/assets/icons/logo.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] md:mx-0"
          target="_blank"
        />
        <UButton
          icon="i-heroicons-arrow-right-on-rectangle-20-solid"
          size="md"
          class="border border-secondary-3 bg-neutral-50 text-secondary-3 transition-all hover:bg-secondary-3 hover:text-neutral-50"
          :trailing="false"
          @click="logout"
          >登出</UButton
        >
      </header>
      <UContainer
        class="mx-auto flex w-full max-w-[100%] flex-col"
        :ui="{
          strategy: 'override',
          padding: 'px-4'
        }"
      >
        <div class="space-y-3">
          <PageHeader :page-head="pageTitle.currentTitle" :links="links" />

          <slot />
        </div>
      </UContainer>
    </div>
  </div>
</template>
