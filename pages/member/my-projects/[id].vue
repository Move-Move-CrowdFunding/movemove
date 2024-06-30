<script setup>
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

const getProject = async (id) => {
  await getFetchData({
    url: `/member/project/${id}`,
    method: 'GET'
  })
    .then((res) => {
      console.log(res)
      tempData.value = res.results
      loading.isGlobalLoading = false
    })
    .catch((err) => {
      console.log(err)
      loading.isGlobalLoading = false
    })
}

const editProject = async () => {
  loading.isGlobalLoading = true
  console.log('editProject')
  console.log(tempData)
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
    .then(async (res) => {
      console.log(res)
      // await getProject(route.params.id)
      alert(res.message)
      await navigateTo('/member/my-projects')
      loading.isGlobalLoading = false
    })
    .catch((err) => {
      console.log(err)
      alert(err.message)
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
      console.log(res)
      await getProject(route.params.id)
      loading.isGlobalLoading = false
    })
    .catch((err) => {
      console.log(err)
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
    <!-- <pre>{{tempData}}</pre> -->
  </div>
</template>
