<script setup>
const route = useRoute()

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
    })
    .catch((err) => console.log(err))
}
const tempData = ref()

onMounted(() => {
  nextTick(async () => {
    await checkPermission()
  })
})
</script>
<template>
  <div class="">
    <ProjectInfo v-if="tempData?.email" :temp-data="tempData" />
  </div>
</template>
