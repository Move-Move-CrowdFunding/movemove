<template>
  <div>
    <NuxtLink to="/"><h1>募募</h1></NuxtLink>
    <div>
      <NuxtLink to="/projects">探索</NuxtLink> |
    <NuxtLink to="/create">提案</NuxtLink>
    </div>
    <div>
      <NuxtLink to="/member/supported">贊助紀錄</NuxtLink> |
      <NuxtLink to="/member/following">追蹤紀錄</NuxtLink> |
      <NuxtLink to="/member/my-projects">提案紀錄</NuxtLink> |
      <NuxtLink to="/member/notifications">最新通知</NuxtLink> |
      <NuxtLink to="/member/settings">帳戶設定</NuxtLink> |
    </div>

    <slot />
  </div>
</template>