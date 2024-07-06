<script setup>
import { useDayjs } from '#dayjs'
const dayjs = useDayjs()
const isLogin = useIsLoginStore()

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  liked: {
    type: Array,
    default() {
      return []
    }
  }
})
const date = new Date()
const countdownDay = computed(() => {
  return dayjs.unix(props.project?.endDate).diff(dayjs(), 'day')
})

const emit = defineEmits(['follow'])
</script>
<template>
  <NuxtLink
    :to="`/projects/${project?.id || project?._id}`"
    class="group block overflow-hidden rounded-3xl border border-primary-3 duration-300 hover:border-primary-1 hover:shadow-lg lg:rounded-[32px]"
  >
    <div class="relative overflow-hidden">
      <div
        class="relative h-[168px] bg-neutral-200 bg-cover bg-center duration-300 group-hover:scale-110 lg:h-[274px]"
        :style="{ backgroundImage: 'url(' + project.coverUrl + ')' }"
      ></div>
      <button
        v-if="isLogin.isLogin"
        class="group absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-600/50 duration-300 hover:bg-secondary-1 active:fill-primary-1 lg:right-4 lg:top-4"
        :class="{ 'fill-primary-1': project.trackingStatus, 'fill-white': !project.trackingStatus }"
        @click.prevent="emit('follow', project?.id || project?._id)"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
            />
          </g>
        </svg>
      </button>
      <div
        v-if="project?.endDate < date.getTime() / 1000"
        class="absolute inset-0 flex items-center justify-center bg-neutral-200/80"
      >
        已結束
      </div>
    </div>
    <div class="space-y-2 bg-white p-4 lg:space-y-4 lg:p-6">
      <h3 class="line-clamp-2 sm:text-[18px]">
        <div>{{ project.title }}</div>
        <div class="text-transparent">.</div>
      </h3>
      <span
        class="inline-block rounded-full border border-primary-1 px-2 py-1 text-xs text-primary-1 sm:text-base"
        >{{ categoryKeys[project.categoryKey - 1]?.name || '類別' }}</span
      >
      <div class="h-2 overflow-hidden rounded-full bg-[#D9D9D9]">
        <div
          class="h-2 max-w-full overflow-hidden rounded-full bg-primary-1"
          :style="{ width: `${(100 * project.achievedMoney || 0) / project.targetMoney}%` }"
        ></div>
      </div>
      <div class="flex justify-between">
        <p>NT$ {{ project.achievedMoney || 0 }}</p>
        <p v-if="project?.endDate < date.getTime() / 1000">已結束</p>
        <p v-else>
          倒數
          <span>{{ countdownDay }}</span>
          天
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
