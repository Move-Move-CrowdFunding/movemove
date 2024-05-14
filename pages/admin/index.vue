<template>
  <div class="flex flex-1 flex-col overflow-y-auto">
    <h2 class="flex-shrink-0 py-3 font-semibold text-neutral-800">管理 - 提案列表</h2>
    <div class="flex w-full space-x-4 border-b border-gray-200 py-3 dark:border-gray-700">
      <div class="flex items-center space-x-2">
        <span class="text-sm">提案編號</span>
        <UInput v-model="q" placeholder="請輸入提案編號" />
      </div>
      <!-- <div class="flex items-center space-x-2">
        <span class="text-sm">案名</span>
        <UInput v-model="q" placeholder="請輸入案名" />
      </div> -->
      <div class="flex items-center space-x-2">
        <span class="text-sm">狀態</span>
        <USelect v-model="filterStatus" :options="statusList" />
      </div>
      <UButton class="!ml-auto" size="md" color="primary">搜尋</UButton>
    </div>
    <div class="flex justify-end border-t border-gray-200 px-3 py-3.5 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="projectList.length" />
    </div>
    <UTable
      :ui="{
        th: {
          base: 'whitespace-nowrap',
          padding: 'p-2'
        },
        td: {
          base: 'whitespace-normal',
          padding: 'p-2'
        }
      }"
      :rows="filteredRows"
      :columns="columns"
    >
      <template #no-data="{ index }">
        <div class="line-clamp-2">
          {{ index + 1 }}
        </div>
      </template>
      <template #title-data="{ row }">
        <div class="line-clamp-2">
          <NuxtLink
            :to="`/admin/${row.id}`"
            class="block break-words text-secondary-2 hover:underline"
            >{{ row.title }}</NuxtLink
          >
        </div>
      </template>
      <template #id-data="{ row }">
        <p class="break-words">{{ row.id }}</p>
      </template>
      <template #coverUrl-data="{ row }">
        <img :src="row.coverUrl" class="h-20 w-20 max-w-[inherit] border object-contain" alt="" />
      </template>
      <template #dateRange-data="{ row }">
        <div class="space-y-2">
          <p>{{ dayjs(row.startDate * 1000).format('YYYY/MM/DD') }}</p>
          <p>{{ dayjs(row.endDate * 1000).format('YYYY/MM/DD') }}</p>
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
      <template #empty-state>
        <div class="flex flex-col items-center justify-center gap-3 py-6">
          <span class="text-sm">暫無資料</span>
        </div>
      </template>
    </UTable>
    <div class="flex justify-end border-t border-gray-200 px-3 py-3.5 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="projectList.length" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDayjs } from '#dayjs'
import type { ResponseData } from '~/types/response'
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
  id: number
  // status: string
}

const dayjs = useDayjs()

const columns = [
  {
    key: 'no',
    label: '#',
    sortable: true
  },
  {
    key: 'id',
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

const projectList: Ref<Partial<ProjectsList>[]> = ref([])

// 分頁
const page = ref(1)
const pageCount = 10
const rows = computed(() => {
  return projectList.value.slice((page.value - 1) * pageCount, page.value * pageCount)
})

// select
const statusList = ['全部', '募資中', '已結束', '待審核', '已退回']
const filterStatus = ref(statusList[0])

// 搜尋
const q = ref('')
const filteredRows = computed(() => {
  if (!q.value) {
    return rows.value
  }
  return rows.value.filter((item) => {
    return Object.values(item).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const getProjects = async () => {
  await getFetchData({
    url: '/admin/projects',
    method: 'GET',
    params: {
      pageNo: 1,
      pageSize: 10,
      sortDesc: 0,
      status: 0
    }
  })
    .then((res) => {
      projectList.value = (res as ResponseData).results
    })
    .catch((err) => console.log(err))
}

const isLogin = useIsLoginStore()

const checkPermission = async () => {
  await isLogin.getUserData()
  if (isLogin.userData.auth) {
    getProjects()
  } else {
    alert('無瀏覽權限，請先登入')
    await navigateTo('/login')
  }
}
onMounted(() => {
  nextTick(() => {
    checkPermission()
  })
})
</script>
