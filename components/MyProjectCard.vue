<script setup>
import { useDayjs } from '#dayjs'
const dayjs = useDayjs()

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  state: {
    type: String,
    required: true
  }
})
const { data, state } = props
</script>

<template>
  <div
    class="grid grid-cols-1 items-center overflow-hidden rounded-3xl border border-primary-1 lg:grid-cols-4"
  >
    <div class="relative h-56 w-full overflow-hidden lg:h-full">
      <NuxtLink
        to="/member/my-projects/123"
        class="block h-56 w-full bg-cover bg-center duration-300 hover:scale-110 lg:h-full"
        :style="{ backgroundImage: `url(${data.coverUrl})` }"
      ></NuxtLink>
      <div class="absolute left-6 top-6 rounded-full bg-primary-3 px-2 py-1">
        {{ categoryKeys[data.categoryId].name }}
      </div>
    </div>
    <div class="col-span-3 w-full items-start gap-2 p-4 lg:flex lg:p-10">
      <div class="grow space-y-2">
        <h2
          class="text-lg font-bold text-secondary-2 decoration-secondary-2 underline-offset-2 hover:underline"
        >
          <NuxtLink to="/member/my-projects/123">{{ data.title }}</NuxtLink>
        </h2>
        <div class="text-neutral-600">
          {{ dayjs(data.startDate * 1000).format('YYYY/MM/DD') }} -
          {{ dayjs(data.endDate * 1000).format('YYYY/MM/DD') }}
        </div>
        <p class="leading-normal">回饋：$100 - 限量精美小熊維尼</p>
        <div class="flex flex-col items-center gap-x-4 gap-y-2 lg:flex-row">
          <div class="relative flex w-full rounded-full bg-neutral-100 text-xs lg:max-w-[400px]">
            <div
              class="h-5 rounded-full bg-primary-2 text-center"
              :style="{ width: `${(data.currentMoney * 100) / data.targetMoney}%` }"
            ></div>
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >{{ Math.floor((data.currentMoney * 100) / data.targetMoney) }} %</span
            >
          </div>
          <div class="whitespace-nowrap text-center">
            {{ priceFormat(data.currentMoney) }} / {{ priceFormat(data.targetMoney) }}
          </div>
        </div>
      </div>
      <div class="shrink-0 text-right">
        <button
          v-if="state === 'rejected'"
          class="h-10 w-10 rounded-full bg-secondary-2 text-white duration-100 hover:bg-primary-1"
        >
          <Icon name="mdi:edit" color="white" width="24" height="24" />
        </button>
        <div
          v-else-if="state === 'ongoing' && data.startDate * 1000 >= new Date().getTime()"
          class="text-primary-1"
        >
          即將開始
        </div>
        <button
          v-else-if="state === 'ongoing' || state === 'ended'"
          class="ml-auto flex items-center rounded-full bg-secondary-2 p-1 px-2 text-white duration-100 hover:bg-primary-1"
        >
          <div class="flex h-6 w-6 items-center justify-center">
            <Icon name="mdi:user" color="white" width="24" height="24" class="" />
          </div>
          <span>{{ data.supportCount }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
