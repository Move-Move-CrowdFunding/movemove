<script setup>
import { toastStatus, errorStatus } from '@/utils/modalSetting'
const router = useRouter()
const isLogin = useIsLoginStore()
const loading = useLoadingStore()
const requestLoading = ref(false)

const toastStyle = ref({})
const toggleToast = ref(false)
const confirm = () => {
  toggleToast.value = false
}

const tempData = ref({
  introduce: '',
  teamName: '',
  title: '',
  email: '',
  categoryKey: 0,
  phone: '',
  targetMoney: 0,
  content: '',
  coverUrl: '',
  describe: '',
  videoUrl: '',
  startDate: 0,
  endDate: 0,
  relatedUrl: '',
  feedbackItem: '',
  feedbackUrl: '',
  feedbackMoney: 0,
  feedbackDate: NaN
})

const createProject = async (tempData) => {
  requestLoading.value = true
  await getFetchData({
    url: '/project',
    method: 'POST',
    params: tempData
  })
    .then((res) => {
      console.log(res)
      router.push({ path: `/create/success/${res.results.id}` })
    })
    .catch((err) => {
      console.log(err)
      toggleToast.value = true
      toastStyle.value = toastStatus(errorStatus.icon, errorStatus.iconClass, err.msg)
      router.push({ path: `/create/edit` })
    })
    .finally(() => {
      requestLoading.value = false
    })
}

const checkPermission = async () => {
  if (!isLogin.isLogin) {
    await isLogin.checkLogin()
    if (!isLogin.isLogin) {
      await navigateTo('/login')
    }
  }
  loading.isGlobalLoading = false
}
onMounted(() => {
  loading.isGlobalLoading = true

  nextTick(() => {
    checkPermission()
  })
})
</script>
<template>
  <div>
    <CreateSteps :step="2" />
    <ProjectInfo
      :temp-data="tempData"
      :request-loading="requestLoading"
      @create-project="createProject"
    />
    <BaseToast
      v-model="toggleToast"
      :msg="toastStyle.msg"
      :icon-class="toastStyle.iconClass"
      :icon="toastStyle.icon"
      @confirm="confirm"
    ></BaseToast>
  </div>
</template>

<style scoped>
/* * {
  outline: 1px solid #090;
} */
h2 {
  @apply mb-3 mt-4 text-lg font-bold;
}
label {
  @apply mb-1 inline-block;
}
input,
textarea,
select {
  @apply rounded border p-3;
}
</style>
