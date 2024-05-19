<script setup lang="ts">
const menuList = ref([
  {
    name: '關於我們',
    url: '/'
  },
  {
    name: '常見問題',
    url: '/'
  },
  {
    name: '接案者合約',
    url: '/'
  },
  {
    name: '會員獎勵介紹',
    url: '/'
  },
  {
    name: '使用條款',
    url: '/'
  },
  {
    name: '隱私權策略',
    url: '/'
  }
])
</script>
<template>
  <footer class="relative border-t-4 border-primary-1 bg-secondary-2 py-11 md:py-[60px]">
    <div class="container">
      <GoTop />
      <div class="flex flex-col items-center md:flex-row md:justify-between">
        <div class="flex flex-col">
          <BaseLogo
            class="mx-auto h-[40px] w-[227px] overflow-hidden whitespace-nowrap bg-neutral-50 indent-[100%] [mask-image:url('~/assets/icons/logo.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] md:mx-0"
          />
          <ul
            class="flex max-w-[300px] flex-row flex-wrap justify-center md:max-w-none md:flex-nowrap md:justify-start [&:last-child]:pt-4"
          >
            <li v-for="item in menuList" :key="item.name" class="[width:max-content]">
              <NuxtLink class="block p-2 text-center text-neutral-50" :to="item.url">{{
                item.name
              }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="flex flex-col items-end [&:last-child]:pt-4 md:[&:last-child]:pt-0">
          <ul class="mx-auto flex flex-row justify-center space-x-4 md:mx-0">
            <li>
              <NuxtLink class="block" title="Facebook" to="/">
                <img src="~/assets/icons/fb.svg" alt="" />
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="block" title="Instagram" to="/">
                <img src="~/assets/icons/ig.svg" alt="" />
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="block" title="Youtube" to="/">
                <img src="~/assets/icons/yt.svg" alt="" />
              </NuxtLink>
            </li>
          </ul>
          <p class="text-center text-sm text-secondary-5 md:text-right [&:last-child]:pt-6">
            Copyright © 2024 Move Move All rights reserved.
          </p>
        </div>
      </div>
    </div>
    <div></div>
  </footer>
</template>
