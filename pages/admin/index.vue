<script setup lang="ts">
import { getAdminProjects } from '@/apis/admin'
definePageMeta({
  layout: 'admin-layout'
})

interface ReviewLog {
  _id: string
  content: string
  status: number
  timestamp: number
}

interface ProjectsList {
  userId: string
  introduce: string
  teamName: string
  email: string
  phone: string
  title: string
  categoryKey: number
  targetMoney: number
  startDate: number
  endDate: number
  describe: string
  coverUrl: string
  content: string
  videoUrl: string
  relatedUrl: string
  feedbackItem: string
  feedbackUrl: string
  feedbackMoney: number
  feedbackDate: number
  createTime: number
  updateTime: number
  _id: number
  reviewLog: ReviewLog[]
}

// 表格欄位名稱
const columns = [
  {
    key: 'no',
    label: '#'
  },
  {
    key: '_id',
    label: '提案編號',
    sortable: true
  },
  {
    key: 'coverUrl',
    label: '封面照片'
  },
  {
    key: 'title',
    label: '案名',
    sortable: true
  },
  {
    key: 'dateRange',
    label: '起迄日期'
  },
  {
    key: 'target',
    label: '金額/目標'
  },
  {
    key: 'teamName',
    label: '提案人'
  },
  {
    key: 'reviewLog',
    label: '狀態',
    sortable: true
  }
]

// 表格資料
const projectList: Ref<Partial<ProjectsList>[]> = ref([])

// 接收回傳分頁資料
const responsePagination = ref({
  pageNo: 1,
  pageSize: 10,
  totalPage: 1,
  count: 10,
  sortDesc: 'false',
  search: ''
})

// 單頁顯示幾筆 選單
const pageList = ref([10, 20, 30, 40, 50])

// 目前頁數
const pageNo = ref(1)

// 單頁筆數
const pageSize = ref(10)

// 新舊排序
const sortList = ref([
  {
    name: '新',
    value: 'true'
  },
  {
    name: '舊',
    value: 'false'
  }
])

// 排序選擇 預設最新
const sortDesc = ref('true')

// 狀態
const statusList = ref([
  { name: '全部', value: 3 },
  { name: '已結束', value: 2 },
  { name: '否准', value: -1 },
  { name: '核准', value: 1 },
  { name: '送審', value: 0 }
])
const setStatusClass = (value: ReviewLog[]) => {
  const status = latestLog(value)
  switch (status) {
    case 2:
      return 'text-neutral-400 border-neutral-400'
    case -1:
      return 'text-warning-500 border-warning-500'
    case 1:
      return 'text-warning-700 border-warning-700'
    default:
      return 'text-secondary-3 border-secondary-3'
  }
}
// 篩選狀態
const filterState = ref(3)

// 搜尋條件
const formData = ref({
  pageNo,
  pageSize,
  sortDesc,
  state: filterState,
  search: ''
})

const pending = ref(true)

const getProjects = async (query: any) => {
  pending.value = true

  const { data, error } = await getAdminProjects(query.value)
  if (error.value) return

  projectList.value = data.value?.results

  pending.value = false

  responsePagination.value.pageNo = parseInt(data.value?.pagination.pageNo)
  responsePagination.value.pageSize = parseInt(data.value?.pagination.pageSize)
  responsePagination.value.totalPage = parseInt(data.value?.pagination.totalPage)
  responsePagination.value.count = parseInt(data.value?.pagination.count)
  responsePagination.value.sortDesc = data.value?.pagination.sortDesc
  responsePagination.value.search = data.value?.pagination.search
}

const changePage = (page: number) => {
  pageNo.value = page
}

// 監聽 每頁幾筆
watch(pageSize, async () => {
  await getProjects(formData)
})

// 監聽 目前分頁
watch(pageNo, async () => {
  await getProjects(formData)
})

const isLogin = useIsLoginStore()
const checkPermission = async () => {
  if (!isLogin.isLogin) {
    await isLogin.checkLogin()
    if (!isLogin.isLogin) {
      await navigateTo('/login')
      return
    }
  }
  if (isLogin.userData.auth) {
    await getProjects(formData)
  } else {
    alert('無瀏覽權限，請先登入')
    await navigateTo('/login')
  }
}
const search = async () => {
  formData.value.state = filterState.value
  formData.value.sortDesc = sortDesc.value
  await getProjects(formData)
}
const resetSearch = () => {
  filterState.value = 3
  formData.value.pageNo = 1
  formData.value.pageSize = 10
  formData.value.sortDesc = 'true'
  formData.value.state = 3
  formData.value.search = ''
}

const latestLog = (state: ReviewLog[]) => state[state.length - 1]?.status
const getStatus = (state: ReviewLog[]) =>
  statusList.value.find((item) => item.value === latestLog(state))

const pageTitle = usePageTitleStore()

onMounted(() => {
  pageTitle.currentTitle = '提案列表'
  nextTick(() => {
    checkPermission()
  })
})
</script>
<template>
  <div class="flex flex-1 flex-col overflow-y-auto">
    <div
      class="mb-4 grid w-full grid-cols-2 justify-start gap-x-4 gap-y-6 rounded-xl bg-neutral-100/70 bg-neutral-50 p-4 shadow-sm lg:grid-cols-6 lg:gap-x-8"
    >
      <div class="col-span-2 flex items-center space-x-2 whitespace-nowrap lg:col-span-2">
        <UInput
          v-model.trim="formData.search"
          size="md"
          icon="i-heroicons-magnifying-glass-20-solid"
          autocomplete="off"
          :ui="{ icon: { trailing: { pointer: '' } } }"
          class="w-full"
          placeholder="請輸入提案標題或編號"
        />
      </div>
      <div class="col-span-2 flex items-center space-x-2 whitespace-nowrap md:col-span-1">
        <span class="text-sm">狀態</span>
        <USelect
          v-model.number="filterState"
          size="md"
          class="w-full"
          :options="statusList"
          option-attribute="name"
        />
      </div>
      <div class="col-span-2 flex items-center space-x-2 whitespace-nowrap md:col-span-1">
        <span class="text-sm">新舊排序</span>
        <USelect
          v-model="sortDesc"
          size="md"
          class="w-full"
          :options="sortList"
          option-attribute="name"
        />
      </div>
      <UButton
        icon="i-heroicons-arrow-path"
        class="col-span-2 w-full border border-neutral-400 bg-neutral-100 text-neutral-500 transition-all hover:bg-neutral-200 md:col-span-1 lg:[width:max-content]"
        size="md"
        @click="resetSearch"
        >重設搜尋條件</UButton
      >
      <UButton
        icon="i-heroicons-magnifying-glass"
        class="col-span-2 !ml-auto w-full bg-secondary-2 transition-all hover:bg-primary-1 md:col-span-1 lg:[width:max-content]"
        size="md"
        @click="search"
        >搜尋</UButton
      >
    </div>
    <UTable
      :ui="{
        wrapper: 'rounded-xl bg-neutral-50 shadow-sm',
        th: {
          base: 'whitespace-nowrap',
          padding:
            'py-2 px-3 [&:first-child]:pl-6 [&:first-child]:pr-3 [&:last-child]:pr-6 [&:last-child]:pl-3'
        },
        tr: {
          base: 'hover:bg-neutral-100/60'
        },
        td: {
          base: 'whitespace-normal',
          padding:
            'py-2 px-3 [&:first-child]:pl-6 [&:first-child]:pr-3 [&:last-child]:pr-6 [&:last-child]:pl-3'
        }
      }"
      :rows="projectList"
      :columns="columns"
      :loading="pending"
    >
      <template #loading-state>
        <div class="flex h-32 items-center justify-center">
          <i class="loader" />
        </div>
      </template>
      <template #no-data="{ index }">
        <span>
          {{ index + 1 }}
        </span>
      </template>
      <template #_id-data="{ row }">
        <p class="break-words text-xs font-semibold">{{ row._id }}</p>
      </template>
      <template #title-data="{ row }">
        <div class="line-clamp-2">
          <NuxtLink
            :to="`/admin/${row._id}`"
            class="block break-words text-secondary-2 hover:underline"
            >{{ row.title }}</NuxtLink
          >
        </div>
      </template>
      <template #coverUrl-data="{ row }">
        <img
          :src="row.coverUrl"
          class="h-16 w-16 max-w-[inherit] rounded border object-cover"
          alt=""
        />
      </template>
      <template #dateRange-data="{ row }">
        <div class="space-y-2">
          <p>{{ $dateformat(row.startDate) }}</p>
          <p>{{ $dateformat(row.endDate) }}</p>
        </div>
      </template>
      <template #target-data="{ row }">
        <div
          class="flex flex-wrap overflow-hidden whitespace-nowrap font-semibold text-neutral-700 [word-break:break-word]"
        >
          <p>${{ row.feedbackMoney }}</p>
          <div class="mx-1">/</div>
          <p>${{ row.targetMoney }}</p>
        </div>
      </template>
      <template #teamName-data="{ row }">
        <div class="line-clamp-2">
          {{ row.teamName }}
        </div>
      </template>
      <template #reviewLog-data="{ row }">
        <p
          :class="setStatusClass(row.reviewLog)"
          class="w-[54px] overflow-hidden rounded border text-center"
        >
          {{ getStatus(row?.reviewLog)?.name }}
        </p>
      </template>
      <template #empty-state>
        <div class="flex flex-col items-center justify-center gap-3 py-6">
          <span class="text-sm">暫無資料</span>
        </div>
      </template>
    </UTable>
    <div
      class="flex flex-wrap items-center space-y-6 px-0 py-6 text-neutral-700 lg:flex-row lg:flex-nowrap lg:justify-end lg:space-x-6 lg:space-y-0"
    >
      <div class="flex w-full items-center justify-center md:w-1/2">
        <div
          class="flex w-full flex-wrap items-center justify-center space-x-2 text-sm lg:mr-auto lg:justify-start lg:[width:max-content]"
        >
          <span>總共</span>
          <p>{{ responsePagination.count }}</p>
          <span>筆資料</span>
        </div>
      </div>
      <div class="flex w-full items-center justify-center md:!mt-0 md:w-1/2">
        <div
          class="flex items-center justify-center space-x-2 text-sm [max-width:max-content] md:w-full md:[max-width:inherit] lg:justify-end"
        >
          <span class="flex-shrink-0">每頁</span>
          <USelect
            v-model.number="pageSize"
            class="w-full lg:[width:max-content]"
            size="md"
            :options="pageList"
            option-attribute="name"
          />
          <span class="flex-shrink-0">筆</span>
        </div>
      </div>
      <Pagination
        class="mx-auto md:mt-6 lg:mt-0"
        :pagination="responsePagination"
        @page="changePage"
      />
    </div>
  </div>
</template>
<style lang="scss">
tr {
  @apply transition-all;
}
thead {
  tr {
    @apply [&:first-child]:hover:bg-neutral-50;
  }
}
.loader {
  --loader: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;

  aspect-ratio: 1;
  mask: var(--loader);
  mask-composite: source-out;
  mask-composite: subtract;

  @apply w-[50px] animate-[l3_1s_infinite_linear] rounded-full bg-neutral-400 p-2;
}

@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
