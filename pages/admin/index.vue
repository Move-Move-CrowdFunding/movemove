<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout'
})

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
  status: boolean
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
    key: 'status',
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
const setStatusClass = (value: number) => {
  switch (value) {
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
const filterStatus = ref(3)

// 搜尋條件
const formData = ref({
  pageNo,
  pageSize,
  sortDesc,
  status: filterStatus,
  search: ''
})

const pending = ref(true)

const getProjects = async (query: any) => {
  pending.value = true

  const { data, error } = await useGetProjects(query.value)
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
  await isLogin.getUserData()
  if (isLogin.userData.auth) {
    await getProjects(formData)
  } else {
    alert('無瀏覽權限，請先登入')
    await navigateTo('/login')
  }
}
const search = async () => {
  formData.value.status = filterStatus.value
  formData.value.sortDesc = sortDesc.value
  await getProjects(formData)
}
const resetSearch = () => {
  filterStatus.value = 3
  formData.value.pageNo = 1
  formData.value.pageSize = 10
  formData.value.sortDesc = 'true'
  formData.value.status = 3
  formData.value.search = ''
}

const getStatus = (status: number) => statusList.value.find((item) => item.value === status)

onMounted(() => {
  nextTick(() => {
    checkPermission()
  })
})
</script>
<template>
  <div class="flex flex-1 flex-col overflow-y-auto">
    <!-- <h2 class="flex-shrink-0 py-6 font-semibold text-neutral-800">管理 - 提案列表</h2> -->
    <!-- <div class="bg-neutral-50 p-3">
      <UBreadcrumb :links="links" />
    </div> -->
    <div
      class="mb-4 flex w-full flex-wrap justify-start space-x-8 rounded-xl bg-neutral-100/70 bg-neutral-50 px-4 py-4 shadow-sm"
    >
      <div class="flex items-center space-x-2 whitespace-nowrap">
        <!-- <span class="text-sm">搜尋</span> -->
        <UInput
          v-model.trim="formData.search"
          icon="i-heroicons-magnifying-glass-20-solid"
          autocomplete="off"
          :ui="{ icon: { trailing: { pointer: '' } } }"
          class="w-full"
          placeholder="請輸入提案標題或編號"
        />
      </div>
      <div class="flex items-center space-x-2 whitespace-nowrap">
        <span class="text-sm">狀態</span>
        <USelect v-model.number="filterStatus" :options="statusList" option-attribute="name" />
      </div>
      <div class="flex items-center space-x-2 whitespace-nowrap">
        <span class="text-sm">新舊排序</span>
        <USelect v-model="sortDesc" :options="sortList" option-attribute="name" />
      </div>
      <UButton
        icon="i-heroicons-arrow-path"
        class="!mr-4 ml-auto"
        size="sm"
        color="gray"
        @click="resetSearch"
        >重設搜尋條件</UButton
      >
      <UButton
        icon="i-heroicons-magnifying-glass"
        class="!ml-auto"
        size="md"
        color="primary"
        @click="search"
        >搜尋</UButton
      >
    </div>
    <div class="flex justify-end space-x-6 px-0 py-6 text-neutral-700">
      <div class="mr-auto flex items-center space-x-2 text-sm">
        <span>總共</span>
        <p>{{ responsePagination.count }}</p>
        <span>筆資料</span>
      </div>
      <div class="flex items-center space-x-2 text-sm">
        <span>每頁</span>
        <USelect v-model.number="pageSize" :options="pageList" option-attribute="name" />
        <span>筆</span>
      </div>
      <UPagination v-model="pageNo" :page-count="pageSize" :total="responsePagination.count" />
    </div>
    <UTable
      :ui="{
        wrapper: 'min-h-[300px] rounded-xl bg-neutral-50 shadow-sm',
        th: {
          base: 'whitespace-nowrap',
          padding:
            'py-2 px-3 [&:first-child]:pl-6 [&:first-child]:pr-3 [&:last-child]:pr-6 [&:last-child]:pl-3'
        },
        tr: {
          base: ' hover:bg-neutral-100/60'
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
          <i class="loader --6" />
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
        <div class="flex flex-wrap overflow-hidden whitespace-normal [word-break:break-word]">
          <p>{{ row.feedbackMoney }}</p>
          <div class="mx-1">/</div>
          <p>{{ row.targetMoney }}</p>
        </div>
      </template>
      <template #teamName-data="{ row }">
        <div class="line-clamp-2">
          {{ row.teamName }}
        </div>
      </template>
      <template #status-data="{ row }">
        <p
          :class="setStatusClass(row.status)"
          class="w-[54px] overflow-hidden rounded border text-center"
        >
          {{ getStatus(row.status)?.name }}
        </p>
      </template>
      <template #empty-state>
        <div class="flex flex-col items-center justify-center gap-3 py-6">
          <span class="text-sm">暫無資料</span>
        </div>
      </template>
    </UTable>
    <div class="flex justify-end space-x-6 px-0 py-6 text-neutral-700">
      <div class="mr-auto flex items-center space-x-2 text-sm">
        <span>總共</span>
        <p>{{ responsePagination.count }}</p>
        <span>筆資料</span>
      </div>
      <div class="flex items-center space-x-2 text-sm">
        <span>每頁</span>
        <USelect v-model.number="pageSize" :options="pageList" option-attribute="name" />
        <span>筆</span>
      </div>
      <UPagination v-model="pageNo" :page-count="pageSize" :total="responsePagination.count" />
    </div>
  </div>
</template>
<style lang="scss">
tr {
  @apply transition-all;
}
.loader {
  --color: rgb(var(--color-primary-400));
  --size-mid: 6vmin;
  --size-dot: 1.5vmin;
  --size-bar: 0.4vmin;
  --size-square: 3vmin;

  position: relative;
  display: block;
  display: grid;
  width: 50%;
  place-items: center;
}
.loader::before,
.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
}

/**
    loader --6
**/
.loader.--6::before {
  top: calc(50% - var(--size-square));
  left: calc(50% - var(--size-square));
  width: var(--size-square);
  height: var(--size-square);
  background-color: var(--color);
  animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes loader-6 {
  0%,
  100% {
    transform: none;
  }
  25% {
    transform: translateX(100%);
  }
  50% {
    transform: translateX(100%) translateY(100%);
  }
  75% {
    transform: translateY(100%);
  }
}
</style>
