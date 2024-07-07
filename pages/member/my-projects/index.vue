<script setup>
import { toastStatus, errorStatus } from '@/utils/modalSetting'
// const loading = useLoadingStore()
const isLoading = ref(false)
const sponsorIsLoading = ref(false)
const isLogin = useIsLoginStore()
const checkPermission = async () => {
  if (!isLogin.isLogin) {
    await isLogin.checkLogin()
    if (!isLogin.isLogin) {
      await navigateTo('/login')
      return
    }
  }
  await getMyProjects()
}

const results = ref({
  eachStateCount: {
    ongoing: 0,
    pending: 0,
    rejected: 0,
    ended: 0
  },
  list: []
})
const pagination = ref({
  count: 0,
  pageNo: 1,
  pageSize: 10
  // hasPre: false,
  // hasNext: false,
  // totalPage: 1
})

const sponsorList = ref([])

const sponsorPagination = ref({})

const columns = [
  { key: 'createdAt', label: '贊助時間' },
  { key: 'email', label: '帳號' },
  { key: 'money', label: '金額' },
  { key: 'info', label: '收件資料' }
]

const states = ref([
  { state: 'ongoing', name: '募資中', index: 1 },
  { state: 'pending', name: '審核中', index: 0 },
  { state: 'rejected', name: '已退回', index: -1 },
  { state: 'ended', name: '已結束', index: 2 }
])

const selectedState = ref('ongoing')

const toastStyle = ref({})
const toggleToast = ref(false)
const confirm = () => {
  toggleToast.value = false
}

const getMyProjects = async (pageNo = 1, pageSize = 10, state = 'ongoing') => {
  // loading.isGlobalLoading = true
  isLoading.value = true

  selectedState.value = state
  const index = states.value.filter((item) => item.state === state)[0].index
  await getFetchData({
    url: `/member/projects?state=${index}&pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'GET'
  })
    .then((res) => {
      results.value = res.results
      results.value.list.forEach((result) => {
        result.state = state
      })
      pagination.value = res.pagination
      // loading.isGlobalLoading = false
    })
    .catch((err) => {
      toggleToast.value = true
      toastStyle.value = toastStatus(errorStatus.icon, errorStatus.iconClass, err.msg)
      // loading.isGlobalLoading = false
    })
    .finally(() => {
      isLoading.value = false
    })
}

const sponsorProject = ref({})
const sponsorListShown = ref(false)
const getSponsorList = async (project, page = 1, pageSize = 8) => {
  // loading.isGlobalLoading = true
  sponsorIsLoading.value = true
  await getFetchData({
    url: `/member/support/${project.id}?pageNo=${page}&pageSize=${pageSize}`,
    method: 'GET'
  })
    .then((res) => {
      console.log(res.results)
      sponsorList.value = res.results
      sponsorPagination.value = res.pagination

      // loading.isGlobalLoading = false
    })
    .catch((err) => {
      toggleToast.value = true
      toastStyle.value = toastStatus(errorStatus.icon, errorStatus.iconClass, err.msg)
      // loading.isGlobalLoading = false
    })
    .finally(() => {
      sponsorIsLoading.value = false
    })
}
const showSponsorList = async (project, page) => {
  sponsorListShown.value = true
  sponsorProject.value = project
  await getSponsorList(project, page)
}
const hideSponsorList = () => {
  sponsorListShown.value = false
  sponsorProject.value = false
  sponsorList.value = []
}

const pageNo = ref(1)
const changePage = (page) => {
  pageNo.value = page
  getMyProjects(page, 10, selectedState.value)
}
const sponsorPageNo = ref(1)
const changeSponsorPage = (page) => {
  sponsorPageNo.value = page
  getSponsorList(sponsorProject.value, page)
}

onMounted(() => {
  nextTick(async () => {
    await checkPermission()
  })
})
</script>
<template>
  <div class="container py-10 lg:py-20">
    <h1 class="mb-6 text-center text-3xl font-bold lg:mb-10">提案紀錄</h1>
    <ul class="mb-6 flex flex-wrap justify-center space-x-6 lg:mb-10 lg:space-x-10">
      <li v-for="item in states" :key="item.state">
        <button
          class="stateTab"
          :class="{ active: item.state === selectedState }"
          @click="getMyProjects(1, 10, item.state)"
        >
          {{ item.name }}
          <span v-if="results.eachStateCount[item.state]">
            ({{ results.eachStateCount[item.state] }})
          </span>
        </button>
      </li>
    </ul>
    <LoadingDataState v-if="isLoading" text="資料載入中..." :is-loading="isLoading" />
    <EmptyState v-else-if="!isLoading && results.list.length === 0" />
    <ul v-else-if="!isLoading && results.list.length > 0" class="flex flex-col gap-6 lg:gap-10">
      <li v-for="item in results.list" :key="item.id">
        <MyProjectCard :data="item" @show-sponsor-list="showSponsorList" />
      </li>
    </ul>
    <!-- 贊助名單 Modal -->
    <div
      v-if="sponsorListShown"
      id="sponsorListModal"
      class="fixed left-1/2 top-1/2 z-[70] flex max-h-dvh max-w-full -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-secondary-1 px-6 py-10 shadow-2xl"
    >
      <div class="mb-6 flex items-start gap-4">
        <div>
          <h2 class="text-2xl font-bold text-white">{{ sponsorProject.title }}贊助名單</h2>
        </div>
        <button class="ml-auto text-white" @click="hideSponsorList">
          <Icon name="mdi:close" height="32" width="32" />
        </button>
      </div>
      <div class="grow overflow-auto bg-white">
        <LoadingDataState
          v-if="sponsorIsLoading"
          text="資料載入中..."
          :is-loading="sponsorIsLoading"
        />
        <div v-else-if="!sponsorIsLoading && sponsorList.length === 0" class="p-6 text-center">
          還沒有贊助紀錄
        </div>
        <UTable
          v-if="!sponsorIsLoading && sponsorList.length > 0"
          :rows="sponsorList"
          :columns="columns"
          class="overflow-visible"
        >
          <template #createdAt-data="{ row }">
            <p class="text-wrap">
              {{ $timeformat(row.createTime) }}
            </p>
          </template>
          <template #info-data="{ row }">
            <div v-if="row.isNeedFeedback">
              <p>{{ row.receiver }}</p>
              <p>{{ row.address }}</p>
              <p>{{ row.receiverPhone }}</p>
            </div>
            <div v-else>
              <p v-if="row.money >= row.feedbackMoney">不須回饋品</p>
              <p v-else>未達回饋條件</p>
            </div>
          </template>
        </UTable>
      </div>
      <Pagination
        v-if="sponsorPagination.totalPage > 1"
        container-class="container flex items-center justify-center pt-6"
        size="md"
        :pagination="sponsorPagination"
        @page="changeSponsorPage"
      />
    </div>
    <Pagination
      v-if="results.list.length > 0"
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

<style scoped lang="scss">
.stateTab {
  @apply h-full min-h-[42px] w-full whitespace-nowrap border-b-2 border-white py-2 transition-all hover:border-primary-1 hover:text-primary-1;
}
.stateTab.active {
  @apply border-primary-1 text-primary-1;
}
</style>
