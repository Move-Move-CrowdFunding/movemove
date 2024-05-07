<template>
  <div class="relative flex flex-1 flex-col">
    <Header />
    <MobileMenu />
    <div class="flex flex-1 flex-col">
      <slot />
    </div>
    <Footer />
  </div>
</template>
<style lang="scss" scope>
#__nuxt {
  @apply min-h-dvh;
}
</style>
