<script setup>
const route = useRoute()

const isLogin = useIsLoginStore()
const checkPermission = async () => {
  await isLogin.getUserData()
  if (isLogin.userData.email) {
    await getProject(route.params.id)
  } else {
    await navigateTo('/login')
  }
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
