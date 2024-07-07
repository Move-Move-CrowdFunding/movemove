<script setup>
import { useDayjs } from '#dayjs'
import { toastStatus, errorStatus } from '@/utils/modalSetting'
const loading = useLoadingStore()
const isLogin = useIsLoginStore()
const isLoading = ref(false)

const dayjs = useDayjs()
const route = useRoute()

const SupportData = ref([])
const items = computed(() => {
  if (SupportData.value?.results) {
    return SupportData.value?.results.map((item) => ({
      ...item,
      disabled: !item.isNeedFeedback
    }))
  } else {
    return []
  }
})

const toastStyle = ref({})
const toggleToast = ref(false)
const confirm = () => {
  toggleToast.value = false
}

const pageNo = ref(1)
const pageSize = computed(() => route.query.pageSize * 1 || 10)

const pagination = ref({})
const getSupportData = async () => {
  // loading.isGlobalLoading = true
  isLoading.value = true
  try {
    const results = await getFetchData({
      url: `/member/support?pageNo=${pageNo.value}&pageSize=${pageSize.value}`
    })
    SupportData.value = results
    pagination.value = results.pagination
    // loading.isGlobalLoading = false
    isLoading.value = false
  } catch (err) {
    toggleToast.value = true
    toastStyle.value = toastStatus(errorStatus.icon, errorStatus.iconClass, err.msg)
    // loading.isGlobalLoading = false
    isLoading.value = false
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
}
const checkPermission = async () => {
  if (!isLogin.isLogin) {
    await isLogin.checkLogin()
    if (!isLogin.isLogin) {
      await navigateTo('/login')
      return
    }
  }
  await getSupportData()
  loading.isGlobalLoading = false
}
onMounted(() => {
  nextTick(() => {
    checkPermission()
  })
})
</script>
<template>
  <div class="py-10 lg:py-20">
    <h1 class="container mb-6 text-3xl sm:text-4xl lg:mb-10">贊助記錄</h1>
    <div class="container">
      <LoadingDataState v-if="isLoading" text="資料載入中..." :is-loading="isLoading" />
      <EmptyState v-else-if="!isLoading && items?.length === 0" />
      <div v-else-if="!isLoading && items?.length > 0" class="space-y-3">
        <div v-for="item in items" :key="item._id" class="overflow-hidden rounded-xl">
          <div
            class="divA relative flex w-full flex-col items-stretch bg-secondary-2 text-white sm:flex-row lg:gap-4"
          >
            <div class="flex-1 text-left">
              <div class="items-center gap-2 sm:flex">
                <NuxtLink
                  :title="item.project.title"
                  :to="`/projects/${item.project._id}`"
                  class="block w-full shrink pl-3 pr-[66px] pt-3 text-lg font-bold hover:underline hover:underline-offset-2 sm:line-clamp-1 sm:pb-0 sm:pr-0 sm:pt-4 lg:text-xl"
                >
                  {{ item.project.title }}
                </NuxtLink>
              </div>
              <div class="mt-2 flex flex-wrap items-center gap-3 pb-2 pl-3 pr-[66px] sm:pb-4">
                <span
                  class="mt-0.5 whitespace-nowrap rounded-full bg-primary-1 px-2 py-0.5 text-xs"
                  >{{ categoryKeys[item.project.categoryKey].name }}</span
                >
                <p v-if="item.project.feedbackItem && item.isNeedFeedback" class="text-sm sm:mt-0">
                  回饋：{{ item.project.feedbackItem }}
                </p>
                <p v-else-if="!item.project.feedbackItem">無回饋品</p>
                <p v-else>不寄送回饋品</p>
              </div>
            </div>
            <div
              class="flex w-full shrink-0 flex-col justify-between space-y-1 px-3 pb-3 pr-[60px] sm:w-auto sm:flex-col sm:pb-0 sm:pt-0 sm:text-end"
            >
              <div class="text-xs sm:pt-4">
                {{ dayjs.unix(item.createTime).format('YYYY/MM/DD HH:mm:ss') }}
              </div>
              <div class="font-bold sm:pb-4">NT$ {{ item.money }}</div>
            </div>
            <input :id="`checkbox-${item._id}`" type="checkbox" class="hidden" />
            <label
              v-if="item.isNeedFeedback"
              :for="`checkbox-${item._id}`"
              class="absolute bottom-0 right-0 top-0 my-auto flex h-full w-[66px] cursor-pointer items-center justify-center p-3 hover:text-primary-1"
              :disabled="!item.isNeedFeedback"
            >
              <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="absolute right-2 top-4 h-8 w-8 transform transition-transform duration-200 sm:bottom-0 sm:top-0 sm:my-auto"
                :class="{ 'text-secondary-2': !item.isNeedFeedback }"
              />
            </label>
          </div>

          <div
            v-if="item.isNeedFeedback"
            class="divB rounded-b-xl border-2 border-secondary-2 bg-white text-base"
          >
            <div class="text-neutral-800">
              <ul v-if="item.isNeedFeedback" class="space-y-3 px-4 py-3">
                <li
                  class="grid gap-x-4 [word-break:break-word] sm:mb-3 sm:grid-cols-4 lg:grid-cols-6"
                >
                  <div class="text-xs font-bold sm:text-base">收件人</div>
                  <div class="sm:col-span-3 lg:col-span-5">{{ item.receiver }}</div>
                </li>
                <li
                  class="grid gap-x-4 [word-break:break-word] sm:mb-3 sm:grid-cols-4 lg:grid-cols-6"
                >
                  <div class="text-xs font-bold sm:text-base">寄件地址</div>
                  <div class="sm:col-span-3 lg:col-span-5">{{ item.address }}</div>
                </li>
                <li
                  class="grid gap-x-4 [word-break:break-word] sm:mb-3 sm:grid-cols-4 lg:grid-cols-6"
                >
                  <div class="text-xs font-bold sm:text-base">連絡電話</div>
                  <div class="sm:col-span-3 lg:col-span-5">{{ item.receiverPhone }}</div>
                </li>
                <li
                  class="grid gap-x-4 [word-break:break-word] sm:mb-3 sm:grid-cols-4 lg:grid-cols-6"
                >
                  <div class="text-xs font-bold sm:text-base">電子郵件</div>
                  <div class="sm:col-span-3 lg:col-span-5">{{ item.email }}</div>
                </li>
                <div class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
                  <div class="text-xs font-bold sm:text-base">預計寄送日期</div>
                  <div class="sm:col-span-3 lg:col-span-5">
                    {{ dayjs.unix(item.feedBackDate).format('YYYY/MM/DD') }}
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Pagination
        v-if="pagination.totalPage > 1"
        container-class="container flex items-center justify-center py-10 lg:py-20"
        size="xl"
        :pagination="pagination"
        @page="changePage"
      />
    </div>

    <BaseToast
      v-model="toggleToast"
      :msg="toastStyle.msg"
      :icon-class="toastStyle.iconClass"
      :icon="toastStyle.icon"
      @confirm="confirm"
    ></BaseToast>
  </div>
</template>

<style scoped lang="scss">
.divB {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms;
}
.divB > div {
  overflow: hidden;
}
.divA input[type='checkbox'] + label {
  transition: 300ms;
}
.divA input[type='checkbox']:checked + label span {
  transform: rotate(90deg);

  @apply text-primary-1;
}
.divA:has(input[type='checkbox']:checked) + .divB {
  grid-template-rows: 1fr;
}
</style>
