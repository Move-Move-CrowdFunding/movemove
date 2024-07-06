<script setup>
import { toastStatus, errorStatus } from '@/utils/modalSetting'

const isLogin = useIsLoginStore()
const loading = useLoadingStore()
const route = useRoute()
const results = ref([])
const followingList = computed(() => results.value.results || [])

const toastStyle = ref({})
const toggleToast = ref(false)
const confirm = () => {
  toggleToast.value = false
}

const isLoading = ref(false)

const pageNo = ref(1)
const pageSize = computed(() => route.query.pageSize * 1 || 6)

const pn = ref(1)
watch(
  pageNo,
  (val) => {
    pn.value = val
    nextTick(() => getFollowing())
  },
  { immediate: true }
)
const pagination = ref({
  count: 0,
  pageNo: 1,
  pageSize: 0
})
const getFollowing = async () => {
  isLoading.value = true
  try {
    results.value = await getFetchData({
      url: `/member/collection?pageNo=${pageNo.value}&pageSize=${pageSize.value}`
    })
    pagination.value = results.value.pagination
    loading.isGlobalLoading = false
    isLoading.value = false
  } catch (err) {
    toggleToast.value = true
    toastStyle.value = toastStatus(errorStatus.icon, errorStatus.iconClass, err.msg)
    loading.isGlobalLoading = false
    isLoading.value = false
  }
}

const toggleFollow = async (id) => {
  loading.isLoadingOverlayData = true
  await getFetchData({
    url: `/member/collection`,
    method: 'POST',
    params: { projectId: id }
  })
    .then((res) => {
      getFollowing()
      toggleToast.value = true
      toastStyle.value = toastStatus(successStatus.icon, successStatus.iconClass, res.message)
    })
    .catch((err) => {
      toggleToast.value = true
      toastStyle.value = toastStatus(errorStatus.icon, errorStatus.iconClass, err.msg)
    })
    .finally(() => {
      isLoading.value = false
      loading.isLoadingOverlayData = false
    })
}

const changePage = (page) => {
  pageNo.value = page
  getFollowing()
}

const checkPermission = async () => {
  if (!isLogin.isLogin) {
    await isLogin.checkLogin()
    if (!isLogin.isLogin) {
      await navigateTo('/login')
      return
    }
  }
  getFollowing()
  loading.isGlobalLoading = false
}

onMounted(() => {
  nextTick(() => {
    checkPermission()
  })
})
</script>
<template>
  <div class="container py-10 lg:py-20">
    <h1 class="mb-6 text-3xl sm:text-4xl lg:mb-10">追蹤記錄</h1>
    <LoadingDataState v-if="isLoading" text="資料載入中..." :is-loading="isLoading" />
    <EmptyState v-else-if="!isLoading && followingList?.length === 0" />
    <ul
      v-else-if="!isLoading && followingList?.length > 0"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <li v-for="project in followingList" :key="project.id">
        <ProjectCard :project="project" @follow="toggleFollow" />
      </li>
    </ul>

    <!-- <div v-if="followingList?.length" class="mt-5 flex items-center justify-center">
      <UPagination
        v-model="pn"
        :page-count="pageSize"
        :total="totalCount"
        :model-value="pn"
        @click="updateUrl"
      />
    </div> -->
    <Pagination
      v-if="pagination.totalPage > 1"
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
