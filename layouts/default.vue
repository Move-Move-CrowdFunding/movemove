<template>
  <div class="relative flex h-full flex-1 flex-col">
    <Header />
    <MobileMenu />
    <div class="container mx-auto flex h-full flex-1 flex-col">
      <slot />
    </div>
    <Footer />
  </div>
</template>
<style lang="scss" scope>
// * {
//   border: 1px solid red;
// }
#__nuxt {
  @apply h-full;
}
</style>
