<script setup lang="ts">
// import type { MenuItem } from '~/types/menuItem'
import { menuMapList } from '@/utils/menuMaps'
const isLogin = useIsLoginStore()

// defineProps<{
//   menuList: MenuItem[]
// }>()
</script>
<template>
  <div class="flex flex-col bg-neutral-50 text-center">
    <NuxtLink v-for="item in menuMapList" :key="item.name" class="block px-6 py-2" :to="item.url"
      >{{ item.name }}
    </NuxtLink>
    <NuxtLink v-if="isLogin.userData.auth" to="/admin" class="block px-6 py-2">後台</NuxtLink>
    <NuxtLink to="/" class="block px-6 py-2" @click="logout">登出</NuxtLink>
  </div>
</template>
