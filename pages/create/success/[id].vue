<script setup>
import { useDayjs } from '#dayjs'
definePageMeta({
  requiresAuth: true
})

const dayjs = useDayjs()
const route = useRoute()

const project = ref({
  teamName: '',
  email: '',
  phone: '',
  introduce: '',
  title: '',
  categoryKey: 0,
  targetMoney: 0,
  startDate: 0,
  endDate: 0,
  describe: '',
  coverUrl: '',
  content: '',
  videoUrl: '',
  relateUrl: '',
  feedbackItem: '',
  feedbackUrl: '',
  feedbackMoney: 0,
  feedbackDate: 0
})
const getProject = async () => {
  await getFetchData({
    url: `/member/project/${route.params.id}`,
    method: 'GET'
  })
    .then((res) => {
      console.log(res)
      project.value = res.results
    })
    .catch(async (err) => {
      console.log(err)
      alert(err.message)
      await navigateTo('/index')
    })
}

// const isLogin = useIsLoginStore()
// const checkPermission = async () => {
//   if (!isLogin.isLogin) {
//     await isLogin.checkLogin()
//     if (!isLogin.isLogin) {
//       await navigateTo('/login')
//     }
//   }
//   await getProject()
// }
onMounted(() => {
  nextTick(async () => {
    // checkPermission()
    await getProject()
  })
})
</script>
<template>
  <div>
    <CreateSteps :step="3" />
    <div class="container py-10">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3">
        <div class="xl:col-span-2">
          <h1 class="mb-8 text-3xl font-bold">提案發起成功</h1>
          <ul>
            <li class="mb-6">
              <div class="font-bold">提案標題：</div>
              <p>{{ project.title }}</p>
            </li>
            <li class="mb-6">
              <div class="font-bold">提案人名稱：</div>
              <p>{{ project.teamName }}</p>
            </li>
            <li class="mb-6">
              <div class="font-bold">提案發起日期：</div>
              <p>
                {{ dayjs(project.startDate * 1000).format('YYYY/MM/DD') }}
                至
                {{ dayjs(project.endDate * 1000).format('YYYY/MM/DD') }}
              </p>
            </li>
            <li>
              <div class="font-bold">目標金額：</div>
              <p>{{ priceFormat(project.targetMoney) }}</p>
            </li>
          </ul>
          <div class="mt-10 bg-secondary-2 p-6 text-white">
            已將您的提案申請送出，我們將在 7 - 10
            個工作天內完成提案審核，並將審核結果已通知的形式告知。
          </div>
        </div>
        <div>
          <ProjectCard :project="project" class="pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
</template>
