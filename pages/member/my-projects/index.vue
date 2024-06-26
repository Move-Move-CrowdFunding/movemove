<script setup>
// import { _10 } from '#tailwind-config/theme/aspectRatio';
const loading = useLoadingStore()

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

const getMyProjects = async (pageNo = 1, pageSize = 10, state = 'ongoing') => {
  loading.isGlobalLoading = true

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
      loading.isGlobalLoading = false
    })
    .catch((err) => {
      console.log(err)
      loading.isGlobalLoading = false
    })
}

const sponsorProject = ref({})
const sponsorListShown = ref(false)
const getSponsorList = async (project, page = 1, pageSize = 8) => {
  loading.isGlobalLoading = true

  await getFetchData({
    url: `/member/support/${project.id}?pageNo=${page}&pageSize=${pageSize}`,
    method: 'GET'
  })
    .then((res) => {
      console.log(res)
      sponsorList.value = res.results
      sponsorPagination.value = res.pagination

      loading.isGlobalLoading = false
    })
    .catch((err) => {
      console.log(err)
      loading.isGlobalLoading = false
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
    <ul class="mb-6 flex justify-center lg:mb-10 lg:gap-10">
      <li v-for="item in states" :key="item.state" class="w-1/4 max-w-40">
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
    <ul v-if="results.list.length" class="flex flex-col gap-6 lg:gap-10">
      <li v-for="item in results.list" :key="item.id">
        <MyProjectCard :data="item" @show-sponsor-list="showSponsorList" />
      </li>
    </ul>
    <EmptyState v-else />
    <!-- 贊助名單 Modal -->
    <div
      v-if="sponsorListShown"
      id="sponsorListModal"
      class="fixed left-1/2 top-1/2 z-[70] flex max-h-dvh max-w-full -translate-x-1/2 -translate-y-1/2 flex-col bg-secondary-1 px-6 py-10 shadow-2xl"
    >
      <div class="mb-6 flex items-start gap-4">
        <div>
          <h2 class="text-2xl font-bold text-white">{{ sponsorProject.title }}贊助名單</h2>
          <button
            v-if="sponsorList?.length"
            class="shrink-0 self-center rounded bg-primary-1 px-2 py-0.5 text-white"
          >
            匯出
          </button>
        </div>
        <button class="ml-auto text-white" @click="hideSponsorList">
          <Icon name="mdi:close" height="32" width="32" />
        </button>
      </div>
      <div class="grow overflow-auto bg-white">
        <UTable
          v-if="sponsorList.length"
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
              <p>{{ row.name }}</p>
              <p>{{ row.address }}</p>
              <p>{{ row.phone }}</p>
            </div>
            <div v-else>
              <p v-if="row.money >= row.feedbackMoney">不須回饋品</p>
              <p v-else>未達回饋條件</p>
            </div>
          </template>
        </UTable>
        <div v-else class="p-6 text-center">還沒有贊助紀錄</div>
      </div>
      <Pagination
        v-if="sponsorPagination.totalPage"
        container-class="container flex items-center justify-center pt-6"
        size="md"
        :pagination="sponsorPagination"
        @page="changeSponsorPage"
      />
    </div>
    <Pagination
      v-if="results.list.length"
      container-class="container flex items-center justify-center py-10 lg:py-20"
      size="xl"
      :pagination="pagination"
      @page="changePage"
    />
  </div>
</template>

<style scoped lang="scss">
.stateTab {
  @apply h-full w-full border-b-2 border-white py-2 hover:border-primary-3;
}
.stateTab.active {
  @apply border-primary-1 font-bold;
}
</style>
