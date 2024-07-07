<script setup>
import { toastStatus, errorStatus, successStatus } from '@/utils/modalSetting'
const route = useRoute()
const router = useRouter()

const searchKeyword = useHeaderStore()
// const searching = useHeaderStore()

const loading = useLoadingStore()
const isLoading = ref(false) // 局部載入狀態

const toastStyle = ref({})
const toggleToast = ref(false)
const confirm = () => {
  toggleToast.value = false
}

const pageNo = ref(1)
const pagination = ref({})
const selectedCategory = ref(route.query.category || 0)

const selectCategory = (key = 0) => {
  // console.log('route.query', route.query)
  pageNo.value = 1
  selectedCategory.value = key
  router.push({
    query: {
      isExpired: showExpired.value || 'true',
      category: selectedCategory.value || 0,
      sort: sort.value || 1,
      pageNo: pageNo.value || 1,
      pageSize: 1,
      keyword: searchKeyword.searchKeyword
    }
  })
  getProjects()
}
const sort = ref(1)
const showExpired = ref(route.query.isExpired || 'false')
const apiProject = ref([])

// watch(
//   () => searching.searching,
//   async (val) => {
//     if (val) {
//       await getProjects()
//     }
//   }
// )

// watch(
//   () => searchKeyword.searchKeyword,
//   (val) => {
//     console.log('val', val)
//   }
// )

watch(
  () => Number(route.query.category) || 0,
  (val) => {
    console.log('val', val)
    selectCategory(val)
  }
)
const getProjects = async () => {
  isLoading.value = true
  await getFetchData({
    url: `/project/?categoryKey=${selectedCategory.value}&isExpired=${showExpired.value}&sort=${sort.value}&pageNo=${pageNo.value}&pageSize=1&keyword=${searchKeyword.searchKeyword}`,
    method: 'GET'
  })
    .then((res) => {
      apiProject.value = res.results
      pagination.value = res.pagination
    })
    .catch((err) => {
      toggleToast.value = true
      toastStyle.value = toastStatus(
        errorStatus.icon,
        errorStatus.iconClass,
        err.msg || errorStatus.msg
      )
    })
    .finally(() => {
      isLoading.value = false
    })
}
const changePage = (page) => {
  pageNo.value = page
  getProjects()
}

const toggleFollow = async (id) => {
  loading.isLoadingOverlayData = true
  await getFetchData({
    url: `/member/collection`,
    method: 'POST',
    params: { projectId: id }
  })
    .then((res) => {
      getProjects()
      toggleToast.value = true
      toastStyle.value = toastStatus(successStatus.icon, successStatus.iconClass, res.message)
    })
    .catch((err) => {
      toggleToast.value = true
      toastStyle.value = toastStatus(
        errorStatus.icon,
        errorStatus.iconClass,
        err.msg || errorStatus.msg
      )
    })
    .finally(() => {
      isLoading.value = false
      loading.isLoadingOverlayData = false
    })
}

onMounted(() => {
  loading.isGlobalLoading = false

  nextTick(async () => {
    await getProjects()
  })
})
</script>
<template>
  <div class="container py-10 lg:py-20">
    <div class="mb-10 flex flex-wrap justify-center space-x-6 lg:space-x-10">
      <button
        type="button"
        class="min-h-[42px] whitespace-nowrap border-b-2 transition-all hover:border-primary-1 hover:text-primary-1"
        :class="{
          'border-primary-1 text-primary-1': !selectedCategory,
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
        class="min-h-[42px] whitespace-nowrap border-b-2 transition-all hover:border-primary-1 hover:text-primary-1"
        :class="{
          'border-primary-1 text-primary-1': item.key == selectedCategory,
          'border-transparent': item.key !== selectedCategory
        }"
        @click="selectCategory(item.key)"
      >
        {{ item.name }}
      </button>
    </div>
    <div v-if="apiProject?.length" class="mb-4 flex justify-between">
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
    <pre>selectedCategory: {{ selectedCategory }}</pre>
    <pre>searchKeyword: {{ searchKeyword.searchKeyword }}</pre>
    <LoadingDataState v-if="isLoading" text="資料載入中..." :is-loading="isLoading" />
    <EmptyState v-else-if="!isLoading && apiProject?.length === 0" />
    <ul
      v-else-if="!isLoading && apiProject?.length > 0"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <li v-for="project in apiProject" :key="project.id">
        <ProjectCard :project="project" @follow="toggleFollow" />
      </li>
    </ul>
    <Pagination
      v-if="pagination?.totalPage > 1"
      container-class="container flex items-center justify-center py-10 lg:py-20"
      size="xl"
      :pagination="pagination"
      @page="changePage"
    />
    <BaseToast
      v-model="toggleToast"
      :msg="toastStyle.msg"
      :icon-class="toastStyle.iconClass"
      :icon="toastStyle.icon"
      @confirm="confirm"
    ></BaseToast>
  </div>
</template>

<style scoped>
/* *{
  outline: 1px solid #A00
} */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
