<script setup>
import { useDayjs } from '#dayjs'
import { toastStatus, errorStatus, successStatus } from '@/utils/modalSetting'
const loading = useLoadingStore()

const dayjs = useDayjs()
const route = useRoute()

const toastStyle = ref({})
const toggleToast = ref(false)
const confirm = () => {
  toggleToast.value = false
}

const getProject = async () => {
  await getFetchData({
    url: `/project/${route.params.id}`,
    method: 'GET'
  })
    .then((res) => {
      project.value = res.results
      diffInSeconds.value = project.value.endDate - new Date() / 1000
      days.value = Math.floor(diffInSeconds.value / (24 * 3600))
      hours.value = Math.floor((diffInSeconds.value % (24 * 3600)) / 3600)
      loading.isGlobalLoading = false
    })
    .catch((err) => {
      toggleToast.value = true
      toastStyle.value = toastStatus(
        errorStatus.icon,
        errorStatus.iconClass,
        err.msg || errorStatus.msg
      )
      loading.isGlobalLoading = false
    })
}
const project = ref({
  id: '',
  userId: '',
  projectId: '',
  introduce: '',
  teamName: '',
  avatar: '',
  title: '',
  email: '',
  phone: '',
  achievedMoney: 0,
  targetMoney: 1,
  categoryKey: 0,
  content: '',
  coverUrl: '',
  describe: '',
  videoUrl: '',
  startDate: 0,
  endDate: 0,
  createTime: 0,
  updateTime: 0,
  relatedUrl: '',
  feedbackItem: '',
  feedbackUrl: '',
  feedbackMoney: 0,
  feedbackDate: 0,
  supportCount: 0,
  trackingStatus: false
})

const toggleFollow = async (id) => {
  // loading.isGlobalLoading = true
  await getFetchData({
    url: `/member/collection`,
    method: 'POST',
    params: { projectId: id }
  })
    .then((res) => {
      getProject()
      toggleToast.value = true
      toastStyle.value = toastStatus(successStatus.icon, successStatus.iconClass, res.message)
    })
    .catch((err) => {
      toggleToast.value = true
      toastStyle.value = toastStatus(
        errorStatus.icon,
        errorStatus.iconClass,
        err.msg || errorStatus.msg
      )
    })
}

const diffInSeconds = ref(0)
const days = ref(0)
const hours = ref(0)

const isLogin = useIsLoginStore()

onMounted(() => {
  nextTick(async () => {
    await getProject()
  })
})
</script>
<template>
  <div class="">
    <div class="py-10 lg:rounded-b-[200px] lg:bg-secondary-5 lg:py-20">
      <div class="container grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div
          class="h-60 rounded-3xl bg-cover bg-center lg:h-auto"
          :style="{ backgroundImage: `url(${project.coverUrl})` }"
        ></div>
        <div class="space-y-4">
          <div>
            <span class="rounded-full border border-primary-1 px-2 py-1 text-primary-1">{{
              categoryKeys[project.categoryKey - 1]?.name || '類別'
            }}</span>
          </div>
          <h1 class="text-3xl font-bold lg:text-4xl">{{ project.title }}</h1>
          <p>{{ project.describe }}</p>
          <div class="text-lg">
            募資期間 <span>{{ dayjs(project.startDate * 1000).format('YYYY/MM/DD') }}</span> ~
            <span>{{ dayjs(project.endDate * 1000).format('YYYY/MM/DD') }}</span>
          </div>
          <div class="space-y-2">
            <div>目標 {{ priceFormat(project.targetMoney) }}</div>
            <h2 class="text-4xl font-bold">{{ priceFormat(project.achievedMoney) }}</h2>
            <div class="relative rounded-full bg-neutral-300">
              <div
                class="h-5 max-w-full rounded-full bg-primary-2"
                :style="{ width: `${(project.achievedMoney * 100) / project.targetMoney}%` }"
              ></div>
              <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >{{ Math.floor((project.achievedMoney * 100) / project.targetMoney) }} %</span
              >
            </div>
            <div class="flex justify-between">
              <div v-if="days >= 0 && hours >= 0">募資倒數 {{ days }} 天 {{ hours }} 小時</div>
              <div v-else>募資已結束</div>
              <div class="flex items-center">
                <Icon name="mdi:user" width="24" height="24" />
                <span>{{ project.supportCount }}人參與</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container grid gap-6 pb-10 lg:grid-cols-12 lg:py-20 xl:grid-cols-3">
      <div class="lg:col-span-7 xl:col-span-2">
        <h3 class="mb-4 text-xl lg:text-2xl">提案介紹</h3>
        <div class="mb-6" v-html="project.content"></div>
        <img :src="project.coverUrl" alt="" />
        <iframe
          v-if="project.videoUrl"
          class="mt-2 aspect-video w-full"
          :src="`https://www.youtube.com/embed/${project.videoUrl.split('v=')[1]}`"
        ></iframe>
      </div>
      <div class="lg:col-span-5 xl:col-span-1">
        <div
          class="mb-6 rounded-3xl p-6 shadow-lg"
          :class="{ 'hidden lg:block': !project.feedbackItem }"
        >
          <div class="hidden gap-4 lg:flex">
            <button
              v-if="project.startDate > new Date() / 1000"
              :to="
                !isLogin.isLogin
                  ? '/login'
                  : days >= 0 && hours >= 0
                    ? `/projects/${project.id}/support`
                    : '/projects'
              "
              class="block grow rounded bg-neutral-300 py-4 text-center text-xl text-white"
              disabled
            >
              <span>即將開始</span>
            </button>
            <NuxtLink
              v-else-if="days >= 0 && hours >= 0"
              :to="
                !isLogin.isLogin
                  ? '/login'
                  : days >= 0 && hours >= 0
                    ? `/projects/${project.id}/support`
                    : '/projects'
              "
              class="block grow rounded bg-secondary-2 py-4 text-center text-xl text-white hover:bg-primary-1"
              >支持專案
            </NuxtLink>
            <button
              v-else
              class="block grow rounded bg-neutral-300 py-4 text-center text-xl text-white"
            >
              募資已結束
            </button>
            <button
              v-if="isLogin.isLogin"
              class="rounded-xl border border-secondary-1 p-3 text-secondary-1 hover:border-primary-1 hover:text-primary-1"
              @click="toggleFollow(project.id)"
            >
              <Icon v-if="project.trackingStatus" name="mdi:heart" width="32" height="32" />
              <Icon v-else name="mdi:heart-outline" width="32" height="32" />
            </button>
          </div>
          <div v-if="project.feedbackItem" class="mt-4 flex gap-4">
            <img
              :src="project.feedbackUrl"
              alt=""
              class="h-20 w-20 shrink-0 rounded-2xl object-cover object-center"
            />
            <div>
              <p>單筆滿 NT$ {{ project.feedbackMoney }} 立即享回饋：</p>
              <p class="font-bold">{{ project.feedbackItem }}</p>
              <p class="text-neutral-600">
                預計寄出日期：<span>{{
                  dayjs(project.feedbackDate * 1000).format('YYYY/MM/DD')
                }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="rounded-3xl p-4 shadow-lg lg:p-6">
          <div class="flex items-center gap-10">
            <Avatar size="lg" :src="project?.avatar" />
            <div>
              <div class="mb-4 text-2xl">{{ project.teamName }}</div>
              <div class="flex">
                <a
                  v-if="project.phone.slice(1)"
                  :href="`tel:+886-${project.phone.slice(1)}`"
                  class="flex flex-shrink-0 text-primary-3 after:mx-4 after:block after:h-8 after:w-[2px] after:rounded-sm after:bg-neutral-400 after:content-[''] hover:text-primary-2 after:[&:last-child]:hidden"
                >
                  <Icon name="mdi:phone" width="32" height="32" />
                </a>
                <a
                  v-if="project.email"
                  :href="`mailto:${project.email}`"
                  class="flex flex-shrink-0 text-primary-3 after:mx-4 after:block after:h-8 after:w-[2px] after:rounded-sm after:bg-neutral-400 after:content-[''] hover:text-primary-2 after:[&:last-child]:hidden"
                >
                  <Icon name="mdi:email" width="32" height="32" />
                </a>
                <a
                  v-if="project.relatedUrl"
                  :href="project.relatedUrl"
                  target="_blank"
                  class="flex flex-shrink-0 text-primary-3 after:mx-4 after:block after:h-8 after:w-[2px] after:rounded-sm after:bg-neutral-400 after:content-[''] hover:text-primary-2 after:[&:last-child]:hidden"
                >
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
          :to="
            !isLogin.isLogin
              ? '/login'
              : days >= 0 && hours >= 0
                ? `/projects/${project.id}/support`
                : '/projects'
          "
          class="block grow rounded bg-secondary-2 py-4 text-center text-xl text-white hover:bg-primary-1"
        >
          <span v-if="days >= 0 && hours >= 0"> 支持專案 </span>
          <span v-else>募資已結束</span>
        </NuxtLink>
        <button
          v-if="isLogin.isLogin"
          class="rounded-xl border border-secondary-1 p-3 text-secondary-1 hover:border-primary-1 hover:text-primary-1"
          @click="toggleFollow(project.id)"
        >
          <Icon v-if="project.trackingStatus" name="mdi:heart" width="32" height="32" />
          <Icon v-else name="mdi:heart-outline" width="32" height="32" />
        </button>
      </div>
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
