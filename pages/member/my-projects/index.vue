<script setup>
const results = {
  state: 'ongoing',
  eachStateCount: {
    ongoing: 52,
    pending: 1,
    rejected: 0,
    ended: 30
  },
  list: [
    {
      id: '123',
      title: '樂知修繕隊緊急求援|弱勢助弱勢,修家修心不能停',
      categoryId: 1,
      targetMoney: 100000,
      currentMoney: 80000,
      startDate: 1700000000,
      endDate: 1710000000,
      coverUrl:
        'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      supportCount: 70
    },
    {
      id: '456',
      title: '送非洲的孩子一雙鞋',
      categoryId: 2,
      targetMoney: 60000,
      currentMoney: 0,
      startDate: 1800000000,
      endDate: 1810000000,
      coverUrl:
        'https://images.unsplash.com/photo-1477349027984-910fe8ca2836?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      supportCount: 70
    }
  ],
  pagination: {
    count: 200,
    pageNo: 1,
    pageSize: 10,
    hasPre: false,
    hasNext: false,
    totalPage: 1
  }
}
const supportId = ref('')
const supportListShown = ref(false)
const showSupportList = (id) => {
  supportListShown.value = true
  supportId.value = id
}
const supportList = ref([
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 100,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  },
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 100,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  },
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 100,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  },
  {
    createdAt: 1720000000,
    email: 'YCYCYCYCYCYCYC@gmail.com',
    money: 100,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  },
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 100,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  },
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 100,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  },
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 100,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  },
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 100,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  },
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 100,
    name: 'YC',
    address: 'YCYCYC',
    phone: '0987654321'
  },
  {
    createdAt: 1720000000,
    email: 'YC@gmail.com',
    money: 1000,
    name: 'YCYCYC',
    address: 'YCYCYCYCYCYCYCYCYCYCYCYC',
    phone: '0987654321'
  }
])

const columns = [
  { key: 'createdAt', label: '贊助時間' },
  { key: 'email', label: '帳號' },
  { key: 'money', label: '金額' },
  { key: 'info', label: '收件資料' }
]

const pageNo = ref(1)
const changePage = (page) => {
  pageNo.value = page
  console.log(pageNo.value)
  // getAdminProjects()
}
const states = ref([
  { state: 'ongoing', name: '募資中' },
  { state: 'pending', name: '審核中' },
  { state: 'rejected', name: '已退回' },
  { state: 'ended', name: '已結束' }
])
</script>
<template>
  <div class="container py-10 lg:py-20">
    <h1 class="mb-6 text-center text-3xl font-bold lg:mb-10">提案紀錄</h1>
    <ul class="mb-6 flex justify-center lg:mb-10 lg:gap-10">
      <li v-for="item in states" :key="item.state" class="w-1/4 max-w-40">
        <button class="stateTab" :class="{ active: results.state == item.state }">
          {{ item.name }}
          <span v-if="results.eachStateCount[item.state]">
            ({{ results.eachStateCount[item.state] }})
          </span>
        </button>
      </li>
    </ul>
    <ul class="flex flex-col gap-6 lg:gap-10">
      <li v-for="item in results.list" :key="item.id">
        <MyProjectCard :state="results.state" :data="item" @show-support-list="showSupportList" />
      </li>
    </ul>
    <!-- 贊助名單 Modal -->
    <div
      v-if="supportListShown"
      id="supportListModal"
      class="fixed left-1/2 top-1/2 z-20 flex max-h-dvh max-w-full -translate-x-1/2 -translate-y-1/2 flex-col bg-secondary-1 px-6 py-10"
    >
      <div class="mb-6 flex items-center gap-4">
        <h2 class="text-2xl font-bold text-white">{{ supportId }}贊助名單</h2>
        <button class="rounded bg-primary-1 px-2 py-0.5 text-white">匯出</button>
        <button class="ml-auto text-white" @click="supportListShown = false">
          <Icon name="mdi:close" height="32" width="32" />
        </button>
      </div>
      <div class="grow overflow-scroll bg-white">
        <UTable :rows="supportList" :columns="columns" class="overflow-visible">
          <template #createdAt-data="{ row }">
            <p class="text-wrap">
              {{ $timeformat(row.createdAt) }}
            </p>
          </template>
          <template #info-data="{ row }">
            <p>{{ row.name }}</p>
            <p>{{ row.address }}</p>
            <p>{{ row.phone }}</p>
          </template>
        </UTable>
      </div>
    </div>
    <Pagination
      container-class="container flex items-center justify-center py-10 lg:py-20"
      size="xl"
      :pagination="results.pagination"
      @page="changePage"
    />
  </div>
</template>

<style scoped lang="scss">
.stateTab {
  @apply h-full w-full border-b-2 border-white py-2 hover:border-primary-3;
}
.stateTab.active {
  @apply border-primary-1;
}
</style>
