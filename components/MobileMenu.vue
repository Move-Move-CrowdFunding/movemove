<template>
  <div
    class="fixed inset-0 z-10 hidden h-full w-full flex-1 flex-col overflow-y-auto overflow-x-hidden bg-neutral-50"
  >
    <NuxtLink v-for="item in menuMapList" :key="item.name" class="block px-6 py-2" :to="item.url"
      >{{ item.name }}
    </NuxtLink>
    <div class="py-4">
      <h3 class="px-3 pb-4 text-neutral-900">提案類別</h3>
      <ul>
        <li v-for="item in categoryMenuList" :key="item.name">
          <NuxtLink
            class="relative block px-3 py-2 text-neutral-600 after:absolute after:inset-y-0 after:right-3 after:my-auto after:block after:h-5 after:w-5 after:bg-neutral-600 after:content-[''] after:[mask-image:url('~/assets/images/arrow_forward.svg')] after:[mask-position:center] after:[mask-repeat:no-repeat] after:[mask-size:contain]"
            :to="item.url"
            >{{ item.name }}
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink to="/" class="block px-6 py-2">登入/註冊</NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { CategoryKeys } from '~/types/categoryKeys'
import { menuMapList } from '@/utils/menuMaps'

const categoryMenuList = ref(
  categoryKeys.map((item: CategoryKeys) => {
    return {
      name: item.name,
      url: `/projects?categoryKey=${item.key}`
    }
  })
)
</script>
