<template>
  <div class="flex flex-col bg-neutral-50 text-center">
    <NuxtLink v-for="item in menuMapList" :key="item.name" class="block px-6 py-2" :to="item.url"
      >{{ item.name }}
    </NuxtLink>
    <NuxtLink to="/" class="block px-6 py-2">登出</NuxtLink>
  </div>
</template>
<script lang="ts" setup>
// import type { MenuItem } from '~/types/menuItem'
import { menuMapList } from '@/utils/menuMaps'

// defineProps<{
//   menuList: MenuItem[]
// }>()
</script>
