<script setup>
import { useDayjs } from '#dayjs'
const loading = useLoadingStore()

const dayjs = useDayjs()
const route = useRoute()

const SupportData = ref([])
const items = computed(() => SupportData.value?.results || [])
const pageNo = ref(1)
const pageSize = computed(() => route.query.pageSize * 1 || 10)

const pagination = ref({})
const getSupportData = async () => {
  try {
    const results = await getFetchData({
      url: `/member/support?pageNo=${pageNo.value}&pageSize=${pageSize.value}`
    })
    SupportData.value = results
    pagination.value = results.pagination
    loading.isGlobalLoading = false
  } catch (error) {
    console.log(error)
    loading.isGlobalLoading = false
  }
}

const pn = ref(1)
watch(
  pageNo,
  (val) => {
    pn.value = val
    nextTick(() => getSupportData())
  },
  { immediate: true }
)

const changePage = (page) => {
  pageNo.value = page
  // getSupportData()
}
</script>
<template>
  <div class="py-10 lg:py-20">
    <h1 class="container mb-6 text-3xl sm:text-4xl lg:mb-10">贊助記錄</h1>
    <UAccordion v-if="items?.length" multiple :items="items" class="container">
      <template #default="{ item, open }">
        <UButton color="gray" variant="ghost" class="mt-2 p-0">
          <div
            class="relative flex w-full flex-col-reverse items-stretch gap-2 bg-secondary-2 px-3 py-4 text-white sm:flex-row lg:gap-4"
          >
            <div class="mr-auto text-left">
              <div class="items-center gap-2 sm:flex">
                <div class="shrink text-lg font-bold sm:line-clamp-1 lg:text-xl">
                  {{ item.project.title }}
                </div>
              </div>
              <div class="mt-2 flex items-center gap-3">
                <span class="rounded-full bg-primary-1 px-2 py-0.5 text-xs">{{
                  categoryKeys[item.project.categoryKey].name
                }}</span>
                <p v-if="item.project.feedbackItem" class="text-sm sm:mt-0">
                  回饋：{{ item.project.feedbackItem }}
                </p>
              </div>
            </div>
            <div
              class="flex w-full shrink-0 items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-end sm:text-end"
            >
              <div class="text-xs">
                {{ dayjs.unix(item.createTime).format('YYYY/MM/DD HH:mm:ss') }}
              </div>
              <div class="font-bold">NT$ {{ item.money }}</div>
            </div>
            <div class="absolute bottom-0 right-0 p-3 sm:relative">
              <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="ms-auto h-5 w-5 transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
            </div>
          </div>
        </UButton>
      </template>
      <template #item="{ item }">
        <div class="border-2 border-secondary-2 bg-white px-3 py-4 text-base">
          <div>
            <template v-if="item.isNeedFeedback">
              <div class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
                <div class="font-bold">收件人</div>
                <div class="sm:col-span-3 lg:col-span-5">{{ item.receiver }}</div>
              </div>
              <div class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
                <div class="font-bold">寄件地址</div>
                <div class="sm:col-span-3 lg:col-span-5">{{ item.address }}</div>
              </div>
              <div class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
                <div class="font-bold">連絡電話</div>
                <div class="sm:col-span-3 lg:col-span-5">{{ item.receiverPhone }}</div>
              </div>
              <div class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
                <div class="font-bold">電子郵件</div>
                <div class="sm:col-span-3 lg:col-span-5">{{ item.email }}</div>
              </div>
            </template>
            <div class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
              <template v-if="item.isNeedFeedback">
                <div class="font-bold">預計寄送日期</div>
                <div class="sm:col-span-2 lg:col-span-4">
                  {{ dayjs.unix(item.feedBackDate).format('YYYY/MM/DD') }}
                </div>
              </template>
              <div class="text-right">
                <NuxtLink
                  :to="`/projects/${item.project._id}`"
                  class="underline underline-offset-2 hover:text-primary-1"
                  >前往專案</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </UAccordion>
    <EmptyState v-else />
    <!-- <div v-if="items?.length" class="mt-5 flex items-center justify-center">
      <UPagination
        v-model="pn"
        :page-count="pageSize"
        :total="totalCount"
        :model-value="pn"
        @click="updateUrl"
      />
    </div> -->
    <Pagination
      v-if="items?.length"
      container-class="container flex items-center justify-center py-10 lg:py-20"
      size="xl"
      :pagination="pagination"
      @page="changePage"
    />
  </div>
</template>

<style scoped lang="scss">
.quick-example {
  display: grid;
  border-radius: 0.5rem;
  grid-template-rows: 0fr;
  transition: grid-template-rows 500ms;
}
.quick-example > table {
  overflow: hidden;
}
.quick-example-group:hover {
  .quick-example {
    grid-template-rows: 1fr;
  }
}
</style>
