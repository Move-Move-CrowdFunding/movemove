<script setup>
import { useDayjs } from '#dayjs'
const loading = useLoadingStore()
const isLogin = useIsLoginStore()

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

const pageNo = ref(1)
const pageSize = computed(() => route.query.pageSize * 1 || 10)

const pagination = ref({})
const getSupportData = async () => {
  loading.isGlobalLoading = true

  try {
    const results = await getFetchData({
      url: `/member/support?pageNo=${pageNo.value}&pageSize=${pageSize.value}`
    })
    SupportData.value = results
    pagination.value = results.pagination
    loading.isGlobalLoading = false
  } catch (error) {
    console.log(error)
    alert(error.message)
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
    <div v-if="items?.length">
      <div v-for="item in items" :key="item._id" class="container mb-3">
        <div
          class="divA relative flex w-full flex-col-reverse items-stretch gap-2 bg-secondary-2 px-3 py-4 text-white sm:flex-row lg:gap-4"
        >
          <div class="mr-auto text-left">
            <div class="items-center gap-2 sm:flex">
              <NuxtLink
                :to="`/projects/${item.project._id}`"
                class="shrink text-lg font-bold hover:underline hover:underline-offset-2 sm:line-clamp-1 lg:text-xl"
              >
                {{ item.project.title }}
              </NuxtLink>
            </div>
            <div class="mt-2 flex items-center gap-3">
              <span class="rounded-full bg-primary-1 px-2 py-0.5 text-xs">{{
                categoryKeys[item.project.categoryKey].name
              }}</span>
              <p v-if="item.project.feedbackItem && item.isNeedFeedback" class="text-sm sm:mt-0">
                回饋：{{ item.project.feedbackItem }}
              </p>
              <p v-else-if="!item.project.feedbackItem">無回饋品</p>
              <p v-else>不寄送回饋品</p>
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
          <input :id="`checkbox-${item._id}`" type="checkbox" class="hidden" />
          <label
            :for="`checkbox-${item._id}`"
            class="cursor-pointer p-3 hover:text-primary-1 sm:relative"
            :disabled="!item.isNeedFeedback"
          >
            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="ms-auto h-8 w-8 transform transition-transform duration-200"
              :class="{ 'text-secondary-2': !item.isNeedFeedback }"
            />
          </label>
        </div>

        <div v-if="item.isNeedFeedback" class="divB border-2 border-secondary-2 bg-white text-base">
          <div class=" ">
            <ul v-if="item.isNeedFeedback" class="px-4 py-3">
              <li class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
                <div class="font-bold">收件人</div>
                <div class="sm:col-span-3 lg:col-span-5">{{ item.receiver }}</div>
              </li>
              <li class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
                <div class="font-bold">寄件地址</div>
                <div class="sm:col-span-3 lg:col-span-5">{{ item.address }}</div>
              </li>
              <li class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
                <div class="font-bold">連絡電話</div>
                <div class="sm:col-span-3 lg:col-span-5">{{ item.receiverPhone }}</div>
              </li>
              <li class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
                <div class="font-bold">電子郵件</div>
                <div class="sm:col-span-3 lg:col-span-5">{{ item.email }}</div>
              </li>
              <div class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
                <div class="font-bold">預計寄送日期</div>
                <div class="sm:col-span-3 lg:col-span-5">
                  {{ dayjs.unix(item.feedBackDate).format('YYYY/MM/DD') }}
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <EmptyState v-else />

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
.divA input[type='checkbox']:checked + label {
  transform: rotate(90deg);
}
.divA:has(input[type='checkbox']:checked) + .divB {
  grid-template-rows: 1fr;
}
</style>
