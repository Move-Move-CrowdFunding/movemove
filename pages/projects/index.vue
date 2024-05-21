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
    achievedMoney: 2
  },
  {
    id: '456',
    title:
      '扶助之手｜為學習障礙兒童鋪路供專業支持和個別化教育計畫,幫助學習障礙兒童鋪路供專業支持和個別化教育計畫',
    categoryKey: 1,
    coverUrl:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    endDate: 1700000000,
    targetMoney: 10,
    achievedMoney: 6
  }
])

const apiProject = ref([])
const getProjects = async () => {
  await getFetchData({
    url: '/project/',
    method: 'GET',
    params: {
      pageNo: 1,
      pageSize: 10,
      categoryKey: 0,
      sort: 1
    }
  })
    .then((res) => {
      apiProject.value = res
      console.log('apiProject', apiProject.value)
    })
    .catch((err) => console.log(err))
}
const selectedCategory = ref(0)
const selectCategory = (key) => {
  selectedCategory.value = key
}

onMounted(() => {
  nextTick(async () => {
    await getProjects()
  })
})
</script>
<template>
  <div class="container py-10 lg:py-20">
    <div class="mb-10 flex flex-wrap justify-center gap-4">
      <button
        type="button"
        class="border-b-2"
        :class="{
          'border-primary-1': !selectedCategory,
          'border-transparent': selectedCategory
        }"
        @click="selectCategory(0)"
      >
        全部
      </button>
      <button
        v-for="item in categoryKeys"
        :key="item"
        type="button"
        class="border-b-2"
        :class="{
          'border-primary-1': item.key == selectedCategory,
          'border-transparent': item.key !== selectedCategory
        }"
        @click="selectCategory(item.key)"
      >
        {{ item.name }}
      </button>
    </div>
    <div class="mb-4 flex justify-between">
      <div class="flex items-center">
        <input
          id="showAll"
          type="checkbox"
          class="mr-2 h-5 w-5 appearance-none rounded-sm border-secondary-1 outline outline-2 outline-secondary-1 after:relative after:block after:h-5/6 after:w-6/12 after:translate-x-[5px] checked:bg-secondary-1 checked:after:relative checked:after:rotate-45 checked:after:border-b-4 checked:after:border-r-4 checked:after:border-white"
        />
        <label for="showAll" class="flex items-center gap-2">顯示已結束提案</label>
      </div>
      <select id="" name="" class="px-2 py-1">
        <option value="">由新到舊</option>
        <option value="">由舊到新</option>
      </select>
    </div>
    <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="project in projects" :key="project.id">
        <ProjectCard :project="project" />
      </li>
    </ul>
    <pre>{{ apiProject }}</pre>
  </div>
</template>

<style scoped>
/* *{
  outline: 1px solid #A00
} */
</style>
