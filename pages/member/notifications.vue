<script setup lang="ts">
import type { ResponseData } from '~/types/response'
const loading = useLoadingStore()
const WS = useWSStore()

interface NotificationItem {
  id: string
  content: string
  createTime: number
  project: {
    id: string
    title: string
    coverUrl: string
  }
}

const responsePagination = ref({
  count: 0,
  hasNext: false,
  hasPre: false,
  pageNo: 0,
  pageSize: 0,
  totalPage: 0
})

const { $dateformat } = useNuxtApp()

const isLogin = useIsLoginStore()

const tempUser = ref({})

const notificationsList: Ref<Partial<NotificationItem>[]> = ref([])

const checkPermission = async () => {
  if (!isLogin.isLogin) {
    await isLogin.checkLogin()
    if (!isLogin.isLogin) {
      await navigateTo('/login')
      return
    }
  }
  getTempUser(isLogin.userData)
}

const getNotifications = async () => {
  await getFetchData({
    url: '/member/notification',
    method: 'GET'
  }).then((res) => {
    notificationsList.value = (res as ResponseData).results
    responsePagination.value.count = (res as ResponseData).pagination.count
    responsePagination.value.hasNext = (res as ResponseData).pagination.hasNext
    responsePagination.value.hasPre = (res as ResponseData).pagination.hasPre
    responsePagination.value.pageNo = (res as ResponseData).pagination.pageNo
    responsePagination.value.pageSize = (res as ResponseData).pagination.pageSize
    responsePagination.value.totalPage = (res as ResponseData).pagination.totalPage
  })
}
const getTempUser = (data: any) => {
  tempUser.value = JSON.parse(JSON.stringify(data))
}
onMounted(() => {
  nextTick(async () => {
    await checkPermission()
    await getNotifications()
    WS.getUnRead()
    loading.isGlobalLoading = false
  })
})

watch(
  () => WS.isChange,
  async () => {
    if (WS.isChange) {
      await getNotifications()
      WS.getUnRead()
    }
  }
)

const renderContent = (content: string | undefined, projectTitle: string | undefined): string => {
  if (!content || !projectTitle) return ''
  return String(content).replace(
    projectTitle,
    `
  <span class="text-secondary-2 underline md:no-underline md:hover:underline">
    ${projectTitle}
  </span>`
  )
}
</script>
<template>
  <div class="py-10 lg:py-20">
    <div class="sm:px-auto container">
      <h1 class="mb-6 text-3xl sm:text-4xl lg:mb-10">最新通知</h1>
      <ul v-if="notificationsList && notificationsList.length > 0" class="flex flex-col">
        <li
          v-for="item in notificationsList"
          :key="item.id"
          class="relative top-0 flex-shrink-0 pb-6 [&:first-child>*>*:first-child]:top-[calc(50%_-_12px)] [&:last-child>*>*:first-child]:h-[calc(50%_-_12px)] [&:only-child>*>*:first-child]:hidden"
        >
          <NuxtLink :to="`/projects/${item?.project?.id}`">
            <div class="absolute left-1 hidden h-full border-l-2 border-neutral-200 md:block"></div>
            <div
              class="absolute -left-[1px] -top-6 bottom-0 my-auto hidden h-3 w-3 items-center justify-center rounded-full bg-neutral-200 md:flex"
            ></div>
            <div
              class="group -top-[3px] ml-0 grid grid-cols-1 items-center overflow-hidden rounded-3xl border border-primary-1 md:ml-7 lg:grid-cols-4"
            >
              <div class="relative h-56 w-full overflow-hidden lg:h-full">
                <div
                  :style="`background-image: url('${item?.project?.coverUrl}')`"
                  class="absolute inset-0 bg-cover bg-center duration-300 group-hover:scale-110"
                ></div>
              </div>
              <div class="col-span-3 space-y-2 p-3 lg:px-6 lg:py-10">
                <p class="text-neutral-600">
                  {{ item?.createTime ? $dateformat(item?.createTime) : '' }}
                </p>
                <h3
                  class="line-clamp-4 sm:text-[18px] md:line-clamp-2"
                  v-html="renderContent(item.content, item?.project?.title)"
                />
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <EmptyState v-else />
      <div
        v-if="notificationsList && notificationsList.length > responsePagination.pageSize"
        class="flex items-center justify-center pt-6"
      >
        <UPagination
          v-model="responsePagination.pageNo"
          :ui="{
            base: 'min-w-[44px] justify-center',
            rounded: 'rounded-md'
          }"
          size="xl"
          class="space-x-4"
          :page-count="responsePagination.pageSize"
          :total="notificationsList.length"
        />
      </div>
    </div>
  </div>
</template>
