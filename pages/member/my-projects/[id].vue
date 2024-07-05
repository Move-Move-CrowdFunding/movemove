<script setup>
import { toastStatus, errorStatus, successStatus } from '@/utils/modalSetting'
const route = useRoute()
const loading = useLoadingStore()
const tempData = ref()

const isLogin = useIsLoginStore()
const checkPermission = async () => {
  if (!isLogin.isLogin) {
    await isLogin.checkLogin()
    if (!isLogin.isLogin) {
      await navigateTo('/login')
      return
    }
  }
  await getProject(route.params.id)
}

const toastStyle = ref({})
const toggleToast = ref(false)
const confirm = async () => {
  toggleToast.value = false
  await navigateTo('/member/my-projects')
}

const getProject = async (id) => {
  await getFetchData({
    url: `/member/project/${id}`,
    method: 'GET'
  })
    .then((res) => {
      // console.log(res)
      tempData.value = res.results
      loading.isGlobalLoading = false
    })
    .catch((err) => {
      toggleToast.value = true
      toastStyle.value = toastStatus(errorStatus.icon, errorStatus.iconClass, err.msg)
      loading.isGlobalLoading = false
    })
}

const editProject = async () => {
  loading.isGlobalLoading = true
  // console.log('editProject')
  // console.log(tempData)
  await getFetchData({
    url: `/project/${route.params.id}`,
    method: 'PATCH',
    params: {
      introduce: tempData.value.introduce,
      teamName: tempData.value.teamName,
      title: tempData.value.title,
      email: tempData.value.email,
      categoryKey: tempData.value.categoryKey,
      phone: tempData.value.phone,
      targetMoney: tempData.value.targetMoney,
      content: tempData.value.content,
      coverUrl: tempData.value.coverUrl,
      describe: tempData.value.describe,
      videoUrl: tempData.value.videoUrl,
      startDate: tempData.value.startDate,
      endDate: tempData.value.endDate,
      relatedUrl: tempData.value.relatedUrl,
      feedbackItem: tempData.value.feedbackItem,
      feedbackUrl: tempData.value.feedbackUrl,
      feedbackMoney: tempData.value.feedbackMoney,
      feedbackDate: tempData.value.feedbackDate
    }
  })
    .then((res) => {
      // console.log(res)
      // await getProject(route.params.id)
      // alert(res.message)
      toggleToast.value = true
      toastStyle.value = toastStatus(successStatus.icon, successStatus.iconClass, res.message)
      loading.isGlobalLoading = false
    })
    .catch((err) => {
      toggleToast.value = true
      toastStyle.value = toastStatus(errorStatus.icon, errorStatus.iconClass, err.message)
      // alert(err.message)
      loading.isGlobalLoading = false
    })
  loading.isGlobalLoading = false
}

const endProject = async () => {
  loading.isGlobalLoading = true
  await getFetchData({
    url: `/project/${route.params.id}`,
    method: 'PATCH',
    params: {
      introduce: tempData.value.introduce,
      teamName: tempData.value.teamName,
      title: tempData.value.title,
      email: tempData.value.email,
      categoryKey: tempData.value.categoryKey,
      phone: tempData.value.phone,
      targetMoney: tempData.value.targetMoney,
      content: tempData.value.content,
      coverUrl: tempData.value.coverUrl,
      describe: tempData.value.describe,
      videoUrl: tempData.value.videoUrl,
      startDate: tempData.value.startDate,
      endDate: Math.ceil(new Date().getTime() / 1000),
      relatedUrl: tempData.value.relatedUrl,
      feedbackItem: tempData.value.feedbackItem,
      feedbackUrl: tempData.value.feedbackUrl,
      feedbackMoney: tempData.value.feedbackMoney,
      feedbackDate: tempData.value.feedbackDate,
      earlyEnd: true
    }
  })
    .then(async (res) => {
      toggleToast.value = true
      toastStyle.value = toastStatus(successStatus.icon, successStatus.iconClass, res.message)
      await getProject(route.params.id)
      loading.isGlobalLoading = false
    })
    .catch((err) => {
      toggleToast.value = true
      toastStyle.value = toastStatus(errorStatus.icon, errorStatus.iconClass, err.msg)
      loading.isGlobalLoading = false
    })

  loading.isGlobalLoading = false
}

onMounted(() => {
  loading.isGlobalLoading = true

  nextTick(async () => {
    await checkPermission()
  })
})
</script>
<template>
  <div class="">
    <ProjectInfo
      v-if="tempData?.email"
      :temp-data="tempData"
      @edit-project="editProject"
      @end-project="endProject"
    />
    <BaseToast
      v-model="toggleToast"
      :msg="toastStyle.msg"
      :icon-class="toastStyle.iconClass"
      :icon="toastStyle.icon"
      @confirm="confirm"
    ></BaseToast>
    <!-- <pre>{{tempData}}</pre> -->
  </div>
</template>
