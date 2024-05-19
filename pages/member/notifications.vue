<script setup>
const { $dateformat } = useNuxtApp()

const isLogin = useIsLoginStore()

const tempUser = ref({})

const notificationsList = ref([
  {
    id: 1,
    title: '樂知修繕隊緊急求援|弱勢助弱勢,修家修心不能停',
    createTime: 1728492012,
    coverUrl:
      'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=1566&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    title: '樂知修繕隊緊急求援|弱勢助弱勢,修家修心不能停',
    createTime: 1728492012,
    coverUrl:
      'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=1566&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    title: '樂知修繕隊緊急求援|弱勢助弱勢,修家修心不能停',
    createTime: 1728492012,
    coverUrl:
      'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=1566&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
])

// 目前頁數
const pageNo = ref(1)

// 單頁筆數
const pageSize = ref(1)

const checkPermission = async () => {
  await isLogin.getUserData()
  if (isLogin.userData.email) {
    getTempUser(isLogin.userData)
  } else {
    await navigateTo('/login')
  }
}
const getTempUser = (data) => {
  tempUser.value = JSON.parse(JSON.stringify(data))
}
onMounted(() => {
  nextTick(() => {
    checkPermission()
  })
})
</script>
<template>
  <div class="py-10 lg:py-20">
    <div class="sm:px-auto container">
      <h1 class="mb-6 text-3xl sm:text-4xl lg:mb-10">最新通知</h1>
      <ul class="flex flex-col">
        <li
          v-for="item in notificationsList"
          :key="item.id"
          class="relative top-0 flex-shrink-0 pb-6 [&:first-child>*>*:first-child]:top-[calc(50%_-_12px)] [&:last-child>*>*:first-child]:h-[calc(50%_-_12px)] [&:only-child>*>*:first-child]:hidden"
        >
          <NuxtLink to="/">
            <div class="absolute left-1 hidden h-full border-l-2 border-neutral-200 md:block"></div>
            <div
              class="absolute -left-[1px] -top-6 bottom-0 my-auto hidden h-3 w-3 items-center justify-center rounded-full bg-neutral-200 md:flex"
            ></div>
            <div
              class="group -top-[3px] ml-0 grid grid-cols-1 items-center overflow-hidden rounded-3xl border border-primary-1 md:ml-7 lg:grid-cols-4"
            >
              <div class="relative h-56 w-full overflow-hidden lg:h-full">
                <div
                  :style="`background-image: url('${item.coverUrl}')`"
                  class="absolute inset-0 bg-cover bg-center duration-300 group-hover:scale-110"
                ></div>
              </div>
              <div class="col-span-3 space-y-2 p-3 lg:px-6 lg:py-10">
                <p class="text-neutral-600">
                  {{ $dateformat(item.createTime) }}
                </p>
                <h3 class="line-clamp-4 sm:text-[18px] md:line-clamp-2">
                  你發起的「<span
                    class="text-secondary-2 underline md:no-underline md:hover:underline"
                    >{{ item.title }}</span
                  >」已通過審核開始募資！
                </h3>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <div class="flex items-center justify-center pt-6">
        <UPagination
          v-model="pageNo"
          :ui="{
            base: 'min-w-[44px] justify-center',
            rounded: 'rounded-md'
          }"
          size="xl"
          class="space-x-4"
          :page-count="pageSize"
          :total="notificationsList.length"
        />
      </div>
    </div>
  </div>
</template>
