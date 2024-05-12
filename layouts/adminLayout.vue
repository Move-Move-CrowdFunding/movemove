<template>
  <div class="relative flex flex-1 flex-col">
    <div class="flex min-h-dvh flex-1 flex-col">
      <header
        class="sticky left-0 right-0 top-0 z-10 flex items-center justify-between bg-neutral-50 px-3 py-4 shadow-sm"
      >
        <BaseLogo
          class="mx-auto h-[40px] w-[227px] overflow-hidden whitespace-nowrap bg-secondary-1 indent-[100%] [mask-image:url('~/assets/icons/logo.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] md:mx-0"
          target="_blank"
        />
        <!-- <BaseButton @click="logout">
          <span>登出</span>
        </BaseButton> -->
        <!-- <UButton label="Button" /> -->
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
        <slot />
      </UContainer>
    </div>
  </div>
</template>
<script setup>
const isLogin = useIsLoginStore()

onMounted(() => {
  nextTick(() => {
    isLogin.checkLogin()
  })
})
</script>
