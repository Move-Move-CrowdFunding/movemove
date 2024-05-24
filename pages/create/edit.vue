<script setup>
// const tempData = ref({
//   introduce: '烏野高校男子排球部，曾代表宮城縣打進春高全國賽，最終獲得全國16強',
//   teamName: '烏野高校男子排球部',
//   title: '支持烏野再次踏上東京橘色球場',
//   email: 'volleyball@karasuno.com',
//   categoryKey: 1,
//   phone: '0912345678',
//   targetMoney: 100000,
//   content:
//     '烏野高中男子排球部募集捐款，募集到的捐款將用於遠征、合宿時的交通費、伙食費、住宿費。讓烏野再次踏上東京橘色球場，懇請各位支持！！',
//   coverUrl:
//     'https://i.imgur.com/UqUdehL.png',
//   describe: '"小巨人"重出。烏鴉將再次飛向全國的舞台。',
//   videoUrl: 'https://www.youtube.com/watch?v=YkVjY1F-Eoc',
//   startDate: 1719792000,
//   endDate: 1722384000,
//   relatedUrl: 'https://en.wikipedia.org/wiki/Haikyu!!',
//   feedbackItem: '被清水潔子無視',
//   feedbackUrl:'https://i.imgur.com/nIbUGbR.png',
//   feedbackMoney: 250,
//   feedbackDate: 1716508800
// })

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
