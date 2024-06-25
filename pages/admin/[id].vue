<script setup lang="ts">
import type { ResponseData } from '~/types/response'
const loading = useLoadingStore()

definePageMeta({
  layout: 'admin-layout'
})

interface ProjectItem {
  _id: string
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
  reviewLog: {
    _id: string
    content: string
    status: number
    timestamp: number
  }
  state: {
    state: number
    content: string
  }
}

const projectItem = ref({} as ProjectItem)

const pageTitle = usePageTitleStore()
const route = useRoute()
const { id } = route.params

const getProjectItem = async (id: string) => {
  await getFetchData({
    url: `/admin/projects/${id}`,
    method: 'GET'
  })
    .then((res) => {
      projectItem.value = (res as ResponseData).results
      pageTitle.title = projectItem.value.title
      loading.isGlobalLoading = false
    })
    .catch((err: any) => {
      console.log('err', err)
      loading.isGlobalLoading = false
    })
}

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
    await getProjectItem(id as string)
  } else {
    alert('無瀏覽權限，請先登入')
    await navigateTo('/login')
  }
}
onMounted(() => {
  pageTitle.currentTitle = '提案內容'
  nextTick(async () => {
    await checkPermission()
  })
})
</script>
<template>
  <div class="flex flex-col space-y-6">
    <div class="rounded-xl bg-neutral-50">
      <h2 class="flex-shrink-0 border-b p-4 text-xl font-semibold text-secondary-2">
        {{ pageTitle.title }}
      </h2>
      <ProjectInfo :temp-data="projectItem" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.container) {
  @apply w-full max-w-[inherit] px-4 pb-10 pt-4;
}
</style>
