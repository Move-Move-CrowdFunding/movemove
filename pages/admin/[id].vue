<script setup lang="ts">
import { getAdminProjectItem } from '@/apis/admin'

// import type { ResponseData } from '~/types/response'

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

const getProjectItem = async (id: string) => {
  const { data, error } = await getAdminProjectItem(id)
  if (error.value) return
  projectItem.value = data.value.results[0]
  pageTitle.title = projectItem.value.title
}
const route = useRoute()
const { id } = route.params

onMounted(() => {
  pageTitle.currentTitle = '提案內容'
  nextTick(async () => {
    await getProjectItem(id as string)
  })
})
</script>
<template>
  <div class="flex flex-col space-y-6">
    <div class="rounded-xl bg-neutral-50">
      <h2 class="flex-shrink-0 border-b p-4 text-xl font-semibold text-neutral-800">
        {{ pageTitle.title }}
      </h2>
      <ProjectInfo :temp-data="projectItem" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.container) {
  @apply w-full max-w-[inherit] p-4;
}
</style>
