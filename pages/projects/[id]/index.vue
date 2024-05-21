<script setup>
const project = ref({
  id: '66058f16a069a14089afef0d',
  userId: '354ae03a-9801-42ba-afa4-287b3b10df18',
  projectId: '080a270d-7c2f-49ef-9a2c-bff1f5d33e51',
  introduce: '專業金援團隊，弱勢族群救星，幫助許多需要協助的家庭。',
  teamName: '弱勢救星',
  title: '愛心廚房｜溫飽無憂的一餐，舉辦食物援助計劃',
  email: 'movemove@gmail.com',
  phone: '0912345678',
  achievedMoney: 36020,
  targetMoney: 50000,
  categoryKey: 1,
  content:
    '<p>我們希望能幫助這些求助者，他們需要有個遮風避雨的住所，每月提供物資包與協助破損老舊的家，能得以維修,以減輕需要幫助的以及長輩們經濟開銷壓力。因此，發起修繕募資計畫，邀請社會大眾一同幫忙，協助清寒民眾與長輩房屋修繕，既使最初只能幫忙清理家園，讓長輩們有一個乾淨、舒適的生活環境，並定期提供長輩生活物資包，靠大家的力量，一同翻新清寒長輩與求助者們的生活。</p>',
  coverUrl:
    'https://images.unsplash.com/photo-1711722221946-e271830d5081?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  describe: '一場無情的大火吞噬了整個社區，請幫助無家可歸的民眾。',
  videoUrl: 'https://www.youtube.com/watch?v=YkVjY1F-Eoc',
  startDate: 1712016024,
  endDate: 1718016034,
  createTime: 1711929600,
  updateTime: 1712016000,
  relatedUrl: 'https://www.google.com.tw/',
  feedbackItem: '限量精美小熊維尼 * 1',
  feedbackUrl:
    'https://plus.unsplash.com/premium_photo-1669632824466-09b2c595aa4c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  feedbackMoney: 250,
  feedbackDate: 1712016000,
  supportCount: 24,
  trackingStatus: true
})

const diffInSeconds = project.value.endDate - new Date() / 1000
const days = Math.floor(diffInSeconds / (24 * 3600))
const hours = Math.floor((diffInSeconds % (24 * 3600)) / 3600)
const minutes = Math.floor((diffInSeconds % 3600) / 60)
</script>
<template>
  <div class="">
    <div class="py-10 lg:rounded-b-[200px] lg:bg-secondary-5 lg:py-20">
      <div class="container grid gap-6 lg:grid-cols-2">
        <div
          class="rounded-3xl bg-[url('https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"
        ></div>
        <div class="space-y-4">
          <div>
            <span class="rounded-full border border-primary-1 px-2 py-1 text-primary-1">{{
              categoryKeys[project.categoryKey].name
            }}</span>
          </div>
          <h1 class="text-3xl font-bold lg:text-4xl">{{ project.title }}</h1>
          <p>{{ project.describe }}</p>
          <div class="text-lg">
            募資期間 <span v-dateformat="project.startDate"></span> ~
            <span v-dateformat="project.endDate"></span>
          </div>
          <div class="space-y-2">
            <div>目標 {{ priceFormat(project.targetMoney) }}</div>
            <h2 class="text-4xl font-bold">{{ priceFormat(project.achievedMoney) }}</h2>
            <div class="relative rounded-full bg-neutral-300">
              <div
                class="h-5 rounded-full bg-primary-2"
                :style="{ width: `${(project.achievedMoney * 100) / project.targetMoney}%` }"
              ></div>
              <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >{{ Math.floor((project.achievedMoney * 100) / project.targetMoney) }} %</span
              >
            </div>
            <div class="flex justify-between">
              <clientOnly>
                <div>募資倒數 {{ days }} 天 {{ hours }} 小時 {{ minutes }} 分鐘</div>
              </clientOnly>
              <div class="flex items-center">
                <Icon name="mdi:user" width="24" height="24" />
                <span>{{ project.supportCount }}人參與</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container grid gap-6 pb-10 lg:grid-cols-3 lg:py-20">
      <div class="lg:col-span-2">
        <h3 class="mb-4 text-xl lg:text-2xl">提案介紹</h3>
        <p class="mb-6">{{ project.content }}</p>
        <img
          src="https://images.unsplash.com/photo-1711722221946-e271830d5081?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <iframe
          v-if="project.videoUrl"
          class="mt-2 aspect-video w-full"
          :src="`https://www.youtube.com/embed/${project.videoUrl.split('v=')[1]}`"
        ></iframe>
      </div>
      <div>
        <div class="mb-6 rounded-3xl p-6 shadow-lg">
          <div class="mb-4 hidden gap-4 lg:flex">
            <NuxtLink
              :to="`/projects/${project.id}/support`"
              class="block grow rounded bg-secondary-2 py-4 text-center text-xl text-white hover:bg-primary-1"
            >
              支持專案
            </NuxtLink>
            <button
              class="rounded-xl border border-secondary-1 p-3 text-secondary-1 hover:border-primary-1 hover:text-primary-1"
            >
              <Icon v-if="project.trackingStatus" name="mdi:heart" width="32" height="32" />
              <Icon v-else name="mdi:heart-outline" width="32" height="32" />
            </button>
          </div>
          <div class="flex gap-4">
            <img
              :src="project.feedbackUrl"
              alt=""
              class="h-20 w-20 shrink-0 rounded-2xl object-cover object-center"
            />
            <div>
              <p>單筆滿 NT$ {{ project.feedbackMoney }} 立即享回饋：</p>
              <p class="font-bold">{{ project.feedbackItem }}</p>
              <p class="text-neutral-600">
                預計寄出日期：<span v-dateformat="project.feedbackDate"></span>
              </p>
            </div>
          </div>
        </div>
        <div class="rounded-3xl p-4 shadow-lg lg:p-6">
          <div class="flex items-center gap-10">
            <div
              class="h-20 w-20 rounded-full bg-[url('https://images.unsplash.com/photo-1663250714112-13cef88e4221?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"
            ></div>
            <div>
              <div class="mb-4 text-2xl">{{ project.teamName }}</div>
              <div class="flex">
                <a href="#" class="text-primary-3 hover:text-primary-2">
                  <Icon name="mdi:phone" width="32" height="32" />
                </a>
                <Icon
                  name="fluent:divider-tall-24-regular"
                  width="32"
                  height="32"
                  class="text-neutral-400"
                />
                <a href="#" class="text-primary-3 hover:text-primary-2">
                  <Icon name="mdi:email" width="32" height="32" />
                </a>
                <Icon
                  name="fluent:divider-tall-24-regular"
                  width="32"
                  height="32"
                  class="text-neutral-400"
                />

                <a href="#" class="text-primary-3 hover:text-primary-2">
                  <Icon name="mdi:internet" width="32" height="32" />
                </a>
              </div>
            </div>
          </div>
          <hr class="my-4 lg:my-6" />
          <div>{{ project.introduce }}</div>
        </div>
      </div>
    </div>
    <div class="sticky bottom-0 rounded-t-2xl bg-white py-6 lg:hidden">
      <div class="container flex gap-4">
        <NuxtLink
          :to="`/projects/${project.id}/support`"
          class="block grow rounded bg-secondary-2 py-4 text-center text-xl text-white hover:bg-primary-1"
        >
          支持專案
        </NuxtLink>
        <button
          class="rounded-xl border border-secondary-1 p-3 text-secondary-1 hover:border-primary-1 hover:text-primary-1"
        >
          <Icon v-if="project.trackingStatus" name="mdi:heart" width="32" height="32" />
          <Icon v-else name="mdi:heart-outline" width="32" height="32" />
        </button>
      </div>
    </div>
  </div>
</template>
