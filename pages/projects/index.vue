<script setup>
const projects = ref([
  {
    id: '123',
    title: '愛心廚房｜溫飽無憂的一餐，舉辦食物援助計畫',
    categoryKey: 3,
    coverUrl:
      'https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    endDate: 1720000000,
    targetMoney: 10,
    achievedMoney: 2,
    liked: true
  },
  {
    id: '456',
    title:
      '扶助之手｜為學習障礙兒童鋪路供專業支持和個別化教育計畫,幫助學習障礙兒童鋪路供專業支持和個別化教育計畫',
    categoryKey: 1,
    coverUrl:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    endDate: 1720000000,
    targetMoney: 10,
    achievedMoney: 6,
    liked: true
  }
])
</script>
<template>
  <div class="container">
    <div class="flex"></div>
    <div class="flex"></div>
    <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="project in projects" :key="project.id">
        <ProjectCard :project="project" />
      </li>
    </ul>
  </div>
</template>
