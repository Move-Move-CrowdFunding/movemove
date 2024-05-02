<template>
  <div>
    <NuxtLink v-for="item in menuList" :key="item.name" :to="item.url">{{ item.name }}</NuxtLink>
  </div>
</template>
<script lang="ts" setup>
const menuList = ref([
  {
    name: '贊助紀錄',
    url: '/member/supported'
  },
  {
    name: '贊助紀錄',
    url: '/member/following'
  },
  {
    name: '提案紀錄',
    url: '/member/my-projects'
  },
  {
    name: '最新通知',
    url: '/member/notifications'
  },
  {
    name: '帳戶設定',
    url: '/member/settings'
  }
])
</script>
