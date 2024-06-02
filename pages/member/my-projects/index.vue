<script setup>
// import { _10 } from '#tailwind-config/theme/aspectRatio';

const isLogin = useIsLoginStore()
const checkPermission = async () => {
  await isLogin.getUserData()
  if (isLogin.userData.email) {
    await getMyProjects()
  } else {
    await navigateTo('/login')
  }
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
const sponsorId = ref('')
const sponsorListShown = ref(false)
const showSponsorList = (id) => {
  console.log(id)
  sponsorListShown.value = true
  sponsorId.value = id
}
const sponsorList = ref([
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 100,
    feedbackMoney: 100,
    isNeedFeedback: false,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  },
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 80,
    feedbackMoney: 100,
    isNeedFeedback: false,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  },
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 100,
    feedbackMoney: 100,
    isNeedFeedback: true,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  },
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 200,
    feedbackMoney: 100,
    isNeedFeedback: true,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  }
])

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
    })
    .catch((err) => console.log(err))
}
const pageNo = ref(1)
const changePage = (page) => {
  pageNo.value = page
  getMyProjects(page, 10, selectedState.value)
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
        <MyProjectCard :data="item" @show-sponsor-list="showSponsorList(item.id)" />
      </li>
    </ul>
    <div v-else class="text-center">找不到相符條件的資料</div>
    <!-- 贊助名單 Modal -->
    <div
      v-if="sponsorListShown"
      id="sponsorListModal"
      class="fixed left-1/2 top-1/2 z-[70] flex max-h-dvh max-w-full -translate-x-1/2 -translate-y-1/2 flex-col bg-secondary-1 px-6 py-10"
    >
      <div class="mb-6 flex items-center gap-4">
        <h2 class="text-2xl font-bold text-white">{{ sponsorId }}贊助名單</h2>
        <button class="rounded bg-primary-1 px-2 py-0.5 text-white">匯出</button>
        <button class="ml-auto text-white" @click="sponsorListShown = false">
          <Icon name="mdi:close" height="32" width="32" />
        </button>
      </div>
      <div class="grow overflow-auto bg-white">
        <UTable :rows="sponsorList" :columns="columns" class="overflow-visible">
          <template #createdAt-data="{ row }">
            <p class="text-wrap">
              {{ $timeformat(row.createdAt) }}
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
      </div>
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
