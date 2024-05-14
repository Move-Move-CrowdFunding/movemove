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
        <USelect v-model="filterStatus" :options="statusList" option-attribute="name" />
      </div>
      <UButton class="!ml-auto" size="md" color="primary" @click="search">搜尋</UButton>
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
        <span>
          {{ index + 1 }}
        </span>
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
    <pre>{{ projectList }}</pre>
  </div>
</template>
<script setup lang="ts">
// import type { ResponseData } from '~/types/response'
import { useDayjs } from '#dayjs'
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
const pageCount = ref(10)
const rows = computed(() => {
  return projectList.value.slice((page.value - 1) * pageCount.value, page.value * pageCount.value)
})

// select
// interface StatusList {
//   name: string
//   value: number
// }
const statusList = ref([
  { name: '全部', value: 3 },
  { name: '已結束', value: 2 },
  { name: '否准', value: -1 },
  { name: '核准', value: 1 },
  { name: '送審', value: 0 }
])
// console.log('statusList', statusList.value)
const filterStatus = ref(statusList.value[0])

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
const formData = ref({
  pageNo: page.value || 1,
  pageSize: pageCount.value || 10,
  sortDesc: false,
  status: filterStatus.value.value || 3
})

const getProjects = async (query: any) => {
  // console.log('query', query.value)
  // await getFetchData({
  //   url: '/admin/projects',
  //   method: 'GET',
  //   params: query.value
  // })
  //   .then((res) => {
  projectList.value = (res as ResponseData).results
  //   })
  //   .catch((err) => console.log(err))
  // const { response } = await useCustomFetch<ProjectsList[]>('/admin/projects', {
  //   method: 'GET'
  //   // body:
  // })
  const { data } = await useGetProjects(query.value)
  // console.log('data', data)
  projectList.value = data.value?.results
}

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
  await getProjects(formData)
}
onMounted(() => {
  // console.log('formData', formData.value, filterStatus)
  nextTick(() => {
    checkPermission()
  })
})
</script>
