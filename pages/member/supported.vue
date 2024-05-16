<script setup>
import { useDayjs } from '#dayjs'
const dayjs = useDayjs()

const items = [
  {
    id: '_NDWQODQ123DSWA',
    money: 3000,
    receiver: 'YC',
    address: 'YC家',
    receiverPhone: '0987654321',
    email: 'YC@gmail.com',
    feedbackDate: 1730492012,
    createTime: 1728442012,
    project: {
      title:
        '為部落兒童購買繪本書籍|為部落兒童購買繪本書籍|為部落兒童購買繪本書籍|為部落兒童購買繪本書籍',
      feedbackItem: '繪本',
      categoryKey: 1
    }
  },
  {
    id: '_NDWQODQ123DSWA',
    money: 1000,
    receiver: 'YCYCYCYCYC',
    address: 'YCYCYCYCYC家',
    receiverPhone: '0987654321',
    email: 'YCYCYCYCYC@gmail.com',
    feedbackDate: 1728492012,
    createTime: 1728442012,
    project: {
      title: '為部落兒童購買繪本書籍',
      feedbackItem: '小朋友手繪感謝小卡',
      categoryKey: 3
    }
  }
]
</script>
<template>
  <div class="bg-secondary-5 py-10 lg:py-20">
    <h1 class="container mb-6 text-3xl sm:text-4xl lg:mb-10">贊助記錄</h1>

    <UAccordion multiple :items="items" class="container">
      <template #default="{ item, open }">
        <UButton color="gray" variant="ghost" class="mt-2 p-0">
          <div
            class="relative flex w-full flex-col-reverse items-center gap-2 bg-secondary-2 px-3 py-4 text-white sm:flex-row lg:gap-4"
          >
            <div class="mr-auto text-left">
              <div class="items-center gap-2 sm:flex">
                <div class="shrink text-lg font-bold sm:line-clamp-1 lg:text-xl">
                  {{ item.project.title }}
                </div>
              </div>
              <div class="mt-2 flex items-center gap-3">
                <span class="rounded-full bg-primary-1 px-2 py-0.5 text-xs">教育</span>
                <p class="text-sm sm:mt-0">回饋：{{ item.project.feedbackItem }}</p>
              </div>
            </div>
            <div
              class="flex w-full shrink-0 items-center justify-between gap-4 sm:block sm:w-auto sm:text-end"
            >
              <div class="text-xs">
                {{ dayjs(item.createTime * 1000).format('YYYY/MM/DD HH:mm:ss') }}
              </div>
              <div class="font-bold">NT$ {{ item.money }}</div>
            </div>
            <button class="absolute bottom-0 right-0 p-3 sm:relative">
              <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="ms-auto h-5 w-5 transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
            </button>
          </div>
        </UButton>
      </template>
      <template #item="{ item }">
        <div
          class="flex items-end justify-between border-2 border-secondary-2 bg-white px-3 py-4 text-base"
        >
          <div class="">
            <div class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
              <div class="font-bold">收件人</div>
              <div class="col-span-3">{{ item.receiver }}</div>
            </div>
            <div class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
              <div class="font-bold">寄件地址</div>
              <div class="col-span-3">{{ item.address }}</div>
            </div>
            <div class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
              <div class="font-bold">連絡電話</div>
              <div class="col-span-3">{{ item.receiverPhone }}</div>
            </div>
            <div class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
              <div class="font-bold">電子郵件</div>
              <div class="col-span-3">{{ item.email }}</div>
            </div>
            <div class="mb-2 grid gap-x-4 sm:mb-3 sm:grid-cols-4 lg:grid-cols-6">
              <div class="font-bold">預計寄送日期</div>
              <div class="col-span-3">
                {{ dayjs(item.feedbackDate * 1000).format('YYYY/MM/DD') }}
              </div>
            </div>
          </div>
          <div class="p-2">
            <NuxtLink
              :to="`/projects/${item.id}`"
              target="_blank"
              class="underline underline-offset-2 hover:text-primary-1"
              >前往專案</NuxtLink
            >
          </div>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<style scoped lang="scss">
* {
  outline: 1px solid #090;
}
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
