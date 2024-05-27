<script setup>
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
  startDate: NaN,
  endDate: NaN,
  relatedUrl: '',
  feedbackItem: '',
  feedbackUrl: '',
  feedbackMoney: 0,
  feedbackDate: NaN
})

const createProject = async (tempData) => {
  console.log(tempData)

  await getFetchData({
    url: '/project',
    method: 'POST',
    params: tempData
  })
    .then((res) => {
      console.log(res)
      // router.push({ path: `/create/success` })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
<template>
  <div>
    <CreateSteps :step="2" />
    <ProjectInfo :temp-data="tempData" @create-project="createProject" />
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
