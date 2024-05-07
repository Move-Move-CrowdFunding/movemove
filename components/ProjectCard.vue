<script setup>
const data = {
  id: '123',
  title: '愛心廚房｜溫飽無憂的一餐，舉辦食物援助計畫',
  categoryKey: 3,
  coverUrl:
    'https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  endDate: 1720000000,
  targetMoney: 10,
  achievedMoney: 2,
  liked: true
}
const date = new Date()
</script>
<template>
  <NuxtLink
    :to="`/`"
    class="group block overflow-hidden rounded-3xl border border-primary-3 duration-300 hover:border-primary-1 hover:shadow-lg lg:rounded-[32px]"
  >
    <div class="relative overflow-hidden">
      <div
        class="relative h-[168px] bg-cover bg-center duration-300 group-hover:scale-110 lg:h-[274px]"
        :style="{ backgroundImage: 'url(' + data.coverUrl + ')' }"
      ></div>
      <button
        class="group absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-600/50 fill-white duration-300 hover:bg-secondary-1 active:fill-primary-1 lg:right-4 lg:top-4"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
            />
          </g>
        </svg>
      </button>
    </div>
    <div class="space-y-2 bg-white p-4 lg:space-y-4 lg:p-6">
      <h3 class="line-clamp-2 sm:text-[18px]">
        <div>{{ data.title }}</div>
        <div class="text-transparent">.</div>
      </h3>
      <span
        class="inline-block rounded-full border border-primary-1 px-2 py-1 text-xs text-primary-1 sm:text-base"
        >弱勢救助</span
      >
      <div class="h-2 rounded-full bg-[#D9D9D9]">
        <div
          class="h-2 rounded-full bg-primary-1"
          :style="{ width: `${(100 * data.achievedMoney) / data.targetMoney}%` }"
        ></div>
      </div>
      <div class="flex justify-between">
        <p>NT$ {{ data.achievedMoney }}</p>
        <p>
          倒數
          <span>{{ Math.floor((data.endDate - date.getTime() / 1000) / 60 / 60 / 24) }}</span> 天
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
