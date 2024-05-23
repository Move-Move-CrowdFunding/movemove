<script setup>
const pageNo = ref(1)
const pagination = ref({})
const selectedCategory = ref(0)
const selectCategory = (key) => {
  pageNo.value = 1
  selectedCategory.value = key
  getProjects()
}
const sort = ref(1)
const showExpired = ref(false)
const apiProject = ref([])
const getProjects = async () => {
  await getFetchData({
    url: `/project/?categoryKey=${selectedCategory.value}&isExpried=${showExpired.value}&sort=${sort.value}&pageNo=${pageNo.value}&pageSize=1`,
    method: 'GET'
  })
    .then((res) => {
      apiProject.value = res.results
      pagination.value = res.pagination
    })
    .catch((err) => console.log(err))
}
const changePage = (page) => {
  pageNo.value = page
  getProjects()
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
          v-model="showExpired"
          type="checkbox"
          class="mr-2 h-5 w-5 appearance-none rounded-sm border-secondary-1 outline outline-2 outline-secondary-1 after:relative after:block after:h-5/6 after:w-6/12 after:translate-x-[5px] checked:bg-secondary-1 checked:after:relative checked:after:rotate-45 checked:after:border-b-4 checked:after:border-r-4 checked:after:border-white"
          @change="getProjects"
        />
        <label for="showAll" class="flex items-center gap-2">顯示已結束提案</label>
      </div>
      <select id="" v-model="sort" name="" class="px-2 py-1" @change="getProjects">
        <option value="1">由新到舊</option>
        <option value="2">由舊到新</option>
      </select>
    </div>
    <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="project in apiProject" :key="project.id">
        <ProjectCard :project="project" />
      </li>
    </ul>
    <Pagination :pagination="pagination" @page="changePage" />
  </div>
</template>

<style scoped>
/* *{
  outline: 1px solid #A00
} */
</style>
